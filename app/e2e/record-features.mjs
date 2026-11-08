// Records the short feature videos on the case's Features page (docs/case/features.md) from the web build.
//
// Each clip drives the prototype the way a shopper would (taps and typing, with a tap marker drawn on screen),
// starting at a journey step (`?step=`) to skip setup. The debugger is hidden (`?debug=0`) and the iPhone or
// Pixel frame is forced. The page is laid out at 960 x 1920 and scaled 2x around its centre, so the screencast
// (which Chromium captures at 1x) comes out sharp. Frames are timed from the screencast, then ffmpeg crops the
// phone, encodes H.264 at 30 fps with no audio and writes a PNG poster.
//
// Usage, from app/ with the web build served at RECORD_URL (default http://localhost:4173/app-web/index.html),
// e.g. `python3 site/serve.py 4173` from the repo root after `npm run export:web`:
//   npx -y -p playwright@1.58.2 node e2e/record-features.mjs            # every clip
//   npx -y -p playwright@1.58.2 node e2e/record-features.mjs ask-split  # some clips, by name
// Needs ffmpeg on the PATH. Output: docs/case/media/<name>.mp4 and <name>.png. Frames go to a temp folder.
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { loadPlaywright } from './pw.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(here, '../../docs/case/media');
const BASE = process.env.RECORD_URL || 'http://localhost:4173/app-web/index.html';
const W = 960;
const H = 1920;

// A tap marker, and the 2x scale (added once the document exists).
const INIT = `
addEventListener('pointerdown', (e) => {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;width:84px;height:84px;border-radius:50%;background:rgba(60,60,70,.28);border:3px solid rgba(255,255,255,.85);box-shadow:0 0 0 1px rgba(0,0,0,.15);left:' + (e.clientX - 42) + 'px;top:' + (e.clientY - 42) + 'px;transition:transform .45s ease-out,opacity .45s ease-out;transform:scale(.7);opacity:1';
  document.documentElement.appendChild(d);
  requestAnimationFrame(() => requestAnimationFrame(() => { d.style.transform = 'scale(1.25)'; d.style.opacity = '0'; }));
  setTimeout(() => d.remove(), 600);
}, true);
addEventListener('DOMContentLoaded', () => {
  const st = document.createElement('style');
  st.textContent = 'html{overflow:hidden} body{transform:scale(' + (window.__recordScale || 2) + ');transform-origin:50% 50%;height:100vh}';
  document.head.appendChild(st);
});`;

