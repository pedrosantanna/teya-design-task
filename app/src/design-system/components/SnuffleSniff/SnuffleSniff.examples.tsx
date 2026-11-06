import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '../Text/Text';
import { SnuffleSniff } from './SnuffleSniff';

// Sniffing at the default width, then paused (the still glyph Reduce Motion shows).
export function SnuffleSniffExamples() {
  return (
    <View style={styles.row}>
      <View style={styles.item}>
        <SnuffleSniff />
        <Text variant="caption1" color="mutedForeground">
          Sniffing
        </Text>
      </View>
      <View style={styles.item}>
        <SnuffleSniff paused />
        <Text variant="caption1" color="mutedForeground">
          Still
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: theme.space[6] },
  item: { alignItems: 'center', gap: theme.space[2] },
}));
