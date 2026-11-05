// The prototype's simulation (openspec changes request-chat-answers and buy-and-collect): a clock that moves
// simulated shops from "Asked" to "Seen" to an answer from a script per request, the shop's reply after Buy,
// the payment sheet's outcome and the date that drives collection reminders. It writes the results into the
// main store (answers, request, order, payment), so every screen and the state debugger read one source.
// The state debugger can pause the clock, step it, and choose the payment's and the shop's outcome.
import { router } from 'expo-router';
import { Linking, Platform } from 'react-native';
import { create } from 'zustand';

import { MAX_TAGS } from './ratings';
import { contentFor, shopById } from './seed';
import { stepHooks, useAppStore } from './store';
import type { StepId } from './journey';
import type { AnswerState, Fulfilment, OrderRating, OrderState, PersonaContent, RequestState } from './types';

export type ChatStage = 'none' | 'clarify' | 'notify' | 'asking';
export type PayOutcome = 'paid' | 'declined';
export type ShopOutcome = 'confirms' | 'sold' | 'noConfirm';
/** The prototype's date: today (Mon 2 Nov), the day before the collect-by date, or after the window. */
export type SimDate = 'today' | 'dayBefore' | 'afterWindow';
export type PayStatus = 'ready' | 'processing' | 'done';

export type EndedOrder = { shopId: string; quantity: number; state: OrderState; fulfilment: Fulfilment };
export type Note = { id: string; sender: 'shopper' | 'snuffle'; text: string; chips?: { label: string; action: string }[] };

export type SimState = {
  stage: ChatStage;
  /** The shopper's own words for the active request; the seed's when the request comes from a preset. */
  askedText: string | null;
  /** The shopper's answer to "collect or delivery?". */
  how: Fulfilment | null;
  /** Seconds since the app started; only moves while `running`. */
  clock: number;
  running: boolean;
  /** Clock time Snuffle started asking shops; the script's times count from it. */
  askStart: number | null;
  /** Clock time the order last changed state; the shop's reply and delivery steps count from it. */
  orderSince: number;
  payOutcome: PayOutcome;
  shopOutcome: ShopOutcome;
  date: SimDate;
  /** Shop whose details sheet is open. */
  details: string | null;
  /** Shop the shopper is buying from (details sheet → payment sheet → order). */
  buyShopId: string | null;
  quantity: number;
  payStatus: PayStatus;
  orderShopId: string | null;
  orderQty: number;
  /** An order that ended (sold, not confirmed…) before the current one. */
  ended: EndedOrder | null;
  /** Answers the shopper said No thanks to. */
  dismissed: string[];
  codeOpen: boolean;
  /** The active request's chat is on screen: answers then don't raise a banner. */
  chatOpen: boolean;
  banner: { title: string; body: string } | null;
  /** The (simulated) notifications permission alert. */
  notifyPrompt: boolean;
  /** The shopper tapped "Extend to …" in the chat. */
  extendedInChat: boolean;
  /** The shopper's own messages and Snuffle's replies that the script doesn't cover. */
  notes: Note[];
  /** Text sent on the Ask screen that hasn't become a request (split proposal, off-script). */
  composeText: string | null;
  /** Chat items already shown; new ones appear after the typing indicator. */
  revealed: string[];
  /** Set by a debugger jump: the chat shows everything at once instead of typing it out. */
  instant: boolean;
  /** Snuffle's next bubble is on its way: the chat shows the typing indicator. */
  typing: boolean;
  /** Chat items that appeared while the chat was on screen: they animate in. */
  fresh: string[];
  /** Keep looking: how often and until when. */
  looking: { repeat: boolean } | null;
  /** The rating sheet: open or not, the answer to "Would you go back?", the tags picked and the note. */
  rating: RatingDraft;
  /** The shopper's rating, stored on the order once sent; the shop's page counts it. */
  orderRating: OrderRating | null;
};

export type RatingDraft = { open: boolean; up: boolean | null; tags: string[]; note: string };

const closedRating: RatingDraft = { open: false, up: null, tags: [], note: '' };

