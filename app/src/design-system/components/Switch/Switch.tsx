import { Pressable, Switch as NativeSwitch, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text } from '../Text/Text';

export type SwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  /** A short line under the label. */
  detail?: string;
  disabled?: boolean;
  testID?: string;
};

/**
 * A labelled on/off row. The control is the platform switch, coloured from the theme, so it reads as an iOS
 * switch or a Material switch on each device. The whole row is the hit target.
 */
export function Switch({ label, value, onValueChange, detail, disabled = false, testID }: SwitchProps) {
  const { theme } = useUnistyles();
  return (
    <Pressable
      testID={testID}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityHint={detail}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[styles.row, disabled && styles.disabled]}
    >
      <View style={styles.text}>
        <Text variant="subheadline">{label}</Text>
        {detail ? (
          <Text variant="footnote" color="mutedForeground">
            {detail}
          </Text>
        ) : null}
      </View>
      {/* The row takes the tap, so the switch itself doesn't toggle twice. */}
      <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <NativeSwitch
          value={value}
          disabled={disabled}
          trackColor={{ false: theme.color.muted, true: theme.color.primary }}
          thumbColor={theme.color.card}
          ios_backgroundColor={theme.color.muted}
          // Web only: the thumb colour when on.
          {...{ activeThumbColor: theme.color.card }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    minHeight: theme.hit.min,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
  },
  text: { flex: 1, gap: theme.space[1] / 2 },
  disabled: { opacity: theme.state.disabledContent },
}));
