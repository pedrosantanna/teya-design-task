// A London pavement café set: a round bistro table on a cast foot with a cup and saucer on it, two
// bistro chairs (round seat, four legs, a bent hoop back) and a small A-frame chalkboard.
// Frames are Indigo 800, the table top is white, seats are Butter 300. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';

const TY = 0.74; // table top height (m)

function parts(THREE, P, simple) {
  const k = kit(THREE), V = k.V;
  const ink = P.indigo[800], white = P.biscuit.card;
  const table = k.group([
    k.cyl(0.17, 0.2, 0.04, ink, [0, 0.02, 0], { part: 'tframe' }),
    k.cyl(0.025, 0.025, TY - 0.06, ink, [0, 0.04 + (TY - 0.06) / 2, 0], { part: 'tframe' }),
    k.cyl(0.32, 0.32, 0.035, white, [0, TY - 0.0175, 0]),
  ]);

  // A chair facing +z, its hoop back behind the seat; turned and placed by the caller.
  function chair(pos, rotY) {
    const c = k.group([
      k.cyl(0.19, 0.19, 0.04, P.butter[300], [0, 0.46, 0]),
    ], pos);
    if (simple) {
      c.add(k.cyl(0.025, 0.025, 0.44, ink, [0, 0.22, 0], { part: 'cframe' }));
      c.add(k.cyl(0.13, 0.13, 0.02, ink, [0, 0.01, 0], { part: 'cframe' }));
    } else {
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sx, sz]) =>
        c.add(k.capsule(V(0.12 * sx, 0.44, 0.12 * sz), V(0.16 * sx, 0.015, 0.16 * sz), 0.016, ink, { part: 'cframe' })));
      c.add(k.mesh(new THREE.TorusGeometry(0.15, 0.015, 12, 48), ink, { pos: [0, 0.2, 0], rot: [Math.PI / 2, 0, 0], part: 'cframe' }));
    }
    // Hoop back: uprights from the back of the seat to a half-ring rail.
    const R = 0.17;
    [1, -1].forEach(sx => c.add(k.capsule(V(0.14 * sx, 0.46, -0.09), V(0.15 * sx, 0.84, -0.08), 0.018, ink, { part: 'back' })));
    c.add(k.mesh(new THREE.TorusGeometry(R, simple ? 0.035 : 0.022, 12, 48, Math.PI), ink, { pos: [0, 0.84, 0], rot: [-Math.PI / 2, 0, 0], part: 'back' }));
    if (!simple) c.add(k.mesh(new THREE.TorusGeometry(R, 0.016, 12, 48, Math.PI), ink, { pos: [0, 0.7, 0], rot: [-Math.PI / 2, 0, 0], part: 'back' }));
    c.rotation.y = rotY;
    return c;
  }
  const chairs = [chair([-0.62, 0, 0.1], Math.PI / 2), chair([0.08, 0, -0.62], 0)];

  const cup = k.group([
    k.cyl(0.085, 0.07, 0.014, white, [0, 0.007, 0]),
    k.lathe([[0, 0], [0.045, 0], [0.062, 0.08], [0.054, 0.08], [0.04, 0.012], [0, 0.012]], P.peach[300], [0, 0.014, 0]),
    k.disc(0.05, 0.004, P.peach[700], [0, 0.074, 0], 'y', { noShadow: true }),
    k.mesh(new THREE.TorusGeometry(0.025, 0.008, 10, 32), P.peach[300], { pos: [0.068, 0.054, 0], rot: [0, 0, 0] }),
  ], [0.08, TY, 0.08]);

  // A-frame chalkboard: two boards leaning together, a dark slate inset on the front one.
  const bw = 0.42, bh = 0.68, lean = 0.2;
  const board = (sign) => {
    const b = k.group([k.box(bw, bh, 0.025, P.peach[500], [0, bh / 2, 0], { part: `ab${sign}` })]);
    if (sign > 0) {
      b.add(k.box(bw - 0.08, bh - 0.12, 0.01, P.indigo[900], [0, bh / 2 + 0.01, 0.016]));
      if (!simple) [0, 1, 2].forEach(i => b.add(k.box(0.24 - i * 0.05, 0.022, 0.004, white, [-0.02 * i, bh - 0.16 - i * 0.1, 0.023], { noShadow: true, part: 'chalk' })));
    }
    b.position.z = sign * Math.sin(lean) * bh; // the two tops meet over the middle
    b.rotation.x = -sign * lean;
    return b;
  };
  const aframe = k.group([board(1), board(-1)], [0.82, 0, -0.42]);
  aframe.rotation.y = 0.3;
  return { table, chairs, cup, aframe };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [p.table, ...p.chairs]);
}

export function buildMiniBoard(THREE, P) {
  const p = parts(THREE, P, true);
  p.aframe.position.set(0, 0, 0); p.aframe.rotation.y = 0;
  return mini(THREE, [p.aframe]);
}

export default {
  id: 'cafetable',
  name: { en: 'Café table', pt: 'Mesa de café' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [
      [p.table, 0], [p.chairs[0], 0.14], [p.chairs[1], 0.24], [p.aframe, 0.36], [p.cup, 0.5],
    ]) };
  },
  idle() {},
};
