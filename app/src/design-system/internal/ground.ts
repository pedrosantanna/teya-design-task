// Which ground a component sits on (craft-pass-2). Chats use a neutral ground (white in light mode, Background in
// dark); there, Card surfaces need an edge and chips take the chat chip colour. The chat screens wrap their content
// in `<Ground value="chat">`; a grouped card that holds chips (the shop page's sections) wraps them in
// `<Ground value="card">`, where chips take Muted; the shop page's actions sit on its accent tile in
// `<Ground value="tile">`, where tonal buttons take a white overlay (state.tonalOnTile) instead of Muted; a sheet
// wraps its content in `<Ground value="sheet">`, where rows and chips sit one level above the sheet's ground (Card in
// light, Muted in dark); everything else is on the screen's Background. A tile ground also names its accent, so rows on
// it take that accent's cardOnTile (the Category screen, decision 050: a tinted card lighter than the dark tile). The shop
// page's whole card is a tile ground (round 10, decision 056): rows, chips, buttons and secondary text all take their on-tile colours.
import { createContext, createElement, useContext, type ReactNode } from 'react';

import type { ColorName, ShopAccentName } from '../theme';

export type GroundName = 'background' | 'chat' | 'card' | 'tile' | 'sheet';

const GroundContext = createContext<GroundName>('background');
const GroundAccentContext = createContext<ShopAccentName | undefined>(undefined);

export function Ground({ value, accent, children }: { value: GroundName; accent?: ShopAccentName; children: ReactNode }) {
  const inner = createElement(GroundContext.Provider, { value }, children);
  return (value === 'tile' || value === 'sheet' || value === 'card') && accent ? createElement(GroundAccentContext.Provider, { value: accent }, inner) : inner;
}

/** The accent of the tile under a component, when it sits on one (`<Ground value="tile" accent>`). */
export function useTileAccent(): ShopAccentName | undefined {
  const ground = useContext(GroundContext);
  const accent = useContext(GroundAccentContext);
  return ground === 'tile' ? accent : undefined;
}

/** The accent a neutral ground carries for small details (`<Ground value="sheet" accent>`, `<Ground value="card" accent>`): chips take the accent's tile fill, with no edge. */
export function useGroundAccent(): ShopAccentName | undefined {
  return useContext(GroundAccentContext);
}

export function useGround(): GroundName {
  return useContext(GroundContext);
}

/** Muted foreground on a tile ground is the on-tile tone (4.5:1 on the tile and on the rows lifted off it); any other colour stays. */
export function useOnGround(color: ColorName): ColorName {
  return useContext(GroundContext) === 'tile' && color === 'mutedForeground' ? 'mutedForegroundOnTile' : color;
}
