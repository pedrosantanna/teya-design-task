// Where each shop stands and the walk to it from the shopper's door, 163 Blythe Road (assets/map/places.json,
// written by scripts/build-places.mjs from OpenStreetMap; the walk times in the seed come from the same routes).
// The map centres on the shop, under the pin, turns so the door lies to the left of it (the band of map a screen
// shows is wide and short, so a walk read sideways fits at a closer zoom), and zooms out until the door is in that band;
// the route is drawn on top of the buildings in the shop's accent, cased in its On detail colour.
// Data © OpenStreetMap contributors, ODbL.
import type { StyleSpecification } from '@maplibre/maplibre-react-native';

import placesRaw from '../../../../assets/map/places.json';
import { MAP_CAMERA } from './style.generated';

type LngLat = [number, number];
export type MapPlace = { at: LngLat; route: LngLat[]; m: number };

const places = placesRaw as unknown as { origin: LngLat; shops: Record<string, MapPlace> };

/** The shopper's door, the start of every route. */
export const MAP_ORIGIN: LngLat = places.origin;

/** A shop's spot and route, or undefined for a shop the build didn't place. */
export function mapPlace(shopId?: string): MapPlace | undefined {
  return shopId ? places.shops[shopId] : undefined;
}

const EARTH = 40075016.686; // metres round the equator
const TILE = 512; // MapLibre's world is 512 px wide at zoom 0
const MAX_ZOOM = MAP_CAMERA.zoom;
const MIN_ZOOM = 12.5;
/** Room kept free round the route inside the visible band, in points. */
const ROOM = 36;
/** With the camera pitched, ground ahead of the pin is foreshortened by about 1 / cos(pitch). */
const FORESHORTEN = 1 / Math.cos((MAP_CAMERA.pitch * Math.PI) / 180);

/** The camera's bearing that puts the door to the left of the shop: the door's compass direction from the shop, plus
 *  a quarter turn. A door within a few metres keeps the area's bearing. */
export function routeBearing(place: MapPlace): number {
  const [lng0, lat0] = place.at;
  const [lng, lat] = place.route[0] ?? place.at;
  const east = (lng - lng0) * Math.cos((lat0 * Math.PI) / 180);
  const north = lat - lat0;
  if (Math.hypot(east, north) < 1e-4) return MAP_CAMERA.bearing;
  const azimuth = (Math.atan2(east, north) * 180) / Math.PI;
  return ((azimuth + 90 + 540) % 360) - 180;
}

/** The camera for a route in a band `width` wide and `2 × pinY` tall, with the map turned to `bearingDeg`: the zoom
 *  that fits the whole walk, and how far right of the middle the shop (and its pin) sits so the walk is centred across
 *  the band. The shop stays at the pin's height. */
export function routeView(place: MapPlace, width: number, pinY: number, bearingDeg: number = MAP_CAMERA.bearing): { zoom: number; offsetX: number } {
  const [lng0, lat0] = place.at;
  const cos = Math.cos((lat0 * Math.PI) / 180);
  const bearing = (bearingDeg * Math.PI) / 180;
  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;
  for (const [lng, lat] of place.route) {
    const east = ((lng - lng0) * Math.PI * 6378137 * cos) / 180;
    const north = ((lat - lat0) * Math.PI * 6378137) / 180;
    // Screen axes after the camera's bearing (clockwise from north): x to the right, y up the screen, in metres.
    const x = east * Math.cos(bearing) - north * Math.sin(bearing);
    const y = east * Math.sin(bearing) + north * Math.cos(bearing);
    left = Math.min(left, x);
    right = Math.max(right, x);
    up = Math.max(up, y * FORESHORTEN);
    down = Math.max(down, -y);
  }
  const need = Math.max((right - left) / Math.max(1, width - 2 * ROOM), Math.max(up, down) / Math.max(1, pinY - ROOM));
  const zoom = need === 0 ? MAX_ZOOM : Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.log2((EARTH * cos) / (TILE * need))));
  const perPoint = (EARTH * cos) / (TILE * 2 ** zoom);
  const half = width / 2 - ROOM;
  const offsetX = Math.max(-half, Math.min(half, -(left + right) / 2 / perPoint));
  return { zoom, offsetX };
}

/** The map style with the route on top: a casing, the line in the accent's Detail colour and the door as a dot (colours
 *  per scheme from useMapView), with the buildings faded when the map is zoomed out for a long walk. */
export function withRoute(style: StyleSpecification, place: MapPlace, colour: { line: string; casing: string; door: string; doorRing: string }): StyleSpecification {
  const line = { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: place.route } };
  const door = { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: place.route[0] ?? MAP_ORIGIN } };
  return {
    ...style,
    sources: {
      ...style.sources,
      route: { type: 'geojson', data: line },
      door: { type: 'geojson', data: door },
    },
    layers: [
      // Zoomed out for a long walk, the buildings fade so the route is the figure.
      ...style.layers.map((layer) =>
        layer.type === 'fill-extrusion'
          ? { ...layer, paint: { ...layer.paint, 'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 14, 0.35, 15.5, 1] } }
          : layer,
      ),
      { id: 'route-casing', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': colour.casing, 'line-width': 10 } },
      { id: 'route', type: 'line', source: 'route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': colour.line, 'line-width': 5 } },
      { id: 'door', type: 'circle', source: 'door', paint: { 'circle-radius': 6, 'circle-color': colour.door, 'circle-stroke-color': colour.doorRing, 'circle-stroke-width': 3 } },
    ],
  } as StyleSpecification;
}
