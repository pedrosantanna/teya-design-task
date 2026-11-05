import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { imageSource, type ImageKey } from '../../../content/images';
import { ShopTile } from './ShopTile';

const photo = (key: ImageKey) => imageSource(key, 320);

// Large and medium tiles, badges, a closed shop and the no-photo placeholder.
export function ShopTileExamples() {
  return (
    <View style={styles.list}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <ShopTile id="rossis" name="Rossi's Bakery" facts={{ state: 'open', detail: 'until\u00A06pm', walk: '2\u00A0min\u00A0walk' }} image={photo('rossis-bakery-front')} badges={['promoted']} />
        <ShopTile id="paper" name="Paper & Co" facts={{ state: 'open', detail: 'until\u00A07pm', walk: '13\u00A0min\u00A0walk' }} />
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <ShopTile id="halo" size="medium" name="Halo Florist" facts={{ state: 'open', detail: 'until\u00A05pm', walk: '13\u00A0min\u00A0walk' }} image={photo('rossis-bakery-interior')} badges={['new', 'delivers']} />
        <ShopTile id="cameras" size="medium" name="Olympia Cameras" facts={{ state: 'closed', detail: 'opens\u00A09am', walk: '6\u00A0min\u00A0walk' }} />
        <ShopTile id="chemist" size="medium" name="Broadway Chemist" facts={{ state: 'open', detail: 'until\u00A08pm', walk: '12\u00A0min\u00A0walk' }} badges={['delivers']} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  row: { gap: theme.layout.gutter },
}));
