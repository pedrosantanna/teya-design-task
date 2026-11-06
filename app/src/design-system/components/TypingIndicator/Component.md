# TypingIndicator

Three dots in a Snuffle bubble, under the sender line (the bare glyph and "Snuffle") when it starts a group, shown when Snuffle's reply takes more than about 300 ms and replaced in place by the reply: the screen enters it with `ChatEntry` and it fades out on `spring.fade` as the reply rises in. Spec: Typing indicator on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `gap` | `ChatGap` | `'none'` | Space above, as in `ChatBubble` |

## Behaviour

Snuffle bubble (`snuffle.bubble`, Lavender), `radius.bubble`, `inset.bubble`; dots (8) in `snuffle.dot` pulse with `spring.fade`, staggered. With Reduce Motion the dots stay still at half opacity.

## Accessibility

Announced once, "Snuffle is writing"; the row has the same label.

## iOS and Android

Same on both.
