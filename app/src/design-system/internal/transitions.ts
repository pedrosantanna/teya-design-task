// Screen transitions (iOS 26 patterns, Apple Music as the reference). On the web they run as view transitions
// (`document.startViewTransition`): the app's screen area carries `view-transition-name: snuffle-screen` and slides,
// rises or fades by kind; a zoom also names its source and the target screen `snuffle-zoom`, so the browser morphs
// one into the other. Without the API, or under Reduce Motion, the change is instant or a crossfade. On Android a
// zoom is a container transform: the target screen grows from the source's measured rectangle (ZoomTarget).
import { AccessibilityInfo, Platform } from 'react-native';

import { measureOrigin, originNode, type Rect } from './origins';

export type TransitionKind = 'zoom' | 'unzoom' | 'push' | 'pop' | 'sheet' | 'unsheet' | 'fade' | 'morph' | 'unmorph';

const ZOOM = 'snuffle-zoom';
// The ask bar's glass and the New Request composer share this name, so the browser morphs one into the other. The
// snapshots keep their own size (object-fit: none), pinned to the bottom left where both have the glyph and the
// placeholder, and crossfade while the clipped group grows: nothing stretches and the placeholder never shows twice
// (visual critique 2).
const MORPH = 'snuffle-ask';
export const SCREEN = 'snuffle-screen';

type El = { style: Record<string, string> };
type ViewTransition = { finished: Promise<void> };
type Doc = {
  startViewTransition?: (cb: () => Promise<void>) => ViewTransition;
  documentElement: { dataset: Record<string, string | undefined> };
  head: { appendChild: (n: unknown) => void };
  createElement: (tag: string) => { textContent: string; id: string };
  getElementById: (id: string) => unknown;
};

const doc = (): Doc | null => (Platform.OS === 'web' && typeof document !== 'undefined' ? (document as unknown as Doc) : null);

let reduceMotion = false;
AccessibilityInfo.isReduceMotionEnabled?.()
  .then((on) => {
    reduceMotion = on;
  })
  .catch(() => undefined);
AccessibilityInfo.addEventListener?.('reduceMotionChanged', (on: boolean) => {
  reduceMotion = on;
});

const webReduced = () => {
  const w = globalThis as unknown as { matchMedia?: (q: string) => { matches: boolean } };
  return reduceMotion || !!w.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
};

let running = false;
let lastZoomSource: string | undefined;
let lastZoomPath: string | undefined;

// '/shops/rossis' matches '/shops/[id]'.
const samePath = (actual: string, pattern: string | undefined) =>
  !!pattern && new RegExp(`^${pattern.replace(/\[[^\]]+\]/g, '[^/]+')}$`).test(actual);

// Zoom bookkeeping: the target screen picks up the pending zoom when it mounts.
let pending: { sourceId: string; rect: Rect | null } | null = null;
let zoomTarget: El | null = null;

export function takePendingZoom() {
  const p = pending;
  pending = null;
  return p;
}

// The composer a morph lands on (New Request). It registers itself while mounted.
let morphTarget: El | null = null;

/** The New Request composer registers its glass node, so a morph from the ask bar can name it. */
export function setMorphTarget(node: unknown) {
  morphTarget = (node as El | null) ?? null;
}

/** The target screen registers its root node so a web zoom can name it in the new snapshot. */
export function setZoomTarget(node: unknown) {
  zoomTarget = (node as El | null) ?? null;
  if (zoomTarget && doc()?.documentElement.dataset.vt === 'zoom') zoomTarget.style.viewTransitionName = ZOOM;
}

const frames = (n: number) =>
  new Promise<void>((resolve) => {
    const step = (left: number) => (left <= 0 ? resolve() : requestAnimationFrame(() => step(left - 1)));
    step(n);
  });

/**
 * Run a navigation with a transition. `sourceId` names a ZoomSource or ZoomOrigin for `zoom` and `unzoom`.
 * Native stacks animate themselves (route options in the root layout); on native only a zoom does extra work.
 */
