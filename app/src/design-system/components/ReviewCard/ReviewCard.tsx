// A person's note on the shop page and the reviews list (change shop-ratings-and-range): a plain row in the grouped list,
// the first name and the month on one line, then their words, clamped to three lines on the shop page. No avatar, no
// surname, no purchase type. Only a note from someone who wouldn't go back says so, with the thumbs-down symbol; a
// thumbs-up is the default and needs no label (visual critique 3).
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo, useState, type ReactNode } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useBleed, useRestWidth } from '../../internal/bleed';
import { OnTileSurface, useTileAccent } from '../../internal/ground';
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
  // Painted on both platforms (platforms.md, parity): a Material 3 list sits in the same card role as the iOS grouped list,
  // so a row on a tile is cardOnTile on Android too, never the bare tile.
  const grouped = true;
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
        <OnTileSurface>{body}</OnTileSurface>
      </View>
    );
  }
  return (
    <View accessible accessibilityLabel={label} style={styles.row(grouped, top, bottom, tile)}>
      <View style={styles.inner(grouped && !bottom, tile)}>
        <OnTileSurface painted={grouped}>{body}</OnTileSurface>
      </View>
    </View>
  );
});

/** The font scale from which text counts as an accessibility size (content.md: iOS AX1 and up, Android above 150%). */
const ACCESSIBILITY_FONT_SCALE = 1.5;

/** The summary card's and the review cards' share of the content width: one card width, the same peek as the photos above (spacing.md). */
const SUMMARY_SHARE = 0.86;
const REVIEW_SHARE = 0.86;

export type ReviewCarouselProps = {
  /** Spoken for the scroller: "Ratings and reviews, 3 of 38". */
  accessibilityLabel: string;
  /** How many review cards follow the summary: with none, the summary takes the full width, as nothing is there to peek. */
  count: number;
  /** How far the row runs past its container on each side, so the cards scroll out to the edge of the surface they sit on
   *  while the first one rests on the text's edge. Defaults to the shop page's (the card's padding), 0 elsewhere. */
  bleed?: number;
  /** Renders the cards at the widths it is given: the summary first, then one ReviewCard each. */
  children: (width: { summary: number; review: number }) => ReactNode;
};

/** The shop page's Ratings: a sideways row of cards of equal height, straight on the page's surface. The first, at 86% of
 *  the container's width, is the summary; the review cards are 86% too, `space.3` apart, and the next one peeks in. The row
 *  bleeds to the surface's edges and snaps card by card to the text's edge. No autoplay. Under Reduce Motion the fling
 *  settles at once. At accessibility text sizes the cards are a vertical stack of full-width cards, the summary first
 *  (content.md, Accessibility sizes). The links ("See all", "How ratings work") are a list under it, set by the page. */
export function ReviewCarousel({ accessibilityLabel, count, bleed: bleedProp, children }: ReviewCarouselProps) {
  const pageBleed = useBleed();
  const bleed = bleedProp ?? pageBleed;
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  // On the shop page the card's rest width comes from the page: measuring here re-rendered every card on each frame
  // of the card's growth at the start of a scroll (profiled: 15 to 30 ms per commit on the JS thread).
  const rest = useRestWidth();
  const [measured, setInner] = useState(0);
  const inner = rest ?? measured;
  const { fontScale } = useWindowDimensions();
  const stacked = fontScale >= ACCESSIBILITY_FONT_SCALE;
  const gap = theme.space[3];
  const alone = count === 0 || stacked;
  const widths = {
    summary: Math.round(inner * (alone ? 1 : SUMMARY_SHARE)),
    review: Math.round(inner * (stacked ? 1 : REVIEW_SHARE)),
  };
  // Where each card starts, from the summary's left edge: the snap points.
  const offsets = [0, ...Array.from({ length: count }, (_, i) => widths.summary + gap + i * (widths.review + gap))];
  return (
    <View onLayout={rest === undefined ? (e) => setInner(e.nativeEvent.layout.width) : undefined} accessibilityLabel={stacked ? accessibilityLabel : undefined}>
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
            contentContainerStyle={styles.rail(bleed)}
            style={styles.scroller(bleed)}
          >
            {children(widths)}
          </ScrollView>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  // The scroller reaches past the container by the bleed and pads itself back, so the cards run to the surface's edge
  // while they scroll and rest on the text's edge.
  scroller: (bleed: number) => ({ flexGrow: 0, marginHorizontal: -bleed }),
  list: { gap: theme.space[3] },
  // The row stretches its cards to the tallest.
  rail: (bleed: number) => ({ paddingHorizontal: bleed, gap: theme.space[3] }),
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
  row: (grouped: boolean, top: boolean, bottom: boolean, tile?: ShopAccentName) => ({
    ...cornerCurve,
    paddingLeft: theme.space[4],
    // On an accent tile (the reviews screen) the row takes that accent's cardOnTile, as the shop page's cards and ListRow do.
    backgroundColor: grouped ? (tile ? theme.color.shop.accent[tile].cardOnTile : theme.color.card) : 'transparent',
    borderTopLeftRadius: top && grouped ? theme.radius.inner : 0,
    borderTopRightRadius: top && grouped ? theme.radius.inner : 0,
    borderBottomLeftRadius: bottom && grouped ? theme.radius.inner : 0,
    borderBottomRightRadius: bottom && grouped ? theme.radius.inner : 0,
  }),
  inner: (separator: boolean, tile?: ShopAccentName) => ({
    gap: theme.space[1],
    paddingVertical: theme.space[3],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: tile ? theme.color.shop.accent[tile].separatorOnCard : theme.color.separator,
  }),
  line: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  grow: { flex: 1 },
}));
