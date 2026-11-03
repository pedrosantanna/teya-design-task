// Copies maplibre-gl's CSP build (no blob: workers, no eval) into public/map/, so the web map loads it as plain
// files next to the page: the docs artifact's iframe may block blob: workers. Run on postinstall and before
// `npm run export:web`; public/map/ is gitignored.
import { copyFileSync, mkdirSync } from 'node:fs';

const from = new URL('../node_modules/maplibre-gl/dist/', import.meta.url).pathname;
const to = new URL('../public/map/', import.meta.url).pathname;
mkdirSync(to, { recursive: true });
for (const file of ['maplibre-gl-csp.js', 'maplibre-gl-csp-worker.js', 'maplibre-gl.css']) copyFileSync(from + file, to + file);
console.log('copy-map-web: public/map/ has the maplibre-gl CSP build');
