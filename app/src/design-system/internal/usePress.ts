// Press state from states.md: scale to state.pressedScale and a state layer at state.pressedLayer,
// in with spring.press and out with spring.snappy, starting at touch-down. Runs on the UI thread.
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';

import { haptic, type HapticKind } from './haptics';

export function usePress(feedback?: HapticKind) {
  const { theme } = useUnistyles();
  const pressed = useSharedValue(0);
  const pressedScale = theme.state.pressedScale;
  const pressedLayer = theme.state.pressedLayer;
  const inSpring = theme.spring.press;
  const outSpring = theme.spring.snappy;

  const onPressIn = () => {
    pressed.set(withSpring(1, inSpring));
    if (feedback) haptic(feedback);
  };
  const onPressOut = () => {
    pressed.set(withSpring(0, outSpring));
  };

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, pressedScale]) }],
  }));
  const layerStyle = useAnimatedStyle(() => ({ opacity: pressed.get() * pressedLayer }));

  return { onPressIn, onPressOut, scaleStyle, layerStyle };
}
