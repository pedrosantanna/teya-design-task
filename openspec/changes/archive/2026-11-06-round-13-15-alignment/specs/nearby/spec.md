# Spec Delta

## MODIFIED Requirements

### Requirement: Shops as photo tiles
Nearby SHALL show shops as photo tiles in sections ("Open near you", "New near you"), each with the shop's photo, name, and a facts line: the opening state as a word in its own colour followed by its time, and the walk time as a group with a walking icon. Facts SHALL NOT be joined by middle dots, a unit SHALL NOT break across lines ("12 min walk"), and a line SHALL wrap only between groups. Tiles in a section scroll sideways and the next tile peeks.

#### Scenario: Open near you
- **WHEN** Nearby loads
- **THEN** "Open near you" shows tiles such as Rossi's Bakery with "Open until 6pm" and a walking-icon group "2 min walk"

#### Scenario: Closed shop
- **WHEN** a shop on a tile is closed
- **THEN** its facts read "Closed opens 9am", with "Closed" in the foreground colour and no dot between the words

### Requirement: Badges on tiles
A tile SHALL carry no Promoted or New badge. A shop that delivers SHALL show "Delivers" as an icon fact with a scooter on its tile. A paid placement SHALL NOT be shown and SHALL NOT reorder Nearby.

#### Scenario: Paid placement
- **WHEN** a shop's placement is paid
- **THEN** its tile shows no Promoted badge and keeps its place in the list

#### Scenario: Delivering shop
- **WHEN** a shop delivers
- **THEN** its tile shows "Delivers" with a scooter among its facts

### Requirement: Ask bar
Nearby SHALL show the ask bar at the bottom at full size at all times: the round Requests button before the Ask capsule reading "Ask for anything nearby". Scrolling SHALL NOT shrink it. Suggestion chips SHALL NOT float above it; they appear on the New Request screen.

#### Scenario: Tap a suggestion
- **WHEN** the shopper taps the chip "Birthday candles" on the New Request screen
- **THEN** a new request starts with "Birthday candles" as the shopper's first message

#### Scenario: Requests needs the shopper
- **WHEN** a request needs the shopper
- **THEN** the Requests button shows a count, and its accessibility label reads "Requests, 1 needs you"

#### Scenario: Scroll down
- **WHEN** the shopper scrolls Nearby down
- **THEN** the ask bar keeps its size and placeholder

#### Scenario: Requests button position
- **WHEN** Nearby shows
- **THEN** the Requests circle sits to the left of the capsule, in line with Back on other screens

## ADDED Requirements

### Requirement: Categories ordered by what is open
"Browse by category" SHALL order the kinds by how many shops of that kind are open now in the shopper's area, breaking ties with a fixed everyday order, and SHALL put kinds with nothing open last. Neighbouring cards SHALL differ in colour.

#### Scenario: Order follows opening
- **WHEN** more cafés than bakeries are open in the area
- **THEN** Café comes before Bakery

#### Scenario: Nothing open
- **WHEN** no florist is open
- **THEN** Florist comes after every kind that has an open shop
