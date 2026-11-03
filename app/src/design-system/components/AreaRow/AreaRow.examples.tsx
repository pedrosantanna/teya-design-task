import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AreaRow } from './AreaRow';

// Default and location off.
export function AreaRowExamples() {
  return (
    <View style={styles.column}>
      <AreaRow place="Blythe Road, W14" detail="6 shopping streets within 15 min" onPress={() => undefined} />
      <AreaRow place="Blythe Road, W14" detail="Using Home. Turn on location for shops near where you are." onPress={() => undefined} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[4] },
}));
