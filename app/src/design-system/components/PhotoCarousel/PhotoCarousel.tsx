// The shop page's photo carousel (app flow v10, "Shop page"; Airbnb's listing page is the reference), inside the shop
// card (round 10): the shop's photos at radius.inner, one at a time at the container's width, clipped by the card, paging with dots, and a black scrim fading up
// from the bottom of each photo, with the dots in a black pill, so they hold their contrast on any picture. A tap on a photo asks the
// page to open the Lightbox; each photo registers as a zoom origin so the viewer grows from it.
import { Image } from 'expo-image';
import { memo, useEffect, useId, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Pressable, View } from 'react-native';
import Animated, { scrollTo, useAnimatedReaction, useAnimatedRef, useAnimatedStyle, useSharedValue, type SharedValue } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { cornerCurve, screenMargin, withAlpha, type ShopAccentName } from '../../theme';
import { PageDots } from '../PageDots/PageDots';
import { ZoomOrigin } from '../ZoomOrigin/ZoomOrigin';

// Photos fade in over the placeholder, as on tiles (spring.fade's 0.25 s; expo-image takes a duration).
const PHOTO_FADE_MS = 250;

export type ShopPhoto = {
  /** A bundled image or a URL. */
  source: PhotoSource;
  /** "Rossi's Bakery shopfront, Blythe Road" */
  label: string;
};

export type PhotoCarouselProps = {
  photos: ShopPhoto[];
  /** The shop's name, for the placeholder tile under a photo that is loading or missing. */
  name: string;
  accent?: ShopAccentName;
  /** The width of one photo at rest: the container's width on the shop page. Without it, the screen width minus two screen margins. */
  width?: number;
  /** How far the row runs past the container on each side, so photos scroll out to the edge of the surface (the shop
   *  card's padding) and are clipped there, while the photo at rest sits on the text's edge. */
  bleed?: number;
  /** Extra width the photos have now, in points, driven by the page's scroll: the card grows to the full width and the
   *  container with it. The photo's height stays the one at rest, so nothing below moves. */
  grow?: SharedValue<number>;
  /** Each photo registers as a zoom origin under `${originId}:${index}`; the Lightbox names the same prefix. */
  originId?: string;
  /** A tap on a photo (the Lightbox opens from it). */
  onOpen?: (index: number) => void;
  /** Controlled page; the carousel scrolls to it when it changes from outside (the Lightbox closed on another photo). */
  page?: number;
  onPageChange?: (page: number) => void;
};

/** The photo's height at the content width, from the carousel ratio. */
export function carouselHeight(theme: { layout: { carouselRatio: number } }, contentWidth: number) {
  return contentWidth / theme.layout.carouselRatio;
}

