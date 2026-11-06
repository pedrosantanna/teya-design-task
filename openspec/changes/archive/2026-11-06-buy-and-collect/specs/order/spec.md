# Spec Delta

## ADDED Requirements

### Requirement: Simulated payment sheet
The prototype SHALL draw the payment sheet itself, in the iOS or Android form set in the debugger, and the debugger SHALL choose whether the payment succeeds or is declined.

#### Scenario: Declined from the debugger
- **WHEN** the debugger sets payment to "declined" and Sam confirms the sheet
- **THEN** the chat shows "Apple Pay declined the payment, so you haven't been charged" with Try again

#### Scenario: Android form
- **WHEN** the platform is Android and Sam taps Buy
- **THEN** a Google Pay sheet is drawn instead of Apple Pay

### Requirement: Haptics on outcomes
On native builds the prototype SHALL play a light impact when Buy is pressed, a success haptic when an order becomes Ready or Paid, and a warning haptic on a "not charged" ending.

#### Scenario: Ready
- **WHEN** Paper & Co confirms and the order becomes Ready on an iPhone
- **THEN** a success haptic plays

### Requirement: Order status motion
An order card's status change SHALL animate with the status spring and be announced politely to screen readers.

#### Scenario: Waiting to Ready
- **WHEN** the order changes from "Waiting for Paper & Co · not charged yet" to "Ready · collect by Mon 9 Nov"
- **THEN** the label changes with the status animation and VoiceOver announces the new status
