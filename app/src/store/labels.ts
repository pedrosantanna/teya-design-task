// Status labels, word for word from the state table in docs/develop/design-system/conceptual-model.md.
// Rows, chat cards, notifications and the Live Activity all read them from here.
import type { AnswerSource, AnswerState, Fulfilment, OrderState, RequestState, Shop, ShopHours } from './types';

/** The most rating tags a buyer can pick (ratings.ts re-exports it). */
export const MAX_TAGS = 3;

/** The day a request keeps looking until, the prototype's one date for it (the request is made on Mon 2 Nov). */
export const LOOK_UNTIL = 'Fri 6 Nov';
/** A search that repeats asks again on the same weekday, four weeks on (it can be renewed). */
export const LOOK_UNTIL_WEEKLY = 'Fri 4 Dec';
/** The weekday a repeating search asks on. */
export const LOOK_DAY = 'Friday';

/** When a search ends: Fri 6 Nov for a one-off, Fri 4 Dec when it repeats every week. */
export const lookUntil = (repeat: boolean): string => (repeat ? LOOK_UNTIL_WEEKLY : LOOK_UNTIL);

const plural = (isPlural: boolean, one: string, many: string) => (isPlural ? many : one);

export type RequestLabelContext = {
  asked: number;
  have: number;
  plural: boolean;
  deadline?: string;
};

export function requestLabel(state: RequestState, ctx: RequestLabelContext): string {
  const suffix = ctx.deadline ? ` · by ${ctx.deadline}` : '';
  switch (state) {
    case 'none':
      return 'Not asked yet';
    case 'asking':
      return `Asking ${ctx.asked} shops`;
    case 'haveIt':
      return `${ctx.have} ${ctx.have === 1 ? 'shop has' : 'shops have'} ${plural(ctx.plural, 'it', 'them')}${suffix}`;
    case 'needsYou':
      return 'Needs you · buy by Thu 5 Nov';
    case 'looking':
      return `Looking · until ${LOOK_UNTIL}`;
    case 'repeat':
      return 'Every Friday';
    case 'notFound':
      return 'Not found';
    case 'closed':
      return 'Closed';
  }
}

export type RequestPreviewContext = {
  asked: number;
  have: number;
  /** The shop that needs the shopper's answer, or the order's shop. */
  shop: string;
  /** "6pm": when the shop closes, for a ready order. */
  openUntil: string;
  extendedTo: string;
  /** "£29.98" */
  total: string;
  rated: boolean;
};

/** Snuffle's latest status in its own voice, for the preview line of a request row (content.md, Snuffle's voice):
 *  first person, short, the state's news first. An order's news replaces the request's once there is an order. */
export function requestPreview(state: RequestState, order: OrderState, ctx: RequestPreviewContext): string {
  const line = (() => {
    switch (order) {
      case 'waiting':
        return `Waiting for ${ctx.shop}. You haven't been charged`;
      case 'paid':
        return `Paid. ${ctx.shop} is setting it aside`;
      case 'ready':
        return `Ready to collect till ${ctx.openUntil}`;
      case 'extended':
        return `Extended. Collect by ${ctx.extendedTo}`;
      case 'onItsWay':
        return `On its way from ${ctx.shop}`;
      case 'delivered':
        return ctx.rated ? `Delivered. Thanks for rating ${ctx.shop}` : `Delivered. How was ${ctx.shop}?`;
      case 'collected':
        return ctx.rated ? `Thanks for rating ${ctx.shop}` : `How was ${ctx.shop}?`;
      case 'notConfirmed':
        return `${ctx.shop} didn't confirm. You haven't been charged`;
      case 'sold':
        return `${ctx.shop} sold out. You haven't been charged`;
      case 'cancelled':
        return `Cancelled. I've refunded ${ctx.total}`;
      case 'notCollected':
        return `Not collected, so I've refunded ${ctx.total}`;
      case 'none':
        break;
    }
    switch (state) {
      case 'none':
        return 'What do you need?';
      case 'asking':
        return `Asking ${ctx.asked} shops`;
      case 'haveIt':
        return `Found ${ctx.have === 1 ? 'it' : 'them'} at ${ctx.have} ${ctx.have === 1 ? 'shop' : 'shops'}`;
      case 'needsYou':
        return `${ctx.shop} needs your answer`;
      case 'looking':
        return `Still looking until ${LOOK_UNTIL}`;
      case 'repeat':
        return `I'll ask again every Friday until ${LOOK_UNTIL_WEEKLY}`;
      case 'notFound':
        return 'No one had it. Want me to keep looking?';
      case 'closed':
        return 'Closed. Nothing was bought';
    }
  })();
  return `Snuffle: ${line}`;
}

