// Makes a web export work from any folder (for example `prototype/` next to the docs artifact's page).
// `npm run export:web` builds with the placeholder base URL `/__snuffle_base__` (app.config.js); this script
// then points index.html at its scripts with relative paths and swaps every placeholder string in the bundles
// for the folder the page was served from, which public/index.html stores in `window.__SNUFFLE_BASE__`.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const PLACEHOLDER = '/__snuffle_base__';

const html = join(dist, 'index.html');
let page = readFileSync(html, 'utf8');
if (!page.includes(PLACEHOLDER)) {
  console.error(`relative-web: ${PLACEHOLDER} not found in dist/index.html. Build with SNUFFLE_RELATIVE_WEB=1.`);
  process.exit(1);
}
page = page.replaceAll(`"${PLACEHOLDER}/`, '"./');
writeFileSync(html, page);

// A string literal that starts with the placeholder becomes `(base) + "rest"`. The app config embedded as an
// escaped JSON string (\"baseUrl\":\"/__snuffle_base__\") is left alone.
const literal = /(?<!\\)"\/__snuffle_base__/g;
const runtimeBase = '(globalThis.__SNUFFLE_BASE__||"")+"';

const jsDir = join(dist, '_expo/static/js/web');
let swapped = 0;
for (const name of readdirSync(jsDir).filter((f) => f.endsWith('.js'))) {
  const file = join(jsDir, name);
  const source = readFileSync(file, 'utf8');
  const out = source.replace(literal, () => {
    swapped += 1;
    return runtimeBase;
  });
  if (out !== source) {
    writeFileSync(file, out);
    execFileSync(process.execPath, ['--check', file]);
  }
}
// The web build asks for an image by its base name (name.hash.png) and never for its @2x or @3x file, and the
// illustration pipeline writes only @2x and @3x. Give each such image a base file: the @2x, else the @3x.
let based = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) { walk(file); continue; }
    const m = name.match(/^(.*)@([23])x(\.\w+)$/);
    if (!m) continue;
    const base = join(dir, m[1] + m[3]);
    const two = join(dir, `${m[1]}@2x${m[3]}`);
    if (existsSync(base) || (m[2] === '3' && existsSync(two))) continue;
    copyFileSync(file, base);
    based += 1;
  }
};
walk(join(dist, 'assets'));

console.log(`relative-web: ${based} images got a base file for the web.`);
console.log(`relative-web: index.html uses relative script paths; ${swapped} base URL strings resolve at runtime.`);
