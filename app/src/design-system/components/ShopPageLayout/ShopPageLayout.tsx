// Shop page header (components.md) and the scroll behaviour from the v7 "Scroll" storyboard, with the v10 photo
// carousel: a map fixed behind the whole screen, the shop's photos in a carousel under the pin that scrolls with the
// content, and a card that rests inset from the screen edges, grows to the full width as the scroll starts, scrolls
// up over the map, fills the screen, then hands its title to the nav bar. The bar is pinned: the glass Back circle
// always shows, and the name fades in over the scroll-edge material once the large title has passed under it (visual
// critique 2). Every scroll-driven value runs in a Reanimated scroll handler on the UI thread. A tap on a photo opens
// the Lightbox, which grows from it.
import { memo, useId, useState, type ReactNode } from 'react';
import { Platform, ScrollView, View, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle, Extrapolation, interpolate, useAnimatedStyle, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Ground } from '../../internal/ground';
import { cornerCurve, screenMargin, type ShopAccentName } from '../../theme';
import { Map } from '../Map/Map';
import { NavBar, useNavBarHeight, useNavBarScroll } from '../NavBar/NavBar';
import { Lightbox } from '../Lightbox/Lightbox';
import { PhotoCarousel, carouselHeight, type ShopPhoto } from '../PhotoCarousel/PhotoCarousel';
import { ShopMeta, type ShopFacts } from '../ShopMeta/ShopMeta';
import { Text } from '../Text/Text';

// The card's two halves overlap by a pixel more than they need to, so no seam shows where they meet.
const SEAM = 1;

export type { ShopPhoto };

export type ShopPageLayoutProps = {
  /** The shop's name: the large title in Display title, then the bar's inline title. */
  name: string;
  /** The shop's photos, in the carousel under the pin; a tap opens the Lightbox. */
  photos?: ShopPhoto[];
  /** Back to the screen that pushed the page (Nearby): the shop page is the shop's detail, so it has Back. */
  onBack: () => void;
  /** The previous screen's title, beside the chevron once the bar fills ("Nearby"). */
  backLabel?: string;
  /** The map ground alone while the shop's place is loading. */
  mapLoading?: boolean;
  /** Under the name: the status on its own line ("Open until 6pm"), then the walk and the street as icon-led units (content.md, Metadata lines). */
  facts?: ShopFacts;
  /** Ask, Call and Directions, right under the status lines: one row of capsule buttons that scrolls sideways. */
  actions?: ReactNode;
  /** Badges (Promoted, New, Delivers): one row that scrolls sideways, under the facts. */
  tags?: ReactNode;
  /** The shop's accent (colour.md, Shop accents). The card is neutral (a warm grey in both modes); the accent shows only in small
   *  details: the chips, the map pin, and the tonal tile under each photo. */
  accent?: ShopAccentName;
  /** The rest of the card: past answers, how the shop works. */
  children: ReactNode;
};

