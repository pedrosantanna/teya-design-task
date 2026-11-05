// A compact film camera: an Indigo 800 body under a silver top plate, a silver lens barrel with dark glass, a
// viewfinder window, a flash, a shutter button and a rewind knob. Entry: body, top plate, lens, details. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'camera',
  name: { en: 'Film camera', pt: 'Câmera de filme' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const W = 1.4, H = 0.62, D = 0.44, F = D / 2, silver = P.biscuit.muted, ink = P.indigo[800];
    const body = k.group([
      k.block(W, H, D, ink, [0, 0, 0], { part: 'body' }),
      k.block(0.2, H - 0.04, 0.06, P.indigo[900], [-W / 2 + 0.16, 0.02, F + 0.03], { part: 'grip' }),
    ]);
    const plate = k.group([k.block(W, 0.16, D, silver, [0, H, 0])]);
    const lens = k.group([
      k.disc(0.26, 0.16, silver, [0, 0, 0.08], 'z', { part: 'barrel' }),
      k.disc(0.2, 0.06, silver, [0, 0, 0.19], 'z', { part: 'ring' }),
      k.disc(0.15, 0.02, P.indigo[900], [0, 0, 0.225], 'z', { part: 'glass' }),
      k.disc(0.06, 0.01, P.lavender[200], [0.04, 0.04, 0.238], 'z', { part: 'glint', noShadow: true }),
    ], [0.12, 0.34, F]);
    const details = k.group([
      k.block(0.22, 0.09, 0.02, P.lavender[200], [-0.38, H + 0.035, F + 0.01], { part: 'finder' }),
      k.block(0.26, 0.09, 0.02, P.butter[100], [0.42, H + 0.035, F + 0.01], { part: 'flash' }),
      k.cyl(0.07, 0.07, 0.05, P.peach[500], [0.5, H + 0.185, -0.04], { part: 'shutter' }),
      k.cyl(0.09, 0.09, 0.06, ink, [-0.45, H + 0.19, -0.04], { part: 'knob' }),
    ]);
    g.rotation.y = 0;
    const parts = collect(g, [[body, 0], [plate, 0.14], [lens, 0.26], [details, 0.4]]);
    return { group: g, parts };
  },
  idle() {},
};
