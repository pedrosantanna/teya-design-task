# location Specification

## Purpose
Where the shopper is shopping and how far they will walk. It sets the area Nearby shows and the "where" of new requests.

## Requirements

### Requirement: Where are you shopping
The location sheet SHALL offer Current location, the shopper's saved places, an address search and a walking radius (Within 10, 15 or 20 min walk), and SHALL apply the choice only on Confirm.

#### Scenario: Choose Work
- **WHEN** the shopper picks "Work · Kensington High St, W8" and taps Confirm
- **THEN** the sheet closes and Nearby shows Kensington High St, W8

#### Scenario: Close without confirming
- **WHEN** the shopper picks a place and taps Close
- **THEN** the area stays as it was

### Requirement: Address search
Typing in the address field SHALL list matching addresses; choosing one selects it as the place to confirm.

#### Scenario: Search
- **WHEN** the shopper types "Earls"
- **THEN** "Earls Court Road, W8" is listed and can be chosen

#### Scenario: No match
- **WHEN** nothing matches what the shopper typed
- **THEN** the sheet says "No addresses match" under the field

### Requirement: Saved places
The shopper SHALL be able to list, add, rename and delete saved places from Places, opened from the Account sheet; saved places SHALL appear in the location sheet.

#### Scenario: Rename
- **WHEN** the shopper renames Work to "Office"
- **THEN** Places and the location sheet list "Office · Kensington High St, W8"

#### Scenario: Delete the chosen place
- **WHEN** the shopper deletes the place Nearby is using
- **THEN** Nearby falls back to Current location

### Requirement: Simulated location
In the prototype, Current location SHALL be the seed area around Blythe Road, address search SHALL filter a fixed list of addresses, and places SHALL live in the store for the session.

#### Scenario: Debugger
- **WHEN** the author changes Place or Radius in the state debugger on the web
- **THEN** Nearby shows that area and radius
