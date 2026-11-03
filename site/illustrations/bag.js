// A leather crossbody bag: a rounded body, a flap folding over the top and down the front with a
// rounded edge, a brass clasp, two side rings and a long strap. Leather is Peach 500 to 700,
// brass is Butter 400. Idle: the strap sways a little on its rings.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'bag',
  name: { en: 'Crossbody bag', pt: 'Bolsa transversal' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const W = 1.2, H = 0.86, D = 0.34, r = 0.16;
    const brass = P.butter[400];

    // Body: a rounded rectangle in the front view, extruded front to back.
    const rr = (w, h, rad, flatTop) => {
      const s = new THREE.Shape(), x = -w / 2, y = 0;
      s.moveTo(x + rad, y);
      s.lineTo(x + w - rad, y); s.quadraticCurveTo(x + w, y, x + w, y + rad);
      if (flatTop) { s.lineTo(x + w, y + h); s.lineTo(x, y + h); }
      else { s.lineTo(x + w, y + h - rad); s.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); s.lineTo(x + rad, y + h); s.quadraticCurveTo(x, y + h, x, y + h - rad); }
      s.lineTo(x, y + rad); s.quadraticCurveTo(x, y, x + rad, y);
      return s;
    };
    const body = k.extrude(rr(W, H, r, true), D, P.peach[500]);
    const base = k.group([body]);

    // Flap: a slab over the top and a front panel down to about 60% of the height, one outline id.
    const ft = 0.03, fh = H * 0.58;
    const front = k.extrude(rr(W + 0.02, fh, 0.22, true), ft, P.peach[600], { part: 'flap' });
    front.position.set(0, H - fh, D / 2 + ft / 2);
    const top = k.box(W + 0.02, ft, D + ft, P.peach[600], [0, H + ft / 2, ft / 2], { part: 'flap' });
    const flap = k.group([front, top]);
    const clasp = k.group([
      k.box(0.16, 0.12, 0.02, brass, [0, H - fh + 0.11, D / 2 + ft + 0.01]),
      k.box(0.06, 0.05, 0.03, P.peach[700], [0, H - fh + 0.11, D / 2 + ft + 0.03]),
    ]);
    // Rings on the sides, and the strap: a tube that rises from one ring, arcs over and comes down to the other.
    const ringY = H - 0.06;
    const rings = k.group([1, -1].map(s =>
      k.mesh(new THREE.TorusGeometry(0.055, 0.016, 12, 32), brass, { pos: [s * (W / 2 + 0.03), ringY + 0.05, 0], rot: [0, Math.PI / 2, 0] })));
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const a = Math.PI * i / 24;
      pts.push(new THREE.Vector3(Math.cos(a) * (W / 2 + 0.03), Math.sin(a) * 1.0 + 0.1, 0));
    }
    const strapMesh = k.mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.028, 12), P.peach[700]);
    strapMesh.scale.z = 0.5;
    const strap = k.group([strapMesh], [0, ringY, 0]);

    const parts = collect(g, [[base, 0], [flap, 0.16], [clasp, 0.28], [rings, 0.36], [strap, 0.44]]);
    g.userData.strap = strap;
    return { group: g, parts };
  },
  idle(g, t) {
    g.userData.strap.rotation.x = 0.07 * Math.sin(t * 1.3);
  },
};
