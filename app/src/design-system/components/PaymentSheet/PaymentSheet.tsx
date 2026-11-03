import AppleIcon from '@hugeicons/core-free-icons/AppleIcon';
import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import GoogleIcon from '@hugeicons/core-free-icons/GoogleIcon';
import SmartPhone01Icon from '@hugeicons/core-free-icons/SmartPhone01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { memo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { haptic } from '../../internal/haptics';
import { withSpringToken } from '../../internal/layoutSpring';
import { Portal } from '../../internal/Portal';
import { cornerCurve } from '../../theme';
import { Button } from '../Button/Button';
import { CloseButton } from '../CloseButton/CloseButton';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export type PaymentSheetStatus = 'ready' | 'processing' | 'done';

export type PaymentSheetProps = {
  open: boolean;
  /** "Paper & Co" */
  merchant: string;
  /** "2 × eclipse glasses" */
  items: string;
  /** "£29.98" */
  total: string;
  /** "Debit card" */
  cardName: string;
  /** "•••• 4021" */
  cardNumber: string;
  status?: PaymentSheetStatus;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * A drawn stand-in for the system payment sheet (platforms.md, decision 038): Apple Pay on iOS, Google Pay
 * on Android. The real sheets need a merchant account and don't run on the web, so the prototype draws them
 * and the state debugger decides whether the payment goes through.
 */
export const PaymentSheet = memo(function PaymentSheet({
  open,
  merchant,
  items,
  total,
  cardName,
  cardNumber,
  status = 'ready',
  onConfirm,
  onCancel,
}: PaymentSheetProps) {
  // The platform form follows the theme; the React Compiler would keep the first one, since the theme object stays the same.
  'use no memo';
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  if (!open) return null;
  const ios = theme.platform === 'ios';
  const busy = status !== 'ready';
  const confirm = () => {
    if (busy) return;
    haptic('primary');
    onConfirm();
  };

  const state =
    status === 'processing' ? (
      <View style={styles.state}>
        <ActivityIndicator color={theme.color.tint} />
        <Text variant="subheadlineStrong">Processing</Text>
      </View>
    ) : status === 'done' ? (
      <View style={styles.state}>
        <Icon icon={Tick02Icon} size="title3" weight="strong" color="tint" />
        <Text variant="subheadlineStrong">Done</Text>
      </View>
    ) : null;

  return (
    <Portal>
      <View style={styles.overlay} accessibilityViewIsModal>
        {/* The fade animates the wrapper's opacity to 1, so the scrim's own 40% sits on a view inside it (on iOS the
            entering animation replaced it and the screen went black). */}
        <Animated.View entering={withSpringToken(new FadeIn(), theme.spring.fade)} exiting={withSpringToken(new FadeOut(), theme.spring.fade)} style={StyleSheet.absoluteFill}>
          <View style={styles.scrim} />
          <Pressable accessibilityRole="button" accessibilityLabel="Cancel payment" disabled={busy} onPress={onCancel} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <Animated.View
          entering={withSpringToken(new SlideInDown(), theme.spring.smooth)}
          exiting={withSpringToken(new SlideOutDown(), theme.spring.smooth)}
          style={styles.sheet(ios, insets.bottom)}
        >
          <View style={styles.head}>
            <View style={styles.brand}>
              <Icon icon={ios ? AppleIcon : GoogleIcon} size="title3" weight="strong" />
              <Text variant="title3" accessibilityRole="header">
                Pay
              </Text>
            </View>
            {ios ? <CloseButton onPress={busy ? undefined : onCancel} accessibilityLabel="Cancel" /> : null}
          </View>

          <View style={styles.list}>
            <View style={styles.row(true)} accessible accessibilityLabel={`${cardName}, ${cardNumber.replace(/•+ /, 'ending ')}`}>
              <Icon icon={CreditCardIcon} size="body" color="mutedForeground" />
              <View style={styles.grow}>
                <Text variant="body">{cardName}</Text>
                <Text variant="footnote" color="mutedForeground">
                  {cardNumber}
                </Text>
              </View>
              <Icon icon="chevron" size="body" color="mutedForeground" />
            </View>
            <View style={styles.row(false)} accessible accessibilityLabel={`Pay ${merchant}, ${items.replace(' × ', ' ')}, ${total}`}>
              <View style={styles.grow}>
                <Text variant="body">{`Pay ${merchant}`}</Text>
                <Text variant="footnote" color="mutedForeground">
                  {items}
                </Text>
              </View>
              <Text variant="headline">{total}</Text>
            </View>
          </View>

          {state ??
            (ios ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Confirm with side button" onPress={confirm} style={styles.side}>
                <Icon icon={SmartPhone01Icon} size="title2" color="tint" />
                <Text variant="subheadline" color="mutedForeground">
                  Confirm with side button
                </Text>
              </Pressable>
            ) : (
              <Button label={`Pay ${total}`} accessibilityLabel={`Pay, ${total}`} onPress={confirm} />
            ))}
          {!ios && !busy ? <Button label="Cancel" role="plain" onPress={onCancel} /> : null}
        </Animated.View>
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create((theme) => ({
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.scrim, opacity: theme.state.scrim },
  // iOS: a floating sheet with margins all round; Android: a bottom sheet attached to the bottom edge.
  sheet: (ios: boolean, bottom: number) => ({
    ...cornerCurve,
    marginHorizontal: ios ? theme.space[2] : 0,
    marginBottom: ios ? bottom + theme.space[2] : 0,
    paddingHorizontal: theme.inset.sheet,
    paddingTop: theme.space[4],
    paddingBottom: ios ? theme.inset.sheet : bottom + theme.space[4],
    gap: theme.space[4],
    borderRadius: ios ? theme.radius.sheet : 0,
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    backgroundColor: theme.color.card,
  }),
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: theme.hit.min },
  brand: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  list: {
    ...cornerCurve,
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.background,
    overflow: 'hidden',
  },
  row: (separator: boolean) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    padding: theme.space[4],
    borderBottomWidth: separator ? StyleSheet.hairlineWidth : 0,
    borderBottomColor: theme.color.separator,
  }),
  grow: { flex: 1, gap: theme.space[1] / 2 },
  side: { alignItems: 'center', gap: theme.space[2], paddingVertical: theme.space[2], minHeight: theme.hit.min },
  state: { alignItems: 'center', justifyContent: 'center', gap: theme.space[2], minHeight: theme.size.button.large * 2 },
}));
