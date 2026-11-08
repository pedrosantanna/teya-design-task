// The panel's sections. Each one subscribes only to the store fields it shows, so changing one control
// re-renders one section, and the screen under it re-renders only where it reads that field.
import { useState } from 'react';
import { Platform } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import type { Option } from '@/design-system';
import { useFrameMode, type FrameMode } from '@/device-frame';
import {
  answerLabel,
  replayFirstRun,
  contentFor,
  currentPlace,
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
  type Radius,
  type RequestState,
  type ShopHours,
  type StepId,
} from '@/store';

import { Button, Note, Section, Segmented, Select, Sub, Toggle } from './controls';
import type { ControlId } from './relevance';
import { useDebugger } from './visibility';

const frameOptions: Option<FrameMode>[] = [
  { value: 'auto', label: 'Follows platform' },
  { value: 'ios', label: 'iPhone' },
  { value: 'android', label: 'Pixel' },
  { value: 'off', label: 'No frame' },
];

/** Which per-screen controls change the current screen (relevance.ts). */
type On = Record<ControlId, boolean>;

/** The labels of the controls that don't apply here, for the section's "No effect on this screen" line. */
function offLabels(on: On, labels: Partial<Record<ControlId, string>>): string[] {
  return (Object.keys(labels) as ControlId[]).filter((id) => !on[id]).map((id) => labels[id]!);
}

export function ShopperSection() {
  const { persona, platform, scheme } = useAppStore(useShallow((s) => ({ persona: s.persona, platform: s.platform, scheme: s.scheme })));
  const { set } = useAppActions();
  const frame = useFrameMode((s) => s.mode);
  const setFrame = useFrameMode((s) => s.setMode);
  return (
    <Section title="Shopper and device">
      <Segmented
        label="Shopper"
        options={[
          { value: 'sam', label: 'Sam' },
          { value: 'jess', label: 'Jess' },
        ]}
        value={persona}
        onChange={(p) => set({ persona: p })}
      />
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
      {Platform.OS === 'web' ? <Select label="Phone frame" options={frameOptions} value={frame} onChange={setFrame} /> : null}
    </Section>
  );
}

/** The journey's steps by group, with their times in 12 hours; on Android the payment step is Google Pay. */
function stepGroupsFor(platform: 'ios' | 'android') {
  return stepGroups.map((group) => ({
    label: group,
    options: steps
      .filter((s) => s.group === group)
      .map((s): Option<StepId> => ({
        value: s.id,
        label: platform === 'android' && s.id === 'applePay' ? 'Google Pay' : s.title,
        detail: twelveHour(s.time),
      })),
  }));
}

export function JourneySection() {
  const step = useApp('step');
  const platform = useApp('platform');
  const { goTo } = useAppActions();
  // Picking a step, the current one included, applies it afresh and pauses the clock, so the frame holds
  // still until the simulation is started again.
  const pick = (id: StepId) => {
    sim.setRunning(false);
    goTo(id);
  };
  return (
    <Section title="Journey">
      <Select label="Screen" groups={stepGroupsFor(platform)} value={step} onChange={pick} />
    </Section>
  );
}

const requestStates: RequestState[] = ['none', 'asking', 'haveIt', 'needsYou', 'looking', 'repeat', 'notFound', 'closed'];
const answerStates: AnswerState[] = ['asked', 'seen', 'hasIt', 'hasSome', 'similar', 'doesntHave', 'noReply', 'inStock', 'inStockSome', 'canMake'];
const paymentOptions: Option<PaymentState>[] = [
  { value: 'idle', label: 'Closed' },
  { value: 'sheet', label: 'Open' },
  { value: 'declined', label: 'Declined' },
];
const fulfilmentOptions = [
  { value: 'collect', label: 'Collect' },
  { value: 'delivery', label: 'Delivery' },
] as const satisfies readonly { value: Fulfilment; label: string }[];

