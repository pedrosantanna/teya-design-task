import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { memo, useEffect, useState } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { cornerCurve } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type Segment = { value: string; label: string };

export type SegmentedControlProps = {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
  accessibilityLabel?: string;
};

/** "Once" and "Every week". iOS: a sliding thumb on a muted track. Android: Material segmented button with a check. */
export const SegmentedControl = memo(function SegmentedControl({ segments, value, onChange, accessibilityLabel }: SegmentedControlProps) {
  const { theme } = useUnistyles();
  const ios = theme.platform === 'ios';
  const [width, setWidth] = useState(0);
  const index = Math.max(0, segments.findIndex((s) => s.value === value));
  const position = useSharedValue(index);
  useEffect(() => {
    position.set(withSpring(index, theme.spring.snappy));
  }, [index, position, theme.spring.snappy]);

  const inset = theme.space[1] / 2;
  const segmentWidth = width > 0 ? (width - inset * 2) / segments.length : 0;
  const thumbStyle = useAnimatedStyle(() => ({ width: segmentWidth, transform: [{ translateX: position.get() * segmentWidth }] }));
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const select = (next: string) => {
    if (next === value) return;
    haptic('selection');
    onChange(next);
  };

  return (
    <View style={styles.track(ios)} onLayout={onLayout} accessibilityRole="tablist" accessibilityLabel={accessibilityLabel}>
      {ios && width > 0 ? <Animated.View style={[styles.thumb, thumbStyle]} /> : null}
      {segments.map((segment, i) => {
        const selected = i === index;
        return (
          <Pressable
            key={segment.value}
            accessibilityRole="tab"
            accessibilityLabel={`${segment.label}, ${i + 1} of ${segments.length}`}
            accessibilityState={{ selected }}
            onPress={() => select(segment.value)}
            style={styles.segment(ios, selected, i > 0)}
          >
            {!ios && selected ? <Icon icon={Tick02Icon} size="subheadline" color="onChipSelected" /> : null}
            <Text variant={selected && ios ? 'subheadlineStrong' : 'subheadline'} color={!ios && selected ? 'onChipSelected' : 'foreground'} numberOfLines={1}>
              {segment.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  track: (ios: boolean) => ({
    ...cornerCurve,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: theme.radius.full,
    padding: ios ? theme.space[1] / 2 : 0,
    backgroundColor: ios ? theme.color.muted : 'transparent',
    borderWidth: ios ? 0 : StyleSheet.hairlineWidth * 2,
    borderColor: theme.color.border,
    overflow: 'hidden',
  }),
  thumb: {
    ...cornerCurve,
    position: 'absolute',
    top: theme.space[1] / 2,
    bottom: theme.space[1] / 2,
    left: theme.space[1] / 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.card,
  },
  segment: (ios: boolean, selected: boolean, divider: boolean) => ({
    flex: 1,
    minHeight: ios ? theme.size.chip : theme.size.chip + theme.space[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space[1],
    paddingHorizontal: theme.space[3],
    backgroundColor: !ios && selected ? theme.color.chipSelected : 'transparent',
    borderLeftWidth: !ios && divider ? StyleSheet.hairlineWidth * 2 : 0,
    borderLeftColor: theme.color.border,
  }),
}));
