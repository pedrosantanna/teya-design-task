// How things enter, leave and make room in a chat (motion.md): one language for every part of a conversation.
// A new item fades in with a small rise on spring.smooth, a removed one fades out on spring.fade, and what
// is below or above moves into its new place on spring.smooth instead of jumping. With Reduce Motion nothing
// moves: new items only fade, quickly, and the rest changes in place.
import { useEffect, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Platform } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, LinearTransition, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';

import { withSpringToken } from '../../internal/layoutSpring';

/** The layout transition for content that moves when its neighbours come and go; `undefined` under Reduce Motion. */
export function useChatLayout() {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return undefined;
  const spring = theme.spring.smooth;
  const b = new LinearTransition().springify();
  return 'duration' in spring ? b.duration(spring.duration).dampingRatio(spring.dampingRatio) : b.stiffness(spring.stiffness).damping(spring.damping).mass(spring.mass);
}

// A delayed entry follows the item before it (a chip row after Snuffle's bubble) by this much, in ms.
const FOLLOW = 150;
// The web's inverted list flips each cell (scaleY -1), so a rise there starts above, not below.

export type ChatEntryProps = {
  children: ReactNode;
  /** Enters with the rise. False for what is already there (opening the chat shows everything at once). */
  animate?: boolean;
  /** Enters after the item before it, like the suggestions after Snuffle's message. */
  follows?: boolean;
  /** Fades out when removed. Off for content the list itself removes. */
  leaves?: boolean;
  /** Moves with a layout transition when its siblings change. */
  moves?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function ChatEntry(props: ChatEntryProps) {
  return Platform.OS === 'web' ? <WebChatEntry {...props} /> : <NativeChatEntry {...props} />;
}

function NativeChatEntry({ children, animate = true, follows = false, leaves = true, moves = false, style, accessibilityLabel }: ChatEntryProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const layout = useChatLayout();
  const delay = follows ? FOLLOW : 0;
  const entering = animate
    ? reduceMotion
      ? withSpringToken(new FadeIn(), theme.spring.fade)
      : withSpringToken(new FadeInDown().withInitialValues({ opacity: 0, transform: [{ translateY: theme.space[2] }] }), theme.spring.smooth).delay(delay)
    : undefined;
  const exiting = leaves ? withSpringToken(new FadeOut(), theme.spring.fade) : undefined;
  return (
    <Animated.View entering={entering} exiting={exiting} layout={moves ? layout : undefined} style={style} accessibilityLabel={accessibilityLabel}>
      {children}
    </Animated.View>
  );
}

/** The web: Reanimated's layout animations there lift an entering item out of the flow (position absolute, a negative
 *  top) and in the chat's inverted list some were left that way, over the messages. So the web fades and rises the
 *  item itself, in the flow, and removes it at once. The inverted list flips each cell, so the rise starts above. */
function WebChatEntry({ children, animate = true, follows = false, style, accessibilityLabel }: ChatEntryProps) {
  const { theme } = useUnistyles();
  const reduceMotion = useReducedMotion();
  const shown = useSharedValue(animate ? 0 : 1);
  useEffect(() => {
    if (!animate) return;
    const spring = reduceMotion ? theme.spring.fade : theme.spring.smooth;
    shown.set(withDelay(follows ? FOLLOW : 0, withSpring(1, spring)));
    // Runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const rise = reduceMotion ? 0 : theme.space[2];
  const motion = useAnimatedStyle(() => ({ opacity: shown.get(), transform: [{ translateY: -rise * (1 - shown.get()) }] }));
  return (
    <Animated.View style={[style, motion]} accessibilityLabel={accessibilityLabel}>
      {children}
    </Animated.View>
  );
}
