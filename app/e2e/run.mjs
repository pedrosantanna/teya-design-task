// Synthetic test users: scripted, persona-driven scenario tests for the prototype's web build.
//
// What this is: a Playwright runner that plays each scenario in `personas/*.json` against the running
// prototype, the way a person with that persona's goal would tap through it, and records where the flow
// breaks. It checks functional breaks (a step that can't be done, an answer that never arrives, a page
// error) and usability breaks that can be measured (touch targets under 44 pt, controls without a name,
// cut-off text, screens with no next action).
//
// What this is not: research. The scripted users are not shoppers or shopkeepers, their results say nothing
// about demand or preference, and a scenario passes because it was written to follow a path that exists.
// See docs/deliver/synthetic-users.md.
//
// Usage (from app/):  npm run synthetic [-- --only sam --scenario eclipse-today --no-fail --headed]
// Needs the web build served at SYNTHETIC_URL (default http://localhost:4173/app-web/index.html), e.g.
// `python3 site/serve.py 4173` from the repo root after `npm run export:web`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { INSPECT } from './inspect.mjs';
import { loadPlaywright } from './pw.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, 'out');
const BASE = process.env.SYNTHETIC_URL || 'http://localhost:4173/app-web/index.html';
const VIEWPORT = { width: 402, height: 874 };
const MIN_TARGET = 44; // pt, Apple HIG; 1 CSS px = 1 pt at this viewport

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------- matching ----------

/** A matcher is { role?, name?, nameContains?, nameMatches?, text?, textMatches?, heading? }. */
function matchItem(item, m) {
  if (m.role && m.role !== 'any' && item.role !== m.role) return false;
  if (m.name !== undefined && item.name !== m.name) return false;
  if (m.nameContains !== undefined && !item.name.includes(m.nameContains)) return false;
  if (m.nameMatches !== undefined && !new RegExp(m.nameMatches).test(item.name)) return false;
  return true;
}

function describeMatcher(m) {
  const parts = [];
  if (m.role) parts.push(m.role);
  for (const k of ['name', 'nameContains', 'nameMatches', 'text', 'textMatches', 'heading']) if (m[k] !== undefined) parts.push(`${k} ${JSON.stringify(m[k])}`);
  return parts.join(' ');
}

/** True when the matcher finds something the shopper could see now. */
function isVisible(snap, m) {
  if (m.text !== undefined || m.textMatches !== undefined || m.heading !== undefined) {
    const re = m.textMatches !== undefined ? new RegExp(m.textMatches) : null;
    const pool = m.heading !== undefined ? snap.headings : snap.texts;
    const hit = pool.some((t) => (m.heading !== undefined ? t === m.heading : m.text !== undefined ? t.includes(m.text) : re.test(t)));
    if (!hit) return false;
    if (m.role || m.name !== undefined || m.nameContains !== undefined) return snap.items.some((i) => matchItem(i, m));
    return true;
  }
  return snap.items.some((i) => matchItem(i, m));
}

// ---------- page helpers ----------

async function snapshot(page) {
  return page.evaluate(INSPECT);
}

const signature = (s) => JSON.stringify([s.items.map((i) => [i.name, i.x, i.y]), s.texts]);

/** Waits until what is on screen stops changing. */
async function settle(page, { min = 400, max = 5000 } = {}) {
  const t0 = Date.now();
  await sleep(min);
  let last = signature(await snapshot(page));
  let stable = 0;
  while (Date.now() - t0 < max) {
    await sleep(250);
    const now = signature(await snapshot(page));
    stable = now === last ? stable + 1 : 0;
    last = now;
    if (stable >= 2) break;
  }
  return snapshot(page);
}

async function scrollContainer(page, dy) {
  return page.evaluate((delta) => {
    const cands = [...document.querySelectorAll('*')].filter((e) => {
      const c = getComputedStyle(e);
      return /auto|scroll/.test(c.overflowY) && e.scrollHeight > e.clientHeight + 5 && e.clientHeight > 300;
    });
    const el = cands.sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
    if (!el) return false;
    el.scrollBy(0, delta);
    return true;
  }, dy);
}

// ---------- the run ----------

const BACK_ROLE_NAMES = /^(back|close|cancel|reply)/i;

