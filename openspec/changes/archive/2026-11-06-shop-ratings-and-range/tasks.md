# Tasks

## 1. Data

- [x] 1.1 Add `ShopRatings`, `ShopReliability`, `categories` and `priceRange` to the shop type; seed all 12 shops (one with none, one with 3); `npm run check`
- [x] 1.2 Rating helpers in `store/ratings.ts`: floors for percentages and "in 10", the 5-rating and 10-answer thresholds, the quote mix, the shopper's own rating merged in

## 2. Components

- [x] 2.1 ReliabilityRow, RatingSummary, ReviewCard, ProductSummary, RatingSheet and ListBlock, each with `Component.md` and examples on `/design-system`; `npm run check`
- [x] 2.2 TextField `multiline` and `maxLength`; Chip on the `card` ground

## 3. Screens

- [x] 3.1 Shop page sections in order, explainer sheets, category chips open New Request with the chip's text
- [x] 3.2 Reviews list screen
- [x] 3.3 Rating flow in the request chat: order card action, delivery bubble and chip, rating sheet, "Collected · rated"
- [x] 3.4 Journey steps in the debugger for the rating sheet and the extra shop pages

## 4. Check

- [x] 4.1 Render the shop page (Rossi's, Blythe Road News, Halo Florist), the reviews list and the rating sheet up and down, light and dark, on the web build; compute contrast for new pairs; `npm run check` and `npm run export:web`
