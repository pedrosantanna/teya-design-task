import { memo, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeOut, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { withSpringToken } from '../../internal/layoutSpring';
import { Portal } from '../../internal/Portal';
import { cornerCurve } from '../../theme';
import { SnuffleMark } from '../SnuffleMark/SnuffleMark';
import { Text } from '../Text/Text';

export type NotificationProps = {
  /** The request name: "Eclipse glasses". */
  title: string;
  /** Snuffle's line: "Paper & Co on King Street has them too: £14.99 a pair." */
  body: string;
  /** "now" */
  time?: string;
  onPress?: () => void;
};

export type NotificationBannerProps = NotificationProps & {
  visible: boolean;
  /** Called when the banner times out (5 s) or is tapped. */
  onHide: () => void;
};

/**
 * A notification from Snuffle as the system draws it (components.md, Notification and Live Activity).
 * `Notification` is the card on its own (the lock screen); `NotificationBanner` drops it in from the top of
 * the screen while the app is open elsewhere. Both are simulated surfaces (decision 038): the web build
 * can't show real notifications. iOS: a glass card with the app icon. Android: a heads-up notification.
 */
export const Notification = memo(function Notification({ title, body, time = 'now', onPress }: NotificationProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const ios = theme.platform === 'ios';
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Snuffle, ${title}, ${body}`} accessibilityHint="Opens the request" onPress={onPress}>
      <FloatingSurface style={styles.card(ios)}>
        <View style={styles.row}>
          <SnuffleMark size={ios ? 'icon' : 'inline'} />
          <View style={styles.grow}>
            <View style={styles.meta}>
              <Text variant={ios ? 'subheadlineStrong' : 'caption1'} color={ios ? 'foreground' : 'mutedForeground'} numberOfLines={1}>
                {ios ? title : `Snuffle · ${time}`}
              </Text>
              {ios ? (
                <Text variant="caption1" color="mutedForeground">
                  {time}
                </Text>
              ) : null}
            </View>
            {ios ? null : (
              <Text variant="subheadlineStrong" numberOfLines={1}>
                {title}
              </Text>
            )}
            <Text variant="subheadline" numberOfLines={2}>
              {body}
            </Text>
          </View>
        </View>
      </FloatingSurface>
    </Pressable>
  );
});

const SHOWN_MS = 5000;

export const NotificationBanner = memo(function NotificationBanner({ visible, onHide, onPress, ...props }: NotificationBannerProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, SHOWN_MS);
    return () => clearTimeout(timer);
  }, [visible, onHide, props.body]);
  if (!visible) return null;
  return (
    <Portal>
      <View pointerEvents="box-none" style={styles.top(insets.top)}>
        <Animated.View
          key={props.body}
          entering={withSpringToken(new SlideInUp(), theme.spring.smooth)}
          exiting={theme.platform === 'ios' ? withSpringToken(new SlideOutUp(), theme.spring.smooth) : withSpringToken(new FadeOut(), theme.spring.fade)}
        >
          <Notification
            {...props}
            onPress={() => {
              onHide();
              onPress?.();
            }}
          />
        </Animated.View>
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create((theme) => ({
  card: (ios: boolean) => ({
    ...cornerCurve,
    borderRadius: ios ? theme.radius.bubble : theme.radius.card,
    padding: theme.space[3],
  }),
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.space[3] },
  grow: { flex: 1, gap: theme.space[1] / 2 },
  meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: theme.space[2] },
  top: (top: number) => ({
    position: 'absolute',
    top: top + theme.space[2],
    left: theme.space[2],
    right: theme.space[2],
    zIndex: 20,
  }),
}));
