import { router, Stack, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles, withUnistyles } from 'react-native-unistyles';

import { DesignSystemRoot, NotificationBanner } from '@/design-system';
import { DebugGestureArea, DebugPanel, DebugToggle, useDebugShortcut } from '@/debug';
import { DeviceFrame, useFrameLayout } from '@/device-frame';
import { hrefFor, openActiveChat, readUrlState, sim, startThemeSync, useAppStore, useSim } from '@/store';

// Platform and scheme in the store drive the Unistyles theme from here on.
startThemeSync();

// The state debugger is a prototype tool for the web build only (it runs inside the docs site). Native builds
// never mount it, its toggle or its gesture; the store's defaults apply there.
const WEB = Platform.OS === 'web';

// Third-party view: wrapped so Unistyles styles reach it on the web too.
const RootView = withUnistyles(GestureHandlerRootView);

export default function RootLayout() {
  const { theme } = useUnistyles();
  const { framed, device, docked } = useFrameLayout();
  useDebugShortcut();
  useOpenStepFromUrl();

  const app = (
    <DesignSystemRoot>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      {/* A plain object: react-navigation's views don't take Unistyles styles on the web, so a theme switch has to re-render it. */}
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.color.background } }}>
        {/* The shop page is the shop's detail: a normal push with Back and the back gesture (v7 "Shop page"). */}
        <Stack.Screen name="shops/[id]" options={{ gestureEnabled: true }} />
      </Stack>
      <SimulatedNotification />
    </DesignSystemRoot>
  );

  return (
    <RootView style={framed ? styles.page : styles.root}>
      <SafeAreaProvider>
        {/* Keyboard tracking for the chat's composer (a no-op on the web; edge-to-edge on Android). */}
        <KeyboardProvider>
        {WEB ? (
          <DebugGestureArea>
            <View style={styles.row}>
              <Stage framed={framed} device={device}>
                {app}
              </Stage>
              {docked ? <DebugPanel docked /> : null}
            </View>
            {docked ? null : <DebugPanel />}
            <DebugToggle />
          </DebugGestureArea>
        ) : (
          <View style={styles.fill}>{app}</View>
        )}
        </KeyboardProvider>
      </SafeAreaProvider>
    </RootView>
  );
}

function Stage({ framed, device, children }: { framed: boolean; device: 'ios' | 'android'; children: ReactNode }) {
  if (!framed) return <View style={styles.fill}>{children}</View>;
  return <DeviceFrame device={device}>{children}</DeviceFrame>;
}

/** A link like `?step=answers` sets the store at start (store.ts); this shows the step's screen once the router is up. */
function useOpenStepFromUrl() {
  const ready = useRootNavigationState()?.key != null;
  useEffect(() => {
    if (!ready || openedFromUrl) return;
    openedFromUrl = true;
    const step = readUrlState().step;
    if (step && step !== 'home' && useAppStore.getState().step === step) router.navigate(hrefFor(step));
  }, [ready]);
}

let openedFromUrl = false;

const styles = StyleSheet.create((theme) => ({
  root: { flex: 1, backgroundColor: theme.color.background },
  // Framed on the web: the page background (public/index.html) shows around the phone.
  page: { flex: 1 },
  row: { flex: 1, flexDirection: 'row' },
  fill: { flex: 1 },
}));

/** Snuffle's notification while the shopper is elsewhere in the app, drawn as a system banner (decision 038). */
function SimulatedNotification() {
  const banner = useSim((s) => s.banner);
  return (
    <NotificationBanner
      visible={banner != null}
      title={banner?.title ?? ''}
      body={banner?.body ?? ''}
      onHide={sim.hideBanner}
      onPress={openActiveChat}
    />
  );
}
