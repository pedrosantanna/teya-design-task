# Spec Delta

## Purpose

Runs the prototype from one codebase on iOS, Android and the web, and holds the checks that every build must pass before it is recorded or published.

## ADDED Requirements

### Requirement: One app on three platforms
The prototype SHALL run from one codebase as an iOS app, an Android app and a static web build.

#### Scenario: Web export
- **WHEN** the web build is exported
- **THEN** it produces a static single-page build that opens in a browser without a server

### Requirement: Checks before a build
A build SHALL pass lint, type checking and a token drift check; a failure in any of them SHALL fail the check.

#### Scenario: Raw value in a screen
- **WHEN** a screen sets `padding: 12` or a colour string
- **THEN** the check fails and names the property

#### Scenario: Edited token file
- **WHEN** a token file changes and the generated theme isn't rebuilt
- **THEN** the check fails with "Token drift"

### Requirement: Web bundle size
The web build SHALL not include icons it doesn't use.

#### Scenario: Icon imports
- **WHEN** a file imports from the icon package's root
- **THEN** the check fails and asks for a per-icon import
