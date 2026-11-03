// A London bus stop flag: a pole on a small base and, at the top, a white flag plate with a plain
// red ring and a bar across it, standing for the stop sign without any lettering, and a small
// timetable case lower down. The red is the telephone box's. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';
import { RED } from './phonebox.js';

function parts(THREE, P, simple) {
  const k = kit(THREE);
  const ink = P.indigo[800], white = P.biscuit.card;
  const base = k.cyl(0.1, 0.12, 0.06, ink, [0, 0.03, 0]);
  const pole = k.cyl(0.04, 0.04, 2.9, ink, [0, 1.45, 0]);
  // Flag: a plate on the +x side of the pole, its faces towards ±z.
  const fx = 0.3, fy = 2.5;
  const flag = k.group([
    k.box(0.5, 0.56, 0.03, white, [fx, fy, 0]),
    k.mesh(new THREE.TorusGeometry(0.15, 0.04, 16, 64), RED, { pos: [fx, fy + 0.04, 0.02], part: 'ring' }),
    k.box(0.42, 0.08, 0.02, ink, [fx, fy + 0.04, 0.035]),
  ]);
  if (!simple) flag.add(k.box(0.06, 0.06, 0.06, ink, [0.04, fy, 0], { part: 'clamp' }));
  const timetable = k.group([
    k.box(0.3, 0.4, 0.04, ink, [0.0, 1.45, 0.06], { part: 'tt' }),
    k.box(0.24, 0.32, 0.01, P.indigo[100], [0.0, 1.45, 0.085]),
  ]);
  return { base, pole, flag, timetable };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [p.base, p.pole, p.flag]);
}

export default {
  id: 'busstop',
  name: { en: 'Bus stop', pt: 'Ponto de ônibus' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [[p.base, 0], [p.pole, 0.1], [p.timetable, 0.24], [p.flag, 0.34]]) };
  },
  idle() {},
};
