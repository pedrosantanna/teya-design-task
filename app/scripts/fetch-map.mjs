// Fetches OpenStreetMap data for the prototype's high street (Blythe Road / Brook Green, London W14) from the
// Overpass API once, and writes compact GeoJSON per layer to assets/map/. Run it by hand (`npm run map:fetch`);
// the output is committed, so builds never call Overpass. Data © OpenStreetMap contributors, ODbL.
//
// Usage: node scripts/fetch-map.mjs [--save-raw <file>] [--raw <file>]  (--raw re-encodes a saved response
// without calling Overpass).
//
// Encoding: GeoJSON for this area is about 3 MB, so each layer is stored compact and decoded at runtime by
// src/design-system/components/Map/mapData.ts. Coordinates are integers in 1e-5 degrees (about 1 m), relative to
// the area's centre, delta-encoded within each ring; lines and outlines are simplified to 1 m first.
// { "o": [lng0, lat0] in 1e-5 deg, "f": [[prop, [ring, ...]], ...] } where a ring is [x0, y0, dx1, dy1, ...] and
// Lines (roads, rail) are one ring; polygon layers are [[outer, hole...], ...] (rings are left open).
//
// Layers: buildings (height in metres from `height` or `building:levels` × 3, default 8), roads (class: main,
// street, minor, path), parks (parks, gardens, grass, playgrounds, pitches) and water.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { BBOX, CENTER } from './map-area.mjs';

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};

const OUT = new URL('../assets/map/', import.meta.url).pathname;
const ENDPOINTS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
const [S, W, N, E] = BBOX;
const box = `${S},${W},${N},${E}`;

const query = `[out:json][timeout:120];
(
  way["building"](${box});
  relation["building"]["type"="multipolygon"](${box});
  way["highway"](${box});
  way["leisure"~"^(park|garden|playground|pitch|common|nature_reserve)$"](${box});
  relation["leisure"~"^(park|garden|common)$"](${box});
  way["landuse"~"^(grass|recreation_ground|village_green|cemetery|allotments)$"](${box});
  way["natural"~"^(water|wood|scrub)$"](${box});
  way["waterway"~"^(river|canal|riverbank)$"](${box});
  relation["natural"="water"](${box});
  way["railway"~"^(rail|subway|light_rail)$"]["tunnel"!~"yes"](${box});
);
out geom;`;

