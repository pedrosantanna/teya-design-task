// Marks what an overlay zooms or grows from (iOS 26 patterns): the area row for the location sheet, an answer
// card for the details sheet. The overlay names the same id in its `origin` prop and measures this view as it opens.
import { useEffect, useRef, type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { registerOrigin, type ViewRef } from '../../internal/origins';

export type ZoomOriginProps = {
  /** "area", "answer:paperCo". The overlay's `origin` names the same id. */
  id: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ZoomOrigin({ id, children, style }: ZoomOriginProps) {
  const ref = useRef<ViewRef>(null);
  useEffect(() => registerOrigin(id, ref), [id]);
  return (
    <View ref={ref} collapsable={false} style={style}>
      {children}
    </View>
  );
}
