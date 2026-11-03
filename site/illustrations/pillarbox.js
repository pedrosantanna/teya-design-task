// A pillar box: a red cylinder on a black plinth band, a slightly overhanging domed cap with a rim,
// a dark posting slot under a little hood, a plain white plate where the collection times go and a
// small door outline. The red is the palette's destructive red, as in the telephone box. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';
import { RED } from './phonebox.js';

function parts(THREE, P, simple) {
  const k = kit(THREE);
  const R = 0.28, H = 1.2;
  const plinth = k.cyl(R + 0.01, R + 0.02, 0.12, P.indigo[900], [0, 0.06, 0]);
  const body = k.cyl(R, R, H - 0.12, RED, [0, 0.12 + (H - 0.12) / 2, 0]);
  const cap = k.group([
    k.cyl(R + 0.04, R + 0.04, 0.05, RED, [0, H + 0.025, 0], { part: 'cap' }),
    k.lathe([[R + 0.02, 0], [R - 0.02, 0.08], [R * 0.6, 0.15], [0, 0.18]], RED, [0, H + 0.05, 0], { part: 'cap' }),
  ]);
  // Front details sit on the curved face towards +z.
  const z = R;
  const slot = k.group([
    k.box(0.26, 0.04, 0.12, RED, [0, H - 0.12, z - 0.01], { part: 'hood' }),
    k.box(0.22, 0.035, 0.08, P.biscuit.fg, [0, H - 0.165, z - 0.02]),
  ]);
  // Plate and door: thin curved shells just proud of the body.
  const shell = (r, h, a, hex, y) => k.mesh(new THREE.CylinderGeometry(r, r, h, 48, 1, false, -a / 2, a), hex, { pos: [0, y, 0] });
  const plate = shell(R + 0.008, 0.11, 0.6, P.biscuit.card, H - 0.3);
  const door = shell(R + 0.005, 0.42, 1.2, RED, 0.62);
  return simple ? { plinth, body, cap, slot } : { plinth, body, cap, slot, plate, door };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [p.plinth, p.body, p.cap, p.slot]);
}

export default {
  id: 'pillarbox',
  name: { en: 'Pillar box', pt: 'Caixa de correio' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [
      [p.plinth, 0], [p.body, 0.1], [p.cap, 0.22], [p.door, 0.32], [p.slot, 0.4], [p.plate, 0.48],
    ]) };
  },
  idle() {},
};