async function fetchOverpass() {
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'snuffle-prototype map build (one-off)' },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!res.ok) throw new Error(`${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
      return await res.json();
    } catch (err) {
      console.warn(`fetch-map: ${url} failed: ${err.message}`);
    }
  }
  throw new Error('fetch-map: every Overpass endpoint failed');
}

// 5 decimals is about 1 m at this latitude, enough for a street-level map.
const round = (v) => Math.round(v * 1e5) / 1e5;
const ring = (geom) => {
  const out = [];
  for (const p of geom) {
    const c = [round(p.lon), round(p.lat)];
    const last = out[out.length - 1];
    if (!last || last[0] !== c[0] || last[1] !== c[1]) out.push(c);
  }
  return out;
};
const closed = (r) => r.length >= 4 && r[0][0] === r[r.length - 1][0] && r[0][1] === r[r.length - 1][1];

// Joins the outer and inner ways of a multipolygon relation into closed rings.
function relationRings(rel, role) {
  const parts = rel.members.filter((m) => m.type === 'way' && m.role === role && m.geometry).map((m) => ring(m.geometry));
  const rings = [];
  while (parts.length) {
    let cur = parts.shift();
    let grew = true;
    while (!closed(cur) && grew) {
      grew = false;
      const end = cur[cur.length - 1];
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const same = (a, b) => a[0] === b[0] && a[1] === b[1];
        if (same(p[0], end)) cur = cur.concat(p.slice(1));
        else if (same(p[p.length - 1], end)) cur = cur.concat(p.slice(0, -1).reverse());
        else continue;
        parts.splice(i, 1);
        grew = true;
        break;
      }
    }
    if (closed(cur)) rings.push(cur);
  }
  return rings;
}

function height(tags) {
  const h = parseFloat(tags.height);
  if (Number.isFinite(h) && h > 0) return Math.round(h);
  const levels = parseFloat(tags['building:levels']);
  if (Number.isFinite(levels) && levels > 0) return Math.round(levels * 3 + 2);
  return 8;
}

const ROAD = {
  main: ['motorway', 'trunk', 'primary', 'secondary', 'motorway_link', 'trunk_link', 'primary_link', 'secondary_link'],
  street: ['tertiary', 'tertiary_link', 'unclassified', 'residential'],
  minor: ['living_street', 'service', 'pedestrian'],
  path: ['footway', 'path', 'cycleway', 'steps', 'bridleway', 'track'],
};
const roadClass = (hw) => Object.keys(ROAD).find((k) => ROAD[k].includes(hw));

const layers = { buildings: [], roads: [], parks: [], water: [], rail: [] };
const polygon = (el) => {
  if (el.type === 'way') {
    const r = ring(el.geometry ?? []);
    return closed(r) ? { type: 'Polygon', coordinates: [r] } : null;
  }
  const outers = relationRings(el, 'outer');
  if (!outers.length) return null;
  const inners = relationRings(el, 'inner');
  // Inner rings are attached to the first outer ring; good enough for the few relations in this area.
  return outers.length === 1
    ? { type: 'Polygon', coordinates: [outers[0], ...inners] }
    : { type: 'MultiPolygon', coordinates: outers.map((o, i) => (i === 0 ? [o, ...inners] : [o])) };
};

const rawIn = arg('--raw');
const data = rawIn ? JSON.parse(readFileSync(rawIn, 'utf8')) : await fetchOverpass();
if (arg('--save-raw')) writeFileSync(arg('--save-raw'), JSON.stringify(data));
for (const el of data.elements) {
  const t = el.tags ?? {};
  if (t.building) {
    const g = polygon(el);
    if (g) layers.buildings.push({ type: 'Feature', properties: { h: height(t) }, geometry: g });
  } else if (t.highway && el.type === 'way') {
    const c = roadClass(t.highway);
    if (!c || t.area === 'yes' || t.tunnel === 'yes') continue;
    const r = ring(el.geometry ?? []);
    if (r.length >= 2) layers.roads.push({ type: 'Feature', properties: { c }, geometry: { type: 'LineString', coordinates: r } });
  } else if (t.railway && el.type === 'way') {
    const r = ring(el.geometry ?? []);
    if (r.length >= 2) layers.rail.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r } });
  } else if (t.natural === 'water' || t.waterway) {
    const g = polygon(el);
    if (g) layers.water.push({ type: 'Feature', properties: {}, geometry: g });
  } else if (t.leisure || t.landuse || t.natural) {
    const g = polygon(el);
    if (g) layers.parks.push({ type: 'Feature', properties: {}, geometry: g });
  }
}

// Douglas-Peucker on integer coordinates.
function simplify(pts, tol) {
  if (pts.length <= 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    let max = 0;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * (pts[i][0] - ax) - dx * (pts[i][1] - ay)) / len;
      if (d > max) [max, idx] = [d, i];
    }
    if (max > tol && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

const O = [Math.round(CENTER[0] * 1e5), Math.round(CENTER[1] * 1e5)];
// Longitude units are about 0.62 of latitude units here; scale x for the tolerance.
const encodeRing = (coords, isRing) => {
  let pts = coords.map(([x, y]) => [Math.round(x * 1e5) - O[0], Math.round(y * 1e5) - O[1]]);
  const tol = 0.8;
  const scaled = pts.map(([x, y]) => [x * 0.62, y, x]);
  if (isRing) {
    // A closed ring starts and ends on the same point: split it at the point farthest from the start.
    let k = 0;
    let max = -1;
    scaled.forEach(([x, y], i) => {
      const d = Math.hypot(x - scaled[0][0], y - scaled[0][1]);
      if (d > max) [max, k] = [d, i];
    });
    const a = simplify(scaled.slice(0, k + 1), tol);
    const b = simplify(scaled.slice(k), tol);
    pts = a.concat(b.slice(1)).map(([, y, x]) => [x, y]);
  } else {
    pts = simplify(scaled, tol).map(([, y, x]) => [x, y]);
  }
  if (isRing && pts.length < 4) return null;
  if (isRing) pts = pts.slice(0, -1); // the decoder closes rings
  const out = [];
  let px = 0;
  let py = 0;
  for (const [x, y] of pts) {
    out.push(x - px, y - py);
    [px, py] = [x, y];
  }
  return out;
};
const encodeGeometry = (g) => {
  if (g.type === 'LineString') return encodeRing(g.coordinates, false);
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const out = polys.map((rings) => rings.map((r) => encodeRing(r, true)).filter(Boolean)).filter((p) => p.length);
  return out.length ? out : null;
};

const PROP = { buildings: (p) => p.h, roads: (p) => ['main', 'street', 'minor', 'path'].indexOf(p.c) };

mkdirSync(OUT, { recursive: true });
let total = 0;
for (const [name, features] of Object.entries(layers)) {
  const f = [];
  for (const feat of features) {
    const g = encodeGeometry(feat.geometry);
    if (!g) continue;
    f.push(PROP[name] ? [PROP[name](feat.properties), g] : [g]);
  }
  const json = JSON.stringify({ o: O, f });
  writeFileSync(`${OUT}${name}.json`, json);
  total += json.length;
  console.log(`fetch-map: ${name}.json ${f.length} features, ${(json.length / 1024).toFixed(0)} KB`);
}
console.log(`fetch-map: ${(total / 1024).toFixed(0)} KB in all, bbox ${box}`);
