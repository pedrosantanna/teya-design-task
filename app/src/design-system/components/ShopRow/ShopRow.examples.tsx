import { View } from 'react-native';

import { ShopRow } from './ShopRow';

const noop = () => undefined;

// A grouped list on iOS (first, middle, last) and a Material list on Android.
export function ShopRowExamples() {
  return (
    <View>
      <ShopRow id="paper" position="first" name="Paper & Co" meta="Open till 7pm · King Street · 13 min walk" onPress={noop} />
      <ShopRow id="chemist" position="middle" name="Broadway Chemist" meta="Open till 8pm · Broadway · 12 min walk" onPress={noop} />
      <ShopRow id="cameras" position="last" name="Olympia Cameras" meta="Closed · opens 9am" onPress={noop} />
    </View>
  );
}
