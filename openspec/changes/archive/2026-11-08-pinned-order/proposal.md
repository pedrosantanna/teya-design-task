# Proposal

## Why

Once Sam had bought, the order lived in one card in the chat that scrolled away as Snuffle kept talking, and on the receipt the code sat inside the green header, cramped, with its collect-by date in the header above it. An agent compared how Uber Eats, Too Good To Go, Live Activities, WhatsApp and Messages for Business keep an active order in reach. I chose a pinned order under the chat's nav bar and a receipt top where the code has its own card with its date right under it (decision 068). The app already does this; the specs still say the receipt header shows the status label in every state, and Snuffle's line and the notification still send the shopper to the receipt for the code.

## What Changes

- Order: a new requirement for the pinned order. Once a request has an order, its chat pins it under the nav bar with the status label, the shop and items, and the collection code while the order can be collected; a tap opens the receipt. It shows in every order state except Sold and Not confirmed.
- Order: the receipt header leaves out the status label while the order is Ready or Extended for collection, and names the shop and the items; every other state opens with the label. The Ready scenario's header colour is corrected to Pistachio, Paper & Co's accent (no shop is Lavender).
- Collection: the receipt's code sits in its own card under the header, with "Collect by Mon 9 Nov" and "Full refund if you don't" right under it.
- Request: the notification when an order is ready says the code is pinned in the chat.
- State debugger: the scenario names the pinned order where it named the receipt.
- Copy: Snuffle's line when the order is ready, in the active chat and in other requests' chats, reads "Your collection code is pinned at the top."; the order card's third step reads "Collection code pinned at the top"; the notification reads "Your collection code is pinned in the chat."

## Decisions taken by the author

Decision 068 in `docs/decision-log.md`. I approved the pinned order and the receipt top; an agent wrote the code and, in this change, the spec text from the app source.

## Out of scope

- The duplicate status while the pinned order and the order card are both on screen (open in decision 068).
- Pinned orders in other requests' chats: only the active request has a receipt in the prototype, so those chats don't pin yet, though Snuffle's line there already reads as if they did.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `order`: the pinned order; the receipt header.
- `collection`: the receipt with the collection code.
- `request`: the simulated notification for a ready order.
- `state-debugger`: one mock store.

## Impact

- Components: a new `PinnedOrder`; `CollectionCode` takes the date and the refund rule; `NavBar` stays filled in the chat.
- Screens: the request chat and the receipt.
- Store: `chat.ts`, `other-chat.ts`, `simulation.ts`.
- Docs: `content.md` (the pinned order, the receipt's code), `components.md` (Pinned order), the agent flow canvas.
