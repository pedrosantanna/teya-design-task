import RefreshIcon from '@hugeicons/core-free-icons/RefreshIcon';
import { memo, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../../theme';
import { Icon } from '../Icon/Icon';
import { SnuffleAvatar } from '../SnuffleAvatar/SnuffleAvatar';
import { Text } from '../Text/Text';

export type ChatSender = 'shopper' | 'snuffle';
export type ChatGap = 'none' | 'sameSender' | 'newSender';

/** Space above a bubble: 12 within one sender's group, 24 at a change of sender (spacing.md). */
export function chatGap(previous: ChatSender | undefined, sender: ChatSender): ChatGap {
  if (!previous) return 'none';
  return previous === sender ? 'sameSender' : 'newSender';
}

export type ChatBubbleProps = {
  sender: ChatSender;
  text: string;
  /** First bubble of a Snuffle group: shows the sender line ("Snuffle"). */
  firstInGroup?: boolean;
  /** The day, when it isn't today ("Sun 8 Nov"), added to the sender line. */
  day?: string;
  gap?: ChatGap;
  status?: 'sending' | 'sent' | 'failed';
  /** Retry a failed bubble. Receives the bubble's `id`. */
  onRetry?: (id: string) => void;
  id?: string;
  /** A new bubble appears: the shopper's with spring.snappy, Snuffle's with a small rise on spring.smooth. */
  animateIn?: boolean;
};

export const ChatBubble = memo(function ChatBubble({
  sender,
  text,
  firstInGroup = true,
  day,
  gap = 'none',
  status = 'sent',
  onRetry,
  id,
  animateIn = false,
}: ChatBubbleProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const mine = sender === 'shopper';
  const appear = useSharedValue(animateIn ? 0 : 1);
  useEffect(() => {
    if (animateIn) appear.set(withSpring(1, reduceMotion ? theme.spring.fade : mine ? theme.spring.snappy : theme.spring.smooth));
  }, [animateIn, appear, mine, reduceMotion, theme.spring.snappy, theme.spring.smooth, theme.spring.fade]);
  const pressedScale = theme.state.pressedScale;
  const rise = theme.space[2];
  // The shopper's bubble grows from just under full size; Snuffle's group rises a little. Reduce Motion: a fade.
  const appearStyle = useAnimatedStyle(() => ({
    opacity: appear.get(),
    transform: reduceMotion ? [] : mine ? [{ scale: pressedScale + (1 - pressedScale) * appear.get() }] : [{ translateY: (1 - appear.get()) * rise }],
  }));

  const failed = status === 'failed';
  const label = `${mine ? 'You' : 'Snuffle'}: ${text}${failed ? '. Not sent, tap to retry' : ''}`;

  const bubble = (
    <Animated.View style={[styles.bubble(mine), mine && appearStyle]}>
      <Text variant="body" color={mine ? 'onPrimary' : 'foreground'} selectable>
        {text}
      </Text>
    </Animated.View>
  );

  if (mine) {
    return (
      <View style={styles.row(gap, true)}>
        <Pressable
          accessible
          accessibilityLabel={label}
          accessibilityRole={failed ? 'button' : 'text'}
          disabled={!failed || !onRetry}
          onPress={failed && onRetry ? () => onRetry(id ?? text) : undefined}
          style={styles.mine}
        >
          <View style={styles.mineLine}>
            {failed ? <Icon icon={RefreshIcon} size="footnote" color="destructive" /> : null}
            {bubble}
          </View>
          {failed ? (
            <Text variant="caption1" color="destructive">
              Not sent. Tap to retry
            </Text>
          ) : null}
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.row(gap, false)} accessible accessibilityLabel={label}>
      <Animated.View style={[styles.theirs, appearStyle]}>
        {firstInGroup ? <SnuffleSender day={day} /> : null}
        {bubble}
      </Animated.View>
    </View>
  );
});

/** The sender line of a Snuffle group: the avatar, then the word "Snuffle" and the day if it isn't today. The avatar is decorative. */
export function SnuffleSender({ day }: { day?: string }) {
  return (
    <View style={styles.sender}>
      <SnuffleAvatar />
      <Text variant="caption1" color="mutedForeground">
        {day ? `Snuffle, ${day}` : 'Snuffle'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: (gap: ChatGap, mine: boolean) => ({
    flexDirection: 'row',
    justifyContent: mine ? 'flex-end' : 'flex-start',
    gap: theme.space[2],
    marginTop: gap === 'none' ? 0 : gap === 'sameSender' ? theme.space[3] : theme.space[6],
  }),
  sender: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  mine: { maxWidth: `${theme.layout.bubbleMax * 100}%`, alignItems: 'flex-end', gap: theme.space[1] },
  mineLine: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
  theirs: { maxWidth: `${theme.layout.bubbleMax * 100}%`, alignItems: 'flex-start', gap: theme.space[2] },
  bubble: (mine: boolean) => ({
    ...cornerCurve,
    borderRadius: theme.radius.bubble,
    paddingVertical: theme.inset.bubbleVertical,
    paddingHorizontal: theme.inset.bubbleHorizontal,
    backgroundColor: mine ? theme.color.primary : theme.color.snuffle.bubble,
    flexShrink: 1,
  }),
}));
