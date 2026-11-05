// Sign in with a provider (first run, app flow v8 "Sign in"). All four share the design system's secondary capsule:
// 50 high, the full content width, `radius.full`, Card with a 1 pt Border edge, the label in Headline and Foreground,
// the icon 20 pt leading. Only the icon differs: the Apple, Google and Facebook logos are the owners' shapes
// (BrandLogos.tsx), never redrawn. Apple's logo and title are both Foreground, near-black on light and white on dark,
// as its HIG asks (both black or both white); Google keeps its full-colour G; Facebook its white f on #1877F2. Email
// is a text button in Tint.
import Mail01Icon from '@hugeicons/core-free-icons/Mail01Icon';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { cornerCurve } from '../../theme';
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

export function SignInButton({ provider, onPress, loading = false, disabled = false }: SignInButtonProps) {
  const { theme } = useUnistyles();
  const press = usePress();
  const colorName = provider === 'email' ? 'tint' : 'foreground';
  const color = theme.color[colorName] as string;
  const label = LABEL[provider];
  // The icon is 20 pt (Google's own icon size for its button), `space.5`.
  const logo = theme.space[5];
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
        style={styles.button(provider)}
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
  button: (provider: SignInProvider) => ({
    ...cornerCurve,
    height: theme.size.button.large,
    paddingHorizontal: theme.space[5],
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: provider === 'email' ? 'transparent' : theme.color.card,
    borderWidth: provider === 'email' ? 0 : theme.size.edge.control,
    borderColor: theme.color.border,
  }),
  layer: (color: string) => ({ ...StyleSheet.absoluteFillObject, backgroundColor: color }),
  content: { flexDirection: 'row', alignItems: 'center', gap: theme.space[2] },
}));
