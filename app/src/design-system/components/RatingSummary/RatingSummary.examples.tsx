import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ListBlock, ListGroup } from '../ListRow/ListRow';
import { RatingSummary } from './RatingSummary';

// 38 ratings (a share), 3 ratings (none), and none yet.
export function RatingSummaryExamples() {
  return (
    <View style={styles.list}>
      <ListGroup shadow>
        <ListBlock>
          <RatingSummary
            hasShare
            title="92% would go back"
            detail="38 buyers"
            accessibilityLabel="Would go back, 92 percent of 38 buyers"
            tags={[
              { tag: 'Friendly', count: 21, up: true },
              { tag: 'Had it as promised', count: 18, up: true },
              { tag: 'Set aside on time', count: 12, up: true },
              { tag: 'Not ready when I came', count: 2, up: false },
            ]}
          />
        </ListBlock>
      </ListGroup>
      <ListGroup shadow>
        <ListBlock>
          <RatingSummary
            title="3 buyers so far"
            accessibilityLabel="3 buyers so far have rated it"
            tags={[
              { tag: 'Friendly', count: 2, up: true },
              { tag: 'Not ready when I came', count: 1, up: false },
            ]}
          />
        </ListBlock>
      </ListGroup>
      <ListGroup shadow>
        <ListBlock>
          <RatingSummary title="No ratings yet" detail="Snuffle has asked them 4 times" accessibilityLabel="No ratings yet. Snuffle has asked them 4 times" />
        </ListBlock>
      </ListGroup>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
