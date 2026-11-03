import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BottomAccessory } from './BottomAccessory';

// With a count, and without. The bar never shrinks, so there is one size.
export function BottomAccessoryExamples() {
  const { theme } = useUnistyles();
  return (
    <View style={styles.list}>
      <View style={styles.box}>
        <BottomAccessory margin={theme.margin.screenCompact} requestsCount={1} onAskPress={() => undefined} />
      </View>
      <View style={styles.box}>
        <BottomAccessory margin={theme.margin.screenCompact} onAskPress={() => undefined} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[4] },
  box: { height: theme.size.field * 2 },
}));
