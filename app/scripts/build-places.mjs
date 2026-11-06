// Places every shop on the street its seed names and draws the walk to it from the shopper's door, 163 Blythe Road
// (OpenStreetMap node 9136758480). Reads the walkable streets from Overpass (or a saved response), builds a graph
// of footways and roads, and for each shop picks the point on its street whose walking distance from the door is
// closest to the shop's `walkMinutes` at 80 m a minute, so the minutes on the card and the route on the map agree.
// Shops on the same street are kept at least 60 m apart. Writes assets/map/places.json:
//   { "origin": [lng, lat], "shops": { "<id>": { "at": [lng, lat], "route": [[lng, lat], …], "m": metres } } }
// with coordinates rounded to 1e-6 degrees. Run by hand (`npm run map:places`); the output is committed.
// Data © OpenStreetMap contributors, ODbL.
//
//   node scripts/build-places.mjs [--raw <overpass.json>] [--save-raw <file>]

import { readFileSync, writeFileSync } from 'node:fs';

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};

const HERE = new URL('..', import.meta.url).pathname;
const OUT = `${HERE}assets/map/places.json`;
const ORIGIN = [-0.2205074, 51.4992727]; // 163 Blythe Road, London W14 (OSM node 9136758480)
const ORIGIN_STREET = 'Blythe Road';
const BOX = [51.488, -0.248, 51.514, -0.183]; // south, west, north, east: every shop's street
const METRES_PER_MINUTE = 80;
const MIN_APART = 60;
const HIGHWAYS =
  'primary|secondary|tertiary|unclassified|residential|living_street|pedestrian|footway|path|service|cycleway|steps|trunk|primary_link|secondary_link|tertiary_link';

async function overpass() {
  const query = `[out:json][timeout:120];way["highway"~"^(${HIGHWAYS})$"](${BOX.join(',')});out body geom;`;
  for (const url of ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const res = await fetch(url, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'snuffle-prototype map build (one-off)' },
      }).catch(() => null);
      if (res?.ok) return res.json();
      await new Promise((r) => setTimeout(r, 15000 * (attempt + 1)));
    }
  }
  throw new Error('Overpass did not answer');
}

/** id, street and walkMinutes of every shop in the seed files, read from the source (a shop is an `id`, `name`,
 *  `kind`, `street` and `walkMinutes` in that order; the Kensington area's walk times are not shops and don't match). */
