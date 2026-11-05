// A buyer's note on the shop page and the reviews list (change shop-ratings-and-range): a plain row in the grouped
// list, with the buyer's words in quotation marks and how and when they got the item ("Collected · Oct 2026") under
// them, a separator between rows. Only a note from a buyer who wouldn't go back says so, with the thumbs-down symbol;
// a thumbs-up is the default and needs no label (visual critique 3).
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../../theme';
import { Icon } from '../Icon/Icon';
import type { RowPosition } from '../ShopRow/ShopRow';
import { Text } from '../Text/Text';

export type ReviewCardProps = {
  /** The buyer's note, without quotation marks. */
  text: string;
  /** Would they go back? */
  up: boolean;
  /** "Oct 2026" */
  month: string;
  /** How they got the item. */
  how: 'Collected' | 'Delivered';
  /** Its place in the grouped list: corners on the first and last, a separator under every row but the last. */
  position?: RowPosition;
};

const MONTHS: Record<string, string> = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June',
  Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

export const ReviewCard = memo(function ReviewCard({ text, up, month, how, position = 'only' }: ReviewCardProps) {
  const { theme } = useUnistyles();
  const grouped = theme.platform === 'ios';
  const verdict = up ? 'Would go back' : "Wouldn't go back";
  const [m, y] = month.split(' ');
  const top = position === 'first' || position === 'only';
  const bottom = position === 'last' || position === 'only';
  return (
    <View
      accessible
      accessibilityLabel={`${verdict}. “${text}” ${how}, ${MONTHS[m] ?? m} ${y ?? ''}`.trim()}
      style={styles.row(grouped, top, bottom)}
    >
      <View style={styles.inner(grouped && !bottom)}>
        {up ? null : (
          <View style={styles.line}>
            <Icon icon={ThumbsDownIcon} size="footnote" color="foreground" />
            <Text variant="footnote">{verdict}</Text>
          </View>
        )}
        <Text variant="body">{`“${text}”`}</Text>
        <View style={styles.line}>
          <Icon icon={Tick02Icon} size="footnote" color="success" />
          <Text variant="footnote" color="mutedForeground">{`${how} · ${month}`}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
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
}));
