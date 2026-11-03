// Shared pieces for the London street scenes (corner.js, crossroads.js). Not a model itself.
//
// building(): a London shop building, ground-floor shopfront with a painted fascia and lettering,
// a big window and a door, optional awning, and upper floors of stock brick, red brick or stucco with
// white sash windows. Street fronts are drawn in their own frame (wall at z = 0, street towards +z) and turned
// into place, so the same code serves every side of a block.
//
// Street furniture: each standalone prop model exports buildMini(THREE, P), a simplified version at the
// scenes' scale; piece() places one. Belisha beacons and plane trees exist only in the scenes, so they are here.
import kit from './kit.js';
import { buildMini as phonebox } from './phonebox.js';
import { buildMini as pillarbox } from './pillarbox.js';
import { buildMini as busstop } from './busstop.js';
import { buildMini as litterbin } from './litterbin.js';
import { buildMini as bench } from './bench.js';
import { buildMini as cafetable, buildMiniBoard as chalkboard } from './cafetable.js';
import { buildMini as lamppost } from './lamppost.js';
import { buildMini as mannequin } from './mannequin.js';

const MINIS = { phonebox, pillarbox, busstop, litterbin, bench, cafetable, chalkboard, lamppost, mannequin };

const DIRS = { '+z': 0, '+x': Math.PI / 2, '-z': Math.PI, '-x': -Math.PI / 2 };
export const G = 0.8, U = 0.55; // ground floor and upper floor heights

