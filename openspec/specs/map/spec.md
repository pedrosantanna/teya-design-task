# map Specification

## Purpose
The map is the backdrop of the shop page and the Directions sheet: a real street map drawn from bundled OpenStreetMap data, with each shop on its real street and the walk from the shopper's door.

## Requirements

### Requirement: Shops on their real street
Every shop SHALL stand at a point on the street its card names, taken from OpenStreetMap, and the map SHALL be drawn from bundled data with no network request at runtime. Roads, parks, water and buildings SHALL use the map roles of the theme, with no labels.

#### Scenario: Shop on King Street
- **WHEN** the shopper opens the page of a shop on King Street
- **THEN** the map shows King Street with the shop's pin on it, not Blythe Road

#### Scenario: Offline
- **WHEN** the device has no network
- **THEN** the map draws as usual from the bundled data

### Requirement: Walk from the shopper's door
The map SHALL draw the walking route from the shopper's door, 163 Blythe Road, to the shop in the shop's accent, with the door as a white dot. The map SHALL turn so the door is to the left of the shop, zoom out until the whole walk fits in the band of map above the card, and centre the walk; the pin SHALL follow the shop sideways.

#### Scenario: Shop 10 minutes away
- **WHEN** the shopper opens a shop 10 minutes away
- **THEN** the map shows the whole walk between the door and the shop's pin, in the shop's accent

#### Scenario: Away from home
- **WHEN** the chosen place is Work
- **THEN** no walk is drawn and the map stands on the shop at the area's zoom

### Requirement: Walk times come from the routes
Each shop's walk time SHALL be the length of its route at 80 m a minute, so the card, Nearby and the map agree. A shop whose walk is longer than the walking radius SHALL NOT be listed on Nearby.

#### Scenario: Far shop
- **WHEN** a shop's route is 25 minutes long and the radius is 20 minutes
- **THEN** Nearby does not list it

### Requirement: Map credit
"© OpenStreetMap contributors" SHALL be shown wherever a map is shown. Where the map sits behind content (the shop page) the credit SHALL be a centred line at the foot of the card, not on the map; elsewhere it SHALL sit in the map's bottom corner.

#### Scenario: Shop page
- **WHEN** the shopper scrolls to the foot of a shop page
- **THEN** a centred line reads "© OpenStreetMap contributors" and none shows over the map header

### Requirement: Static fallback
Until the map has fully rendered, and when it cannot draw, the map SHALL show a still image of the area round Blythe Road for the plain map, or the map ground alone for a shop's route.

#### Scenario: WebGL unavailable
- **WHEN** the map cannot draw on a shop page
- **THEN** the map ground and the pin show, with no wrong street
