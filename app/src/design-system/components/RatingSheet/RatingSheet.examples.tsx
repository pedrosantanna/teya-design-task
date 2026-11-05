import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { RatingSheet } from './RatingSheet';

const UP = ['Had it as promised', 'Set aside on time', 'Friendly', 'Good value', 'Knew their stuff'];
const DOWN = ["Wasn't as described", 'Not ready when I came', 'Hard to find'];

// Empty, then each answer with its own tags; Send stays off until an answer is chosen.
export function RatingSheetExamples() {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState<boolean | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState<string | null>(null);
  const start = (answer: boolean | null) => {
    setUp(answer);
    setTags([]);
    setNote('');
    setOpen(true);
  };
  return (
    <View style={styles.list}>
      <View style={styles.row}>
        <Button label="Open, empty" role="tonal" size="compact" onPress={() => start(null)} />
        <Button label="Open, thumbs up" role="tonal" size="compact" onPress={() => start(true)} />
        <Button label="Open, thumbs down" role="tonal" size="compact" onPress={() => start(false)} />
      </View>
      {sent ? (
        <Text variant="footnote" color="mutedForeground">
          {sent}
        </Text>
      ) : null}
      <RatingSheet
        open={open}
        onClose={() => setOpen(false)}
        shop="Paper & Co"
        up={up}
        upTags={UP}
        downTags={DOWN}
        tags={tags}
        note={note}
        noteMax={140}
        onAnswer={(answer) => {
          if (answer !== up) setTags([]);
          setUp(answer);
        }}
        onToggleTag={(tag) => setTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]))}
        onNote={setNote}
        onSend={() => {
          setSent(`Sent: ${up ? 'would go back' : "wouldn't go back"}${tags.length ? `, ${tags.join(', ')}` : ''}`);
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
}));
