// "Browse by category" on Nearby and the Category screen (craft-pass-2): the kinds of shop the shopper's area
// actually has, so no category opens empty. Each kind keeps its accent from kinds.ts; the 3D still is the closest
// one the illustration pipeline has rendered, or none (the card is then its tile colour and its name).
import type { CategoryId } from '@/design-system';

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
  cornerShop: { label: 'Newsagent', title: 'Newsagents' },
  bakery: { label: 'Bakery', title: 'Bakeries', art: 'bakery' },
  hardware: { label: 'Hardware', title: 'Hardware', art: 'hardware' },
  toys: { label: 'Toys', title: 'Toy shops', art: 'gifts' },
  butcher: { label: 'Butcher', title: 'Butchers' },
  chemist: { label: 'Chemist', title: 'Chemists' },
  cameras: { label: 'Cameras', title: 'Camera shops' },
  stationery: { label: 'Stationery', title: 'Stationers' },
  florist: { label: 'Florist', title: 'Florists', art: 'florist' },
  opticians: { label: 'Opticians', title: 'Opticians', art: 'opticians' },
  cafe: { label: 'Deli & café', title: 'Delis and cafés', art: 'cafe' },
  books: { label: 'Books', title: 'Bookshops' },
  fashion: { label: 'Fashion', title: 'Fashion', art: 'fashion' },
  bags: { label: 'Bags', title: 'Bags and leather', art: 'bags' },
  gifts: { label: 'Gifts', title: 'Gift shops', art: 'gifts' },
};

/** The order cards appear in: kinds with a still first, so the rail opens on pictures. */
const ORDER: ShopKind[] = [
  'bakery',
  'cafe',
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

/** The categories present among `shops`, each with its shops nearest first, in ORDER but never two of the same
 *  accent side by side when another can go between (two Butter cards together read as one block). */
export function areaCategories(shops: Shop[]): AreaCategory[] {
  const present = ORDER.flatMap((kind) => {
    const of = shops.filter((s) => s.kind === kind).sort((a, b) => a.walkMinutes - b.walkMinutes);
    if (of.length === 0) return [];
    return [{ kind, ...KINDS[kind], accent: KIND_ACCENT[kind], shops: of }];
  });
  const out: AreaCategory[] = [];
  while (present.length > 0) {
    const last = out[out.length - 1]?.accent;
    const i = Math.max(0, present.findIndex((c) => c.accent !== last));
    out.push(...present.splice(i, 1));
  }
  return out;
}

export function isShopKind(value: string): value is ShopKind {
  return value in KINDS;
}
