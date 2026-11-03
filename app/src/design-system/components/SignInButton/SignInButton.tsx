// Sign in with a provider (first run, app flow v8 "Sign in"). Apple comes first and follows Apple's HIG: black on
// light backgrounds, white on dark (codeInk and codeSurface are pure black and white in both modes). Google and
// Facebook are Card with a border; email is a text button. The logos are HugeIcons glyphs, standing in for each
// provider's own artwork in the prototype. Large: 50 high, the full content width, `radius.full`.
import AppleIcon from '@hugeicons/core-free-icons/AppleIcon';
import Facebook01Icon from '@hugeicons/core-free-icons/Facebook01Icon';
import GoogleIcon from '@hugeicons/core-free-icons/GoogleIcon';
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { cornerCurve, type AppTheme, type ColorName } from '../../theme';
import { Text } from '../Text/Text';

export type SignInProvider = 'apple' | 'google' | 'facebook' | 'email';

const LABEL: Record<SignInProvider, string> = {
  apple: 'Continue with Apple',
  google: 'Continue with Google',
  facebook: 'Continue with Facebook',
  email: 'Continue with email',
};

const ICON: Record<SignInProvider, IconSvgElement> = {
  apple: AppleIcon,
  google: GoogleIcon,
  facebook: Facebook01Icon,
  email: Mail01Icon,
};

export type SignInButtonProps = {
  provider: SignInProvider;
  onPress?: (provider: SignInProvider) => void;
  /** A spinner in place of the label while the (mock) sign in runs; the width stays. */
  loading?: boolean;
  disabled?: boolean;
};

/** Apple's black-or-white button inverts with the scheme; the rest keep the theme's own colours. */
function labelColor(theme: AppTheme, provider: SignInProvider): ColorName {
  if (provider === 'apple') return theme.scheme === 'dark' ? 'codeInk' : 'codeSurface';
  if (provider === 'email') return 'tint';
  return 'foreground';
}

export function SignInButton({ provider, onPress, loading = false, disabled = false }: SignInButtonProps) {
  const { theme } = useUnistyles();
  const press = usePress(provider === 'apple' ? 'primary' : undefined);
  const colorName = labelColor(theme, provider);
  const color = theme.color[colorName] as string;
  const label = LABEL[provider];
  return (
    <Animated.View style={[styles.wrapper, press.scaleStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={loading ? `${label}, waiting` : label}
        accessibilityState={{ disabled, busy: loading }}
        disabled={disabled || loading}
        onPress={() => onPress?.(provider)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.button(provider, theme.scheme === 'dark')}
      >
        <Animated.View pointerEvents="none" style={[styles.layer(color), press.layerStyle]} />
        {loading ? (
          <ActivityIndicator color={color} accessibilityElementsHidden />
        ) : (
          <View style={styles.content}>
            <HugeiconsIcon icon={ICON[provider]} size={theme.type.headline.lineHeight - theme.space[1]} strokeWidth={2} color={color} />
            <Text variant="headline" color={colorName}>
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: { alignSelf: 'stretch' },
  button: (provider: SignInProvider, dark: boolean) => ({
    ...cornerCurve,
    height: theme.size.button.large,
    paddingHorizontal: theme.space[5],
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      provider === 'apple' ? (dark ? theme.color.codeSurface : theme.color.codeInk) : provider === 'email' ? 'transparent' : theme.color.card,
    borderWidth: provider === 'google' || provider === 'facebook' ? StyleSheet.hairlineWidth : 0,
    borderColor: theme.color.border,
  }),
  layer: (color: string) => ({ ...StyleSheet.absoluteFillObject, backgroundColor: color }),
  content: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
}));
