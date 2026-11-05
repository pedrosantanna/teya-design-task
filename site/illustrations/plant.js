// A snake plant in a terracotta pot: a tapered Peach 500 pot with a rim, Peach 800 soil and seven tall pointed
// leaves in Pistachio 500 and 600, leaning out a little. Entry: pot, soil, leaves. Idle: the leaves sway slightly.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'plant',
  name: { en: 'Potted plant', pt: 'Planta no vaso' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const pot = k.group([
      k.lathe([[0, 0], [0.28, 0], [0.34, 0.5], [0.4, 0.5], [0.4, 0.66], [0, 0.66]], P.peach[500], [0, 0, 0]),
    ]);
    const soil = k.disc(0.36, 0.01, P.peach[800], [0, 0.665, 0], 'y', { noShadow: true });
    const leaves = k.group([
      [0, 0.05, 0.05, 1.0, 5], [0.15, -0.28, 0.12, 0.8, 6], [-0.14, 0.26, -0.1, 0.85, 5], [0.1, 0.2, 0.3, 0.7, 6],
      [-0.12, -0.2, 0.25, 0.72, 5], [0.04, 0.3, -0.2, 0.62, 6], [-0.04, -0.3, -0.25, 0.66, 5],
    ].map(([x, tz, tx, h, c], i) => {
      const leaf = k.sphere(1, P.pistachio[c * 100], [0, h * 0.45, 0], { scale: [0.1, h * 0.55, 0.035], part: `leaf${i}` });
      const l = k.group([leaf], [x, 0.62, x * 0.6 - 0.02 * i]);
      l.rotation.set(tx, i * 0.9, tz);
      return l;
    }));
    const parts = collect(g, [[pot, 0], [soil, 0.14], [leaves, 0.24]]);
    g.userData.leaves = leaves;
    return { group: g, parts };
  },
  idle(g, t) {
    g.userData.leaves.rotation.z = 0.025 * Math.sin(t * 1.1);
  },
};
