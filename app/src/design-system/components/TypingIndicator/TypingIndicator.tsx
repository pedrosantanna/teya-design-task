import { memo, useEffect } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../../theme';
import { SnuffleMark } from '../ChatBubble/SnuffleMark';

// The dim end of the pulse, and the stagger between dots in ms.
const DIM = 0.3;
const STAGGER = 150;

function Dot({ value }: { value: SharedValue<number> }) {
  const style = useAnimatedStyle(() => ({ opacity: value.get() }));
  return <Animated.View style={[styles.dot, style]} />;
}

export type TypingIndicatorProps = { gap?: 'none' | 'sameSender' | 'newSender' };

/** Three dots in a Snuffle bubble, shown when a reply takes more than about 300 ms. */
export const TypingIndicator = memo(function TypingIndicator({ gap = 'none' }: TypingIndicatorProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const a = useSharedValue(reduceMotion ? 0.5 : DIM);
  const b = useSharedValue(reduceMotion ? 0.5 : DIM);
  const c = useSharedValue(reduceMotion ? 0.5 : DIM);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Snuffle is writing');
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const fade = theme.spring.fade;
    const pulse = () => withRepeat(withSequence(withSpring(1, fade), withSpring(DIM, fade)), -1);
    a.set(pulse());
    b.set(withDelay(STAGGER, pulse()));
    c.set(withDelay(STAGGER * 2, pulse()));
  }, [reduceMotion, a, b, c, theme.spring.fade]);

  return (
    <View style={styles.row(gap)} accessible accessibilityLabel="Snuffle is writing">
      <SnuffleMark />
      <View style={styles.bubble}>
        <Dot value={a} />
        <Dot value={b} />
        <Dot value={c} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: (gap: 'none' | 'sameSender' | 'newSender') => ({
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.space[2],
    marginTop: gap === 'none' ? 0 : gap === 'sameSender' ? theme.space[3] : theme.space[6],
  }),
  bubble: {
    ...cornerCurve,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1],
    borderRadius: theme.radius.bubble,
    paddingVertical: theme.inset.bubbleVertical,
    paddingHorizontal: theme.inset.bubbleHorizontal,
    height: theme.type.body.lineHeight + theme.inset.bubbleVertical * 2,
    backgroundColor: theme.color.muted,
  },
  dot: {
    width: theme.size.dot,
    height: theme.size.dot,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.mutedForeground,
  },
}));
