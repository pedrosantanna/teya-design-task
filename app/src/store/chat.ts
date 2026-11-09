// The chat of the active request, worked out from the store: what the shopper said, what Snuffle said,
// the asking list, answer cards and order cards. It is derived (not a log), so every journey step the
// debugger jumps to shows the chat as in that frame of app flow v7. Words come from labels.ts and
// docs/develop/design-system/content.md.
import { useShallow } from 'zustand/react/shallow';

import { answerLabel, keepLookingLine, lookUntil, orderLabel, price, requestLabel, requestPreview } from './labels';
import { contentFor, shopById } from './seed';
import { TYPING_MS, isBuyable, isYes, unitFor, useSim, type EndedOrder, type SimState } from './simulation';
import { useAppStore, type AppState } from './store';
import type { AnswerState, Fulfilment, Offer, OrderState, PersonaContent, Shop } from './types';

export type Chip = { label: string; action: string };

export type ChatItem =
  | { kind: 'bubble'; key: string; sender: 'shopper' | 'snuffle'; text: string; day?: string }
  | { kind: 'chips'; key: string; chips: Chip[] }
  | { kind: 'asking'; key: string; wider?: boolean }
  | { kind: 'answer'; key: string; shopId: string; best: boolean }
  | { kind: 'order'; key: string; order: OrderView }
  // The other requests' chats (other-chat.ts): their asking list, answer and status are written out, not worked out from the simulation.
  | { kind: 'rows'; key: string; rows: { shopId: string; shop: string; street: string; status: string; kind: 'asked' | 'seen' | 'yes' | 'till' | 'no' }[] }
  | { kind: 'offer'; key: string; shopId: string; shop: string; status: string; source?: string; price: string; walk: string; collectBy: string; buyLabel: string }
  | { kind: 'status'; key: string; label: string; tone: 'default' | 'needsYou' | 'warning' | 'success' | 'quiet' };

/** Everything an order card, the receipt and the request row need about one order. */
export type OrderView = {
  shopId: string;
  shop: string;
  street: string;
  openUntil: string;
  walk: string;
  quantity: number;
  items: string;
  total: string;
  state: OrderState;
  label: string;
  tone: 'default' | 'warning' | 'success';
  fulfilment: Fulfilment;
  collectBy: string;
  extendedTo: string;
  steps?: { title: string; detail?: string; state: 'done' | 'current' | 'todo' }[];
  note?: string;
  till: boolean;
  payName: string;
  card: string;
  code: string;
  collectAt?: Shop;
  /** Collected and not rated yet: the card carries Rate (change shop-ratings-and-range). */
  canRate: boolean;
  /** The shopper has rated this order. */
  rated: boolean;
};

const NUMBERS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const counted = (n: number) => NUMBERS[n] ?? String(n);

type AppSlice = Pick<
  AppState,
  'persona' | 'contentSet' | 'platform' | 'request' | 'answers' | 'order' | 'fulfilment' | 'payment' | 'keepLookingForMore' | 'notificationsAllowed'
>;

function appSlice(s: AppState): AppSlice {
  return {
    persona: s.persona,
    contentSet: s.contentSet,
    platform: s.platform,
    request: s.request,
    answers: s.answers,
    order: s.order,
    fulfilment: s.fulfilment,
    payment: s.payment,
    keepLookingForMore: s.keepLookingForMore,
    notificationsAllowed: s.notificationsAllowed,
  };
}

const toneFor = (state: OrderState): OrderView['tone'] =>
  state === 'sold' || state === 'notConfirmed' ? 'warning' : state === 'ready' || state === 'paid' || state === 'collected' ? 'success' : 'default';

