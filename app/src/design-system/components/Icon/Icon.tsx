import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import ArrowUp02Icon from '@hugeicons/core-free-icons/ArrowUp02Icon';
import MoreHorizontalIcon from '@hugeicons/core-free-icons/MoreHorizontalIcon';
import MoreVerticalIcon from '@hugeicons/core-free-icons/MoreVerticalIcon';
import SentIcon from '@hugeicons/core-free-icons/SentIcon';
import Share03Icon from '@hugeicons/core-free-icons/Share03Icon';
import Share08Icon from '@hugeicons/core-free-icons/Share08Icon';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import type { AppTheme, ColorName, TypeStyleName } from '../../theme';

/** Icons whose form follows the platform (imagery.md, Icon map). `chevron` has no Android form. */
export type PlatformIconName = 'share' | 'back' | 'more' | 'send' | 'chevron';

const platformIcons: Record<PlatformIconName, { ios: IconSvgElement; android: IconSvgElement | null }> = {
  share: { ios: Share03Icon, android: Share08Icon },
  back: { ios: ArrowLeft01Icon, android: ArrowLeft02Icon },
  more: { ios: MoreHorizontalIcon, android: MoreVerticalIcon },
  send: { ios: ArrowUp02Icon, android: SentIcon },
  chevron: { ios: ArrowRight01Icon, android: null },
};

/**
 * `nav`: 22, nav and toolbar. `bar`: 24, the Requests button and the ask bar.
 * A type style name: inline beside that text, its line height minus 4 (imagery.md).
 */
export type IconSize = 'nav' | 'bar' | TypeStyleName;

export type IconProps = {
  /** A HugeIcons icon imported from its own path, or a platform icon name. */
  icon: IconSvgElement | PlatformIconName;
  size?: IconSize;
  /** Stroke 1.5 beside regular and medium text, 2 beside semibold. Inline icons follow their text's weight. */
  weight?: 'regular' | 'strong';
  color?: ColorName;
  /** Only for an icon that acts on its own; decorative icons are hidden from screen readers. */
  accessibilityLabel?: string;
};

export function iconPixelSize(theme: AppTheme, size: IconSize): number {
  if (size === 'nav') return theme.size.icon.nav;
  if (size === 'bar') return theme.size.icon.bar;
  return theme.type[size].lineHeight - theme.space[1];
}

function strokeFor(theme: AppTheme, size: IconSize, weight?: 'regular' | 'strong'): number {
  const strong = weight ? weight === 'strong' : size !== 'nav' && size !== 'bar' && theme.type[size].fontWeight === '600';
  return strong ? 2 : 1.5;
}

export const Icon = memo(function Icon({ icon, size = 'nav', weight, color = 'foreground', accessibilityLabel }: IconProps) {
  const { theme } = useUnistyles();
  const svg = typeof icon === 'string' ? platformIcons[icon][theme.platform] : icon;
  if (!svg) return null;
  const px = iconPixelSize(theme, size);
  const drawn = <HugeiconsIcon icon={svg} size={px} strokeWidth={strokeFor(theme, size, weight)} color={theme.color[color]} />;
  if (accessibilityLabel) {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
        {drawn}
      </View>
    );
  }
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none">
      {drawn}
    </View>
  );
});
