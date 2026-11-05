// The top of Ratings on the shop page (change shop-ratings-and-range): the share of people who would go back as a large
// figure, with "would go back" and how many rated beside it, or the count alone below 5 ratings ("3 people so far"),
// then the tags people picked, with counts, as a wrapping group of chips that do nothing on tap (content.md, Ratings).
// Thumbs, never stars. One element for screen readers.
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useTileAccent } from '../../internal/ground';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type RatingSummaryTag = { tag: string; count: number; up: boolean };

export type RatingSummaryProps = {
  /** "92%", the share who would go back; set only from 5 ratings, and then `title` is not shown. */
  figure?: string;
  /** "would go back", beside the figure. */
  caption?: string;
  /** "3 people so far" or "No ratings yet", in place of a figure. */
  title?: string;
  /** "48 people" under the caption; under the title when there is no figure. */
  detail?: string;
  /** "Would go back, 92 percent of 48 people". */
  accessibilityLabel: string;
  /** Tags with their counts, most common first; thumbs-down tags carry their symbol. */
  tags?: RatingSummaryTag[];
};

export const RatingSummary = memo(function RatingSummary({ figure, caption, title, detail, accessibilityLabel, tags = [] }: RatingSummaryProps) {
  const { theme } = useUnistyles();
  const dark = theme.scheme === 'dark';
  const accent = useTileAccent();
  // In dark on an accent tile the chips take the accent's tile fill, as the "What they sell" chips do: 1.40 to 1.48:1 from
  // the row (tag.fillRaised was 1.37 to 1.40:1 there).
  const onTile = dark && accent ? { borderColor: theme.color.shop.accent[accent].tile, backgroundColor: theme.color.shop.accent[accent].tile } : undefined;
  const spokenTags = tags.map((t) => `${t.tag}, ${t.count}`).join('; ');
  return (
    <View accessible accessibilityLabel={spokenTags ? `${accessibilityLabel}. ${spokenTags}` : accessibilityLabel} style={styles.root}>
      {figure ? (
        <View style={styles.head}>
          <Text variant="displayTitle">{figure}</Text>
          <View style={styles.words}>
            {caption ? <Text variant="body">{caption}</Text> : null}
            {detail ? (
              <Text variant="subheadline" color="mutedForeground">
                {detail}
              </Text>
            ) : null}
          </View>
        </View>
      ) : (
        <View style={styles.words}>
          <Text variant="title3">{title ?? ''}</Text>
          {detail ? (
            <Text variant="subheadline" color="mutedForeground">
              {detail}
            </Text>
          ) : null}
        </View>
      )}
      {tags.length > 0 ? (
        <View style={styles.tags}>
          {tags.map((t) => (
            <View key={t.tag} style={[styles.tag, dark && styles.tagDark, onTile]}>
              {t.up ? null : <Icon icon={ThumbsDownIcon} size="footnote" color="mutedForeground" />}
              <Text variant="footnote">{t.tag}</Text>
              <Text variant="footnote" color="mutedForeground">
                {String(t.count)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: { gap: theme.gap.block },
  head: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
  words: { flexShrink: 1 },
  // Chips that only inform. Light: Background with a 1 pt Border edge, a level down from the Card row. Dark: no edge, a tonal
  // container (tag.fillRaised on a Card row; on an accent tile's row the accent's tile, 1.40:1 or more), never a control's fill.
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1],
    height: theme.size.chip,
    paddingHorizontal: theme.space[3] - theme.size.edge.control,
    borderRadius: theme.radius.full,
    borderWidth: theme.size.edge.control,
    borderColor: theme.color.border,
    backgroundColor: theme.color.background,
  },
  tagDark: { borderColor: theme.color.tag.fillRaised, backgroundColor: theme.color.tag.fillRaised },
}));
