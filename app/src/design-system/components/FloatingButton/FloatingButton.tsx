import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export type FloatingButtonProps = {
  icon: IconSvgElement;
  /** Required: the button has no visible label. */
  accessibilityLabel: string;
  onPress: () => void;
  /** Tinted fill while the thing it opens is open. */
  selected?: boolean;
  testID?: string;
};

/** A round button that floats over content, with an icon and no label. Used for the state debugger's toggle. */
export function FloatingButton({ icon, accessibilityLabel, onPress, selected = false, testID }: FloatingButtonProps) {
  const { theme } = useUnistyles();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));
  styles.useVariants({ selected });

  return (
    <Animated.View style={[styles.shadow, animated]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ expanded: selected }}
        onPress={onPress}
        onPressIn={() => scale.set(withSpring(theme.state.pressedScale, theme.spring.press))}
        onPressOut={() => scale.set(withSpring(1, theme.spring.snappy))}
        style={styles.button}
      >
        <HugeiconsIcon
          icon={icon}
          size={theme.type.title3.lineHeight}
          strokeWidth={1.75}
          color={selected ? theme.color.onChipSelected : theme.color.foreground}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  shadow: {
    borderRadius: theme.radius.full,
    shadowColor: theme.color.scrim,
    shadowOpacity: theme.state.pressedLayer * 2,
    shadowRadius: theme.space[3],
    shadowOffset: { width: 0, height: theme.space[1] },
    elevation: theme.space[2],
  },
  button: {
    width: theme.size.button.large,
    height: theme.size.button.large,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      selected: {
        true: { backgroundColor: theme.color.chipSelected },
        false: { backgroundColor: theme.color.card },
      },
    },
  },
}));
