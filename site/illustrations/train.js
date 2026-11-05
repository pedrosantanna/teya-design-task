// A wooden toy train: an engine with a Pistachio 500 boiler, an Indigo 600 cab under a Peach 600 roof and an
// Indigo 800 chimney, pulling an open wagon of toy blocks, all on Butter 300 wooden chassis with Butter 100 wheels
// and Indigo 800 hubs. Entry: chassis, engine, wagon, cargo. Idle: the train rocks a little on its wheels.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'train',
  name: { en: 'Toy train', pt: 'Trem de brinquedo' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const wood = P.butter[300], WR = 0.13, CH = 0.1, D = 0.42, cy = WR + 0.02;
    const wheels = (x0, x1) => [x0, x1].flatMap(x => [1, -1].flatMap(s => [
      k.disc(WR, 0.06, P.butter[100], [x, WR, s * (D / 2 + 0.03)], 'z', { part: `w${x}${s}` }),
      k.disc(0.045, 0.08, P.indigo[800], [x, WR, s * (D / 2 + 0.03)], 'z', { part: `h${x}${s}` }),
    ]));
    // Engine at +x, wagon at -x, joined by a peg.
    const ex = 0.45, wx = -0.62;
    const chassis = k.group([
      k.block(0.95, CH, D, wood, [ex, cy, 0], { part: 'ce' }),
      k.block(0.7, CH, D, wood, [wx, cy, 0], { part: 'cw' }),
      k.block(0.22, 0.05, 0.08, P.indigo[800], [-0.14, cy + 0.03, 0]),
      ...wheels(ex - 0.28, ex + 0.28), ...wheels(wx - 0.2, wx + 0.2),
    ]);
    const top = cy + CH;
    const engine = k.group([
      k.mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.55, 64), P.pistachio[500], { pos: [ex + 0.17, top + 0.19, 0], rot: [0, 0, Math.PI / 2], part: 'boiler' }),
      k.disc(0.12, 0.02, P.indigo[800], [ex + 0.455, top + 0.19, 0], 'x', { part: 'front' }),
      k.cyl(0.07, 0.09, 0.24, P.indigo[800], [ex + 0.3, top + 0.38 + 0.12, 0], { part: 'chimney' }),
      k.block(0.36, 0.5, D, P.indigo[600], [ex - 0.28, top, 0], { part: 'cab' }),
      k.block(0.18, 0.16, 0.01, P.lavender[200], [ex - 0.28, top + 0.26, D / 2 + 0.005], { part: 'window', noShadow: true }),
      k.block(0.46, 0.06, D + 0.1, P.peach[600], [ex - 0.28, top + 0.5, 0], { part: 'roof' }),
    ]);
    const wagon = k.group([
      k.block(0.7, 0.04, D, P.butter[400], [wx, top, 0], { part: 'wagon' }),
      ...[1, -1].map(s => k.block(0.7, 0.2, 0.04, P.butter[400], [wx, top, s * (D / 2 - 0.02)], { part: 'wagon' })),
      ...[1, -1].map(s => k.block(0.04, 0.2, D - 0.08, P.butter[400], [wx + s * 0.33, top, 0], { part: 'wagon' })),
    ]);
    const cargo = k.group([
      k.block(0.22, 0.22, 0.22, P.peach[300], [wx - 0.14, top + 0.04, 0.02], { rot: [0, 0.3, 0] }),
      k.cyl(0.1, 0.1, 0.3, P.lavender[300], [wx + 0.16, top + 0.04 + 0.15, -0.03]),
      k.block(0.18, 0.12, 0.18, P.indigo[300], [wx - 0.12, top + 0.26, 0.0], { rot: [0, -0.4, 0] }),
    ]);
    g.rotation.y = 0;
    const parts = collect(g, [[chassis, 0], [engine, 0.16], [wagon, 0.3], [cargo, 0.44]]);
    return { group: g, parts };
  },
  idle() {},
};
