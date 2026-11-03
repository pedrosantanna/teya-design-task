// A London high street corner: five shops on one block (painted fascias, brick or stucco upper floors with
// sash windows, some with awnings), a raised pavement with a kerb, a zebra crossing with Belisha beacons,
// centre-line dashes, double yellow lines, a lamp column, a K6 phone box, a pillar box, a litter bin, a bench,
// a café table outside one shop and a plane tree across the street, and a second zebra across the side street.
// People: two walk a loop round the junction on the pavements and both zebras (one with a dog, one with a bag),
// one sits on the bench, one at the café table, one waits at a shop door. The ground receives the cast shadows.
// Entry: the ground, then the shops drop in one after another, then the street furniture and the people.
// Idle: the awnings move very slightly and the people walk; with Reduce Motion everyone stands still.
import { street } from './street.js';
import { PS, shapes, walkers, still, sway } from './people.js';

export default {
  id: 'corner',
  name: { en: 'High street corner', pt: 'Esquina da rua comercial' },
  build(THREE, P) {
    const S = street(THREE, P), k = S.k;
    const g = new THREE.Group();
    const Y0 = 0.18, RY = 0.1, M = 0.008; // pavement top, road top, marking thickness
    const white = S.white, road = P.biscuit.muted, pave = P.butter[50], yellow = P.butter[100];

    // Ground: one road slab, the block's pavement and the far pavements, all raised 8 cm as kerbs.
    const ground = S.bake(k.group([
      k.block(5.2, RY, 5.2, road, [0, 0, 0], { ground: true, part: 'road' }),
      k.block(3.5, Y0 - RY, 3.5, pave, [-0.85, RY, -0.85], { ground: true, part: 'pave' }),
      k.block(0.7, Y0 - RY, 5.2, pave, [2.25, RY, 0], { ground: true, part: 'pave2' }),
      k.block(4.5, Y0 - RY, 0.7, pave, [-0.35, RY, 2.25], { ground: true, part: 'pave2' }),
    ]));
    // The street along x runs over z 0.9–1.9 and the street along z over x 0.9–1.9.
    // Zebra bars lie along the road and stack across it.
    const marks = S.bake(k.group([
      ...[1.0, 1.2, 1.4, 1.6, 1.8].map(z => k.block(0.5, M, 0.1, white, [-0.4, RY, z], { ground: true, part: 'zebra' })),
      ...[1.0, 1.2, 1.4, 1.6, 1.8].map(x => k.block(0.1, M, 0.5, white, [x, RY, -1.05], { ground: true, part: 'zebra' })),
      ...[-2.25, -1.6, -0.5, 0.15].map(z => k.block(0.05, M, 0.3, white, [1.4, RY, z], { ground: true, part: 'dash' })),
      ...[-2.3, -1.6].map(x => k.block(0.3, M, 0.05, white, [x, RY, 1.4], { ground: true, part: 'dash' })),
      ...[0.95, 1.01].map(z => k.block(1.8, M, 0.025, yellow, [-1.75, RY, z], { ground: true, part: 'yellow' })),
      ...[0.95, 1.01].flatMap(x => [[-2.0, 1.1], [-0.15, 1.0]].map(([z, l]) =>
        k.block(0.025, M, l, yellow, [x, RY, z], { ground: true, part: 'yellow' }))),
    ]));

    // Shops: [x0, x1, z0, z1, options]. The five footprints tile the block; fronts face the two streets.
    const shops = [
      [-0.7, 0.3, -0.7, 0.3, { fronts: ['+z', '+x'], floors: 2, wall: 'stucco', paint: P.indigo[800], awning: P.indigo[600], chimney: [-0.5, -0.5] }],
      [-1.6, -0.7, -1.6, 0.3, { fronts: ['+z'], floors: 1, wall: 'brick', paint: P.pistachio[800], awning: P.biscuit.card }], // café
      [-2.5, -1.6, -2.5, 0.3, { fronts: ['+z'], floors: 2, wall: 'stock', paint: P.lavender[700], chimney: [0, -0.6], recess: true, mannequin: true }], // clothes shop
      [-0.7, 0.3, -1.6, -0.7, { fronts: ['+x'], floors: 1, wall: 'cream', paint: P.peach[600], awning: P.peach[300] }],
      [-1.6, 0.3, -2.5, -1.6, { fronts: ['+x'], floors: 2, wall: 'brick', paint: P.indigo[600], awning: P.butter[400] }],
    ];
    const awnings = [];
    const buildings = shops.map(([x0, x1, z0, z1, o]) => {
      const b = S.building(x0, x1, z0, z1, { y0: Y0, ...o });
      awnings.push(...b.awnings);
      return b.group;
    });

    const furniture = [
      S.piece('lamppost', [0.72, Y0, 0.72]),
      S.piece('phonebox', [2.25, Y0, -2.2], -Math.PI / 2),
      S.piece('pillarbox', [-2.1, Y0, 0.66]),
      S.piece('litterbin', [0.66, Y0, -0.35]),
      S.piece('cafetable', [-1.15, Y0, 0.6], Math.PI / 2),
      S.piece('chalkboard', [-0.82, Y0, 0.78], 0.4),
      S.piece('bench', [2.3, Y0, -0.4], -Math.PI / 2),
      S.belisha([-0.4, Y0, 0.78]), S.belisha([-0.4, Y0, 2.02]),
      S.belisha([0.78, Y0, -1.05]), S.belisha([2.02, Y0, -1.05]),
    ];
    const tree = S.tree([2.25, Y0, -1.5]);

    // People. Walkers keep to a lane between the kerb and the furniture, turn inside the lamp column and cross
    // on the zebras beside the beacons. Feet follow the kerb down to the road; so does the shadow.
    const PS3 = shapes(THREE);
    const surface = (x, z) => {
      const d = Math.max(Math.min(0.9 - x, 0.9 - z), x - 1.9, z - 1.9); // > 0 on a pavement
      const f = Math.min(1, Math.max(0, (d + 0.025) / 0.05));
      return [RY + (Y0 - RY) * f * f * (3 - 2 * f), d > 0 ? Y0 : RY + M];
    };
    const walk = walkers(THREE, P, { surface, speed: 0.2, routes: [{
      pts: [[0.86, -0.9], [0.86, 0.4], [0.48, 0.8], [-0.22, 0.8], [-0.22, 2.22], [1.98, 2.22], [1.98, -0.9]],
      people: [
        { at: 0.05, coat: P.butter[400], legs: P.indigo[800], skin: P.peach[600], top: 'bob', hair: P.butter[700], long: true, dog: { coat: P.peach[500] } },
        { at: 0.55, coat: P.pistachio[500], legs: P.biscuit.darkMuted, skin: P.peach[300], top: 'short', hair: P.peach[700], bag: P.butter[300] },
      ],
    }] }, PS3);
    const SEAT = 0.194 / PS + 0.075; // bench and café chair seats, in the figures' metres
    const stills = [
      still(THREE, P, PS3, { pose: 'sit', seat: SEAT, coat: P.lavender[500], legs: P.indigo[900], skin: P.peach[200], top: 'hat' }, [2.33, Y0, -0.28], -Math.PI / 2),
      still(THREE, P, PS3, { pose: 'sit', seat: SEAT + 0.01, reach: 1, coat: P.peach[300], legs: P.lavender[800], skin: P.peach[700], top: 'bob', hair: P.indigo[900] }, [-1.11, Y0, 0.86], Math.PI),
      still(THREE, P, PS3, { pose: 'stand', coat: P.peach[400], legs: P.indigo[900], skin: P.peach[200], top: 'short', hair: P.peach[700] }, [-1.775, Y0, 0.36], Math.PI + 0.6), // at the clothes shop door
    ];

    const parts = [[ground, 0], [marks, 0.1],
      ...buildings.map((b, i) => [b, 0.22 + i * 0.13]),
      ...furniture.map((f, i) => [f, 0.92 + i * 0.04]), [tree, 1.0],
      ...[...stills, ...walk.parts].map((o, i) => [o, 1.35 + i * 0.05])]
      .map(([object, delay]) => { g.add(object); return { object, delay }; });
    g.userData.awnings = awnings;
    g.userData.walk = walk;
    g.userData.stills = stills;
    return { group: g, parts, ground: Y0 };
  },
  reset(g) { g.userData.walk.reset(); g.userData.stills.forEach(f => sway(f, 0)); },
  idle(g, t) {
    g.userData.awnings.forEach((a, i) => { a.rotation.x = 0.018 * Math.sin(t * 1.4 + i * 1.3); });
    g.userData.walk.update(t);
    g.userData.stills.forEach((f, i) => sway(f, t, i * 2));
  },
};
