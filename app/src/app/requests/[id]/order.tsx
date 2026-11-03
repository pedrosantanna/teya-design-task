import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  Alert,
  Button,
  CollectionCode,
  ListRow,
  NavBar,
  StatusLabel,
  Text,
  Toast,
  screenMargin,
  useNavBarHeight,
  useNavBarScroll,
} from '@/design-system';
import { openDirections, sim, useContent, useCurrentOrder, useSim } from '@/store';

const PAID: string[] = ['ready', 'extended', 'collected', 'paid', 'onItsWay', 'delivered'];
const REFUNDED: string[] = ['cancelled', 'notCollected'];

// The receipt (v7 frames "Bought: the receipt" and "At the counter: the code, full screen"): status, the
// collection code, where and what was paid, Directions, Extend and Cancel for a refund.
export default function Receipt() {
  const { theme, rt } = useUnistyles();
  const insets = useSafeAreaInsets();
  const scroll = useNavBarScroll();
  const top = useNavBarHeight();
  const order = useCurrentOrder();
  const title = useContent().active.title;
  const codeOpen = useSim((s) => s.codeOpen);
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const margin = screenMargin(theme, rt.screen.width);
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
  const collecting = order.fulfilment === 'collect' && (order.state === 'ready' || order.state === 'extended');
  const where = order.collectAt ?? { street: order.street, openUntil: order.openUntil };
  const money = PAID.includes(order.state)
    ? `Paid ${order.total}`
    : REFUNDED.includes(order.state)
      ? `Refunded ${order.total}`
      : order.state === 'waiting'
        ? `${order.total} · not charged yet`
        : `${order.total} · not charged`;
  const directions = () => {
    if (!openDirections({ name: order.shop, street: where.street })) setToast('Directions open the Maps app on a phone.');
  };

  return (
    <View style={styles.screen}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content(margin, top, insets.bottom)}>
        <View style={styles.head}>
          <StatusLabel label={order.label} tone={order.tone} />
          <Text variant="title1" align="center" accessibilityRole="header">
            {order.shop}
          </Text>
          <Text variant="subheadline" color="mutedForeground" align="center">
            {order.fulfilment === 'delivery'
              ? `${order.items}, delivered by ${order.shop}`
              : collecting
                ? `${order.items}, set aside · full refund if you don't collect`
                : order.items}
          </Text>
        </View>

        {collecting || order.state === 'collected' ? (
          <CollectionCode
            code={order.code}
            qrValue={`snuffle:order:${order.code}`}
            enlarged={codeOpen}
            onEnlargedChange={sim.setCodeOpen}
            detail={`${order.items} · ${order.shop}`}
            note={`${order.shop} scans the code, or taps Collected on their side.`}
          />
        ) : null}

        <View>
          <ListRow icon={Location01Icon} title={where.street} detail={`Open till ${where.openUntil} · ${order.walk}`} position="first" />
          <ListRow
            icon={CreditCardIcon}
            title={money}
            detail={`${order.payName} · ${order.card.charAt(0).toLowerCase()}${order.card.slice(1)}`}
            position="last"
          />
        </View>

        <View style={styles.actions}>
          {collecting ? <Button label="Directions" icon={Navigation03Icon} onPress={directions} /> : null}
          {order.state === 'ready' ? <Button label={`Extend to ${order.extendedTo}`} role="tonal" onPress={sim.extend} /> : null}
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
  head: { alignItems: 'center', gap: theme.space[1] },
  actions: { gap: theme.space[2] },
}));
