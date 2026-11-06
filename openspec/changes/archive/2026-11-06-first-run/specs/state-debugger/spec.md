# Spec Delta

## ADDED Requirements

### Requirement: Replay first run
The debugger SHALL offer "Replay first run", which clears the onboarded flag and shows the splash. The journey list SHALL have a "First run" group with the splash, Getting started, the location ask and sign in. On native builds, where the debugger isn't mounted, a development build SHALL offer "Replay first run" in the account sheet.

#### Scenario: Replay on the web
- **WHEN** the author taps Replay first run in the debugger
- **THEN** the splash shows and first run plays from the start

#### Scenario: Open sign in from the journey list
- **WHEN** the author picks First run › Sign in
- **THEN** the sign in screen shows
