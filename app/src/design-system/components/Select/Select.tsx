import { HugeiconsIcon } from '@hugeicons/react-native';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../../theme';
import { Text } from '../Text/Text';
import { OptionList, type Option } from './OptionList';

export type SelectProps<T extends string> = {
  label: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  testID?: string;
};

/**
 * A dropdown: a row with the label and the chosen value; a tap opens the options under it, in place.
 * Opening in place (not a popover) keeps it the same on iOS, Android and the web, and inside a scrolling panel.
 */
export function Select<T extends string>({ label, options, value, onChange, testID }: SelectProps<T>) {
  const { theme } = useUnistyles();
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  const turn = useDerivedValue(() => withSpring(open ? 180 : 0, theme.spring.snappy));
  const chevron = useAnimatedStyle(() => ({ transform: [{ rotate: `${turn.get()}deg` }] }));

  return (
    <View testID={testID} style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${current?.label ?? 'none'}`}
        accessibilityHint="Shows the options"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
        style={({ pressed }) => [styles.field, pressed && styles.pressed]}
      >
        <Text variant="subheadline" color="mutedForeground">
          {label}
        </Text>
        <View style={styles.value}>
          <Text variant="subheadlineStrong" numberOfLines={1} align="right">
            {current?.label ?? '—'}
          </Text>
          <Animated.View style={chevron}>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={theme.type.subheadline.lineHeight - theme.space[1]}
              strokeWidth={2}
              color={theme.color.mutedForeground}
            />
          </Animated.View>
        </View>
      </Pressable>
      {open ? (
        <OptionList
          options={options}
          value={value}
          accessibilityLabel={label}
          onChange={(next) => {
            onChange(next);
            setOpen(false);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: { gap: theme.space[1] },
  field: {
    ...cornerCurve,
    minHeight: theme.size.button.compact,
    paddingHorizontal: theme.space[3],
    borderRadius: theme.radius.inner,
    backgroundColor: theme.color.muted,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space[3],
  },
  pressed: { opacity: 1 - theme.state.pressedLayer },
  value: { flexShrink: 1, flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
}));
