# Spec Delta

## ADDED Requirements

### Requirement: New request opens with Snuffle
The New Request screen SHALL open with a Snuffle bubble that says what Snuffle will do and three suggestion chips under it, with "Snuffle" and the mark in the bar. The composer SHALL grow out of the ask bar as the keyboard rises.

#### Scenario: Open from Nearby
- **WHEN** the shopper presses the ask bar
- **THEN** the bar's glass becomes the composer, Snuffle's bubble and three suggestions show, and the keyboard opens

#### Scenario: Send
- **WHEN** the shopper sends a request
- **THEN** their bubble appears at once and Snuffle's reply follows

### Requirement: Chat ground
A chat SHALL sit on a neutral ground (white in light mode, the background in dark), with Snuffle's bubbles in Lavender and no purple tint or glow on the screen.

#### Scenario: Open a chat
- **WHEN** the shopper opens a chat in light or dark mode
- **THEN** the ground is white in light mode and the background colour in dark, Snuffle's bubbles are Lavender and nothing is tinted or glowing
