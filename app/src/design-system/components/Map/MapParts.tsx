// What the native and web maps share: the public props, where the pin sits, the camera padding that puts the
// shop under the pin, the pin itself (HugeIcons' location glyph filled in Primary), the OpenStreetMap
// attribution and the static fallback image shown while the map loads or if it can't draw.
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IMAGE_FILL } from '../../internal/media';
import type { ShopAccentName } from '../../theme';
import { Text } from '../Text/Text';
import { MAP_CENTER } from './mapData';
import { mapPlace, routeBearing, routeView, withRoute } from './mapRoute';
import { MAP_CAMERA, mapStyle } from './mapStyle';

export type MapProps = {
  /** Loading: Map ground alone. */
  loading?: boolean;
  /** Draw the shop's pin. */
  pin?: boolean;
  /** A tall view, such as the shop page's full-screen background: its size in points and the pin's distance from
   *  the top. The camera keeps the shop under the pin; the visible map is the band from the top to twice `pinY`.
   *  `attributionY` places the attribution's top where nothing covers it (the shop page: between photos and card). */
  extent?: { width: number; height: number; pinY: number; attributionY?: number };
  /** The shop's accent: its Detail colour fills the pin (On detail for the edge and the dot) instead of Primary. */
  accent?: ShopAccentName;
  /** Let the shopper pan and zoom. Off by default: on the shop page the map is a backdrop. */
  interactive?: boolean;
  /** A shop the build placed (assets/map/places.json): the map centres on it and draws the walk to it from the
   *  shopper's door in the shop's accent, zoomed out until the door shows (in `extent`, or in the map's own size). */
  shopId?: string;
  /** Draw the walk from the shopper's door. Off when the shopper is somewhere else (the Work place): the map still
   *  stands on the shop, at the area's zoom, with no route. */
  route?: boolean;
  /** Draw "© OpenStreetMap contributors" on the map. Off where the screen credits the map itself (the shop page, at its foot). */
  attribution?: boolean;
};

// The live map costs a lot to start (MapLibre's script and worker on the web, the native renderer on the phones), so
// it starts once the screen has stopped moving and the static image carries the first frames. The web's zoom takes
// 420 ms; the native stack's push and zoom take about half a second.
const SETTLE_MS = 600;

/** True once the screen's transition is over. */
export function useSettled(): boolean {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), SETTLE_MS);
    return () => clearTimeout(t);
  }, []);
  return settled;
}

/** Size of the static fallback image in points (scripts/render-map-fallback.mjs renders it at this size). */
const FALLBACK_SIZE = 640;

const FALLBACK = {
  light: require('../../../../assets/map/fallback-light.jpg'),
  dark: require('../../../../assets/map/fallback-dark.jpg'),
};

/** The style and camera for a map: the plain area, or a shop with its route. */
export function useMapView(scheme: 'light' | 'dark', accent: ShopAccentName | undefined, shopId: string | undefined, extent: MapProps['extent'], route = true) {
  const { theme } = useUnistyles();
  const place = extent ? mapPlace(shopId) : undefined;
  const base = mapStyle(scheme);
  if (!place || !extent) return { style: base, center: MAP_CENTER, zoom: MAP_CAMERA.zoom, bearing: MAP_CAMERA.bearing, offsetX: 0, key: 'area' };
  if (!route) return { style: base, center: place.at, zoom: MAP_CAMERA.zoom, bearing: MAP_CAMERA.bearing, offsetX: 0, key: `${shopId}:${scheme}:still` };
  const bearing = routeBearing(place);
  const line = accent ? theme.color.shop.accent[accent].detail : theme.color.primary;
  const ink = accent ? theme.color.shop.accent[accent].onDetail : theme.color.onPrimary;
  // Light: the pastel line is cased in the accent's ink, and the door is a white dot ringed in it. Dark: the line is the
  // tile's pastel (round 18; 9.99:1 or more on the dark roads), so the casing is the page ground (lifting it off the
  // roofs) and the door is a light dot ringed in the ground (the card colour measured 1.29:1 on the dark map and read as a hole).
  const dark = scheme === 'dark';
  const colour = dark ? { line, casing: theme.color.background, door: line, doorRing: theme.color.background } : { line, casing: ink, door: theme.color.card, doorRing: ink };
  return {
    style: withRoute(base, place, colour),
    center: place.at,
    ...routeView(place, extent.width, extent.pinY, bearing),
    bearing,
    key: `${shopId}:${scheme}:${accent ?? ''}`,
  };
}

