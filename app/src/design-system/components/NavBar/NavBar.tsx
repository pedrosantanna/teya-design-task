// Nav bar (components.md, iOS 26 patterns): a large title that scrolls with the content and collapses to an
// inline leading title, an inline title alone, or no title until the content scrolls under the bar (shop page),
// which can also hide while scrolling down. No fill: the controls float in glass over a scroll-edge fade.
// iOS navigation bar ↔ Material large top app bar collapsing to small.
import type { IconSvgElement } from '@hugeicons/react-native';
import { Image } from 'expo-image';
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
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { screenMargin, type ShopAccentName } from '../../theme';
import { usePress } from '../../internal/usePress';
import { ScrollEdge, type EdgeFill } from '../../internal/ScrollEdge';
import { SnuffleMark } from '../SnuffleMark/SnuffleMark';
import { CloseButton } from '../CloseButton/CloseButton';
import { ConfirmButton } from '../ConfirmButton/ConfirmButton';
import { GlassButton } from '../GlassButton/GlassButton';
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
  /** back: the chevron alone in a glass circle on iOS and the web (the previous title only in its accessibility
   *  label, "Back to Requests"), the arrow icon button on Android. close: the glass × on the left. */
  leading?: 'back' | 'close' | 'none';
  backLabel?: string;
  onLeading?: () => void;
  /** Icon-only actions, grouped in one glass capsule on the right (iOS, the web); icon buttons on Android. */
  trailing?: NavAction[];
  /** Confirm at the right, for a presented screen that commits a choice. */
  confirm?: { onPress?: () => void; label?: string };
  /** Hides while scrolling down, returns on scroll up (shop page). Needs `useNavBarScroll(true)`. */
  hideOnScroll?: boolean;
  revealAt?: number;
  /** Space above the bar; defaults to the safe-area top. */
  topInset?: number;
  /** The colour of the scroll-edge fade: the screen's ground (Background, Card, a chat's ground). */
  fill?: EdgeFill;
  /** The Snuffle glyph before the inline title ("Snuffle" on New Request and in a chat). */
  titleMark?: boolean;
  /** A line under the inline title: the request's name in a chat titled "Snuffle". */
  subtitle?: string;
  /** A round photo at the right of the bar (a chat's request): a 44 pt target that opens a photo choice. */
  trailingPhoto?: { photo: PhotoSource; label: string; onPress: () => void };
  /** Scroll offset at which the scroll-edge fade shows; defaults to 8 points, or `revealAt` in reveal mode. */
  backgroundAt?: number;
  /** A second fill the scroll edge shows until the content scrolls `until` points, then crossfades to `fill`: the
   *  shop page's accent while its wash is under the bar, so the material never lays a pale band over the wash. */
  fillBefore?: { fill: EdgeFill; until: number };
};

/** The bar's height under the safe area. With a subtitle (a chat) the bar is as tall as its two title lines
 *  (Headline and the 28 pt thumb) plus `space.3` above and below, so the title keeps clear of the top and of the Back circle's axis. */
function barHeightFor(theme: ReturnType<typeof useUnistyles>['theme'], tall: boolean) {
  if (tall) return theme.type.headline.lineHeight + theme.size.thumb.nav + 2 * theme.space[3];
  return theme.platform === 'ios' ? theme.hit.min + theme.space[2] : theme.hit.min + theme.space[4];
}


/** The round photo in the bar: hit.min wide and tall, a 1 pt Border edge, pressing like any control. */
function PhotoButton({ photo, label, onPress }: NonNullable<NavBarProps['trailingPhoto']>) {
  const press = usePress('selection');
  return (
    <Animated.View style={press.scaleStyle}>
      <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} onPressIn={press.onPressIn} onPressOut={press.onPressOut} style={styles.photoButton}>
        <Image source={photoSource(photo)} style={IMAGE_OVER} contentFit="cover" accessible={false} />
      </Pressable>
    </Animated.View>
  );
}

function BarActions({ actions }: { actions: NavAction[] }) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  if (actions.length === 0) return null;
  const buttons = actions.map((action) => <BarButton key={action.label} action={action} />);
  if (theme.platform === 'android') return <View style={styles.actions}>{buttons}</View>;
  return (
    <FloatingSurface interactive style={styles.capsule}>
      {buttons}
    </FloatingSurface>
  );
}

