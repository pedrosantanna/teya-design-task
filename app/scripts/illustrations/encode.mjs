// Encodes the rendered frames (scripts/illustrations/.frames, from render.mjs) into the app's assets and writes
// src/design-system/components/Illustration/manifest.generated.ts.
//
//   cd app && npx -y -p sharp@0.34.5 node scripts/illustrations/encode.mjs [--only basket,box] [--prune]
// --prune (with no --only) also deletes assets it did not write (dropped from the manifest). It is opt-in because
// .frames/ is gitignored and may hold only part of the set on another checkout.
//
// Each clip becomes an animated WebP. Lossless and lossy (q90) are both encoded; lossless is kept when it fits the
// budget and is no more than 10% bigger than lossy, else the smaller one. Entry clips play once, idle clips loop.
// The still is a PNG of the rest pose (lossless, or a 256-colour palette when needed to fit the budget).
// Uses img2webp (brew install webp) when it is on PATH, else sharp. Budgets come from manifest.json.
//
// Video (manifest.json, "video"): every clip on a flat ground is also encoded as MP4 H.264 (yuv420p, BT.709 limited
// range, CRF, faststart) and WebM VP9 for the web, composited on the ground colour (video has no alpha). Needs ffmpeg
// on PATH. The ground is nudged by at most 2 per channel so the decoded video lands on the token colour (tuneGround).
// Clips on a ground listed in video.keepWebp stay WebP (Getting started crossfades its ground, so it needs alpha).
// Exits with 1 when a file is over budget.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { ASSETS, FRAMES, GENERATED, HERE, categoryColors, clipScales, flags, manifest, tool } from './lib.mjs';

