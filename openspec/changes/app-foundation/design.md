# Design

## Context

Decision 038 makes the prototype an Expo app for iOS, Android and web. The design system pages give every value; decision 021 makes iOS the default look and Android the second. See proposal.md for why.

## Goals / Non-Goals

**Goals:**
- One source for every visual value, and a typed theme generated from it.
- Four themes switchable at run time, so the state debugger can flip platform and scheme on any screen.
- Checks that catch a raw value before review does.

**Non-Goals:**
- Custom fonts on iOS and Android (Gambetta and Switzer are not cleared for embedding yet; native falls back to the system font, web uses the CSS stack).
- Liquid Glass and blur materials; they come with the components that float (ask bar, sheets).
- A token pipeline tool such as Style Dictionary.

## Decisions

- **DTCG 2025.10 files plus a resolver.** `primitives.tokens.json` holds the ramps and raw scales; `semantic.tokens.json` holds what all themes share (space, gaps, insets, radius, sizes, type styles, state opacities); `modes/{light,dark,ios,android}.tokens.json` hold colour roles, screen margin, hit area, the destructive red and the springs. `resolver.json` lists the sources and the two modifiers (platform, scheme). Alternative: one file with per-mode values in `$extensions`; rejected because it isn't standard and hides which values change per mode.
- **Own build script.** `scripts/build-tokens.mjs` (about 200 lines, no dependencies) merges, resolves aliases, converts units (px to points, ms, typography line height to points) and writes four `as const` objects plus unions of token names (`ColorName`, `TypeStyleName`…). Springs come out ready for Reanimated: `duration` and `dampingRatio = 1 − bounce` on iOS; `stiffness` and `damping = 2 × ratio × √stiffness` on Android. `--check` regenerates to a temp file and compares, which is the drift check.
- **Unistyles 3, CSS variables off on web.** Unistyles re-renders only the styles that read the theme and works on web through its own CSS parser. With CSS variables on, theme values reach style functions as `var(--…)` strings and arithmetic on them breaks, so `CSSVars: false`. Fallback, unused: a typed theme in React context.
- **Primitives take names, not values.** `Text` takes `variant` and `color`; `Button` takes `role` and `size`. A component with a value prop would be the first place a raw value enters a screen.
- **Lint in three layers.** `eslint-plugin-react-native` (colour literals, inline styles), two local rules (raw numbers on spacing, size, radius and type properties; colour strings anywhere in `src/`), and `no-restricted-imports` for screens and for the HugeIcons package root (importing the root put every icon, 8.8 MB, in the web bundle).
- **Hooks call scripts in the app.** `app/scripts/hook-lint.sh` reads the edited path from the hook payload and exits 2 with the ESLint output; `app/scripts/hook-stop.sh` runs `npm run check`, exits 2 once, and exits 1 (shown to the user) if the agent is already continuing because of it, so it can't loop.
- **Reanimated with `.get()` and `.set()`.** The React Compiler is on in the template, and its lint rule rejects writing `.value`.

## Risks / Trade-offs

- [Typed routes live in `.expo/types`, which is ignored] → `tsc` can fail on a fresh clone until `npx expo start` has run once; noted in the app README.
- [The destructive red is not in the palette] → iOS system red and Material 3 error are used and marked provisional in the token file.
- [System font on native] → the recording on iPhone shows SF Pro until the fonts are registered.
- [Unistyles needs a development build] → the iOS recording uses a dev build, not Expo Go.

## Open Questions

- Whether the web build loads inside the docs artifact's iframe (decision 038); tested in the `state-debugger` change with the device frame.
