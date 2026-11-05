// A chemist's counter: an amber medicine bottle with a white cap and label, and a box of plasters with the green
// pharmacy cross on its lid and one plaster lying in front. Bottle Peach 700, box white with a Pistachio 600
// cross, plaster Peach 300 with a white pad. Entry: box, bottle, cap, plaster. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'chemist',
  name: { en: 'Medicine and plasters', pt: 'Remédio e curativos' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const white = P.biscuit.card;
    const bx = -0.5, bz = -0.22;
    const bottle = k.group([
      k.lathe([[0, 0], [0.24, 0], [0.26, 0.02], [0.26, 0.62], [0.22, 0.7], [0.13, 0.76], [0.13, 0.82], [0, 0.82]], P.peach[700], [0, 0, 0]),
      k.cyl(0.264, 0.264, 0.28, white, [0, 0.33, 0], { part: 'label' }),
      k.block(0.2, 0.006, 0.006, P.pistachio[600], [0, 0.4, 0.266]),
    ], [bx, 0, bz]);
    const cap = k.group([k.cyl(0.16, 0.16, 0.16, white, [0, 0.9, 0])], [bx, 0, bz]);

    // Box of plasters lying flat, its lid a slightly larger slab, the cross raised on the lid.
    const W = 1.0, D = 0.66, H = 0.26;
    const box = k.group([
      k.block(W, H - 0.07, D, white, [0, 0, 0], { part: 'box' }),
      k.block(W + 0.02, 0.07, D + 0.02, P.pistachio[200], [0, H - 0.07, 0], { part: 'lid' }),
      k.block(0.34, 0.015, 0.1, P.pistachio[600], [0, H, 0], { part: 'cross' }),
      k.block(0.1, 0.015, 0.34, P.pistachio[600], [0, H, 0], { part: 'cross' }),
    ], [0.35, 0, -0.05]);
    box.rotation.y = -0.25;

    const plaster = k.group([
      k.capsule(k.V(-0.32, 0, 0), k.V(0.32, 0, 0), 0.1, P.peach[300], { scale: [1, 0.2, 1], part: 'strip' }),
      k.block(0.22, 0.012, 0.15, white, [0, 0.008, 0], { part: 'pad' }),
    ], [-0.05, 0.02, 0.6]);
    plaster.rotation.y = 0.35;

    const parts = collect(g, [[box, 0], [bottle, 0.16], [cap, 0.3], [plaster, 0.42]]);
    return { group: g, parts };
  },
  idle() {},
};