const f = flags();
const m = manifest();
const KB = 1024;
const hasImg2webp = (() => {
  try {
    execFileSync('img2webp', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();
const sharp = await tool('sharp', 'npx -y -p sharp@0.34.5 node scripts/illustrations/encode.mjs');

if (!existsSync(FRAMES)) throw new Error('No frames: run render.mjs first.');

const framesOf = (dir) => readdirSync(dir).filter((x) => x.endsWith('.png')).sort().map((x) => path.join(dir, x));

async function webp(files, fps, loop, mode, delays = null) {
  const delay = Math.round(1000 / fps);
  const q = mode === 'lossless' ? null : +mode.slice(1);
  if (hasImg2webp && !delays) {
    const out = path.join(tmpdir(), `ill-${process.pid}-${mode}.webp`);
    const args = ['-min_size', '-loop', String(loop), '-d', String(delay), ...(q ? ['-lossy', '-q', String(q)] : ['-lossless']), '-m', '4', ...files, '-o', out];
    execFileSync('img2webp', args, { stdio: 'ignore' });
    const buf = readFileSync(out);
    rmSync(out);
    return buf;
  }
  const opts = { loop, delay: delays ?? files.map(() => delay), effort: 4, minSize: true, ...(q ? { quality: q, alphaQuality: 100 } : { lossless: true }) };
  return sharp(files, { join: { animated: true } }).webp(opts).toBuffer();
}

// fadeBottom (pt, from the manifest's welcome frame): a window onto a larger scene dissolves into the ground over its
// last fadeBottom pt. The ramp is how Apple fades art into a ground: long, eased at both ends (smootherstep: its slope
// and curvature are 0 where it starts and ends, so no edge or band shows), and with a progressive blur that grows down
// the ramp (0 to BLUR pt, four levels cross-faded row by row), so the detail softens as it thins instead of going
// translucent and sharp. The ground stays transparent: the page's colour crossfades while the shopper drags.
// dim (a scheme's item.dim in the manifest, e.g. 0.9 for the dark crossroads): the colour is multiplied by it, alpha untouched,
// so a cream scene sits calmer on a dark ground.
const BLUR = 5; // pt of Gaussian sigma at the bottom edge
const LEVELS = 4;
const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
async function faded(file, meta) {
  if (meta.dim && meta.dim !== 1) file = await sharp(file).ensureAlpha().modulate({ brightness: meta.dim }).png().toBuffer();
  if (!meta.fadeBottom) return sharp(file);
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const n = width * height;
  // Blur premultiplied colour, so the transparent ground does not darken the edges.
  const pm = Buffer.alloc(n * 4);
  for (let i = 0; i < n * 4; i += 4) {
    const a = data[i + 3] / 255;
    pm[i] = data[i] * a;
    pm[i + 1] = data[i + 1] * a;
    pm[i + 2] = data[i + 2] * a;
    pm[i + 3] = data[i + 3];
  }
  // Each level is the premultiplied image blurred by its share of BLUR, as floats via 16-bit-free raw 8-bit copies.
  const levels = [pm];
  for (let k = 1; k < LEVELS; k++) {
    const sigma = (BLUR * meta.scale * k) / (LEVELS - 1);
    levels.push(await sharp(pm, { raw: { width, height, channels: 4 } }).blur(Math.max(sigma, 0.3)).raw().toBuffer());
  }
  const fh = Math.round(meta.fadeBottom * meta.scale);
  const out = Buffer.alloc(n * 4);
  for (let y = 0; y < height; y++) {
    const t = Math.min(1, Math.max(0, (y - (height - fh)) / fh));
    const mask = 1 - smootherstep(t);
    const pos = t * (LEVELS - 1);
    const lo = Math.min(LEVELS - 2, Math.floor(pos));
    const w = pos - lo;
    const A = levels[lo];
    const B = levels[lo + 1];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = (A[i + 3] * (1 - w) + B[i + 3] * w) / 255;
      if (a <= 0) continue;
      for (let c = 0; c < 3; c++) out[i + c] = Math.min(255, Math.round((A[i + c] * (1 - w) + B[i + c] * w) / a));
      out[i + 3] = Math.round(a * 255 * mask);
    }
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function still(file, limit, meta = {}) {
  const src = await faded(file, meta);
  let buf = await src.clone().png({ compressionLevel: 9, effort: 10 }).toBuffer();
  let note = 'png';
  if (buf.length > limit) {
    buf = await src.clone().png({ palette: true, colours: 256, dither: 0, compressionLevel: 9, effort: 10 }).toBuffer();
    note = 'png8';
  }
  return { buf, note };
}

// Lossless, else lossy q90, else q75; if none fits, the same at half the frame rate (every other frame, the last
// frame kept so the clip still ends on the rest pose). Over budget after that: the smallest is written and flagged.
async function anim(files, meta, limit) {
  const loop = meta.clip === 'entry' ? 1 : 0;
  const tried = [];
  const half = files.filter((_, i) => i % 2 === 0 || i === files.length - 1);
  for (const [set, fps, tag] of [[files, meta.fps, ''], [half, meta.fps / 2, ' at half rate']]) {
    if (set.length < 2) continue;
    for (const mode of ['lossless', 'q90', 'q75']) {
      const buf = await webp(set, fps, loop, mode);
      tried.push({ buf, label: `${mode}${tag}`, fps });
      if (buf.length <= limit) return { buf, fps, note: `${mode}${tag} (tried ${tried.map((t) => `${t.label} ${(t.buf.length / KB).toFixed(0)}`).join(', ')} KB)` };
    }
  }
  // Last resort: half rate while parts move, quarter rate once the scene has settled (under 2% of pixels change
  // per frame, e.g. the crossroads' people shifting after the blocks land), with per-frame delays.
  const tapered = await taper(files, meta.fps);
  if (tapered) {
    for (const mode of ['lossless', 'q90']) {
      const buf = await webp(tapered.files, meta.fps / 2, loop, mode, tapered.delays);
      tried.push({ buf, label: `${mode} tapered`, fps: meta.fps / 2 });
      if (buf.length <= limit) return { buf, fps: meta.fps / 2, note: `${mode} tapered (tried ${tried.map((t) => `${t.label} ${(t.buf.length / KB).toFixed(0)}`).join(', ')} KB)` };
    }
  }
  const best = tried.reduce((a, b) => (b.buf.length < a.buf.length ? b : a));
  return { buf: best.buf, fps: best.fps, note: `OVER: smallest ${best.label} (tried ${tried.map((t) => `${t.label} ${(t.buf.length / KB).toFixed(0)}`).join(', ')} KB)` };
}

async function taper(files, fps) {
  const raws = [];
  for (const file of files) raws.push(await sharp(file).ensureAlpha().raw().toBuffer());
  const moved = raws.map((b, i) => {
    if (i === 0) return Infinity;
    const a = raws[i - 1];
    let n = 0;
    for (let j = 0; j < b.length; j += 4) if (Math.abs(b[j] - a[j]) + Math.abs(b[j + 1] - a[j + 1]) + Math.abs(b[j + 2] - a[j + 2]) + Math.abs(b[j + 3] - a[j + 3]) > 24) n++;
    return n / (b.length / 4);
  });
  const frameMs = 1000 / fps;
  const kept = [];
  const delays = [];
  let settled = false;
  for (let i = 0; i < files.length; i++) {
    settled ||= moved[i] < 0.02 && i > 0;
    const step = settled ? 4 : 2;
    const last = i === files.length - 1;
    if (kept.length && !last && (i - kept.at(-1).i) < step) continue;
    if (kept.length) delays[delays.length - 1] = Math.round((i - kept.at(-1).i) * frameMs);
    kept.push({ i, file: files[i] });
    delays.push(Math.round(frameMs));
  }
  if (kept.length >= files.length / 2) return null;
  return { files: kept.map((k) => k.file), delays };
}

// --- Video -------------------------------------------------------------------------------------------------
const V = m.video;
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], ...opts });
const hex2 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const tmp = path.join(tmpdir(), `ill-video-${process.pid}`);
mkdirSync(tmp, { recursive: true });
const SCALE = 'scale=out_color_matrix=bt709:out_range=tv';
const TAGS = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv'];
const groundPng = async (rgb, px, file, pxH = px) => {
  await sharp({ create: { width: px, height: pxH, channels: 3, background: { r: rgb[0], g: rgb[1], b: rgb[2] } } }).png().toFile(file);
  return file;
};
// What a player shows for a flat ground after H.264: encode a 16 px square, decode it with the tags honoured.
async function roundTrip(rgb) {
  const png = await groundPng(rgb, 16, path.join(tmp, 'g.png'));
  const mp4 = path.join(tmp, 'g.mp4');
  sh('ffmpeg', ['-v', 'error', '-y', '-loop', '1', '-framerate', '1', '-t', '2', '-i', png, '-vf', `format=rgb24,${SCALE},format=yuv420p`, '-c:v', 'libx264', '-crf', String(V.crf), ...TAGS, mp4]);
  const out = sh('ffmpeg', ['-v', 'error', '-y', '-i', mp4, '-vf', 'select=eq(n\\,0),format=rgb24,crop=1:1:0:0', '-frames:v', '1', '-f', 'rawvideo', '-'], { maxBuffer: 1 << 20 });
  return [...out.subarray(0, 3)];
}
const tuned = new Map();
// The ground colour to composite on so the decoded video lands as close as possible to the token: BT.709 limited range
// in 8 bits cannot hit every RGB value, so the closest of the ±2 neighbours wins. Returns { input, got, err }.
async function tuneGround(hex) {
  if (tuned.has(hex)) return tuned.get(hex);
  const want = hex2(hex);
  let best = null;
  for (let dr = -2; dr <= 2; dr++) for (let dg = -2; dg <= 2; dg++) for (let db = -2; db <= 2; db++) {
    const input = [want[0] + dr, want[1] + dg, want[2] + db];
    if (input.some((x) => x < 0 || x > 255)) continue;
    const got = await roundTrip(input);
    const err = Math.max(...got.map((x, i) => Math.abs(x - want[i])));
    const move = Math.abs(dr) + Math.abs(dg) + Math.abs(db);
    if (!best || err < best.err || (err === best.err && move < best.move)) best = { input, got, err, move };
  }
  tuned.set(hex, best);
  return best;
}
const hasFfmpeg = (() => { try { sh('ffmpeg', ['-version']); return true; } catch { return false; } })();
// Frames in <dir> → <outDir>/<d>.mp4 on the (tuned) ground. Returns the rows to print.
// srgb: tag the stream's transfer as sRGB (and the primaries as BT.709, which sRGB shares). Without a transfer tag
// Chrome on macOS decodes a flat Indigo 300 ground 9 levels lighter than the token, which shows as a box against the
// page; with it the decoded ground is within 1 of the token (measured in Chrome, light and dark).
// Every clip is tagged with the sRGB transfer (a lossless remux): with bt709 alone Chrome decoded flat grounds a few
// levels off the token, so each clip showed as a box on its ground (visual sweep, round 16).
async function videos(dir, d, meta, outDir, srgb = true) {
  const t = await tuneGround(meta.ground);
  // The ground is the frame's size: a bleed window is taller than wide (meta.pxH), and the overlay takes its size.
  const pxH = meta.pxH ?? meta.px;
  const png = await groundPng(t.input, meta.px, path.join(tmp, `ground-${meta.px}x${pxH}-${t.input.join('-')}.png`), pxH);
  const out = [];
  const graph = `[0]format=gbrp[bg];[1]format=rgba[fg];[bg][fg]overlay=shortest=1:format=gbrp,format=rgb24,${SCALE},format=yuv420p`;
  const input = ['-v', 'error', '-y', '-loop', '1', '-framerate', String(meta.fps), '-i', png, '-framerate', String(meta.fps), '-i', path.join(dir, 'frame-%04d.png'), '-filter_complex', graph];
  const codecs = {
    // One keyframe per clip (-g: its frame count): a loop only ever seeks to its first frame, and x264's default
    // of a keyframe every 250 frames cost the 14 s Getting started loop a second full picture.
    mp4: ['-c:v', 'libx264', '-preset', 'veryslow', '-crf', String(m.welcome?.items?.find((i) => meta.set === 'welcome' && i.name === meta.name)?.crf ?? V.crf), '-g', String(Math.max(1, meta.frames)), '-movflags', '+faststart'],
  };
  for (const ext of V.formats) {
    const file = path.join(outDir, `${d}.${ext}`);
    sh('ffmpeg', [...input, ...codecs[ext], ...TAGS, '-an', file]);
    if (srgb) {
      const tagged = `${file}.tagged.mp4`;
      sh('ffmpeg', ['-v', 'error', '-y', '-i', file, '-c', 'copy', '-bsf:v', 'h264_metadata=transfer_characteristics=13:colour_primaries=1:matrix_coefficients=1', '-movflags', '+faststart', tagged]);
      renameSync(tagged, file);
    }
    written.add(file);
    out.push({ file: path.relative(ASSETS, file), kb: statSync(file).size / KB, frames: meta.frames, note: `${ext}, ground ${meta.ground} decodes as ${t.got.map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()} (off by ${t.err})` });
  }
  return out;
}

// One frame set: <dir> → <outDir>/<stem>.png or .webp (and .mp4).
const rows = [];
const written = new Set();
async function encode(dir, outDir, limits) {
  const d = path.basename(dir);
  const meta = JSON.parse(readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  if (f.only && !f.only.includes(meta.name)) return;
  if (meta.clip !== 'still' && meta.set !== 'categories' && !clipScales(m, meta.sizeName).includes(meta.scale)) return; // stale frames of a dropped scale
  const files = framesOf(dir);
  const isStill = meta.clip === 'still';
  const out = path.join(outDir, isStill ? `${d.replace(/\.still$/, '')}.png` : `${d}.webp`);
  const own = meta.set === 'welcome' ? m.welcome.items.find((i) => i.name === meta.name)?.animationKB : undefined;
  const limit = meta.set === 'welcome' && m.welcome?.budgets ? (isStill ? (m.welcome.items.find((i) => i.name === meta.name)?.stillKB ?? m.welcome.budgets.stillKB) : own ?? m.welcome.budgets.animationKB) * KB : isStill ? limits.still : limits.anim;
  mkdirSync(outDir, { recursive: true });
  // A welcome item with "video": true is an MP4 baked on its page's ground (the hero's entry: 1.4 MB as WebP, a few
  // hundred KB as H.264). The screen shows the transparent still instead while the shopper drags, so no edge shows.
  const heroVideo = meta.set === 'welcome' && !isStill && !!m.welcome.items.find((i) => i.name === meta.name)?.video;
  const asVideo = V && hasFfmpeg && !isStill && meta.set !== 'categories' && (heroVideo || (meta.set !== 'welcome' && !(V.keepWebp || []).includes(meta.groundId.replace(/-(light|dark)$/, ''))));
  let clipFiles = files;
  let clipDir = dir;
  if (!isStill && meta.fadeBottom) {
    // The clip's frames get the same lower fade as the still, so the hand-off to the still shows no change.
    const dst = path.join(tmpdir(), `ill-fade-${process.pid}-${d}`);
    mkdirSync(dst, { recursive: true });
    clipFiles = [];
    for (const file of files) {
      const out = path.join(dst, path.basename(file));
      await (await faded(file, meta)).png().toFile(out);
      clipFiles.push(out);
    }
    clipDir = dst;
  }
  if (asVideo) {
    for (const r of await videos(clipDir, d, meta, outDir)) rows.push({ ...r, ok: true });
    if (V.replaceWebp) return;
  }
  const { buf, note } = isStill ? await still(files[0], limit, meta) : await anim(clipFiles, meta, limit);
  writeFileSync(out, buf);
  written.add(out);
  rows.push({ file: path.relative(ASSETS, out), kb: buf.length / KB, frames: files.length, note, ok: buf.length <= limit });
}

const files0 = (p) => (existsSync(p) ? readdirSync(p).sort() : []);
const subdirs = (p) => (existsSync(p) ? readdirSync(p).filter((d) => statSync(path.join(p, d)).isDirectory() && existsSync(path.join(p, d, 'meta.json'))).sort() : []);
for (const d of subdirs(FRAMES)) {
  await encode(path.join(FRAMES, d), ASSETS, { anim: m.budgets.animationKB * KB, still: m.budgets.stillKB * KB });
}
const CAT = path.join(FRAMES, 'categories');
if (m.categories) {
  for (const d of subdirs(CAT)) {
    await encode(path.join(CAT, d), path.join(ASSETS, 'categories'), { anim: (m.categories.budgets.entryKB ?? m.budgets.animationKB) * KB, still: m.categories.budgets.stillKB * KB });
  }
}

// --prune on a full run removes assets it did not write: illustrations, sizes or clips dropped from the manifest.
if (!f.only && f.prune) {
  for (const dir of [ASSETS, path.join(ASSETS, 'categories')]) {
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      const p = path.join(dir, file);
      if (/\.(webp|png|mp4)$/.test(file) && !written.has(p)) {
        rmSync(p);
        console.log(`- removed ${path.relative(ASSETS, p)}`);
      }
    }
  }
}
// Category stills are transparent and shaded for their kind's tile token (color.shop.accent.<ramp>.tile), and the app
// composites them over that tile. Two checks: the top-left pixel is fully transparent (nothing is baked on a ground),
// and the tile each still was shaded for (categories.grounds.json, written from this run's frames) is still the
// token's value. A changed token leaves the cast shadow tone off: re-render that kind.
const stale = [];
const CAT_RE = /^([a-z0-9]+)\.(light|dark)\.\d+@\dx\.png$/;
const GROUNDS = path.join(HERE, 'categories.grounds.json');
const shaded = existsSync(GROUNDS) ? JSON.parse(readFileSync(GROUNDS, 'utf8')) : {};
for (const d of subdirs(path.join(FRAMES, 'categories'))) {
  const meta = JSON.parse(readFileSync(path.join(FRAMES, 'categories', d, 'meta.json'), 'utf8'));
  if (meta.clip === 'still' && !f.only) shaded[`${meta.name}.${meta.groundId}`] = meta.ground;
}
if (!f.only) writeFileSync(GROUNDS, `${JSON.stringify(Object.fromEntries(Object.entries(shaded).sort()), null, 2)}\n`);
for (const file of files0(path.join(ASSETS, 'categories'))) {
  const mt = file.match(CAT_RE);
  if (!mt) continue;
  const item = m.categories?.items.find((i) => i.id === mt[1]);
  if (!item) continue;
  const want = categoryColors(item.ramp, mt[2]).ground;
  const { data } = await sharp(path.join(ASSETS, 'categories', file)).ensureAlpha().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  if (!m.categories.opaque && data[3] !== 0) stale.push(`${file}: top-left pixel is not transparent (alpha ${data[3]})`);
  const got = shaded[`${mt[1]}.${mt[2]}`];
  if (got && got.toUpperCase() !== want.toUpperCase()) stale.push(`${file}: shaded for ${got}, token ${want} (color.shop.accent.${item.ramp}.tile, ${mt[2]})`);
}
if (stale.length) {
  console.error(`\n✗ ${stale.length} category still${stale.length === 1 ? '' : 's'} out of date. Re-render them:`);
  for (const x of stale) console.error(`  ${x}`);
}
const over = rows.filter((r) => !r.ok).length;
for (const r of rows) console.log(`${r.ok ? '✓' : '✗'} ${r.file.padEnd(56)} ${r.kb.toFixed(1).padStart(6)} KB  ${String(r.frames).padStart(3)} fr  ${r.note}`);
console.log(`${rows.length} files, ${(rows.reduce((a, r) => a + r.kb, 0) / 1024).toFixed(2)} MB${over ? `, ${over} over budget` : ''}`);

// --- manifest.generated.ts: every asset on disk (not only this run), durations from the frames' meta.json ---
const durations = {};
for (const [root, d] of [...subdirs(FRAMES).map((d) => [FRAMES, d]), ...subdirs(CAT).map((d) => [CAT, d])]) {
  const meta = JSON.parse(readFileSync(path.join(root, d, 'meta.json'), 'utf8'));
  durations[`${meta.set === 'categories' ? 'categories' : 'main'}/${meta.name}-${meta.clip}.${meta.groundId}.${meta.size}`] = meta.durationMs;
}
const ms = (set, name, clip, ground, size) => durations[`${set}/${name}-${clip}.${ground}.${size}`] ?? 0;
const RE = /^([a-z0-9]+)(?:-(entry|idle))?\.([a-z]+(?:-(?:light|dark))?)\.(\d+)@(\d)x\.(webp|png|mp4)$/;
const files = (p) => (existsSync(p) ? readdirSync(p).sort() : []);

const main = {};
for (const file of files(ASSETS)) {
  const mt = file.match(RE);
  if (!mt) continue;
  const [, name, clip = 'still', ground, size, , ext] = mt;
  const sizeName = Object.keys(m.sizes).find((k) => m.sizes[k] === +size);
  if (!sizeName) continue;
  const a = (((main[name] ??= {})[ground] ??= {})[sizeName] ??= {});
  const base = `${name}${clip === 'still' ? '' : `-${clip}`}.${ground}.${size}.${ext}`;
  const c = (a[clip] ??= { ms: ms('main', name, clip, ground, size) });
  c[ext === 'mp4' ? 'video' : 'base'] = base;
  if (ext === 'mp4' || !c.file) c.file = file;
}
const cats = {};
for (const file of files(path.join(ASSETS, 'categories'))) {
  const mt = file.match(RE);
  if (!mt) continue;
  const [, id, clip = 'still', scheme, size, , ext] = mt;
  if (ext === 'mp4') continue;
  const a = ((cats[id] ??= {})[scheme] ??= {});
  a[clip] = { base: `categories/${id}${clip === 'still' ? '' : `-${clip}`}.${scheme}.${size}.${ext}`, ms: ms('categories', id, clip, scheme, size) };
}

// A clip's length when no frames are on disk (.frames is gitignored): read it from the asset itself, the sum of an
// animated WebP's frame delays or an MP4's duration (ffprobe). Without it ms stays 0, and the screen would hand an
// entry over to the idle loop (or the still) the moment it starts.
async function lengthOf(file) {
  const p = path.join(ASSETS, file);
  try {
    if (file.endsWith('.webp')) {
      const md = await sharp(p, { animated: true }).metadata();
      return Math.round((md.delay ?? []).reduce((a, b) => a + b, 0));
    }
    if (file.endsWith('.mp4')) return Math.round(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]).toString().trim() * 1000);
  } catch {
    // leave 0
  }
  return 0;
}
for (const byGround of Object.values(main))
  for (const bySize of Object.values(byGround))
    for (const clips of Object.values(bySize))
      for (const [clip, a] of Object.entries(clips)) if (clip !== 'still' && !a.ms) a.ms = await lengthOf(a.file);

