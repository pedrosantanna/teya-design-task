import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Map } from '../Map/Map';
import { CloseButton } from './CloseButton';

// Muted fill on a surface, and glass (or blur, or a tonal surface) over the map.
export function CloseButtonExamples() {
  return (
    <View style={styles.row}>
      <CloseButton />
      <View style={styles.media}>
        <Map />
        <View style={styles.overlay}>
          <CloseButton overMedia />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[6] },
  media: { width: theme.size.thumb.request * 3, height: theme.size.thumb.request * 2, borderRadius: theme.radius.inner, overflow: 'hidden' },
  overlay: { position: 'absolute', top: theme.space[2], left: theme.space[2] },
}));
