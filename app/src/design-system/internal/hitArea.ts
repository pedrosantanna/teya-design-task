// Minimum hit area on the web. React Native Web ignores `hitSlop`, so a 32 or 36 pt control would measure that size to
// a finger or an assistive tool. Here the control is padded out to the 44 pt minimum and pulled back with an equal
// negative margin, so its layout is unchanged. Native keeps `hitSlop`, which does the same without a box.
import { Platform } from 'react-native';

/** Horizontal slop on the web, for controls narrower than the minimum ("All"). */
const SIDE = 4;

/** Style for a Pressable whose visible content sits in a child: pads it to `min` high on the web, nothing elsewhere. */
export function webHitArea(height: number, min: number) {
  if (Platform.OS !== 'web' || height >= min) return undefined;
  const y = (min - height) / 2;
  return { paddingVertical: y, marginVertical: -y, paddingHorizontal: SIDE, marginHorizontal: -SIDE };
}
