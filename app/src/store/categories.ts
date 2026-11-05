// "Browse by category" on Nearby and the Category screen (craft-pass-2): the kinds of shop the shopper's area
// actually has, so no category opens empty. Each kind keeps its accent from kinds.ts and has its own 3D still (the
// corner shop uses the newsagent still). Fishmongers sit under Butcher, plant shops under Florist and the games
// shop under Toys, so every category has three places or more.
import type { CategoryId, ShopAccentName } from '@/design-system';

import { KIND_ACCENT } from './kinds';
import type { Shop, ShopKind } from './types';

export type AreaCategory = {
  kind: ShopKind;
  /** "Bakery", "Newsagent" */
  label: string;
  /** Plural for the Category screen's title: "Bakeries". */
  title: string;
  accent: (typeof KIND_ACCENT)[ShopKind];
  /** The pipeline's still for this kind, if one is close enough. */
  art?: CategoryId;
  shops: Shop[];
};

const KINDS: Record<ShopKind, { label: string; title: string; art?: CategoryId }> = {
  cornerShop: { label: 'Newsagent', title: 'Newsagents', art: 'newsagent' },
  bakery: { label: 'Bakery', title: 'Bakeries', art: 'bakery' },
  hardware: { label: 'Hardware', title: 'Hardware', art: 'hardware' },
  toys: { label: 'Toys', title: 'Toys and games', art: 'toys' },
  butcher: { label: 'Butchers', title: 'Butchers and fishmongers', art: 'butcher' },
  chemist: { label: 'Chemist', title: 'Chemists', art: 'chemist' },
  cameras: { label: 'Cameras', title: 'Camera shops', art: 'cameras' },
  stationery: { label: 'Stationery', title: 'Stationers', art: 'stationery' },
  florist: { label: 'Florist', title: 'Florists and plants', art: 'florist' },
  opticians: { label: 'Opticians', title: 'Opticians', art: 'opticians' },
  cafe: { label: 'Café', title: 'Cafés', art: 'cafe' },
  deli: { label: 'Deli', title: 'Delis', art: 'deli' },
  books: { label: 'Books', title: 'Bookshops', art: 'books' },
  fashion: { label: 'Fashion', title: 'Fashion', art: 'fashion' },
  bags: { label: 'Bags', title: 'Bags and leather', art: 'bags' },
  gifts: { label: 'Gifts', title: 'Gift shops', art: 'gifts' },
};

/** The order cards appear in within a hue: the everyday kinds first. */
const ORDER: ShopKind[] = [
  'bakery',
  'cafe',
  'deli',
  'florist',
  'hardware',
  'opticians',
  'toys',
  'cornerShop',
  'butcher',
  'chemist',
  'cameras',
  'stationery',
  'books',
  'fashion',
  'bags',
  'gifts',
];

// The rail cycles the hues in this order (colour.md, Shop accents), so neighbouring cards never share a pastel.
const CYCLE: ShopAccentName[] = ['peach', 'pistachio', 'butter'];
// A safety cap on the search below; 16 kinds finish far under it.
const MAX_STEPS = 50_000;

/** The categories present among `shops`, each with its shops nearest first. Within a hue they keep ORDER; across
 *  hues they are interleaved so that same-hue cards sit as far apart as the counts allow (two Butter cards together
 *  read as one block). With even counts that is Peach, Pistachio, Butter, Peach, …; with uneven counts the search
 *  keeps the order with the widest gaps (spreadHues). */
export function areaCategories(shops: Shop[]): AreaCategory[] {
  const present = ORDER.flatMap((kind) => {
    const of = shops.filter((s) => s.kind === kind).sort((a, b) => a.walkMinutes - b.walkMinutes);
    if (of.length === 0) return [];
    return [{ kind, ...KINDS[kind], accent: KIND_ACCENT[kind], shops: of }];
  });
  // Every category's still is rendered on its own kind's tile, so a card's hue is its accent.
  const byHue = new Map<ShopAccentName, AreaCategory[]>();
  for (const c of present) byHue.set(c.accent, [...(byHue.get(c.accent) ?? []), c]);
  const hues = [...CYCLE.filter((h) => byHue.has(h)), ...[...byHue.keys()].filter((h) => !CYCLE.includes(h))];
  const order = spreadHues(new Map(hues.map((h) => [h, byHue.get(h)!.length])), hues);
  const next = new Map(hues.map((h) => [h, 0]));
  return order.map((h) => {
    const i = next.get(h)!;
    next.set(h, i + 1);
    return byHue.get(h)![i];
  });
}

/** The hue sequence for `counts` that keeps same-hue cards furthest apart. Each pair of same-hue neighbours costs
 *  1/gap³ (side by side costs 1, one card between costs 1/8), and each card and the same-hue card two back cost half
 *  that, so three Butter cards never bunch where two pairs could split. A depth-first search with branch and bound
 *  tries the hues in cycle order after the last one, so among equal orders it keeps the one closest to the plain
 *  cycle. */
export function spreadHues<H>(counts: Map<H, number>, cycle: H[]): H[] {
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const left = new Map(counts);
  const lastAt = new Map<H, number>();
  const prevAt = new Map<H, number>();
  const seq: H[] = [];
  let best: H[] | null = null;
  let bestCost = Infinity;
  let steps = 0;
  const cost = (gap: number | undefined, weight: number) => (gap === undefined ? 0 : weight / gap ** 3);
  const visit = (spent: number) => {
    if (++steps > MAX_STEPS) return;
    if (seq.length === total) {
      best = [...seq];
      bestCost = spent;
      return;
    }
    const prev = seq.length > 0 ? cycle.indexOf(seq[seq.length - 1]) : -1;
    for (let k = 1; k <= cycle.length; k++) {
      const h = cycle[(prev + k + cycle.length) % cycle.length];
      const n = left.get(h) ?? 0;
      if (n === 0) continue;
      const at = lastAt.get(h);
      const before = prevAt.get(h);
      const next = spent + cost(at === undefined ? undefined : seq.length - at, 1) + cost(before === undefined ? undefined : seq.length - before, 0.5);
      // Costs only grow, so a branch already as dear as the best order can't beat it.
      if (next >= bestCost - 1e-9) continue;
      left.set(h, n - 1);
      if (at !== undefined) prevAt.set(h, at);
      lastAt.set(h, seq.length);
      seq.push(h);
      visit(next);
      seq.pop();
      if (at === undefined) lastAt.delete(h);
      else lastAt.set(h, at);
      if (before === undefined) prevAt.delete(h);
      else prevAt.set(h, before);
      left.set(h, n);
    }
  };
  visit(0);
  return best ?? cycle.flatMap((h) => Array<H>(counts.get(h) ?? 0).fill(h));
}
