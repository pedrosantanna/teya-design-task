// Pencils in a pot with a notebook: an Indigo 600 pot holding three hexagonal pencils (Butter 100, Peach 300,
// Lavender 300) with sharpened wood and graphite tips, and a closed notebook with a Peach 600 cover, white pages
// and an Indigo 800 elastic. Entry: notebook, pot, pencils. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'stationery',
  name: { en: 'Pencils and notebook', pt: 'Lápis e caderno' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const px = -0.45, pz = -0.25, PH = 0.6;
    const pot = k.group([
      k.lathe([[0, 0], [0.27, 0], [0.28, 0.02], [0.28, PH], [0.25, PH], [0.25, 0.05], [0, 0.05]], P.indigo[600], [0, 0, 0]),
    ], [px, 0, pz]);
    pot.children[0].material.side = THREE.DoubleSide;
    const pencil = (hex, rx, rz, i) => {
      const L = 0.95, r = 0.05;
      const p = k.group([
        k.cyl(r, r, L, hex, [0, L / 2, 0], { seg: 6, part: `p${i}` }),
        k.cyl(0.004, r, 0.14, P.butter[200], [0, L + 0.07, 0], { seg: 6, part: `w${i}` }),
        k.cyl(0.002, 0.016, 0.045, P.indigo[900], [0, L + 0.13, 0], { part: `g${i}` }),
      ], [px + rz * 0.5, 0.05, pz - rx * 0.5]);
      p.rotation.set(rx, i * 0.7, rz);
      return p;
    };
    const pencils = k.group([
      pencil(P.butter[100], 0.08, -0.16, 0),
      pencil(P.peach[300], -0.14, 0.04, 1),
      pencil(P.lavender[300], 0.14, 0.18, 2),
    ]);

    // Notebook lying flat in front and to the right, turned a little.
    const NW = 0.7, ND = 0.95, t = 0.025, pages = 0.09;
    const book = k.group([
      k.block(NW, t, ND, P.peach[600], [0, 0, 0], { part: 'cover0' }),
      k.block(NW - 0.03, pages, ND - 0.04, P.biscuit.card, [0.015, t, 0], { part: 'pages' }),
      k.block(NW, t, ND, P.peach[600], [0, t + pages, 0], { part: 'cover1' }),
      k.block(0.04, t * 2 + pages + 0.01, ND + 0.01, P.indigo[800], [NW / 2 - 0.12, -0.005, 0], { part: 'elastic' }),
    ], [0.45, 0, 0.18]);
    book.rotation.y = -0.3;

    const parts = collect(g, [[book, 0], [pot, 0.16], [pencils, 0.32]]);
    return { group: g, parts };
  },
  idle() {},
};
