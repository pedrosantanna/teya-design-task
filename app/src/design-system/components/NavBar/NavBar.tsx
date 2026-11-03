// Nav bar (components.md): a large title that collapses to an inline title as the list scrolls, an
// inline title alone, or no title until the content scrolls under the bar (shop page), which can also
// hide while scrolling down. iOS navigation bar ↔ Material large top app bar collapsing to small.
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { CloseButton } from '../CloseButton/CloseButton';
import { Icon, type PlatformIconName } from '../Icon/Icon';
import { Text } from '../Text/Text';

// Scroll distance, in points, that counts as a direction change for hide-on-scroll.
const DIRECTION_THRESHOLD = 4;

export type NavBarScroll = {
  scrollY: SharedValue<number>;
  hidden: SharedValue<number>;
  onScroll: ReturnType<typeof useAnimatedScrollHandler>;
};

/** Pass `onScroll` to an `Animated.ScrollView` or `Animated.FlatList` and the result to `NavBar` and `LargeTitle`.
 *  With `hideOnScroll`, the bar hides only once the content has scrolled past `hideAfter` points (the shop page
 *  hides it after its title has collapsed into the bar). */
export function useNavBarScroll(hideOnScroll = false, hideAfter = 0): NavBarScroll {
  const scrollY = useSharedValue(0);
  const hidden = useSharedValue(0);
  const last = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    const y = e.contentOffset.y;
    const dy = y - last.get();
    last.set(y);
    scrollY.set(y);
    if (!hideOnScroll) return;
    if (y <= hideAfter) hidden.set(0);
    else if (dy > DIRECTION_THRESHOLD) hidden.set(1);
    else if (dy < -DIRECTION_THRESHOLD) hidden.set(0);
  });
  return { scrollY, hidden, onScroll };
}

export type NavAction = { icon: IconSvgElement | PlatformIconName; label: string; onPress?: () => void };

export type NavBarProps = {
  title: string;
  /** large: the title sits in the content as `LargeTitle` and appears inline once it scrolls away.
   *  inline: always inline. reveal: no title until the content scrolls `revealAt` points. */
  mode?: 'large' | 'inline' | 'reveal';
  scroll?: NavBarScroll;
  /** back: the chevron with the previous title on iOS ("Requests"), the arrow on Android. close: Close on the left. */
  leading?: 'back' | 'close' | 'none';
  backLabel?: string;
  onLeading?: () => void;
  trailing?: NavAction[];
  /** Hides while scrolling down, returns on scroll up (shop page). Needs `useNavBarScroll(true)`. */
  hideOnScroll?: boolean;
  revealAt?: number;
  /** Space above the bar; defaults to the safe-area top. */
  topInset?: number;
  /** The bar's fill once content is under it: Background, or Card on a screen whose content is a card (shop page). */
  fill?: 'background' | 'card';
  /** Scroll offset at which the fill shows; defaults to 8 points, or `revealAt` in reveal mode. */
  backgroundAt?: number;
};

