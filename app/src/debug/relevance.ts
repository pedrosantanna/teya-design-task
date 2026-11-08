// Which of the debugger's controls change something on the screen that is showing now. The rules are read off the
// screens in src/app and the store (which fields each screen and its hooks read, and under which conditions), so the
// panel offers only what can change the frame. Persona, platform, scheme, the phone frame, the journey step, the
// clock and the actions are global and are not listed here: they always show.
import { useGlobalSearchParams, usePathname } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import { contentFor, isBuyable, shopById, useAppStore, useContent, useSim, type AppState, type OrderState, type PersonaContent, type SimState } from '@/store';

/** The screens the rules tell apart. */
export type ScreenId =
  | 'firstRun'
  | 'nearby'
  | 'category'
  | 'places'
  | 'ask'
  | 'requests'
  | 'chat'
  | 'otherChat'
  | 'receipt'
  | 'keepLooking'
  | 'lock'
  | 'shop'
  | 'reviews'
  | 'other';

export const screenNames: Record<ScreenId, string> = {
  firstRun: 'First run',
  nearby: 'Nearby',
  category: 'Category',
  places: 'Places',
  ask: 'New request',
  requests: 'Requests',
  chat: 'Request chat',
  otherChat: 'Another request’s chat',
  receipt: 'Receipt',
  keepLooking: 'Keep looking',
  lock: 'Lock screen',
  shop: 'Shop page',
  reviews: 'What buyers say',
  other: 'Other screen',
};

/** The per-screen controls, by the label the panel gives them. */
export type ControlId =
  | 'request'
  | 'fulfilment'
  | 'order'
  | 'partialBuy'
  | 'payment'
  | 'answers'
  | 'contentSet'
  | 'loading'
  | 'locationOff'
  | 'shopHours'
  | 'place'
  | 'radius'
  | 'notifications'
  | 'payOutcome'
  | 'shopOutcome'
  | 'date';

export type Relevance = { screen: ScreenId; on: Record<ControlId, boolean> };

type AppSlice = Pick<AppState, 'hasOnboarded' | 'persona' | 'request' | 'order' | 'payment' | 'answers' | 'draft'>;
type SimSlice = Pick<SimState, 'stage' | 'details' | 'buyShopId' | 'composeText' | 'orderRating'>;

/** The screen a pathname shows. A chat or receipt for a request that isn't the active one is another request's. */
export function screenFor(pathname: string, onboarded: boolean, activeId: string): { screen: ScreenId; id?: string } {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return { screen: onboarded ? 'nearby' : 'firstRun' };
  const [head, id, tail] = parts;
  if (head === 'welcome' || head === 'location-ask' || head === 'sign-in') return { screen: 'firstRun' };
  if (head === 'lock') return { screen: 'lock' };
  if (head === 'places') return { screen: 'places' };
  if (head === 'categories') return { screen: 'category', id };
  if (head === 'shops') return { screen: 'shop', id };
  if (head === 'reviews') return { screen: 'reviews', id };
  if (head === 'requests') {
    if (!id) return { screen: 'requests' };
    if (id === 'new') return { screen: 'ask' };
    if (tail === 'order') return { screen: 'receipt', id };
    if (tail === 'keep-looking') return { screen: 'keepLooking', id };
    return { screen: id === activeId ? 'chat' : 'otherChat', id };
  }
  return { screen: 'other' };
}

const HAS_ORDER = (order: OrderState) => order !== 'none';
const COLLECTING: OrderState[] = ['ready', 'extended'];

/** True when the long-names content set renames this shop, the only set that changes a shop's own pages. */
function renamedByLongNames(persona: AppState['persona'], shopId: string | undefined): boolean {
  if (!shopId) return false;
  const plain = shopById(contentFor(persona, 'default'), shopId)?.name;
  const long = shopById(contentFor(persona, 'longNames'), shopId)?.name;
  return plain !== long;
}

