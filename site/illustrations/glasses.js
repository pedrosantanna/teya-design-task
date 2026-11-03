// A pair of glasses standing open: two round rims with tinted lenses, a keyhole bridge, small hinge
// blocks and two temples running back and bending down at the ends. Frames are Indigo 800,
// lenses Lavender 200. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'glasses',
  name: { en: 'Glasses', pt: 'Óculos' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const R = 0.3, tube = 0.034, cx = 0.37, cy = R + tube, ink = P.indigo[800];

    const rim = s => k.group([
      k.mesh(new THREE.TorusGeometry(R, tube, 24, 96), ink, { pos: [s * cx, cy, 0], part: `rim${s}` }),
      k.disc(R, 0.02, P.lavender[200], [s * cx, cy, 0], 'z', { noShadow: true }),
    ]);
    const rims = [rim(-1), rim(1)];
    // Bridge: an arch over the nose between the two rims.
    const gap = cx - R;
    const bridge = k.mesh(new THREE.TorusGeometry(gap + 0.02, 0.03, 16, 48, Math.PI), ink, { pos: [0, cy + 0.08, 0], scale: [1, 0.9, 1] });
    const hx = cx + R + 0.02, hy = cy + 0.1;
    const hinges = k.group([1, -1].map(s => k.box(0.08, 0.07, 0.08, ink, [s * hx, hy, -0.02], { part: 'hinge' })));
    const temple = s => k.group([
      k.capsule(V(s * hx, hy, -0.06), V(s * (hx + 0.03), hy, -1.05), 0.025, ink, { part: `t${s}` }),
      k.capsule(V(s * (hx + 0.03), hy, -1.05), V(s * (hx + 0.03), 0.03, -1.3), 0.025, ink, { part: `t${s}` }),
    ]);

    const parts = collect(g, [[rims[0], 0], [rims[1], 0.08], [bridge, 0.18], [hinges, 0.26], [temple(-1), 0.34], [temple(1), 0.42]]);
    return { group: g, parts };
  },
  idle() {},
};
