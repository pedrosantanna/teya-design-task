# SegmentedControl

"Once" and "Every week" on Keep looking. Spec: Segmented control on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `segments` | `{ value, label }[]` | required | |
| `value`, `onChange` | string, `(value) => void` | required | |
| `accessibilityLabel` | string | none | Names the group |

Full content width, `radius.full`, labels in Subheadline. Selection haptic on change.

## iOS and Android

iOS: a Card-coloured thumb sliding on a Muted track with `spring.snappy` ↔ Material single-select segmented button: outlined, the selected segment in the selected-chip fill with a check.

## Accessibility

A tab list; each segment is a tab read as "Once, 1 of 2" with its selected state.
