# Spec Delta

## ADDED Requirements

### Requirement: State from the URL
On the web build, the debugger SHALL read the persona, platform, scheme and journey step from URL parameters at start, and SHALL offer a link that reproduces the current state.

#### Scenario: Shared link
- **WHEN** the web build opens with `?step=answers&platform=android&scheme=dark`
- **THEN** it shows the Eclipse glasses chat with two answers, in Android dark

#### Scenario: Copy link
- **WHEN** the reviewer taps "Copy link" in the panel
- **THEN** a URL with the current persona, platform, scheme and step is copied

### Requirement: Reset
The debugger SHALL reset every state to the start of the journey for the current persona.

#### Scenario: Reset
- **WHEN** the reviewer taps Reset
- **THEN** the app shows Nearby for the current persona with no requests in progress

### Requirement: Out of the recording
When hidden, the debugger SHALL leave nothing on screen and SHALL not take touches.

#### Scenario: Hidden panel
- **WHEN** the debugger is hidden
- **THEN** no part of the panel is drawn and taps reach the app under it
