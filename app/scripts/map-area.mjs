// The prototype's map area: a box about 4 km east to west and 2.5 km north to south, centred on Blythe Road /
// Brook Green, London W14, wide enough for every shop's street and the walk to it (Askew Road in the west,
// Kensington Church Street in the east; build-places.mjs).
// Shared by fetch-map.mjs and build-map-style.mjs.
export const CENTER = [-0.216, 51.4985]; // [lng, lat]
const HALF_KM_NS = 1.25;
const HALF_KM_EW = 2.0;
const dLat = HALF_KM_NS / 111.32;
const dLng = HALF_KM_EW / (111.32 * Math.cos((CENTER[1] * Math.PI) / 180));
const r = (v) => Math.round(v * 1e5) / 1e5;
/** [south, west, north, east] */
export const BBOX = [r(CENTER[1] - dLat), r(CENTER[0] - dLng), r(CENTER[1] + dLat), r(CENTER[0] + dLng)];
