// "What they sell" on the shop page (change shop-ratings-and-range): the shop's categories as chips that start a
// request addressed to the shop, the usual price range with where it comes from, and the items people often asked it
// about, with what the shop answered. One Card section with the delicate shadow, like the page's other sections.
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Ground } from '../../internal/ground';
import { ListBlock, ListGroup, ListRow } from '../ListRow/ListRow';
import { Chip } from '../Tag/Tag';
import { Text } from '../Text/Text';

export type ProductSummaryProps = {
  /** "Sourdough", "Celebration cakes": each chip asks the shop about it. */
  categories: string[];
  /** "Most items £2–£35 · from past answers", or "· from the shop's till". */
  priceLine?: string;
  /** Past answers: "Sourdough" with "Had it · 2 hours ago". Left out when empty. */
  asked?: { item: string; detail: string }[];
  /** Called with the chip's text: New Request opens addressed to the shop with it filled in. */
  onCategory?: (category: string) => void;
  /** The shop's name, for the chips' spoken hint ("Ask Rossi's Bakery about Sourdough"). */
  shop?: string;
};

export const ProductSummary = memo(function ProductSummary({ categories, priceLine, asked = [], onCategory, shop }: ProductSummaryProps) {
  return (
    <ListGroup shadow>
      <ListBlock position={asked.length > 0 ? 'first' : 'only'}>
        <Ground value="card">
          <View style={styles.chips} accessibilityLabel={shop ? `Ask ${shop} about` : 'Categories'}>
            {categories.map((c) => (
              <Chip key={c} kind="suggestion" label={c} onPress={onCategory} />
            ))}
          </View>
        </Ground>
        {priceLine ? (
          <Text variant="footnote" color="mutedForeground">
            {priceLine}
          </Text>
        ) : null}
        {asked.length > 0 ? (
          <Text variant="caption1Strong" color="mutedForeground" accessibilityRole="header">
            Often asked about here
          </Text>
        ) : null}
      </ListBlock>
      {asked.map((a, i) => (
        <ListRow key={a.item} title={a.item} detail={a.detail} surface="card" position={i === asked.length - 1 ? 'last' : 'middle'} />
      ))}
    </ListGroup>
  );
});

const styles = StyleSheet.create((theme) => ({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
}));
