# answers Specification

## Purpose

An answer is one shop's reply to a request: whether it has the item, at what price and until when. Connected shops answer at once from the till; asked shops reply in their own time (decision 031). Both are the same object, labelled by source.

## Requirements

### Requirement: Answer states
An answer SHALL move through "Asked" → "Seen" → one outcome: "Has it" (or "Has them"), "Has 1 of 2", "Has something similar", "Doesn't have it", "No reply", or "Can make it · [notice]". A till answer SHALL read "In stock now".

#### Scenario: Asked shop replies
- **WHEN** Paper & Co reads the request and replies yes
- **THEN** its row goes from "Asked" to "Seen" to "Has them"

#### Scenario: Connected shop
- **WHEN** Broadway Chemist's till shows 1 pair in stock
- **THEN** its answer reads "In stock now · 1 of 2 · till" without passing through "Asked"

### Requirement: Source on every answer
Every answer card SHALL state where it came from: "till" for a connected shop, or "replied [time] ago" for an asked shop.

#### Scenario: Two sources side by side
- **WHEN** Paper & Co replied 2 minutes ago and Broadway Chemist answered from its till
- **THEN** the cards read "Has them · replied 2 min ago" and "In stock now · 1 of 2 · till"

### Requirement: Answer card in the chat
A yes SHALL arrive in the chat as an answer card with the shop name, status and source, price, walk time, collect-by date and one action row. Only the best answer SHALL have a filled Buy; the others are tonal.

#### Scenario: Two shops have them
- **WHEN** Paper & Co (£14.99) and Broadway Chemist (£9.50, 1 of 2) have answered yes
- **THEN** the chat shows two answer cards with "Collect by Mon 9 Nov" and "Collect by Wed 4 Nov", and one filled Buy

### Requirement: Partial answers
An answer that covers part of the quantity SHALL offer to buy what it has and keep looking for the rest.

#### Scenario: 1 of 2
- **WHEN** the shopper taps "Buy 1" on Broadway Chemist's answer
- **THEN** after the order the card adds "Keep looking for 1 more"

### Requirement: Something similar
An answer with something similar SHALL offer Show me and No thanks; No thanks SHALL dismiss the card with an undo.

#### Scenario: Solar viewer cards
- **WHEN** Olympia Cameras has "Solar viewer cards" instead
- **THEN** the card reads "Has something similar" with Show me and No thanks

### Requirement: Details sheet
Tapping an answer card or its Buy SHALL open the details sheet: shop, item, price, quantity, how to get it (collect or delivery), the collect-by date with its length once, when the charge happens, Buy with the total, and the line about not buying.

#### Scenario: Open details
- **WHEN** the shopper taps Paper & Co's card
- **THEN** the sheet shows "Collect by Mon 9 Nov (7 days) · full refund if you don't", "Charged only when Paper & Co confirms.", "Buy · £29.98" and "Without buying, they may sell before you get there."
