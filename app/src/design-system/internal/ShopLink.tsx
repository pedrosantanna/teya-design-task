// The shop's name as a link inside a card or row (components.md, Shop name): the name with a small chevron after it,
// pressing opens the shop's page. The card around it still opens the details sheet. 44 pt tall to press.
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Icon } from '../components/Icon/Icon';
import { Text, type TextProps } from '../components/Text/Text';

export type ShopLinkProps = {
  name: string;
  variant?: TextProps['variant'];
  numberOfLines?: number;
  onPress: () => void;
};

export function ShopLink({ name, variant = 'headline', numberOfLines = 1, onPress }: ShopLinkProps) {
  const { theme } = useUnistyles();
  // The press area is the 44 pt minimum: what the text's line height leaves, split top and bottom (11 pt for Headline,
  // 12 pt for Subheadline), never a flat 8 pt, which came to 36 to 38 pt.
  const slop = Math.max(0, (theme.hit.min - theme.type[variant].lineHeight) / 2);
  const sideSlop = theme.space[2];
  return (
    <View style={styles.wrap}>
      <Pressable accessibilityRole="link" accessibilityLabel={`${name}, view shop`} onPress={onPress} hitSlop={{ top: slop, bottom: slop, left: sideSlop, right: sideSlop }} style={styles.link}>
        <View style={styles.name}>
          <Text variant={variant} numberOfLines={numberOfLines}>
            {name}
          </Text>
        </View>
        <Icon icon={ArrowRight01Icon} size="footnote" color="mutedForeground" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // The row stays as tall as the text; the press area grows by hitSlop to the 44 pt minimum. A card that holds the link
  // keeps its own target and must not reach into this one beyond the 8 pt separation (screen-review check 15).
  wrap: { flexDirection: 'row' },
  link: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1], flexShrink: 1 },
  name: { flexShrink: 1 },
}));
