import { Image } from 'expo-image';
import { memo } from 'react';
import { Platform, Pressable, View, type AccessibilityActionEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { IMAGE_OVER, photoSource, type PhotoSource } from '../../internal/media';
import { spoken } from '../../internal/PressableCard';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { usePress } from '../../internal/usePress';
import { cornerCurve, type ShopAccentName } from '../../theme';
import { Button } from '../Button/Button';
import { StatusLabel, Count, type StatusTone } from '../Tag/Tag';
import { Text } from '../Text/Text';

/** A shop on a request row: its name (initials), its accent and, if it has one, a logo. */
export type RequestRowShop = { name: string; accent?: ShopAccentName; logo?: PhotoSource };

export type RequestRowProps = {
  id: string;
  /** "Birthday cake" */
  name: string;
  /** "11:02am" */
  time: string;
  /** With its speaker: "Snuffle: Rossi's can do it with 2 days' notice." */
  preview: string;
  status: string;
  tone?: StatusTone;
  /** The item's photo; without one, a tonal tile in `accent`. */
  image?: PhotoSource;
  /** Accent of the tile behind the item photo: the shop's accent once there is an order, else Butter. */
  accent?: ShopAccentName;
  /** The shops that answered: at most two 20 pt circles in their accents with their initials (or a logo), then "+1". */
  shopLogos?: RequestRowShop[];
  /** Unread answers. */
  unread?: number;
  /** Only when the request needs the shopper: "Buy at Rossi's". */
  actionLabel?: string;
  onAction?: (id: string) => void;
  onPress?: (id: string) => void;
  /** Close, as a trailing swipe on iOS and a long-press on Android. */
  onClose?: (id: string) => void;
};

export const RequestRow = memo(function RequestRow({
  id,
  name,
  time,
  preview,
  status,
  tone = 'default',
  image,
  accent,
  shopLogos = [],
  unread = 0,
  actionLabel,
  onAction,
  onPress,
  onClose,
}: RequestRowProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const offset = useSharedValue(0);
  const actionWidth = theme.hit.min * 2;
  const snappy = theme.spring.snappy;
  const ios = theme.platform === 'ios';

  const close = () => {
    offset.set(withSpring(0, snappy));
    onClose?.(id);
  };
  const reveal = () => {
    haptic('selection');
    offset.set(withSpring(offset.get() < 0 ? 0 : -actionWidth, snappy));
  };

  // iOS: trailing swipe reveals Close. Android: a long-press reveals the same action (the long-press menu).
  const pan = Gesture.Pan()
    .enabled(ios && !!onClose)
    .activeOffsetX([-12, 12])
    .failOffsetY([-8, 8])
    .onChange((e) => {
      offset.set(Math.min(0, Math.max(-actionWidth * 1.5, offset.get() + e.changeX)));
    })
    .onEnd((e) => {
      const open = offset.get() < -actionWidth / 2 || e.velocityX < -500;
      offset.set(withSpring(open ? -actionWidth : 0, { ...snappy, velocity: e.velocityX }));
      if (open) scheduleOnRN(haptic, 'selection');
    });

  const rowStyle = useAnimatedStyle(() => ({ transform: [{ translateX: offset.get() }] }));
  // The action shows only while the row is moved: at rest its red edge bled past the row's antialiased edges on the web.
  const trailingStyle = useAnimatedStyle(() => ({ opacity: offset.get() < 0 ? 1 : 0 }));

  const label = spoken(name, status, preview, time, unread > 0 ? `${unread} new` : undefined);
  const actions = [
    ...(actionLabel && onAction ? [{ name: 'action', label: actionLabel }] : []),
    ...(onClose ? [{ name: 'close', label: 'Close' }] : []),
  ];
  const onAccessibilityAction = (e: AccessibilityActionEvent) => {
    if (e.nativeEvent.actionName === 'action') onAction?.(id);
    if (e.nativeEvent.actionName === 'close') onClose?.(id);
  };

  return (
    <View style={styles.clip}>
      {onClose ? (
        <Animated.View style={[styles.trailing(actionWidth), trailingStyle]} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Pressable onPress={close} style={styles.closeAction}>
            <Text variant="subheadlineStrong" color="onDestructive">
              Close
            </Text>
          </Pressable>
        </Animated.View>
      ) : null}
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.surface, rowStyle]}>
          <Pressable
            accessible
            accessibilityRole={Platform.OS === 'web' ? undefined : 'button'}
            accessibilityLabel={label}
            accessibilityActions={actions}
            onAccessibilityAction={onAccessibilityAction}
            onPress={onPress ? () => onPress(id) : undefined}
            onLongPress={!ios && onClose ? reveal : undefined}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
            style={styles.row}
          >
            <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
            <View>
              <View style={styles.thumb}>
                <ShopPlaceholder name={name} accent={accent} />
                {image ? <Image source={photoSource(image)} style={IMAGE_OVER} contentFit="cover" accessible={false} /> : null}
              </View>
              {shopLogos.length > 0 ? (
                <View style={styles.logos}>
                  {shopLogos.length > 2 ? (
                    <View style={styles.more}>
                      <Text variant="caption2" color="foreground">{`+${shopLogos.length - 2}`}</Text>
                    </View>
                  ) : null}
                  {shopLogos
                    .slice(0, 2)
                    .reverse()
                    .map((shop) => (
                      <View key={shop.name} style={styles.logo}>
                        <ShopPlaceholder name={shop.name} accent={shop.accent} size="tiny" round />
                        {shop.logo ? <Image source={photoSource(shop.logo)} style={IMAGE_OVER} contentFit="cover" accessible={false} /> : null}
                      </View>
                    ))}
                </View>
              ) : null}
            </View>
            <View style={styles.body}>
              <View style={styles.titleLine}>
                <View style={styles.grow}>
                  <Text variant="headline" numberOfLines={1}>
                    {name}
                  </Text>
                </View>
                <Text variant="caption1" color="mutedForeground">
                  {time}
                </Text>
              </View>
              <View style={styles.titleLine}>
                <View style={styles.grow}>
                  <Text variant="subheadline" color="mutedForeground" numberOfLines={2}>
                    {preview}
                  </Text>
                </View>
                <Count value={unread} />
              </View>
              <StatusLabel label={status} tone={tone} />
              {actionLabel ? (
                <View importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
                  <Button label={actionLabel} size="compact" onPress={onAction ? () => onAction(id) : undefined} />
                </View>
              ) : null}
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  clip: { overflow: 'hidden' },
  trailing: (width: number) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width,
    backgroundColor: theme.color.destructive,
  }),
  closeAction: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  surface: { backgroundColor: theme.color.background },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.space[3], padding: theme.space[4] },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  thumb: {
    ...cornerCurve,
    width: theme.size.thumb.request,
    height: theme.size.thumb.request,
    borderRadius: theme.radius.inner,
    overflow: 'hidden',
  },
  // At most two circles and "+1", overlapping the thumb's bottom right corner; each has a 2 pt ring in the
  // Background colour so it cuts out of the photo (craft-pass-2). They overlap by 6 pt, the left one on top, so the
  // second circle's initials stay clear (visual critique 2).
  logos: { position: 'absolute', right: -theme.space[1], bottom: -theme.space[1], flexDirection: 'row-reverse' },
  logo: {
    width: theme.size.avatar.shopOnRow + 2 * theme.size.askBar.ring,
    height: theme.size.avatar.shopOnRow + 2 * theme.size.askBar.ring,
    borderRadius: theme.radius.full,
    borderWidth: theme.size.askBar.ring,
    borderColor: theme.color.background,
    marginLeft: -(theme.space[1] + theme.space[1] / 2),
    overflow: 'hidden',
  },
  more: {
    minWidth: theme.size.avatar.shopOnRow + 2 * theme.size.askBar.ring,
    height: theme.size.avatar.shopOnRow + 2 * theme.size.askBar.ring,
    borderRadius: theme.radius.full,
    borderWidth: theme.size.askBar.ring,
    borderColor: theme.color.background,
    backgroundColor: theme.color.card,
    paddingHorizontal: theme.space[1],
    marginLeft: -(theme.space[1] + theme.space[1] / 2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: theme.gap.inside },
  titleLine: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  grow: { flex: 1 },
}));
