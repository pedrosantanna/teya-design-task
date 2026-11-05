import { Image } from 'expo-image';
import { memo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { spoken } from '../../internal/PressableCard';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { usePress } from '../../internal/usePress';
import { cornerCurve, screenMargin, type AppTheme, type BadgeName, type ShopAccentName } from '../../theme';
import { Badge, badgeLabel } from '../Tag/Tag';
import { ShopMeta, shopFactsLabel, type ShopFacts } from '../ShopMeta/ShopMeta';
import { Text } from '../Text/Text';

// Photos fade in over their skeleton (states.md); expo-image takes a duration, so spring.fade's 0.25 s.
const PHOTO_FADE_MS = 250;

export type ShopTileSize = 'large' | 'medium';

/** tile.large = 0.78 × content width; tile.medium = (content − gutter) / 2.3 (spacing.md). */
export function tileWidth(theme: AppTheme, contentWidth: number, size: ShopTileSize): number {
  return size === 'large' ? contentWidth * theme.layout.tileLarge : (contentWidth - theme.layout.gutter) / theme.layout.tileMediumDivisor;
}

export type ShopTileProps = {
  id: string;
  name: string;
  /** Status and walk, as ShopMeta draws them ("Open until 6pm", "2 min walk"); no street on a tile. */
  facts: ShopFacts;
  image?: PhotoSource;
  /** At most two. Promoted is never drawn in the prototype. */
  badges?: BadgeName[];
  size?: ShopTileSize;
  /** The screen's content width; defaults to the window width minus the screen margins. */
  contentWidth?: number;
  /** The shop's accent: the tonal tile under the photo while it loads, or instead of it. */
  accent?: ShopAccentName;
  onPress?: (id: string) => void;
  /** `high` on the first tile of a screen, so its photo is the first thing fetched (the largest contentful paint). */
  priority?: 'high';
};

export const ShopTile = memo(function ShopTile({ id, name, facts, image, badges = [], size = 'large', contentWidth, accent, onPress, priority }: ShopTileProps) {
  const [failed, setFailed] = useState<PhotoSource | null>(null);
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const press = usePress();
  const content = contentWidth ?? frame.width - 2 * screenMargin(theme, frame.width);
  const width = tileWidth(theme, content, size);
  const shown = badges.filter((b) => b !== 'promoted').slice(0, 2);

  return (
    <Animated.View style={[styles.tile(width), press.scaleStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={spoken(name, ...shown.map((b) => badgeLabel(b).toLowerCase()), shopFactsLabel(facts))}
        onPress={onPress ? () => onPress(id) : undefined}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.inner}
      >
        <View style={styles.photo}>
          <ShopPlaceholder name={name} accent={accent} />
          {image && failed !== image ? (
            <Image
              source={photoSource(image)}
              style={IMAGE_OVER}
              contentFit="cover"
              priority={priority}
              recyclingKey={id}
              transition={PHOTO_FADE_MS}
              accessible={false}
              onError={() => setFailed(image)}
            />
          ) : null}
          <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
          {shown.length > 0 ? (
            <View style={styles.badges}>
              {shown.map((b) => (
                <Badge key={b} badge={b} />
              ))}
            </View>
          ) : null}
        </View>
        <View style={styles.text}>
          <Text variant="headline" numberOfLines={1}>
            {name}
          </Text>
          <ShopMeta {...facts} />
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  tile: (width: number) => ({ width }),
  inner: { gap: theme.space[2] },
  photo: {
    ...cornerCurve,
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: theme.radius.bubble,
    overflow: 'hidden',
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.scrim },
  badges: { position: 'absolute', top: theme.space[2], left: theme.space[2], flexDirection: 'row', gap: theme.space[1] },
  text: { gap: theme.space[1] },
}));
