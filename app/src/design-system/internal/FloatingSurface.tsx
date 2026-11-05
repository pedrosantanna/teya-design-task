// The floating material from shape.md: Liquid Glass on iOS 26 when the system offers it and Reduce
// Transparency is off, a blur on earlier iOS, CSS glass on the web (backdrop blur and saturation over a
// translucent fill, an inner highlight and a soft shadow), and a tonal surface on Android.
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve, withAlpha } from '../theme';
import { useWebGlass } from './glass';
import { ThemedBlurView, ThemedGlassView } from './media';
import { useReduceTransparency } from './useReduceTransparency';

// Blur strength for the pre-iOS 26 fallback; a material setting, not a layout value.
const BLUR_INTENSITY = 60;

export type FloatingSurfaceProps = {
  children?: ReactNode;
  /** Interactive glass reacts to touch (the ask bar, the Requests button). */
  interactive?: boolean;
  /** tint: glass tinted with the Tint colour (Confirm). */
  tint?: boolean;
  /** The soft drop shadow under a floating control; off for a sheet or a large panel. */
  shadow?: boolean;
  /** What the control sits on. tile: a shop's or category's accent tile, where the glass takes the tonalOnTile
   *  overlay instead of the Card fill, so it lifts off the tile instead of reading as a dent. muted: a solid Muted
   *  circle (the header buttons on a dark sheet, where glass over the Sheet colour all but vanishes). */
  surface?: 'glass' | 'tile' | 'muted';
  style?: StyleProp<ViewStyle>;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
};

/** Whether glass is drawn as glass (not the solid fallback) for the current theme. */
export function useGlass(): boolean {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const reduceTransparency = useReduceTransparency();
  return theme.platform !== 'android' && !reduceTransparency;
}

export function FloatingSurface({ children, interactive = false, tint = false, shadow = true, surface = 'glass', style, pointerEvents }: FloatingSurfaceProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const glass = useGlass();
  const onTile = withAlpha(theme.color.tonalOnTile, theme.state.tonalOnTile);
  const webGlass = useWebGlass(shadow, surface === 'tile' ? onTile : undefined, surface === 'tile');

  if (tint) {
    // Confirm: the tinted control. Liquid Glass takes the tint natively; elsewhere it is a solid Tint fill.
    if (Platform.OS === 'ios' && glass && isLiquidGlassAvailable()) {
      return (
        <ThemedGlassView
          pointerEvents={pointerEvents}
          glassEffectStyle="regular"
          isInteractive={interactive}
          tintColor={theme.color.tint}
          colorScheme={theme.scheme}
          style={[styles.base, style]}
        >
          {children}
        </ThemedGlassView>
      );
    }
    return (
      <View pointerEvents={pointerEvents} style={[styles.base, styles.tint, style]}>
        {children}
      </View>
    );
  }
  if (surface === 'muted') {
    return (
      <View pointerEvents={pointerEvents} style={[styles.base, styles.muted, style]}>
        {children}
      </View>
    );
  }
  if (!glass) {
    return (
      <View pointerEvents={pointerEvents} style={[styles.base, surface === 'tile' ? styles.tile : styles.solid, style]}>
        {children}
      </View>
    );
  }
  if (Platform.OS === 'web') {
    return (
      <View ref={webGlass} pointerEvents={pointerEvents} style={[styles.base, styles.webGlass, style]}>
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
  // Android and Reduce Transparency: the tonal surface container. The palette has no surface-container role; Card is the nearest.
  solid: { backgroundColor: theme.color.card },
  muted: { backgroundColor: theme.color.muted },
  tile: { backgroundColor: withAlpha(theme.color.tonalOnTile, theme.state.tonalOnTile) },
  tint: { backgroundColor: theme.color.tint },
  // The fill is set again through the ref with the backdrop filter; this keeps it before the first paint.
  webGlass: { backgroundColor: theme.color.card },
  blur: { borderWidth: StyleSheet.hairlineWidth, borderColor: theme.color.border },
}));
