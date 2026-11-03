import { HugeiconsIcon } from '@hugeicons/react-native';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../../theme';
import { Text } from '../Text/Text';

export type Option<T extends string> = {
  value: T;
  label: string;
  /** A short line under the label, e.g. the time in a journey step. */
  detail?: string;
};

export type OptionListProps<T extends string> = {
  options: readonly Option<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  /** Read out for the group, e.g. "Order state". */
  accessibilityLabel?: string;
  testID?: string;
};

/** A single-choice list: one row per option, the chosen one tinted and ticked. Used open in Select and on its own. */
export function OptionList<T extends string>({ options, value, onChange, accessibilityLabel, testID }: OptionListProps<T>) {
  const { theme } = useUnistyles();
  return (
    <View testID={testID} accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel} style={styles.list}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.detail ? `${option.label}, ${option.detail}` : option.label}
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [styles.row, selected && styles.selected, pressed && !selected && styles.pressed]}
          >
            <View style={styles.text}>
              <Text variant="subheadline" color={selected ? 'onChipSelected' : 'foreground'}>
                {option.label}
              </Text>
              {option.detail ? (
                <Text variant="caption1" color={selected ? 'onChipSelected' : 'mutedForeground'}>
                  {option.detail}
                </Text>
              ) : null}
            </View>
            {selected ? (
              <HugeiconsIcon
                icon={Tick02Icon}
                size={theme.type.subheadline.lineHeight - theme.space[1]}
                strokeWidth={2}
                color={theme.color.onChipSelected}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[1] / 2 },
  row: {
    ...cornerCurve,
    minHeight: theme.size.button.compact,
    paddingHorizontal: theme.space[3],
    paddingVertical: theme.space[1],
    borderRadius: theme.radius.inner,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
  },
  selected: { backgroundColor: theme.color.chipSelected },
  pressed: { backgroundColor: theme.color.muted },
  text: { flex: 1 },
}));
