// Types of the mock store. The state names follow the state table in
// docs/develop/design-system/conceptual-model.md; the words shown for each live in labels.ts.
import type { ImageKey } from '@/content/images';

export type Persona = 'sam' | 'jess';
export type PlatformName = 'ios' | 'android';
export type Scheme = 'light' | 'dark' | 'system';

/** default: the v7 content. empty: no requests and few shops. longNames: long shop and item names. manyAnswers: twelve shops asked. */
export type ContentSet = 'default' | 'empty' | 'longNames' | 'manyAnswers';

/** A request's state. `none` means the shopper hasn't asked yet (Nearby, Ask). */
export type RequestState = 'none' | 'asking' | 'haveIt' | 'needsYou' | 'looking' | 'repeat' | 'notFound' | 'closed';

/** An answer's state: asked shops go Asked → Seen → a reply; connected shops answer from the till at once. */
export type AnswerState =
  | 'asked'
  | 'seen'
  | 'hasIt'
  | 'hasSome'
  | 'similar'
  | 'doesntHave'
  | 'noReply'
  | 'inStock'
  | 'inStockSome'
  | 'canMake';

/** An order's state. Collect and delivery have their own sequences; `none` means no order yet. */
export type OrderState =
  | 'none'
  | 'waiting'
  | 'ready'
  | 'extended'
  | 'collected'
  | 'notConfirmed'
  | 'sold'
  | 'cancelled'
  | 'notCollected'
  | 'paid'
  | 'onItsWay'
  | 'delivered';

export type Fulfilment = 'collect' | 'delivery';

/** The payment sheet: closed, open, or declined (a declined payment creates no order). */
export type PaymentState = 'idle' | 'sheet' | 'declined';

/** Shop opening state, applied to every shop in the content: "Open till 7pm", "Closes soon", "Closed · opens 9am". */
export type ShopHours = 'open' | 'closesSoon' | 'closed';

export type AnswerSource = 'till' | 'asked';

export type Shop = {
  id: string;
  name: string;
  street: string;
  walkMinutes: number;
  openUntil: string;
  opensAt: string;
  image: ImageKey;
  promoted?: boolean;
  isNew?: boolean;
  delivers?: { fee: number; by: string };
  /** "2 days' notice" for made-to-order shops. */
  notice?: string;
  /** Answers from its till (connected shop) or by reply (asked shop). */
  source: AnswerSource;
  /** What the shop page shows under "Asked about recently". */
  history?: { item: string; had: boolean; when: string }[];
};

/** What one shop offers for the active request, whatever its current state. */
export type Offer = {
  shopId: string;
  /** Item name when it differs from the request ("Solar viewer cards"). */
  item?: string;
  price: number;
  /** How many the shop has when it has some. */
  available?: number;
  collectBy: string;
  repliedAgo?: string;
};

export type Request = {
  id: string;
  title: string;
  /** The shopper's words when asking. */
  asked: string;
  quantity: number;
  /** Singular items read "has it", plural "has them". */
  plural: boolean;
  deadline?: string;
  area: string;
  image: ImageKey;
  /** Shops asked, in the order the asking list shows them. */
  offers: Offer[];
};

/** A request in the Requests list that isn't the active one: fixed label and preview. */
export type OtherRequest = {
  id: string;
  title: string;
  when: string;
  preview: string;
  state: RequestState | 'collected';
  label: string;
  action?: string;
  image: ImageKey;
};

export type PersonaContent = {
  id: Persona;
  name: string;
  area: string;
  streets: string;
  greeting: string;
  /** Up to three suggestion chips above the ask bar on Nearby. */
  suggestions: string[];
  card: string;
  shops: Shop[];
  active: Request;
  others: OtherRequest[];
  /** Order details for the active request. */
  order: {
    shopId: string;
    total: number;
    deliveryTotal?: number;
    collectBy: string;
    extendedTo: string;
    code: string;
    collectAt?: string;
  };
};