const TICK_S = 0.25;
const CONFIRM_AFTER_S = 6;
const DELIVERY_STEP_S = 5;
/** Delay before Snuffle's reply to the shopper's own message; the chat shows the typing indicator meanwhile. */
export const TYPING_MS = 700;

type ScriptEvent = { at: number; shop: string; state: AnswerState };

/** Sam's eclipse glasses: the first shop answers within about 10 s, the last within about 40 s. */
const samScript: ScriptEvent[] = [
  { at: 1, shop: 'broadway', state: 'inStockSome' },
  { at: 2, shop: 'paperCo', state: 'seen' },
  { at: 2.5, shop: 'bushOpticians', state: 'seen' },
  { at: 3, shop: 'olympia', state: 'seen' },
  { at: 5, shop: 'bushOpticians', state: 'doesntHave' },
  { at: 10, shop: 'paperCo', state: 'hasIt' },
  { at: 16, shop: 'olympia', state: 'similar' },
  { at: 24, shop: 'brookHardware', state: 'seen' },
  { at: 32, shop: 'brookToys', state: 'seen' },
  { at: 40, shop: 'brookHardware', state: 'noReply' },
  { at: 40, shop: 'brookToys', state: 'noReply' },
];

/** Jess's sourdough: Rossi's reads and answers. */
const jessScript: ScriptEvent[] = [
  { at: 2, shop: 'rossis', state: 'seen' },
  { at: 6, shop: 'rossis', state: 'hasIt' },
];

function scriptFor(content: PersonaContent): ScriptEvent[] {
  const base = content.id === 'sam' ? samScript : jessScript;
  const known = new Set(base.map((e) => e.shop));
  // Shops added by the "Many answers" content set read and reply on a slower, staggered beat.
  const extra = content.active.offers
    .filter((o) => !known.has(o.shopId))
    .flatMap((o, i): ScriptEvent[] => [
      { at: 6 + i, shop: o.shopId, state: 'seen' },
      { at: 18 + i * 2, shop: o.shopId, state: 'hasIt' },
    ]);
  return [...base, ...extra];
}

const YES: AnswerState[] = ['hasIt', 'hasSome', 'inStock', 'inStockSome'];
const BUYABLE: AnswerState[] = [...YES, 'similar', 'canMake'];
const WAITING: AnswerState[] = ['asked', 'seen'];

export function isYes(state: AnswerState | undefined): boolean {
  return !!state && YES.includes(state);
}
export function isBuyable(state: AnswerState | undefined): boolean {
  return !!state && BUYABLE.includes(state);
}

/** The request's state from its answers while Snuffle is asking. */
function requestFrom(content: PersonaContent, answers: Record<string, AnswerState>, current: RequestState): RequestState {
  if (current !== 'asking' && current !== 'haveIt') return current;
  const offers = content.active.offers;
  const stateOf = (id: string) => answers[id] ?? 'asked';
  const askedYes = offers.some((o) => shopById(content, o.shopId)?.source === 'asked' && isBuyable(stateOf(o.shopId)));
  const allAnswered = offers.every((o) => !WAITING.includes(stateOf(o.shopId)));
  if (askedYes) return 'haveIt';
  if (allAnswered) return offers.some((o) => isBuyable(stateOf(o.shopId))) ? 'haveIt' : 'notFound';
  return 'asking';
}

/** "pair" and "pairs" for the eclipse glasses, "loaf" and "loaves" for the sourdough. */
export function unitFor(content: PersonaContent, count: number): string {
  const units: Record<string, [string, string]> = { eclipse: ['pair', 'pairs'], sourdough: ['loaf', 'loaves'] };
  const [one, many] = units[content.active.id] ?? ['one', 'of them'];
  return count === 1 ? one : many;
}

function content(): PersonaContent {
  const s = useAppStore.getState();
  return contentFor(s.persona, s.contentSet);
}

