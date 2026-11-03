// Keeps the Unistyles theme in step with the store's platform and scheme. "system" follows the device.
// Runs outside React, so a theme switch re-renders only the styles that read the theme.
import { Appearance } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { themeName } from '@/design-system';

import { useAppStore } from './store';
import type { PlatformName, Scheme } from './types';

function resolve(scheme: Scheme): 'light' | 'dark' {
  if (scheme !== 'system') return scheme;
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function apply(platform: PlatformName, scheme: Scheme) {
  const name = themeName(platform, resolve(scheme));
  if (UnistylesRuntime.themeName !== name) UnistylesRuntime.setTheme(name);
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
}
