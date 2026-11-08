# state-debugger Specification

## Purpose

The state debugger is a prototype-only panel that sets every state the screens can be in from one mock store, so the walkthrough and reviewers can reach any step of the journey without waiting for simulated shops.

## Requirements

### Requirement: One mock store
Every screen SHALL read its data from one mock store, and the debugger SHALL be the only place that sets it directly.

#### Scenario: Change a state
- **WHEN** the order state is set to "Ready" in the debugger
- **THEN** the order card, the pinned order and the request's row all show "Ready · collect by Mon 9 Nov", and the receipt's code card shows "Collect by Mon 9 Nov"

### Requirement: Floating side panel
The debugger SHALL be a panel on the right, docked full height beside the phone frame on windows wide enough for it and an overlay with a close button on narrow ones. It SHALL never sit over the frame, and SHALL group its controls in sections: Journey, Shopper and device, Request and order, Content and context, Simulation and Actions. Content and context and Simulation SHALL start collapsed.

#### Scenario: Open panel
- **WHEN** the debugger is shown in a window wide enough for the phone and the panel
- **THEN** the panel stands to the right of the phone with the six sections, and the phone does not move under it

#### Scenario: Open panel on a narrow window
- **WHEN** the debugger is shown in a narrow window
- **THEN** it overlays from the right with a close button, and Escape closes it

### Requirement: Controls
The debugger SHALL set the persona (Sam, Jess), platform (iOS, Android), scheme (light, dark), phone frame, journey step, request state, each answer's state, order state, payment sheet outcome, content set, place and walking radius, shop hours, loading, location and notification permissions, and, in Simulation, whether the clock runs and what the shop or the payment does next.

#### Scenario: Switch persona
- **WHEN** the persona is set to Jess
- **THEN** the area, greeting and requests change to Jess's

#### Scenario: Switch platform
- **WHEN** the platform is set to Android
- **THEN** the app uses the Android theme, components and haptics

#### Scenario: Jump to a step
- **WHEN** the journey step is set to "Answers as they arrive"
- **THEN** the app shows the Eclipse glasses chat with two answers

#### Scenario: Advance the clock
- **WHEN** the reviewer taps "Advance 1 min" in Simulation
- **THEN** the simulated shops move on by a minute

### Requirement: Hide and show
The debugger SHALL hide and show with a three-finger long-press on touch devices, a keyboard shortcut on the web, and the URL parameter `?debug=0` to start hidden.

#### Scenario: Recording
- **WHEN** the web build is opened with `?debug=0`
- **THEN** the debugger is hidden until the shortcut is pressed

#### Scenario: On a phone
- **WHEN** the shopper's view is touched and held with three fingers
- **THEN** the debugger toggles between shown and hidden

### Requirement: State from the URL
On the web build, the debugger SHALL read the persona, platform, scheme and journey step from URL parameters at start, and SHALL offer a link that reproduces the current state.

#### Scenario: Shared link
- **WHEN** the web build opens with `?step=answers&platform=android&scheme=dark`
- **THEN** it shows the Eclipse glasses chat with two answers, in Android dark

#### Scenario: Copy link
- **WHEN** the reviewer taps "Copy link" in the panel
- **THEN** a URL with the current persona, platform, scheme and step is copied

### Requirement: Reset
The debugger SHALL reset every state to the start of the journey for the current persona, and SHALL keep Reset, Replay first run, Copy link (web) and Hide debugger together in the Actions section.

#### Scenario: Reset
- **WHEN** the reviewer taps Reset
- **THEN** the app shows Nearby for the current persona with no requests in progress

### Requirement: Out of the recording
When hidden, the debugger SHALL leave nothing on screen and SHALL not take touches.

#### Scenario: Hidden panel
- **WHEN** the debugger is hidden
- **THEN** no part of the panel is drawn and taps reach the app under it

### Requirement: Replay first run
The debugger SHALL offer "Replay first run", which clears the onboarded flag and shows the splash. The journey list SHALL have a "First run" group with the splash, Getting started, the location ask and sign in. On native builds, where the debugger isn't mounted, a development build SHALL offer "Replay first run" in the account sheet.

#### Scenario: Replay on the web
- **WHEN** the author taps Replay first run in the debugger
- **THEN** the splash shows and first run plays from the start

#### Scenario: Open sign in from the journey list
- **WHEN** the author picks First run › Sign in
- **THEN** the sign in screen shows