function helpers(p) {
  const sleep = (ms) => p.waitForTimeout(ms);
  const button = (name) => (typeof name === 'string' ? p.getByRole('button', { name, exact: true }) : p.getByRole('button', { name })).first();
  /** Moves to the element, presses and releases like a finger, then waits. */
  const tap = async (target, pause = 800) => {
    const l = typeof target === 'string' || target instanceof RegExp ? button(target) : target;
    await l.waitFor({ state: 'visible', timeout: 15000 });
    const bb = await l.boundingBox();
    await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
    await sleep(120);
    await p.mouse.down();
    await sleep(70);
    await p.mouse.up();
    await sleep(pause);
  };
  /** A smooth scroll of the view under (x, y); dy in screen pixels (2x). */
  // Wheel events don't reach the scaled page's scroll views, so this eases the nearest scrollable ancestor.
  const scroll = async (dy, { x = W / 2, y = H / 2, ms = 700 } = {}) => {
    await p.evaluate(
      ([px, py, d, dur]) =>
        new Promise((done) => {
          let el = document.elementFromPoint(px, py);
          while (el && !(/auto|scroll/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 5)) el = el.parentElement;
          if (!el) return done();
          const from = el.scrollTop;
          const t0 = performance.now();
          const step = (t) => {
            const k = Math.min(1, (t - t0) / dur);
            el.scrollTop = from + (d / 2) * (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
            if (k < 1) requestAnimationFrame(step);
            else done();
          };
          requestAnimationFrame(step);
        }),
      [x, y, dy, ms],
    );
  };
  return { sleep, tap, scroll, button };
}

// ---------- the clips ----------
// poster: seconds into the clip for the poster frame.

const CLIPS = [
  {
    name: 'ask-split',
    query: 'scheme=light',
    poster: 6.6,
    async run(p, { sleep, tap }) {
      await sleep(500);
      await tap(p.getByRole('button', { name: 'Ask Snuffle' }).last(), 1000);
      await p.getByPlaceholder('Ask for anything nearby').last().click();
      await sleep(300);
      await p.keyboard.type('Eclipse glasses for today, and a birthday cake for Saturday', { delay: 38 });
      await sleep(400);
      await p.keyboard.press('Enter');
      await sleep(3000);
      await tap('Split into 2', 3200);
    },
  },
  {
    name: 'shops-answer',
    query: 'scheme=light&step=confirm',
    poster: 19,
    async run(p, { sleep, tap }) {
      await sleep(900);
      await tap('Allow', 0);
      await sleep(19000);
    },
  },
  {
    name: 'buy-and-wait',
    query: 'scheme=light&step=answers',
    poster: 14.6,
    async run(p, { sleep, tap }) {
      await sleep(1000);
      await tap('Buy', 2200);
      await tap(/^Buy, £/, 1500);
      await tap('Confirm with side button', 0);
      await sleep(9500);
    },
  },
  {
    name: 'receipt-code',
    query: 'scheme=light&step=receipt',
    poster: 1,
    async run(p, { sleep, tap, scroll }) {
      await sleep(1600);
      await scroll(500, { ms: 800 });
      await sleep(1400);
      await scroll(-500, { ms: 600 });
      await sleep(500);
      await tap(/^Collection code/, 3000);
    },
  },
  {
    name: 'sold-first',
    query: 'scheme=light&step=sold',
    poster: 1.5,
    async run(p, { sleep, tap, scroll }) {
      await sleep(1600);
      await scroll(-420, { ms: 700 });
      await sleep(1600);
      await scroll(420, { ms: 700 });
      await sleep(900);
      await tap('Buy only 1', 2600);
    },
  },
  {
    name: 'nobody-has-it',
    query: 'scheme=light&step=noShop',
    poster: 1.5,
    async run(p, { sleep, tap }) {
      await sleep(3200);
      await tap('Keep looking', 2200);
      await tap(p.getByRole('button', { name: 'Keep looking', exact: true }).last(), 3000);
    },
  },
  {
    name: 'jess-after-work',
    query: 'scheme=light&persona=jess&step=afterWork',
    poster: 2,
    async run(p, { sleep, tap }) {
      await sleep(2400);
      await tap(p.getByText('At Rossi\'s Bakery', { exact: true }), 1200);
      await tap(p.getByText('At the corner shop', { exact: true }), 1600);
      await tap(/^Buy, £/, 1500);
      await tap('Confirm with side button', 0);
      await sleep(9000);
    },
  },
  {
    name: 'getting-started',
    query: 'scheme=light&firstRun=1',
    poster: 3,
    async run(p, { sleep, tap }) {
      await sleep(4200);
      await tap('Continue', 4200);
      await tap('Continue', 4200);
    },
  },
  {
    name: 'nearby-shop-page',
    // A still of Nearby for the Overview, from the start of this clip.
    still: { name: 'nearby', at: 0.3 },
    query: 'scheme=light',
    poster: 13,
    async run(p, { sleep, tap, scroll }) {
      await sleep(900);
      await tap('Bakery', 2200);
      await tap(p.getByRole('button', { name: /^Rossi's Bakery/ }).last(), 2200);
      await scroll(1300, { ms: 1400 });
      await sleep(1600);
      await scroll(1300, { ms: 1400 });
      await sleep(2400);
    },
  },
  {
    // Android in light: the framed web build shows white corners under the dark screen, so dark isn't recorded.
    name: 'android',
    query: 'scheme=light&os=android&step=answers',
    poster: 1.5,
    // The Pixel frame is taller than the iPhone's, so it is scaled less and cropped wider.
    scale: 1.8,
    crop: 'crop=774:1678:93:122',
    async run(p, { sleep, tap }) {
      await sleep(2000);
      await tap('Buy', 2400);
      await tap(/^Buy, £/, 2600);
    },
  },
];

// ---------- recording ----------

async function record(browser, clip) {
  const frameDir = fs.mkdtempSync(path.join(os.tmpdir(), `snuffle-${clip.name}-`));
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await ctx.addInitScript(`window.__recordScale = ${clip.scale ?? 2};${INIT}`);
  const p = await ctx.newPage();
  const device = /os=android/.test(clip.query) ? 'android' : 'ios';
  await p.goto(`${BASE}?debug=0&frame=${device}&${clip.query}`);
  await p.waitForTimeout(3500);

  const cdp = await ctx.newCDPSession(p);
  const stamps = [];
  let on = true;
  cdp.on('Page.screencastFrame', async (f) => {
    if (on) {
      fs.writeFileSync(path.join(frameDir, `${String(stamps.length).padStart(5, '0')}.jpg`), Buffer.from(f.data, 'base64'));
      stamps.push(f.metadata.timestamp);
    }
    try {
      await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId });
    } catch {}
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H });
  const t0 = Date.now() / 1000;
  await clip.run(p, helpers(p));
  const total = Date.now() / 1000 - t0;
  on = false;
  await cdp.send('Page.stopScreencast');
  await ctx.close();

  // Each frame lasts until the next one arrived; the last one holds to the end of the clip.
  const file = (i) => path.join(frameDir, `${String(i).padStart(5, '0')}.jpg`);
  let list = '';
  for (let i = 0; i < stamps.length; i++) {
    const next = i + 1 < stamps.length ? stamps[i + 1] : Math.max(stamps[i] + 0.4, stamps[0] + total);
    list += `file '${file(i)}'\nduration ${Math.max(0.001, next - stamps[i]).toFixed(4)}\n`;
  }
  list += `file '${file(stamps.length - 1)}'\n`;
  const listFile = path.join(frameDir, 'list.txt');
  fs.writeFileSync(listFile, list);

  // The phone sits centred; crop it to the frame's outer edge (the docs round the corners in CSS).
  const crop = clip.crop ?? 'crop=852:1796:53:62';
  const mp4 = path.join(OUT, `${clip.name}.mp4`);
  const png = path.join(OUT, `${clip.name}.png`);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listFile,
    '-vf', `${crop},scale=450:-2:flags=lanczos,crop=iw-6:ih-6:3:3,pad=iw+6:ih+6:3:3:black,fps=30,format=yuv420p`, '-an', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', '26', '-profile:v', 'high', '-movflags', '+faststart', mp4]);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', String(Math.min(clip.poster, total - 0.2)), '-i', mp4,
    '-frames:v', '1', '-vf', 'split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=none', png]);
  if (clip.still) {
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', String(clip.still.at), '-i', mp4, '-frames:v', '1',
      '-vf', 'split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=none', path.join(OUT, `${clip.still.name}.png`)]);
  }
  fs.rmSync(frameDir, { recursive: true, force: true });
  const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0);
  console.log(`${clip.name}: ${total.toFixed(1)} s, ${stamps.length} frames, ${kb(mp4)} KB video, ${kb(png)} KB poster`);
}

const only = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const { chromium } = loadPlaywright();
const browser = await chromium.launch();
for (const clip of CLIPS.filter((c) => only.length === 0 || only.includes(c.name))) await record(browser, clip);
await browser.close();
