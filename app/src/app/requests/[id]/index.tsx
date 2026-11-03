import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import Store01Icon from '@hugeicons/core-free-icons/Store01Icon';
import DeliveryTruck01Icon from '@hugeicons/core-free-icons/DeliveryTruck01Icon';
import FlashIcon from '@hugeicons/core-free-icons/FlashIcon';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingView, KeyboardStickyView } from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  Alert,
  AnswerCard,
  AnswerRow,
  Button,
  Illustration,
  ChatBubble,
  Chip,
  Composer,
  Dock,
  Ground,
  ListRow,
  Map,
  NavBar,
  OrderCard,
  PaymentSheet,
  Sheet,
  Stepper,
  Text,
  Toast,
  TypingIndicator,
  ZoomOrigin,
  chatGap,
  screenMargin,
  useNavBarHeight,
  useNavBarScroll,
  type AnswerRowKind,
  type ChatSender,
} from '@/design-system';
import {
  answerCardText,
  answerLabel,
  matchAsk,
  openDirections,
  price,
  shopAccent,
  shopById,
  shopHoursLabel,
  sim,
  useApp,
  useAppActions,
  useContent,
  useSim,
  useVisibleChat,
  type AnswerState,
  type ChatItem,
} from '@/store';

// A request's chat (v7 frames: Snuffle confirms, Asking shops, Answers as they arrive, Details, Apple Pay,
// Waiting, the endings, the day before, the shop delivers, Collect after work). Everything on it is worked
// out from the store (store/chat.ts); the simulation's clock moves the shops and the order.
export default function RequestChat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const content = useContent();
  if (id && id !== content.active.id) return <OtherRequestChat id={id} />;
  return <ActiveChat />;
}

