// The shop page (openspec/specs/shop-page, app flow v10 "Shop page" and "Photo viewer"): the shop's detail, pushed from
// Nearby with Back, with the map and its pin, one
// card for the name, status and actions with a carousel of up to three photos inside it that opens a full-screen viewer, then what the shop sells, what shoppers found there recently, how collection
// and delivery work, its ratings (change shop-ratings-and-range) and how it does on Snuffle. Call and Directions
// are simulated in sheets; nothing leaves the app.
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
  Button,
  ListGroup,
  ListRow,
  Map,
  ProductSummary,
  RatingSummary,
  ReliabilityRow,
  ReviewCard,
  ReviewCarousel,
  Sheet,
  ShopPageLayout,
  ShopPageText,
  Skeleton,
  Text,
  ZoomTarget,
  type ReliabilityKind,
  type ShopPhoto,
} from '@/design-system';
import {
  MIN_ANSWERS_FOR_STOCK,
  MIN_RATINGS_FOR_SHARE,
  price,
  priceRangeLine,
  quoteMix,
  ratingHeadline,
  reliabilityLines,
  shopAccent,
  shopById,
  shopNumber,
  shopFacts,
  shopHoursLabel,
  walkLabel,
  topTags,
  useAppActions,
  useAppStore,
  useContent,
  useShopRatings,
  type ReliabilityLine,
  type Shop,
} from '@/store';
import { foundRecently } from '@/store/found';

const MAX_PHOTOS = 3;
// Review text on a carousel card: as many lines as the summary card's height leaves.
const REVIEW_LINES = 5;
// Tags on the ratings summary card.
const MAX_SUMMARY_TAGS = 3;
// A tag longer than this would not fit the summary card on one line; it is dropped, never truncated.
const MAX_TAG_CHARS = 18;
// Reviews on the page; "See all" opens the rest.
const PAGE_REVIEWS = 5;
// Photo width if a photo is not bundled (then it comes from Unsplash): the carousel's width, about 300 pt on a phone.
const PHOTO_WIDTH = 400;
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

/** Up to three tags that fit the summary card whole, the shortest first. */
function summaryTags(ratings: ReturnType<typeof useShopRatings>) {
  return topTags(ratings, 6)
    .filter((t) => t.tag.length <= MAX_TAG_CHARS)
    .slice(0, MAX_SUMMARY_TAGS)
    .sort((a, b) => a.tag.length - b.tag.length);
}

/** The longest name the Ask button spells out; beyond it the button says "Ask" and the actions row keeps its trailing padding. */
const ASK_NAME_MAX = 10;

