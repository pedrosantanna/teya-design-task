# ChatBubble

A message in a request's chat, from the shopper or from Snuffle. Spec: Chat bubble on `docs/develop/design-system/components.md`; spacing from `spacing.md`. Also exports `SnuffleMark` (the mark from `mark.md`, drawn in theme colours, 28) and `chatGap()`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `sender` | `'shopper'`, `'snuffle'` | required | Shopper: Primary fill, right. Snuffle: Muted fill, left |
| `text` | string | required | Body; never truncates |
| `firstInGroup` | boolean | `true` | Snuffle: shows the mark and the sender line on the first bubble of a group |
| `day` | string | none | Added to the sender line when it isn't today ("Snuffle · Sun 8 Nov") |
| `gap` | `'none'`, `'sameSender'`, `'newSender'` | `'none'` | Space above: 12 within a sender, 24 at a change. `chatGap(previous, sender)` works it out |
| `status` | `'sending'`, `'sent'`, `'failed'` | `'sent'` | Failed shows a retry symbol and "Not sent · tap to retry" |
| `onRetry` | `(id) => void` | none | With `id` |
| `animateIn` | boolean | `false` | The shopper's new bubble appears with `spring.snappy` |

`radius.bubble`, `inset.bubble` (10 × 14), maximum width 78% of the content (`layout.bubbleMax`).

## Do and don't

- Do put suggestion chips right after the Snuffle bubble that proposes them.
- Don't render shop replies as bubbles: they are `AnswerCard`s.

## Accessibility

Each bubble is read with its sender ("Snuffle: I'm asking 6 shops…", "You: Collect"). The mark is hidden. A failed bubble is a button.

## iOS and Android

Same on both.
