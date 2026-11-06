# Design

## Context

See proposal.md. The app runs on iOS (the recording), Android and the web build inside the docs site. Each pattern has to render the same on the three, with Android taking its Material form where the platforms differ (decision 021).

## Goals / Non-Goals

**Goals:**
- iOS 26 chrome and transitions on the iPhone build, with the same shapes on the web.
- One implementation per pattern in the design system; screens only pass props.
- Every animation on the UI thread (Reanimated), with a crossfade under Reduce Motion.

**Non-Goals:**
- Real geolocation or geocoding. "Current location" is the seed area; address search filters a fixed list.
- Persisting places across launches. They live in the store for the session.

## Decisions

- **Zoom into a shop page and into Requests.** On iOS 18+ the native zoom (`Link.AppleZoom` in Expo Router) gives the system's interactive dismiss for free, so the iPhone build uses it. The web uses the View Transitions API (`document.startViewTransition` with a `view-transition-name` on the source and on the target screen) where the browser has it, else no animation. Android gets a container-transform feel: the native stack fades and the screen's content grows from the source's measured rectangle with Reanimated; the system back gesture dismisses.
- **Other screen changes.** Requests → chat is the native stack's push (a slide view transition on the web). Payment → receipt uses the stack's fade. Keep looking is presented as a modal sheet. On the web the same kinds run as view transitions keyed on the document element.
- **Overlays that zoom.** The location sheet (from the area row), the details sheet (from the answer card) and the enlarged collection code (from the code) measure their source with `measureInWindow` and animate scale and translation from it. These are overlays in the root portal, so they run the same on every platform.
- **Glass on the web** is a `backdrop-filter: blur(24px) saturate(180%)` over a translucent fill, an inset 1 px highlight and a soft shadow. Native iOS uses `expo-glass-effect` when Liquid Glass is available, `expo-blur` otherwise. Reduce Transparency and Android use a solid surface.
- **Scroll-edge fade.** A gradient from the screen's background to transparent, drawn with `react-native-svg` (already installed) under the floating controls at the top and bottom, plus a masked backdrop blur on the web.
- **Bottom accessory.** The scroll handler records direction in a shared value; the accessory's width, height and the suggestion chips' opacity follow it with `spring.smooth`.
- **Location data.** The store holds `place` (a saved place's id or `current`), `radius` (10, 15 or 20) and `places`. Each place points at a seed area; an area has its name, streets and shops. Nearby filters the area's shops by the radius. Shop lookups fall back to every seed shop so a request started in one area still finds its shops after the area changes.

## Risks / Trade-offs

- [`Link.AppleZoom` is alpha] → it is tried first on iOS; the custom zoom path stays available behind one flag if it misbehaves.
- [View Transitions are not in every browser] → the web falls back to an instant change, which is the current behaviour.
- [Glass on dense content can lose contrast] → sheets turn opaque at the large detent, and Reduce Transparency gives a solid surface everywhere.
