// The Map's MapLibre style for a colour scheme: the generated style (scripts/map-style.mjs, built from the theme)
// with its GeoJSON sources filled from the bundled OpenStreetMap data. Shared by the native and web maps.
import type { StyleSpecification } from '@maplibre/maplibre-react-native';

import { mapData } from './mapData';
import { mapStyles } from './style.generated';

export { MAP_CAMERA } from './style.generated';

const cache: Partial<Record<'light' | 'dark', StyleSpecification>> = {};

export function mapStyle(scheme: 'light' | 'dark'): StyleSpecification {
  const hit = cache[scheme];
  if (hit) return hit;
  const base = mapStyles[scheme];
  const data = mapData();
  const sources = Object.fromEntries(
    // Tiled up to zoom 15 only (MapLibre overzooms past it): the wider area made tiling every building to zoom 18
    // slow on the first frame, and the shop page's camera never goes past 16.4.
    Object.keys(base.sources).map((id) => [id, { type: 'geojson', data: data[id as keyof typeof data], maxzoom: 15 }]),
  );
  const style = { ...base, sources } as StyleSpecification;
  cache[scheme] = style;
  return style;
}
