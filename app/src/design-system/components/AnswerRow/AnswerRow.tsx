import CancelCircleIcon from '@hugeicons/core-free-icons/CancelCircleIcon';
import Clock01Icon from '@hugeicons/core-free-icons/Clock01Icon';
import EyeIcon from '@hugeicons/core-free-icons/EyeIcon';
import FlashIcon from '@hugeicons/core-free-icons/FlashIcon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';
import { View } from 'react-native';
import { useGround } from '../../internal/ground';
import { StyleSheet } from 'react-native-unistyles';

import { CrossFade } from '../../internal/CrossFade';
import { ShopLink } from '../../internal/ShopLink';
import { spoken } from '../../internal/PressableCard';
import { type ColorName } from '../../theme';
import { Icon } from '../Icon/Icon';
import type { RowPosition } from '../ShopRow/ShopRow';
import { StatusLabel } from '../Tag/Tag';
import { Text } from '../Text/Text';

/** How the row's status reads: still waiting, a yes (from a reply or the till), or a no. */
export type AnswerRowKind = 'asked' | 'seen' | 'yes' | 'till' | 'no';

export type AnswerRowProps = {
  shop: string;
  street: string;
  /** The compact form of the answer's label: "Asked", "Seen", "In stock now · 1 of 2", "Doesn't have them". */
  status: string;
  kind: AnswerRowKind;
  position?: RowPosition;
  /** Tap on the shop's name: opens the shop's page. The rest of the row stays still. */
  onOpenShop?: () => void;
};

const icons: Record<AnswerRowKind, IconSvgElement> = {
  asked: Clock01Icon,
  seen: EyeIcon,
  yes: Tick02Icon,
  till: FlashIcon,
  no: CancelCircleIcon,
};

/**
 * An answer on the asking list (conceptual model: "Rows while asking"): shop, street and the answer's
 * status with a symbol. The status cross-fades with spring.status when it changes. The shop's name opens the shop's page; the full
 * answer cards in the chat are where the shopper acts.
 */
export const AnswerRow = memo(function AnswerRow({ shop, street, status, kind, position = 'only', onOpenShop }: AnswerRowProps) {
  const onChat = useGround() === 'chat';
  // Painted on both platforms (platforms.md, parity): a Material 3 list sits in the same card role as the iOS grouped list,
  // so a row on a tile is cardOnTile on Android too, never the bare tile.
  const grouped = true;
  const good = kind === 'yes' || kind === 'till';
  const color: ColorName = good ? 'success' : 'mutedForeground';

  return (
    <View
      accessible
      accessibilityLabel={spoken(shop, street, kind === 'till' ? `${status}, from the shop's till` : status)}
      accessibilityActions={onOpenShop ? [{ name: 'viewShop', label: 'View shop' }] : undefined}
      onAccessibilityAction={onOpenShop ? () => onOpenShop() : undefined}
      accessibilityLiveRegion="polite"
      style={styles.row(grouped, position, onChat)}>
      <View style={styles.text(grouped && position !== 'last' && position !== 'only')}>
        <View style={styles.grow}>
          {onOpenShop ? (
            <ShopLink name={shop} variant="subheadlineStrong" onPress={onOpenShop} />
          ) : (
            <Text variant="subheadlineStrong" numberOfLines={1}>
              {shop}
            </Text>
          )}
          <Text variant="footnote" color="mutedForeground" numberOfLines={1}>
            {street}
          </Text>
        </View>
        <View style={styles.statusBox}>
          <CrossFade token={`${kind}|${status}`} align="end">
            <View style={styles.status}>
              <Icon icon={icons[kind]} size="caption1" color={color} />
              <StatusLabel label={status} tone={good ? 'default' : 'quiet'} />
            </View>
          </CrossFade>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: (grouped: boolean, position: RowPosition, onChat = false) => {
    const top = position === 'first' || position === 'only';
    const bottom = position === 'last' || position === 'only';
    const corner = grouped ? theme.radius.card : theme.radius.none;
    return {
      paddingLeft: theme.space[4],
      // On a chat's white ground the group takes the chat fill (Background in light), so it still reads as a group.
      backgroundColor: grouped ? (onChat ? theme.color.chat.fill : theme.color.card) : 'transparent',
      borderTopLeftRadius: top ? corner : 0,
      borderTopRightRadius: top ? corner : 0,
      borderBottomLeftRadius: bottom ? corner : 0,
      borderBottomRightRadius: bottom ? corner : 0,
    };
  },
  text: (separator: boolean) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    paddingVertical: theme.space[3],
    paddingRight: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: theme.color.separator,
  }),
  grow: { flex: 1, gap: theme.space[1] / 2 },
  statusBox: { maxWidth: '55%' },
  status: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
}));
