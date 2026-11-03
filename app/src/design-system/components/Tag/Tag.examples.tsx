import FlashIcon from '@hugeicons/core-free-icons/FlashIcon';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '../Text/Text';
import { Badge, Chip, Count, StatusLabel } from './Tag';

const filters = ['All', 'Needs you', 'Looking', 'Waiting', 'Done'];

export function TagExamples() {
  const [filter, setFilter] = useState('All');
  return (
    <View style={styles.list}>
      <Text variant="caption1" color="mutedForeground">
        Filter chips (single choice)
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {filters.map((f) => (
          <Chip key={f} label={f} selected={filter === f} count={f === 'Needs you' ? 1 : undefined} onPress={setFilter} />
        ))}
      </ScrollView>
      <Text variant="caption1" color="mutedForeground">
        Suggestion chips
      </Text>
      <View style={styles.row}>
        <Chip kind="suggestion" label="Birthday candles" />
        <Chip kind="suggestion" label="Flowers for tonight" />
        <Chip kind="suggestion" label="Picture hooks" />
      </View>
      <Text variant="caption1" color="mutedForeground">
        Status labels
      </Text>
      <View style={styles.column}>
        <StatusLabel label="Asking 6 shops" />
        <StatusLabel label="Needs you · buy by Thu 5 Nov" tone="needsYou" />
        <StatusLabel label="In stock now · 1 of 2 · till" icon={FlashIcon} />
        <StatusLabel label="Waiting for Paper & Co · not charged yet" />
        <StatusLabel label="Ready · collect by Mon 9 Nov" tone="success" />
        <StatusLabel label="Sold · not charged" tone="warning" />
      </View>
      <Text variant="caption1" color="mutedForeground">
        Badges and counts
      </Text>
      <View style={styles.row}>
        <Badge badge="promoted" />
        <Badge badge="new" />
        <Badge badge="delivers" />
        <Count value={1} />
        <Count value={3} />
        <Count value={12} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.space[2] },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: theme.space[2] },
  column: { gap: theme.space[2] },
}));
