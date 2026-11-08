// The chats of the requests that aren't the active one (Birthday cake, Sourdough, Picture hooks, Desk fan, Flowers
// for tonight). Each one is a full conversation built the same way as the active chat (chat.ts): the shopper's ask,
// Snuffle's confirmation, the asking list, answer and order cards, then the one next action its state allows
// (conceptual-model.md, state table). The scripts below are the seed for those conversations; what the shopper does
// afterwards (Buy, Change, Stop, Keep looking, Ask further away, Rate, a typed reply) lives in a small store per
// request, so each chat keeps what happened in it.
import { create } from 'zustand';

import type { ChatItem, OrderView } from './chat';
import { LOOK_DAY, answerLabel, lookUntil, price } from './labels';
import { OFF_SCRIPT_REPLY, scriptedAsks, type Note } from './simulation';
import { shopById } from './seed';
import type { AnswerState, OrderState, PersonaContent } from './types';

type Row = Extract<ChatItem, { kind: 'rows' }>['rows'][number];
type RowState = 'asked' | 'yes' | 'no' | 'noReply';

type AskedShop = { shopId: string; state: RowState | 'canMake'; label?: string };

type Script = {
  /** The shopper's words and Snuffle's confirmation. */
  ask: string;
  confirm: string;
  /** Shops asked first, as the asking list shows them, and the shops asked after "Ask further away". */
  asked: AskedShop[];
  wider?: AskedShop[];
  /** How the request stands. */
  end: 'needsYou' | 'standing' | 'collected' | 'notFound' | 'looking';
  /** Single-item requests read "it", lists "them". */
  it: string;
};

const SCRIPTS: Record<string, Script> = {
  'sam:cake': {
    ask: 'A birthday cake for 12, for Saturday',
    confirm: "Got it: a birthday cake for 12, collected by Saturday. Cakes need notice, so I'll ask the bakeries that take orders.",
    asked: [
      { shopId: 'rossis', state: 'canMake' },
      { shopId: 'sugarSpoon', state: 'no' },
      { shopId: 'brookGreenBread', state: 'noReply' },
    ],
    end: 'needsYou',
    it: 'it',
  },
  'sam:sourdough': {
    ask: "Sourdough from Rossi's every Friday",
    confirm: "Got it: one sourdough loaf from Rossi's, every Friday, collected after work.",
    asked: [{ shopId: 'rossis', state: 'yes' }],
    end: 'standing',
    it: 'it',
  },
  'sam:hooks': {
    ask: 'Picture hooks, a pack of 10',
    confirm: "Got it: a pack of picture hooks you can collect after work. I'll ask the hardware shops near you.",
    asked: [
      { shopId: 'brookHardware', state: 'yes' },
      { shopId: 'paintDiy', state: 'no' },
      { shopId: 'corner', state: 'noReply' },
    ],
    end: 'collected',
    it: 'it',
  },
  'sam:fan': {
    ask: 'A desk fan',
    confirm: "Got it: a desk fan you can collect. I'll ask the shops most likely to have one.",
    asked: [
      { shopId: 'brookHardware', state: 'no' },
      { shopId: 'paintDiy', state: 'no' },
      { shopId: 'olympia', state: 'no' },
      { shopId: 'corner', state: 'noReply' },
    ],
    wider: [
      { shopId: 'hollandCameras', state: 'no' },
      { shopId: 'hollandStationers', state: 'no' },
    ],
    end: 'notFound',
    it: 'one',
  },
  'jess:fan': {
    ask: 'A desk fan for work',
    confirm: "Got it: a desk fan you can collect near work. I'll ask the shops most likely to have one.",
    asked: [
      { shopId: 'brookHardware', state: 'no' },
      { shopId: 'paintDiy', state: 'no' },
      { shopId: 'corner', state: 'noReply' },
    ],
    end: 'looking',
    it: 'one',
  },
  'jess:flowers': {
    ask: 'Flowers for tonight',
    confirm: "Got it: flowers you can collect after work. I'll ask the florists near you.",
    asked: [
      { shopId: 'halo', state: 'yes' },
      { shopId: 'wildStem', state: 'no' },
    ],
    end: 'collected',
    it: 'them',
  },
};

