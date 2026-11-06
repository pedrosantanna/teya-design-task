// Snuffle sniffing (mark.md, Splash; illustrations.md): the glyph of SnuffleMark with its awning stripes swaying like
// whiskers and its nose twitching up, in short bursts with a pause between, while Snuffle asks the shops. The
// stripes and the nose are their own layers over a still face, moved by one looping clock on the UI thread, as the
// splash is. Colours are SnuffleMark's. With Reduce Motion the glyph stays still.
import { memo, useEffect, type ReactNode } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import {
  GLYPH_ASPECT,
  GLYPH_EAR,
  GLYPH_VIEW_BOX,
} from "../SnuffleMark/SnuffleMark";

const [VB_X, VB_Y, VB_W, VB_H] = [-57, 43, 114, 84];

// The awning's five stripes, left to right: path, centre x, whether it carries the soft tone.
const STRIPES = [
  {
    d: "M-42.5 101 A8 8 0 0 1 -34.5 93 H-25.5 V119.1 A8.5 6.9 0 0 1 -42.5 119.1 Z",
    cx: -34,
    soft: false,
  },
  {
    d: "M-25.5 93 H-8.5 V119.1 A8.5 6.9 0 0 1 -25.5 119.1 Z",
    cx: -17,
    soft: true,
  },
  { d: "M-8.5 93 H8.5 V119.1 A8.5 6.9 0 0 1 -8.5 119.1 Z", cx: 0, soft: false },
  { d: "M8.5 93 H25.5 V119.1 A8.5 6.9 0 0 1 8.5 119.1 Z", cx: 17, soft: true },
  {
    d: "M25.5 93 H34.5 A8 8 0 0 1 42.5 101 V119.1 A8.5 6.9 0 0 1 25.5 119.1 Z",
    cx: 34,
    soft: false,
  },
] as const;
const AWNING_TOP = 93;

// The loop in ms: three sniffs, then a pause. The stripes follow the nose a little later, one after another.
const CYCLE = 2600;
const SNIFF = 300;
const SNIFFS = 3;
const STRIPE_LAG = 45;
const STRIPE_RING = 450;
// Units the nose lifts and the most it grows, and the stripes' sway in degrees.
const LIFT = 2.5;
const GROW = 0.1;
const SWAY = 3.5;

/** 0 → 1 → 0 over `ms` from `start`: one sniff. */
function pulse(clock: number, start: number, ms: number): number {
  "worklet";
  const p = (clock - start) / ms;
  if (p <= 0 || p >= 1) return 0;
  return Math.sin(Math.PI * p);
}

/** The nose's lift over the whole burst. */
function sniffAt(clock: number): number {
  "worklet";
  let v = 0;
  for (let i = 0; i < SNIFFS; i++)
    v = Math.max(v, pulse(clock, i * SNIFF, SNIFF * 0.85));
  return v;
}

function Layer({
  width,
  height,
  style,
  children,
}: {
  width: number;
  height: number;
  style?: ReturnType<typeof useAnimatedStyle>;
  children: ReactNode;
}) {
  return (
    <Animated.View style={[styles.layer, style]} pointerEvents="none">
      <Svg
        width={width}
        height={height}
        viewBox={GLYPH_VIEW_BOX}
        style={styles.visible}
      >
        {children}
      </Svg>
    </Animated.View>
  );
}

function Stripe({
  index,
  clock,
  width,
  height,
  fill,
  still,
}: {
  index: number;
  clock: SharedValue<number>;
  width: number;
  height: number;
  fill: string;
  still: boolean;
}) {
  const stripe = STRIPES[index];
  const origin = `${((stripe.cx - VB_X) / VB_W) * 100}% ${((AWNING_TOP - VB_Y) / VB_H) * 100}%`;
  const style = useAnimatedStyle(() => {
    if (still) return {};
    const ms = clock.get() - index * STRIPE_LAG;
    const burst = SNIFF * SNIFFS + STRIPE_RING;
    const envelope =
      ms > 0 && ms < burst ? Math.sin((Math.PI * ms) / burst) : 0;
    const angle = SWAY * envelope * Math.sin((ms / SNIFF) * 2 * Math.PI);
    return { transformOrigin: origin, transform: [{ rotate: `${angle}deg` }] };
  });
  return (
    <Layer width={width} height={height} style={style}>
      <Path d={stripe.d} fill={fill} />
    </Layer>
  );
}

const NOSE_ORIGIN = `${((0 - VB_X) / VB_W) * 100}% ${((94.5 - VB_Y) / VB_H) * 100}%`;

export type SnuffleSniffProps = {
  /** The glyph's width. Defaults to the width of a medium illustration (88), where the scooter used to ride. */
  width?: number;
  /** Stops the loop and leaves the glyph still. */
  paused?: boolean;
  /** Takes its place on the screen (default) or leaves it: fades out and gives the space back with spring.smooth,
   *  so what is below moves up instead of jumping. Under Reduce Motion it fades quickly. */
  active?: boolean;
};

export const SnuffleSniff = memo(function SnuffleSniff({
  width = 88,
  paused = false,
  active = true,
}: SnuffleSniffProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const still = reduceMotion || paused || !active;
  const height = width * GLYPH_ASPECT;
  const unit = width / VB_W;
  const clock = useSharedValue(0);
  useEffect(() => {
    if (still) {
      clock.set(0);
      return;
    }
    clock.set(
      withRepeat(
        withTiming(CYCLE, { duration: CYCLE, easing: Easing.linear }),
        -1,
        false,
      ),
    );
  }, [still, clock]);

  // The space it takes: the glyph and the gap under it, which it gives back as it leaves.
  const room = height + theme.space[2];
  const presence = useSharedValue(active ? 1 : 0);
  useEffect(() => {
    presence.set(
      withSpring(
        active ? 1 : 0,
        reduceMotion ? theme.spring.fade : theme.spring.smooth,
      ),
    );
  }, [active, reduceMotion, presence, theme.spring.fade, theme.spring.smooth]);
  const slot = useAnimatedStyle(() => ({
    height: room * presence.get(),
    opacity: Math.min(1, presence.get()),
  }));

  const nose = useAnimatedStyle(() => {
    if (still) return {};
    const s = sniffAt(clock.get());
    return {
      transformOrigin: NOSE_ORIGIN,
      transform: [{ translateY: -LIFT * unit * s }, { scale: 1 + GROW * s }],
    };
  });

  const ink = theme.color.foreground;
  const soft = theme.color.mutedForeground;

  return (
    <Animated.View
      style={[styles.slot, slot]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.box(width, height)}>
        <Layer width={width} height={height}>
          <Path d={GLYPH_EAR} transform="translate(-85.306 0)" fill={ink} />
          <G transform="scale(-1 1)">
            <Path d={GLYPH_EAR} transform="translate(-85.306 0)" fill={ink} />
          </G>
          <Circle cx={-15} cy={75} r={5} fill={ink} />
          <Circle cx={15} cy={75} r={5} fill={ink} />
        </Layer>
        {STRIPES.map((s, i) => (
          <Stripe
            key={s.cx}
            index={i}
            clock={clock}
            width={width}
            height={height}
            fill={s.soft ? soft : ink}
            still={still}
          />
        ))}
        <Layer width={width} height={height} style={nose}>
          <Ellipse cx={0} cy={94.5} rx={12} ry={9.5} fill={ink} />
        </Layer>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create(() => ({
  slot: { alignItems: "center", overflow: "hidden" },
  box: (width: number, height: number) => ({ width, height }),
  layer: { ...StyleSheet.absoluteFillObject },
  visible: { overflow: "visible" },
}));
