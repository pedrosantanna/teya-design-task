import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '../Text/Text';
import { Map } from './Map';

export function MapExamples() {
  return (
    <View style={styles.list}>
      <View style={styles.frame}>
        <Map />
      </View>
      <Text variant="caption1" color="mutedForeground">
        Loading: Map ground alone
      </Text>
      <View style={styles.small}>
        <Map loading />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[2] },
  frame: { height: theme.size.thumb.request * 4, borderRadius: theme.radius.inner, overflow: 'hidden' },
  small: { height: theme.size.thumb.request, borderRadius: theme.radius.inner, overflow: 'hidden' },
}));
