// First run, part 1 (app flow v8, area 0; openspec/changes/first-run): the splash moment, then Getting started
// in three pages. The splash draws the bare mark exactly where the native splash put it (centred, splash size),
// so the system's hand-off is invisible; the mark then fades out while the first page fades in. Pages swipe
// (a paging scroll view, native on every platform) or move on with Continue; Skip and the last Continue go to
// the location ask. `?page=0` (the journey step) opens on the pages without the splash.
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, Illustration, PageDots, SnuffleMark, Text, screenMargin, type IllustrationProps } from '@/design-system';

type Page = { title: string; body: string; art: IllustrationProps['name'] };

const PAGES: Page[] = [
  {
    title: 'Ask for anything nearby',
    body: 'Type what you need, from candles to a cake. Snuffle looks in the small shops around you.',
    art: 'crossroads',
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

// How long the mark holds before it hands over to Getting started.
const SPLASH_HOLD_MS = 700;
// How much the mark grows as it fades, when motion is allowed.
const SPLASH_GROW = 0.12;

export default function Welcome() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const reduceMotion = useReducedMotion();
  const params = useLocalSearchParams<{ page?: string }>();
  const startPage = Math.min(Math.max(Number(params.page ?? 0) || 0, 0), PAGES.length - 1);
  const withSplash = params.page == null;

  const [page, setPage] = useState(startPage);
  // A horizontal scroll view doesn't stretch its pages to its own height, so each page takes the measured one.
  const [pagesHeight, setPagesHeight] = useState(0);
  const scroller = useRef<ComponentRef<typeof ScrollView>>(null);
  const width = frame.width;
  const margin = screenMargin(theme, width);

  // 1 while the mark shows; 0 once Getting started has taken over.
  const splash = useSharedValue(withSplash ? 1 : 0);
  useEffect(() => {
    if (!withSplash) return;
    splash.set(withDelay(SPLASH_HOLD_MS, withSpring(0, theme.spring.smooth)));
  }, [withSplash, splash, theme.spring.smooth]);
  const grow = reduceMotion ? 0 : SPLASH_GROW;
  const markStyle = useAnimatedStyle(() => ({
    opacity: splash.get(),
    transform: [{ scale: 1 + (1 - splash.get()) * grow }],
  }));
  const pagesStyle = useAnimatedStyle(() => ({ opacity: 1 - splash.get() }));

  useEffect(() => {
    if (startPage > 0) scroller.current?.scrollTo({ x: startPage * width, animated: false });
  }, [startPage, width]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / Math.max(width, 1));
    if (next !== page && next >= 0 && next < PAGES.length) setPage(next);
  };

  const toLocation = () => router.replace('/location-ask');
  const next = () => {
    if (page >= PAGES.length - 1) return toLocation();
    scroller.current?.scrollTo({ x: (page + 1) * width, animated: !reduceMotion });
    setPage(page + 1);
  };
  const last = page === PAGES.length - 1;

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.fill, pagesStyle]}>
        <View style={styles.top(insets.top, margin)}>
          {last ? null : <Button label="Skip" role="plain" size="compact" onPress={toLocation} />}
        </View>
        <ScrollView
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
                <Illustration name={p.art} size="hero" play={i === page ? 'entry-then-idle' : 'still'} />
              </View>
              <View style={styles.copy}>
                <Text variant="displayTitle" align="center" accessibilityRole="header">
                  {p.title}
                </Text>
                <Text variant="body" color="mutedForeground" align="center">
                  {p.body}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.bottom(insets.bottom, margin)}>
          <PageDots count={PAGES.length} current={page} />
          <Button label="Continue" onPress={next} />
        </View>
      </Animated.View>

      {withSplash ? (
        <Animated.View style={[styles.splash, markStyle]} pointerEvents="none">
          <SnuffleMark size="splash" />
        </Animated.View>
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
  page: (width: number, height: number, margin: number) => ({ width, height: height || undefined, paddingHorizontal: margin, gap: theme.gap.section }),
  // The art sits at the optical centre of the space above the copy: a section gap above the true centre.
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: theme.gap.section },
  copy: { gap: theme.gap.block, paddingBottom: theme.gap.section },
  bottom: (bottom: number, margin: number) => ({
    paddingHorizontal: margin,
    paddingBottom: bottom + theme.space[4],
    gap: theme.gap.section,
  }),
  splash: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
}));
