// A delivery scooter with a crate on the rack and a simple rider (helmet, torso, arms and legs,
// no face). Idle: the wheels spin, the body bobs and two wind streaks pass.
import kit from './kit.js';

export default {
  id: 'scooter',
  name: { en: 'Delivery scooter', pt: 'Scooter de entrega' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const ride = new THREE.Group();
    g.add(ride);
    const body = P.peach[300], ink = P.indigo[800], white = P.biscuit.card;

    const wheel = x => {
      const w = k.group([
        k.disc(0.28, 0.18, P.indigo[900], [0, 0, 0]),
        k.disc(0.12, 0.2, white, [0, 0, 0]),
        k.box(0.17, 0.035, 0.02, P.indigo[600], [0, 0, 0.11], { noShadow: true }),
      ], [x, 0.28, 0]);
      g.add(w);
      return w;
    };
    const rear = wheel(-0.7), front = wheel(0.74);

    // Leg shield: a slanted plank drawn in side view and extruded across.
    const shield = new THREE.Shape();
    [[0.3, 0.3], [0.43, 0.3], [0.56, 1.0], [0.43, 1.0]].forEach(([x, y], i) => (i ? shield.lineTo(x, y) : shield.moveTo(x, y)));
    const frame = k.group([
      k.block(0.68, 0.08, 0.36, P.biscuit.muted, [0.04, 0.3, 0]),
      k.capsule(V(-0.92, 0.62, 0), V(-0.36, 0.62, 0), 0.26, body),
      k.extrude(shield, 0.42, body),
      k.capsule(V(0.74, 0.28, 0.13), V(0.52, 1.02, 0.13), 0.035, ink),
      k.block(0.2, 0.14, 0.28, body, [0.5, 1.0, 0]),
      k.disc(0.06, 0.03, P.butter[100], [0.615, 1.07, 0], 'x'),
    ]);
    const seat = k.block(0.5, 0.1, 0.34, ink, [-0.45, 0.8, 0]);
    const handlebar = k.capsule(V(0.48, 1.09, -0.3), V(0.48, 1.09, 0.3), 0.03, ink);
    const crate = k.group([
      k.block(0.6, 0.04, 0.48, ink, [-1.0, 0.84, 0]),
      k.block(0.52, 0.46, 0.5, P.pistachio[200], [-1.0, 0.88, 0]),
      k.block(0.56, 0.06, 0.54, P.pistachio[500], [-1.0, 1.34, 0]),
      k.disc(0.1, 0.02, P.butter[100], [-1.0, 1.1, 0.26], 'z'),
    ]);
    const legs = k.group([1, -1].flatMap(s => [
      k.capsule(V(-0.36, 0.98, 0.12 * s), V(0.1, 0.94, 0.14 * s), 0.08, P.indigo[900], { part: 'legs' }),
      k.capsule(V(0.1, 0.94, 0.14 * s), V(0.2, 0.44, 0.14 * s), 0.07, P.indigo[900], { part: 'legs' }),
    ]));
    const torso = k.group([
      k.capsule(V(-0.36, 0.98, 0), V(-0.16, 1.36, 0), 0.17, P.indigo[600], { part: 'rider' }),
      ...[1, -1].map(s => k.capsule(V(-0.16, 1.36, 0.15 * s), V(0.45, 1.1, 0.27 * s), 0.05, P.indigo[600], { part: 'rider' })),
    ]);
    const helmet = k.sphere(0.17, P.butter[100], [-0.12, 1.66, 0]);
    const streaks = [
      k.capsule(V(-1.62, 0, 0), V(-1.3, 0, 0), 0.022, white, { noShadow: true }),
      k.capsule(V(-1.52, 0, 0), V(-1.26, 0, 0), 0.022, white, { noShadow: true }),
    ];
    streaks[0].position.y = 0.66; streaks[0].position.z = 0.3;
    streaks[1].position.y = 0.98; streaks[1].position.z = 0.36;
    const wind = k.group(streaks);

    [frame, seat, handlebar, crate, legs, torso, helmet, wind].forEach(o => ride.add(o));
    const parts = [[rear, 0], [front, 0.06], [frame, 0.14], [seat, 0.26], [handlebar, 0.32], [crate, 0.4],
      [legs, 0.5], [torso, 0.58], [helmet, 0.68], [wind, 0.8]].map(([object, delay]) => ({ object, delay }));
    g.userData = { ride, wheels: [rear, front], streaks: streaks.map(s => ({ s, x: s.position.x })) };
    return { group: g, parts };
  },
  idle(g, t) {
    const u = g.userData;
    u.wheels.forEach(w => { w.rotation.z = -t * 7; });
    u.ride.position.y = 0.012 * Math.sin(t * 9);
    u.streaks.forEach((o, i) => {
      const p = (t * 0.9 + i * 0.5) % 1;
      o.s.position.x = o.x - p * 0.5;
      o.s.scale.y = 1 - Math.abs(p - 0.5) * 1.2;
      o.s.visible = p < 0.92;
    });
  },
};
