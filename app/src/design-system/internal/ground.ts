// Which ground a component sits on (craft-pass-2). Chats use a neutral ground (white in light mode, Background in
// dark); there, Card surfaces need an edge and chips take the chat chip colour. The chat screens wrap their content
// in `<Ground value="chat">`; everything else is on the screen's Background.
import { createContext, createElement, useContext, type ReactNode } from 'react';

export type GroundName = 'background' | 'chat';

const GroundContext = createContext<GroundName>('background');

export function Ground({ value, children }: { value: GroundName; children: ReactNode }) {
  return createElement(GroundContext.Provider, { value }, children);
}

export function useGround(): GroundName {
  return useContext(GroundContext);
}
