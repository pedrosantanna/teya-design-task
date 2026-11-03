# Design system: rules for agents

These rules apply to everything under `app/`. The lint rules and the Claude Code hooks enforce most of them; the rest are checked in review.

## Build screens from the design system

- Screens (`src/app/**`) import UI only from `@/design-system`. They never import `Text`, `Pressable`, `StyleSheet` or touchables from `react-native`; layout `View`, `ScrollView` and lists are fine.
- Before using a component, read its `Component.md` next to the source. It names the spec page in `docs/develop/design-system/` the component follows.
- If a screen needs something the design system doesn't have, add a component here first (with its `Component.md` and examples), not a one-off in the screen.

## Values come from the theme

- Every colour, space, radius, size, type style, opacity and spring comes from the theme (`useUnistyles().theme` or `StyleSheet.create((theme) => …)` from `react-native-unistyles`).
- No colour strings (`#…`, `rgb(…)`), no inline style objects with literal values, no numbers for margin, padding, gap, font size, line height, letter spacing, radius, width or height. `0` is allowed.
- Component props take token names (`variant="headline"`, `color="mutedForeground"`, `role="tonal"`), never raw values.
- Icons are HugeIcons, imported one by one: `import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon'`. The package root pulls every icon into the web bundle and is banned.

## Shared internals

- `src/design-system/internal/` holds what components share and screens don't import: `usePress` (press scale and state layer), `haptic()` (also exported), `FloatingSurface` (glass, blur or a solid surface), `PressableCard` (one accessible element with custom actions), `Portal` (overlays in the root host, inside the phone frame on the web) and `ShopPlaceholder`.
- Third-party views don't get Unistyles styles on the web. Wrap them with `withUnistyles` (`internal/media.ts`), or pass plain objects built from `theme`. Give `expo-image` the plain `IMAGE_FILL` inside a themed, clipped `View`.
- Overlays (sheets, the enlarged collection code) go through `Portal`, never React Native's `Modal`, so they stay inside the device frame.

## Fonts

- Gambetta and Switzer come from Fontshare under the ITF Free Font License, which allows embedding them in the app and the website but not redistributing the files from a public repository. The `.ttf` files in `assets/fonts/` are gitignored; `npm run fonts` (also run on `postinstall`) downloads them from Fontshare.
- `DesignSystemRoot` loads them with `expo-font` (one family per typeface, faces by weight) and waits for them on native; the web swaps them in.

## Tokens

- The source is `src/design-system/tokens/*.tokens.json` (DTCG 2025.10) and `tokens/resolver.json`, which combines them into four themes: iOS and Android, each light and dark.
- `src/design-system/theme/theme.generated.ts` is generated. Never edit it. Change the token files, then run `npm run tokens`.
- Values on the token files are copied from the docs pages (Colour, Spacing, Shape, Motion, Typography, Components). If a value changes, change the docs page first; the author decides design values.

## Each component

- Lives in `src/design-system/components/<Name>/` with `<Name>.tsx`, `Component.md` and `<Name>.examples.tsx`.
- Has one example per variant, role, size and state in its examples file, and the examples appear on the `/design-system` route.
- Works in all four themes, with VoiceOver and TalkBack labels as in the Components page, and with text scaled up.
- Uses Reanimated shared values with `.get()` and `.set()` (the React Compiler is on) and the `spring.*` tokens for motion.

## Before you finish

Run `npm run check` in `app/`: ESLint, `tsc --noEmit` and a token drift check. The Stop hook runs it too and sends failures back.
