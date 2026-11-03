import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { LiveActivity, Notification, Text } from '@/design-system';
import { openActiveChat, price, shopById, unitFor, useApp, useContent, useRequestLabel } from '@/store';

// Away from the app (v7 frame "Away from the app"): a simulated lock screen with the request's Live
// Activity (an ongoing notification on Android) and Snuffle's notification (decision 038). Tapping the
// notification opens the chat. The clock is the phone's own, so the status bar above it shows no time.
export default function LockScreen() {
  const insets = useSafeAreaInsets();
  const content = useContent();
  const answers = useApp('answers');
  const label = useRequestLabel();
  const [status, deadline] = label.split(' · ');
  const answered = content.active.offers.filter((o) => (answers[o.shopId] ?? 'asked') !== 'asked' && answers[o.shopId] !== 'seen').length;
  const latest = content.active.offers.find((o) => answers[o.shopId] === 'hasIt');
  const shop = latest ? shopById(content, latest.shopId) : undefined;
  const them = content.active.plural ? 'them' : 'it';

  return (
    <View style={styles.screen(insets.top, insets.bottom)}>
      <View style={styles.clock}>
        <Text variant="headline" align="center">
          Monday 2 November
        </Text>
        <Text variant="clock" align="center">
          1:12
        </Text>
      </View>
      <View style={styles.stack}>
        <LiveActivity title={content.active.title} status={status} deadline={deadline} answered={answered} asked={content.active.offers.length} />
        {shop && latest ? (
          <Notification
            title={content.active.title}
            body={`${shop.name} on ${shop.street} has ${them} too: ${price(latest.price)} a ${unitFor(content, 1)}.`}
            onPress={openActiveChat}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: (top: number, bottom: number) => ({
    flex: 1,
    backgroundColor: theme.color.chipSelected,
    paddingTop: top + theme.space[8],
    paddingBottom: bottom + theme.space[8] * 2,
    paddingHorizontal: theme.space[3],
    justifyContent: 'space-between',
  }),
  clock: { gap: theme.space[1] },
  stack: { gap: theme.space[2] },
}));
