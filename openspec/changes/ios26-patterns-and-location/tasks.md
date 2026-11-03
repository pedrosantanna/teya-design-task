# Tasks

## 1. Tokens and materials

- [x] 1.1 Display title to 40/44 in `semantic.tokens.json`, `npm run tokens`; verify on `/design-system` and `npm run check`
- [x] 1.2 Glass material: CSS backdrop glass on the web, Liquid Glass or blur on iOS, solid under Reduce Transparency and on Android
- [x] 1.3 Scroll-edge fade for the top and bottom of a screen

## 2. Chrome

- [x] 2.1 `GlassButton` (Back chevron, Close ×, 44 pt glass circle; Android icon buttons) and `ConfirmButton` (tinted checkmark; "Done" tonal on Android), each with `Component.md` and examples
- [x] 2.2 NavBar: glass Back with "Back to …" accessibility label, actions in one glass capsule, no solid fill, scroll-edge fade, inline leading title
- [x] 2.3 Bottom accessory: ask bar and Requests button as floating glass that shrinks on scroll down and expands on scroll up
- [x] 2.4 Sheet: inset glass at the medium detent, opaque edge-anchored at large, Close and optional Confirm; Android bottom sheet unchanged in form

## 3. Transitions

- [x] 3.1 Zoom from a Nearby tile to the shop page and from the Requests button to Requests (native zoom on iOS, view transitions on the web, container transform on Android)
- [x] 3.2 Requests → chat push; payment → receipt fade; Keep looking as a modal sheet; web view transitions for each kind
- [x] 3.3 Overlay zooms: details sheet from the answer card, collection code from the code, location sheet from the area row
- [x] 3.4 Reduce Motion turns every transition into a crossfade

## 4. Location

- [x] 4.1 Store: `place`, `radius`, `places`, a second seed area (Kensington High St, W8), radius filter; debugger controls (web only)
- [x] 4.2 "Where are you shopping?" sheet from the area row: current location, saved places, address search with mock results, radius, Confirm; Nearby reloads
- [x] 4.3 Account sheet Places row → Places screen: list, add, rename, delete

## 5. Spacing and checks

- [x] 5.1 Vertical spacing pass on every screen (sections 32, heading → content 8, carousel → next heading 32, card insides 12/16, last item clears the bottom accessory by 48)
- [x] 5.2 `npm run check` passes and `npm run export:web` builds
- [ ] 5.3 Verify on the web build in four themes and on the iOS simulator (glass, transitions) — checked: web iOS dark, Android light, iOS simulator light; the iOS zoom's interactive drag-dismiss and the web view transitions' motion (pane hidden) not yet seen