const fresh = (): Omit<SimState, 'clock' | 'running' | 'payOutcome' | 'shopOutcome'> => ({
  stage: 'none',
  askedText: null,
  how: null,
  askStart: null,
  orderSince: 0,
  date: 'today',
  details: null,
  buyShopId: null,
  quantity: 0,
  payStatus: 'ready',
  orderShopId: null,
  orderQty: 0,
  ended: null,
  dismissed: [],
  codeOpen: false,
  chatOpen: false,
  banner: null,
  notifyPrompt: false,
  extendedInChat: false,
  notes: [],
  composeText: null,
  revealed: [],
  instant: true,
  typing: false,
  fresh: [],
  looking: null,
  rating: closedRating,
  orderRating: null,
});

export const useSim = create<SimState>()(() => ({
  ...fresh(),
  clock: 0,
  running: true,
  payOutcome: 'paid',
  shopOutcome: 'confirms',
}));

const setSim = (patch: Partial<SimState>) => useSim.setState(patch);

// ---------- Journey steps ----------

const DONE = 1000;

/** The simulation's part of each journey step; the main store's part is the step's preset (journey.ts). */
function setupFor(step: StepId): Partial<SimState> {
  const { clock } = useSim.getState();
  const c = content();
  const asking = { stage: 'asking' as const, how: 'collect' as const, askStart: clock - DONE };
  const order = { orderShopId: c.order.shopId, orderQty: c.active.quantity, quantity: c.active.quantity, orderSince: clock };
  switch (step) {
    case 'home':
    case 'shopPage':
    case 'shopNew':
    case 'shopFew':
    case 'reviews':
    case 'ask':
      return {};
    case 'split':
      return { composeText: 'Eclipse glasses for today, and a birthday cake for Saturday' };
    case 'confirm':
      return { stage: 'notify', how: 'collect', notifyPrompt: true };
    case 'asking':
      return { ...asking, askStart: clock - 6 };
    case 'away':
      return { ...asking, askStart: clock - 11 };
    case 'answers':
      return { ...asking, askStart: clock - 17 };
    case 'details':
      return { ...asking, details: c.order.shopId, buyShopId: c.order.shopId, quantity: c.active.quantity };
    case 'applePay':
    case 'declined':
      return { ...asking, buyShopId: c.order.shopId, quantity: c.active.quantity };
    case 'afterWork':
      return { ...asking, details: c.order.shopId, buyShopId: c.order.shopId, quantity: c.active.quantity };
    case 'code':
      return { ...asking, ...order, codeOpen: true };
    case 'dayBefore':
      return { ...asking, ...order, date: 'dayBefore' };
    case 'notCollected':
      return { ...asking, ...order, date: 'afterWindow' };
    case 'keepLooking':
      return { ...asking, looking: null };
    case 'collected':
      return { ...asking, ...order };
    case 'rate':
      return { ...asking, ...order, rating: { ...closedRating, open: true } };
    case 'rateDown':
      return { ...asking, ...order, rating: { open: true, up: false, tags: ['Not ready when I came'], note: '' } };
    case 'rated':
      return { ...asking, ...order, orderRating: { shopId: c.order.shopId, up: true, tags: ['Had it as promised', 'Friendly'], note: '' } };
    case 'waiting':
    case 'sold':
    case 'notConfirmed':
    case 'delivers':
    case 'receipt':
      return { ...asking, ...order };
    default:
      return asking;
  }
}

function applyStep(step: StepId) {
  const s = useSim.getState();
  setSim({ ...fresh(), clock: s.clock, ...setupFor(step) });
}

stepHooks.push(applyStep);
// A link like `?step=answers` sets the main store before this module loads.
applyStep(useAppStore.getState().step);

// A new persona or content set starts the simulation over.
useAppStore.subscribe((s, prev) => {
  if (s.persona !== prev.persona || s.contentSet !== prev.contentSet) {
    if (s.step === prev.step) setSim({ ...fresh(), clock: useSim.getState().clock });
  }
  // Any change of the order (from the clock, a button or the debugger) restarts the shop's timer.
  if (s.order !== prev.order) setSim({ orderSince: useSim.getState().clock });
});

// ---------- Clock ----------

function advance(seconds: number) {
  let left = seconds;
  while (left > 0) {
    const dt = Math.min(TICK_S, left);
    tick(dt);
    left -= dt;
  }
}

