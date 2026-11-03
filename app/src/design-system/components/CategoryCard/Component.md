# CategoryCard

A kind of shop on Nearby, in "Browse by category"; a tap zooms into the Category screen. `CategoryHeader` is the top of that screen. Spec: [Components, Category card](../../../../../docs/develop/design-system/components.md) and [Colour, Shop accents](../../../../../docs/develop/design-system/colour.md).

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | The kind ("bakery"); also the still's `recyclingKey` |
| `label` | string | required | "Bakery", Subheadline 600 in Foreground |
| `accent` | ShopAccentName | required | The card fill is `shop.accent.<hue>.tile`, the tile step |
| `art` | CategoryId | `id` | The pipeline still to show when it differs from the kind (Toys shows the gifts still) |
| `still` | ImageSource | from the pipeline | Overrides the kind's still. By default the card takes `categoryIllustration(id, scheme).still` from the illustration pipeline: an opaque 120 square rendered on this card's tile colour. Without one the card is colour and label |
| `onPress` | `(id) => void` | none | Nearby opens the Category screen |

## CategoryHeader

`id`, `title` ("Bakeries"), `detail` ("3 places within 15 min walk"), `accent`, `art`. A `radius.card` card in the tile step: the title in Display title and the detail in Footnote at the left, the top 120 square of the still at the right.

## Performance

Fixed size (`size.category.width` × `height`, 120 × 164: the 120 art square, then the label), so a rail of cards never lays out again on scroll. The component is memoised. The still is drawn at exactly `size.category.art` (120) with `cachePolicy="memory-disk"` and `recyclingKey`, so a recycled cell never flashes the previous kind's image. No live 3D and no clips in the list: the pipeline's one-time entry clip is left out, since every card in the rail mounts at once.

## Accessibility

Role button, label is the kind. The still is decorative and hidden.
