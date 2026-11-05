# RequestRow

A request in Requests: thumbnail, name and time, Snuffle's latest status as the preview, one status label and an unread count. Spec: Request row on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Passed to every handler |
| `name` | string | required | Headline, one line |
| `time` | string | required | Caption 1 |
| `preview` | string | required | Snuffle's latest status, "Snuffle: …"; Subheadline in Muted foreground, one line, truncated |
| `status`, `tone` | string, `StatusTone` | required | `needsYou` puts it in Tint |
| `image` | string (uri) | none | 56 at `radius.inner`; the request placeholder without one |
| `unread` | number | `0` | Count of unread answers |
| `onPress` | `(id) => void` | none | Opens the chat |
| `onClose` | `(id) => void` | none | Close |

## Behaviour

- Close is a trailing swipe on iOS (Gesture Handler pan on the UI thread, snaps with `spring.snappy` and the gesture's velocity) and a long-press on Android that reveals the same action.
- Memoised; all handlers take the id, so a `FlatList` can pass stable callbacks.

## Accessibility

One element: name, status, preview, time, unread. Close is a custom action.
