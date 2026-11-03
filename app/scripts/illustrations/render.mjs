// Renders the app's illustration frames from the docs viewer's export mode (site/viewer3d.js) in headless
// Chrome. Writes PNG frames and a meta.json per clip to scripts/illustrations/.frames/<stem>/.
//
//   cd app && npx -y -p playwright@1.58.2 node scripts/illustrations/render.mjs [filters]
//
// Filters (comma lists): --only basket,box  --grounds background,card  --schemes light,dark
//   --sizes medium,large (or --pt 88,120)  --scales 3  --clips entry,idle,still  --set main,categories
// Options: --port 4173 (starts site/serve.py there if nothing answers)  --url http://…  --bundled (use
//   Playwright's own Chromium instead of the installed Chrome)  --fresh (clear .frames first).
// three.js loads from jsDelivr, so the render needs a network connection.
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { FRAMES, REPO, clipScales, flags, jobs, manifest, stem, tool } from './lib.mjs';

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

  const sets = f.set || ['main', 'categories'];
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
  const wantClip = (c) => !f.clips || f.clips.includes(c);

  if (sets.includes('main')) {
    for (const j of jobs(m, { only: f.only, grounds: f.grounds, schemes: f.schemes, sizes: f.sizes, pt: f.pt, scales: f.scales })) {
      const clips = clipScales(m, j.sizeName).includes(j.scale) ? (j.ill.clipsBySize?.[j.sizeName] ?? j.ill.clips) : [];
      for (const clip of [...clips, 'still'].filter(wantClip)) {
        const name = stem(j.ill.name, clip, j.ground, j.size, j.scale);
        await one(clip === 'still' ? `${name} (still)` : name, path.join(FRAMES, clip === 'still' ? `${name}.still` : name),
          { object: j.ill.object, size: j.size, scale: j.scale, ground: j.color, ...(j.dark ? { dark: j.dark } : {}), clip, ...(j.ground.endsWith('-dark') ? j.ill.darkTones : {}) },
          { name: j.ill.name, groundId: j.ground, sizeName: j.sizeName });
      }
    }
  }
  // Category cards: opaque, on the category's tile step (light: tile over a shade toward 800; dark: tileDark toward 900).
  if (sets.includes('categories') && m.categories) {
    const c = m.categories;
    for (const it of c.items) {
      if (f.only && !f.only.includes(it.id)) continue;
      for (const scheme of ['light', 'dark'].filter((x) => !f.schemes || f.schemes.includes(x))) {
        const ramp = m.ramps[it.ramp];
        const [ground, dark] = scheme === 'light' ? [ramp.tile ?? ramp['100'], ramp['800']] : [ramp.tileDark ?? ramp['800'], ramp['900']];
        for (const scale of c.scales.filter((x) => !f.scales || f.scales.includes(String(x)))) {
          for (const clip of [...c.clips, 'still'].filter(wantClip)) {
            const name = stem(it.id, clip, scheme, c.size, scale);
            await one(`categories/${name}${clip === 'still' ? ' (still)' : ''}`, path.join(FRAMES, 'categories', clip === 'still' ? `${name}.still` : name),
              { object: it.object, size: c.size, height: c.height, scale, ground, dark, opaque: true, margin: c.margin, clip },
              { name: it.id, set: 'categories', groundId: scheme, sizeName: 'card' });
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
