// A small shop with a classic British shopfront, in two variants:
// - "Shop": the classic order from the top down: cornice, fascia sign, the awning's roller box under the fascia,
//   then the striped awning over the window. Pilasters frame the front and a stall riser sits under the window.
// - "Shop, no sign": no fascia; a lower block with the roller box right under the roof slab, so the awning is the
//   shop's sign. Its awning is shorter and steeper and the door and window are lower, so in the isometric view the
//   valance ends at the door's head and frames the door instead of covering it.
// Both share a roof slab and a chimney, a door with a step, a side window and a pot plant.
// The awning has seven stripes sloping down from the roller box and a shallow scalloped valance.
// Idle: the valance flaps sway a little.
import kit from './kit.js';

function make({ id, name, sign }) {
  return {
    id,
    name,
    build(THREE, P) {
      const k = kit(THREE);
      const g = new THREE.Group();
      const W = 2, H = sign ? 1.7 : 1.62, D = 1.6, F = D / 2; // F: front face (z)
      const white = P.biscuit.card, glass = P.lavender[300], ink = P.indigo[800], stripe = P.peach[300];

      const body = k.block(W, H, D, P.butter[100], [0, 0, 0]);
      const roof = k.group([
        k.block(W + 0.16, 0.14, D + 0.16, ink, [0, H, 0]),
        k.block(0.32, 0.36, 0.32, P.peach[300], [-0.52, H + 0.14, -0.36]),
      ]);

      // Shopfront frame: two pilasters up to the fascia (or to the roller box when there is no sign).
      const top = sign ? 1.2 : H - 0.02, pw = 0.12, pd = 0.04;
      const pilasters = k.group([-1, 1].map(s =>
        k.block(pw, top, pd, white, [s * (W / 2 - pw / 2), 0, F + pd / 2], { part: 'pilasters' })));

      // Fascia: a board across the full front with a cornice on top and the shop's name as one bar and a dot.
      const fascia = sign ? k.group([
        k.block(W, 0.3, 0.07, white, [0, top, F + 0.035]),
        k.block(W + 0.06, 0.05, 0.11, ink, [0, top + 0.3, F + 0.055]),
        k.block(0.92, 0.09, 0.02, ink, [0.12, top + 0.105, F + 0.08]),
        k.disc(0.08, 0.02, stripe, [-0.6, top + 0.15, F + 0.08]),
      ]) : null;

      // Awning: a roller box against the wall, then stripes hinged under it; each stripe ends in a scalloped flap.
      const N = 7, aw = W - 2 * pw - 0.04, sw = aw / N, L = sign ? 0.58 : 0.36, tilt = sign ? 0.42 : 0.7, th = 0.03;
      const hingeY = top - 0.08;
      const awning = k.group([k.block(aw + 0.04, 0.08, 0.09, ink, [0, hingeY, F + 0.045], { part: 'roller' })]);
      const blade = new THREE.Group();
      blade.position.set(0, hingeY + 0.02, F + 0.07);
      blade.rotation.x = tilt;
      awning.add(blade);
      const v = 0.06, dip = 0.05;
      const scallop = new THREE.Shape();
      scallop.moveTo(-sw / 2, 0); scallop.lineTo(sw / 2, 0); scallop.lineTo(sw / 2, -v);
      scallop.quadraticCurveTo(0, -v - 2 * dip, -sw / 2, -v);
      scallop.lineTo(-sw / 2, 0);
      const flaps = [];
      for (let i = 0; i < N; i++) {
        const x = -aw / 2 + sw * (i + 0.5), hex = i % 2 ? white : stripe;
        blade.add(k.box(sw, th, L, hex, [x, -th / 2, L / 2], { part: 'awning' }));
        const flap = k.group([k.extrude(scallop, th, hex, { part: 'awning' })], [x, 0, L - th / 2]);
        flap.rotation.x = -tilt;
        blade.add(flap);
        flaps.push(flap);
      }

      // Window over a stall riser; the door with a glazed panel and a step.
      const wy = sign ? 0.32 : 0.24, wh = (sign ? 1.08 : 0.84) - wy;
      const shopWindow = k.group([
        k.block(0.94, wy, 0.06, P.butter[300], [0.36, 0, F + 0.03]),
        k.block(0.94, wh, 0.05, white, [0.36, wy, F + 0.025]),
        k.block(0.8, wh - 0.14, 0.02, glass, [0.36, wy + 0.07, F + 0.06]),
      ]);
      const dh = sign ? 0.98 : 0.74;
      const door = k.group([
        k.block(0.5, dh, 0.05, P.indigo[600], [-0.5, 0.06, F + 0.025]),
        k.block(0.28, sign ? 0.34 : 0.28, 0.02, glass, [-0.5, 0.06 + dh - (sign ? 0.48 : 0.38), F + 0.06]),
      ]);
      const step = k.block(0.66, 0.06, 0.22, white, [-0.5, 0, F + 0.11]);
      const sideWindow = k.group([
        k.block(0.05, 0.52, 0.52, white, [W / 2 + 0.025, sign ? 0.86 : 0.7, -0.3]),
        k.block(0.02, 0.38, 0.38, glass, [W / 2 + 0.06, sign ? 0.93 : 0.77, -0.3]),
      ]);
      const plant = k.group([
        k.cyl(0.11, 0.085, 0.2, P.peach[500], [0.86, 0.1, F + 0.26]),
        k.sphere(0.16, P.pistachio[300], [0.86, 0.33, F + 0.26]),
      ]);

      const parts = [
        [body, 0], [roof, 0.12], [pilasters, 0.2], ...(fascia ? [[fascia, 0.28]] : []), [awning, sign ? 0.38 : 0.3],
        [shopWindow, 0.48], [door, 0.54], [step, 0.6], [sideWindow, 0.64], [plant, 0.72],
      ].map(([object, delay]) => { g.add(object); return { object, delay }; });
      g.userData = { flaps, tilt };
      return { group: g, parts };
    },
    idle(g, t) {
      const { flaps, tilt } = g.userData;
      flaps.forEach((f, i) => { f.rotation.x = -tilt + 0.07 * Math.sin(t * 2.2 + i * 0.7); });
    },
  };
}

export const shopPlain = make({ id: 'shop-plain', name: { en: 'Shop, no sign', pt: 'Loja, sem letreiro' }, sign: false });
export default make({ id: 'shop', name: { en: 'Shop', pt: 'Loja' }, sign: true });
