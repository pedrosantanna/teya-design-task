// How far a sideways row runs past the text's edge to reach the edge of the surface it sits on (the shop card's
// content padding). Provided by ShopPageLayout; 0 elsewhere.
import { createContext, useContext } from 'react';

export const Bleed = createContext(0);

export function useBleed() {
  return useContext(Bleed);
}
