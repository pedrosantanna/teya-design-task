// A shopping basket: one box body with a band and a rim, an arched handle, and a loaf,
// a bottle and an apple standing out of it. The walls share one outline id, so only real edges show.
import kit from './kit.js';

export default {
  id: 'basket',
  name: { en: 'Basket', pt: 'Cesta' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const W = 1.8, D = 1.2, H = 0.7, t = 0.08, wall = P.lavender[300];

    const body = k.group([
      k.block(W, 0.08, D, wall, [0, 0, 0], { part: 'body' }),
      k.block(W, H, t, wall, [0, 0, D / 2 - t / 2], { part: 'body' }),
      k.block(W, H, t, wall, [0, 0, -D / 2 + t / 2], { part: 'body' }),
      k.block(t, H, D - 2 * t, wall, [W / 2 - t / 2, 0, 0], { part: 'body' }),
      k.block(t, H, D - 2 * t, wall, [-W / 2 + t / 2, 0, 0], { part: 'body' }),
    ]);
    // Band: a strip standing proud of the outer walls.
    const bc = P.lavender[500], by = 0.26, bh = 0.14, bt = 0.02;
    const band = k.group([
      k.block(W + 2 * bt, bh, bt, bc, [0, by, D / 2 + bt / 2], { part: 'band' }),
      k.block(W + 2 * bt, bh, bt, bc, [0, by, -D / 2 - bt / 2], { part: 'band' }),
      k.block(bt, bh, D, bc, [W / 2 + bt / 2, by, 0], { part: 'band' }),
      k.block(bt, bh, D, bc, [-W / 2 - bt / 2, by, 0], { part: 'band' }),
    ]);
    // Rim: a frame sitting on top of the walls, 3 cm wider on each side.
    const rc = P.lavender[600], rt = t + 0.06, rh = 0.08;
    const rim = k.group([
      k.block(W + 0.06, rh, rt, rc, [0, H, D / 2 - t / 2], { part: 'rim' }),
      k.block(W + 0.06, rh, rt, rc, [0, H, -D / 2 + t / 2], { part: 'rim' }),
      k.block(rt, rh, D - t - rt, rc, [W / 2 - t / 2, H, 0], { part: 'rim' }),
      k.block(rt, rh, D - t - rt, rc, [-W / 2 + t / 2, H, 0], { part: 'rim' }),
    ]);
    // Handle: half a torus; its open ends are buried in the middle of the side rims.
    const R = W / 2 - t / 2;
    const handle = k.mesh(new THREE.TorusGeometry(R, 0.045, 24, 96, Math.PI), P.indigo[800], { pos: [0, H + rh / 2, 0], scale: [1, 0.78, 1] });

    const bottle = k.group([
      k.lathe([[0, 0], [0.15, 0], [0.15, 0.7], [0.13, 0.78], [0.065, 0.9], [0.065, 1.1], [0, 1.1]], P.pistachio[500], [0, 0, 0]),
      k.cyl(0.075, 0.075, 0.08, P.indigo[800], [0, 1.14, 0]),
    ], [-0.48, 0.08, -0.16]);
    const loaf = k.capsule(V(0.06, 0.5, 0.2), V(0.56, 0.96, 0.04), 0.19, P.butter[400]);
    const apple = k.group([
      k.sphere(0.17, P.peach[300], [0, 0, 0]),
      k.cyl(0.016, 0.016, 0.1, P.pistachio[800], [0, 0.2, 0]),
    ], [-0.2, 0.84, 0.28]);

    const parts = [[body, 0], [band, 0.1], [rim, 0.18], [handle, 0.28], [bottle, 0.4], [loaf, 0.5], [apple, 0.6]]
      .map(([object, delay]) => { g.add(object); return { object, delay }; });
    return { group: g, parts };
  },
  idle() {},
};
