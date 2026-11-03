import { useState } from 'react';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { IMAGE_FILL } from '../../internal/media';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Illustration, categoryIllustration, useIllustrationScheme } from './Illustration';
import {
  CATEGORY_ILLUSTRATIONS,
  CATEGORY_LABELS,
  ILLUSTRATIONS,
  ILLUSTRATION_SIZES,
  type CategoryId,
  type IllustrationGround,
  type IllustrationName,
  type IllustrationSize,
} from './manifest.generated';

const NAMES = Object.keys(ILLUSTRATIONS) as IllustrationName[];
const SIZES = Object.keys(ILLUSTRATION_SIZES) as IllustrationSize[];
const CATEGORIES = Object.keys(CATEGORY_ILLUSTRATIONS) as CategoryId[];

// Every rendered asset: each illustration on the background and on a card, at each size it ships in,
// playing entry then idle; Replay starts the clips again. Then the category cards' stills.
export function IllustrationExamples() {
  const scheme = useIllustrationScheme();
  const [run, setRun] = useState(0);
  return (
    <View style={styles.list}>
      <Button label="Replay" role="tonal" size="compact" onPress={() => setRun((n) => n + 1)} />
      {NAMES.map((name) => (
        <View key={`${name}-${run}`} style={styles.block}>
          <Text variant="footnote" color="mutedForeground">
            {name}
          </Text>
          {(['background', 'card'] as IllustrationGround[]).map((ground) => (
            <View key={ground} style={styles.row(ground)}>
              {SIZES.filter((s) => ILLUSTRATIONS[name][`${ground}-${scheme}`]?.[s]).map((s) => (
                <Illustration key={s} name={name} size={s} ground={ground} />
              ))}
            </View>
          ))}
        </View>
      ))}
      <Text variant="footnote" color="mutedForeground">
        Category cards (stills)
      </Text>
      <View style={styles.grid}>
        {CATEGORIES.map((id) => {
          const art = categoryIllustration(id, scheme);
          return art ? (
            <View key={id} style={styles.tile} accessible accessibilityLabel={CATEGORY_LABELS[id]}>
              <Image source={art.still} style={IMAGE_FILL} contentFit="contain" transition={0} accessible={false} />
            </View>
          ) : null;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  block: { gap: theme.space[2] },
  row: (ground: IllustrationGround) => ({
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: theme.space[4],
    padding: theme.space[2],
    borderRadius: theme.radius.card,
    backgroundColor: ground === 'card' ? theme.color.card : theme.color.background,
  }),
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
  tile: { width: theme.size.category.width, height: theme.size.category.height, borderRadius: theme.radius.card, overflow: 'hidden' },
}));
