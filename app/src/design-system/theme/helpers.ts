// Small helpers that turn theme values into style values. Components use these instead of raw numbers.
import { Platform } from 'react-native';

import type { AppTheme } from './theme.generated';

type TypeStyle = AppTheme['type'][keyof AppTheme['type']];

/** Text style for a type style token. Until the fonts load, or if they fail, native falls back to the system font (decision 027). */
export function textStyle(style: TypeStyle) {
  return {
    fontFamily: fontFamilyFor(style),
    fontWeight: style.fontWeight,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };
}

/** Families registered with expo-font (fonts.ts). The root waits for them before rendering text. */
const loadedFamilies = new Set<string>();

export function markFontsLoaded(families: string[]) {
  for (const family of families) loadedFamilies.add(family);
}

function fontFamilyFor(style: TypeStyle): string | undefined {
  if (Platform.OS === 'web') {
    return style.fontFamilyWeb;
  }
  return loadedFamilies.has(style.fontFamily) ? style.fontFamily : undefined;
}

/** Continuous (squircle) corners on iOS, circular arcs elsewhere (shape.md). */
export const cornerCurve = Platform.OS === 'ios' ? ({ borderCurve: 'continuous' } as const) : {};

/** A hex colour with an alpha channel, for state layers and disabled containers. */
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

/** Screen margin for the current width: 16 below 414 pt, 20 from 414 up on iOS; 16 dp on Android (spacing.md). */
export function screenMargin(theme: AppTheme, width: number): number {
  const regularFrom = 414;
  return width >= regularFrom ? theme.margin.screenRegular : theme.margin.screenCompact;
}
