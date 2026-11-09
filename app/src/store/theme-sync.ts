// Keeps the Unistyles theme in step with the store's platform and scheme. "system" follows the device, or, on
// the web build inside the docs site, the docs' theme: the docs pass it as `?scheme=` and post
// `{ type: 'snuffle:scheme', scheme }` when the reader switches it. A Light or Dark picked in the debugger wins
// until the debugger goes back to System (or is reset).
// The page around the phone frame and the debugger are prototype chrome: they follow the docs' own theme (`?chrome=`
// and the same message), or the device's when the build is opened on its own, never the app's.
// Runs outside React, so a theme switch re-renders only the styles that read the theme.
import { Appearance, Platform } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { create } from 'zustand';

import { themeName } from '@/design-system';

import { useAppStore } from './store';
import type { PlatformName, Scheme } from './types';
import { readUrlState } from './url';

/** The embedding page's theme on the web (the docs site), if it gave one. */
let hostScheme = readUrlState().hostScheme;

function deviceScheme(): 'light' | 'dark' {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

/** The chrome's scheme: the docs' theme inside the docs site, else the device's. */
export const useChromeScheme = create<{ scheme: 'light' | 'dark' }>()(() => ({
  scheme: readUrlState().chromeScheme ?? deviceScheme(),
}));
const embeddedChrome = readUrlState().chromeScheme != null;

function applyChrome(scheme: 'light' | 'dark') {
  useChromeScheme.setState({ scheme });
  if (Platform.OS === 'web' && typeof document !== 'undefined') document.documentElement.dataset.scheme = scheme;
}

function resolve(scheme: Scheme): 'light' | 'dark' {
  if (scheme !== 'system') return scheme;
  if (hostScheme) return hostScheme;
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function apply(platform: PlatformName, scheme: Scheme) {
  const resolved = resolve(scheme);
  const name = themeName(platform, resolved);
  if (UnistylesRuntime.themeName !== name) UnistylesRuntime.setTheme(name);
}

function isSchemeMessage(data: unknown): data is { type: 'snuffle:scheme'; scheme: 'light' | 'dark'; chrome?: 'light' | 'dark' } {
  if (typeof data !== 'object' || data === null) return false;
  const message = data as { type?: unknown; scheme?: unknown };
  return message.type === 'snuffle:scheme' && (message.scheme === 'light' || message.scheme === 'dark');
}

let started = false;

/** Start syncing. Idempotent; called once from the root layout. */
export function startThemeSync() {
  if (started) return;
  started = true;
  const { platform, scheme } = useAppStore.getState();
  apply(platform, scheme);
  applyChrome(useChromeScheme.getState().scheme);
  useAppStore.subscribe((state, previous) => {
    if (state.platform !== previous.platform || state.scheme !== previous.scheme) apply(state.platform, state.scheme);
  });
  Appearance.addChangeListener(() => {
    const current = useAppStore.getState();
    if (current.scheme === 'system') apply(current.platform, 'system');
    if (!embeddedChrome) applyChrome(deviceScheme());
  });
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('message', (event) => {
      if (!isSchemeMessage(event.data)) return;
      hostScheme = event.data.scheme;
      if (event.data.chrome === 'light' || event.data.chrome === 'dark') applyChrome(event.data.chrome);
      const current = useAppStore.getState();
      if (current.scheme === 'system') apply(current.platform, 'system');
    });
  }
}
