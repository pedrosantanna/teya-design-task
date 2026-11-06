# device-frame Specification

## Purpose
Shows the web build of the prototype inside a phone-sized frame, so it reads as a phone app when embedded in the docs or opened in a desktop browser.

## Requirements

### Requirement: Phone frame on the web
On the web, the app SHALL render inside a 402 × 874 phone frame with rounded corners, a status bar and a home indicator, centred in the window.

#### Scenario: Desktop browser
- **WHEN** the web build opens in a 1440 × 900 window
- **THEN** the app is drawn in the phone frame, centred, with the page background around it

### Requirement: Fits the window
The frame SHALL scale down to fit a window shorter than the frame and SHALL not scale above its real size.

#### Scenario: Short window
- **WHEN** the window is 700 high
- **THEN** the whole frame is visible without scrolling

### Requirement: Frame off
The frame SHALL turn off with `?frame=0` and on phones, where the app fills the screen.

#### Scenario: Phone browser
- **WHEN** the web build opens on a phone or with `?frame=0`
- **THEN** the app fills the window without the frame

### Requirement: Native builds unchanged
The iOS and Android builds SHALL render without the frame.

#### Scenario: iPhone
- **WHEN** the app runs on an iPhone
- **THEN** no frame is drawn
