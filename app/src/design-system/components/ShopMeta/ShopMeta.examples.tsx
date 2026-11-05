import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ShopMeta } from './ShopMeta';

// The shop page's header (stacked), a row and a tile (inline), open, closing and closed.
export function ShopMetaExamples() {
  return (
    <View style={styles.list}>
      <ShopMeta layout="stacked" size="subheadline" state="open" detail="until 6pm" walk="2 min walk" street="Blythe Road" />
      <ShopMeta state="open" detail="until 7pm" walk="13 min walk" street="King Street" />
      <ShopMeta state="closesSoon" walk="4 min walk" />
      <ShopMeta state="closed" detail="opens 9am" walk="6 min walk" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