function BarButton({ action }: { action: NavAction }) {
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
        <Icon icon={action.icon} size="nav" weight="strong" color="foreground" />
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
  confirm,
  hideOnScroll = false,
  revealAt,
  topInset,
  fill = 'background',
  backgroundAt: backgroundAtProp,
  titleMark = false,
  subtitle,
  trailingPhoto,
  fillBefore,
}: NavBarProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  // Back, Close and the trailing controls sit on the screen margin, in line with the content under them.
  const margin = screenMargin(theme, frame.width);
  const top = topInset ?? insets.top;
  const fallback = useSharedValue(0);
  const scrollY = scroll?.scrollY ?? fallback;
  const hidden = scroll?.hidden ?? fallback;
  const largeHeight = theme.type.title1.lineHeight + theme.space[2];
  const reveal = mode === 'large' ? largeHeight : mode === 'reveal' ? (revealAt ?? largeHeight) : 0;
  const barHeight = barHeightFor(theme, Boolean(subtitle));
  // One title block centred on the screen, with the glyph and the request's thumbnail each leading its own line.
  const centred = Boolean(subtitle);
  const solidBar = typeof fill === 'object' ? 'tile' : fill === 'chat' ? 'chat' : undefined;
  const total = top + barHeight;
  const spring = theme.spring.smooth;
  const fade = theme.spring.fade;
  const reduceMotion = useReducedMotion();
  // The scroll-edge fade shows once the content scrolls under the bar; on the shop page, once the title reaches it.
  const backgroundAt = backgroundAtProp ?? (mode === 'reveal' ? reveal : theme.space[2]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: reveal === 0 ? 1 : interpolate(scrollY.get(), [reveal - theme.space[2], reveal], [0, 1], Extrapolation.CLAMP),
  }));
  const backgroundStyle = useAnimatedStyle(() => {
    const shown = interpolate(scrollY.get(), [backgroundAt - theme.space[2], backgroundAt], [0, 1], Extrapolation.CLAMP);
    if (!fillBefore) return { opacity: shown };
    return { opacity: shown * interpolate(scrollY.get(), [fillBefore.until - theme.space[4], fillBefore.until], [0, 1], Extrapolation.CLAMP) };
  });
  const beforeStyle = useAnimatedStyle(() => {
    if (!fillBefore) return { opacity: 0 };
    const shown = interpolate(scrollY.get(), [backgroundAt - theme.space[2], backgroundAt], [0, 1], Extrapolation.CLAMP);
    return { opacity: shown * interpolate(scrollY.get(), [fillBefore.until - theme.space[4], fillBefore.until], [1, 0], Extrapolation.CLAMP) };
  });
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
      <GlassButton icon="back" accessibilityLabel={backLabel ? `Back to ${backLabel}` : 'Back'} onPress={onLeading} overMedia={mode === 'reveal'} edge={fill === 'chat'} />
    ) : leading === 'close' ? (
      <CloseButton onPress={onLeading} overMedia={mode === 'reveal'} />
    ) : null;

  return (
    <>
    {/* No bar fill (iOS 26): a scroll-edge fade under the floating controls once content is under them. */}
    {fillBefore ? <ScrollEdge edge="top" height={total + theme.space[4]} fill={fillBefore.fill} style={beforeStyle} /> : null}
    {/* On a shop's tile and in a chat the bar is a solid fill of the page's own colour down to the bar's bottom with a
        0.5 pt hairline under it, so nothing half-cut shows beside the controls (visual critique, round 12). Elsewhere a
        scroll-edge fade shows once content is under the bar. */}
    {solidBar ? (
      <Animated.View pointerEvents="none" style={[styles.solid(total, solidBar === 'chat' ? theme.color.chat.ground : theme.color.shop.accent[(fill as { accent: ShopAccentName }).accent].tile, solidBar === 'chat' ? theme.color.chat.edge : theme.color.border), backgroundStyle]} />
    ) : (
      <ScrollEdge edge="top" height={total + theme.space[4]} fill={fill} style={backgroundStyle} />
    )}
    {/* box-none: the bar's empty parts let touches through to the content under it (Nearby's area row). */}
    <Animated.View style={[styles.bar(top), hideStyle]} pointerEvents="box-none">
      <View style={styles.row(barHeight, margin)} pointerEvents="box-none">
        {leadingNode}
        {centred ? (
          <Animated.View style={[styles.centredSlot(margin + theme.hit.min + theme.space[2]), titleStyle]} pointerEvents="none">
            <View style={styles.centredLine}>
              {titleMark ? <SnuffleMark size="inline" /> : null}
              <View style={styles.titleText}>
                <Text variant="headline" numberOfLines={1} accessibilityRole="header">
                  {title}
                </Text>
              </View>
            </View>
            <View style={styles.centredLine}>
              <View style={styles.titleText}>
                <Text variant="caption1" color="mutedForeground" numberOfLines={1}>
                  {subtitle}
                </Text>
              </View>
            </View>
          </Animated.View>
        ) : (
          <Animated.View style={[styles.titleSlot, titleMark && styles.titleWithMark, titleStyle]} pointerEvents="none">
            {titleMark ? <SnuffleMark size="inline" /> : null}
            <View style={styles.titleText}>
              <Text variant="headline" numberOfLines={1} accessibilityRole="header">
                {title}
              </Text>
            </View>
          </Animated.View>
        )}
        <View style={styles.trailing} pointerEvents="box-none">
          <BarActions actions={trailing} />
          {trailingPhoto ? <PhotoButton {...trailingPhoto} /> : null}
          {confirm ? <ConfirmButton onPress={confirm.onPress} label={confirm.label} /> : null}
        </View>
      </View>
    </Animated.View>
    </>
  );
});

