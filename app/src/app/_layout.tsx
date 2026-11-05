import { router, Stack, usePathname, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles, withUnistyles } from 'react-native-unistyles';

import { useReducedMotion } from 'react-native-reanimated';

import { DesignSystemRoot, NotificationBanner, installWebTransitions, nameScreenArea, type TransitionKind } from '@/design-system';
import { DebugGestureArea, DebugPanel, DebugToggle, useDebugShortcut } from '@/debug';
import { DeviceFrame, useFrameLayout } from '@/device-frame';
import { hrefFor, openActiveChat, readUrlState, sim, startThemeSync, useAppStore, useSim } from '@/store';

// Platform and scheme in the store drive the Unistyles theme from here on.
startThemeSync();

// The state debugger is a prototype tool for the web build only (it runs inside the docs site). Native builds
// never mount it, its toggle or its gesture; the store's defaults apply there.
const WEB = Platform.OS === 'web';

// Web: every router call runs as a view transition (design-system/internal/transitions.ts). The kind follows
// the route: zooms into the shop page and Requests come from their ZoomSource, the receipt fades, Keep looking and
// Ask rise as sheets, everything else pushes and pops.
let currentPath = '/';
const SHEETS = /\/(keep-looking|requests\/new)$/;
// First run (welcome, location ask, sign in) fades from screen to screen and into Nearby.
const FIRST_RUN = /^\/(welcome|location-ask|sign-in)$/;
function kindFor(target: string | null, current: string): TransitionKind {
  if (FIRST_RUN.test(current) || (target != null && FIRST_RUN.test(target.split('?')[0]))) return 'fade';
  if (target == null) {
    if (/^\/shops\/[^/]+$/.test(current) || current === '/requests') return 'unzoom';
    if (SHEETS.test(current)) return 'unsheet';
    if (/\/order$/.test(current)) return 'fade';
    return 'pop';
  }
  if (SHEETS.test(target)) return 'sheet';
  if (/\/order$/.test(target)) return 'fade';
  if (target === '/' || target === '/index') return 'pop';
  return 'push';
}
installWebTransitions(router as never, kindFor, () => currentPath);

// `?intro=<ms>` holds the splash at that time of its build (frames for review). The router rewrites the address
// before the splash screen's chunk loads, so the root layout keeps the value for it (see (onboarding)/welcome.tsx).
if (WEB) (globalThis as { __snuffleIntro?: string | null }).__snuffleIntro = new URLSearchParams(window.location.search).get('intro');

// Third-party view: wrapped so Unistyles styles reach it on the web too.
const RootView = withUnistyles(GestureHandlerRootView);

export default function RootLayout() {
  const { theme } = useUnistyles();
  const { framed, device, docked } = useFrameLayout();
  useDebugShortcut();
  useOpenStepFromUrl();
  const pathname = usePathname();
  useEffect(() => {
    currentPath = pathname;
  }, [pathname]);
  // Until first run is done the screens sit on the splash's Indigo, so the native splash hands over to the same
  // colour before the in-app splash mounts (no beige flash from Nearby's Background).
  const onboarded = useAppStore((s) => s.hasOnboarded);
  const reduceMotion = useReducedMotion();
  // Native stacks animate each route (iOS 26 patterns, Apple Music as the reference); Reduce Motion crossfades.
  // The web animates through view transitions instead, so its stack doesn't.
  const anim = (native: 'default' | 'fade' | 'slide_from_bottom' | 'slide_from_right') =>
    WEB ? 'none' : reduceMotion ? 'fade' : native;
  const zoomAnim = anim(Platform.OS === 'android' ? 'fade' : 'default');

  const app = (
    <DesignSystemRoot>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      {/* A plain object: react-navigation's views don't take Unistyles styles on the web, so a theme switch has to re-render it. */}
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: onboarded ? theme.color.background : theme.color.splash.ground } }}>
        {/* The shop page and Requests zoom from their source (ZoomSource): the native zoom on iOS, a fade under the
            container transform on Android. Both keep the back gesture. */}
        <Stack.Screen name="shops/[id]" options={{ gestureEnabled: true, animation: zoomAnim }} />
        <Stack.Screen name="reviews/[id]" options={{ animation: anim('default') }} />
        <Stack.Screen name="requests/index" options={{ gestureEnabled: true, animation: zoomAnim }} />
        <Stack.Screen name="requests/[id]/index" options={{ animation: anim('default') }} />
        <Stack.Screen name="requests/[id]/order" options={{ animation: anim('fade') }} />
        <Stack.Screen
          name="requests/[id]/keep-looking"
          options={{ presentation: WEB ? 'card' : 'modal', animation: anim(Platform.OS === 'android' ? 'slide_from_bottom' : 'default') }}
        />
        <Stack.Screen name="requests/new" options={{ animation: anim(Platform.OS === 'android' ? 'slide_from_bottom' : 'fade') }} />
        <Stack.Screen name="places" options={{ animation: anim('default') }} />
        {/* First run replaces screen by screen, so Back never returns into it; each fades in, Nearby too. */}
        <Stack.Screen name="index" options={{ animation: anim('fade') }} />
        <Stack.Screen name="(onboarding)/welcome" options={{ animation: anim('fade'), gestureEnabled: false }} />
        <Stack.Screen name="(onboarding)/location-ask" options={{ animation: anim('fade'), gestureEnabled: false }} />
        <Stack.Screen name="(onboarding)/sign-in" options={{ animation: anim('fade'), gestureEnabled: false }} />
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
  // The screen area is what web view transitions animate, so the page and the frame around it stay still.
  const screen = (
    <View ref={nameScreenArea} collapsable={false} style={styles.fill}>
      {children}
    </View>
  );
  if (!framed) return screen;
  return <DeviceFrame device={device}>{screen}</DeviceFrame>;
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
