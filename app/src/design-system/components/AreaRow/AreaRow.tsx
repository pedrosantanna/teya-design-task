// The area at the top of Nearby (nearby spec, Area header): the place in Headline with a chevron and the street
// count under it. A button that opens "Where are you shopping?".
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type AreaRowProps = {
  /** "Blythe Road, W14" */
  place: string;
  /** "6 shopping streets within 15 min", or the location-off line. */
  detail: string;
  onPress?: () => void;
};

export const AreaRow = memo(function AreaRow({ place, detail, onPress }: AreaRowProps) {
  const press = usePress();
  return (
    <Animated.View style={[styles.wrap, press.scaleStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Shopping near ${place}. ${detail}`}
        accessibilityHint="Changes where you're shopping"
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <View style={styles.place}>
          <Text variant="headline" numberOfLines={1}>
            {place}
          </Text>
          <Icon icon="chevron" size="footnote" weight="strong" color="mutedForeground" />
        </View>
        <Text variant="footnote" color="mutedForeground" numberOfLines={2}>
          {detail}
        </Text>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  wrap: { alignSelf: 'flex-start', maxWidth: '100%' },
  place: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
}));
