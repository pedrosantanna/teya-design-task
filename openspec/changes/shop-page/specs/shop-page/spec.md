# Spec Delta

## ADDED Requirements

### Requirement: Photo credits in code only
The prototype's photos are stand-ins, so the shop page SHALL NOT show photo credits in its interface; the photographer and Unsplash credit for each photo SHALL stay in `app/src/content/images.ts`. (Changed by `identity-in-use`; the map's "© OpenStreetMap contributors" stays, as the map data's licence requires.)

#### Scenario: No credit lines
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** no photo credit appears on the page or in its accessibility hints

### Requirement: Simulated Call and Directions
In the prototype, Call and Directions SHALL show what would happen (the number to call, the walking route) without leaving the app.

#### Scenario: Directions
- **WHEN** the shopper taps Directions on Rossi's Bakery
- **THEN** a sheet shows the walk from Blythe Road with "2 min walk" and no external app opens
