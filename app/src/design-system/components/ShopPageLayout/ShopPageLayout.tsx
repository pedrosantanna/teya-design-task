// Shop page header (components.md) and the scroll behaviour from the v7 "Scroll" storyboard: a map fixed
// behind the whole screen, up to three photos that slide in from the right over it, and a content card that
// rests inset from the screen edges, grows to the full width as the scroll starts, scrolls up over the photos,
// fills the screen, then hands its title to the nav bar, which hides while the content scrolls up and returns on
// a scroll down. Every scroll-driven value runs in a Reanimated scroll handler on the UI thread.
import { Image } from 'expo-image';
import { memo, useState, type ReactNode } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IMAGE_FILL } from '../../internal/media';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { cornerCurve, screenMargin } from '../../theme';
import { Map } from '../Map/Map';
import { NavBar, useNavBarHeight, useNavBarScroll } from '../NavBar/NavBar';
import { tileWidth } from '../ShopTile/ShopTile';
import { Text } from '../Text/Text';

// Photos fade in over the placeholder, as on tiles (spring.fade's 0.25 s; expo-image takes a duration).
const PHOTO_FADE_MS = 250;
const PHOTO_RATIO = 3 / 2;
const MAX_PHOTOS = 3;

export type ShopPhoto = {
  uri: string;
  /** "Rossi's Bakery shopfront, Blythe Road" */
  label: string;
  /** "Photo: Clara Lilley, Unsplash" */
  credit?: string;
};

export type ShopPageLayoutProps = {
  /** The shop's name: the large title in Display title, then the bar's inline title. */
  name: string;
  /** Up to three; the first position leaves the map in view and the first photo peeks in from the right. */
  photos?: ShopPhoto[];
  /** Back to the screen that pushed the page (Nearby): the shop page is the shop's detail, so it has Back. */
  onBack: () => void;
  /** The previous screen's title, beside the chevron once the bar fills ("Nearby"). */
  backLabel?: string;
  /** The map ground alone while the shop's place is loading. */
  mapLoading?: boolean;
  /** Lines under the name: "Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice". */
  status?: string[];
  /** Ask, Call and Directions, right under the status lines. */
  actions?: ReactNode;
  /** The rest of the card: actions, past answers, credits. */
  children: ReactNode;
};

