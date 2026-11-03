import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { SignInButton } from './SignInButton';

// The four providers in sign in's order, and Apple while the mock sign in runs.
export function SignInButtonExamples() {
  return (
    <View style={styles.column}>
      <SignInButton provider="apple" />
      <SignInButton provider="google" />
      <SignInButton provider="facebook" />
      <SignInButton provider="email" />
      <SignInButton provider="apple" loading />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[2] },
}));
