import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { CategoryCard } from './CategoryCard';

// One card per accent. The stills come from the illustration pipeline; until then each card is colour and label.
export function CategoryCardExamples() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      <CategoryCard id="fashion" label="Fashion" accent="lavender" />
      <CategoryCard id="bakery" label="Bakery" accent="butter" />
      <CategoryCard id="cafe" label="Café" accent="peach" />
      <CategoryCard id="opticians" label="Opticians" accent="pistachio" />
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { gap: theme.layout.gutter },
}));
