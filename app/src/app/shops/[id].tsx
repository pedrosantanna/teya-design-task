// The shop page (openspec/specs/shop-page, app flow v7 "Shop page" and its "Scroll" storyboard): the shop's
// detail, pushed from Nearby with Back, with the map, up to three photos, and one card for the name, status and actions,
// then what the shop sells, how it does on Snuffle and what buyers say (change shop-ratings-and-range), and how
// collection and delivery work. Call and Directions are simulated in sheets; nothing leaves the app.
import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import Call02Icon from '@hugeicons/core-free-icons/Call02Icon';
import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { imageSource, images, type ImageKey } from '@/content/images';
import {
  Badge,
  Button,
  ListBlock,
  ListGroup,
  ListRow,
  Map,
  ProductSummary,
  RatingSummary,
  ReliabilityRow,
  ReviewCard,
  Sheet,
  ShopPageLayout,
  Skeleton,
  Text,
  ZoomTarget,
  type BadgeName,
  type ReliabilityKind,
  type ShopPhoto,
} from '@/design-system';
import {
  MIN_ANSWERS_FOR_STOCK,
  MIN_RATINGS_FOR_SHARE,
  pastAnswerLabel,
  price,
  priceRangeLine,
  quoteMix,
  ratingHeadline,
  reliabilityLines,
  shopAccent,
  shopById,
  shopNumber,
  shopHoursLabel,
  topTags,
  useAppActions,
  useAppStore,
  useContent,
  useShopRatings,
  type ReliabilityLine,
  type Shop,
} from '@/store';

const MAX_PHOTOS = 3;
// Photo width if a photo is not bundled (then it comes from Unsplash): tile.large wide, about 300 pt on a phone.
const PHOTO_WIDTH = 320;
// Collection window for a bought item (decision 037, H6).
const KEEPS_ITEMS = '7 days to collect';

/** The shop's own photos: its main photo first, then its other shopfront and inside shots, three at most. */
function shopPhotos(shop: Shop): ShopPhoto[] {
  const subject = images[shop.image].for;
  const keys = (Object.keys(images) as ImageKey[]).filter(
    (k) => k !== shop.image && images[k].for === subject && (images[k].kind === 'shopfront' || images[k].kind === 'interior'),
  );
  return [shop.image, ...keys].slice(0, MAX_PHOTOS).map((key) => ({
    source: imageSource(key, PHOTO_WIDTH),
    label: `${shop.name} ${images[key].kind === 'interior' ? 'inside' : 'shopfront'}, ${shop.street}`,
  }));
}

/** "Ask Rossi's" for a possessive name, "Ask Paper & Co" otherwise. */
function askLabel(name: string): string {
  const first = name.split(' ')[0];
  return `Ask ${/'s$/.test(first) ? first : name}`;
}

/** A made-up number in Ofcom's drama range (020 7946 0000–0999), so it can never ring a real line. */
function phoneFor(index: number): string {
  return `020 7946 0${String(100 + index * 37).padStart(3, '0')}`;
}

