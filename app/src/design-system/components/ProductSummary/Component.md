# ProductSummary

"What they sell" on the shop page: category chips, the usual price range and its source, and "Asked about recently" with past answers. Change `shop-ratings-and-range`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `categories` | string[] | required | Suggestion chips; about five |
| `priceLine` | string | none | "Most items £2–£35 · from past answers", or "· from the shop's till" for a connected shop |
| `asked` | `{ item, detail }[]` | `[]` | `detail` from `pastAnswerLabel` ("Had it · 2 hours ago"); the heading and rows are left out when empty |
| `onCategory` | `(category) => void` | none | The screen opens New Request addressed to the shop with the chip's text |
| `shop` | string | none | The chip row's spoken label: "Ask Rossi's Bakery about" |

## Tokens

A `ListGroup shadow`: a `ListBlock` with the chips (`space.2` apart, wrapping), the price line in Footnote and the "Asked about recently" heading in Caption 1 Strong, Muted foreground; then one `ListRow` per past answer. The chips sit inside `<Ground value="card">`, so their fill is Muted on the Card.

## Accessibility

Each chip is a button read by its text inside a group labelled "Ask [shop] about"; the heading is a header; each past answer is one row.

## iOS and Android

Same on both; the rows follow `ListRow`.
