# Tags

The five small labels from `docs/develop/design-system/tags.md`: `Chip` (filter and suggestion), `StatusLabel`, `Badge` and `Count`, all exported from `Tag.tsx`. Words come from the state table in `conceptual-model.md`.

## Chip

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | One line; ellipsis when longer than the content width, read in full |
| `kind` | `'filter'`, `'suggestion'` | `'filter'` | Filter: single choice. Suggestion: a tap sends the text |
| `selected` | boolean | `false` | Filter only. Off: Card fill (`chat.fill` inside `<Ground value="chat">`). Selected: `chipSelected` (Indigo 100, Indigo 800 text in Subheadline 600); Android adds a leading check |
| `count` | number | none | Shown after "·" ("Needs you · 2") |
| `icon` | `IconSvgElement` | none | Leading symbol |
| `onPress` | `(value) => void` | none | Receives `value` or the label, so a list passes one stable handler |

32 high, `space.3` sides, `radius.full`, hit slop to `hit.min`. Press scales with `spring.press`; the fill moves between off and selected with `spring.snappy`; selection haptic on press-in.

## StatusLabel

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | Exactly as in the state table |
| `tone` | `'default'`, `'needsYou'`, `'warning'`, `'success'` | `'default'` | Needs you in Foreground, Caption 1 Strong; warning adds `Alert02Icon` in the warning colour (only "Not confirmed · not charged" and "Sold · not charged"); success adds `Tick02Icon` (Ready, Paid, Collected) |
| `icon` | `IconSvgElement` | none | Overrides the tone's icon, e.g. `FlashIcon` for "In stock now · till" |

Caption 1 in Muted foreground, no fill. One per card or row. The suffix after "·" may wrap to a second line at large text sizes before anything is cut.

## Badge

`badge`: `'promoted'` (Pistachio), `'new'` (Peach), `'delivers'` (Butter); optional `label`. Caption 2, 20 high, `space.2` sides, accent 100 fill with 800 text in both modes (photos don't change with the theme). `on="wash"`: Card fill and Foreground text, for the shop page header. At most two; Promoted always shows.

## Count

`value`: a number, capped at "9+", hidden at 0. 18 minimum diameter, `count` fill (Indigo 800 in both modes) with white text, in a 2 pt ring of the Background. Only for requests that need the shopper; read as part of its parent's label ("Requests, 1 needs you").

## Do and don't

- Don't give a status label a fill: it would compete with the price.
- Don't use colour alone: warnings carry the symbol.
- Don't put more than one status label on a card or row.

## iOS and Android

Custom chip on iOS (iOS has no chip) and the Material filter and suggestion chips on Android, with the checkmark on a selected filter chip.
