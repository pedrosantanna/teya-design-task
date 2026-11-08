// How far a sideways row runs past the text's edge to reach the edge of the surface it sits on (the shop card's
// content padding). Provided by ShopPageLayout; 0 elsewhere.
import { createContext, useContext } from 'react';

export const Bleed = createContext(0);

export function useBleed() {
  return useContext(Bleed);
}

/** The width a sideways row's container has at rest on a surface that grows while the page scrolls (the shop card widens
 *  by its sliver of map over the first steps of scroll). Rows size their cards from it instead of measuring themselves, so the
 *  growth never re-renders them frame by frame. Provided by ShopPageLayout; undefined elsewhere (rows measure). */
export const RestWidth = createContext<number | undefined>(undefined);

export function useRestWidth() {
  return useContext(RestWidth);
}
