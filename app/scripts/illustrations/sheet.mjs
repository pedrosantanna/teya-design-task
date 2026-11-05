// Contact sheet of the shipped stills, composited on their ground, to review each object's angle and framing.
//
//   cd app && npx -y -p sharp@0.34.5 node scripts/illustrations/sheet.mjs <out-dir> [--assets <dir>]
// Writes <out-dir>/categories-{light,dark}.png (every category card, @3x, on its tile token with the card's
// corner radius) and <out-dir>/other-{light,dark}.png (every non-category still on its ground).
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

import { ASSETS, categoryColors, flags, manifest, tokenHex, tool } from './lib.mjs';

const f = flags();
const out = process.argv[2];
if (!out || out.startsWith('--')) throw new Error('Usage: sheet.mjs <out-dir> [--assets <dir>]');
const assets = f.assets || ASSETS;
const m = manifest();
const sharp = await tool('sharp', 'npx -y -p sharp@0.34.5 node scripts/illustrations/sheet.mjs <out-dir>');
mkdirSync(out, { recursive: true });

const welcomeGround = { 'welcome-light': ['#B5BFFF', '#FEC5B2', '#C5DEAE'], 'welcome-dark': ['#222169', '#52352C', '#34422C'] };
async function sheet(cells, file, cols, w, h) {
  const rows = Math.ceil(cells.length / cols);
  const gap = 12;
  const comps = [];
  for (const [i, c] of cells.entries()) {
    const img = await sharp(c.file).resize({ width: w, height: h, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const tile = await sharp({ create: { width: w, height: h, channels: 4, background: c.ground } }).composite([{ input: img }]).png().toBuffer();
    comps.push({ input: tile, left: gap + (i % cols) * (w + gap), top: gap + Math.floor(i / cols) * (h + gap) });
  }
  await sharp({ create: { width: gap + cols * (w + gap), height: gap + rows * (h + gap), channels: 3, background: '#808080' } }).composite(comps).png().toFile(file);
  console.log(`wrote ${file} (${cells.length} cells)`);
}

for (const scheme of ['light', 'dark']) {
  const cat = [];
  for (const it of m.categories.items) {
    const file = path.join(assets, 'categories', `${it.id}.${scheme}.120@3x.png`);
    if (existsSync(file)) cat.push({ file, ground: categoryColors(it.ramp, scheme).ground });
  }
  await sheet(cat, path.join(out, `categories-${scheme}.png`), 5, 360, 492);
  const other = [];
  for (const file of readdirSync(assets).filter((x) => x.endsWith('.png') && x.includes(`-${scheme}.`) && x.endsWith('@3x.png')).sort()) {
    const g = file.split('.')[1].replace(/-(light|dark)$/, '');
    const name = file.split('.')[0];
    let ground;
    if (g === 'welcome') ground = welcomeGround[`welcome-${scheme}`][['crossroads', 'shop', 'box'].indexOf(name)] ?? '#888888';
    else ground = tokenHex(scheme, `color.${g}`);
    other.push({ file: path.join(assets, file), ground });
  }
  await sheet(other, path.join(out, `other-${scheme}.png`), 5, 360, 360);
}
