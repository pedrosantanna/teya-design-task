// The panel: docked beside the phone frame on wide web windows, and below 900 px (where it can't dock) a
// bottom sheet over the lower part of the window, so the top of the phone stays in view.
// It mounts only while open, slides on the UI thread with spring.smooth, and unmounts once it has left.
import { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import { Button, Text } from '@/design-system';

import { Divider } from './controls';
import { ActionsSection, ContentSection, JourneySection, LookSection, PersonaSection, SimulationSection, StatesSection } from './sections';
import { useDebugger } from './visibility';

/** Width of the panel, as in design.md: 320 on wide screens, narrower on phones. */
const PANEL_WIDTH = 320;
/** Share of the window the bottom sheet takes on narrow windows. */
const SHEET_SHARE = 0.5;

export function DebugPanel({ docked = false }: { docked?: boolean }) {
  const visible = useDebugger((s) => s.open && !s.hidden);
  const [mounted, setMounted] = useState(visible);
  const { theme } = useUnistyles();
  const progress = useSharedValue(visible ? 1 : 0);

  // Mount as soon as it should show (set during render, not in the effect); unmount after the slide out.
  if (visible && !mounted) setMounted(true);

  useEffect(() => {
    if (visible) {
      progress.set(withSpring(1, theme.spring.smooth));
    } else {
      progress.set(
        withSpring(0, theme.spring.smooth, (finished) => {
          if (finished) scheduleOnRN(setMounted, false);
        }),
      );
    }
  }, [visible, progress, theme.spring.smooth]);

  if (!mounted) return null;
  return <Panel docked={docked} progress={progress} />;
}

function Panel({ docked, progress }: { docked: boolean; progress: ReturnType<typeof useSharedValue<number>> }) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const setOpen = useDebugger((s) => s.setOpen);
  const width = Math.min(PANEL_WIDTH, windowWidth - theme.space[7]);
  const travel = width + theme.space[4];
  const sheetHeight = Math.round(windowHeight * SHEET_SHARE);

  const slide = useAnimatedStyle(() =>
    docked
      ? { opacity: progress.get(), transform: [{ translateX: (1 - progress.get()) * travel }] }
      : { opacity: 1, transform: [{ translateY: (1 - progress.get()) * sheetHeight }] },
  );

  return (
    <Animated.View
      style={[docked ? styles.docked(width) : styles.sheet(sheetHeight, insets.bottom), slide]}
      accessibilityViewIsModal={!docked}
      accessibilityLabel="State debugger"
    >
      <View style={styles.header}>
        <Text variant="headline" accessibilityRole="header">
          State debugger
        </Text>
        <Button label="Close" size="compact" role="plain" onPress={() => setOpen(false)} />
      </View>
      <Divider />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <PersonaSection />
        <Divider />
        <LookSection />
        <Divider />
        <JourneySection />
        <Divider />
        <SimulationSection />
        <Divider />
        <StatesSection />
        <Divider />
        <ContentSection />
        <Divider />
        <ActionsSection />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  sheet: (height: number, bottom: number) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height,
    paddingBottom: bottom,
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    backgroundColor: theme.color.card,
    overflow: 'hidden',
    shadowColor: theme.color.scrim,
    shadowOpacity: theme.state.scrim / 2,
    shadowRadius: theme.space[6],
    shadowOffset: { width: 0, height: theme.space[2] },
    elevation: theme.space[3],
  }),
  docked: (width: number) => ({
    width,
    alignSelf: 'stretch',
    backgroundColor: theme.color.card,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: theme.color.muted,
  }),
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.space[4],
    paddingRight: theme.space[2],
    paddingVertical: theme.space[2],
  },
  content: {
    padding: theme.space[4],
    paddingBottom: theme.space[8],
    gap: theme.space[4],
  },
}));
