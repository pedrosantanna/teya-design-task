import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Chip } from '../Tag/Tag';
import { ChatBubble } from './ChatBubble';

// A short conversation: grouping (12 within a sender, 24 at a change), the day on the sender line, a failed send.
export function ChatBubbleExamples() {
  return (
    <View>
      <ChatBubble sender="shopper" text="Eclipse glasses, 2 pairs, today" />
      <ChatBubble sender="snuffle" gap="newSender" text="I'm asking 6 shops within 15 minutes of you." day="Sun 8 Nov" />
      <ChatBubble sender="snuffle" gap="sameSender" firstInGroup={false} text="Collect or delivery?" />
      <View style={styles.chips}>
        <Chip kind="suggestion" label="Collect" />
        <Chip kind="suggestion" label="Delivery" />
      </View>
      <ChatBubble sender="shopper" gap="newSender" text="Collect" />
      <ChatBubble sender="shopper" gap="sameSender" text="By 4pm if possible" status="failed" onRetry={() => undefined} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  chips: { flexDirection: 'row', gap: theme.space[2], marginTop: theme.space[2], paddingLeft: theme.size.avatar.mark + theme.space[2] },
}));
