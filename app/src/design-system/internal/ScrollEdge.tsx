// The scroll-edge effect of iOS 26: no bar fill, a fade from the screen's background to transparent under the
// floating controls at the top or bottom of a screen, so content scrolling under them recedes instead of
// running bare under the glass. Drawn with react-native-svg on every platform; the web adds a masked blur.
import { useId, type ComponentProps } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useWebEdgeBlur } from './glass';

import type { ShopAccentName } from '../theme';

/** The screen's ground, or a shop's accent at the tile step (the shop page while its wash is under the bar). */
export type EdgeFill = 'background' | 'card' | 'chat' | 'sheet' | 'shopPage' | { accent: ShopAccentName };

export type ScrollEdgeProps = {
  edge: 'top' | 'bottom';
  /** Points, or '100%' to fill a positioned parent. */
  height: number | '100%';
  /** The fade's colour: the screen's ground. Background, Card, a chat's ground or a sheet's. */
  fill?: EdgeFill;
  /** An animated opacity, e.g. shown once content scrolls under the bar. */
  style?: ComponentProps<typeof Animated.View>['style'];
  /** Where the fade starts, as a fraction of the height (a top edge: space.6 before its end; else 0.55). The shop page's bar keeps its tile opaque
   *  down to the bar's bottom, so its title never sits over Card rows showing through (visual critique 3). */
  solid?: number;
};

export function ScrollEdge({ edge, height, fill = 'background', style, solid: solidProp }: ScrollEdgeProps) {
  const { theme } = useUnistyles();
  const id = `edge${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  // Under a nav bar (a top edge of known height) the fade and its blur stay full down to the last space.6, then go
  // out together; content scrolling under the bar showed as pastel lozenges with a hard bottom edge when the blur
  // stopped at 40% and the colour at 55% (visual critique, round 3). Bottom edges keep the 0.55 start.
  const fadeOver = edge === 'top' && typeof height === 'number' ? theme.space[6] : undefined;
  const solid = solidProp ?? (fadeOver != null && typeof height === 'number' ? Math.max(0, (height - fadeOver) / height) : 0.55);
  const blurRef = useWebEdgeBlur(edge, fadeOver);
  const color = typeof fill === 'object' ? theme.color.shop.accent[fill.accent].tile : fill === 'chat' ? theme.color.chat.ground : fill === 'shopPage' ? theme.color.shopPage.card : theme.color[fill];
  const top = edge === 'top';
  return (
    <Animated.View pointerEvents="none" style={[styles.edge(edge, height), style]}>
      <View ref={blurRef} style={StyleSheet.absoluteFill} />
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id={id} x1="0" y1={top ? '0' : '1'} x2="0" y2={top ? '1' : '0'}>
            <Stop offset="0" stopColor={color} stopOpacity={1} />
            <Stop offset={String(solid)} stopColor={color} stopOpacity={typeof fill === 'object' ? 1 : 0.96} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create(() => ({
  edge: (edge: 'top' | 'bottom', height: number | '100%') => ({ position: 'absolute', left: 0, right: 0, [edge]: 0, height }),
}));
