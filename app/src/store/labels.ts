// Status labels, word for word from the state table in docs/develop/design-system/conceptual-model.md.
// Rows, chat cards, notifications and the Live Activity all read them from here.
import type { AnswerSource, AnswerState, Fulfilment, OrderState, RequestState, Shop, ShopHours } from './types';

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
      return 'Looking · until Fri 6 Nov';
    case 'repeat':
      return 'Every Friday';
    case 'notFound':
      return 'Not found';
    case 'closed':
      return 'Closed';
  }
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
  return `${had ? 'Had it' : "Didn't have it"} · ${when}`;
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

/** "Keep looking for [n] more", added to the order card after a partial buy. */
export function keepLookingLine(more: number): string {
  return `Keep looking for ${more} more`;
}

export function shopHoursLabel(hours: ShopHours, shop: Pick<Shop, 'openUntil' | 'opensAt'>): string {
  switch (hours) {
    case 'open':
      return `Open till ${shop.openUntil}`;
    case 'closesSoon':
      return 'Closes soon';
    case 'closed':
      return `Closed · opens ${shop.opensAt}`;
  }
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
