# Spec Delta

## MODIFIED Requirements

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

### Requirement: Reset
The debugger SHALL reset every state to the start of the journey for the current persona, and SHALL keep Reset, Replay first run, Copy link (web) and Hide debugger together in the Actions section.

#### Scenario: Reset
- **WHEN** the reviewer taps Reset
- **THEN** the app shows Nearby for the current persona with no requests in progress
