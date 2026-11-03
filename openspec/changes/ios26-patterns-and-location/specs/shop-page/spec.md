# Spec Delta

## MODIFIED Requirements

### Requirement: Back
Back SHALL return to where the shop page was opened from, by the platform's own gesture or control. On iOS and the web Back is a chevron in a glass circle whose accessibility label names the previous screen; on Android it is the arrow icon button.

#### Scenario: Back to Nearby
- **WHEN** the shopper opened the page from a Nearby tile and swipes from the left edge on iOS
- **THEN** Nearby shows again at the same scroll position

#### Scenario: Back label
- **WHEN** VoiceOver focuses Back on a shop page opened from Nearby
- **THEN** it reads "Back to Nearby"

## ADDED Requirements

### Requirement: Zoom open and dismiss
The shop page SHALL open with a zoom from the tile that was tapped, and on iOS the shopper SHALL be able to drag it down to zoom it back into the tile. Under Reduce Motion it SHALL crossfade instead.

#### Scenario: Drag to dismiss
- **WHEN** the shopper drags the shop page down on iOS
- **THEN** the page shrinks toward the Rossi's Bakery tile and Nearby shows again
