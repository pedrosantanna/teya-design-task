import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { MarkIntro } from './MarkIntro';

// Frames of the build, side by side: rolled awning, stripes unrolling, ears and eyes, a blink, the final frame.
const FRAMES = [0, 300, 700, 1000, 1300, 1600];

export function MarkIntroExamples() {
  return (
    <View style={styles.row}>
      {FRAMES.map((ms) => (
        <View key={ms} style={styles.frame}>
          <MarkIntro frozenAt={ms} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
  frame: { width: theme.size.thumb.request * 2, height: theme.size.thumb.request * 2, overflow: 'hidden', borderRadius: theme.radius.inner },
}));
