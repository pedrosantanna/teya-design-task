import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { memo, useEffect, useRef } from 'react';
import { AccessibilityInfo, Platform, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { PressableCard, spoken } from '../../internal/PressableCard';
import { Icon } from '../Icon/Icon';
import { StatusLabel, type StatusTone } from '../Tag/Tag';
import { Text } from '../Text/Text';

export type OrderStep = {
  title: string;
  detail?: string;
  state: 'done' | 'current' | 'todo';
};

export type OrderCardProps = {
  id: string;
  /** The order's label from the state table ("Waiting for Paper & Co · not charged yet"). */
  status: string;
  /** warning on "Not confirmed · not charged" and "Sold · not charged"; success on Ready, Paid, Collected. */
  tone?: StatusTone;
  shop: string;
  /** "2 × eclipse glasses" */
  items: string;
  total: string;
  /** While waiting: up to three steps, the current one marked; four for an order the shop delivers. */
  steps?: OrderStep[];
  /** After a partial buy: "Keep looking for 1 more". */
  note?: string;
  /** Opens the receipt. */
  onOpen?: (id: string) => void;
  animateIn?: boolean;
};

export const OrderCard = memo(function OrderCard({ id, status, tone = 'default', shop, items, total, steps, note, onOpen, animateIn }: OrderCardProps) {
  const { theme } = useUnistyles();
  const change = useSharedValue(1);
  const previous = useRef(status);

  // A status change fades the label through with spring.status, is announced politely and plays its haptic.
  useEffect(() => {
    if (previous.current === status) return;
    previous.current = status;
    change.set(withSequence(withTiming(0, { duration: 0 }), withSpring(1, theme.spring.status)));
    if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(spoken(status));
    if (tone === 'success') haptic('success');
    if (tone === 'warning') haptic('warning');
  }, [status, tone, change, theme.spring.status]);
  const changeStyle = useAnimatedStyle(() => ({ opacity: change.get() }));

  const shown = (steps ?? []).slice(0, 4);
  const current = shown.findIndex((s) => s.state === 'current');
  const stepText = current >= 0 ? `step ${current + 1} of ${shown.length}, ${shown[current].title}` : undefined;

  return (
    <PressableCard
      accessibilityLabel={spoken(status, shop, items, total, stepText, note)}
      onPress={onOpen ? () => onOpen(id) : undefined}
      animateIn={animateIn}
    >
      <View style={styles.head}>
        <View style={styles.grow} accessibilityLiveRegion="polite">
          <Animated.View style={changeStyle}>
            <StatusLabel label={status} tone={tone} />
          </Animated.View>
          <Text variant="headline" numberOfLines={2}>
            {`${shop} · ${items}`}
          </Text>
        </View>
        <Text variant="headline">{total}</Text>
      </View>
      {shown.length > 0 ? (
        <View style={styles.steps}>
          {shown.map((step, index) => (
            <View key={step.title} style={styles.step}>
              <View style={styles.marker(step.state)}>
                {step.state === 'done' ? (
                  <Icon icon={Tick02Icon} size="caption2" weight="strong" color="onPrimary" />
                ) : (
                  <Text variant="caption1" color={step.state === 'current' ? 'tint' : 'mutedForeground'}>
                    {String(index + 1)}
                  </Text>
                )}
              </View>
              <View style={styles.grow}>
                <Text variant="footnote" color={step.state === 'todo' ? 'mutedForeground' : 'foreground'}>
                  {step.title}
                </Text>
                {step.detail ? (
                  <Text variant="footnote" color="mutedForeground">
                    {step.detail}
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ) : null}
      {note ? (
        <Text variant="footnote" color="tint">
          {note}
        </Text>
      ) : null}
    </PressableCard>
  );
});

const styles = StyleSheet.create((theme) => ({
  head: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.space[3] },
  grow: { flex: 1, gap: theme.space[1] },
  steps: { gap: theme.space[2] },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.space[3] },
  marker: (state: OrderStep['state']) => ({
    width: theme.size.step,
    height: theme.size.step,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: state === 'done' ? theme.color.primary : state === 'current' ? theme.color.chipSelected : theme.color.muted,
  }),
}));
