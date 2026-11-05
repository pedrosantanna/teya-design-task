// A wedge of cheese and a jar of olives: a pale Butter 100 wedge with a Peach 500 rind round its curved back, and
// a Pistachio 500 jar with an Indigo 800 lid and a white label. Entry: cheese, jar, lid. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'deli',
  name: { en: 'Cheese and olives', pt: 'Queijo e azeitonas' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const R = 0.8, A = 0.75, H = 0.5;
    // The wedge: a sector of a cylinder from its point at the origin, its curved back facing -x.
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.absarc(0, 0, R, Math.PI - A / 2, Math.PI + A / 2, false);
    s.lineTo(0, 0);
    const wedge = k.extrude(s, H, P.butter[100], { rot: [-Math.PI / 2, 0, 0], pos: [0, H / 2, 0], part: 'cheese' });
    const rind = k.mesh(new THREE.CylinderGeometry(R + 0.012, R + 0.012, H, 64, 1, true, -Math.PI / 2 - A / 2, A), P.peach[500],
      { pos: [0, H / 2, 0], part: 'rind' });
    rind.material.side = THREE.DoubleSide;
    const cheese = k.group([wedge, rind], [0.36, 0, -0.3]);
    cheese.rotation.y = 1.5;

    const jx = -0.45, jz = 0.4;
    const jar = k.group([
      k.lathe([[0, 0], [0.2, 0], [0.22, 0.03], [0.22, 0.5], [0.19, 0.55], [0.17, 0.57], [0, 0.57]], P.pistachio[500], [0, 0, 0]),
      k.cyl(0.224, 0.224, 0.2, P.biscuit.card, [0, 0.26, 0], { part: 'label' }),
    ], [jx, 0, jz]);
    const lid = k.group([k.cyl(0.19, 0.19, 0.09, P.indigo[800], [jx, 0.615, jz])]);

    const parts = collect(g, [[cheese, 0], [jar, 0.18], [lid, 0.34]]);
    return { group: g, parts };
  },
  idle() {},
};
