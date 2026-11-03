# Proposal

## Why

The prototype needs one codebase that runs as an iOS app for the recording and as a web build inside the docs (decision 038), and every screen has to look like the design system without each screen re-deciding colours, spacing or type. Building the foundation first, with checks that fail on raw values, keeps the screens built later by agents consistent.

## What Changes

- One Expo app in `app/` (Expo SDK 58, React Native 0.88, Expo Router), no monorepo.
- Design tokens in DTCG 2025.10 format, copied from the Colour, Spacing, Shape, Motion, Typography and Components pages, with a resolver that combines them into four themes: iOS light, iOS dark, Android light, Android dark.
- A small build script that generates a typed theme (`theme.generated.ts`) from the tokens; `npm run tokens`.
- Unistyles 3 registers the four themes and switches between them at run time, on native and web.
- Two hand-written primitives, `Text` and `Button`, whose props take token names only, each with `Component.md` and examples on a `/design-system` route.
- A check pipeline: ESLint rules that ban colour literals, inline styles, raw numbers for spacing, size, radius and type, and react-native `Text`, `Pressable` and `StyleSheet` in screens; `tsc --noEmit`; a token drift check. `npm run check` runs all three.
- Claude Code hooks: lint each file an agent edits under `app/`, and run `npm run check` before the agent stops.
- Typed Unsplash image manifest with credits for mock content.

## Capabilities

### New Capabilities
- `design-system`: themes generated from tokens, switching between them, and components that only accept token names.
- `app-shell`: one app that runs on iOS, Android and the web, with the checks every build passes.

### Modified Capabilities

None.

## Impact

- New `app/` folder with its own `package.json`; `.gitignore` gains `app/node_modules`, `app/dist` and `.expo`.
- New `.claude/settings.json` with hooks; they need `jq` and `app/node_modules` to be installed.
- Unistyles needs a development build on iOS and Android (no Expo Go). The web build has no such limit.
