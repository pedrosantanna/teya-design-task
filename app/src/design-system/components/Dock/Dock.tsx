// The bottom dock (components.md, Ask bar and composer): the strip that holds the ask bar or the chat
// composer, with the suggestion chips above it on Nearby. It reaches the bottom of the screen through the
// safe area, so content scrolling under it is blurred (iOS, the web) or covered (Android, Reduce Transparency)
// and chips or messages never sit bare over it.
import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ThemedBlurView } from '../../internal/media';
import { useReduceTransparency } from '../../internal/useReduceTransparency';

// Blur strength, as on FloatingSurface's fallback; a material setting, not a layout value.
const BLUR_INTENSITY = 60;

export type DockProps = {
  children: ReactNode;
  /** Positions the dock over the screen's content (absolute, at the bottom). Default true. */
  floating?: boolean;
  /** Space under the content; defaults to the safe-area bottom. */
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
};

export function Dock({ children, floating = true, bottomInset, style }: DockProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const reduceTransparency = useReduceTransparency();
  const bottom = bottomInset ?? insets.bottom;
  const layout = [styles.strip(bottom), floating && styles.floating, style];

  if (theme.platform === 'android' || reduceTransparency) {
    return <View style={[layout, styles.solid]}>{children}</View>;
  }
  return (
    <ThemedBlurView intensity={BLUR_INTENSITY} tint={theme.scheme === 'dark' ? 'dark' : 'light'} style={[layout, styles.blur]}>
      {children}
    </ThemedBlurView>
  );
}

const styles = StyleSheet.create((theme) => ({
  strip: (bottom: number) => ({
    paddingTop: theme.space[3],
    paddingBottom: bottom + theme.space[2],
    gap: theme.space[3],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.separator,
  }),
  floating: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  // Android: the screen's own surface, so the ask bar's Card field still reads as a field on it.
  solid: { backgroundColor: theme.color.background },
  blur: { overflow: 'hidden' },
}));
