// A category (craft-pass-2, "Browse by category" on Nearby): the places of one kind in the shopper's area, nearest
// first, filtered by street. It zooms out of its category card, so the header keeps the card's tile colour and
// still. A row opens the shop page.
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { CategoryHeader, Chip, NavBar, ShopRow, Text, ZoomTarget, screenMargin, useNavBarHeight, useNavBarScroll } from '@/design-system';
import { shopAccent, shopHoursLabel, useApp, useArea } from '@/store';
import { areaCategories } from '@/store/categories';

const ALL = 'All';

export default function Category() {
  const { kind } = useLocalSearchParams<{ kind: string }>();
  const { theme, rt } = useUnistyles();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const scroll = useNavBarScroll();
  const margin = screenMargin(theme, rt.screen.width);
  const area = useArea();
  const shopHours = useApp('shopHours');
  const radius = useApp('radius');
  const [street, setStreet] = useState(ALL);
  const category = useMemo(() => areaCategories(area.shops).find((c) => c.kind === kind), [area.shops, kind]);
  const shops = category?.shops ?? [];
  const streets = [ALL, ...new Set(shops.map((s) => s.street))];
  const shown = street === ALL ? shops : shops.filter((s) => s.street === street);
  const title = category?.title ?? 'Category';
  const back = () => (router.canGoBack() ? router.back() : router.navigate('/'));

  return (
    <ZoomTarget>
      <View style={styles.screen}>
        <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(top, insets.bottom)}>
          <View style={styles.pad(margin)}>
            {category ? (
              <CategoryHeader
                id={category.kind}
                title={title}
                detail={`${shops.length} ${shops.length === 1 ? 'place' : 'places'} within ${radius} min walk`}
                accent={category.accent}
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
            {shown.map((shop, i) => (
              <ShopRow
                key={shop.id}
                id={shop.id}
                name={shop.name}
                meta={`${shopHoursLabel(shopHours, shop)} · ${shop.street} · ${shop.walkMinutes} min walk`}
                accent={shopAccent(shop)}
                position={shown.length === 1 ? 'only' : i === 0 ? 'first' : i === shown.length - 1 ? 'last' : 'middle'}
                onPress={(id) => router.push({ pathname: '/shops/[id]', params: { id } })}
              />
            ))}
          </View>
        </Animated.ScrollView>
        {/* The header names the screen; the bar's title comes in once the header has scrolled under it. */}
        <NavBar title={title} mode="reveal" revealAt={theme.size.category.art} backgroundAt={theme.space[2]} leading="back" backLabel="Nearby" onLeading={back} scroll={scroll} />
      </View>
    </ZoomTarget>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  content: (top: number, bottom: number) => ({
    paddingTop: top + theme.space[2],
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.title,
  }),
  pad: (margin: number) => ({ paddingHorizontal: margin }),
  chips: (margin: number) => ({ paddingHorizontal: margin, gap: theme.space[2] }),
}));
