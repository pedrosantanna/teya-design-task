import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { OrderCard, type OrderStep } from './OrderCard';
import type { StatusTone } from '../Tag/Tag';

const waitingSteps: OrderStep[] = [
  { title: 'Bought with Apple Pay', detail: '13:16', state: 'done' },
  { title: 'Paper & Co sets them aside', detail: 'Charged when Paper & Co confirms', state: 'current' },
  { title: 'Ready · collect by Mon 9 Nov', detail: 'Collection code on the receipt', state: 'todo' },
];

const statuses: { status: string; tone: StatusTone }[] = [
  { status: 'Waiting for Paper & Co · not charged yet', tone: 'default' },
  { status: 'Ready · collect by Mon 9 Nov', tone: 'success' },
  { status: 'Sold · not charged', tone: 'warning' },
];
const noop = () => undefined;

export function OrderCardExamples() {
  const [step, setStep] = useState(0);
  const current = statuses[step % statuses.length];
  return (
    <View style={styles.list}>
      <OrderCard
        id="o1"
        status={current.status}
        tone={current.tone}
        shop="Paper & Co"
        items="2 × eclipse glasses"
        total="£29.98"
        steps={step % statuses.length === 0 ? waitingSteps : undefined}
        note="Keep looking for 1 more"
        onOpen={noop}
      />
      <Button label="Next status" role="plain" size="compact" onPress={() => setStep((n) => n + 1)} />
      <OrderCard id="o2" status="Not confirmed · not charged" tone="warning" shop="Broadway Chemist" items="1 × eclipse glasses" total="£9.50" />
      <OrderCard id="o3" status="Collected" tone="success" shop="Rossi's Bakery" items="1 × birthday cake, made to order" total="£32" onOpen={noop} />
      <OrderCard
        id="o4"
        status="Collected · rate Paper & Co"
        tone="success"
        shop="Paper & Co"
        items="2 × eclipse glasses"
        total="£29.98"
        onOpen={noop}
        action={{ label: 'Rate', onPress: noop }}
      />
      <OrderCard id="o5" status="Collected · rated" tone="success" shop="Paper & Co" items="2 × eclipse glasses" total="£29.98" onOpen={noop} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
