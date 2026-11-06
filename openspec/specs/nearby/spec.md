# nearby Specification

## Purpose

Nearby is the home screen: the shopper's area, the small independent shops within reach, and the ask bar that starts a request. It is where browsing and asking begin.

## Requirements

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

### Requirement: Street filter
Nearby SHALL let the shopper filter the "New near you" section by street with single-choice filter chips, "All" first.

#### Scenario: Filter by street
- **WHEN** the shopper taps "King St"
- **THEN** only shops on King Street show in that section and "King St" shows as selected

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

### Requirement: Open a shop
Tapping a tile SHALL open that shop's page with a zoom from the tile.

#### Scenario: Tap a tile
- **WHEN** the shopper taps the Rossi's Bakery tile
- **THEN** the Rossi's Bakery shop page zooms open from the tile

### Requirement: No shops nearby
When no shop is within 15 minutes, Nearby SHALL say so in Snuffle's voice and offer Ask anyway and Change area.

#### Scenario: Empty area
- **WHEN** no shops on Snuffle are within 15 minutes of the shopper
- **THEN** Nearby shows "No shops on Snuffle within 15 minutes of you yet." with Ask anyway and Change area

### Requirement: Mock content per persona
Nearby SHALL take its area, shops and suggestions from the content set of the persona chosen in the state debugger.

#### Scenario: Jess
- **WHEN** the persona is Jess
- **THEN** the suggestions include "Sourdough from Rossi's every Friday" and the greeting uses her name

### Requirement: Photo credits in code only
Every Unsplash photo SHALL keep its photographer's credit in `app/src/content/images.ts`. The prototype's photos are stand-ins, so Nearby SHALL NOT show credits in its interface or its accessibility hints (changed by `identity-in-use`).

#### Scenario: Tile without a credit
- **WHEN** a screen reader focuses a tile
- **THEN** it reads the shop's name, badges and meta line, and no photo credit

### Requirement: Loading
Nearby SHALL show tile-shaped skeletons only if content takes longer than about 300 ms, and photos SHALL fade in over them; a failed photo SHALL show the no-photo placeholder.

#### Scenario: Slow photo
- **WHEN** a photo hasn't loaded after 300 ms
- **THEN** a skeleton at the tile's size shows until the photo fades in

#### Scenario: Broken photo
- **WHEN** a photo fails to load
- **THEN** the tile shows the tonal placeholder with the shop's initials

### Requirement: Platform forms on Nearby
The Requests button SHALL open Requests with a zoom transition on iOS and a container transform on Android, following the platform set in the debugger.

#### Scenario: Android look
- **WHEN** the platform is Android and the shopper taps the Requests button
- **THEN** Requests opens with the container transform from the button

### Requirement: Shops follow the area
Nearby SHALL show the shops of the chosen area within the chosen walking radius, and SHALL reload when either changes.

#### Scenario: Work area
- **WHEN** the shopper chooses Work · Kensington High St, W8
- **THEN** Nearby shows skeletons briefly, then "Kensington High St, W8" with that area's streets and shops

#### Scenario: Smaller radius
- **WHEN** the shopper chooses "Within 10 min walk"
- **THEN** only shops 10 minutes away or less show, and the street count reads "within 10 min"

### Requirement: Shops by kind
Nearby SHALL show a "Shops by kind" section with one card per kind (Fashion, Bakery, Café, Opticians, Bags, Gifts, Florist, Hardware), each in its kind's pastel and, when the illustration pipeline provides it, a still of the kind's 3D object. A tap SHALL start a request for that kind.

#### Scenario: Before the stills exist
- **WHEN** Nearby loads and no category still is available
- **THEN** each card shows its pastel and its label, at its fixed size

#### Scenario: Tap a kind
- **WHEN** the shopper taps Bakery
- **THEN** the Ask screen opens with "Bakery" as the draft

### Requirement: Shop accent on tiles
A shop tile SHALL show the shop's tonal tile (its accent, initials and the awning band) while its photo loads or if the photo fails.

#### Scenario: Broken photo
- **WHEN** Rossi's Bakery's photo fails to load
- **THEN** the tile shows "RB" on Butter with the awning band

### Requirement: Browse by category
Nearby SHALL show a "Browse by category" section with one card per kind. A tap SHALL open the Category screen for that kind, listing the shops of that kind in the area.

#### Scenario: Tap a kind
- **WHEN** the shopper taps Bakery
- **THEN** the Category screen opens with the area's bakeries as rows, in the Butter tile colour with the bakery still in its header

### Requirement: Categories ordered by what is open
"Browse by category" SHALL order the kinds by how many shops of that kind are open now in the shopper's area, breaking ties with a fixed everyday order, and SHALL put kinds with nothing open last. Neighbouring cards SHALL differ in colour.

#### Scenario: Order follows opening
- **WHEN** more cafés than bakeries are open in the area
- **THEN** Café comes before Bakery

#### Scenario: Nothing open
- **WHEN** no florist is open
- **THEN** Florist comes after every kind that has an open shop
