// A bunch of flowers wrapped in paper, lying on its side: a paper cone open at the top, green stems out of
// the narrow end, and five round blooms with a centre each, plus two leaves. Few large shapes so it reads at
// 120 px. Paper Butter 100, stems and leaves Pistachio 500 to 600, blooms Peach 300, Lavender 300 and
// Butter 100 with Butter 400 or Peach 500 centres, the tie Indigo 600. Entry: paper, stems, blooms, tie. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'flowers',
  name: { en: 'Flowers in paper', pt: 'Flores no papel' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    // Modelled standing (cone along +y), then laid down along x and lifted onto the ground.
    const lay = o => { o.rotation.z = -Math.PI / 2 + 0.12; o.position.set(-0.75, 0.36, 0); return o; };
    const R = 0.36, H = 1.05;

    const paper = lay(k.group([
      k.mesh(new THREE.ConeGeometry(R, H, 64, 1, true), P.butter[100], { pos: [0, H / 2, 0], rot: [Math.PI, 0, 0] }),
    ]));
    paper.children[0].material.side = THREE.DoubleSide;
    const stems = lay(k.group([
      k.cyl(0.03, 0.03, 0.42, P.pistachio[600], [-0.03, -0.12, 0], { part: 'stems' }),
      k.cyl(0.03, 0.03, 0.42, P.pistachio[600], [0.04, -0.14, 0.03], { part: 'stems', rot: [0, 0, 0.12] }),
    ]));
    const blooms = lay(k.group([
      [P.peach[300], P.peach[500], [0, H + 0.02, 0], 0.2],
      [P.lavender[300], P.butter[400], [0.22, H - 0.08, 0.12], 0.17],
      [P.butter[100], P.butter[400], [-0.22, H - 0.06, -0.08], 0.17],
      [P.peach[300], P.peach[500], [-0.14, H - 0.1, 0.24], 0.15],
      [P.lavender[300], P.butter[400], [0.16, H - 0.06, -0.22], 0.15],
    ].flatMap(([petal, centre, [x, y0, z], r], i) => [y0 + 0.16].flatMap(y => [
      k.sphere(r, petal, [x, y, z], { scale: [1, 0.55, 1], part: `b${i}` }),
      k.sphere(r * 0.38, centre, [x, y + r * 0.42, z], { part: `c${i}` }),
    ])).concat([
      k.sphere(0.16, P.pistachio[500], [0.3, H - 0.25, -0.05], { scale: [0.45, 1, 0.2], rot: [0, 0, -0.5], part: 'leaf1' }),
      k.sphere(0.15, P.pistachio[500], [-0.3, H - 0.22, 0.1], { scale: [0.45, 1, 0.2], rot: [0, 0, 0.5], part: 'leaf2' }),
    ])));
    const tie = lay(k.group([k.cyl(0.075, 0.07, 0.07, P.indigo[600], [0, 0.14, 0])]));

    const parts = collect(g, [[paper, 0], [stems, 0.12], [blooms, 0.22], [tie, 0.4]]);
    return { group: g, parts };
  },
  idle() {},
};
