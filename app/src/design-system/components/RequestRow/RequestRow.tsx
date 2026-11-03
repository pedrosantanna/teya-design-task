import { Image } from 'expo-image';
import { memo } from 'react';
import { Platform, Pressable, View, type AccessibilityActionEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { IMAGE_FILL } from '../../internal/media';
import { spoken } from '../../internal/PressableCard';
import { ShopPlaceholder } from '../../internal/ShopPlaceholder';
import { usePress } from '../../internal/usePress';
import { cornerCurve } from '../../theme';
import { Button } from '../Button/Button';
import { StatusLabel, Count, type StatusTone } from '../Tag/Tag';
import { Text } from '../Text/Text';

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
  /** The request placeholder or the answering shop's photo. */
  image?: string;
  /** Logos of the shops in the request, at most three. */
  shopLogos?: string[];
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
        <View style={styles.trailing(actionWidth)} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Pressable onPress={close} style={styles.closeAction}>
            <Text variant="subheadlineStrong" color="onDestructive">
              Close
            </Text>
          </Pressable>
        </View>
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
                {image ? <Image source={{ uri: image }} style={IMAGE_FILL} contentFit="cover" accessible={false} /> : <ShopPlaceholder name={name} tone="new" />}
              </View>
              {shopLogos.length > 0 ? (
                <View style={styles.logos}>
                  {shopLogos.slice(0, 3).map((uri) => (
                    <View key={uri} style={styles.logo}>
                      <Image source={{ uri }} style={IMAGE_FILL} contentFit="cover" accessible={false} />
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
    backgroundColor: theme.color.muted,
  },
  logos: { position: 'absolute', right: -theme.space[1], bottom: -theme.space[1], flexDirection: 'row-reverse' },
  logo: {
    width: theme.size.avatar.shopOnRow,
    height: theme.size.avatar.shopOnRow,
    borderRadius: theme.radius.full,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: theme.color.background,
    marginLeft: -theme.space[2],
    overflow: 'hidden',
    backgroundColor: theme.color.muted,
  },
  body: { flex: 1, gap: theme.gap.inside },
  titleLine: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  grow: { flex: 1 },
}));
