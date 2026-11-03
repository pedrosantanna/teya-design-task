# Spec Delta

## ADDED Requirements

### Requirement: Prototype clock for collection
Collection dates, the day-before reminder and the missed window SHALL follow the prototype's clock, which the state debugger can move.

#### Scenario: Move to the day before
- **WHEN** the debugger moves the date to Sun 8 Nov, 9:00
- **THEN** Snuffle's reminder with "Extend to Mon 16 Nov" appears in the chat

#### Scenario: Move past the window
- **WHEN** the debugger moves the date to Tue 10 Nov
- **THEN** the order reads "Not collected · refunded"

### Requirement: Readable code
The full-screen collection code SHALL keep the screen awake and at full brightness while shown, where the platform allows.

#### Scenario: At the counter
- **WHEN** Sam opens the code full screen on an iPhone
- **THEN** the screen doesn't dim while the code is shown
