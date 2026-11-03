# request Specification

## Purpose

A request is one chat with Snuffle holding what the shopper asked for in one go (decision 025). It owns its answers and orders, and it is the only list the shopper keeps: Requests.

## Requirements

### Requirement: Ask
The shopper SHALL start a request by typing or choosing a suggestion; the shopper's message SHALL appear at once as their bubble, and the request SHALL be added to Requests.

#### Scenario: New request
- **WHEN** the shopper sends "Eclipse glasses, 2 pairs, before 4pm"
- **THEN** the message shows as the shopper's bubble immediately and a request "Eclipse glasses" appears in Requests

### Requirement: Snuffle confirms what it understood
Snuffle SHALL restate the request (items, quantity, area, deadline) and ask how the shopper wants to get it before asking shops.

#### Scenario: Confirm and choose
- **WHEN** the request is "Eclipse glasses, 2 pairs, before 4pm"
- **THEN** Snuffle replies "Got it: 2 pairs within 15 minutes of you, by 4pm." and offers the chips Collect and Check delivery too

### Requirement: Asking shops
Once the shopper has chosen, Snuffle SHALL ask the likely shops at the same time and show them as a list of compact rows, one per shop, each with its answer state.

#### Scenario: Asking 6 shops
- **WHEN** the shopper taps Collect
- **THEN** Snuffle says "I'm asking 6 shops on 6 streets near you." and lists six shop rows, each starting at "Asked"

### Requirement: Leaving while Snuffle asks
The shopper SHALL be able to leave the app while Snuffle asks; each answer SHALL reach them as a notification and on the Live Activity.

#### Scenario: Away from the app
- **WHEN** Paper & Co answers while the app is closed
- **THEN** a notification from Snuffle reads "Paper & Co on King Street has them too: £14.99 a pair."

### Requirement: Split proposal
When one message holds items for different days or kinds of shop, Snuffle SHALL propose splitting it into separate requests as a bubble with the chips "Split into 2" and "Keep as one".

#### Scenario: Two errands in one message
- **WHEN** the shopper asks "Eclipse glasses for today, and a birthday cake for Saturday"
- **THEN** Snuffle proposes two requests and, on "Split into 2", Requests shows two rows

### Requirement: Requests list
Requests SHALL list every request as a row with its name, time, a preview with its speaker, one status label and an unread count, and SHALL filter by All, Needs you, Looking, Waiting and Done.

#### Scenario: Status per row
- **WHEN** a request has two answers with the item and none bought
- **THEN** its row reads "2 shops have them · by 4pm"

#### Scenario: Needs you
- **WHEN** a request needs a decision before a date
- **THEN** its row reads "Needs you · buy by Thu 5 Nov", in Tint, with a compact button such as "Buy at Rossi's"

#### Scenario: Order on a request
- **WHEN** a request has an order
- **THEN** its row shows the order's status label

### Requirement: Keep looking
The shopper SHALL be able to leave a request open with Keep looking, once or on repeat, with a where and an until date; Snuffle SHALL send one message when a shop has it and SHALL never buy on its own.

#### Scenario: Keep looking until Friday
- **WHEN** the shopper sets Keep looking, once, within 15 min, until Fri 6 Nov
- **THEN** the row reads "Looking · until Fri 6 Nov" and the screen states "Nothing is bought until you tap Buy."

### Requirement: Nothing found
When no shop has the item before the deadline, Snuffle SHALL say how many said no and how many didn't reply, and offer Ask further away and Keep looking.

#### Scenario: No shop has it in time
- **WHEN** all 6 shops answer no or don't reply before 4pm
- **THEN** Snuffle says "None of the 6 shops has them before 4pm: 4 said no and 2 didn't reply." with Ask further away and Keep looking

### Requirement: Close
The shopper SHALL be able to close a request; it then shows as "Closed" under Done.

#### Scenario: Close from the list
- **WHEN** the shopper swipes a row and taps Close (iOS) or picks Close from the long-press menu (Android)
- **THEN** the row's status becomes "Closed"
