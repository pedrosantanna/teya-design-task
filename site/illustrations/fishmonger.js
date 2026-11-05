// A fish on ice: a steel tray, a bed of crushed ice with a few loose cubes, a whole fish lying on its side and half
// a lemon. Tray Biscuit muted, ice white, fish Lavender 300 with Lavender 500 fins, lemon Butter 100 and 400.
// Entry: tray, ice, fish, lemon. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'fishmonger',
  name: { en: 'Fish on ice', pt: 'Peixe no gelo' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const W = 1.9, D = 1.15, white = P.biscuit.card;
    const tray = k.group([
      k.block(W, 0.04, D, P.biscuit.muted, [0, 0, 0], { part: 'tray' }),
      ...[1, -1].map(s => k.block(W, 0.14, 0.04, P.biscuit.muted, [0, 0, s * (D / 2 - 0.02)], { part: 'tray' })),
      ...[1, -1].map(s => k.block(0.04, 0.14, D - 0.08, P.biscuit.muted, [s * (W / 2 - 0.02), 0, 0], { part: 'tray' })),
    ]);
    const ice = k.group([
      k.block(W - 0.08, 0.08, D - 0.08, white, [0, 0.04, 0], { part: 'ice' }),
      ...[[-0.75, 0.32, 0.3], [-0.55, -0.36, 1.1], [0.7, 0.34, 0.6], [0.8, -0.3, 0.2], [0.05, 0.4, 0.9], [-0.15, -0.42, 0.4]]
        .map(([x, z, r]) => k.block(0.13, 0.11, 0.13, white, [x, 0.12, z], { rot: [0.2, r, 0.15] })),
    ]);

    // Fish: a lathe along x (head at -x), flattened top to bottom because it lies on its side; the tail and the
    // fins lie flat in the x–z plane.
    const y0 = 0.12, L = 1.25;
    const body = k.lathe([[0, 0], [0.1, 0.03], [0.19, 0.12], [0.24, 0.32], [0.23, 0.55], [0.16, 0.85], [0.08, 1.12], [0.05, L], [0, L]],
      P.lavender[300], [0, 0, 0], { rot: [0, 0, -Math.PI / 2], part: 'fish' });
    const flat = k.group([body], [-0.62, 0, 0]);
    flat.scale.set(1, 0.5, 1);
    const fin = (pts, hex, pos, part) => {
      const s = new THREE.Shape();
      pts.forEach(([x, z], i) => (i ? s.lineTo(x, z) : s.moveTo(x, z)));
      return k.extrude(s, 0.025, hex, { pos, rot: [Math.PI / 2, 0, 0], part });
    };
    const tail = fin([[0, 0], [0.3, 0.24], [0.24, 0], [0.3, -0.24]], P.lavender[500], [0.6, 0, 0], 'tail');
    const back = fin([[-0.25, 0], [0.15, 0], [0.05, 0.16]], P.lavender[500], [-0.05, 0, -0.21], 'fin');
    back.rotation.set(-Math.PI / 2, 0, 0);
    const fish = k.group([flat, tail, back,
      k.sphere(0.045, white, [-0.48, 0.11, 0.05], { part: 'eye' }),
      k.sphere(0.024, P.indigo[900], [-0.49, 0.15, 0.06], { part: 'pupil' }),
    ], [0, y0 + 0.12, 0]);
    fish.rotation.y = 0.12;

    // Lemon: half a sphere, cut face up.
    const lemon = k.group([
      k.mesh(new THREE.SphereGeometry(0.15, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), P.butter[400], { part: 'lemon' }),
      k.disc(0.15, 0.01, P.butter[100], [0, 0.005, 0], 'y', { part: 'flesh' }),
    ], [0.62, 0.27, 0.3]);

    const parts = collect(g, [[tray, 0], [ice, 0.14], [fish, 0.3], [lemon, 0.46]]);
    return { group: g, parts };
  },
  idle() {},
};
