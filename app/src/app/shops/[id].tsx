// The shop page (openspec/specs/shop-page, app flow v7 "Shop page" and its "Scroll" storyboard): presented
// over what opened it, with the map, up to three photos, and one card for the name, status, actions and what
// people asked the shop about recently. Call and Directions are simulated in sheets; nothing leaves the app.
import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import Call02Icon from '@hugeicons/core-free-icons/Call02Icon';
import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { imageCredit, imageUrl, images, type ImageKey } from '@/content/images';
import { Button, ListRow, Map, Sheet, ShopPageLayout, Skeleton, Text, type ShopPhoto } from '@/design-system';
import { pastAnswerLabel, price, shopById, shopHoursLabel, useAppActions, useAppStore, useContent, type Shop } from '@/store';

const MAX_PHOTOS = 3;
// Photo width requested from Unsplash: the photos are tile.large wide, about 300 pt on a phone.
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
    uri: imageUrl(key, PHOTO_WIDTH),
    label: `${shop.name} ${images[key].kind === 'interior' ? 'inside' : 'shopfront'}, ${shop.street}`,
    credit: imageCredit(key),
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
  const [sheet, setSheet] = useState<'call' | 'directions' | null>(null);
  const shop = shopById(content, id ?? '') ?? shopById(content, 'rossis') ?? content.shops[0];
  const index = content.shops.indexOf(shop);

  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const ask = () => {
    if (router.canGoBack()) router.back();
    set({ draft: { shopId: shop.id } });
    goTo('ask');
  };

  const status = [`${shopHoursLabel(shopHours, shop)} · ${shop.street} · ${shop.walkMinutes} min walk`];
  if (shop.notice) status.push(`Made to order · ${shop.notice}`);
  const photos = loading ? [] : shopPhotos(shop);
  const history = shop.history ?? [];

  return (
    <>
      <ShopPageLayout
        name={shop.name}
        status={status}
        photos={photos}
        mapLoading={loading}
        onClose={close}
        actions={
          <View style={styles.actions}>
            <Button label={askLabel(shop.name)} size="compact" icon={BubbleChatIcon} onPress={ask} />
            <Button label="Call" role="tonal" size="compact" icon={Call02Icon} onPress={() => setSheet('call')} />
            <Button label="Directions" role="tonal" size="compact" icon={Navigation03Icon} onPress={() => setSheet('directions')} />
          </View>
        }
      >

        {loading ? (
          <Skeleton variant="card" />
        ) : (
          <>
            {history.length > 0 ? (
              <View style={styles.section}>
                <Text variant="title3" accessibilityRole="header">
                  Asked about recently
                </Text>
                <View>
                  {history.map((h, i) => (
                    <ListRow
                      key={h.item}
                      title={h.item}
                      detail={pastAnswerLabel(h.had, h.when)}
                      surface="background"
                      position={history.length === 1 ? 'only' : i === 0 ? 'first' : i === history.length - 1 ? 'last' : 'middle'}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            <View style={styles.section}>
              <Text variant="title3" accessibilityRole="header">
                How it works
              </Text>
              <View>
                <ListRow
                  position="first"
                  surface="background"
                  title="Answers"
                  value={shop.source === 'till' ? 'From its till' : 'By reply'}
                />
                <ListRow position="middle" surface="background" title="Collection" value={KEEPS_ITEMS} />
                <ListRow
                  position="last"
                  surface="background"
                  title="Delivery"
                  value={shop.delivers ? `${shop.delivers.by[0].toUpperCase()}${shop.delivers.by.slice(1)} · ${price(shop.delivers.fee)}` : 'Collect only'}
                />
              </View>
            </View>

            <View style={styles.credits}>
              {photos.map((p) => (
                <Text key={p.uri} variant="caption1" color="mutedForeground">
                  {p.credit}
                </Text>
              ))}
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

      <Sheet open={sheet === 'directions'} onClose={() => setSheet(null)} title="Directions" detents={['medium']}>
        <View style={styles.route}>
          <Map />
        </View>
        <Text variant="headline">{`${shop.walkMinutes} min walk`}</Text>
        <Text variant="subheadline" color="mutedForeground">
          {`From ${content.area} to ${shop.name}, ${shop.street}. On a phone this opens the maps app; the prototype stays here.`}
        </Text>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
  section: { gap: theme.space[2] },
  credits: { gap: theme.space[1] / 2 },
  route: { aspectRatio: 3 / 2, borderRadius: theme.radius.inner, overflow: 'hidden' },
}));
