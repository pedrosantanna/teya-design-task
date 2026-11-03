// The shop's tonal tile (components.md, Placeholder tile; colour.md, Shop accents): the shop's accent tile
// colour, its initials in the accent ink, and the mark's five-stripe awning as a band across the top. It sits
// under every shop photo, so a photo that is loading or missing shows the shop's colour instead of grey.
import { memo } from 'react';
import { Text as NativeText, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { textStyle, type ShopAccentName } from '../theme';

const STRIPES = [0, 1, 2, 3, 4];

export function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9& ]/g, '')
    .split(' ')
    .filter((w) => w && w !== '&')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

/** large: tiles and photos (band 12, initials in Headline). small: 40 thumbs (band 8). tiny: 24 logos, initials only. */
export type PlaceholderSize = 'large' | 'small' | 'tiny';

export type ShopPlaceholderProps = {
  name: string;
  accent?: ShopAccentName;
  size?: PlaceholderSize;
  /** A circle (shop rows, logos): the band is left out, the initials stay. */
  round?: boolean;
};

export const ShopPlaceholder = memo(function ShopPlaceholder({ name, accent = 'butter', size = 'large', round = false }: ShopPlaceholderProps) {
  return (
    <View style={styles.tile(accent)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {round || size === 'tiny' ? null : (
        <View style={styles.awning(size)}>
          {STRIPES.map((i) => (
            <View key={i} style={styles.stripe(accent, i % 2 === 0)} />
          ))}
        </View>
      )}
      <NativeText style={styles.initials(accent, size, round)} numberOfLines={1}>
        {initials(name)}
      </NativeText>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  tile: (accent: ShopAccentName) => ({
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.shop.accent[accent].tile,
  }),
  awning: (size: PlaceholderSize) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: size === 'large' ? theme.space[3] : theme.space[2],
    flexDirection: 'row',
  }),
  stripe: (accent: ShopAccentName, dark: boolean) => ({
    flex: 1,
    backgroundColor: dark ? theme.color.shop.accent[accent].ink : theme.color.shop.accent[accent].wash,
  }),
  initials: (accent: ShopAccentName, size: PlaceholderSize, round: boolean) => ({
    ...textStyle(size === 'large' ? theme.type.headline : size === 'small' ? theme.type.subheadlineStrong : theme.type.caption2),
    color: theme.color.shop.accent[accent].ink,
    // The band takes the top of a small thumb; the initials sit in the rest.
    marginTop: size === 'small' && !round ? theme.space[2] : 0,
  }),
}));