function shops() {
  const out = [];
  const shape = /id: '(\w+)',\n\s+name: .*\n\s+kind: .*\n\s+street: (['"])(.*?)\2,\n\s+walkMinutes: (\d+)/g;
  for (const file of ['src/store/seed.ts', 'src/store/seed-more.ts']) {
    const src = readFileSync(`${HERE}${file}`, 'utf8');
    for (const m of src.matchAll(shape)) out.push({ id: m[1], street: m[3], walk: Number(m[4]) });
  }
  return out;
}

/** Street names compared without case or apostrophes (OSM has both "Shepherds Bush Green" and "Shepherd's Bush Road"). */
const key = (name) => name.toLowerCase().replace(/['’]/g, '');

const R = 6371008.8;
function metres(a, b) {
  const toRad = Math.PI / 180;
  const dLat = (b[1] - a[1]) * toRad;
  const dLng = (b[0] - a[0]) * toRad;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * toRad) * Math.cos(b[1] * toRad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Douglas–Peucker in local metres. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const lat0 = (points[0][1] * Math.PI) / 180;
  const xy = points.map(([lng, lat]) => [lng * 111320 * Math.cos(lat0), lat * 110540]);
  const keep = new Array(points.length).fill(false);
  keep[0] = keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop();
    const [ax, ay] = xy[i];
    const [bx, by] = xy[j];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    let worst = -1;
    let at = -1;
    for (let k = i + 1; k < j; k++) {
      const d = Math.abs((bx - ax) * (ay - xy[k][1]) - (ax - xy[k][0]) * (by - ay)) / len;
      if (d > worst) {
        worst = d;
        at = k;
      }
    }
    if (worst > tolerance) {
      keep[at] = true;
      stack.push([i, at], [at, j]);
    }
  }
  return points.filter((_, k) => keep[k]);
}

const raw = arg('--raw') ? JSON.parse(readFileSync(arg('--raw'), 'utf8')) : await overpass();
if (arg('--save-raw')) writeFileSync(arg('--save-raw'), JSON.stringify(raw));

// The graph: every way's consecutive nodes, both ways round.
const coord = new Map();
const edges = new Map();
const byStreet = new Map();
const link = (a, b, w) => {
  if (!edges.has(a)) edges.set(a, []);
  edges.get(a).push([b, w]);
};
for (const way of raw.elements) {
  if (way.type !== 'way' || !way.geometry) continue;
  way.nodes.forEach((id, i) => coord.set(id, [way.geometry[i].lon, way.geometry[i].lat]));
  for (let i = 1; i < way.nodes.length; i++) {
    const w = metres(coord.get(way.nodes[i - 1]), coord.get(way.nodes[i]));
    link(way.nodes[i - 1], way.nodes[i], w);
    link(way.nodes[i], way.nodes[i - 1], w);
  }
  const name = way.tags?.name ? key(way.tags.name) : undefined;
  if (name) {
    if (!byStreet.has(name)) byStreet.set(name, new Set());
    way.nodes.forEach((id) => byStreet.get(name).add(id));
  }
}

const nearest = (point, ids) => {
  let best = null;
  let bestD = Infinity;
  for (const id of ids) {
    const d = metres(point, coord.get(id));
    if (d < bestD) {
      bestD = d;
      best = id;
    }
  }
  return best;
};
const start = nearest(ORIGIN, byStreet.get(key(ORIGIN_STREET)));

// Dijkstra from the door over the whole graph (a binary heap keeps it quick on ~50k nodes).
const dist = new Map([[start, 0]]);
const prev = new Map();
const heap = [[0, start]];
const push = (item) => {
  heap.push(item);
  let i = heap.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (heap[p][0] <= heap[i][0]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
};
const pop = () => {
  const top = heap[0];
  const last = heap.pop();
  if (heap.length) {
    heap[0] = last;
    let i = 0;
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      let m = i;
      if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
      if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
      if (m === i) break;
      [heap[m], heap[i]] = [heap[i], heap[m]];
      i = m;
    }
  }
  return top;
};
while (heap.length) {
  const [d, u] = pop();
  if (d > (dist.get(u) ?? Infinity)) continue;
  for (const [v, w] of edges.get(u) ?? []) {
    const nd = d + w;
    if (nd < (dist.get(v) ?? Infinity)) {
      dist.set(v, nd);
      prev.set(v, u);
      push([nd, v]);
    }
  }
}

const round = ([lng, lat]) => [Math.round(lng * 1e6) / 1e6, Math.round(lat * 1e6) / 1e6];
const placed = new Map(); // street → points already taken
const out = { origin: round(coord.get(start)), shops: {} };
const report = [];
for (const shop of shops()) {
  const ids = byStreet.get(key(shop.street));
  if (!ids) {
    report.push(`${shop.id}: no street named ${shop.street} in the box`);
    continue;
  }
  const target = shop.walk * METRES_PER_MINUTE;
  const taken = placed.get(shop.street) ?? [];
  let best = null;
  let bestScore = Infinity;
  for (const id of ids) {
    const d = dist.get(id);
    if (d == null) continue;
    const crowded = taken.some((p) => metres(p, coord.get(id)) < MIN_APART);
    const score = Math.abs(d - target) + (crowded ? 1e6 : 0);
    if (score < bestScore) {
      bestScore = score;
      best = id;
    }
  }
  const path = [];
  for (let n = best; n != null; n = prev.get(n)) path.push(coord.get(n));
  path.reverse();
  taken.push(coord.get(best));
  placed.set(shop.street, taken);
  const m = Math.round(dist.get(best));
  out.shops[shop.id] = { at: round(coord.get(best)), route: simplify(path, 2).map(round), m };
  report.push(`${shop.id.padEnd(20)} ${shop.street.padEnd(26)} seed ${String(shop.walk).padStart(2)} min  route ${String(Math.round(m / METRES_PER_MINUTE)).padStart(2)} min (${m} m)`);
}
writeFileSync(OUT, `${JSON.stringify(out)}\n`);
console.log(report.join('\n'));
const all = Object.values(out.shops).flatMap((s) => s.route);
const lngs = all.map((p) => p[0]);
const lats = all.map((p) => p[1]);
console.log(`routes span lng ${Math.min(...lngs)}…${Math.max(...lngs)}, lat ${Math.min(...lats)}…${Math.max(...lats)}`);
console.log(`wrote ${OUT}`);