export type LargeTitleProps = {
  title: string;
  scroll?: NavBarScroll;
  /** A root screen (Nearby, Requests): Display large, 48. Otherwise Display title, 40. Both Gambetta (typography.md). */
  display?: boolean;
  /** Scroll offset at which the title starts to fade; when content sits above it (Nearby's area row). */
  offset?: number;
};

/** The large title at the top of the scroll content, in Gambetta; fades as it scrolls under the bar. The screen sets
 *  the space around it (spacing.md: gap.aboveTitle above, gap.title below). */
export const LargeTitle = memo(function LargeTitle({ title, scroll, display = false, offset = 0 }: LargeTitleProps) {
  const { theme } = useUnistyles();
  const fallback = useSharedValue(0);
  const scrollY = scroll?.scrollY ?? fallback;
  const variant = display ? 'displayLarge' : 'displayTitle';
  const height = theme.type[variant].lineHeight;
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

/** Height of the bar plus the top inset (the safe area by default), for the scroll content's top padding. `tall` is the bar with a subtitle (a chat). */
export function useNavBarHeight(topInset?: number, tall = false): number {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const top = topInset ?? insets.top;
  return top + barHeightFor(theme, tall);
}

const styles = StyleSheet.create((theme) => ({
  bar: (top: number) => ({ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: top, zIndex: 2 }),
  row: (height: number, margin: number) => ({
    height,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
    paddingHorizontal: margin,
  }),
  titleSlot: { flex: 1 },
  // The chat's title block: centred on the screen between the Back circle's width and the same width on the right.
  centredSlot: (inset: number) => ({ position: 'absolute', top: 0, bottom: 0, left: inset, right: inset, alignItems: 'center', justifyContent: 'center' }),
  centredLine: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2], maxWidth: '100%' },
  solid: (height: number, color: string, edge: string) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
    backgroundColor: color,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: edge,
  }),
  titleWithMark: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  titleText: { flexShrink: 1 },
  subtitleRow: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  // 28 pt with a 1 pt Border edge, clipped to a 6 pt radius (half the inner radius): at 20 pt the photo read as a
  // grey blur (visual critique).
  thumb: {
    width: theme.size.thumb.nav,
    height: theme.size.thumb.nav,
    borderRadius: theme.radius.inner / 2,
    borderWidth: theme.size.edge.control,
    borderColor: theme.color.border,
    overflow: 'hidden',
  },
  thumbTile: (accent: ShopAccentName) => ({ backgroundColor: theme.color.shop.accent[accent].tile }),
  trailing: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2], marginLeft: 'auto' },
  photoButton: {
    width: theme.hit.min,
    height: theme.hit.min,
    borderRadius: theme.radius.full,
    borderWidth: theme.size.edge.control,
    borderColor: theme.color.border,
    // Before the photo loads the circle is Muted, not an empty ring.
    backgroundColor: theme.color.muted,
    overflow: 'hidden',
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  capsule: { flexDirection: 'row', alignItems: 'center', height: theme.hit.min, borderRadius: theme.radius.full, paddingHorizontal: theme.space[1] },
  barButton: { width: theme.hit.min - theme.space[1], height: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
  large: { transformOrigin: 'left' },
}));
