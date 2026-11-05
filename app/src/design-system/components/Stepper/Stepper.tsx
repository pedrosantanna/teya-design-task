import MinusSignIcon from '@hugeicons/core-free-icons/MinusSignIcon';
import PlusSignIcon from '@hugeicons/core-free-icons/PlusSignIcon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';
import { Platform, Pressable, View, type AccessibilityActionEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { usePress } from '../../internal/usePress';
import { cornerCurve } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  /** Minus is disabled at `min` (1). */
  min?: number;
  /** Plus is disabled at the shop's stock ("Has 1 of 2" caps it at 1). */
  max?: number;
  label?: string;
};

function StepButton({ icon, label, disabled, onPress, joined }: { icon: IconSvgElement; label: string; disabled: boolean; onPress: () => void; joined: boolean }) {
  const { theme } = useUnistyles();
  const press = usePress();
  // React Native Web ignores hitSlop: there the button is 44 tall with a negative margin, so the capsule keeps its 36.
  const slop = (theme.hit.min - theme.size.button.compact) / 2;
  const web = Platform.OS === 'web' ? { height: theme.hit.min, marginVertical: -slop } : undefined;
  return (
    <Animated.View style={press.scaleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityElementsHidden
        importantForAccessibility="no"
        accessibilityLabel={label}
        disabled={disabled}
        hitSlop={slop}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={[styles.button(joined), web, disabled && styles.disabled]}
      >
        <Icon icon={icon} size="headline" weight="strong" color="tint" />
      </Pressable>
    </Animated.View>
  );
}

/** Quantity. iOS: minus and plus in one capsule beside the value. Android: two icon buttons around the value. */
export const Stepper = memo(function Stepper({ value, onChange, min = 1, max = Number.POSITIVE_INFINITY, label = 'Quantity' }: StepperProps) {
  const { theme } = useUnistyles();
  const ios = theme.platform === 'ios';
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (clamped === value) return;
    haptic('selection');
    onChange(clamped);
  };
  const dec = () => set(value - 1);
  const inc = () => set(value + 1);
  const onAccessibilityAction = (e: AccessibilityActionEvent) => {
    if (e.nativeEvent.actionName === 'increment') inc();
    if (e.nativeEvent.actionName === 'decrement') dec();
  };

  const minus = <StepButton icon={MinusSignIcon} label="Fewer" disabled={value <= min} onPress={dec} joined={ios} />;
  const plus = <StepButton icon={PlusSignIcon} label="More" disabled={value >= max} onPress={inc} joined={ios} />;
  const valueText = (
    <Text variant="headline" align="center">
      {String(value)}
    </Text>
  );

  return (
    <View
      style={styles.row}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min, max: Number.isFinite(max) ? max : undefined, now: value, text: String(value) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={onAccessibilityAction}
    >
      <Text variant="body">{label}</Text>
      {ios ? (
        <View style={styles.iosGroup}>
          <View style={styles.value}>{valueText}</View>
          <View style={styles.capsule}>
            {minus}
            <View style={styles.divider} />
            {plus}
          </View>
        </View>
      ) : (
        <View style={styles.androidGroup}>
          {minus}
          <View style={styles.value}>{valueText}</View>
          {plus}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: theme.space[3], minHeight: theme.hit.min },
  iosGroup: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
  androidGroup: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
  value: { minWidth: theme.size.button.compact },
  capsule: {
    ...cornerCurve,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.muted,
    // Visible on the web, so the buttons' 44 pt boxes are not clipped to the capsule.
    overflow: Platform.OS === 'web' ? 'visible' : 'hidden',
  },
  divider: { width: StyleSheet.hairlineWidth, height: theme.space[5], backgroundColor: theme.color.border },
  button: (joined: boolean) => ({
    width: joined ? theme.size.button.compact + theme.space[3] : theme.size.button.compact,
    height: theme.size.button.compact,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: joined ? 'transparent' : theme.color.muted,
  }),
  disabled: { opacity: theme.state.disabledContent },
}));
