// A sheet of photo choices in a grid, the current one selected (components.md, Sheet; Nav bar's trailing photo).
// Picking one calls `onSelect` and closes the sheet. Composes Sheet at the fit detent on the standard sheet ground.
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { usePress } from '../../internal/usePress';
import { cornerCurve } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Sheet } from '../Sheet/Sheet';
import { Text } from '../Text/Text';

export type PhotoChoice = { id: string; photo: PhotoSource };

export type PhotoPickerSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** A line under the title: what the photo is for. */
  subtitle?: string;
  photos: PhotoChoice[];
  /** The id of the current photo. */
  selected: string;
  onSelect: (id: string) => void;
  /** Photos per row; the last row keeps the same tile size. */
  columns?: number;
};

export const PhotoPickerSheet = memo(function PhotoPickerSheet({ open, onClose, title, subtitle, photos, selected, onSelect, columns = 3 }: PhotoPickerSheetProps) {
  const rows: PhotoChoice[][] = [];
  for (let i = 0; i < photos.length; i += columns) rows.push(photos.slice(i, i + columns));
  return (
    <Sheet open={open} onClose={onClose} title={title} subtitle={subtitle} detents={['fit']}>
      <View style={styles.grid} accessibilityRole="radiogroup">
        {rows.map((row, r) => (
          <View key={row[0].id} style={styles.row}>
            {row.map((choice, c) => (
              <Tile key={choice.id} choice={choice} index={r * columns + c} count={photos.length} on={choice.id === selected} onPress={onSelect} />
            ))}
            {Array.from({ length: columns - row.length }, (_, i) => (
              <View key={`gap-${i}`} style={styles.tile} />
            ))}
          </View>
        ))}
      </View>
      <Text variant="footnote" color="mutedForeground">
        The photo shows in the chat and in Requests.
      </Text>
    </Sheet>
  );
});

function Tile({ choice, index, count, on, onPress }: { choice: PhotoChoice; index: number; count: number; on: boolean; onPress: (id: string) => void }) {
  const press = usePress('selection');
  return (
    <Animated.View style={[styles.tile, press.scaleStyle]}>
      <Pressable
        accessibilityRole="radio"
        accessibilityLabel={`Photo ${index + 1} of ${count}`}
        accessibilityState={{ checked: on, selected: on }}
        onPress={() => onPress(choice.id)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.press(on)}
      >
        <View style={styles.clip}>
          <Image source={photoSource(choice.photo)} style={IMAGE_OVER} contentFit="cover" accessible={false} />
        </View>
        {on ? (
          <View style={styles.badge}>
            <Icon icon={Tick02Icon} size="caption2" weight="strong" color="onPrimary" />
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  grid: { gap: theme.space[2] },
  row: { flexDirection: 'row', gap: theme.space[2] },
  tile: { flex: 1, aspectRatio: 1 },
  // The ring is always there, transparent when off, so choosing never moves the photo.
  press: (on: boolean) => ({
    ...cornerCurve,
    flex: 1,
    borderRadius: theme.radius.inner,
    borderWidth: theme.size.edge.focus,
    borderColor: on ? theme.color.primary : 'transparent',
    padding: theme.size.edge.focus,
  }),
  clip: { ...cornerCurve, flex: 1, borderRadius: theme.radius.inner - theme.size.edge.focus, overflow: 'hidden', backgroundColor: theme.color.muted },
  badge: {
    position: 'absolute',
    top: theme.space[2],
    right: theme.space[2],
    width: theme.size.step,
    height: theme.size.step,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
  },
}));
