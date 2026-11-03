// Gambetta and Switzer from Fontshare (ITF Free Font License: embedding in our own app and website is allowed).
// The files are gitignored and fetched by `npm run fonts`; see scripts/fetch-fonts.mjs.
import { FontDisplay, useFonts, type FontFamilyDefinition } from 'expo-font';
import { Platform } from 'react-native';

import { markFontsLoaded } from './helpers';

const families: FontFamilyDefinition[] = [
  {
    fontFamily: 'Gambetta',
    fontDefinitions: [{ path: require('../../../assets/fonts/Gambetta-Bold.ttf'), weight: 700, display: FontDisplay.SWAP }],
  },
  {
    fontFamily: 'Switzer',
    fontDefinitions: [
      { path: require('../../../assets/fonts/Switzer-Regular.ttf'), weight: 400, display: FontDisplay.SWAP },
      { path: require('../../../assets/fonts/Switzer-Medium.ttf'), weight: 500, display: FontDisplay.SWAP },
      { path: require('../../../assets/fonts/Switzer-Semibold.ttf'), weight: 600, display: FontDisplay.SWAP },
    ],
  },
];

/**
 * Loads the two families once, at the root. Returns true when text can render: fonts loaded, or failed
 * and the system font takes over (SF Pro on iOS, Roboto on Android; decision 027).
 */
export function useDesignSystemFonts(): boolean {
  const [loaded, error] = useFonts(families);
  if (loaded) markFontsLoaded(families.map((f) => f.fontFamily));
  // The web swaps the fonts in when they arrive (font-display: swap), so it doesn't wait.
  return loaded || error != null || Platform.OS === 'web';
}
