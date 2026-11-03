import Cancel01Icon from '@hugeicons/core-free-icons/Cancel01Icon';
import { memo } from 'react';

import { GlassButton } from '../GlassButton/GlassButton';

export type CloseButtonProps = {
  onPress?: () => void;
  /** Android: a tonal circle behind the × over the map or a photo. iOS and the web are always glass. */
  overMedia?: boolean;
  /** Defaults to "Close". */
  accessibilityLabel?: string;
};

/** An × in a 44 glass circle (iOS 26) on sheets and presented views; a Material icon button on Android. */
export const CloseButton = memo(function CloseButton({ onPress, overMedia = false, accessibilityLabel = 'Close' }: CloseButtonProps) {
  return <GlassButton icon={Cancel01Icon} accessibilityLabel={accessibilityLabel} onPress={onPress} overMedia={overMedia} />;
});
