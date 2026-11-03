import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { imageSource, type ImageKey } from '../../../content/images';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { ShopPageLayout } from './ShopPageLayout';

const photo = (key: ImageKey) => imageSource(key, 320);
const noop = () => undefined;

// The shop page at rest in a phone-sized box: the map, the first photo peeking in and the card. Scroll inside it.
export function ShopPageLayoutExamples() {
  return (
    <View style={styles.phone}>
      <ShopPageLayout
        name="Rossi's Bakery"
        status={['Open till 6pm · Blythe Road · 2 min walk', "Made to order · 2 days' notice"]}
        photos={[
          { source: photo('rossis-bakery-front'), label: "Rossi's Bakery shopfront, Blythe Road", credit: 'Photo: Clara Lilley, Unsplash' },
          { source: photo('rossis-bakery-interior'), label: "Rossi's Bakery inside, Blythe Road", credit: 'Photo: Arlind Photography, Unsplash' },
        ]}
        onBack={noop}
        backLabel="Nearby"
        actions={<Button label="Ask Rossi's" size="compact" />}
      >
        <Text variant="footnote" color="mutedForeground">
          Scroll inside this box to see the card cover the map.
        </Text>
      </ShopPageLayout>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  phone: {
    height: theme.size.thumb.request * 12,
    borderRadius: theme.radius.card,
    overflow: 'hidden',
  },
}));
