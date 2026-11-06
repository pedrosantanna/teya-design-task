// The status bar's content follows what is under it (round 18). In dark mode the system bar is light, but an accent tile
// is a light pastel (decision 066), so a screen with a tile under the status bar asks for dark content for as long as the
// tile is there. The latest screen to ask wins; a screen drops its ask when it loses focus or unmounts. The native root
// passes the result to expo-status-bar, and the web DeviceFrame, which draws its own status bar and home indicator,
// reads the same value.
import { useEffect, useId, useSyncExternalStore } from 'react';

export type StatusBarTone = 'light' | 'dark';

type Entry = { id: string; tone: StatusBarTone };

let entries: Entry[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function top(): StatusBarTone | undefined {
  return entries.length ? entries[entries.length - 1].tone : undefined;
}

/** The tone a screen asked for, or undefined when none did (the bar follows the colour scheme). */
export function useStatusToneOverride(): StatusBarTone | undefined {
  return useSyncExternalStore(subscribe, top, top);
}

/** Ask for a status bar tone while `active`. Dark content over a pastel tile, light over a dark map. */
export function useStatusTone(tone: StatusBarTone | undefined, active = true) {
  const id = useId();
  useEffect(() => {
    if (!tone || !active) return;
    entries = entries.filter((e) => e.id !== id).concat({ id, tone });
    emit();
    return () => {
      entries = entries.filter((e) => e.id !== id);
      emit();
    };
  }, [id, tone, active]);
}
