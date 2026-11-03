import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Skeleton } from './Skeleton';

export function SkeletonExamples() {
  return (
    <View style={styles.list}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <Skeleton variant="tileLarge" immediate />
        <Skeleton variant="tileMedium" immediate />
      </ScrollView>
      <Skeleton variant="row" immediate />
      <Skeleton variant="card" immediate />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  row: { gap: theme.layout.gutter },
}));
