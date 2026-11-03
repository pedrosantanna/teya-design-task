// The five small labels from tags.md: two chips the shopper taps (filter, suggestion) and three that
// only inform (status label, badge, count).
import Alert02Icon from '@hugeicons/core-free-icons/Alert02Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, useEffect } from 'react';
import { Text as NativeText, Pressable, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { cornerCurve, textStyle, type BadgeName, type ColorName } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

// ---------- Chip ----------

export type ChipProps = {
  label: string;
  /** filter: single choice, can be selected. suggestion: a tap sends the text. */
  kind?: 'filter' | 'suggestion';
  selected?: boolean;
  /** Filter chips: a count after "·" ("Needs you · 2"). */
  count?: number;
  /** An optional leading HugeIcons icon. */
  icon?: IconSvgElement;
  /** Called with the chip's `value` (or label), so lists can pass one stable handler. */
  onPress?: (value: string) => void;
  value?: string;
  testID?: string;
};

export const Chip = memo(function Chip({ label, kind = 'filter', selected = false, count, icon, onPress, value, testID }: ChipProps) {
  const { theme } = useUnistyles();
  const press = usePress('selection');
  const on = kind === 'filter' && selected;
  const progress = useSharedValue(on ? 1 : 0);
  const off = theme.color.muted;
  const onFill = theme.color.chipSelected;

  useEffect(() => {
    progress.set(withSpring(on ? 1 : 0, theme.spring.snappy));
  }, [on, progress, theme.spring.snappy]);

  const fill = useAnimatedStyle(() => ({ backgroundColor: interpolateColor(progress.get(), [0, 1], [off, onFill]) }));
  const text = count != null ? `${label} · ${count}` : label;
  const contentColor: ColorName = on ? 'onChipSelected' : 'foreground';
  const slop = (theme.hit.min - theme.size.chip) / 2;
  // Android adds a checkmark to a selected filter chip, as Material does (tags.md).
  const leading = on && theme.platform === 'android' ? Tick02Icon : icon;

  return (
    <Animated.View style={[styles.chipWrap, press.scaleStyle]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={text}
        accessibilityState={kind === 'filter' ? { selected: on } : undefined}
        hitSlop={slop}
        onPress={onPress ? () => onPress(value ?? label) : undefined}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <Animated.View style={[styles.chip, fill]}>
          <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
          {leading ? <Icon icon={leading} size="subheadline" color={contentColor} /> : null}
          <Text variant="subheadline" color={contentColor} numberOfLines={1}>
            {text}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
});

// ---------- Status label ----------

export type StatusTone = 'default' | 'needsYou' | 'warning' | 'success';

export type StatusLabelProps = {
  /** Exactly as in the conceptual model's state table ("Waiting for Paper & Co · not charged yet"). */
  label: string;
  /** needsYou: Tint. warning: the "not charged" endings, with the warning symbol. success: Ready, Paid, Collected. */
  tone?: StatusTone;
  /** A leading icon in place of the tone's own (FlashIcon for "In stock now · till"). */
  icon?: IconSvgElement;
};

export const StatusLabel = memo(function StatusLabel({ label, tone = 'default', icon }: StatusLabelProps) {
  const toneIcon = tone === 'warning' ? Alert02Icon : tone === 'success' ? Tick02Icon : undefined;
  const iconColor: ColorName = tone === 'warning' ? 'warning' : tone === 'success' ? 'success' : tone === 'needsYou' ? 'tint' : 'mutedForeground';
  const shown = icon ?? toneIcon;
  return (
    <View style={styles.status}>
      {shown ? <Icon icon={shown} size="caption1" color={iconColor} /> : null}
      {/* One line; the suffix after "·" may wrap under it at large text sizes before anything is cut. */}
      <Text variant="caption1" color={tone === 'needsYou' ? 'tint' : 'mutedForeground'} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
});

// ---------- Badge ----------

export type BadgeProps = {
  /** Promoted (Pistachio) always shows, as it discloses paid placement. */
  badge: BadgeName;
  label?: string;
};

const badgeLabels: Record<BadgeName, string> = { promoted: 'Promoted', new: 'New', delivers: 'Delivers' };

export const Badge = memo(function Badge({ badge, label }: BadgeProps) {
  return (
    <View style={styles.badge(badge)}>
      <NativeText style={styles.badgeText(badge)} numberOfLines={1}>
        {label ?? badgeLabels[badge]}
      </NativeText>
    </View>
  );
});

export function badgeLabel(badge: BadgeName): string {
  return badgeLabels[badge];
}

// ---------- Count ----------

export type CountProps = { value: number };

/** A number for requests that need the shopper; capped at "9+". Read by its parent's label. */
export const Count = memo(function Count({ value }: CountProps) {
  if (value <= 0) return null;
  return (
    <View style={styles.count} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Text variant="caption2" color="onPrimary">
        {value > 9 ? '9+' : String(value)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  chipWrap: { alignSelf: 'flex-start', maxWidth: '100%' },
  chip: {
    ...cornerCurve,
    height: theme.size.chip,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.space[3],
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1],
    overflow: 'hidden',
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  status: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1], flexShrink: 1 },
  badge: (badge: BadgeName) => ({
    ...cornerCurve,
    height: theme.size.badge,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.space[2],
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.color.badge[badge].fill,
  }),
  badgeText: (badge: BadgeName) => ({ ...textStyle(theme.type.caption2), color: theme.color.badge[badge].text }),
  count: {
    minWidth: theme.size.count,
    height: theme.size.count,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.space[1],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
  },
}));
