# Tasks

## 1. Mark

- [x] 1.1 `SnuffleMark` component: bare glyph, Foreground with Muted foreground stripes, token sizes, `Component.md` and examples
- [x] 1.2 Chat sender line with the inline glyph and no avatar column; typing indicator, notification and Live Activity with the bare glyph
- [x] 1.3 `mark.md` and `components.md` (EN and PT) state the rule and the reversal of decision 045; v8 canvas splash, sign in and Snuffle marks as the bare glyph

## 2. Native splash

- [x] 2.1 Render `splash-mark.png` and `splash-mark-dark.png` from the glyph; `expo-splash-screen` with the background tokens and a `dark` variant (needs a native rebuild)

## 3. First run

- [x] 3.1 `hasOnboarded` in the store, persisted (file on native, `localStorage` on the web), `?firstRun=1`, step links count as onboarded
- [x] 3.2 `PageDots` and `SignInButton` components with `Component.md` and examples; `Alert` stacks three actions
- [x] 3.3 `/welcome`: splash moment and three Getting started pages (swipe, dots, Skip, Continue, illustrations)
- [x] 3.4 `/location-ask`: why, Allow location with the simulated prompt, Choose a place instead with the location sheet
- [x] 3.5 `/sign-in`: Apple, Google, Facebook, email, Not now (proposal); mock auth; fade into Nearby
- [x] 3.6 Debugger: Replay first run and the First run journey group; dev-only Replay first run in the account sheet on native
- [x] 3.7 `docs/deliver/prototype.md` (EN and PT): First run, how to test

## 4. Checks

- [x] 4.1 `npm run check` passes in `app/`; `npm run export:web` builds
- [ ] 4.2 First run checked on the web in light and dark, and on the iOS simulator after a native rebuild