/** "Ask Rossi's" for a possessive name, "Ask Paper & Co" for a short one, "Ask" for a long one (VoiceOver still hears the shop). */
function askLabel(name: string): string {
  const first = name.split(' ')[0];
  if (/'s$/.test(first)) return `Ask ${first}`;
  return name.length <= ASK_NAME_MAX ? `Ask ${name}` : 'Ask';
}

/** A made-up number in Ofcom's drama range (020 7946 0000–0999), so it can never ring a real line. */
function phoneFor(index: number): string {
  return `020 7946 0${String(100 + ((index * 37) % 900)).padStart(3, '0')}`;
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

  const photos = loading ? [] : shopPhotos(shop);
  const lines = reliabilityLines(shop);
  const headline = ratingHeadline(ratings, shop.reliability?.asked);
  // The shopper's own note leads.
  const quotes = quoteMix(ratings, PAGE_REVIEWS).sort((a, b) => Number(b.name === 'You') - Number(a.name === 'You'));
  const found = foundRecently(shop, index);
  // Made to order sits here, with how the item reaches the shopper, not in the header's facts.
  const howItWorks = [
    ...(shop.notice ? [{ title: 'Made to order', value: shop.notice }] : []),
    { title: 'Collection', value: KEEPS_ITEMS },
    { title: 'Delivery', value: shop.delivers ? `${shop.delivers.by[0].toUpperCase()}${shop.delivers.by.slice(1)}, ${price(shop.delivers.fee)}` : 'Collect only' },
  ];

  return (
    <ZoomTarget>
      <ShopPageLayout
        name={shop.name}
        accent={shopAccent(shop)}
        facts={{ ...shopFacts(shopHours, shop), delivers: !!shop.delivers, isNew: shop.isNew }}
        photos={photos}
        mapLoading={loading}
        onBack={back}
        backLabel="Nearby"
        actions={
          <>
            <Button label={askLabel(shop.name)} accessibilityLabel={`Ask ${shop.name}`} size="compact" icon={BubbleChatIcon} onPress={() => ask()} />
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
                  onCategory={ask}
                />
              </View>
            ) : null}

            <View style={styles.section}>
              <Text variant="sectionTitle" accessibilityRole="header">
                Found here recently
              </Text>
              <ListGroup shadow>
                {found.map((item, i) => (
                  <ListRow key={item.name} title={item.name} value={item.when} surface="card" position={found.length === 1 ? 'only' : i === 0 ? 'first' : i === found.length - 1 ? 'last' : 'middle'} />
                ))}
              </ListGroup>
              {/* Names only, nothing to press: the line says where they come from. */}
              <ShopPageText>
                <Text variant="footnote" color="mutedForeground">
                  What shoppers found here through Snuffle.
                </Text>
              </ShopPageText>
            </View>

            <View style={styles.section}>
              <Text variant="sectionTitle" accessibilityRole="header">
                How it works
              </Text>
              <ListGroup shadow>
                {howItWorks.map((row, i) => (
                  <ListRow key={row.title} surface="card" title={row.title} value={row.value} position={i === 0 ? 'first' : i === howItWorks.length - 1 ? 'last' : 'middle'} />
                ))}
              </ListGroup>
            </View>

            <View style={styles.section}>
              <Text variant="sectionTitle" accessibilityRole="header">
                Ratings
              </Text>
              <ReviewCarousel accessibilityLabel={`Ratings and reviews, ${quotes.length} of ${headline.total}`} count={quotes.length}
                links={[
                  ...(headline.total > 0 ? [{ label: `See all ${headline.total} reviews`, onPress: () => router.push({ pathname: '/reviews/[id]', params: { id: shop.id } }) }] : []),
                  { label: 'How ratings work', onPress: () => setSheet('ratings') },
                ]}
              >
                {(width) => (
                  <>
                    <RatingSummary
                      width={width.summary}
                      figure={headline.figure}
                      caption={headline.caption}
                      title={headline.title}
                      detail={headline.detail}
                      accessibilityLabel={headline.spoken}
                      tags={summaryTags(ratings)}
                    />
                    {quotes.map((q) => (
                      <ReviewCard key={q.text} name={q.name} text={q.text} up={q.up} month={q.month} lines={REVIEW_LINES} width={width.review} />
                    ))}
                  </>
                )}
              </ReviewCarousel>
            </View>

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
          </>
        )}
      </ShopPageLayout>

      <Sheet open={sheet === 'call'} onClose={() => setSheet(null)} title={`Call ${shop.name}`} detents={['fit']}>
        <Text variant="title2" selectable>
          {phoneFor(index)}
        </Text>
        <Text variant="subheadline" color="mutedForeground">
          {`${shopHoursLabel(shopHours, shop)}. In the prototype nothing is dialled.`}
        </Text>
      </Sheet>

      <Sheet open={sheet === 'reliability'} onClose={() => setSheet(null)} title="How we work this out" detents={['fit']}>
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

      <Sheet open={sheet === 'ratings'} onClose={() => setSheet(null)} title="How ratings work" detents={['fit']}>
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
        <Text variant="headline">{walkLabel(shop.walkMinutes)}</Text>
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
