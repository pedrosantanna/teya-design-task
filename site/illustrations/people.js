// People for the street scenes and a gallery row of them. Drawn like the scooter's rider: no face, a head,
// a capsule body, capsule arms and legs, a haircut or a hat; very few parts, so a figure still reads at a
// few dozen pixels. Standalone figures are about 1.7 m at 1 unit = 1 m; in the scenes they are scaled by PS.
//
// buildPerson(THREE, P, opts) returns a group standing on y = 0, facing +z, with the joints in userData so
// stride() can pose a walk. opts: { coat, legs, skin, hair, top: 'bob' | 'short' | 'hat', long (a long coat),
// bag (a bag in the left hand, its colour), lead (the right arm holds a lead), pose: 'walk' | 'stand' | 'sit', seat (hip height when
// sitting), reach (sitting arms forward, 0–1), shapes (shared geometries) }.
// buildDog(THREE, P, opts) is a terrier-sized block dog on y = 0 facing +z: { coat, scale, shapes }.
// walkers() moves people (and dogs on leads) along polyline loops on the scene's pavements and crossings.
import kit from './kit.js';

export const PS = 0.28; // people in the scenes: 1.7 m ≈ 0.48 units, a little smaller than the furniture scale
const HIP = 0.84, SHOULDER = 1.38, ARM = 0.6, STRIDE = 1.3; // metres; STRIDE: ground covered by one leg cycle

// Geometries shared by every figure in one scene (the viewer disposes them once, with the scene).
export function shapes(THREE) {
  // A capsule hanging down from its pivot: the top cap centre sits on the origin, the bottom end at -reach.
  const limb = (r, reach) => { const g = new THREE.CapsuleGeometry(r, reach - r, 6, 20); g.translate(0, -(reach - r) / 2, 0); return g; };
  const cap = (r, t) => new THREE.SphereGeometry(r, 28, 14, 0, Math.PI * 2, 0, t);
  const box = (w, h, d, y = 0) => { const g = new THREE.BoxGeometry(w, h, d); g.translate(0, y, 0); return g; };
  const torso = new THREE.CapsuleGeometry(0.17, 0.44, 8, 24);
  torso.translate(0, 1.14, 0);
  const coat = new THREE.LatheGeometry([[0, 0.5], [0.2, 0.5], [0.185, 0.95], [0.17, 1.3], [0.13, 1.48], [0, 1.54]]
    .map(([r, y]) => new THREE.Vector2(r, y)), 24);
  return {
    leg: limb(0.075, HIP), arm: limb(0.055, ARM), torso, coat,
    head: new THREE.SphereGeometry(0.125, 28, 14),
    bob: cap(0.14, Math.PI * 0.6), short: cap(0.134, Math.PI * 0.42),
    brim: new THREE.CylinderGeometry(0.2, 0.2, 0.025, 28), crown: new THREE.CylinderGeometry(0.115, 0.125, 0.12, 28),
    bag: box(0.26, 0.3, 0.12, -0.15),
    dogBody: box(0.16, 0.17, 0.46), dogHead: box(0.15, 0.15, 0.15), dogSnout: box(0.085, 0.07, 0.09),
    dogEar: box(0.04, 0.07, 0.03), dogLeg: box(0.05, 0.22, 0.05, -0.11), dogTail: limb(0.022, 0.16),
    lead: (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 6); g.translate(0, 0.5, 0); return g; })(),
  };
}

