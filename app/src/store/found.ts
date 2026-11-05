// "Found here recently" on the shop page (app flow v10): three to five item names that Snuffle shoppers found at the
// shop lately, with no buyer and no price. Mock content, derived from each shop's own items, past answers and
// categories so it never contradicts the rest of its page, and stable from one visit to the next.
import type { Shop, ShopKind } from './types';

/** What a shop of this kind plausibly has, for a shop whose own lists are short. */
const KIND_EXTRAS: Record<ShopKind, string[]> = {
  bakery: ['Sourdough loaf', 'Cinnamon bun', 'Seeded rye'],
  cafe: ['Flat white', 'Banana bread', 'Coffee beans'],
  opticians: ['Lens cleaning cloth', 'Reading glasses', 'Glasses case'],
  fashion: ['Scarf', 'Wool socks', 'Gloves'],
  bags: ['Tote bag', 'Wallet', 'Key ring'],
  gifts: ['Greeting card', 'Scented candle', 'Gift wrap'],
  florist: ['Seasonal bunch', 'Tulips', 'Eucalyptus'],
  hardware: ['Picture hooks', 'Wall plugs', 'Masking tape'],
  stationery: ['Notebook', 'Fountain pen ink', 'Envelopes'],
  cameras: ['AA batteries', 'Camera strap', 'Memory card'],
  chemist: ['Plasters', 'Sun cream', 'Toothpaste'],
  toys: ['Jigsaw puzzle', 'Card game', 'Bubbles'],
  cornerShop: ['Birthday candles', 'Batteries', 'Stamps'],
  books: ["Children's picture book", 'Street atlas', 'Book token'],
  butcher: ['Sausages', 'Chicken thighs', 'Bacon'],
  deli: ['Olive oil', 'Parmesan', 'Fresh pasta'],
};

/** "AA batteries, pack of 4" becomes "AA batteries"; a name after a comma is a detail, not part of the item. */
const clean = (name: string) => name.split(',')[0].trim();

const sameThing = (a: string, b: string) => {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  return x === y || x.startsWith(y) || y.startsWith(x);
};

/** Three to five names, the count varying from shop to shop. */
export function foundRecently(shop: Shop, index: number): string[] {
  const want = 3 + (index % 3);
  const pool = [
    ...(shop.items ?? []).map((i) => clean(i.name)),
    ...(shop.history ?? []).filter((h) => h.had).map((h) => h.item),
    ...(shop.categories ?? []),
    ...KIND_EXTRAS[shop.kind],
  ];
  const out: string[] = [];
  for (const name of pool) {
    if (out.length >= want) break;
    if (!out.some((o) => sameThing(o, name))) out.push(name);
  }
  return out;
}
