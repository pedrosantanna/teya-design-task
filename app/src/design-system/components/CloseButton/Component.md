# CloseButton

An × in a 44 glass circle. Spec: Close button on `docs/develop/design-system/components.md`, iOS 26 form from change `ios26-patterns-and-location`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `onPress` | function | none | |
| `overMedia` | boolean | `false` | Android only: a tonal circle behind the × over the map or a photo |
| `accessibilityLabel` | string | `'Close'` | |

Built on `GlassButton`: glass on iOS 26, a blur before, CSS glass on the web, a solid surface under Reduce Transparency. Press scale with `spring.press`.

## iOS and Android

Close in the top left of a sheet or presented page on both. Android: a standard icon button.

## Accessibility

Role button, label "Close".
