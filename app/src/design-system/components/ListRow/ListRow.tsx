import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround, type GroundName } from '../../internal/ground';
import { spoken } from '../../internal/PressableCard';
import { cardShadow } from '../../internal/shadow';
import { usePress } from '../../internal/usePress';
import { cornerCurve, type ColorName } from '../../theme';
import { Icon } from '../Icon/Icon';
import type { RowPosition } from '../ShopRow/ShopRow';
import { ShopMeta, shopFactsLabel, type ShopFacts } from '../ShopMeta/ShopMeta';
import { Text } from '../Text/Text';

export type ListRowProps = {
  /** Passed back to `onPress`, so a list passes one stable handler. */
  id?: string;
  title: string;
  /** Footnote under the title, two lines at most. */
  detail?: string;
  /** A shop's status, walk and street under the title in place of `detail`, as ShopMeta draws them. */
  facts?: ShopFacts;
  /** A leading HugeIcons icon (Store, Truck, Map pin, Credit card). */
  icon?: IconSvgElement;
  /** Trailing text: a price or a value ("£14.99", "Within 15 min"). Never truncates. */
  value?: string;
  /** Strong value text, e.g. a total. */
  valueStrong?: boolean;
  /** Trailing content in place of `value`. */
  trailing?: ReactNode;
  /** Content that fills the row in place of title, detail and value: a stepper with its own label. */
  children?: ReactNode;
  /** Single choice in a group (the details sheet's ways to get it): a check and a selected fill. */
  selected?: boolean;
  /** Title in Headline instead of Body (the chosen option). */
  strong?: boolean;
  position?: RowPosition;
  /** A chevron at the trailing end (iOS only; Material lists have none), for rows that open something. */
  chevron?: boolean;
  /** iOS fill: Card on the screen's Background (default), or Background for a list inside a card (shop page). */
  surface?: 'card' | 'background';
  onPress?: (id: string) => void;
  accessibilityLabel?: string;
};

/**
 * A row in a grouped list: the details sheet, the receipt, Keep looking. iOS: an inset grouped list on
 * Card with separators inset to the text. Android: a Material list item, no fill.
 */
