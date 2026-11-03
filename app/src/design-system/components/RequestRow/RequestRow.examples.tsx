import { View } from 'react-native';

import { images } from '../../../content/images';
import { RequestRow } from './RequestRow';

const photo = (key: keyof typeof images, w: number) => `${images[key].image}?w=${w}&q=80&auto=format`;
const noop = () => undefined;

// Needs you (with a button and unread count), looking, waiting. Swipe left on iOS or long-press on Android for Close.
export function RequestRowExamples() {
  return (
    <View>
      <RequestRow
        id="cake"
        name="Birthday cake"
        time="11:02am"
        preview="Snuffle: Rossi's can do it with 2 days' notice."
        status="Needs you · buy by Thu 5 Nov"
        tone="needsYou"
        image={photo('rossis-bakery-front', 120)}
        shopLogos={[photo('rossis-bakery-interior', 48)]}
        unread={2}
        actionLabel="Buy at Rossi's"
        onAction={noop}
        onPress={noop}
        onClose={noop}
      />
      <RequestRow id="glasses" name="Eclipse glasses" time="1:14pm" preview="Snuffle: Paper & Co has them too." status="2 shops have them · by 4pm" onPress={noop} onClose={noop} />
      <RequestRow id="hooks" name="Picture hooks" time="Mon" preview="You: Collect" status="Waiting for Halo Hardware · not charged yet" onPress={noop} />
    </View>
  );
}
