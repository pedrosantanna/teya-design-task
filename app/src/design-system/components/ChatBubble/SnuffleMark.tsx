// The Snuffle mark (mark.md) drawn in theme colours: a card-coloured circle, the glyph in Foreground
// with the second and fourth awning stripes in Muted foreground. Decorative: hidden from screen readers.
import { memo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const EAR =
  'M61.8465 52.1482C62.5035 50.0934 61.2616 47.9309 59.1384 47.549C41.2127 44.3246 26.6877 55.4777 29.3064 76.4271C30.7064 87.6271 43.3064 90.4271 48.9064 79.2271C53.8695 69.3009 58.8326 61.5741 61.8465 52.1482Z';

export const SnuffleMark = memo(function SnuffleMark({ size }: { size?: number }) {
  const { theme } = useUnistyles();
  const px = size ?? theme.size.avatar.mark;
  const ink = theme.color.foreground;
  const grey = theme.color.mutedForeground;
  return (
    <View style={styles.mark(px)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={px} height={px} viewBox="0 0 168 168">
        <Circle cx={84} cy={84} r={84} fill={theme.color.card} />
        <G transform="translate(84 88) translate(0 -86.45)">
          <Path d="M-42.5 101 A8 8 0 0 1 -34.5 93 H-25.5 V119.1 A8.5 6.9 0 0 1 -42.5 119.1 Z" fill={ink} />
          <Path d="M-25.5 93 H-8.5 V119.1 A8.5 6.9 0 0 1 -25.5 119.1 Z" fill={grey} />
          <Path d="M-8.5 93 H8.5 V119.1 A8.5 6.9 0 0 1 -8.5 119.1 Z" fill={ink} />
          <Path d="M8.5 93 H25.5 V119.1 A8.5 6.9 0 0 1 8.5 119.1 Z" fill={grey} />
          <Path d="M25.5 93 H34.5 A8 8 0 0 1 42.5 101 V119.1 A8.5 6.9 0 0 1 25.5 119.1 Z" fill={ink} />
          <Path d={EAR} transform="translate(-85.306 0)" fill={ink} />
          <G transform="scale(-1 1)">
            <Path d={EAR} transform="translate(-85.306 0)" fill={ink} />
          </G>
          <Circle cx={-15} cy={75} r={5} fill={ink} />
          <Circle cx={15} cy={75} r={5} fill={ink} />
          <Ellipse cx={0} cy={94.5} rx={12} ry={9.5} fill={ink} />
        </G>
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  mark: (px: number) => ({
    width: px,
    height: px,
    borderRadius: theme.radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.border,
    overflow: 'hidden',
  }),
}));
