// Nearby, the home screen (openspec/specs/nearby, app flow v7 "Home"): the shopper's area, shops as photo
// tiles under the categories the area has, and the ask bar with the round Requests button (craft-pass-2: the bar never
// shrinks, and its suggestions moved to New Request).
import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import Notification01Icon from '@hugeicons/core-free-icons/Notification01Icon';
import RepeatIcon from '@hugeicons/core-free-icons/RepeatIcon';
import Settings01Icon from '@hugeicons/core-free-icons/Settings01Icon';
import { Redirect, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { imageSource } from '@/content/images';
import { personaPhotos } from '@/content/personas';
import {
  ASK_ORIGIN,
  AreaRow,
  Avatar,
  BottomAccessory,
  Button,
  CategoryCard,
  Chip,
  LargeTitle,
  Illustration,
  ListRow,
  NavBar,
  Sheet,
  ShopTile,
  Skeleton,
  Text,
  ZoomOrigin,
  ZoomSource,
  navigateWith,
  screenMargin,
  tileWidth,
  useNavBarHeight,
  useNavBarScroll,
  type BadgeName,
} from '@/design-system';
import { LocationSheet } from '@/screens/LocationSheet';
import {
  replayFirstRun,
  shopAccent,
  sim,
  useApp,
  useAppActions,
  useAppStore,
  useArea,
  useContent,
  shopFacts,
  type Shop,
  type ShopHours,
} from '@/store';
import { areaCategories } from '@/store/categories';

const ALL = 'All';

/** "Goldhawk Road" → "Goldhawk Rd", "King Street" → "King St", as on the v7 chips. */
function shortStreet(street: string): string {
  return street.replace(/\bRoad$/, 'Rd').replace(/\bStreet$/, 'St');
}

/** One facts pattern on both rails: the status and the walk, no street ("Open until 6pm", "2 min walk"). */
function tileFacts(hours: ShopHours, shop: Shop) {
  return shopFacts(hours, shop, false);
}

/** Only Delivers shows on a tile, with its scooter. New shows on the shop page; Promoted is not shown anywhere (round 10). The data stays. */
function tileBadges(shop: Shop): BadgeName[] {
  const badges: BadgeName[] = [];
  if (shop.delivers) badges.push('delivers');
  return badges;
}

/** Until first run is done (openspec/changes/first-run), the app opens on the splash and Getting started. */
export default function NearbyRoute() {
  const onboarded = useApp('hasOnboarded');
  if (!onboarded) return <Redirect href="/welcome" />;
  return <Nearby />;
}

// Native builds have no debugger, so a development build offers Replay first run in the account sheet.
const REPLAY_IN_ACCOUNT = __DEV__ && Platform.OS !== 'web';

function Nearby() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const content = useContent();
  const { set } = useAppActions();
  const { places, persona, loading, locationOff, contentSet, request, shopHours } = useAppStore(
    useShallow((s) => ({
      places: s.places,
      persona: s.persona,
      loading: s.loading,
      locationOff: s.locationOff,
      contentSet: s.contentSet,
      request: s.request,
      shopHours: s.shopHours,
    })),
  );
  const area = useArea();
  const scroll = useNavBarScroll();
  const [street, setStreet] = useState(ALL);
  const [accountOpen, setAccountOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const reloading = useAreaReload(area.key);
  const showSkeletons = loading || reloading;

  const margin = screenMargin(theme, frame.width);
  const contentWidth = frame.width - 2 * margin;
  // The large title sits under the area row; the bar's title appears once the large title's bottom edge has
  // scrolled under the bar (content padding, the area row, the gap and the title's own padding above it).
  const areaRow = theme.size.avatar.shop;
  const barHeight = useNavBarHeight() - insets.top;
  const titleBottom = theme.space[2] + areaRow + theme.gap.aboveTitle + theme.type.displayLarge.lineHeight;
  const revealAt = Math.max(theme.space[2], titleBottom - barHeight);
  const empty = contentSet === 'empty';

  // Open near you: the nearest first (paid placement is not shown in the prototype, decision 052). New near you: shops marked new, filtered by street.
  const openShops = useMemo(
    () => [...area.shops].sort((a, b) => a.walkMinutes - b.walkMinutes).slice(0, 6),
    [area.shops],
  );
  const newShops = useMemo(() => area.shops.filter((s) => s.isNew).sort((a, b) => a.walkMinutes - b.walkMinutes), [area.shops]);
  const streets = useMemo(() => [ALL, ...new Set(newShops.map((s) => shortStreet(s.street)))], [newShops]);
  const shownNew = street === ALL ? newShops : newShops.filter((s) => shortStreet(s.street) === street);
  // Only the kinds this area has, so no category opens empty.
  const categories = useMemo(() => areaCategories(area.shops, shopHours), [area.shops, shopHours]);

  const needsYou = content.others.filter((r) => r.state === 'needsYou').length + (request === 'needsYou' || request === 'haveIt' ? 1 : 0);

  // Plain pushes, not journey steps: a step re-applies its preset and would wipe a request in progress.
  const ask = useCallback(
    (text?: string) => {
      set({ draft: text ? { text } : null });
      sim.compose(null);
      // The bar's glass morphs into New Request's composer while the screen crossfades.
      navigateWith('morph', () => router.push('/requests/new'), ASK_ORIGIN);
    },
    [set],
  );

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        onScroll={scroll.onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content(insets.top, insets.bottom)}
      >
        <View style={styles.head(margin)}>
          <View style={styles.area}>
            <Avatar name={content.name} image={personaPhotos[persona]} onPress={() => setAccountOpen(true)} />
            <ZoomOrigin id="area" style={styles.grow}>
              <AreaRow
                place={area.name}
                detail={locationOff ? 'Using Home. Turn on location for shops near where you are.' : area.streetsLine}
                onPress={() => setLocationOpen(true)}
              />
            </ZoomOrigin>
          </View>
          <LargeTitle title="Nearby" display scroll={scroll} offset={areaRow + theme.gap.aboveTitle} />
          {locationOff ? <Button label="Turn on location" role="tonal" size="compact" onPress={() => set({ locationOff: false })} /> : null}
        </View>

        {empty ? (
          <View style={styles.empty(margin)}>
            <Illustration name="crossroads" size="large" />
            <Text variant="body">No shops on Snuffle within 15 minutes of you yet.</Text>
            <View style={styles.actions}>
              <Button label="Ask anyway" role="tonal" size="compact" onPress={() => ask()} />
              <Button label="Change area" role="plain" size="compact" onPress={() => setLocationOpen(true)} />
            </View>
          </View>
        ) : (
          <View style={styles.sections}>
            {categories.length > 0 ? (
              <View style={styles.section}>
                <View style={styles.heading(margin)}>
                  <Text variant="sectionTitle" accessibilityRole="header">
                    Browse by category
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail(margin)} accessibilityLabel="Categories">
                  {categories.map((c) => (
                    // Each card zooms into its Category screen; the still is the closest one the pipeline has.
                    <ZoomSource key={c.kind} id={`category:${c.kind}`} href={{ pathname: '/categories/[kind]', params: { kind: c.kind } }}>
                      {(open) => <CategoryCard id={c.kind} label={c.label} accent={c.accent} art={c.art} onPress={open} />}
                    </ZoomSource>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            <View style={styles.section}>
              <View style={styles.heading(margin)}>
                <Text variant="sectionTitle" accessibilityRole="header">
                  Open near you
                </Text>
              </View>
              <Carousel width={tileWidth(theme, contentWidth, 'large')} margin={margin}>
                {showSkeletons
                  ? [0, 1].map((i) => <Skeleton key={i} variant="tileLarge" contentWidth={contentWidth} />)
                  : openShops.map((shop, i) => (
                      <ZoomSource key={shop.id} id={`open:${shop.id}`} href={{ pathname: '/shops/[id]', params: { id: shop.id } }}>
                      {(open) => (
                      <ShopTile
                        id={shop.id}
                        name={shop.name}
                        facts={tileFacts(shopHours, shop)}
                        image={imageSource(shop.image, tileWidth(theme, contentWidth, 'large'))}
                        accent={shopAccent(shop)}
                        badges={tileBadges(shop)}
                        contentWidth={contentWidth}
                        priority={i === 0 ? 'high' : undefined}
                        onPress={open}
                      />
                      )}
                      </ZoomSource>
                    ))}
              </Carousel>
            </View>

            <View style={styles.section}>
              <View style={styles.heading(margin)}>
                <Text variant="sectionTitle" accessibilityRole="header">
                  New near you
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips(margin)} accessibilityLabel="Streets">
                {streets.map((s) => (
                  <Chip key={s} label={s} selected={s === street} onPress={setStreet} />
                ))}
              </ScrollView>
              <Carousel width={tileWidth(theme, contentWidth, 'medium')} margin={margin}>
                {showSkeletons
                  ? [0, 1, 2].map((i) => <Skeleton key={i} variant="tileMedium" contentWidth={contentWidth} />)
                  : shownNew.map((shop) => (
                      <ZoomSource key={shop.id} id={`new:${shop.id}`} href={{ pathname: '/shops/[id]', params: { id: shop.id } }}>
                      {(open) => (
                      <ShopTile
                        id={shop.id}
                        size="medium"
                        name={shop.name}
                        facts={tileFacts(shopHours, shop)}
                        image={imageSource(shop.image, tileWidth(theme, contentWidth, 'medium'))}
                        accent={shopAccent(shop)}
                        badges={tileBadges(shop)}
                        contentWidth={contentWidth}
                        onPress={open}
                      />
                      )}
                      </ZoomSource>
                    ))}
              </Carousel>
            </View>

          </View>
        )}
      </Animated.ScrollView>

      {/* The bar's fill comes in as soon as content scrolls under the status bar; its title only at revealAt. */}
      <NavBar title="Nearby" mode="reveal" revealAt={revealAt} backgroundAt={theme.space[2]} edgeInBar scroll={scroll} />

      <BottomAccessory
        margin={margin}
        onAskPress={() => ask()}
        requestsCount={needsYou}
        renderRequests={(button) => (
          <ZoomSource id="requests" href="/requests">
            {(open) => button(open)}
          </ZoomSource>
        )}
      />

      <LocationSheet open={locationOpen} onClose={() => setLocationOpen(false)} />

      <Sheet open={accountOpen} onClose={() => setAccountOpen(false)} title="Account">
        {/* The profile and each group are space.6 apart, so the first row doesn't crowd the profile. */}
        <View style={styles.accountBody}>
          <View style={styles.account}>
            <Avatar name={content.name} image={personaPhotos[persona]} size="large" />
            <View style={styles.grow}>
              <Text variant="title2">{content.name}</Text>
              <Text variant="footnote" color="mutedForeground">
                {area.name}
              </Text>
            </View>
          </View>
          <View style={styles.accountGroups}>
            <ListRow
              icon={Location01Icon}
              title="Places"
              value={places.map((p) => p.label).join(', ')}
              chevron
              onPress={() => {
                setAccountOpen(false);
                router.push('/places');
              }}
            />
            <View>
              <ListRow position="first" icon={CreditCardIcon} title="Payment" detail={content.card} chevron />
              <ListRow position="middle" icon={Notification01Icon} title="Notifications" chevron />
              <ListRow position="last" icon={Settings01Icon} title="Settings" chevron />
            </View>
            {REPLAY_IN_ACCOUNT ? (
              <ListRow
                icon={RepeatIcon}
                title="Replay first run"
                detail="Development builds only"
                onPress={() => {
                  setAccountOpen(false);
                  replayFirstRun();
                }}
              />
            ) : null}
          </View>
        </View>
      </Sheet>
    </View>
  );
}

/** True for a moment after the area or the radius changes, so Nearby shows skeletons while it "reloads". */
function useAreaReload(key: string): boolean {
  const [reloading, setReloading] = useState(false);
  const last = useRef(key);
  useEffect(() => {
    if (last.current === key) return;
    last.current = key;
    setReloading(true);
    const timer = setTimeout(() => setReloading(false), RELOAD_MS);
    return () => clearTimeout(timer);
  }, [key]);
  return reloading;
}

// How long the simulated reload shows skeletons.
const RELOAD_MS = 700;

/** A sideways row of tiles that peeks: the first starts on the margin and the rail snaps tile by tile. */
function Carousel({ width, margin, children }: { width: number; margin: number; children: ReactNode }) {
  const { theme } = useUnistyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width + theme.layout.gutter}
      decelerationRate="fast"
      contentContainerStyle={styles.rail(margin)}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  content: (top: number, bottom: number) => ({
    paddingTop: top + theme.space[2],
    // Room for the dock's bottom padding (space.2) and the ask bar, then clearance.askBar: the last row rests 48 above
    // the ask bar, clear of where the dock's fade starts (36 above it), screen-review check 17.
    paddingBottom: bottom + theme.space[2] + theme.size.field + theme.clearance.askBar,
    // Proximity (spacing.md): the large title is 24 below the area row and 16 above the first section heading.
    gap: theme.gap.title,
  }),
  head: (margin: number) => ({ paddingHorizontal: margin, gap: theme.gap.aboveTitle, alignItems: 'flex-start' }),
  sections: { gap: theme.gap.section },
  area: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3], alignSelf: 'stretch' },
  grow: { flex: 1 },
  section: { gap: theme.gap.heading },
  heading: (margin: number) => ({ paddingHorizontal: margin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }),
  rail: (margin: number) => ({ paddingHorizontal: margin, gap: theme.layout.gutter }),
  chips: (margin: number) => ({ paddingHorizontal: margin, gap: theme.space[2], paddingBottom: theme.space[1] }),
  empty: (margin: number) => ({ paddingHorizontal: margin, gap: theme.gap.block, alignItems: 'flex-start' }),
  actions: { flexDirection: 'row', gap: theme.space[2] },
  accountBody: { gap: theme.space[6] },
  accountGroups: { gap: theme.space[6] },
  account: { flexDirection: 'row', alignItems: 'center', gap: theme.space[4] },
}));
