import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import Clock01Icon from '@hugeicons/core-free-icons/Clock01Icon';
import Location05Icon from '@hugeicons/core-free-icons/Location05Icon';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '../Text/Text';
import { Icon, type PlatformIconName } from './Icon';

const platformNames: PlatformIconName[] = ['back', 'more', 'share', 'send', 'chevron'];

// Sizes, stroke weights, colours and the platform icons. Switch the theme to Android to see their other form.
export function IconExamples() {
  return (
    <View style={styles.list}>
      <View style={styles.row}>
        <Icon icon={Location05Icon} size="nav" />
        <Icon icon={BubbleChatIcon} size="bar" color="tint" />
        <Icon icon={Clock01Icon} size="footnote" color="mutedForeground" />
        <Icon icon={Clock01Icon} size="headline" />
      </View>
      <View style={styles.inline}>
        <Icon icon={Clock01Icon} size="body" />
        <Text variant="body">Stroke 1.5 beside Body</Text>
      </View>
      <View style={styles.inline}>
        <Icon icon={Clock01Icon} size="headline" />
        <Text variant="headline">Stroke 2 beside Headline</Text>
      </View>
      <View style={styles.row}>
        {platformNames.map((name) => (
          <View key={name} style={styles.cell}>
            <Icon icon={name} size="nav" color="tint" />
            <Text variant="caption2" color="mutedForeground">
              {name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[5] },
  inline: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1] },
  cell: { alignItems: 'center', gap: theme.space[1] },
}));
