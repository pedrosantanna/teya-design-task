// A butcher's block with a leg of lamb lying on it and a cleaver stuck upright in the wood. Block Butter 300 with
// a Butter 200 top, meat Peach 500 with a white bone, cleaver blade Biscuit muted with a dark hole and an Indigo 800
// handle. Entry: block, joint, cleaver. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'butcher',
  name: { en: 'Butcher’s block', pt: 'Cepo de açougueiro' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const W = 1.7, D = 1.05, H = 0.42, top = 0.06;
    const block = k.group([
      k.block(W, H - top, D, P.butter[300], [0, 0, 0]),
      k.block(W, top, D, P.butter[200], [0, H - top, 0]),
    ]);

    // Leg of lamb: a tapered lathe lying along x, flattened a little, with the shank bone and its knuckle out of the narrow end.
    const R = 0.31, sq = 0.82;
    const legMesh = k.lathe([[0, 0], [0.16, 0.02], [0.27, 0.1], [R, 0.28], [0.27, 0.5], [0.18, 0.68], [0.1, 0.8], [0, 0.82]],
      P.peach[500], [0, 0, 0], { rot: [0, 0, Math.PI / 2], part: 'meat' });
    const leg = k.group([k.group([legMesh], [0.05, 0, 0])], [-0.2, H + R * sq, 0.06]);
    leg.scale.set(1, sq, 1);
    leg.rotation.y = 0.18;
    const bone = k.group([
      k.capsule(V(-0.62, H + R * sq, 0.2), V(-0.95, H + R * sq + 0.04, 0.26), 0.055, P.biscuit.card, { part: 'bone' }),
      k.sphere(0.09, P.biscuit.card, [-0.98, H + R * sq + 0.04, 0.27], { part: 'bone', scale: [0.8, 1, 1.2] }),
    ]);

    // Cleaver: a broad blade in the x–y plane, its edge sunk into the block, the handle carrying on from the spine.
    const blade = k.box(0.72, 0.5, 0.03, P.biscuit.muted, [0, 0.25, 0], { part: 'blade' });
    const cleaver = k.group([
      blade,
      k.disc(0.05, 0.034, P.biscuit.darkMuted, [-0.24, 0.4, 0], 'z', { noShadow: true }),
      k.capsule(V(0.36, 0.42, 0), V(0.8, 0.5, 0), 0.065, P.indigo[800]),
    ], [0.38, H - 0.08, -0.05]);
    cleaver.rotation.set(0, 0.95, -0.1);

    const parts = collect(g, [[block, 0], [leg, 0.18], [bone, 0.26], [cleaver, 0.4]]);
    return { group: g, parts };
  },
  idle() {},
};