function ActiveChat() {
  const { theme, rt } = useUnistyles();
  const insets = useSafeAreaInsets();
  const content = useContent();
  const { items, typing, fresh } = useVisibleChat();
  const request = useApp('request');
  const scroll = useNavBarScroll();
  const top = useNavBarHeight();
  const margin = screenMargin(theme, rt.screen.width);
  const [reply, setReply] = useState('');
  const [undo, setUndo] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const notifyPrompt = useSim((s) => s.notifyPrompt);
  const orderShopId = useSim((s) => s.orderShopId);
  const orderShop = shopById(content, orderShopId ?? content.order.shopId);

  useFocusEffect(
    useCallback(() => {
      sim.setChatOpen(true);
      return () => sim.setChatOpen(false);
    }, []),
  );

  const onChip = (action: string) => {
    const name = orderShop?.name ?? 'the shop';
    if (action === 'collect' || action === 'delivery') return sim.chooseHow(action);
    if (action === 'extend') return sim.extend();
    if (action === 'tryAgain') return sim.tryAgain();
    if (action === 'keepLooking') return router.push({ pathname: '/requests/[id]/keep-looking', params: { id: content.active.id } });
    if (action === 'directions') {
      if (orderShop && !openDirections(orderShop)) setToast('Directions open the Maps app on a phone.');
      return;
    }
    if (action === 'askAgain') return sim.say(`Ask ${name} again`, { id: '', sender: 'snuffle', text: `I've asked ${name} again. I'll tell you when they answer.` });
    if (action === 'askFurther')
      return sim.say('Ask further away', { id: '', sender: 'snuffle', text: "I'm asking shops up to 30 minutes away. I'll tell you as they answer." });
    if (action === 'rate') return sim.say('Rate', { id: '', sender: 'snuffle', text: `Thanks. I'll pass that on to ${name}.` });
    if (action.startsWith('ask:')) {
      const text = action.slice(4);
      if (matchAsk(text) === 'active') return sim.startRequest(text);
      sim.compose(text);
      router.push('/requests/new');
    }
  };

  const openReceipt = () => router.push({ pathname: '/requests/[id]/order', params: { id: content.active.id } });

  const send = (text: string) => {
    setReply('');
    if (matchAsk(text) === 'active') sim.startRequest(text);
    else sim.say(text);
  };

  const dismiss = (shopId: string) => {
    sim.dismiss(shopId);
    setUndo(shopId);
  };

  const last = items[items.length - 1];
  const lastSender = last?.kind === 'bubble' ? last.sender : undefined;
  // An inverted list keeps the chat anchored to its newest message: a deep link opens at the bottom and new
  // messages arrive in view. The data runs newest first; `before` still means the message above.
  const newestFirst = [...items].reverse();

  return (
    <Ground value="chat">
    <View style={styles.screen}>
      <KeyboardAvoidingView style={styles.fill} behavior="padding">
        <Animated.FlatList
          inverted
          data={newestFirst}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => (
            <ChatRow
              item={item}
              before={newestFirst[index + 1]}
              isNew={fresh.has(item.key)}
              onChip={onChip}
              onDismiss={dismiss}
              onOpenOrder={openReceipt}
            />
          )}
          ListHeaderComponent={
            typing ? (
              <TypingIndicator gap={last ? (last.kind === 'bubble' ? chatGap(lastSender, 'snuffle') : 'newSender') : 'none'} />
            ) : request === 'notFound' ? (
              // Nothing found: the quiet street under Snuffle's last message (the list is inverted, so the header is the bottom).
              <View style={[styles.block, styles.art]}>
                <Illustration name="quietstreet" size="medium" />
              </View>
            ) : undefined
          }
          onScroll={scroll.onScroll}
          scrollEventThrottle={16}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content(margin, top, insets.bottom)}
        />
      </KeyboardAvoidingView>
      {/* The composer rides on the keyboard; with it open, the dock drops the home-indicator inset. */}
      <KeyboardStickyView style={styles.sticky} offset={{ opened: insets.bottom }}>
        <Dock floating={false}>
          <View style={styles.pad(margin)}>
            <Composer value={reply} onChangeText={setReply} onSend={send} />
          </View>
        </Dock>
      </KeyboardStickyView>
      {/* The chat is always under the bar, so the bar keeps its fill. "Snuffle" with the glyph names who speaks;
          the request's name sits under it. */}
      <NavBar
        title="Snuffle"
        titleMark
        subtitle={content.active.title}
        fill="chat"
        leading="back"
        backLabel="Requests"
        onLeading={() => (router.canGoBack() ? router.back() : router.navigate('/requests'))}
        scroll={scroll}
        backgroundAt={-theme.space[2]}
      />
      <DetailsSheet onToast={setToast} />
      <Payment />
      <Alert
        visible={notifyPrompt}
        title={theme.platform === 'ios' ? '“Snuffle” Would Like to Send You Notifications' : 'Allow Snuffle to send you notifications?'}
        message={theme.platform === 'ios' ? 'Notifications may include alerts, sounds and icon badges. These can be configured in Settings.' : undefined}
        actions={
          theme.platform === 'ios'
            ? [
                { label: 'Don’t Allow', onPress: () => sim.answerNotifications(false) },
                { label: 'Allow', style: 'cancel', onPress: () => sim.answerNotifications(true) },
              ]
            : [
                { label: 'Don’t allow', onPress: () => sim.answerNotifications(false) },
                { label: 'Allow', onPress: () => sim.answerNotifications(true) },
              ]
        }
      />
      <Toast
        visible={undo != null}
        message={`${shopById(content, undo ?? '')?.name ?? 'Answer'} hidden`}
        actionLabel="Undo"
        onAction={() => undo && sim.undoDismiss(undo)}
        onHide={() => setUndo(null)}
      />
      <Toast visible={toast != null} message={toast ?? ''} onHide={() => setToast(null)} />
    </View>
    </Ground>
  );
}

type ChatRowProps = {
  item: ChatItem;
  before: ChatItem | undefined;
  isNew: boolean;
  onChip: (action: string) => void;
  onDismiss: (shopId: string) => void;
  onOpenOrder: () => void;
};

