// Builds the Map's MapLibre style from a theme's colours (imagery.md, Map style): Map ground, roads in Biscuit
// grey (Muted), parks and water in muted tints, buildings extruded in 3D (8 m where the data has no height) in a
// colour one step off the ground (all from the map roles, colour.md). No symbol layers, so the style needs no glyphs or sprites and makes no network
// requests. Sources are left empty; the app fills them with the decoded data in assets/map/.
// Used by build-map-style.mjs (style.generated.ts) and render-map-fallback.mjs (the static fallback images).

const width = (z15, z18) => ['interpolate', ['exponential', 1.6], ['zoom'], 15, z15, 18, z18];
const empty = () => ({ type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

/** Camera for the shop page: close enough to read the street, tilted so the buildings stand up. */
export const MAP_CAMERA = { zoom: 16.4, pitch: 50, bearing: -12 };

export function buildMapStyle(c, scheme) {
  const dark = scheme === 'dark';
  const road = c.mapRoad;
  const line = (id, cls, w, extra = {}) => ({
    id,
    type: 'line',
    source: 'roads',
    filter: ['==', ['get', 'c'], cls],
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': cls === 'main' ? c.mapRoadMain : road, 'line-width': w, ...extra },
  });
  return {
    version: 8,
    name: `snuffle-${scheme}`,
    sources: { parks: empty(), water: empty(), roads: empty(), rail: empty(), buildings: empty() },
    light: { anchor: 'viewport', color: dark ? c.foreground : c.card, intensity: dark ? 0.25 : 0.35, position: [1.2, 210, 40] },
    layers: [
      { id: 'ground', type: 'background', paint: { 'background-color': c.mapGround } },
      { id: 'parks', type: 'fill', source: 'parks', paint: { 'fill-color': c.mapPark } },
      { id: 'water', type: 'fill', source: 'water', paint: { 'fill-color': c.mapWater } },
      line('paths', 'path', width(0.8, 2.5), { 'line-dasharray': [2, 1.5] }),
      { id: 'rail', type: 'line', source: 'rail', paint: { 'line-color': c.mapRoadMain, 'line-width': width(1, 3) } },
      line('minor', 'minor', width(2, 8)),
      line('streets', 'street', width(4, 18)),
      line('main', 'main', width(6, 28)),
      {
        id: 'buildings',
        type: 'fill-extrusion',
        source: 'buildings',
        paint: {
          // White in light, a step above the ground in dark; the extrusion's light shades the walls.
          'fill-extrusion-color': c.mapBuilding,
          'fill-extrusion-height': ['get', 'h'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 1,
        },
      },
    ],
  };
}

/** Light and dark colours from the generated theme (iOS and Android share the map colours). */
export async function themeColours() {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(new URL('../src/design-system/theme/theme.generated.ts', import.meta.url), 'utf8');
  const pick = (name) => {
    const start = src.indexOf(`export const ${name} = `);
    const body = src.slice(src.indexOf('color: {', start) + 'color: '.length);
    let depth = 0;
    let end = 0;
    for (; end < body.length; end++) {
      if (body[end] === '{') depth++;
      if (body[end] === '}' && --depth === 0) break;
    }
    return JSON.parse(body.slice(0, end + 1).replace(/(\w+):/g, '"$1":'));
  };
  return { light: pick('iosLight'), dark: pick('iosDark') };
}
