import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { TypeStyleName } from '../../theme';
import { Text } from './Text';

// One example per variant. Rendered on the design-system gallery route (/design-system).
const samples: Record<TypeStyleName, string> = {
  splash: 'Everything on King Street',
  displayLarge: 'Nearby',
  displayTitle: 'Places',
  displayName: 'Paper & Co',
  sectionTitle: 'Open near you',
  title1: 'Requests',
  title2: 'This week on King Street',
  title3: 'Open near you',
  headline: 'Broadway Chemist',
  body: 'Two shops have them. Still waiting on 3.',
  callout: 'Ask for anything nearby',
  subheadline: 'Collect by Mon 9 Nov',
  subheadlineStrong: 'Buy at Rossi’s',
  footnote: 'King Street · 13 min walk · open till 7pm',
  caption1Strong: 'Needs you',
  caption1: 'Replied 4 min ago',
  caption2: '3 new',
  code: 'K7Q2',
  clock: '1:12',
};

export function TextExamples() {
  return (
    <View style={styles.list}>
      {(Object.keys(samples) as TypeStyleName[]).map((variant) => (
        <View key={variant} style={styles.item}>
          <Text variant="caption1" color="mutedForeground">
            {variant}
          </Text>
          <Text variant={variant}>{samples[variant]}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  item: { gap: theme.space[1] },
}));
