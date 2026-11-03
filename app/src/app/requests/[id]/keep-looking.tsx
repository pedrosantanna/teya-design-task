import Calendar03Icon from '@hugeicons/core-free-icons/Calendar03Icon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, ListRow, NavBar, SegmentedControl, Text, screenMargin, useNavBarHeight } from '@/design-system';
import { sim, unitFor, useContent } from '@/store';

const SEGMENTS = [
  { value: 'once', label: 'Once' },
  { value: 'weekly', label: 'Every week' },
];

// Keep looking (v7 frame "Keep looking"): Snuffle keeps the request open and messages the shopper when a
// shop has it. Nothing is bought until Buy.
export default function KeepLooking() {
  const { theme, rt } = useUnistyles();
  const insets = useSafeAreaInsets();
  const top = useNavBarHeight();
  const content = useContent();
  const [repeat, setRepeat] = useState('once');
  const margin = screenMargin(theme, rt.screen.width);
  const them = content.active.plural ? 'them' : 'it';
  const close = () => (router.canGoBack() ? router.back() : router.navigate({ pathname: '/requests/[id]', params: { id: content.active.id } }));
  const done = () => {
    sim.keepLooking(repeat === 'weekly');
    close();
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content(margin, top, insets.bottom)}>
        <SegmentedControl segments={SEGMENTS} value={repeat} onChange={setRepeat} accessibilityLabel="How often" />
        <Text variant="headline">{`${content.active.title}, ${content.active.quantity} ${unitFor(content, content.active.quantity)}`}</Text>
        <View>
          <ListRow icon={Location01Icon} title="Where" value={content.active.area} position="first" />
          <ListRow icon={Calendar03Icon} title="Until" value="Fri 6 Nov" position="last" />
        </View>
        <Text variant="footnote" color="mutedForeground">
          {`You'll get one message when a shop has ${them}. Nothing is bought until you tap Buy.`}
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