export async function navigateWith(kind: TransitionKind, navigate: () => void, sourceId?: string) {
  const d = doc();
  if (d && running) {
    // Already inside a transition (a wrapped router call made by another): just navigate.
    navigate();
    return;
  }
  if (kind === 'zoom' && sourceId) lastZoomSource = sourceId;
  if (!d) {
    if (kind === 'zoom' && sourceId && Platform.OS === 'android') pending = { sourceId, rect: await measureOrigin(sourceId) };
    navigate();
    return;
  }
  injectCss(d);
  if (!d.startViewTransition) {
    navigate();
    return;
  }
  const reduced = webReduced();
  const root = d.documentElement;
  root.dataset.vt = reduced ? 'fade' : kind;
  const source = sourceId ? (originNode(sourceId) as El | null) : null;
  if (!reduced && kind === 'zoom' && source) {
    source.style.viewTransitionName = ZOOM;
    pending = { sourceId: sourceId!, rect: null };
  }
  if (!reduced && kind === 'unzoom' && zoomTarget) zoomTarget.style.viewTransitionName = ZOOM;
  // Morph: the ask bar (a registered origin) into the composer, or back. The old side is named before the snapshot,
  // the new side once the next screen has rendered.
  const morphing = !reduced && (kind === 'morph' || kind === 'unmorph');
  const askBar = morphing && sourceId ? (originNode(sourceId) as El | null) : null;
  const morphFrom = kind === 'morph' ? askBar : kind === 'unmorph' ? morphTarget : null;
  if (morphing && morphFrom) morphFrom.style.viewTransitionName = MORPH;
  // The navigation runs once: inside the transition's update callback, or straight away if the browser skips or
  // stalls the transition (a hidden tab, an invalid snapshot).
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    running = true;
    try {
      navigate();
    } finally {
      running = false;
    }
  };
  const cleanup = () => {
    delete root.dataset.vt;
    if (askBar) askBar.style.viewTransitionName = '';
    if (morphTarget) morphTarget.style.viewTransitionName = '';
    if (source) source.style.viewTransitionName = '';
    if (zoomTarget) zoomTarget.style.viewTransitionName = '';
  };
  const stall = setTimeout(() => {
    if (!navigated) {
      go();
      cleanup();
    }
  }, STALL_MS);
  try {
    const transition = d.startViewTransition(async () => {
      clearTimeout(stall);
      if (source) source.style.viewTransitionName = '';
      if (zoomTarget && kind === 'unzoom') zoomTarget.style.viewTransitionName = '';
      if (morphFrom) morphFrom.style.viewTransitionName = '';
      go();
      // A morph waits for the composer to register (timers, not animation frames: Chrome may hold frames while the
      // old snapshot has a named glass layer, and the update would time out).
      if (morphing) await until(() => (kind === 'morph' ? morphTarget : askBar) != null, MORPH_WAIT_MS);
      else await frames(3);
      if (!reduced && kind === 'unzoom' && source) source.style.viewTransitionName = ZOOM;
      const morphTo = kind === 'morph' ? morphTarget : kind === 'unmorph' ? askBar : null;
      if (morphing && morphTo) morphTo.style.viewTransitionName = MORPH;
    });
    transition.finished.catch(() => undefined).finally(() => {
      clearTimeout(stall);
      go();
      cleanup();
    });
  } catch {
    clearTimeout(stall);
    go();
    cleanup();
  }
}

// How long a morph waits for the composer to mount before the transition goes ahead without it.
const MORPH_WAIT_MS = 300;

const until = (ready: () => boolean, ms: number) =>
  new Promise<void>((resolve) => {
    const start = Date.now();
    const tick = () => (ready() || Date.now() - start > ms ? resolve() : setTimeout(tick, 16));
    tick();
  });

// After this long without the update callback, the navigation happens without a transition.
const STALL_MS = 400;