// ---------- What the shopper did in a chat ----------

export type Thread = {
  notes: Note[];
  /** Cake: Buy tapped, the order is waiting for the shop. */
  bought: boolean;
  /** Desk fan: Ask further away tapped. */
  widened: boolean;
  /** How a running search asks; undefined until Keep looking or Change, then the script's own. */
  looking?: { repeat: boolean };
  /** Keep looking was tapped in this chat (a one-off search starting now). */
  keeping: boolean;
  stopped: boolean;
  /** Collected orders: undefined until rated, then the thumb. */
  rated?: boolean;
};

const EMPTY: Thread = { notes: [], bought: false, widened: false, keeping: false, stopped: false };

type Store = {
  threads: Record<string, Thread>;
  patch: (key: string, change: Partial<Thread> | ((t: Thread) => Partial<Thread>)) => void;
};

export const useOtherThreads = create<Store>((set) => ({
  threads: {},
  patch: (key, change) =>
    set((s) => {
      const now = s.threads[key] ?? EMPTY;
      return { threads: { ...s.threads, [key]: { ...now, ...(typeof change === 'function' ? change(now) : change) } } };
    }),
}));

const noteId = (t: Thread) => `o${t.notes.length}`;

/** The things the shopper can do in another request's chat. */
export const otherActions = {
  /** Free text: the shopper's bubble, then Snuffle's off-script answer with the scripted asks as chips. */
  say(key: string, text: string) {
    useOtherThreads.getState().patch(key, (t) => {
      const id = noteId(t);
      return {
        notes: [
          ...t.notes,
          { id, sender: 'shopper', text },
          { id: `${id}r`, sender: 'snuffle', text: OFF_SCRIPT_REPLY, chips: scriptedAsks().map((label) => ({ label, action: `ask:${label}` })) },
        ],
      };
    });
  },
  /** A chip's reply, with Snuffle's own line. */
  reply(key: string, text: string, answer: string) {
    useOtherThreads.getState().patch(key, (t) => {
      const id = noteId(t);
      return { notes: [...t.notes, { id, sender: 'shopper', text }, { id: `${id}r`, sender: 'snuffle', text: answer }] };
    });
  },
  buy(key: string) {
    useOtherThreads.getState().patch(key, { bought: true });
  },
  askFurther(key: string) {
    useOtherThreads.getState().patch(key, { widened: true });
  },
  keepLooking(key: string, repeat = false) {
    useOtherThreads.getState().patch(key, { keeping: true, looking: { repeat }, stopped: false });
  },
  /** Change in the chat's chips: how often the search asks. */
  change(key: string, repeat: boolean) {
    useOtherThreads.getState().patch(key, (t) => {
      const id = noteId(t);
      const day = LOOK_DAY;
      return {
        looking: { repeat },
        notes: [
          ...t.notes,
          { id, sender: 'shopper', text: repeat ? 'Ask every week' : 'Ask once' },
          {
            id: `${id}r`,
            sender: 'snuffle',
            text: repeat
              ? `Done. I'll ask every ${day} until ${lookUntil(true)} and tell you what they say.`
              : `Done. I'll ask until ${lookUntil(false)} and tell you what they say.`,
          },
        ],
      };
    });
  },
  stop(key: string, standing: boolean) {
    useOtherThreads.getState().patch(key, (t) => {
      const id = noteId(t);
      return {
        stopped: true,
        notes: [
          ...t.notes,
          { id, sender: 'shopper', text: 'Stop' },
          { id: `${id}r`, sender: 'snuffle', text: standing ? "Done. I won't ask again, and nothing was bought." : "Done. I've stopped looking, and nothing was bought." },
        ],
      };
    });
  },
  rate(key: string, up: boolean) {
    useOtherThreads.getState().patch(key, { rated: up });
  },
};

