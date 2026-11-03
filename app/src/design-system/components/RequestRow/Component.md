# RequestRow

A request in Requests: thumbnail with the shops' logos, name and time, a preview with its speaker, one status label, an optional compact button and an unread count. Spec: Request row on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Passed to every handler |
| `name` | string | required | Headline, one line |
| `time` | string | required | Caption 1 |
| `preview` | string | required | With its speaker ("Snuffle: …"); Subheadline in Muted foreground, two lines |
| `status`, `tone` | string, `StatusTone` | required | `needsYou` puts it in Tint |
| `image` | string (uri) | none | 56 at `radius.inner`; the request placeholder without one |
| `shopLogos` | string[] | `[]` | Up to three, 24 each |
| `unread` | number | `0` | Count of unread answers |
| `actionLabel`, `onAction` | string, `(id) => void` | none | Only when the request needs the shopper: "Buy at Rossi's" |
| `onPress` | `(id) => void` | none | Opens the chat |
| `onClose` | `(id) => void` | none | Close |

## Behaviour

- Close is a trailing swipe on iOS (Gesture Handler pan on the UI thread, snaps with `spring.snappy` and the gesture's velocity) and a long-press on Android that reveals the same action.
- Memoised; all handlers take the id, so a `FlatList` can pass stable callbacks.

## Accessibility

One element: name, status, preview, time, unread. The button and Close are custom actions.
