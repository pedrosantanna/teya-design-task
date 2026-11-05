import { View } from 'react-native';

import { imageSource, type ImageKey } from '../../../content/images';
import { RequestRow } from './RequestRow';

const photo = (key: ImageKey, w: number) => imageSource(key, w / 2);
const noop = () => undefined;

// Needs you (with an unread count), looking, waiting. Swipe left on iOS or long-press on Android for Close.
export function RequestRowExamples() {
  return (
    <View>
      <RequestRow
        id="cake"
        name="Birthday cake"
        time="11:02am"
        preview="Snuffle: Rossi's needs your answer"
        status="Needs you · buy by Thu 5 Nov"
        tone="needsYou"
        image={photo('rossis-bakery-front', 120)}
        unread={1}
        onPress={noop}
        onClose={noop}
      />
      <RequestRow id="glasses" name="Eclipse glasses" time="1:14pm" preview="Snuffle: Found them at 2 shops" status="2 shops have them · by 4pm" onPress={noop} onClose={noop} />
      <RequestRow id="hooks" name="Picture hooks" time="Mon" preview="Snuffle: Paid. Halo Hardware is setting it aside" status="Waiting for Halo Hardware · not charged yet" onPress={noop} />
    </View>
  );
}
