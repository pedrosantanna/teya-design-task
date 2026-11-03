import type { ReactNode } from 'react';
import { Text as NativeText, type AccessibilityRole, type TextProps as NativeTextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { textStyle, type ColorName, type TypeStyleName } from '../../theme';

export type TextProps = {
  /** A type style from the Typography page. */
  variant?: TypeStyleName;
  /** A colour role from the Colour page. */
  color?: ColorName;
  align?: 'auto' | 'left' | 'center' | 'right';
  numberOfLines?: number;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  testID?: string;
  selectable?: boolean;
  onTextLayout?: NativeTextProps['onTextLayout'];
  children: ReactNode;
};

export function Text({
  variant = 'body',
  color = 'foreground',
  align = 'auto',
  numberOfLines,
  children,
  ...rest
}: TextProps) {
  return (
    <NativeText
      {...rest}
      numberOfLines={numberOfLines}
      style={[styles.text(variant, color), align !== 'auto' && { textAlign: align }]}
    >
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create((theme) => ({
  text: (variant: TypeStyleName, color: ColorName) => ({
    ...textStyle(theme.type[variant]),
    color: theme.color[color],
  }),
}));
