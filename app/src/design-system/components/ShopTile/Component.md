# ShopTile

A shop on Nearby: a 4:3 photo with up to two badges, the name and its facts. Spec: Shop tile on `docs/develop/design-system/components.md`; sizes from `spacing.md`; placeholder from `imagery.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Passed to `onPress` |
| `name` | string | required | Headline, one line |
| `facts` | ShopFacts | required | Status and walk as ShopMeta draws them ("Open until 6pm", "2 min walk"); they wrap between units, on two lines at most |
| `image` | string (uri) | none | The shop's own photo; without one, the no-photo placeholder (tonal tile, initials, awning stripes; a proposal) |
| `badges` | `BadgeName[]` | `[]` | At most two shown; Promoted always first |
| `size` | `'large'`, `'medium'` | `'large'` | `tile.large` = 0.78 × content width, `tile.medium` = (content − 12) / 2.3 |
| `contentWidth` | number | frame width − margins | |
| `accent` | ShopAccentName | `butter` | The shop's accent: the tonal tile under the photo while it loads, and instead of it if it fails (colour.md, Shop accents) |
| `onPress` | `(id) => void` | none | |

`tileWidth(theme, contentWidth, size)` is exported for carousels and skeletons. A photo that fails to load falls back to the placeholder. Photo at `radius.bubble`; badges 8 from the corner; name and facts `space.1` apart.

## Do and don't

- Do keep one ratio per carousel and a gutter of `layout.gutter` (12).
- Don't use stock photos or item photos.

## Accessibility

One element: name, badges, facts ("Rossi's Bakery, promoted, Open, until 6pm, 2 min walk"). The photo has no label of its own.

## iOS and Android

Same layout on both.
