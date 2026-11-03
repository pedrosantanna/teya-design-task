// The details sheet (components.md, Sheet): a page sheet with a grabber and Close, medium and large
// detents, Buy pinned above the safe area. Built on Reanimated and Gesture Handler, so the drag and the
// springs run on the UI thread, and presented through the root portal so it stays inside the phone frame
// on the web. iOS: page sheet with a grabber. Android: Material modal bottom sheet with a drag handle.
// Both dim what is behind with the 40% scrim.
import { useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { AccessibilityInfo, Platform, Pressable, ScrollView, View, findNodeHandle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, Extrapolation } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { PortalHost, Portal } from '../../internal/Portal';
import { cornerCurve } from '../../theme';
import { CloseButton } from '../CloseButton/CloseButton';
import { Text } from '../Text/Text';

/** Hosts sheets and other overlays. Put it once near the root, inside the app's frame. */
export const SheetProvider = PortalHost;

export type SheetDetent = 'medium' | 'large';

export type SheetProps = {
  open: boolean;
  /** Called once the sheet has gone: a drag down, Close, the scrim or the escape gesture. */
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Pinned at the bottom above the safe area: the Buy button. */
  footer?: ReactNode;
  /** Detents the sheet can rest at; it opens at the first unless `initialDetent` says otherwise. */
  detents?: SheetDetent[];
  initialDetent?: SheetDetent;
  /** Blocks dismissing, e.g. while Buy is loading. */
  dismissible?: boolean;
};

// A drag ending faster than this (points per second) counts as a flick toward the next detent.
const FLICK_VELOCITY = 800;

export function Sheet({ open, onClose, title, children, footer, detents = ['medium', 'large'], initialDetent, dismissible = true }: SheetProps) {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const titleRef = useRef<ComponentRef<typeof View>>(null);
  const [mounted, setMounted] = useState(open);

  // Panel height is the large detent; translateY = 0 rests at large, more shows less, `panel` is closed.
  const panel = frame.height * theme.layout.sheetLargeDetent;
  const rests = detents.map((d) => panel - frame.height * (d === 'large' ? theme.layout.sheetLargeDetent : theme.layout.sheetMediumDetent));
  const start = rests[Math.max(0, detents.indexOf(initialDetent ?? detents[0]))];
  const y = useSharedValue(panel);
  const smooth = theme.spring.smooth;

  const finishClose = () => {
    setMounted(false);
    onClose();
  };

  // Mount as soon as `open` turns on (state adjusted during render); unmount after the closing spring.
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (open) {
      y.set(withSpring(start, smooth));
      // Focus moves to the sheet's title on open (components.md). React Native Web has no findNodeHandle:
      // there the ref is the DOM node, focused directly.
      const title = titleRef.current;
      if (title && Platform.OS === 'web') (title as unknown as { focus?: () => void }).focus?.();
      else if (title) {
        const node = findNodeHandle(title);
        if (node) AccessibilityInfo.setAccessibilityFocus(node);
      }
    } else if (mounted) {
      y.set(withSpring(panel, smooth, (done) => done && scheduleOnRN(setMounted, false)));
    }
  }, [open, start, panel, smooth, y, mounted]);

  const dismiss = () => {
    if (!dismissible) return;
    y.set(withSpring(panel, smooth, (done) => done && scheduleOnRN(finishClose)));
  };

  const origin = useSharedValue(0);
  const pan = Gesture.Pan()
    .onBegin(() => {
      origin.set(y.get());
    })
    .onChange((e) => {
      const next = origin.get() + e.translationY;
      // Rubber band above the large detent.
      y.set(next < 0 ? next / 4 : next);
    })
    .onEnd((e) => {
      const projected = y.get() + e.velocityY * 0.1;
      const targets = dismissible ? [...rests, panel] : rests;
      let target = targets.reduce((best, t) => (Math.abs(t - projected) < Math.abs(best - projected) ? t : best), targets[0]);
      if (dismissible && e.velocityY > FLICK_VELOCITY && y.get() > Math.max(...rests) - 1) target = panel;
      const closing = target === panel;
      y.set(withSpring(target, { ...smooth, velocity: e.velocityY }, (done) => done && closing && scheduleOnRN(finishClose)));
    });

  const panelStyle = useAnimatedStyle(() => ({ transform: [{ translateY: Math.max(-theme.space[6], y.get()) }] }));
  const scrimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(y.get(), [panel, Math.max(...rests)], [0, theme.state.scrim], Extrapolation.CLAMP),
  }));
  // The footer stays at the bottom of the screen whatever the detent.
  const footerStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -Math.max(0, y.get()) }] }));

  if (!mounted) return null;

  return (
    <Portal>
      <View style={styles.overlay} accessibilityViewIsModal>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={dismiss} style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.scrim, scrimStyle]} />
        </Pressable>
        <Animated.View style={[styles.panel(panel), panelStyle]} onAccessibilityEscape={dismiss}>
          <GestureDetector gesture={pan}>
            <View>
              <View style={styles.grabberArea}>
                <View style={styles.grabber} />
              </View>
              <View style={styles.header}>
                <CloseButton onPress={dismissible ? dismiss : undefined} />
                <View ref={titleRef} accessible focusable={Platform.OS === 'web'} accessibilityRole="header" style={styles.title}>
                  <Text variant="headline" numberOfLines={1} align="center">
                    {title}
                  </Text>
                </View>
                <View style={styles.balance} />
              </View>
            </View>
          </GestureDetector>
          <ScrollView contentContainerStyle={styles.content(footer ? theme.size.button.large + theme.space[6] + insets.bottom : insets.bottom)}>
            {children}
          </ScrollView>
          {footer ? (
            <Animated.View style={[styles.footer(insets.bottom), footerStyle]}>{footer}</Animated.View>
          ) : null}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create((theme) => ({
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.scrim },
  panel: (height: number) => ({
    ...cornerCurve,
    height,
    backgroundColor: theme.color.background,
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    overflow: 'hidden',
  }),
  grabberArea: { alignItems: 'center', paddingTop: theme.space[2], paddingBottom: theme.space[1] },
  // iOS grabber 36 × 4; the Material drag handle is 32 × 4.
  grabber: {
    width: theme.platform === 'ios' ? theme.size.button.compact : theme.space[7],
    height: theme.space[1],
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.mutedForeground,
    opacity: theme.state.disabledContent,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.inset.sheet,
    paddingBottom: theme.space[2],
    gap: theme.space[2],
  },
  title: { flex: 1 },
  balance: { width: theme.size.close },
  content: (bottom: number) => ({
    paddingHorizontal: theme.inset.sheet,
    paddingTop: theme.space[2],
    paddingBottom: bottom + theme.inset.sheet,
    gap: theme.gap.block,
  }),
  footer: (bottom: number) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.inset.sheet,
    paddingTop: theme.space[3],
    paddingBottom: bottom + theme.space[3],
    backgroundColor: theme.color.background,
  }),
}));