/** The filter a request falls under in Requests. */
export function requestFilter(state: RequestState, order: OrderState): 'Needs you' | 'Looking' | 'Waiting' | 'Done' {
  if (order === 'waiting' || order === 'ready' || order === 'extended' || order === 'paid' || order === 'onItsWay') return 'Waiting';
  if (order !== 'none') return 'Done';
  if (state === 'needsYou' || state === 'haveIt') return 'Needs you';
  if (state === 'asking' || state === 'looking' || state === 'repeat') return 'Looking';
  return 'Done';
}

/** Where an answer is drawn: a compact row on the asking list ("In stock · 1 of 2"; the row's flash symbol says it
 *  came from the till, and its spoken label says so), a full card's
 *  status line ("In stock now · 1 of 2 · from the shop's till"), that line without its source (`cardStatus`, the
 *  card adds the source itself), or the bare status. */
export type AnswerForm = 'row' | 'card' | 'cardStatus' | 'status';

export type AnswerLabelContext = {
  plural: boolean;
  quantity: number;
  available?: number;
  source: AnswerSource;
  repliedAgo?: string;
  notice?: string;
  /** What a shop with something similar offers ("Solar viewer cards"); goes after "Has something similar" on cards. */
  item?: string;
};

export function answerLabel(state: AnswerState, ctx: AnswerLabelContext, form: AnswerForm = 'status'): string {
  const them = plural(ctx.plural, 'it', 'them');
  const ofQuantity = `${ctx.available ?? 1} of ${ctx.quantity}`;
  const till = form === 'row' || form === 'cardStatus' ? '' : " · from the shop's till";
  const replied = form === 'card' && ctx.repliedAgo ? ` · replied ${ctx.repliedAgo}` : '';
  const similarItem = (form === 'card' || form === 'cardStatus') && ctx.item ? ` · ${ctx.item}` : '';
  switch (state) {
    case 'asked':
      return 'Asked';
    case 'seen':
      return 'Seen';
    case 'hasIt':
      return `Has ${them}${replied}`;
    case 'hasSome':
      return `Has ${ofQuantity}${replied}`;
    case 'similar':
      return `Has something similar${similarItem}${replied}`;
    case 'doesntHave':
      return `Doesn't have ${them}`;
    case 'noReply':
      return 'No reply';
    case 'inStock':
      return `In stock now${till}`;
    case 'inStockSome':
      return `${form === 'row' ? 'In stock' : 'In stock now'} · ${ofQuantity}${till}`;
    case 'canMake':
      return `Can make it · ${ctx.notice ?? "2 days' notice"}`;
  }
}

/** True when an answer offers something the shopper can buy. */
export function answerCanBuy(state: AnswerState): boolean {
  return state === 'hasIt' || state === 'hasSome' || state === 'similar' || state === 'inStock' || state === 'inStockSome' || state === 'canMake';
}

/** Past answers on a shop page. */
export function pastAnswerLabel(had: boolean, when: string): string {
  return `${had ? 'Had it' : "Didn't have it"}, ${when}`;
}

export type OrderLabelContext = {
  shop: string;
  collectBy: string;
  extendedTo: string;
};

