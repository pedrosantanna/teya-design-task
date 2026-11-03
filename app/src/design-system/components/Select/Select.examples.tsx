import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { OptionList } from './OptionList';
import { Select } from './Select';

const orderStates = [
  { value: 'waiting', label: 'Waiting for Paper & Co · not charged yet' },
  { value: 'ready', label: 'Ready · collect by Mon 9 Nov' },
  { value: 'sold', label: 'Sold · not charged' },
] as const;

const steps = [
  { value: 'answers', label: 'Answers as they arrive', detail: '13:14' },
  { value: 'details', label: 'Details: buy and how to get it', detail: '13:15' },
] as const;

// A closed select, and an option list on its own. Rendered on the design-system gallery route (/design-system).
export function SelectExamples() {
  const [order, setOrder] = useState<(typeof orderStates)[number]['value']>('ready');
  const [step, setStep] = useState<(typeof steps)[number]['value']>('answers');
  return (
    <View style={styles.list}>
      <Select label="Order" options={orderStates} value={order} onChange={setOrder} />
      <OptionList options={steps} value={step} onChange={setStep} accessibilityLabel="Journey step" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
