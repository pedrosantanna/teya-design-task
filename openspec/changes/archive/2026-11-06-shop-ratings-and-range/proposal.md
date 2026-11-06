# Proposal

## Why

The shop page says who a shop is and how it answers, but not what it sells, how reliable its answers have been, or whether buyers would go back. A shopper choosing between two answers, or browsing a shop they don't know, has nothing to judge it by. The order also ends at "Collected" with a Rate chip that only says thanks.

## What Changes

- Shop data: ratings (thumbs up and down counts, tag counts, a few notes with month and how the buyer got the item), a reliability record (requests answered and asked, "has it" answers that held, usual reply time, connected or not), product categories and a price range. One shop has no ratings and one has three.
- Shop page sections, in this order under the header and actions, as white grouped cards with Gambetta titles: "What they sell", "How they do on Snuffle", "What buyers say", then "How it works" (collection and delivery).
- A reviews list screen ("See all 38") and two small explainer sheets ("How we work this out", "How ratings work").
- Rating flow: after Collected the order card reads "Collected · rate Paper & Co" with a Rate action; after delivery Snuffle asks "How was Paper & Co?" with a Rate chip. The rating sheet takes thumbs up or down ("Would you go back?"), tags that follow the answer and an optional note of 140 characters. On Send the order reads "Collected · rated" and the shop's counts include the rating.
- New design-system components: ReliabilityRow, RatingSummary, ReviewCard, ProductSummary, RatingSheet; ListBlock (a padded block inside a grouped list); TextField gains `multiline` and `maxLength`; Chip takes the `card` ground.
- Journey steps for the debugger: Collected, Rate the shop, Rate: wouldn't go back, Rated, and shop pages for a new shop, a shop with three ratings and the reviews list.

## Decisions taken by the author

- Thumbs and "Would you go back?", not stars.
- The stock-accuracy line ("Had it 24 of 25 times when they said yes") shows only after 10 "has it" answers; before that the row says "New on Snuffle".
- Shops see their signals and can dispute them. The prototype has no shop interface, so this appears only in the explainer sheets.

## Rules for the numbers

- No percentage below 5 ratings: "New on Snuffle · 3 buyers so far".
- Percentages and "9 in 10" are rounded down, never up.
- People who rated are "buyers": only someone who bought through Snuffle can rate.
- The two quote cards mirror the overall split (round(2 × share of thumbs up) cards are thumbs up).

## Capabilities

### Modified Capabilities

- `shop-page`: adds what they sell, reliability and buyer ratings; "Asked about recently" moves into "What they sell" as "Often asked about here"; how the shop answers moves into the reliability rows.
- `order`: Rate after collection or delivery opens the rating sheet and the rating is stored on the order.

## Out of scope

- Any shop-side interface, disputes or moderation.
- Ratings on Nearby tiles or answer cards.
- Persisting ratings beyond the session.

## Impact

- `app/src/store/{types,seed,ratings,simulation,chat,journey}.ts`, `app/src/app/shops/[id].tsx`, new `app/src/app/reviews/[id].tsx`, `app/src/app/requests/[id]/index.tsx`, the components above and their gallery entries.
