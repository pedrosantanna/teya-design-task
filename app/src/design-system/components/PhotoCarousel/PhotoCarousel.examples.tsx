import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { imageSource, type ImageKey } from '../../../content/images';
import { Text } from '../Text/Text';
import { PhotoCarousel } from './PhotoCarousel';

const photo = (key: ImageKey) => imageSource(key, 360);

// Three photos with dots, and a shop with one photo: no dots, no paging.
export function PhotoCarouselExamples() {
  return (
    <View style={styles.column}>
      <Text variant="footnote" color="mutedForeground">
        Three photos
      </Text>
      <PhotoCarousel
        name="Rossi's Bakery"
        photos={[
          { source: photo('rossis-bakery-front'), label: "Rossi's Bakery shopfront, Blythe Road" },
          { source: photo('rossis-bakery-interior'), label: "Rossi's Bakery inside, Blythe Road" },
          { source: photo('rossis-bakery-interior-alt'), label: "Rossi's Bakery inside, Blythe Road" },
        ]}
      />
      <Text variant="footnote" color="mutedForeground">
        One photo
      </Text>
      <PhotoCarousel name="Paper & Co" photos={[{ source: photo('paper-co-front'), label: 'Paper & Co shopfront, Blythe Road' }]} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[3] },
}));
