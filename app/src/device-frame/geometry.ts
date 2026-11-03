/* eslint-disable snuffle/no-raw-style-numbers -- Device geometry from Apple's and Google's device specs, not design values. */
// The two phones the web build is drawn in. iPhone: the 402 × 874 pt viewport of iPhone 16 Pro / 17 Pro
// (decision 038). Android: a Pixel-like 412 × 915 dp viewport with a punch-hole camera and a gesture bar.
import type { PlatformName } from '@/store';

export type DeviceGeometry = {
  width: number;
  height: number;
  /** Corner radius of the screen. */
  screenRadius: number;
  /** Bezel width around the screen. */
  bezel: number;
  /** Safe-area insets the app sees inside the frame. */
  insets: { top: number; bottom: number; left: number; right: number };
  /** Height of the status bar row (time and icons). */
  statusBar: number;
  cutout:
    | { kind: 'island'; width: number; height: number; top: number }
    | { kind: 'hole'; size: number; top: number };
  /** The home indicator (iOS) or gesture bar (Android). */
  indicator: { width: number; height: number; bottom: number };
};

export const devices: Record<PlatformName, DeviceGeometry> = {
  ios: {
    width: 402,
    height: 874,
    screenRadius: 62,
    bezel: 12,
    insets: { top: 62, bottom: 34, left: 0, right: 0 },
    statusBar: 54,
    cutout: { kind: 'island', width: 126, height: 37, top: 11 },
    indicator: { width: 139, height: 5, bottom: 8 },
  },
  android: {
    width: 412,
    height: 915,
    screenRadius: 44,
    bezel: 10,
    insets: { top: 40, bottom: 24, left: 0, right: 0 },
    statusBar: 40,
    cutout: { kind: 'hole', size: 22, top: 9 },
    indicator: { width: 108, height: 4, bottom: 10 },
  },
};

/** Outer size of the frame, bezel included. */
export function outerSize(device: DeviceGeometry) {
  return { width: device.width + device.bezel * 2, height: device.height + device.bezel * 2 };
}
