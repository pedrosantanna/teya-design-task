// Wraps the app once, inside the device frame: loads Gambetta and Switzer before text renders, and hosts
// sheets so they present inside the frame.
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { SheetProvider } from './components/Sheet/Sheet';
import { useDesignSystemFonts } from './theme/fonts';

// Native: the system splash (the bare mark on the background, app.json) stays until the fonts are in, then fades
// into the first screen. On a first run that screen draws the same mark in the same place (first-run change).
if (Platform.OS !== 'web') {
  void SplashScreen.preventAutoHideAsync().catch(() => undefined);
  SplashScreen.setOptions({ fade: true, duration: 250 });
}

export function DesignSystemRoot({ children }: { children: ReactNode }) {
  const ready = useDesignSystemFonts();
  useEffect(() => {
    if (ready && Platform.OS !== 'web') SplashScreen.hide();
  }, [ready]);
  if (!ready) return null;
  return <SheetProvider>{children}</SheetProvider>;
}
