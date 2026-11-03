import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { ZoomSource } from './ZoomSource';

// A source that zooms into Requests.
export function ZoomSourceExamples() {
  return (
    <View style={styles.row}>
      <ZoomSource id="example-zoom" href="/requests">
        {(open) => <Button label="Zoom into Requests" role="tonal" size="compact" onPress={open} />}
      </ZoomSource>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', gap: theme.space[2] },
}));