/** Camera padding that puts the map's centre `pinY` points from the top of a tall view. */
export function cameraPadding(extent: MapProps['extent'], offsetX = 0) {
  // Padding on one side moves the map's centre half as far the other way: the shop sits `offsetX` right of the middle.
  const left = Math.max(0, 2 * offsetX);
  const right = Math.max(0, -2 * offsetX);
  if (!extent) return { top: 0, bottom: 0, left, right };
  const bottom = Math.max(0, extent.height - 2 * extent.pinY);
  return { top: 0, bottom, left, right };
}

/** The static map, centred on the pin at its rendered scale; in a tall view it grows to reach the bottom edge, so the
 *  map never ends in a flat band beside the shop page's card. */
export function MapFallback({ extent }: Pick<MapProps, 'extent'>) {
  const { theme } = useUnistyles();
  const size = extent ? Math.max(FALLBACK_SIZE, 2 * (extent.height - extent.pinY)) : FALLBACK_SIZE;
  return (
    <View style={styles.centre(extent?.pinY)} pointerEvents="none">
      <View style={styles.fallback(size)}>
        <Image source={FALLBACK[theme.scheme]} style={IMAGE_FILL} contentFit="cover" transition={0} />
      </View>
    </View>
  );
}

// A street pattern in viewBox units (0 to 100, sliced to the map's shape): a few long roads at the map's tilt and the
// streets between them, so the placeholder reads as a map from the first frame, never an empty block. It is no real place.
const SKELETON_MAIN = 'M-10 72 L110 38 M18 -10 L44 110';
const SKELETON_STREETS = 'M-10 30 L110 2 M-10 104 L110 70 M-10 52 L71 31 M64 -10 L84 110 M86 -10 L104 110 M-4 -10 L20 110 M29 42 L40 110';
// Stroke widths in points, whatever the map's size (non-scaling strokes): about the live map's streets at the area's
// zoom, the main roads twice the streets.
const SKELETON_MAIN_WIDTH = 6;
const SKELETON_STREET_WIDTH = 3;

/** The map's placeholder (components.md, Map): the live map's ground with a quiet street pattern in the live map's road colours
 *  (mapSkeleton aliases mapGround, mapRoad and mapRoadMain), so the cross-fade only adds detail, in light and dark. It shows from the
 *  first frame wherever the static image can't stand in (a shop's route, a still map on another street, the loading state) and under
 *  the image while that image loads. */
export function MapSkeleton() {
  const { theme } = useUnistyles();
  return (
    <View style={styles.skeletonGround} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <Path d={SKELETON_STREETS} stroke={theme.color.mapSkeleton.road} strokeWidth={SKELETON_STREET_WIDTH} vectorEffect="non-scaling-stroke" fill="none" />
        <Path d={SKELETON_MAIN} stroke={theme.color.mapSkeleton.roadMain} strokeWidth={SKELETON_MAIN_WIDTH} vectorEffect="non-scaling-stroke" fill="none" />
      </Svg>
    </View>
  );
}

/** What stands in for the live map until its first full render, then fades out over it (spring.fade's duration, ease-out): the skeleton, with
 *  the static image of the area over it when the map shows the plain area. It stays if the map fails. */
