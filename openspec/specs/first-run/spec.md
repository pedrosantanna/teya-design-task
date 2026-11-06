# first-run Specification

## Purpose
First run is what a new shopper sees before Nearby: the splash, three Getting started pages, the location ask and sign in. It exists so the prototype can show a shopper arriving, and every step can be replayed from the state debugger.

## Requirements

### Requirement: When first run shows
First run SHALL show on the first launch and SHALL be skipped on later launches; the prototype SHALL remember it across launches.

#### Scenario: First launch
- **WHEN** the shopper opens the app for the first time
- **THEN** the splash shows, then Getting started page 1

#### Scenario: Returning shopper
- **WHEN** the shopper has finished first run and opens the app again
- **THEN** Nearby shows after the system splash

### Requirement: Splash
The splash SHALL show the Snuffle mark as a bare glyph centred on the background colour, with no icon square, and SHALL fade into Getting started. Under Reduce Motion it SHALL only crossfade.

#### Scenario: Splash in dark mode
- **WHEN** the device is in dark mode on first launch
- **THEN** the light glyph shows centred on the dark background

### Requirement: Getting started
Getting started SHALL have three pages ("Ask for anything nearby", "Snuffle asks the shops for you", "Buy, then collect when it suits you"), each with a 3D illustration, page dots, Continue and, except on the last page, Skip. The shopper SHALL be able to swipe between pages. Skip and Continue on the last page SHALL go to the location ask. Illustrations SHALL be still under Reduce Motion.

#### Scenario: Swipe
- **WHEN** the shopper swipes left on page 1
- **THEN** page 2 shows and the second dot is current

### Requirement: Location ask
The location ask SHALL say why location is needed before the system prompt. "Allow location" SHALL show the platform's permission prompt; "Choose a place instead" SHALL open the location sheet.

#### Scenario: Don't allow
- **WHEN** the shopper taps Allow location, then Don't Allow
- **THEN** sign in shows, and Nearby later opens in its location-off state

#### Scenario: Choose a place
- **WHEN** the shopper taps Choose a place instead, picks Home and confirms
- **THEN** sign in shows, and Nearby later shows Home's area

### Requirement: Sign in
Sign in SHALL offer Continue with Apple first, then Google, Facebook and email. In the prototype any of them SHALL sign in as the selected persona and open Nearby with a transition.

#### Scenario: Continue with Apple
- **WHEN** the shopper taps Continue with Apple
- **THEN** the button shows a spinner, then Nearby fades in for the selected persona

### Requirement: Not now (proposal)
Sign in SHALL offer "Not now", which opens Nearby without signing in. This is a proposal from the v8 note and is to be decided.

#### Scenario: Browse first
- **WHEN** the shopper taps Not now
- **THEN** Nearby shows and first run doesn't show again
