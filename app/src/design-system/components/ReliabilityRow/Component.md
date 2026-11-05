# ReliabilityRow

One line of "How they do on Snuffle" on the shop page. Change `shop-ratings-and-range`; words from `store/ratings.ts`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `kind` | `'answers'`, `'speed'`, `'till'`, `'stock'`, `'new'` | required | Picks the leading symbol: MessageDone, Clock, Flash, CheckmarkBadge, Sparkles |
| `title` | string | required | "Answers 9 in 10 requests", "Usually replies in 6 min", "Stock from the till", "Had it 24 of 25 times when they said yes", "New on Snuffle" |
| `detail` | string | none | Footnote: "46 of 51 so far" |
| `accessibilityLabel` | string | required | Units in words: "Usually replies in 6 minutes" |
| `position` | `RowPosition` | `'only'` | In a `ListGroup shadow` |

## Rules

- Ratios are rounded down ("9 in 10" for 46 of 51); "every" only when the shop answered all of them.
- The stock line shows only after 10 "has it" answers; before that the row is `new`, "New on Snuffle".
- No colour carries meaning: the symbols are Muted foreground, like every grouped row.

## Accessibility

One element per row, read from `accessibilityLabel`.

## iOS and Android

A `ListRow`: inset grouped on Card on iOS, a Material list item on Android.
