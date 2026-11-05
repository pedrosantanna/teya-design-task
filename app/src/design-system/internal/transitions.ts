// Screen transitions (iOS 26 patterns, Apple Music as the reference). On the web they run as view transitions
// (`document.startViewTransition`): the app's screen area carries `view-transition-name: snuffle-screen` and slides,
// rises or fades by kind; a zoom also names its source and the target screen `snuffle-zoom`, so the browser morphs
// one into the other. Without the API, or under Reduce Motion, the change is instant or a crossfade. On Android a
// zoom is a container transform: the target screen grows from the source's measured rectangle (ZoomTarget).
import { AccessibilityInfo, Platform } from 'react-native';

import { themes } from '../theme/theme.generated';
import './webPress';
import { measureOrigin, originNode, type Rect } from './origins';
import { overlayOpen } from './overlay';

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
// The latest navigation's number: a transition that was skipped must not clean up after the one that replaced it.
let seq = 0;
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

// One frame, or 24 ms if the browser holds frames. While a view transition's old snapshot holds a named layer with a
// backdrop filter (the glass controls under a zoom source), Chrome can stop animation frames until the update
// callback returns, and a wait made of frames alone ran into its 4 s timeout: every zoom hung for four seconds.
const tick = () =>
  new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    requestAnimationFrame(finish);
    setTimeout(finish, 24);
  });

// The new screen is ready to be captured: its fonts are loaded and it has had two frames to lay out and paint.
const settle = async () => {
  const fonts = (document as unknown as { fonts?: { ready: Promise<unknown>; status?: string } }).fonts;
  if (fonts && fonts.status !== 'loaded') await Promise.race([fonts.ready, new Promise((resolve) => setTimeout(resolve, 150))]);
  await tick();
  await tick();
};

/**
 * Run a navigation with a transition. `sourceId` names a ZoomSource or ZoomOrigin for `zoom` and `unzoom`.
 * Native stacks animate themselves (route options in the root layout); on native only a zoom does extra work.
 */
