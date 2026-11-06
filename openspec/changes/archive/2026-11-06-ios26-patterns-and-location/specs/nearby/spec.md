# Spec Delta

## MODIFIED Requirements

### Requirement: Area header
Nearby SHALL show the shopper's area at the top as a row that opens the location sheet: the place name ("Blythe Road, W14") with a chevron, and how many shopping streets are within the chosen walking radius.

#### Scenario: Shopper opens the app
- **WHEN** the shopper opens the app with location available
- **THEN** Nearby shows "Blythe Road, W14" and "6 shopping streets within 15 min"

#### Scenario: Location is off
- **WHEN** location is off and the shopper has a saved place
- **THEN** Nearby uses the saved place and shows "Using Home. Turn on location for shops near where you are."

#### Scenario: Open the location sheet
- **WHEN** the shopper taps "Blythe Road, W14"
- **THEN** the "Where are you shopping?" sheet grows from the row

### Requirement: Ask bar
Nearby SHALL keep the ask bar ("Ask for anything nearby") at the bottom of the screen as a floating glass accessory, with the round Requests button on its left and up to three suggestion chips above it. The accessory SHALL shrink while the shopper scrolls down and return to full size when they scroll up.

#### Scenario: Tap a suggestion
- **WHEN** the shopper taps the chip "Birthday candles"
- **THEN** a new request starts with "Birthday candles" as the shopper's first message

#### Scenario: Requests needs the shopper
- **WHEN** a request needs the shopper
- **THEN** the Requests button shows a count, and its accessibility label reads "Requests, 1 needs you"

#### Scenario: Scroll down
- **WHEN** the shopper scrolls Nearby down
- **THEN** the suggestion chips fade, the ask bar shrinks to a compact capsule beside the Requests button, and both grow back on a scroll up

### Requirement: Open a shop
Tapping a tile SHALL open that shop's page with a zoom from the tile.

#### Scenario: Tap a tile
- **WHEN** the shopper taps the Rossi's Bakery tile
- **THEN** the Rossi's Bakery shop page zooms open from the tile

## ADDED Requirements

### Requirement: Shops follow the area
Nearby SHALL show the shops of the chosen area within the chosen walking radius, and SHALL reload when either changes.

#### Scenario: Work area
- **WHEN** the shopper chooses Work · Kensington High St, W8
- **THEN** Nearby shows skeletons briefly, then "Kensington High St, W8" with that area's streets and shops

#### Scenario: Smaller radius
- **WHEN** the shopper chooses "Within 10 min walk"
- **THEN** only shops 10 minutes away or less show, and the street count reads "within 10 min"
