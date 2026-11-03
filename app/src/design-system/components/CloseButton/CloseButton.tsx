import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { usePress } from '../../internal/usePress';
import { Icon } from '../Icon/Icon';

export type CloseButtonProps = {
  onPress?: () => void;
  /** Over the map or a photo: glass (iOS 26), blur or a tonal surface. Elsewhere: Muted fill. */
  overMedia?: boolean;
  /** Defaults to "Close". */
  accessibilityLabel?: string;
};

/** An × in a 30 circle with a 44 (iOS) or 48 (Android) hit area. */
export const CloseButton = memo(function CloseButton({ onPress, overMedia = false, accessibilityLabel = 'Close' }: CloseButtonProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const slop = (theme.hit.min - theme.size.close) / 2;
  const glyph = <Icon icon={Cancel01Icon} size="subheadline" weight="strong" color="foreground" />;
  return (
    <Animated.View style={[styles.wrap, press.scaleStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        hitSlop={slop}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {overMedia ? (
          <FloatingSurface interactive style={styles.circle}>
            {glyph}
          </FloatingSurface>
        ) : (
          <View style={[styles.circle, styles.muted]}>{glyph}</View>
        )}
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  wrap: { alignSelf: 'flex-start' },
  circle: {
    width: theme.size.close,
    height: theme.size.close,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muted: { backgroundColor: theme.color.muted },
}));
