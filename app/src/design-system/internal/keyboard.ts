// The keyboard belongs to the field that opened it. It closes when that field's screen loses focus (a push, a pop,
// a zoom), when a sheet opens over it, and when a focused field unmounts. Without this, a field on a screen that was
// popped or covered could stay first responder and leave the keyboard up over Nearby (visual critique 3).
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, type ComponentRef } from 'react';
import { Keyboard, Platform, type TextInput } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';

/** Closes the keyboard and drops focus. React Native's call blurs the focused input it knows of; on the phones the
 *  keyboard controller also resigns whatever native view is first responder, which covers a field whose React side
 *  is already gone. */
export function dismissKeyboard() {
  Keyboard.dismiss();
  if (Platform.OS !== 'web') void KeyboardController.dismiss();
}

/** Closes the keyboard when the screen this is called from loses focus. Only inside a screen, and only where a
 *  field lives: a screen that merely opens another (Nearby's ask bar) must not close the keyboard the next screen's
 *  field is raising. */
export function useDismissKeyboardOnBlur(enabled = true) {
  useFocusEffect(useCallback(() => (enabled ? dismissKeyboard : undefined), [enabled]));
}

export type FieldRef = ComponentRef<typeof TextInput>;

/** Closes the keyboard if the field unmounts while it has focus. React Native blurs a focused input in its own
 *  cleanup, before this one runs, so the field's focus is tracked here from its focus and blur events instead of
 *  asked for at unmount. Spread the returned handlers on the field (call the field's own handlers from them). */
export function useReleaseOnUnmount() {
  const focused = useRef(false);
  useEffect(
    () => () => {
      if (focused.current) dismissKeyboard();
    },
    [],
  );
  return {
    onFocus: () => {
      focused.current = true;
    },
    onBlur: () => {
      focused.current = false;
    },
  };
}
