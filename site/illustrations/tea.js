// A kettle and a builder's tea: a round-bellied hob kettle with a domed lid and knob, an arched handle and a
// tapered spout with an open mouth, turned towards the mug as if about to pour; and a big straight mug of strong milky tea with a handle and two wisps of steam.
// Kettle Peach 300, handle Indigo 800, mug white with a Pistachio band, tea Peach 500.
// Idle: the steam rises and loops.
import kit from './kit.js';
import { collect } from './props-kit.js';

function rise(g, t) {
  g.userData.wisps.forEach((o, i) => {
    const p = (t * 0.45 + i * 0.5) % 1;
    o.w.position.y = o.y + p * 0.16;
    o.w.scale.y = 1 - Math.abs(p - 0.5) * 0.8;
    o.w.visible = p < 0.9;
  });
}

export default {
  id: 'tea',
  name: { en: 'Kettle and tea', pt: 'Chaleira e chá' },
  build(THREE, P) {
    const k = kit(THREE), V = k.V;
    const g = new THREE.Group();
    const ink = P.indigo[800], white = P.biscuit.card;
    const kx = -0.35, kz = 0.35, yaw = 0.16, mx = 0.78, mz = 0.02;
    // The kettle is modelled facing +x (spout out along +x, handle arching over the top in the same plane), then
    // placed in front of the mug and turned towards it, so the spout points into the scene just short of the mug.
    const place = o => { o.position.set(kx, 0, kz); o.rotation.y = yaw; return o; };

    // Body: a round-bellied lathe with a soft shoulder that closes in to a neck under the lid.
    const kettle = place(k.group([k.lathe([[0, 0], [0.3, 0], [0.36, 0.012], [0.41, 0.045], [0.445, 0.1], [0.46, 0.17],
      [0.455, 0.25], [0.43, 0.33], [0.385, 0.41], [0.32, 0.475], [0.25, 0.52], [0.2, 0.545], [0.19, 0.56], [0, 0.56]],
      P.peach[300], [0, 0, 0])]));
    // Lid: a low dome on a thin rim, with a knob on a short stem.
    const lid = place(k.group([
      k.lathe([[0, 0.55], [0.215, 0.55], [0.22, 0.57], [0.2, 0.6], [0.16, 0.63], [0.1, 0.65], [0, 0.656]], P.peach[300], [0, 0, 0], { part: 'lid' }),
      k.cyl(0.03, 0.045, 0.05, ink, [0, 0.675, 0], { part: 'knob' }),
      k.sphere(0.05, ink, [0, 0.71, 0], { part: 'knob' }),
    ]));
    // Spout: a closed tapered tube rising out of the belly, rendered on both sides so its inside shows, with a
    // rolled lip and a dark disc set just inside the mouth so the opening reads as an opening.
    const spoutCurve = new THREE.QuadraticBezierCurve3(V(0.3, 0.14, 0), V(0.64, 0.15, 0), V(0.77, 0.52, 0));
    const SEGS = 32, RAD = 24, r0 = 0.09, r1 = 0.05;
    const spoutGeo = new THREE.TubeGeometry(spoutCurve, SEGS, r0, RAD, false);
    const sp = spoutGeo.attributes.position, nv = RAD + 1, c = new THREE.Vector3();
    for (let i = 0; i <= SEGS; i++) { // taper from r0 at the body to r1 at the mouth
      spoutCurve.getPoint(i / SEGS, c);
      const f = (r0 + (r1 - r0) * i / SEGS) / r0;
      for (let j = 0; j < nv; j++) {
        const n = i * nv + j;
        sp.setXYZ(n, c.x + (sp.getX(n) - c.x) * f, c.y + (sp.getY(n) - c.y) * f, c.z + (sp.getZ(n) - c.z) * f);
      }
    }
    spoutGeo.computeVertexNormals();
    const tube = k.mesh(spoutGeo, P.peach[300], { part: 'spout' });
    tube.material.side = THREE.DoubleSide;
    const tip = spoutCurve.getPoint(1), dir = spoutCurve.getTangent(1);
    const mouth = new THREE.Group();
    mouth.position.copy(tip);
    mouth.quaternion.setFromUnitVectors(V(0, 1, 0), dir);
    mouth.add(k.mesh(new THREE.TorusGeometry(r1, 0.012, 12, 48), P.peach[300], { rot: [Math.PI / 2, 0, 0], part: 'spout' }));
    mouth.add(k.disc(r1 - 0.004, 0.004, P.peach[800], [0, -0.022, 0], 'y', { noShadow: true, part: 'spoutIn' }));
    const spout = place(k.group([tube, mouth]));
    // Handle: an arch over the lid from the spout side to the back, its ends set into the shoulder.
    const handle = place(k.group([
      k.mesh(new THREE.TorusGeometry(0.27, 0.04, 16, 64, Math.PI), ink, { pos: [-0.02, 0.5, 0], scale: [1, 1.3, 1], part: 'handle' }),
    ]));

    // Mug: an open cylinder with a wall and a floor, tea near the top, a band and a handle.
    const mug = k.group([
      k.lathe([[0, 0], [0.25, 0], [0.26, 0.02], [0.26, 0.56], [0.225, 0.56], [0.225, 0.06], [0, 0.06]], white, [0, 0, 0]),
      k.cyl(0.263, 0.263, 0.08, P.pistachio[300], [0, 0.4, 0]),
      k.mesh(new THREE.TorusGeometry(0.13, 0.04, 16, 48, Math.PI), white, { pos: [0.24, 0.29, 0], rot: [0, 0, -Math.PI / 2] }),
    ], [mx, 0, mz]);
    const tea = k.disc(0.226, 0.01, P.peach[500], [mx, 0.49, mz], 'y', { noShadow: true });

    // Steam: two wavy lines over the mug, each a thin tube.
    const wisp = (x, z, ph) => {
      const pts = [];
      for (let i = 0; i <= 12; i++) pts.push(V(0.035 * Math.sin(i / 12 * Math.PI * 2 + ph), i / 12 * 0.34, 0));
      const m = k.mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.016, 8), white, { noShadow: true, part: `steam${ph}` });
      return k.group([m], [mx + x, 0.64, mz + z]);
    };
    const wisps = [wisp(-0.07, 0, 0), wisp(0.07, -0.02, 2)];
    const steam = k.group(wisps);

    const parts = collect(g, [[kettle, 0], [lid, 0.12], [spout, 0.2], [handle, 0.28], [mug, 0.4], [tea, 0.52], [steam, 0.62]]);
    g.userData.wisps = wisps.map(w => ({ w, y: w.position.y }));
    rise(g, 0); // start the wisps where the idle picks them up
    return { group: g, parts };
  },
  idle: rise,
};
