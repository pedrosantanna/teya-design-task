// Where the shopper is in a short run of pages (Getting started): one dot per page, the current one in
// Foreground and the rest in Foreground at state.pageDotOff, so they take the colour of the ground (Getting started's Indigo). The dots aren't buttons; swipe and Continue move between pages.
// The current dot's colour moves with spring.fade.
import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { withAlpha, type ColorName } from '../../theme';

export type PageDotsProps = {
  count: number;
  /** Zero-based. */
  current: number;
  /** photo: white dots, for the pill over a shop photo (the carousel); ground: Foreground, on the page's ground. */
  on?: 'ground' | 'photo';
};

function Dot({ on, ink }: { on: boolean; ink: ColorName }) {
  const { theme } = useUnistyles();
  const value = useSharedValue(on ? 1 : 0);
  useEffect(() => {
    value.set(withSpring(on ? 1 : 0, theme.spring.fade));
  }, [on, value, theme.spring.fade]);
  const off = withAlpha(theme.color[ink], theme.state.pageDotOff);
  const current = theme.color[ink];
  const style = useAnimatedStyle(() => ({ backgroundColor: interpolateColor(value.get(), [0, 1], [off, current]) }));
  return <Animated.View style={[styles.dot, style]} />;
}

export const PageDots = memo(function PageDots({ count, current, on = 'ground' }: PageDotsProps) {
  return (
    <View style={styles.row} accessible accessibilityRole="text" accessibilityLabel={`Page ${current + 1} of ${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} on={i === current} ink={on === 'photo' ? 'onLightbox' : 'foreground'} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', justifyContent: 'center', gap: theme.space[2] },
  dot: { width: theme.size.dot, height: theme.size.dot, borderRadius: theme.radius.full },
}));