function tick(dt: number) {
  const sim = useSim.getState();
  const prev = sim.clock;
  const now = prev + dt;
  setSim({ clock: now });
  const app = useAppStore.getState();
  const c = content();

  // Shops answer.
  if (sim.stage === 'asking' && sim.askStart != null && (app.request === 'asking' || app.request === 'haveIt')) {
    const due = scriptFor(c).filter((e) => sim.askStart! + e.at > prev && sim.askStart! + e.at <= now);
    if (due.length > 0) {
      const answers = { ...app.answers };
      for (const e of due) answers[e.shop] = e.state;
      const hadYes = c.active.offers.some((o) => isYes(app.answers[o.shopId]));
      app.set({ answers, request: requestFrom(c, answers, app.request) });
      const news = due.find((e) => isBuyable(e.state) && shopById(c, e.shop)?.source === 'asked');
      if (news && !sim.chatOpen && app.notificationsAllowed) {
        const shop = shopById(c, news.shop);
        const offer = c.active.offers.find((o) => o.shopId === news.shop);
        if (shop && offer) {
          const them = c.active.plural ? 'them' : 'it';
          const body =
            news.state === 'similar'
              ? `${shop.name} on ${shop.street} has something similar: ${offer.item ?? 'have a look'}.`
              : `${shop.name} on ${shop.street} has ${them}${hadYes ? ' too' : ''}: ${formatPrice(offer.price)} a ${unitFor(c, 1)}.`;
          setSim({ banner: { title: c.active.title, body } });
        }
      }
    }
  }

  // The shop replies after Buy, and a shop that delivers sends its updates.
  const since = now - sim.orderSince;
  const shopName = shopById(c, sim.orderShopId ?? c.order.shopId)?.name ?? '';
  if (app.order === 'waiting' && since >= CONFIRM_AFTER_S) {
    const confirmed: OrderState = app.fulfilment === 'delivery' ? 'paid' : 'ready';
    const next: OrderState = sim.shopOutcome === 'sold' ? 'sold' : sim.shopOutcome === 'noConfirm' ? 'notConfirmed' : confirmed;
    app.set({ order: next });
    if (next === 'ready' && !sim.chatOpen && app.notificationsAllowed) {
      setSim({ banner: { title: c.active.title, body: `${shopName} has set ${c.active.plural ? 'them' : 'it'} aside. Your collection code is on the receipt.` } });
    }
  } else if (app.order === 'paid' && since >= DELIVERY_STEP_S) {
    app.set({ order: 'onItsWay' });
  } else if (app.order === 'onItsWay' && since >= DELIVERY_STEP_S) {
    app.set({ order: 'delivered' });
  }
}

setInterval(() => {
  if (useSim.getState().running) tick(TICK_S);
}, TICK_S * 1000);

function formatPrice(amount: number): string {
  return `£${amount.toFixed(2).replace(/\.00$/, '')}`;
}

// ---------- What the shopper does ----------

export type AskMatch = 'active' | 'split' | 'offScript';

/** Which scripted request a typed message is. The prototype knows Sam's glasses (and the split) and Jess's sourdough. */
export function matchAsk(text: string): AskMatch {
  const t = text.toLowerCase();
  const glasses = /eclipse|glasses|solar/.test(t);
  const cake = /cake/.test(t);
  if (glasses && cake) return 'split';
  const persona = useAppStore.getState().persona;
  if (persona === 'sam' && glasses) return 'active';
  if (persona === 'jess' && /sourdough|bread|loaf/.test(t)) return 'active';
  return 'offScript';
}

/** The scripted requests offered when the shopper types something else. */
export function scriptedAsks(): string[] {
  return useAppStore.getState().persona === 'sam'
    ? ['Eclipse glasses, 2 pairs, before 4pm', 'Eclipse glasses for today, and a birthday cake for Saturday']
    : ["Sourdough from Rossi's, but I finish work at 6"];
}

export const OFF_SCRIPT_REPLY = "This prototype only knows a few requests, so I can't ask the shops about that one. Try one of these.";

