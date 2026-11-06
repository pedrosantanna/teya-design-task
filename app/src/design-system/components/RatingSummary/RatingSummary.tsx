// The top of Ratings on the shop page (change shop-ratings-and-range): the share of people who would go back as a large
// figure, with "would go back" and how many rated beside it, or the count alone below 5 ratings ("3 people so far"),
// then the tags people picked, with counts, as a wrapping group of chips that do nothing on tap (content.md, Ratings).
// Thumbs, never stars. One element for screen readers.
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { OnTileSurface, useTileAccent, useTileCardAccent } from '../../internal/ground';
import { cardShadow } from '../../internal/shadow';
import { cornerCurve, type ShopAccentName } from '../../theme';
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
  /** A standalone card for the ratings carousel, at this width: the tags wrap (three at most are the caller's call). Cards in a row stretch to the tallest. */
  width?: number;
};

export const RatingSummary = memo(function RatingSummary({ figure, caption, title, detail, accessibilityLabel, tags = [], width }: RatingSummaryProps) {
  const tile = useTileAccent();
  // The tags sit on the card (the summary card on a tile, or a row on one): the accent's chipOnCard there.
  const cardAccent = useTileCardAccent();
  const chipAccent = (width != null ? tile : undefined) ?? cardAccent;
  const spokenTags = tags.map((t) => `${t.tag}, ${t.count}`).join('; ');
  const body = (
    <View accessible accessibilityLabel={spokenTags ? `${accessibilityLabel}. ${spokenTags}` : accessibilityLabel} style={styles.root}>
      {figure ? (
        <View style={width != null ? styles.headCard : styles.head}>
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
            <View key={t.tag} style={styles.tag(chipAccent)}>
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
  if (width == null) return body;
  return (
    <View style={styles.card(width, tile)}>
      <OnTileSurface>{body}</OnTileSurface>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: { gap: theme.gap.block },
  head: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
  // In the narrow card the caption goes under the figure.
  headCard: { gap: theme.space[1] },
  words: { flexShrink: 1 },
  // Chips that only inform, one treatment for every chip on a row in the shop card (tags.md): tag.fillOnRow, no edge, a clear
  // step from the row (the Background on white in light, tag.fillRaised in dark), never a control's fill.
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
  tag: (accent?: ShopAccentName) => ({
    ...cornerCurve,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1],
    height: theme.size.chip,
    paddingHorizontal: theme.space[3],
    borderRadius: theme.radius.full,
    backgroundColor: accent ? theme.color.shop.accent[accent].chipOnCard : theme.color.tag.fillOnRow,
  }),
  // The carousel's summary card: the row's fill (the accent's cardOnTile on a tile), the figure, the people and the tags.
  card: (width: number, tile?: ShopAccentName) => ({
    ...cornerCurve,
    width,
    padding: theme.space[4],
    borderRadius: theme.radius.inner,
    backgroundColor: tile ? theme.color.shop.accent[tile].cardOnTile : theme.color.card,
    boxShadow: cardShadow(theme),
  }),
}));
