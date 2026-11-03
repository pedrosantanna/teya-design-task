# Spec Delta

## ADDED Requirements

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
