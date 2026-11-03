// Shop page header (components.md) and the scroll behaviour from the v7 "Scroll" storyboard: a map fixed
// behind the whole screen, up to three photos that slide in from the right over it, and a content card that
// rests inset from the screen edges, grows to the full width as the scroll starts, scrolls up over the photos,
// fills the screen, then hands its title to the nav bar. The bar is pinned: the glass Back circle always shows, and
// the name fades in over the scroll-edge material once the large title has passed under it (visual critique 2).
// Every scroll-driven value runs in a Reanimated scroll handler on the UI thread.
import { Image } from 'expo-image';
import { memo, useState, type ReactNode } from 'react';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Platform, ScrollView, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { cornerCurve, screenMargin, type ShopAccentName } from '../../theme';
import { Map } from '../Map/Map';
import { NavBar, useNavBarHeight, useNavBarScroll } from '../NavBar/NavBar';
import { tileWidth } from '../ShopTile/ShopTile';
import { Text } from '../Text/Text';

// Photos fade in over the placeholder, as on tiles (spring.fade's 0.25 s; expo-image takes a duration).
const PHOTO_FADE_MS = 250;
const PHOTO_RATIO = 3 / 2;
const MAX_PHOTOS = 3;
// The card's two halves overlap by a pixel more than they need to, so no seam shows where they meet.
const SEAM = 1;

export type ShopPhoto = {
  /** A bundled image or a URL. */
  source: PhotoSource;
  /** "Rossi's Bakery shopfront, Blythe Road" */
  label: string;
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
  /** Ask, Call and Directions, right under the status lines: one row of capsule buttons that scrolls sideways. */
  actions?: ReactNode;
  /** Badges and status tags (Promoted, New, Delivers): one row that scrolls sideways, under the name. */
  tags?: ReactNode;
  /** The shop's accent (colour.md, Shop accents): a solid wash behind the top of the card (name, status, tags and
   *  actions) that ends at a straight edge, edge to edge once the card fills the screen, and the tonal tile under
   *  each photo. */
  accent?: ShopAccentName;
  /** The rest of the card: past answers, how the shop works. */
  children: ReactNode;
};

export const ShopPageLayout = memo(function ShopPageLayout({ name, photos = [], onBack, backLabel, mapLoading = false, status = [], actions, tags, accent, children }: ShopPageLayoutProps) {
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
  // The title has scrolled under the bar: the bar shows its inline title over the scroll-edge material (step 3).
  const revealAt = expandTo + theme.space[6] + theme.type.displayTitle.lineHeight;
  const scroll = useNavBarScroll();
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
  // The content's sides follow the card's edges, so the padding inside the card stays inset.card while the card
  // grows to the full width (the text reflows with it, on the UI thread).
  const pad = theme.space[5];
  const innerStyle = useAnimatedStyle(() => {
    const s = surface(scrollY.get());
    return { paddingLeft: s.x + pad, paddingRight: s.x + pad };
  });
  // The photos stay put while the card slides over them (they live in the scroll content so they can be swiped).
  const photosStyle = useAnimatedStyle(() => ({ transform: [{ translateY: Math.max(0, scrollY.get()) }] }));

  // The accent covers the bar-height above the card, its top padding and the top block (name, status, tags,
  // actions and the block's bottom padding), measured once on layout (never while scrolling), and ends there at a
  // straight edge; the rest of the card is the Background.
  const [headerH, setHeaderH] = useState(0);
  const onHeader = (e: LayoutChangeEvent) => setHeaderH(e.nativeEvent.layout.height);
  const washH = headerH > 0 ? navH + theme.space[6] + headerH : 0;
  // The halves slide down by up to a bar-height at rest; the wash moves back up by the same amount, so its edge
  // stays at the end of the top block while the part above the card is clipped.
  const washStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -surface(scrollY.get()).y }] }));

  const shown = photos.slice(0, MAX_PHOTOS);
  const peek = theme.size.peek;
  const lead = frame.width - peek;
  const gutter = theme.layout.gutter;
  const railWidth = lead + shown.length * photoW + Math.max(0, shown.length - 1) * gutter + margin;
  const maxX = Math.max(0, railWidth - frame.width);
  const snaps = [0, ...shown.map((_, i) => Math.min(maxX, lead + i * (photoW + gutter) - margin))];
  // The page capsule reads the photo nearest the snap point ("1/3"); the map position counts as the first photo.
  const [page, setPage] = useState(0);
  const onPhotos = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const nearest = snaps.reduce((best, s, i) => (Math.abs(s - x) < Math.abs(snaps[best] - x) ? i : best), 0);
    const next = Math.max(0, nearest - 1);
    if (next !== page) setPage(next);
  };

  return (
    <View style={styles.root}>
      <View style={styles.map}>
        <Map
          loading={mapLoading}
          extent={{ width: frame.width, height: frame.height, pinY: (navH + restTop) / 2, attributionY: shown.length > 0 ? photosTop + photoH + theme.space[1] : undefined }}
        />
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
                onScroll={onPhotos}
                scrollEventThrottle={16}
                contentContainerStyle={styles.photoRail(lead, margin)}
                accessibilityLabel={`${name} photos`}
              >
                {shown.map((photo, i) => (
                  <Photo key={`${i}-${photo.label}`} photo={photo} name={name} accent={accent} width={photoW} height={photoH} />
                ))}
              </ScrollView>
              {shown.length > 1 ? (
                <View style={styles.pager(photoH, margin)} pointerEvents="none">
                  <FloatingSurface style={styles.pagerCapsule}>
                    <Text variant="caption1Strong" accessibilityLabel={`Photo ${page + 1} of ${shown.length}`}>
                      {`${page + 1}/${shown.length}`}
                    </Text>
                  </FloatingSurface>
                </View>
              ) : null}
            </Animated.View>
          ) : null}
        </View>

        {/* Tall enough for the title to pass under the bar and for the bar to hide, however short the content. */}
        <View style={styles.card(frame.height - restTop + revealAt + navH)}>
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin + SEAM, 'left'), leftStyle]}>
            {accent && washH > 0 ? <Animated.View style={[styles.wash(accent, washH), washStyle]} /> : null}
          </Animated.View>
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin + SEAM, 'right'), rightStyle]}>
            {accent && washH > 0 ? <Animated.View style={[styles.wash(accent, washH), washStyle]} /> : null}
          </Animated.View>
          <Animated.View style={[styles.inner, innerStyle]}>
            <View style={styles.top} onLayout={onHeader}>
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
              {tags ? <Rail label={`${name} tags`}>{tags}</Rail> : null}
              {actions ? <Rail label={`${name} actions`}>{actions}</Rail> : null}
            </View>
            <View style={styles.body}>{children}</View>
          </Animated.View>
        </View>
      </Animated.ScrollView>

      <NavBar
        title={name}
        mode="reveal"
        revealAt={revealAt}
        fill="background"
        fillBefore={accent && washH > 0 ? { fill: { accent }, until: restTop + theme.space[6] + headerH - navH } : undefined}
        leading="back"
        backLabel={backLabel}
        onLeading={onBack}
        scroll={scroll}
      />
    </View>
  );
});

