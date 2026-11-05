import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '../Text/Text';
import { ProductSummary } from './ProductSummary';

// An asked shop with past answers, and a connected shop without any.
export function ProductSummaryExamples() {
  const [asked, setAsked] = useState<string | null>(null);
  return (
    <View style={styles.list}>
      <ProductSummary
        shop="Rossi's Bakery"
        categories={['Sourdough', 'Rye', 'Pastries', 'Focaccia', 'Celebration cakes']}
        priceLine="Most items £2–£35 · from past answers"
        asked={[
          { item: 'Sourdough', detail: 'Had it · 2 hours ago' },
          { item: 'Rye loaf', detail: "Didn't have it · this morning" },
        ]}
        onCategory={setAsked}
      />
      <ProductSummary
        shop="Broadway Chemist"
        categories={['Sun care', 'Hay fever', 'First aid', 'Eclipse glasses', 'Baby care']}
        priceLine="Most items £2–£25 · from the shop's till"
        onCategory={setAsked}
      />
      <Text variant="footnote" color="mutedForeground">
        {asked ? `New Request would open with “${asked}”` : 'Tap a chip'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
