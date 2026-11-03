// The zoom between a tapped element and the screen it opens (iOS 26 patterns, Apple Music as the reference):
// a Nearby tile into the shop page, the Requests button into Requests.
// iOS: the system's zoom transition through Expo Router's `Link.AppleZoom`, with its interactive dismiss.
// Web: a view transition that morphs the source into the target screen. Android: a container transform,
// the target screen growing from the source's rectangle (ZoomTarget) over the stack's fade.
import { Link, router, type Href } from 'expo-router';
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { registerOrigin, type Rect, type ViewRef } from '../../internal/origins';
import { navigateWith, setZoomTarget, takePendingZoom } from '../../internal/transitions';

/** Off: every platform takes the custom path (the Android container transform on iOS too). */
export const NATIVE_APPLE_ZOOM = true;

export type ZoomSourceProps = {
  /** Unique on screen: "tile:rossis", "requests". */
  id: string;
  href: Href;
  /** Render the source; call `open` from its press handler. */
  children: (open: () => void) => ReactNode;
  style?: StyleProp<ViewStyle>;
};

const nativeZoom = () => Platform.OS === 'ios' && NATIVE_APPLE_ZOOM;

export function ZoomSource({ id, href, children, style }: ZoomSourceProps) {
  const ref = useRef<ViewRef>(null);
  useEffect(() => registerOrigin(id, ref), [id]);
  const reduceMotion = useReducedMotion();
  if (nativeZoom() && !reduceMotion) {
    return (
      <Link href={href} asChild>
        <Link.AppleZoom>
          <Forward style={style}>{children}</Forward>
        </Link.AppleZoom>
      </Link>
    );
  }
  const open = () => navigateWith(reduceMotion ? 'fade' : 'zoom', () => router.push(href), id);
  return (
    <View ref={ref} collapsable={false} style={style}>
      {children(open)}
    </View>
  );
}

/** Receives Link's press handler through Slot and hands it to the render function. */
function Forward({ children, onPress, style }: { children: (open: () => void) => ReactNode; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <View collapsable={false} style={style}>
      {children(() => onPress?.())}
    </View>
  );
}

export type ZoomTargetProps = { children: ReactNode };

/** Wraps a screen that a ZoomSource opens. Android (and iOS without the native zoom): grows from the source. */
export function ZoomTarget({ children }: ZoomTargetProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const reduceMotion = useReducedMotion();
  const ref = useRef<ViewRef>(null);
  const progress = useSharedValue(1);
  const from = useSharedValue<Rect | null>(null);

  useLayoutEffect(() => {
    if (Platform.OS === 'web') {
      setZoomTarget(ref.current);
      takePendingZoom();
      return () => setZoomTarget(null);
    }
    const zoom = takePendingZoom();
    if (zoom?.rect && !reduceMotion && !nativeZoom()) {
      from.set(zoom.rect);
      progress.set(0);
      progress.set(withSpring(1, theme.spring.smooth));
    }
  }, [from, progress, reduceMotion, theme.spring.smooth]);

  const style = useAnimatedStyle(() => {
    const rect = from.get();
    const p = progress.get();
    if (!rect || p >= 1) return { opacity: 1, transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }], borderRadius: 0 };
    const scale = rect.width / frame.width + (1 - rect.width / frame.width) * p;
    const cx = rect.x + rect.width / 2 - frame.width / 2;
    const cy = rect.y + rect.height / 2 - frame.height / 2;
    return {
      opacity: Math.min(1, p * 3),
      borderRadius: theme.radius.card * (1 - p),
      transform: [{ translateX: cx * (1 - p) }, { translateY: cy * (1 - p) }, { scale }],
    };
  });

  return (
    <Animated.View ref={ref} collapsable={false} style={[styles.fill, style]}>
      {children}
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  fill: { flex: 1, overflow: 'hidden' },
});
