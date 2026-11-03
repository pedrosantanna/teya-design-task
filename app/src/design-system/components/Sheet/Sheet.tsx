// The sheet (components.md, Sheet; iOS 26 patterns): medium and large detents, Close on the left, an optional
// Confirm on the right, and a footer (Buy) pinned at the bottom. On iOS and the web the medium detent floats
// inset in glass with every corner rounded, and the large detent anchors to the screen edges, opaque, with the
// top corners rounded; Android keeps the Material modal bottom sheet with a drag handle and the scrim. A sheet
// can grow from what opened it (`origin`, a ZoomOrigin id). Built on Reanimated and Gesture Handler, so the
// drag and the springs run on the UI thread, and presented through the root portal so it stays inside the
// phone frame on the web.
import { useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { AccessibilityInfo, Platform, Pressable, ScrollView, View, findNodeHandle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface, useGlass } from '../../internal/FloatingSurface';
import { measureOrigin, measureView, type Rect, type ViewRef } from '../../internal/origins';
import { PortalHost, Portal } from '../../internal/Portal';
import { ScrollEdge } from '../../internal/ScrollEdge';
import { cornerCurve } from '../../theme';
import { CloseButton } from '../CloseButton/CloseButton';
import { ConfirmButton } from '../ConfirmButton/ConfirmButton';
import { Text } from '../Text/Text';

/** Hosts sheets and other overlays. Put it once near the root, inside the app's frame. */
export const SheetProvider = PortalHost;

export type SheetDetent = 'medium' | 'large';

export type SheetProps = {
  open: boolean;
  /** Called once the sheet has gone: a drag down, Close, the scrim or the escape gesture. */
  onClose: () => void;
  title: string;
  /** headline (default): Switzer 600 at 17, centred between Close and Confirm, as iOS sheets title themselves.
   *  displayName: the sheet's subject is a shop (the details sheet), so its name is content: Gambetta 26,
   *  left-aligned under the bar, and the bar carries `barTitle` in Headline (typography.md). */
  titleVariant?: 'headline' | 'displayName';
  /** With `titleVariant="displayName"`: the bar's own title in Headline, what the sheet does ("Buy"). */
  barTitle?: string;
  /** Opaque in the `sheet` colour at every detent, never glass: sheets of rows over photos (the place and the
   *  account sheets), where glass would let the photos smear through. */
  opaque?: boolean;
  children: ReactNode;
  /** Pinned at the bottom above the safe area: the Buy button. */
  footer?: ReactNode;
  /** Detents the sheet can rest at; it opens at the first unless `initialDetent` says otherwise. */
  detents?: SheetDetent[];
  initialDetent?: SheetDetent;
  /** Blocks dismissing, e.g. while Buy is loading. */
  dismissible?: boolean;
  /** Confirm at the top right: the tinted checkmark on iOS and the web, "Done" on Android. */
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  /** A ZoomOrigin id: the sheet grows from that view and shrinks back into it on Close. */
  origin?: string;
};

// A drag ending faster than this (points per second) counts as a flick toward the next detent.
const FLICK_VELOCITY = 800;

export function Sheet({
  open,
  onClose,
  title,
  titleVariant = 'headline',
  barTitle,
  opaque = false,
  children,
  footer,
  detents = ['medium', 'large'],
  initialDetent,
  dismissible = true,
  onConfirm,
  confirmLabel,
  confirmDisabled,
  origin,
}: SheetProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const titleRef = useRef<ComponentRef<typeof View>>(null);
  const overlayRef = useRef<ViewRef>(null);
  const [mounted, setMounted] = useState(open);
  const reduceMotion = useReducedMotion();
  const glass = useGlass() && !opaque;
  const floating = theme.platform === 'ios';
  const inContent = titleVariant === 'displayName';

  // `h` is the visible height: a rest is a detent's height; below the smallest rest the sheet slides down instead.
  const heightOf = (d: SheetDetent) => frame.height * (d === 'large' ? theme.layout.sheetLargeDetent : theme.layout.sheetMediumDetent);
  const rests = detents.map(heightOf);
  const minRest = Math.min(...rests);
  const largeH = heightOf('large');
  const mediumH = heightOf('medium');
  const start = heightOf(initialDetent ?? detents[0]);
  const h = useSharedValue(0);
  // Zoom from the origin: 0 at the origin's rectangle, 1 at rest.
  const z = useSharedValue(1);
  const from = useSharedValue<Rect | null>(null);
  const smooth = theme.spring.smooth;
  const margin = floating ? theme.space[2] : 0;

  const finishClose = () => {
    setMounted(false);
    onClose();
  };

  // Mount as soon as `open` turns on (state adjusted during render); unmount after the closing spring.
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (open) {
      let cancelled = false;
      // The origin and the overlay are measured in the same window space; the difference places the zoom.
      Promise.all([reduceMotion ? null : measureOrigin(origin), measureView(overlayRef.current)]).then(([rect, host]) => {
        if (cancelled) return;
        if (rect && host) {
          from.set({ x: rect.x - host.x, y: rect.y - host.y, width: rect.width, height: rect.height });
          z.set(0);
          h.set(start);
          z.set(withSpring(1, smooth));
        } else {
          from.set(null);
          z.set(1);
          h.set(reduceMotion ? start : 0);
          if (!reduceMotion) h.set(withSpring(start, smooth));
        }
      });
      // Focus moves to the sheet's title on open (components.md). React Native Web has no findNodeHandle:
      // there the ref is the DOM node, focused directly.
      const titleNode = titleRef.current;
      if (titleNode && Platform.OS === 'web') (titleNode as unknown as { focus?: () => void }).focus?.();
      else if (titleNode) {
        const node = findNodeHandle(titleNode);
        if (node) AccessibilityInfo.setAccessibilityFocus(node);
      }
      return () => {
        cancelled = true;
      };
    } else if (mounted) {
      if (from.get()) z.set(withSpring(0, smooth, (done) => done && scheduleOnRN(setMounted, false)));
      else h.set(withSpring(0, smooth, (done) => done && scheduleOnRN(setMounted, false)));
    }
  }, [open, start, smooth, h, z, from, mounted, origin, reduceMotion]);

  const dismiss = () => {
    if (!dismissible) return;
    if (from.get()) z.set(withSpring(0, smooth, (done) => done && scheduleOnRN(finishClose)));
    else h.set(withSpring(0, smooth, (done) => done && scheduleOnRN(finishClose)));
  };

  const confirm = () => {
    onConfirm?.();
  };

  const startH = useSharedValue(0);
  const pan = Gesture.Pan()
    .onBegin(() => {
      startH.set(h.get());
    })
    .onChange((e) => {
      const next = startH.get() - e.translationY;
      // Rubber band above the large detent.
      h.set(next > largeH ? largeH + (next - largeH) / 4 : Math.max(0, next));
    })
    .onEnd((e) => {
      // A drag down dismisses straight down, not back into the origin.
      from.set(null);
      z.set(1);
      const projected = h.get() - e.velocityY * 0.1;
      const targets = dismissible ? [...rests, 0] : rests;
      let target = targets.reduce((best, t) => (Math.abs(t - projected) < Math.abs(best - projected) ? t : best), targets[0]);
      if (dismissible && e.velocityY > FLICK_VELOCITY && h.get() < minRest + 1) target = 0;
      const closing = target === 0;
      h.set(withSpring(target, { ...smooth, velocity: -e.velocityY }, (done) => done && closing && scheduleOnRN(finishClose)));
    });

  // Floating at medium (inset, every corner round), anchored at large (edge to edge, top corners only).
  const anchored = (v: number) => {
    'worklet';
    if (!floating) return 1;
    return rests.length === 1 && rests[0] === mediumH ? 0 : interpolate(v, [mediumH, largeH], [0, 1], Extrapolation.CLAMP);
  };
  const panelStyle = useAnimatedStyle(() => {
    const v = h.get();
    const t = anchored(v);
    const inset = margin * (1 - t);
    const visible = Math.max(v, minRest);
    const slide = Math.max(0, minRest - v);
    const rect = from.get();
    const zoom = z.get();
    const width = frame.width - 2 * inset;
    let tx = 0;
    let ty = slide;
    let scale = 1;
    if (rect && zoom < 1) {
      const restTop = frame.height - inset - visible;
      tx = (rect.x - inset) * (1 - zoom);
      ty = (rect.y - restTop) * (1 - zoom);
      scale = 1 + (rect.width / width - 1) * (1 - zoom);
    }
    return {
      left: inset,
      right: inset,
      bottom: inset,
      height: visible,
      borderBottomLeftRadius: theme.radius.sheet * (1 - t),
      borderBottomRightRadius: theme.radius.sheet * (1 - t),
      opacity: rect ? interpolate(zoom, [0, 0.35], [0, 1], Extrapolation.CLAMP) : 1,
      transform: [{ translateX: tx }, { translateY: ty }, { scale }],
    };
  });
  // The glass shows at medium and gives way to the opaque surface toward large.
  const opaqueStyle = useAnimatedStyle(() => ({ opacity: floating && glass ? anchored(h.get()) : 1 }));
  const scrimStyle = useAnimatedStyle(() => {
    const v = Math.min(h.get(), largeH) * z.get();
    // iOS and the web dim only toward the large detent; Android dims at every detent.
    if (floating) return { opacity: interpolate(v, [mediumH, largeH], [0, theme.state.scrim], Extrapolation.CLAMP) };
    return { opacity: interpolate(v, [0, minRest], [0, theme.state.scrim], Extrapolation.CLAMP) };
  });

  if (!mounted) return null;

  return (
    <Portal>
      <View ref={overlayRef} collapsable={false} style={styles.overlay} accessibilityViewIsModal>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={dismiss} style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.scrim, scrimStyle]} />
        </Pressable>
        <Animated.View style={[styles.panel, panelStyle]} onAccessibilityEscape={dismiss}>
          {floating && glass ? <FloatingSurface shadow={false} style={StyleSheet.absoluteFill} /> : null}
          <Animated.View pointerEvents="none" style={[styles.opaque, opaqueStyle]} />
          <GestureDetector gesture={pan}>
            <View>
              <View style={styles.grabberArea}>
                <View style={styles.grabber} />
              </View>
              <View style={styles.header}>
                <CloseButton onPress={dismissible ? dismiss : undefined} />
                {inContent ? (
                  <View style={styles.title} importantForAccessibility="no" accessibilityElementsHidden>
                    {barTitle ? (
                      <Text variant="headline" numberOfLines={1} align="center">
                        {barTitle}
                      </Text>
                    ) : null}
                  </View>
                ) : (
                  <View ref={titleRef} accessible focusable={Platform.OS === 'web'} accessibilityRole="header" style={styles.title}>
                    <Text variant="headline" numberOfLines={1} align="center">
                      {title}
                    </Text>
                  </View>
                )}
                {onConfirm ? (
                  <ConfirmButton onPress={confirm} label={confirmLabel} disabled={confirmDisabled} />
                ) : (
                  <View style={styles.balance} />
                )}
              </View>
            </View>
          </GestureDetector>
          <ScrollView
            style={styles.fill}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content(footer ? theme.size.button.large + theme.space[6] + insets.bottom : insets.bottom)}
          >
            {inContent ? (
              <View ref={titleRef} accessible focusable={Platform.OS === 'web'} accessibilityRole="header">
                <Text variant="displayName" numberOfLines={2}>
                  {title}
                </Text>
              </View>
            ) : null}
            {children}
          </ScrollView>
          {footer ? (
            <>
              {/* Drawn from the sheet's own colour, so the fade never shows a band of another ground. */}
              <ScrollEdge edge="bottom" fill="sheet" height={theme.size.button.large + theme.space[6] + insets.bottom + theme.space[4]} />
              <View style={styles.footer(insets.bottom)}>{footer}</View>
            </>
          ) : null}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create((theme) => ({
  overlay: { ...StyleSheet.absoluteFillObject },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.scrim },
  panel: {
    ...cornerCurve,
    position: 'absolute',
    transformOrigin: 'left top',
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    overflow: 'hidden',
  },
  // The sheet's ground: Background in light mode, #1C1612 in dark so Card rows (#2B2420) still separate.
  opaque: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.sheet },
  fill: { flex: 1 },
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
    paddingHorizontal: theme.space[3],
    paddingBottom: theme.space[2],
    gap: theme.space[2],
  },
  title: { flex: 1 },
  balance: { width: theme.hit.min },
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
  }),
}));
