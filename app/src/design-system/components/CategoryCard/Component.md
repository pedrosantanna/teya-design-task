# CategoryCard

A kind of shop on Nearby, in "Browse by category"; a tap zooms into the Category screen. `CategoryHeader` is the top of that screen. Spec: [Components, Category card](../../../../../docs/develop/design-system/components.md) and [Colour, Shop accents](../../../../../docs/develop/design-system/colour.md).

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | The kind ("bakery"); also the still's `recyclingKey` |
| `label` | string | required | "Bakery", Headline (17) in Foreground, one line: keep it short ("Toys", "Butchers") |
| `accent` | ShopAccentName | required | The card fill is `shop.accent.<hue>.tile`, the tile step |
| `art` | CategoryId | `id` | The pipeline still to show when it differs from the kind (Toys shows the gifts still) |
| `still` | ImageSource | from the pipeline | Overrides the kind's still. By default the card takes `categoryIllustration(id, scheme).still` from the illustration pipeline: a transparent 120 × 164 image shaded for this card's tile colour, drawn over the tile. Without one the card is colour and label |
| `onPress` | `(id) => void` | none | Nearby opens the Category screen |

## CategoryHeader

`id`, `title` ("Bakeries"), `detail` ("3 places within 15 min walk"), `art`. No fill, corners or side inset of its own: the Category screen is the tile step, so the header's title lines up with the chips and the list under it. The title in Display title and the detail in Footnote (`mutedForegroundOnTile`, as the rows' meta) at the left, `space.2` apart (a two-line title needs the air), `gap.aboveTitle` above (Back to title 32), `space.6` clear of the still's square so a long title wraps before it; the top 120 square of the still at the right. The text sets the header's height; text and still rest on its bottom edge, `gap.title` (16) above the chips, and the still's empty top may rise past the text into the screen's own colour.

## Performance

Fixed size (`size.category.width` × `height`, 120 × 164: the 120 art square, then the label), so a rail of cards never lays out again on scroll. The component is memoised. The still is drawn at exactly `size.category.art` (120) with `cachePolicy="memory-disk"` and `recyclingKey`, so a recycled cell never flashes the previous kind's image. No live 3D and no clips in the list: the pipeline's one-time entry clip is left out, since every card in the rail mounts at once.

## Accessibility

Role button, label is the kind. The still is decorative and hidden.
