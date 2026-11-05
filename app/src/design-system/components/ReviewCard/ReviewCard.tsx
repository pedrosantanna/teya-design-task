// A person's note on the shop page and the reviews list (change shop-ratings-and-range): a plain row in the grouped list,
// the first name and the month on one line, then their words, clamped to three lines on the shop page. No avatar, no
// surname, no purchase type. Only a note from someone who wouldn't go back says so, with the thumbs-down symbol; a
// thumbs-up is the default and needs no label (visual critique 3).
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo, useState, type ReactNode } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useTileAccent } from '../../internal/ground';
import { cardShadow } from '../../internal/shadow';
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

/** The cards' share of the content width: the next one peeks in (spacing.md). */
const CARD_SHARE = 0.8;

export type ReviewCarouselProps = {
  /** Spoken for the scroller: "Reviews, 3 of 38". */
  accessibilityLabel: string;
  /** Cards that bleed to the card's edge: the scroller reaches this far past the content on each side and pads itself back. */
  bleed: number;
  /** How many cards: one alone takes the full content width, as nothing is there to peek. */
  count: number;
  /** Renders one card at the width it is given. */
  children: (width: number) => ReactNode;
};

/** A sideways row of ReviewCards (the shop page's Ratings): 80% of the content width, `space.3` apart, snapping card by card
 *  from the content edge, the next one peeking in. No autoplay. Under Reduce Motion the fling settles at once. At
 *  accessibility text sizes it is a vertical list of full-width cards (content.md, Accessibility sizes). */
export function ReviewCarousel({ accessibilityLabel, bleed, count, children }: ReviewCarouselProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const [content, setContent] = useState(0);
  const { fontScale } = useWindowDimensions();
  const stacked = fontScale >= ACCESSIBILITY_FONT_SCALE;
  const width = Math.round(content * (count > 1 && !stacked ? CARD_SHARE : 1));
  if (stacked) {
    return (
      <View onLayout={(e) => setContent(e.nativeEvent.layout.width)} accessibilityLabel={accessibilityLabel} style={styles.list}>
        {width > 0 ? children(width) : null}
      </View>
    );
  }
  return (
    <View onLayout={(e) => setContent(e.nativeEvent.layout.width)}>
      {width > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          accessibilityLabel={accessibilityLabel}
          snapToInterval={width + theme.space[3]}
          snapToAlignment="start"
          decelerationRate={reduceMotion ? 'normal' : 'fast'}
          contentContainerStyle={styles.rail(bleed)}
          style={styles.scroller(bleed)}
        >
          {children(width)}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // The scroller is wider than the content by `bleed` each side; the wrapper measures the content between them.
  scroller: (bleed: number) => ({ marginHorizontal: -bleed }),
  list: { gap: theme.space[3] },
  rail: (bleed: number) => ({ paddingHorizontal: bleed, gap: theme.space[3] }),
  card: (width: number, tile?: ShopAccentName) => ({
    ...cornerCurve,
    width,
    gap: theme.space[1],
    padding: theme.space[4],
    borderRadius: theme.radius.inner,
    // On an accent tile (the shop page) the card takes that accent's cardOnTile, as the rows do.
    backgroundColor: tile ? theme.color.shop.accent[tile].cardOnTile : theme.color.card,
    boxShadow: cardShadow(theme),
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
