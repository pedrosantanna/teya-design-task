// Sign in with a provider (first run, app flow v8 "Sign in"). Apple comes first and follows Apple's HIG: black on
// light backgrounds, white on dark (codeInk and codeSurface are pure black and white in both modes). Google
// is Google's own light or dark theme (white or #131314 with a 1 px stroke, the full-colour G); Facebook is Card with
// a 1 px Border and email a text button. The Apple, Google and Facebook logos are the owners' shapes
// (BrandLogos.tsx), Facebook's the white f on its #1877F2 disc. Large: 50 high, the full content width, `radius.full`.
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { cornerCurve, type AppTheme, type ColorName } from '../../theme';
import { Text } from '../Text/Text';
import { AppleLogo, FacebookLogo, GoogleLogo } from './BrandLogos';

export type SignInProvider = 'apple' | 'google' | 'facebook' | 'email';

const LABEL: Record<SignInProvider, string> = {
  apple: 'Continue with Apple',
  google: 'Continue with Google',
  facebook: 'Continue with Facebook',
  email: 'Continue with email',
};

const ICON: Partial<Record<SignInProvider, IconSvgElement>> = {
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
  if (provider === 'google') return 'googleText';
  if (provider === 'email') return 'tint';
  return 'foreground';
}

export function SignInButton({ provider, onPress, loading = false, disabled = false }: SignInButtonProps) {
  const { theme } = useUnistyles();
  const press = usePress(provider === 'apple' ? 'primary' : undefined);
  const colorName = labelColor(theme, provider);
  const color = theme.color[colorName] as string;
  const label = LABEL[provider];
  // The logo is sized to the label: its line height less a little air.
  const logo = theme.type.headline.lineHeight - theme.space[1];
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
            {provider === 'apple' ? <AppleLogo height={logo} color={color} /> : null}
            {provider === 'google' ? (
              <GoogleLogo
                size={logo}
                colors={{ blue: theme.color.googleLogoBlue, red: theme.color.googleLogoRed, yellow: theme.color.googleLogoYellow, green: theme.color.googleLogoGreen }}
              />
            ) : null}
            {provider === 'facebook' ? <FacebookLogo size={logo} blue={theme.color.facebookLogoBlue} f={theme.color.facebookLogoF} /> : null}
            {ICON[provider] ? <HugeiconsIcon icon={ICON[provider]} size={logo} strokeWidth={2} color={color} /> : null}
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
      provider === 'apple'
        ? dark
          ? theme.color.codeSurface
          : theme.color.codeInk
        : provider === 'email'
          ? 'transparent'
          : provider === 'google'
            ? theme.color.googleFill
            : theme.color.card,
    // Google and Facebook share one stroke width; Facebook takes the Border colour, Google its own (brand rules).
    borderWidth: provider === 'google' || provider === 'facebook' ? theme.size.edge.control : 0,
    borderColor: provider === 'google' ? theme.color.googleStroke : theme.color.border,
  }),
  layer: (color: string) => ({ ...StyleSheet.absoluteFillObject, backgroundColor: color }),
  content: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
}));
