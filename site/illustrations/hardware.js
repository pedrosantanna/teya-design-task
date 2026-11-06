// A claw hammer lying on the ground in front of an open round tin of nails, two nails spilled. Handle Peach 500, head Biscuit dark muted, tin Indigo 300 with a Butter 100 label,
// nails Biscuit dark muted. Entry: tin, nails, then the hammer. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'hardware',
  name: { en: 'Hammer and nails', pt: 'Martelo e pregos' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const iron = P.biscuit.darkMuted, tinC = P.indigo[300];

    // Tin: a short cylinder with a label band and a rim, open, nails standing inside.
    const tx = 0.36, tz = 0.26, TR = 0.36, TH = 0.42;
    const tin = k.group([
      k.cyl(TR, TR, TH, tinC, [tx, TH / 2, tz], { part: 'tin' }),
      k.cyl(TR + 0.006, TR + 0.006, 0.2, P.butter[100], [tx, TH / 2, tz], { part: 'label' }),
      k.cyl(TR - 0.03, TR - 0.03, 0.01, P.indigo[700], [tx, TH + 0.001, tz], { part: 'inside' }),
    ]);
    const nail = (x, z, y = 0.02) => k.group([
      k.cyl(0.018, 0.018, 0.34, iron, [0, 0, 0], { part: 'nail' }),
      k.cyl(0.045, 0.045, 0.02, iron, [0, 0.17, 0], { part: 'nail' }),
    ], [x, y, z]);
    const nails = k.group([
      ...[[0.06, 0.08], [-0.08, -0.04], [0.1, -0.1]].map(([dx, dz]) => nail(tx + dx, tz + dz, TH + 0.04)),
      nail(0.95, 0.55, 0.045), nail(0.7, 0.78, 0.045),
    ]);
    nails.children.slice(3).forEach((n, i) => { n.rotation.set(0, i ? -0.6 : 0.4, Math.PI / 2); });

    // Hammer: a handle along x lying on the ground in front of the tin, the head across it at the far end,
    // a flat striking face on one side and a split claw on the other.
    // The hammer lies behind and to the left, turned against the composition's diagonal (head towards the front left,
    // handle running back to the right, behind the tin): built along x, then turned and moved as one.
    const hz = 0, hr = 0.07, HAMMER_YAW = 1.3, HAMMER_AT = [-0.3, -0.1];
    const handle = k.group([k.capsule(k.V(-0.75, hr, hz), k.V(0.55, hr, hz + 0.12), hr, P.peach[500])]);
    const head = k.group([
      k.block(0.2, 0.2, 0.5, iron, [-0.85, 0, hz - 0.02], { part: 'head' }),
      k.cyl(0.12, 0.12, 0.16, iron, [-0.85, 0.11, hz + 0.3], { part: 'head', rot: [Math.PI / 2, 0, 0] }),
      k.box(0.16, 0.08, 0.3, iron, [-0.85, 0.12, hz - 0.38], { part: 'head', rot: [-0.3, 0, 0] }),
    ]);

    [handle, head].forEach((o) => { o.rotation.y = HAMMER_YAW; o.position.set(HAMMER_AT[0], 0, HAMMER_AT[1]); });

    const parts = collect(g, [[tin, 0], [nails, 0.2], [handle, 0.32], [head, 0.44]]);
    return { group: g, parts };
  },
  idle() {},
};