export const ShopPageLayout = memo(function ShopPageLayout({ name, photos = [], onBack, backLabel, mapLoading = false, status = [], actions, children }: ShopPageLayoutProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const navH = useNavBarHeight();
  const margin = screenMargin(theme, frame.width);
  const content = frame.width - 2 * margin;

  // Geometry, all from tokens: photos at tile.large width and 3:2 under the bar; the card rests below them.
  const photoW = tileWidth(theme, content, 'large');
  const photoH = photoW / PHOTO_RATIO;
  const photosTop = navH + theme.space[2];
  const restTop = photosTop + photoH + theme.space[6];
  // The card's top edge reaches the screen's top over the last bar-height of travel (step 2 of the storyboard).
  const expandFrom = restTop - 2 * navH;
  const expandTo = restTop - navH;
  // The title has scrolled under the bar: the bar shows its inline title (step 3) and may hide from then on.
  const revealAt = expandTo + theme.space[6] + theme.type.displayTitle.lineHeight;
  const scroll = useNavBarScroll(true, revealAt);
  const scrollY = scroll.scrollY;

  // Step 1: at rest the card is inset by the screen margin with radius.card corners, the map showing at its sides.
  // Over the first stretch of scroll it grows to the full width and its corners go to radius.sheet. Under Reduce
  // Motion it jumps between the two.
  const growTo = Math.max(theme.space[2], Math.min(expandFrom, navH));
  const reduceMotion = useReducedMotion();
  const restRadius = theme.radius.card;
  const bleedRadius = theme.radius.sheet;
  const growStep = theme.space[2];
  // The surface is two opaque halves, each wider than half the screen, that slide out to the edges: transforms
  // only, so nothing is laid out again while scrolling and the text inside never moves or stretches.
  const surface = (y: number) => {
    'worklet';
    const g = reduceMotion ? (y > growStep ? 1 : 0) : interpolate(y, [0, growTo], [0, 1], Extrapolation.CLAMP);
    const p = interpolate(y, [expandFrom, expandTo], [0, 1], Extrapolation.CLAMP);
    return { x: margin * (1 - g), y: navH * (1 - p), r: (restRadius + (bleedRadius - restRadius) * g) * (1 - p) };
  };
  const leftStyle = useAnimatedStyle(() => {
    const s = surface(scrollY.get());
    return { transform: [{ translateX: s.x }, { translateY: s.y }], borderTopLeftRadius: s.r };
  });
  const rightStyle = useAnimatedStyle(() => {
    const s = surface(scrollY.get());
    return { transform: [{ translateX: -s.x }, { translateY: s.y }], borderTopRightRadius: s.r };
  });
  // The photos stay put while the card slides over them (they live in the scroll content so they can be swiped).
  const photosStyle = useAnimatedStyle(() => ({ transform: [{ translateY: Math.max(0, scrollY.get()) }] }));

  const shown = photos.slice(0, MAX_PHOTOS);
  const peek = theme.space[8];
  const lead = frame.width - peek;
  const gutter = theme.layout.gutter;
  const railWidth = lead + shown.length * photoW + Math.max(0, shown.length - 1) * gutter + margin;
  const maxX = Math.max(0, railWidth - frame.width);
  const snaps = [0, ...shown.map((_, i) => Math.min(maxX, lead + i * (photoW + gutter) - margin))];

  return (
    <View style={styles.root}>
      <View style={styles.map}>
        <Map loading={mapLoading} extent={{ width: frame.width, height: frame.height, pinY: (navH + restTop) / 2 }} />
      </View>

      <Animated.ScrollView
        style={styles.fill}
        onScroll={scroll.onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        <View style={styles.rest(restTop)}>
          {shown.length > 0 ? (
            <Animated.View style={[styles.photos(photosTop), photosStyle]}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToOffsets={snaps}
                decelerationRate="fast"
                contentContainerStyle={styles.rail(lead, margin)}
                accessibilityLabel={`${name} photos`}
              >
                {shown.map((photo) => (
                  <Photo key={photo.uri} photo={photo} name={name} width={photoW} height={photoH} />
                ))}
              </ScrollView>
            </Animated.View>
          ) : null}
        </View>

        {/* Tall enough for the title to pass under the bar and for the bar to hide, however short the content. */}
        <View style={styles.card(frame.height - restTop + revealAt + navH)}>
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin, 'left'), leftStyle]} />
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin, 'right'), rightStyle]} />
          <View style={styles.inner(margin)}>
            <View style={styles.top}>
              <View style={styles.header}>
                <Text variant="displayTitle" accessibilityRole="header" numberOfLines={2}>
                  {name}
                </Text>
                {status.map((line) => (
                  <Text key={line} variant="footnote" color="mutedForeground">
                    {line}
                  </Text>
                ))}
              </View>
              {actions}
            </View>
            {children}
          </View>
        </View>
      </Animated.ScrollView>

      <NavBar
        title={name}
        mode="reveal"
        revealAt={revealAt}
        fill="card"
        backgroundAt={expandTo}
        leading="back"
        backLabel={backLabel}
        onLeading={onBack}
        hideOnScroll
        scroll={scroll}
      />
    </View>
  );
});

function Photo({ photo, name, width, height }: { photo: ShopPhoto; name: string; width: number; height: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={photo.label} accessibilityHint={photo.credit} style={styles.photo(width, height)}>
      {failed ? (
        <ShopPlaceholder name={name} />
      ) : (
        <Image source={{ uri: photo.uri }} style={IMAGE_FILL} contentFit="cover" transition={PHOTO_FADE_MS} accessible={false} onError={() => setFailed(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: { flex: 1, backgroundColor: theme.color.mapGround },
  fill: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  rest: (height: number) => ({ height }),
  photos: (top: number) => ({ position: 'absolute', top, left: 0, right: 0 }),
  rail: (lead: number, margin: number) => ({ paddingLeft: lead, paddingRight: margin, gap: theme.layout.gutter }),
  photo: (width: number, height: number) => ({
    ...cornerCurve,
    width,
    height,
    borderRadius: theme.radius.bubble,
    overflow: 'hidden',
    backgroundColor: theme.color.muted,
  }),
  card: (minHeight: number) => ({ minHeight }),
  // Each half of the card's surface reaches a bar-height above the card and, on native, well below it to cover a
  // bounce at the bottom; it is moved, never resized. On the web an absolute child counts towards the scroll
  // height, so there it ends with the card (the web has no bounce to cover).
  half: (navH: number, height: number, width: number, side: 'left' | 'right') => ({
    ...cornerCurve,
    position: 'absolute',
    top: -navH,
    bottom: Platform.OS === 'web' ? 0 : -height,
    [side]: 0,
    width,
    backgroundColor: theme.color.card,
  }),
  // The content keeps the resting inset (screen margin plus inset.card) at every scroll position.
  inner: (margin: number) => ({
    paddingHorizontal: margin + theme.inset.card,
    paddingTop: theme.space[6],
    paddingBottom: theme.space[8],
    gap: theme.gap.section,
  }),
  top: { gap: theme.space[4] },
  header: { gap: theme.space[1] },
}));
