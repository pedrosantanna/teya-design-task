import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { spoken } from '../../internal/PressableCard';
import { usePress } from '../../internal/usePress';
import { cornerCurve, type ColorName } from '../../theme';
import { Icon } from '../Icon/Icon';
import type { RowPosition } from '../ShopRow/ShopRow';
import { Text } from '../Text/Text';

export type ListRowProps = {
  /** Passed back to `onPress`, so a list passes one stable handler. */
  id?: string;
  title: string;
  /** Footnote under the title, two lines at most. */
  detail?: string;
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
  const fill: ColorName = choice && selected ? 'onChipSelected' : 'foreground';
  const content = (
    <>
      <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
      {icon ? (
        <View style={styles.icon}>
          <Icon icon={icon} size="body" color={choice && selected ? 'onChipSelected' : 'mutedForeground'} />
        </View>
      ) : null}
      <View style={styles.text(grouped && position !== 'last' && position !== 'only')}>
        {children ? <View style={styles.grow}>{children}</View> : null}
        <View style={children ? styles.hidden : styles.grow}>
          <Text variant={strong || (choice && selected) ? 'headline' : 'body'} color={fill}>
            {title}
          </Text>
          {detail ? (
            <Text variant="footnote" color={choice && selected ? 'onChipSelected' : 'mutedForeground'} numberOfLines={3}>
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
          <View style={styles.check}>{selected ? <Icon icon={Tick02Icon} size="body" weight="strong" color="onChipSelected" /> : null}</View>
        ) : null}
      </View>
    </>
  );
  const label = accessibilityLabel ?? spoken(title, detail, value);
  if (!onPress) {
    return (
      <View accessible={!trailing && !children} accessibilityLabel={trailing || children ? undefined : label} style={styles.row(grouped, position, false, surface)}>
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
      style={styles.row(grouped, position, choice && !!selected, surface)}
    >
      {content}
    </Pressable>
  );
});

/** A grouped row on the screen background in light; on Muted in dark, where Background sits too close to Card. */
function groupedFill(theme: { scheme: string; color: { card: string; background: string; muted: string } }, surface: 'card' | 'background'): string {
  if (surface === 'background' && theme.scheme === 'dark') return theme.color.muted;
  return theme.color[surface];
}

const styles = StyleSheet.create((theme) => ({
  row: (grouped: boolean, position: RowPosition, selected: boolean, surface: 'card' | 'background' = 'card') => {
    const top = position === 'first' || position === 'only';
    const bottom = position === 'last' || position === 'only';
    const corner = grouped ? theme.radius.inner : theme.radius.none;
    return {
      ...cornerCurve,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[3],
      paddingLeft: theme.space[4],
      minHeight: theme.hit.min,
      backgroundColor: selected ? theme.color.chipSelected : grouped ? groupedFill(theme, surface) : 'transparent',
      borderTopLeftRadius: top ? corner : 0,
      borderTopRightRadius: top ? corner : 0,
      borderBottomLeftRadius: bottom ? corner : 0,
      borderBottomRightRadius: bottom ? corner : 0,
      overflow: 'hidden',
    };
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  icon: { width: theme.size.icon.bar, alignItems: 'center' },
  text: (separator: boolean) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    paddingVertical: theme.space[3],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: theme.color.separator,
  }),
  hidden: { display: 'none' },
  grow: { flex: 1, gap: theme.space[1] / 2 },
  check: { width: theme.size.icon.bar, alignItems: 'flex-end' },
}));
