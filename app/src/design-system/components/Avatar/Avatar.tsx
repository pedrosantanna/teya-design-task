// The shopper's avatar on Nearby (v7 Home): a round photo, or the initials on the accent fill, that opens
// the account sheet. It uses the shop avatar's size so the top row keeps one 40 circle.
import { Image, type ImageSource } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IMAGE_FILL } from '../../internal/media';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { usePress } from '../../internal/usePress';

export type AvatarProps = {
  /** The person's name: the initials without a photo, and the label ("Account, Sam"). */
  name: string;
  /** A bundled image (`import sam from …jpg`) or a URI. */
  image?: ImageSource | string | number;
  /** Large: in the account sheet (64). */
  size?: 'regular' | 'large';
  onPress?: () => void;
  accessibilityLabel?: string;
};

export const Avatar = memo(function Avatar({ name, image, size = 'regular', onPress, accessibilityLabel }: AvatarProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const slop = Math.max(0, (theme.hit.min - theme.size.avatar.shop) / 2);
  const source = typeof image === 'string' ? { uri: image } : image;
  const circle = (
    <View style={styles.circle(size)}>
      {source ? <Image source={source} style={IMAGE_FILL} contentFit="cover" accessible={false} /> : <ShopPlaceholder name={name} tone="new" round />}
    </View>
  );
  if (!onPress) {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={accessibilityLabel ?? name}>
        {circle}
      </View>
    );
  }
  return (
    <Animated.View style={press.scaleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? `Account, ${name}`}
        hitSlop={slop}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {circle}
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  circle: (size: 'regular' | 'large') => {
    const side = size === 'large' ? theme.size.thumb.request + theme.space[2] : theme.size.avatar.shop;
    return { width: side, height: side, borderRadius: theme.radius.full, overflow: 'hidden', backgroundColor: theme.color.muted };
  },
}));
