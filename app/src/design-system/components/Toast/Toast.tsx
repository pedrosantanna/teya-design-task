import { memo, useEffect, useRef } from 'react';
import { AccessibilityInfo, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { useScreenReader } from '../../internal/useReduceTransparency';
import { cornerCurve } from '../../theme';
import { Text } from '../Text/Text';

// Shown for 4 seconds, longer while a screen reader is on so the action stays reachable (components.md).
const DURATION_MS = 4000;
const SCREEN_READER_DURATION_MS = 10000;

export type ToastProps = {
  visible: boolean;
  /** One line: "Request closed". */
  message: string;
  /** At most one action: "Undo". */
  actionLabel?: string;
  onAction?: () => void;
  /** Called when the toast has timed out or after its action; the owner sets `visible` to false. */
  onHide: () => void;
  /** Distance from the bottom edge; by default it sits above the ask bar. */
  bottom?: number;
  /** For the gallery: stays until hidden. */
  persistent?: boolean;
};

/** iOS: a custom banner in glass above the ask bar (iOS has no system toast). Android: Material snackbar. */
export const Toast = memo(function Toast({ visible, message, actionLabel, onAction, onHide, bottom, persistent = false }: ToastProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const screenReader = useScreenReader();
  const shown = useSharedValue(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ios = theme.platform === 'ios';
  const distance = theme.space[6];

  useEffect(() => {
    shown.set(withSpring(visible ? 1 : 0, theme.spring.snappy));
    if (!visible) return;
    AccessibilityInfo.announceForAccessibility(actionLabel ? `${message}. ${actionLabel} available` : message);
    if (persistent) return;
    timer.current = setTimeout(onHide, screenReader ? SCREEN_READER_DURATION_MS : DURATION_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [visible, message, actionLabel, persistent, screenReader, onHide, shown, theme.spring.snappy]);

  const style = useAnimatedStyle(() => ({
    opacity: shown.get(),
    transform: [{ translateY: (1 - shown.get()) * distance }],
  }));

  const act = () => {
    onAction?.();
    onHide();
  };

  const content = (
    <View style={styles.content}>
      <View style={styles.message}>
        <Text variant="subheadline" color={ios ? 'foreground' : 'background'} numberOfLines={1}>
          {message}
        </Text>
      </View>
      {actionLabel ? (
        <Pressable accessibilityRole="button" accessibilityLabel={actionLabel} onPress={act} hitSlop={theme.space[2]} style={styles.action}>
          <Text variant="subheadlineStrong" color={ios ? 'tint' : 'chipSelected'}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <Animated.View
      pointerEvents={visible ? 'box-none' : 'none'}
      accessibilityLiveRegion="polite"
      style={[styles.position(bottom ?? insets.bottom + theme.size.field + theme.space[3]), style]}
    >
      {ios ? <FloatingSurface style={styles.banner}>{content}</FloatingSurface> : <View style={styles.snackbar}>{content}</View>}
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  position: (bottom: number) => ({
    position: 'absolute',
    left: theme.margin.screenCompact,
    right: theme.margin.screenCompact,
    bottom,
    zIndex: 10,
  }),
  banner: { borderRadius: theme.radius.full },
  // Material snackbar: inverse surface. The palette has no inverse-surface role, so Foreground with Background text.
  snackbar: { ...cornerCurve, borderRadius: theme.radius.inner, backgroundColor: theme.color.foreground },
  content: {
    minHeight: theme.size.button.large,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    paddingLeft: theme.space[5],
    paddingRight: theme.space[4],
  },
  message: { flex: 1 },
  action: { minHeight: theme.hit.min, justifyContent: 'center' },
}));
