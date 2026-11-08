# Spec Delta

## ADDED Requirements

### Requirement: Pinned order
Once a request has an order, its chat SHALL pin the order under the nav bar with the status label, the shop and items, and the collection code while the order is Ready or Extended for collection. A tap SHALL open the receipt. The pinned order SHALL show in every order state except Sold and Not confirmed, and SHALL take the nav bar's fill and edge, with the chat's bar filled at any scroll.

#### Scenario: Ready at Paper & Co
- **WHEN** Paper & Co confirms it has set Sam's order aside
- **THEN** the chat pins "Ready · collect by Mon 9 Nov" with "Paper & Co, 2 × eclipse glasses" and the code "K7Q2" at its end, and Snuffle says "Your collection code is pinned at the top."

#### Scenario: Open the receipt
- **WHEN** the shopper taps the pinned order
- **THEN** the receipt opens

#### Scenario: Nothing charged
- **WHEN** the order ends Sold or Not confirmed
- **THEN** nothing is pinned and the chat carries on with the next answer

## MODIFIED Requirements

### Requirement: Receipt header
The receipt SHALL open with a header in the shop's accent at the tile step, with no band across the top, the shop's name in Display name and the items under it. While the order is Ready or Extended for collection the header SHALL leave out the status label, since the code card under it carries the date; every other state SHALL open the header with the status label. Extend and Cancel for a refund SHALL be text buttons, Cancel in the destructive colour.

#### Scenario: Ready at Paper & Co
- **WHEN** the order is Ready
- **THEN** the header is Pistachio with "Paper & Co" in Gambetta and "2 × eclipse glasses" and no status label, Directions is the one filled button, and "Extend to Mon 16 Nov" and "Cancel for a refund" are text buttons

#### Scenario: Waiting for the shop
- **WHEN** the order is waiting for Paper & Co
- **THEN** the header opens with "Waiting for Paper & Co · not charged yet" and says the collection code shows there once they confirm

#### Scenario: Receipt on a shop's colour
- **WHEN** the shopper opens the receipt for Paper & Co
- **THEN** the header uses the shop's accent at the tile step and has no band
