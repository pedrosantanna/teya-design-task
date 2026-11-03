# Snuffle prototype

One Expo app for iOS, Android and the web. The product brief is `openspec/project.md`; the behaviour is in `openspec/specs/`; the work is in `openspec/changes/`. Rules for agents writing UI are in `src/design-system/AGENTS.md`.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server (iOS and Android need a development build: Unistyles doesn't run in Expo Go) |
| `npm run web` | Dev server for the web build |
| `npx expo export --platform web` | Static web build in `dist/` |
| `npm run export:web` | Static web build in `dist/` that runs from any folder or iframe (used for `prototype/` in the docs) |
| `npm run tokens` | Regenerate `src/design-system/theme/theme.generated.ts` from `src/design-system/tokens/` |
| `npm run check` | ESLint, `tsc --noEmit` and the token drift check |
| `npm run fonts` | Download Gambetta and Switzer from Fontshare into `assets/fonts/` (gitignored; runs on `postinstall`) |

Typed routes are generated into `.expo/types` by `npx expo start`. On a fresh clone, start the dev server once before `npm run check`.

## Layout

- `src/app/`: screens (Expo Router).
- `src/design-system/`: tokens, generated theme, components (each with `Component.md` and examples on `/design-system`).
- `src/content/`: mock content; `images.ts` lists the Unsplash photos with credits.
- `src/store/`: the one mock store (Zustand), journey step presets from app flow v7, status labels and URL state.
- `src/debug/`: the state debugger. Web: `D` shows or hides it, `?debug=0` starts hidden, `?debug=1` open. Native: three-finger long-press.
- `src/device-frame/`: the iPhone or Pixel frame around the web build (`?frame=0`, `?frame=ios`, `?frame=android`).
- `scripts/`: the token build and the Claude Code hook scripts.
