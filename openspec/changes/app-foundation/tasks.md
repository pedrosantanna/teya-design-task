# Tasks

## 1. App

- [x] 1.1 Create the Expo app in `app/` with the default router template on the current SDK and remove the template's demo screens; verify `npx expo export --platform web` succeeds
- [x] 1.2 Add Reanimated, Gesture Handler, expo-haptics, Unistyles 3 with Nitro Modules, react-native-svg and HugeIcons; verify `npm ls` resolves them
- [x] 1.3 Set the entry (`index.ts`) to register themes before Expo Router; verify the web build renders the home screen

## 2. Tokens and theme

- [x] 2.1 Write `primitives.tokens.json`, `semantic.tokens.json`, `modes/*.tokens.json` and `resolver.json` in DTCG 2025.10 from the design system pages; verify each value against the page
- [x] 2.2 Write `scripts/build-tokens.mjs` and `npm run tokens`; verify `theme.generated.ts` has iosLight, iosDark, androidLight and androidDark
- [x] 2.3 Register the themes with Unistyles (CSS variables off on web); verify switching theme at run time on the web build
- [ ] 2.4 Register Gambetta and Switzer with expo-font once the licence is checked; verify on an iOS dev build

## 3. Primitives

- [x] 3.1 Write `Text` with `Component.md` and examples; verify all type styles on `/design-system`
- [x] 3.2 Write `Button` with `Component.md` and examples; verify roles, sizes, loading and disabled on `/design-system` in all four themes
- [x] 3.3 Write `src/design-system/AGENTS.md` with the rules for agents

## 4. Checks

- [x] 4.1 ESLint flat config with the local rules and import bans; verify a probe file with raw values fails with each rule
- [x] 4.2 `npm run check` = lint + `tsc --noEmit` + token drift; verify it passes
- [x] 4.3 `.claude/settings.json` hooks (`hook-lint.sh` on Edit and Write, `hook-stop.sh` on Stop); verify both with a sample payload
- [ ] 4.4 Lighthouse on the web build and a frame-rate and start-time check on iOS (decision 038); verify the reports are saved

## 5. Content

- [x] 5.1 Write `src/content/images.ts` from the Unsplash manifest with credits; verify URLs match the manifest
- [ ] 5.2 Run the app on an iOS development build; verify the home screen and the theme switch on a simulator
