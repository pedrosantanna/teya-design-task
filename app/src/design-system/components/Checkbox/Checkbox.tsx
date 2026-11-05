import { HugeiconsIcon } from '@hugeicons/react-native';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { cornerCurve } from '../../theme';
import { Text } from '../Text/Text';

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  detail?: string;
  disabled?: boolean;
  testID?: string;
};

/** A labelled checkbox row: a square box with a tick, then the label. The whole row is the hit target. */
export function Checkbox({ label, checked, onChange, detail, disabled = false, testID }: CheckboxProps) {
  const { theme } = useUnistyles();
  styles.useVariants({ checked });
  return (
    <Pressable
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityHint={detail}
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={[styles.row, disabled && styles.disabled]}
    >
      <View style={styles.box}>
        {checked ? (
          <HugeiconsIcon icon={Tick02Icon} size={theme.size.count - theme.space[1]} strokeWidth={2.5} color={theme.color.onPrimary} />
        ) : null}
      </View>
      <View style={styles.text}>
        <Text variant="subheadline">{label}</Text>
        {detail ? (
          <Text variant="footnote" color="mutedForeground">
            {detail}
          </Text>
        ) : null}
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
  box: {
    ...cornerCurve,
    width: theme.size.badge,
    height: theme.size.badge,
    borderRadius: theme.space[1] + theme.space[1] / 2,
    borderWidth: theme.size.edge.focus,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      checked: {
        true: { backgroundColor: theme.color.primary, borderColor: theme.color.primary },
        false: { backgroundColor: theme.color.card, borderColor: theme.color.mutedForeground },
      },
    },
  },
  text: { flex: 1, gap: theme.space[1] / 2 },
  disabled: { opacity: theme.state.disabledContent },
}));
