// Crossroads: two London high streets crossing, so four blocks round the junction. Each block has two to four
// shops facing the streets (painted fascias, brick or stucco upper floors with sash windows) and a small garden
// behind. Raised pavements with kerbs on all four corners, a zebra crossing with Belisha beacons on each arm,
// centre-line dashes, double yellow lines, lamp columns, a K6 phone box, a pillar box, litter bins, benches,
// plane trees, and café tables outside a café and an ice-cream shop. People: three walk round the junction over
// all four zebras (one with a dog, one with a bag), one sits on a bench, one at a café table, one waits at a door.
// Entry: the ground, the markings, then the four blocks drop in one after another, the street furniture and the
// people last. Idle: the awnings move very slightly and the people walk; with Reduce Motion everyone stands still.
//
// shoppers: the same street for the Getting started hero (app assets only, export.js), where the city is at rest and
// the idle loops every SHOPPERS_T seconds. Each of the three walkers crosses one zebra on a route that starts and ends
// out of sight: inside a shop (coming out of its door, or going in) or behind a block, so the step from the end of a
// route back to its start is never seen. The sway and the awnings move a whole number of times per loop.
import { street } from './street.js';
import { PS, shapes, walkers, still, sway } from './people.js';

export const SHOPPERS_T = 14; // seconds

