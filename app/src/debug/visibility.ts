// The debugger's own state: hidden or shown, panel open or closed. Kept apart from the app store so toggling
// the panel never re-renders a screen. On the web the hidden state is kept in localStorage.
import { Platform } from 'react-native';
import { create } from 'zustand';

import { startParams } from '@/store';

const KEY = 'snuffle.debugger';

type Saved = { hidden: boolean; open: boolean };

function load(): Saved | null {
  if (Platform.OS !== 'web') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function save(value: Saved) {
  if (Platform.OS !== 'web') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Private windows and blocked storage: the setting lasts for this visit only.
  }
}

function initial(): Saved {
  const saved = load();
  const debug = startParams().get('debug');
  // The panel always starts closed; only `?debug=1` opens it. `?debug=0` starts hidden, otherwise the last
  // visit's hidden or shown choice applies.
  if (debug === '0') return { hidden: true, open: false };
  if (debug === '1') return { hidden: false, open: true };
  return { hidden: saved?.hidden ?? false, open: false };
}

type DebuggerState = Saved & {
  toggleHidden: () => void;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
};

export const useDebugger = create<DebuggerState>()((set, get) => ({
  ...initial(),
  toggleHidden: () => set({ hidden: !get().hidden }),
  setOpen: (open) => set({ open }),
  toggleOpen: () => set({ open: !get().open }),
}));

// Persist on change, and once at start so `?debug=` is remembered.
save({ hidden: useDebugger.getState().hidden, open: useDebugger.getState().open });
useDebugger.subscribe((s, p) => {
  if (s.hidden !== p.hidden || s.open !== p.open) save({ hidden: s.hidden, open: s.open });
});
