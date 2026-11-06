# Spec Delta

## ADDED Requirements

### Requirement: The mark is a glyph
The Snuffle mark SHALL be shown as a bare glyph in one colour that follows the theme (dark on light backgrounds, light on dark), and SHALL never sit in a tile, circle or avatar inside the app. This reverses decision 045's "mark on a Lavender tile". The app icon keeps its platform tile, which the system draws.

#### Scenario: Chat sender line
- **WHEN** a group of Snuffle bubbles starts in a chat
- **THEN** the sender line shows the small glyph next to "Snuffle", with no avatar beside the bubbles

#### Scenario: Notification in dark mode
- **WHEN** a Snuffle notification shows in dark mode
- **THEN** its mark is the light glyph with no tile
