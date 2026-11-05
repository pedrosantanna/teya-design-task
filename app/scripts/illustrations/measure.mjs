// Measures the outline width of rendered stills: the median length of runs of ink-coloured pixels (#1A1714, within a
// distance of 30 in RGB, opaque) along every row and column, runs of 12 px or less only (longer runs are filled areas).
//
//   cd app && npx -y -p sharp@0.34.5 node scripts/illustrations/measure.mjs [--scale N] <file.png>...
// The scale is read from the file name (@2x, @3x); the result is in px and in pt.
import path from 'node:path';

import { tool } from './lib.mjs';

const sharp = await tool('sharp', 'npx -y -p sharp@0.34.5 node scripts/illustrations/measure.mjs <files>');
const INK = [0x1a, 0x17, 0x14];
const flag = process.argv.indexOf('--scale');
const forced = flag > -1 ? +process.argv.splice(flag, 2)[1] : null;
for (const file of process.argv.slice(2)) {
  const scale = forced ?? +(path.basename(file).match(/@(\d)x/)?.[1] ?? 1);
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const ink = (i) => data[i * 4 + 3] > 200 && Math.hypot(data[i * 4] - INK[0], data[i * 4 + 1] - INK[1], data[i * 4 + 2] - INK[2]) < 30;
  const runs = [];
  const scan = (n, len, at) => {
    for (let a = 0; a < n; a++) {
      let r = 0;
      for (let b = 0; b <= len; b++) {
        if (b < len && ink(at(a, b))) r++;
        else { if (r > 0 && r <= 12) runs.push(r); r = 0; }
      }
    }
  };
  scan(h, w, (y, x) => y * w + x);
  scan(w, h, (x, y) => y * w + x);
  runs.sort((a, b) => a - b);
  const med = runs[Math.floor(runs.length / 2)] ?? 0;
  const mean = runs.reduce((a, b) => a + b, 0) / (runs.length || 1);
  console.log(`${path.basename(file)}: median ${med} px = ${(med / scale).toFixed(2)} pt, mean ${mean.toFixed(2)} px = ${(mean / scale).toFixed(2)} pt (${runs.length} runs)`);
}
