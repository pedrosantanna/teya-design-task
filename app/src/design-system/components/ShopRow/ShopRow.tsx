import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IMAGE_FILL } from '../../internal/media';
import { spoken } from '../../internal/PressableCard';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { usePress } from '../../internal/usePress';
import { cornerCurve } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

/** Where the row sits in its list: iOS draws an inset grouped list, so first and last rows round their corners. */
export type RowPosition = 'only' | 'first' | 'middle' | 'last';

export type ShopRowProps = {
  id: string;
  name: string;
  /** "Open till 7pm · King Street · 13 min walk"; the street drops first when space runs out. */
  meta: string;
  logo?: string;
  position?: RowPosition;
  onPress?: (id: string) => void;
};

export const ShopRow = memo(function ShopRow({ id, name, meta, logo, position = 'only', onPress }: ShopRowProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const grouped = theme.platform === 'ios';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken(name, meta)}
      onPress={onPress ? () => onPress(id) : undefined}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={styles.row(grouped, position)}
    >
      <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
      <View style={styles.logo}>
        {logo ? <Image source={{ uri: logo }} style={IMAGE_FILL} contentFit="cover" accessible={false} /> : <ShopPlaceholder name={name} round />}
      </View>
      <View style={styles.text(grouped && position !== 'last' && position !== 'only')}>
        <View style={styles.grow}>
          <Text variant="headline" numberOfLines={1}>
            {name}
          </Text>
          <Text variant="footnote" color="mutedForeground" numberOfLines={1}>
            {meta}
          </Text>
        </View>
        <Icon icon="chevron" size="body" color="mutedForeground" />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: (grouped: boolean, position: RowPosition) => {
    const top = position === 'first' || position === 'only';
    const bottom = position === 'last' || position === 'only';
    return {
      ...cornerCurve,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[3],
      paddingLeft: theme.space[4],
      backgroundColor: grouped ? theme.color.card : 'transparent',
      borderTopLeftRadius: grouped && top ? theme.radius.inner : 0,
      borderTopRightRadius: grouped && top ? theme.radius.inner : 0,
      borderBottomLeftRadius: grouped && bottom ? theme.radius.inner : 0,
      borderBottomRightRadius: grouped && bottom ? theme.radius.inner : 0,
      overflow: 'hidden',
    };
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  logo: {
    width: theme.size.avatar.shop,
    height: theme.size.avatar.shop,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    backgroundColor: theme.color.muted,
  },
  // The separator is inset to the text, as in an iOS list.
  text: (separator: boolean) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
    paddingVertical: theme.space[4],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: theme.color.separator,
  }),
  grow: { flex: 1, gap: theme.space[1] },
}));
