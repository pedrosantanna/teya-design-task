# Spec Delta

## ADDED Requirements

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
