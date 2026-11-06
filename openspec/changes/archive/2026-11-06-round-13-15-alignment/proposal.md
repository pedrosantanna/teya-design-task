# Proposal

## Why

Rounds 12 to 15 changed the app's behaviour in many places, and decisions 049 to 063 record the reasons, but no change carried them into the specs. The current specs still describe behaviour I retired: a Promoted badge that always shows, a filled Buy on the best answer only, "Buy · £29.98" and "Buy 1", dotted metadata lines, "Asked about recently", a floating debugger with four sections, a white chat ground, and a shop page whose map is the same for every shop. This change brings the specs to what the app does today. All of it has shipped, so every task is checked and the change is archived with the merge.

## What Changes

- Nearby: tiles carry no Promoted or New badge, only a Delivers fact with its scooter (decisions 052, 057); facts are told apart by colour, weight and icons, with no dots (056); categories are ordered by what is open near the shopper (053); the Requests circle sits before the field (055).
- Answers: Buy is filled only when exactly one offer can be bought; with several offers every Buy is tonal and equal. The buy label reads "Buy for £29.98" and a partial offer reads "Buy 1 of 2". A till answer is sourced "from the shop's till". Collect-by dates follow the content ("Collect by Mon 9 Nov" on both cards).
- Order: Buy opens the payment sheet from "Buy for £29.98".
- Request: every request opens as a full conversation with the composer (059); the chat sits on the app's Background and the composer field is Card with a hairline; everything that arrives in the chat uses one motion; a sniffing mark stands in the asking list until the first answer; the request photo sits at the right of the bar and opens a six-photo picker.
- Identity: Snuffle's avatar on the sender line is a circle whose face is the dog's head; the ears and awning run past its edge (061).
- Shop page: "Found here recently" replaces "Asked about recently"; ratings are one carousel straight on the card (summary card first, then up to five reviews) with a grouped list under it; with no ratings one list holds "No ratings yet" and "How ratings work"; carousels run to the card's edge; the map strip above the card is taller; the map is credited at the foot of the card (058, 060, 062).
- Map: a new capability. Every shop stands on its real street; the map draws the walk from 163 Blythe Road in the shop's accent, turned and zoomed to fit; walk times come from the routes (063).
- State debugger: a panel docked beside the phone with the sections Journey, Shopper and device, Request and order, Content and context, Simulation and Actions.

## Decisions taken by the author

Decisions 049 to 063 in `docs/decision-log.md`. I reviewed the rounds; an agent wrote the code and, in this change, the spec text from the app source.

## Out of scope

- Checks that were never recorded for earlier changes (simulator runs, Lighthouse); those stay with the changes that own them.
- Behaviour that is still open in the decision log (paid placement shown again, buying from an older request through the details sheet).

## Capabilities

### New Capabilities
- `map`: the map on the shop page and in Directions.

### Modified Capabilities
- `nearby`, `answers`, `order`, `request`, `shop-page`, `state-debugger`, `identity`
