# Spec Delta

## ADDED Requirements

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
