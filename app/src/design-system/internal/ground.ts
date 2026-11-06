// Which ground a component sits on (craft-pass-2). Chats use a neutral ground (white in light mode, Background in
// dark); there, Card surfaces need an edge and chips take the chat chip colour. The chat screens wrap their content
// in `<Ground value="chat">`; a grouped card that holds chips (the shop page's sections) wraps them in
// `<Ground value="card">`, where chips take Muted; the shop page's actions sit on its accent tile in
// `<Ground value="tile">`, where tonal buttons take a white overlay (state.tonalOnTile) instead of Muted; a sheet
// wraps its content in `<Ground value="sheet">`, where rows and chips sit one level above the sheet's ground (Card in
// light, Muted in dark); everything else is on the screen's Background. A tile ground also names its accent, so rows on
// it take that accent's cardOnTile (the Category screen, decision 050: a tinted card lighter than the dark tile). The shop
// page's whole card is a tile ground (round 10, decision 056): rows, chips, buttons and secondary text all take their on-tile colours.
// The tile is the light pastel in both modes (round 18, option 2 variation 4), so text straight on it is ink in dark too,
// while a surface painted on it (a row, a card, a chip, a tonal button) is dark in dark mode with light text: such a
// surface wraps its content in `<OnTileSurface>`, which makes it a `tileCard` ground.
import { createContext, createElement, useContext, type ReactNode } from 'react';

import type { ColorName, ShopAccentName } from '../theme';

export type GroundName = 'background' | 'chat' | 'card' | 'tile' | 'tileCard' | 'sheet';

const GroundContext = createContext<GroundName>('background');
const GroundAccentContext = createContext<ShopAccentName | undefined>(undefined);

export function Ground({ value, accent, children }: { value: GroundName; accent?: ShopAccentName; children?: ReactNode }) {
  const inner = createElement(GroundContext.Provider, { value }, children);
  return (value === 'tile' || value === 'tileCard' || value === 'sheet' || value === 'card') && accent ? createElement(GroundAccentContext.Provider, { value: accent }, inner) : inner;
}

/** The accent of the tile under a component, when it sits on one (`<Ground value="tile" accent>`). */
export function useTileAccent(): ShopAccentName | undefined {
  const ground = useContext(GroundContext);
  const accent = useContext(GroundAccentContext);
  return ground === 'tile' ? accent : undefined;
}

/** The accent of the tile a surface sits on, from inside that surface (a `tileCard` ground): its chips take the accent's chipOnCard. */
export function useTileCardAccent(): ShopAccentName | undefined {
  const ground = useContext(GroundContext);
  const accent = useContext(GroundAccentContext);
  return ground === 'tileCard' ? accent : undefined;
}

/** The accent a neutral ground carries for small details (`<Ground value="sheet" accent>`, `<Ground value="card" accent>`): chips take the accent's tile fill, with no edge. */
export function useGroundAccent(): ShopAccentName | undefined {
  return useContext(GroundAccentContext);
}

export function useGround(): GroundName {
  return useContext(GroundContext);
}

/** A colour role as it reads on the ground under it. Straight on a tile, text takes the on-tile roles (ink on the pastel
 *  tile in dark, the usual colours in light); inside a surface on a tile (`tileCard`), secondary text takes
 *  mutedForegroundOnTileCard and status words their usual colours. Any other colour stays. */
const ON_TILE: Partial<Record<ColorName, ColorName>> = {
  foreground: 'foregroundOnTile',
  mutedForeground: 'mutedForegroundOnTile',
  primary: 'primaryOnTile',
  tint: 'primaryOnTile',
  onPrimary: 'onPrimaryOnTile',
  success: 'successOnTile',
  warning: 'warningOnTile',
};
const ON_TILE_CARD: Partial<Record<ColorName, ColorName>> = {
  mutedForeground: 'mutedForegroundOnTileCard',
  mutedForegroundOnTile: 'mutedForegroundOnTileCard',
  foregroundOnTile: 'foreground',
  successOnTile: 'success',
  warningOnTile: 'warning',
};

export function useOnGround(color: ColorName): ColorName {
  const ground = useContext(GroundContext);
  if (ground === 'tile') return ON_TILE[color] ?? color;
  if (ground === 'tileCard') return ON_TILE_CARD[color] ?? color;
  return color;
}

/** The content of a surface painted on an accent tile (a row or card in cardOnTile, a chip, a tonal button): it becomes a
 *  `tileCard` ground, so its text keeps Foreground (light in dark) instead of the tile's ink. Off a tile, or when the
 *  surface is not painted (`painted={false}`: an Android row, which is transparent), the ground stays as it is. */
export function OnTileSurface({ painted = true, children }: { painted?: boolean; children: ReactNode }) {
  const ground = useContext(GroundContext);
  const accent = useContext(GroundAccentContext);
  if (ground !== 'tile' || !painted) return children;
  return createElement(Ground, { value: 'tileCard', accent }, children);
}
