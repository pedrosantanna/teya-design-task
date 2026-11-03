// Crossroads: two London high streets crossing, so four blocks round the junction. Each block has two to four
// shops facing the streets (painted fascias, brick or stucco upper floors with sash windows) and a small garden
// behind. Raised pavements with kerbs on all four corners, a zebra crossing with Belisha beacons on each arm,
// centre-line dashes, double yellow lines, lamp columns, a K6 phone box, a pillar box, litter bins, benches,
// plane trees, and café tables outside a café and an ice-cream shop.
// Entry: the ground, the markings, then the four blocks drop in one after another and the street furniture last.
// Idle: the awnings move very slightly.
import { street } from './street.js';

export default {
  id: 'crossroads',
  name: { en: 'Crossroads', pt: 'Cruzamento' },
  build(THREE, P) {
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

    const parts = [[ground, 0], [markings, 0.1],
      ...blocks.map((b, i) => [b, 0.24 + i * 0.16]),
      ...furniture.map((f, i) => [f, 0.95 + i * 0.025]),
      ...trees.map((t, i) => [t, 1.0 + i * 0.06])]
      .map(([object, delay]) => { g.add(object); return { object, delay }; });
    g.userData.awnings = awnings;
    return { group: g, parts, ground: Y0 };
  },
  idle(g, t) {
    g.userData.awnings.forEach((a, i) => { a.rotation.x = 0.015 * Math.sin(t * 1.3 + i * 1.1); });
  },
};
