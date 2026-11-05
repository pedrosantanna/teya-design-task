// The top of Ratings on the shop page (change shop-ratings-and-range): the share of people who would go back as a large
// figure, with "would go back" and how many rated beside it, or the count alone below 5 ratings ("3 people so far"),
// then the tags people picked, with counts, as a wrapping group of chips that do nothing on tap (content.md, Ratings).
// Thumbs, never stars. One element for screen readers.
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
            <View key={t.tag} style={styles.tag}>
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
  // Chips that only inform: Background with a 1 pt Border edge, a level down from the row (Background on Card in light,
  // the Muted row in dark), never a control's fill.
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
}));
