// The phone drawn around the web build: bezel, screen corners, status bar, Dynamic Island or punch-hole
// camera, and the home indicator or gesture bar. The app inside sees the phone's safe-area insets.
import { HugeiconsIcon } from '@hugeicons/react-native';
import BatteryFullIcon from '@hugeicons/core-free-icons/BatteryFullIcon';
import SignalFull02Icon from '@hugeicons/core-free-icons/SignalFull02Icon';
import Wifi01Icon from '@hugeicons/core-free-icons/Wifi01Icon';
import { usePathname } from 'expo-router';
import { useMemo, useState, type ReactNode } from 'react';
import { Platform, View, type LayoutChangeEvent } from 'react-native';
import { SafeAreaFrameContext, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text, useStatusToneOverride } from '@/design-system';
import { useStep, type PlatformName } from '@/store';

import { devices, outerSize, type DeviceGeometry } from './geometry';

type Props = { device: PlatformName; children: ReactNode };

/** Fills its parent and draws the phone centred in it, scaled down to fit (never up). */
export function DeviceFrame({ device, children }: Props) {
  const { theme } = useUnistyles();
  const geometry = devices[device];
  const outer = outerSize(geometry);
  const [space, setSpace] = useState({ width: 0, height: 0 });
  const margin = theme.space[6];

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSpace((s) => (s.width === width && s.height === height ? s : { width, height }));
  };

  const fit = Math.min(1, (space.width - margin * 2) / outer.width, (space.height - margin * 2) / outer.height);
  // Round down to 1% so small window changes don't re-scale text every pixel.
  const scale = Math.max(0.25, Math.floor(fit * 100) / 100);

  const insets = geometry.insets;
  const frame = useMemo(() => ({ x: 0, y: 0, width: geometry.width, height: geometry.height }), [geometry]);

  return (
    <View style={styles.stage} onLayout={onLayout}>
      {space.width > 0 ? (
        <View style={styles.slot(outer.width * scale, outer.height * scale)}>
          <View
            style={[styles.phone(outer.width, outer.height, geometry.screenRadius + geometry.bezel, geometry.bezel), styles.scaled(scale)]}
            accessibilityLabel={device === 'ios' ? 'iPhone' : 'Android phone'}
          >
            <View style={styles.screen(geometry.width, geometry.height, geometry.screenRadius)}>
              <SafeAreaFrameContext.Provider value={frame}>
                <SafeAreaInsetsContext.Provider value={insets}>{children}</SafeAreaInsetsContext.Provider>
              </SafeAreaFrameContext.Provider>
              <StatusBar device={device} geometry={geometry} />
              <Indicator geometry={geometry} />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

function Indicator({ geometry }: { geometry: DeviceGeometry }) {
  const { theme } = useUnistyles();
  const ink = useStatusInk();
  return <View pointerEvents="none" style={[styles.indicator(geometry.indicator), { backgroundColor: theme.color[ink] }]} />;
}

function StatusBar({ device, geometry }: { device: PlatformName; geometry: DeviceGeometry }) {
  const { theme } = useUnistyles();
  const time = useStep().time;
  // The lock screen draws its own large clock, so the status bar leaves the time out there.
  const locked = usePathname() === '/lock';
  const icon = device === 'ios' ? theme.type.subheadline.lineHeight - theme.space[1] : theme.type.footnote.lineHeight - theme.space[1];
  const cutout = geometry.cutout;
  // Over an accent tile in dark the content turns to the tile's ink (see useStatusTone).
  const ink = useStatusInk();
  return (
    <View pointerEvents="none" style={styles.statusBar(geometry.statusBar, device === 'ios')} accessibilityElementsHidden>
      <View style={styles.ear(device === 'ios')}>
        {locked ? null : <Text variant={device === 'ios' ? 'headline' : 'footnote'} color={ink}>{time}</Text>}
      </View>
      {cutout.kind === 'island' ? (
        <View style={styles.island(cutout.width, cutout.height, cutout.top)} />
      ) : (
        <View style={styles.hole(cutout.size, cutout.top)} />
      )}
      <View style={[styles.ear(device === 'ios'), styles.icons(device === 'ios')]}>
        <HugeiconsIcon icon={SignalFull02Icon} size={icon} strokeWidth={2} color={theme.color[ink]} />
        <HugeiconsIcon icon={Wifi01Icon} size={icon} strokeWidth={2} color={theme.color[ink]} />
        <HugeiconsIcon icon={BatteryFullIcon} size={icon} strokeWidth={2} color={theme.color[ink]} />
      </View>
    </View>
  );
}

/** The colour role of the phone's status bar and home indicator: Foreground, or the tile's ink while a screen asks for dark content in dark mode. */
function useStatusInk(): 'foreground' | 'foregroundOnTile' {
  const { theme } = useUnistyles();
  const tone = useStatusToneOverride();
  return theme.scheme === 'dark' && tone === 'dark' ? 'foregroundOnTile' : 'foreground';
}

// The phone's own chrome (status bar, home indicator) sits above every app layer, the portal's overlays
// (sheets, the enlarged code) included, as on a phone.
const CHROME_LAYER = 1000;

const styles = StyleSheet.create((theme) => ({
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  slot: (width: number, height: number) => ({ width, height }),
  phone: (width: number, height: number, radius: number, bezel: number) => ({
    width,
    height,
    padding: bezel,
    borderRadius: radius,
    backgroundColor: theme.color.scrim,
    shadowColor: theme.color.scrim,
    shadowOpacity: theme.state.scrim / 2,
    shadowRadius: theme.space[7],
    shadowOffset: { width: 0, height: theme.space[3] },
  }),
  scaled: (scale: number) => ({
    transform: [{ scale }],
    transformOrigin: 'top left',
  }),
  screen: (width: number, height: number, radius: number) => ({
    width,
    height,
    borderRadius: radius,
    overflow: 'hidden',
    backgroundColor: theme.color.background,
    // A rounded overflow does not clip a child that animates on its own compositor layer (a screen sliding in
    // or a sheet rising), so its square corners showed until the animation ended. clip-path clips from the first frame.
    ...(Platform.OS === 'web' ? ({ clipPath: `inset(0 round ${radius}px)`, isolation: 'isolate' } as object) : null),
  }),
  statusBar: (height: number, ios: boolean) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
    zIndex: CHROME_LAYER,
    flexDirection: 'row',
    alignItems: ios ? 'center' : 'flex-start',
    paddingTop: ios ? theme.space[1] : theme.space[3],
    paddingHorizontal: ios ? 0 : theme.space[5],
  }),
  ear: (ios: boolean) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: ios ? 'center' : 'flex-start',
  }),
  icons: (ios: boolean) => ({ justifyContent: ios ? 'center' : 'flex-end', gap: theme.space[1] }),
  island: (width: number, height: number, top: number) => ({
    position: 'absolute',
    top,
    left: '50%',
    width,
    height,
    marginLeft: -width / 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.scrim,
  }),
  hole: (size: number, top: number) => ({
    position: 'absolute',
    top,
    left: '50%',
    width: size,
    height: size,
    marginLeft: -size / 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.scrim,
  }),
  indicator: (indicator: DeviceGeometry['indicator']) => ({
    position: 'absolute',
    zIndex: CHROME_LAYER,
    bottom: indicator.bottom,
    left: '50%',
    width: indicator.width,
    height: indicator.height,
    marginLeft: -indicator.width / 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.foreground,
  }),
}));
