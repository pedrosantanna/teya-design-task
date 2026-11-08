import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { memo, useEffect, useState } from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { cardShadow } from '../../internal/shadow';
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

/** "Once" and "Every week". iOS: the system pattern, a sliding thumb one level above its track under the delicate
 *  card shadow (light: a Card thumb on a Border track; dark: a Stone 360 thumb on a Card track), the selected label in
 *  Foreground semibold. Android: Material segmented button with a check. */
export const SegmentedControl = memo(function SegmentedControl({ segments, value, onChange, accessibilityLabel }: SegmentedControlProps) {
  const { theme } = useUnistyles();
  const ios = theme.platform === 'ios';
  const [width, setWidth] = useState(0);
  const index = Math.max(0, segments.findIndex((s) => s.value === value));
  const position = useSharedValue(index);
  useEffect(() => {
    position.set(withSpring(index, theme.spring.snappy));
  }, [index, position, theme.spring.snappy]);

  const inset = theme.size.segmented.inset;
  const slop = (theme.hit.min - theme.size.chip) / 2;
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
            // 32 pt segments reach the 44 pt minimum through the slop above and below (iOS).
            hitSlop={ios ? { top: slop, bottom: slop } : undefined}
            style={styles.segment(ios, selected, i > 0)}
          >
            {!ios && selected ? <Icon icon={Tick02Icon} size="subheadline" color="onChipSelected" /> : null}
            <Text variant={selected && ios ? 'subheadlineStrong' : 'subheadline'} color={selected && !ios ? 'onChipSelected' : 'foreground'} numberOfLines={1}>
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
    padding: ios ? theme.size.segmented.inset : 0,
    backgroundColor: ios ? theme.color.segmented.track : 'transparent',
    // Android: the outlined Material segmented button. iOS: no edge, the track's fill is the shape. The outline is the
    // control's only boundary on Android, so it takes the Outline role at 1 dp (3:1 or more on every ground); Border
    // measured 1.10:1 on the light sheet (platforms.md, colour and surface parity).
    borderWidth: ios ? 0 : theme.size.edge.control,
    borderColor: theme.color.outline,
    // iOS lets the thumb's shadow out; Android clips the selected segment's fill to the capsule.
    overflow: ios ? 'visible' : 'hidden',
  }),
  thumb: {
    ...cornerCurve,
    position: 'absolute',
    top: theme.size.segmented.inset,
    bottom: theme.size.segmented.inset,
    left: theme.size.segmented.inset,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.segmented.thumb,
    boxShadow: cardShadow(theme),
  },
  segment: (ios: boolean, selected: boolean, divider: boolean) => ({
    flex: 1,
    minHeight: ios ? theme.size.chip : theme.size.chip + theme.space[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space[1],
    paddingHorizontal: theme.space[3],
    // The selected segment: Indigo 200 in light (chipSelectedEdge; Indigo 100 was 1.03:1 on the sheet), Indigo 900 in dark.
    backgroundColor: !ios && selected ? (theme.scheme === 'dark' ? theme.color.chipSelected : theme.color.chipSelectedEdge) : 'transparent',
    borderLeftWidth: !ios && divider ? theme.size.edge.control : 0,
    borderLeftColor: theme.color.outline,
  }),
}));
