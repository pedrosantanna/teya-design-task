// Imported first (index.ts), before the themes are registered: works out the theme the store starts in, from
// the URL on web (`?os=android&scheme=dark`), so the first frame is drawn in it. Switching the theme
// before the first render instead mixes up dynamic styles on the web build.
import { Appearance, Platform } from 'react-native';

import { readUrlState } from './url';

const url = readUrlState();
const platform = url.platform ?? (Platform.OS === 'android' ? 'android' : 'ios');
const scheme = url.scheme && url.scheme !== 'system' ? url.scheme : Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

(globalThis as { __snuffleInitialTheme?: string }).__snuffleInitialTheme = `${platform}${scheme === 'dark' ? 'Dark' : 'Light'}`;
