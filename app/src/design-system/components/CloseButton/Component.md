# CloseButton

An × in a 30 circle. Spec: Close button on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `onPress` | function | none | |
| `overMedia` | boolean | `false` | Over the map or a photo: glass on iOS 26, blur before and on the web, a tonal surface on Android. Elsewhere: Muted fill |
| `accessibilityLabel` | string | `'Close'` | |

Hit area `hit.min` (44 iOS, 48 Android) through hit slop; press scale with `spring.press`.

## iOS and Android

Close in the top left of a sheet or presented page on both.

## Accessibility

Role button, label "Close".