let uid = 0;
export function buildPerson(THREE, P, o = {}) {
  const k = kit(THREE), V = k.V, S = o.shapes || shapes(THREE), id = uid++;
  const coat = o.coat || P.indigo[600], legsC = o.legs || P.indigo[900], skin = o.skin || P.peach[400];
  const pose = o.pose || 'walk';
  const person = new THREE.Group(), rig = new THREE.Group();
  person.add(rig);
  const body = `pb${id}`, legPart = `pl${id}`;
  // Sitting lowers the upper body to the seat; the legs become a thigh and a shin.
  const seat = pose === 'sit' ? (o.seat || 0.5) : HIP, dy = seat - HIP;
  const legs = [];
  if (pose === 'sit') {
    [1, -1].forEach(s => {
      const knee = V(0.095 * s, seat + 0.02, 0.42), foot = V(0.1 * s, 0.06, 0.48);
      rig.add(k.capsule(V(0.085 * s, seat, 0.02), knee, 0.075, legsC, { part: legPart }));
      rig.add(k.capsule(knee, foot, 0.068, legsC, { part: legPart }));
    });
  } else {
    [1, -1].forEach(s => {
      const l = k.mesh(S.leg, legsC, { pos: [0.085 * s, HIP, 0], part: legPart });
      rig.add(l); legs.push(l);
    });
  }
  const upper = k.group([], [0, dy, 0]);
  rig.add(upper);
  upper.add(o.long ? k.mesh(S.coat, coat, { scale: [1, 1, 0.8], part: body }) : k.mesh(S.torso, coat, { scale: [1, 1, 0.74], part: body }));
  const arms = [1, -1].map(s => {
    const a = k.group([k.mesh(S.arm, coat, { part: body })], [0.215 * s, SHOULDER, 0]);
    upper.add(a);
    return a;
  });
  if (o.bag) arms[0].add(k.mesh(S.bag, o.bag, { pos: [0, -ARM - 0.02, 0.02] })); // left hand
  const head = k.mesh(S.head, skin, { pos: [0, 1.66, 0] });
  upper.add(head);
  const top = o.top || 'short', hairC = o.hair || P.biscuit.darkMuted;
  if (top === 'hat') {
    upper.add(k.mesh(S.brim, o.hatColour || P.indigo[800], { pos: [0, 1.745, 0], part: `ph${id}` }));
    upper.add(k.mesh(S.crown, o.hatColour || P.indigo[800], { pos: [0, 1.815, 0], part: `ph${id}` }));
  } else {
    const h = k.mesh(S[top], hairC, { pos: [0, 1.665, -0.005], rot: [top === 'bob' ? -0.45 : -0.35, 0, 0] });
    h.material.side = THREE.DoubleSide;
    upper.add(h);
  }
  // Arms at rest: a little away from the body. Sitting: forward onto the lap or the table.
  arms.forEach((a, i) => { a.rotation.z = (i ? -1 : 1) * 0.06; });
  if (pose === 'sit') arms.forEach(a => { a.rotation.x = -0.5 - (o.reach || 0) * 0.7; });
  if (o.lead) arms[1].rotation.x = -0.45;
  person.userData = { rig, legs, arms, upper, lead: !!o.lead, bag: !!o.bag, pose };
  return person;
}

// One frame of the walk: phase in radians (2π per stride). The swung leg lifts the hip, so the rig drops
// by the same amount and the planted foot stays on the ground; the arms swing against the legs.
export function stride(person, phase, amp = 0.36) {
  const u = person.userData, a = amp * Math.sin(phase);
  u.legs[0].rotation.x = a; u.legs[1].rotation.x = -a;
  u.arms[0].rotation.x = -a * (u.bag ? 0.35 : 0.8);
  if (!u.lead) u.arms[1].rotation.x = a * 0.8;
  u.rig.position.y = -HIP * (1 - Math.cos(a));
}

export function buildDog(THREE, P, o = {}) {
  const k = kit(THREE), S = o.shapes || shapes(THREE), id = uid++;
  const c = o.coat || P.butter[400], dark = o.dark || P.peach[700];
  const dog = new THREE.Group(), rig = new THREE.Group();
  dog.add(rig);
  const b = `db${id}`, lp = `dl${id}`;
  rig.add(k.mesh(S.dogBody, c, { pos: [0, 0.3, 0], part: b }));
  rig.add(k.mesh(S.dogHead, c, { pos: [0, 0.44, 0.25], part: b }));
  rig.add(k.mesh(S.dogSnout, dark, { pos: [0, 0.41, 0.36] }));
  [1, -1].forEach(s => rig.add(k.mesh(S.dogEar, dark, { pos: [0.05 * s, 0.54, 0.22], rot: [0, 0, 0.25 * s] })));
  rig.add(k.mesh(S.dogTail, c, { pos: [0, 0.36, -0.21], rot: [-2.5, 0, 0], part: b }));
  const legs = [[1, 1], [-1, 1], [1, -1], [-1, -1]].map(([sx, sz]) => {
    const l = k.mesh(S.dogLeg, c, { pos: [0.05 * sx, 0.22, 0.17 * sz], part: lp });
    rig.add(l);
    return l;
  });
  dog.scale.setScalar(o.scale || 1);
  dog.userData = { rig, legs, collar: [0, 0.42, 0.18] };
  return dog;
}

// A trot: diagonal pairs swing together.
export function trot(dog, phase) {
  const u = dog.userData, a = 0.45 * Math.sin(phase);
  u.legs[0].rotation.x = a; u.legs[3].rotation.x = a;
  u.legs[1].rotation.x = -a; u.legs[2].rotation.x = -a;
  u.rig.position.y = 0.012 * Math.abs(Math.cos(phase));
}

