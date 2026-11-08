# ReviewCard

A person's note as a row of a grouped list: their first name and the month on one line, then their words, three lines at most on the shop page. On the shop page (three, mirroring the overall split) and the reviews list. Change `shop-ratings-and-range`. Spec: Review card on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | required | First name only, never a surname or a photo; "You" for the shopper's own note |
| `text` | string | required | The note, at most 140 characters, without quotation marks |
| `up` | boolean | required | A thumbs-up note has no label; a thumbs-down note starts its line with ThumbsDown |
| `month` | string | required | "Oct 2026", trailing on the name's line |
| `lines` | number | none | Clamp the note ("3" on the shop page); the reviews list shows it whole |
| `position` | `'first'`, `'middle'`, `'last'`, `'only'` | `'only'` | Corners on the first and last row, a separator inset to the text under every row but the last |

## Tokens

The grouped row of `ListRow`: Card fill, `space.4` leading inset, `space.3` above and below, `radius.inner` corners, a hairline `separator`. Name in Subheadline semibold, month in Footnote, Muted foreground, at the trailing end of the same line; note in Body, `space.1` below. No avatar and no purchase type.

## Accessibility

One element: "Priya, October 2026. Would go back. Loaf was waiting…". The verdict is spoken for both, though only the thumbs-down one is shown.

## iOS and Android

iOS: inset grouped row on Card. Android: the same grouped row and fill (`cardOnTile` on a tile), as a Material 3 list item in a container (parity rule in platforms.md).
