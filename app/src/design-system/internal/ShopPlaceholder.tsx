// The no-photo placeholder from imagery.md (a proposal, untested): a tonal tile in the accent fill for
// the shop's kind, its initials in the 800 tone, and the mark's five-stripe awning across the top.
import { memo } from 'react';
import { Text as NativeText, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { textStyle, type BadgeName } from '../theme';

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

export const ShopPlaceholder = memo(function ShopPlaceholder({ name, tone = 'delivers', round = false }: { name: string; tone?: BadgeName; round?: boolean }) {
  return (
    <View style={styles.tile(tone)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {round ? null : (
        <View style={styles.awning}>
          {STRIPES.map((i) => (
            <View key={i} style={styles.stripe(tone, i % 2 === 0)} />
          ))}
        </View>
      )}
      <NativeText style={styles.initials(tone)} numberOfLines={1}>
        {initials(name)}
      </NativeText>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  tile: (tone: BadgeName) => ({
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.badge[tone].fill,
  }),
  awning: { position: 'absolute', top: 0, left: 0, right: 0, height: theme.space[3], flexDirection: 'row' },
  stripe: (tone: BadgeName, dark: boolean) => ({ flex: 1, backgroundColor: dark ? theme.color.badge[tone].text : theme.color.badge[tone].dot }),
  initials: (tone: BadgeName) => ({ ...textStyle(theme.type.headline), color: theme.color.badge[tone].text }),
}));