export async function navigateWith(kind: TransitionKind, navigate: () => void, sourceId?: string, arrived?: () => boolean) {
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
  const prevZoom = zoomTarget;
  const mine = ++seq;
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
    // Names on this transition's own nodes always come off. The page-wide state (data-vt, the shared target nodes)
    // belongs to the newest navigation, so a transition that another one replaced leaves it alone.
    if (askBar) askBar.style.viewTransitionName = '';
    if (source) source.style.viewTransitionName = '';
    if (mine !== seq) return;
    delete root.dataset.vt;
    if (morphTarget) morphTarget.style.viewTransitionName = '';
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
      // The first visit to a route loads its code, so the wait is for the screen itself, not for a number of frames.
      const landed = () =>
        kind === 'morph' ? morphTarget != null
        : kind === 'unmorph' ? askBar != null
        : kind === 'zoom' ? zoomTarget != null && zoomTarget !== prevZoom
        : (arrived?.() ?? true);
      await until(landed, LAND_MS);
      if (!morphing) await settle();
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

// How long the transition waits for the next screen to mount (a first visit fetches the route's code) before it goes
// ahead without it.
const LAND_MS = 1200;

const until = (ready: () => boolean, ms: number) =>
  new Promise<void>((resolve) => {
    const start = Date.now();
    const tick = () => (ready() || Date.now() - start > ms ? resolve() : setTimeout(tick, 16));
    tick();
  });

// After this long without the update callback, the navigation happens without a transition.
const STALL_MS = 400;

// The web's own motion values, the CSS stand-ins for the springs (motion.md, Web): the iOS curve (the system's spring
// read as a curve) and the timings of the native stack, one place so the docs and the code say the same.
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const MS = { push: 350, sheet: 380, unsheet: 320, zoom: 420, morph: 420, fade: 200, morphScreen: 320 } as const;
/** The morph and the zoom clip to the card corner, the same radius as a card or a photo. */
const RADIUS = themes.iosLight.radius.card;
const PUSH_SHADOW = '-8px 0 24px rgba(0, 0, 0, 0.14)';
const CSS = `
::view-transition-old(root), ::view-transition-new(root) { animation: none; }
::view-transition-group(${SCREEN}) { overflow: hidden; animation-duration: ${MS.push}ms; animation-timing-function: ${EASE}; }
::view-transition-group(${ZOOM}) { animation-duration: ${MS.zoom}ms; animation-timing-function: ${EASE}; z-index: 2; overflow: hidden; border-radius: ${RADIUS}px; }
::view-transition-old(${ZOOM}), ::view-transition-new(${ZOOM}) { height: 100%; object-fit: cover; }
::view-transition-old(${SCREEN}), ::view-transition-new(${SCREEN}) { animation-duration: ${MS.push}ms; animation-timing-function: ${EASE}; animation-fill-mode: both; }
html[data-vt=push]::view-transition-old(${SCREEN}) { animation-name: snuffle-out-left; }
html[data-vt=push]::view-transition-new(${SCREEN}) { animation-name: snuffle-in-right; box-shadow: ${PUSH_SHADOW}; }
html[data-vt=pop]::view-transition-old(${SCREEN}) { animation-name: snuffle-out-right; z-index: 1; box-shadow: ${PUSH_SHADOW}; }
html[data-vt=pop]::view-transition-new(${SCREEN}) { animation-name: snuffle-in-left; }
html[data-vt=sheet]::view-transition-old(${SCREEN}) { animation: none; }
html[data-vt=sheet]::view-transition-new(${SCREEN}) { animation-name: snuffle-in-up; animation-duration: ${MS.sheet}ms; }
html[data-vt=unsheet]::view-transition-old(${SCREEN}) { animation-name: snuffle-out-down; animation-duration: ${MS.unsheet}ms; z-index: 1; }
html[data-vt=unsheet]::view-transition-new(${SCREEN}) { animation: none; }
html[data-vt=fade]::view-transition-old(${SCREEN}), html[data-vt=fade]::view-transition-new(${SCREEN}) { animation-duration: ${MS.fade}ms; animation-timing-function: ease-out; }
html[data-vt=fade]::view-transition-old(${SCREEN}) { animation-name: snuffle-fade-out; }
html[data-vt=fade]::view-transition-new(${SCREEN}) { animation-name: snuffle-fade-in; }
::view-transition-group(${MORPH}) { animation-duration: ${MS.morph}ms; animation-timing-function: ${EASE}; z-index: 3; overflow: hidden; border-radius: ${RADIUS}px; }
::view-transition-old(${MORPH}), ::view-transition-new(${MORPH}) { height: 100%; width: 100%; object-fit: none; object-position: left bottom; }
html[data-vt=morph]::view-transition-old(${SCREEN}), html[data-vt=morph]::view-transition-new(${SCREEN}),
html[data-vt=unmorph]::view-transition-old(${SCREEN}), html[data-vt=unmorph]::view-transition-new(${SCREEN}) { animation-duration: ${MS.morphScreen}ms; }
@keyframes snuffle-out-left { to { transform: translateX(-30%); filter: brightness(0.9); } }
@keyframes snuffle-in-right { from { transform: translateX(100%); } }
@keyframes snuffle-out-right { to { transform: translateX(100%); } }
@keyframes snuffle-in-left { from { transform: translateX(-30%); filter: brightness(0.9); } }
@keyframes snuffle-in-up { from { transform: translateY(100%); } }
@keyframes snuffle-out-down { to { transform: translateY(100%); } }
@keyframes snuffle-fade-out { to { opacity: 0; } }
@keyframes snuffle-fade-in { from { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation-duration: ${MS.fade}ms !important; }
  ::view-transition-old(${SCREEN}) { animation-name: snuffle-fade-out !important; box-shadow: none !important; }
  ::view-transition-new(${SCREEN}) { animation-name: snuffle-fade-in !important; box-shadow: none !important; }
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
let screenArea: (El & { getBoundingClientRect: () => { left: number; right: number } }) | null = null;

export function nameScreenArea(node: unknown) {
  const d = doc();
  if (!d || !node) return;
  injectCss(d);
  (node as El).style.viewTransitionName = SCREEN;
  screenArea = node as typeof screenArea;
}

// Swipe back (touch only): a drag that starts at the screen's left edge and travels past EDGE_COMMIT points, mostly
// sideways, goes back like the Back button. The browser can't follow a finger through a view transition, so the
// gesture commits on release and the pop plays from there.
const EDGE_START = 24;
const EDGE_COMMIT = 72;
function installEdgeSwipe(canGoBack: () => boolean, back: () => void) {
  if (typeof window === 'undefined') return;
  let start: { x: number; y: number } | null = null;
  window.addEventListener(
    'touchstart',
    (e) => {
      start = null;
      const t = e.touches[0];
      const left = screenArea?.getBoundingClientRect().left;
      if (e.touches.length === 1 && left != null && t.clientX - left <= EDGE_START && t.clientX >= left && !overlayOpen() && canGoBack()) start = { x: t.clientX, y: t.clientY };
    },
    { passive: true },
  );
  window.addEventListener(
    'touchend',
    (e) => {
      const from = start;
      start = null;
      const t = e.changedTouches[0];
      if (!from || running || overlayOpen()) return;
      const dx = t.clientX - from.x;
      if (dx >= EDGE_COMMIT && dx > Math.abs(t.clientY - from.y) * 1.5) back();
    },
    { passive: true },
  );
  window.addEventListener('touchcancel', () => (start = null), { passive: true });
}

// Prefetch what the next screens need while the browser is idle, so a first visit is not a download: every route's
// chunk (the entry bundle lists them) and MapLibre, which the shop page loads. Web only.
function warmWeb() {
  const d = doc();
  if (!d || typeof window === 'undefined') return;
  const g = globalThis as unknown as { __SNUFFLE_BASE__?: string; requestIdleCallback?: (cb: () => void) => void };
  const prefetch = (href: string) => {
    const link = (d as unknown as { createElement: (t: string) => Record<string, string> }).createElement('link');
    link.rel = 'prefetch';
    link.as = 'script';
    link.href = href;
    d.head.appendChild(link);
  };
  const run = async () => {
    const entry = Array.from((document as unknown as { scripts: ArrayLike<{ src: string }> }).scripts).find((x) => /\/index-[0-9a-f]{32}\.js$/.test(x.src));
    if (entry) {
      const text = await fetch(entry.src).then((r) => r.text());
      const base = entry.src.slice(0, entry.src.lastIndexOf('/') + 1);
      const chunks = new Set(text.match(/[A-Za-z0-9_[\]-]+-[0-9a-f]{32}\.js/g) ?? []);
      for (const name of chunks) if (!name.startsWith('__') && name !== entry.src.slice(base.length)) prefetch(base + name);
    }
    prefetch(`${g.__SNUFFLE_BASE__ ?? ''}/map/maplibre-gl-csp.js`);
  };
  const start = () => void run().catch(() => undefined);
  const whenIdle = () => (g.requestIdleCallback ? g.requestIdleCallback(start) : setTimeout(start, 1500));
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
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
  warmWeb();
  const pathOf = (href: unknown): string =>
    typeof href === 'string' ? href.split('?')[0] : ((href as { pathname?: string } | null)?.pathname ?? '/');
  // expo-router rebinds the router's methods in place (Object.assign) when its navigation container mounts, after this
  // runs, which dropped plain wrappers: Back and every push ran without a transition. Each method becomes an accessor
  // instead: assigning a method stores it as the underlying call, and calling the router runs the transition around it.
  const wrap = (name: string, run: (call: (...args: unknown[]) => unknown, args: unknown[]) => void) => {
    let call = r[name];
    Object.defineProperty(r, name, {
      configurable: true,
      enumerable: true,
      get: () => (...args: unknown[]) => run((...a) => call.apply(router, a), args),
      set: (fn: (...args: unknown[]) => unknown) => {
        call = fn;
      },
    });
  };
  for (const name of ['push', 'navigate', 'replace'] as const) {
    wrap(name, (original, args) => {
      const target = pathOf(args[0]);
      if (running) {
        // A ZoomSource's own call: remember which screen the zoom opened, for the way back.
        if (pending) lastZoomPath = target;
        original(...args);
        return;
      }
      const before = currentPath();
      navigateWith(kindFor(target, before), () => original(...args), undefined, target === before ? undefined : () => currentPath() !== before);
    });
  }
  for (const name of ['back', 'dismiss', 'dismissAll'] as const) {
    wrap(name, (original, args) => {
      const current = currentPath();
      let kind = kindFor(null, current);
      if (kind === 'unzoom' && !samePath(current, lastZoomPath)) kind = 'pop';
      navigateWith(kind, () => original(...args), kind === 'unzoom' ? lastZoomSource : undefined, () => currentPath() !== current);
    });
  }
  // Screens that can't be left by going back (first run, Nearby) ignore the gesture, as on the native stack, and so do
  // sheets and the composer (they close with their own control): only a pushed screen, or a zoomed one, swipes back.
  const swipes = () => ['pop', 'unzoom'].includes(kindFor(null, currentPath()));
  installEdgeSwipe(
    () => currentPath() !== '/' && swipes() && !!(r.canGoBack as (() => boolean) | undefined)?.(),
    () => r.back(),
  );
}
