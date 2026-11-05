// First run, part 2 (app flow v8 "Location, asked in context"): why Snuffle needs location, before the system
// prompt. Allow location shows the platform's prompt, simulated with Alert (the web build can't show the real
// one, and the prototype doesn't request the permission). Choose a place instead opens the same location sheet
// as Nearby's address row. Either way, sign in follows.
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Alert, Button, Illustration, Text, screenMargin } from '@/design-system';
import { LocationSheet } from '@/screens/LocationSheet';
import { useAppActions } from '@/store';

export default function LocationAsk() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const margin = screenMargin(theme, frame.width);
  const { set } = useAppActions();
  const [prompt, setPrompt] = useState(false);
  const [sheet, setSheet] = useState(false);
  const ios = theme.platform === 'ios';

  const toSignIn = () => router.replace('/sign-in');
  const answer = (allowed: boolean) => {
    setPrompt(false);
    set({ locationOff: !allowed });
    toSignIn();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.body(insets.top, margin)}>
        <View style={styles.hero}>
          <Illustration name="quietstreet" size="hero" ground="location" />
        </View>
        <View style={styles.copy}>
          <Text variant="displayTitle" align="center" accessibilityRole="header">
            Find shops near you
          </Text>
          <Text variant="body" color="mutedForeground" align="center">
            Snuffle uses your location to know which shops are within a walk, and to show how far each one is. It isn&apos;t shared with
            shops.
          </Text>
        </View>
      </View>
      <View style={styles.actions(insets.bottom, margin)}>
        <Button label="Allow location" onPress={() => setPrompt(true)} />
        <Button label="Choose a place instead" role="plain" onPress={() => setSheet(true)} />
      </View>

      <LocationSheet open={sheet} onClose={() => setSheet(false)} onConfirm={() => toSignIn()} />

      {/* The system prompt, as each platform words it. */}
      <Alert
        visible={prompt}
        title={ios ? 'Allow “Snuffle” to use your location?' : 'Allow Snuffle to access this device’s location?'}
        message={ios ? 'Snuffle uses your location to find shops within a walk and show how far each one is.' : undefined}
        actions={
          ios
            ? [
                { label: 'Allow Once', onPress: () => answer(true) },
                { label: 'Allow While Using App', onPress: () => answer(true) },
                { label: "Don’t Allow", onPress: () => answer(false) },
              ]
            : [
                { label: 'While using the app', onPress: () => answer(true) },
                { label: 'Only this time', onPress: () => answer(true) },
                { label: "Don’t allow", onPress: () => answer(false) },
              ]
        }
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // The app's Background in both modes; in dark the quiet street is rendered for color.location and Illustration lifts
  // that colour softly behind it (colour.md, Location ask).
  screen: { flex: 1, backgroundColor: theme.color.background },
  body: (top: number, margin: number) => ({ flex: 1, paddingTop: top, paddingHorizontal: margin, gap: theme.gap.section }),
  // The art is centred between the status bar and the headline (visual critique, round 12).
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  copy: { gap: theme.gap.block, paddingBottom: theme.gap.section },
  actions: (bottom: number, margin: number) => ({ paddingHorizontal: margin, paddingBottom: bottom + theme.space[4], gap: theme.space[2] }),
}));
