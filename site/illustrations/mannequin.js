// A dress form for a shop window: a fabric torso (hips, waist, bust and a short neck, no head or arms)
// with a wooden cap, on a pole with a height collar and a three-legged base.
// Fabric is Butter 200, wood is Peach 500, metal is Indigo 800. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';

const TB = 0.92; // torso bottom (m)

function parts(THREE, P, simple) {
  const k = kit(THREE), V = k.V;
  const ink = P.indigo[800], wood = P.peach[500];
  const base = simple
    ? k.group([k.cyl(0.24, 0.26, 0.04, ink, [0, 0.02, 0])])
    : k.group([
      k.cyl(0.05, 0.06, 0.08, ink, [0, 0.2, 0], { part: 'base' }),
      ...[0, 1, 2].map(i => {
        const a = i * Math.PI * 2 / 3 + Math.PI / 6;
        return k.capsule(V(0, 0.2, 0), V(0.34 * Math.sin(a), 0.03, 0.34 * Math.cos(a)), 0.02, ink, { part: 'base' });
      }),
      ...[0, 1, 2].map(i => {
        const a = i * Math.PI * 2 / 3 + Math.PI / 6;
        return k.sphere(0.035, ink, [0.34 * Math.sin(a), 0.035, 0.34 * Math.cos(a)], { part: 'base' });
      }),
    ]);
  const pole = k.cyl(0.02, 0.02, TB - 0.2, ink, [0, 0.2 + (TB - 0.2) / 2, 0]);
  const collar = k.cyl(0.04, 0.04, 0.06, wood, [0, 0.62, 0]);
  // Torso: a profile of revolution, flattened front to back and broader across the shoulders.
  const torso = k.lathe([[0, 0], [0.17, 0], [0.2, 0.06], [0.205, 0.16], [0.16, 0.34], [0.155, 0.4],
    [0.18, 0.5], [0.195, 0.58], [0.2, 0.68], [0.185, 0.74], [0.12, 0.785], [0.06, 0.8], [0.055, 0.86], [0, 0.86]],
  P.butter[200], [0, TB, 0], { scale: [1.18, 1, 0.76], seg: simple ? 24 : 64 });
  const cap = k.group([
    k.cyl(0.075, 0.065, 0.03, wood, [0, TB + 0.875, 0], { part: 'cap' }),
    k.sphere(0.03, wood, [0, TB + 0.905, 0], { part: 'cap' }),
  ]);
  const plate = k.cyl(0.19, 0.19, 0.02, wood, [0, TB - 0.01, 0]);
  return { base, pole, collar, plate, torso, cap };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [p.base, p.pole, p.torso]);
}

export default {
  id: 'mannequin',
  name: { en: 'Dress form', pt: 'Manequim' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [
      [p.base, 0], [p.pole, 0.12], [p.collar, 0.22], [p.plate, 0.3], [p.torso, 0.38], [p.cap, 0.52],
    ]) };
  },
  idle() {},
};
