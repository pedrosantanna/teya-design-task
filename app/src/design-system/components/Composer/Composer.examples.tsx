import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Chip } from '../Tag/Tag';
import { Text } from '../Text/Text';
import { Composer } from './Composer';

// Ask bar (empty, with a count), chat composer (empty and typing), the Ask screen's chips, sending, offline.
export function ComposerExamples() {
  const [ask, setAsk] = useState('');
  const [reply, setReply] = useState('Collect, please');
  const [compose, setCompose] = useState('Eclipse glasses, 2 pairs');
  return (
    <View style={styles.list}>
      <Text variant="caption1" color="mutedForeground">
        Ask bar on Nearby
      </Text>
      <Composer mode="ask" value={ask} onChangeText={setAsk} onSend={() => setAsk('')} requestsCount={1} />
      <Text variant="caption1" color="mutedForeground">
        Chat composer, typing
      </Text>
      <Composer value={reply} onChangeText={setReply} onSend={() => setReply('')} />
      <Text variant="caption1" color="mutedForeground">
        Ask screen, with place and deadline chips
      </Text>
      <Composer
        value={compose}
        onChangeText={setCompose}
        placeholder="Ask for anything nearby"
        chips={
          <>
            <Chip label="Within 15 min" selected />
            <Chip label="By 4pm" selected />
          </>
        }
      />
      <Text variant="caption1" color="mutedForeground">
        Sending, and offline (send disabled)
      </Text>
      <Composer value="Is it gluten free?" onChangeText={() => undefined} sending />
      <Composer value="Is it gluten free?" onChangeText={() => undefined} sendDisabled />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[2] },
}));
