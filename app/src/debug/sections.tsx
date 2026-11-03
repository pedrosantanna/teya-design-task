// The panel's sections. Each one subscribes only to the store fields it shows, so changing one control
// re-renders one section, and the screen under it re-renders only where it reads that field.
import { useState } from 'react';
import { Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useShallow } from 'zustand/react/shallow';

import { Button, Checkbox, OptionList, Select, Switch, Text, type Option } from '@/design-system';
import { useFrameMode, type FrameMode } from '@/device-frame';
import {
  answerLabel,
  orderLabel,
  orderStatesFor,
  requestLabel,
  shareUrl,
  shopById,
  shopHoursLabel,
  sim,
  stepGroups,
  steps,
  twelveHour,
  useApp,
  useAppActions,
  useAppStore,
  useContent,
  useSim,
  type AnswerState,
  type PayOutcome,
  type ShopOutcome,
  type SimDate,
  type ContentSet,
  type Fulfilment,
  type OrderState,
  type PaymentState,
  type RequestState,
  type ShopHours,
  type StepId,
} from '@/store';

import { Section, Segmented } from './controls';
import { useDebugger } from './visibility';

export function PersonaSection() {
  const persona = useApp('persona');
  const { set } = useAppActions();
  return (
    <Section title="Persona">
      <Segmented
        label="Shopper"
        options={[
          { value: 'sam', label: 'Sam' },
          { value: 'jess', label: 'Jess' },
        ]}
        value={persona}
        onChange={(p) => set({ persona: p })}
      />
    </Section>
  );
}

const frameOptions: Option<FrameMode>[] = [
  { value: 'auto', label: 'Follows platform' },
  { value: 'ios', label: 'iPhone' },
  { value: 'android', label: 'Pixel' },
  { value: 'off', label: 'No frame' },
];

export function LookSection() {
  const { platform, scheme } = useAppStore(useShallow((s) => ({ platform: s.platform, scheme: s.scheme })));
  const { set } = useAppActions();
  const frame = useFrameMode((s) => s.mode);
  const setFrame = useFrameMode((s) => s.setMode);
  return (
    <Section title="Look">
      <Segmented
        label="Platform"
        options={[
          { value: 'ios', label: 'iOS' },
          { value: 'android', label: 'Android' },
        ]}
        value={platform}
        onChange={(p) => set({ platform: p })}
      />
      <Segmented
        label="Scheme"
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ]}
        value={scheme}
        onChange={(s) => set({ scheme: s })}
      />
      {Platform.OS === 'web' ? <Select label="Frame" options={frameOptions} value={frame} onChange={setFrame} /> : null}
    </Section>
  );
}

/** The journey's steps by group, with their times in 12 hours; on Android the payment step is Google Pay. */
function stepOptionsFor(platform: 'ios' | 'android'): Map<string, Option<StepId>[]> {
  return new Map(
    stepGroups.map((group) => [
      group,
      steps
        .filter((s) => s.group === group)
        .map((s): Option<StepId> => ({
          value: s.id,
          label: platform === 'android' && s.id === 'applePay' ? 'Google Pay' : s.title,
          detail: twelveHour(s.time),
        })),
    ]),
  );
}

export function JourneySection() {
  const step = useApp('step');
  const platform = useApp('platform');
  const { goTo } = useAppActions();
  const stepOptions = stepOptionsFor(platform);
  // Picking a step, the current one included, applies it afresh and pauses the clock, so the frame holds
  // still until the simulation is started again.
  const pick = (id: StepId) => {
    sim.setRunning(false);
    goTo(id);
  };
  return (
    <Section title="Journey">
      {stepGroups.map((group) => (
        <View key={group} style={styles.group}>
          <Text variant="caption1" color="mutedForeground">
            {group}
          </Text>
          <OptionList options={stepOptions.get(group) ?? []} value={step} onChange={pick} accessibilityLabel={group} />
        </View>
      ))}
    </Section>
  );
}

