// A bread basket: a low round basket in Peach 600 with a Peach 700 rim, holding a round bloomer (Peach 400 crust,
// three Butter 100 slashes) and a baguette (Butter 400 with Butter 100 slashes) lying across it. Entry: basket,
// loaf, baguette. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'bread',
  name: { en: 'Bread basket', pt: 'Cesta de pães' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const R = 0.75, H = 0.32;
    const basket = k.group([
      k.lathe([[0, 0], [R - 0.12, 0], [R, H], [R - 0.05, H], [R - 0.16, 0.05], [0, 0.05]], P.peach[600], [0, 0, 0], { part: 'basket' }),
      k.mesh(new THREE.TorusGeometry(R - 0.02, 0.04, 16, 96), P.peach[700], { pos: [0, H, 0], rot: [Math.PI / 2, 0, 0], part: 'rim' }),
    ]);
    basket.children[0].material.side = THREE.DoubleSide;
    // Bloomer: a squashed sphere in the basket with three slashes across its top.
    const LR = 0.42;
    const loaf = k.group([
      k.sphere(LR, P.peach[400], [0, 0, 0], { scale: [1.15, 0.62, 0.85], part: 'loaf' }),
      ...[-0.18, 0, 0.18].map((x, i) => k.capsule(V(x - 0.06, LR * 0.6, -0.16), V(x + 0.06, LR * 0.6, 0.16), 0.03, P.butter[100],
        { scale: [1, 0.5, 1], part: `s${i}`, noShadow: true })),
    ], [-0.12, 0.1 + LR * 0.62, -0.12]);
    // Baguette: a long capsule resting on the rim and the loaf, poking out of the basket.
    const a = V(-0.35, 0.36, 0.5), b = V(0.95, 0.62, -0.25), r = 0.12;
    const dir = b.clone().sub(a);
    const baguette = k.group([
      k.capsule(a, b, r, P.butter[400], { part: 'baguette' }),
      ...[0.2, 0.4, 0.6, 0.8].map((f, i) => {
        const c = a.clone().add(dir.clone().multiplyScalar(f));
        return k.capsule(V(c.x - 0.07, c.y + r * 0.95, c.z - 0.04), V(c.x + 0.07, c.y + r * 0.95, c.z + 0.06), 0.022, P.butter[100],
          { scale: [1, 0.5, 1], part: `b${i}`, noShadow: true });
      }),
    ]);
    const parts = collect(g, [[basket, 0], [loaf, 0.2], [baguette, 0.36]]);
    return { group: g, parts };
  },
  idle() {},
};
