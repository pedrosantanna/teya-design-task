# Proposal

## Why

Tiles on Nearby and shop names in answers lead to the shop page, and Ask from a shop is the browsing route into a request (H3). It is the one place a shop's name is in the display face (decision 029).

## What Changes

- Shop page with a full-bleed photo, the name in Display title, opening state, street and walk time, made-to-order notice, how the shop answers, collection window and delivery.
- Ask, Call and Directions; Ask opens a request addressed to the shop.
- "Asked about recently" from mock history, left out when empty.
- Shop page header and close button components.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `shop-page`: adds the photo credit and simulated Call and Directions.

## Impact

- New route `app/src/app/shops/[id].tsx` and components shop page header and close button.
