// Nearby, the home screen (openspec/specs/nearby, app flow v7 "Home"): the shopper's area, shops as photo
// tiles, suggestion chips and the ask bar with the round Requests button.
import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import Notification01Icon from '@hugeicons/core-free-icons/Notification01Icon';
import Settings01Icon from '@hugeicons/core-free-icons/Settings01Icon';
import { router } from 'expo-router';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { imageCredit, imageUrl } from '@/content/images';
import { personaPhotos } from '@/content/personas';
import {
  Avatar,
  Button,
  Chip,
  Composer,
  Dock,
  Icon,
  LargeTitle,
  ListRow,
  NavBar,
  Sheet,
  ShopTile,
  Skeleton,
  SnuffleMark,
  Text,
  screenMargin,
  tileWidth,
  useNavBarHeight,
  useNavBarScroll,
  type BadgeName,
} from '@/design-system';
import { shopHoursLabel, sim, useAppActions, useAppStore, useContent, type Shop, type ShopHours } from '@/store';

const ALL = 'All';

/** "Goldhawk Road" → "Goldhawk Rd", "King Street" → "King St", as on the v7 chips. */
function shortStreet(street: string): string {
  return street.replace(/\bRoad$/, 'Rd').replace(/\bStreet$/, 'St');
}

function tileMeta(hours: ShopHours, shop: Shop): string {
  return `${shopHoursLabel(hours, shop)} · ${shop.walkMinutes} min walk`;
}

function tileBadges(shop: Shop): BadgeName[] {
  const badges: BadgeName[] = [];
  if (shop.promoted) badges.push('promoted');
  if (shop.isNew) badges.push('new');
  if (shop.delivers) badges.push('delivers');
  return badges;
}

