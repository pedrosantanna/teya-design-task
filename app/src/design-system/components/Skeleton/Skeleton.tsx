// Skeletons (states.md): copy the shape of what they stand for, appear only after about 300 ms and fade in
// with spring.fade. A slow pulse in Muted, still with Reduce Motion.
import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withRepeat, withSequence, withSpring } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve, screenMargin } from '../../theme';
import { tileWidth } from '../ShopTile/ShopTile';

const APPEAR_AFTER_MS = 300;
const PULSE_LOW = 0.55;

export type SkeletonProps = {
  /** tileLarge / tileMedium: Nearby tiles with two text lines. row: a request row. card: an order or answer card. */
  variant: 'tileLarge' | 'tileMedium' | 'row' | 'card';
  contentWidth?: number;
  /** For the gallery: show at once. */
  immediate?: boolean;
};

function Bone({ style }: { style: object }) {
  return <View style={[styles.bone, style]} />;
}

export const Skeleton = memo(function Skeleton({ variant, contentWidth, immediate = false }: SkeletonProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(0);
  useEffect(() => {
    const fade = theme.spring.fade;
    const appear = withSpring(1, fade);
    const pulse = reduceMotion ? appear : withSequence(appear, withRepeat(withSequence(withSpring(PULSE_LOW, theme.spring.status), withSpring(1, theme.spring.status)), -1));
    opacity.set(immediate ? pulse : withDelay(APPEAR_AFTER_MS, pulse));
  }, [immediate, reduceMotion, opacity, theme.spring.fade, theme.spring.status]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.get() }));
  const content = contentWidth ?? frame.width - 2 * screenMargin(theme, frame.width);

  let body;
  if (variant === 'tileLarge' || variant === 'tileMedium') {
    const width = tileWidth(theme, content, variant === 'tileLarge' ? 'large' : 'medium');
    body = (
      <View style={styles.tile(width)}>
        <Bone style={styles.photo} />
        <Bone style={styles.line('70%', theme.type.headline.fontSize)} />
        <Bone style={styles.line('50%', theme.type.footnote.fontSize)} />
      </View>
    );
  } else if (variant === 'row') {
    body = (
      <View style={styles.row}>
        <Bone style={styles.thumb} />
        <View style={styles.lines}>
          <Bone style={styles.line('60%', theme.type.headline.fontSize)} />
          <Bone style={styles.line('90%', theme.type.subheadline.fontSize)} />
          <Bone style={styles.line('35%', theme.type.caption1.fontSize)} />
        </View>
      </View>
    );
  } else {
    body = (
      <View style={styles.card}>
        <Bone style={styles.line('45%', theme.type.caption1.fontSize)} />
        <Bone style={styles.line('75%', theme.type.subheadline.fontSize)} />
        <Bone style={styles.line('30%', theme.type.headline.fontSize)} />
      </View>
    );
  }

  return (
    <Animated.View style={style} accessible accessibilityLabel="Loading" accessibilityRole="progressbar">
      {body}
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  bone: { ...cornerCurve, backgroundColor: theme.color.muted },
  tile: (width: number) => ({ width, gap: theme.space[2] }),
  photo: { width: '100%', aspectRatio: 4 / 3, borderRadius: theme.radius.bubble },
  line: (width: `${number}%`, height: number) => ({ width, height, borderRadius: theme.radius.full }),
  row: { flexDirection: 'row', gap: theme.space[3], padding: theme.space[4] },
  thumb: { width: theme.size.thumb.request, height: theme.size.thumb.request, borderRadius: theme.radius.inner },
  lines: { flex: 1, gap: theme.gap.inside },
  card: { ...cornerCurve, gap: theme.gap.block, padding: theme.inset.card, borderRadius: theme.radius.card, backgroundColor: theme.color.card },
}));
