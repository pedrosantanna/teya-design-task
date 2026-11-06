# Spec Delta

## MODIFIED Requirements

### Requirement: Requests list
Requests SHALL list every request as a row with its name, time, a preview with its speaker, one status label and an unread count, and SHALL filter by All, Needs you, Looking, Waiting and Done. Every row SHALL open a full conversation (see "Every request is a conversation").

#### Scenario: Status per row
- **WHEN** a request has two answers with the item and none bought
- **THEN** its row reads "2 shops have them · by 4pm"

#### Scenario: Needs you
- **WHEN** a request needs a decision before a date
- **THEN** its row shows a "Needs you" tag with the deadline ("buy by Thu 5 Nov") beside it, and a compact button such as "Buy at Rossi's"

#### Scenario: Order on a request
- **WHEN** a request has an order
- **THEN** its row shows the order's status label

### Requirement: Chat ground
A chat SHALL sit on the app's Background in light and dark mode, with Snuffle's bubbles in Lavender and no purple tint or glow on the screen. The composer field SHALL be Card with a Border hairline wherever it appears (New Request, a request, the Requests list), so it reads the same everywhere.

#### Scenario: Open a chat
- **WHEN** the shopper opens a chat in light or dark mode
- **THEN** the ground is the Background colour in both, Snuffle's bubbles are Lavender and nothing is tinted or glowing

#### Scenario: Composer field
- **WHEN** the shopper opens New Request and then an older request
- **THEN** the field is the same Card fill with a hairline in both

## ADDED Requirements

### Requirement: Every request is a conversation
Every request in Requests SHALL open as a full conversation with its history, its status and its next action (buy, change or stop a standing request, rate, keep looking or ask further away), and every conversation SHALL have the composer.

#### Scenario: Older request
- **WHEN** the shopper opens a request that ended with an order
- **THEN** the chat shows the history and the order card, and the composer is at the bottom

### Requirement: Chat motion
Everything that arrives in a chat SHALL arrive the same way: Snuffle's message (sender line and bubble together) fades in and rises 8 pt on the smooth spring, and the shopper's bubble keeps its snappy scale. With Reduce Motion new items SHALL only fade.

#### Scenario: Snuffle replies
- **WHEN** Snuffle's reply follows the shopper's message
- **THEN** the typing indicator shows, then the reply rises in over it and the indicator fades out

#### Scenario: Reduce Motion
- **WHEN** Reduce Motion is on and an answer card arrives
- **THEN** it fades in without moving

### Requirement: Chat sequencing
Suggestion chips, the asking list, a status label and an offer card SHALL follow 150 ms after the message before them. The typing indicator SHALL fade in and out, with the message rising in over it, so there is never a gap or two at once. When a status changes, the old content SHALL fade out as the new one fades in.

#### Scenario: Status change
- **WHEN** an answer row changes from "Seen" to "Has them"
- **THEN** the old label fades out as the new one fades in

#### Scenario: Chips after the message
- **WHEN** Snuffle's confirmation arrives with the chips Collect and Check delivery too
- **THEN** the chips fade and rise 150 ms after the message

### Requirement: Sniffing mark while asking
While Snuffle asks the shops and no shop has answered, the asking list SHALL show Snuffle's mark sniffing at the top of the list. It SHALL fade out and give back its height when the first answer arrives. With Reduce Motion the mark SHALL stay still. It is decorative and SHALL be hidden from screen readers.

#### Scenario: Waiting for the first answer
- **WHEN** Snuffle has asked six shops and none has answered
- **THEN** the sniffing mark shows above the six rows

#### Scenario: First answer
- **WHEN** the first shop answers
- **THEN** the mark fades out and the list closes up

### Requirement: Request photo
A request's chat SHALL show the request's photo as a round control at the right end of the bar. Pressing it SHALL open a sheet with six photos to choose from, the current one marked. Choosing one SHALL change the request's photo, close the sheet and update the photo on the Requests list. The control's label SHALL read "Change photo, [request]".

#### Scenario: Pick a photo
- **WHEN** the shopper presses the photo in the bar of "Eclipse glasses" and picks the third photo
- **THEN** the sheet closes and the bar and the Requests row show the third photo

#### Scenario: Picker states
- **WHEN** the sheet is open
- **THEN** six square photos show in a grid of three, the current one has a ring and a check, and each reads "Photo 2 of 6" and "checked" when selected
