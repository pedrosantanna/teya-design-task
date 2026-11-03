// A London heritage lamp column in the Westminster manner: a stepped base, a slender column with
// a collar, a ladder bar below the lantern, a four-sided lantern wider at the top, a pyramid cap
// and a finial. Iron is Biscuit dark muted (#332C27), the lit glass Butter 100. Entry: from the base up. No idle.
// The mini copies the lamp drawn in the high street corner (not imported from corner.js).
import kit from './kit.js';
import { collect } from './props-kit.js';

export function buildMini(THREE, P) {
  // Corner scale: 1 unit ≈ 2.5 m, base at y = 0.
  const k = kit(THREE), ink = P.biscuit.darkMuted;
  const g = new THREE.Group();
  g.add(k.group([
    k.cyl(0.07, 0.07, 0.1, ink, [0, 0.05, 0], { part: 'lamp' }),
    k.cyl(0.035, 0.035, 1.45, ink, [0, 0.725, 0], { part: 'lamp' }),
    k.block(0.16, 0.2, 0.16, P.butter[100], [0, 1.45, 0]),
    k.cyl(0, 0.15, 0.12, ink, [0, 1.71, 0], { seg: 4, rot: [0, Math.PI / 4, 0] }),
  ]));
  return g;
}

export default {
  id: 'lamppost',
  name: { en: 'Lamp post', pt: 'Poste de luz' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const ink = P.biscuit.darkMuted, glass = P.butter[100];
    const sq = { seg: 4, rot: [0, Math.PI / 4, 0] }; // square sections, faces towards ±x and ±z

    const base = k.group([
      k.cyl(0.26, 0.28, 0.12, ink, [0, 0.06, 0], { part: 'base' }),
      k.lathe([[0.2, 0], [0.2, 0.06], [0.15, 0.12], [0.13, 0.5], [0.15, 0.56], [0.1, 0.62], [0.075, 0.68], [0, 0.68]], ink, [0, 0.12, 0], { part: 'base' }),
    ]);
    const column = k.cyl(0.055, 0.075, 2.3, ink, [0, 0.8 + 1.15, 0]);
    const collar = k.group([
      k.cyl(0.1, 0.1, 0.06, ink, [0, 1.3, 0], { part: 'c1' }),
      k.cyl(0.09, 0.07, 0.1, ink, [0, 3.06, 0], { part: 'c2' }),
    ]);
    const ladder = k.group([
      k.capsule(V(-0.34, 2.82, 0), V(0.34, 2.82, 0), 0.026, ink, { part: 'bar' }),
      k.sphere(0.04, ink, [-0.36, 2.82, 0], { part: 'bar' }),
      k.sphere(0.04, ink, [0.36, 2.82, 0], { part: 'bar' }),
    ]);
    // Lantern: a square frustum of glass between a base tray and a top ring, with corner bars.
    const lb = 3.14, lh = 0.5, rb = 0.17, rt = 0.26; // circumradius at the bottom and top
    const lantern = k.group([
      k.cyl(rb + 0.02, 0.06, 0.08, ink, [0, lb - 0.04, 0], { ...sq, part: 'tray' }),
      k.cyl(rt, rb, lh, glass, [0, lb + lh / 2, 0], sq),
      ...[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([sx, sz]) =>
        k.capsule(V(sx * rb * 0.7071, lb, sz * rb * 0.7071), V(sx * rt * 0.7071, lb + lh, sz * rt * 0.7071), 0.016, ink, { part: 'bars' })),
      k.cyl(rt + 0.03, rt + 0.03, 0.05, ink, [0, lb + lh + 0.025, 0], { ...sq, part: 'ring' }),
    ]);
    const cap = k.group([
      k.cyl(0.05, rt + 0.03, 0.2, ink, [0, lb + lh + 0.15, 0], { ...sq, part: 'cap' }),
      k.cyl(0.02, 0.02, 0.1, ink, [0, lb + lh + 0.3, 0], { part: 'fin' }),
      k.sphere(0.045, ink, [0, lb + lh + 0.37, 0], { part: 'fin' }),
    ]);

    const parts = collect(g, [[base, 0], [column, 0.1], [collar, 0.2], [ladder, 0.28], [lantern, 0.38], [cap, 0.5]]);
    return { group: g, parts };
  },
  idle() {},
};
