// The morning paper and a pint: a folded newspaper lying flat with a headline bar, a picture and lines of text,
// and a glass pint bottle of milk with a green foil top, as left on a London doorstep. Paper white with
// Indigo 800 and Biscuit muted print and a Peach 300 picture, milk white with a Pistachio 500 cap. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'newsagent',
  name: { en: 'Paper and a pint', pt: 'Jornal e leite' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const white = P.biscuit.card, W = 1.15, D = 0.8, T = 0.07;
    const sheet = k.group([
      k.block(W, T, D, white, [0, 0, 0], { part: 'paper' }),
      k.mesh(new THREE.CylinderGeometry(T / 2, T / 2, W, 32), white, { pos: [0, T / 2, -D / 2], rot: [0, 0, Math.PI / 2], part: 'paper' }),
    ]);
    const y = T + 0.004, ink = P.biscuit.darkMutedFg;
    const print = k.group([
      k.block(W - 0.2, 0.006, 0.12, P.indigo[800], [0, y, -D / 2 + 0.16], { noShadow: true }),
      k.block(0.42, 0.006, 0.36, P.peach[300], [0.24, y, 0.12], { noShadow: true }),
      ...[0, 1, 2].map(i => k.block(0.4, 0.006, 0.04, ink, [-0.26, y, -0.02 + i * 0.12], { noShadow: true, part: `l${i}` })),
    ]);
    const paper = k.group([sheet, print], [0.42, 0, -0.08]);
    paper.rotation.y = 0.28;

    const milk = k.group([
      k.lathe([[0, 0], [0.2, 0], [0.22, 0.03], [0.22, 0.42], [0.2, 0.52], [0.14, 0.68], [0.12, 0.8], [0.135, 0.82], [0.135, 0.86], [0, 0.86]], white, [0, 0, 0], { part: 'milk' }),
    ], [-0.48, 0, 0.02]);
    const cap = k.group([k.cyl(0.14, 0.14, 0.05, P.pistachio[500], [-0.48, 0.885, 0.02])]);

    const parts = collect(g, [[paper, 0], [milk, 0.24], [cap, 0.4]]);
    return { group: g, parts };
  },
  idle() {},
};
