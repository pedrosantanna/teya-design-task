# state-debugger Specification

## Purpose

The state debugger is a prototype-only panel that sets every state the screens can be in from one mock store, so the walkthrough and reviewers can reach any step of the journey without waiting for simulated shops.

## Requirements

### Requirement: One mock store
Every screen SHALL read its data from one mock store, and the debugger SHALL be the only place that sets it directly.

#### Scenario: Change a state
- **WHEN** the order state is set to "Ready" in the debugger
- **THEN** the order card, the receipt and the request's row all show "Ready · collect by Mon 9 Nov"

### Requirement: Floating side panel
The debugger SHALL be a floating panel on the right side, like Figma's right sidebar, grouped in sections with switches, dropdowns and checkboxes, and SHALL not change the app's layout under it.

#### Scenario: Open panel
- **WHEN** the debugger is shown
- **THEN** it floats over the right side with the sections Persona, Look, Journey and Content

### Requirement: Controls
The debugger SHALL set the persona (Sam, Jess), platform (iOS, Android), scheme (light, dark), journey step, request state, each answer's state, order state and content set.

#### Scenario: Switch persona
- **WHEN** the persona is set to Jess
- **THEN** the area, greeting and requests change to Jess's

#### Scenario: Switch platform
- **WHEN** the platform is set to Android
- **THEN** the app uses the Android theme, components and haptics

#### Scenario: Jump to a step
- **WHEN** the journey step is set to "Answers as they arrive"
- **THEN** the app shows the Eclipse glasses chat with two answers

### Requirement: Hide and show
The debugger SHALL hide and show with a three-finger long-press on touch devices, a keyboard shortcut on the web, and the URL parameter `?debug=0` to start hidden.

#### Scenario: Recording
- **WHEN** the web build is opened with `?debug=0`
- **THEN** the debugger is hidden until the shortcut is pressed

#### Scenario: On a phone
- **WHEN** the shopper's view is touched and held with three fingers
- **THEN** the debugger toggles between shown and hidden
