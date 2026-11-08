import ArrowExpand01Icon from '@hugeicons/core-free-icons/ArrowExpand01Icon';
import * as Brightness from 'expo-brightness';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { memo, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { measureView, type Rect, type ViewRef } from '../../internal/origins';
import { Portal } from '../../internal/Portal';
import { cornerCurve } from '../../theme';
import { CloseButton } from '../CloseButton/CloseButton';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type CollectionCodeProps = {
  /** "K7Q2" */
  code: string;
  /** What the QR encodes; defaults to the code. */
  qrValue?: string;
  /** Opens enlarged (for the gallery and deep links). */
  initiallyEnlarged?: boolean;
  /** Controlled: whether the full-screen view is shown. Pair with `onEnlargedChange`. */
  enlarged?: boolean;
  onEnlargedChange?: (enlarged: boolean) => void;
  /** Under the code when enlarged: "2 × eclipse glasses · Paper & Co". */
  detail?: string;
  /** At the bottom when enlarged: "Paper & Co scans the code, or taps Collected on their side." */
  note?: string;
  /** Right under the code on the receipt, how long it works: "Collect by Mon 16 Nov". */
  until?: string;
  /** Under `until`, in Muted: "Full refund if you don't". */
  untilDetail?: string;
};

/** Read character by character: "K, 7, Q, 2". */
const spokenCode = (code: string) => code.split('').join(', ');

const KEEP_AWAKE_TAG = 'collection-code';

// Screen brightness goes to full while the code is enlarged and is restored on close (typography.md), and
// the screen doesn't dim or lock while it is shown (collection spec, "Readable code").
function useFullBrightness(on: boolean) {
  useEffect(() => {
    if (!on || Platform.OS === 'web') return;
    activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(() => undefined);
    return () => {
      deactivateKeepAwake(KEEP_AWAKE_TAG).catch(() => undefined);
    };
  }, [on]);
  useEffect(() => {
    if (!on || Platform.OS === 'web') return;
    let previous: number | undefined;
    let cancelled = false;
    Brightness.getBrightnessAsync()
      .then((b) => {
        previous = b;
        if (!cancelled) return Brightness.setBrightnessAsync(1);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      if (previous != null) Brightness.setBrightnessAsync(previous).catch(() => undefined);
    };
  }, [on]);
}

export const CollectionCode = memo(function CollectionCode({
  code,
  qrValue,
  initiallyEnlarged = false,
  enlarged: controlled,
  onEnlargedChange,
  detail,
  note,
  until,
  untilDetail,
}: CollectionCodeProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const [own, setOwn] = useState(initiallyEnlarged);
  const enlarged = controlled ?? own;
  const setEnlarged = (next: boolean) => {
    setOwn(next);
    onEnlargedChange?.(next);
  };
  useFullBrightness(enlarged);
  // The enlarged code zooms from the code on the receipt and back into it on close (iOS 26 patterns).
  const blockRef = useRef<ViewRef>(null);
  const fullRef = useRef<ViewRef>(null);
  const [shown, setShown] = useState(enlarged);
  const reduceMotion = useReducedMotion();
  const p = useSharedValue(0);
  const from = useSharedValue<Rect | null>(null);
  if (enlarged && !shown) setShown(true);
  useEffect(() => {
    const spring = reduceMotion ? theme.spring.fade : theme.spring.smooth;
    if (enlarged) {
      Promise.all([measureView(blockRef.current), measureView(fullRef.current)]).then(([rect, host]) => {
        from.set(rect && host && !reduceMotion ? { x: rect.x - host.x, y: rect.y - host.y, width: rect.width, height: rect.height } : null);
        p.set(withSpring(1, spring));
      });
    } else if (shown) {
      p.set(withSpring(0, spring, (done) => done && scheduleOnRN(setShown, false)));
    }
  }, [enlarged, shown, p, from, reduceMotion, theme.spring.fade, theme.spring.smooth]);
  const zoomStyle = useAnimatedStyle(() => {
    const rect = from.get();
    const v = p.get();
    if (!rect) return { opacity: v, transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }] };
    const scale = rect.width / frame.width + (1 - rect.width / frame.width) * v;
    return {
      opacity: interpolate(v, [0, 0.4], [0, 1], Extrapolation.CLAMP),
      transform: [
        { translateX: (rect.x + rect.width / 2 - frame.width / 2) * (1 - v) },
        { translateY: (rect.y + rect.height / 2 - frame.height / 2) * (1 - v) },
        { scale },
      ],
    };
  });
  const value = qrValue ?? code;
  const smallQr = theme.size.thumb.request * 2;
  // The QR shrinks first so the code keeps one line at every text size (components.md).
  const largeQr = Math.min(frame.width - theme.space[8] * 2, frame.height / 2);

  return (
    <>
      <Pressable
        ref={blockRef}
        accessibilityRole="button"
        accessibilityLabel={[`Collection code, ${spokenCode(code)}`, until, untilDetail].filter(Boolean).join(', ')}
        accessibilityHint="Opens the code full screen"
        onPress={() => setEnlarged(true)}
        style={styles.block}
      >
        {/* What to say: the label, the code and the date it works until, one tight group read together at the
            counter. What to scan: the QR and its hint, below. */}
        <View style={styles.pair}>
          <Text variant="caption1" color="mutedForeground" align="center">
            Collection code, show at the counter
          </Text>
          <Text variant="title1" align="center" numberOfLines={1}>
            {code.split('').join(' ')}
          </Text>
          {until ? (
            <Text variant="subheadlineStrong" align="center">
              {until}
            </Text>
          ) : null}
          {untilDetail ? (
            <Text variant="subheadline" color="mutedForeground" align="center">
              {untilDetail}
            </Text>
          ) : null}
        </View>
        <View style={styles.scan}>
          <View style={styles.qr} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <QRCode value={value} size={smallQr} color={theme.color.codeInk} backgroundColor={theme.color.codeSurface} />
          </View>
          <View style={styles.hint}>
            <Icon icon={ArrowExpand01Icon} size="caption1" color="tint" />
            <Text variant="caption1" color="tint">
              Tap to enlarge
            </Text>
          </View>
        </View>
      </Pressable>
      {shown ? (
        // Presented through the root portal so it stays inside the phone frame on the web.
        <Portal>
          <Animated.View ref={fullRef} collapsable={false} style={[styles.full(insets.top, insets.bottom), zoomStyle]} accessibilityViewIsModal>
            <View style={styles.closeRow}>
              <CloseButton onPress={() => setEnlarged(false)} />
            </View>
            <View style={styles.centre}>
              <Text variant="caption1" color="mutedForeground" align="center">
                Collection code, show at the counter
              </Text>
              <Text variant="code" align="center" numberOfLines={1} accessibilityLabel={spokenCode(code)}>
                {code}
              </Text>
              <View style={styles.qr} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <QRCode value={value} size={largeQr} color={theme.color.codeInk} backgroundColor={theme.color.codeSurface} />
              </View>
              {detail ? (
                <Text variant="headline" align="center">
                  {detail}
                </Text>
              ) : null}
            </View>
            {note ? (
              <Text variant="footnote" color="mutedForeground" align="center">
                {note}
              </Text>
            ) : null}
          </Animated.View>
        </Portal>
      ) : null}
    </>
  );
});

const styles = StyleSheet.create((theme) => ({
  block: {
    ...cornerCurve,
    alignItems: 'center',
    gap: theme.space[4],
    padding: theme.inset.card,
    borderRadius: theme.radius.card,
    backgroundColor: theme.color.card,
  },
  pair: { alignItems: 'center', gap: theme.space[1] },
  scan: { alignItems: 'center', gap: theme.space[2] },
  qr: {
    ...cornerCurve,
    padding: theme.space[3],
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.codeSurface,
  },
  hint: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  full: (top: number, bottom: number) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.color.background,
    paddingTop: top + theme.space[2],
    paddingBottom: bottom + theme.space[4],
    paddingHorizontal: theme.margin.screenCompact,
  }),
  closeRow: { minHeight: theme.hit.min, justifyContent: 'center' },
  centre: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.space[4] },
}));
