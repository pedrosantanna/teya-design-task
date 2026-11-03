// A black cast-iron litter bin of the City of London and Westminster kind: an octagonal body on a
// stepped base, a plain gold band where the word and the crest would be, a dark opening under the lid
// and a domed octagonal lid with a finial. Black is Biscuit dark muted (#332C27), gold is Butter 400. No idle.
import kit from './kit.js';
import { collect, mini } from './props-kit.js';

function parts(THREE, P, simple) {
  const k = kit(THREE);
  const iron = P.biscuit.darkMuted, gold = P.butter[400];
  const o = { seg: 8, rot: [0, Math.PI / 8, 0] }; // eight sides, one face towards +z
  const base = k.group([
    k.cyl(0.3, 0.32, 0.06, iron, [0, 0.03, 0], { ...o, part: 'base' }),
    k.cyl(0.26, 0.28, 0.05, iron, [0, 0.085, 0], { ...o, part: 'base' }),
  ]);
  const body = k.cyl(0.25, 0.23, 0.7, iron, [0, 0.11 + 0.35, 0], o);
  const band = k.cyl(0.262, 0.258, 0.11, gold, [0, 0.6, 0], o);
  const rims = k.group([
    k.cyl(0.258, 0.252, 0.03, iron, [0, 0.19, 0], { ...o, part: 'rim0' }),
    k.cyl(0.272, 0.272, 0.04, iron, [0, 0.83, 0], { ...o, part: 'rim1' }),
  ]);
  const opening = k.cyl(0.235, 0.235, 0.1, P.biscuit.fg, [0, 0.9, 0], o);
  const lid = k.group([
    k.cyl(0.28, 0.28, 0.04, iron, [0, 0.97, 0], { ...o, part: 'lid' }),
    k.lathe([[0.27, 0], [0.24, 0.07], [0.17, 0.13], [0.07, 0.16], [0, 0.165]], iron, [0, 0.99, 0], { seg: 8, rot: [0, Math.PI / 8, 0], part: 'lid' }),
  ]);
  const finial = k.group([
    k.cyl(0.025, 0.035, 0.05, iron, [0, 1.18, 0], { part: 'fin' }),
    k.sphere(0.045, gold, [0, 1.24, 0]),
  ]);
  if (simple) {
    rims.children[0].removeFromParent();
    return { base, body, band, rims, opening, lid };
  }
  return { base, body, band, rims, opening, lid, finial };
}

export function buildMini(THREE, P) {
  const p = parts(THREE, P, true);
  return mini(THREE, [p.base, p.body, p.band, p.rims, p.opening, p.lid]);
}

export default {
  id: 'litterbin',
  name: { en: 'Litter bin', pt: 'Lixeira' },
  build(THREE, P) {
    const g = new THREE.Group();
    const p = parts(THREE, P, false);
    return { group: g, parts: collect(g, [
      [p.base, 0], [p.body, 0.1], [p.rims, 0.2], [p.band, 0.28], [p.opening, 0.36], [p.lid, 0.44], [p.finial, 0.56],
    ]) };
  },
  idle() {},
};
