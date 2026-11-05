// The chat screens' keyboard wrappers. The web has no keyboard frame to follow, and KeyboardChatScrollView renders
// there without a scroll container, so the web takes a plain ScrollView and a plain View in their place.
import type { ComponentProps, ReactNode } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { KeyboardChatScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';

const WEB = Platform.OS === 'web';

type ChatScrollProps = ComponentProps<typeof ScrollView> & { offset?: number; keyboardLiftBehavior?: 'always' | 'whenAtEnd' | 'persistent' | 'never' };
function WebChatScroll({ offset: _offset, keyboardLiftBehavior: _lift, ...props }: ChatScrollProps) {
  return <ScrollView {...props} />;
}

type GestureAreaProps = { style?: ComponentProps<typeof View>['style']; children?: ReactNode; interpolator?: 'ios' | 'linear'; offset?: number; textInputNativeID?: string };
function WebArea({ style, children }: GestureAreaProps) {
  return <View style={style}>{children}</View>;
}

/** A chat's scroll view that keeps the last message above the keyboard on the phones. */
export const ChatScroll = WEB ? WebChatScroll : KeyboardChatScrollView;
/** The area where a drag down past the composer dismisses the keyboard interactively (iMessage). */
export const ChatGestureArea = WEB ? WebArea : KeyboardGestureArea;
