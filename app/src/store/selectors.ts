// Derived reads over the store. Each hook subscribes to the fewest fields it needs.
import { useShallow } from 'zustand/react/shallow';

import { stepById, type JourneyStep } from './journey';
import { answerLabel, orderLabel, requestLabel, type AnswerForm } from './labels';
import { areas, contentFor, shopById } from './seed';
import { useAppStore } from './store';
import type { AnswerState, PersonaContent, Shop } from './types';

/** The current persona's content in the current content set (stable object per persona and set). */
export function useContent(): PersonaContent {
  return useAppStore((s) => contentFor(s.persona, s.contentSet));
}

export function useStep(): JourneyStep {
  return useAppStore((s) => stepById(s.step) ?? stepById('home')!);
}

export function useAnswerState(shopId: string): AnswerState {
  return useAppStore((s) => s.answers[shopId] ?? 'asked');
}

/** The active request's status label, e.g. "2 shops have them · by 4pm". */
export function useRequestLabel(): string {
  const content = useContent();
  const { request, answers } = useAppStore(useShallow((s) => ({ request: s.request, answers: s.answers })));
  const offers = content.active.offers;
  const have = offers.filter((o) => {
    const state = answers[o.shopId];
    return state === 'hasIt' || state === 'hasSome' || state === 'inStock' || state === 'inStockSome';
  }).length;
  return requestLabel(request, {
    asked: offers.length,
    have,
    plural: content.active.plural,
    deadline: content.active.deadline,
  });
}

/** One answer's label in the given form ("Has them · replied 2 min ago" on a card). */
export function useAnswerLabel(shopId: string, form: AnswerForm): string {
  const content = useContent();
  const state = useAnswerState(shopId);
  const offer = content.active.offers.find((o) => o.shopId === shopId);
  const shop = shopById(content, shopId);
  return answerLabel(
    state,
    {
      plural: content.active.plural,
      quantity: content.active.quantity,
      available: offer?.available,
      source: shop?.source ?? 'asked',
      repliedAgo: offer?.repliedAgo,
      notice: shop?.notice,
    },
    form,
  );
}

/** The order's status label, e.g. "Ready · collect by Mon 9 Nov". */
export function useOrderLabel(): string {
  const content = useContent();
  const order = useAppStore((s) => s.order);
  const shop = shopById(content, content.order.shopId);
  return orderLabel(order, {
    shop: shop?.name ?? '',
    collectBy: content.order.collectBy,
    extendedTo: content.order.extendedTo,
  });
}

export type AreaView = { name: string; streetsLine: string; shops: Shop[]; key: string };

/** The area Nearby shows: the chosen place's area, its shops within the walking radius and its street count. */
export function useArea(): AreaView {
  const content = useContent();
  const { place, radius } = useAppStore(useShallow((s) => ({ place: s.place, radius: s.radius })));
  const area = areas[place.area];
  const pool = place.area === 'blythe' ? content.nearby : area.shops;
  const shops = pool.filter((s) => s.walkMinutes <= radius);
  const streets = area.streets[radius];
  return {
    name: place.address,
    streetsLine: `${streets} shopping streets within ${radius} min`,
    shops,
    key: `${place.area}:${radius}`,
  };
}
