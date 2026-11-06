# Proposal

## Why

The journey depends on shops answering over minutes and on failures that are hard to trigger by hand. For the recording and for reviewers clicking through the web build, every state has to be one click away, and the iOS/Android and light/dark switch from decision 038 needs a home. The web build also needs to look like a phone inside the docs.

## What Changes

- One mock store holding persona, platform, scheme, journey step, request, answer and order states, and the content set; every screen reads from it.
- A floating, hideable side panel on the right, like Figma's right sidebar, with switches, dropdowns and checkboxes over that store.
- Hide and show by a three-finger long-press on touch devices, a keyboard shortcut on the web, and `?debug=0` to start hidden.
- The store can be set from the URL, so a link opens the prototype at a given step and look.
- A device frame that wraps the web build in a 402 × 874 phone with the status bar and home indicator, for embedding in the docs.
- The theme switch on the starter home screen moves into the debugger.

## Capabilities

### New Capabilities
- `device-frame`: the phone frame around the web build and how it fits the browser window.

### Modified Capabilities
- `state-debugger`: adds URL state, reset and how the debugger stays out of the recording.

## Impact

- New `app/src/debug/` (store, panel, gestures) and `app/src/frame/`; the root layout wraps screens in both.
- Every later change reads mock data from the store instead of local constants.