async function runScenario(browser, persona, scenario) {
  const id = `${persona.id}.${scenario.id}`;
  const dir = path.join(OUT, 'screens', id);
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) fs.rmSync(path.join(dir, f));

  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, hasTouch: false });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300));
  });
  page.on('pageerror', (e) => pageErrors.push(String(e.message || e).slice(0, 300)));

  const start = scenario.start || '';
  const url = `${BASE}?scheme=light&debug=0${start ? `&${start}` : ''}`;
  const record = {
    id,
    persona: persona.id,
    scenario: scenario.id,
    title: scenario.title,
    goal: scenario.goal,
    url,
    steps: [],
    taps: 0,
    goalReached: false,
    msToGoal: null,
    breaks: [], // functional
    usability: [], // measurable usability findings
    deadEnds: [],
    unnamed: [],
    smallTargets: [],
    truncated: [],
    occludedControls: 0,
    unlabelledImages: 0,
    horizontalOverflow: false,
    consoleErrors,
    pageErrors,
  };
  const small = new Map();
  const unnamed = new Map();
  const truncated = new Set();
  const t0 = Date.now();
  let shot = 0;

  const observe = async (label, snap) => {
    const screen = snap.headings[0] || '';
    for (const i of snap.items) {
      const key = `${screen}|${i.role}|${i.name}`;
      if (!i.name && !unnamed.has(key)) unnamed.set(key, { screen, role: i.role, size: `${i.w}x${i.h}`, at: label });
      // Full-screen scrims and the page's own sheets are not targets a finger aims at.
      const scrim = i.w >= VIEWPORT.width - 2 && i.h >= VIEWPORT.height - 2;
      const tappable = i.role !== 'heading' && i.role !== 'textbox';
      if (i.name && tappable && !scrim && Math.min(i.w, i.h) < MIN_TARGET && !small.has(key)) small.set(key, { screen, role: i.role, name: i.name, size: `${i.w}x${i.h}`, at: label });
    }
    for (const t of snap.truncated) truncated.add(`${screen}: ${t}`);
    record.occludedControls = Math.max(record.occludedControls, snap.occluded);
    record.unlabelledImages = Math.max(record.unlabelledImages, snap.unlabelledImages);
    if (snap.overflowX) record.horizontalOverflow = true;
  };

  const capture = async (label, snap, extra = {}) => {
    // A screen with nothing to tap while the app is typing or processing is not a dead end: look again for a few seconds.
    const isDead = (s) => {
      const a = s.items.filter((i) => !i.disabled);
      return a.length === 0 || a.every((i) => BACK_ROLE_NAMES.test(i.name) || i.role === 'textbox');
    };
    for (let k = 0; k < 8 && isDead(snap); k++) {
      await sleep(500);
      snap = await snapshot(page);
    }
    shot += 1;
    const file = `${String(shot).padStart(2, '0')}-${slug(label).slice(0, 40)}.png`;
    await page.screenshot({ path: path.join(dir, file) });
    const actions = snap.items.filter((i) => !i.disabled);
    const onlyNav = actions.length > 0 && actions.every((i) => BACK_ROLE_NAMES.test(i.name) || i.role === 'textbox');
    const dead = actions.length === 0 || onlyNav;
    record.steps.push({
      n: record.steps.length + 1,
      label,
      atMs: Date.now() - t0,
      screen: snap.headings[0] || null,
      headings: snap.headings,
      actions: actions.map((i) => `${i.role}: ${i.name}`),
      texts: snap.texts.slice(0, 60),
      screenshot: path.relative(OUT, path.join(dir, file)),
      deadEnd: dead,
      ...extra,
    });
    if (dead) record.deadEnds.push({ step: record.steps.length, label, screen: snap.headings[0] || null, actions: actions.map((i) => i.name), final: !!scenario.endsWithoutNextAction });
  };

  let snap;
  try {
    await page.goto(url, { waitUntil: 'load' });
    // The splash and first navigation take a moment; wait for something to tap.
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
      snap = await snapshot(page);
      if (snap.items.length > 0 || snap.texts.length > 2) break;
      await sleep(300);
    }
    snap = await settle(page);
    await observe('start', snap);
    await capture('start', snap);
  } catch (e) {
    record.breaks.push({ step: 0, kind: 'load', message: `The prototype did not load at ${url}: ${e.message}` });
    await context.close();
    return finish(record, small, unnamed, truncated);
  }

  const fail = (step, kind, message, severity = 'break') => {
    (severity === 'usability' ? record.usability : record.breaks).push({ step: record.steps.length, kind, message, label: step.label || '' });
  };

  let aborted = false;
  for (const step of scenario.steps) {
    if (aborted) break;
    const label = step.label || stepLabel(step);
    try {
      if (step.tap) {
        const matches = snap.items.filter((i) => matchItem(i, step.tap));
        if (matches.length === 0) {
          fail({ ...step, label }, 'no-target', `Nothing visible to tap: ${describeMatcher(step.tap)}. On screen: ${snap.items.map((i) => i.name).slice(0, 12).join(' / ') || 'no controls'}`);
          await capture(`${label} (not found)`, snap, { failed: true });
          aborted = true;
          continue;
        }
        const t = matches[0];
        if (t.disabled) fail({ ...step, label }, 'disabled', `The control is disabled: ${t.name}`, 'usability');
        await page.mouse.click(t.x + t.w / 2, t.y + t.h / 2);
        record.taps += 1;
        snap = await settle(page);
      } else if (step.type) {
        const matches = snap.items.filter((i) => matchItem(i, step.type));
        if (matches.length === 0) {
          fail({ ...step, label }, 'no-target', `No visible field: ${describeMatcher(step.type)}`);
          aborted = true;
          continue;
        }
        const t = matches[0];
        await page.mouse.click(t.x + t.w / 2, t.y + t.h / 2);
        record.taps += 1;
        await page.keyboard.type(step.text, { delay: 5 });
        if (step.submit) await page.keyboard.press('Enter');
        snap = await settle(page);
      } else if (step.scroll !== undefined) {
        const ok = await scrollContainer(page, step.scroll);
        if (!ok) fail({ ...step, label }, 'no-scroll', 'There is nothing to scroll on this screen', 'usability');
        snap = await settle(page, { min: 500 });
      } else if (step.waitFor) {
        const limit = Date.now() + (step.timeoutS || 30) * 1000;
        let hit = false;
        while (Date.now() < limit) {
          snap = await snapshot(page);
          if (isVisible(snap, step.waitFor)) {
            hit = true;
            break;
          }
          await sleep(500);
        }
        if (!hit) {
          fail({ ...step, label }, 'timeout', `After ${step.timeoutS || 30}s nothing matched ${describeMatcher(step.waitFor)}. Screen: ${snap.headings[0] || '(no heading)'}; text: ${snap.texts.slice(0, 8).join(' / ')}`, step.severity || 'break');
          if (step.severity !== 'usability') aborted = true;
        } else {
          snap = await settle(page, { min: 300 });
        }
      } else if (step.expect) {
        // Checks the current screen and goes on; `severity: "usability"` records a finding instead of a break.
        const ok = isVisible(snap, step.expect);
        const absent = step.absent ? isVisible(snap, step.absent) : false;
        if (!ok) fail({ ...step, label }, 'expect', `Expected to see ${describeMatcher(step.expect)}. ${step.why || ''}`.trim(), step.severity || 'break');
        if (absent) fail({ ...step, label }, 'expect-absent', `Should not see ${describeMatcher(step.absent)}. ${step.why || ''}`.trim(), step.severity || 'break');
        if (step.goal && ok && !absent && !record.goalReached) {
          record.goalReached = true;
          record.msToGoal = Date.now() - t0;
        }
        if (step.severity !== 'usability' && (!ok || absent)) aborted = true;
      } else if (step.note) {
        // A narrative line for the report, not an action.
      }
    } catch (e) {
      fail({ ...step, label }, 'error', e.message);
      aborted = true;
    }
    await observe(label, snap);
    await capture(label, snap, { step: step.tap ? 'tap' : step.type ? 'type' : step.scroll !== undefined ? 'scroll' : step.waitFor ? 'wait' : step.expect ? 'expect' : 'note' });
  }

  // A scenario's goal is the step marked `goal: true`; without it the goal is not reached.
  if (pageErrors.length) record.breaks.push({ step: record.steps.length, kind: 'page-error', message: `Uncaught page error: ${pageErrors[0]}` });
  await context.close();
  return finish(record, small, unnamed, truncated);
}

