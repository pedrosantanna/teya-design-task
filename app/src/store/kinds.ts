// Shop kinds and their accents (colour.md, Shop accents; identity-in-use). Each shop keeps one pastel for
// good, chosen by its kind, so the same shop has the same colour on its tile, its page and its receipt.
// Lavender is Snuffle's colour, so no shop kind uses it; the 12 mock shops split four each across Butter,
// Peach and Pistachio (docs/deliver/prototype.md, Mocked content).
import type { ShopAccentName } from '@/design-system';

import type { Shop, ShopKind } from './types';

export const KIND_ACCENT: Record<ShopKind, ShopAccentName> = {
  bakery: 'butter',
  cafe: 'peach',
  fashion: 'peach',
  opticians: 'pistachio',
  bags: 'butter',
  gifts: 'butter',
  florist: 'pistachio',
  hardware: 'butter',
  stationery: 'pistachio',
  cameras: 'peach',
  chemist: 'pistachio',
  toys: 'peach',
  cornerShop: 'butter',
  books: 'butter',
  butcher: 'peach',
};

/** The shop's accent; a shop without a known kind falls back to Butter. */
export function shopAccent(shop: Pick<Shop, 'kind'> | undefined): ShopAccentName {
  return shop ? KIND_ACCENT[shop.kind] : 'butter';
}

export type Category = { kind: ShopKind; label: string; accent: ShopAccentName };

/** "Shops by kind" on Nearby, in the order the author listed them. */
export const CATEGORIES: Category[] = (
  [
    ['fashion', 'Fashion'],
    ['bakery', 'Bakery'],
    ['cafe', 'Café'],
    ['opticians', 'Opticians'],
    ['bags', 'Bags'],
    ['gifts', 'Gifts'],
    ['florist', 'Florist'],
    ['hardware', 'Hardware'],
  ] as const
).map(([kind, label]) => ({ kind, label, accent: KIND_ACCENT[kind] }));
