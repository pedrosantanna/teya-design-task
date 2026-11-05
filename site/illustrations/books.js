// A short stack of four books, each a little turned: hard covers in Indigo 600, Pistachio 600, Lavender 300 and,
// on top, a paperback in the orange–white–orange of a classic Penguin, white page blocks on three sides.
// Entry: the books land one on another. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'books',
  name: { en: 'Stack of books', pt: 'Pilha de livros' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const white = P.biscuit.card;
    // A book lying flat: two covers and a spine (one outline id) round a page block inset on the three open sides.
    const book = (w, h, d, cover, y, rot, x, z, i, band) => {
      const t = 0.03;
      const c = { part: `c${i}` };
      const b = k.group([
        k.block(w, t, d, cover, [0, 0, 0], c),
        k.block(w, t, d, cover, [0, h - t, 0], c),
        k.block(t, h - 2 * t, d, cover, [-w / 2 + t / 2, t, 0], c),
        k.block(w - t - 0.03, h - 2 * t, d - 0.06, white, [t / 2 - 0.015, t, 0], { part: `p${i}` }),
        ...(band ? [
          k.block(w + 0.004, 0.006, d * 0.34, white, [0, h, 0], { part: `band${i}` }),
          k.block(0.006, h - 2 * t, d * 0.34, white, [-w / 2 - 0.003, t, 0], { part: `band${i}` }),
        ] : []),
      ], [x, y, z]);
      b.rotation.y = rot;
      return b;
    };
    const stack = [
      [1.5, 0.26, 1.05, P.indigo[600], 0.1, 0, 0],
      [1.36, 0.22, 0.98, P.pistachio[600], -0.12, 0.04, 0.02],
      [1.3, 0.24, 0.92, P.lavender[300], 0.14, -0.03, -0.02],
      [1.0, 0.16, 0.68, P.peach[300], -0.3, 0.05, 0.03, true],
    ];
    let y = 0;
    const books = stack.map(([w, h, d, c, rot, x, z, band], i) => {
      const b = book(w, h, d, c, y, rot, x, z, i, band);
      y += h;
      return b;
    });
    const parts = collect(g, books.map((b, i) => [b, i * 0.14]));
    return { group: g, parts };
  },
  idle() {},
};
