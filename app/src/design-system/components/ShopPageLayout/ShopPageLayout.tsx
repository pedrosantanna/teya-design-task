// Shop page header (components.md) and the scroll behaviour from the v7 "Scroll" storyboard, with the v10 photo
// carousel: a map fixed behind the whole screen and a card, close under a strip of map with the pin centred in it,
// that rests inset from the screen edges by a sliver of map, grows to the full width as the scroll starts, scrolls up over the map,
// fills the screen, then hands its title to the nav bar. The card is the shop's accent tile (round 10, decision 056).
// Everything in it is a container that grows with the card and keeps its left edge on the card's; only the text blocks
// keep the width they have at rest. The shop's photos are in the card, after the actions, clipped by it. The bar is pinned: the glass Back circle
// always shows, and the name fades in over the scroll-edge material once the large title has passed under it (visual
// critique 2). Every scroll-driven value runs in a Reanimated scroll handler on the UI thread. A tap on a photo opens
// the Lightbox, which grows from it.
import { createContext, memo, useContext, useId, useState, type ReactNode } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Ground } from '../../internal/ground';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { Map } from '../Map/Map';
import { NavBar, useNavBarHeight, useNavBarScroll } from '../NavBar/NavBar';
import { Lightbox } from '../Lightbox/Lightbox';
import { PhotoCarousel, type ShopPhoto } from '../PhotoCarousel/PhotoCarousel';
import { ShopMeta, type ShopFacts } from '../ShopMeta/ShopMeta';
import { Text } from '../Text/Text';

// The card's two halves overlap by a pixel more than they need to, so no seam shows where they meet.
const SEAM = 1;

export type { ShopPhoto };

export type ShopPageLayoutProps = {
  /** The shop's name: the large title in Display title, then the bar's inline title. */
  name: string;
  /** The shop's photos, in the carousel inside the card after the actions; a tap opens the Lightbox. */
  photos?: ShopPhoto[];
  /** Back to the screen that pushed the page (Nearby): the shop page is the shop's detail, so it has Back. */
  onBack: () => void;
  /** The previous screen's title, beside the chevron once the bar fills ("Nearby"). */
  backLabel?: string;
  /** The map ground alone while the shop's place is loading. */
  mapLoading?: boolean;
  /** Under the name: the status on its own line ("Open until 6pm"), then the walk, the street, Delivers and New as icon-led groups (content.md, Metadata lines). */
  facts?: ShopFacts;
  /** Ask, Call and Directions, right under the status lines: one row of capsule buttons that scrolls sideways. */
  actions?: ReactNode;
  /** The shop's accent (colour.md, Shop accents). Its tile is the card's ground, light and dark; rows, chips and buttons take their on-tile colours. */
  accent?: ShopAccentName;
  /** The rest of the card: past answers, how the shop works. */
  children: ReactNode;
};

// The width text keeps while the card grows: the width it has at rest.
const TextWidth = createContext<number | undefined>(undefined);

/** A paragraph in the card that keeps the width it has at rest, so its line breaks never change while the card grows;
 *  its start follows the card's edge. Containers (rows, chips, photos, review cards) grow instead. */
export function ShopPageText({ children }: { children: ReactNode }) {
  const width = useContext(TextWidth);
  return <View style={styles.text(width)}>{children}</View>;
}

