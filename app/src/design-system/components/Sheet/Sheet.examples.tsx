import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { Stepper } from '../Stepper/Stepper';
import { Text } from '../Text/Text';
import { Sheet } from './Sheet';

// The details sheet: medium and large detents, Buy pinned, dismissing blocked while Buy is loading.
export function SheetExamples() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const [how, setHow] = useState('collect');
  const buy = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <View style={styles.list}>
      <Button label="Open the details sheet" role="tonal" onPress={() => setOpen(true)} />
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Paper & Co"
        dismissible={!loading}
        footer={<Button label={`Buy · £${(14.99 * quantity).toFixed(2)}`} accessibilityLabel={`Buy, £${(14.99 * quantity).toFixed(2)}`} loading={loading} onPress={buy} />}
      >
        <Text variant="title3">Eclipse glasses</Text>
        <Text variant="subheadline" color="mutedForeground">
          £14.99 a pair · Has them · replied 2 min ago
        </Text>
        <Stepper value={quantity} onChange={setQuantity} max={2} />
        <SegmentedControl
          segments={[
            { value: 'collect', label: 'Collect' },
            { value: 'delivery', label: 'Delivery' },
          ]}
          value={how}
          onChange={setHow}
        />
        <Text variant="footnote" color="mutedForeground">
          {'You’re charged when Paper & Co confirms. If they can’t, you aren’t charged.'}
        </Text>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