let timers: ReturnType<typeof setTimeout>[] = [];
function later(ms: number, run: () => void) {
  timers.push(setTimeout(run, ms));
}
function clearLater() {
  for (const t of timers) clearTimeout(t);
  timers = [];
}

export const sim = {
  /** Ask screen: start the active request with the shopper's words and open its chat. */
  startRequest(text: string) {
    clearLater();
    const c = content();
    const app = useAppStore.getState();
    const asksHow = app.persona === 'sam';
    app.set({ request: 'asking', answers: {}, order: 'none', payment: 'idle', keepLookingForMore: false, draft: null });
    setSim({
      ...fresh(),
      clock: useSim.getState().clock,
      instant: false,
      askedText: text,
      stage: asksHow ? 'clarify' : 'asking',
      how: asksHow ? null : 'collect',
      askStart: asksHow ? null : useSim.getState().clock + 1,
    });
    router.replace({ pathname: '/requests/[id]', params: { id: c.active.id } });
  },
  /** Ask screen: text that isn't a request yet (the split proposal, or something off-script). */
  compose(text: string | null) {
    setSim({ composeText: text });
  },
  /** Clarify chips: Collect, or Check delivery too. */
  chooseHow(how: Fulfilment) {
    setSim({ how, stage: 'notify', instant: false });
    later(TYPING_MS * 2 + 400, () => setSim({ notifyPrompt: true }));
  },
  answerNotifications(allow: boolean) {
    useAppStore.getState().set({ notificationsAllowed: allow });
    setSim({ notifyPrompt: false, stage: 'asking', askStart: useSim.getState().clock + 1 });
  },
  openDetails(shopId: string) {
    const c = content();
    const offer = c.active.offers.find((o) => o.shopId === shopId);
    const qty = Math.min(c.active.quantity, offer?.available ?? c.active.quantity);
    setSim({ details: shopId, buyShopId: shopId, quantity: qty });
  },
  closeDetails() {
    setSim({ details: null });
  },
  setQuantity(quantity: number) {
    setSim({ quantity });
  },
  /** Buy in the details sheet: the payment sheet opens. */
  buy() {
    setSim({ details: null, payStatus: 'ready' });
    useAppStore.getState().set({ payment: 'sheet' });
  },
  confirmPayment() {
    setSim({ payStatus: 'processing' });
    later(1100, () => {
      if (useSim.getState().payOutcome === 'declined') {
        setSim({ payStatus: 'ready' });
        useAppStore.getState().set({ payment: 'declined' });
        return;
      }
      setSim({ payStatus: 'done' });
      later(600, placeOrder);
    });
  },
  cancelPayment() {
    useAppStore.getState().set({ payment: 'idle' });
  },
  tryAgain() {
    setSim({ payStatus: 'ready' });
    useAppStore.getState().set({ payment: 'sheet' });
  },
  dismiss(shopId: string) {
    setSim({ dismissed: [...useSim.getState().dismissed, shopId] });
  },
  undoDismiss(shopId: string) {
    setSim({ dismissed: useSim.getState().dismissed.filter((id) => id !== shopId) });
  },
  extend() {
    setSim({ extendedInChat: true });
    useAppStore.getState().set({ order: 'extended' });
  },
  cancelOrder() {
    useAppStore.getState().set({ order: 'cancelled' });
  },
  keepLooking(repeat: boolean) {
    setSim({ looking: { repeat }, instant: false });
    useAppStore.getState().set({ request: 'looking' });
  },
  /** Free text in a chat: the shopper's bubble, then Snuffle's reply after the typing indicator. */
  say(text: string, reply?: Note) {
    const notes = useSim.getState().notes;
    const id = `n${notes.length}`;
    setSim({ notes: [...notes, { id, sender: 'shopper', text }], instant: false });
    const answer = reply ?? {
      id: `${id}r`,
      sender: 'snuffle' as const,
      text: OFF_SCRIPT_REPLY,
      chips: scriptedAsks().map((label) => ({ label, action: `ask:${label}` })),
    };
    setSim({ notes: [...useSim.getState().notes, { ...answer, id: `${id}r` }] });
  },
  setChatOpen(open: boolean) {
    setSim({ chatOpen: open, ...(open ? { banner: null } : null) });
  },
  hideBanner() {
    setSim({ banner: null });
  },
  setCodeOpen(open: boolean) {
    setSim({ codeOpen: open });
  },
  /** Rate on the order card or the chip after delivery: the rating sheet opens, empty. */
  openRating() {
    setSim({ rating: { ...closedRating, open: true } });
  },
  closeRating() {
    setSim({ rating: { ...useSim.getState().rating, open: false } });
  },
  /** Thumbs up or down; the tags follow the answer, so the ones picked for the other answer are cleared. */
  rateAnswer(up: boolean) {
    const r = useSim.getState().rating;
    setSim({ rating: { ...r, up, tags: r.up === up ? r.tags : [] } });
  },
  toggleRatingTag(tag: string) {
    const r = useSim.getState().rating;
    // Up to three tags (decision 047): a fourth is ignored until one is cleared.
    if (!r.tags.includes(tag) && r.tags.length >= MAX_TAGS) return;
    setSim({ rating: { ...r, tags: r.tags.includes(tag) ? r.tags.filter((t) => t !== tag) : [...r.tags, tag] } });
  },
  setRatingNote(note: string) {
    setSim({ rating: { ...useSim.getState().rating, note } });
  },
  /** Send: the rating is stored on the order and the shop's page counts it. */
  sendRating() {
    const s = useSim.getState();
    if (s.rating.up == null) return;
    const shopId = s.orderShopId ?? content().order.shopId;
    setSim({
      orderRating: { shopId, up: s.rating.up, tags: s.rating.tags, note: s.rating.note.trim() },
      rating: { ...s.rating, open: false },
      instant: false,
    });
  },
  // Debugger
  setRunning(running: boolean) {
    setSim({ running });
  },
  step(seconds = 5) {
    advance(seconds);
  },
  setPayOutcome(payOutcome: PayOutcome) {
    setSim({ payOutcome });
  },
  setShopOutcome(shopOutcome: ShopOutcome) {
    setSim({ shopOutcome });
  },
  setDate(date: SimDate) {
    setSim({ date, instant: false });
    const app = useAppStore.getState();
    if (date === 'afterWindow' && (app.order === 'ready' || app.order === 'extended')) app.set({ order: 'notCollected' });
  },
};

