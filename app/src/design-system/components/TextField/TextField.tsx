// A single-line text field (iOS 26 patterns): the location sheet's address search and a place's name.
// iOS: a Muted capsule with an optional leading icon and a clear button. Android: a Material filled field.
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { textStyle } from '../../theme';
import { Icon } from '../Icon/Icon';

export type TextFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  /** Read by screen readers: "Search for an address". */
  label: string;
  placeholder?: string;
  /** A leading HugeIcons icon, e.g. search. */
  icon?: IconSvgElement;
  autoFocus?: boolean;
  onSubmit?: () => void;
};

export const TextField = memo(function TextField({ value, onChangeText, label, placeholder, icon, autoFocus, onSubmit }: TextFieldProps) {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.field, focused && styles.focused]}>
      {icon ? <Icon icon={icon} size="body" color="mutedForeground" /> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={theme.color.mutedForeground}
        autoFocus={autoFocus}
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        cursorColor={theme.color.tint}
        selectionColor={theme.color.tint}
        style={styles.input}
      />
      {value ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Clear" hitSlop={theme.space[2]} onPress={() => onChangeText('')} style={styles.clear}>
          <Icon icon={Cancel01Icon} size="footnote" weight="strong" color="mutedForeground" />
        </Pressable>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[2],
    minHeight: theme.hit.min,
    paddingHorizontal: theme.space[3],
    borderRadius: theme.platform === 'ios' ? theme.radius.full : theme.radius.inner,
    backgroundColor: theme.color.muted,
    borderWidth: Platform.OS === 'web' ? 2 : 0,
    borderColor: 'transparent',
  },
  // Focus ring for the web build and keyboards (states.md).
  focused: { borderColor: Platform.OS === 'web' ? theme.color.tint : 'transparent' },
  input: { ...textStyle(theme.type.body), flex: 1, color: theme.color.foreground, paddingVertical: theme.space[2] },
  clear: { padding: theme.space[1] },
}));