export const otherKey = (persona: string, id: string) => `${persona}:${id}`;

/** The thread a chat shows now: the script's own state plus what the shopper did. */
export function useOtherThread(key: string): Thread {
  return useOtherThreads((s) => s.threads[key]) ?? EMPTY;
}

// ---------- The conversation ----------

const rowState = (s: RowState | 'canMake'): { state: AnswerState; kind: Row['kind'] } => {
  switch (s) {
    case 'canMake':
      return { state: 'canMake', kind: 'yes' };
    case 'yes':
      return { state: 'hasIt', kind: 'yes' };
    case 'no':
      return { state: 'doesntHave', kind: 'no' };
    case 'noReply':
      return { state: 'noReply', kind: 'no' };
    default:
      return { state: 'asked', kind: 'asked' };
  }
};

function rows(c: PersonaContent, list: AskedShop[], plural: boolean, quantity: number): Row[] {
  return list.map((a) => {
    const shop = shopById(c, a.shopId);
    const { state, kind } = rowState(a.state);
    return {
      shopId: a.shopId,
      shop: shop?.name ?? a.shopId,
      street: shop?.street ?? '',
      status: answerLabel(state, { plural, quantity, source: shop?.source ?? 'asked', notice: shop?.notice }, 'row'),
      kind,
    };
  });
}

const streetsOf = (c: PersonaContent, list: AskedShop[]) => new Set(list.map((a) => shopById(c, a.shopId)?.street)).size;

const ORDER_BASE = { street: '', openUntil: '', walk: '', fulfilment: 'collect', extendedTo: '', till: false, payName: 'Apple Pay', code: '', rated: false, canRate: false } as const;

function order(c: PersonaContent, o: { shopId: string; items: string; total: number; state: OrderState; label: string; tone: OrderView['tone']; collectBy: string; steps?: OrderView['steps']; rated?: boolean; canRate?: boolean }): OrderView {
  const shop = shopById(c, o.shopId);
  return {
    ...ORDER_BASE,
    shopId: o.shopId,
    shop: shop?.name ?? '',
    street: shop?.street ?? '',
    openUntil: shop?.openUntil ?? '',
    walk: `${shop?.walkMinutes ?? 0} min walk`,
    quantity: 1,
    items: o.items,
    total: price(o.total),
    state: o.state,
    label: o.label,
    tone: o.tone,
    collectBy: o.collectBy,
    steps: o.steps,
    card: c.card,
    rated: o.rated ?? false,
    canRate: o.canRate ?? false,
  };
}

