# Spec Delta

## MODIFIED Requirements

### Requirement: Receipt header
The receipt SHALL open with a header in the shop's accent at the tile step, with no band across the top, the status label and the shop's name in Display name. Extend and Cancel for a refund SHALL be text buttons, Cancel in the destructive colour.

#### Scenario: Ready at Paper & Co
- **WHEN** the order is Ready
- **THEN** the header is Lavender with "Paper & Co" in Gambetta, Directions is the one filled button, and "Extend to Mon 16 Nov" and "Cancel for a refund" are text buttons

#### Scenario: Receipt on a shop's colour
- **WHEN** the shopper opens the receipt for Paper & Co
- **THEN** the header uses the shop's accent at the tile step and has no band
