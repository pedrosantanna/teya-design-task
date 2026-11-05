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
// Exits with 1 when a file is over budget.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { ASSETS, FRAMES, GENERATED, categoryColors, clipScales, flags, manifest, tool } from './lib.mjs';

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

async function still(file, limit) {
  let buf = await sharp(file).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  let note = 'png';
  if (buf.length > limit) {
    buf = await sharp(file).png({ palette: true, colours: 256, dither: 0, compressionLevel: 9, effort: 10 }).toBuffer();
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

// One frame set: <dir> → <outDir>/<stem>.png or .webp.
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
  const limit = meta.set === 'welcome' && m.welcome?.budgets ? (isStill ? m.welcome.budgets.stillKB : m.welcome.budgets.animationKB) * KB : isStill ? limits.still : limits.anim;
  const { buf, note } = isStill ? await still(files[0], limit) : await anim(files, meta, limit);
  mkdirSync(outDir, { recursive: true });
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
      if (/\.(webp|png)$/.test(file) && !written.has(p)) {
        rmSync(p);
        console.log(`- removed ${path.relative(ASSETS, p)}`);
      }
    }
  }
}
// Every category still on disk (not only this run's) must be baked on its kind's tile token for its scheme: the
// top-left pixel is ground, so it must match color.shop.accent.<ramp>.tile within 2 per channel. A mismatch means
// the token changed after the still was rendered (it shows as a box on the card): re-render that kind.
const stale = [];
const CAT_RE = /^([a-z0-9]+)\.(light|dark)\.\d+@\dx\.png$/;
for (const file of files0(path.join(ASSETS, 'categories'))) {
  const mt = file.match(CAT_RE);
  if (!mt) continue;
  const item = m.categories?.items.find((i) => i.id === mt[1]);
  if (!item) continue;
  const want = categoryColors(item.ramp, mt[2]).ground;
  const { data } = await sharp(path.join(ASSETS, 'categories', file)).extract({ left: 0, top: 0, width: 1, height: 1 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const got = `#${[...data.subarray(0, 3)].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  const off = [1, 3, 5].some((i, k) => Math.abs(parseInt(want.slice(i, i + 2), 16) - data[k]) > 2);
  if (off) stale.push(`${file}: corner ${got}, token ${want} (color.shop.accent.${item.ramp}.tile, ${mt[2]})`);
}
if (stale.length) {
  console.error(`\n✗ ${stale.length} category still${stale.length === 1 ? '' : 's'} baked on a stale tile colour. Re-render them:`);
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
const RE = /^([a-z0-9]+)(?:-(entry|idle))?\.([a-z]+(?:-(?:light|dark))?)\.(\d+)@(\d)x\.(webp|png)$/;
const files = (p) => (existsSync(p) ? readdirSync(p).sort() : []);

const main = {};
for (const file of files(ASSETS)) {
  const mt = file.match(RE);
  if (!mt) continue;
  const [, name, clip = 'still', ground, size, , ext] = mt;
  const sizeName = Object.keys(m.sizes).find((k) => m.sizes[k] === +size);
  if (!sizeName) continue;
  const a = (((main[name] ??= {})[ground] ??= {})[sizeName] ??= {});
  a[clip] = { base: `${name}${clip === 'still' ? '' : `-${clip}`}.${ground}.${size}.${ext}`, ms: ms('main', name, clip, ground, size) };
}
const cats = {};
for (const file of files(path.join(ASSETS, 'categories'))) {
  const mt = file.match(RE);
  if (!mt) continue;
  const [, id, clip = 'still', scheme, size, , ext] = mt;
  const a = ((cats[id] ??= {})[scheme] ??= {});
  a[clip] = { base: `categories/${id}${clip === 'still' ? '' : `-${clip}`}.${scheme}.${size}.${ext}`, ms: ms('categories', id, clip, scheme, size) };
}

const req = (base) => `require('../../../../assets/illustrations/${base}')`;
const clipOf = (a, c) => (a[c] ? `, ${c}: { source: ${req(a[c].base)}, ms: ${a[c].ms} }` : '');
const union = (keys) => keys.map((n) => `'${n}'`).join(' | ') || 'never';
const L = [
  '// Generated by app/scripts/illustrations/encode.mjs from app/assets/illustrations. Do not edit.',
  '// Each asset is required by its base name; Metro picks the @2x or @3x file for the screen.',
  '',
  `export const ILLUSTRATION_SIZES = { ${Object.entries(m.sizes).map(([k, v]) => `${k}: ${v}`).join(', ')} } as const;`,
  'export type IllustrationSize = keyof typeof ILLUSTRATION_SIZES;',
  `export type IllustrationName = ${union(Object.keys(main))};`,
  "/** welcome: Getting started, each object on its own page's Indigo ground (scripts/illustrations/manifest.json, welcome). */",
  "export type IllustrationGround = 'background' | 'card' | 'welcome';",
  "export type IllustrationScheme = 'light' | 'dark';",
  'export type IllustrationClip = { source: number; ms: number };',
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
  `/** Category cards on Nearby: opaque ${catSize} × ${catHeight} pt (theme.size.category) in the card's tile colour, the object in the top ${catSize} × ${catSize}. */`,
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
process.exit(over || stale.length ? 1 : 0);
