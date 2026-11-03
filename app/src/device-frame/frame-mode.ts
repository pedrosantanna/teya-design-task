// Whether the web build draws the phone frame, and which phone. `?frame=0` turns it off, `?frame=ios` or
// `?frame=android` forces a phone; otherwise the frame is on in an iframe or a desktop-sized window and
// follows the store's platform. Native builds never draw it.
import { Platform, useWindowDimensions } from 'react-native';
import { create } from 'zustand';

import { startParams, useApp, type PlatformName } from '@/store';

export type FrameMode = 'auto' | 'ios' | 'android' | 'off';

function fromUrl(): FrameMode {
  const value = startParams().get('frame');
  if (value === '0' || value === 'off' || value === 'false') return 'off';
  if (value === 'ios' || value === 'android') return value;
  return 'auto';
}

export const useFrameMode = create<{ mode: FrameMode; setMode: (mode: FrameMode) => void }>()((set) => ({
  mode: Platform.OS === 'web' ? fromUrl() : 'off',
  setMode: (mode) => set({ mode }),
}));

function inIframe(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    // A cross-origin parent throws on access: that is an iframe too.
    return true;
  }
}

const embedded = inIframe();

/** Below this window width an unforced frame stays off: the page is on a phone. */
const PHONE_WIDTH = 600;
/** From this window width the debugger panel docks beside the frame instead of floating over it. */
const DOCK_WIDTH = 900;

export type FrameLayout = {
  framed: boolean;
  device: PlatformName;
  /** The debugger panel sits beside the frame. */
  docked: boolean;
};

export function useFrameLayout(): FrameLayout {
  const mode = useFrameMode((s) => s.mode);
  const platform = useApp('platform');
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web' || mode === 'off') return { framed: false, device: platform, docked: false };
  const forced = mode === 'ios' || mode === 'android';
  const framed = forced || embedded || width >= PHONE_WIDTH;
  return {
    framed,
    device: forced ? mode : platform,
    docked: framed && width >= DOCK_WIDTH,
  };
}
