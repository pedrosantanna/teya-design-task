// A category (craft-pass-2, "Browse by category" on Nearby): the places of one kind in the shopper's area, nearest
// first, filtered by street. It zooms out of its category card, so the whole screen takes the card's tile colour
// (as the shop page takes its accent) and the header keeps the card's still. The rows take the accent's cardOnTile
// under the delicate shadow: white Card in light; in dark a tinted card lighter than the tile (decision 050), since
// Card read as holes in the full colour. The bar's scroll edge is the tile too. Foreground and Muted foreground keep
// 4.5:1 or more on every tile, light and dark; the header's count and the rows' meta line take mutedForegroundOnTile
// (Stone 840 in dark: 6.4:1 or more on the tiles, 4.74:1 or more on the rows). A row opens the shop page.
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  CategoryHeader,
  Chip,
  Ground,
  ListGroup,
  NavBar,
  ShopRow,
  Text,
  ZoomTarget,
  screenMargin,
  useNavBarHeight,
  useNavBarScroll,
  type ShopAccentName,
} from '@/design-system';
import { imageSource } from '@/content/images';
import { shopAccent, shopHoursLabel, useApp, useArea } from '@/store';
import { areaCategories } from '@/store/categories';

const ALL = 'All';
const MAX_STREETS = 4;

export default function Category() {
  const { kind } = useLocalSearchParams<{ kind: string }>();
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const scroll = useNavBarScroll();
  const margin = screenMargin(theme, frame.width);
  const area = useArea();
  const shopHours = useApp('shopHours');
  const radius = useApp('radius');
  const [street, setStreet] = useState(ALL);
  const category = useMemo(() => areaCategories(area.shops).find((c) => c.kind === kind), [area.shops, kind]);
  const shops = category?.shops ?? [];
  // All and the four nearest streets at most, so the row never scrolls far past the screen.
  const streets = [ALL, ...[...new Set(shops.map((s) => s.street))].slice(0, MAX_STREETS)];
  const shown = street === ALL ? shops : shops.filter((s) => s.street === street);
  const places = (n: number) => `${n} ${n === 1 ? 'place' : 'places'}`;
  // While a street filters the list, the count says so: "1 of 3 places".
  const detail = street === ALL ? `${places(shops.length)} within ${radius} min walk` : `${shown.length} of ${places(shops.length)} within ${radius} min walk`;
  const title = category?.title ?? 'Category';
  const back = () => (router.canGoBack() ? router.back() : router.navigate('/'));

  return (
    <ZoomTarget>
      {/* The whole screen is the category's tile: chips and the bar's Back take the on-tile treatment (tonalOnTile),
          and the rows the accent's cardOnTile. */}
      <Ground value={category ? 'tile' : 'background'} accent={category?.accent}>
        <View style={styles.screen(category?.accent)}>
          <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(top, insets.bottom)}>
            <View style={styles.pad(margin)}>
              {category ? (
                <CategoryHeader
                  id={category.kind}
                  title={title}
                  detail={detail}
                  art={category.art}
                />
              ) : (
                <Text variant="body" color="mutedForeground">
                  No shops of this kind near you.
                </Text>
              )}
            </View>
            {streets.length > 2 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips(margin)} accessibilityLabel="Streets">
                {streets.map((s) => (
                  <Chip key={s} label={s} selected={s === street} onPress={setStreet} />
                ))}
              </ScrollView>
            ) : null}
            <View style={styles.pad(margin)}>
              <ListGroup shadow corner="card">
                {shown.map((shop, i) => (
                  <ShopRow
                    key={shop.id}
                    id={shop.id}
                    name={shop.name}
                    // The street drops while a street chip is selected; a no-break space keeps "6 min" with "walk".
                    meta={[shopHoursLabel(shopHours, shop), street === ALL ? shop.street : null, `${shop.walkMinutes}\u00A0min walk`].filter(Boolean).join(' · ')}
                    accent={shopAccent(shop)}
                    image={imageSource(shop.image, theme.size.avatar.shop)}
                    position={shown.length === 1 ? 'only' : i === 0 ? 'first' : i === shown.length - 1 ? 'last' : 'middle'}
                    onPress={(id) => router.push({ pathname: '/shops/[id]', params: { id } })}
                  />
                ))}
              </ListGroup>
            </View>
          </Animated.ScrollView>
          {/* The header names the screen; the bar's title comes in once the header has scrolled under it. Its scroll
              edge is the category's tile, so no pale band crosses the coloured screen. */}
          <NavBar
            title={title}
            mode="reveal"
            revealAt={theme.size.category.art}
            backgroundAt={theme.space[2]}
            fill={category ? { accent: category.accent } : 'background'}
            leading="back"
            backLabel="Nearby"
            onLeading={back}
            scroll={scroll}
          />
        </View>
      </Ground>
    </ZoomTarget>
  );
}

const styles = StyleSheet.create((theme) => ({
  // The category's tile fills the whole screen, so the zoom from its card lands on the same colour edge to edge.
  screen: (accent?: ShopAccentName) => ({ flex: 1, backgroundColor: accent ? theme.color.shop.accent[accent].tile : theme.color.background }),
  content: (top: number, bottom: number) => ({
    paddingTop: top + theme.space[2],
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.title,
  }),
  pad: (margin: number) => ({ paddingHorizontal: margin }),
  chips: (margin: number) => ({ paddingHorizontal: margin, gap: theme.space[2] }),
}));
