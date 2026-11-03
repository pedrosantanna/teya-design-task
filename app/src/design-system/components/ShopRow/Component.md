# ShopRow

A shop in a list: logo or monogram (40, circle), name and meta. Spec: Shop row on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | |
| `name` | string | required | Headline, one line |
| `meta` | string | required | Footnote, up to two lines; it wraps before anything is cut |
| `logo` | string (uri) | none | Monogram on the accent fill without one |
| `position` | `'only'`, `'first'`, `'middle'`, `'last'` | `'only'` | Where the row sits in its list |
| `onPress` | `(id) => void` | none | |

## iOS and Android

iOS: an inset grouped list on Card, corners at `radius.inner` on the first and last rows, separators inset to the text, a chevron. Android: a Material list, no fill, no chevron.

## Accessibility

One element: name and meta.
