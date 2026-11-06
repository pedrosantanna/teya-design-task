// Renders the app's illustration frames from the docs viewer's export mode (site/viewer3d.js) in headless
// Chrome. Writes PNG frames and a meta.json per clip to scripts/illustrations/.frames/<stem>/.
//
//   cd app && npx -y -p playwright@1.58.2 node scripts/illustrations/render.mjs [filters]
//
// Filters (comma lists): --only basket,box  --grounds background,card  --schemes light,dark
//   --sizes medium,large (or --pt 88,120)  --scales 3  --clips entry,idle,still  --set main,categories,welcome
// Options: --port 4173 (starts site/serve.py there if nothing answers)  --url http://…  --bundled (use
//   Playwright's own Chromium instead of the installed Chrome)  --fresh (clear .frames first).
// three.js loads from jsDelivr, so the render needs a network connection.
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { FRAMES, REPO, categoryColors, clipScales, flags, jobs, manifest, stem, tool } from './lib.mjs';

const f = flags();
const m = manifest();
const port = +(f.port || 4173);
const base = f.url || `http://localhost:${port}`;

async function up(url) {
  try {
    return (await fetch(url)).ok;
  } catch {
    return false;
  }
}

let server = null;
if (!(await up(`${base}/site/nav.json`))) {
  if (f.url) throw new Error(`Nothing answers at ${base}`);
  server = spawn('python3', ['site/serve.py', String(port)], { cwd: REPO, stdio: 'ignore' });
  for (let i = 0; i < 50 && !(await up(`${base}/site/nav.json`)); i++) await new Promise((r) => setTimeout(r, 200));
}

