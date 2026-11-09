import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  Alert,
  Button,
  CollectionCode,
  Ground,
  ListGroup,
  ListRow,
  NavBar,
  StatusLabel,
  Text,
  Toast,
  cornerCurve,
  screenMargin,
  type ShopAccentName,
  useNavBarHeight,
  useNavBarScroll,
} from '@/design-system';
import { noBreak, openDirections, shopAccent, shopById, sim, streetLabel, useContent, useCurrentOrder, useSim } from '@/store';

const PAID: string[] = ['ready', 'extended', 'collected', 'paid', 'onItsWay', 'delivered'];
const REFUNDED: string[] = ['cancelled', 'notCollected'];

// The receipt (v7 frames "Bought: the receipt" and "At the counter: the code, full screen"): status, the
// collection code, where and what was paid, Directions, Extend and Cancel for a refund.
export default function Receipt() {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const scroll = useNavBarScroll();
  const top = useNavBarHeight();
  const order = useCurrentOrder();
  const content = useContent();
  const title = content.active.title;
  const codeOpen = useSim((s) => s.codeOpen);
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const margin = screenMargin(theme, frame.width);
  const back = () => (router.canGoBack() ? router.back() : router.navigate('/requests'));

  if (!order) {
    return (
      <View style={styles.screen}>
        <View style={styles.content(margin, top, insets.bottom)}>
          <Text variant="subheadline" color="mutedForeground" align="center">
            No order on this request yet.
          </Text>
        </View>
        <NavBar title="Order" leading="back" backLabel={title} onLeading={back} />
      </View>
    );
  }

  const them = order.quantity === 1 ? 'it' : 'them';
  // The header is the shop's accent at the tile step; no shop kind is Lavender, Snuffle's colour (kinds.ts).
  const accent = shopAccent(shopById(content, order.shopId));
  const collecting = order.fulfilment === 'collect' && (order.state === 'ready' || order.state === 'extended');
  // Where the shopper collects: the shop the order was bought from, or the collection point it drops at.
  const where = order.collectAt ?? { name: order.shop, street: order.street, openUntil: order.openUntil };
  // The money row: what happened to the charge as the title, the amount as its value.
  const money = PAID.includes(order.state)
    ? 'Paid'
    : REFUNDED.includes(order.state)
      ? 'Refunded'
      : order.state === 'waiting'
        ? 'Not charged yet'
        : 'Not charged';
  const directions = () => {
    if (!openDirections({ name: where.name, street: where.street })) setToast('Directions open the Maps app on a phone.');
  };

  return (
    <View style={styles.screen}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(margin, top, insets.bottom)}>
        {/* The receipt's header: the shop's accent at the tile step (colour.md, Shop accents) and the shop's name in
            Display name. While the order can be collected, the header names the shop and what was bought; the date
            moves under the code, the pair the counter reads together (decision 068). The status label ("Ready",
            "Extended") stays on the pinned order and the order card in the chat. Every other state opens with it. */}
        {/* The three cards (who and what, the code, where and how it was paid) sit gap.block apart as one group, all at
            radius.card; the actions come a section below. */}
        <View style={styles.top}>
        <View style={styles.head(accent)}>
          {/* The header is the shop's tile: its text takes the on-tile ink (the pastel tile in both modes, round 18). */}
          <Ground value="tile" accent={accent}>
          {collecting ? null : <StatusLabel label={order.label} tone={order.tone} />}
          <Text variant="displayName" align="center" accessibilityRole="header" numberOfLines={2}>
            {order.shop}
          </Text>
          <Text variant="subheadline" color="mutedForeground" align="center">
            {order.fulfilment === 'delivery'
              ? `${order.items}, delivered by ${order.shop}`
              : collecting && order.collectAt
                ? `${order.items}, at ${order.collectAt.name}`
                : order.items}
          </Text>
          {order.state === 'waiting' && order.fulfilment === 'collect' ? (
            <Text variant="subheadline" color="mutedForeground" align="center">
              Your collection code shows here once they confirm.
            </Text>
          ) : null}
          <View style={styles.centred}>
            <Button
              label="View shop"
              role="plain"
              size="compact"
              accessibilityLabel={`View ${order.shop}`}
              onPress={() => router.push({ pathname: '/shops/[id]', params: { id: order.shopId } })}
            />
          </View>
          </Ground>
        </View>

        {collecting ? (
          <CollectionCode
            code={order.code}
            qrValue={`snuffle:order:${order.code}`}
            enlarged={codeOpen}
            onEnlargedChange={sim.setCodeOpen}
            detail={`${order.items}, ${order.shop}`}
            note={`${where.name} scans the code, or taps Collected on their side.`}
            until={`Collect by ${order.state === 'extended' ? order.extendedTo : order.collectBy}`}
            untilDetail="Full refund if you don't"
          />
        ) : null}

        <ListGroup corner="card">
          <ListRow icon={Location01Icon} title={where.name} facts={{ state: 'open', detail: noBreak(`until ${where.openUntil}`), walk: noBreak(order.walk), street: streetLabel(where.street) }} position="first" />
          <ListRow
            icon={CreditCardIcon}
            title={money}
            value={order.total}
            valueStrong
            detail={`${order.payName}, ${order.card.charAt(0).toLowerCase()}${order.card.slice(1)}`}
            position="last"
          />
        </ListGroup>
        </View>

        <View style={styles.actions}>
          {collecting ? <Button label="Directions" icon={Navigation03Icon} onPress={directions} /> : null}
          {order.state === 'ready' ? <Button label={`Extend to ${order.extendedTo}`} role="plain" onPress={sim.extend} /> : null}
          {collecting ? <Button label="Cancel for a refund" role="destructive" onPress={() => setConfirm(true)} /> : null}
        </View>
      </Animated.ScrollView>
      <NavBar title="Order" leading="back" backLabel={title} onLeading={back} scroll={scroll} />
      <Alert
        visible={confirm}
        title="Cancel your order?"
        message={`${order.shop} puts ${them} back on sale and I refund ${order.total} to your card.`}
        onDismiss={() => setConfirm(false)}
        actions={[
          { label: 'Keep order', style: 'cancel', onPress: () => setConfirm(false) },
          {
            label: 'Cancel for a refund',
            style: 'destructive',
            onPress: () => {
              setConfirm(false);
              sim.cancelOrder();
            },
          },
        ]}
      />
      <Toast visible={toast != null} message={toast ?? ''} onHide={() => setToast(null)} bottom={insets.bottom + theme.space[4]} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.space[4],
    paddingBottom: bottom + theme.space[8],
    gap: theme.gap.section,
  }),
  head: (accent: ShopAccentName) => ({
    ...cornerCurve,
    alignItems: 'center',
    gap: theme.space[1],
    padding: theme.inset.card,
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    backgroundColor: theme.color.shop.accent[accent].tile,
  }),
  centred: { alignSelf: 'center' },
  top: { gap: theme.gap.block },
  actions: { gap: theme.space[2] },
}));
