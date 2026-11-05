// The five small labels from tags.md: two chips the shopper taps (filter, suggestion) and three that
// only inform (status label, badge, count).
import Alert02Icon from '@hugeicons/core-free-icons/Alert02Icon';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo, useEffect } from 'react';
import { Text as NativeText, Pressable, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround, useGroundAccent } from '../../internal/ground';
import { webHitArea } from '../../internal/hitArea';
import { usePress } from '../../internal/usePress';
import { cornerCurve, textStyle, withAlpha, type BadgeName, type ColorName } from '../../theme';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

// ---------- Chip ----------

export type ChipProps = {
  label: string;
  /** filter: single choice, can be selected. suggestion: a tap sends the text. menu: a value already set (the place
   *  and deadline on New Request), drawn like an unselected chip with a chevron; a tap opens its choices. */
  kind?: 'filter' | 'suggestion' | 'menu';
  selected?: boolean;
  /** Filter chips: a count after the label, in Muted foreground ("Needs you 2"). */
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
  // Off sits a level down from the selected chip (tags.md): on a shop's or category's tile, the tonalOnTile overlay;
  // on the Background or a sheet in light, that ground itself with a 1 pt edge (glassEdge at state.chipEdge); on the
  // Background in dark, the Background with a 1 pt Border edge (Card read the same as the selected chip); on a dark
  // sheet and inside a Card section (the shop page), Muted; on a chat's white ground, the chat chip colour.
  // On: Card with Indigo 800 semibold text and a 1.5 pt Indigo 800 edge (light), Card with Indigo 300 text and a
  // 1 pt edge (dark), on every ground (decision 049).
  const ground = useGround();
  // On the shop page's sheet and card grounds an accent colours the chips: the accent's tile fill with Foreground text, and
  // in dark its Detail colour as a 1 pt edge, so the chip carries the shop's colour without a large pastel area.
  const accent = useGroundAccent();
  const tinted = (ground === 'sheet' || ground === 'card' || ground === 'shop') && accent && !on ? theme.color.shop.accent[accent] : undefined;
  const dark = theme.scheme === 'dark';
  const plain = (ground === 'background' || ground === 'sheet' || ground === 'shop') && !dark;
  const darkGround = ground === 'background' && dark;
  const off =
    ground === 'chat'
      ? theme.color.chat.fill
      : ground === 'tile'
        ? withAlpha(theme.color.tonalOnTile, theme.state.tonalOnTile)
        : ground === 'card' || ((ground === 'sheet' || ground === 'shop') && dark)
          ? theme.color.muted
          : plain
            ? ground === 'shop' ? theme.color.shopPage.row : theme.color[ground === 'sheet' ? 'sheet' : 'background']
            : darkGround
              ? theme.color.background
              : theme.color.card;
  // Muted on Card in dark is 1.15:1, so a chip inside a Card section takes the Border edge there too.
  const darkCard = ground === 'card' && dark;
  const offEdge = ground === 'chat' ? theme.color.chat.fieldEdge : plain ? withAlpha(theme.color.glassEdge, theme.state.chipEdge) : darkGround || darkCard ? theme.color.border : off;
  const fillOff = tinted ? tinted.tile : off;
  const edgeOff = tinted ? (dark ? tinted.detail : tinted.tile) : offEdge;
  const onFill = theme.color.card;
  const onEdge = theme.color.chipOn;

  useEffect(() => {
    progress.set(withSpring(on ? 1 : 0, theme.spring.snappy));
  }, [on, progress, theme.spring.snappy]);

  const fill = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [fillOff, onFill]),
    borderColor: interpolateColor(progress.get(), [0, 1], [edgeOff, onEdge]),
  }));
  const text = count != null ? `${label}, ${count}` : label;
  const contentColor: ColorName = on ? 'chipOn' : 'foreground';
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
        accessibilityHint={kind === 'menu' && onPress ? 'Shows the choices' : undefined}
        hitSlop={slop}
        style={webHitArea(theme.size.chip, theme.hit.min)}
        onPress={onPress ? () => onPress(value ?? label) : undefined}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <Animated.View style={[styles.chip, on && styles.chipOn, fill]}>
          <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
          {leading ? <Icon icon={leading} size="subheadline" color={contentColor} /> : null}
          <Text variant={on ? 'subheadlineStrong' : 'subheadline'} color={contentColor} numberOfLines={1}>
            {label}
          </Text>
          {count != null ? (
            <Text variant="subheadline" color={on ? 'chipOn' : 'mutedForeground'} numberOfLines={1}>
              {String(count)}
            </Text>
          ) : null}
          {kind === 'menu' ? <Icon icon={ArrowDown01Icon} size="subheadline" color="mutedForeground" /> : null}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
});

