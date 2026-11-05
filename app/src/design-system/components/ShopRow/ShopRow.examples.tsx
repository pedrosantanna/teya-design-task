import { View } from 'react-native';

import { ShopRow } from './ShopRow';

const noop = () => undefined;

// A grouped list on iOS (first, middle, last) and a Material list on Android.
export function ShopRowExamples() {
  return (
    <View>
      <ShopRow id="paper" position="first" name="Paper & Co" facts={{ state: 'open', detail: 'until\u00A07pm', walk: '13\u00A0min\u00A0walk', street: 'King\u00A0Street' }} onPress={noop} />
      <ShopRow id="chemist" position="middle" name="Broadway Chemist" facts={{ state: 'open', detail: 'until\u00A08pm', walk: '12\u00A0min\u00A0walk', street: 'Broadway' }} onPress={noop} />
      <ShopRow id="cameras" position="last" name="Olympia Cameras" facts={{ state: 'closed', detail: 'opens\u00A09am', walk: '4\u00A0min\u00A0walk' }} onPress={noop} />
    </View>
  );
}