// --- Walking loops in the scenes -----------------------------------------------------------
// A closed polyline of [x, z] points in scene units, with arc-length lookup. at(s) writes x, z and the heading
// (rotation about y for a figure facing +z) into `out`; the heading follows the chord over ±TURN, so the
// figure turns smoothly through a corner instead of snapping.
function loop(pts) {
  const n = pts.length, cum = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    const [x0, z0] = pts[i], [x1, z1] = pts[(i + 1) % n];
    cum[i + 1] = cum[i] + Math.hypot(x1 - x0, z1 - z0);
  }
  const len = cum[n];
  function point(s, out) {
    s = ((s % len) + len) % len;
    let i = 0;
    while (cum[i + 1] < s) i++;
    const [x0, z0] = pts[i], [x1, z1] = pts[(i + 1) % n], f = (s - cum[i]) / (cum[i + 1] - cum[i] || 1);
    out.x = x0 + (x1 - x0) * f; out.z = z0 + (z1 - z0) * f;
  }
  const a = { x: 0, z: 0 }, b = { x: 0, z: 0 }, TURN = 0.08;
  return {
    len,
    at(s, out) {
      point(s, out);
      point(s - TURN, a); point(s + TURN, b);
      out.h = Math.atan2(b.x - a.x, b.z - a.z);
    },
  };
}

// walkers(THREE, P, scene, shapes) → { parts, update(t), reset() }. scene: { surface(x, z) → [feet y, shadow y], speed,
// routes: [{ pts, people: [{ at (0–1 along the loop), dog: true | { coat }, ...buildPerson opts }] }] }.
// Each figure (and each dog, and each lead) is its own entry part; update(t) places everyone at idle time t.
export function walkers(THREE, P, scene, S) {
  const k = kit(THREE), parts = [], movers = [];
  const speed = scene.speed || 0.2, DOG = PS * 0.95, LEAD = 0.17; // dog trots this far ahead along the loop
  const tmp = { x: 0, z: 0, h: 0 };
  scene.routes.forEach(r => {
    const path = loop(r.pts);
    r.people.forEach(p => {
      const fig = buildPerson(THREE, P, { ...p, shapes: S, lead: !!p.dog });
      fig.scale.setScalar(PS);
      const ref = { y: 0 };
      fig.traverse(m => { if (m.isMesh) m.userData.shadowRef = ref; });
      // Slightly different strides, so the walkers start together from a standing pose and drift out of step.
      const mv = { path, s0: p.at * path.len, fig, ref, dog: null, step: STRIDE * PS * (1 + 0.07 * movers.length) };
      parts.push(fig);
      if (p.dog) {
        const dog = buildDog(THREE, P, { shapes: S, ...(p.dog === true ? {} : p.dog) });
        dog.scale.multiplyScalar(DOG);
        const dref = { y: 0 };
        dog.traverse(m => { if (m.isMesh) m.userData.shadowRef = dref; });
        const lead = k.mesh(S.lead, P.indigo[900], { noShadow: true });
        lead.scale.set(0.004, 1, 0.004);
        mv.dog = dog; mv.dref = dref; mv.lead = lead;
        parts.push(dog, lead);
      }
      movers.push(mv);
    });
  });
  const up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3();
  function place(mv, clock) {
    const s = mv.s0 + speed * clock;
    mv.path.at(s, tmp);
    const [y, sy] = scene.surface(tmp.x, tmp.z);
    mv.fig.position.set(tmp.x, y, tmp.z);
    mv.fig.rotation.y = tmp.h;
    mv.ref.y = sy;
    stride(mv.fig, ((s - mv.s0) / mv.step) * Math.PI * 2);
    if (!mv.dog) return;
    const fx = tmp.x, fz = tmp.z, fh = tmp.h, fy = y + mv.fig.userData.rig.position.y * PS;
    mv.path.at(s + LEAD, tmp);
    const [dy, dsy] = scene.surface(tmp.x, tmp.z);
    mv.dog.position.set(tmp.x, dy, tmp.z);
    mv.dog.rotation.y = tmp.h;
    mv.dref.y = dsy;
    trot(mv.dog, ((s - mv.s0) / (0.5 * DOG)) * Math.PI * 2);
    // The lead runs from the right hand (arm held forward) to the collar.
    const hx = -0.215, hy = SHOULDER - ARM * Math.cos(0.45), hz = ARM * Math.sin(0.45);
    const ax = fx + PS * (hx * Math.cos(fh) + hz * Math.sin(fh)), az = fz + PS * (-hx * Math.sin(fh) + hz * Math.cos(fh));
    const ay = fy + PS * hy;
    const [, cy, cz] = mv.dog.userData.collar;
    const bx = tmp.x + DOG * cz * Math.sin(tmp.h), bz = tmp.z + DOG * cz * Math.cos(tmp.h), by = dy + DOG * cy;
    dir.set(bx - ax, by - ay, bz - az);
    const len = dir.length();
    mv.lead.position.set(ax, ay, az);
    mv.lead.quaternion.setFromUnitVectors(up, dir.multiplyScalar(1 / (len || 1)));
    mv.lead.scale.y = Math.max(len, 0.01);
  }
  movers.forEach(mv => place(mv, 0));
  return {
    parts,
    // t: the viewer's idle time, which restarts at 0 after each entry; reset() puts everyone back at the start,
    // where the entry measured them, so the replayed entry and the walk that follows line up.
    update(t) { for (let i = 0; i < movers.length; i++) place(movers[i], t); },
    reset() { for (let i = 0; i < movers.length; i++) place(movers[i], 0); },
  };
}

