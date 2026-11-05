// Nearby's ask bar (components.md, Ask bar; craft-pass-2): one row floating in glass at the bottom, the Ask capsule
// and a 48 pt Requests circle after it (decision 050: trailing, as iOS 26 places the secondary button after the search
// field in Music and Podcasts). It never shrinks or hides: pressing it is the screen's primary
// action, and a bar that retracts while scrolling read as gone. Inside the capsule: the Snuffle glyph, the
// placeholder in Body and a mic. The capsule registers as the origin "ask", so New Request's composer grows out of
// it (a view transition on the web, a zoom from its rectangle on the phones).
import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import Mic01Icon from '@hugeicons/core-free-icons/Mic01Icon';
import { memo, useEffect, useRef, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { FloatingSurface } from '../../internal/FloatingSurface';
import { registerOrigin, type ViewRef } from '../../internal/origins';
import { usePress } from '../../internal/usePress';
import { Dock } from '../Dock/Dock';
import { Icon } from '../Icon/Icon';
import { SnuffleMark } from '../SnuffleMark/SnuffleMark';
import { Count } from '../Tag/Tag';
import { Text } from '../Text/Text';

/** The origin id the ask capsule registers under; New Request's composer morphs from it. */
export const ASK_ORIGIN = 'ask';

export type BottomAccessoryProps = {
  placeholder?: string;
  onAskPress: () => void;
  requestsCount?: number;
  /** Wraps the Requests button, e.g. in a ZoomSource; receives the button and returns it wrapped. */
  renderRequests?: (button: (onPress: () => void) => ReactNode) => ReactNode;
  onRequestsPress?: () => void;
  /** Screen margin. */
  margin: number;
};

export const BottomAccessory = memo(function BottomAccessory({
  placeholder = 'Ask for anything nearby',
  onAskPress,
  requestsCount = 0,
  renderRequests,
  onRequestsPress,
  margin,
}: BottomAccessoryProps) {
  const askPress = usePress();
  const requestsPress = usePress();
  const askRef = useRef<ViewRef>(null);
  useEffect(() => registerOrigin(ASK_ORIGIN, askRef), []);

  const requestsLabel = requestsCount > 0 ? `Requests, ${requestsCount} ${requestsCount === 1 ? 'needs' : 'need'} you` : 'Requests';
  const button = (onPress: () => void) => (
    <Animated.View style={requestsPress.scaleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={requestsLabel}
        onPress={onPress}
        onPressIn={requestsPress.onPressIn}
        onPressOut={requestsPress.onPressOut}
      >
        <FloatingSurface interactive style={styles.circle}>
          <Icon icon={BubbleChatIcon} size="bar" color="foreground" />
        </FloatingSurface>
        <View style={styles.count} pointerEvents="none">
          <Count value={requestsCount} />
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <Dock>
      <View style={styles.row(margin)}>
        <Animated.View style={[styles.grow, askPress.scaleStyle]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ask Snuffle"
            accessibilityHint={placeholder}
            onPress={onAskPress}
            onPressIn={askPress.onPressIn}
            onPressOut={askPress.onPressOut}
          >
            <View ref={askRef} collapsable={false}>
              <FloatingSurface interactive style={styles.capsule}>
                <View style={styles.line}>
                  <SnuffleMark size="inline" />
                  <View style={styles.grow} pointerEvents="none">
                    <Text variant="body" color="mutedForeground" numberOfLines={1}>
                      {placeholder}
                    </Text>
                  </View>
                  {/* The mic is part of the capsule's press (a nested button can't live in a button on the web): it opens the
                      same screen, where dictation is the keyboard's. A 44 pt box around the 20 pt icon, in Muted foreground as
                      the mic in an iOS search field: it isn't a separate action. */}
                  <View style={styles.mic} pointerEvents="none">
                    <Icon icon={Mic01Icon} size="mic" color="mutedForeground" />
                  </View>
                </View>
              </FloatingSurface>
            </View>
          </Pressable>
        </Animated.View>
        {renderRequests ? renderRequests(button) : button(() => onRequestsPress?.())}
      </View>
    </Dock>
  );
});

const styles = StyleSheet.create((theme) => ({
  row: (margin: number) => ({ flexDirection: 'row', alignItems: 'center', gap: theme.space[2], paddingHorizontal: margin }),
  circle: {
    width: theme.size.field,
    height: theme.size.field,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // The count's ring overlaps the circle's top right edge, as on an app icon.
  count: { position: 'absolute', top: -theme.size.askBar.ring, right: -theme.size.askBar.ring },
  grow: { flex: 1 },
  capsule: { height: theme.size.field, borderRadius: theme.radius.full, justifyContent: 'center' },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.size.askBar.leading,
    // The mic's 44 pt hit area reaches past its 20 pt icon; the trailing inset is measured to the icon.
    paddingRight: theme.size.askBar.trailing - (theme.hit.min - theme.size.askBar.mic) / 2,
    gap: theme.size.askBar.gap,
  },
  mic: { width: theme.hit.min, height: theme.hit.min, alignItems: 'center', justifyContent: 'center' },
}));
