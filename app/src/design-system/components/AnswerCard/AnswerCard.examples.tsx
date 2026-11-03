import FlashIcon from '@hugeicons/core-free-icons/FlashIcon';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { images } from '../../../content/images';
import { Button } from '../Button/Button';
import { AnswerCard } from './AnswerCard';

const photo = (key: keyof typeof images) => `${images[key].image}?w=160&q=80&auto=format`;
const noop = () => undefined;

// Best answer (filled Buy), a till answer (tonal Buy 1), something similar (Show me / No thanks), no action.
export function AnswerCardExamples() {
  const [replay, setReplay] = useState(0);
  return (
    <View style={styles.list}>
      <AnswerCard
        key={`a${replay}`}
        id="paper"
        shop="Paper & Co"
        status="Has them"
        source="replied 2 min ago"
        price="£14.99"
        walk="13 min walk"
        collectBy="Collect by Mon 9 Nov"
        best
        animateIn={replay > 0}
        onOpen={noop}
        onBuy={noop}
      />
      <AnswerCard
        id="chemist"
        shop="Broadway Chemist"
        status="In stock now · 1 of 2"
        source="till"
        statusIcon={FlashIcon}
        price="£9.50"
        walk="12 min walk"
        collectBy="Collect by Wed 4 Nov"
        buyLabel="Buy 1"
        image={photo('rossis-bakery-front')}
        onOpen={noop}
        onBuy={noop}
      />
      <AnswerCard
        id="cameras"
        shop="Olympia Cameras"
        status="Has something similar"
        source="1 min ago"
        price="£6"
        walk="12 min walk"
        collectBy="Collect by Wed 4 Nov"
        action="showMe"
        onOpen={noop}
        onShowMe={noop}
        onDismiss={noop}
      />
      <Button label="Replay arrival" role="plain" size="compact" onPress={() => setReplay((n) => n + 1)} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
