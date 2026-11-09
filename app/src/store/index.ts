// The mock store: one source of state for every screen (openspec/specs/state-debugger).
export * from './types';
export * from './labels';
export { steps, stepGroups, stepById, hrefFor, FIRST_RUN_STEPS, type JourneyStep, type StepId, type StepGroup } from './journey';
export { finishFirstRun, replayFirstRun } from './first-run';
export { addressBook, areas, contentFor, currentPlace, personas, seedPlaces, shopById, shopNumber } from './seed';
export { chooseRequestPhoto, photoKey, useRequestPhoto } from './photos';
export { useAppStore, useApp, useAppActions, type AppState, type AppActions, type Draft } from './store';
export { useArea, type AreaView } from './selectors';
export { CATEGORIES, KIND_ACCENT, shopAccent, type Category } from './kinds';
export { useContent, useStep, useAnswerState, useAnswerLabel, useRequestLabel, useOrderLabel } from './selectors';
export { startThemeSync, useChromeScheme } from './theme-sync';
export { readUrlState, startParams, basePath, shareUrl } from './url';
export {
  useSim,
  sim,
  matchAsk,
  scriptedAsks,
  openActiveChat,
  openDirections,
  unitFor,
  isBuyable,
  isYes,
  TYPING_MS,
  OFF_SCRIPT_REPLY,
  type SimState,
  type SimDate,
  type PayOutcome,
  type ShopOutcome,
  type ChatStage,
  type RatingDraft,
} from './simulation';
export {
  DOWN_TAGS,
  MIN_ANSWERS_FOR_STOCK,
  MIN_RATINGS_FOR_SHARE,
  NOTE_MAX,
  UP_TAGS,
  priceRangeLine,
  quoteMix,
  ratingHeadline,
  reliabilityLines,
  topTags,
  useShopRatings,
  withOwnRating,
  type RatingHeadline,
  type RatingTagCount,
  type ReliabilityLine,
} from './ratings';
export {
  useChat,
  useVisibleChat,
  useCurrentOrder,
  useActiveRequestRow,
  answerCardText,
  rankedAnswers,
  type ChatItem,
  type Chip,
  type OrderView,
} from './chat';
export { buildOtherChat, hasScript, isStanding, looksRepeating, otherActions, otherKey, useOtherThread, useOtherThreads, type Thread } from './other-chat';