export function orderView(
  c: PersonaContent,
  app: AppSlice,
  shopId: string,
  quantity: number,
  state: OrderState,
  fulfilment: Fulfilment,
  rated = false,
  collectPoint = true,
): OrderView {
  const shop = shopById(c, shopId);
  const offer = c.active.offers.find((o) => o.shopId === shopId);
  const name = shop?.name ?? '';
  const them = quantity === 1 ? 'it' : 'them';
  // Jess's order can be collected at the corner shop the bakery drops at, or at the bakery itself.
  const collectAt = collectPoint && shopId === c.order.shopId && c.order.collectAt ? shopById(c, c.order.collectAt) : undefined;
  const fee = fulfilment === 'delivery' ? (shop?.delivers?.fee ?? 0) : 0;
  const amount = (offer?.price ?? 0) * quantity + fee;
  const total = price(amount);
  const collectBy = offer?.collectBy || c.order.collectBy;
  const extendedTo = shopId === c.order.shopId ? c.order.extendedTo : collectBy;
  const till = shop?.source === 'till';
  const payName = app.platform === 'android' ? 'Google Pay' : 'Apple Pay';
  // After Collected the label asks for a rating, then says it's done: "Collected · rate Paper & Co", "Collected · rated".
  const label = state === 'collected' ? (rated ? 'Collected · rated' : `Collected · rate ${name}`) : orderLabel(state, { shop: name, collectBy, extendedTo });
  let steps: OrderView['steps'];
  if (fulfilment === 'delivery' && state !== 'sold' && state !== 'notConfirmed' && state !== 'cancelled') {
    const at = ['waiting', 'paid', 'onItsWay', 'delivered'].indexOf(state);
    const mark = (i: number): 'done' | 'current' | 'todo' => (i < at || state === 'delivered' ? 'done' : i === at ? 'current' : 'todo');
    steps = [
      { title: `Waiting for ${name}`, detail: '1:19pm', state: mark(0) },
      { title: 'Paid', detail: at >= 1 ? `${total}, including ${price(fee)} delivery · 1:21pm` : `Charged when ${name} confirms`, state: mark(1) },
      { title: 'On its way', detail: at >= 2 ? `${name}'s courier · 2:05pm` : `${name}'s courier`, state: mark(2) },
      { title: 'Delivered', detail: at >= 3 ? `${c.area} · 2:41pm` : c.area, state: mark(3) },
    ];
  } else if (state === 'waiting') {
    steps = [
      { title: `Bought with ${payName}`, detail: c.id === 'sam' ? '1:16pm' : '12:31pm', state: 'done' },
      { title: `${name} sets ${them} aside`, detail: `Charged when ${name} confirms`, state: 'current' },
      { title: `Ready · collect by ${collectBy}`, detail: 'Collection code on the receipt', state: 'todo' },
    ];
  }
  const more = c.active.quantity - quantity;
  return {
    shopId,
    shop: name,
    street: shop?.street ?? '',
    openUntil: shop?.openUntil ?? '',
    walk: `${(collectAt ?? shop)?.walkMinutes ?? 0} min walk`,
    quantity,
    items: `${quantity} × ${c.active.title.toLowerCase()}`,
    total,
    state,
    label,
    tone: toneFor(state),
    fulfilment,
    collectBy,
    extendedTo,
    steps,
    note: app.keepLookingForMore && more > 0 ? keepLookingLine(more) : undefined,
    till,
    payName,
    card: c.card,
    code: c.order.code,
    collectAt,
    canRate: state === 'collected' && !rated,
    rated,
  };
}

/** The current order, or null before Buy. */
export function currentOrder(c: PersonaContent, app: AppSlice, sim: Pick<SimState, 'orderShopId' | 'orderQty' | 'orderRating' | 'collectAt'>): OrderView | null {
  if (app.order === 'none') return null;
  const shopId = sim.orderShopId ?? c.order.shopId;
  return orderView(c, app, shopId, sim.orderQty || c.active.quantity, app.order, app.fulfilment, sim.orderRating?.shopId === shopId, sim.collectAt !== 'shop');
}

/** Answers with a card in the chat, best first: all of it, then some of it, then something similar. */
export function rankedAnswers(c: PersonaContent, answers: Record<string, AnswerState>, dismissed: string[]): Offer[] {
  const rank = (o: Offer) => {
    const s = answers[o.shopId];
    const all = (s === 'hasIt' || s === 'inStock') && (o.available ?? c.active.quantity) >= c.active.quantity;
    return all ? 0 : isYes(s) ? 1 : 2;
  };
  return c.active.offers.filter((o) => isBuyable(answers[o.shopId]) && !dismissed.includes(o.shopId)).sort((a, b) => rank(a) - rank(b));
}

