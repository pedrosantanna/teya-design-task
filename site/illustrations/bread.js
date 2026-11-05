// A paper bag of bread: a tapered light-kraft bag (Butter 200) with a Peach 300 stripe and a crinkled, folded top edge,
// three baguettes (Butter 600, Butter 100 slashes facing the camera) standing out of it at different heights and
// leans, and a domed bloomer (Peach 500 crust, three diagonal Butter 100 slashes) on the ground in front and
// slightly right. Entry: bag, baguettes, loaf. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'bread',
  name: { en: 'Bread bag', pt: 'Saco de pães' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const bx = -0.32, bz = -0.2;
    const W = 0.9, D = 0.52, H = 0.72, topK = 0.8;
    const paper = P.butter[200];
    // Bag: a square frustum (wider at the base), turned so its faces look along x and z.
    const frustum = (rt, rb, h) => { const gm = new THREE.CylinderGeometry(rt, rb, h, 4, 1); gm.rotateY(Math.PI / 4); return gm; };
    const body = k.mesh(frustum(0.5 * topK, 0.5, H), paper, { pos: [0, H / 2, 0], scale: [W * 1.4142, 1, D * 1.4142], part: 'bag' });
    // Stripe: a slightly larger frustum slice at the same taper.
    const sy0 = H * 0.5, sy1 = H * 0.66, f = y => 1 - (1 - topK) * (y / H);
    const stripe = k.mesh(frustum(0.5 * f(sy1) + 0.006, 0.5 * f(sy0) + 0.006, sy1 - sy0), P.peach[300],
      { pos: [0, (sy0 + sy1) / 2, 0], scale: [W * 1.4142, 1, D * 1.4142], part: 'stripe' });
    // Crinkled top: a zigzag band folded over the front and back edges, and one over each short edge, in the paper tone.
    const zig = (len, n, amp, thick) => {
      const s = new THREE.Shape();
      s.moveTo(-len / 2, 0);
      for (let i = 0; i <= n; i++) s.lineTo(-len / 2 + (len * i) / n, 0.1 + (i % 2 ? 0 : amp));
      s.lineTo(len / 2, 0); s.lineTo(-len / 2, 0);
      return k.extrude(s, thick, P.butter[100], { part: 'fold' });
    };
    const wTop = W * topK, dTop = D * topK;
    const front = zig(wTop + 0.02, 9, 0.07, 0.035); front.position.set(0, H - 0.01, dTop / 2 + 0.005);
    const back = zig(wTop + 0.02, 9, 0.07, 0.035); back.position.set(0, H - 0.01, -dTop / 2 - 0.005);
    const side = zig(dTop + 0.02, 5, 0.06, 0.035); side.rotation.y = Math.PI / 2; side.position.set(wTop / 2 + 0.005, H - 0.01, 0);
    const bag = k.group([body, stripe, front, back, side], [bx, 0, bz]);
    // Baguettes: capsules standing out of the bag mouth, fanned out, with slashes on the face towards the camera.
    const defs = [
      { x: -0.28, z: 0.0, lean: [-0.16, 0.05], len: 0.7, r: 0.1 },
      { x: 0.0, z: -0.04, lean: [0.04, -0.06], len: 0.98, r: 0.105 },
      { x: 0.27, z: 0.04, lean: [0.2, 0.08], len: 0.62, r: 0.095 },
    ];
    const loaves = defs.map((d, j) => {
      const a = V(bx + d.x, H - 0.1, bz + d.z);
      const dir = V(d.lean[0], 1, d.lean[1]).normalize();
      const b = a.clone().add(dir.clone().multiplyScalar(d.len));
      const kids = [k.capsule(a, b, d.r, P.butter[600], { part: `bg${j}` })];
      const side = V(0.55, 0, 0.84).normalize();
      [0.45, 0.62, 0.79].forEach((fr, i) => {
        const c = a.clone().add(dir.clone().multiplyScalar(d.len * fr)).add(side.clone().multiplyScalar(d.r * 0.92));
        const t = V(0.55, 0, -0.84).normalize().multiplyScalar(0.055);
        const u = dir.clone().multiplyScalar(0.04);
        kids.push(k.capsule(c.clone().sub(t).sub(u), c.clone().add(t).add(u), 0.022, P.butter[100], { scale: [1, 1, 0.6], part: `sl${j}${i}`, noShadow: true }));
      });
      return k.group(kids);
    });
    // Bloomer: a flat-based dome (lathe), with three diagonal slashes lying on its surface.
    const R = 0.58, prof = [[0, 0], [R, 0], [R * 1.02, 0.07], [R * 0.95, 0.2], [R * 0.76, 0.37], [R * 0.45, 0.5], [R * 0.18, 0.56], [0, 0.575]];
    const hAt = r => { for (let i = 3; i < prof.length; i++) if (r >= prof[i][0]) {
      const [r0, y0] = prof[i - 1], [r1, y1] = prof[i];
      return y1 + (y0 - y1) * Math.min(1, Math.max(0, (r - r1) / (r0 - r1)));
    } return prof[prof.length - 1][1]; };
    const lx = 0.64, lz = 0.62;
    const loaf = k.group([
      k.lathe(prof, P.peach[500], [0, 0, 0], { scale: [1.12, 1, 0.9], part: 'loaf' }),
      ...[-0.26, 0, 0.26].flatMap((x, i) => {
        const p = t => { const xx = x + (t - 0.5) * 0.26, zz = (t - 0.5) * 0.5;
          return V(xx, hAt(Math.hypot(xx / 1.12, zz / 0.9)) + 0.035, zz); };
        const curve = new THREE.CatmullRomCurve3(Array.from({ length: 9 }, (_, n) => p(n / 8)));
        return [k.mesh(new THREE.TubeGeometry(curve, 32, 0.04, 12), P.butter[100], { scale: [1, 1, 1], part: `s${i}`, noShadow: true })];
      }),
    ], [lx, 0, lz]);
    const parts = collect(g, [[bag, 0], ...loaves.map((l, i) => [l, 0.12 + i * 0.06]), [loaf, 0.36]]);
    return { group: g, parts };
  },
  idle() {},
};
