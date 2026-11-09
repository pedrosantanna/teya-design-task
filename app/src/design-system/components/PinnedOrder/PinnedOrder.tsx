import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import DeliveryTruck01Icon from '@hugeicons/core-free-icons/DeliveryTruck01Icon';
import Store01Icon from '@hugeicons/core-free-icons/Store01Icon';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Ground } from '../../internal/ground';
import { spoken } from '../../internal/PressableCard';
import { usePress } from '../../internal/usePress';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { CrossFade } from '../../internal/CrossFade';
import { Icon } from '../Icon/Icon';
import type { NavBarScroll } from '../NavBar/NavBar';
import { StatusLabel, type StatusTone } from '../Tag/Tag';
import { Text } from '../Text/Text';

export type PinnedOrderProps = {
  /** The order's label from the state table ("Ready · collect by Mon 9 Nov"). */
  status: string;
  tone?: StatusTone;
  shop: string;
  /** "2 × eclipse glasses" */
  items: string;
  /** The shop's accent: the leading square is the shop's colour (colour roles, screen review 19). */
  accent: ShopAccentName;
  /** Collect or delivery: the symbol in the leading square. */
  fulfilment?: 'collect' | 'delivery';
  /** Opens the receipt. */
  onPress: () => void;
  /** Screen margin. */
  margin: number;
  /** The chat's scroll and the nav bar's `backgroundAt`: the strip's fill and edge follow the bar's, so the two read as
   *  one bar (filled while the conversation is under them, clear when it is pulled away). */
  scroll?: NavBarScroll;
  backgroundAt?: number;
};

/**
 * The order pinned under the chat's nav bar (components.md, Pinned order): once a request has an order, its status,
 * shop and items stay in view whatever the scroll, and one tap opens the receipt, where the collection code is.
 */
export const PinnedOrder = memo(function PinnedOrder({ status, tone = 'default', shop, items, accent, fulfilment = 'collect', onPress, margin, scroll, backgroundAt = 0 }: PinnedOrderProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const ios = theme.platform === 'ios';
  const scrollY = scroll?.scrollY;
  const step = theme.space[2];
  // The same curve as NavBar's solid fill (NavBar.tsx, backgroundStyle).
  const fillStyle = useAnimatedStyle(() => ({
    opacity: scrollY ? interpolate(scrollY.get(), [backgroundAt - step, backgroundAt], [0, 1], Extrapolation.CLAMP) : 1,
  }));
  const label = spoken('Order', shop, items, status);

  return (
    <View style={styles.bar}>
      <Animated.View pointerEvents="none" style={[styles.fill, fillStyle]} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint="Opens the receipt"
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.row(margin)}
      >
        <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
        <View style={styles.thumb(accent)}>
          <Ground value="tile" accent={accent}>
            <Icon icon={fulfilment === 'delivery' ? DeliveryTruck01Icon : Store01Icon} size="bar" color="foreground" />
          </Ground>
        </View>
        <View style={styles.grow} accessibilityLiveRegion="polite">
          {/* What was bought first, then where it stands, tight together as one unit. "Waiting for Paper & Co" already
              names the shop: the first line then holds the items alone. */}
          <Text variant="subheadline" numberOfLines={1}>
            {status.includes(shop) ? items : `${shop}, ${items}`}
          </Text>
          <CrossFade token={`${tone}|${status}`}>
            <StatusLabel label={status} tone={tone} />
          </CrossFade>
        </View>
        {ios ? <Icon icon={ArrowRight01Icon} size="caption1" color="mutedForeground" /> : null}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  // Full width under the nav bar, in the bar's own fill and edge (the chat's ground and its darker hairline). It reaches
  // up over the bar's hairline, so the bar and the strip read as one surface with one edge at the bottom.
  fill: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: -StyleSheet.hairlineWidth,
    backgroundColor: theme.color.chat.ground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.color.chat.groundEdge,
  },
  row: (margin: number) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    minHeight: theme.hit.min,
    paddingHorizontal: margin,
    paddingTop: theme.space[1],
    paddingBottom: theme.space[3],
  }),
  // The press area starts space.1 under the bar, so it keeps 8 or more from Back and the photo (screen review 15).
  bar: { paddingTop: theme.space[1] },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  thumb: (accent: ShopAccentName) => ({
    ...cornerCurve,
    width: theme.size.avatar.shop,
    height: theme.size.avatar.shop,
    borderRadius: theme.radius.inner,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.shop.accent[accent].tile,
  }),
  // No gap: the two lines read as one unit (Gestalt proximity), their own leading is the only space between them.
  grow: { flex: 1 },
}));
