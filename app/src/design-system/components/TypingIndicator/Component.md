# TypingIndicator

Three dots in a Snuffle bubble with the mark, shown when Snuffle's reply takes more than about 300 ms and replaced in place by the reply. Spec: Typing indicator on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `gap` | `ChatGap` | `'none'` | Space above, as in `ChatBubble` |

## Behaviour

Muted bubble, `radius.bubble`, `inset.bubble`; dots (8) in Muted foreground pulse with `spring.fade`, staggered. With Reduce Motion the dots stay still at half opacity.

## Accessibility

Announced once, "Snuffle is writing"; the row has the same label.

## iOS and Android

Same on both.
