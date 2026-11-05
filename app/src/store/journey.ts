// Journey steps: one per frame of app flow v7 (v8 keeps the same frames). Each step is a preset of the store plus the route that shows it.
// Steps without a screen of their own show on /preview/[step]; the rest point `href` at the real screen.
import type { Href } from 'expo-router';

import type { AnswerState, Fulfilment, OrderState, PaymentState, Persona, RequestState } from './types';

export type StepId =
  | 'splash'
  | 'gettingStarted'
  | 'locationAsk'
  | 'signIn'
  | 'home'
  | 'requests'
  | 'ask'
  | 'split'
  | 'confirm'
  | 'asking'
  | 'away'
  | 'answers'
  | 'details'
  | 'applePay'
  | 'waiting'
  | 'receipt'
  | 'code'
  | 'dayBefore'
  | 'sold'
  | 'declined'
  | 'notConfirmed'
  | 'notCollected'
  | 'noShop'
  | 'delivers'
  | 'afterWork'
  | 'keepLooking'
  | 'collected'
  | 'rate'
  | 'rateDown'
  | 'rated'
  | 'shopPage'
  | 'shopNew'
  | 'shopFew'
  | 'reviews';

export type StepGroup = 'First run' | 'Browse and ask' | 'Snuffle asks shops' | 'Answers' | 'Buy' | 'Collect' | 'Shops' | 'Requests';

/** The part of the store a step sets. Answers are keyed by shop id. */
export type StepPreset = {
  persona?: Persona;
  request: RequestState;
  answers: Record<string, AnswerState>;
  order: OrderState;
  fulfilment: Fulfilment;
  payment: PaymentState;
};

export type JourneyStep = {
  id: StepId;
  /** The frame title in app flow v7. */
  title: string;
  group: StepGroup;
  /** The status bar time in the v7 frame. */
  time: string;
  preset: StepPreset;
};

const asking: Record<string, AnswerState> = {
  broadway: 'inStockSome',
  bushOpticians: 'doesntHave',
  paperCo: 'seen',
  olympia: 'seen',
  brookHardware: 'asked',
  brookToys: 'asked',
};

const answered: Record<string, AnswerState> = {
  ...asking,
  paperCo: 'hasIt',
  olympia: 'similar',
};

const none: Record<string, AnswerState> = {};

const base = { request: 'none', answers: none, order: 'none', fulfilment: 'collect', payment: 'idle' } as const satisfies StepPreset;
const afterAnswers = { ...base, request: 'haveIt', answers: answered } as const satisfies StepPreset;

