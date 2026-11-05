// A 3D illustration rendered ahead of time from the docs viewer (docs/develop/design-system/illustrations.md):
// a still PNG plus clips, each shaded for the ground it sits on. A clip on a flat ground is an MP4 (expo-video,
// baked on that ground); a clip with a crossfading ground (Getting started) is an animated WebP with alpha
// (expo-image). Assets and their sizes come from manifest.generated.ts (app/scripts/illustrations). Decorative by default.
import { useIsFocused } from 'expo-router';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
import { memo, useEffect, useId, useState } from 'react';
import { View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGround } from '../../internal/ground';
import { IMAGE_FILL, IMAGE_OVER } from '../../internal/media';
import {
  CATEGORY_ILLUSTRATIONS,
  ILLUSTRATIONS,
  ILLUSTRATION_HEIGHTS,
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
  /** small 64, medium 88, large 120, hero 352 (the location ask), welcome 312 (Getting started), bleed 460 × 420 (a window onto the Getting started crossroads, wider than the screen so the screen crops it). */
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
export function illustrationAsset(
  name: IllustrationName,
  ground: IllustrationGround,
  scheme: IllustrationScheme,
  size: IllustrationSize,
): IllustrationAsset | undefined {
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

/** A category card's art (transparent, shaded for the category's colour) for the active scheme. */
export function categoryIllustration(id: CategoryId, scheme: IllustrationScheme) {
  return CATEGORY_ILLUSTRATIONS[id]?.[scheme];
}

type Phase = 'entry' | 'idle' | 'still';

/** One muted player for a clip pair: the entry plays once, then the same player loads the idle loop. The still sits
 *  behind it and shows until the first frame is drawn. Illustration unmounts it while its screen is not focused. */
function ClipVideo({ entry, idle }: { entry?: number; idle?: number }) {
  const player = useVideoPlayer(entry ?? idle ?? null, (p) => {
    p.muted = true;
    p.loop = !entry;
    p.keepScreenOnWhilePlaying = false;
    p.audioMixingMode = 'mixWithOthers';
    p.allowsExternalPlayback = false;
    p.play();
  });
  useEffect(() => {
    if (!entry) return;
    const sub = player.addListener('playToEnd', () => {
      if (!idle) return;
      player.loop = true;
      player
        .replaceAsync(idle)
        .then(() => player.play())
        .catch(() => undefined);
    });
    return () => sub.remove();
  }, [player, entry, idle]);
  return (
    <VideoView
      player={player}
      surfaceType="textureView"
      nativeControls={false}
      fullscreenOptions={{ enable: false }}
      allowsPictureInPicture={false}
      contentFit="contain"
      style={IMAGE_FILL}
    />
  );
}

const LIFT_REACH = 1.9;

// The location ask's art is shaded for a ground one step above the screen's Background (color.location, dark mode), so
// its outlines read. The screen keeps the Background; this soft radial lift, in that colour, sits behind the art and
// fades out well inside the screen (visual critique, round 12). In light mode the two are the same colour: no lift.
function Lift({ side }: { side: number }) {
  const { theme } = useUnistyles();
  const id = `lift${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  if (theme.color.location === theme.color.background) return null;
  return (
    <View style={styles.lift(side)} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={theme.color.location} stopOpacity={1} />
            <Stop offset="0.5" stopColor={theme.color.location} stopOpacity={0.85} />
            <Stop offset="1" stopColor={theme.color.location} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

export const Illustration = memo(function Illustration({
  name,
  size = 'large',
  ground: groundProp,
  play = 'entry-then-idle',
  accessibilityLabel,
}: IllustrationProps) {
  const scheme = useIllustrationScheme();
  // A chat's ground is Card in light mode and Background in dark (craft-pass-2); elsewhere, the Background.
  const onChat = useGround() === 'chat';
  const ground: IllustrationGround = groundProp ?? (onChat && scheme === 'light' ? 'card' : 'background');
  const reduceMotion = useReducedMotion();
  const focused = useIsFocused();
  const asset = illustrationAsset(name, ground, scheme, size);
  const first: Phase =
    reduceMotion || play === 'still' || !asset
      ? 'still'
      : play === 'idle'
        ? asset.idle
          ? 'idle'
          : 'still'
        : asset.entry
          ? 'entry'
          : asset.idle
            ? 'idle'
            : 'still';
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
  // Video for the whole play when every clip it needs is an MP4; the phase timers below only serve the WebP path.
  const wanted = first === 'still' ? [] : play === 'idle' ? [asset.idle] : [asset.entry, asset.idle];
  const videoOf = (c?: { video?: number }) => c?.video;
  const useVideo = wanted.length > 0 && wanted.every((c) => !c || videoOf(c));
  // A screen under another one (or a tab out of sight) keeps only the still: a stacked player would keep decoding.
  const showVideo = useVideo && focused;
  const source = phase === 'entry' ? asset.entry?.source : phase === 'idle' ? asset.idle?.source : asset.still;
  const image = showVideo ? (
    <>
      <Image source={asset.still} contentFit="contain" transition={0} style={IMAGE_FILL} accessible={false} />
      <View style={IMAGE_OVER}>
        <ClipVideo key={key} entry={play === 'idle' ? undefined : videoOf(asset.entry)} idle={videoOf(asset.idle)} />
      </View>
    </>
  ) : (
    <Image
      source={useVideo ? asset.still : source}
      // The still is the rest pose (the entry's last frame and the idle's first), shown until a clip is decoded.
      placeholder={phase === 'still' || useVideo ? undefined : asset.still}
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
        {ground === 'location' ? <Lift side={ILLUSTRATION_SIZES[size]} /> : null}
        {image}
      </View>
    );
  }
  return (
    <View style={styles.box(size)} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {ground === 'location' ? <Lift side={ILLUSTRATION_SIZES[size]} /> : null}
      {image}
    </View>
  );
});

const styles = StyleSheet.create(() => ({
  lift: (side: number) => ({
    position: 'absolute',
    top: -side * ((LIFT_REACH - 1) / 2),
    left: -side * ((LIFT_REACH - 1) / 2),
    width: side * LIFT_REACH,
    height: side * LIFT_REACH,
  }),
  box: (size: IllustrationSize) => {
    const side = ILLUSTRATION_SIZES[size];
    return { width: side, height: ILLUSTRATION_HEIGHTS[size] ?? side };
  },
}));