/** The chat of a request that isn't the active one. */
export function buildOtherChat(c: PersonaContent, id: string, t: Thread): ChatItem[] {
  const key = otherKey(c.id, id);
  const script = SCRIPTS[key];
  const request = c.others.find((r) => r.id === id);
  if (!script || !request) return [];
  const items: ChatItem[] = [];
  const snuffle = (k: string, text: string, day?: string) => items.push({ kind: 'bubble', key: k, sender: 'snuffle', text, day });
  const shopper = (k: string, text: string) => items.push({ kind: 'bubble', key: k, sender: 'shopper', text });
  const chips = (k: string, list: { label: string; action: string }[]) => items.push({ kind: 'chips', key: k, chips: list });
  const it = script.it;
  const plural = script.it === 'them';

  shopper('asked', script.ask);
  snuffle('confirm', script.confirm);
  const count = script.asked.length;
  snuffle(
    'asking',
    count === 1
      ? `I'm asking ${shopById(c, script.asked[0].shopId)?.name ?? 'the shop'}. You can leave the app; I'll tell you when they answer.`
      : `I'm asking ${count} shops on ${streetsOf(c, script.asked)} ${streetsOf(c, script.asked) === 1 ? 'street' : 'streets'} near you. You can leave the app; I'll tell you as they answer.`,
  );
  items.push({ kind: 'rows', key: 'rows', rows: rows(c, script.asked, plural, 1) });

  switch (script.end) {
    case 'needsYou': {
      const rossis = shopById(c, 'rossis');
      snuffle('answer', "Rossi's can make it by Saturday. Want it?");
      if (!t.bought) {
        items.push({
          kind: 'offer',
          key: 'offer',
          shopId: 'rossis',
          shop: rossis?.name ?? "Rossi's Bakery",
          status: answerLabel('canMake', { plural: false, quantity: 1, source: 'asked', notice: rossis?.notice ?? "2 days' notice" }, 'cardStatus'),
          source: 'replied 4 min ago',
          price: price(32),
          walk: `${rossis?.walkMinutes ?? 0} min walk`,
          collectBy: 'Collect by Sat 7 Nov',
          buyLabel: `Buy for ${price(32)}`,
        });
        snuffle('deadline', "Rossi's holds the slot until Thursday, so buy by Thu 5 Nov. Nothing is charged until they confirm.");
        items.push({ kind: 'status', key: 'status', label: request.label, tone: 'needsYou' });
      } else {
        shopper('buy', "Buy at Rossi's");
        snuffle('waiting', "Rossi's is setting it aside. You're only charged when they confirm.");
        items.push({
          kind: 'order',
          key: 'order',
          order: order(c, {
            shopId: 'rossis',
            items: '1 × birthday cake for 12',
            total: 32,
            state: 'waiting',
            label: "Waiting for Rossi's Bakery · not charged yet",
            tone: 'default',
            collectBy: 'Sat 7 Nov',
            steps: [
              { title: 'Bought with Apple Pay', detail: '11:09am', state: 'done' },
              { title: "Rossi's Bakery sets it aside", detail: "Charged when Rossi's Bakery confirms", state: 'current' },
              { title: 'Ready · collect by Sat 7 Nov', detail: 'Collection code pinned at the top', state: 'todo' },
            ],
          }),
        });
      }
      break;
    }
    case 'standing':
    case 'looking':
    case 'notFound':
    case 'collected':
      break;
  }

  if (script.end === 'standing') {
    const rossisName = shopById(c, 'rossis')?.name ?? "Rossi's";
    snuffle('standing', `I'll ask ${rossisName} again every week, on ${LOOK_DAY}s, until ${lookUntil(true)}, and tell you what they say.`);
    snuffle('lastWeek', `You collected last Friday's loaf at ${rossisName}.`, 'Fri 30 Oct');
    items.push({
      kind: 'order',
      key: 'lastOrder',
      order: order(c, { shopId: 'rossis', items: '1 × sourdough loaf', total: 4.2, state: 'collected', label: 'Collected · rated', tone: 'success', collectBy: 'Fri 30 Oct', rated: true }),
    });
    snuffle('thisWeek', `Next Friday's loaf is set aside. Collect by Fri 6 Nov, ${shopById(c, 'rossis')?.openUntil ?? '6pm'}.`);
    items.push({
      kind: 'order',
      key: 'thisOrder',
      order: order(c, { shopId: 'rossis', items: '1 × sourdough loaf', total: 4.2, state: 'ready', label: 'Ready · collect by Fri 6 Nov', tone: 'success', collectBy: 'Fri 6 Nov' }),
    });
  }

  if (script.end === 'collected') {
    const buyer = script.asked[0].shopId;
    const shop = shopById(c, buyer);
    const name = shop?.name ?? '';
    const isHooks = id === 'hooks';
    const thing = isHooks ? 'picture hooks' : 'flowers';
    snuffle('has', `${name} has ${plural ? 'them' : 'it'}.`);
    shopper('buy', `Buy 1 at ${name}`);
    snuffle('waiting', `${name} is setting ${plural ? 'them' : 'it'} aside. You're only charged when they confirm.`);
    snuffle('ready', `${name} has set ${plural ? 'them' : 'it'} aside, so you've paid ${price(isHooks ? 2.49 : 35)}. Your collection code is pinned at the top.`);
    const rated = t.rated != null;
    items.push({
      kind: 'order',
      key: 'order',
      order: order(c, {
        shopId: buyer,
        items: isHooks ? '1 × picture hooks, pack of 10' : `1 × ${thing === 'flowers' ? 'seasonal bouquet' : thing}`,
        total: isHooks ? 2.49 : 35,
        state: 'collected',
        label: rated ? 'Collected · rated' : `Collected · rate ${name}`,
        tone: 'success',
        collectBy: isHooks ? 'Mon 12 Oct' : 'Tue 27 Oct',
        rated,
        canRate: !rated,
      }),
    });
    if (rated) snuffle('thanks', `Thanks for rating ${name}.`);
    else {
      snuffle('howWas', `How was ${name}?`);
      chips('rateChips', [{ label: 'Rate', action: 'rate' }]);
    }
  }

  if (script.end === 'notFound' || script.end === 'looking') {
    const no = script.asked.filter((a) => a.state === 'no').length;
    const silent = script.asked.length - no;
    snuffle('notFound', `None of the ${count} shops has ${it}: ${no} said no and ${silent} didn't reply.`);
    const keeping = t.keeping || script.end === 'looking';
    if (!keeping && !t.widened) {
      snuffle('notFound2', `I can ask shops up to 30 minutes away, or keep looking and tell you when one near you has ${it}.`);
      chips('notFoundChips', [
        { label: 'Ask further away', action: 'askFurther' },
        { label: 'Keep looking', action: 'keepLooking' },
      ]);
    }
    if (t.widened && script.wider) {
      shopper('wider', 'Ask further away');
      snuffle('widerAsk', `I'm asking ${script.wider.length === 2 ? 'two' : script.wider.length} more shops, up to 30 minutes away. I'll tell you as they answer.`);
      items.push({ kind: 'rows', key: 'widerRows', rows: rows(c, script.wider, false, 1) });
      snuffle('widerNone', `None of the ${script.wider.length} shops further away has ${it} either. I can keep looking and tell you when one has ${it}.`);
      if (!keeping) chips('widerChips', [{ label: 'Keep looking', action: 'keepLooking' }]);
    }
    if (keeping && script.end === 'notFound') {
      shopper('keeping', 'Keep looking');
      snuffle('keepingReply', `I'll keep looking until ${lookUntil(false)} and message you when a shop near you has ${it}. Nothing is bought until you tap Buy.`);
    }
  }

  // Notes the shopper added in this chat come before the running search's controls.
  for (const note of t.notes) {
    items.push({ kind: 'bubble', key: note.id, sender: note.sender, text: note.text });
    if (note.chips) chips(`${note.id}chips`, note.chips);
  }

  const running = !t.stopped && (script.end === 'standing' || script.end === 'looking' || t.keeping);
  if (running) {
    const repeat = t.looking?.repeat ?? script.end === 'standing';
    items.push({
      kind: 'status',
      key: 'lookingStatus',
      label: repeat ? `Every ${LOOK_DAY}` : `Looking · until ${lookUntil(false)}`,
      tone: 'quiet',
    });
    chips('lookingChips', [
      { label: 'Change', action: 'changeLooking' },
      { label: 'Stop', action: 'stopLooking' },
    ]);
  }
  return items;
}

/** Whether a search in this request is a standing one (it came with the ask: "every Friday"). */
export const isStanding = (key: string) => SCRIPTS[key]?.end === 'standing';
export const hasScript = (key: string) => key in SCRIPTS;
export const looksRepeating = (key: string, t: Thread) => t.looking?.repeat ?? SCRIPTS[key]?.end === 'standing';