export function street(THREE, P) {
  const k = kit(THREE);
  const white = P.biscuit.card, ink = P.indigo[800], glass = P.lavender[300], iron = P.biscuit.darkMuted;
  const WALLS = { stock: P.butter[300], brick: P.peach[400], stucco: P.butter[50], cream: P.butter[100] };

  // One street front, local frame. w: frontage width; y0: base; returns [meshes, awning or null].
  function front(w, y0, o) {
    const out = [];
    const fy = y0 + G - 0.2; // fascia bottom
    if (o.back) return [sashes(w, y0, o, out), null];
    // Shopfront surround painted in the shop's colour, the fascia in the same paint with white lettering.
    // A recessed front (o.rc > 0) sets the surround, window and door back under the upper floor, leaving room
    // for a mannequin in the window; the fascia stays on the building line.
    const r = o.rc || 0;
    out.push(k.block(w - 0.08, G - 0.2, 0.03, o.paint, [0, y0, 0.015 - r], { part: `sf${o.id}` }));
    out.push(k.block(w - 0.04, 0.2, 0.06, o.paint, [0, fy, 0.03]));
    out.push(k.block(Math.min(0.5, w * 0.45), 0.045, 0.01, white, [0, fy + 0.06, 0.065], { noShadow: true }));
    const dw = 0.17, gw = w - 0.08 - dw - 0.14;
    out.push(k.block(gw, G - 0.42, 0.02, glass, [-(w - 0.08) / 2 + 0.05 + gw / 2, y0 + 0.14, 0.04 - r]));
    out.push(k.block(dw, G - 0.3, 0.02, ink, [(w - 0.08) / 2 - 0.05 - dw / 2, y0 + 0.02, 0.04 - r]));
    if (o.mannequin) {
      const m = k.group([bake(mannequin(THREE, P))], [-(w - 0.08) / 2 + 0.05 + gw / 2, y0, 0.07 - r]);
      m.scale.setScalar(0.85);
      out.push(m);
    }
    sashes(w, y0, o, out);
    let aw = null;
    if (o.awning) {
      const L = 0.32, s = 0.15, v = 0.08, th = 0.025;
      const prof = [[0, 0], [L, -s], [L, -s - v], [L - th, -s - v], [L - th, -s * (L - th) / L - th], [0, -th]];
      aw = k.profile(prof, w - 0.14, o.awning, [0, fy - 0.005, 0.03]);
      out.push(aw);
    }
    return [out, aw];
  }
  // Sash windows: a white frame with two panes, two or three per floor.
  function sashes(w, y0, o, out) {
    const n = Math.max(1, Math.min(3, Math.floor(w / 0.42)));
    for (let f = 0; f < o.floors; f++) {
      const y = y0 + G + f * U + 0.12;
      for (let i = 0; i < n; i++) {
        const x = -w / 2 + (w / n) * (i + 0.5);
        out.push(k.block(0.2, 0.32, 0.02, white, [x, y, 0.01], { part: `sash${o.id}` }));
        out.push(k.block(0.14, 0.11, 0.012, glass, [x, y + 0.03, 0.026], { part: `pane${o.id}`, noShadow: true }));
        out.push(k.block(0.14, 0.11, 0.012, glass, [x, y + 0.18, 0.026], { part: `pane${o.id}`, noShadow: true }));
      }
    }
    return out;
  }

  // Bakes a static group: meshes that share a colour, an outline part and their shadow/ground flags are merged
  // into one mesh, so a scene of a few hundred parts draws in a few dozen calls. Meshes under `keep`
  // (animated ones, such as awnings) stay as they are. Each unnamed mesh keeps its own outline id in the
  // merged mesh only where it does not touch another of the same colour, which holds for these pieces.
  let bakeId = 0;
  function bake(group, keep = []) {
    group.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(group.matrixWorld).invert(), rel = new THREE.Matrix4();
    const kept = new Set();
    keep.forEach(o => o.traverse(x => kept.add(x)));
    const buckets = new Map(), victims = [];
    group.traverse(m => {
      if (!m.isMesh || kept.has(m)) return;
      const u = m.userData;
      const key = [m.material.color.getHexString(), u.part || '', !!u.noShadow, !!u.ground].join('|');
      if (!buckets.has(key)) buckets.set(key, { hex: `#${m.material.color.getHexString()}`, u, list: [] });
      rel.multiplyMatrices(inv, m.matrixWorld);
      const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
      g.applyMatrix4(rel);
      buckets.get(key).list.push(g);
      victims.push(m);
    });
    victims.forEach(m => { m.parent.remove(m); m.geometry.dispose(); m.material.dispose(); });
    const id = bakeId++;
    buckets.forEach(({ hex, u, list }) => {
      const n = list.reduce((s, g) => s + g.attributes.position.count, 0);
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3);
      let o = 0;
      list.forEach(g => { pos.set(g.attributes.position.array, o); nor.set(g.attributes.normal.array, o); o += g.attributes.position.count * 3; g.dispose(); });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      group.add(k.mesh(geo, hex, { part: u.part || `bake${id}-${hex}`, noShadow: u.noShadow && !u.ground, ground: u.ground }));
    });
    return group;
  }

  let uid = 0;
  // A building on footprint [x0, x1] × [z0, z1]; fronts: list of '+x' | '-x' | '+z' | '-z'.
  // o: { y0, floors, wall: 'stock' | 'brick' | 'stucco' | 'cream', paint, awning (colour), chimney, roof }
  function building(x0, x1, z0, z1, o) {
    const id = uid++;
    const y0 = o.y0 || 0, floors = o.floors ?? 1, h = G + floors * U;
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, bw = x1 - x0, bd = z1 - z0;
    const wallC = WALLS[o.wall || 'stock'];
    // A recessed front pulls the ground floor back by RC on that side.
    const RC = 0.16, rd = o.recess ? o.fronts[0] : null;
    const gx0 = x0 + (rd === '-x' ? RC : 0), gx1 = x1 - (rd === '+x' ? RC : 0);
    const gz0 = z0 + (rd === '-z' ? RC : 0), gz1 = z1 - (rd === '+z' ? RC : 0);
    const g = k.group([
      k.block(gx1 - gx0, G, gz1 - gz0, o.ground || P.biscuit.card, [(gx0 + gx1) / 2, y0, (gz0 + gz1) / 2]),
      ...(floors ? [k.block(bw, floors * U, bd, wallC, [cx, y0 + G, cz])] : []),
      // Parapet roof: a coping in the wall colour round a flat roof.
      k.block(bw + 0.04, 0.06, bd + 0.04, o.roof || P.lavender[200], [cx, y0 + h, cz]),
    ]);
    if (o.chimney) g.add(k.group([
      k.block(0.26, 0.26, 0.14, wallC, [0, 0, 0]),
      k.cyl(0.03, 0.03, 0.08, P.peach[500], [-0.06, 0.3, 0]),
      k.cyl(0.03, 0.03, 0.08, P.peach[500], [0.06, 0.3, 0]),
    ], [cx + o.chimney[0] * bw / 2, y0 + h + 0.06, cz + o.chimney[1] * bd / 2]));
    const awnings = [];
    const OPP = { '+x': '-x', '-x': '+x', '+z': '-z', '-z': '+z' };
    // Backs: the faces opposite the fronts get sash windows on the upper floors (side walls stay blank).
    const backs = o.backs ? (o.fronts || []).map(d => OPP[d]) : [];
    [...(o.fronts || []), ...backs.map(d => `b${d}`)].forEach(e => {
      const back = e[0] === 'b', d = back ? e.slice(1) : e;
      const along = d === '+z' || d === '-z';
      const w = along ? bw : bd;
      const first = !back && d === rd;
      const [meshes, aw] = front(w, y0, { ...o, id, floors, back, rc: first ? RC : 0, mannequin: first && o.mannequin });
      if (aw) awnings.push(aw);
      const pos = d === '+z' ? [cx, 0, z1] : d === '-z' ? [cx, 0, z0] : d === '+x' ? [x1, 0, cz] : [x0, 0, cz];
      const f = k.group(meshes, pos);
      f.rotation.y = DIRS[d];
      g.add(f);
    });
    return { group: bake(g, awnings), awnings, h };
  }

  // --- Street furniture -----------------------------------------------------------------
  // A piece of street furniture standing at [x, y, z], turned by rot (radians) about y, baked into a few meshes.
  // Minis come at the scenes' scale (props-kit.js), base centre on the origin, front towards +z.
  function piece(name, [x, y, z], rot = 0) {
    const outer = k.group([bake(MINIS[name](THREE, P))], [x, y, z]);
    outer.rotation.y = rot;
    return outer;
  }
  // Belisha beacon: a black-and-white pole with an amber globe.
  const belisha = ([x, y, z]) => bake(k.group([
    ...[0, 1, 2, 3, 4].map(i => k.cyl(0.022, 0.022, 0.13, i % 2 ? white : iron, [0, 0.065 + i * 0.13, 0])),
    k.sphere(0.065, P.peach[300], [0, 0.72, 0]),
  ], [x, y, z]));
  // A London plane: a trunk and two crowns.
  const tree = ([x, y, z], s = 1) => k.group([
    k.cyl(0.045 * s, 0.055 * s, 0.55 * s, P.peach[600], [0, 0.275 * s, 0]),
    k.sphere(0.3 * s, P.pistachio[300], [0, 0.78 * s, 0]),
    k.sphere(0.2 * s, P.pistachio[400], [0.16 * s, 0.98 * s, 0.06 * s]),
  ], [x, y, z]);
  return { k, bake, building, piece, belisha, tree, white, ink };
}