const requestStates: RequestState[] = ['none', 'asking', 'haveIt', 'needsYou', 'looking', 'repeat', 'notFound', 'closed'];
const answerStates: AnswerState[] = ['asked', 'seen', 'hasIt', 'hasSome', 'similar', 'doesntHave', 'noReply', 'inStock', 'inStockSome', 'canMake'];
const paymentOptions: Option<PaymentState>[] = [
  { value: 'idle', label: 'Not started' },
  { value: 'sheet', label: 'Payment sheet open' },
  { value: 'declined', label: 'Declined' },
];
const fulfilmentOptions = [
  { value: 'collect', label: 'Collect' },
  { value: 'delivery', label: 'Delivery' },
] as const satisfies readonly { value: Fulfilment; label: string }[];

export function StatesSection() {
  const content = useContent();
  const { request, order, fulfilment, payment, shopHours, keepLookingForMore } = useAppStore(
    useShallow((s) => ({
      request: s.request,
      order: s.order,
      fulfilment: s.fulfilment,
      payment: s.payment,
      shopHours: s.shopHours,
      keepLookingForMore: s.keepLookingForMore,
    })),
  );
  const { set } = useAppActions();
  const active = content.active;
  const orderShop = shopById(content, content.order.shopId);

  const requestOptions = requestStates.map(
    (state): Option<RequestState> => ({
      value: state,
      label: requestLabel(state, { asked: active.offers.length, have: 2, plural: active.plural, deadline: active.deadline }),
    }),
  );
  const orderOptions = orderStatesFor[fulfilment].map(
    (state): Option<OrderState> => ({
      value: state,
      label: orderLabel(state, { shop: orderShop?.name ?? '', collectBy: content.order.collectBy, extendedTo: content.order.extendedTo }),
    }),
  );
  const hoursOptions = (['open', 'closesSoon', 'closed'] as ShopHours[]).map(
    (h): Option<ShopHours> => ({ value: h, label: shopHoursLabel(h, orderShop ?? { openUntil: '7pm', opensAt: '9am' }) }),
  );

  return (
    <Section title="States">
      <Select label="Request" options={requestOptions} value={request} onChange={(r) => set({ request: r })} />
      <Segmented
        label="How to get it"
        options={fulfilmentOptions}
        value={fulfilment}
        onChange={(f) => set({ fulfilment: f, order: orderStatesFor[f].includes(order) ? order : 'none' })}
      />
      <Select label="Order" options={orderOptions} value={order} onChange={(o) => set({ order: o })} />
      <Checkbox
        label={`Keep looking for ${Math.max(1, active.quantity - 1)} more`}
        detail="Line on the order card after a partial buy"
        checked={keepLookingForMore}
        onChange={(v) => set({ keepLookingForMore: v })}
      />
      <Select label="Payment" options={paymentOptions} value={payment} onChange={(p) => set({ payment: p })} />
      <Select label="Shop hours" options={hoursOptions} value={shopHours} onChange={(h) => set({ shopHours: h })} />
      <Text variant="caption1" color="mutedForeground">
        {`Answers · ${active.title}`}
      </Text>
      {active.offers.map((offer) => (
        <AnswerSelect key={offer.shopId} shopId={offer.shopId} />
      ))}
    </Section>
  );
}

function AnswerSelect({ shopId }: { shopId: string }) {
  const content = useContent();
  const state = useAppStore((s) => s.answers[shopId] ?? 'asked');
  const { setAnswer } = useAppActions();
  const shop = shopById(content, shopId);
  const offer = content.active.offers.find((o) => o.shopId === shopId);
  const options = answerStates.map(
    (a): Option<AnswerState> => ({
      value: a,
      label: answerLabel(a, {
        plural: content.active.plural,
        quantity: content.active.quantity,
        available: offer?.available,
        source: shop?.source ?? 'asked',
        notice: shop?.notice,
      }),
    }),
  );
  return <Select label={shop?.name ?? shopId} options={options} value={state} onChange={(a) => setAnswer(shopId, a)} />;
}