export function buildChat(c: PersonaContent, app: AppSlice, sim: SimState): ChatItem[] {
  const items: ChatItem[] = [];
  const snuffle = (key: string, text: string, day?: string) => items.push({ kind: 'bubble', key, sender: 'snuffle', text, day });
  const shopper = (key: string, text: string) => items.push({ kind: 'bubble', key, sender: 'shopper', text });
  const chips = (key: string, list: Chip[]) => list.length > 0 && items.push({ kind: 'chips', key, chips: list });
  const active = c.active;
  const them = active.plural ? 'them' : 'it';
  const isSam = c.id === 'sam';
  const started = sim.stage !== 'none' || app.request !== 'none';
  if (!started) return items;

  shopper('asked', sim.askedText ?? active.asked);

  // Snuffle confirms what it understood, and asks only what's missing.
  if (isSam) {
    const qty = `${active.quantity} ${unitFor(c, active.quantity)}`;
    snuffle(
      'confirm',
      `Got it: ${qty} within 15 minutes of you${active.deadline ? `, by ${active.deadline}` : ''}. Will you collect ${them}, or should I check delivery too?`,
    );
    if (sim.stage === 'clarify') {
      chips('howChips', [
        { label: 'Collect', action: 'collect' },
        { label: 'Check delivery too', action: 'delivery' },
      ]);
      return items;
    }
    shopper('how', sim.how === 'delivery' ? 'Check delivery too' : 'Collect');
    snuffle(
      'notify',
      'I\'ll ask the shops most likely to have them. Shops take a few minutes; allow notifications and I\'ll tell you as each one answers, even if you leave the app.',
    );
    if (sim.stage === 'notify') return items;
  } else {
    const closing = shopById(c, c.order.shopId);
    snuffle('confirm', `Got it: ${active.title.toLowerCase()} you can collect after work. ${closing ? `${closing.name} closes at ${closing.openUntil}, so I'll ask them what they can do.` : ''}`.trim());
  }

  // A standing request ("every Friday") says so right away, with when it ends.
  if (sim.looking?.standing && sim.looking.repeat) {
    const first = shopById(c, active.offers[0]?.shopId ?? '');
    snuffle('standing', `I'll ask ${active.offers.length === 1 ? (first?.name ?? 'the shop') : 'the shops'} again every week, on ${sim.looking.day}s, until ${lookUntil(true)}, and tell you what they say.`);
  }

  // Asking shops. Once the shopper has asked further away, `offers` also holds those shops; the first ones are the near ones.
  const near = active.nearCount ?? active.offers.length;
  const nearOffers = active.offers.slice(0, near);
  const widerOffers = active.offers.slice(near);
  const widened = sim.wider != null && widerOffers.length > 0;
  const shopCount = nearOffers.length;
  const streets = new Set(nearOffers.map((o) => shopById(c, o.shopId)?.street)).size;
  const first = shopById(c, nearOffers[0]?.shopId ?? '');
  snuffle(
    'asking',
    shopCount === 1
      ? `I'm asking ${first?.name ?? 'the shop'}. You can leave the app; I'll tell you when they answer.`
      : `I'm asking ${shopCount} shops on ${streets} streets near you. You can leave the app; I'll tell you as they answer.`,
  );
  items.push({ kind: 'asking', key: 'askingList' });
  if (!app.notificationsAllowed) snuffle('notifyOff', "Notifications are off, so I'll keep answers here and on the Requests button.");

  // Nothing found in time.
  const nearHas = nearOffers.some((o) => isBuyable(app.answers[o.shopId]));
  if (app.request === 'notFound' || (widened && !nearHas)) {
    const no = nearOffers.filter((o) => app.answers[o.shopId] === 'doesntHave').length;
    const silent = nearOffers.filter((o) => (app.answers[o.shopId] ?? 'asked') === 'noReply' || (app.answers[o.shopId] ?? 'asked') === 'asked').length;
    snuffle(
      'notFound',
      `None of the ${shopCount} shops has ${them}${active.deadline ? ` before ${active.deadline}` : ''}: ${no} said no and ${silent} didn't reply.`,
    );
    if (!widened) {
      snuffle('notFound2', `I can ask shops up to 30 minutes away, or keep looking and tell you when one near you has ${them}.`);
      chips('notFoundChips', [
        { label: 'Ask further away', action: 'askFurther' },
        { label: 'Keep looking', action: 'keepLooking' },
      ]);
      appendLooking();
      appendNotes();
      return items;
    }
    // Further away: the shopper's ask, the shops asked, then their answers like any other.
    shopper('wider', 'Ask further away');
    snuffle('widerAsk', `I'm asking ${counted(widerOffers.length).toLowerCase()} more ${widerOffers.length === 1 ? 'shop' : 'shops'}, up to 30 minutes away. I'll tell you as they answer.`);
    items.push({ kind: 'asking', key: 'widerList', wider: true });
    const widerBuyable = widerOffers.some((o) => isBuyable(app.answers[o.shopId]));
    if (!widerBuyable) {
      const allIn = widerOffers.every((o) => !['asked', 'seen'].includes(app.answers[o.shopId] ?? 'asked'));
      if (allIn) {
        snuffle('widerNone', `None of the ${widerOffers.length} shops further away has ${them} either. I can keep looking and tell you when one has ${them}.`);
        chips('widerChips', [{ label: 'Keep looking', action: 'keepLooking' }]);
      }
      appendLooking();
      appendNotes();
      return items;
    }
  }

  // Answers.
  const cards = rankedAnswers(c, app.answers, sim.dismissed);
  const answered = app.request !== 'asking' && app.request !== 'none';
  if (answered && (cards.length > 0 || app.order !== 'none')) {
    const have = active.offers.filter((o) => isYes(app.answers[o.shopId])).length;
    snuffle(
      'summary',
      have > 0
        ? active.offers.length === 1
          ? `${shopById(c, active.offers[0].shopId)?.name ?? 'The shop'} has ${them}.`
          : `${counted(have)} ${have === 1 ? 'shop' : 'shops'}${widened && !nearHas ? ' further away' : ''} ${have === 1 ? 'has' : 'have'} ${them} so far.`
        : `${counted(cards.length)} ${cards.length === 1 ? 'shop has' : 'shops have'} something similar so far.`,
    );
    if (app.order === 'none') {
      // Buy is filled only when there is a single obvious next step; with two or more offers they are peers (tonal).
      const buyable = cards.filter((o) => app.answers[o.shopId] !== 'similar');
      const best = buyable.length === 1 ? buyable[0].shopId : undefined;
      for (const o of cards) items.push({ kind: 'answer', key: `answer-${o.shopId}`, shopId: o.shopId, best: o.shopId === best });
    }
  }

  // A declined payment creates no order.
  if (app.payment === 'declined' && app.order === 'none') {
    const shop = shopById(c, sim.buyShopId ?? c.order.shopId);
    const payName = app.platform === 'android' ? 'Google Pay' : 'Apple Pay';
    shopper('buyDeclined', `Buy ${sim.quantity || active.quantity} at ${shop?.name ?? ''}`);
    snuffle(
      'declined',
      `${payName} declined the payment, so you haven't been charged and ${shop?.name ?? 'the shop'} hasn't been asked to set ${them} aside.`,
    );
    chips('declinedChips', [{ label: 'Try again', action: 'tryAgain' }]);
  } else if (app.payment === 'sheet' && app.order === 'none') {
    const shop = shopById(c, sim.buyShopId ?? c.order.shopId);
    shopper('buyPaying', `Buy ${sim.quantity || active.quantity} at ${shop?.name ?? ''}`);
  }

  // Orders: one that ended before, then the current one.
  const order = currentOrder(c, app, sim);
  if (sim.ended && order) orderBlock(sim.ended, false);
  if (order) orderBlock({ shopId: order.shopId, quantity: order.quantity, state: order.state, fulfilment: order.fulfilment }, true);

  appendLooking();
  appendNotes();
  return items;

  function orderBlock(o: EndedOrder, current: boolean) {
    const rated = current && sim.orderRating?.shopId === o.shopId;
    const view = orderView(c, app, o.shopId, o.quantity, o.state, o.fulfilment, rated, sim.collectAt !== 'shop');
    const k = (name: string) => `${name}-${o.shopId}`;
    const it = o.quantity === 1 ? 'it' : 'them';
    shopper(k('buy'), o.fulfilment === 'delivery' ? `Buy ${o.quantity}, ${view.shop} delivers` : `Buy ${o.quantity} at ${view.shop}`);
    if (o.fulfilment === 'delivery') snuffle(k('delivers'), `${view.shop} delivers with its own courier. I'll pass on what they tell me.`);
    else if (view.till) snuffle(k('till'), `${view.shop} had ${it} on the till, so ${o.quantity === 1 ? "it's" : "they're"} yours.`);
    else snuffle(k('waiting'), `${view.shop} is setting ${it} aside. You're only charged when they confirm.`);
    items.push({ kind: 'order', key: k('order'), order: { ...view, note: current ? view.note : undefined } });

    const closes = view.collectAt?.openUntil ?? view.openUntil;
    switch (o.state) {
      case 'ready':
      case 'extended':
        if (!view.till && o.fulfilment === 'collect') snuffle(k('ready'), `${view.shop} has set ${it} aside, so you've paid ${view.total}. Your collection code is on the receipt: tap the order at the top.`);
        if (sim.date === 'dayBefore' || sim.extendedInChat) {
          snuffle(k('reminder'), `Your ${o.quantity} ${unitFor(c, o.quantity)} ${o.quantity === 1 ? 'is' : 'are'} set aside at ${view.collectAt?.name ?? view.shop}. Collect by ${view.collectBy}, ${closes}.`, 'Sun 8 Nov');
          snuffle(k('reminder2'), "Can't make it? You can extend once.");
          if (o.state === 'ready') {
            chips(k('reminderChips'), [
              { label: `Extend to ${view.extendedTo}`, action: 'extend' },
              { label: 'Directions', action: 'directions' },
            ]);
          }
        }
        if (o.state === 'extended') {
          shopper(k('extend'), `Extend to ${view.extendedTo}`);
          snuffle(k('extended'), `Done. Collect by ${view.extendedTo}, ${closes}.`);
        }
        break;
      // Collected: the order card carries Rate. Delivered: Snuffle asks, with a Rate chip.
      case 'collected':
        if (rated) snuffle(k('rated'), `Thanks. Your rating is on ${view.shop}'s page now.`);
        break;
      case 'delivered':
        snuffle(k('delivered'), 'Delivered at 2:41pm.');
        if (rated) {
          snuffle(k('rated'), `Thanks. Your rating is on ${view.shop}'s page now.`);
        } else if (current) {
          snuffle(k('howWas'), `How was ${view.shop}?`);
          chips(k('rateChips'), [{ label: 'Rate', action: 'rate' }]);
        }
        break;
      case 'cancelled':
        snuffle(k('cancelled'), `Your order at ${view.shop} is cancelled. I've refunded ${view.total} to your card.`);
        if (current) chips(k('cancelChips'), [{ label: 'Keep looking', action: 'keepLooking' }]);
        break;
      case 'notCollected':
        snuffle(
          k('expired'),
          `You didn't collect by ${view.collectBy}, so your order at ${view.shop} is cancelled. I've refunded ${view.total} to your card.`,
          'Tue 10 Nov',
        );
        if (current) {
          chips(k('expiredChips'), [
            { label: `Ask ${view.shop} again`, action: 'askAgain' },
            { label: 'Keep looking', action: 'keepLooking' },
          ]);
        }
        break;
      case 'sold':
      case 'notConfirmed': {
        snuffle(
          k('ending'),
          o.state === 'sold'
            ? `${view.shop} sold the last ${unitFor(c, 2)} before they could set ${it} aside, so you haven't been charged.`
            : `${view.shop} hasn't confirmed in 10 minutes, so you haven't been charged.`,
        );
        if (!current) break;
        const next = rankedAnswers(c, app.answers, sim.dismissed).find((a) => a.shopId !== o.shopId && app.answers[a.shopId] !== 'similar');
        if (next) {
          const nextShop = shopById(c, next.shopId);
          const has = next.available ?? active.quantity;
          snuffle(k('next'), `${nextShop?.name ?? ''} still has ${has} ${unitFor(c, has)}.`);
          items.push({ kind: 'answer', key: `answer-${next.shopId}`, shopId: next.shopId, best: true });
          if (has < active.quantity) snuffle(k('nextPartial'), `Buy ${has} here and I'll keep looking for ${active.quantity - has} more.`);
        }
        if (app.request !== 'looking') chips(k('endingChips'), [{ label: 'Keep looking', action: 'keepLooking' }]);
        break;
      }
      default:
        break;
    }
  }

  function appendLooking() {
    if (app.request === 'looking') {
      shopper('looking', 'Keep looking');
      const repeat = !!sim.looking?.repeat;
      snuffle(
        'lookingReply',
        `I'll keep looking${repeat ? ` every week, on ${sim.looking?.day}s,` : ''} until ${lookUntil(repeat)} and message you when a shop near you has ${them}. Nothing is bought until you tap Buy.`,
      );
    }
    // A search that is running always shows how to change or stop it.
    if (sim.looking) {
      chips('lookingChips', [
        { label: 'Change', action: 'changeLooking' },
        { label: 'Stop', action: 'stopLooking' },
      ]);
    }
  }

  function appendNotes() {
    for (const note of sim.notes) {
      items.push({ kind: 'bubble', key: note.id, sender: note.sender, text: note.text });
      if (note.chips) chips(`${note.id}chips`, note.chips);
    }
  }
}

/** The simulation without its clock, so screens don't re-render on every tick. */
function withoutClock({ clock: _clock, ...rest }: SimState): SimState {
  return rest as SimState;
}

export function useChat(): ChatItem[] {
  const app = useAppStore(useShallow(appSlice));
  const sim = useSim(useShallow(withoutClock));
  return buildChat(contentFor(app.persona, app.contentSet, sim.wider != null), app, sim);
}

export function useCurrentOrder(): OrderView | null {
  const app = useAppStore(useShallow(appSlice));
  const sim = useSim(useShallow((s) => ({ orderShopId: s.orderShopId, orderQty: s.orderQty, orderRating: s.orderRating, collectAt: s.collectAt, wider: s.wider != null })));
  return currentOrder(contentFor(app.persona, app.contentSet, sim.wider), app, sim);
}

/** The active request as a row in Requests: its label (or its order's), the last message and unread answers. */
export function useActiveRequestRow(): { status: string; tone: 'default' | 'needsYou' | 'warning' | 'success'; preview: string; unread: number } | null {
  const app = useAppStore(useShallow(appSlice));
  const sim = useSim(useShallow(withoutClock));
  const c = contentFor(app.persona, app.contentSet, sim.wider != null);
  if (app.request === 'none' && sim.stage === 'none') return null;
  const order = currentOrder(c, app, sim);
  const yes = c.active.offers.filter((o) => isYes(app.answers[o.shopId]));
  const have = yes.length;
  // A search that repeats shows its cadence ("Every Friday") in place of its end date.
  const state = app.request === 'none' ? 'asking' : app.request === 'looking' && sim.looking?.repeat ? 'repeat' : app.request;
  const status = order
    ? order.label
    : requestLabel(state, { asked: c.active.offers.length, have, plural: c.active.plural, deadline: c.active.deadline });
  return {
    status,
    tone: order ? order.tone : app.request === 'needsYou' ? 'needsYou' : 'default',
    preview: requestPreview(state, app.order, {
      asked: c.active.offers.length,
      have,
      shop: order?.shop ?? shopById(c, yes[0]?.shopId ?? '')?.name ?? 'A shop',
      openUntil: order?.openUntil ?? '',
      extendedTo: order?.extendedTo ?? '',
      total: order?.total ?? '',
      rated: order?.rated ?? false,
    }),
    unread: !order && app.request === 'haveIt' && !sim.chatOpen ? have : 0,
  };
}

/** One answer's card text: status and source split, as the answer card shows them. */
export function answerCardText(c: PersonaContent, offer: Offer, state: AnswerState) {
  const shop = shopById(c, offer.shopId);
  const ctx = {
    plural: c.active.plural,
    quantity: c.active.quantity,
    available: offer.available,
    source: shop?.source ?? ('asked' as const),
    repliedAgo: offer.repliedAgo,
    notice: shop?.notice,
    item: offer.item,
  };
  const status = answerLabel(state, ctx, 'cardStatus');
  const till = shop?.source === 'till';
  const source = till ? "from the shop's till" : offer.repliedAgo ? `replied ${offer.repliedAgo}` : undefined;
  const short = (offer.available ?? c.active.quantity) < c.active.quantity;
  return {
    shop,
    status,
    source,
    till,
    price: price(offer.price),
    walk: `${shop?.walkMinutes ?? 0} min walk`,
    collectBy: `Collect by ${offer.collectBy}`,
    // A shop with fewer than asked offers what it has: "Buy only 1" (it has one) or "Buy only 3"; the status line above
    // already says how many of how many.
    buyLabel: short ? `Buy only ${offer.available ?? 1}` : 'Buy',
    similar: state === 'similar',
  };
}

// ---------- Reveal ----------
// New chat items appear one at a time while the chat is on screen: Snuffle's bubbles after the typing
// indicator (components.md, Typing indicator), everything else at once. A debugger jump, or coming back to
// the chat, shows everything at once. Runs outside React, on the stores' changes.

let typingTimer: ReturnType<typeof setTimeout> | null = null;
let wasOpen = false;
let driving = false;

function drive() {
  if (driving) return;
  driving = true;
  try {
    for (;;) {
      const app = useAppStore.getState();
      const s = useSim.getState();
      const items = buildChat(contentFor(app.persona, app.contentSet, s.wider != null), appSlice(app), s);
      const keys = items.map((i) => i.key);
      const opened = s.chatOpen && !wasOpen;
      wasOpen = s.chatOpen;
      if (s.instant || (opened && s.revealed.length > 0)) {
        if (typingTimer) clearTimeout(typingTimer);
        typingTimer = null;
        useSim.setState({ revealed: keys, instant: false, typing: false, fresh: [] });
        return;
      }
      if (!s.chatOpen) return;
      const known = new Set(s.revealed);
      const at = items.findIndex((i) => !known.has(i.key));
      if (at < 0) {
        if (s.typing) useSim.setState({ typing: false });
        return;
      }
      const next = items[at];
      if (next.kind === 'bubble' && next.sender === 'snuffle') {
        if (!typingTimer) {
          useSim.setState({ typing: true });
          typingTimer = setTimeout(() => {
            typingTimer = null;
            const now = useSim.getState();
            useSim.setState({ revealed: [...now.revealed, next.key], fresh: [...now.fresh, next.key], typing: false });
            drive();
          }, TYPING_MS);
        }
        return;
      }
      const add: string[] = [];
      for (const item of items.slice(at)) {
        if (known.has(item.key)) continue;
        if (item.kind === 'bubble' && item.sender === 'snuffle') break;
        add.push(item.key);
      }
      useSim.setState({ revealed: [...s.revealed, ...add], fresh: [...s.fresh, ...add] });
    }
  } finally {
    driving = false;
  }
}

useAppStore.subscribe(drive);
useSim.subscribe((s, prev) => {
  if (s.clock !== prev.clock && s.revealed === prev.revealed && s.chatOpen === prev.chatOpen && s.instant === prev.instant) {
    // A clock tick alone changes nothing in the chat unless it moved the store, which the app subscription sees.
    return;
  }
  drive();
});

/** The chat items to draw now, with whether Snuffle is typing and which items are new. */
export function useVisibleChat(): { items: ChatItem[]; typing: boolean; fresh: Set<string> } {
  const items = useChat();
  const revealed = useSim((s) => s.revealed);
  const typing = useSim((s) => s.typing);
  const fresh = useSim((s) => s.fresh);
  const known = new Set(revealed);
  const cut = items.findIndex((i) => !known.has(i.key));
  return { items: cut < 0 ? items : items.slice(0, cut), typing, fresh: new Set(fresh) };
}