/** A row that scrolls sideways and bleeds to the card's edges, so a long row never wraps or stacks. */
function Rail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} accessibilityLabel={label} style={styles.rail} contentContainerStyle={styles.railContent}>
      {children}
    </ScrollView>
  );
}

function Photo({ photo, name, accent, width, height }: { photo: ShopPhoto; name: string; accent?: ShopAccentName; width: number; height: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={photo.label} style={styles.photo(width, height)}>
      <ShopPlaceholder name={name} accent={accent} />
      {failed ? null : (
        <Image source={photoSource(photo.source)} style={IMAGE_OVER} contentFit="cover" transition={PHOTO_FADE_MS} accessible={false} onError={() => setFailed(true)} />
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
  photoRail: (lead: number, margin: number) => ({ paddingLeft: lead, paddingRight: margin, gap: theme.layout.gutter }),
  photo: (width: number, height: number) => ({
    ...cornerCurve,
    width,
    height,
    borderRadius: theme.radius.bubble,
    overflow: 'hidden',
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
    overflow: 'hidden',
    // The card is the screen's Background; its rows sit on Card under the delicate shadow (craft-pass-2).
    backgroundColor: theme.color.background,
  }),
  wash: (accent: ShopAccentName, height: number) => ({ height, backgroundColor: theme.color.shop.accent[accent].tile }),
  pager: (photoH: number, margin: number) => ({ position: 'absolute', top: photoH - theme.space[2] - theme.size.badge - theme.space[1], right: margin + theme.space[2] }),
  pagerCapsule: { borderRadius: theme.radius.full, paddingHorizontal: theme.space[2], paddingVertical: theme.space[1] / 2 },
  // The sides are animated with the card's edges (innerStyle); padding inside the card is 20 (space.5) throughout.
  inner: {
    paddingTop: theme.space[6],
    paddingBottom: theme.space[8],
  },
  // The top block ends 24 below the actions, where the wash ends; the body starts 24 below that edge.
  top: { gap: theme.space[3], paddingBottom: theme.space[6] },
  body: { paddingTop: theme.space[6], gap: theme.gap.section },
  rail: { marginHorizontal: -theme.space[5], flexGrow: 0 },
  railContent: { paddingHorizontal: theme.space[5], gap: theme.space[2], alignItems: 'center' },
  header: { gap: theme.space[1] },
}));
