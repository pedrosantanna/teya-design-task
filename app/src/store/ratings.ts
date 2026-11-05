// Ratings, reliability and the price line on a shop page (change shop-ratings-and-range). The author's rules:
// thumbs and "Would you go back?", never stars; no percentage below 5 ratings; the stock line only after 10 "has it"
// answers; numbers are rounded down, never up; people who rated are "people" in the count ("48 people"). Words live here so the shop page, the
// reviews list and the rating sheet say the same thing.
import { price } from './labels';
import { useSim } from './simulation';
import { useAppStore } from './store';
import type { OrderRating, RatingNote, RatingTag, Shop, ShopRatings } from './types';

/** Below this many ratings the page shows no percentage. */
export const MIN_RATINGS_FOR_SHARE = 5;
/** Below this many "has it" answers the page doesn't show how often the shop had it. */
export const MIN_ANSWERS_FOR_STOCK = 10;
/** The longest note a buyer can add. */
export const NOTE_MAX = 140;

// The two fixed lists of the conceptual model (decision 047): a buyer picks up to three from the one that follows the answer.
export const UP_TAGS: RatingTag[] = ['Had it as promised', 'Set aside on time', 'Friendly', 'Good value', 'Knew their stuff'];
export const DOWN_TAGS: RatingTag[] = ["Wasn't as described", 'Not ready when I came', 'Hard to find'];
/** The most tags a buyer can pick. */
export const MAX_TAGS = 3;

/** The prototype's month for a rating sent now (Mon 2 Nov 2026). */
const THIS_MONTH = 'Nov 2026';

const EMPTY: ShopRatings = { up: 0, down: 0, tags: {}, notes: [] };

/** The shop's ratings with the shopper's own, once sent, counted in. */
export function withOwnRating(shop: Shop, own: OrderRating | null, how: RatingNote['how'] = 'Collected'): ShopRatings {
  const base = shop.ratings ?? EMPTY;
  if (!own || own.shopId !== shop.id) return base;
  const tags = { ...base.tags };
  for (const tag of own.tags) tags[tag] = (tags[tag] ?? 0) + 1;
  const note: RatingNote[] = own.note.trim() ? [{ name: 'You', text: own.note.trim(), up: own.up, month: THIS_MONTH, how }] : [];
  return { up: base.up + (own.up ? 1 : 0), down: base.down + (own.up ? 0 : 1), tags, notes: [...note, ...base.notes] };
}

/** The shop's ratings as the page shows them, including the shopper's own once sent. */
export function useShopRatings(shop: Shop): ShopRatings {
  const own = useSim((s) => s.orderRating);
  // How the order reached the shopper: a delivered order's note reads "Delivered", a collected one's "Collected".
  const how = useAppStore((s) => (s.fulfilment === 'delivery' ? 'Delivered' : 'Collected'));
  return withOwnRating(shop, own, how);
}

export type RatingHeadline = {
  /** "92% would go back"; below 5 ratings "3 people so far" or "No ratings yet". */
  title: string;
  /** "92%": the large figure, from 5 ratings. */
  figure?: string;
  /** "would go back", beside the figure. */
  caption?: string;
  /** "48 people" with a share; below 5 ratings none, where "New on Snuffle" already shows under How they do; with none, "Snuffle has asked them 4 times". */
  detail?: string;
  /** "Would go back, 92 percent of 48 people". */
  spoken: string;
  total: number;
  /** Shown only from 5 ratings. */
  share?: number;
};

const people = (n: number) => `${n} ${n === 1 ? 'person' : 'people'}`;

export function ratingHeadline(r: ShopRatings, asked?: number): RatingHeadline {
  const total = r.up + r.down;
  // Below 5 ratings the headline is the count alone: "New on Snuffle" is already the stock line of How they do on
  // Snuffle, a section above, and said twice it read as filler (visual critique 3).
  if (total === 0) {
    const times = asked == null ? undefined : `Snuffle has asked them ${asked} ${asked === 1 ? 'time' : 'times'}`;
    return { title: 'No ratings yet', detail: times, spoken: times ? `No ratings yet. ${times}` : 'No ratings yet', total };
  }
  if (total < MIN_RATINGS_FOR_SHARE) {
    return { title: `${people(total)} so far`, spoken: `${people(total)} so far have rated it`, total };
  }
  // Rounded down: 35 of 38 is 92.1%, shown as 92%; 37 of 38 (97.4%) never shows as 98%.
  const share = Math.floor((r.up * 100) / total);
  return {
    title: `${share}% would go back`,
    figure: `${share}%`,
    caption: 'would go back',
    detail: people(total),
    spoken: `Would go back, ${share} percent of ${people(total)}`,
    total,
    share,
  };
}

