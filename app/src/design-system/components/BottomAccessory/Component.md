# BottomAccessory

Nearby's ask bar: the round Requests button and the Ask capsule, floating in glass at the bottom of the screen. Spec: Ask bar and composer on `docs/develop/design-system/components.md` (change `craft-pass-2`).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `placeholder` | string | "Ask for anything nearby" | |
| `onAskPress` | function | required | Opens New Request (the screen morphs out of the capsule) |
| `requestsCount` | number | 0 | Count on the Requests button |
| `renderRequests` | function | none | Wraps the Requests button (a `ZoomSource` into Requests) |
| `onRequestsPress` | function | none | Used when `renderRequests` is not given |
| `margin` | number | required | Screen margin |

## Anatomy

- One row: the Requests circle (`size.field`, 48, glass, the icon in Foreground), `space.2`, the Ask capsule (flex × 48, `radius.full`).
- Inside the capsule: `size.askBar.leading` (16), the Snuffle glyph at `inline`, `size.askBar.gap` (10), the placeholder in Body in Muted foreground, the mic (`size.askBar.mic`, 20, Foreground, in a 44 box), `size.askBar.trailing` (14) to the icon.
- The count: `color.count` (Indigo 800 in both modes), at least 18 across, inside a 2 pt ring in the Background colour.

## Behaviour

- Never shrinks or hides, whatever the scroll. Pressing it is the screen's primary action.
- The capsule registers as the origin `ASK_ORIGIN` ("ask"): New Request's composer morphs out of it.
- No suggestion chips here; they open New Request.
- Sits in `Dock`: no fill, a scroll-edge fade under it. The last item on the screen clears it by `clearance.askBar`.

## Accessibility

Requests: "Requests, 1 needs you". The capsule: "Ask Snuffle" with the placeholder as the hint; the glyph and the mic are part of it.
