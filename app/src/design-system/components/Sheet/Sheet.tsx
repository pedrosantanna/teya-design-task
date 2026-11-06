// The sheet (components.md, Sheet; iOS 26 patterns): fit, medium and large detents, Close on the left, an optional
// Confirm on the right, and a footer (Buy) pinned at the bottom. Every sheet has the same ground: the Sheet colour,
// opaque, one tone darker than the Background in light mode (one Stone step lighter in dark), and one scrim behind
// it (color.sheetScrim at state.sheetScrim) that comes in with the sheet; a tap on it dismisses. On iOS and the web
// the medium detent floats inset with every corner rounded and the glass rim, and the large detent anchors to the
// screen edges with the top corners rounded; Android keeps the Material modal bottom sheet with a drag handle. A sheet
// can grow from what opened it (`origin`, a ZoomOrigin id). Built on Reanimated and Gesture Handler, so the
// drag and the springs run on the UI thread, and presented through the root portal so it stays inside the
// phone frame on the web. The `fit` detent (iOS 16 custom detent, a Material bottom sheet wrapping its content)
// opens at the height of the header, the content and the bottom safe area, up to the large detent, and follows the
// content while it changes.
import { useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { AccessibilityInfo, BackHandler, Platform, Pressable, ScrollView, View, findNodeHandle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Ground } from '../../internal/ground';
import { setOverlayOpen } from '../../internal/overlay';
import { dismissKeyboard } from '../../internal/keyboard';
import { measureOrigin, measureView, type Rect, type ViewRef } from '../../internal/origins';
import { PortalHost, Portal } from '../../internal/Portal';
import { ScrollEdge } from '../../internal/ScrollEdge';
import { cornerCurve, screenMargin, withAlpha } from '../../theme';
import { CloseButton } from '../CloseButton/CloseButton';
import { ConfirmButton } from '../ConfirmButton/ConfirmButton';
import { Text } from '../Text/Text';

/** Hosts sheets and other overlays. Put it once near the root, inside the app's frame. */
export const SheetProvider = PortalHost;

export type SheetDetent = 'fit' | 'medium' | 'large';

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
  /** A line of context under a Headline title, in the header (Subheadline, Muted foreground, space.1 under it):
   *  "Your visit to Paper & Co". */
  subtitle?: string;
  children: ReactNode;
  /** Pinned at the bottom above the safe area: the Buy button. */
  footer?: ReactNode;
  /** Detents the sheet can rest at; it opens at the first unless `initialDetent` says otherwise. `fit` (default)
   *  is the height of the content, capped at large, and animates when the content changes height. */
  detents?: SheetDetent[];
  initialDetent?: SheetDetent;
  /** Blocks dismissing, e.g. while Buy is loading. */
  /** With `fit`: `'opened'` keeps the height the sheet opened at as a minimum while it is open, so it only grows
   *  (a search whose results come and go). Default: the fitted height follows the content both ways. */
  fitMin?: 'opened';
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
  subtitle,
  children,
  footer,
  detents = ['fit'],
  initialDetent,
  fitMin,
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
  const floating = theme.platform === 'ios';
  const inContent = titleVariant === 'displayName';
  // Header and content sit on the screen margin, so Close, Confirm and the rows line up (spacing.md, Sheets).
  const pad = screenMargin(theme, frame.width);

  // `h` is the visible height: a rest is a detent's height; below the smallest rest the sheet slides down instead.
  // `fit` is the measured header plus content (the content's bottom padding already holds the footer and the safe
  // area), capped at the large detent; taller content scrolls.
  const [headerH, setHeaderH] = useState(0);
  const [contentH, setContentH] = useState(0);
  const largeH = frame.height * theme.layout.sheetLargeDetent;
  const mediumH = frame.height * theme.layout.sheetMediumDetent;
  const rawFit = Math.min(Math.ceil(headerH + contentH), largeH);
  // The height at open, kept while open for `fitMin="opened"` (state adjusted during render, as `mounted` is).
  const [openedFit, setOpenedFit] = useState<number | null>(null);
  const wantsFloor = fitMin === 'opened';
  if (wantsFloor && open && headerH > 0 && contentH > 0 && openedFit == null) setOpenedFit(rawFit);
  if (openedFit != null && (!wantsFloor || (!open && !mounted))) setOpenedFit(null);
  const fitH = wantsFloor && openedFit != null ? Math.max(rawFit, openedFit) : rawFit;
  const hasFit = detents.includes('fit');
  const ready = !hasFit || (headerH > 0 && contentH > 0);
  const heightOf = (d: SheetDetent) => (d === 'large' ? largeH : d === 'medium' ? mediumH : fitH);
  const rests = detents.map(heightOf);
  const minRest = Math.max(1, Math.min(...rests));
  const reachesLarge = rests.some((r) => r >= largeH - 1);
  const startDetent = initialDetent ?? detents[0];
  const start = heightOf(startDetent);
  // Whether the sheet rests at the fitted height, so a change in the content moves it.
  const atFit = useSharedValue(startDetent === 'fit');
  const startRef = useRef(start);
  const settledFit = useRef(fitH);
  const h = useSharedValue(0);
  // Zoom from the origin: 0 at the origin's rectangle, 1 at rest.
  const z = useSharedValue(1);
  const from = useSharedValue<Rect | null>(null);
  const smooth = theme.spring.smooth;
  const margin = floating ? theme.space[2] : 0;
  // The keyboard (negative height while it shows, tracked frame by frame on the UI thread): the sheet rides on
  // top of it as iOS sheets do, so a focused field (the address search, a place's name) stays in view. The
  // home-indicator inset under the content goes behind the keys instead of doubling the gap, and a tall detent
  // gives up height rather than running under the status bar. Zero on the web and with no keyboard.
  const keyboard = useReanimatedKeyboardAnimation().height;
  const topLimit = insets.top + theme.space[2];

  const finishClose = () => {
    setMounted(false);
    onClose();
  };

  // Mount as soon as `open` turns on (state adjusted during render); unmount after the closing spring.
  if (open && !mounted) setMounted(true);

  // A sheet takes over from whatever field was being typed in underneath (iOS closes the keyboard too), and takes
  // its own field's keyboard with it when it closes, whoever closes it. Only when `open` changes: the effect below
  // runs again on other changes, and must not close a field inside the sheet.
  // Not on mount: a closed sheet mounting with its screen must leave that screen's autofocused field alone.
  const wasOpen = useRef(open);
  useEffect(() => {
    if (wasOpen.current !== open) dismissKeyboard();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    startRef.current = start;
  });
  useEffect(() => {
    if (open && ready) {
      let cancelled = false;
      settledFit.current = fitH;
      atFit.set(startDetent === 'fit');
      let frame = 0;
      let tries = 0;
      // The overlay and the title mount through the Portal host a commit after this effect runs, so the measure
      // and the focus wait for them (a few frames at most, then the slide-up fallback).
      const run = () => {
        // The origin and the overlay are measured in the same window space; the difference places the zoom.
        Promise.all([reduceMotion ? null : measureOrigin(origin), measureView(overlayRef.current)]).then(([rect, host]) => {
          if (cancelled) return;
          if (rect && host) {
            from.set({ x: rect.x - host.x, y: rect.y - host.y, width: rect.width, height: rect.height });
            z.set(0);
            h.set(startRef.current);
            z.set(withSpring(1, smooth));
          } else {
            from.set(null);
            z.set(1);
            h.set(reduceMotion ? startRef.current : 0);
            if (!reduceMotion) h.set(withSpring(startRef.current, smooth));
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
      };
      const wait = () => {
        if (cancelled) return;
        if (!overlayRef.current && tries++ < 5) frame = requestAnimationFrame(wait);
        else run();
      };
      frame = requestAnimationFrame(wait);
      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
      };
    } else if (mounted && !open) {
      if (from.get()) z.set(withSpring(0, smooth, (done) => done && scheduleOnRN(setMounted, false)));
      else h.set(withSpring(0, smooth, (done) => done && scheduleOnRN(setMounted, false)));
    }
    // fitH and startDetent are read when the sheet opens only; later changes of the content go through the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ready, smooth, h, z, from, mounted, origin, reduceMotion]);

  // The content changed height while the sheet rests at its fitted height: it moves to the new one.
  useEffect(() => {
    if (!open || !ready || !atFit.get() || settledFit.current === fitH) return;
    settledFit.current = fitH;
    if (reduceMotion) h.set(fitH);
    else h.set(withSpring(fitH, smooth));
  }, [open, ready, fitH, h, smooth, reduceMotion, atFit]);

  const dismiss = () => {
    if (!dismissible) return;
    dismissKeyboard();
    if (from.get()) z.set(withSpring(0, smooth, (done) => done && scheduleOnRN(finishClose)));
    else h.set(withSpring(0, smooth, (done) => done && scheduleOnRN(finishClose)));
  };

  // Android's Back closes the sheet, not the screen under it; when the sheet can't be dismissed, Back does nothing.
  const dismissRef = useRef(dismiss);
  useEffect(() => {
    dismissRef.current = dismiss;
  });
  useEffect(() => {
    if (!mounted || !open) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      dismissRef.current();
      return true;
    });
    return () => sub.remove();
  }, [mounted, open]);

  // The page behind is hidden from assistive tech while the sheet is on screen.
  useEffect(() => {
    if (!mounted) return;
    setOverlayOpen(true);
    return () => setOverlayOpen(false);
  }, [mounted]);

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
      atFit.set(hasFit && target === fitH);
      h.set(withSpring(target, { ...smooth, velocity: -e.velocityY }, (done) => done && closing && scheduleOnRN(finishClose)));
    });

  // Floating at medium (inset, every corner round), anchored at large (edge to edge, top corners only).
  const anchored = (v: number) => {
    'worklet';
    if (!floating) return 1;
    return reachesLarge ? interpolate(v, [mediumH, largeH], [0, 1], Extrapolation.CLAMP) : 0;
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
    const lift = Math.max(0, -keyboard.get() - insets.bottom - inset);
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
      bottom: inset + lift,
      height: lift > 0 ? Math.min(visible, frame.height - topLimit - inset - lift) : visible,
      borderBottomLeftRadius: theme.radius.sheet * (1 - t),
      borderBottomRightRadius: theme.radius.sheet * (1 - t),
      opacity: rect ? interpolate(zoom, [0, 0.35], [0, 1], Extrapolation.CLAMP) : 1,
      transform: [{ translateX: tx }, { translateY: ty }, { scale }],
    };
  });
  // One scrim at every detent and on every platform: it comes in with the sheet (its height, or the zoom from the
  // origin) and is at state.sheetScrim once the sheet rests.
  const scrimStyle = useAnimatedStyle(() => {
    const v = Math.min(h.get(), minRest) * z.get();
    return { opacity: interpolate(v, [0, minRest], [0, theme.state.sheetScrim], Extrapolation.CLAMP) };
  });

  if (!mounted) return null;

  return (
    <Portal>
      <View ref={overlayRef} collapsable={false} style={styles.overlay} accessibilityViewIsModal>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          accessibilityState={{ disabled: !dismissible }}
          disabled={!dismissible}
          onPress={dismiss}
          style={StyleSheet.absoluteFill}
        >
          <Animated.View style={[styles.scrim, scrimStyle]} />
        </Pressable>
        <Animated.View style={[styles.panel, panelStyle]} onAccessibilityEscape={dismiss}>
          {/* Opaque: at 94% over a blur, photos behind the sheet showed through as grey smudges. */}
          <View pointerEvents="none" style={styles.opaque} />
          {/* The glass rim, as on every glass element: a white highlight along the top edge and a hairline. */}
          {floating ? <View pointerEvents="none" style={styles.rim} /> : null}
          <GestureDetector gesture={pan}>
            <View onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}>
              <View style={styles.grabberArea}>
                <View style={styles.grabber} />
              </View>
              {/* The header's buttons sit on the sheet's ground too (a Muted circle in dark, GlassButton). */}
              <Ground value="sheet">
                <View style={styles.header(pad)}>
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
                    <View ref={titleRef} accessible focusable={Platform.OS === 'web'} accessibilityRole="header" style={[styles.title, styles.titleStack, styles.noRing]}>
                      <Text variant="headline" numberOfLines={1} align="center">
                        {title}
                      </Text>
                      {subtitle ? (
                        <Text variant="subheadline" color="mutedForeground" numberOfLines={1} align="center">
                          {subtitle}
                        </Text>
                      ) : null}
                    </View>
                  )}
                  {onConfirm ? (
                    <ConfirmButton onPress={confirm} label={confirmLabel} disabled={confirmDisabled} />
                  ) : (
                    <View style={styles.balance} />
                  )}
                </View>
              </Ground>
            </View>
          </GestureDetector>
          <ScrollView
            style={styles.fill}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            onContentSizeChange={(_w, ch) => setContentH(ch)}
            contentContainerStyle={styles.content(pad, footer ? theme.size.button.large + theme.space[6] + insets.bottom : insets.bottom)}
          >
            {inContent ? (
              <View ref={titleRef} accessible focusable={Platform.OS === 'web'} accessibilityRole="header" style={styles.noRing}>
                <Text variant="displayName" numberOfLines={2}>
                  {title}
                </Text>
              </View>
            ) : null}
            {/* Rows, fields and chips inside a sheet sit one level up from its ground (ListRow, Chip, TextField). */}
            <Ground value="sheet">{children}</Ground>
          </ScrollView>
          {footer ? (
            <>
              {/* Drawn from the sheet's own colour, so the fade never shows a band of another ground. */}
              <ScrollEdge edge="bottom" fill="sheet" height={theme.size.button.large + theme.space[6] + insets.bottom + theme.space[4]} />
              <View style={styles.footer(pad, insets.bottom)}>
                <Ground value="sheet">{footer}</Ground>
              </View>
            </>
          ) : null}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create((theme) => ({
  overlay: { ...StyleSheet.absoluteFillObject },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.sheetScrim },
  panel: {
    ...cornerCurve,
    position: 'absolute',
    transformOrigin: 'left top',
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    overflow: 'hidden',
  },
  // The sheet's ground: #DEDAD5 in light mode (1.15:1 under the Background), #191715 (Stone) in dark.
  opaque: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.sheet },
  rim: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.radius.sheet,
    borderWidth: theme.state.glassRim,
    borderColor: withAlpha(theme.color.glassHairline, theme.state.glassHairline),
    borderTopColor: withAlpha(theme.color.glassShine, theme.state.glassHighlight),
  },
  fill: { flex: 1 },
  grabberArea: { alignItems: 'center', paddingTop: theme.space[2], paddingBottom: theme.space[1] },
  // iOS grabber 36 × 4; the Material drag handle is 32 × 4.
  grabber: {
    width: theme.platform === 'ios' ? theme.size.button.compact : theme.space[7],
    height: theme.space[1],
    borderRadius: theme.radius.full,
    // Quieter than the title: Muted foreground at 38% in light, Stone 445 in dark (2.49:1 on the sheet).
    backgroundColor: theme.color.grabber,
    opacity: theme.state.grabber,
  },
  header: (pad: number) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: pad,
    paddingBottom: theme.space[2],
    gap: theme.space[2],
  }),
  title: { flex: 1 },
  titleStack: { gap: theme.space[1] },
  // The title takes focus on open for screen readers; it isn't a control, so the web's focus ring doesn't show on it.
  noRing: Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {},
  balance: { width: theme.hit.min },
  content: (pad: number, bottom: number) => ({
    paddingHorizontal: pad,
    paddingTop: theme.space[2],
    paddingBottom: bottom + theme.inset.sheet,
    gap: theme.gap.block,
  }),
  footer: (pad: number, bottom: number) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: pad,
    paddingTop: theme.space[3],
    paddingBottom: bottom + theme.space[3],
  }),
}));
