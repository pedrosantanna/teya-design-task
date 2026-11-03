// Extra inputs for the viewer's export mode (app assets). Not shown in the gallery.
// - defs: compositions that exist only as app assets (the quiet street for "not found").
// - loops: idle settings for a seamless loop. `seconds` is the loop length; `idle` replaces the model's own
//   idle when its frequencies don't fit a short loop (the scooter's bob and wheels are rounded to whole cycles).
import lamppost from './lamppost.js';
import bench from './bench.js';
import flowers from './flowers.js';
import hardware from './hardware.js';

// A lamp column behind the left end of a bench: an empty street, for "not found".
const quietstreet = {
  id: 'quietstreet',
  name: { en: 'Quiet street', pt: 'Rua vazia' },
  build(THREE, P) {
    const g = new THREE.Group();
    const lamp = lamppost.build(THREE, P), seat = bench.build(THREE, P);
    lamp.group.position.set(-1.25, 0, -0.55);
    seat.group.position.set(0.15, 0, 0.1);
    g.add(lamp.group, seat.group);
    const parts = [
      ...lamp.parts,
      ...seat.parts.map(p => ({ ...p, delay: (p.delay || 0) + 0.45 })),
    ];
    return { group: g, parts };
  },
  idle() {},
};

const TAU = Math.PI * 2;
const SCOOTER_T = 10 / 9; // one pass of the wind streaks
export const loops = {
  scooter: {
    seconds: SCOOTER_T,
    idle(g, t) {
      const u = g.userData;
      u.wheels.forEach(w => { w.rotation.z = -t * TAU / SCOOTER_T; });     // one turn per loop (was 7 rad/s)
      u.ride.position.y = 0.012 * Math.sin(t * 2 * TAU / SCOOTER_T);       // two bobs per loop (was 9 rad/s)
      u.streaks.forEach((o, i) => {
        const p = (t * 0.9 + i * 0.5) % 1;
        o.s.position.x = o.x - p * 0.5;
        o.s.scale.y = 1 - Math.abs(p - 0.5) * 1.2;
        o.s.visible = p < 0.92;
      });
    },
  },
  shop: { seconds: TAU / 2.2 },        // the awning's scallops sway at 2.2 rad/s
  'shop-plain': { seconds: TAU / 2.2 },
};

// flowers and hardware are new objects for the category cards; add them to index.js to show them in the gallery.
export const defs = [quietstreet, flowers, hardware];
