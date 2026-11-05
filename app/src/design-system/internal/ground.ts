// Which ground a component sits on (craft-pass-2). Chats use a neutral ground (white in light mode, Background in
// dark); there, Card surfaces need an edge and chips take the chat chip colour. The chat screens wrap their content
// in `<Ground value="chat">`; a grouped card that holds chips (the shop page's sections) wraps them in
// `<Ground value="card">`, where chips take Muted; the shop page's actions sit on its accent tile in
// `<Ground value="tile">`, where tonal buttons take a white overlay (state.tonalOnTile) instead of Muted; a sheet
// wraps its content in `<Ground value="sheet">`, where rows and chips sit one level above the sheet's ground (Card in
// light, Muted in dark); the shop page's card wraps its body in `<Ground value="shop">`, a white card in light whose
// rows step down to an off-white with a hairline (colour roles shopPage.*); everything else is on the screen's Background. A tile ground also names its accent, so rows on
// it take that accent's cardOnTile (the Category screen, decision 050: a tinted card lighter than the dark tile).
import { createContext, createElement, useContext, type ReactNode } from 'react';

import type { ShopAccentName } from '../theme';

export type GroundName = 'background' | 'chat' | 'card' | 'tile' | 'sheet' | 'shop';

const GroundContext = createContext<GroundName>('background');
const GroundAccentContext = createContext<ShopAccentName | undefined>(undefined);

export function Ground({ value, accent, children }: { value: GroundName; accent?: ShopAccentName; children: ReactNode }) {
  const inner = createElement(GroundContext.Provider, { value }, children);
  return (value === 'tile' || value === 'sheet' || value === 'card' || value === 'shop') && accent ? createElement(GroundAccentContext.Provider, { value: accent }, inner) : inner;
}

/** The accent of the tile under a component, when it sits on one (`<Ground value="tile" accent>`). */
export function useTileAccent(): ShopAccentName | undefined {
  const ground = useContext(GroundContext);
  const accent = useContext(GroundAccentContext);
  return ground === 'tile' ? accent : undefined;
}

/** The accent a neutral ground carries for small details (`<Ground value="sheet" accent>`: the shop page's chips). */
export function useGroundAccent(): ShopAccentName | undefined {
  return useContext(GroundAccentContext);
}

export function useGround(): GroundName {
  return useContext(GroundContext);
}
