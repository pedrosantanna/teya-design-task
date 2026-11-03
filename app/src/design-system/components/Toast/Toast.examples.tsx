import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Toast } from './Toast';

// In place in a frame (the real one sits above the ask bar). iOS: glass banner. Android: snackbar.
export function ToastExamples() {
  const [visible, setVisible] = useState(true);
  const [undone, setUndone] = useState(0);
  return (
    <View style={styles.list}>
      <View style={styles.frame}>
        <Toast
          visible={visible}
          persistent
          message="Request closed"
          actionLabel="Undo"
          onAction={() => setUndone((n) => n + 1)}
          onHide={() => setVisible(false)}
          bottom={0}
        />
      </View>
      <View style={styles.row}>
        <Button label={visible ? 'Hide' : 'Show'} role="plain" size="compact" onPress={() => setVisible((v) => !v)} />
        <Text variant="footnote" color="mutedForeground">{`Undo tapped ${undone} times`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[2] },
  frame: { height: theme.size.button.large + theme.space[4], marginHorizontal: -theme.margin.screenCompact },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
}));
