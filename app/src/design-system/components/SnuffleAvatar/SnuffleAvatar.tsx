// Snuffle's avatar on the chat's sender line: the mark glyph in a circle filled with the Snuffle bubble's
// colour, so it reads as the same voice as the bubble below it. Decorative: the sender is named by the
// bubble's label.
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { SnuffleMark } from '../SnuffleMark/SnuffleMark';

export const SnuffleAvatar = memo(function SnuffleAvatar() {
  const { theme } = useUnistyles();
  return (
    <View style={styles.circle} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <SnuffleMark width={theme.size.avatar.chatMark} />
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  circle: {
    width: theme.size.avatar.chat,
    height: theme.size.avatar.chat,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.snuffle.bubble,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
