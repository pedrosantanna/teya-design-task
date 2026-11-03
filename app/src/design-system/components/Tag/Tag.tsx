// The five small labels from tags.md: two chips the shopper taps (filter, suggestion) and three that
// only inform (status label, badge, count).
import Alert02Icon from '@hugeicons/core-free-icons/Alert02Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, useEffect } from 'react';
import { Text as NativeText, Pressable, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround } from '../../internal/ground';
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
  // Off: Card, since Muted barely shows on the background (1.07:1); on a chat's white ground, the chat chip colour.
  // On: tonal Indigo (Indigo 100, Indigo 800 text, semibold): Foreground was the heaviest mark on screen (tags.md).
  const ground = useGround();
  const off = ground === 'chat' ? theme.color.chat.fill : theme.color.card;
  const onFill = theme.color.chipSelected;

  useEffect(() => {
    progress.set(withSpring(on ? 1 : 0, theme.spring.snappy));
  }, [on, progress, theme.spring.snappy]);

  // Selected also gets a 1 pt Indigo 200 edge (Indigo 800 in dark): the tonal fill alone has less surface than a
  // white chip beside it (visual critique 2). The edge is the fill's colour while off, so nothing shifts.
  const onEdge = theme.color.chipSelectedEdge;
  const fill = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [off, onFill]),
    borderColor: interpolateColor(progress.get(), [0, 1], [off, onEdge]),
  }));
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
          <Text variant={on ? 'subheadlineStrong' : 'subheadline'} color={contentColor} numberOfLines={1}>
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
  /** needsYou: Foreground semibold, so Buy is the only Indigo on a request row. warning: the "not charged" endings, with the warning symbol. success: Ready, Paid, Collected. */
  tone?: StatusTone;
  /** A leading icon in place of the tone's own (FlashIcon for "In stock now · till"). */
  icon?: IconSvgElement;
};

export const StatusLabel = memo(function StatusLabel({ label, tone = 'default', icon }: StatusLabelProps) {
  const toneIcon = tone === 'warning' ? Alert02Icon : tone === 'success' ? Tick02Icon : undefined;
  const iconColor: ColorName = tone === 'warning' ? 'warning' : tone === 'success' ? 'success' : tone === 'needsYou' ? 'foreground' : 'mutedForeground';
  const shown = icon ?? toneIcon;
  return (
    <View style={styles.status}>
      {shown ? <Icon icon={shown} size="caption1" color={iconColor} /> : null}
      {/* One line; the suffix after "·" may wrap under it at large text sizes before anything is cut. */}
      <Text variant={tone === 'needsYou' ? 'caption1Strong' : 'caption1'} color={tone === 'needsYou' ? 'foreground' : 'mutedForeground'} numberOfLines={2}>
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
  /** photo (default): the badge's own fill, the light values in both modes. wash: on a shop's accent (the shop
   *  page header), Card fill and Foreground text, so it doesn't sit pastel on pastel. */
  on?: 'photo' | 'wash';
};

const badgeLabels: Record<BadgeName, string> = { promoted: 'Promoted', new: 'New', delivers: 'Delivers' };

export const Badge = memo(function Badge({ badge, label, on = 'photo' }: BadgeProps) {
  const wash = on === 'wash';
  return (
    <View style={[styles.badge(badge), wash && styles.badgeOnWash]}>
      <NativeText style={[styles.badgeText(badge), wash && styles.badgeTextOnWash]} numberOfLines={1}>
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
      <Text variant="caption2" color="onCount">
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
    // A 1 pt edge (space.1 / 4) inside the 12 pt side padding, so the label doesn't move when it turns on.
    paddingHorizontal: theme.space[3] - theme.space[1] / 4,
    borderWidth: theme.space[1] / 4,
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
  badgeOnWash: { backgroundColor: theme.color.card },
  badgeTextOnWash: { color: theme.color.foreground },
  // Indigo 800 in both modes, at least 18 across inside a 2 pt ring in the ground colour, so it cuts out of the glass.
  count: {
    minWidth: theme.size.count + 2 * theme.size.askBar.ring,
    height: theme.size.count + 2 * theme.size.askBar.ring,
    borderRadius: theme.radius.full,
    borderWidth: theme.size.askBar.ring,
    borderColor: theme.color.background,
    paddingHorizontal: theme.space[1],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.count,
  },
}));