export const steps: JourneyStep[] = [
  { id: 'home', title: 'Nearby', group: 'Browse and ask', time: '13:01', preset: base },
  // First run (app flow v8, area 0): shown before Nearby on the first launch.
  { id: 'splash', title: 'Splash', group: 'First run', time: '9:41', preset: base },
  { id: 'gettingStarted', title: 'Getting started', group: 'First run', time: '9:41', preset: base },
  { id: 'locationAsk', title: 'Location, asked in context', group: 'First run', time: '9:42', preset: base },
  { id: 'signIn', title: 'Sign in', group: 'First run', time: '9:42', preset: base },
  { id: 'ask', title: 'Ask', group: 'Browse and ask', time: '13:02', preset: base },
  { id: 'split', title: 'Snuffle suggests two requests', group: 'Browse and ask', time: '13:02', preset: base },
  { id: 'confirm', title: 'Snuffle confirms', group: 'Snuffle asks shops', time: '13:02', preset: { ...base, persona: 'sam', request: 'asking' } },
  {
    id: 'asking',
    title: 'Asking shops',
    group: 'Snuffle asks shops',
    time: '13:05',
    preset: { ...base, persona: 'sam', request: 'asking', answers: asking },
  },
  {
    id: 'away',
    title: 'Away from the app',
    group: 'Snuffle asks shops',
    time: '13:12',
    preset: { ...base, persona: 'sam', request: 'haveIt', answers: { ...asking, paperCo: 'hasIt' } },
  },
  {
    id: 'noShop',
    title: 'No shop has it in time',
    group: 'Snuffle asks shops',
    time: '13:20',
    preset: {
      ...base,
      persona: 'sam',
      request: 'notFound',
      answers: {
        broadway: 'doesntHave',
        bushOpticians: 'doesntHave',
        paperCo: 'doesntHave',
        olympia: 'doesntHave',
        brookHardware: 'noReply',
        brookToys: 'noReply',
      },
    },
  },
  { id: 'keepLooking', title: 'Keep looking', group: 'Snuffle asks shops', time: '13:21', preset: { ...base, persona: 'sam', request: 'looking', answers: answered } },
  { id: 'answers', title: 'Answers as they arrive', group: 'Answers', time: '13:14', preset: { ...afterAnswers, persona: 'sam' } },
  { id: 'details', title: 'Details: buy and how to get it', group: 'Answers', time: '13:15', preset: { ...afterAnswers, persona: 'sam' } },
  { id: 'applePay', title: 'Apple Pay', group: 'Buy', time: '13:15', preset: { ...afterAnswers, persona: 'sam', payment: 'sheet' } },
  { id: 'waiting', title: 'Waiting for the shop', group: 'Buy', time: '13:16', preset: { ...afterAnswers, persona: 'sam', order: 'waiting' } },
  { id: 'sold', title: 'Already sold', group: 'Buy', time: '13:18', preset: { ...afterAnswers, persona: 'sam', order: 'sold' } },
  { id: 'declined', title: "Payment didn't go through", group: 'Buy', time: '13:15', preset: { ...afterAnswers, persona: 'sam', payment: 'declined' } },
  { id: 'notConfirmed', title: "The shop doesn't confirm", group: 'Buy', time: '13:26', preset: { ...afterAnswers, persona: 'sam', order: 'notConfirmed' } },
  {
    id: 'delivers',
    title: 'The shop delivers',
    group: 'Buy',
    time: '14:41',
    preset: { ...afterAnswers, persona: 'sam', order: 'delivered', fulfilment: 'delivery' },
  },
  { id: 'receipt', title: 'Bought: the receipt', group: 'Collect', time: '13:19', preset: { ...afterAnswers, persona: 'sam', order: 'ready' } },
  { id: 'code', title: 'At the counter: the code', group: 'Collect', time: '15:42', preset: { ...afterAnswers, persona: 'sam', order: 'ready' } },
  { id: 'dayBefore', title: 'The day before the date', group: 'Collect', time: '9:00', preset: { ...afterAnswers, persona: 'sam', order: 'ready' } },
  { id: 'notCollected', title: 'Not collected in time', group: 'Collect', time: '9:12', preset: { ...afterAnswers, persona: 'sam', order: 'notCollected' } },
  {
    id: 'afterWork',
    title: 'Collect after work',
    group: 'Collect',
    time: '12:30',
    preset: { ...base, persona: 'jess', request: 'haveIt', answers: { rossis: 'hasIt' } },
  },
  // Rating (change shop-ratings-and-range): after Collected, the order card asks for a rating.
  { id: 'collected', title: 'Collected: rate the shop', group: 'Collect', time: '16:05', preset: { ...afterAnswers, persona: 'sam', order: 'collected' } },
  { id: 'rate', title: 'Rate the shop', group: 'Collect', time: '16:06', preset: { ...afterAnswers, persona: 'sam', order: 'collected' } },
  { id: 'rateDown', title: "Rate: wouldn't go back", group: 'Collect', time: '16:06', preset: { ...afterAnswers, persona: 'sam', order: 'collected' } },
  { id: 'rated', title: 'Rated', group: 'Collect', time: '16:07', preset: { ...afterAnswers, persona: 'sam', order: 'collected' } },
  { id: 'shopPage', title: 'Shop page', group: 'Shops', time: '13:01', preset: base },
  { id: 'shopNew', title: 'Shop page: no ratings yet', group: 'Shops', time: '13:01', preset: base },
  { id: 'shopFew', title: 'Shop page: 3 ratings', group: 'Shops', time: '13:01', preset: base },
  { id: 'reviews', title: 'What buyers say: all ratings', group: 'Shops', time: '13:01', preset: base },
  { id: 'requests', title: 'Requests (full screen)', group: 'Requests', time: '13:14', preset: { ...afterAnswers, persona: 'sam' } },
];

export const stepGroups: StepGroup[] = ['First run', 'Browse and ask', 'Snuffle asks shops', 'Answers', 'Buy', 'Collect', 'Shops', 'Requests'];

/** The first-run steps: picking one of them doesn't count as having finished first run. */
export const FIRST_RUN_STEPS: readonly StepId[] = ['splash', 'gettingStarted', 'locationAsk', 'signIn'];

const byId = new Map(steps.map((s) => [s.id, s]));

export function stepById(id: string | undefined | null): JourneyStep | undefined {
  return id ? byId.get(id as StepId) : undefined;
}

/** The route that shows a step. Nearby is the index; the rest use the preview screen until their screens exist. */
export function hrefFor(step: StepId): Href {
  if (step === 'home') return '/';
  if (step === 'splash') return '/welcome';
  if (step === 'gettingStarted') return { pathname: '/welcome', params: { page: '0' } };
  if (step === 'locationAsk') return '/location-ask';
  if (step === 'signIn') return '/sign-in';
  if (step === 'shopPage') return { pathname: '/shops/[id]', params: { id: 'rossis' } };
  if (step === 'shopNew') return { pathname: '/shops/[id]', params: { id: 'corner' } };
  if (step === 'shopFew') return { pathname: '/shops/[id]', params: { id: 'halo' } };
  if (step === 'reviews') return { pathname: '/reviews/[id]', params: { id: 'rossis' } };
  // Requests, Ask and the request's chat (request-chat-answers, buy-and-collect). The sheets, the payment
  // sheet and the full-screen code open from the simulation's state, which each step sets (simulation.ts).
  if (step === 'requests') return '/requests';
  if (step === 'ask' || step === 'split') return '/requests/new';
  if (step === 'away') return '/lock';
  const id = step === 'afterWork' ? 'sourdough' : 'eclipse';
  if (step === 'receipt' || step === 'code') return { pathname: '/requests/[id]/order', params: { id } };
  if (step === 'keepLooking') return { pathname: '/requests/[id]/keep-looking', params: { id } };
  return { pathname: '/requests/[id]', params: { id } };
}
