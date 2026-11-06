// Content that changes in place cross-fades instead of swapping: the previous content fades out over the first half of
// spring.status and the new one fades in over the second, so two labels never show over each other. Pass a `token` that changes with the content.
// Under Reduce Motion the content swaps.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type CrossFadeProps = {
  /** Changes when the content does. */
  token: string;
  children: ReactNode;
  /** Where the old content sits while it leaves, when it is wider or narrower than the new one. */
  align?: 'start' | 'end';
};

export function CrossFade({ token, children, align = 'start' }: CrossFadeProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const last = useRef({ token, children });
  const [outgoing, setOutgoing] = useState<ReactNode>(null);
  const progress = useSharedValue(1);
  useEffect(() => {
    const before = last.current;
    last.current = { token, children };
    if (before.token === token || reduceMotion) return;
    setOutgoing(before.children);
    progress.set(0);
    progress.set(
      withSpring(1, theme.spring.status, (done) => {
        if (done) scheduleOnRN(setOutgoing, null);
      }),
    );
    // Runs when the token changes; the children are read from the same render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const incoming = useAnimatedStyle(() => ({ opacity: Math.max(0, 2 * progress.get() - 1) }));
  const leaving = useAnimatedStyle(() => ({ opacity: Math.max(0, 1 - 2 * progress.get()) }));
  return (
    <View style={styles.root}>
      <Animated.View style={[styles.root, incoming]}>{children}</Animated.View>
      {outgoing ? (
        <Animated.View pointerEvents="none" style={[styles.old, align === 'end' && styles.end, leaving]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {outgoing}
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  // Shrinks inside a row, so a long label wraps or truncates instead of running past the card.
  root: { flexShrink: 1, minWidth: 0 },
  old: { ...StyleSheet.absoluteFillObject },
  end: { alignItems: 'flex-end' },
}));