const EASE = 'cubic-bezier(0.2, 0.9, 0.1, 1)';
const CSS = `
::view-transition-old(root), ::view-transition-new(root) { animation: none; }
::view-transition-group(${SCREEN}) { overflow: hidden; animation-duration: 420ms; animation-timing-function: ${EASE}; }
::view-transition-group(${ZOOM}) { animation-duration: 460ms; animation-timing-function: ${EASE}; z-index: 2; overflow: hidden; border-radius: 28px; }
::view-transition-old(${ZOOM}), ::view-transition-new(${ZOOM}) { height: 100%; object-fit: cover; }
::view-transition-old(${SCREEN}), ::view-transition-new(${SCREEN}) { animation-duration: 420ms; animation-timing-function: ${EASE}; }
html[data-vt=push]::view-transition-old(${SCREEN}) { animation-name: snuffle-out-left; }
html[data-vt=push]::view-transition-new(${SCREEN}) { animation-name: snuffle-in-right; }
html[data-vt=pop]::view-transition-old(${SCREEN}) { animation-name: snuffle-out-right; z-index: 1; }
html[data-vt=pop]::view-transition-new(${SCREEN}) { animation-name: snuffle-in-left; }
html[data-vt=sheet]::view-transition-old(${SCREEN}) { animation: none; }
html[data-vt=sheet]::view-transition-new(${SCREEN}) { animation-name: snuffle-in-up; }
html[data-vt=unsheet]::view-transition-old(${SCREEN}) { animation-name: snuffle-out-down; z-index: 1; }
html[data-vt=unsheet]::view-transition-new(${SCREEN}) { animation: none; }
html[data-vt=fade]::view-transition-old(${SCREEN}), html[data-vt=fade]::view-transition-new(${SCREEN}) { animation-duration: 250ms; }
::view-transition-group(${MORPH}) { animation-duration: 420ms; animation-timing-function: ${EASE}; z-index: 3; overflow: hidden; border-radius: 24px; }
::view-transition-old(${MORPH}), ::view-transition-new(${MORPH}) { height: 100%; width: 100%; object-fit: none; object-position: left bottom; }
html[data-vt=morph]::view-transition-old(${SCREEN}), html[data-vt=morph]::view-transition-new(${SCREEN}),
html[data-vt=unmorph]::view-transition-old(${SCREEN}), html[data-vt=unmorph]::view-transition-new(${SCREEN}) { animation-duration: 320ms; }
@keyframes snuffle-out-left { to { transform: translateX(-30%); filter: brightness(0.9); } }
@keyframes snuffle-in-right { from { transform: translateX(100%); } }
@keyframes snuffle-out-right { to { transform: translateX(100%); } }
@keyframes snuffle-in-left { from { transform: translateX(-30%); filter: brightness(0.9); } }
@keyframes snuffle-in-up { from { transform: translateY(100%); } }
@keyframes snuffle-out-down { to { transform: translateY(100%); } }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation-duration: 200ms !important; }
}
`;

function injectCss(d: Doc) {
  if (d.getElementById('snuffle-vt')) return;
  const style = d.createElement('style');
  style.id = 'snuffle-vt';
  style.textContent = CSS;
  d.head.appendChild(style);
}

/** Names the app's screen area so web transitions animate it and not the page around the phone frame. */
export function nameScreenArea(node: unknown) {
  const d = doc();
  if (!d || !node) return;
  injectCss(d);
  (node as El).style.viewTransitionName = SCREEN;
}

type RouterLike = Record<'push' | 'navigate' | 'back' | 'replace' | 'dismiss' | 'dismissAll', (...args: never[]) => unknown>;

/**
 * Web only: every router call runs as a view transition of the kind the route asks for, so screens and the
 * debugger don't have to wrap their own calls. `kindFor` gets the target path (or null going back) and the
 * current path; it returns the kind, or `unzoom` to shrink back into the last zoom's source.
 */
export function installWebTransitions(router: RouterLike, kindFor: (target: string | null, current: string) => TransitionKind, currentPath: () => string) {
  if (Platform.OS !== 'web') return;
  const r = router as unknown as Record<string, (...args: unknown[]) => unknown> & { __snuffle?: boolean };
  if (r.__snuffle) return;
  r.__snuffle = true;
  const pathOf = (href: unknown): string =>
    typeof href === 'string' ? href.split('?')[0] : ((href as { pathname?: string } | null)?.pathname ?? '/');
  for (const name of ['push', 'navigate', 'replace'] as const) {
    const original = r[name].bind(router);
    r[name] = (...args: unknown[]) => {
      const target = pathOf(args[0]);
      if (running) {
        // A ZoomSource's own call: remember which screen the zoom opened, for the way back.
        if (pending) lastZoomPath = target;
        original(...args);
        return;
      }
      navigateWith(kindFor(target, currentPath()), () => original(...args));
    };
  }
  for (const name of ['back', 'dismiss', 'dismissAll'] as const) {
    const original = r[name].bind(router);
    r[name] = (...args: unknown[]) => {
      const current = currentPath();
      let kind = kindFor(null, current);
      if (kind === 'unzoom' && !samePath(current, lastZoomPath)) kind = 'pop';
      navigateWith(kind, () => original(...args), kind === 'unzoom' ? lastZoomSource : undefined);
    };
  }
}
