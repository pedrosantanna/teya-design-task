import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Chip } from '../Tag/Tag';
import { Composer } from '../Composer/Composer';
import { Text } from '../Text/Text';
import { Dock } from './Dock';

const noop = () => undefined;

// In place (not floating): the Nearby dock with chips and the ask bar, over a line of content.
export function DockExamples() {
  return (
    <View style={styles.frame}>
      <Text variant="body" color="mutedForeground">
        Content scrolls under the dock.
      </Text>
      <Dock floating={false} bottomInset={0}>
        <View style={styles.chips}>
          <Chip kind="suggestion" label="Eclipse glasses" onPress={noop} />
          <Chip kind="suggestion" label="A fan" onPress={noop} />
        </View>
        <View style={styles.pad}>
          <Composer mode="ask" value="" onChangeText={noop} onFieldPress={noop} />
        </View>
      </Dock>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  frame: { gap: theme.space[2], borderRadius: theme.radius.inner, overflow: 'hidden' },
  chips: { flexDirection: 'row', gap: theme.space[2], paddingHorizontal: theme.space[4] },
  pad: { paddingHorizontal: theme.space[4] },
}));