function ChatRow({ item, before, isNew, onChip, onDismiss, onOpenOrder }: ChatRowProps) {
  const previous: ChatSender | undefined = before?.kind === 'bubble' ? before.sender : undefined;
  switch (item.kind) {
    case 'bubble':
      return (
        <ChatBubble
          sender={item.sender}
          text={item.text}
          day={item.day}
          firstInGroup={item.sender === 'shopper' || previous !== 'snuffle' || !!item.day}
          gap={(before && before.kind !== 'bubble') || item.day ? 'newSender' : chatGap(previous, item.sender)}
          animateIn={isNew && item.sender === 'shopper'}
        />
      );
    case 'chips':
      return (
        <View style={styles.chips} accessibilityLabel="Suggestions">
          {item.chips.map((chip) => (
            <Chip key={chip.action} kind="suggestion" label={chip.label} value={chip.action} onPress={onChip} />
          ))}
        </View>
      );
    case 'asking':
      return <AskingList />;
    case 'answer':
      return <Answer shopId={item.shopId} best={item.best} animateIn={isNew} onDismiss={onDismiss} />;
    case 'order':
      return (
        <View style={styles.block}>
          <OrderCard
            id={item.order.shopId}
            status={item.order.label}
            tone={item.order.tone}
            shop={item.order.shop}
            items={item.order.items}
            total={item.order.total}
            steps={item.order.steps}
            note={item.order.note}
            animateIn={isNew}
            onOpen={onOpenOrder}
          />
        </View>
      );
  }
}

const rowKind = (state: AnswerState): AnswerRowKind => {
  switch (state) {
    case 'asked':
      return 'asked';
    case 'seen':
      return 'seen';
    case 'inStock':
    case 'inStockSome':
      return 'till';
    case 'doesntHave':
    case 'noReply':
      return 'no';
    default:
      return 'yes';
  }
};

function AskingList() {
  const content = useContent();
  const answers = useApp('answers');
  const offers = content.active.offers;
  // The scooter rides while Snuffle asks and leaves when the first answer arrives (illustrations.md).
  const waiting = offers.every((o) => (answers[o.shopId] ?? 'asked') === 'asked' || answers[o.shopId] === 'seen');
  return (
    <View style={styles.block}>
      {waiting ? (
        <View style={styles.art}>
          <Illustration name="scooter" size="medium" />
        </View>
      ) : null}
      {offers.map((offer, i) => {
        const shop = shopById(content, offer.shopId);
        const state = answers[offer.shopId] ?? 'asked';
        const status = answerLabel(
          state,
          { plural: content.active.plural, quantity: content.active.quantity, available: offer.available, source: shop?.source ?? 'asked', notice: shop?.notice },
          'row',
        );
        return (
          <AnswerRow
            key={offer.shopId}
            shop={shop?.name ?? offer.shopId}
            street={shop?.street ?? ''}
            status={status}
            kind={rowKind(state)}
            position={offers.length === 1 ? 'only' : i === 0 ? 'first' : i === offers.length - 1 ? 'last' : 'middle'}
          />
        );
      })}
    </View>
  );
}

function Answer({ shopId, best, animateIn, onDismiss }: { shopId: string; best: boolean; animateIn: boolean; onDismiss: (id: string) => void }) {
  const content = useContent();
  const state = useApp('answers')[shopId] ?? 'asked';
  const offer = content.active.offers.find((o) => o.shopId === shopId);
  if (!offer) return null;
  const t = answerCardText(content, offer, state);
  return (
    <ZoomOrigin id={`answer:${shopId}`} style={styles.block}>
      <AnswerCard
        id={shopId}
        shop={t.shop?.name ?? shopId}
        status={t.status}
        source={t.source}
        statusIcon={t.till ? FlashIcon : undefined}
        price={t.price}
        walk={t.walk}
        collectBy={t.collectBy}
        accent={shopAccent(t.shop)}
        action={t.similar ? 'showMe' : 'buy'}
        buyLabel={t.buyLabel}
        best={best}
        animateIn={animateIn}
        onOpen={sim.openDetails}
        onBuy={sim.openDetails}
        onShowMe={sim.openDetails}
        onDismiss={onDismiss}
      />
    </ZoomOrigin>
  );
}

const NOW_DAY: Record<string, number> = { sam: 2, jess: 6 };

/** "(7 days)" from today to the collect-by date; perishables collected the same day read "(same day)". */
function windowLength(persona: string, collectBy: string): string {
  const day = Number(collectBy.split(' ')[1]);
  const days = day - (NOW_DAY[persona] ?? 2);
  return days <= 0 ? '(same day)' : `(${days} ${days === 1 ? 'day' : 'days'})`;
}

