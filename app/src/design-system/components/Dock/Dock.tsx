// The bottom dock (components.md, Ask bar and composer; iOS 26 patterns): the strip that holds the chat
// composer, or the ask bar with the suggestion chips. No bar fill: the controls float in glass over a
// scroll-edge fade that reaches the bottom of the screen through the safe area, so content scrolling under
// them recedes instead of sitting bare behind the glass.
import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { useGround } from '../../internal/ground';
import { ScrollEdge } from '../../internal/ScrollEdge';

export type DockProps = {
  children: ReactNode;
  /** Positions the dock over the screen's content (absolute, at the bottom). Default true. */
  floating?: boolean;
  /** Space under the content; defaults to the safe-area bottom. */
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
};

export function Dock({ children, floating = true, bottomInset, style }: DockProps) {
  const insets = useSafeAreaInsets();
  const bottom = bottomInset ?? insets.bottom;
  // The fade is drawn from the ground the dock floats over: a chat's, or the Background.
  const ground = useGround();
  return (
    <View style={[styles.strip(bottom), floating && styles.floating, style]} pointerEvents="box-none">
      <View style={styles.edge} pointerEvents="none">
        <ScrollEdge edge="bottom" height="100%" fill={ground === 'chat' ? 'chat' : 'background'} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  strip: (bottom: number) => ({
    paddingTop: theme.space[3],
    paddingBottom: bottom + theme.space[2],
    gap: theme.space[3],
  }),
  floating: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  // The fade starts a little above the controls so the content's edge dissolves before it reaches the glass.
  edge: { position: 'absolute', left: 0, right: 0, bottom: 0, top: -theme.space[6] },
}));
