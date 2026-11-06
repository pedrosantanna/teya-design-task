// A kind of shop on Nearby ("Browse by category", components.md, Category card): a fixed-size card in the kind's
// tile step with its label and a still of the closest 3D object from the illustration pipeline (a transparent image shaded for this
// card's own tile colour and drawn over it). A tap opens the Category screen.
// Built for a long sideways list: fixed size (no layout pass on scroll), memoised, and the still is a
// pre-rendered image drawn at exactly its size, cached on disk and recycled when the list reuses the cell.
import { Image, type ImageSource } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { Ground } from '../../internal/ground';
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
  /** The pipeline's category still to show, when it differs from `id` (Newsagents show the newsagent still). */
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
        {/* Headline (17): the rail's labels are the one text size between the section title and the tiles' names. The
            card is the kind's tile, so the label takes the on-tile ink (the pastel tile in both modes). */}
        <Ground value="tile" accent={accent}>
          <Text variant="headline" color="foreground" numberOfLines={1}>
            {label}
          </Text>
        </Ground>
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
  art?: CategoryId;
};

/** The top of the Category screen: its name in Display title and the category's still. The screen itself is the
 *  category's tile (it zooms out of the category card, so the two share colour and picture); the header has no fill
 *  or inset of its own, so its title lines up with the chips and the list under it. */
export const CategoryHeader = memo(function CategoryHeader({ id, title, detail, art: artId }: CategoryHeaderProps) {
  const scheme = useIllustrationScheme();
  const key = artId ?? id;
  const art = isCategory(key) ? categoryIllustration(key, scheme)?.still : undefined;
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text variant="displayTitle" accessibilityRole="header" numberOfLines={2}>
          {title}
        </Text>
        {detail ? (
          // The header sits straight on the tile: mutedForegroundOnTile (muted ink in dark, on the pastel tile).
          <Text variant="footnote" color="mutedForegroundOnTile">
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
  // The header sits close to the chips it introduces: its text sets the height and rests gap.title (16) above the
  // chips, and the title starts gap.aboveTitle under the content's top, so Back to title is 32. The still rests on the
  // same bottom edge; its empty top (the object stands on a baseline near the square's foot) may rise past the text
  // into the screen's own colour, since the still is transparent over that colour.
  header: { justifyContent: 'flex-end' },
  // A long title wraps before the still, space.6 clear of its square ("Florists and plants").
  headerText: { gap: theme.space[2], paddingTop: theme.gap.aboveTitle, paddingRight: theme.size.category.art + theme.space[6] },
  // The still is rendered 120 × 164 with the object in the top 120 square; the header shows that square.
  headerArt: { position: 'absolute', right: 0, bottom: 0, width: theme.size.category.art, height: theme.size.category.art, overflow: 'hidden' },
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
