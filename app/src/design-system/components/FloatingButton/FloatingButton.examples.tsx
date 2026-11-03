import SlidersHorizontalIcon from '@hugeicons/core-free-icons/SlidersHorizontalIcon';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { FloatingButton } from './FloatingButton';

// Closed and open. Rendered on the design-system gallery route (/design-system).
export function FloatingButtonExamples() {
  const [open, setOpen] = useState(true);
  return (
    <View style={styles.row}>
      <FloatingButton icon={SlidersHorizontalIcon} accessibilityLabel="State debugger" onPress={() => {}} />
      <FloatingButton icon={SlidersHorizontalIcon} accessibilityLabel="State debugger" selected={open} onPress={() => setOpen((o) => !o)} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', gap: theme.space[4], padding: theme.space[2] },
}));
