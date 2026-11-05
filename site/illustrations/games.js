// A board game and dice: a draughts board (Indigo 800 with Butter 100 squares) with four pieces in Peach 300 and
// white, and two white dice with Indigo 800 pips in front. Entry: board, pieces, dice. No idle.
import kit from './kit.js';
import { collect } from './props-kit.js';

export default {
  id: 'games',
  name: { en: 'Board and dice', pt: 'Tabuleiro e dados' },
  build(THREE, P) {
    const k = kit(THREE);
    const g = new THREE.Group();
    const N = 4, S = 0.27, B = N * S + 0.12, T = 0.07, white = P.biscuit.card;
    const squares = [];
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      if ((i + j) % 2) squares.push(k.block(S, 0.008, S, P.butter[100], [(i - 1.5) * S, T, (j - 1.5) * S], { noShadow: true }));
    }
    const board = k.group([k.block(B, T, B, P.indigo[800], [0, 0, 0], { part: 'board' }), ...squares], [-0.3, 0, -0.2]);
    board.rotation.y = 0.12;
    const piece = (i, j, hex) => k.group([
      k.cyl(0.1, 0.1, 0.06, hex, [(i - 1.5) * S, T + 0.008 + 0.03, (j - 1.5) * S]),
      k.cyl(0.06, 0.06, 0.012, hex, [(i - 1.5) * S, T + 0.008 + 0.066, (j - 1.5) * S]),
    ]);
    const pieces = k.group([piece(0, 0, P.peach[300]), piece(2, 0, P.peach[300]), piece(1, 3, white), piece(3, 2, white)], [-0.3, 0, -0.2]);
    pieces.rotation.y = 0.12;

    // Dice: a cube with pips as shallow discs on the top, front and right faces.
    const C = 0.3, h = C / 2, pr = 0.032, ink = P.indigo[800];
    const pip = (pos, axis) => k.disc(pr, 0.012, ink, pos, axis, { noShadow: true });
    const face = (n) => ({ 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
      5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]] })[n];
    const d = 0.075;
    const die = (top, front, right, pos, rot) => {
      const o = k.group([
        k.block(C, C, C, white, [0, 0, 0]),
        ...face(top).map(([a, b]) => pip([a * d, C + 0.003, b * d], 'y')),
        ...face(front).map(([a, b]) => pip([a * d, h + b * d, h + 0.003], 'z')),
        ...face(right).map(([a, b]) => pip([h + 0.003, h + b * d, a * d], 'x')),
      ], pos);
      o.rotation.y = rot;
      return o;
    };
    const dice = k.group([die(5, 2, 3, [0.62, 0, 0.55], 0.35), die(3, 4, 1, [0.25, 0, 0.78], -0.2)]);

    const parts = collect(g, [[board, 0], [pieces, 0.2], [dice, 0.36]]);
    return { group: g, parts };
  },
  idle() {},
};
