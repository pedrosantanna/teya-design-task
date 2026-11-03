# Spec Delta

## ADDED Requirements

### Requirement: Screen transitions
Every screen change in a request SHALL be animated from where the shopper tapped, and SHALL be a crossfade under Reduce Motion: Requests zooms from the Requests button, a request's chat pushes from the side, the details sheet grows from the answer card, payment slides up, the receipt crossfades in, the code zooms from the code, and Keep looking opens as a sheet.

#### Scenario: Open Requests
- **WHEN** the shopper taps the Requests button on Nearby
- **THEN** Requests zooms open from the button

#### Scenario: Open an answer
- **WHEN** the shopper taps the Paper & Co answer card
- **THEN** the details sheet grows from the card

#### Scenario: Reduce Motion
- **WHEN** Reduce Motion is on and the shopper opens a request's chat
- **THEN** the chat crossfades in

### Requirement: Close and Confirm on sheets
Sheets and presented screens SHALL have Close as a glass × circle; a sheet that commits a choice SHALL have Confirm as a tinted checkmark circle at the top right on iOS and the web, and a "Done" tonal button on Android.

#### Scenario: Location sheet
- **WHEN** the "Where are you shopping?" sheet is open on iOS
- **THEN** Close shows at the top left and Confirm, a checkmark, at the top right