export const PhotoCarousel = memo(function PhotoCarousel({ photos, name, accent, width: widthProp, bleed = 0, grow, originId, onOpen, page: pageProp, onPageChange }: PhotoCarouselProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const margin = screenMargin(theme, frame.width);
  const width = widthProp ?? frame.width - 2 * margin;
  const height = carouselHeight(theme, width);
  const scroller = useAnimatedRef<Animated.ScrollView>();
  // The page's width now (rest width plus the growth), for paging maths on the JS side.
  // With more than one photo the next one peeks in: a photo is the container's width less `peek` and the `gap` to the
  // next, so 16 pt of the next photo shows. A page is a photo and its gap (the snap interval).
  const many = photos.length > 1;
  const peek = many ? theme.space[4] : 0;
  const gap = many ? theme.space[2] : 0;
  const pageWidth = useRef(width - peek);
  // The same, as state, for the scroll view's snap interval (it grows with the card).
  const [interval, setSnap] = useState(width - peek);
  const pageIndex = useSharedValue(0);
  const pageStyle = useAnimatedStyle(() => ({ width: width + (grow ? grow.get() : 0) - peek - gap, marginRight: gap }));
  // The dots are centred on the photo, not on the container.
  const dotsStyle = useAnimatedStyle(() => ({ width: width + (grow ? grow.get() : 0) - peek - gap }));
  // While the card grows, the photo being shown stays in view: its offset follows the page width.
  useAnimatedReaction(
    () => (grow ? grow.get() : 0),
    (extra, previous) => {
      if (previous != null && extra !== previous && pageIndex.get() > 0) scrollTo(scroller, pageIndex.get() * (width + extra - peek), 0, false);
    },
  );
  const [own, setOwn] = useState(0);
  const page = pageProp ?? own;
  // The page the scroll view last reported, so a change that came from it isn't scrolled to again.
  const reported = useRef(0);
  const fallbackId = useId();
  const origin = originId ?? fallbackId;

  useEffect(() => {
    if (pageProp != null && pageProp !== reported.current) {
      reported.current = pageProp;
      pageIndex.set(pageProp);
      scroller.current?.scrollTo({ x: pageProp * pageWidth.current, animated: false });
    }
  }, [pageProp, pageIndex, scroller]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.max(0, Math.min(photos.length - 1, Math.round(e.nativeEvent.contentOffset.x / pageWidth.current)));
    if (next !== reported.current) {
      reported.current = next;
      pageIndex.set(next);
      setOwn(next);
      onPageChange?.(next);
    }
  };

  if (photos.length === 0) return null;
  return (
    <View style={styles.root(height, bleed)}>
      <Animated.ScrollView
        ref={scroller}
        horizontal
        snapToInterval={many ? interval : undefined}
        snapToAlignment="start"
        contentContainerStyle={styles.rail(peek, bleed)}
        scrollEnabled={many}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={onScroll}
        onLayout={(e) => {
          pageWidth.current = e.nativeEvent.layout.width - 2 * bleed - peek;
          setSnap(pageWidth.current);
        }}
        scrollEventThrottle={16}
        accessibilityLabel={`${name} photos`}
      >
        {photos.map((photo, i) => (
          <Animated.View key={`${i}-${photo.label}`} style={[styles.page, pageStyle]}>
            <ZoomOrigin id={`${origin}:${i}`} style={styles.photo(height)}>
              <Pressable
                accessibilityRole="imagebutton"
                accessibilityLabel={many ? `${photo.label}, ${i + 1} of ${photos.length}` : photo.label}
                accessibilityHint="Opens the photo full screen"
                onPress={() => onOpen?.(i)}
                style={styles.fill}
              >
                <Photo photo={photo} name={name} accent={accent} />
              </Pressable>
            </ZoomOrigin>
          </Animated.View>
        ))}
      </Animated.ScrollView>
      {many ? (
        <Animated.View style={[styles.dots(bleed), dotsStyle]} pointerEvents="none">
          <View style={styles.pill}>
            <PageDots count={photos.length} current={page} on="photo" />
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
});

function Photo({ photo, name, accent }: { photo: ShopPhoto; name: string; accent?: ShopAccentName }) {
  const { theme } = useUnistyles();
  const [failed, setFailed] = useState(false);
  const id = `scrim${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <View style={styles.fill} accessible={false}>
      <ShopPlaceholder name={name} accent={accent} />
      {failed ? null : (
        <Image source={photoSource(photo.source)} style={IMAGE_OVER} contentFit="cover" transition={PHOTO_FADE_MS} accessible={false} onError={() => setFailed(true)} />
      )}
      {/* The scrim token: black at state.photoScrim along the bottom edge, gone by layout.photoScrimReach. */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <LinearGradient id={id} x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor={theme.color.photoScrim} stopOpacity={theme.state.photoScrim} />
            <Stop offset={String(theme.layout.photoScrimReach)} stopColor={theme.color.photoScrim} stopOpacity={0} />
            <Stop offset="1" stopColor={theme.color.photoScrim} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // With a bleed the row reaches past the container to the surface's edge and is clipped there; each photo keeps its corners.
  root: (height: number, bleed: number) =>
    bleed > 0 ? { height, marginHorizontal: -bleed } : { height, borderRadius: theme.radius.inner, overflow: 'hidden', ...cornerCurve },
  page: {},
  photo: (height: number) => ({ width: '100%', height, borderRadius: theme.radius.inner, overflow: 'hidden', ...cornerCurve }),
  fill: { flex: 1 },
  dots: (bleed: number) => ({ position: 'absolute', left: bleed, bottom: theme.space[3], alignItems: 'center' }),
  // The last photo can rest at the start of the container: the peek's width of room after it.
  rail: (peek: number, bleed: number) => ({ paddingLeft: bleed, paddingRight: peek + bleed }),
  // The dots sit in a black pill (state.photoPill, 20%) over the scrim, so they hold on a pale photo too.
  pill: {
    paddingHorizontal: theme.space[2],
    paddingVertical: theme.space[1],
    borderRadius: theme.radius.full,
    backgroundColor: withAlpha(theme.color.photoScrim, theme.state.photoPill),
  },
}));
