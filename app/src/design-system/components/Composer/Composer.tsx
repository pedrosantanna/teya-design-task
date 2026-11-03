// The composer (components.md, Ask bar and composer; craft-pass-2): the ask bar's anatomy as a field. A 48 pt
// glass capsule, 16 before the optional Snuffle glyph, 10 between parts, the text in Body, and a mic that becomes
// the Indigo send once there is text, 14 from the end. On New Request it grows out of the ask bar (`morphFrom`).
import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import Mic01Icon from '@hugeicons/core-free-icons/Mic01Icon';
import { memo, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { ActivityIndicator, Platform, Pressable, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { haptic } from '../../internal/haptics';
import { measureOrigin, measureView, type ViewRef } from '../../internal/origins';
import { setMorphTarget } from '../../internal/transitions';
import { usePress } from '../../internal/usePress';
import { textStyle } from '../../theme';
import { Icon } from '../Icon/Icon';
import { SnuffleMark } from '../SnuffleMark/SnuffleMark';
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
  /** The Snuffle glyph at the start of the field, as on the ask bar (New Request). */
  mark?: boolean;
  /** An origin id (the ask bar's): the glass grows out of it on open. The web morphs it in a view transition; the
   *  phones animate from the origin's rectangle with spring.smooth. Off under Reduce Motion (a crossfade). */
  morphFrom?: string;
};

/** No focus ring on the composer: the caret and the glass show where typing goes (visual critique 2), so the input's
 *  own outline is dropped too. React Native Web drops `outlineStyle: 'none'` from the typed styles, so it is set on
 *  the DOM node. */
function dropWebOutline(node: unknown) {
  if (Platform.OS !== 'web' || !node) return;
  const el = node as { style?: { outline: string } };
  if (el.style) el.style.outline = 'none';
}

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
  mark = false,
  morphFrom,
}: ComposerProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const hasText = value.trim().length > 0;
  const shown = useSharedValue(hasText ? 1 : 0);
  const sendPress = usePress('primary');
  const requestsPress = usePress();
  const fieldPress = usePress();

  // The morph from the ask bar: 1 at rest; at 0 the glass sits on the origin's rectangle.
  const glassRef = useRef<ViewRef>(null);
  const morph = useSharedValue(1);
  const from = useSharedValue({ dx: 0, dy: 0, sx: 1, sy: 1 });
  useLayoutEffect(() => {
    if (!morphFrom) return;
    if (Platform.OS === 'web') {
      setMorphTarget(glassRef.current);
      return () => setMorphTarget(null);
    }
    if (reduceMotion) return;
    let cancelled = false;
    morph.set(0);
    Promise.all([measureOrigin(morphFrom), measureView(glassRef.current)]).then(([origin, own]) => {
      if (cancelled) return;
      if (origin && own) {
        from.set({
          dx: origin.x + origin.width / 2 - (own.x + own.width / 2),
          dy: origin.y + origin.height / 2 - (own.y + own.height / 2),
          sx: origin.width / own.width,
          sy: origin.height / own.height,
        });
      }
      morph.set(withSpring(1, theme.spring.smooth));
    });
    return () => {
      cancelled = true;
    };
  }, [morphFrom, reduceMotion, morph, from, theme.spring.smooth]);
  const morphStyle = useAnimatedStyle(() => {
    const t = morph.get();
    const f = from.get();
    return {
      transform: [
        { translateX: f.dx * (1 - t) },
        { translateY: f.dy * (1 - t) },
        { scaleX: f.sx + (1 - f.sx) * t },
        { scaleY: f.sy + (1 - f.sy) * t },
      ],
    };
  });

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
              <Icon icon={BubbleChatIcon} size="bar" color="foreground" />
            </FloatingSurface>
            <View style={styles.count} pointerEvents="none">
              <Count value={requestsCount} />
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
      {onFieldPress ? (
        <Animated.View style={[styles.grow, fieldPress.scaleStyle]}>
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
                {mark ? (
                  <View style={styles.mark}>
                    <SnuffleMark size="inline" />
                  </View>
                ) : null}
                <View style={styles.fieldText}>
                  <Text variant="body" color={value ? 'foreground' : 'mutedForeground'} numberOfLines={1}>
                    {value || (placeholder ?? 'Ask for anything nearby')}
                  </Text>
                </View>
                <View style={styles.trailing}>
                  <Icon icon={Mic01Icon} size="mic" color="foreground" />
                </View>
              </View>
            </FloatingSurface>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View ref={glassRef} collapsable={false} style={[styles.grow, morphStyle]}>
          <FloatingSurface interactive style={styles.field}>
            {chips ? <View style={styles.chips}>{chips}</View> : null}
            <View style={styles.line}>
              {mark ? (
                <View style={styles.mark}>
                  <SnuffleMark size="inline" />
                </View>
              ) : null}
              <TextInput
                ref={dropWebOutline}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder ?? (mode === 'ask' ? 'Ask for anything nearby' : 'Reply')}
                placeholderTextColor={theme.color.mutedForeground}
                accessibilityLabel="Ask Snuffle"
                multiline
                rows={1}
                autoFocus={autoFocus}
                onFocus={onFocus}
                // Web: Enter sends, Shift+Enter starts a new line. The phones send from the keyboard's Send key.
                onKeyPress={
                  Platform.OS === 'web'
                    ? (e) => {
                        const key = e.nativeEvent as unknown as { key: string; shiftKey?: boolean };
                        if (key.key === 'Enter' && !key.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }
                    : undefined
                }
                onSubmitEditing={Platform.OS === 'web' ? undefined : send}
                submitBehavior="submit"
                returnKeyType="send"
                cursorColor={theme.color.tint}
                selectionColor={theme.color.tint}
                style={styles.input}
              />
              {/* The mic while the field is empty (dictation is the keyboard's), the Indigo send once there is text. */}
              <View style={styles.trailing}>
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
                      hitSlop={(theme.hit.min - theme.size.button.compact) / 2}
                      style={[styles.send, sendDisabled && styles.sendDisabled]}
                    >
                      {sending ? <ActivityIndicator color={theme.color.onPrimary} /> : <Icon icon="send" size="headline" color="onPrimary" />}
                    </Pressable>
                  </Animated.View>
                ) : (
                  <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                    <Icon icon={Mic01Icon} size="mic" color="foreground" />
                  </View>
                )}
              </View>
            </View>
          </FloatingSurface>
        </Animated.View>
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
  count: { position: 'absolute', top: -theme.size.askBar.ring, right: -theme.size.askBar.ring },
  grow: { flex: 1 },
  fieldText: { flex: 1, paddingVertical: (theme.size.field - theme.type.body.lineHeight) / 2 },
  field: {
    flex: 1,
    minHeight: theme.size.field,
    borderRadius: theme.size.field / 2,
    justifyContent: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space[2],
    paddingTop: (theme.size.field - theme.size.button.compact) / 2,
    paddingHorizontal: (theme.size.field - theme.size.button.compact) / 2,
  },
  // 16 before the glyph, 10 between parts, 14 from the end to the mic's icon (its 44 box reaches past it).
  line: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: theme.size.askBar.leading,
    paddingRight: theme.size.askBar.trailing - (theme.hit.min - theme.size.askBar.mic) / 2,
    gap: theme.size.askBar.gap,
  },
  mark: { height: theme.size.field, justifyContent: 'center' },
  input: {
    ...textStyle(theme.type.body),
    flex: 1,
    color: theme.color.foreground,
    paddingTop: (theme.size.field - theme.type.body.lineHeight) / 2,
    paddingBottom: (theme.size.field - theme.type.body.lineHeight) / 2,
    maxHeight: theme.type.body.lineHeight * MAX_LINES + theme.size.field - theme.type.body.lineHeight,
  },
  trailing: { width: theme.hit.min, height: theme.size.field, alignItems: 'center', justifyContent: 'center' },
  send: {
    width: theme.size.button.compact,
    height: theme.size.button.compact,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
  },
  sendDisabled: { opacity: theme.state.disabledContent },
}));
