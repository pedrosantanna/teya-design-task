# nearby Specification

## Purpose

Nearby is the home screen: the shopper's area, the small independent shops within reach, and the ask bar that starts a request. It is where browsing and asking begin.

## Requirements

### Requirement: Area header
Nearby SHALL show the shopper's area at the top: the place name ("Blythe Road, W14") and how many shopping streets are within a 15-minute walk.

#### Scenario: Shopper opens the app
- **WHEN** the shopper opens the app with location available
- **THEN** Nearby shows "Blythe Road, W14" and "6 shopping streets within 15 min"

#### Scenario: Location is off
- **WHEN** location is off and the shopper has a saved place
- **THEN** Nearby uses the saved place and shows "Using Home. Turn on location for shops near where you are."

### Requirement: Shops as photo tiles
Nearby SHALL show shops as photo tiles in sections ("Open near you", "New near you"), each with the shop's photo, name, and one meta line with opening state and walk time. Tiles in a section scroll sideways and the next tile peeks.

#### Scenario: Open near you
- **WHEN** Nearby loads
- **THEN** "Open near you" shows tiles such as "Rossi's Bakery · Open till 6pm · 2 min walk"

#### Scenario: Closed shop
- **WHEN** a shop on a tile is closed
- **THEN** its meta line reads "Closed · opens 9am"

### Requirement: Badges on tiles
A tile SHALL carry at most two badges from Promoted, New and Delivers, and Promoted SHALL always show when a placement is paid.

#### Scenario: Paid placement
- **WHEN** a shop's placement is paid
- **THEN** its tile shows the Promoted badge, even if it has two other badges to choose from

### Requirement: Street filter
Nearby SHALL let the shopper filter the "New near you" section by street with single-choice filter chips, "All" first.

#### Scenario: Filter by street
- **WHEN** the shopper taps "King St"
- **THEN** only shops on King Street show in that section and "King St" shows as selected

### Requirement: Ask bar
Nearby SHALL keep the ask bar ("Ask for anything nearby") at the bottom of the screen, with the round Requests button on its left and up to three suggestion chips above it.

#### Scenario: Tap a suggestion
- **WHEN** the shopper taps the chip "Birthday candles"
- **THEN** a new request starts with "Birthday candles" as the shopper's first message

#### Scenario: Requests needs the shopper
- **WHEN** a request needs the shopper
- **THEN** the Requests button shows a count, and its accessibility label reads "Requests, 1 needs you"

### Requirement: Open a shop
Tapping a tile SHALL open that shop's page.

#### Scenario: Tap a tile
- **WHEN** the shopper taps the Rossi's Bakery tile
- **THEN** the Rossi's Bakery shop page opens

### Requirement: No shops nearby
When no shop is within 15 minutes, Nearby SHALL say so in Snuffle's voice and offer Ask anyway and Change area.

#### Scenario: Empty area
- **WHEN** no shops on Snuffle are within 15 minutes of the shopper
- **THEN** Nearby shows "No shops on Snuffle within 15 minutes of you yet." with Ask anyway and Change area
