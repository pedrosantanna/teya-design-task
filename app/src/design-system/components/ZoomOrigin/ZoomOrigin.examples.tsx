import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { Sheet } from '../Sheet/Sheet';
import { Text } from '../Text/Text';
import { ZoomOrigin } from './ZoomOrigin';

// A button that a sheet grows from.
export function ZoomOriginExamples() {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.row}>
      <ZoomOrigin id="example-origin">
        <Button label="Open from here" role="tonal" size="compact" onPress={() => setOpen(true)} />
      </ZoomOrigin>
      <Sheet open={open} onClose={() => setOpen(false)} title="From the button" detents={['medium']} origin="example-origin">
        <Text variant="body">This sheet grew from the button.</Text>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', gap: theme.space[2] },
}));
