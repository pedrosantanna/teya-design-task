// The rating sheet (change shop-ratings-and-range, components.md): "Would you go back?" as the sheet's title with the
// shop as context under it in the header, two large thumb buttons, tags that follow the answer (up to three, from the
// conceptual model's two lists), an optional note of up to 140 characters, and Send right under the thumbs once an
// answer is chosen (hidden before, as the spec's Empty state; in the content, not pinned to the bottom, so the medium
// detent has neither an empty band nor a Send below the fold); the optional reasons and note come after it.
// Thumbs, never stars. Composes Sheet at the medium detent on the standard sheet ground.
import ThumbsDownIcon from '@hugeicons/core-free-icons/ThumbsDownIcon';
import ThumbsUpIcon from '@hugeicons/core-free-icons/ThumbsUpIcon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import type { IconSvgElement } from '@hugeicons/react-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { usePress } from '../../internal/usePress';
import { cornerCurve } from '../../theme';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Sheet } from '../Sheet/Sheet';
import { Chip } from '../Tag/Tag';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';

export type RatingSheetProps = {
  open: boolean;
  onClose: () => void;
  /** The shop's name, in the context line under the title: "Your visit to Paper & Co". */
  shop: string;
  /** The answer to "Would you go back?"; null until one is chosen. */
  up: boolean | null;
  /** Tags offered after a thumbs up, and after a thumbs down. */
  upTags: string[];
  downTags: string[];
  /** Tags chosen. */
  tags: string[];
  note: string;
  noteMax: number;
  onAnswer: (up: boolean) => void;
  onToggleTag: (tag: string) => void;
  onNote: (note: string) => void;
  /** Send appears once an answer is chosen. */
  onSend: () => void;
};

export const RatingSheet = memo(function RatingSheet({
  open,
  onClose,
  shop,
  up,
  upTags,
  downTags,
  tags,
  note,
  noteMax,
  onAnswer,
  onToggleTag,
  onNote,
  onSend,
}: RatingSheetProps) {
  const offered = up == null ? [] : up ? upTags : downTags;
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Would you go back?"
      subtitle={`Your visit to ${shop}`}
    >
      <View style={styles.thumbs} accessibilityRole="radiogroup" accessibilityLabel="Would you go back?">
        <Thumb icon={ThumbsUpIcon} label="Yes" spoken="Yes, I'd go back" selected={up === true} onPress={() => onAnswer(true)} />
        <Thumb icon={ThumbsDownIcon} label="No" spoken="No, I wouldn't go back" selected={up === false} onPress={() => onAnswer(false)} />
      </View>
      {/* Send right under the thumbs once there is an answer, so it is in view at the medium detent; the optional
          reasons and note follow below it. */}
      {up != null ? <Button label="Send" onPress={onSend} /> : null}
      {offered.length > 0 ? (
        <View style={[styles.group, styles.reasons]}>
          <Text variant="footnote" color="mutedForeground">
            {up ? 'What went well?' : 'What went wrong?'}
          </Text>
          {/* The sheet's own ground: chips take Card in light, Muted in dark. */}
          <View style={styles.chips}>
            {offered.map((tag) => (
              <Chip key={tag} label={tag} selected={tags.includes(tag)} onPress={onToggleTag} />
            ))}
          </View>
        </View>
      ) : null}
      {up != null ? (
        <View style={styles.group}>
          <TextField multiline value={note} onChangeText={onNote} maxLength={noteMax} label="Anything to add?" placeholder={`Optional, ${noteMax} characters`} />
          <Text variant="caption1" color="mutedForeground" align="right">{`${note.length}/${noteMax}`}</Text>
        </View>
      ) : null}
    </Sheet>
  );
});

function Thumb({ icon, label, spoken, selected, onPress }: { icon: IconSvgElement; label: string; spoken: string; selected: boolean; onPress: () => void }) {
  const press = usePress('selection');
  return (
    <Animated.View style={[styles.thumbWrap, press.scaleStyle]}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ checked: selected, selected }}
        accessibilityLabel={spoken}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={styles.thumb(selected)}
      >
        <Animated.View pointerEvents="none" style={[styles.layer, press.layerStyle]} />
        {/* The check says "chosen" without relying on the tonal fill alone (components.md). */}
        {selected ? (
          <View style={styles.check}>
            <Icon icon={Tick02Icon} size="subheadline" weight="strong" color="onChipSelected" />
          </View>
        ) : null}
        <Icon icon={icon} size="title1" weight={selected ? 'strong' : 'regular'} color={selected ? 'onChipSelected' : 'foreground'} />
        <Text variant={selected ? 'subheadlineStrong' : 'subheadline'} color={selected ? 'onChipSelected' : 'foreground'}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  thumbs: { flexDirection: 'row', gap: theme.space[3] },
  thumbWrap: { flex: 1 },
  // Large targets, two hit heights tall (88), radius.bubble (20). Selected takes the selected chip's tonal Indigo with its 1 pt edge (colour.md).
  // Off: Card in light; tag.fillRaised in dark (1.58:1 on the sheet). Dark has no edges: the edge takes the fill's own colour,
  // and the selected button stays distinct by its Indigo fill, the check and the heavier label.
  thumb: (selected: boolean) => {
    const dark = theme.scheme === 'dark';
    const off = dark ? theme.color.tag.fillRaised : theme.color.card;
    const on = dark ? theme.color.chipSelectedRaised : theme.color.chipSelected;
    return {
      ...cornerCurve,
      minHeight: theme.hit.min * 2,
      borderRadius: theme.radius.bubble,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.space[1],
      paddingVertical: theme.space[3],
      borderWidth: theme.size.edge.control,
      borderColor: selected ? (dark ? on : theme.color.chipSelectedEdge) : off,
      backgroundColor: selected ? on : off,
      overflow: 'hidden',
    };
  },
  layer: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.color.foreground },
  group: { gap: theme.space[2] },
  // "What went well?" sits 24 under Send and 8 over its chips, closer to what it introduces.
  reasons: { marginTop: theme.space[3] },
  check: { position: 'absolute', top: theme.space[3], right: theme.space[3] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.space[2] },
}));
