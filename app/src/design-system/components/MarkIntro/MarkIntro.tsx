// The splash: Snuffle's mark builds itself on the brand ground (motion.md, Splash; mark.md). First only the
// awning shows, rolled up at the top; it comes down and unrolls stripe by stripe, each with a short sway in the
// wind and a small overshoot. Then the ears, eyes and nose appear and the dog blinks twice. About 1.6 s, then the
// mark fades on the ground and the ground fades to the screen under it. One clock drives every part on the UI
// thread, so the frames are the same on every run; with Reduce Motion the clock starts at the end. The final frame
// is the glyph of SnuffleMark in the splash colours, the same as the native splash image; the build starts from the rolled
// awning, so the face drops out for a moment when the native splash hands over.
import { memo, useEffect, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import { snuffleMarkWidth } from '../SnuffleMark/SnuffleMark';

const EAR =
  'M61.8465 52.1482C62.5035 50.0934 61.2616 47.9309 59.1384 47.549C41.2127 44.3246 26.6877 55.4777 29.3064 76.4271C30.7064 87.6271 43.3064 90.4271 48.9064 79.2271C53.8695 69.3009 58.8326 61.5741 61.8465 52.1482Z';

// The same view box as SnuffleMark: the glyph's bounds in the source SVG's units.
const VIEW_BOX = '-57 43 114 84';
const [VB_X, VB_Y, VB_W, VB_H] = [-57, 43, 114, 84];
const ASPECT = VB_H / VB_W;

// The five stripes of the awning, left to right: path, centre x, whether it carries the soft tone.
const STRIPES = [
  { d: 'M-42.5 101 A8 8 0 0 1 -34.5 93 H-25.5 V119.1 A8.5 6.9 0 0 1 -42.5 119.1 Z', cx: -34, soft: false },
  { d: 'M-25.5 93 H-8.5 V119.1 A8.5 6.9 0 0 1 -25.5 119.1 Z', cx: -17, soft: true },
  { d: 'M-8.5 93 H8.5 V119.1 A8.5 6.9 0 0 1 -8.5 119.1 Z', cx: 0, soft: false },
  { d: 'M8.5 93 H25.5 V119.1 A8.5 6.9 0 0 1 8.5 119.1 Z', cx: 17, soft: true },
  { d: 'M25.5 93 H34.5 A8 8 0 0 1 42.5 101 V119.1 A8.5 6.9 0 0 1 25.5 119.1 Z', cx: 34, soft: false },
] as const;
const AWNING_TOP = 93;

// The timeline in ms. Everything below is read from the one clock.
/** Length of the build, from the rolled awning to the second blink. */
export const MARK_INTRO_MS = 1600;
const STRIPE_START = 100;
const STRIPE_STAGGER = 70;
const EARS_START = 780;
const EYES_START = 960;
const NOSE_START = 1050;
const BLINKS = [1240, 1400] as const;
const BLINK_MS = 130;
// How long the finished mark holds, then the mark fades (150) and the ground after it (200).
const HOLD_MS = 250;
const MARK_FADE_MS = 150;
const GROUND_FADE_MS = 200;

// A rolled awning is a thin bar at the top: a tenth of the stripe's height.
const ROLLED = 0.1;
// Units the awning starts above its place, and the ears start beside the face.
const DROP = 4;
const EAR_SLIDE = 8;
// Sway: peak angle in degrees, its decay and its period in seconds.
const SWAY = 7;
const SWAY_DECAY = 0.2;
const SWAY_PERIOD = 0.34;

/** A damped spring from 0 to 1 at `ms` after its start; ζ under 1 overshoots a little before it settles. */
function springAt(ms: number, zeta: number, omega: number): number {
  'worklet';
  if (ms <= 0) return 0;
  const t = ms / 1000;
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
}

/** 0 → 1 → 0 over `ms` from `start`: a blink's closing and opening. */
function triangle(clock: number, start: number, ms: number): number {
  'worklet';
  const p = (clock - start) / ms;
  if (p <= 0 || p >= 1) return 0;
  return 1 - Math.abs(2 * p - 1);
}

function pct(value: number, origin: number, span: number): string {
  return `${((value - origin) / span) * 100}%`;
}

/** One part of the glyph: a full-size view holding an SVG of the same view box, moved by its own animated style. */
function Part({ width, height, style, hidden = false, children }: { width: number; height: number; style: ReturnType<typeof useAnimatedStyle>; hidden?: boolean; children: ReactNode }) {
  // `hidden`: the part is invisible until its animated opacity takes over, so the first frame never shows it whole.
  return (
    <Animated.View style={[styles.layer, hidden && styles.hidden, style]} pointerEvents="none">
      <Svg width={width} height={height} viewBox={VIEW_BOX} style={styles.visible}>
        {children}
      </Svg>
    </Animated.View>
  );
}

function Ear({ side, clock, width, height, fill, still }: { side: 1 | -1; clock: SharedValue<number>; width: number; height: number; fill: string; still: boolean }) {
  const unit = width / VB_W;
  const style = useAnimatedStyle(() => {
    if (still) return {};
    const s = springAt(clock.get() - EARS_START, 0.6, 20);
    return { opacity: Math.min(1, s * 2), transform: [{ translateX: side * EAR_SLIDE * unit * (1 - s) }] };
  });
  return (
    <Part width={width} height={height} style={style} hidden={!still}>
      {side === -1 ? (
        <Path d={EAR} transform="translate(-85.306 0)" fill={fill} />
      ) : (
        <G transform="scale(-1 1)">
          <Path d={EAR} transform="translate(-85.306 0)" fill={fill} />
        </G>
      )}
    </Part>
  );
}

function Stripe({ index, clock, width, height, fill, still }: { index: number; clock: SharedValue<number>; width: number; height: number; fill: string; still: boolean }) {
  const stripe = STRIPES[index];
  const unit = width / VB_W;
  const origin = `${pct(stripe.cx, VB_X, VB_W)} ${pct(AWNING_TOP, VB_Y, VB_H)}`;
  const style = useAnimatedStyle(() => {
    if (still) return { transformOrigin: origin };
    const ms = clock.get() - STRIPE_START - index * STRIPE_STAGGER;
    const s = springAt(ms, 0.55, 22);
    const sway = ms > 120 ? SWAY * Math.exp(-(ms - 120) / 1000 / SWAY_DECAY) * Math.sin(((ms - 120) / 1000 / SWAY_PERIOD) * 2 * Math.PI) : 0;
    return {
      transformOrigin: origin,
      transform: [{ translateY: -DROP * unit * (1 - s) }, { rotate: `${sway}deg` }, { scaleY: ROLLED + (1 - ROLLED) * s }],
    };
  });
  return (
    <Part width={width} height={height} style={style}>
      <Path d={stripe.d} fill={fill} />
    </Part>
  );
}

// Computed here because the animated styles run on the UI thread, where `pct` isn't available.
const EYES_ORIGIN = `${pct(0, VB_X, VB_W)} ${pct(75, VB_Y, VB_H)}`;
const NOSE_ORIGIN = `${pct(0, VB_X, VB_W)} ${pct(94.5, VB_Y, VB_H)}`;

type Props = {
  /** Called as the mark has faded and the ground starts to fade: the screen under it can mount and start. */
  onReveal?: () => void;
  /** Called when the ground has gone. */
  onDone?: () => void;
  /** Freeze the build at this time in ms and skip the hand-off (frames for review, the examples). */
  frozenAt?: number;
};

export const MarkIntro = memo(function MarkIntro({ onReveal, onDone, frozenAt }: Props) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const width = snuffleMarkWidth(theme, 'splash');
  const height = width * ASPECT;
  const frozen = frozenAt != null;
  const still = frozen ? frozenAt >= MARK_INTRO_MS : reduceMotion;

  const clock = useSharedValue(frozen ? frozenAt : reduceMotion ? MARK_INTRO_MS : 0);
  const markOpacity = useSharedValue(1);
  const groundOpacity = useSharedValue(1);
  useEffect(() => {
    if (frozen) return;
    const leave = () => {
      markOpacity.set(
        withDelay(
          reduceMotion ? HOLD_MS : MARK_INTRO_MS + HOLD_MS,
          withTiming(0, { duration: MARK_FADE_MS }, (finished) => {
            if (!finished) return;
            if (onReveal) scheduleOnRN(onReveal);
            groundOpacity.set(
              withTiming(0, { duration: GROUND_FADE_MS }, (done) => {
                if (done && onDone) scheduleOnRN(onDone);
              }),
            );
          }),
        ),
      );
    };
    if (!reduceMotion) clock.set(withTiming(MARK_INTRO_MS, { duration: MARK_INTRO_MS, easing: Easing.linear }));
    leave();
    // The hand-off runs once, from mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eyes = useAnimatedStyle(() => {
    if (still) return {};
    const c = clock.get();
    const s = springAt(c - EYES_START, 0.6, 24);
    const blink = Math.max(triangle(c, BLINKS[0], BLINK_MS * 2), triangle(c, BLINKS[1], BLINK_MS * 2));
    return {
      transformOrigin: EYES_ORIGIN,
      opacity: Math.min(1, s * 3),
      transform: [{ scale: 0.5 + 0.5 * s }, { scaleY: 1 - 0.9 * blink }],
    };
  });
  const nose = useAnimatedStyle(() => {
    if (still) return {};
    const s = springAt(clock.get() - NOSE_START, 0.45, 26);
    return { transformOrigin: NOSE_ORIGIN, opacity: Math.min(1, s * 3), transform: [{ scale: s }] };
  });
  const markStyle = useAnimatedStyle(() => ({ opacity: markOpacity.get() }));
  const groundStyle = useAnimatedStyle(() => ({ opacity: groundOpacity.get() }));

  const ink = theme.color.splash.ink;
  const soft = theme.color.splash.soft;

  return (
    <Animated.View style={[styles.ground, groundStyle]} pointerEvents="none">
      <Animated.View style={markStyle} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={styles.box(width, height)}>
          <Ear side={-1} clock={clock} width={width} height={height} fill={ink} still={still} />
          <Ear side={1} clock={clock} width={width} height={height} fill={ink} still={still} />
          <Part width={width} height={height} style={eyes} hidden={!still}>
            <Circle cx={-15} cy={75} r={5} fill={ink} />
            <Circle cx={15} cy={75} r={5} fill={ink} />
          </Part>
          {STRIPES.map((s, i) => (
            <Stripe key={s.cx} index={i} clock={clock} width={width} height={height} fill={s.soft ? soft : ink} still={still} />
          ))}
          <Part width={width} height={height} style={nose} hidden={!still}>
            <Ellipse cx={0} cy={94.5} rx={12} ry={9.5} fill={ink} />
          </Part>
        </View>
      </Animated.View>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  ground: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.splash.ground },
  box: (width: number, height: number) => ({ width, height }),
  layer: { ...StyleSheet.absoluteFillObject },
  hidden: { opacity: 0 },
  visible: { overflow: 'visible' },
}));
