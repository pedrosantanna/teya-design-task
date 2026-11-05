// The facts of a shop in a list, tile or page header (content.md, Metadata lines): status first, in its own colour,
// then the walk and the street as icon-led groups. Facts are told apart by weight, colour, icon and position, never by
// a floating dot. Each group is one unit (non-breaking spaces) and a line breaks only between groups.
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import FootprintsIcon from '@hugeicons/core-free-icons/FootprintsIcon';
import Scooter01Icon from '@hugeicons/core-free-icons/Scooter01Icon';
import SparklesIcon from '@hugeicons/core-free-icons/SparklesIcon';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useTileAccent } from '../../internal/ground';
import type { ColorName, TypeStyleName } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type ShopStatusState = 'open' | 'closesSoon' | 'closed';

export type ShopStatusProps = {
  state: ShopStatusState;
  /** What follows the word, in secondary text: "until 6pm", "opens 9am". */
  detail?: string;
  /** Type size; the status line and the groups under it share it. */
  size?: 'subheadline' | 'footnote';
};

/** "Open" in Success, "Closes soon" in Warning, "Closed" in Foreground, each followed by its time in Muted foreground. */
export const ShopStatus = memo(function ShopStatus({ state, detail, size = 'footnote' }: ShopStatusProps) {
  const tile = useTileAccent();
  const word = state === 'open' ? 'Open' : state === 'closesSoon' ? 'Closes soon' : 'Closed';
  // On a tile the word takes successOnTile and warningOnTile: Success 700 is 4.16:1 on Peach in light, and Success in
  // dark is 4.4:1 on two of the tinted row cards, so there the word takes Foreground (semibold, and the word still says open).
  const color: ColorName =
    state === 'closesSoon' ? (tile ? 'warningOnTile' : 'warning') : state === 'open' ? (tile ? 'successOnTile' : 'success') : 'foreground';
  const secondary: ColorName = tile ? 'mutedForegroundOnTile' : 'mutedForeground';
  // The header's status word is semibold; in a row or tile (footnote) there is no semibold footnote, so colour carries it.
  const strong: TypeStyleName = size === 'subheadline' ? 'subheadlineStrong' : 'footnote';
  return (
    <Text variant={size} color={secondary}>
      <Text variant={strong} color={color}>
        {word}
      </Text>
      {detail ? ` ${detail}` : ''}
    </Text>
  );
});

/** What a list row or tile hands to ShopMeta. */
export type ShopFacts = Pick<ShopStatusProps, 'state' | 'detail'> & { walk?: string; street?: string; delivers?: boolean; isNew?: boolean };

/** The facts as one spoken phrase: "Open, until 6pm, 2 min walk, Blythe Road". */
export function shopFactsLabel({ state, detail, walk, street, delivers, isNew }: ShopFacts): string {
  const word = state === 'open' ? 'Open' : state === 'closesSoon' ? 'Closes soon' : 'Closed';
  return [word, detail, walk, street, delivers ? 'Delivers' : undefined, isNew ? 'New' : undefined].filter(Boolean).join(', ').replace(/\u00A0/g, ' ');
}

export type ShopMetaProps = ShopStatusProps & {
  /** "2 min walk", written with non-breaking spaces. */
  walk?: string;
  /** "Blythe Road". */
  street?: string;
  /** "Delivers" with the scooter: the shop delivers. A fact group like the walk and the street, on the same line. */
  delivers?: boolean;
  /** "New" with the sparkles: the shop is new on Snuffle. */
  isNew?: boolean;
  /** stacked: the status on its own line, the groups below (shop page header). inline: status and groups in one wrapping row (rows, tiles). */
  layout?: 'stacked' | 'inline';
};

/** One fact with its icon; it never breaks inside. */
function Group({ icon, text, size, color }: { icon: typeof Location01Icon; text: string; size: 'subheadline' | 'footnote'; color: ColorName }) {
  return (
    <View style={styles.group}>
      <Icon icon={icon} size={size} color={color} />
      <Text variant={size} color={color}>
        {text}
      </Text>
    </View>
  );
}

export const ShopMeta = memo(function ShopMeta({ state, detail, walk, street, delivers, isNew, size = 'footnote', layout = 'inline' }: ShopMetaProps) {
  const tile = useTileAccent();
  const secondary: ColorName = tile ? 'mutedForegroundOnTile' : 'mutedForeground';
  const place = (
    <>
      {walk ? <Group icon={FootprintsIcon} text={walk} size={size} color={secondary} /> : null}
      {street ? <Group icon={Location01Icon} text={street} size={size} color={secondary} /> : null}
    </>
  );
  const extras = (
    <>
      {delivers ? <Group icon={Scooter01Icon} text="Delivers" size={size} color={secondary} /> : null}
      {isNew ? <Group icon={SparklesIcon} text="New" size={size} color={secondary} /> : null}
    </>
  );
  // Four groups never fit one line of the shop page's header at 402 pt, and the fourth wrapped alone ("New" under the
  // street). In the stacked layout they are told in two rows instead, the place and then what the shop offers, each
  // with the same 12 pt between its groups; with three or fewer they flow as one wrapping row.
  const split = layout === 'stacked' && Boolean(walk) && Boolean(street) && Boolean(delivers) && Boolean(isNew);
  const groups = (
    <>
      {place}
      {extras}
    </>
  );
  const label = [state === 'open' ? 'Open' : state === 'closesSoon' ? 'Closes soon' : 'Closed', detail, walk, street, delivers ? 'Delivers' : undefined, isNew ? 'New' : undefined].filter(Boolean).join(', ').replace(/ /g, ' ');
  if (layout === 'stacked') {
    return (
      <View accessible accessibilityLabel={label} style={styles.stacked}>
        <ShopStatus state={state} detail={detail} size={size} />
        {split ? (
          <>
            <View style={styles.wrap}>{place}</View>
            <View style={styles.wrap}>{extras}</View>
          </>
        ) : (
          <View style={styles.wrap}>{groups}</View>
        )}
      </View>
    );
  }
  return (
    <View accessible accessibilityLabel={label} style={styles.wrap}>
      <ShopStatus state={state} detail={detail} size={size} />
      {groups}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  stacked: { gap: theme.space[1] },
  // Groups wrap whole, with 12 pt between them across and 4 pt between lines.
  wrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: theme.space[3], rowGap: theme.space[1] },
  group: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
}));
