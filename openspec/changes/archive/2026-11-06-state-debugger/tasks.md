# Tasks

## 1. Store

- [x] 1.1 Add Zustand and `src/debug/store.ts` with persona, platform, scheme, step, request, answer and order states and content set; verify types with `npm run check`
- [x] 1.2 Write the journey step presets from app flow v7; verify each preset navigates to its screen on the web build
- [x] 1.3 Move the starter screen's theme switch into the store (platform and scheme call `UnistylesRuntime.setTheme`); verify all four themes from the store

## 2. Panel

- [x] 2.1 Write the debug controls (switch, select, checkbox) in `src/debug/controls/` with token values only; verify they render in all four themes
- [x] 2.2 Write the panel with the sections Persona, Look, Journey, States and Content; verify each control changes the screen under it
- [ ] 2.3 Add Reset and Copy link; verify Reset returns to Nearby and the copied link reproduces the state (shipped; the check was not recorded at archive time)

## 3. Hide and show

- [ ] 3.1 Three-finger long-press on the root view; verify on an iOS simulator (shipped; the check was not recorded at archive time)
- [x] 3.2 Keyboard shortcut and `?debug=0` on web, visibility kept in localStorage in try/catch; verify in a private window
- [x] 3.3 URL parameters for step, persona, platform and scheme; verify a shared link opens in that state

## 4. Device frame

- [x] 4.1 Write `DeviceFrame` for web (402 × 874, status bar, home indicator, scale to fit, `?frame=0`); verify in a 1440 × 900 and a 700-high window
- [ ] 4.2 Load the exported web build inside an iframe in the docs site preview; verify it renders and takes clicks (decision 038) (shipped; the check was not recorded at archive time)

## Implementation notes

- The store lives in `app/src/store/` (not `src/debug/store.ts`) because every screen reads it; the debugger's own state (hidden, open) is in `src/debug/visibility.ts`.
- The controls are design-system components (`Switch`, `Checkbox`, `Select` with `OptionList`, `FloatingButton`), each with `Component.md` and examples, so the panel passes the same lint as screens.
- Screens not built yet show on `/preview/[step]`, a stand-in that prints the store's values for the step; each later change points `hrefFor` in `src/store/journey.ts` at its real screen.
- The web shortcut is `D` (ignored while typing or with a modifier). The three-finger long-press is on native builds only.
- `npm run export:web` builds a web export that runs from any folder (placeholder base URL swapped at runtime by `scripts/relative-web.mjs`). Tested from `/docs/prototype/index.html` inside an iframe on a scratch page; not yet inside the docs site preview (4.2).
- Not verified yet: Copy link's clipboard write (2.3) and the long-press on an iOS simulator (3.1).
