// First run, part 1 (app flow v8, area 0; openspec/changes/first-run): the splash moment, then Getting started
// in three pages. The splash is MarkIntro (motion.md, Splash): the mark builds itself on Indigo 800, which is also
// the native splash's colour and image, so the hand-off keeps the ground and the mark's last frame. It ends in two phases, never a
// cross-fade (two grounds at half opacity read as a double exposure, visual critique 3): the mark fades out on the
// splash ground, then the ground fades to the first page, which mounts when that starts. Pages swipe (a paging
// scroll view, native on every platform) or move on with Continue; Skip and the last page's Get started go to the location
// ask. `?page=0` (the journey step) opens on the pages without the splash; `?intro=<ms>` holds the splash at that
// time of its build (frames for review).
// Each page is full bleed on its own brand ground (colour.md, Getting started): Indigo, Peach, then Pistachio, each
// the colour's light tile or step in light mode and its dark tile in dark. The ground is one layer behind the pages
// whose colour follows the scroll offset on the UI thread, so it blends from one to the next under the finger. The
// illustrations are rendered for their page's ground with a transparent ground, so nothing shows an edge mid-swipe.
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import { Button, ILLUSTRATION_SIZES, Illustration, MarkIntro, PageDots, Text, screenMargin, type IllustrationProps } from '@/design-system';

type Page = { title: string; body: string; art: IllustrationProps['name']; size?: IllustrationProps['size'] };

const PAGES: Page[] = [
  {
    title: 'Ask for anything nearby',
    body: 'Type what you need, from candles to a cake. Snuffle looks in the small shops around you.',
    art: 'crossroads',
    size: 'bleed',
  },
  {
    title: 'Snuffle asks the shops for you',
    body: 'It messages the shops that might have it and tells you as each one answers.',
    art: 'shop',
  },
  {
    title: 'Buy, then collect when it suits you',
    body: 'Pay in the app. The shop sets it aside, or delivers with its own courier.',
    art: 'box',
  },
];

// The crossroads is drawn about twice the screen's width and the screen crops it at the sides (illustrations.md,
// Getting started). It plays no clip: it rises and fades in with the arrive spring, then drifts slowly from side to
// side, both on the UI thread, so the detail costs no bytes. The window the art is rendered in has PAN pt to spare on
// each side, and it is scaled up where the screen is wider than that (the web preview).
const ART_WIDTH = ILLUSTRATION_SIZES.bleed;
const DRIFT_MS = 9000;

function BleedHero({ play, width }: { play: boolean; width: number }) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const pan = theme.space[3];
  const scale = Math.max(1, (width + 2 * pan) / ART_WIDTH);
  const shown = useSharedValue(reduceMotion || play ? 1 : 0);
  const x = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) {
      shown.set(1);
      x.set(0);
      return;
    }
    if (!play) {
      shown.set(0);
      x.set(0);
      return;
    }
    shown.set(withSpring(1, theme.spring.arrive));
    const ease = Easing.inOut(Easing.sin);
    x.set(withRepeat(withSequence(withTiming(-pan, { duration: DRIFT_MS, easing: ease }), withTiming(pan, { duration: DRIFT_MS, easing: ease })), -1, true));
  }, [play, reduceMotion, pan, shown, x, theme]);
  const style = useAnimatedStyle(() => ({
    opacity: shown.get(),
    transform: [{ translateY: (1 - shown.get()) * theme.space[7] }, { translateX: x.get() }, { scale }],
  }));
  return (
    <Animated.View style={[styles.bleed, style]}>
      <Illustration name="crossroads" size="bleed" ground="welcome" play="still" />
    </Animated.View>
  );
}

