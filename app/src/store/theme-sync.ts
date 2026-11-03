// Keeps the Unistyles theme in step with the store's platform and scheme. "system" follows the device, or, on
// the web build inside the docs site, the docs' theme: the docs pass it as `?scheme=` and post
// `{ type: 'snuffle:scheme', scheme }` when the reader switches it. A Light or Dark picked in the debugger wins
// until the debugger goes back to System (or is reset).
// Runs outside React, so a theme switch re-renders only the styles that read the theme.
import { Appearance, Platform } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { themeName } from '@/design-system';

import { useAppStore } from './store';
import type { PlatformName, Scheme } from './types';
import { readUrlState } from './url';

/** The embedding page's theme on the web (the docs site), if it gave one. */
let hostScheme = readUrlState().hostScheme;

function resolve(scheme: Scheme): 'light' | 'dark' {
  if (scheme !== 'system') return scheme;
  if (hostScheme) return hostScheme;
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function apply(platform: PlatformName, scheme: Scheme) {
  const resolved = resolve(scheme);
  const name = themeName(platform, resolved);
  if (UnistylesRuntime.themeName !== name) UnistylesRuntime.setTheme(name);
  // The page around the phone frame (public/index.html) follows the app's scheme.
  if (Platform.OS === 'web' && typeof document !== 'undefined') document.documentElement.dataset.scheme = resolved;
}

function isSchemeMessage(data: unknown): data is { type: 'snuffle:scheme'; scheme: 'light' | 'dark' } {
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
  useAppStore.subscribe((state, previous) => {
    if (state.platform !== previous.platform || state.scheme !== previous.scheme) apply(state.platform, state.scheme);
  });
  Appearance.addChangeListener(() => {
    const current = useAppStore.getState();
    if (current.scheme === 'system') apply(current.platform, 'system');
  });
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.addEventListener('message', (event) => {
      if (!isSchemeMessage(event.data)) return;
      hostScheme = event.data.scheme;
      const current = useAppStore.getState();
      if (current.scheme === 'system') apply(current.platform, 'system');
    });
  }
}