// A figure placed by the scene: standing at a door or sitting on a bench or chair. at: [x, y, z], h: heading.
// Idle: a slight sway, so they are not frozen while the others walk.
export function still(THREE, P, S, o, [x, y, z], h) {
  const fig = buildPerson(THREE, P, { ...o, shapes: S });
  fig.scale.setScalar(PS);
  fig.position.set(x, y, z);
  fig.rotation.y = h;
  return fig;
}
export function sway(fig, t, i = 0) {
  const u = fig.userData;
  if (u.pose === 'sit') u.upper.rotation.x = 0.03 * Math.sin(t * 0.7 + i);
  else u.rig.rotation.z = 0.02 * Math.sin(t * 0.8 + i);
}

// The gallery object: five figures in a row, walking on the spot (the last one stands).
export default {
  id: 'people',
  name: { en: 'People', pt: 'Pessoas' },
  build(THREE, P) {
    const S = shapes(THREE), k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const specs = [
      { coat: P.indigo[600], legs: P.indigo[900], skin: P.peach[200], top: 'hat', long: true, hatColour: P.biscuit.darkMuted },
      { coat: P.peach[300], legs: P.lavender[800], skin: P.peach[600], top: 'bob', hair: P.indigo[900] },
      { coat: P.pistachio[500], legs: P.biscuit.darkMuted, skin: P.peach[400], top: 'short', hair: P.peach[700], bag: P.butter[300] },
      { coat: P.butter[400], legs: P.indigo[800], skin: P.peach[700], top: 'bob', hair: P.butter[700], lead: true, long: true },
      { coat: P.lavender[500], legs: P.indigo[900], skin: P.peach[300], top: 'short', hair: P.biscuit.darkMuted, pose: 'stand' },
    ];
    // The row runs across the screen in the isometric view; each figure turns a little from the camera.
    const H = Math.PI / 4 - 0.45, D = 0.95 / Math.SQRT2;
    const figs = specs.map((o, i) => {
      const f = buildPerson(THREE, P, { ...o, shapes: S });
      f.position.set((i - 2) * D, 0, -(i - 2) * D);
      f.rotation.y = H;
      g.add(f);
      return f;
    });
    // The dog trots ahead of its owner; the lead runs from the right hand to the collar and hangs from the
    // owner's rig, so it follows the walk's bob.
    const owner = figs[3], dog = buildDog(THREE, P, { shapes: S, coat: P.peach[500] });
    const dx = -0.12, dz = 0.62;
    dog.position.set(owner.position.x + dx * Math.cos(H) + dz * Math.sin(H), 0, owner.position.z - dx * Math.sin(H) + dz * Math.cos(H));
    dog.rotation.y = H;
    g.add(dog);
    const hand = V(-0.215, SHOULDER - ARM * Math.cos(0.45), ARM * Math.sin(0.45));
    owner.userData.rig.add(k.capsule(hand, V(dx, 0.42, dz + 0.18), 0.008, P.indigo[900], { noShadow: true }));
    figs.forEach((f, i) => { if (i < 4) stride(f, i * 1.3); });
    trot(dog, 0);
    g.userData = { figs, dog };
    const list = [...figs.map((f, i) => [f, i * 0.12]), [dog, 0.3]];
    g.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
    return { group: g, parts: list.map(([object, delay]) => ({ object, delay })) };
  },
  reset(g) {
    const u = g.userData;
    u.figs.forEach((f, i) => { if (i < 4) stride(f, i * 1.3); else sway(f, 0); });
    trot(u.dog, 0);
  },
  idle(g, t) {
    const u = g.userData;
    u.figs.forEach((f, i) => { if (i < 4) stride(f, t * 4.2 + i * 1.3); else sway(f, t); });
    trot(u.dog, t * 8.4);
  },
};