export default function Welcome() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const reduceMotion = useReducedMotion();
  const params = useLocalSearchParams<{ page?: string; intro?: string }>();
  const startPage = Math.min(Math.max(Number(params.page ?? 0) || 0, 0), PAGES.length - 1);
  const withSplash = params.page == null;
  const intro = params.intro ?? (globalThis as { __snuffleIntro?: string | null }).__snuffleIntro ?? null;
  const frozenAt = intro != null ? Number(intro) || 0 : undefined;

  const [page, setPage] = useState(startPage);
  // A horizontal scroll view doesn't stretch its pages to its own height, so each page takes the measured one.
  const [pagesHeight, setPagesHeight] = useState(0);
  const scroller = useRef<Animated.ScrollView>(null);
  const width = frame.width;
  const margin = screenMargin(theme, width);

  // The pages mount when the splash's mark has faded; the ground then fades away over them.
  const [revealed, setRevealed] = useState(!withSplash);
  const [splashDone, setSplashDone] = useState(!withSplash);

  // The opening page, and the current page again when the width changes (a rotation, a resized window), which would
  // otherwise leave the paging view between two pages.
  const pageRef = useRef(startPage);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  useEffect(() => {
    if (pageRef.current > 0) scroller.current?.scrollTo({ x: pageRef.current * width, animated: false });
  }, [width]);

  // Horizontal offset in pages (0 to 2), on the UI thread; the ground's colour follows it.
  const offset = useSharedValue(startPage);
  const shown = useSharedValue(startPage);
  const onScroll = useAnimatedScrollHandler((e) => {
    const p = e.contentOffset.x / Math.max(width, 1);
    offset.set(p);
    const next = Math.min(Math.max(Math.round(p), 0), PAGES.length - 1);
    if (next !== shown.get()) {
      shown.set(next);
      scheduleOnRN(setPage, next);
    }
  });
  const grounds = [theme.color.welcome.ground1, theme.color.welcome.ground2, theme.color.welcome.ground3];
  const groundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(offset.get(), [0, 1, 2], grounds),
  }));

  const toLocation = () => router.replace('/location-ask');
  const next = () => {
    if (page >= PAGES.length - 1) return toLocation();
    scroller.current?.scrollTo({
      x: (page + 1) * width,
      animated: !reduceMotion,
    });
    setPage(page + 1);
  };
  const last = page === PAGES.length - 1;

  return (
    <View style={styles.screen}>
      {revealed && frozenAt == null ? (
        <View style={styles.fill}>
          <Animated.View style={[StyleSheet.absoluteFill, groundStyle]} />
          <View style={styles.top(insets.top, margin)}>
            {last ? null : <Button label="Skip" role="quiet" size="compact" onPress={toLocation} />}
          </View>
          <Animated.ScrollView
            ref={scroller}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={styles.fill}
            onLayout={(e) => setPagesHeight(e.nativeEvent.layout.height)}
            accessibilityLabel="Getting started"
          >
            {PAGES.map((p, i) => (
              <View key={p.title} style={styles.page(width, pagesHeight, margin)}>
                <View style={styles.hero}>
                  {/* Only the page in view plays its entry; the others hold their still. Still under Reduce Motion. */}
                  {p.size === 'bleed' ? (
                    <BleedHero play={i === page} width={width} />
                  ) : (
                    <Illustration name={p.art} size="welcome" ground="welcome" play={i === page ? 'entry-then-idle' : 'still'} />
                  )}
                </View>
                <View style={styles.copy}>
                  <Text variant="displayTitle" align="center" accessibilityRole="header">
                    {p.title}
                  </Text>
                  {/* Foreground, not Muted: muted text drops under 4.5:1 on the Indigo steps (colour.md, Getting started). */}
                  <Text variant="body" align="center">
                    {p.body}
                  </Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
          <View style={styles.bottom(insets.bottom, margin)}>
            <PageDots count={PAGES.length} current={page} />
            <Button label={last ? 'Get started' : 'Continue'} role="inverse" onPress={next} />
          </View>
        </View>
      ) : null}

      {withSplash && !splashDone ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <MarkIntro frozenAt={frozenAt} onReveal={() => setRevealed(true)} onDone={() => setSplashDone(true)} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  fill: { flex: 1 },
  top: (top: number, margin: number) => ({
    paddingTop: top,
    paddingHorizontal: margin,
    minHeight: top + theme.hit.min,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
  page: (width: number, height: number, margin: number) => ({
    width,
    height: height || undefined,
    paddingHorizontal: margin,
    gap: theme.gap.section,
  }),
  // The art sits low in the space above the copy, a section gap over the headline, so the two read as one block and
  // the empty ground is above them, not between (visual critique, round 10).
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: theme.gap.section,
  },
  // Wider than the page, so the sides run off the screen; the scroll view crops them.
  bleed: { transformOrigin: 'bottom' },
  copy: { gap: theme.gap.block, paddingBottom: theme.gap.section },
  bottom: (bottom: number, margin: number) => ({
    paddingHorizontal: margin,
    paddingBottom: bottom + theme.space[4],
    gap: theme.gap.section,
  }),
}));
