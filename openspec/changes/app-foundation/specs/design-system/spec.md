# Spec Delta

## Purpose

Gives every screen the design system's values through four generated themes and components that accept token names only, so the iOS and Android looks and both schemes stay consistent.

## ADDED Requirements

### Requirement: Four themes from one token source
The app SHALL have four themes, iOS light, iOS dark, Android light and Android dark, generated from one set of design tokens whose values match the design system pages.

#### Scenario: Light background
- **WHEN** the app runs in iOS light
- **THEN** the background is #F4F1ED, cards are #FFFFFF and the primary colour is #3D35B8

#### Scenario: Dark primary
- **WHEN** the app runs in iOS dark
- **THEN** the primary colour is #B5BFFF with black text on it

#### Scenario: Android hit area
- **WHEN** the app runs in an Android theme
- **THEN** the minimum touch area is 48 instead of 44

### Requirement: Theme switch at run time
The app SHALL switch between the four themes while running, without a reload, and every screen SHALL update.

#### Scenario: Switch to Android dark
- **WHEN** the theme is set to Android dark
- **THEN** the current screen redraws with the dark colour roles and the Android springs and hit areas

### Requirement: Initial theme
The app SHALL start in the iOS theme on iOS and web and the Android theme on Android, in the scheme the system is set to.

#### Scenario: Web in dark mode
- **WHEN** the web build opens in a browser set to dark mode
- **THEN** the app starts in iOS dark

### Requirement: Text styles
All text SHALL use one of the type styles from the Typography page, named by style, with its size, line height, weight and tracking.

#### Scenario: Headline
- **WHEN** a row title uses the headline style
- **THEN** it renders at 17 with line height 22, weight 600

### Requirement: Buttons
The button SHALL come in four roles (filled, tonal, plain, destructive) and two sizes (large 50 high and full width, compact 36 high), press at touch-down by scaling to 0.97, and offer loading and disabled states.

#### Scenario: Loading Buy
- **WHEN** Buy is loading
- **THEN** a spinner replaces the label, the button keeps its width and is reported busy to screen readers

#### Scenario: Compact hit area
- **WHEN** a compact button is drawn 36 high
- **THEN** its touch area still reaches the platform's minimum hit area

### Requirement: Component gallery
Every component SHALL have an example for each variant, role, size and state, shown on one gallery screen.

#### Scenario: Open the gallery
- **WHEN** the shopper-facing app is opened at `/design-system`
- **THEN** every type style and every button role, size and state is shown
