# order Specification

## Purpose

An order is what the shopper bought from one shop through one answer. Buy is the only way to pay; the shop sets the item aside; money has three outcomes the shopper sees: paid, not charged, refunded (decisions 032 and 037).

## Requirements

### Requirement: Buy pays once
Buy SHALL open the platform's payment sheet (Apple Pay on iOS, Google Pay on Android) for the total, and the shopper SHALL pay once.

#### Scenario: Buy at Paper & Co
- **WHEN** the shopper taps "Buy · £29.98"
- **THEN** the payment sheet shows "Pay Paper & Co" and "2 × eclipse glasses £29.98"

### Requirement: Charge on the shop's confirmation
At an asked shop the payment SHALL be authorised and taken only when the shop confirms it has set the item aside; at a connected shop the sale SHALL be immediate.

#### Scenario: Waiting for an asked shop
- **WHEN** the shopper pays at Paper & Co
- **THEN** an order card reads "Waiting for Paper & Co · not charged yet" with the steps "Bought with Apple Pay", "Paper & Co sets them aside", "Ready · collect by Mon 9 Nov"

#### Scenario: Connected shop
- **WHEN** the shopper buys at Broadway Chemist from a till answer
- **THEN** the order skips "Waiting for Broadway Chemist" and goes straight to "Ready · collect by Wed 4 Nov"

### Requirement: Order card in the chat
The order SHALL appear in its request's chat as an order card with one status label, shop and items, and total; tapping it SHALL open the receipt. Orders SHALL have no list of their own.

#### Scenario: Order card replaces the answer
- **WHEN** the shopper buys from an answer
- **THEN** the answer card is replaced by the order card in the same chat

### Requirement: Order states
A collect order SHALL use the labels "Waiting for [shop] · not charged yet" → "Ready · collect by [date]" → "Extended · collect by [date]" → "Collected", ending otherwise in "Not confirmed · not charged", "Sold · not charged", "Cancelled · refunded" or "Not collected · refunded".

#### Scenario: Shop confirms
- **WHEN** Paper & Co confirms it has set them aside
- **THEN** the order reads "Ready · collect by Mon 9 Nov" and £29.98 is paid

### Requirement: Endings say the money state
Every ending SHALL say what happened, the money state and the next step, and "not charged" endings SHALL carry a warning symbol.

#### Scenario: Already sold
- **WHEN** Paper & Co sold the last pairs before setting them aside
- **THEN** Snuffle says "you haven't been charged", the order reads "Sold · not charged", and the next shop's answer is offered with its own Buy and Keep looking

#### Scenario: Shop doesn't confirm
- **WHEN** Paper & Co hasn't confirmed in 10 minutes
- **THEN** the order reads "Not confirmed · not charged" and the authorisation lapses

#### Scenario: Payment declined
- **WHEN** Apple Pay declines the payment
- **THEN** no order is created, Snuffle says the shop hasn't been asked, and Try again reopens the payment sheet

### Requirement: Delivery by the shop
When the shopper chooses that the shop delivers, the order SHALL follow "Waiting for [shop] · not charged yet" → "Paid" → "On its way" → "Delivered" from the shop's updates, with the delivery fee in the total.

#### Scenario: Paper & Co delivers
- **WHEN** the shopper buys with delivery at £3.50
- **THEN** the order total is £33.48 and its steps end at "Delivered" with the time

### Requirement: Cancel for a refund
The shopper SHALL be able to cancel a Ready order for a full refund after confirming in an alert.

#### Scenario: Cancel
- **WHEN** the shopper taps Cancel for a refund and confirms
- **THEN** the order reads "Cancelled · refunded"
