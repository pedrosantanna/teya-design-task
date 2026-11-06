import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '../Button/Button';
import { PhotoPickerSheet } from './PhotoPickerSheet';

// Six placeholder choices on the neutral tile colour: tap the button to open the picker, the second one selected.
const CHOICES = Array.from({ length: 6 }, (_, i) => ({ id: String(i), photo: '' }));

export function PhotoPickerSheetExamples() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('1');
  return (
    <View>
      <Button label="Choose a photo" role="tonal" size="compact" onPress={() => setOpen(true)} />
      <PhotoPickerSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Photo"
        subtitle="Eclipse glasses"
        photos={CHOICES}
        selected={selected}
        onSelect={(id) => {
          setSelected(id);
          setOpen(false);
        }}
      />
    </View>
  );
}