export const ListRow = memo(function ListRow({
  id = '',
  title,
  detail,
  facts,
  icon,
  value,
  valueStrong = false,
  trailing,
  children,
  selected,
  strong = false,
  position = 'only',
  chevron = false,
  surface = 'card',
  onPress,
  accessibilityLabel,
}: ListRowProps) {
  const { theme } = useUnistyles();
  const press = usePress(selected === undefined ? undefined : 'selection');
  const grouped = theme.platform === 'ios';
  const choice = selected !== undefined;
  const fill: ColorName = 'foreground';
  const ground = useGround();
  const content = (
    <>
      <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
      {icon ? (
        // The icon sits on the title's first line, so a two-line row doesn't centre it between lines (visual critique 3);
        // on a one-line row that is the middle anyway.
        <View style={[styles.icon, !children ? styles.iconFirstLine(strong || (choice && !!selected) ? 'headline' : 'body') : null]}>
          <Icon icon={icon} size="body" color={choice && selected ? 'foreground' : 'mutedForeground'} />
        </View>
      ) : null}
      <View style={styles.text(grouped && position !== 'last' && position !== 'only', ground)}>
        {children ? <View style={styles.grow}>{children}</View> : null}
        <View style={children ? styles.hidden : styles.grow}>
          <Text variant={strong || (choice && selected) ? 'headline' : 'body'} color={fill}>
            {title}
          </Text>
          {facts ? <ShopMeta {...facts} /> : null}
          {detail && !facts ? (
            <Text variant="footnote" color="mutedForeground" numberOfLines={3}>
              {detail}
            </Text>
          ) : null}
        </View>
        {trailing ?? null}
        {value && !trailing ? (
          <Text variant={valueStrong ? 'headline' : 'body'} color={valueStrong ? 'foreground' : 'mutedForeground'}>
            {value}
          </Text>
        ) : null}
        {chevron && grouped ? <Icon icon="chevron" size="body" color="mutedForeground" /> : null}
        {choice ? (
          <View style={styles.check}>{selected ? <Icon icon={Tick02Icon} size="body" weight="strong" color="foreground" /> : null}</View>
        ) : null}
      </View>
    </>
  );
  const label = accessibilityLabel ?? spoken(title, facts ? shopFactsLabel(facts) : detail, value);
  if (!onPress) {
    return (
      <View accessible={!trailing && !children} accessibilityLabel={trailing || children ? undefined : label} style={styles.row(grouped, position, false, surface, ground)}>
        {content}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole={choice ? 'radio' : 'button'}
      accessibilityState={choice ? { checked: selected, selected } : undefined}
      accessibilityLabel={label}
      onPress={() => onPress(id)}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={styles.row(grouped, position, choice && !!selected, surface, ground)}
    >
      {content}
    </Pressable>
  );
});

/** A grouped row on the screen background in light; on Muted in dark, where Background sits too close to Card.
 *  Inside a sheet the row sits one level above the sheet's ground: Card in light (1.39:1 on #DEDAD5), Muted in dark
 *  (1.40:1 on #191715, where Card would be 1.17:1). */
function groupedFill(theme: { scheme: string; color: { card: string; background: string; muted: string; shopPage: { row: string } } }, surface: 'card' | 'background', ground?: GroundName): string {
  if (ground === 'shop') return theme.color.shopPage.row;
  if (ground === 'sheet') return theme.scheme === 'dark' ? theme.color.muted : theme.color.card;
  if (surface === 'background' && theme.scheme === 'dark') return theme.color.muted;
  return theme.color[surface];
}

/** The dark Separator is the Muted colour, so on a sheet's Muted rows the separator takes Border (#403D3A). */
function separatorOn(theme: { scheme: string; color: { separator: string; border: string } }, ground?: GroundName): string {
  return (ground === 'sheet' || ground === 'shop') && theme.scheme === 'dark' ? theme.color.border : theme.color.separator;
}

export type ListGroupProps = {
  children: ReactNode;
  shadow?: boolean;
  /** card: a standalone grouped list on a screen (the Category screen's shop rows) takes radius.card, as a card does
   *  (shape.md); its rows round their first and last corners to match. */
  corner?: 'inner' | 'card';
};

/** Holds the rows of one grouped list. With `shadow`, the group lifts off a same-coloured ground with the delicate
 *  card shadow (the shop page, where Card rows sit on a Background card), instead of a lighter step. */
export function ListGroup({ children, shadow = false, corner = 'inner' }: ListGroupProps) {
  const ground = useGround();
  const inSheet = ground === 'sheet';
  const inShop = ground === 'shop';
  return <View style={[styles.group, inSheet && styles.groupInSheet, corner === 'card' && styles.groupCard, shadow && !inShop && styles.groupShadow, inShop && styles.groupShop]}>{children}</View>;
}

export type ListBlockProps = { children: ReactNode; position?: RowPosition; surface?: 'card' | 'background'; accessibilityLabel?: string };

/** Free content inside a grouped list: a padded block with the row's fill, corners and separator, so a summary or a
 *  row of chips sits in the same card as the rows under it (the shop page's sections). */
export function ListBlock({ children, position = 'only', surface = 'card', accessibilityLabel }: ListBlockProps) {
  const { theme } = useUnistyles();
  const ground = useGround();
  const grouped = theme.platform === 'ios';
  return (
    <View accessibilityLabel={accessibilityLabel} style={[styles.row(grouped, position, false, surface, ground), styles.block]}>
      <View style={styles.blockInner(grouped && position !== 'last' && position !== 'only', ground)}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  block: { alignItems: 'stretch' },
  blockInner: (separator: boolean, ground?: GroundName) => ({
    flex: 1,
    gap: theme.gap.block,
    paddingVertical: theme.space[4],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: separatorOn(theme, ground),
  }),
  group: { ...cornerCurve, borderRadius: theme.radius.inner },
  groupInSheet: { borderRadius: theme.radius.bubble },
  groupCard: { borderRadius: theme.radius.card },
  // On the shop page's card the rows step down from white to an off-white, and a 1 pt hairline makes them register.
  groupShop: { borderWidth: 1, borderColor: theme.color.shopPage.rowEdge },
  groupShadow: { boxShadow: cardShadow(theme) },
  row: (grouped: boolean, position: RowPosition, selected: boolean, surface: 'card' | 'background' = 'card', ground?: GroundName) => {
    const top = position === 'first' || position === 'only';
    const bottom = position === 'last' || position === 'only';
    // Inside a sheet the group takes the iOS 26 inset-grouped corner (radius.bubble, shape.md, Sheets): the sheet's
    // own 32 pt corners made the 12 pt group read as a different family.
    const corner = grouped ? (ground === 'sheet' ? theme.radius.bubble : theme.radius.inner) : theme.radius.none;
    return {
      ...cornerCurve,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[3],
      paddingLeft: theme.space[4],
      minHeight: theme.hit.min,
      // Selected keeps the row's fill: the tick and the semibold title carry the choice (colour.md, craft-pass-2).
      backgroundColor: grouped ? groupedFill(theme, surface, ground) : 'transparent',
      borderTopLeftRadius: top ? corner : 0,
      borderTopRightRadius: top ? corner : 0,
      borderBottomLeftRadius: bottom ? corner : 0,
      borderBottomRightRadius: bottom ? corner : 0,
      overflow: 'hidden',
    };
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  icon: { width: theme.size.icon.bar, alignItems: 'center' },
  iconFirstLine: (variant: 'headline' | 'body') => ({
    alignSelf: 'flex-start',
    marginTop: theme.space[3],
    height: theme.type[variant].lineHeight,
    justifyContent: 'center',
  }),
  text: (separator: boolean, ground?: GroundName) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    paddingVertical: theme.space[3],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: separatorOn(theme, ground),
  }),
  hidden: { display: 'none' },
  grow: { flex: 1, gap: theme.space[1] / 2 },
  check: { width: theme.size.icon.bar, alignItems: 'flex-end' },
}));
