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

iOS: the system pattern, a `color.segmented.thumb` thumb under the delicate card shadow sliding on a `color.segmented.track` track with `spring.snappy` (light: Card on Border, 1.53:1; dark: Stone 360 on Card), no edge, `size.segmented.inset` (2) between track and thumb; 32 pt segments with 6 pt of hit slop above and below, so each reaches 44; the selected label in Foreground, Subheadline 600 ↔ Material single-select segmented button: outlined, the selected segment in the selected-chip fill with a check.

## Accessibility

A tab list; each segment is a tab read as "Once, 1 of 2" with its selected state.