export default function Nearby() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const content = useContent();
  const { set } = useAppActions();
  const { persona, loading, locationOff, contentSet, request, shopHours } = useAppStore(
    useShallow((s) => ({
      persona: s.persona,
      loading: s.loading,
      locationOff: s.locationOff,
      contentSet: s.contentSet,
      request: s.request,
      shopHours: s.shopHours,
    })),
  );
  const scroll = useNavBarScroll();
  const [street, setStreet] = useState(ALL);
  const [accountOpen, setAccountOpen] = useState(false);

  const margin = screenMargin(theme, frame.width);
  const contentWidth = frame.width - 2 * margin;
  // The large title sits under the area row; the bar's title appears once the large title's bottom edge has
  // scrolled under the bar (content padding, the area row, the gap and the title's own padding above it).
  const areaRow = theme.size.avatar.shop;
  const barHeight = useNavBarHeight() - insets.top;
  const titleBottom = 3 * theme.space[2] + areaRow + theme.type.displayTitle.lineHeight;
  const revealAt = Math.max(theme.space[2], titleBottom - barHeight);
  const empty = contentSet === 'empty';

  // Open near you: paid placements first, then the nearest. New near you: shops marked new, filtered by street.
  const openShops = useMemo(
    () => [...content.shops].sort((a, b) => Number(!!b.promoted) - Number(!!a.promoted) || a.walkMinutes - b.walkMinutes).slice(0, 6),
    [content.shops],
  );
  const newShops = useMemo(() => content.shops.filter((s) => s.isNew).sort((a, b) => a.walkMinutes - b.walkMinutes), [content.shops]);
  const streets = useMemo(() => [ALL, ...new Set(newShops.map((s) => shortStreet(s.street)))], [newShops]);
  const shownNew = street === ALL ? newShops : newShops.filter((s) => shortStreet(s.street) === street);

  const needsYou = content.others.filter((r) => r.state === 'needsYou').length + (request === 'needsYou' || request === 'haveIt' ? 1 : 0);

  const openShop = useCallback((id: string) => router.push({ pathname: '/shops/[id]', params: { id } }), []);
  // Plain pushes, not journey steps: a step re-applies its preset and would wipe a request in progress.
  const ask = useCallback(
    (text?: string) => {
      set({ draft: text ? { text } : null });
      sim.compose(null);
      router.push('/requests/new');
    },
    [set],
  );
  const openRequests = useCallback(() => router.push('/requests'), []);
  const onSuggestion = useCallback((text: string) => ask(text), [ask]);

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
            <View style={styles.grow}>
              <View style={styles.place}>
                <Text variant="headline" numberOfLines={1}>
                  {content.area}
                </Text>
                <Icon icon="chevron" size="footnote" color="mutedForeground" />
              </View>
              <Text variant="footnote" color="mutedForeground" numberOfLines={locationOff ? 2 : 1}>
                {locationOff ? 'Using Home. Turn on location for shops near where you are.' : content.streets}
              </Text>
            </View>
          </View>
          <LargeTitle title="Nearby" display scroll={scroll} offset={areaRow} />
          {locationOff ? <Button label="Turn on location" role="tonal" size="compact" onPress={() => set({ locationOff: false })} /> : null}
        </View>

        {empty ? (
          <View style={styles.empty(margin)}>
            <SnuffleMark />
            <Text variant="body">No shops on Snuffle within 15 minutes of you yet.</Text>
            <View style={styles.actions}>
              <Button label="Ask anyway" role="tonal" size="compact" onPress={() => ask()} />
              <Button label="Change area" role="plain" size="compact" />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <View style={styles.heading(margin)}>
                <Text variant="title3" accessibilityRole="header">
                  Open near you
                </Text>
                <Button label="See all" role="plain" size="compact" />
              </View>
              <Carousel width={tileWidth(theme, contentWidth, 'large')} margin={margin}>
                {loading
                  ? [0, 1].map((i) => <Skeleton key={i} variant="tileLarge" contentWidth={contentWidth} />)
                  : openShops.map((shop) => (
                      <ShopTile
                        key={shop.id}
                        id={shop.id}
                        name={shop.name}
                        meta={tileMeta(shopHours, shop)}
                        image={imageUrl(shop.image, tileWidth(theme, contentWidth, 'large'))}
                        credit={imageCredit(shop.image)}
                        badges={tileBadges(shop)}
                        contentWidth={contentWidth}
                        onPress={openShop}
                      />
                    ))}
              </Carousel>
            </View>

            <View style={styles.section}>
              <View style={styles.heading(margin)}>
                <Text variant="title3" accessibilityRole="header">
                  New near you
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips(margin)} accessibilityLabel="Streets">
                {streets.map((s) => (
                  <Chip key={s} label={s} selected={s === street} onPress={setStreet} />
                ))}
              </ScrollView>
              <Carousel width={tileWidth(theme, contentWidth, 'medium')} margin={margin}>
                {loading
                  ? [0, 1, 2].map((i) => <Skeleton key={i} variant="tileMedium" contentWidth={contentWidth} />)
                  : shownNew.map((shop) => (
                      <ShopTile
                        key={shop.id}
                        id={shop.id}
                        size="medium"
                        name={shop.name}
                        meta={tileMeta(shopHours, shop)}
                        image={imageUrl(shop.image, tileWidth(theme, contentWidth, 'medium'))}
                        credit={imageCredit(shop.image)}
                        badges={tileBadges(shop)}
                        contentWidth={contentWidth}
                        onPress={openShop}
                      />
                    ))}
              </Carousel>
            </View>
          </>
        )}
      </Animated.ScrollView>

      {/* The bar's fill comes in as soon as content scrolls under the status bar; its title only at revealAt. */}
      <NavBar title="Nearby" mode="reveal" revealAt={revealAt} backgroundAt={theme.space[2]} scroll={scroll} />

      <Dock>
        {content.suggestions.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips(margin)} accessibilityLabel="Suggestions">
            {content.suggestions.slice(0, 3).map((s) => (
              <Chip key={s} kind="suggestion" label={s} onPress={onSuggestion} />
            ))}
          </ScrollView>
        ) : null}
        <View style={styles.bar(margin)}>
          <Composer mode="ask" value="" onChangeText={noop} onFieldPress={() => ask()} requestsCount={needsYou} onRequestsPress={openRequests} />
        </View>
      </Dock>

      <Sheet open={accountOpen} onClose={() => setAccountOpen(false)} title="Account" detents={['medium', 'large']}>
        <View style={styles.account}>
          <Avatar name={content.name} image={personaPhotos[persona]} size="large" />
          <View style={styles.grow}>
            <Text variant="title2">{content.name}</Text>
            <Text variant="footnote" color="mutedForeground">
              {content.area}
            </Text>
          </View>
        </View>
        <ListRow icon={Location01Icon} title="Places" value="Home, work" chevron />
        <View>
          <ListRow position="first" icon={CreditCardIcon} title="Payment" detail={content.card} chevron />
          <ListRow position="middle" icon={Notification01Icon} title="Notifications" chevron />
          <ListRow position="last" icon={Settings01Icon} title="Settings" chevron />
        </View>
      </Sheet>
    </View>
  );
}

const noop = () => undefined;

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
    // Room for the dock (its padding, the suggestion chips and the ask bar), plus the clearance above it.
    paddingBottom: bottom + theme.space[3] + theme.size.chip + theme.space[3] + theme.size.field + theme.space[2] + theme.clearance.askBar,
    gap: theme.gap.section,
  }),
  head: (margin: number) => ({ paddingHorizontal: margin, gap: theme.space[2], alignItems: 'flex-start' }),
  area: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3], alignSelf: 'stretch' },
  grow: { flex: 1 },
  place: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  section: { gap: theme.space[2] },
  heading: (margin: number) => ({ paddingHorizontal: margin, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }),
  rail: (margin: number) => ({ paddingHorizontal: margin, gap: theme.layout.gutter }),
  chips: (margin: number) => ({ paddingHorizontal: margin, gap: theme.space[2], paddingBottom: theme.space[1] }),
  empty: (margin: number) => ({ paddingHorizontal: margin, gap: theme.gap.block, alignItems: 'flex-start' }),
  actions: { flexDirection: 'row', gap: theme.space[2] },
  bar: (margin: number) => ({ paddingHorizontal: margin }),
  account: { flexDirection: 'row', alignItems: 'center', gap: theme.space[4] },
}));
