import { Image } from 'expo-image';
import { memo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useTileAccent } from '../../internal/ground';
import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { spoken } from '../../internal/PressableCard';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { usePress } from '../../internal/usePress';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { Icon } from '../Icon/Icon';
import { ShopMeta, shopFactsLabel, type ShopFacts } from '../ShopMeta/ShopMeta';
import { Text } from '../Text/Text';

/** Where the row sits in its list: iOS draws an inset grouped list, so first and last rows round their corners. */
export type RowPosition = 'only' | 'first' | 'middle' | 'last';

export type ShopRowProps = {
  id: string;
  name: string;
  /** Status, walk and street, as ShopMeta draws them; the street is left out where the Category screen's filter shows it. */
  facts: ShopFacts;
  logo?: string;
  /** The shop's photo: a 40 pt thumbnail at radius.inner, over the accent tile while it loads. Wins over `logo`. */
  image?: PhotoSource;
  /** The shop's accent: the 40 circle with its initials when there is no photo or logo. */
  accent?: ShopAccentName;
  position?: RowPosition;
  onPress?: (id: string) => void;
};

export const ShopRow = memo(function ShopRow({ id, name, facts, logo, image, accent, position = 'only', onPress }: ShopRowProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const grouped = theme.platform === 'ios';
  // On an accent tile (the Category screen) the row takes that accent's cardOnTile: white in light, and in dark a
  // tinted card lighter than the tile (decision 050), where Card read as a hole. Its secondary text takes
  // mutedForegroundOnTile, which keeps 4.5:1 on the lighter card.
  const tile = useTileAccent();
  const fill = grouped ? (tile ? theme.color.shop.accent[tile].cardOnTile : theme.color.card) : 'transparent';
  const secondary = tile ? 'mutedForegroundOnTile' : 'mutedForeground';
  // A photo that fails to load (no network, a blocked host) falls back to the round monogram, not a blank square.
  const [failed, setFailed] = useState<PhotoSource | null>(null);
  const photo = image != null && failed !== image ? image : null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken(name, shopFactsLabel(facts))}
      onPress={onPress ? () => onPress(id) : undefined}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={styles.row(grouped, position, fill)}
    >
      <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
      {photo != null ? (
        <View style={[styles.logo, styles.thumb]}>
          <ShopPlaceholder name={name} accent={accent} size="small" />
          <Image source={photoSource(photo)} style={IMAGE_OVER} contentFit="cover" accessible={false} onError={() => setFailed(photo)} />
        </View>
      ) : (
        <View style={styles.logo}>
          <ShopPlaceholder name={name} accent={accent} size="small" round />
          {logo ? <Image source={{ uri: logo }} style={IMAGE_OVER} contentFit="cover" accessible={false} /> : null}
        </View>
      )}
      <View style={styles.text(grouped && position !== 'last' && position !== 'only')}>
        <View style={styles.grow}>
          <Text variant="headline" numberOfLines={1}>
            {name}
          </Text>
          {/* Status, walk and street wrap between units, on two lines at most. */}
          <ShopMeta {...facts} />
        </View>
        <Icon icon="chevron" size="body" color={secondary} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: (grouped: boolean, position: RowPosition, fill: string) => {
    const top = position === 'first' || position === 'only';
    const bottom = position === 'last' || position === 'only';
    return {
      ...cornerCurve,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[3],
      paddingLeft: theme.space[4],
      backgroundColor: fill,
      // A standalone grouped list (the Category screen) takes radius.card at its ends (shape.md).
      borderTopLeftRadius: grouped && top ? theme.radius.card : 0,
      borderTopRightRadius: grouped && top ? theme.radius.card : 0,
      borderBottomLeftRadius: grouped && bottom ? theme.radius.card : 0,
      borderBottomRightRadius: grouped && bottom ? theme.radius.card : 0,
      overflow: 'hidden',
    };
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  logo: {
    width: theme.size.avatar.shop,
    height: theme.size.avatar.shop,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
  },
  thumb: { ...cornerCurve, borderRadius: theme.radius.inner },
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
