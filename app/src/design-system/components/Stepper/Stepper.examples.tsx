import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Stepper } from './Stepper';

// Minus disabled at 1; plus capped at the shop's stock ("Has 1 of 2" caps it at 1).
export function StepperExamples() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  return (
    <View style={styles.list}>
      <Stepper value={a} onChange={setA} max={4} />
      <Stepper value={b} onChange={setB} max={1} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
