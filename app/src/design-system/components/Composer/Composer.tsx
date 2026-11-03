import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import Mic01Icon from '@hugeicons/core-free-icons/Mic01Icon';
import { memo, useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, Platform, Pressable, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { haptic } from '../../internal/haptics';
import { usePress } from '../../internal/usePress';
import { textStyle } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Count } from '../Tag/Tag';
import { Text } from '../Text/Text';

// The field grows to five lines, then scrolls (components.md).
const MAX_LINES = 5;

export type ComposerProps = {
  /** ask: the Nearby ask bar with the round Requests button. reply: the chat composer, the field alone. */
  mode?: 'ask' | 'reply';
  value: string;
  onChangeText: (text: string) => void;
  onSend?: (text: string) => void;
  placeholder?: string;
  /** Send becomes a spinner for a moment. */
  sending?: boolean;
  /** Offline: send is disabled, the field still takes text. */
  sendDisabled?: boolean;
  /** Requests that need the shopper, shown as a count on the Requests button. */
  requestsCount?: number;
  onRequestsPress?: () => void;
  /** Place and deadline chips inside the composer on the Ask screen. */
  chips?: ReactNode;
  autoFocus?: boolean;
  onFocus?: () => void;
  /** The field is a button that opens the Ask screen (Nearby), so the keyboard opens there, not here. */
  onFieldPress?: () => void;
};

