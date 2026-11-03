// A kettle and a builder's tea: a domed hob kettle with a lid knob, a spout and an arched handle,
// and a big straight mug of strong milky tea with a handle and two wisps of steam.
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
    const kx = -0.4, mx = 0.7, mz = 0.32;

    const kettle = k.lathe([[0, 0], [0.42, 0], [0.46, 0.04], [0.47, 0.3], [0.42, 0.52], [0.3, 0.66], [0.2, 0.7], [0, 0.7]],
      P.peach[300], [kx, 0, 0]);
    const lid = k.group([
      k.cyl(0.19, 0.21, 0.04, P.peach[300], [kx, 0.7, 0], { part: 'lid' }),
      k.cyl(0.035, 0.05, 0.07, ink, [kx, 0.755, 0], { part: 'knob' }),
      k.sphere(0.06, ink, [kx, 0.81, 0], { part: 'knob' }),
    ]);
    // Spout: a tapered tube rising out of the side towards -x.
    const spoutCurve = new THREE.QuadraticBezierCurve3(V(kx - 0.3, 0.18, 0), V(kx - 0.62, 0.24, 0), V(kx - 0.72, 0.58, 0));
    const spoutGeo = new THREE.TubeGeometry(spoutCurve, 32, 0.08, 24, false);
    const sp = spoutGeo.attributes.position, nv = 25, c = new THREE.Vector3();
    for (let i = 0; i <= 32; i++) { // taper from 0.08 at the body to 0.05 at the tip
      spoutCurve.getPoint(i / 32, c);
      const f = 1 - 0.36 * i / 32;
      for (let j = 0; j < nv; j++) {
        const n = i * nv + j;
        sp.setXYZ(n, c.x + (sp.getX(n) - c.x) * f, c.y + (sp.getY(n) - c.y) * f, c.z + (sp.getZ(n) - c.z) * f);
      }
    }
    spoutGeo.computeVertexNormals();
    const spout = k.mesh(spoutGeo, P.peach[300]);
    const handle = k.group([
      k.mesh(new THREE.TorusGeometry(0.32, 0.045, 16, 64, Math.PI), ink, { pos: [kx, 0.52, 0], scale: [1, 1.38, 1], part: 'handle' }),
    ]);

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
