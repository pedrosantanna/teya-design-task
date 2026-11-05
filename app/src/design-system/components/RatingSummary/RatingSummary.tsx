// The top of "What buyers say" on the shop page (change shop-ratings-and-range): the share of buyers who would go back
// and how many rated ("92% would go back · 38 buyers"), or the count alone below 5 ratings ("3 buyers so far"), then the
// tags buyers picked, with counts, as plain text: nothing happens on tap, so they don't look like filter chips
// (visual critique 3). Thumbs, never stars. One element for screen readers.
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import ThumbsUpIcon from '@hugeicons/core-free-icons/ThumbsUpIcon';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type RatingSummaryTag = { tag: string; count: number; up: boolean };

export type RatingSummaryProps = {
  /** "92% would go back", or "3 buyers so far" below 5 ratings. */
  title: string;
  /** "38 buyers", after the title; none below 5 ratings. */
  detail?: string;
  /** "Would go back, 92 percent of 38 buyers". */
  accessibilityLabel: string;
  /** Tags with their counts, most common first; thumbs-down tags carry their symbol. */
  tags?: RatingSummaryTag[];
  /** With a share shown, the thumbs-up symbol leads the title. */
  hasShare?: boolean;
};

export const RatingSummary = memo(function RatingSummary({ title, detail, accessibilityLabel, tags = [], hasShare = false }: RatingSummaryProps) {
  const spokenTags = tags.map((t) => `${t.tag}, ${t.count}`).join('; ');
  return (
    <View accessible accessibilityLabel={spokenTags ? `${accessibilityLabel}. ${spokenTags}` : accessibilityLabel} style={styles.root}>
      <View style={styles.head}>
        {hasShare ? <Icon icon={ThumbsUpIcon} size="title3" color="foreground" /> : null}
        <View style={styles.grow}>
          <Text variant="title3">
            {title}
            {detail ? <Text variant="subheadline" color="mutedForeground">{` · ${detail}`}</Text> : null}
          </Text>
        </View>
      </View>
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
  head: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  grow: { flex: 1 },
  // Plain text, no capsule: a tag is a count, not a control (visual critique 3).
  tags: { flexDirection: 'row', flexWrap: 'wrap', columnGap: theme.space[4], rowGap: theme.space[1] },
  tag: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
}));
