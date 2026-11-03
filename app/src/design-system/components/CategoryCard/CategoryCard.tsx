// A kind of shop on Nearby ("Browse by category", components.md, Category card): a fixed-size card in the kind's
// tile step with its label and a still of the closest 3D object from the illustration pipeline (an opaque square
// rendered on this card's own tile colour, so it has no edge). A tap opens the Category screen.
// Built for a long sideways list: fixed size (no layout pass on scroll), memoised, and the still is a
// pre-rendered image drawn at exactly its size, cached on disk and recycled when the list reuses the cell.
import { Image, type ImageSource } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { IMAGE_FILL } from '../../internal/media';
import { usePress } from '../../internal/usePress';
import { categoryIllustration, useIllustrationScheme } from '../Illustration/Illustration';
import { CATEGORY_ILLUSTRATIONS, type CategoryId } from '../Illustration/manifest.generated';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { Text } from '../Text/Text';

export type CategoryCardProps = {
  /** Stable id, also the image's recycling key: "bakery". */
  id: string;
  /** "Bakery" */
  label: string;
  accent: ShopAccentName;
  /** The pipeline's category still to show, when it differs from `id` (Toys shows the gifts still). */
  art?: CategoryId;
  /** Overrides the pipeline's still for this kind. Without either, the card is colour and label. */
  still?: ImageSource | number;
  onPress?: (id: string) => void;
};

function isCategory(id: string): id is CategoryId {
  return id in CATEGORY_ILLUSTRATIONS;
}

export const CategoryCard = memo(function CategoryCard({ id, label, accent, art: artId, still, onPress }: CategoryCardProps) {
  const press = usePress();
  const scheme = useIllustrationScheme();
  const key = artId ?? id;
  const art = still ?? (isCategory(key) ? categoryIllustration(key, scheme)?.still : undefined);
  return (
    <Animated.View style={press.scaleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress ? () => onPress(id) : undefined}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.card(accent)}
      >
        {art != null ? (
          <View style={styles.art} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Image source={art} style={IMAGE_FILL} contentFit="contain" cachePolicy="memory-disk" recyclingKey={key} transition={0} accessible={false} />
          </View>
        ) : null}
        <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
        <Text variant="subheadlineStrong" color="foreground" numberOfLines={1}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
});

export type CategoryHeaderProps = {
  id: string;
  /** "Bakeries" */
  title: string;
  /** "3 places within 15 min walk" */
  detail?: string;
  accent: ShopAccentName;
  art?: CategoryId;
};

/** The top of the Category screen: the category's tile colour, its still and its name in Display title. The screen
 *  zooms out of the category card, so the two share colour and picture. */
export const CategoryHeader = memo(function CategoryHeader({ id, title, detail, accent, art: artId }: CategoryHeaderProps) {
  const scheme = useIllustrationScheme();
  const key = artId ?? id;
  const art = isCategory(key) ? categoryIllustration(key, scheme)?.still : undefined;
  return (
    <View style={styles.header(accent)}>
      <View style={styles.headerText}>
        <Text variant="displayTitle" accessibilityRole="header" numberOfLines={2}>
          {title}
        </Text>
        {detail ? (
          <Text variant="footnote" color="mutedForeground">
            {detail}
          </Text>
        ) : null}
      </View>
      {art != null ? (
        <View style={styles.headerArt} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Image source={art} style={IMAGE_FILL} contentFit="cover" contentPosition="top" cachePolicy="memory-disk" transition={0} accessible={false} />
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  header: (accent: ShopAccentName) => ({
    ...cornerCurve,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    paddingLeft: theme.space[5],
    minHeight: theme.size.category.art,
    backgroundColor: theme.color.shop.accent[accent].tile,
  }),
  headerText: { flex: 1, gap: theme.space[1], paddingVertical: theme.space[5] },
  // The still is rendered 120 × 164 with the object in the top 120 square; the header shows that square.
  headerArt: { width: theme.size.category.art, height: theme.size.category.art, overflow: 'hidden', alignSelf: 'center' },
  card: (accent: ShopAccentName) => ({
    ...cornerCurve,
    width: theme.size.category.width,
    height: theme.size.category.height,
    borderRadius: theme.radius.bubble,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: theme.space[3],
    backgroundColor: theme.color.shop.accent[accent].tile,
  }),
  // expo-image gets the plain IMAGE_FILL inside this sized box (AGENTS.md, Shared internals), so the still is drawn
  // at exactly its rendered size.
  art: { position: 'absolute', top: 0, left: 0, width: theme.size.category.width, height: theme.size.category.height },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
}));