const req = (base) => `require('../../../../assets/illustrations/${base}')`;
const clipOf = (a, c) => (a[c] ? `, ${c}: { ${[a[c].video && `video: ${req(a[c].video)}`, a[c].base && `source: ${req(a[c].base)}`].filter(Boolean).join(', ')}, ms: ${a[c].ms} }` : '');
const union = (keys) => keys.map((n) => `'${n}'`).join(' | ') || 'never';
const L = [
  '// Generated by app/scripts/illustrations/encode.mjs from app/assets/illustrations. Do not edit.',
  '// Each asset is required by its base name; Metro picks the @2x or @3x file for the screen.',
  '',
  `export const ILLUSTRATION_SIZES = { ${Object.entries(m.sizes).map(([k, v]) => `${k}: ${v}`).join(', ')} } as const;`,
  '/** Sizes taller than wide (a bleed hero is a window onto a scene); every other size is square. */',
  `export const ILLUSTRATION_HEIGHTS: Partial<Record<keyof typeof ILLUSTRATION_SIZES, number>> = { ${Object.entries(m.heights ?? {}).map(([k, v]) => `${k}: ${v}`).join(', ')} };`,
  'export type IllustrationSize = keyof typeof ILLUSTRATION_SIZES;',
  `export type IllustrationName = ${union(Object.keys(main))};`,
  "/** welcome: Getting started, each object on its own page's ground; location: the location ask's ground (scripts/illustrations/manifest.json). */",
  "export type IllustrationGround = 'background' | 'card' | 'welcome' | 'location';",
  "export type IllustrationScheme = 'light' | 'dark';",
  "/** An MP4 (video, H.264, baked on the ground, for flat grounds) and/or an animated WebP (source, with alpha); ms is its length. */",
  'export type IllustrationClip = { video?: number; source?: number; ms: number };',
  'export type IllustrationAsset = { still: number; entry?: IllustrationClip; idle?: IllustrationClip };',
  'type Grounds = Partial<Record<`${IllustrationGround}-${IllustrationScheme}`, Partial<Record<IllustrationSize, IllustrationAsset>>>>;',
  '',
  '/** name → `<ground>-<scheme>` → size → asset. Transparent, shaded for that ground. Uses: scripts/illustrations/manifest.json. */',
  'export const ILLUSTRATIONS: Record<IllustrationName, Grounds> = {',
];
for (const n of Object.keys(main)) {
  L.push(`  ${n}: {`);
  for (const g of Object.keys(main[n]).sort()) {
    L.push(`    '${g}': {`);
    for (const s of Object.keys(m.sizes).filter((k) => main[n][g][k]?.still)) {
      const a = main[n][g][s];
      L.push(`      ${s}: { still: ${req(a.still.base)}${clipOf(a, 'entry')}${clipOf(a, 'idle')} },`);
    }
    L.push('    },');
  }
  L.push('  },');
}
L.push('};', '');
const catSize = m.categories?.size ?? 120;
const catHeight = m.categories?.height ?? catSize;
L.push(
  `/** Category cards on Nearby: transparent ${catSize} × ${catHeight} pt (theme.size.category), shaded for the card's tile colour and drawn over it, the object centred in the top ${catSize} × ${catSize}. */`,
  `export type CategoryId = ${union(Object.keys(cats))};`,
  `export const CATEGORY_LABELS: Record<CategoryId, string> = { ${(m.categories?.items || []).filter((i) => cats[i.id]).map((i) => `${i.id}: ${JSON.stringify(i.label)}`).join(', ')} };`,
  'export const CATEGORY_ILLUSTRATIONS: Record<CategoryId, Partial<Record<IllustrationScheme, { still: number; entry?: IllustrationClip }>>> = {',
);
for (const id of Object.keys(cats)) {
  L.push(`  ${id}: {`);
  for (const sc of ['light', 'dark'].filter((x) => cats[id][x]?.still)) L.push(`    ${sc}: { still: ${req(cats[id][sc].still.base)}${clipOf(cats[id][sc], 'entry')} },`);
  L.push('  },');
}
L.push('};', '');
mkdirSync(path.dirname(GENERATED), { recursive: true });
writeFileSync(GENERATED, L.join('\n'));
console.log(`wrote ${path.relative(process.cwd(), GENERATED)}`);
rmSync(tmp, { recursive: true, force: true });
process.exit(over || stale.length ? 1 : 0);
