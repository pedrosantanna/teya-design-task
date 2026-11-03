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

No bar fill on any platform (iOS 26 patterns): the controls float in their own glass (or tonal surface on Android) over a scroll-edge fade from Background, which starts `space.6` above the strip and reaches the bottom edge. The web adds a masked backdrop blur under the fade.

## Accessibility

A plain container; its children carry the labels.
