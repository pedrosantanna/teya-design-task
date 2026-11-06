# request Specification

## Purpose

A request is one chat with Snuffle holding what the shopper asked for in one go (decision 025). It owns its answers and orders, and it is the only list the shopper keeps: Requests.

## Requirements

### Requirement: Ask
The shopper SHALL start a request by typing or choosing a suggestion; the shopper's message SHALL appear at once as their bubble, and the request SHALL be added to Requests.

#### Scenario: New request
- **WHEN** the shopper sends "Eclipse glasses, 2 pairs, before 4pm"
- **THEN** the message shows as the shopper's bubble immediately and a request "Eclipse glasses" appears in Requests

### Requirement: Snuffle confirms what it understood
Snuffle SHALL restate the request (items, quantity, area, deadline) and ask how the shopper wants to get it before asking shops.

#### Scenario: Confirm and choose
- **WHEN** the request is "Eclipse glasses, 2 pairs, before 4pm"
- **THEN** Snuffle replies "Got it: 2 pairs within 15 minutes of you, by 4pm." and offers the chips Collect and Check delivery too

### Requirement: Asking shops
Once the shopper has chosen, Snuffle SHALL ask the likely shops at the same time and show them as a list of compact rows, one per shop, each with its answer state.

#### Scenario: Asking 6 shops
- **WHEN** the shopper taps Collect
- **THEN** Snuffle says "I'm asking 6 shops on 6 streets near you." and lists six shop rows, each starting at "Asked"

### Requirement: Leaving while Snuffle asks
The shopper SHALL be able to leave the app while Snuffle asks; each answer SHALL reach them as a notification and on the Live Activity.

#### Scenario: Away from the app
- **WHEN** Paper & Co answers while the app is closed
- **THEN** a notification from Snuffle reads "Paper & Co on King Street has them too: £14.99 a pair."

### Requirement: Split proposal
When one message holds items for different days or kinds of shop, Snuffle SHALL propose splitting it into separate requests as a bubble with the chips "Split into 2" and "Keep as one".

#### Scenario: Two errands in one message
- **WHEN** the shopper asks "Eclipse glasses for today, and a birthday cake for Saturday"
- **THEN** Snuffle proposes two requests and, on "Split into 2", Requests shows two rows

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

### Requirement: Keep looking
The shopper SHALL be able to leave a request open with Keep looking, once or on repeat, with a where and an until date; Snuffle SHALL send one message when a shop has it and SHALL never buy on its own.

#### Scenario: Keep looking until Friday
- **WHEN** the shopper sets Keep looking, once, within 15 min, until Fri 6 Nov
- **THEN** the row reads "Looking · until Fri 6 Nov" and the screen states "Nothing is bought until you tap Buy."

### Requirement: Nothing found
When no shop has the item before the deadline, Snuffle SHALL say how many said no and how many didn't reply, and offer Ask further away and Keep looking.

#### Scenario: No shop has it in time
- **WHEN** all 6 shops answer no or don't reply before 4pm
- **THEN** Snuffle says "None of the 6 shops has them before 4pm: 4 said no and 2 didn't reply." with Ask further away and Keep looking

### Requirement: Close
The shopper SHALL be able to close a request; it then shows as "Closed" under Done.

#### Scenario: Close from the list
- **WHEN** the shopper swipes a row and taps Close (iOS) or picks Close from the long-press menu (Android)
- **THEN** the row's status becomes "Closed"

### Requirement: Simulated shops
In the prototype, shops SHALL answer from a script per request, moving each shop from "Asked" to "Seen" to its outcome on a clock that the state debugger can pause, step or jump.

#### Scenario: Default pace
- **WHEN** Sam taps Collect and the clock runs
- **THEN** the first shop answers within about 10 seconds and the last within about 40 seconds

#### Scenario: Jump to answers
- **WHEN** the debugger sets the step "Answers as they arrive"
- **THEN** the asking list and the chat show the answers as in that frame of app flow v7

### Requirement: Simulated notification
When a shop answers while the shopper is on another screen, the prototype SHALL show the notification as a simulated system banner, the same on iOS, Android and web.

#### Scenario: Banner
- **WHEN** Paper & Co answers while Sam is on Nearby
- **THEN** a banner from Snuffle shows "Paper & Co on King Street has them too: £14.99 a pair." and tapping it opens the chat

### Requirement: Unmatched messages
When the shopper types something the script doesn't cover, Snuffle SHALL reply once that this prototype only knows a few requests and show them as suggestion chips.

#### Scenario: Off-script message
- **WHEN** the shopper types "a lawnmower"
- **THEN** Snuffle replies and offers the scripted requests as chips

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

### Requirement: Snuffle speaks in Lavender
Snuffle's bubbles, the typing indicator, its avatar, notifications and the Live Activity SHALL use the Snuffle Lavender roles; Indigo SHALL stay for what the shopper does.

#### Scenario: Snuffle replies
- **WHEN** Snuffle answers in the chat
- **THEN** its bubble is Lavender 100 (Lavender 900 in dark mode) beside the retriever mark on its Lavender tile

### Requirement: Shops on request rows
A request row SHALL show the shops that answered as small circles in their accents with their initials.

#### Scenario: Two shops have them
- **WHEN** Paper & Co and Bush Opticians have answered
- **THEN** the row shows a Lavender "PC" and a Pistachio "BO" on the item photo

### Requirement: New request opens with Snuffle
The New Request screen SHALL open with a Snuffle bubble that says what Snuffle will do and three suggestion chips under it, with "Snuffle" and the mark in the bar. The composer SHALL grow out of the ask bar as the keyboard rises.

#### Scenario: Open from Nearby
- **WHEN** the shopper presses the ask bar
- **THEN** the bar's glass becomes the composer, Snuffle's bubble and three suggestions show, and the keyboard opens

#### Scenario: Send
- **WHEN** the shopper sends a request
- **THEN** their bubble appears at once and Snuffle's reply follows

### Requirement: Chat ground
A chat SHALL sit on the app's Background in light and dark mode, with Snuffle's bubbles in Lavender and no purple tint or glow on the screen. The composer field SHALL be Card with a Border hairline wherever it appears (New Request, a request, the Requests list), so it reads the same everywhere.

#### Scenario: Open a chat
- **WHEN** the shopper opens a chat in light or dark mode
- **THEN** the ground is the Background colour in both, Snuffle's bubbles are Lavender and nothing is tinted or glowing

#### Scenario: Composer field
- **WHEN** the shopper opens New Request and then an older request
- **THEN** the field is the same Card fill with a hairline in both

### Requirement: Every request is a conversation
Every request in Requests SHALL open as a full conversation with its history, its status and its next action (buy, change or stop a standing request, rate, keep looking or ask further away), and every conversation SHALL have the composer.

#### Scenario: Older request
- **WHEN** the shopper opens a request that ended with an order
- **THEN** the chat shows the history and the order card, and the composer is at the bottom

### Requirement: Chat motion
Everything that arrives in a chat SHALL arrive the same way: Snuffle's message (sender line and bubble together) fades in and rises 16 pt on the smooth spring, and the shopper's bubble keeps its snappy scale. With Reduce Motion new items SHALL only fade.

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