export const ShopPageLayout = memo(function ShopPageLayout({ name, photos = [], onBack, backLabel, mapLoading = false, facts, actions, accent, children }: ShopPageLayoutProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const navH = useNavBarHeight();
  // The map shows at the card's sides by this much at rest (space.3, on the grid), and the card pads its content by space.6.
  const margin = theme.space[3];
  const pad = theme.space[6];

  // Geometry, all from tokens. The strip of map above the card is measured from the top of the screen (the safe area
  // included); the shop's pin sits at its middle: the same distance from the pin to the screen's top as from the pin to the card.
  const hasPhotos = photos.length > 0;
  const restTop = navH + theme.space[8];
  // The glyph's ink runs from 2 to 22 of 24 (its tip is the anchor); its middle is half the ink above the tip.
  const pinInk = (theme.size.avatar.shop * (PIN_TIP - PIN_TOP)) / PIN_BOX;
  const pinY = restTop / 2 + pinInk / 2;
  // The card's top edge reaches the screen's top over the last bar-height of travel (step 2 of the storyboard); with a
  // short strip that starts at once.
  const expandFrom = Math.max(0, restTop - 2 * navH);
  const expandTo = restTop - navH;
  // The title has scrolled under the bar: the bar shows its inline title over the scroll-edge material (step 3).
  const revealAt = expandTo + theme.space[6] + theme.type.displayTitle.lineHeight;
  const scroll = useNavBarScroll();
  const scrollY = scroll.scrollY;

  // Step 1: at rest the card is inset by the margin with radius.card corners, the map showing at its sides. Over the first
  // stretch of scroll it grows to the full width and its corners go to radius.sheet. Under Reduce Motion it jumps between the two.
  const growTo = theme.space[6];
  const reduceMotion = useReducedMotion();
  const restRadius = theme.radius.card;
  const bleedRadius = theme.radius.sheet;
  const growStep = theme.space[2];
  // The surface is two opaque halves, each wider than half the screen, that slide out to the edges: transforms only.
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
  // The content sits in the card's edges: its margin is what is left of the sliver of map, so every container in it
  // grows with the card and keeps its left edge on the card's. The text blocks keep the width they have at rest.
  const contentStyle = useAnimatedStyle(() => {
    const x = surface(scrollY.get()).x;
    return { marginLeft: x, marginRight: x };
  });
  const textWidth = frame.width - 2 * (margin + pad);
  // How much wider the photos are now than at rest.
  const photoGrow = useDerivedValue(() => 2 * (margin - surface(scrollY.get()).x));
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
          extent={{ width: frame.width, height: frame.height, pinY, attributionY: restTop - theme.space[5] - theme.space[2] }}
        />
      </View>

      <Animated.ScrollView
        style={styles.fill}
        onScroll={scroll.onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* The map shows through the strip above the card. */}
        <View style={styles.rest(restTop)} />

        {/* Tall enough for the title to pass under the bar and for the bar to hide, however short the content. */}
        <View style={styles.card(frame.height - restTop + revealAt + navH)}>
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin + SEAM, 'left', accent), leftStyle]} />
          <Animated.View pointerEvents="none" style={[styles.half(navH, frame.height, frame.width / 2 + margin + SEAM, 'right', accent), rightStyle]} />
          <Animated.View style={[styles.inner(pad), contentStyle]}>
            {/* The whole card is the accent's tile: rows take its cardOnTile, chips and tonal buttons their on-tile colours. */}
            <Ground value={accent ? 'tile' : 'background'} accent={accent}>
              <TextWidth.Provider value={textWidth}>
                <View style={styles.top}>
                  <View style={styles.header(textWidth)}>
                    <Text variant="displayTitle" accessibilityRole="header" numberOfLines={2}>
                      {name}
                    </Text>
                    {facts ? <ShopMeta layout="stacked" size="subheadline" {...facts} /> : null}
                  </View>
                  {actions ? <Rail label={`${name} actions`} pad={pad}>{actions}</Rail> : null}
                </View>
                {/* A group of its own: a section's distance above (to the actions) and below (to the first heading). */}
                {hasPhotos ? (
                  <View style={styles.photos}>
                    <PhotoCarousel
                      photos={photos}
                      name={name}
                      accent={accent}
                      width={textWidth}
                      grow={photoGrow}
                      originId={originId}
                      page={page}
                      onPageChange={setPage}
                      onOpen={setViewer}
                    />
                  </View>
                ) : null}
                <View style={styles.body}>{children}</View>
              </TextWidth.Provider>
            </Ground>
          </Animated.View>
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
        fill={accent ? { accent } : 'background'}
        leading="back"
        backLabel={backLabel}
        onLeading={onBack}
        scroll={scroll}
      />
    </View>
  );
});

// The pin glyph's box and ink (MapParts): the tip is at 22 of 24 and its top at 2.
const PIN_BOX = 24;
const PIN_TIP = 22;
const PIN_TOP = 2;

/** A row that scrolls sideways and bleeds to the card's edges, so a long row never wraps or stacks: it starts at the text's
 *  edge and runs under the card's. It is as wide as the card, so it grows with it. */
function Rail({ label, pad, children }: { label: string; pad: number; children: ReactNode }) {
  return (
    <View style={styles.rail(pad)}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} accessibilityLabel={label} contentContainerStyle={styles.railContent(pad)}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: { flex: 1, backgroundColor: theme.color.mapGround },
  fill: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  rest: (height: number) => ({ height }),
  card: (minHeight: number) => ({ minHeight }),
  // Each half of the card's surface reaches a bar-height above the card and, on native, well below it to cover a
  // bounce at the bottom; it is moved, never resized. On the web an absolute child counts towards the scroll
  // height, so there it ends with the card (the web has no bounce to cover).
  half: (navH: number, height: number, width: number, side: 'left' | 'right', accent?: ShopAccentName) => ({
    ...cornerCurve,
    position: 'absolute',
    top: -navH,
    bottom: Platform.OS === 'web' ? 0 : -height,
    [side]: 0,
    width,
    overflow: 'hidden',
    // The card is the shop's accent tile, light and dark (1.3 to 1.35:1 from the map in light, 1.7:1 or more in dark).
    backgroundColor: accent ? theme.color.shop.accent[accent].tile : theme.color.background,
  }),
  // The content's padding inside the card; its margin (animated) is the sliver of map still at the sides.
  inner: (pad: number) => ({
    paddingTop: theme.space[6],
    paddingBottom: theme.space[8],
    paddingHorizontal: pad,
  }),
  text: (width?: number) => ({ width, alignSelf: 'flex-start' }),
  header: (width: number) => ({ width, gap: theme.space[2] }),
  // The actions sit close under the status lines (a block's distance, space.3).
  top: { gap: theme.space[3] },
  // The photos are a group of their own: a section's distance from the actions above and from the first heading below.
  photos: { paddingTop: theme.gap.section },
  body: { paddingTop: theme.gap.section, gap: theme.gap.section },
  rail: (pad: number) => ({ flexGrow: 0, marginHorizontal: -pad }),
  railContent: (pad: number) => ({ paddingHorizontal: pad, gap: theme.space[2], alignItems: 'center' }),
}));
