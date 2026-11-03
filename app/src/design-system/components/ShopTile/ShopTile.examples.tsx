import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { images } from '../../../content/images';
import { ShopTile } from './ShopTile';

const photo = (key: keyof typeof images) => `${images[key].image}?w=640&q=80&auto=format`;

// Large and medium tiles, badges, a closed shop and the no-photo placeholder.
export function ShopTileExamples() {
  return (
    <View style={styles.list}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <ShopTile id="rossis" name="Rossi's Bakery" meta="Open till 6pm · 2 min walk" image={photo('rossis-bakery-front')} badges={['promoted']} />
        <ShopTile id="paper" name="Paper & Co" meta="Open till 7pm · 13 min walk" />
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <ShopTile id="halo" size="medium" name="Halo Florist" meta="Open till 5pm · 13 min walk" image={photo('rossis-bakery-interior')} badges={['new', 'delivers']} />
        <ShopTile id="cameras" size="medium" name="Olympia Cameras" meta="Closed · opens 9am" />
        <ShopTile id="chemist" size="medium" name="Broadway Chemist" meta="Open till 8pm · 12 min walk" badges={['delivers']} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  row: { gap: theme.layout.gutter },
}));
