// How things enter, leave and make room in a chat (motion.md): one language for every part of a conversation.
// A new item fades in with a small rise on spring.smooth, a removed one fades out on spring.fade, and what
// is below or above moves into its new place on spring.smooth instead of jumping. With Reduce Motion nothing
// moves: new items only fade, quickly, and the rest changes in place.
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, LinearTransition, useReducedMotion } from 'react-native-reanimated';
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

export function ChatEntry({ children, animate = true, follows = false, leaves = true, moves = false, style, accessibilityLabel }: ChatEntryProps) {
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