/** The rules: for each control, the screens and states where it changes what is drawn. */
export function relevance(screen: ScreenId, id: string | undefined, app: AppSlice, sim: SimSlice, content: PersonaContent): Record<ControlId, boolean> {
  const chat = screen === 'chat';
  // The active chat draws nothing until the request starts (store/chat.ts, buildChat).
  const started = sim.stage !== 'none' || app.request !== 'none';
  // Requests lists the active request only once it has started (useActiveRequestRow).
  const activeRow = screen === 'requests' && started;
  const order = HAS_ORDER(app.order);
  const detailsOpen = chat && sim.details != null;
  const paying = chat && app.payment === 'sheet';
  // Something can still be bought in the chat: an answer to buy and no order yet, or the sheets on the way to one.
  const canBuy = chat && !order && (paying || sim.details != null || content.active.offers.some((o) => isBuyable(app.answers[o.shopId])));
  const orderShown = (chat && started) || screen === 'receipt' || activeRow;
  // The details and payment sheets offer delivery only for a shop that delivers (Rossi's doesn't).
  const delivers = (shopId: string | null) => shopId != null && shopById(content, shopId)?.delivers != null;

  return {
    // The chat, the Requests row and the lock screen's Live Activity; on Nearby, the Requests button's count.
    request: (chat && started) || activeRow || screen === 'lock' || screen === 'nearby',
    answers: (chat && started) || activeRow || screen === 'lock',
    order: orderShown,
    // Collect or delivery shows on an order, in the details sheet and in the payment sheet's fee; on a shop's
    // pages it only names how the shopper's own rating's order arrived.
    fulfilment: (orderShown && order) || (detailsOpen && delivers(sim.details)) || (paying && delivers(sim.buyShopId)) || ((screen === 'shop' || screen === 'reviews') && sim.orderRating != null),
    // A partial buy needs more than one item and an order to show it on.
    partialBuy: content.active.quantity > 1 && order && ((chat && started) || screen === 'receipt' || activeRow),
    payment: chat && started,
    // Content sets swap the shops, names and requests; on a shop's own pages only long names change anything.
    contentSet:
      screen === 'nearby' ||
      screen === 'category' ||
      screen === 'requests' ||
      chat ||
      screen === 'otherChat' ||
      screen === 'receipt' ||
      screen === 'keepLooking' ||
      screen === 'lock' ||
      (screen === 'ask' && (app.draft?.shopId != null || sim.composeText != null)) ||
      ((screen === 'shop' || screen === 'reviews') && renamedByLongNames(app.persona, id)),
    loading: screen === 'nearby' || screen === 'shop',
    locationOff: screen === 'nearby',
    shopHours: screen === 'nearby' || screen === 'category' || screen === 'shop' || detailsOpen,
    // Nearby and Category list the place's shops; the shop page draws the walk from home only at home; Places ticks it.
    place: screen === 'nearby' || screen === 'category' || screen === 'shop' || screen === 'places' || detailsOpen,
    radius: screen === 'nearby' || screen === 'category' || screen === 'ask',
    // "Notifications are off…" follows the asking list, once Snuffle has stopped asking how to get it.
    notifications: chat && started && sim.stage !== 'clarify' && sim.stage !== 'notify',
    // Outcomes: they decide what the next step does, so they show where that step can happen.
    payOutcome: canBuy,
    shopOutcome: (orderShown && app.order === 'waiting') || canBuy,
    date: orderShown && COLLECTING.includes(app.order),
  };
}

/** The current screen and which controls change it, kept live as the shopper navigates and sheets open. */
export function useRelevance(): Relevance {
  const pathname = usePathname();
  const params = useGlobalSearchParams<{ id?: string; kind?: string }>();
  const content = useContent();
  const app = useAppStore(
    useShallow(
      (s): AppSlice => ({
        hasOnboarded: s.hasOnboarded,
        persona: s.persona,
        request: s.request,
        order: s.order,
        payment: s.payment,
        answers: s.answers,
        draft: s.draft,
      }),
    ),
  );
  const sim = useSim(
    useShallow((s): SimSlice => ({ stage: s.stage, details: s.details, buyShopId: s.buyShopId, composeText: s.composeText, orderRating: s.orderRating })),
  );
  const where = screenFor(pathname, app.hasOnboarded, content.active.id);
  const id = where.id ?? (typeof params.id === 'string' ? params.id : undefined);
  return { screen: where.screen, on: relevance(where.screen, id, app, sim, content) };
}
