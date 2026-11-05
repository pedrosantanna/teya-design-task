// A person's note on the shop page and the reviews list (change shop-ratings-and-range): a plain row in the grouped list,
// the first name and the month on one line, then their words, clamped to three lines on the shop page. No avatar, no
// surname, no purchase type. Only a note from someone who wouldn't go back says so, with the thumbs-down symbol; a
// thumbs-up is the default and needs no label (visual critique 3).
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useTileAccent } from '../../internal/ground';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { Icon } from '../Icon/Icon';
import type { RowPosition } from '../ShopRow/ShopRow';
import { Text } from '../Text/Text';

export type ReviewCardProps = {
  /** First name only; "You" for the shopper's own note. */
  name: string;
  /** The note, without quotation marks. */
  text: string;
  /** Would they go back? */
  up: boolean;
  /** "Oct 2026" */
  month: string;
  /** Clamp the note to this many lines; whole when left out. */
  lines?: number;
  /** Its place in the grouped list: corners on the first and last, a separator under every row but the last. */
  position?: RowPosition;
  /** A standalone card for a carousel, at this width, in place of a row of the grouped list. Cards in a row stretch to the tallest. */
  width?: number;
};

const MONTHS: Record<string, string> = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June',
  Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

export const ReviewCard = memo(function ReviewCard({ name, text, up, month, lines, position = 'only', width }: ReviewCardProps) {
  const { theme } = useUnistyles();
  const grouped = theme.platform === 'ios';
  const verdict = up ? 'Would go back' : "Wouldn't go back";
  const [m, y] = month.split(' ');
  const top = position === 'first' || position === 'only';
  const bottom = position === 'last' || position === 'only';
  const tile = useTileAccent();
  const label = `${name}, ${MONTHS[m] ?? m} ${y ?? ''}. ${verdict}. ${text}`.replace(/\s+\./, '.');
  const body = (
    <>
      <View style={styles.line}>
        {up ? null : <Icon icon={ThumbsDownIcon} size="subheadline" color="foreground" />}
        <View style={styles.grow}>
          <Text variant="subheadlineStrong" numberOfLines={1}>
            {name}
          </Text>
        </View>
        <Text variant="footnote" color="mutedForeground">
          {month}
        </Text>
      </View>
      <Text variant="body" numberOfLines={lines}>
        {text}
      </Text>
    </>
  );
  if (width != null) {
    return (
      <View accessible accessibilityLabel={label} style={styles.card(width, tile)}>
        {body}
      </View>
    );
  }
  return (
    <View accessible accessibilityLabel={label} style={styles.row(grouped, top, bottom)}>
      <View style={styles.inner(grouped && !bottom)}>{body}</View>
    </View>
  );
});

/** The font scale from which text counts as an accessibility size (content.md: iOS AX1 and up, Android above 150%). */
const ACCESSIBILITY_FONT_SCALE = 1.5;

/** The summary card's share of the panel's inner width, and the review cards' (the next one peeks in; spacing.md). */
const SUMMARY_SHARE = 0.72;
const REVIEW_SHARE = 0.8;

export type ReviewCarouselProps = {
  /** Spoken for the scroller: "Ratings and reviews, 3 of 38". */
  accessibilityLabel: string;
  /** How many review cards follow the summary: with none, the summary takes the full width, as nothing is there to peek. */
  count: number;
  /** Rows at the foot of the panel, full width under the cards, each with a chevron and a hairline above ("See all 38 reviews", "How ratings work"). */
  links?: { label: string; onPress: () => void }[];
  /** Renders the cards at the widths it is given: the summary first, then one ReviewCard each. */
  children: (width: { summary: number; review: number }) => ReactNode;
};

/** The shop page's Ratings as one block: a panel on a deeper surface than the page card (the Background in light, the
 *  Background in dark), holding a sideways row of cards of equal height. The first, at 72% of the inner width, is the
 *  summary; the review cards are 80%, `space.3` apart, and the next one peeks in. Snaps card by card from the panel's
 *  inner edge. No autoplay. Under Reduce Motion the fling settles at once. At accessibility text sizes the cards are a
 *  vertical stack of full-width cards, the summary first (content.md, Accessibility sizes). */
