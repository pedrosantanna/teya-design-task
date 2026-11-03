# Proposal

## Why

A brand review of the running prototype found that Indigo was the only colour doing any work, the four pastels appeared only as small badges, surfaces read as stock iOS, a shop without a photo was a grey square, the Snuffle mark read as a panda at 28 pt, Gambetta had little presence and the 3D illustrations never appeared in a screen. I approved four changes from the review, then added two directions while they were being applied: headings in Gambetta with bigger root titles and tighter spacing around them, and no photo credits in the interface.

## What Changes

- Shop accents: each shop gets one of Peach, Pistachio, Butter or Lavender, fixed by its kind. Tokens `shop.accent.<hue>.wash`, `.tile` and `.ink`. A tonal tile (initials in ink, the mark's awning as a band) replaces grey placeholders on answer cards, request rows, shop rows, tiles and photos; a wash sits behind the name on the shop page; the receipt header is tinted with a 4 pt band.
- Lavender is Snuffle: `snuffle.bubble`, `snuffle.markTile`, `snuffle.dot` and the mark's face, ear and ink tones. Snuffle's bubbles, the typing indicator, its avatar (redrawn as a retriever), notifications and the Live Activity.
- Indigo discipline: at most one filled Indigo control per viewport (Buy, Ask, send). Tonal buttons become neutral (Muted fill, Foreground label); the receipt's Extend and Cancel are text buttons; the selected filter chip is Foreground with inverse text.
- Surfaces: light background `#EEE9E2` (biscuit.940), chips on Card; dark card raised to `#2B2420` and Muted one step up.
- Type: Display large (Gambetta 48/52) for Nearby and Requests, Display title (40) for other screen titles, a new Section title (Gambetta 22/28) for section headings and sheet titles, Display name (26) for the receipt and the details sheet. Large-title spacing tokens `gap.aboveTitle` (24), `gap.title` (16) and `gap.heading` (12).
- Nearby gains "Shops by kind": eight fixed-size category cards in their pastels, with a slot for the illustration pipeline's stills.
- Photo credits leave the interface; they stay in `app/src/content/images.ts`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `nearby`: adds "Shops by kind" and shop accents on tiles.
- `shop-page`: adds the accent wash behind the name.
- `answers`: answer cards show the shop's tonal tile; only the best answer's Buy is filled.
- `order`: the receipt header carries the shop's accent and its name in Gambetta; Extend and Cancel are text buttons.
- `request`: Snuffle speaks in Lavender; request rows show answering shops in their accents.

## Impact

- Tokens: `primitives`, `semantic`, `modes/light`, `modes/dark`; `scripts/build-tokens.mjs` exports `ShopAccentName`.
- Components: `Button`, `Chip`, `ChatBubble`, `SnuffleMark`, `TypingIndicator`, `LiveActivity`, `AnswerCard`, `RequestRow`, `ShopRow`, `ShopTile`, `ShopPageLayout`, `Sheet`, `NavBar` (`LargeTitle`), internal `ShopPlaceholder`; new `CategoryCard`.
- Store: `Shop.kind`, `store/kinds.ts` (`KIND_ACCENT`, `shopAccent`, `CATEGORIES`).
- Screens: Nearby, Requests, the chat and details sheet, the receipt, the shop page, Places.
- The illustration pipeline (another change) renders on the old background and dark card colours; its grounds need the new values before its stills match.
