// The full-screen photo viewer (app flow v10, "Photo viewer"): black ground, the photo at the screen's width, pinch or
// double-tap to zoom, swipe to the next photo, "1 of 3" at the top and a glass Close. It is presented through the root
// Portal (inside the phone frame on the web) and grows from the photo that was tapped, and back into it on close: a
// copy of the photo moves from the tapped rectangle to its place while the black ground fades in. Under Reduce Motion,
// or when the photo it opened from has scrolled away, it fades instead.
import { Image } from 'expo-image';
import { memo, useEffect, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { AccessibilityInfo, BackHandler, Image as NativeImage, Platform, View, findNodeHandle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import { IMAGE_FILL, photoSource, type PhotoSource } from '../../internal/media';
import { setOverlayOpen } from '../../internal/overlay';
import { measureOrigin, measureView, type Rect, type ViewRef } from '../../internal/origins';
import { Portal } from '../../internal/Portal';
import { cornerCurve } from '../../theme';
import { CloseButton } from '../CloseButton/CloseButton';
import type { ShopPhoto } from '../PhotoCarousel/PhotoCarousel';
import { Text } from '../Text/Text';

export type LightboxProps = {
  photos: ShopPhoto[];
  open: boolean;
  /** The photo on show, zero-based. */
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** The PhotoCarousel's `originId`: the viewer grows from `${originId}:${index}` and shrinks back into it. */
  originId?: string;
};

const MAX_ZOOM = 4;
const DOUBLE_TAP_ZOOM = 2.5;
// A photo's shape when it can't be read (a remote URL): the carousel's photos are 3:2 or 4:3.
const FALLBACK_RATIO = 3 / 2;

function ratioOf(source: PhotoSource): number {
  if (typeof source !== 'number') return FALLBACK_RATIO;
  const asset = NativeImage.resolveAssetSource(source);
  return asset?.width && asset?.height ? asset.width / asset.height : FALLBACK_RATIO;
}

export const Lightbox = memo(function Lightbox({ photos, open, index, onIndexChange, onClose, originId }: LightboxProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(open);
  if (open && !shown) setShown(true);
  const [zoomed, setZoomed] = useState(false);
  // Opening or closing starts from a photo at rest: zoom left on when it closed while zoomed would lock paging on the next open.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    setZoomed(false);
  }
  const closeRef = useRef<ViewRef>(null);
  const rootRef = useRef<ViewRef>(null);
  const scroller = useRef<Animated.ScrollView>(null);
  const current = useRef(index);
  const p = useSharedValue(0);
  const from = useSharedValue<Rect | null>(null);
  // Whether the pages (not the moving copy) are what shows: after the zoom in, before the zoom out.
  const settled = useSharedValue(false);

  const photo = photos[Math.min(index, photos.length - 1)];
  const ratio = photo ? ratioOf(photo.source) : FALLBACK_RATIO;
  const boxH = Math.min(frame.height, frame.width / ratio);
  const boxW = boxH * ratio;
  const finalLeft = (frame.width - boxW) / 2;
  const finalTop = (frame.height - boxH) / 2;

  useEffect(() => {
    const spring = reduceMotion ? theme.spring.fade : theme.spring.smooth;
    let cancelled = false;
    if (open) {
      current.current = index;
      settled.set(false);
      const origin = originId && !reduceMotion ? `${originId}:${index}` : undefined;
      Promise.all([measureOrigin(origin), measureView(rootRef.current)]).then(([rect, host]) => {
        if (cancelled) return;
        from.set(rect && host ? { x: rect.x - host.x, y: rect.y - host.y, width: rect.width, height: rect.height } : null);
        p.set(withSpring(1, spring, (done) => done && settled.set(true)));
      });
    } else if (shown) {
      settled.set(false);
      const origin = originId && !reduceMotion ? `${originId}:${index}` : undefined;
      Promise.all([measureOrigin(origin), measureView(rootRef.current)]).then(([rect, host]) => {
        if (cancelled) return;
        from.set(rect && host ? { x: rect.x - host.x, y: rect.y - host.y, width: rect.width, height: rect.height } : null);
        p.set(withSpring(0, spring, (done) => done && scheduleOnRN(setShown, false)));
      });
    }
    return () => {
      cancelled = true;
    };
    // `index` is read when the viewer opens or closes, not on every swipe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // The page behind is hidden from assistive tech while the viewer is on screen; Close takes the focus on open.
  useEffect(() => {
    if (!open) return;
    setOverlayOpen(true);
    let frame = 0;
    let tries = 0;
    const focus = () => {
      const node = closeRef.current;
      if (!node) {
        if (tries++ < 5) frame = requestAnimationFrame(focus);
        return;
      }
      if (Platform.OS === 'web') {
        const el = node as unknown as { querySelector?: (s: string) => { focus?: () => void } | null };
        el.querySelector?.('button, [role="button"]')?.focus?.();
      } else {
        const handle = findNodeHandle(node);
        if (handle) AccessibilityInfo.setAccessibilityFocus(handle);
      }
    };
    frame = requestAnimationFrame(focus);
    return () => {
      cancelAnimationFrame(frame);
      setOverlayOpen(false);
    };
  }, [open]);

  // Android's Back closes the viewer, not the screen under it.
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [open, onClose]);

  // Escape closes it on the web.
  useEffect(() => {
    if (!open || Platform.OS !== 'web') return;
    const onKey = (e: { key: string }) => e.key === 'Escape' && onClose();
    const target = globalThis as unknown as { addEventListener?: (t: string, f: (e: { key: string }) => void) => void; removeEventListener?: (t: string, f: (e: { key: string }) => void) => void };
    target.addEventListener?.('keydown', onKey);
    return () => target.removeEventListener?.('keydown', onKey);
  }, [open, onClose]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: p.get() }));
  const chromeStyle = useAnimatedStyle(() => ({ opacity: p.get() }));
  const pagesStyle = useAnimatedStyle(() => ({ opacity: from.get() ? (settled.get() ? 1 : 0) : p.get() }));
  const heroStyle = useAnimatedStyle(() => {
    const rect = from.get();
    if (!rect || settled.get()) return { opacity: 0 };
    const v = p.get();
    return {
      opacity: 1,
      left: rect.x + (finalLeft - rect.x) * v,
      top: rect.y + (finalTop - rect.y) * v,
      width: rect.width + (boxW - rect.width) * v,
      height: rect.height + (boxH - rect.height) * v,
      borderRadius: theme.radius.card * (1 - v),
    };
  });

  if (!shown || !photo) return null;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.max(0, Math.min(photos.length - 1, Math.round(e.nativeEvent.contentOffset.x / frame.width)));
    if (next !== current.current) {
      current.current = next;
      onIndexChange(next);
    }
  };
  const toIndex = () => {
    scroller.current?.scrollTo({ x: current.current * frame.width, animated: false });
  };

  const count = `${index + 1} of ${photos.length}`;
  return (
    <Portal>
      <View ref={rootRef} collapsable={false} style={styles.root} accessibilityViewIsModal>
        <Animated.View pointerEvents="none" style={[styles.backdrop, backdropStyle]} />
        <Animated.View style={[styles.pages, pagesStyle]}>
          <Animated.ScrollView
            ref={scroller}
            horizontal
            pagingEnabled
            scrollEnabled={!zoomed && photos.length > 1}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            onLayout={toIndex}
          >
            {photos.map((p2, i) => (
              <ZoomPage key={`${i}-${p2.label}`} photo={p2} width={frame.width} height={frame.height} onZoom={setZoomed} />
            ))}
          </Animated.ScrollView>
        </Animated.View>
        <Animated.View pointerEvents="none" style={[styles.hero, heroStyle]}>
          <Image source={photoSource(photo.source)} style={IMAGE_FILL} contentFit="cover" accessible={false} />
        </Animated.View>
        <Animated.View style={[styles.chrome(insets.top), chromeStyle]} pointerEvents="box-none">
          <View style={styles.bar}>
            <View ref={closeRef} collapsable={false} style={styles.close}>
              <CloseButton onPress={onClose} overMedia accessibilityLabel="Close photo" />
            </View>
            <View style={styles.count} pointerEvents="none">
              <Text variant="headline" color="onLightbox" accessibilityLabel={`Photo ${count}`}>
                {count}
              </Text>
            </View>
          </View>
          <View style={styles.hint(insets.bottom)} pointerEvents="none">
            <Text variant="footnote" color="onLightboxMuted" align="center">
              {photos.length > 1 ? 'Pinch to zoom, swipe for the next photo' : 'Pinch to zoom'}
            </Text>
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
});

