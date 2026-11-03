import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button/Button';
import { Notification, NotificationBanner } from './Notification';

// The card on its own, and the banner dropping in from the top of the screen.
export function NotificationExamples() {
  const [banner, setBanner] = useState(false);
  return (
    <View style={styles.list}>
      <Notification title="Eclipse glasses" body="Paper & Co on King Street has them too: £14.99 a pair." />
      <Button label="Show the banner" role="tonal" onPress={() => setBanner(true)} />
      <NotificationBanner
        visible={banner}
        onHide={() => setBanner(false)}
        title="Eclipse glasses"
        body="Paper & Co on King Street has them too: £14.99 a pair."
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
