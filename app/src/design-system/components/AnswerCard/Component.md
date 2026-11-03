# AnswerCard

A shop's answer in the chat: shop, status with its source, price, walk time and collect-by date, and at most one action row. Spec: Answer card on `docs/develop/design-system/components.md`; words from `conceptual-model.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Passed back to every handler, so list items need no inline closures |
| `shop` | string | required | Headline, one line |
| `status` | string | required | "Has them", "In stock now · 1 of 2" |
| `source` | string | none | "replied 2 min ago", "till"; the source drops before the status when space runs out |
| `statusIcon` | `IconSvgElement` | none | `FlashIcon` for till answers |
| `price` | string | required | Title 3, never truncates |
| `walk`, `collectBy` | string | required | Footnote, with Navigation and Calendar icons |
| `image` | string (uri) | none | The answering shop's photo, 40 at `radius.inner`; never an item photo |
| `action` | `'buy'`, `'showMe'`, `'none'` | `'buy'` | Buy (or `buyLabel`, e.g. "Buy 1"), or Show me with No thanks |
| `best` | boolean | `false` | Only the best answer's Buy is filled; the others are tonal |
| `onOpen`, `onBuy`, `onShowMe`, `onDismiss` | `(id) => void` | none | A tap anywhere on the card opens the details sheet, as Buy does |
| `animateIn` | boolean | `false` | Arrives with `spring.arrive` (a fade with Reduce Motion) |
| `accessibilityLabel` | string | built from the text | Override with the long form ("13 minute walk, collect by Monday 9 November") |

## Do and don't

- Do keep one filled Buy on screen: pass `best` to one card only.
- Don't add a second action row; the details sheet holds the rest.
- After Buy the card is replaced by an `OrderCard`; after No thanks show the undo `Toast`.

## Accessibility

One element (role button on native). Its label is shop, status, price, walk and date. Activating it opens the details sheet; Buy, Show me and No thanks are custom actions (VoiceOver rotor, TalkBack actions menu). The inner buttons are hidden from the screen reader so the swipe order stays short.

## iOS and Android

Same card on both; the Buy button follows `Button`.

## Type

Three sizes: Headline for the shop and the price, Footnote for the status line and the walk and collect-by line, and the button's label. The status line wraps to two lines before it truncates; for something similar it reads "Has something similar · [item] · replied [when]" under the shop's name.