export function ReviewCarousel({ accessibilityLabel, count, links = [], children }: ReviewCarouselProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const [panel, setPanel] = useState(0);
  const { fontScale } = useWindowDimensions();
  const stacked = fontScale >= ACCESSIBILITY_FONT_SCALE;
  const gap = theme.space[3];
  const inner = Math.max(0, panel - 2 * gap);
  const alone = count === 0 || stacked;
  const widths = {
    summary: Math.round(inner * (alone ? 1 : SUMMARY_SHARE)),
    review: Math.round(inner * (stacked ? 1 : REVIEW_SHARE)),
  };
  // Where each card starts, from the summary's left edge: the snap points.
  const offsets = [0, ...Array.from({ length: count }, (_, i) => widths.summary + gap + i * (widths.review + gap))];
  return (
    <View onLayout={(e) => setPanel(e.nativeEvent.layout.width)} style={styles.panel} accessibilityLabel={stacked ? accessibilityLabel : undefined}>
      {inner > 0 ? (
        stacked ? (
          <View style={styles.list}>{children(widths)}</View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            accessibilityLabel={accessibilityLabel}
            snapToOffsets={offsets}
            snapToAlignment="start"
            decelerationRate={reduceMotion ? 'normal' : 'fast'}
            contentContainerStyle={styles.rail}
            style={styles.scroller}
          >
            {children(widths)}
          </ScrollView>
        )
      ) : null}
      {links.length > 0 ? (
        <View style={styles.links}>
          {links.map((l) => (
            <Pressable key={l.label} accessibilityRole="button" accessibilityLabel={l.label} onPress={l.onPress} style={styles.link}>
              <View style={styles.grow}>
                <Text variant="body">{l.label}</Text>
              </View>
              <Icon icon="chevron" size="body" color="mutedForeground" />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // One container: the Background (light, 1.21:1 under a white card) or Background in dark, clipped to its corners. The scroller
  // reaches the panel's edges and pads itself back, so the cards run to the edge while they scroll.
  panel: { ...cornerCurve, overflow: 'hidden', borderRadius: theme.radius.inner, backgroundColor: theme.scheme === 'dark' ? theme.color.sheet : theme.color.background, paddingVertical: theme.space[3] },
  scroller: { flexGrow: 0 },
  // The links run the panel's width under the cards, inset like list rows, a hairline above each.
  links: { paddingHorizontal: theme.space[4], paddingTop: theme.space[1] },
  link: {
    minHeight: theme.hit.min,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.separator,
  },
  list: { gap: theme.space[3], paddingHorizontal: theme.space[3] },
  // The row stretches its cards to the tallest.
  rail: { paddingHorizontal: theme.space[3], gap: theme.space[3] },
  card: (width: number, tile?: ShopAccentName) => ({
    ...cornerCurve,
    width,
    gap: theme.space[1],
    padding: theme.space[4],
    borderRadius: theme.radius.inner,
    // On an accent tile (the shop page) the card takes that accent's cardOnTile, as the rows do.
    backgroundColor: tile ? theme.color.shop.accent[tile].cardOnTile : theme.color.card,
  }),
  // The grouped row's fill, corners and inset separator, as ListRow on Card (Material: no fill, as its lists).
  row: (grouped: boolean, top: boolean, bottom: boolean) => ({
    ...cornerCurve,
    paddingLeft: theme.space[4],
    backgroundColor: grouped ? theme.color.card : 'transparent',
    borderTopLeftRadius: top && grouped ? theme.radius.inner : 0,
    borderTopRightRadius: top && grouped ? theme.radius.inner : 0,
    borderBottomLeftRadius: bottom && grouped ? theme.radius.inner : 0,
    borderBottomRightRadius: bottom && grouped ? theme.radius.inner : 0,
  }),
  inner: (separator: boolean) => ({
    gap: theme.space[1],
    paddingVertical: theme.space[3],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: theme.color.separator,
  }),
  line: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  grow: { flex: 1 },
}));
