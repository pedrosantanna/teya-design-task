// The prototype's map area: a box about 2.5 km across centred on Blythe Road / Brook Green, London W14.
// Shared by fetch-map.mjs and build-map-style.mjs.
export const CENTER = [-0.216, 51.4985]; // [lng, lat]
const HALF_KM = 1.25;
const dLat = HALF_KM / 111.32;
const dLng = HALF_KM / (111.32 * Math.cos((CENTER[1] * Math.PI) / 180));
const r = (v) => Math.round(v * 1e5) / 1e5;
/** [south, west, north, east] */
export const BBOX = [r(CENTER[1] - dLat), r(CENTER[0] - dLng), r(CENTER[1] + dLat), r(CENTER[0] + dLng)];
