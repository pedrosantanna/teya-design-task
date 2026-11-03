// Where the shopper is in a short run of pages (Getting started): one dot per page, the current one in
// Foreground and the rest in the border colour. The dots aren't buttons; swipe and Continue move between pages.
// The current dot's colour moves with spring.fade.
import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type PageDotsProps = {
  count: number;
  /** Zero-based. */
  current: number;
};

function Dot({ on }: { on: boolean }) {
  const { theme } = useUnistyles();
  const value = useSharedValue(on ? 1 : 0);
  useEffect(() => {
    value.set(withSpring(on ? 1 : 0, theme.spring.fade));
  }, [on, value, theme.spring.fade]);
  const off = theme.color.border;
  const current = theme.color.foreground;
  const style = useAnimatedStyle(() => ({ backgroundColor: interpolateColor(value.get(), [0, 1], [off, current]) }));
  return <Animated.View style={[styles.dot, style]} />;
}

export const PageDots = memo(function PageDots({ count, current }: PageDotsProps) {
  return (
    <View style={styles.row} accessible accessibilityRole="text" accessibilityLabel={`Page ${current + 1} of ${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} on={i === current} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', justifyContent: 'center', gap: theme.space[2] },
  dot: { width: theme.size.dot, height: theme.size.dot, borderRadius: theme.radius.full },
}));
