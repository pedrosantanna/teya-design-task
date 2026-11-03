// A card that presses as a whole (states.md) and is one element for VoiceOver and TalkBack, with the
// card's buttons as custom actions (components.md). Optional arrival with spring.arrive.
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Platform, Pressable, type AccessibilityActionEvent, type AccessibilityActionInfo, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../theme';
import { usePress } from './usePress';

export type CardAction = { name: string; label: string; run: () => void };

export type PressableCardProps = {
  children: ReactNode;
  accessibilityLabel: string;
  accessibilityHint?: string;
  onPress?: () => void;
  actions?: CardAction[];
  animateIn?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function PressableCard({ children, accessibilityLabel, accessibilityHint, onPress, actions, animateIn, style, testID }: PressableCardProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const reduceMotion = useReducedMotion();
  const arrive = useSharedValue(animateIn ? 0 : 1);
  const lift = theme.space[6];
  useEffect(() => {
    if (animateIn) arrive.set(withSpring(1, reduceMotion ? theme.spring.fade : theme.spring.arrive));
  }, [animateIn, arrive, reduceMotion, theme.spring.arrive, theme.spring.fade]);
  const arriveStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, arrive.get()),
    transform: reduceMotion ? [] : [{ translateY: (1 - arrive.get()) * lift }],
  }));

  const accessibilityActions: AccessibilityActionInfo[] = [
    ...(onPress ? [{ name: 'activate', label: 'Open' }] : []),
    ...(actions ?? []).map((a) => ({ name: a.name, label: a.label })),
  ];
  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const name = event.nativeEvent.actionName;
    if (name === 'activate') onPress?.();
    else actions?.find((a) => a.name === name)?.run();
  };

  return (
    <Animated.View style={[arriveStyle, press.scaleStyle]}>
      <Pressable
        testID={testID}
        accessible
        // On the web a role of button renders <button>, which can't hold the card's own buttons.
        accessibilityRole={Platform.OS === 'web' ? undefined : onPress ? 'button' : 'summary'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityActions={accessibilityActions}
        onAccessibilityAction={onAccessibilityAction}
        onPress={onPress}
        onPressIn={onPress ? press.onPressIn : undefined}
        onPressOut={onPress ? press.onPressOut : undefined}
        style={[styles.card, style]}
      >
        <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
        {children}
      </Pressable>
    </Animated.View>
  );
}

/** Turns display text into a spoken label: "Has them · replied 2 min ago" → "Has them, replied 2 min ago". */
export function spoken(...parts: (string | undefined | false)[]): string {
  return parts
    .filter((p): p is string => typeof p === 'string' && p.length > 0)
    .map((p) => p.replaceAll(' · ', ', ').replace(/(\d+) × /g, '$1 '))
    .join(', ');
}

const styles = StyleSheet.create((theme) => ({
  card: {
    ...cornerCurve,
    backgroundColor: theme.color.card,
    borderRadius: theme.radius.card,
    padding: theme.inset.card,
    gap: theme.gap.block,
    overflow: 'hidden',
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
}));
