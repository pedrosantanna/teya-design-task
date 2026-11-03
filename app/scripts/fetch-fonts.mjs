#!/usr/bin/env node
// Downloads Gambetta and Switzer from Fontshare into assets/fonts.
//
// The ITF Free Font License allows embedding the fonts in our own app and website but not
// redistributing the files from a public repository, so the .ttf files are gitignored and every
// clone fetches its own copy from Fontshare. Runs on postinstall; does nothing when the files exist.
//
//   node scripts/fetch-fonts.mjs

import { Buffer } from 'node:buffer';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'assets/fonts');

// Family on Fontshare -> the weights the type scale uses (typography.md).
const wanted = {
  gambetta: { name: 'Gambetta', files: ['Bold'] },
  switzer: { name: 'Switzer', files: ['Regular', 'Medium', 'Semibold'] },
};

const target = (family, style) => path.join(outDir, `${family}-${style}.ttf`);
const missing = Object.values(wanted).some((f) => f.files.some((s) => !fs.existsSync(target(f.name, s))));
if (!missing) {
  console.log('Fonts: already in assets/fonts.');
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fontshare-'));
try {
  for (const [slug, family] of Object.entries(wanted)) {
    const res = await fetch(`https://api.fontshare.com/v2/fonts/download/${slug}`);
    if (!res.ok) throw new Error(`Fontshare returned ${res.status} for ${slug}`);
    const zip = path.join(tmp, `${slug}.zip`);
    fs.writeFileSync(zip, Buffer.from(await res.arrayBuffer()));
    const dir = path.join(tmp, slug);
    execFileSync('unzip', ['-oq', zip, '-d', dir]);
    for (const style of family.files) {
      const src = path.join(dir, `${family.name}_Complete/Fonts/WEB/fonts/${family.name}-${style}.ttf`);
      fs.copyFileSync(src, target(family.name, style));
    }
  }
  console.log('Fonts: downloaded Gambetta and Switzer from Fontshare into assets/fonts.');
} catch (error) {
  // Offline installs still work; the app needs the files to bundle, so say how to get them.
  console.warn(`Fonts: could not download (${error.message}). Run \`npm run fonts\` when online.`);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