function stepLabel(s) {
  if (s.tap) return `tap ${describeMatcher(s.tap)}`;
  if (s.type) return `type "${s.text}"`;
  if (s.scroll !== undefined) return `scroll ${s.scroll}`;
  if (s.waitFor) return `wait for ${describeMatcher(s.waitFor)}`;
  if (s.expect) return `check ${describeMatcher(s.expect)}`;
  return s.note || 'note';
}

function finish(record, small, unnamed, truncated) {
  record.smallTargets = [...small.values()];
  record.unnamed = [...unnamed.values()];
  record.truncated = [...truncated];
  record.status = record.breaks.length ? 'broken' : record.goalReached ? 'reached' : 'not reached';
  return record;
}

// ---------- reports ----------

function markdown(report) {
  const L = [];
  L.push('# Synthetic test users: latest run');
  L.push('');
  L.push(`Run ${report.when} against ${report.url} at ${VIEWPORT.width}x${VIEWPORT.height}, light scheme.`);
  L.push('');
  L.push('Scripted test users, not research. A result says whether a flow breaks, not what a shopper would do or want.');
  L.push('');
  L.push('| Scenario | Result | Steps | Taps | Time to goal | Dead ends | Small targets | No name | Cut text | Console errors |');
  L.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const r of report.scenarios) {
    const t = r.msToGoal == null ? '-' : `${(r.msToGoal / 1000).toFixed(0)} s`;
    const dead = r.deadEnds.filter((d) => !d.final).length;
    L.push(`| ${r.id} | ${r.status} | ${r.steps.length - 1} | ${r.taps} | ${t} | ${dead} | ${r.smallTargets.length} | ${r.unnamed.length} | ${r.truncated.length} | ${r.consoleErrors.length} |`);
  }
  L.push('');
  L.push('Time to goal includes the simulated shops\' scripted delays and the runner\'s waits for the screen to settle.');
  for (const r of report.scenarios) {
    if (!r.breaks.length && !r.usability.length) continue;
    L.push('');
    L.push(`## ${r.id}`);
    for (const b of r.breaks) L.push(`- Break at step ${b.step} (${b.kind}): ${b.message}`);
    for (const b of r.usability) L.push(`- Usability at step ${b.step} (${b.kind}): ${b.message}`);
  }
  return L.join('\n') + '\n';
}

