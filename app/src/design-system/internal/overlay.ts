// Whether an overlay (a sheet, the photo viewer) is open. A module counter, so two overlays at once still count as
// one "open". Read by the root Portal host, which hides the page behind from assistive tech and keyboard focus, and
// by the web edge-swipe, which must not run over a sheet.
import { useSyncExternalStore } from 'react';

let count = 0;
const listeners = new Set<() => void>();

/** An overlay opened (true) or closed (false). Calls must come in pairs. */
export function setOverlayOpen(open: boolean): void {
  const next = Math.max(0, count + (open ? 1 : -1));
  if (next === count) return;
  const wasOpen = count > 0;
  count = next;
  if (wasOpen !== count > 0) for (const l of listeners) l();
}

/** True while any overlay is open. */
export function overlayOpen(): boolean {
  return count > 0;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Re-renders when the first overlay opens or the last one closes. */
export function useOverlayOpen(): boolean {
  return useSyncExternalStore(subscribe, overlayOpen, overlayOpen);
}
