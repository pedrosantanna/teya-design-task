import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import sam from '../../../../assets/images/personas/sam.jpg';
import { Avatar } from './Avatar';

const noop = () => undefined;

// Photo, initials without a photo, and the large size from the account sheet.
export function AvatarExamples() {
  return (
    <View style={styles.row}>
      <Avatar name="Sam" image={sam} onPress={noop} />
      <Avatar name="Jess Okafor" onPress={noop} />
      <Avatar name="Sam" image={sam} size="large" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.space[4] },
}));