// ---------- Status label ----------

export type StatusTone = 'default' | 'needsYou' | 'warning' | 'success' | 'quiet';

export type StatusLabelProps = {
  /** The state table's label ("Waiting for Paper & Co · not charged yet"). The table's dot only separates the status from its
   *  detail; it is never drawn: the status shows in its own weight and colour, the detail after it in Muted foreground. */
  label: string;
  /** needsYou: the status in a Card pill, Foreground semibold, so Buy is the only Indigo on a request row. warning: the "not charged" endings, with the warning symbol and colour. success: Ready, Paid, Collected, with the check and colour. quiet: a no or a wait ("Doesn't have them"), in Muted foreground, regular. */
  tone?: StatusTone;
  /** A leading icon in place of the tone's own (FlashIcon for "In stock now · till"). */
  icon?: IconSvgElement;
};

/** Splits a state-table label at its dot: the status, and what follows it, first letter capitalised ("Collect by Mon 9 Nov"). */
export function splitStatus(label: string): { status: string; detail?: string } {
  const [status, ...rest] = label.split(' · ');
  const detail = rest.join(', ');
  return { status, detail: detail ? `${detail[0].toUpperCase()}${detail.slice(1)}` : undefined };
}

export const StatusLabel = memo(function StatusLabel({ label, tone = 'default', icon }: StatusLabelProps) {
  const toneIcon = tone === 'warning' ? Alert02Icon : tone === 'success' ? Tick02Icon : undefined;
  const color: ColorName = tone === 'warning' ? 'warning' : tone === 'success' ? 'success' : tone === 'quiet' ? 'mutedForeground' : 'foreground';
  const shown = icon ?? toneIcon;
  const { status, detail } = splitStatus(label);
  const pill = tone === 'needsYou';
  return (
    <View style={styles.status}>
      <View style={[styles.statusMain, pill && styles.pill]}>
        {shown ? <Icon icon={shown} size="caption1" color={tone === 'warning' || tone === 'success' ? color : 'mutedForeground'} /> : null}
        <Text variant={tone === 'quiet' ? 'caption1' : 'caption1Strong'} color={color} numberOfLines={2}>
          {status}
        </Text>
      </View>
      {detail ? (
        <Text variant="caption1" color="mutedForeground" numberOfLines={2}>
          {detail}
        </Text>
      ) : null}
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
    // The edge (size.edge.control, 1 pt) sits inside the 12 pt side padding, so the label doesn't move when the
    // chip turns on and its edge grows to size.edge.selected.
    paddingHorizontal: theme.space[3] - theme.size.edge.control,
    borderWidth: theme.size.edge.control,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1],
    overflow: 'hidden',
  },
  chipOn: { paddingHorizontal: theme.space[3] - theme.size.edge.selected, borderWidth: theme.size.edge.selected },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  // The status and its detail wrap as two units, 8 pt apart.
  status: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: theme.space[2], rowGap: theme.space[1], flexShrink: 1 },
  statusMain: { flexDirection: 'row', alignItems: 'center', gap: theme.space[1], flexShrink: 1 },
  // "Needs you": a Card pill a level above the Background (1.2:1 in light, 1.4:1 in dark), not a control's fill.
  pill: {
    ...cornerCurve,
    height: theme.size.badge,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.space[2],
    backgroundColor: theme.color.card,
  },
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
