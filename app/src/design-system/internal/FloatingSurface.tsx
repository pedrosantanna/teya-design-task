// The floating material from shape.md: Liquid Glass on iOS 26 when the system offers it and Reduce
// Transparency is off, a blur on earlier iOS and the web, a tonal surface on Android.
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../theme';
import { ThemedBlurView, ThemedGlassView } from './media';
import { useReduceTransparency } from './useReduceTransparency';

// Blur strength for the pre-iOS 26 and web fallback; a material setting, not a layout value.
const BLUR_INTENSITY = 60;

export type FloatingSurfaceProps = {
  children?: ReactNode;
  /** Interactive glass reacts to touch (the ask bar, the Requests button). */
  interactive?: boolean;
  style?: StyleProp<ViewStyle>;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
};

export function FloatingSurface({ children, interactive = false, style, pointerEvents }: FloatingSurfaceProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const reduceTransparency = useReduceTransparency();

  if (theme.platform === 'android' || reduceTransparency) {
    return (
      <View pointerEvents={pointerEvents} style={[styles.base, styles.solid, style]}>
        {children}
      </View>
    );
  }
  if (Platform.OS === 'ios' && isLiquidGlassAvailable()) {
    return (
      <ThemedGlassView
        pointerEvents={pointerEvents}
        glassEffectStyle="regular"
        isInteractive={interactive}
        colorScheme={theme.scheme}
        style={[styles.base, style]}
      >
        {children}
      </ThemedGlassView>
    );
  }
  return (
    <ThemedBlurView
      pointerEvents={pointerEvents}
      intensity={BLUR_INTENSITY}
      tint={theme.scheme === 'dark' ? 'dark' : 'light'}
      style={[styles.base, styles.blur, style]}
    >
      {children}
    </ThemedBlurView>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: { ...cornerCurve, overflow: 'hidden' },
  // Android: the tonal surface container. The palette has no surface-container role; Card is the nearest.
  solid: { backgroundColor: theme.color.card },
  blur: { borderWidth: StyleSheet.hairlineWidth, borderColor: theme.color.border },
}));
