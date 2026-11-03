// A K6 telephone box as seen across London: a plinth, a square body glazed on three sides with a grid
// of small panes, a sign band with a plain strip on each face, a cornice and a roof of two crossed
// segmental arches, each with a small crown disc. The red is the palette's destructive red (#BA2B28),
// the one red in colour.md, kept as a local constant. Entry: built from the ground up. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';

export const RED = '#BA2B28';
const W = 0.9; // body width (m)

function parts(THREE, P, simple) {
  const k = kit(THREE);
  const glass = P.indigo[100], white = P.biscuit.card;
  const plinth = k.block(W + 0.1, 0.1, W + 0.1, RED, [0, 0, 0]);
  const body = k.block(W, 1.86, W, RED, [0, 0.1, 0]);

  // One glazed face, drawn on +z and turned into place: glass standing proud of the body and,
  // in the full model, three columns and six rows of panes.
  const gw = 0.62, gh = 1.36, gy = 0.34, z = W / 2;
  function face(rotY, door) {
    const id = `grid${rotY}`;
    const f = k.group([k.block(gw, gh, 0.02, glass, [0, gy, z + 0.01])]);
    if (!simple) {
      for (let i = 1; i < 3; i++) f.add(k.block(0.03, gh, 0.02, RED, [-gw / 2 + gw / 3 * i, gy, z + 0.03], { part: id }));
      for (let i = 1; i < 6; i++) f.add(k.block(gw, 0.03, 0.02, RED, [0, gy + gh / 6 * i - 0.015, z + 0.03], { part: id }));
      if (door) f.add(k.block(0.03, 0.14, 0.03, P.indigo[900], [gw / 2 + 0.05, 0.96, z + 0.015]));
    }
    f.rotation.y = rotY;
    return f;
  }
  const glazing = simple ? [face(0), face(Math.PI / 2)] : [face(0, true), face(Math.PI / 2), face(-Math.PI / 2)];

  const SW = W + 0.04;
  const sign = k.group([k.block(SW, 0.22, SW, RED, [0, 1.96, 0])]);
  [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach(r => {
    const s = k.block(0.66, 0.11, 0.015, white, [0, 2.015, SW / 2 + 0.0075], { part: 'strip' });
    const h = k.group([s]); h.rotation.y = r; sign.add(h);
  });
  const cornice = k.block(W + 0.12, 0.05, W + 0.12, RED, [0, 2.18, 0]);

  // Roof: two half cylinders crossing at right angles, flattened into segmental arches.
  const R = (W + 0.1) / 2, L = W + 0.1;
  const gx = new THREE.CylinderGeometry(R, R, L, 64, 1, false, 0, Math.PI); gx.rotateZ(Math.PI / 2);
  const gz = new THREE.CylinderGeometry(R, R, L, 64, 1, false, Math.PI / 2, Math.PI); gz.rotateX(Math.PI / 2);
  const roof = k.group([
    k.mesh(gx, RED, { pos: [0, 2.23, 0], scale: [1, 0.44, 1], part: 'roof' }),
    k.mesh(gz, RED, { pos: [0, 2.23, 0], scale: [1, 0.44, 1], part: 'roof' }),
  ]);
  const crowns = k.group([
    k.disc(0.06, 0.02, P.butter[400], [0, 2.33, L / 2 + 0.01], 'z', { part: 'crown' }),
    k.disc(0.06, 0.02, P.butter[400], [L / 2 + 0.01, 2.33, 0], 'x', { part: 'crown' }),
    k.disc(0.06, 0.02, P.butter[400], [0, 2.33, -L / 2 - 0.01], 'z', { part: 'crown' }),
    k.disc(0.06, 0.02, P.butter[400], [-L / 2 - 0.01, 2.33, 0], 'x', { part: 'crown' }),
  ]);
  return { plinth, body, glazing, sign, cornice, roof, crowns };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [p.plinth, p.body, ...p.glazing, p.sign, p.cornice, p.roof]);
}

export default {
  id: 'phonebox',
  name: { en: 'Telephone box', pt: 'Cabine telefônica' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [
      [p.plinth, 0], [p.body, 0.1], ...p.glazing.map((f, i) => [f, 0.22 + i * 0.07]),
      [p.sign, 0.44], [p.cornice, 0.52], [p.roof, 0.6], [p.crowns, 0.72],
    ]) };
  },
  idle() {},
};
