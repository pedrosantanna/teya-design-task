import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Checkbox } from './Checkbox';

// One example per state. Rendered on the design-system gallery route (/design-system).
export function CheckboxExamples() {
  const [checked, setChecked] = useState(true);
  const [unchecked, setUnchecked] = useState(false);
  return (
    <View style={styles.list}>
      <Checkbox label="Keep looking for 1 more" checked={checked} onChange={setChecked} />
      <Checkbox label="Skeletons" detail="Content shows its loading state" checked={unchecked} onChange={setUnchecked} />
      <Checkbox label="Disabled" checked onChange={() => {}} disabled />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[1] },
}));
