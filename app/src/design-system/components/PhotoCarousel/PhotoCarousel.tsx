// The shop page's photo carousel (app flow v10, "Shop page"; Airbnb's listing page is the reference): the shop's
// photos at radius.card, one at a time at the full content width, paging with dots, and a black scrim fading up
// from the bottom of each photo, with the dots in a black pill, so they hold their contrast on any picture. A tap on a photo asks the
// page to open the Lightbox; each photo registers as a zoom origin so the viewer grows from it.
import { Image } from 'expo-image';
import { memo, useEffect, useId, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
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

export const PhotoCarousel = memo(function PhotoCarousel({ photos, name, accent, originId, onOpen, page: pageProp, onPageChange }: PhotoCarouselProps) {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const margin = screenMargin(theme, frame.width);
  const width = frame.width - 2 * margin;
  const height = carouselHeight(theme, width);
  const scroller = useRef<Animated.ScrollView>(null);
  const [own, setOwn] = useState(0);
  const page = pageProp ?? own;
  // The page the scroll view last reported, so a change that came from it isn't scrolled to again.
  const reported = useRef(0);
  const fallbackId = useId();
  const origin = originId ?? fallbackId;

  useEffect(() => {
    if (pageProp != null && pageProp !== reported.current) {
      reported.current = pageProp;
      scroller.current?.scrollTo({ x: pageProp * frame.width, animated: false });
    }
  }, [pageProp, frame.width]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.max(0, Math.min(photos.length - 1, Math.round(e.nativeEvent.contentOffset.x / frame.width)));
    if (next !== reported.current) {
      reported.current = next;
      setOwn(next);
      onPageChange?.(next);
    }
  };

  if (photos.length === 0) return null;
  const many = photos.length > 1;
  return (
    <View style={styles.root(height)}>
      <Animated.ScrollView
        ref={scroller}
        horizontal
        pagingEnabled
        scrollEnabled={many}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        accessibilityLabel={`${name} photos`}
      >
        {photos.map((photo, i) => (
          <View key={`${i}-${photo.label}`} style={styles.page(frame.width, margin)}>
            <ZoomOrigin id={`${origin}:${i}`} style={styles.photo(width, height)}>
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
          </View>
        ))}
      </Animated.ScrollView>
      {many ? (
        <View style={styles.dots(margin)} pointerEvents="none">
          <View style={styles.pill}>
            <PageDots count={photos.length} current={page} on="photo" />
          </View>
        </View>
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
  root: (height: number) => ({ height }),
  page: (width: number, margin: number) => ({ width, paddingHorizontal: margin }),
  photo: (width: number, height: number) => ({ ...cornerCurve, width, height, borderRadius: theme.radius.card, overflow: 'hidden' }),
  fill: { flex: 1 },
  dots: (margin: number) => ({ position: 'absolute', left: margin, right: margin, bottom: theme.space[3], alignItems: 'center' }),
  // The dots sit in a black pill over the scrim, so they hold on a pale photo too.
  pill: {
    paddingHorizontal: theme.space[2],
    paddingVertical: theme.space[1],
    borderRadius: theme.radius.full,
    backgroundColor: withAlpha(theme.color.photoScrim, theme.state.photoPill),
  },
}));
