# Dock

The strip at the bottom of Nearby, the Ask screen and the chat that holds the ask bar or the composer (and Nearby's suggestion chips). Spec: Ask bar and composer on `docs/develop/design-system/components.md`. Exports `Dock`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children` | node | required | Rows inside, `space.3` apart |
| `floating` | boolean | `true` | Absolute at the bottom of the screen, over the scroll content |
| `bottomInset` | number | safe-area bottom | The strip reaches the screen's bottom edge; its content stops `bottomInset + space.2` above it |
| `style` | style | none | |

## iOS and Android

iOS and the web: a blur (the floating material's fallback) with a hairline Separator on top, so what scrolls under it stays legible but out of the way. Android and Reduce Transparency: solid Background with the same hairline, so the ask bar's Card field still reads as a field.

## Accessibility

A plain container; its children carry the labels.
