import ArrowExpand01Icon from '@hugeicons/core-free-icons/ArrowExpand01Icon';
import * as Brightness from 'expo-brightness';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { memo, useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

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
  const value = qrValue ?? code;
  const smallQr = theme.size.thumb.request * 2;
  // The QR shrinks first so the code keeps one line at every text size (components.md).
  const largeQr = Math.min(frame.width - theme.space[8] * 2, frame.height / 2);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Collection code, ${spokenCode(code)}`}
        accessibilityHint="Opens the code full screen"
        onPress={() => setEnlarged(true)}
        style={styles.block}
      >
        <Text variant="caption1" color="mutedForeground" align="center">
          Collection code · show at the counter
        </Text>
        <Text variant="title1" align="center" numberOfLines={1}>
          {code.split('').join(' ')}
        </Text>
        <View style={styles.qr} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <QRCode value={value} size={smallQr} color={theme.color.codeInk} backgroundColor={theme.color.codeSurface} />
        </View>
        <View style={styles.hint}>
          <Icon icon={ArrowExpand01Icon} size="caption1" color="tint" />
          <Text variant="caption1" color="tint">
            Tap to enlarge
          </Text>
        </View>
      </Pressable>
      {enlarged ? (
        // Presented through the root portal so it stays inside the phone frame on the web.
        <Portal>
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.full(insets.top, insets.bottom)} accessibilityViewIsModal>
            <View style={styles.closeRow}>
              <CloseButton onPress={() => setEnlarged(false)} />
            </View>
            <View style={styles.centre}>
              <Text variant="caption1" color="mutedForeground" align="center">
                Collection code · show at the counter
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
    gap: theme.space[2],
    padding: theme.inset.card,
    borderRadius: theme.radius.card,
    backgroundColor: theme.color.card,
  },
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
