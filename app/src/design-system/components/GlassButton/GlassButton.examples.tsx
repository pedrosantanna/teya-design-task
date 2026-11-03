import Add01Icon from '@hugeicons/core-free-icons/Add01Icon';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Map } from '../Map/Map';
import { GlassButton } from './GlassButton';

// Back on a surface, Back over the map (glass on iOS and the web, a tonal circle on Android) and a plain action.
export function GlassButtonExamples() {
  return (
    <View style={styles.row}>
      <GlassButton icon="back" accessibilityLabel="Back to Requests" onPress={() => undefined} />
      <View style={styles.media}>
        <Map />
        <View style={styles.overlay}>
          <GlassButton icon="back" accessibilityLabel="Back to Nearby" overMedia onPress={() => undefined} />
        </View>
      </View>
      <GlassButton icon={Add01Icon} accessibilityLabel="Add place" onPress={() => undefined} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[6] },
  media: { width: theme.size.thumb.request * 3, height: theme.size.thumb.request * 2, borderRadius: theme.radius.inner, overflow: 'hidden' },
  overlay: { position: 'absolute', top: theme.space[2], left: theme.space[2] },
}));
