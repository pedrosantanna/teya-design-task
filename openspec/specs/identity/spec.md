# identity Specification

## Purpose
Identity is how Snuffle shows itself inside the app: the mark as a glyph, its one avatar on the chat's sender line, and where its colour is used.

## Requirements

### Requirement: The mark is a glyph
The Snuffle mark SHALL be shown as a bare glyph in one colour that follows the theme (dark on light backgrounds, light on dark), and SHALL NOT sit in a tile or circle inside the app, with one exception: Snuffle's avatar on the chat's sender line. The app icon keeps its platform tile, which the system draws.

#### Scenario: Chat sender line
- **WHEN** a group of Snuffle bubbles starts in a chat
- **THEN** the sender line shows Snuffle's avatar next to "Snuffle"

#### Scenario: Notification in dark mode
- **WHEN** a Snuffle notification shows in dark mode
- **THEN** its mark is the light glyph with no tile

### Requirement: Snuffle's avatar
On the chat's sender line Snuffle SHALL have a 24 pt avatar whose circle is the dog's head: the face fills the circle, and the ears and the awning's corners run past its edge. The circle SHALL be filled with the `snuffle.avatar` colour (the bubble's Lavender in light, Lavender 600 in dark). This is the one place the mark sits in a shape inside the app, and it replaces the bare glyph on the sender line.

#### Scenario: Sender line in light mode
- **WHEN** a group of Snuffle bubbles starts in a chat
- **THEN** the sender line shows the avatar with the ears running past the circle, and "Snuffle" beside it

#### Scenario: Sender line in dark mode
- **WHEN** the same chat shows in dark mode
- **THEN** the circle is Lavender 600, at least 4.26:1 against the chat ground, so the head stays visible
