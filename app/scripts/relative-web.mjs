// Makes a web export work from any folder (for example `prototype/` next to the docs artifact's page).
// `npm run export:web` builds with the placeholder base URL `/__snuffle_base__` (app.config.js); this script
// then points index.html at its scripts with relative paths and swaps every placeholder string in the bundles
// for the folder the page was served from, which public/index.html stores in `window.__SNUFFLE_BASE__`.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
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
console.log(`relative-web: index.html uses relative script paths; ${swapped} base URL strings resolve at runtime.`);
