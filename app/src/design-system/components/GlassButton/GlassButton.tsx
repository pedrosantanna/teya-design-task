// A control floating over content (iOS 26 patterns): an icon in a 44 pt glass circle on iOS and the web, a
// Material standard icon button on Android (48 dp, no container), with a tonal circle when it sits over a map
// or a photo. Back, Close and the shop page's Back over the map all use it.
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { useGround } from '../../internal/ground';
import { usePress } from '../../internal/usePress';
import { withAlpha } from '../../theme';
import { Icon, type PlatformIconName } from '../Icon/Icon';

export type GlassButtonProps = {
  icon: IconSvgElement | PlatformIconName;
  /** What VoiceOver and TalkBack read: "Back to Requests", "Close". */
  accessibilityLabel: string;
  onPress?: () => void;
  /** Android: a tonal circle behind the icon, for a button over the map or a photo. iOS and the web are always glass. */
  overMedia?: boolean;
  disabled?: boolean;
  /** On a chat's ground: a hairline in chat.edge, as on chat cards, so the white circle doesn't dissolve into the
   *  white chat ground (light mode). */
  edge?: boolean;
};

export const GlassButton = memo(function GlassButton({ icon, accessibilityLabel, onPress, overMedia = false, disabled = false, edge = false }: GlassButtonProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const press = usePress();
  const android = theme.platform === 'android';
  // On an accent tile (the Category screen), the tonalOnTile overlay, as the shop page's tonal actions; in a dark
  // sheet's header, a solid Muted circle, since glass over the Sheet colour all but vanishes there.
  const ground = useGround();
  const surface = ground === 'tile' ? 'tile' : ground === 'sheet' && theme.scheme === 'dark' ? 'muted' : 'glass';
  const glyph = <Icon icon={icon} size="nav" weight="strong" color="foreground" />;
  return (
    <Animated.View style={press.scaleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled || !onPress }}
        disabled={disabled || !onPress}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.hit}
      >
        {android ? (
          <View style={[styles.circle, overMedia && styles.tonal, overMedia && surface === 'tile' && styles.onTile]}>{glyph}</View>
        ) : (
          <FloatingSurface interactive surface={surface} style={[styles.circle, edge && styles.edge]}>
            {glyph}
          </FloatingSurface>
        )}
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  hit: { minWidth: theme.hit.min, minHeight: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: theme.hit.min,
    height: theme.hit.min,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tonal: { backgroundColor: theme.color.card },
  onTile: { backgroundColor: withAlpha(theme.color.tonalOnTile, theme.state.tonalOnTile) },
  edge: { borderWidth: StyleSheet.hairlineWidth, borderColor: theme.color.chat.edge },
}));