async function main() {
  const personasDir = path.join(here, 'personas');
  const files = fs.readdirSync(personasDir).filter((f) => f.endsWith('.json')).sort();
  const only = option('only');
  const scenarioFilter = option('scenario');
  const personas = files.map((f) => JSON.parse(fs.readFileSync(path.join(personasDir, f), 'utf8'))).filter((p) => !only || p.id === only);

  try {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.error(`The prototype is not reachable at ${BASE} (${e.message}).\nRun "npm run export:web" in app/ and "python3 site/serve.py 4173" at the repo root, or set SYNTHETIC_URL.`);
    process.exit(2);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: !flag('headed') });
  const results = [];
  for (const p of personas) {
    if (!p.scenarios?.length) continue;
    for (const s of p.scenarios) {
      if (scenarioFilter && s.id !== scenarioFilter) continue;
      process.stdout.write(`- ${p.id}.${s.id} ... `);
      const r = await runScenario(browser, p, s);
      results.push(r);
      console.log(`${r.status} (${r.taps} taps, ${r.breaks.length} breaks, ${r.usability.length} usability findings)`);
    }
  }
  await browser.close();

  const report = {
    kind: 'synthetic-test-users',
    notResearch: 'Scripted test users driving a prototype. Not research, not validation of demand, not automated ethnography.',
    when: new Date().toISOString().slice(0, 16).replace('T', ' '),
    url: BASE,
    viewport: VIEWPORT,
    minTargetPt: MIN_TARGET,
    personas: personas.map((p) => ({ id: p.id, name: p.name, inScope: p.inScope !== false })),
    scenarios: results,
  };
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT, 'summary.md'), markdown(report));
  console.log(`\nReport: ${path.relative(process.cwd(), path.join(OUT, 'report.json'))}\nSummary: ${path.relative(process.cwd(), path.join(OUT, 'summary.md'))}`);

  const broken = results.filter((r) => r.breaks.length || !r.goalReached);
  if (broken.length) {
    console.log(`\n${broken.length} scenario(s) hit a functional break or did not reach the goal.`);
    if (!flag('no-fail')) process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
