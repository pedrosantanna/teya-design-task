# ShopRow

A shop in a list: its photo (40, `radius.inner`), else its logo or monogram (40, circle), then name and facts. Spec: Shop row on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | |
| `name` | string | required | Headline, one line |
| `facts` | ShopFacts | required | Status, walk and street as ShopMeta draws them, on two lines at most; the street is left out where the Category screen's filter shows it |
| `image` | PhotoSource (bundled id or uri) | none | The shop's photo, 40 pt at `radius.inner`, over the accent placeholder while it loads (the Category screen) |
| `logo` | string (uri) | none | Used when there is no `image`; the monogram on the accent fill without either |
| `position` | `'only'`, `'first'`, `'middle'`, `'last'` | `'only'` | Where the row sits in its list |
| `onPress` | `(id) => void` | none | |

## iOS and Android

iOS: an inset grouped list on Card, corners at `radius.card` on the first and last rows (a standalone grouped list, shape.md; `ListGroup corner="card"`), separators inset to the text, a chevron. Android: a Material list, no fill, no chevron.

Inside `<Ground value="tile" accent>` (the Category screen) the fill is that accent's `shop.accent.*.cardOnTile`: white Card in light, and in dark a tinted card at OKLCH L 0.44, C 0.03 in the accent's hue, lighter than the tile (decision 050). The facts and the chevron take `mutedForegroundOnTile` there (Stone 840 in dark, 4.74:1 or more).

## Accessibility

One element: name and facts.