/** One photo: pinch to zoom up to 4x, drag to move it once zoomed, double-tap to zoom in and out. Paging is off while
 *  it is zoomed, so the shopper zooms out before moving on. */
function ZoomPage({ photo, width, height, onZoom }: { photo: ShopPhoto; width: number; height: number; onZoom: (z: boolean) => void }) {
  const { theme } = useUnistyles();
  const ratio = ratioOf(photo.source);
  const boxH = Math.min(height, width / ratio);
  const boxW = boxH * ratio;
  const scale = useSharedValue(1);
  const base = useSharedValue(1);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const baseX = useSharedValue(0);
  const baseY = useSharedValue(0);
  const isZoomed = useSharedValue(false);
  const [zoomed, setZoomed] = useState(false);
  const spring = theme.spring.smooth;

  const report = (z: boolean) => {
    setZoomed(z);
    onZoom(z);
  };
  const reach = (s: number) => {
    'worklet';
    return { x: Math.max(0, (boxW * s - width) / 2), y: Math.max(0, (boxH * s - height) / 2) };
  };
  const setZoom = (z: boolean) => {
    'worklet';
    if (isZoomed.get() !== z) {
      isZoomed.set(z);
      scheduleOnRN(report, z);
    }
  };

  const pinch = Gesture.Pinch()
    .onStart(() => {
      base.set(scale.get());
    })
    .onUpdate((e) => {
      const s = Math.min(MAX_ZOOM, Math.max(1, base.get() * e.scale));
      scale.set(s);
      const r = reach(s);
      x.set(Math.min(r.x, Math.max(-r.x, x.get())));
      y.set(Math.min(r.y, Math.max(-r.y, y.get())));
      setZoom(s > 1.01);
    })
    .onEnd(() => {
      if (scale.get() <= 1.01) {
        scale.set(withSpring(1, spring));
        x.set(withSpring(0, spring));
        y.set(withSpring(0, spring));
        setZoom(false);
      }
    });
  const pan = Gesture.Pan()
    .enabled(zoomed)
    .onStart(() => {
      baseX.set(x.get());
      baseY.set(y.get());
    })
    .onUpdate((e) => {
      const r = reach(scale.get());
      x.set(Math.min(r.x, Math.max(-r.x, baseX.get() + e.translationX)));
      y.set(Math.min(r.y, Math.max(-r.y, baseY.get() + e.translationY)));
    });
  const double = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      const zoomIn = scale.get() <= 1.01;
      scale.set(withSpring(zoomIn ? DOUBLE_TAP_ZOOM : 1, spring));
      x.set(withSpring(0, spring));
      y.set(withSpring(0, spring));
      setZoom(zoomIn);
    });
  const gesture = Gesture.Race(double, Gesture.Simultaneous(pinch, pan));
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.get() }, { translateY: y.get() }, { scale: scale.get() }] }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.page(width, height)} accessible accessibilityRole="image" accessibilityLabel={photo.label}>
        <Animated.View style={[styles.box(boxW, boxH), style]}>
          <Image source={photoSource(photo.source)} style={IMAGE_FILL} contentFit="cover" accessible={false} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: { ...StyleSheet.absoluteFillObject },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.lightbox },
  pages: { ...StyleSheet.absoluteFillObject },
  hero: { ...cornerCurve, position: 'absolute', overflow: 'hidden' },
  page: (width: number, height: number) => ({ width, height, alignItems: 'center', justifyContent: 'center' }),
  box: (width: number, height: number) => ({ width, height }),
  chrome: (top: number) => ({ ...StyleSheet.absoluteFillObject, paddingTop: top + theme.space[2] }),
  bar: { minHeight: theme.hit.min, justifyContent: 'center', paddingHorizontal: theme.margin.screenCompact },
  close: { alignSelf: 'flex-start' },
  count: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  hint: (bottom: number) => ({ position: 'absolute', left: 0, right: 0, bottom: bottom + theme.space[6], paddingHorizontal: theme.margin.screenCompact }),
}));
