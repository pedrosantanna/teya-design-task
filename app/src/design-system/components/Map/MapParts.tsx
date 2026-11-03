// What the native and web maps share: the public props, where the pin sits, the camera padding that puts the
// shop under the pin, the pin itself (HugeIcons' location glyph filled in Primary), the OpenStreetMap
// attribution and the static fallback image shown while the map loads or if it can't draw.
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import { Image } from 'expo-image';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text } from '../Text/Text';

export type MapProps = {
  /** Loading: Map ground alone. */
  loading?: boolean;
  /** Draw the shop's pin. */
  pin?: boolean;
  /** A tall view, such as the shop page's full-screen background: its size in points and the pin's distance from
   *  the top. The camera keeps the shop under the pin; the visible map is the band from the top to twice `pinY`.
   *  `attributionY` places the attribution's top where nothing covers it (the shop page: between photos and card). */
  extent?: { width: number; height: number; pinY: number; attributionY?: number };
  /** Let the shopper pan and zoom. Off by default: on the shop page the map is a backdrop. */
  interactive?: boolean;
};

/** Size of the static fallback image in points (scripts/render-map-fallback.mjs renders it at this size). */
const FALLBACK_SIZE = 640;

const FALLBACK = {
  light: require('../../../../assets/map/fallback-light.jpg'),
  dark: require('../../../../assets/map/fallback-dark.jpg'),
};

/** Camera padding that puts the map's centre `pinY` points from the top of a tall view. */
export function cameraPadding(extent: MapProps['extent']) {
  if (!extent) return { top: 0, bottom: 0, left: 0, right: 0 };
  const bottom = Math.max(0, extent.height - 2 * extent.pinY);
  return { top: 0, bottom, left: 0, right: 0 };
}

/** The static map, centred on the pin at its rendered scale. */
export function MapFallback({ extent }: Pick<MapProps, 'extent'>) {
  const { theme } = useUnistyles();
  return (
    <View style={styles.centre(extent?.pinY)} pointerEvents="none">
      <View style={styles.fallback(FALLBACK_SIZE)}>
        <Image source={FALLBACK[theme.scheme]} style={styles.image} contentFit="cover" transition={0} />
      </View>
    </View>
  );
}

// The glyph's paths, drawn filled: the outline in Primary, the dot in On Primary. Its tip is at (12, 22).
const [outline, dot] = Location01Icon as unknown as [string, { d: string }][];

export function MapPin({ extent }: Pick<MapProps, 'extent'>) {
  const { theme } = useUnistyles();
  const size = theme.size.avatar.shop;
  return (
    <View style={styles.centre(extent?.pinY)} pointerEvents="none">
      <View style={styles.pin(size)}>
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d={outline[1].d} fill={theme.color.primary} stroke={theme.color.onPrimary} strokeWidth={1} />
          <Path d={dot[1].d} fill={theme.color.onPrimary} />
        </Svg>
      </View>
    </View>
  );
}

/** "© OpenStreetMap contributors" (ODbL): bottom right, or in a tall view on the left at `attributionY` (else just
 *  below the pin), where neither the nav bar, the photos nor the card cover it. */
export function MapAttribution({ extent }: Pick<MapProps, 'extent'>) {
  return (
    <View style={extent ? styles.attributionBelowPin(extent.pinY, extent.attributionY) : styles.attribution} pointerEvents="none">
      <Text variant="caption2" color="mutedForeground">
        © OpenStreetMap contributors
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // A zero-size point at the pin: the centre of the view, or `pinY` from the top.
  centre: (pinY?: number) =>
    pinY === undefined
      ? { position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, overflow: 'visible' }
      : { position: 'absolute', top: pinY, left: '50%', width: 0, height: 0, overflow: 'visible' },
  fallback: (size: number) => ({ position: 'absolute', width: size, height: size, left: -size / 2, top: -size / 2 }),
  image: { width: '100%', height: '100%' },
  // The glyph's tip (12, 22 of 24) sits on the point.
  pin: (size: number) => ({ position: 'absolute', width: size, height: size, left: -size / 2, top: (-size * 22) / 24 }),
  attribution: {
    position: 'absolute',
    right: theme.space[2],
    bottom: theme.space[1],
    paddingHorizontal: theme.space[1],
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.mapGround,
    opacity: 0.85,
  },
  attributionBelowPin: (pinY: number, top?: number) => ({
    position: 'absolute',
    left: theme.space[3],
    top: top ?? pinY + theme.space[6],
    paddingHorizontal: theme.space[1],
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.mapGround,
    opacity: 0.85,
  }),
}));
