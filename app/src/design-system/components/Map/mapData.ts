// Decodes the compact OpenStreetMap layers in assets/map/ (written by scripts/fetch-map.mjs) into GeoJSON for
// MapLibre. Coordinates are integers in 1e-5 degrees, relative to the area's centre and delta-encoded per ring.
// Data © OpenStreetMap contributors, ODbL.
import type { FeatureCollection, Geometry } from 'geojson';

import buildingsRaw from '../../../../assets/map/buildings.json';
import parksRaw from '../../../../assets/map/parks.json';
import railRaw from '../../../../assets/map/rail.json';
import roadsRaw from '../../../../assets/map/roads.json';
import waterRaw from '../../../../assets/map/water.json';

type Ring = number[];
type Compact = { o: number[]; f: unknown[][] };

const ROAD_CLASS = ['main', 'street', 'minor', 'path'] as const;

function decodeRing(ring: Ring, o: number[], close: boolean): number[][] {
  const out: number[][] = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < ring.length; i += 2) {
    x += ring[i];
    y += ring[i + 1];
    out.push([(o[0] + x) / 1e5, (o[1] + y) / 1e5]);
  }
  if (close && out.length) out.push(out[0]);
  return out;
}

function decode(raw: Compact, kind: 'line' | 'polygon', prop?: (v: number) => Record<string, unknown>): FeatureCollection {
  const features = raw.f.map((entry) => {
    const g = (prop ? entry[1] : entry[0]) as never;
    let geometry: Geometry;
    if (kind === 'line') {
      geometry = { type: 'LineString', coordinates: decodeRing(g as Ring, raw.o, false) };
    } else {
      const polys = (g as Ring[][]).map((rings) => rings.map((r) => decodeRing(r, raw.o, true)));
      geometry = polys.length === 1 ? { type: 'Polygon', coordinates: polys[0] } : { type: 'MultiPolygon', coordinates: polys };
    }
    return { type: 'Feature' as const, properties: prop ? prop(entry[0] as number) : {}, geometry };
  });
  return { type: 'FeatureCollection', features };
}

let cache: Record<MapLayer, FeatureCollection> | null = null;

export type MapLayer = 'buildings' | 'roads' | 'parks' | 'water' | 'rail';

/** The map's GeoJSON, decoded once on first use. */
export function mapData(): Record<MapLayer, FeatureCollection> {
  if (!cache) {
    cache = {
      buildings: decode(buildingsRaw as Compact, 'polygon', (h) => ({ h })),
      roads: decode(roadsRaw as Compact, 'line', (c) => ({ c: ROAD_CLASS[c] ?? 'path' })),
      parks: decode(parksRaw as Compact, 'polygon'),
      water: decode(waterRaw as Compact, 'polygon'),
      rail: decode(railRaw as Compact, 'line'),
    };
  }
  return cache;
}

/** The area's centre, Blythe Road / Brook Green, London W14: [lng, lat]. Matches scripts/map-area.mjs. */
export const MAP_CENTER: [number, number] = [-0.216, 51.4985];
