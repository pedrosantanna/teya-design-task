// Glass on the web (shape.md, iOS 26 patterns): a backdrop blur with saturation over a translucent Card fill,
// a 1 px inner highlight along the top edge and a soft shadow. React Native Web drops style keys it doesn't
// know, so the backdrop filter and the shadow are written on the DOM node through a ref.
import { useCallback } from 'react';
import { Platform } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { withAlpha } from '../theme';

type WebNode = { style: Record<string, string> } | null;

/** A ref that turns a View into web glass. No-op on native. `shadow` adds the soft drop shadow.
 *  Values from components.md (Ask bar): Card at 55% under blur 20 and saturate 1.6, a 0.5 pt white highlight along
 *  the top edge at 60%, a 0.5 pt hairline (Foreground at 6% in light, Stone 360 in dark) and a 0 6 20 shadow at 10%.
 *  `fillOverride` replaces the Card fill (a control on a shop's tile takes the tonalOnTile overlay). `onTile` takes
 *  the on-tile values of the scheme (shape.md, Glass recipe): light keeps the glass; dark drops the saturation to 1
 *  and the drop shadow, so Back matches the street chips on the tile. The hairline stays (decision 049). */
export function useWebGlass(shadow = true, fillOverride?: string, onTile = false) {
  const { theme } = useUnistyles();
  const { glassBlur, glassHighlight, glassShadowY, glassShadowBlur, glassRim } = theme.state;
  const glassSaturate = onTile ? theme.state.glassSaturateOnTile : theme.state.glassSaturate;
  const glassShadow = onTile ? theme.state.glassShadowOnTile : theme.state.glassShadow;
  const highlight = withAlpha(theme.color.glassShine, glassHighlight);
  const edge = withAlpha(theme.color.glassHairline, theme.state.glassHairline);
  const drop = withAlpha(theme.color.glassEdge, glassShadow);
  const fill = fillOverride ?? withAlpha(theme.color.card, theme.state.glassFill);
  const hairline = glassRim;
  const lifted = shadow && glassShadow > 0;
  return useCallback(
    (node: unknown) => {
      if (Platform.OS !== 'web' || !node) return;
      const el = node as WebNode;
      if (!el?.style) return;
      const filter = `blur(${glassBlur}px) saturate(${glassSaturate * 100}%)`;
      el.style.backdropFilter = filter;
      el.style.webkitBackdropFilter = filter;
      el.style.backgroundColor = fill;
      const rim = `inset 0 ${hairline}px 0 ${highlight}, inset 0 0 0 ${hairline}px ${edge}`;
      el.style.boxShadow = lifted ? `${rim}, 0 ${glassShadowY}px ${glassShadowBlur}px ${drop}` : rim;
    },
    [glassBlur, glassSaturate, fill, highlight, edge, drop, glassShadowY, glassShadowBlur, hairline, lifted],
  );
}

/** A ref that blurs what is under a scroll-edge fade on the web, masked so the blur fades out with the gradient:
 *  full down to `fade` points above the edge's end, then out over those points (space.6 under the nav bar), so
 *  content under the bar never shows as soft shapes with a hard bottom edge (visual critique, round 3). */
export function useWebEdgeBlur(edge: 'top' | 'bottom', fade?: number) {
  const { theme } = useUnistyles();
  const blur = theme.state.glassBlur / 2;
  return useCallback(
    (node: unknown) => {
      if (Platform.OS !== 'web' || !node) return;
      const el = node as WebNode;
      if (!el?.style) return;
      const solid = fade != null ? `calc(100% - ${fade}px)` : '40%';
      const mask = `linear-gradient(to ${edge === 'top' ? 'bottom' : 'top'}, black ${solid}, transparent)`;
      el.style.backdropFilter = `blur(${blur}px)`;
      el.style.webkitBackdropFilter = `blur(${blur}px)`;
      el.style.maskImage = mask;
      el.style.webkitMaskImage = mask;
    },
    [blur, edge, fade],
  );
}
