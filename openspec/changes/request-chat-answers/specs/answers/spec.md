# Spec Delta

## ADDED Requirements

### Requirement: Answer arrival motion
A new answer card SHALL grow into the chat from its place in the list with the arrive spring, and with Reduce Motion on it SHALL fade in instead.

#### Scenario: Reduce Motion
- **WHEN** Reduce Motion is on and Paper & Co's answer arrives
- **THEN** the card fades in without movement

### Requirement: Answer accessibility
An answer card SHALL be one element for screen readers, read as shop, status, source, price, walk time and collect-by date, with Buy, Show me and No thanks as custom actions.

#### Scenario: VoiceOver
- **WHEN** VoiceOver focuses Paper & Co's card
- **THEN** it reads "Paper & Co, has them, replied 2 minutes ago, £14.99, 13 minute walk, collect by Monday 9 November"
