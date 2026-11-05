// Web only: stands in for react-native-keyboard-controller (metro.config.js resolves the package to this file on the
// web). The web has no keyboard frame to follow, so the library's views are plain ones and its animation is still;
// the real package is 93 KB of native bindings the web bundle never uses.
import type { ComponentProps, ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export function KeyboardProvider({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

type StickyProps = ComponentProps<typeof View> & { offset?: { closed?: number; opened?: number } };
export function KeyboardStickyView({ offset: _offset, children, ...props }: StickyProps) {
  return <View {...props}>{children}</View>;
}

type ChatScrollProps = ComponentProps<typeof ScrollView> & { offset?: number; keyboardLiftBehavior?: string };
export function KeyboardChatScrollView({ offset: _offset, keyboardLiftBehavior: _lift, ...props }: ChatScrollProps) {
  return <ScrollView {...props} />;
}

type GestureAreaProps = { style?: ComponentProps<typeof View>['style']; children?: ReactNode };
export function KeyboardGestureArea({ style, children }: GestureAreaProps) {
  return <View style={style}>{children}</View>;
}

export const KeyboardController = { dismiss: () => Promise.resolve() };

export function useReanimatedKeyboardAnimation() {
  return { height: useSharedValue(0), progress: useSharedValue(0) };
}
