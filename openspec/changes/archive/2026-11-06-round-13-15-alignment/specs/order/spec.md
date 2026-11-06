# Spec Delta

## MODIFIED Requirements

### Requirement: Buy pays once
Buy SHALL open the platform's payment sheet (Apple Pay on iOS, Google Pay on Android) for the total, and the shopper SHALL pay once. The button SHALL read "Buy for [total]".

#### Scenario: Buy at Paper & Co
- **WHEN** the shopper taps "Buy for £29.98"
- **THEN** the payment sheet shows "Pay Paper & Co" and "2 × eclipse glasses £29.98"

### Requirement: Charge on the shop's confirmation
At an asked shop the payment SHALL be authorised and taken only when the shop confirms it has set the item aside; at a connected shop the sale SHALL be immediate.

#### Scenario: Waiting for an asked shop
- **WHEN** the shopper pays at Paper & Co
- **THEN** an order card reads "Waiting for Paper & Co · not charged yet" with the steps "Bought with Apple Pay", "Paper & Co sets them aside", "Ready · collect by Mon 9 Nov"

#### Scenario: Connected shop
- **WHEN** the shopper buys at Broadway Chemist from a till answer
- **THEN** the order skips "Waiting for Broadway Chemist" and goes straight to "Ready · collect by Mon 9 Nov"
