// Registers the four generated themes with Unistyles. Imported once, from index.ts, before any screen.
import { Appearance, Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { themes, type ThemeName } from './theme.generated';

type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

export function themeName(platform: 'ios' | 'android', scheme: 'light' | 'dark'): ThemeName {
  return `${platform}${scheme === 'dark' ? 'Dark' : 'Light'}` as ThemeName;
}

StyleSheet.configure({
  themes,
  settings: {
    // Off: with CSS variables on web, theme values reach stylesheets as `var(--…)` strings and arithmetic on them breaks.
    CSSVars: false,
    // iOS is the default look on every platform except Android (decision 021); the state debugger can switch it.
    // The mock store may start in another theme (src/store/boot.ts, from the URL on web).
    initialTheme: () => {
      const fromStore = (globalThis as { __snuffleInitialTheme?: string }).__snuffleInitialTheme;
      if (fromStore && fromStore in themes) return fromStore as ThemeName;
      return themeName(Platform.OS === 'android' ? 'android' : 'ios', Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
    },
  },
});
