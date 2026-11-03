// Confirm where a sheet commits a choice (iOS 26 patterns): a checkmark in a 44 pt circle tinted Indigo at the
// top right on iOS and the web; a "Done" tonal button on Android.
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { memo } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { usePress } from '../../internal/usePress';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

export type ConfirmButtonProps = {
  onPress?: () => void;
  /** Read by VoiceOver on iOS and shown on Android. Defaults to "Done". */
  label?: string;
  disabled?: boolean;
};

export const ConfirmButton = memo(function ConfirmButton({ onPress, label = 'Done', disabled = false }: ConfirmButtonProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const press = usePress('primary');
  const off = disabled || !onPress;
  if (theme.platform === 'android') {
    return <Button label={label} role="tonal" size="compact" disabled={off} onPress={onPress} />;
  }
  return (
    <Animated.View style={[press.scaleStyle, off && styles.disabled]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: off }}
        disabled={off}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <FloatingSurface interactive tint style={styles.circle}>
          <Icon icon={Tick02Icon} size="nav" weight="strong" color="onPrimary" />
        </FloatingSurface>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  circle: {
    width: theme.hit.min,
    height: theme.hit.min,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: theme.state.disabledContent },
}));
