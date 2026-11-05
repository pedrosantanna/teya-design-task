// A 3D illustration rendered ahead of time from the docs viewer (docs/develop/design-system/illustrations.md):
// a still PNG plus animated WebP clips, each shaded for the ground it sits on. Assets and their sizes come from
// manifest.generated.ts (app/scripts/illustrations). Decorative by default.
import { Image } from 'expo-image';
import { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround } from '../../internal/ground';
import { IMAGE_FILL } from '../../internal/media';
import {
  CATEGORY_ILLUSTRATIONS,
  ILLUSTRATIONS,
  ILLUSTRATION_SIZES,
  type CategoryId,
  type IllustrationAsset,
  type IllustrationGround,
  type IllustrationName,
  type IllustrationScheme,
  type IllustrationSize,
} from './manifest.generated';

export type IllustrationPlay = 'entry-then-idle' | 'idle' | 'still';

export type IllustrationProps = {
  name: IllustrationName;
  /** small 64, medium 88, large 120, hero 220 (the location ask), welcome 240 (Getting started). */
  size?: IllustrationSize;
  /** The surface it sits on; shading and shadow are baked for it. The light or dark file follows the theme.
   *  welcome: Getting started, where each object is rendered for its own page's Indigo ground. */
  ground?: IllustrationGround;
  /** entry-then-idle: parts drop in once, then the idle loop (or the still when there is none). */
  play?: IllustrationPlay;
  /** Only when the picture carries meaning; without it the illustration is hidden from assistive tech. */
  accessibilityLabel?: string;
};

/** Light or dark, from the active theme (iosLight, androidDark…). */
export function useIllustrationScheme(): IllustrationScheme {
  const { rt } = useUnistyles();
  return rt.themeName?.toLowerCase().endsWith('dark') ? 'dark' : 'light';
}

/** The asset for a name, ground and size; falls back to another size, then the other ground, of the same scheme. */
export function illustrationAsset(name: IllustrationName, ground: IllustrationGround, scheme: IllustrationScheme, size: IllustrationSize): IllustrationAsset | undefined {
  const sizes = Object.keys(ILLUSTRATION_SIZES) as IllustrationSize[];
  const others: IllustrationGround[] = (['background', 'card'] as const).filter((g) => g !== ground);
  for (const g of [ground, ...others]) {
    const bySize = ILLUSTRATIONS[name]?.[`${g}-${scheme}`];
    if (!bySize) continue;
    const exact = bySize[size];
    if (exact) return exact;
    // the next larger size scales down cleanly; else the largest there is
    const larger = sizes.filter((s) => ILLUSTRATION_SIZES[s] > ILLUSTRATION_SIZES[size]).find((s) => bySize[s]);
    const any = larger ?? [...sizes].reverse().find((s) => bySize[s]);
    if (any) return bySize[any];
  }
  return undefined;
}

/** Whether a shop kind has category art. */
export function isCategoryId(id: string): id is CategoryId {
  return id in CATEGORY_ILLUSTRATIONS;
}

/** A category card's art (opaque, on the category's colour) for the active scheme. */
export function categoryIllustration(id: CategoryId, scheme: IllustrationScheme) {
  return CATEGORY_ILLUSTRATIONS[id]?.[scheme];
}

type Phase = 'entry' | 'idle' | 'still';

export const Illustration = memo(function Illustration({ name, size = 'large', ground: groundProp, play = 'entry-then-idle', accessibilityLabel }: IllustrationProps) {
  const scheme = useIllustrationScheme();
  // A chat's ground is Card in light mode and Background in dark (craft-pass-2); elsewhere, the Background.
  const onChat = useGround() === 'chat';
  const ground: IllustrationGround = groundProp ?? (onChat && scheme === 'light' ? 'card' : 'background');
  const reduceMotion = useReducedMotion();
  const asset = illustrationAsset(name, ground, scheme, size);
  const first: Phase = reduceMotion || play === 'still' || !asset ? 'still' : play === 'idle' ? (asset.idle ? 'idle' : 'still') : asset.entry ? 'entry' : asset.idle ? 'idle' : 'still';
  const [phase, setPhase] = useState<Phase>(first);
  const [key, setKey] = useState(`${name}/${ground}/${scheme}/${size}/${play}/${reduceMotion}`);
  const nextKey = `${name}/${ground}/${scheme}/${size}/${play}/${reduceMotion}`;
  if (key !== nextKey) {
    // a new asset or setting starts over (but a theme switch mid-entry simply restarts the clip)
    setKey(nextKey);
    setPhase(first);
  }

  // After the entry clip has played once, hand over to the idle loop, or to the still.
  const entryMs = asset?.entry?.ms ?? 0;
  const hasIdle = !!asset?.idle;
  useEffect(() => {
    if (phase !== 'entry') return;
    const t = setTimeout(() => setPhase(hasIdle ? 'idle' : 'still'), entryMs);
    return () => clearTimeout(t);
  }, [phase, entryMs, hasIdle]);

  if (!asset) return <View style={styles.box(size)} />;
  const source = phase === 'entry' ? asset.entry!.source : phase === 'idle' ? asset.idle!.source : asset.still;
  const image = (
    <Image
      source={source}
      // The still is the rest pose (the entry's last frame and the idle's first), shown until a clip is decoded.
      placeholder={phase === 'still' ? undefined : asset.still}
      placeholderContentFit="contain"
      contentFit="contain"
      transition={0}
      autoplay
      cachePolicy="memory-disk"
      style={IMAGE_FILL}
      accessible={false}
    />
  );
  if (accessibilityLabel) {
    return (
      <View style={styles.box(size)} accessible accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
        {image}
      </View>
    );
  }
  return (
    <View style={styles.box(size)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {image}
    </View>
  );
});

const styles = StyleSheet.create(() => ({
  box: (size: IllustrationSize) => {
    const side = ILLUSTRATION_SIZES[size];
    return { width: side, height: side };
  },
}));
