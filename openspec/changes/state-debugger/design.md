# Design

## Context

See proposal.md. Unistyles holds the theme; the rest of the state is new. The panel must work on iOS, Android and web, and must not appear in the recording when hidden.

## Goals / Non-Goals

**Goals:**
- One store, typed, with named presets for each journey step from app flow v7.
- A panel that is quick to use with a mouse and usable on a phone.

**Non-Goals:**
- Persisting changes the shopper makes in the screens across reloads (only the debugger's own settings persist on web).
- Editing content text from the panel.

## Decisions

- **Store:** Zustand with a typed state and selectors, because screens subscribe to small slices and the debugger writes many fields at once. Alternative: React context with a reducer; rejected because every change would re-render every screen.
- **Journey step presets:** each step (Home, Ask, Snuffle confirms, Asking shops, Answers as they arrive, Details, Apple Pay, Waiting for the shop, Receipt, Code, Day before, Already sold, Payment didn't go through, Shop doesn't confirm, Not collected, No shop has it, The shop delivers, Collect after work, Keep looking, Shop page) is a function that sets the store and navigates with Expo Router.
- **Platform and scheme** call `UnistylesRuntime.setTheme`; components that differ by platform read `theme.platform`, never `Platform.OS`, so the switch works on any device.
- **Panel:** built from design-system primitives plus three debug-only controls (switch, select, checkbox) kept in `src/debug/` and exempt from the "screens use primitives" lint rule. It sits above the app in a portal, 320 wide on web, a sheet from the right edge on phones.
- **Hide and show:** a Gesture Handler `Gesture.LongPress().numberOfPointers(3)` on the root; on web a `keydown` listener for the shortcut (`.` with Ctrl or Cmd, to avoid typing conflicts); `?debug=0` sets hidden at start. On web the last visibility is kept in `localStorage`, read in try/catch.
- **URL state:** on web, `?step=answers&persona=jess&platform=android&scheme=dark` sets the store at start; the panel offers "Copy link".
- **Device frame:** on web only, a `DeviceFrame` component scales a 402 × 874 viewport to fit the window height, draws the corner radius, a status bar with the time from the store and a home indicator. `?frame=0` turns it off. Native builds render without it.

## Risks / Trade-offs

- [Three-finger long-press can clash with iOS accessibility zoom gestures] → keep the duration at 600 ms and document the alternative (`?debug=0`).
- [Scaling the frame with a transform blurs text slightly on some browsers] → scale only in steps of 0.25 when the window is smaller than the frame.
- [Whether the web build loads in the docs artifact's iframe] → tested first in task 4.1.

## Open Questions

- The exact keyboard shortcut, once tested against browser defaults.