export function orderLabel(state: OrderState, ctx: OrderLabelContext): string {
  switch (state) {
    case 'none':
      return 'No order';
    case 'waiting':
      return `Waiting for ${ctx.shop} · not charged yet`;
    case 'ready':
      return `Ready · collect by ${ctx.collectBy}`;
    case 'extended':
      return `Extended · collect by ${ctx.extendedTo}`;
    case 'collected':
      return 'Collected';
    case 'notConfirmed':
      return 'Not confirmed · not charged';
    case 'sold':
      return 'Sold · not charged';
    case 'cancelled':
      return 'Cancelled · refunded';
    case 'notCollected':
      return 'Not collected · refunded';
    case 'paid':
      return 'Paid';
    case 'onItsWay':
      return 'On its way';
    case 'delivered':
      return 'Delivered';
  }
}

/** The order states each way of getting the item goes through, in order. */
export const orderStatesFor: Record<Fulfilment, OrderState[]> = {
  collect: ['none', 'waiting', 'ready', 'extended', 'collected', 'notConfirmed', 'sold', 'cancelled', 'notCollected'],
  delivery: ['none', 'waiting', 'paid', 'onItsWay', 'delivered', 'notConfirmed', 'sold', 'cancelled'],
};

/** "Still looking for [n] more", added to the order card after a partial buy. A status, worded so it doesn't read
 *  as a button. */
export function keepLookingLine(more: number): string {
  return `Still looking for ${more} more`;
}

export function shopHoursLabel(hours: ShopHours, shop: Pick<Shop, 'openUntil' | 'opensAt'>): string {
  switch (hours) {
    case 'open':
      return noBreak(`Open until ${shop.openUntil}`);
    case 'closesSoon':
      return noBreak('Closes soon');
    case 'closed':
      return `Closed, ${noBreak(`opens ${shop.opensAt}`)}`;
  }
}

/** A state-table label as running text: its dot becomes a comma ("In stock now, 1 of 2"). */
export function commas(label: string): string {
  return label.replaceAll(' · ', ', ');
}

/** Binds a phrase with non-breaking spaces, so a line breaks between facts, never inside one ("Open till 6pm"). */
export function noBreak(phrase: string): string {
  return phrase.replace(/ /g, '\u00A0');
}

/** "2 min walk" as one unit. */
export function walkLabel(minutes: number): string {
  return noBreak(`${minutes} min walk`);
}

/** A street as one unit when it is short ("Blythe Road"); a long one keeps its last two words together. */
export function streetLabel(street: string): string {
  if (street.length <= 16) return noBreak(street);
  const words = street.split(' ');
  return `${words.slice(0, -2).join(' ')} ${words.slice(-2).join('\u00A0')}`;
}

/** What the shop's status shows: the word's state and the time that follows it ("until 6pm", "opens 9am"), bound with
 *  non-breaking spaces. Closes soon has no time. */
export function shopStatus(hours: ShopHours, shop: Pick<Shop, 'openUntil' | 'opensAt'>): { state: ShopHours; detail?: string } {
  switch (hours) {
    case 'open':
      return { state: 'open', detail: noBreak(`until ${shop.openUntil}`) };
    case 'closesSoon':
      return { state: 'closesSoon' };
    case 'closed':
      return { state: 'closed', detail: noBreak(`opens ${shop.opensAt}`) };
  }
}

/** The facts of a shop for ShopMeta (content.md, Metadata lines): status, walk and, where room allows, street, each a unit. */
export function shopFacts(hours: ShopHours, shop: Pick<Shop, 'openUntil' | 'opensAt' | 'street' | 'walkMinutes'>, withStreet = true) {
  return { ...shopStatus(hours, shop), walk: walkLabel(shop.walkMinutes), street: withStreet ? streetLabel(shop.street) : undefined };
}

export function price(amount: number): string {
  return `£${amount.toFixed(2).replace(/\.00$/, '')}`;
}

/** Timestamps the shopper reads are 12-hour (content.md): "11:02" → "11:02am", "13:21" → "1:21pm". */
export function twelveHour(when: string): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec(when);
  if (!m) return when;
  const h = Number(m[1]);
  return `${h % 12 === 0 ? 12 : h % 12}:${m[2]}${h < 12 ? 'am' : 'pm'}`;
}
