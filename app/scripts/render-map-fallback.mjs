// Renders the Map's static fallback images (assets/map/fallback-light.jpg, fallback-dark.jpg) with headless
// Chrome and maplibre-gl: the same style, data and camera as the live map, centred on the shop, so the image can
// stand in while the map loads or if WebGL fails. Each image is SIZE points square at 2x; the Map shows it at
// its natural size centred on the pin. Needs Google Chrome; run it after changing the data or the style
// (`npm run map:fallback`). A local server hands the page to Chrome and takes the canvas back as a PNG.
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { CENTER } from './map-area.mjs';
import { buildMapStyle, MAP_CAMERA, themeColours } from './map-style.mjs';

export const SIZE = 640;
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const app = new URL('..', import.meta.url).pathname;
const lib = readFileSync(join(app, 'node_modules/maplibre-gl/dist/maplibre-gl.js'), 'utf8');
const layers = Object.fromEntries(
  ['buildings', 'roads', 'parks', 'water', 'rail'].map((n) => [n, JSON.parse(readFileSync(join(app, `assets/map/${n}.json`), 'utf8'))]),
);
const colours = await themeColours();
const dir = mkdtempSync(join(tmpdir(), 'snuffle-map-'));
const pages = {};
const done = {};
const server = createServer((req, res) => {
  const scheme = req.url.slice(1).replace(/\.(html|png)$/, '');
  if (req.method === 'GET' && pages[scheme]) {
    res.writeHead(200, { 'content-type': 'text/html' }).end(pages[scheme]);
    return;
  }
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    res.end('ok');
    done[scheme]?.(Buffer.concat(chunks).toString());
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

for (const scheme of ['light', 'dark']) {
  const style = buildMapStyle(colours[scheme], scheme);
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0}#m{width:${SIZE}px;height:${SIZE}px}</style>
<div id="m"></div><script>${lib}</script><script>
const raw = ${JSON.stringify(layers)};
const ROAD = ['main', 'street', 'minor', 'path'];
const ring = (r, o, close) => { const out = []; let x = 0, y = 0;
  for (let i = 0; i < r.length; i += 2) { x += r[i]; y += r[i + 1]; out.push([(o[0] + x) / 1e5, (o[1] + y) / 1e5]); }
  if (close) out.push(out[0]); return out; };
const decode = (l, kind, prop) => ({ type: 'FeatureCollection', features: l.f.map((e) => {
  const g = prop ? e[1] : e[0];
  const geometry = kind === 'line' ? { type: 'LineString', coordinates: ring(g, l.o, false) }
    : { type: 'MultiPolygon', coordinates: g.map((p) => p.map((r) => ring(r, l.o, true))) };
  return { type: 'Feature', properties: prop ? prop(e[0]) : {}, geometry }; }) });
const style = ${JSON.stringify(style)};
style.sources.buildings.data = decode(raw.buildings, 'polygon', (h) => ({ h }));
style.sources.roads.data = decode(raw.roads, 'line', (c) => ({ c: ROAD[c] }));
style.sources.parks.data = decode(raw.parks, 'polygon');
style.sources.water.data = decode(raw.water, 'polygon');
style.sources.rail.data = decode(raw.rail, 'line');
const map = new maplibregl.Map({ container: 'm', style, center: ${JSON.stringify(CENTER)}, ...${JSON.stringify(MAP_CAMERA)},
  interactive: false, attributionControl: false, fadeDuration: 0, canvasContextAttributes: { preserveDrawingBuffer: true }, pixelRatio: 2 });
map.once('idle', () => fetch('/${scheme}.png', { method: 'POST', body: map.getCanvas().toDataURL('image/png') }));
</script>`;
  pages[scheme] = html;
  const posted = new Promise((resolve) => (done[scheme] = resolve));
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--hide-scrollbars',
    `--user-data-dir=${join(dir, scheme)}`,
    `--window-size=${SIZE},${SIZE}`,
    '--force-device-scale-factor=2',
    `http://127.0.0.1:${port}/${scheme}.html`,
  ], { stdio: 'ignore' });
  const timeout = setTimeout(() => {
    chrome.kill();
    console.error(`render-map-fallback: ${scheme} timed out`);
    process.exit(1);
  }, 60000);
  const dataUrl = await posted;
  clearTimeout(timeout);
  const exited = new Promise((r) => chrome.once('exit', r));
  chrome.kill();
  await exited;
  const png = join(dir, `${scheme}.png`);
  writeFileSync(png, Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64'));
  // JPEG at 1.5x keeps each image small in the bundle (macOS sips).
  const out = join(app, `assets/map/fallback-${scheme}.jpg`);
  execFileSync('sips', ['-Z', String(SIZE * 1.5), '-s', 'format', 'jpeg', '-s', 'formatOptions', '62', png, '--out', out], { stdio: 'ignore' });
  console.log(`render-map-fallback: wrote assets/map/fallback-${scheme}.jpg`);
}
server.close();
rmSync(dir, { recursive: true, force: true, maxRetries: 5 });
