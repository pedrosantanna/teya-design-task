// Small layout pieces of the panel, built from design-system components only.
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Text } from '@/design-system';

/** A titled group of controls, like a section of Figma's right sidebar. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="footnote" color="mutedForeground" accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

/** A labelled row of choices: the chosen one filled, the others tonal. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segmented}>
      <Text variant="subheadline" color="mutedForeground">
        {label}
      </Text>
      <View style={styles.choices} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((o) => (
          <Button
            key={o.value}
            label={o.label}
            size="compact"
            role={o.value === value ? 'filled' : 'tonal'}
            accessibilityLabel={`${label}: ${o.label}${o.value === value ? ', selected' : ''}`}
            onPress={() => onChange(o.value)}
          />
        ))}
      </View>
    </View>
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create((theme) => ({
  section: { gap: theme.space[2] },
  body: { gap: theme.space[2] },
  segmented: { gap: theme.space[1] },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[1] },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: theme.color.muted },
}));