const stateLabels: Partial<Record<ControlId, string>> = {
  request: 'Request',
  fulfilment: 'How to get it',
  order: 'Order',
  partialBuy: 'Bought some',
  payment: 'Payment sheet',
  answers: "Shops' answers",
};

export function StatesSection({ on }: { on: On }) {
  const content = useContent();
  const { request, order, fulfilment, payment, keepLookingForMore } = useAppStore(
    useShallow((s) => ({
      request: s.request,
      order: s.order,
      fulfilment: s.fulfilment,
      payment: s.payment,
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
  const hidden = offLabels(on, stateLabels);
  return (
    <Section title="Request and order" hidden={hidden} idle={hidden.length === Object.keys(stateLabels).length}>
      {on.request ? <Select label="Request" options={requestOptions} value={request} onChange={(r) => set({ request: r })} /> : null}
      {on.fulfilment ? (
        <Segmented
          label="How to get it"
          options={fulfilmentOptions}
          value={fulfilment}
          onChange={(f) => set({ fulfilment: f, order: orderStatesFor[f].includes(order) ? order : 'none' })}
        />
      ) : null}
      {on.order ? <Select label="Order" options={orderOptions} value={order} onChange={(o) => set({ order: o })} /> : null}
      {on.partialBuy ? (
        <Toggle
          label={`Bought ${Math.max(1, active.quantity - 1)} of ${active.quantity}`}
          detail="The order card says it keeps looking for the rest"
          value={keepLookingForMore}
          onChange={sim.setPartialBuy}
        />
      ) : null}
      {on.payment ? <Select label="Payment sheet" options={paymentOptions} value={payment} onChange={(p) => set({ payment: p })} /> : null}
      {on.answers ? (
        <>
          <Sub>{`Shops' answers · ${active.title}`}</Sub>
          {active.offers.map((offer) => (
            <AnswerSelect key={offer.shopId} shopId={offer.shopId} />
          ))}
        </>
      ) : null}
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
  { value: 'default', label: 'Default' },
  { value: 'empty', label: 'Few shops, no requests' },
  { value: 'longNames', label: 'Long names' },
  { value: 'manyAnswers', label: 'Twelve shops asked' },
];

/** The states the added shops answer with when the set asks twelve shops, so the chat has twelve answers to show. */
const manyAnswerCycle: AnswerState[] = ['hasIt', 'doesntHave', 'similar', 'hasSome', 'noReply', 'doesntHave'];

const contentLabels: Partial<Record<ControlId, string>> = {
  contentSet: 'Content',
  loading: 'Loading',
  locationOff: 'Location off',
  shopHours: 'Shop hours',
  place: 'Place',
  radius: 'Walking radius',
  notifications: 'Notifications',
};

export function ContentSection({ on }: { on: On }) {
  const { contentSet, loading, locationOff, notificationsAllowed, place, places, radius, shopHours } = useAppStore(
    useShallow((s) => ({
      shopHours: s.shopHours,
      place: s.place,
      places: s.places,
      radius: s.radius,
      contentSet: s.contentSet,
      loading: s.loading,
      locationOff: s.locationOff,
      notificationsAllowed: s.notificationsAllowed,
    })),
  );
  const { set } = useAppActions();
  const content = useContent();
  const orderShop = shopById(content, content.order.shopId);
  const hoursOptions = (['open', 'closesSoon', 'closed'] as ShopHours[]).map(
    (h): Option<ShopHours> => ({ value: h, label: shopHoursLabel(h, orderShop ?? { openUntil: '7pm', opensAt: '9am' }) }),
  );
  // The twelve-shop set adds six shops to the request; the ones that haven't answered take a mix of answers.
  const pickSet = (next: ContentSet) => {
    const state = useAppStore.getState();
    if (next !== 'manyAnswers' || state.request === 'none' || state.request === 'asking') {
      set({ contentSet: next });
      return;
    }
    const offers = contentFor(state.persona, next).active.offers;
    const answers = { ...state.answers };
    offers.forEach((offer, i) => {
      answers[offer.shopId] ??= manyAnswerCycle[i % manyAnswerCycle.length];
    });
    set({ contentSet: next, answers });
  };
  const hidden = offLabels(on, contentLabels);
  return (
    <Section title="Content and context" defaultOpen={false} hidden={hidden} idle={hidden.length === Object.keys(contentLabels).length}>
      {on.contentSet ? <Select label="Content" options={contentOptions} value={contentSet} onChange={pickSet} /> : null}
      {on.loading ? <Toggle label="Loading" detail="Skeletons in place of content" value={loading} onChange={(v) => set({ loading: v })} /> : null}
      {on.locationOff ? <Toggle label="Location off" value={locationOff} onChange={(v) => set({ locationOff: v })} /> : null}
      {on.shopHours ? <Select label="Shop hours" options={hoursOptions} value={shopHours} onChange={(h) => set({ shopHours: h })} /> : null}
      {on.place ? (
        <Select
          label="Place"
          options={[currentPlace, ...places].map((p): Option<string> => ({ value: p.id, label: p.id === 'current' ? `Current location · ${p.address}` : `${p.label} · ${p.address}` }))}
          value={place.id}
          onChange={(id) => set({ place: [currentPlace, ...places].find((p) => p.id === id) ?? currentPlace })}
        />
      ) : null}
      {on.radius ? (
        <Segmented
          label="Walking radius"
          options={[
            { value: '10', label: '10 min' },
            { value: '15', label: '15 min' },
            { value: '20', label: '20 min' },
          ]}
          value={String(radius)}
          onChange={(r) => set({ radius: Number(r) as Radius })}
        />
      ) : null}
      {on.notifications ? (
        <Toggle label="Notifications" detail="When off, answers stay in the chat" value={notificationsAllowed} onChange={(v) => set({ notificationsAllowed: v })} />
      ) : null}
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
      <div className="dbg-actions">
        <Button label="Reset" onPress={reset} />
        <Button label="Replay first run" onPress={replayFirstRun} />
        {Platform.OS === 'web' ? <Button label={copied ? 'Copied' : 'Copy link'} onPress={copy} /> : null}
        <Button label="Hide debugger" onPress={toggleHidden} />
      </div>
      <Note>
        Press <kbd>D</kbd> to open or close the panel. Hide debugger removes the button too; <kbd>D</kbd> brings it back. ?debug=0 starts hidden.
      </Note>
    </Section>
  );
}

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
const simLabels: Partial<Record<ControlId, string>> = {
  payOutcome: 'Payment result',
  shopOutcome: "Shop's reply",
  date: 'Today is',
};

export function SimulationSection({ on }: { on: On }) {
  const { running, clock, payOutcome, shopOutcome, date } = useSim(
    useShallow((s) => ({ running: s.running, clock: Math.floor(s.clock), payOutcome: s.payOutcome, shopOutcome: s.shopOutcome, date: s.date })),
  );
  return (
    <Section title="Simulation" defaultOpen={false} hidden={offLabels(on, simLabels)}>
      <Toggle label="Clock running" detail={`Shops answer on a timer · ${clock} s`} value={running} onChange={sim.setRunning} />
      <div className="dbg-actions">
        <Button label="Advance 5 s" onPress={() => sim.step(5)} />
        <Button label="Advance 1 min" onPress={() => sim.step(60)} />
      </div>
      {on.payOutcome || on.shopOutcome || on.date ? <Sub>What happens next</Sub> : null}
      {on.payOutcome ? <Select label="Payment result" options={payOptions} value={payOutcome} onChange={sim.setPayOutcome} /> : null}
      {on.shopOutcome ? <Select label="Shop's reply" options={shopOptions} value={shopOutcome} onChange={sim.setShopOutcome} /> : null}
      {on.date ? <Select label="Today is" options={dateOptions} value={date} onChange={sim.setDate} /> : null}
    </Section>
  );
}
