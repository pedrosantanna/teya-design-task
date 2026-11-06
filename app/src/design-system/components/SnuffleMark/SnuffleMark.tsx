// The Snuffle mark (mark.md) as the app shows it: the bare glyph from docs/develop/design-system/img/mark-glyph.svg,
// in one colour that follows the theme (dark on light, light on dark), never on a tile, in a circle or as an
// avatar. The two low-contrast stripes of the awning are Muted foreground, the lighter tone of the same ink.
// The view box is tight to the glyph, so `size` is the glyph's own width. Decorative: hidden from screen readers.
import { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import type { AppTheme } from '../../theme';

export const GLYPH_EAR =
  'M61.8465 52.1482C62.5035 50.0934 61.2616 47.9309 59.1384 47.549C41.2127 44.3246 26.6877 55.4777 29.3064 76.4271C30.7064 87.6271 43.3064 90.4271 48.9064 79.2271C53.8695 69.3009 58.8326 61.5741 61.8465 52.1482Z';

// The glyph's bounds in the source SVG's units: 114 wide, 84 high.
export const GLYPH_VIEW_BOX = '-57 43 114 84';
export const GLYPH_ASPECT = 84 / 114;

export type SnuffleMarkSize = 'inline' | 'icon' | 'large' | 'splash';

/** The glyph's width for each size. Reuses size tokens until the token files get `size.mark.*`. */
export function snuffleMarkWidth(theme: AppTheme, size: SnuffleMarkSize): number {
  switch (size) {
    case 'inline':
      return theme.size.icon.nav;
    case 'icon':
      return theme.size.avatar.shop;
    case 'large':
      return theme.size.thumb.request;
    default:
      return theme.size.category.art;
  }
}

export type SnuffleMarkProps = {
  /** inline: beside "Snuffle" on the sender line. icon: notification and Live Activity. large: sign in. splash: the splash. */
  size?: SnuffleMarkSize;
  /** The glyph's width when a component sets its own (the Snuffle avatar). Overrides `size`. */
  width?: number;
};

export const SnuffleMark = memo(function SnuffleMark({ size = 'inline', width: widthOverride }: SnuffleMarkProps) {
  const { theme } = useUnistyles();
  const width = widthOverride ?? snuffleMarkWidth(theme, size);
  const ink = theme.color.foreground;
  const soft = theme.color.mutedForeground;
  return (
    <View style={styles.box(width, width * GLYPH_ASPECT)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={width} height={width * GLYPH_ASPECT} viewBox={GLYPH_VIEW_BOX}>
        <Path d="M-42.5 101 A8 8 0 0 1 -34.5 93 H-25.5 V119.1 A8.5 6.9 0 0 1 -42.5 119.1 Z" fill={ink} />
        <Path d="M-25.5 93 H-8.5 V119.1 A8.5 6.9 0 0 1 -25.5 119.1 Z" fill={soft} />
        <Path d="M-8.5 93 H8.5 V119.1 A8.5 6.9 0 0 1 -8.5 119.1 Z" fill={ink} />
        <Path d="M8.5 93 H25.5 V119.1 A8.5 6.9 0 0 1 8.5 119.1 Z" fill={soft} />
        <Path d="M25.5 93 H34.5 A8 8 0 0 1 42.5 101 V119.1 A8.5 6.9 0 0 1 25.5 119.1 Z" fill={ink} />
        <Path d={GLYPH_EAR} transform="translate(-85.306 0)" fill={ink} />
        <G transform="scale(-1 1)">
          <Path d={GLYPH_EAR} transform="translate(-85.306 0)" fill={ink} />
        </G>
        <Circle cx={-15} cy={75} r={5} fill={ink} />
        <Circle cx={15} cy={75} r={5} fill={ink} />
        <Ellipse cx={0} cy={94.5} rx={12} ry={9.5} fill={ink} />
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create(() => ({
  box: (width: number, height: number) => ({ width, height }),
}));
