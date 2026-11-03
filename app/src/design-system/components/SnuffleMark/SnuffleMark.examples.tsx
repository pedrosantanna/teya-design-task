import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '../Text/Text';
import { SnuffleMark } from './SnuffleMark';

// Every size, then the sender line as the chat shows it. The glyph follows the theme: switch to Dark to see it light.
export function SnuffleMarkExamples() {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <SnuffleMark size="inline" />
        <SnuffleMark size="icon" />
        <SnuffleMark size="large" />
        <SnuffleMark size="splash" />
      </View>
      <View style={styles.sender}>
        <SnuffleMark />
        <Text variant="caption1" color="mutedForeground">
          Snuffle
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[4] },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: theme.space[4] },
  sender: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
}));