export const Composer = memo(function Composer({
  mode = 'reply',
  value,
  onChangeText,
  onSend,
  placeholder,
  sending = false,
  sendDisabled = false,
  requestsCount = 0,
  onRequestsPress,
  chips,
  autoFocus,
  onFocus,
  onFieldPress,
}: ComposerProps) {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  const hasText = value.trim().length > 0;
  const shown = useSharedValue(hasText ? 1 : 0);
  const sendPress = usePress('primary');
  const requestsPress = usePress();
  const fieldPress = usePress();

  useEffect(() => {
    shown.set(withSpring(hasText ? 1 : 0, theme.spring.snappy));
  }, [hasText, shown, theme.spring.snappy]);

  const pressedScale = theme.state.pressedScale;
  const sendStyle = useAnimatedStyle(() => ({
    opacity: shown.get(),
    transform: [{ scale: pressedScale + (1 - pressedScale) * shown.get() }],
  }));

  const send = () => {
    if (!hasText || sending || sendDisabled) return;
    haptic('primary');
    onSend?.(value.trim());
  };

  const requestsLabel = requestsCount > 0 ? `Requests, ${requestsCount} ${requestsCount === 1 ? 'needs' : 'need'} you` : 'Requests';

  return (
    <View style={styles.row}>
      {mode === 'ask' ? (
        <Animated.View style={requestsPress.scaleStyle}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={requestsLabel}
            onPress={onRequestsPress}
            onPressIn={requestsPress.onPressIn}
            onPressOut={requestsPress.onPressOut}
          >
            <FloatingSurface interactive style={styles.requests}>
              <Icon icon={BubbleChatIcon} size="bar" color="tint" />
            </FloatingSurface>
            <View style={styles.count} pointerEvents="none">
              <Count value={requestsCount} />
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
      {onFieldPress ? (
        <Animated.View style={[styles.fieldButton, fieldPress.scaleStyle]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ask Snuffle"
            accessibilityHint={placeholder ?? 'Ask for anything nearby'}
            onPress={onFieldPress}
            onPressIn={fieldPress.onPressIn}
            onPressOut={fieldPress.onPressOut}
          >
            <FloatingSurface interactive style={styles.field}>
              <View style={styles.line} pointerEvents="none">
                <View style={styles.fieldText}>
                  <Text variant="callout" color={value ? 'foreground' : 'mutedForeground'} numberOfLines={1}>
                    {value || (placeholder ?? 'Ask for anything nearby')}
                  </Text>
                </View>
                <View style={styles.mic}>
                  <Icon icon={Mic01Icon} size="bar" color="mutedForeground" />
                </View>
              </View>
            </FloatingSurface>
          </Pressable>
        </Animated.View>
      ) : (
        <FloatingSurface interactive style={[styles.field, focused && styles.focused]}>
          {chips ? <View style={styles.chips}>{chips}</View> : null}
          <View style={styles.line}>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder ?? (mode === 'ask' ? 'Ask for anything nearby' : 'Reply')}
              placeholderTextColor={theme.color.mutedForeground}
              accessibilityLabel="Ask Snuffle"
              multiline
              rows={1}
              autoFocus={autoFocus}
              onFocus={() => {
                setFocused(true);
                onFocus?.();
              }}
              onBlur={() => setFocused(false)}
              // Web: Enter sends, Shift+Enter starts a new line. The phones send from the keyboard's Send key.
              onKeyPress={Platform.OS === 'web' ? (e) => {
                const key = e.nativeEvent as unknown as { key: string; shiftKey?: boolean };
                if (key.key === 'Enter' && !key.shiftKey) {
                  e.preventDefault();
                  send();
                }
              } : undefined}
              onSubmitEditing={Platform.OS === 'web' ? undefined : send}
              submitBehavior="submit"
              returnKeyType="send"
              cursorColor={theme.color.tint}
              selectionColor={theme.color.tint}
              style={styles.input}
            />
            {hasText ? (
              <Animated.View style={[sendStyle, sendPress.scaleStyle]}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Send"
                  accessibilityState={{ disabled: sendDisabled, busy: sending }}
                  disabled={sendDisabled || sending}
                  onPress={send}
                  onPressIn={sendPress.onPressIn}
                  onPressOut={sendPress.onPressOut}
                  style={[styles.send, sendDisabled && styles.sendDisabled]}
                >
                  {sending ? <ActivityIndicator color={theme.color.onPrimary} /> : <Icon icon="send" size="headline" color="onPrimary" />}
                </Pressable>
              </Animated.View>
            ) : null}
          </View>
        </FloatingSurface>
      )}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: theme.space[2] },
  requests: {
    width: theme.size.field,
    height: theme.size.field,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: { position: 'absolute', top: 0, right: 0 },
  fieldButton: { flex: 1 },
  fieldText: { flex: 1, paddingVertical: (theme.size.field - theme.type.callout.lineHeight) / 2 },
  field: {
    flex: 1,
    minHeight: theme.size.field,
    borderRadius: theme.size.field / 2,
    justifyContent: 'center',
    borderWidth: Platform.OS === 'web' ? 2 : 0,
    borderColor: 'transparent',
  },
  // Focus ring for the web build and keyboards (states.md); the phones draw their own.
  focused: { borderColor: Platform.OS === 'web' ? theme.color.tint : 'transparent' },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space[2],
    paddingTop: (theme.size.field - theme.size.button.compact) / 2,
    paddingHorizontal: (theme.size.field - theme.size.button.compact) / 2,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: theme.space[4],
    paddingRight: (theme.size.field - theme.size.button.compact) / 2,
    gap: theme.space[2],
  },
  input: {
    ...textStyle(theme.type.callout),
    flex: 1,
    color: theme.color.foreground,
    paddingTop: (theme.size.field - theme.type.callout.lineHeight) / 2,
    paddingBottom: (theme.size.field - theme.type.callout.lineHeight) / 2,
    maxHeight: theme.type.callout.lineHeight * MAX_LINES + theme.size.field - theme.type.callout.lineHeight,
  },
  send: {
    width: theme.size.button.compact,
    height: theme.size.button.compact,
    marginBottom: (theme.size.field - theme.size.button.compact) / 2,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
  },
  sendDisabled: { opacity: theme.state.disabledContent },
  mic: { height: theme.size.field, justifyContent: 'center' },
}));
