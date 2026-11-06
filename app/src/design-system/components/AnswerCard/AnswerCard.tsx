import Calendar03Icon from '@hugeicons/core-free-icons/Calendar03Icon';
import Navigation03Icon from '@hugeicons/core-free-icons/Navigation03Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { Image } from 'expo-image';
import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { CrossFade } from '../../internal/CrossFade';
import { PressableCard, spoken, type CardAction } from '../../internal/PressableCard';
import { ShopLink } from '../../internal/ShopLink';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { StatusLabel } from '../Tag/Tag';
import { Text } from '../Text/Text';

export type AnswerAction = 'buy' | 'showMe' | 'none';

export type AnswerCardProps = {
  id: string;
  shop: string;
  /** What the shop has, from the state table: "Has them", "In stock now · 1 of 2". */
  status: string;
  /** Where the answer came from: "replied 2 min ago", "from the shop's till". Follows the status on its line. */
  source?: string;
  /** A leading icon on the status line (FlashIcon for answers from the till). */
  statusIcon?: IconSvgElement;
  price: string;
  /** "13 min walk" */
  walk: string;
  /** "Collect by Mon 9 Nov" */
  collectBy: string;
  /** The answering shop's photo (never an item photo). Without one, the shop's tonal tile shows. */
  image?: PhotoSource;
  /** The shop's accent (colour.md, Shop accents): the tile behind or instead of the photo. */
  accent?: ShopAccentName;
  /** buy: Buy (or `buyLabel`). showMe: Show me with No thanks. none: no action row. */
  action?: AnswerAction;
  buyLabel?: string;
  /** Only the best answer's Buy is filled (Indigo); the others are tonal, in neutral colours. */
  best?: boolean;
  /** Spoken label; by default built from the visible text. */
  accessibilityLabel?: string;
  /** Tap on the card: opens the details sheet, as Buy does. */
  onOpen?: (id: string) => void;
  /** Tap on the shop's name: opens the shop's page. Also a custom accessibility action, "View shop". */
  onOpenShop?: (id: string) => void;
  onBuy?: (id: string) => void;
  onShowMe?: (id: string) => void;
  onDismiss?: (id: string) => void;
  /** Arrives in the chat with spring.arrive. */
  animateIn?: boolean;
};

export const AnswerCard = memo(function AnswerCard({
  id,
  shop,
  status,
  source,
  statusIcon,
  price,
  walk,
  collectBy,
  image,
  accent,
  action = 'buy',
  buyLabel = 'Buy',
  best = false,
  accessibilityLabel,
  onOpen,
  onOpenShop,
  onBuy,
  onShowMe,
  onDismiss,
  animateIn,
}: AnswerCardProps) {
  const statusLine = source ? `${status} · ${source}` : status;
  const actions: CardAction[] = [];
  if (onOpenShop) actions.push({ name: 'viewShop', label: 'View shop', run: () => onOpenShop(id) });
  if (action === 'buy' && onBuy) actions.push({ name: 'buy', label: buyLabel, run: () => onBuy(id) });
  if (action === 'showMe') {
    if (onShowMe) actions.push({ name: 'showMe', label: 'Show me', run: () => onShowMe(id) });
    if (onDismiss) actions.push({ name: 'dismiss', label: 'No thanks', run: () => onDismiss(id) });
  }

  return (
    <PressableCard
      accessibilityLabel={accessibilityLabel ?? spoken(shop, statusLine, price, walk, collectBy)}
      onPress={onOpen ? () => onOpen(id) : undefined}
      actions={actions}
      animateIn={animateIn}
    >
      <View style={styles.head}>
        <View style={styles.thumb}>
          <ShopPlaceholder name={shop} accent={accent} size="small" />
          {image ? <Image source={photoSource(image)} style={IMAGE_OVER} contentFit="cover" accessible={false} /> : null}
        </View>
        <View style={styles.title}>
          {onOpenShop ? (
            <ShopLink name={shop} onPress={() => onOpenShop(id)} />
          ) : (
            <Text variant="headline" numberOfLines={1}>
              {shop}
            </Text>
          )}
          <View style={styles.statusLine}>
            <CrossFade token={statusLine}>
              <View style={styles.statusRow}>
                {statusIcon ? <Icon icon={statusIcon} size="footnote" color="mutedForeground" /> : null}
                <View style={styles.grow}>
                  <StatusLabel label={statusLine} />
                </View>
              </View>
            </CrossFade>
          </View>
        </View>
        <Text variant="headline">{price}</Text>
      </View>
      <View style={styles.meta}>
        <View style={styles.fact}>
          <Icon icon={Navigation03Icon} size="footnote" color="mutedForeground" />
          <Text variant="footnote" color="mutedForeground">
            {walk}
          </Text>
        </View>
        <View style={styles.fact}>
          <Icon icon={Calendar03Icon} size="footnote" color="mutedForeground" />
          <Text variant="footnote" color="mutedForeground" numberOfLines={1}>
            {collectBy}
          </Text>
        </View>
      </View>
      {action === 'buy' ? (
        <View importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Button label={buyLabel} role={best ? 'filled' : 'tonal'} size="compact" onPress={onBuy ? () => onBuy(id) : undefined} />
        </View>
      ) : null}
      {action === 'showMe' ? (
        <View style={styles.actions} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Button label="Show me" role="tonal" size="compact" onPress={onShowMe ? () => onShowMe(id) : undefined} />
          <Button label="No thanks" role="plain" size="compact" onPress={onDismiss ? () => onDismiss(id) : undefined} />
        </View>
      ) : null}
    </PressableCard>
  );
});

const styles = StyleSheet.create((theme) => ({
  head: { flexDirection: 'row', alignItems: 'center', gap: theme.space[3] },
  thumb: {
    ...cornerCurve,
    width: theme.size.thumb.answer,
    height: theme.size.thumb.answer,
    borderRadius: theme.radius.inner,
    overflow: 'hidden',
  },
  title: { flex: 1, minWidth: 0, gap: theme.space[1] },
  statusLine: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1], minWidth: 0 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  grow: { flexShrink: 1 },
  meta: { flexDirection: 'row', flexWrap: 'wrap', columnGap: theme.space[4], rowGap: theme.space[1] },
  fact: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1], flexShrink: 1 },
  actions: { flexDirection: 'row', gap: theme.space[2] },
}));