function DetailsSheet({ onToast }: { onToast: (text: string) => void }) {
  const content = useContent();
  const shopId = useSim((s) => s.details);
  const quantity = useSim((s) => s.quantity);
  const fulfilment = useApp('fulfilment');
  const shopHours = useApp('shopHours');
  const persona = useApp('persona');
  const answers = useApp('answers');
  const lastShop = useSim((s) => s.buyShopId);
  const { set } = useAppActions();
  const [at, setAt] = useState<'shop' | 'collectPoint'>('collectPoint');
  const open = !!shopId;
  const id = shopId ?? lastShop;
  const shop = id ? shopById(content, id) : undefined;
  const offer = content.active.offers.find((o) => o.shopId === id);
  if (!shop || !offer) return <Sheet open={false} onClose={sim.closeDetails} title="">{null}</Sheet>;

  const state = answers[shop.id] ?? 'asked';
  const t = answerCardText(content, offer, state);
  const them = content.active.plural ? 'them' : 'it';
  const delivery = fulfilment === 'delivery' && !!shop.delivers;
  const total = offer.price * quantity + (delivery ? (shop.delivers?.fee ?? 0) : 0);
  const max = offer.available ?? content.active.quantity;
  const collectPoint = content.order.collectAt ? shopById(content, content.order.collectAt) : undefined;
  const isJess = persona === 'jess' && !!collectPoint;
  // "Rossi's" for Rossi's Bakery, the full name otherwise (v7 copy).
  const short = /^\S+'s\b/.exec(shop.name)?.[0] ?? shop.name;
  const buyLabel = `Buy · ${price(total)}`;

  const body = isJess ? (
    <>
      <Text variant="footnote" color="mutedForeground">
        Where will you collect {them}?
      </Text>
      <View>
        <ListRow
          id="shop"
          icon={Store01Icon}
          title={`At ${shop.name}`}
          detail={shopHoursLabel(shopHours, shop)}
          selected={at === 'shop'}
          onPress={() => setAt('shop')}
          position="first"
        />
        <ListRow
          id="collectPoint"
          icon={Store01Icon}
          title="At the corner shop"
          detail={`${collectPoint.street} · open till ${collectPoint.openUntil}`}
          selected={at === 'collectPoint'}
          onPress={() => setAt('collectPoint')}
          position="last"
        />
      </View>
      <Text variant="footnote" color="mutedForeground">
        {at === 'collectPoint'
          ? `${short} drops ${them} at the corner shop before closing. Collect by ${offer.collectBy}, ${collectPoint.openUntil} ${windowLength(persona, offer.collectBy)} · full refund if you don't.`
          : `Collect by ${offer.collectBy}, ${shop.openUntil} ${windowLength(persona, offer.collectBy)} · full refund if you don't.`}
      </Text>
    </>
  ) : (
    <>
      <Text variant="footnote" color="mutedForeground">
        How do you want {them}?
      </Text>
      <View>
        <ListRow
          id="collect"
          icon={Store01Icon}
          title={`Collect at ${shop.name}`}
          detail={`Collect by ${offer.collectBy} ${windowLength(persona, offer.collectBy)} · full refund if you don't`}
          selected={!delivery}
          onPress={() => set({ fulfilment: 'collect' })}
          position={shop.delivers ? 'first' : 'only'}
        />
        {shop.delivers ? (
          <ListRow
            id="delivery"
            icon={DeliveryTruck01Icon}
            title="They deliver"
            detail={`${shop.name}'s own courier · ${price(shop.delivers.fee)} · ${shop.delivers.by}`}
            selected={delivery}
            onPress={() => set({ fulfilment: 'delivery' })}
            position="last"
          />
        ) : null}
      </View>
    </>
  );

  return (
    <Sheet
      open={open}
      onClose={sim.closeDetails}
      title={shop.name}
      titleVariant="displayName"
      barTitle="Buy"
      initialDetent="large"
      origin={`answer:${shop.id}`}
      footer={<Button label={buyLabel} accessibilityLabel={`Buy, ${price(total)}`} onPress={sim.buy} />}
    >
      <Text variant="footnote" color="mutedForeground">
        {`${shopHoursLabel(shopHours, shop)} · ${shop.street} · ${shop.walkMinutes} min walk`}
      </Text>
      <View style={styles.map}>
        <Map />
      </View>
      <View>
        <ListRow title={offer.item ?? `${content.active.title}`} detail={`${t.status}${t.source ? ` · ${t.source}` : ''}`} value={t.price} valueStrong position="first" />
        <ListRow title="Quantity" position="last">
          <Stepper value={quantity} onChange={sim.setQuantity} max={max} />
        </ListRow>
      </View>
      {body}
      <Text variant="footnote" color="mutedForeground">
        {t.till ? `Charged when you buy: ${shop.name} answered from its till.` : `Charged only when ${short} confirms.`}
      </Text>
      <Text variant="footnote" color="mutedForeground">
        Without buying, they may sell before you get there.
      </Text>
      <Button
        label="Directions"
        role="plain"
        icon={Navigation03Icon}
        onPress={() => {
          if (!openDirections(shop)) onToast('Directions open the Maps app on a phone.');
        }}
      />
    </Sheet>
  );
}

