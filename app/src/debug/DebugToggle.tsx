// The round button that opens the panel. Hidden with the debugger, and while the panel is open.
import SlidersHorizontalIcon from '@hugeicons/core-free-icons/SlidersHorizontalIcon';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { FloatingButton } from '@/design-system';

import { useDebugger } from './visibility';

export function DebugToggle() {
  const show = useDebugger((s) => !s.hidden && !s.open);
  const setOpen = useDebugger((s) => s.setOpen);
  const insets = useSafeAreaInsets();
  if (!show) return null;
  return (
    <View style={styles.corner(insets.bottom)} pointerEvents="box-none">
      <FloatingButton icon={SlidersHorizontalIcon} accessibilityLabel="Open the state debugger" onPress={() => setOpen(true)} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  corner: (bottom: number) => ({
    position: 'absolute',
    right: theme.space[4],
    bottom: bottom + theme.space[8] + theme.space[7],
  }),
}));
