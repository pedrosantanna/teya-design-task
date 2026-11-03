// Entry point: work out the store's starting theme, then register the Unistyles themes before any screen
// creates a stylesheet.
import './src/store/boot';
import './src/design-system/theme/unistyles';
import 'expo-router/entry';