function Payment() {
  const content = useContent();
  const payment = useApp('payment');
  const fulfilment = useApp('fulfilment');
  const status = useSim((s) => s.payStatus);
  const shopId = useSim((s) => s.buyShopId);
  const quantity = useSim((s) => s.quantity);
  const shop = shopById(content, shopId ?? content.order.shopId);
  const offer = content.active.offers.find((o) => o.shopId === shop?.id);
  const fee = fulfilment === 'delivery' ? (shop?.delivers?.fee ?? 0) : 0;
  const qty = quantity || content.active.quantity;
  const [cardName, cardNumber] = splitCard(content.card);
  return (
    <PaymentSheet
      open={payment === 'sheet'}
      merchant={shop?.name ?? ''}
      items={`${qty} × ${(offer?.item ?? content.active.title).toLowerCase()}`}
      total={price((offer?.price ?? 0) * qty + fee)}
      cardName={cardName}
      cardNumber={cardNumber}
      status={status}
      onConfirm={sim.confirmPayment}
      onCancel={sim.cancelPayment}
    />
  );
}

function splitCard(card: string): [string, string] {
  const at = card.indexOf('•');
  return at < 0 ? [card, ''] : [card.slice(0, at).trim(), card.slice(at)];
}

/** Requests other than the active one keep their last messages only. */
function OtherRequestChat({ id }: { id: string }) {
  const { theme, rt } = useUnistyles();
  const insets = useSafeAreaInsets();
  const content = useContent();
  const scroll = useNavBarScroll();
  const top = useNavBarHeight();
  const request = content.others.find((r) => r.id === id);
  const [speaker, ...rest] = (request?.preview ?? '').split(': ');
  const text = rest.join(': ');
  return (
    <Ground value="chat">
    <View style={styles.screen}>
      <Animated.ScrollView onScroll={scroll.onScroll} scrollEventThrottle={16} contentContainerStyle={styles.plainContent(screenMargin(theme, rt.screen.width), top, insets.bottom)}>
        {request ? <ChatBubble sender={speaker === 'You' ? 'shopper' : 'snuffle'} text={text} /> : null}
        {request?.action ? (
          <View style={styles.block}>
            <Text variant="footnote" color="mutedForeground">
              {request.label}
            </Text>
          </View>
        ) : null}
      </Animated.ScrollView>
      <NavBar
        title="Snuffle"
        titleMark
        subtitle={request?.title ?? 'Request'}
        fill="chat"
        leading="back"
        backLabel="Requests"
        onLeading={() => (router.canGoBack() ? router.back() : router.navigate('/requests'))}
        scroll={scroll}
      />
    </View>
    </Ground>
  );
}

const styles = StyleSheet.create((theme) => ({
  // A chat's neutral ground: Card in light mode, Background in dark (colour.md, Snuffle).
  screen: { flex: 1, backgroundColor: theme.color.chat.ground },
  fill: { flex: 1 },
  // Inverted: the list's top padding sits at the bottom of the screen (room for the dock) and its bottom
  // padding under the nav bar.
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: bottom + theme.space[3] + theme.size.field + theme.space[2] + theme.clearance.askBar,
    paddingBottom: top + theme.space[4],
  }),
  // The other requests' chats are a plain scroll view.
  plainContent: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.space[4],
    paddingBottom: bottom + theme.clearance.askBar,
  }),
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  pad: (margin: number) => ({ paddingHorizontal: margin }),
  block: { marginTop: theme.space[3] },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space[2],
    marginTop: theme.space[2],
  },
  art: { alignItems: 'center', paddingBottom: theme.space[2] },
  map: { height: theme.size.thumb.request * 2, borderRadius: theme.radius.inner, overflow: 'hidden' },
}));
