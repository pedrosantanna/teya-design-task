# Proposal

## Why

The prototype opens straight on Nearby. App flow v8, area "0 · First run", draws what a new shopper sees before that: a splash, three Getting started pages, the location ask in context and sign in. Without them the recording can't start from the beginning, and the location sheet and the illustrations never appear where they were designed to.

The Snuffle mark is also shown wrongly. Decision 045 put it on a Lavender tile, and the prototype draws it in a circle beside chat bubbles, in notifications, the Live Activity and the splash. I decided the tile and the avatar don't exist: the mark is a glyph on its own, in one colour that follows the theme.

## What Changes

- `SnuffleMark` becomes its own design-system component: the bare glyph from `mark-glyph.svg`, in Foreground (dark on light, light on dark), sized from tokens, with no tile, circle or background. Every place that drew the mark in a tile or circle draws the glyph: the chat's sender line ("Snuffle" with the small glyph, no avatar column), the typing indicator, notifications, the Live Activity, the splash and sign in. Reverses the "mark on a Lavender tile" part of decision 045.
- The native splash (`expo-splash-screen`) shows the glyph centred on the light or dark background token, with no icon square. Needs a native rebuild.
- First run: an in-app splash moment (the glyph, fading into Getting started), Getting started in three swipeable pages with 3D illustrations, page dots, Skip and Continue, the location ask ("Allow location" with a simulated system prompt, "Choose a place instead" opening the location sheet), sign in (Apple, Google, Facebook, email; mock auth as the selected persona) and then Nearby with a fade.
- "Not now" on sign in is a proposal (v8 note): it skips sign in and lands on Nearby.
- A persisted `hasOnboarded` flag: first run shows on first launch and is skipped afterwards. The web debugger gets "Replay first run" and the journey list a "First run" group; native builds get a dev-only "Replay first run" row in the account sheet. `?firstRun=1` forces it on the web.

## Capabilities

### New Capabilities
- `first-run`: what a new shopper sees before Nearby, and when it shows.

### Modified Capabilities
- `identity`: how the mark is shown in the app.
- `state-debugger`: first-run steps and Replay first run.

## Impact

- Design system: new `SnuffleMark` (moved out of `ChatBubble`), `PageDots` and `SignInButton`; `ChatBubble`, `TypingIndicator`, `Notification`, `LiveActivity` and `Alert` (three stacked actions, as the iOS location prompt has) change. No token changes; mark sizes reuse existing size tokens until dedicated ones exist.
- Routes: `/welcome`, `/location-ask`, `/sign-in` in an `(onboarding)` group; Nearby redirects there until onboarded.
- Store: `hasOnboarded` (persisted with `expo-file-system` on native and `localStorage` on the web), first-run journey steps.
- Config: `expo-splash-screen` in `app.json`; new `assets/images/splash-mark*.png`. New direct dependency `expo-file-system` (already installed by Expo).
- Docs: `mark.md`, `components.md` (EN and PT), the v8 canvas's splash, sign in and Snuffle marks, `docs/deliver/prototype.md` (EN and PT) "First run".
