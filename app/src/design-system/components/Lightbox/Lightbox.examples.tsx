import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { imageSource, type ImageKey } from '../../../content/images';
import { Button } from '../Button/Button';
import { Lightbox } from './Lightbox';

const photo = (key: ImageKey) => imageSource(key, 800);

// Opens the viewer on three photos of one shop; swipe between them, pinch or double-tap to zoom.
export function LightboxExamples() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.column}>
      <Button label="Open the photo viewer" role="tonal" size="compact" onPress={() => setOpen(true)} />
      <Lightbox
        open={open}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setOpen(false)}
        photos={[
          { source: photo('rossis-bakery-front'), label: "Rossi's Bakery shopfront, Blythe Road" },
          { source: photo('rossis-bakery-interior'), label: "Rossi's Bakery inside, Blythe Road" },
          { source: photo('rossis-bakery-interior-alt'), label: "Rossi's Bakery inside, Blythe Road" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[3], alignItems: 'flex-start' },
}));
