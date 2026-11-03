// Delivery boxes: a large box with packing tape and a shipping label, and a smaller box
// sitting on it at an angle. Two big masses and a label as the focal point.
import kit from './kit.js';

export default {
  id: 'box',
  name: { en: 'Delivery box', pt: 'Caixa de entrega' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const W = 1.6, H = 1.0, D = 1.2, tt = 0.012, tw = 0.28, tape = P.indigo[600];

    const big = k.block(W, H, D, P.butter[300], [0, 0, 0]);
    const tapeBig = k.group([
      k.block(W, tt, tw, tape, [0, H, 0], { part: 'tape' }),
      k.block(tt, 0.36, tw, tape, [W / 2 + tt / 2, H - 0.36 + tt, 0], { part: 'tape' }),
      k.block(tt, 0.36, tw, tape, [-W / 2 - tt / 2, H - 0.36 + tt, 0], { part: 'tape' }),
    ]);
    const label = k.group([
      k.block(0.56, 0.36, tt, P.biscuit.card, [0.34, 0.3, D / 2 + tt / 2]),
      k.block(0.34, 0.05, 0.006, P.indigo[800], [0.29, 0.52, D / 2 + tt + 0.003], { part: 'text' }),
      k.block(0.22, 0.05, 0.006, P.indigo[800], [0.23, 0.4, D / 2 + tt + 0.003], { part: 'text' }),
      k.block(0.1, 0.1, 0.006, P.peach[300], [0.52, 0.4, D / 2 + tt + 0.003]),
    ]);
    const w = 0.84, h = 0.52, d = 0.7;
    const small = k.group([
      k.block(w, h, d, P.peach[200], [0, 0, 0]),
      k.block(w, tt, 0.2, tape, [0, h, 0], { part: 'tape2' }),
    ], [-0.18, H + tt, -0.04]);
    small.rotation.y = 0.38;

    const parts = [[big, 0], [tapeBig, 0.16], [label, 0.26], [small, 0.38]]
      .map(([object, delay]) => { g.add(object); return { object, delay }; });
    return { group: g, parts };
  },
  idle() {},
};
