# ZoomSource and ZoomTarget

The zoom between a tapped element and the screen it opens: a Nearby tile into the shop page, the Requests button into Requests. Change `ios26-patterns-and-location`; Motion on `docs/develop/design-system/motion.md`.

## Props

`ZoomSource`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Unique on screen: `tile:rossis`, `requests` |
| `href` | Expo Router href | required | The screen it opens |
| `children` | `(open) => node` | required | Render the source and call `open` from its press handler |
| `style` | style | none | Layout only |

`ZoomTarget` wraps the opened screen's content. `navigateWith(kind, navigate, sourceId?)` runs any other navigation with a transition (`push`, `pop`, `sheet`, `unsheet`, `fade`, `unzoom`).

## Per platform

- iOS 18+: the system zoom through Expo Router's `Link.AppleZoom` (alpha), with the drag-to-dismiss back into the source. `NATIVE_APPLE_ZOOM` turns it off to fall back to the custom zoom.
- Web: the View Transitions API morphs the source into the screen (`view-transition-name: snuffle-zoom`); other kinds slide or fade the app's screen area. Browsers without the API change screens at once.
- Android: the stack fades and `ZoomTarget` grows the screen from the source's rectangle with `spring.smooth`; the system back gesture dismisses.
- Reduce Motion: a crossfade everywhere.

## Accessibility

No role of its own; the source keeps its own role and label.
