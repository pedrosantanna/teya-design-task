// A London high street bench, the plain Westminster kind: two cast-iron ends (a seat rail on two legs,
// a raked back post and an armrest), five seat slats and three back slats in timber.
// Iron is Biscuit dark muted (#332C27), timber is Peach 500. Entry: the ends, then each slat. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';

const L = 1.8;  // length (m)
const SY = 0.44; // seat height
const LEAN = 0.17; // back rake (rad)

function parts(THREE, P, simple) {
  const k = kit(THREE);
  const iron = P.biscuit.darkMuted, wood = P.peach[500];
  // End frame in side view: z forward, y up. Legs and the seat rail leave an opening under the seat;
  // the back post rises from the rear leg, the armrest runs forward from it on a front post.
  const s = new THREE.Shape();
  [[0.27, 0], [0.2, 0], [0.16, 0.34], [-0.13, 0.34], [-0.19, 0], [-0.28, 0], [-0.24, SY],
    [-0.33, 0.95], [-0.25, 0.95], [-0.165, SY + 0.05], ...(simple ? [] : [[-0.15, 0.62], [0.2, 0.64], [0.27, 0.6], [0.24, 0.56], [0.2, SY + 0.01]]),
    [0.24, SY]].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  if (!simple) {
    const h = new THREE.Path();
    [[-0.1, SY + 0.06], [0.16, SY + 0.06], [0.16, 0.56], [-0.11, 0.57]].forEach(([x, y], i) => (i ? h.lineTo(x, y) : h.moveTo(x, y)));
    s.holes.push(h);
  }
  const end = x => {
    const m = k.extrude(s, 0.06, iron);
    m.geometry.rotateY(-Math.PI / 2);
    m.position.x = x;
    return m;
  };
  const ex = L / 2 - 0.14;
  const ends = [end(-ex), end(ex)];

  const seat = [], back = [];
  const n = simple ? 1 : 5, sd = 0.44 / n;
  for (let i = 0; i < n; i++) {
    seat.push(k.block(L, 0.045, sd - (simple ? 0 : 0.018), wood, [0, SY, 0.22 - sd * (i + 0.5)]));
  }
  const bn = simple ? 1 : 3;
  for (let i = 0; i < bn; i++) {
    const h = simple ? 0.3 : 0.085, y = simple ? SY + 0.2 : SY + 0.16 + i * 0.12;
    const b = k.box(L, h, 0.035, wood, [0, y + h / 2, -0.165 - (y + h / 2 - SY - 0.05) * Math.tan(LEAN) + 0.012], { rot: [-LEAN, 0, 0] });
    back.push(b);
  }
  return { ends, seat, back };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [...p.ends, ...p.seat, ...p.back]);
}

export default {
  id: 'bench',
  name: { en: 'Bench', pt: 'Banco' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [
      [p.ends[0], 0], [p.ends[1], 0.08],
      ...p.seat.map((o, i) => [o, 0.2 + i * 0.05]),
      ...p.back.map((o, i) => [o, 0.48 + i * 0.07]),
    ]) };
  },
  idle() {},
};
