import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Switch } from './Switch';

// One example per state. Rendered on the design-system gallery route (/design-system).
export function SwitchExamples() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  return (
    <View style={styles.list}>
      <Switch label="Notifications allowed" value={on} onValueChange={setOn} />
      <Switch label="Location off" detail="Nearby shows its location-off state" value={off} onValueChange={setOff} />
      <Switch label="Disabled" value onValueChange={() => {}} disabled />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[1] },
}));
