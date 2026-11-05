// First run, part 3 (app flow v8 "Sign in"): Apple first (App Store guideline 4.8), then Google, Facebook and
// email. Mock auth: any provider signs in as the persona selected in the store, after a short spinner, and Nearby
// fades in. Nothing is sent anywhere.
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, SignInButton, SnuffleMark, Text, screenMargin, type SignInProvider } from '@/design-system';
import { finishFirstRun } from '@/store';

// How long the mock sign in "takes".
const SIGN_IN_MS = 700;

const PROVIDERS: SignInProvider[] = ['apple', 'google', 'facebook', 'email'];

export default function SignIn() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const margin = screenMargin(theme, frame.width);
  const [pending, setPending] = useState<SignInProvider | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const signIn = (provider: SignInProvider) => {
    if (timer.current) return;
    setPending(provider);
    timer.current = setTimeout(finishFirstRun, SIGN_IN_MS);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.top(insets.top, margin)}>
        {/* PROPOSAL (app flow v8 note, to decide): Not now lets the shopper browse Nearby first; sign in would then be
            asked at the first send or Buy, when it is clearly needed. In the prototype it simply finishes first run. */}
        <Button label="Not now" role="plain" size="compact" onPress={finishFirstRun} disabled={pending != null} />
      </View>
      <View style={styles.body(margin)}>
        <SnuffleMark size="large" />
        <View style={styles.copy}>
          <Text variant="displayTitle" align="center" accessibilityRole="header">
            Sign in to ask shops
          </Text>
          <Text variant="body" color="mutedForeground" align="center">
            Shops answer you by name, and your requests and orders stay on every device.
          </Text>
        </View>
      </View>
      <View style={styles.actions(insets.bottom, margin)}>
        {PROVIDERS.map((p) => (
          <SignInButton key={p} provider={p} onPress={signIn} loading={pending === p} disabled={pending != null && pending !== p} />
        ))}
        <Text variant="footnote" color="mutedForeground" align="center">
          By continuing you agree to the Terms and Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  top: (top: number, margin: number) => ({
    paddingTop: top,
    paddingHorizontal: margin,
    minHeight: top + theme.hit.min,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
  body: (margin: number) => ({ flex: 1, paddingHorizontal: margin, alignItems: 'center', justifyContent: 'center', gap: theme.gap.aboveTitle }),
  copy: { gap: theme.gap.block },
  actions: (bottom: number, margin: number) => ({ paddingHorizontal: margin, paddingBottom: bottom + theme.space[4], gap: theme.space[2] }),
}));