export default function ShopPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const content = useContent();
  const { goTo, set } = useAppActions();
  const { shopHours, loading } = useAppStore(useShallow((s) => ({ shopHours: s.shopHours, loading: s.loading })));
  const [sheet, setSheet] = useState<'call' | 'directions' | 'reliability' | 'ratings' | null>(null);
  const shop = shopById(content, id ?? '') ?? shopById(content, 'rossis') ?? content.shops[0];
  const index = shopNumber(shop.id);
  const ratings = useShopRatings(shop);

  const back = () => (router.canGoBack() ? router.back() : router.replace('/'));
  /** Ask the shop; from a category chip, New Request starts with the chip's text. */
  const ask = (text?: string) => {
    if (router.canGoBack()) router.back();
    set({ draft: { shopId: shop.id, ...(text ? { text } : null) } });
    goTo('ask');
  };

  const status = [`${shopHoursLabel(shopHours, shop)} · ${shop.street} · ${shop.walkMinutes} min walk`];
  if (shop.notice) status.push(`Made to order · ${shop.notice}`);
  const photos = loading ? [] : shopPhotos(shop);
  const history = shop.history ?? [];
  const lines = reliabilityLines(shop);
  const headline = ratingHeadline(ratings);
  const quotes = quoteMix(ratings);

  const badges: BadgeName[] = [];
  if (shop.promoted) badges.push('promoted');
  if (shop.isNew) badges.push('new');
  if (shop.delivers) badges.push('delivers');

  return (
    <ZoomTarget>
      <ShopPageLayout
        name={shop.name}
        accent={shopAccent(shop)}
        status={status}
        photos={photos}
        mapLoading={loading}
        onBack={back}
        backLabel="Nearby"
        tags={badges.length > 0 ? badges.map((b) => <Badge key={b} badge={b} on="wash" />) : undefined}
        actions={
          <>
            <Button label={askLabel(shop.name)} size="compact" icon={BubbleChatIcon} onPress={() => ask()} />
            <Button label="Call" role="tonal" size="compact" icon={Call02Icon} onPress={() => setSheet('call')} />
            <Button label="Directions" role="tonal" size="compact" icon={Navigation03Icon} onPress={() => setSheet('directions')} />
          </>
        }
      >

        {loading ? (
          <Skeleton variant="card" />
        ) : (
          <>
            {shop.categories ? (
              <View style={styles.section}>
                <Text variant="sectionTitle" accessibilityRole="header">
                  What they sell
                </Text>
                <ProductSummary
                  shop={shop.name}
                  categories={shop.categories}
                  priceLine={priceRangeLine(shop)}
                  asked={history.map((h) => ({ item: h.item, detail: pastAnswerLabel(h.had, h.when) }))}
                  onCategory={ask}
                />
              </View>
            ) : null}

            {lines.length > 0 ? (
              <View style={styles.section}>
                <Text variant="sectionTitle" accessibilityRole="header">
                  How they do on Snuffle
                </Text>
                <ListGroup shadow>
                  {lines.map((line, i) => (
                    <ReliabilityRow
                      key={line.key}
                      kind={reliabilityKind(shop, line)}
                      title={line.title}
                      detail={line.detail}
                      accessibilityLabel={line.spoken}
                      position={i === 0 ? 'first' : 'middle'}
                    />
                  ))}
                  <ListRow title="How we work this out" surface="card" chevron position="last" onPress={() => setSheet('reliability')} />
                </ListGroup>
              </View>
            ) : null}

            <View style={styles.section}>
              <Text variant="sectionTitle" accessibilityRole="header">
                What buyers say
              </Text>
              <ListGroup shadow>
                <ListBlock position="first">
                  <RatingSummary
                    title={headline.title}
                    detail={headline.detail}
                    accessibilityLabel={headline.spoken}
                    hasShare={headline.share != null}
                    tags={topTags(ratings, 4)}
                  />
                </ListBlock>
                {quotes.map((q) => (
                  <ReviewCard key={q.text} text={q.text} up={q.up} month={q.month} how={q.how} position="middle" />
                ))}
                {headline.total > 0 ? (
                  <ListRow
                    title={`See all ${headline.total}`}
                    surface="card"
                    chevron
                    position="middle"
                    onPress={() => router.push({ pathname: '/reviews/[id]', params: { id: shop.id } })}
                  />
                ) : null}
                <ListRow title="How ratings work" surface="card" chevron position="last" onPress={() => setSheet('ratings')} />
              </ListGroup>
            </View>

            <View style={styles.section}>
              <Text variant="sectionTitle" accessibilityRole="header">
                How it works
              </Text>
              <ListGroup shadow>
                <ListRow position="first" surface="card" title="Collection" value={KEEPS_ITEMS} />
                <ListRow
                  position="last"
                  surface="card"
                  title="Delivery"
                  value={shop.delivers ? `${shop.delivers.by[0].toUpperCase()}${shop.delivers.by.slice(1)} · ${price(shop.delivers.fee)}` : 'Collect only'}
                />
              </ListGroup>
            </View>
          </>
        )}
      </ShopPageLayout>

      <Sheet open={sheet === 'call'} onClose={() => setSheet(null)} title={`Call ${shop.name}`} detents={['medium']}>
        <Text variant="title2" selectable>
          {phoneFor(index)}
        </Text>
        <Text variant="subheadline" color="mutedForeground">
          {`${shopHoursLabel(shopHours, shop)}. In the prototype nothing is dialled.`}
        </Text>
      </Sheet>

      <Sheet open={sheet === 'reliability'} onClose={() => setSheet(null)} title="How we work this out" detents={['medium', 'large']}>
        <Text variant="subheadline">
          Answers counts the requests Snuffle sent this shop and how many it answered, in tenths, rounded down.
        </Text>
        <Text variant="subheadline">
          Replies is the usual time from Snuffle asking to the shop answering. A shop whose till is connected answers at once.
        </Text>
        <Text variant="subheadline">
          {`Had it counts the times the shop said yes and a buyer came for the item, and how often it was there. It shows after ${MIN_ANSWERS_FOR_STOCK} yeses.`}
        </Text>
        <Text variant="footnote" color="mutedForeground">
          {`${shop.name} sees these numbers and can dispute any of them.`}
        </Text>
      </Sheet>

      <Sheet open={sheet === 'ratings'} onClose={() => setSheet(null)} title="How ratings work" detents={['medium', 'large']}>
        <Text variant="subheadline">Only buyers rate: people who bought here through Snuffle and collected the item or had it delivered.</Text>
        <Text variant="subheadline">They answer one question, would you go back, with a thumbs up or down, and can add tags and a short note.</Text>
        <Text variant="subheadline">
          {`The share shows once ${MIN_RATINGS_FOR_SHARE} buyers have rated, rounded down. Until then the shop is new on Snuffle.`}
        </Text>
        <Text variant="footnote" color="mutedForeground">
          {`${shop.name} sees every rating and can dispute one.`}
        </Text>
      </Sheet>

      <Sheet open={sheet === 'directions'} onClose={() => setSheet(null)} title="Directions" detents={['medium']}>
        <View style={styles.route}>
          <Map />
        </View>
        <Text variant="headline">{`${shop.walkMinutes} min walk`}</Text>
        <Text variant="subheadline" color="mutedForeground">
          {`From ${content.area} to ${shop.name}, ${shop.street}. On a phone this opens the maps app; the prototype stays here.`}
        </Text>
      </Sheet>
    </ZoomTarget>
  );
}

/** The symbol for a line of "How they do on Snuffle". */
function reliabilityKind(shop: Shop, line: ReliabilityLine): ReliabilityKind {
  if (line.key === 'answers') return 'answers';
  if (line.key === 'speed') return shop.reliability?.connected ? 'till' : 'speed';
  return (shop.reliability?.hadItTotal ?? 0) >= MIN_ANSWERS_FOR_STOCK ? 'stock' : 'new';
}

const styles = StyleSheet.create((theme) => ({
  section: { gap: theme.gap.heading },
  route: { aspectRatio: 3 / 2, borderRadius: theme.radius.inner, overflow: 'hidden' },
}));
