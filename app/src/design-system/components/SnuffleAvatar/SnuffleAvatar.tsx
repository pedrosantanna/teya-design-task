// Snuffle's avatar on the chat's sender line: a circle in `snuffle.avatar` (the bubble's colour in light, a lighter
// Lavender in dark so the head stands off the ground), so it reads as the same voice as the bubble below it. The
// circle is the dog's head: the face fills it and the ears and the awning run past its edge (decision 061).
// Decorative: the sender is named by the bubble's label.
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { SnuffleMark } from '../SnuffleMark/SnuffleMark';

// The glyph's geometry in its own units (SnuffleMark's view box is 114 × 84 from (-57, 43)): the head the circle
// stands for is centred at (0, 90) with a radius of 40, so the ears and the awning's corners fall outside it and a
// band of the circle still shows under the awning, closing the head's lower curve.
const GLYPH_W = 114;
const FACE_R = 40;
const FACE_X = 57; // the face centre from the view box's left edge
const FACE_Y = 47; // the face centre from the view box's top edge

export const SnuffleAvatar = memo(function SnuffleAvatar() {
  const { theme } = useUnistyles();
  const d = theme.size.avatar.chat;
  const scale = d / (2 * FACE_R);
  const width = GLYPH_W * scale;
  return (
    <View
      style={styles.bleedBox(width, d)}
      accessibilityElementsHidden
      importantForAccessibility='no-hide-descendants'
    >
      <View style={[styles.circle, styles.at((width - d) / 2, 0)]} />
      <View
        style={styles.at(width / 2 - FACE_X * scale, d / 2 - FACE_Y * scale)}
      >
        <SnuffleMark width={width} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  circle: {
    width: theme.size.avatar.chat,
    height: theme.size.avatar.chat,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.snuffle.avatar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bleedBox: (width: number, height: number) => ({
    width,
    height,
    overflow: 'visible',
  }),
  at: (left: number, top: number) => ({ position: 'absolute', left, top }),
}));
