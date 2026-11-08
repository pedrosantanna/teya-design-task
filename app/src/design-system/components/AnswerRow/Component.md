# AnswerRow

An answer on the asking list, while Snuffle asks shops: shop, street and the answer's status with a symbol. Spec: "Rows while asking" in `docs/develop/design-system/conceptual-model.md` (an answer's compact form) and the v7 frame "Asking shops". The Components page has no row for it yet.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `shop` | string | required | Subheadline at 600, one line |
| `street` | string | required | Footnote, one line |
| `status` | string | required | The answer's label in the row form: "Asked", "Seen", "Has them", "In stock now · 1 of 2", "Doesn't have them", "No reply" |
| `kind` | `'asked'`, `'seen'`, `'yes'`, `'till'`, `'no'` | required | Picks the symbol: clock, eye, tick, flash (till), cross. Yes and till are in the success colour |
| `position` | `RowPosition` | `'only'` | Corners and separators of an iOS inset grouped list |

## Behaviour

- A status change fades the label through with `spring.status` and is announced politely.
- Not pressable: the shopper acts on the answer cards in the chat.

## Accessibility

One element: shop, street, status.

## iOS and Android

iOS: inset grouped list on Card. Android: a Material 3 list item in the same container and fill (parity rule in platforms.md).

The grouped list (the asking list in the chat) has `radius.card` corners, like the answer and order cards around it.
