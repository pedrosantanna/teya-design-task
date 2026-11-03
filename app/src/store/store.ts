// The one mock store. Screens read small slices through selectors; the state debugger is the only place
// that writes many fields at once. Platform and scheme drive the Unistyles theme (see theme-sync.ts).
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { create } from 'zustand';

import { hrefFor, stepById, steps, type StepId, type StepPreset } from './journey';
import { readUrlState } from './url';
import type {
  AnswerState,
  ContentSet,
  Fulfilment,
  OrderState,
  PaymentState,
  Persona,
  PlatformName,
  RequestState,
  Scheme,
  ShopHours,
} from './types';

export type AppState = {
  persona: Persona;
  platform: PlatformName;
  scheme: Scheme;
  step: StepId;
  contentSet: ContentSet;
  request: RequestState;
  /** Answer state per shop id, for the active request. Shops not listed are "Asked". */
  answers: Record<string, AnswerState>;
  order: OrderState;
  fulfilment: Fulfilment;
  payment: PaymentState;
  shopHours: ShopHours;
  /** Skeletons in place of content (states.md). */
  loading: boolean;
  /** Location permission off: Nearby shows its location-off state. */
  locationOff: boolean;
  notificationsAllowed: boolean;
  /** After a partial buy the order card adds "Keep looking for 1 more". */
  keepLookingForMore: boolean;
  /** What a new request starts with: a suggestion chip's text, or the shop it is addressed to (Ask from a shop page). */
  draft: Draft | null;
};

export type Draft = { text?: string; shopId?: string };

export type AppActions = {
  /** Set any fields. Used by the debugger's controls. */
  set: (patch: Partial<AppState>) => void;
  setAnswer: (shopId: string, state: AnswerState) => void;
  /** Apply a journey step's preset and show its screen. */
  goTo: (step: StepId, options?: { navigate?: boolean }) => void;
  /** Back to Nearby for the current persona, with no request in progress. Keeps the look. */
  reset: () => void;
};

const defaultPlatform: PlatformName = Platform.OS === 'android' ? 'android' : 'ios';

function fromPreset(preset: StepPreset): Pick<AppState, 'request' | 'answers' | 'order' | 'fulfilment' | 'payment'> {
  return {
    request: preset.request,
    answers: preset.answers,
    order: preset.order,
    fulfilment: preset.fulfilment,
    payment: preset.payment,
  };
}

const home = steps[0];

const defaults: AppState = {
  persona: 'sam',
  platform: defaultPlatform,
  scheme: 'system',
  step: 'home',
  contentSet: 'default',
  ...fromPreset(home.preset),
  shopHours: 'open',
  loading: false,
  locationOff: false,
  notificationsAllowed: true,
  keepLookingForMore: false,
  draft: null,
};

/** Defaults, then the URL on web (`?step=…&persona=…&os=…&scheme=…&set=…`). */
function initialState(): AppState {
  const url = readUrlState();
  const step = stepById(url.step);
  return {
    ...defaults,
    ...(step ? { step: step.id, ...fromPreset(step.preset), persona: step.preset.persona ?? defaults.persona } : null),
    ...(url.persona ? { persona: url.persona } : null),
    ...(url.platform ? { platform: url.platform } : null),
    ...(url.scheme ? { scheme: url.scheme } : null),
    ...(url.set ? { contentSet: url.set } : null),
  };
}

export const useAppStore = create<AppState & AppActions>()((set, get) => ({
  ...initialState(),
  set: (patch) => set(patch),
  setAnswer: (shopId, state) => set({ answers: { ...get().answers, [shopId]: state } }),
  goTo: (id, { navigate = true } = {}) => {
    const step = stepById(id);
    if (!step) return;
    set({
      step: step.id,
      ...fromPreset(step.preset),
      ...(step.preset.persona ? { persona: step.preset.persona } : null),
      keepLookingForMore: false,
    });
    for (const hook of stepHooks) hook(step.id);
    if (navigate) navigateTo(step.id);
  },
  reset: () => {
    set({
      step: 'home',
      ...fromPreset(home.preset),
      contentSet: 'default',
      shopHours: 'open',
      loading: false,
      locationOff: false,
      notificationsAllowed: true,
      keepLookingForMore: false,
    });
    for (const hook of stepHooks) hook('home');
    navigateTo('home');
  },
}));

/** Called after a journey step's preset is applied (and on Reset), so the simulation can set its own part. */
export const stepHooks: ((step: StepId) => void)[] = [];

function navigateTo(step: StepId) {
  try {
    if (step === 'home' && router.canDismiss()) router.dismissAll();
    router.navigate(hrefFor(step));
  } catch {
    // The router isn't mounted yet (first frame); the layout navigates once it is.
  }
}

/** Read one field. Components re-render only when that field changes. */
export function useApp<K extends keyof AppState>(key: K): AppState[K] {
  return useAppStore((s) => s[key]);
}

/** The store's actions. Stable: reading them never re-renders. */
export function useAppActions(): AppActions {
  return actions;
}

const { set: setFields, setAnswer, goTo, reset } = useAppStore.getState();
const actions: AppActions = { set: setFields, setAnswer, goTo, reset };