function BarButton({ action }: { action: NavAction }) {
  const { theme } = useUnistyles();
  const press = usePress();
  return (
    <Animated.View style={press.scaleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={action.label}
        onPress={action.onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.barButton}
      >
        <Icon icon={action.icon} size="nav" color={theme.platform === 'ios' ? 'tint' : 'foreground'} />
      </Pressable>
    </Animated.View>
  );
}

export const NavBar = memo(function NavBar({
  title,
  mode = 'inline',
  scroll,
  leading = 'none',
  backLabel,
  onLeading,
  trailing = [],
  hideOnScroll = false,
  revealAt,
  topInset,
  fill = 'background',
  backgroundAt: backgroundAtProp,
}: NavBarProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const top = topInset ?? insets.top;
  const ios = theme.platform === 'ios';
  const fallback = useSharedValue(0);
  const scrollY = scroll?.scrollY ?? fallback;
  const hidden = scroll?.hidden ?? fallback;
  const largeHeight = theme.type.title1.lineHeight + theme.space[2];
  const reveal = mode === 'large' ? largeHeight : mode === 'reveal' ? (revealAt ?? largeHeight) : 0;
  const barHeight = ios ? theme.hit.min : theme.hit.min + theme.space[4];
  const total = top + barHeight;
  const spring = theme.spring.smooth;
  const fade = theme.spring.fade;
  const reduceMotion = useReducedMotion();
  // The bar's background shows once the content scrolls under it; on the shop page, once the title reaches it.
  const backgroundAt = backgroundAtProp ?? (mode === 'reveal' ? reveal : theme.space[2]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: reveal === 0 ? 1 : interpolate(scrollY.get(), [reveal - theme.space[2], reveal], [0, 1], Extrapolation.CLAMP),
  }));
  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.get(), [backgroundAt - theme.space[2], backgroundAt], [0, 1], Extrapolation.CLAMP),
  }));
  // Reduce Motion: the bar fades out and in instead of sliding, and moves out of the way once faded.
  const shown = useSharedValue(1);
  useAnimatedReaction(
    () => hidden.get(),
    (h) => {
      if (hideOnScroll && reduceMotion) shown.set(withSpring(1 - h, fade));
    },
  );
  const hideStyle = useAnimatedStyle(() => {
    if (!hideOnScroll) return { opacity: 1, transform: [{ translateY: 0 }] };
    if (!reduceMotion) return { opacity: 1, transform: [{ translateY: withSpring(-total * hidden.get(), spring) }] };
    const o = shown.get();
    return { opacity: o, transform: [{ translateY: o < 0.01 ? -total : 0 }] };
  });

  const leadingNode =
    leading === 'back' ? (
      <Pressable accessibilityRole="button" accessibilityLabel={backLabel ? `Back to ${backLabel}` : 'Back'} onPress={onLeading} style={styles.back}>
        <Icon icon="back" size="nav" color={ios ? 'tint' : 'foreground'} />
        {ios && backLabel ? (
          <Text variant="body" color="tint" numberOfLines={1}>
            {backLabel}
          </Text>
        ) : null}
      </Pressable>
    ) : leading === 'close' ? (
      <View style={styles.closeSlot}>
        <CloseButton onPress={onLeading} overMedia={mode === 'reveal'} />
      </View>
    ) : null;

  return (
    <>
    {/* box-none: the bar's empty parts let touches through to the content under it (Nearby's avatar row). */}
    <Animated.View style={[styles.bar(top), hideStyle]} pointerEvents="box-none">
      <Animated.View pointerEvents="none" style={[styles.background(fill), backgroundStyle]} />
      <View style={styles.row(barHeight)} pointerEvents="box-none">
        <View style={styles.side(ios)} pointerEvents="box-none">
          {leadingNode}
        </View>
        <Animated.View style={[styles.titleSlot(ios), titleStyle]} pointerEvents="none">
          <Text variant="headline" numberOfLines={1} align={ios ? 'center' : 'left'} accessibilityRole="header">
            {title}
          </Text>
        </Animated.View>
        <View style={[styles.side(ios), styles.trailing]} pointerEvents="box-none">
          {trailing.map((action) => (
            <BarButton key={action.label} action={action} />
          ))}
        </View>
      </View>
    </Animated.View>
    {/* A bar that hides leaves the status bar's strip filled, so content never runs under the clock bare. */}
    {hideOnScroll && top > 0 ? <Animated.View pointerEvents="none" style={[styles.statusStrip(top, fill), backgroundStyle]} /> : null}
    </>
  );
});

export type LargeTitleProps = {
  title: string;
  scroll?: NavBarScroll;
  /** Display title in Gambetta (the Nearby large title, typography.md) instead of Title 1. */
  display?: boolean;
  /** Scroll offset at which the title starts to fade; when content sits above it (Nearby's area row). */
  offset?: number;
};

/** The large title at the top of the scroll content (Title 1); fades as it scrolls under the bar. */
export const LargeTitle = memo(function LargeTitle({ title, scroll, display = false, offset = 0 }: LargeTitleProps) {
  const { theme } = useUnistyles();
  const fallback = useSharedValue(0);
  const scrollY = scroll?.scrollY ?? fallback;
  const variant = display ? 'displayTitle' : 'title1';
  const height = theme.type[variant].lineHeight + theme.space[2];
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.get(), [offset, offset + height], [1, 0], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(scrollY.get(), [-height, 0], [1.1, 1], Extrapolation.CLAMP) }],
  }));
  return (
    <Animated.View style={[styles.large, style]}>
      <Text variant={variant} accessibilityRole="header">
        {title}
      </Text>
    </Animated.View>
  );
});

/** Height of the bar plus the top inset (the safe area by default), for the scroll content's top padding. */
export function useNavBarHeight(topInset?: number): number {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const top = topInset ?? insets.top;
  return top + (theme.platform === 'ios' ? theme.hit.min : theme.hit.min + theme.space[4]);
}

const styles = StyleSheet.create((theme) => ({
  bar: (top: number) => ({ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: top, zIndex: 2 }),
  background: (fill: 'background' | 'card') => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.color[fill],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.color.separator,
  }),
  statusStrip: (height: number, fill: 'background' | 'card') => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
    zIndex: 3,
    backgroundColor: theme.color[fill],
  }),
  row: (height: number) => ({ height, flexDirection: 'row', alignItems: 'center', paddingHorizontal: theme.space[2] }),
  side: (ios: boolean) => (ios ? { flex: 1, flexDirection: 'row', alignItems: 'center' } : { flexDirection: 'row', alignItems: 'center' }),
  trailing: { justifyContent: 'flex-end' },
  titleSlot: (ios: boolean) => (ios ? { flex: 2 } : { flex: 1, paddingHorizontal: theme.space[2] }),
  back: { flexDirection: 'row', alignItems: 'center', minHeight: theme.hit.min, minWidth: theme.hit.min, gap: theme.space[1] },
  closeSlot: { minWidth: theme.hit.min, minHeight: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
  barButton: { width: theme.hit.min, height: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
  large: { paddingTop: theme.space[2], transformOrigin: 'left' },
}));
