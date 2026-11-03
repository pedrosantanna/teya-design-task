import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import BubbleChatIcon from '@hugeicons/core-free-icons/BubbleChatIcon';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from './Button';

// One example per role, size and state. Rendered on the design-system gallery route (/design-system).
export function ButtonExamples() {
  return (
    <View style={styles.list}>
      <Button label="Buy · £29.98" accessibilityLabel="Buy, £29.98" />
      <Button label="Keep looking" role="tonal" />
      <Button label="Directions" role="plain" icon={ArrowRight01Icon} />
      <Button label="Cancel for a refund" role="destructive" />
      <Button label="Buy · £29.98" loading />
      <Button label="Buy · £29.98" disabled />
      <View style={styles.row}>
        <Button label="Buy at Rossi's" size="compact" />
        <Button label="Ask" size="compact" role="tonal" icon={BubbleChatIcon} />
        <Button label="Call" size="compact" role="plain" />
        <Button label="Cancel" size="compact" role="destructive" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
}));