export function MapPlaceholder({ extent, image, ready }: Pick<MapProps, 'extent'> & { image: boolean; ready: boolean }) {
  const { theme } = useUnistyles();
  const opacity = useSharedValue(1);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!ready) {
      opacity.set(1);
      return;
    }
    // A short ease-out where the theme gives a duration (iOS, web): a spring's tail kept the placeholder and the live map on screen
    // together (visual critique). Android's Material fade is a physics spring, so it stays one.
    const fade = theme.spring.fade;
    const done = (finished?: boolean) => {
      'worklet';
      if (finished) scheduleOnRN(setGone, true);
    };
    opacity.set('duration' in fade ? withTiming(0, { duration: fade.duration, easing: Easing.out(Easing.quad) }, done) : withSpring(0, fade, done));
  }, [ready, opacity, theme.spring.fade]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.get() }));
  // Unmounted once faded; it shows again whenever the map stops being ready (a new style, a lost WebGL context).
  if (gone && ready) return null;
  return (
    <Animated.View style={[styles.skeleton, style]} pointerEvents="none">
      <MapSkeleton />
      {image ? <MapFallback extent={extent} /> : null}
    </Animated.View>
  );
}

// The glyph's paths, drawn filled: the outline in Primary, the dot in On Primary (or the shop's Detail and On detail). Its tip is at (12, 22).
const [outline, dot] = Location01Icon as unknown as [string, { d: string }][];

export function MapPin({ extent, accent, offsetX = 0 }: Pick<MapProps, 'extent' | 'accent'> & { offsetX?: number }) {
  const { theme } = useUnistyles();
  const size = theme.size.avatar.shop;
  const fill = accent ? theme.color.shop.accent[accent].detail : theme.color.primary;
  const mark = accent ? theme.color.shop.accent[accent].onDetail : theme.color.onPrimary;
  return (
    <View style={[styles.centre(extent?.pinY), { transform: [{ translateX: offsetX }] }]} pointerEvents="none">
      <View style={styles.pin(size)}>
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d={outline[1].d} fill={fill} stroke={mark} strokeWidth={1} />
          <Path d={dot[1].d} fill={mark} />
        </Svg>
      </View>
    </View>
  );
}

/** "© OpenStreetMap contributors" (ODbL), 11 pt in the map's bottom right corner: in a tall view at `attributionY` (else just
 *  below the pin) on the right, where neither the nav bar, the photos nor the card cover it. */
export function MapAttribution({ extent }: Pick<MapProps, 'extent'>) {
  return (
    <View style={extent ? styles.attributionBelowPin(extent.pinY, extent.attributionY) : styles.attribution} pointerEvents="none">
      <Text variant="caption2" color="mutedForeground">
        © OpenStreetMap contributors
      </Text>
    </View>
  );
}

/** The map's credit as a line of the page, for a screen whose map sits behind other content (the shop page's foot). */
export function MapCredit() {
  return (
    <Text variant="caption2" color="mutedForeground" align="center">
      © OpenStreetMap contributors
    </Text>
  );
}

const styles = StyleSheet.create((theme) => ({
  skeleton: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.mapGround },
  skeletonGround: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.mapSkeleton.ground },
  // A zero-size point at the pin: the centre of the view, or `pinY` from the top.
  centre: (pinY?: number) =>
    pinY === undefined
      ? { position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, overflow: 'visible' }
      : { position: 'absolute', top: pinY, left: '50%', width: 0, height: 0, overflow: 'visible' },
  fallback: (size: number) => ({ position: 'absolute', width: size, height: size, left: -size / 2, top: -size / 2 }),
  // The glyph's tip (12, 22 of 24) sits on the point.
  pin: (size: number) => ({ position: 'absolute', width: size, height: size, left: -size / 2, top: (-size * 22) / 24 }),
  attribution: {
    position: 'absolute',
    right: theme.space[2],
    bottom: theme.space[1],
    paddingHorizontal: theme.space[1],
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.mapGround,
    opacity: theme.state.mapAttribution,
  },
  attributionBelowPin: (pinY: number, top?: number) => ({
    position: 'absolute',
    right: theme.space[3],
    top: top ?? pinY + theme.space[6],
    paddingHorizontal: theme.space[1],
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.mapGround,
    opacity: theme.state.mapAttribution,
  }),
}));
