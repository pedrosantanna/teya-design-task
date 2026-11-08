import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { screenMargin } from '../../theme';
import { PinnedOrder } from './PinnedOrder';
import type { StatusTone } from '../Tag/Tag';

const noop = () => undefined;

const states: { status: string; tone: StatusTone; code?: string; fulfilment?: 'collect' | 'delivery' }[] = [
  { status: 'Waiting for Paper & Co · not charged yet', tone: 'default' },
  { status: 'Ready · collect by Mon 9 Nov', tone: 'success', code: 'K7Q2' },
  { status: 'Extended · collect by Mon 16 Nov', tone: 'default', code: 'K7Q2' },
  { status: 'On its way', tone: 'default', fulfilment: 'delivery' },
  { status: 'Collected · rate Paper & Co', tone: 'success' },
  { status: 'Not collected · refunded', tone: 'default' },
];

export function PinnedOrderExamples() {
  const { theme } = useUnistyles();
  const margin = screenMargin(theme, 402);
  return (
    <View style={styles.list}>
      {states.map((s) => (
        <PinnedOrder
          key={s.status}
          status={s.status}
          tone={s.tone}
          shop="Paper & Co"
          items="2 × eclipse glasses"
          accent="pistachio"
          fulfilment={s.fulfilment}
          code={s.code}
          margin={margin}
          onPress={noop}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[2] },
}));
