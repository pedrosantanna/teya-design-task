import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ConfirmButton } from './ConfirmButton';

// Enabled and disabled. iOS and the web: the tinted checkmark; Android: "Done" as a tonal button.
export function ConfirmButtonExamples() {
  return (
    <View style={styles.row}>
      <ConfirmButton onPress={() => undefined} />
      <ConfirmButton disabled />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[6] },
}));
