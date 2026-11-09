import Calendar03Icon from '@hugeicons/core-free-icons/Calendar03Icon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, ListGroup, ListRow, NavBar, SegmentedControl, Text, screenMargin, useNavBarHeight } from '@/design-system';
import { looksRepeating, lookUntil, otherActions, otherKey, sim, unitFor, useContent, useOtherThread, useSim } from '@/store';

const SEGMENTS = [
  { value: 'once', label: 'Once' },
  { value: 'weekly', label: 'Every week' },
];

// Keep looking (v7 frame "Keep looking"): Snuffle keeps the request open and messages the shopper when a
// shop has it. Nothing is bought until Buy.
export default function KeepLooking() {
  const { theme } = useUnistyles();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const content = useContent();
  // Change on another request's chat passes its id; the chat keeps its own search (store/other-chat.ts).
  const { id } = useLocalSearchParams<{ id: string }>();
  const other = id && id !== content.active.id ? content.others.find((r) => r.id === id) : undefined;
  const key = otherKey(content.id, other?.id ?? '');
  const thread = useOtherThread(key);
  // Change from the chat opens with what is running now.
  const simRunning = useSim((s) => s.looking);
  const running = other ? { repeat: looksRepeating(key, thread) } : simRunning;
  const [repeat, setRepeat] = useState(running?.repeat ? 'weekly' : 'once');
  const day = simRunning?.day ?? 'Friday';
  const margin = screenMargin(theme, frame.width);
  const them = content.active.plural ? 'them' : 'it';
  const close = () => (router.canGoBack() ? router.back() : router.navigate({ pathname: '/requests/[id]', params: { id: other?.id ?? content.active.id } }));
  const done = () => {
    if (other) otherActions.change(key, repeat === 'weekly');
    else sim.keepLooking(repeat === 'weekly');
    close();
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content(margin, top, insets.bottom)}>
        <SegmentedControl segments={SEGMENTS} value={repeat} onChange={setRepeat} accessibilityLabel="How often" />
        <Text variant="headline">{other ? other.title : `${content.active.title}, ${content.active.quantity} ${unitFor(content, content.active.quantity)}`}</Text>
        <ListGroup corner="card">
          <ListRow icon={Location01Icon} title="Where" value={content.active.area} position="first" />
          <ListRow icon={Calendar03Icon} title="Until" value={lookUntil(repeat === 'weekly')} position="last" />
        </ListGroup>
        <Text variant="footnote" color="mutedForeground">
          {repeat === 'weekly'
            ? `I'll ask again every ${day} and message you each time a shop near you has ${them}. Nothing is bought until you tap Buy.`
            : `You'll get one message when a shop has ${them}. Nothing is bought until you tap Buy.`}
        </Text>
      </ScrollView>
      <View style={styles.footer(margin, insets.bottom)}>
        <Button label="Keep looking" onPress={done} />
      </View>
      <NavBar title="Keep looking" leading="close" onLeading={close} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.color.background },
  content: (margin: number, top: number, bottom: number) => ({
    paddingHorizontal: margin,
    paddingTop: top + theme.space[4],
    paddingBottom: bottom + theme.size.button.large * 2,
    gap: theme.gap.block,
  }),
  footer: (margin: number, bottom: number) => ({ position: 'absolute', left: margin, right: margin, bottom: bottom + theme.space[4] }),
}));
