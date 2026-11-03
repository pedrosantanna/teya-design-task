# Spec Delta

## MODIFIED Requirements

### Requirement: Ask bar
Nearby SHALL show the ask bar at the bottom at full size at all times: the round Requests button and the Ask capsule reading "Ask for anything nearby". Scrolling SHALL NOT shrink it. Suggestion chips SHALL NOT float above it; they appear on the New Request screen.

#### Scenario: Scroll down
- **WHEN** the shopper scrolls Nearby down
- **THEN** the ask bar keeps its size and placeholder

### Requirement: Browse by category
Nearby SHALL show a "Browse by category" section with one card per kind. A tap SHALL open the Category screen for that kind, listing the shops of that kind in the area.

#### Scenario: Tap a kind
- **WHEN** the shopper taps Bakery
- **THEN** the Category screen opens with the area's bakeries as rows, in the Butter tile colour with the bakery still in its header
