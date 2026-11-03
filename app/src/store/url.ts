// URL state on the web build: `?step=answers&persona=jess&os=android&scheme=dark&set=longNames`
// sets the store at start, and "Copy link" builds the same query from the store. The platform is `os`, not
// `platform`: Expo's dev server treats `?platform=` as a manifest request. `platform` is still read, for links
// made before the rename.
import { Platform } from 'react-native';

import { stepById, type StepId } from './journey';
import type { ContentSet, Persona, PlatformName, Scheme } from './types';

export type UrlState = {
  step?: StepId;
  persona?: Persona;
  platform?: PlatformName;
  scheme?: Scheme;
  /** The embedding page's light or dark (the docs site), when the build runs in an iframe. */
  hostScheme?: 'light' | 'dark';
  set?: ContentSet;
  /** `?firstRun=1`: start with first run (splash, Getting started, location, sign in). */
  firstRun?: boolean;
};

function oneOf<T extends string>(value: string | null, options: readonly T[]): T | undefined {
  return value && (options as readonly string[]).includes(value) ? (value as T) : undefined;
}

/** The query string the page was opened with (web only; empty elsewhere). */
let initialSearch: string | undefined;

export function startParams(): URLSearchParams {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return new URLSearchParams();
  // Read once: the router rewrites the URL as the shopper moves between screens.
  initialSearch ??= window.location.search;
  return new URLSearchParams(initialSearch);
}

/** True when the web build runs inside another page (the docs site's iframe). */
export function isEmbedded(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  try {
    return window.parent !== window;
  } catch {
    return true;
  }
}

export function readUrlState(params: URLSearchParams = startParams()): UrlState {
  const scheme = oneOf(params.get('scheme'), ['light', 'dark', 'system'] as const);
  // Inside the docs site, `scheme` is the docs' own theme: the app's "System" follows it, and the debugger can
  // still pick Light or Dark over it. Opened on its own, `scheme` is the debugger's choice, as in a shared link.
  const embedded = isEmbedded();
  return {
    step: stepById(params.get('step'))?.id,
    persona: oneOf(params.get('persona'), ['sam', 'jess'] as const),
    platform: oneOf(params.get('os') ?? params.get('platform'), ['ios', 'android'] as const),
    scheme: embedded ? undefined : scheme,
    hostScheme: embedded && scheme !== 'system' ? scheme : undefined,
    set: oneOf(params.get('set'), ['default', 'empty', 'longNames', 'manyAnswers'] as const),
    firstRun: params.get('firstRun') === '1',
  };
}

/**
 * The folder the web build is served from, e.g. `/docs/prototype/`. Taken from the entry script's URL, so it
 * holds when the build sits under a sub-path or inside an iframe. `/` on native.
 */
export function basePath(): string {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return '/';
  const script = Array.from(document.scripts).find((s) => s.src.includes('/_expo/static/js/'));
  if (!script) return '/';
  try {
    const path = new URL(script.src).pathname;
    return path.slice(0, path.indexOf('_expo/static/js/'));
  } catch {
    return '/';
  }
}

/** A link that opens the web build in the given state. Keeps `frame` and `debug` from the current URL. */
export function shareUrl(state: Required<Omit<UrlState, 'set' | 'hostScheme' | 'firstRun'>> & { set: ContentSet }): string {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return '';
  const params = new URLSearchParams();
  params.set('step', state.step);
  params.set('persona', state.persona);
  params.set('os', state.platform);
  params.set('scheme', state.scheme);
  if (state.set !== 'default') params.set('set', state.set);
  const current = startParams();
  for (const key of ['frame', 'debug']) {
    const value = current.get(key);
    if (value) params.set(key, value);
  }
  return `${window.location.origin}${basePath()}?${params.toString()}`;
}
