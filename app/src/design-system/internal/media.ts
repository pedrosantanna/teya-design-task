// Third-party views wrapped so Unistyles styles (and theme changes) reach them on every platform,
// the web included. Use these instead of importing the components directly.
import { BlurView } from 'expo-blur';
import { GlassView } from 'expo-glass-effect';
import { withUnistyles } from 'react-native-unistyles';

export const ThemedBlurView = withUnistyles(BlurView);
export const ThemedGlassView = withUnistyles(GlassView);

/** expo-image is styled with this plain object inside a themed View (a clipped box), not through
 *  Unistyles: re-rendering it on a theme change dropped the photo on the web. */
export const IMAGE_FILL = { width: '100%', height: '100%' } as const;

/** A photo the app draws: a bundled image (a Metro asset id) or a remote URL. */
export type PhotoSource = number | string;

/** expo-image's source for a `PhotoSource`. */
export const photoSource = (src: PhotoSource) => (typeof src === 'string' ? { uri: src } : src);