export const ShopPageLayout = memo(function ShopPageLayout({ name, photos = [], onBack, backLabel, mapLoading = false, facts, actions, tags, accent, children }: ShopPageLayoutProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const navH = useNavBarHeight();
  const margin = screenMargin(theme, frame.width);
  const content = frame.width - 2 * margin;

  // Geometry, all from tokens: the map's pin sits in the band under the bar; the carousel follows, at the content width
  // and layout.carouselRatio; the card rests a space.2 under it. Without photos the card follows the pin band.
  const photoH = carouselHeight(theme, content);
  const hasPhotos = photos.length > 0;
  const carouselTop = navH + photoH / 2;
  const restTop = hasPhotos ? carouselTop + photoH + theme.space[2] : carouselTop + theme.space[6];
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
  // The text keeps the width it has at rest (the screen margin plus the card's padding on each side), so its line
  // breaks never change while the card grows: only the surface and the margin around the text grow. The Rails, which
  // scroll sideways and bleed to the card's edges, follow the surface's edges instead.
  const pad = theme.space[6];
  const side = margin + pad;
  const railClip = useAnimatedStyle(() => {
    const x = surface(scrollY.get()).x;
    return { marginLeft: x - side, marginRight: x - side };
  });
  const railShift = useAnimatedStyle(() => ({ marginLeft: -surface(scrollY.get()).x }));
  const railStyles = { clip: railClip, shift: railShift, side, width: frame.width };
  // The photo the Lightbox is open on, or null while it is closed; the carousel follows it.
  const [viewer, setViewer] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const originId = `shop-photo-${useId()}`;

  return (
    <View style={styles.root}>
      <View style={styles.map}>
        <Map
          loading={mapLoading}
          accent={accent}
          extent={{ width: frame.width, height: frame.height, pinY: (navH + carouselTop) / 2, attributionY: hasPhotos ? carouselTop - theme.space[5] : undefined }}
        />
      </View>

      <Animated.ScrollView
        style={styles.fill}
        onScroll={scroll.onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* The map shows through the band above the carousel. */}
        <View style={styles.rest(carouselTop)} />
        {hasPhotos ? (
          <PhotoCarousel
            photos={photos}
            name={name}
            accent={accent}
            originId={originId}
            page={page}
            onPageChange={setPage}
            onOpen={setViewer}
          />
        ) : null}
        <View style={styles.gap(hasPhotos ? theme.space[2] : theme.space[6])} />

        {/* Tall enough for the title to pass under the bar and for the bar to hide, however short the content. */}
        <View style={styles.card(frame.height - restTop + revealAt + navH)}>
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin + SEAM, 'left'), leftStyle]} />
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin + SEAM, 'right'), rightStyle]} />
          <View style={styles.inner(side)}>
            <View style={styles.top}>
              <View style={styles.header}>
                <Text variant="displayTitle" accessibilityRole="header" numberOfLines={2}>
                  {name}
                </Text>
                {facts ? <ShopMeta layout="stacked" size="subheadline" {...facts} /> : null}
              </View>
              {tags ? <Rail label={`${name} tags`} rail={railStyles}>{tags}</Rail> : null}
              {/* The tonal actions take the white overlay (state.tonalOnTile) in both modes: Muted is the card's own grey in light
                  and 1.05:1 on it in dark. */}
              {actions ? (
                <Ground value="tile">
                  <Rail label={`${name} actions`} rail={railStyles}>{actions}</Rail>
                </Ground>
              ) : null}
            </View>
            {/* Rows and chips step away from the card (Card white with a hairline in light, Muted in dark); the chips take the accent. */}
            <Ground value="shop" accent={accent}>
              <View style={styles.body}>{children}</View>
            </Ground>
          </View>
        </View>
      </Animated.ScrollView>

      {hasPhotos ? (
        <Lightbox
          photos={photos}
          open={viewer != null}
          index={viewer ?? page}
          onIndexChange={(i) => {
            setViewer(i);
            setPage(i);
          }}
          onClose={() => setViewer(null)}
          originId={originId}
        />
      ) : null}

      <NavBar
        title={name}
        mode="reveal"
        revealAt={revealAt}
        fill="shopPage"
        leading="back"
        backLabel={backLabel}
        onLeading={onBack}
        scroll={scroll}
      />
    </View>
  );
});

type RailStyles = { clip: AnimatedStyle<ViewStyle>; shift: AnimatedStyle<ViewStyle>; side: number; width: number };

/** A row that scrolls sideways and bleeds to the card's edges, so a long row never wraps or stacks. It is clipped to the
 *  card's edges (the animated `clip`) and holds a full-screen-wide scroller, so its chips stay where the text is. */
function Rail({ label, rail, children }: { label: string; rail: RailStyles; children: ReactNode }) {
  return (
    <Animated.View style={[styles.rail, rail.clip]}>
      <Animated.View style={[styles.railScroll(rail.width), rail.shift]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} accessibilityLabel={label} contentContainerStyle={styles.railContent(rail.side)}>
          {children}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: { flex: 1, backgroundColor: theme.color.mapGround },
  fill: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  rest: (height: number) => ({ height }),
  gap: (height: number) => ({ height }),
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
    // The card is a warm grey in light (Biscuit 915) and the Sheet colour in dark (shopPage.card); the rows step one level up
    // (Card white with a hairline in light, Muted in dark). A 1 pt top edge in dark lifts the card off the map.
    backgroundColor: theme.color.shopPage.card,
    borderTopWidth: 1,
    borderTopColor: theme.color.shopPage.cardEdge,
  }),
  // The text's width is fixed at its width at rest: the screen margin plus space.6 on each side.
  inner: (side: number) => ({
    paddingTop: theme.space[6],
    paddingBottom: theme.space[8],
    paddingHorizontal: side,
  }),
  // The first section heading sits a section's distance below the actions (spacing.md).
  top: { gap: theme.space[3] },
  body: { paddingTop: theme.gap.section, gap: theme.gap.section },
  rail: { flexGrow: 0, overflow: 'hidden' },
  // The scroller is as wide as the screen and starts at its left edge, whatever the clip's edge is.
  railScroll: (width: number) => ({ width }),
  railContent: (side: number) => ({ paddingHorizontal: side, gap: theme.space[2], alignItems: 'center' }),
  header: { gap: theme.space[2] },
}));
