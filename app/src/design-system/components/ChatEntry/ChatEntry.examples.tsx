import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { ChatBubble } from '../ChatBubble/ChatBubble';
import { ChatEntry, useChatLayout } from './ChatEntry';
import Animated from 'react-native-reanimated';

// Add and remove a message: it rises in, fades out, and the one below moves up with a layout transition.
export function ChatEntryExamples() {
  const [shown, setShown] = useState(true);
  const layout = useChatLayout();
  return (
    <View style={styles.column}>
      <Animated.View layout={layout} style={styles.list}>
        {shown ? (
          <ChatEntry>
            <ChatBubble sender="snuffle" text="A new message" />
          </ChatEntry>
        ) : null}
        <ChatBubble sender="shopper" text="Stays where it is" animateIn={false} gap={shown ? 'newSender' : 'none'} />
      </Animated.View>
      <Button label={shown ? 'Remove' : 'Add'} role="tonal" size="compact" onPress={() => setShown((s) => !s)} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  column: { gap: theme.space[3] },
  list: {},
}));
