// A stylised, static map (imagery.md, Map style) standing in for Apple Maps and Google Maps until a map
// SDK is added: Map ground, roads in Muted, one pin in Primary. Hidden from screen readers; the street and
// walk time in the card carry the same information.
import { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type MapProps = {
  /** Loading: Map ground alone. */
  loading?: boolean;
  /** Draw the shop's pin at the centre. */
  pin?: boolean;
};

// A made-up street grid in a 400 × 300 box, scaled to cover the view.
const MAIN_ROADS = ['M-20 182 C 80 170, 160 196, 420 150', 'M150 -20 C 166 80, 178 180, 210 320'];
const SIDE_ROADS = [
  'M-20 70 L 420 40',
  'M-20 262 L 420 238',
  'M60 -20 L 84 320',
  'M300 -20 L 280 320',
  'M360 -20 C 340 100, 380 200, 360 320',
  'M-20 120 C 120 130, 260 110, 420 96',
];
const BLOCKS = [
  { x: 96, y: 78, w: 46, h: 30 },
  { x: 222, y: 60, w: 54, h: 38 },
  { x: 222, y: 200, w: 48, h: 30 },
  { x: 92, y: 200, w: 52, h: 34 },
  { x: 300, y: 130, w: 40, h: 26 },
];

export const Map = memo(function Map({ loading = false, pin = true }: MapProps) {
  const { theme } = useUnistyles();
  const road = theme.color.muted;
  return (
    <View style={styles.map} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none">
      {loading ? null : (
        <Svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <G opacity={0.6}>
            {BLOCKS.map((b) => (
              <Rect key={`${b.x}-${b.y}`} x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill={road} />
            ))}
          </G>
          {SIDE_ROADS.map((d) => (
            <Path key={d} d={d} stroke={road} strokeWidth={9} strokeLinecap="round" fill="none" />
          ))}
          {MAIN_ROADS.map((d) => (
            <Path key={d} d={d} stroke={road} strokeWidth={16} strokeLinecap="round" fill="none" />
          ))}
          {pin ? (
            <G transform="translate(200 150)">
              <Path d="M0 0 C -4 -10, -16 -16, -16 -28 A 16 16 0 1 1 16 -28 C 16 -16, 4 -10, 0 0 Z" fill={theme.color.primary} />
              <Circle cx={0} cy={-28} r={6} fill={theme.color.onPrimary} />
            </G>
          ) : null}
        </Svg>
      )}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  map: { flex: 1, alignSelf: 'stretch', overflow: 'hidden', backgroundColor: theme.color.mapGround },
}));