const { chromium } = await tool('playwright', 'npx -y -p playwright@1.58.2 node scripts/illustrations/render.mjs');
const browser = await chromium.launch({ headless: true, ...(f.bundled ? {} : { channel: 'chrome' }) });
let failed = 0;
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  page.on('console', (msg) => msg.type() === 'error' && console.error('[page]', msg.text()));
  await page.goto(`${base}${m.page}`);
  await page.waitForFunction(() => window.__exportReady === true, null, { timeout: 60_000 });

  const sets = f.set || ['main', 'categories', 'welcome'];
  // --fresh: start from an empty frames folder (frames of illustrations dropped from the manifest go too).
  if (f.fresh) rmSync(FRAMES, { recursive: true, force: true });
  let n = 0;
  async function one(name, dir, opts, extra) {
    let r;
    try {
      const fps = +(f.fps || m.clipFps?.[opts.clip] || m.fps);
      r = await page.evaluate((o) => window.__exportFrames(o), { fps, az: m.light.az, el: m.light.el, ...opts });
    } catch (e) {
      failed++;
      console.error(`✗ ${name}: ${e.message.split('\n')[0]}`);
      return;
    }
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    r.frames.forEach((u, i) => writeFileSync(path.join(dir, `frame-${String(i + 1).padStart(4, '0')}.png`), Buffer.from(u.slice(u.indexOf(',') + 1), 'base64')));
    writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ ...r.meta, ...extra }, null, 2));
    n++;
    console.log(`✓ ${name}: ${r.frames.length} frame${r.frames.length === 1 ? '' : 's'}, ${r.meta.px}px, ${r.meta.renderMs} ms`);
  }
  const lineOf = () => ({ line: m.line ?? 1.25, ...(m.lineSmall ?? {}) });
  const wantClip = (c) => !f.clips || f.clips.includes(c);

  if (sets.includes('main')) {
    for (const j of jobs(m, { only: f.only, grounds: f.grounds, schemes: f.schemes, sizes: f.sizes, pt: f.pt, scales: f.scales })) {
      const clips = clipScales(m, j.sizeName).includes(j.scale) ? (j.ill.clipsBySize?.[j.sizeName] ?? j.ill.clips) : [];
      for (const clip of [...clips, 'still'].filter(wantClip)) {
        const name = stem(j.ill.name, clip, j.ground, j.size, j.scale);
        await one(clip === 'still' ? `${name} (still)` : name, path.join(FRAMES, clip === 'still' ? `${name}.still` : name),
          { object: j.ill.object, size: j.size, scale: j.scale, ground: j.color, rot: j.ill.rot ?? 0, ...(j.fit ? { fitCenter: j.fit.center, fitClear: j.fit.clear } : {}), ...lineOf(), ...(j.dark ? { dark: j.dark } : {}), clip, ...(j.ground.endsWith('-dark') ? j.darkTones : {}) },
          { name: j.ill.name, groundId: j.ground, sizeName: j.sizeName });
      }
    }
  }
  // Category cards: transparent, shaded for the kind's tile token (color.shop.accent.<ramp>.tile; shade toward 800 in
  // light, 900 in dark); the app composites them over the tile. Every object is centred and framed the same way
  // (categories.fit.center).
  if (sets.includes('categories') && m.categories) {
    const c = m.categories;
    const fit = c.fit?.center
      ? { fitCenter: c.fit.center, ...(c.fit.clear != null ? { fitClear: c.fit.clear } : {}) }
      : c.fit?.area
      ? { fitArea: c.fit.area, fitMaxW: c.fit.maxWidth, fitMaxH: c.fit.maxHeight, fitBase: c.fit.base, fitClear: c.fit.clear }
      : c.fit
        ? { fitW: c.fit.width, fitTop: c.fit.top, fitBase: c.fit.base }
        : { margin: c.margin };
    for (const it of c.items) {
      if (f.only && !f.only.includes(it.id)) continue;
      // c.schemes: the schemes whose tile differs (round 18: one pastel tile in both, so light only; dark reuses it).
      for (const scheme of (c.schemes ?? ['light', 'dark']).filter((x) => !f.schemes || f.schemes.includes(x))) {
        const { ground, dark } = categoryColors(it.ramp, scheme);
        for (const scale of c.scales.filter((x) => !f.scales || f.scales.includes(String(x)))) {
          for (const clip of [...c.clips, 'still'].filter(wantClip)) {
            const name = stem(it.id, clip, scheme, c.size, scale);
            await one(`categories/${name}${clip === 'still' ? ' (still)' : ''}`, path.join(FRAMES, 'categories', clip === 'still' ? `${name}.still` : name),
              { object: it.object, size: c.size, height: c.height, scale, ground, dark, opaque: !!c.opaque, rot: it.rot ?? 0, ...fit, ...lineOf(), clip },
              { name: it.id, set: 'categories', groundId: scheme, sizeName: 'card', ramp: it.ramp });
          }
        }
      }
    }
  }
  // Getting started: each object on its own page's Indigo ground (transparent, so the crossfading page shows no edge).
  if (sets.includes('welcome') && m.welcome) {
    const w = m.welcome;
    for (const it of w.items) {
      if (f.only && !f.only.includes(it.name)) continue;
      const sizeName = it.size ?? w.size;
      const size = m.sizes[sizeName];
      // A bleed item (frame) is a window onto a larger scene: size × height pt, fitCenter times the width.
      const fit = it.fit ?? w.fit;
      const frame = it.frame ? { height: m.heights?.[sizeName] ?? size, fitCenter: it.frame.fitCenter, fitFrame: 1, focusX: it.frame.focusX ?? 0, focusY: it.frame.focusY ?? 0 } : fit ? { fitCenter: fit.center, fitClear: fit.clear } : {};
      for (const scheme of ['light', 'dark'].filter((x) => !f.schemes || f.schemes.includes(x))) {
        const groundId = `welcome-${scheme}`;
        const { ground, dark } = it[scheme];
        for (const scale of m.scales.filter((x) => !f.scales || f.scales.includes(String(x)))) {
          const clips = clipScales(m, sizeName).includes(scale) ? it.clips : [];
          if (it.scales && !it.scales.includes(scale)) continue;
          for (const clip of [...clips, 'still'].filter(wantClip)) {
            const name = stem(it.name, clip, groundId, size, scale);
            await one(clip === 'still' ? `${name} (still)` : name, path.join(FRAMES, clip === 'still' ? `${name}.still` : name),
              { object: it.object, size, scale, ground, dark, rot: it.rot ?? 0, ...frame, ...lineOf(), clip, ...(scheme === 'dark' ? it.darkTones : {}) },
              { name: it.name, set: 'welcome', groundId, sizeName, fadeBottom: it.frame?.fadeBottom, dim: it[scheme].dim });
          }
        }
      }
    }
  }
  console.log(`${n} clips rendered to ${path.relative(process.cwd(), FRAMES)}${failed ? `, ${failed} failed` : ''}`);
} finally {
  await browser.close();
  server?.kill();
}
process.exit(failed ? 1 : 0);
