# Design

## Colour roles

Indigo is the shopper acting, Lavender is Snuffle speaking, and the three warm pastels (with Lavender for some kinds) are shops. A shop's accent comes from its kind (`store/kinds.ts`), so it never changes between screens. Each hue has three steps per mode:

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `shop.accent.<hue>.wash` | 50 | 900 | Shop page header, receipt header |
| `shop.accent.<hue>.tile` | 100 | 800 | Tonal tile, category card |
| `shop.accent.<hue>.ink` | 800 | 200 | Initials, awning stripes, the receipt band |

Contrast was computed with the WCAG 2 formula for all four hues (see `docs/develop/design-system/colour.md`, Shop accents): text on the tile is 16.09:1 or more in light mode and 8.97:1 or more in dark; ink on its tile is 7.90:1 or more and 6.93:1 or more.

## Placeholder under every photo

`ShopPlaceholder` is drawn under a shop photo rather than in place of it, so a loading or failed photo shows the shop's colour. Answer cards draw the tile alone: a 40 pt shopfront photo was illegible, and the tile carries the shop's colour into the chat.

## Shop page wash

The card's surface is two halves that slide on the UI thread. Each half clips a wash view whose height is measured once from the name block's layout, so the wash follows the card from inset to full width without any layout during scroll.

## Category cards

Fixed size (`size.category`, 120 × 136) and memoised; the still is an `expo-image` at exactly `size.category.art` with `cachePolicy="memory-disk"` and a `recyclingKey`. The stills come from the illustration pipeline's manifest; until then a card is colour and label.

## Type and spacing

Gambetta names screens and sections; Switzer is everything inside them. This replaces the "one Gambetta element per screen" rule of decisions 028 and 029 as the author's test for this round, so it can be reverted.
