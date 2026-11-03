// Three-finger long-press anywhere shows or hides the debugger (native builds). The web build uses the
// `D` key instead: a root gesture detector on the web would change touch-action and text selection.
import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { GestureDetector, useLongPressGesture } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

import { useDebugger } from './visibility';

const HOLD_MS = 600;

export function DebugGestureArea({ children }: { children: ReactNode }) {
  if (Platform.OS === 'web') return <View style={styles.fill}>{children}</View>;
  return <NativeGestureArea>{children}</NativeGestureArea>;
}

function NativeGestureArea({ children }: { children: ReactNode }) {
  const gesture = useLongPressGesture({
    numberOfPointers: 3,
    minDuration: HOLD_MS,
    runOnJS: true,
    cancelsTouchesInView: false,
    onActivate: () => useDebugger.getState().toggleHidden(),
  });
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.fill} collapsable={false}>
        {children}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
