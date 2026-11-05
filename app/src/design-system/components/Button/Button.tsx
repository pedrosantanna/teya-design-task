import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import * as Haptics from 'expo-haptics';
import { ActivityIndicator, Platform, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround } from '../../internal/ground';
import { cornerCurve, withAlpha, type AppTheme } from '../../theme';
import { Text } from '../Text/Text';

export type ButtonRole = 'filled' | 'tonal' | 'plain' | 'destructive' | 'inverse' | 'quiet';
export type ButtonSize = 'large' | 'compact';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  /** filled: the one commit action in view (Buy, Ask, send), the only Indigo fill. tonal: secondary, a neutral fill
   *  with Foreground text. plain: a text button in Tint. destructive: a text button in red (Cancel for a refund).
   *  On a coloured ground (Getting started's Indigo pages): inverse, a Foreground capsule with a Background label, and
   *  quiet, a text button in Foreground. */
  role?: ButtonRole;
  /** large: 50 high, full content width. compact: 36 high, hugs its label. */
  size?: ButtonSize;
  /** A HugeIcons icon shown before the label. */
  icon?: IconSvgElement;
  disabled?: boolean;
  /** Shows a spinner in place of the label and keeps the width (states.md). */
  loading?: boolean;
  /** Read out instead of the label, e.g. "Buy, £29.98". */
  accessibilityLabel?: string;
  testID?: string;
};

function contentColor(theme: AppTheme, role: ButtonRole): string {
  switch (role) {
    case 'filled':
      return theme.color.onPrimary;
    case 'destructive':
      return theme.color.destructive;
    case 'tonal':
    case 'quiet':
      return theme.color.foreground;
    case 'inverse':
      return theme.color.background;
    default:
      return theme.color.tint;
  }
}

export function Button({
  label,
  onPress,
  role = 'filled',
  size = 'large',
  icon,
  disabled = false,
  loading = false,
  accessibilityLabel,
  testID,
}: ButtonProps) {
  const { theme } = useUnistyles();
  const scale = useSharedValue(1);
  const layer = useSharedValue(0);
  const inactive = disabled || loading;
  // On a shop's accent tile a tonal button is a white overlay that keeps the shop's hue (colour.md, Shop accents).
  const onTile = useGround() === 'tile' && role === 'tonal' && !disabled;
  const color = disabled ? theme.color.foreground : contentColor(theme, role);
  const labelVariant = size === 'large' ? 'headline' : 'subheadlineStrong';

  styles.useVariants({ role, size, disabled, withIcon: !!icon && !loading });

  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));
  const layerStyle = useAnimatedStyle(() => ({ opacity: layer.get() }));

  const pressIn = () => {
    scale.set(withSpring(theme.state.pressedScale, theme.spring.press));
    layer.set(withSpring(theme.state.pressedLayer, theme.spring.press));
    if (role === 'filled' && Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  const pressOut = () => {
    scale.set(withSpring(1, theme.spring.snappy));
    layer.set(withSpring(0, theme.spring.snappy));
  };

  const hitSlop = size === 'compact' ? (theme.hit.min - theme.size.button.compact) / 2 : undefined;
  // Web: React Native Web ignores hitSlop, so a compact button grows a transparent 4 pt border to measure 44 and pulls
  // it back with an equal negative margin; the fill stops at the padding box, so it looks the same.
  const webSlop = Platform.OS === 'web' && hitSlop ? { height: theme.hit.min, borderWidth: hitSlop, margin: -hitSlop, borderColor: 'transparent', backgroundClip: 'padding-box' } : undefined;

  return (
    <Animated.View style={[styles.wrapper, animated]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={loading ? `${accessibilityLabel ?? label}, waiting` : (accessibilityLabel ?? label)}
        accessibilityState={{ disabled, busy: loading }}
        disabled={inactive}
        hitSlop={hitSlop}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[styles.button, onTile && styles.onTile, webSlop as object | undefined]}
      >
        <Animated.View pointerEvents="none" style={[styles.layer, { backgroundColor: color }, layerStyle]} />
        {loading ? (
          <ActivityIndicator color={color} accessibilityElementsHidden />
        ) : (
          <View style={[styles.content, disabled && styles.disabledContent]}>
            {icon ? (
              // Inline icon: the label's line height minus 4, stroke 2 beside a 600 label (imagery.md).
              <HugeiconsIcon
                icon={icon}
                size={theme.type[labelVariant].lineHeight - theme.space[1]}
                strokeWidth={2}
                color={color}
              />
            ) : null}
            <Text variant={labelVariant} color={labelColor(role, disabled)}>
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

function labelColor(role: ButtonRole, disabled: boolean) {
  if (disabled) return 'foreground' as const;
  switch (role) {
    case 'filled':
      return 'onPrimary' as const;
    case 'destructive':
      return 'destructive' as const;
    case 'tonal':
    case 'quiet':
      return 'foreground' as const;
    case 'inverse':
      return 'background' as const;
    default:
      return 'tint' as const;
  }
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    variants: {
      size: {
        large: { alignSelf: 'stretch' },
        compact: { alignSelf: 'flex-start' },
      },
    },
  },
  button: {
    ...cornerCurve,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      role: {
        filled: { backgroundColor: theme.color.primary },
        tonal: { backgroundColor: theme.color.muted },
        plain: {},
        destructive: {},
        inverse: { backgroundColor: theme.color.foreground },
        quiet: {},
      },
      size: {
        large: { height: theme.size.button.large, paddingHorizontal: theme.space[5] },
        compact: { height: theme.size.button.compact, paddingHorizontal: theme.space[4] },
      },
      disabled: {
        true: {},
        false: {},
      },
      withIcon: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      // A compact button with an icon: the icon's side bearing reads as padding, so the sides are space.3, and three
      // fit across the shop page's card (visual critique 2).
      { size: 'compact', withIcon: true, styles: { paddingHorizontal: theme.space[3] } },
      { role: 'filled', disabled: true, styles: { backgroundColor: withAlpha(theme.color.foreground, theme.state.disabledContainer) } },
      { role: 'inverse', disabled: true, styles: { backgroundColor: withAlpha(theme.color.foreground, theme.state.disabledContainer) } },
      { role: 'tonal', disabled: true, styles: { backgroundColor: withAlpha(theme.color.foreground, theme.state.disabledContainer) } },
    ],
  },
  onTile: { backgroundColor: withAlpha(theme.color.tonalOnTile, theme.state.tonalOnTile) },
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1],
  },
  disabledContent: {
    opacity: theme.state.disabledContent,
  },
}));
