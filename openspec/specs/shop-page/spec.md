# shop-page Specification

## Purpose

The shop page is the detail form of a shop: who they are, when they are open, how far, how they answer, and what people asked them about recently. Items never get a page; they appear here only as past answers.

## Requirements

### Requirement: Shop header
The shop page SHALL show the shop's photo, its name in the display style, opening state, street and walk time, and any notice it needs for made-to-order items.

#### Scenario: Rossi's Bakery
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** the page shows "Rossi's Bakery", "Open till 6pm · Blythe Road · 2 min walk" and "Made to order · 2 days' notice"

### Requirement: Shop actions
The shop page SHALL offer Ask, Call and Directions; Ask SHALL start a request addressed to this shop.

#### Scenario: Ask Rossi's
- **WHEN** the shopper taps "Ask Rossi's"
- **THEN** a new request opens with Rossi's Bakery as the shop to ask

### Requirement: Asked about recently
The shop page SHALL list recent questions and their outcomes as "Had it · [when]" or "Didn't have it · [when]", and SHALL leave the section out when there are none.

#### Scenario: Past answers
- **WHEN** Rossi's had sourdough 2 hours ago and no rye this morning
- **THEN** the section lists "Sourdough · Had it · 2 hours ago" and "Rye loaf · Didn't have it · this morning"

#### Scenario: No history
- **WHEN** nobody has asked the shop anything yet
- **THEN** the "Asked about recently" section is not shown

### Requirement: How the shop answers
The shop page SHALL say whether the shop answers from its till or by reply, its collection window and whether it delivers, with the fee.

#### Scenario: Connected shop
- **WHEN** the shopper opens Broadway Chemist, whose till shares stock
- **THEN** the page states that it answers from its till

### Requirement: Back
Back SHALL return to where the shop page was opened from, by the platform's own gesture or control.

#### Scenario: Back to Nearby
- **WHEN** the shopper opened the page from a Nearby tile and swipes from the left edge on iOS
- **THEN** Nearby shows again at the same scroll position
