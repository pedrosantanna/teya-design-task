# Tasks

## 1. Components

- [x] 1.1 `PinnedOrder`: status label, shop and items, the code at the trailing end while the order can be collected, the nav bar's fill and edge, one tap to the receipt
- [x] 1.2 `CollectionCode` in its own card, with the collect-by date and the refund rule under the code

## 2. Screens

- [x] 2.1 Chat: pin the order in every state except Sold and Not confirmed; the bar stays filled at any scroll
- [x] 2.2 Receipt: no status label in the header while the order is Ready or Extended for collection; the code card under the header

## 3. Copy

- [x] 3.1 Snuffle's ready line, the order card's third step and the notification name the pinned order, not the receipt
- [x] 3.2 `content.md` rules for the pinned order and the receipt's code; the agent flow canvas

## 4. Specs and checks

- [x] 4.1 Spec deltas for `order`, `collection`, `request` and `state-debugger`, merged into `openspec/specs/`
- [x] 4.2 `npm run check`, `npm run export:web`, the iOS simulator, and the web build in light and dark
