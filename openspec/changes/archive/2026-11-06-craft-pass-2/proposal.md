# Proposal

## Why

A visual craft review of the running prototype measured the pastel tiles at 1.01 to 1.04:1 on the light background, so a shop without a photo, a category card or the receipt header barely showed. It also found the ask bar retracting while the shopper scrolled (I was confused by it myself: pressing the bar is the primary action), black selected chips as the heaviest mark on Nearby, a beige-to-white step and a seam on the shop page, a selected delivery row painted grey, and "Needs you" in Indigo competing with Buy. Research on the chat's identity recommended a calm direction: a neutral ground, the bare mark and "Snuffle" in the bar, and no purple tint or glow. I asked for all of it, and for "Shops by kind" to become a way to find places by category.

## What Changes

- Colour: a `tile` step per accent at OKLCH L 0.87, C 0.07 (dark L 0.36, C 0.06) for placeholder tiles, category cards, the shop page header and the receipt header. Snuffle's bubble moves to that Lavender step (#D7CCFE; dark Lavender 900). A chat ground token (white in light, Background in dark), a sheet ground (Background in light, #1C1612 in dark), a count colour (Indigo 800 in both modes) and a delicate card shadow. Dead mark tokens are removed.
- Ask bar: never shrinks. One row, a 48 pt glass Requests circle and a 48 pt Ask capsule with the Snuffle glyph, the placeholder in Body and a mic that becomes the Indigo send. The floating suggestion chips leave Nearby for the New Request screen.
- New Request: Snuffle's bubble and three suggestion chips, "Snuffle" with the glyph as the title, Back in place of Close, and the bar's glass morphing into the composer (a view transition on the web, a Reanimated zoom from the bar's rectangle on the phones; a crossfade under Reduce Motion).
- Chips: a selected chip is tonal Indigo again (Indigo 100, Indigo 800 text, semibold). Badges on photos keep their light values in both modes.
- Sheets: Headline (Switzer 600, 17) is the default title, centred between Close and Confirm. The details sheet keeps the shop's name in Display name, left-aligned in the content. A selected row keeps its fill; the tick carries the selection.
- Shop page: the card is Background with rows on Card under a delicate shadow, the accent fades out over 48 pt below the name, 20 pt inner padding, a wider photo peek and a page capsule.
- Receipt: no ink band; the header is the accent's tile step.
- Requests: at most two 20 pt shop circles and "+1"; "Needs you" in Foreground semibold.
- Nearby: "Browse by category" replaces "Shops by kind", and each card opens a Category screen listing the places of that kind.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `nearby`: the ask bar no longer shrinks or carries suggestions; categories open a Category screen.
- `request`: New Request opens with Snuffle's bubble and suggestions; the chat is on a neutral ground.
- `shop-page`: surfaces and the photo carousel.
- `order`: the receipt header.

## Impact

- Tokens: `primitives`, `semantic`, `modes/light`, `modes/dark`.
- Components: `BottomAccessory`, `Composer`, `Chip`, `StatusLabel`, `Count`, `Sheet`, `ListRow`, `ShopPageLayout`, `RequestRow`, `CategoryCard`, `ChatBubble`, `NavBar`, internal `FloatingSurface`, `glass`, `ScrollEdge`, `transitions`, `PressableCard`; a new `Ground` context.
- Screens: Nearby, New Request, the chat and details sheet, the receipt, the shop page, Requests, the location sheet; a new `categories/[kind]` route.
- Not touched here: the first-run flow, `SnuffleMark`, the root layout, the seed and kinds (other agents own them).
