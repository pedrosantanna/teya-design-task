// All of a shop's ratings ("See all 38" on the shop page; change shop-ratings-and-range): the summary with every tag,
// then every buyer note, newest first, as rows of one grouped list, and how many buyers rated without one. Pushed
// from the shop page with Back. It sits on the shop's accent tile, as the shop page does, so it still reads as that
// shop (visual critique 3).
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { LargeTitle, ListBlock, ListGroup, NavBar, RatingSummary, ReviewCard, Text, screenMargin, useNavBarHeight, useNavBarScroll, type ShopAccentName } from '@/design-system';
import { ratingHeadline, shopAccent, shopById, topTags, useContent, useShopRatings } from '@/store';

export default function Reviews() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const scroll = useNavBarScroll();
  const margin = screenMargin(theme, frame.width);
  const content = useContent();
  const shop = shopById(content, id ?? '') ?? shopById(content, 'rossis') ?? content.shops[0];
  const ratings = useShopRatings(shop);
  const headline = ratingHeadline(ratings);
  const silent = headline.total - ratings.notes.length;
  const accent = shopAccent(shop);
  const back = () => (router.canGoBack() ? router.back() : router.replace({ pathname: '/shops/[id]', params: { id: shop.id } }));

  return (
    <View style={styles.screen(accent)}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(margin, top, insets.bottom)}>
        <LargeTitle title="What buyers say" scroll={scroll} />
        <Text variant="subheadline" color="mutedForeground">
          {shop.name}
        </Text>
        <ListGroup shadow>
          <ListBlock>
            <RatingSummary
              title={headline.title}
              detail={headline.detail}
              accessibilityLabel={headline.spoken}
              hasShare={headline.share != null}
              tags={topTags(ratings, 10)}
            />
          </ListBlock>
        </ListGroup>
        {ratings.notes.length > 0 ? (
          <View style={styles.section}>
            <Text variant="sectionTitle" accessibilityRole="header">
              Notes
            </Text>
            <ListGroup shadow>
              {ratings.notes.map((n, i) => (
                <ReviewCard
                  key={`${i}-${n.text}`}
                  text={n.text}
                  up={n.up}
                  month={n.month}
                  how={n.how}
                  position={ratings.notes.length === 1 ? 'only' : i === 0 ? 'first' : i === ratings.notes.length - 1 ? 'last' : 'middle'}
                />
              ))}
            </ListGroup>
          </View>
        ) : null}
        {silent > 0 ? (
          <Text variant="footnote" color="mutedForeground">
            {`${silent} more ${silent === 1 ? 'buyer' : 'buyers'} rated without a note.`}
          </Text>
        ) : null}
      </Animated.ScrollView>
      <NavBar title="What buyers say" mode="large" fill={{ accent }} leading="back" backLabel={shop.name} onLeading={back} scroll={scroll} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: (accent: ShopAccentName) => ({ flex: 1, backgroundColor: theme.color.shop.accent[accent].tile }),
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.gap.title,
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.block,
  }),
  section: { gap: theme.gap.heading, paddingTop: theme.gap.block },
}));