function placeOrder() {
  const s = useSim.getState();
  const app = useAppStore.getState();
  const c = content();
  const shopId = s.buyShopId ?? c.order.shopId;
  const shop = shopById(c, shopId);
  const endedStates: OrderState[] = ['sold', 'notConfirmed', 'cancelled', 'notCollected'];
  const ended =
    app.order !== 'none' && endedStates.includes(app.order)
      ? { shopId: s.orderShopId ?? c.order.shopId, quantity: s.orderQty || c.active.quantity, state: app.order, fulfilment: app.fulfilment }
      : s.ended;
  // A till answer is a sale at once; an asked shop has to confirm first (decision 037).
  const till = shop?.source === 'till';
  const order: OrderState = till ? (app.fulfilment === 'delivery' ? 'paid' : 'ready') : 'waiting';
  setSim({ ended, orderShopId: shopId, orderQty: s.quantity, payStatus: 'ready', instant: false });
  app.set({ payment: 'idle', order, keepLookingForMore: s.quantity < c.active.quantity });
}

/** Opens the active request's chat (the banner, the lock screen). */
export function openActiveChat() {
  const c = content();
  router.navigate({ pathname: '/requests/[id]', params: { id: c.active.id } });
}

/** Directions opens the system maps app on a phone (components.md, Map). Returns false on the web build. */
export function openDirections(shop: { name: string; street: string }): boolean {
  if (Platform.OS === 'web') return false;
  const query = encodeURIComponent(`${shop.name}, ${shop.street}, London`);
  const url = Platform.OS === 'ios' ? `https://maps.apple.com/?daddr=${query}` : `geo:0,0?q=${query}`;
  Linking.openURL(url).catch(() => undefined);
  return true;
}
