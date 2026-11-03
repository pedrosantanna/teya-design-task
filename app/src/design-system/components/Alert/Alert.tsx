import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { withSpringToken } from '../../internal/layoutSpring';
import { Portal } from '../../internal/Portal';
import { cornerCurve } from '../../theme';
import { Text } from '../Text/Text';

export type AlertAction = {
  label: string;
  /** cancel: the safe choice (bold on iOS). destructive: red. default: the confirming action. */
  style?: 'default' | 'cancel' | 'destructive';
  onPress: () => void;
};

export type AlertProps = {
  visible: boolean;
  title: string;
  message?: string;
  /** One or two actions, in reading order (the cancel action first on iOS, as the system does). */
  actions: AlertAction[];
  /** Called when the scrim is tapped on Android (Material dialogs close outside); iOS alerts don't. */
  onDismiss?: () => void;
};

/**
 * A system alert, drawn so it stays inside the phone frame on the web (states.md: alerts sit above sheets).
 * iOS: a centred alert with the actions side by side, the destructive one in red. Android: a Material dialog
 * with text buttons at the end.
 */
export const Alert = memo(function Alert({ visible, title, message, actions, onDismiss }: AlertProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  if (!visible) return null;
  const ios = theme.platform === 'ios';
  const run = (action: AlertAction) => {
    if (action.style === 'destructive') haptic('warning');
    action.onPress();
  };

  return (
    <Portal>
      <Animated.View entering={withSpringToken(new FadeIn(), theme.spring.fade)} exiting={withSpringToken(new FadeOut(), theme.spring.fade)} style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          disabled={ios || !onDismiss}
          onPress={onDismiss}
          style={styles.scrim}
        />
        <Animated.View entering={withSpringToken(new ZoomIn(), theme.spring.snappy)} style={styles.box(ios)} accessibilityViewIsModal accessibilityRole="alert">
          <View style={styles.body(ios)}>
            <Text variant={ios ? 'headline' : 'title3'} align={ios ? 'center' : 'left'} accessibilityRole="header">
              {title}
            </Text>
            {message ? (
              <Text variant={ios ? 'footnote' : 'subheadline'} color={ios ? 'foreground' : 'mutedForeground'} align={ios ? 'center' : 'left'}>
                {message}
              </Text>
            ) : null}
          </View>
          <View style={styles.actions(ios)}>
            {actions.map((action, i) => (
              <Pressable
                key={action.label}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                onPress={() => run(action)}
                style={({ pressed }) => [styles.action(ios, i > 0), pressed && styles.pressed]}
              >
                <Text
                  variant={ios ? (action.style === 'cancel' ? 'headline' : 'body') : 'subheadlineStrong'}
                  color={action.style === 'destructive' ? 'destructive' : 'tint'}
                  align="center"
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Portal>
  );
});

const styles = StyleSheet.create((theme) => ({
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.scrim, opacity: theme.state.scrim },
  box: (ios: boolean) => ({
    ...cornerCurve,
    width: ios ? '72%' : '86%',
    borderRadius: ios ? theme.radius.bubble : theme.radius.card,
    backgroundColor: theme.color.card,
    overflow: 'hidden',
  }),
  body: (ios: boolean) => ({
    gap: ios ? theme.space[1] : theme.space[4],
    paddingHorizontal: ios ? theme.space[4] : theme.inset.sheet,
    paddingTop: ios ? theme.space[5] : theme.inset.sheet,
    paddingBottom: ios ? theme.space[4] : theme.space[5],
  }),
  actions: (ios: boolean) => ({
    flexDirection: 'row',
    justifyContent: ios ? 'center' : 'flex-end',
    gap: ios ? 0 : theme.space[2],
    borderTopWidth: ios ? StyleSheet.hairlineWidth : 0,
    borderTopColor: theme.color.separator,
    paddingHorizontal: ios ? 0 : theme.space[4],
    paddingBottom: ios ? 0 : theme.space[4],
  }),
  action: (ios: boolean, divided: boolean) => ({
    flex: ios ? 1 : undefined,
    minHeight: theme.hit.min,
    justifyContent: 'center',
    paddingHorizontal: ios ? theme.space[2] : theme.space[3],
    borderLeftWidth: ios && divided ? StyleSheet.hairlineWidth : 0,
    borderLeftColor: theme.color.separator,
    borderRadius: ios ? 0 : theme.radius.full,
  }),
  pressed: { backgroundColor: theme.color.muted },
}));
