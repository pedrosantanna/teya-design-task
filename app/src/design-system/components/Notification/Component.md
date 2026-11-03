# Notification

A notification from Snuffle as the system draws it. `Notification` is the card alone (the lock screen); `NotificationBanner` drops it in from the top while the shopper is elsewhere in the app. Spec: Notification and Live Activity on `docs/develop/design-system/components.md`; simulated surfaces in decision 038 and `platforms.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | required | The request name: "Eclipse glasses" |
| `body` | string | required | Snuffle's line: "Paper & Co on King Street has them too: £14.99 a pair." Two lines at most |
| `time` | string | `'now'` | |
| `onPress` | function | none | Opens the request's chat |
| `visible`, `onHide` | boolean, function | required (banner) | The banner hides after 5 seconds or on tap |

## iOS and Android

iOS: a glass card (blur before iOS 26 and on the web) with the app icon, the title and the time on one line, the body under it. Android: a heads-up notification on the tonal surface, "Snuffle · now" in Caption 1, then the title and body. The banner slides down with `spring.smooth`.

## Rules

- Status words from the state table; no marketing notifications.
- The same banner on iOS, Android and the web build, since none of them can show a real one from the prototype.

## Accessibility

A button: "Snuffle, Eclipse glasses, Paper & Co on King Street has them too: £14.99 a pair."
