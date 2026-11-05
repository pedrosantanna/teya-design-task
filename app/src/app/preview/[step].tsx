import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, Text, screenMargin } from '@/design-system';
import {
  keepLookingLine,
  price,
  shopById,
  shopHoursLabel,
  stepById,
  useAnswerLabel,
  useApp,
  useContent,
  useOrderLabel,
  useRequestLabel,
} from '@/store';

// Stand-in for the journey's screens until their changes land: shows the v7 frame's name and every value the
// store holds for it, so each debugger control has something to change. Each change replaces one step here.
export default function StepPreview() {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const { step: id } = useLocalSearchParams<{ step: string }>();
  const step = stepById(id);
  const content = useContent();
  const request = useRequestLabel();
  const order = useApp('order');
  const orderText = useOrderLabel();
  const payment = useApp('payment');
  const fulfilment = useApp('fulfilment');
  const keepLooking = useApp('keepLookingForMore');
  const shopHours = useApp('shopHours');
  const orderShop = shopById(content, content.order.shopId);
  const isShopPage = step?.id === 'shopPage';
  const pageShop = shopById(content, 'rossis') ?? content.shops[0];

  return (
    <ScrollView contentContainerStyle={styles.content(screenMargin(theme, frame.width), insets.top, insets.bottom)}>
      <Button label="Nearby" role="plain" size="compact" onPress={() => (router.canGoBack() ? router.back() : router.navigate('/'))} />
      <View style={styles.group}>
        <Text variant="footnote" color="mutedForeground">
          {`App flow v7 · ${step?.group ?? 'Unknown step'}`}
        </Text>
        <Text variant="title1" accessibilityRole="header">
          {step?.title ?? 'Unknown step'}
        </Text>
        <Text variant="subheadline" color="mutedForeground">
          Screen not built yet. The values below come from the store.
        </Text>
      </View>

      {isShopPage && pageShop ? (
        <View style={styles.card}>
          <Text variant="displayName">{pageShop.name}</Text>
          <Text variant="subheadline" color="mutedForeground">
            {`${shopHoursLabel(shopHours, pageShop)} · ${pageShop.street} · ${pageShop.walkMinutes} min walk`}
          </Text>
          {pageShop.history?.map((h) => (
            <Text key={h.item} variant="subheadline">{`${h.item} · ${h.had ? 'Had it' : "Didn't have it"} · ${h.when}`}</Text>
          ))}
        </View>
      ) : (
        <>
          <View style={styles.card}>
            <Text variant="headline">{content.active.title}</Text>
            <Text variant="subheadline" color="mutedForeground">
              {content.active.asked}
            </Text>
            <Text variant="subheadlineStrong" color="tint">
              {order === 'none' ? request : orderText}
            </Text>
          </View>

          <View style={styles.group}>
            <Text variant="title3" accessibilityRole="header">
              Answers
            </Text>
            {content.active.offers.map((offer) => (
              <AnswerLine key={offer.shopId} shopId={offer.shopId} />
            ))}
          </View>

          <View style={styles.card}>
            <Text variant="title3" accessibilityRole="header">
              Order
            </Text>
            <Text variant="subheadlineStrong">{orderText}</Text>
            {keepLooking ? <Text variant="subheadline">{keepLookingLine(Math.max(1, content.active.quantity - 1))}</Text> : null}
            <Text variant="subheadline" color="mutedForeground">
              {`${orderShop?.name ?? ''} · ${content.active.quantity} × ${content.active.title.toLowerCase()} · ${price(
                fulfilment === 'delivery' ? (content.order.deliveryTotal ?? content.order.total) : content.order.total,
              )}`}
            </Text>
            <Text variant="footnote" color="mutedForeground">
              {`${fulfilment === 'delivery' ? 'Delivery' : 'Collect'} · payment ${payment === 'idle' ? 'not started' : payment === 'sheet' ? 'sheet open' : 'declined'} · code ${content.order.code}`}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

function AnswerLine({ shopId }: { shopId: string }) {
  const content = useContent();
  const label = useAnswerLabel(shopId, 'card');
  const shop = shopById(content, shopId);
  return (
    <View style={styles.answer}>
      <Text variant="subheadlineStrong" numberOfLines={2}>
        {shop?.name ?? shopId}
      </Text>
      <Text variant="subheadline" color="mutedForeground">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.space[2],
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.section,
  }),
  group: { gap: theme.gap.inside },
  card: {
    padding: theme.inset.card,
    borderRadius: theme.radius.card,
    backgroundColor: theme.color.card,
    gap: theme.gap.inside,
  },
  answer: { gap: theme.space[1] / 2 },
}));
