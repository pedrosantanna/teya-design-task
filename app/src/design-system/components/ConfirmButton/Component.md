# ConfirmButton

Confirm at the top right of a sheet that commits a choice (the location sheet, a place's name). Spec: Sheet on `docs/develop/design-system/components.md` (iOS 26 patterns, change `ios26-patterns-and-location`).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `onPress` | function | none | Without it the button is disabled |
| `label` | string | `'Done'` | The accessibility label on iOS; the button's text on Android |
| `disabled` | boolean | `false` | Disabled content opacity |

## iOS and Android

iOS and the web: a checkmark in a 44 pt circle tinted with Tint (Indigo); Liquid Glass tinted on iOS 26. Android: "Done" as a compact tonal button.

## Accessibility

Role button, label "Done" unless a sheet names its action.