export type RatingTagCount = { tag: RatingTag; count: number; up: boolean };

/** Tags with their counts, most common first: the thumbs-up tags, then the thumbs-down ones. At most `max`. */
export function topTags(r: ShopRatings, max = 5): RatingTagCount[] {
  const all = Object.entries(r.tags)
    .filter(([, count]) => count > 0)
    .map(([tag, count]) => ({ tag, count, up: !DOWN_TAGS.includes(tag) }));
  const up = all.filter((t) => t.up).sort((a, b) => b.count - a.count);
  const down = all.filter((t) => !t.up).sort((a, b) => b.count - a.count);
  // Keep at least one thumbs-down tag in view when there is one, so the chips don't hide what went wrong.
  const keepDown = down.length > 0 ? 1 : 0;
  return [...up.slice(0, max - keepDown), ...down].slice(0, max);
}

/** Three notes that mirror the overall split: round(3 × share up) of them are thumbs up. */
export function quoteMix(r: ShopRatings, count = 3): RatingNote[] {
  const total = r.up + r.down;
  if (total === 0 || r.notes.length === 0) return [];
  const upWanted = Math.round((count * r.up) / total);
  const ups = r.notes.filter((n) => n.up).slice(0, upWanted);
  const downs = r.notes.filter((n) => !n.up).slice(0, count - ups.length);
  const picked = [...ups, ...downs];
  // Fill from whatever is left if one side has too few notes.
  for (const n of r.notes) if (picked.length < count && !picked.includes(n)) picked.push(n);
  return picked;
}

export type ReliabilityLine = { key: 'answers' | 'speed' | 'stock'; title: string; detail?: string; spoken: string };

/** "9 in 10", rounded down; "every" when the shop answered all of them. */
function inTen(part: number, whole: number): string {
  if (whole > 0 && part >= whole) return 'every';
  return `${Math.floor((part * 10) / Math.max(1, whole))} in 10`;
}

/** The rows of "How they do on Snuffle". */
export function reliabilityLines(shop: Shop): ReliabilityLine[] {
  const r = shop.reliability;
  if (!r) return [];
  const answers = inTen(r.answered, r.asked);
  const lines: ReliabilityLine[] = [
    {
      key: 'answers',
      title: answers === 'every' ? 'Answers every request' : `Answers ${answers} requests`,
      detail: `${r.answered} of ${r.asked} so far`,
      spoken: answers === 'every' ? `Answers every request, ${r.asked} so far` : `Answers ${answers} requests, ${r.answered} of ${r.asked} so far`,
    },
    r.connected
      ? { key: 'speed', title: 'Stock from the till', detail: 'Answers at once, from what the till shows', spoken: 'Stock from the till, answers at once' }
      : {
          key: 'speed',
          title: `Usually replies in ${r.replyMinutes ?? 10} min`,
          spoken: `Usually replies in ${r.replyMinutes ?? 10} minutes`,
        },
  ];
  if (r.hadItTotal >= MIN_ANSWERS_FOR_STOCK) {
    lines.push({
      key: 'stock',
      title: `Had it ${r.hadItRight} of ${r.hadItTotal} times when they said yes`,
      spoken: `Had it ${r.hadItRight} of ${r.hadItTotal} times when they said yes`,
    });
  } else {
    lines.push({
      key: 'stock',
      title: 'New on Snuffle',
      detail: `How often they had it shows after ${MIN_ANSWERS_FOR_STOCK} yeses`,
      spoken: `New on Snuffle. How often they had it shows after ${MIN_ANSWERS_FOR_STOCK} yeses`,
    });
  }
  return lines;
}

/** "Most items £2–£35, from past answers", or "from the shop's till" for a connected shop. */
export function priceRangeLine(shop: Shop): string | undefined {
  if (!shop.priceRange) return undefined;
  const source = shop.reliability?.connected || shop.source === 'till' ? "from the shop's till" : 'from past answers';
  return `Most items ${price(shop.priceRange.from)}–${price(shop.priceRange.to)}, ${source}`;
}