const contentOptions: Option<ContentSet>[] = [
  { value: 'default', label: 'Default (v7)' },
  { value: 'empty', label: 'Empty' },
  { value: 'longNames', label: 'Long names' },
  { value: 'manyAnswers', label: 'Many answers' },
];

export function ContentSection() {
  const { contentSet, loading, locationOff, notificationsAllowed } = useAppStore(
    useShallow((s) => ({
      contentSet: s.contentSet,
      loading: s.loading,
      locationOff: s.locationOff,
      notificationsAllowed: s.notificationsAllowed,
    })),
  );
  const { set } = useAppActions();
  return (
    <Section title="Content">
      <Select label="Content set" options={contentOptions} value={contentSet} onChange={(c) => set({ contentSet: c })} />
      <Switch label="Loading" detail="Skeletons in place of content" value={loading} onValueChange={(v) => set({ loading: v })} />
      <Switch label="Location off" value={locationOff} onValueChange={(v) => set({ locationOff: v })} />
      <Switch
        label="Notifications allowed"
        value={notificationsAllowed}
        onValueChange={(v) => set({ notificationsAllowed: v })}
      />
    </Section>
  );
}

export function ActionsSection() {
  const { reset } = useAppActions();
  const toggleHidden = useDebugger((s) => s.toggleHidden);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const s = useAppStore.getState();
    const url = shareUrl({ step: s.step, persona: s.persona, platform: s.platform, scheme: s.scheme, set: s.contentSet });
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section title="Actions">
      <View style={styles.row}>
        <Button label="Reset" size="compact" role="tonal" onPress={reset} />
        {Platform.OS === 'web' ? <Button label={copied ? 'Copied' : 'Copy link'} size="compact" role="tonal" onPress={copy} /> : null}
        <Button label="Hide" size="compact" role="plain" onPress={toggleHidden} />
      </View>
      <Text variant="footnote" color="mutedForeground">
        {Platform.OS === 'web'
          ? 'Press D to show or hide the debugger. ?debug=0 starts hidden.'
          : 'Touch and hold with three fingers to show or hide the debugger.'}
      </Text>
    </Section>
  );
}

const styles = StyleSheet.create((theme) => ({
  group: { gap: theme.space[1] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
}));

const payOptions: Option<PayOutcome>[] = [
  { value: 'paid', label: 'Goes through' },
  { value: 'declined', label: 'Declined' },
];
const shopOptions: Option<ShopOutcome>[] = [
  { value: 'confirms', label: 'Confirms' },
  { value: 'sold', label: 'Already sold' },
  { value: 'noConfirm', label: "Doesn't confirm in 10 min" },
];
const dateOptions: Option<SimDate>[] = [
  { value: 'today', label: 'Mon 2 Nov, 1:15pm' },
  { value: 'dayBefore', label: 'Sun 8 Nov, 9am' },
  { value: 'afterWindow', label: 'Tue 10 Nov, 9:12am' },
];

/** The simulation's clock and outcomes: shops answer on a timer, the payment and the shop's reply are chosen here. */
export function SimulationSection() {
  const { running, clock, payOutcome, shopOutcome, date } = useSim(
    useShallow((s) => ({ running: s.running, clock: Math.floor(s.clock), payOutcome: s.payOutcome, shopOutcome: s.shopOutcome, date: s.date })),
  );
  return (
    <Section title="Simulation">
      <Switch label="Clock running" detail={`Shops answer on a timer · ${clock} s`} value={running} onValueChange={sim.setRunning} />
      <View style={styles.row}>
        <Button label="Step 5 s" size="compact" role="tonal" onPress={() => sim.step(5)} />
        <Button label="Skip 1 min" size="compact" role="tonal" onPress={() => sim.step(60)} />
      </View>
      <Select label="Payment" options={payOptions} value={payOutcome} onChange={sim.setPayOutcome} />
      <Select label="Shop after Buy" options={shopOptions} value={shopOutcome} onChange={sim.setShopOutcome} />
      <Select label="Date" options={dateOptions} value={date} onChange={sim.setDate} />
    </Section>
  );
}
