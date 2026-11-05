import RefreshIcon from '@hugeicons/core-free-icons/RefreshIcon';
import { memo, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
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
  /** The shopper's bubble appears with spring.snappy when it is new. */
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
  const appear = useSharedValue(animateIn ? 0 : 1);
  useEffect(() => {
    if (animateIn) appear.set(withSpring(1, theme.spring.snappy));
  }, [animateIn, appear, theme.spring.snappy]);
  const pressedScale = theme.state.pressedScale;
  const appearStyle = useAnimatedStyle(() => ({
    opacity: appear.get(),
    transform: [{ scale: pressedScale + (1 - pressedScale) * appear.get() }],
  }));

  const mine = sender === 'shopper';
  const failed = status === 'failed';
  const label = `${mine ? 'You' : 'Snuffle'}: ${text}${failed ? '. Not sent, tap to retry' : ''}`;

  const bubble = (
    <Animated.View style={[styles.bubble(mine), appearStyle]}>
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
      <View style={styles.theirs}>
        {firstInGroup ? <SnuffleSender day={day} /> : null}
        {bubble}
      </View>
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
  theirs: { maxWidth: `${theme.layout.bubbleMax * 100}%`, alignItems: 'flex-start', gap: theme.space[1] },
  bubble: (mine: boolean) => ({
    ...cornerCurve,
    borderRadius: theme.radius.bubble,
    paddingVertical: theme.inset.bubbleVertical,
    paddingHorizontal: theme.inset.bubbleHorizontal,
    backgroundColor: mine ? theme.color.primary : theme.color.snuffle.bubble,
    flexShrink: 1,
  }),
}));
