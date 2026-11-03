import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PageDots } from './PageDots';

// Getting started's three pages, on each page.
export function PageDotsExamples() {
  return (
    <View style={styles.column}>
      <PageDots count={3} current={0} />
      <PageDots count={3} current={1} />
      <PageDots count={3} current={2} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[3], alignItems: 'flex-start' },
}));