function build(THREE, P, shoppers) {
  const S = street(THREE, P), k = S.k;
  const g = new THREE.Group();
  const E = 4.6, R = 0.9, B0 = 1.4, DEP = 1.1, END = 4.45, Y0 = 0.18, RY = 0.1;
  const white = S.white, road = P.biscuit.muted, pave = P.butter[50];

  // Ground: one road slab and four pavement corners raised 8 cm, each with a garden at the back.
  const ground = S.bake(k.group([
    k.block(2 * E, RY, 2 * E, road, [0, 0, 0], { ground: true, part: 'road' }),
    ...[[1, 1], [1, -1], [-1, 1], [-1, -1]].flatMap(([sx, sz]) => [
      k.block(E - R, Y0 - RY, E - R, pave, [sx * (R + E) / 2, RY, sz * (R + E) / 2], { ground: true, part: 'pave' }),
      k.block(1.75, 0.02, 1.75, P.pistachio[200], [sx * 3.475, Y0, sz * 3.475], { ground: true, part: 'grass' }),
    ]),
  ]));

  // Markings on each arm: a zebra (bars along the road, stacked across it), centre dashes, double yellow lines.
  const M = 0.008, marks = [];
  const arm = (along, sign) => {
    // along = 'x': the arm runs along x on the side `sign`; positions are written as (a, c): a along, c across.
    const at = (a, c, la, lc, hex, part) => k.block(along === 'x' ? la : lc, M, along === 'x' ? lc : la, hex,
      along === 'x' ? [sign * a, RY, c] : [c, RY, sign * a], { ground: true, part });
    for (let c = -0.7; c <= 0.71; c += 0.2) marks.push(at(1.35, c, 0.5, 0.1, white, 'zebra'));
    for (let a = 2.0; a < E - 0.2; a += 0.6) marks.push(at(a, 0, 0.3, 0.05, white, 'dash'));
    marks.push(at(1.75, R / 2, 0.05, R - 0.04, white, 'dash')); // give-way line on the approach half
    [-1, 1].forEach(s => [R - 0.05, R - 0.11].forEach(o =>
      marks.push(at((1.8 + E) / 2, s * o, E - 1.85, 0.025, P.butter[100], 'yellow'))));
  };
  arm('x', 1); arm('x', -1); arm('z', 1); arm('z', -1);
  const markings = S.bake(k.group(marks));

  // Blocks. In each quadrant (sx, sz), u runs along x away from the junction and w along z.
  // A shop is [u0, u1, w0, w1, options]; the corner shop faces both streets.
  const awnings = [];
  const block = (sx, sz, shops) => {
    const fx = sz > 0 ? '-z' : '+z', fz = sx > 0 ? '-x' : '+x';
    return k.group(shops.map(([u0, u1, w0, w1, o]) => {
      const xs = [sx * u0, sx * u1].sort((a, b) => a - b), zs = [sz * w0, sz * w1].sort((a, b) => a - b);
      const fronts = o.side === 'x' ? [fx] : o.side === 'z' ? [fz] : [fx, fz];
      const b = S.building(xs[0], xs[1], zs[0], zs[1], { y0: Y0, ...o, fronts });
      awnings.push(...b.awnings);
      return b.group;
    }));
  };
  const C = B0 + DEP;
  const blocks = [
    block(-1, -1, [
      [B0, C, B0, C, { floors: 2, wall: 'stucco', paint: P.indigo[800], chimney: [-0.5, -0.5] }],
      [C, 3.45, B0, C, { side: 'x', backs: true, floors: 2, wall: 'brick', paint: P.pistachio[700], awning: P.pistachio[500] }],
      [3.45, END, B0, C, { side: 'x', backs: true, floors: 1, wall: 'stock', paint: P.lavender[700], recess: true, mannequin: true }], // clothes shop
      [B0, C, C, END, { side: 'z', backs: true, floors: 1, wall: 'cream', paint: P.peach[600], awning: P.butter[400] }],
    ]),
    block(1, -1, [
      [B0, C, B0, C, { floors: 2, wall: 'stock', paint: P.butter[700], chimney: [0.5, -0.5] }],
      [C, END, B0, C, { side: 'x', backs: true, floors: 1, wall: 'brick', paint: P.pistachio[800], awning: P.biscuit.card }], // café
      [B0, C, C, 3.6, { side: 'z', backs: true, floors: 2, wall: 'stucco', paint: P.indigo[600] }],
    ]),
    block(-1, 1, [
      [B0, C, B0, C, { floors: 1, wall: 'brick', paint: P.indigo[600], awning: P.indigo[300] }],
      [B0, C, C, 3.45, { side: 'z', backs: true, floors: 1, wall: 'stucco', paint: P.peach[300], awning: P.peach[200] }], // ice cream
      [B0, C, 3.45, END, { side: 'z', backs: true, floors: 2, wall: 'stock', paint: P.lavender[800], chimney: [0, 0.5] }],
    ]),
    // Nearest the camera: kept low so the junction stays in view.
    block(1, 1, [
      [B0, C, B0, C, { floors: 1, wall: 'stock', paint: P.pistachio[700], awning: P.pistachio[400], backs: true }],
      [C, 3.5, B0, C, { side: 'x', backs: true, floors: 0, wall: 'stock', paint: P.indigo[800] }],
    ]),
  ];

  // Street furniture, on the pavements between the kerb (0.9) and the shop fronts (1.4).
  const F = 1.12;
  const furniture = [
    S.piece('lamppost', [-2.0, Y0, -F]), S.piece('lamppost', [F, Y0, 2.2]), S.piece('lamppost', [-3.8, Y0, F]),
    S.piece('lamppost', [3.9, Y0, -F]),
    S.piece('phonebox', [F + 0.04, Y0, -2.9], -Math.PI / 2),
    S.piece('pillarbox', [-F, Y0, -2.0]),
    S.piece('litterbin', [2.25, Y0, -F]), S.piece('litterbin', [-F, Y0, 2.0]), S.piece('litterbin', [3.0, Y0, F]),
    S.piece('bench', [-2.65, Y0, -F - 0.06]), S.piece('bench', [3.4, Y0 + 0.02, 2.9], Math.PI / 4),
    S.piece('cafetable', [3.3, Y0, -F], Math.PI / 2), S.piece('chalkboard', [2.75, Y0, -F + 0.1], 0.3),
    S.piece('cafetable', [-F, Y0, 3.0]),
    S.piece('busstop', [-3.7, Y0, -F + 0.12]),
    ...[[1.35, 1], [1.35, -1]].flatMap(([a, s]) => [
      S.belisha([a, Y0, s * (R + 0.12)]), S.belisha([-a, Y0, s * (R + 0.12)]),
      S.belisha([s * (R + 0.12), Y0, a]), S.belisha([s * (R + 0.12), Y0, -a]),
    ]),
  ];
  const trees = [
    S.tree([-3.8, Y0 + 0.02, -3.3]), S.tree([3.9, Y0 + 0.02, 3.6], 1.1), S.tree([3.3, Y0 + 0.02, -3.9], 0.9),
    S.tree([-3.2, Y0 + 0.02, 3.9]),
  ];

  // People. The walkers go round the junction inside the beacons, crossing each arm on its zebra; feet and
  // shadows step down the kerb onto the road and back up.
  const PS3 = shapes(THREE), M2 = 0.008;
  const surface = (x, z) => {
    const d = Math.min(Math.abs(x), Math.abs(z)) - R; // > 0 on a pavement
    const f = Math.min(1, Math.max(0, (d + 0.025) / 0.05));
    return [RY + (Y0 - RY) * f * f * (3 - 2 * f), d > 0 ? Y0 : RY + M2];
  };
  // Start points (at) fall on the corner pavements, so with Reduce Motion nobody stands in the road.
  const c = 0.97, a = 1.2;
  const hat = { coat: P.indigo[600], legs: P.indigo[900], skin: P.peach[200], top: 'hat', long: true, hatColour: P.biscuit.darkMuted };
  const dogWalker = { coat: P.butter[400], legs: P.indigo[800], skin: P.peach[600], top: 'bob', hair: P.butter[700], long: true, dog: { coat: P.peach[500] } };
  const shopper = { coat: P.pistachio[500], legs: P.biscuit.darkMuted, skin: P.peach[300], top: 'short', hair: P.peach[700], bag: P.butter[300] };
  const walk = walkers(THREE, P, shoppers ? {
    // Doors: a shop front's door is at its right-hand end, 0.175 in from the corner. Each route starts and ends
    // 0.25 or more inside a shop or behind a block. Zebras are crossed at 1.2 from the junction's axes, beside
    // the beacons (1.35) and the furniture (1.12). The phases keep two walkers from meeting at a corner, and at
    // the start (the still) everyone in sight is on a pavement.
    surface, period: SHOPPERS_T, routes: [
      // Out of the corner shop facing the high street, over the west zebra, into the corner shop opposite.
      { open: true, pts: [[-1.575, -1.65], [-1.575, -1.22], [-a, -1.22], [-a, 1.22], [-a, 1.575], [-1.65, 1.575]], people: [{ at: 0.15, ...hat }] },
      // Out of the same corner shop's side door, past the pillar box, over the north zebra, then up the street
      // behind the block on the right (past the figure waiting at its side door).
      { open: true, pts: [[-1.65, -2.325], [-1.3, -2.325], [-1.3, -1.6], [-a, -1.22], [a, -1.22], [a, -2.1]], people: [{ at: 0.85, ...shopper }] },
      // From behind the near block, over the east zebra, to behind the block on the right, with the dog ahead.
      { open: true, pts: [[a, 1.95], [a, -2.3]], people: [{ at: 0.2, ...dogWalker }] },
    ],
  } : { surface, speed: 0.2, routes: [{
    pts: [[a, -c], [a, c], [c, a], [-c, a], [-a, c], [-a, -c], [-c, -a], [c, -a]],
    people: [{ at: 0.232, ...hat }, { at: 0.482, ...dogWalker }, { at: 0.732, ...shopper }],
  }] }, PS3);
  const SEAT = 0.194 / PS + 0.075; // bench and café chair seats, in the figures' metres
  const stills = [
    still(THREE, P, PS3, { pose: 'sit', seat: SEAT, coat: P.lavender[500], legs: P.indigo[900], skin: P.peach[700], top: 'short', hair: P.indigo[900] }, [-2.45, Y0, -1.21], 0),
    still(THREE, P, PS3, { pose: 'sit', seat: SEAT + 0.01, reach: 1, coat: P.peach[300], legs: P.lavender[800], skin: P.peach[400], top: 'bob', hair: P.biscuit.darkMuted }, [-1.355, Y0, 3.04], Math.PI / 2),
    still(THREE, P, PS3, { pose: 'stand', coat: P.indigo[300], legs: P.indigo[900], skin: P.peach[400], top: 'hat' }, [1.33, Y0, -1.575], -Math.PI / 2 + 0.5), // at the corner shop's side door
  ];

  const parts = [[ground, 0], [markings, 0.1],
    ...blocks.map((b, i) => [b, 0.24 + i * 0.16]),
    ...furniture.map((f, i) => [f, 0.95 + i * 0.025]),
    ...trees.map((t, i) => [t, 1.0 + i * 0.06]),
    ...[...stills, ...walk.parts].map((o, i) => [o, 1.45 + i * 0.05])]
    .map(([object, delay]) => { g.add(object); return { object, delay }; });
  g.userData.awnings = awnings;
  g.userData.walk = walk;
  g.userData.stills = stills;
  return { group: g, parts, ground: Y0 };
}

