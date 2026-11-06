# Tasks

## 1. Tokens

- [x] 1.1 Tile step primitives and `shop.accent.<hue>.tile` in both modes; `snuffle.bubble` on the Lavender tile step (light) and Lavender 900 (dark)
- [x] 1.2 `chat.*`, `sheet`, `count`, `shadow.card`, web glass values, `caption1Strong`, ask bar sizes; `npm run tokens`
- [x] 1.3 Remove `snuffle.markTile`, `markFace`, `markEar`, `markInk` after checking no component uses them

## 2. Components

- [x] 2.1 Ask bar: one row, never shrinks, glyph, Body placeholder, mic to send; count in Indigo 800 with a ring
- [x] 2.2 Composer with the same anatomy; morph from the bar (web view transition, native zoom)
- [x] 2.3 Chip selected on `chipSelected`; StatusLabel "Needs you" in Foreground semibold
- [x] 2.4 Sheet headline title, sheet ground, footer fade from the sheet colour; ListRow selected keeps its fill
- [x] 2.5 ShopPageLayout surfaces, wash fade, padding, peek and page capsule
- [x] 2.6 RequestRow shop circles; CategoryCard tile step
- [x] 2.7 `Ground` context for chats; cards, rows, chips and illustrations on the chat ground

## 3. Screens

- [x] 3.1 Nearby: chips removed, "Browse by category", cards open the Category screen
- [x] 3.2 New Request: Snuffle bubble, suggestions, title with the glyph, Back, morph
- [x] 3.3 Chat: chat ground, title with the glyph; details sheet title in content, price in Foreground
- [x] 3.4 Receipt header on the tile step, no band
- [x] 3.5 Category screen

## 4. Docs and checks

- [x] 4.1 colour, components, typography and tags in English and Portuguese
- [x] 4.2 `npm run check`, `npm run export:web`, and the web build in light and dark with contrast measured for every changed pair
