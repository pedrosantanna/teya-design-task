# Stepper

Quantity in the details sheet. Spec: Stepper on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value`, `onChange` | number, `(n) => void` | required | |
| `min` | number | `1` | Minus disabled at `min` |
| `max` | number | none | The shop's stock ("Has 1 of 2" caps it at 1); plus disabled at `max` |
| `label` | string | `'Quantity'` | |

Buttons 36 (reaching `hit.min`), Muted fill, Tint symbol; value in Headline; `space.3` between the parts. Each step plays the selection haptic; the screen updates Buy's total.

## iOS and Android

iOS stepper style (minus and plus in one Muted capsule beside the value) ↔ two Material icon buttons around the value.

## Accessibility

One adjustable element, "Quantity, 2"; swipe up and down (increment and decrement actions) to change it.