const reset = (g) => { g.userData.walk.reset(); g.userData.stills.forEach(f => sway(f, 0)); };

export default {
  id: 'crossroads',
  name: { en: 'Crossroads', pt: 'Cruzamento' },
  build: (THREE, P) => build(THREE, P, false),
  reset,
  idle(g, t) {
    g.userData.awnings.forEach((a, i) => { a.rotation.x = 0.015 * Math.sin(t * 1.3 + i * 1.1); });
    g.userData.walk.update(t);
    g.userData.stills.forEach((f, i) => sway(f, t, i * 2));
  },
};

// Frequencies rounded to whole cycles per loop: the awnings (1.3 rad/s) and the sway (0.7 and 0.8 rad/s).
const per = (w) => (2 * Math.PI * Math.max(1, Math.round((w * SHOPPERS_T) / (2 * Math.PI)))) / SHOPPERS_T;
export const shoppers = {
  id: 'crossroads-shoppers',
  name: { en: 'Crossroads, shoppers', pt: 'Cruzamento, compradores' },
  build: (THREE, P) => build(THREE, P, true),
  reset,
  idle(g, t) {
    g.userData.awnings.forEach((a, i) => { a.rotation.x = 0.015 * Math.sin(t * per(1.3) + i * 1.1); });
    g.userData.walk.update(t);
    // sway(f, t) runs at 0.7 or 0.8 rad/s; its time is scaled so both come out at a whole number of cycles.
    g.userData.stills.forEach((f, i) => sway(f, (t * per(f.userData.pose === 'sit' ? 0.7 : 0.8)) / (f.userData.pose === 'sit' ? 0.7 : 0.8), i * 2));
  },
};
