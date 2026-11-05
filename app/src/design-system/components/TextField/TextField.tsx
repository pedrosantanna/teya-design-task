// A single-line text field (iOS 26 patterns): the location sheet's address search and a place's name.
// iOS: a Card capsule with a hairline Border, an optional leading icon and a clear button; fields live in sheets,
// where Card sits one level above the sheet's ground (1.39:1 in light) and the hairline holds the edge in dark,
// where the field takes Muted like the rows. Android: the same surface as a Material outlined field.
import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, useRef, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround } from '../../internal/ground';
import { useReleaseOnUnmount, type FieldRef } from '../../internal/keyboard';
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
  /** A few lines that grow with the text (the rating sheet's note); the clear button is left out. */
  multiline?: boolean;
  /** The longest text the field takes. */
  maxLength?: number;
};

export const TextField = memo(function TextField({ value, onChangeText, label, placeholder, icon, autoFocus, onSubmit, multiline = false, maxLength }: TextFieldProps) {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  const raised = ['sheet', 'shop'].includes(useGround()) && theme.scheme === 'dark';
  // A sheet's field unmounts with the sheet; if it still had focus the keyboard would stay up over the screen.
  const inputRef = useRef<FieldRef>(null);
  const release = useReleaseOnUnmount();
  return (
    <View style={[styles.field, raised && styles.raised, multiline && styles.multiline, focused && styles.focused]}>
      {icon ? <Icon icon={icon} size="body" color="mutedForeground" /> : null}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={theme.color.mutedForeground}
        autoFocus={autoFocus}
        autoCorrect={multiline}
        multiline={multiline}
        maxLength={maxLength}
        returnKeyType={multiline ? 'default' : 'done'}
        onSubmitEditing={onSubmit}
        onFocus={() => {
          release.onFocus();
          setFocused(true);
        }}
        onBlur={() => {
          release.onBlur();
          setFocused(false);
        }}
        cursorColor={theme.color.tint}
        selectionColor={theme.color.tint}
        style={[styles.input, multiline && styles.inputMultiline]}
      />
      {value && !multiline ? (
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
    backgroundColor: theme.color.card,
    // The hairline edge; on the web it widens into the focus ring (focused).
    borderWidth: theme.size.edge.control,
    borderColor: theme.color.border,
  },
  // Dark sheet: the rows' Muted, so a field doesn't look sunk next to them (Card is 1.17:1 on the sheet).
  raised: { backgroundColor: theme.color.muted },
  // A multi-line field is a rounded rectangle, not a capsule, and starts three lines tall.
  multiline: { alignItems: 'flex-start', borderRadius: theme.radius.inner, minHeight: theme.hit.min * 2 },
  // Focus ring for the web build and keyboards (states.md).
  focused: Platform.OS === 'web' ? { borderColor: theme.color.tint, borderWidth: theme.size.edge.focus } : {},
  input: { ...textStyle(theme.type.body), flex: 1, color: theme.color.foreground, paddingVertical: theme.space[2] },
  inputMultiline: { textAlignVertical: 'top', minHeight: theme.hit.min * 2 - 2 * theme.space[2] },
  clear: { padding: theme.space[1] },
}));
