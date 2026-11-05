# ReviewCard

A buyer's note as a row of a grouped list: their words in quotation marks and "Collected · Oct 2026" under them. On the shop page (two, mirroring the overall split, in the "What buyers say" group) and the reviews list. Change `shop-ratings-and-range`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `text` | string | required | The buyer's note, at most 140 characters; the row adds the quotation marks |
| `up` | boolean | required | A thumbs-up note has no label; a thumbs-down note starts with "Wouldn't go back" and ThumbsDown |
| `month` | string | required | "Oct 2026" |
| `how` | `'Collected'`, `'Delivered'` | required | After the Success tick: only buyers who got the item can rate |
| `position` | `'first'`, `'middle'`, `'last'`, `'only'` | `'only'` | Corners on the first and last row, a separator inset to the text under every row but the last |

## Tokens

The grouped row of `ListRow`: Card fill, `space.4` leading inset, `space.3` above and below, `radius.inner` corners, a hairline `separator`. Lines `space.1` apart. Note in Body, provenance in Footnote, Muted foreground, with the tick in Success; the thumbs-down verdict in Footnote, Foreground. No inner tile: the row is the surface.

## Accessibility

One element: "Would go back. “Loaf was waiting…” Collected, October 2026". The verdict is spoken for both, though only the thumbs-down one is shown.

## iOS and Android

iOS: inset grouped row on Card. Android: no fill, as Material list items.
