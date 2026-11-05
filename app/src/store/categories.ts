// "Browse by category" on Nearby and the Category screen (craft-pass-2): the kinds of shop the shopper's area
// actually has, so no category opens empty. Each kind keeps its accent from kinds.ts and has its own 3D still (the
// corner shop uses the newsagent still). Fishmongers sit under Butcher, plant shops under Florist and the games
// shop under Toys, so every category has three places or more.
import type { CategoryId } from '@/design-system';

import { KIND_ACCENT } from './kinds';
import type { Shop, ShopHours, ShopKind } from './types';

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

/** The everyday-frequency prior that breaks ties between kinds with the same number of shops open (assumed, no usage
 *  data yet): what a shopper is most likely to want on an ordinary day comes first. */
const PRIOR: ShopKind[] = [
  'cafe',
  'bakery',
  'chemist',
  'cornerShop',
  'butcher',
  'deli',
  'florist',
  'hardware',
  'stationery',
  'books',
  'toys',
  'opticians',
  'fashion',
  'cameras',
  'gifts',
  'bags',
];

/** How far a card may move up from its place in the count order to separate two cards of one hue. */
const REACH = 2;

/** The categories present among `shops`, ordered by how many shops of the kind are open now in the area (most
 *  first), ties by PRIOR, kinds with none open last (also by PRIOR). Then the hues are spread: a card moves up by at
 *  most REACH places when the card before it has the same pastel, so two Butter cards seldom sit together without
 *  the count order being broken more than it must. `hours` is the area's opening state: 'closed' means no shop is open. */
export function areaCategories(shops: Shop[], hours: ShopHours = 'open'): AreaCategory[] {
  const ranked = PRIOR.flatMap((kind) => {
    const of = shops.filter((s) => s.kind === kind).sort((a, b) => a.walkMinutes - b.walkMinutes);
    if (of.length === 0) return [];
    return [{ category: { kind, ...KINDS[kind], accent: KIND_ACCENT[kind], shops: of } as AreaCategory, openNow: hours === 'closed' ? 0 : of.length }];
  });
  // Array.sort is stable, so equal counts keep PRIOR order.
  const queue = ranked.sort((a, b) => Number(b.openNow > 0) - Number(a.openNow > 0) || b.openNow - a.openNow).map((r) => r.category);
  const out: AreaCategory[] = [];
  while (queue.length > 0) {
    const prev = out[out.length - 1]?.accent;
    const pick = queue.slice(0, REACH + 1).findIndex((c) => c.accent !== prev);
    out.push(...queue.splice(Math.max(pick, 0), 1));
  }
  return out;
}
