# order Specification

## Purpose

An order is what the shopper bought from one shop through one answer. Buy is the only way to pay; the shop sets the item aside; money has three outcomes the shopper sees: paid, not charged, refunded (decisions 032 and 037).

## Requirements

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

### Requirement: Simulated payment sheet
The prototype SHALL draw the payment sheet itself, in the iOS or Android form set in the debugger, and the debugger SHALL choose whether the payment succeeds or is declined.

#### Scenario: Declined from the debugger
- **WHEN** the debugger sets payment to "declined" and Sam confirms the sheet
- **THEN** the chat shows "Apple Pay declined the payment, so you haven't been charged" with Try again

#### Scenario: Android form
- **WHEN** the platform is Android and Sam taps Buy
- **THEN** a Google Pay sheet is drawn instead of Apple Pay

### Requirement: Haptics on outcomes
On native builds the prototype SHALL play a light impact when Buy is pressed, a success haptic when an order becomes Ready or Paid, and a warning haptic on a "not charged" ending.

#### Scenario: Ready
- **WHEN** Paper & Co confirms and the order becomes Ready on an iPhone
- **THEN** a success haptic plays

### Requirement: Order status motion
An order card's status change SHALL animate with the status spring and be announced politely to screen readers.

#### Scenario: Waiting to Ready
- **WHEN** the order changes from "Waiting for Paper & Co · not charged yet" to "Ready · collect by Mon 9 Nov"
- **THEN** the label changes with the status animation and VoiceOver announces the new status

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

### Requirement: Rate after collection or delivery
After Collected the order card SHALL read "Collected · rate [shop]" and carry a Rate action. After delivery Snuffle SHALL ask "How was [shop]?" with a Rate chip. Rate SHALL open the rating sheet.

#### Scenario: Collected at Paper & Co
- **WHEN** Paper & Co marks Sam's order collected
- **THEN** the order card reads "Collected · rate Paper & Co" with Rate

### Requirement: Rating sheet
The rating sheet SHALL ask "Would you go back?" with a thumbs up and a thumbs down, show tags that follow the answer, take an optional note of up to 140 characters, and send only once an answer is chosen. There SHALL be no stars.

#### Scenario: Thumbs down
- **WHEN** Sam taps the thumbs down
- **THEN** the tags change to the thumbs-down list ("Not as described", "Took a while"…)

### Requirement: Rating stored on the order
On Send the rating SHALL be stored on the order, the order card SHALL read "Collected · rated", and the shop's page SHALL count the rating.

#### Scenario: After sending
- **WHEN** Sam sends a thumbs up with "Friendly"
- **THEN** the order card reads "Collected · rated" and Paper & Co's page counts one more buyer and one more "Friendly"

### Requirement: Rating steps in the debugger
The state debugger SHALL list the steps Collected, Rate the shop, Rate: wouldn't go back and Rated.

#### Scenario: Jump to the sheet
- **WHEN** the author picks "Rate the shop"
- **THEN** the chat shows the collected order with the rating sheet open

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
