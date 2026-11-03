# Tasks

## 1. Tokens

- [x] 1.1 `biscuit.940`, light background, dark card and muted, selected chip on Foreground; `npm run tokens`; verify contrasts with the WCAG 2 formula and `npm run check`
- [x] 1.2 `shop.accent.<hue>.{wash,tile,ink}` and `snuffle.*` in both modes; `ShopAccentName` from the build script
- [x] 1.3 Type: `displayLarge` (48/52), `sectionTitle` (22/28); gaps `aboveTitle`, `title`, `heading`; sizes `category`, `band`

## 2. Components

- [x] 2.1 `ShopPlaceholder` on accents, under every shop photo (tile, shop page photos), and alone on answer cards, request rows and shop rows
- [x] 2.2 `SnuffleMark` as a retriever on Lavender; Snuffle bubble, typing dots and Live Activity in Lavender
- [x] 2.3 `Button` tonal neutral; `Chip` off on Card, selected on Foreground
- [x] 2.4 `CategoryCard` with `Component.md` and examples
- [x] 2.5 `Sheet` `titleVariant`; `LargeTitle` in Gambetta at 48 (root) or 40
- [x] 2.6 Photo credits out of `ShopTile` and `ShopPageLayout`
- [x] 2.7 `filterSelected` for the filter chip; selected list rows neutral (Muted and a tick); `chipSelected` stays Indigo tonal for the other controls that used it

## 3. Screens

- [x] 3.1 Nearby: spacing around the title, section titles, "Shops by kind", accents on tiles
- [x] 3.2 Requests and Places: titles and spacing; shops on rows in their accents
- [x] 3.3 Chat: answer card tiles, details sheet title in Display name
- [x] 3.4 Receipt: accent header and band, name in Display name, Extend and Cancel as text buttons
- [x] 3.5 Shop page: accent wash, section titles, no credits
- [x] 3.6 Illustrations in screens: basket on the receipt (Ready), scooter while asking (gone with the first answer), crossroads on empty Requests and empty Nearby, quiet street on Not found; category stills on the cards. The phone box waits for an offline state the prototype doesn't have yet

## 4. Docs and checks

- [x] 4.1 colour, components, typography, tags, spacing and screen-review pages in English and Portuguese; decision 045 and the AI log
- [x] 4.2 Web build in light and dark: Nearby, answers, details sheet, receipt, shop page, Requests, Places, location sheet; one iOS simulator screenshot
