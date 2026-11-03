# OrderCard

An order in the chat: status label, shop and items, total, and while waiting up to three steps. Spec: Order card on `docs/develop/design-system/components.md`; labels from the state table in `conceptual-model.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Passed to `onOpen` |
| `status` | string | required | "Waiting for Paper & Co · not charged yet", "Ready · collect by Mon 9 Nov" |
| `tone` | `StatusTone` | `'default'` | `warning` for the "not charged" endings, `success` for Ready, Paid, Collected |
| `shop`, `items` | string | required | Subheadline, two lines at most |
| `total` | string | required | Headline, never truncates |
| `steps` | `OrderStep[]` | none | Up to three (four when the shop delivers: Waiting, Paid, On its way, Delivered): `done` (check on Primary), `current` (number on the selected-chip fill), `todo` |
| `note` | string | none | "Keep looking for 1 more", in Tint |
| `onOpen` | `(id) => void` | none | Opens the receipt |
| `animateIn` | boolean | `false` | Arrives with `spring.arrive` |

## Behaviour

- A status change fades the label in with `spring.status`, is announced politely and plays the success haptic (Ready, Paid) or the warning haptic (not-charged endings), never on "not charged yet".
- Card colour, `radius.card`, `inset.card`, `gap.block`; presses as a whole.

## Accessibility

One element: status, shop, items, total, then the current step ("step 2 of 3, Paper & Co sets them aside"). The status line is a polite live region on Android; iOS announces the change.

## iOS and Android

Same card on both.

## Type

Three sizes: Caption 1 for the status label and the step numbers, Footnote for the steps and the note, Headline for the shop and items and the total.
