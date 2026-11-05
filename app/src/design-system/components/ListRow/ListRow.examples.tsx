import CreditCardIcon from '@hugeicons/core-free-icons/CreditCardIcon';
import DeliveryTruck01Icon from '@hugeicons/core-free-icons/DeliveryTruck01Icon';
import Store01Icon from '@hugeicons/core-free-icons/Store01Icon';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Stepper } from '../Stepper/Stepper';
import { ListRow } from './ListRow';

// Static rows with a value and a stepper, and a group of two choices (the details sheet's ways to get it).
export function ListRowExamples() {
  const [how, setHow] = useState('collect');
  const [quantity, setQuantity] = useState(2);
  return (
    <View style={styles.list}>
      <View>
        <ListRow title="Eclipse glasses, ISO certified" value="£14.99" position="first" />
        <ListRow title="Quantity" position="last">
          <Stepper value={quantity} onChange={setQuantity} max={2} />
        </ListRow>
      </View>
      <View>
        <ListRow
          id="collect"
          icon={Store01Icon}
          title="Collect at Paper & Co"
          detail="Collect by Mon 9 Nov (7 days). Full refund if you don't"
          selected={how === 'collect'}
          onPress={setHow}
          position="first"
        />
        <ListRow
          id="delivery"
          icon={DeliveryTruck01Icon}
          title="They deliver"
          detail="Paper & Co's own courier, today" value="£3.50"
          selected={how === 'delivery'}
          onPress={setHow}
          position="last"
        />
      </View>
      <ListRow icon={CreditCardIcon} title="Paid £29.98" detail="Apple Pay, debit card •••• 4021" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  list: { gap: theme.gap.block },
}));
