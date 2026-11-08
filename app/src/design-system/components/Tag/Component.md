# Tags

The five small labels from `docs/develop/design-system/tags.md`: `Chip` (filter, suggestion and menu), `StatusLabel`, `Badge` and `Count`, all exported from `Tag.tsx`. Words come from the state table in `conceptual-model.md`.

## Chip

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | One line; ellipsis when longer than the content width, read in full |
| `kind` | `'filter'`, `'suggestion'`, `'menu'` | `'filter'` | Filter: single choice. Suggestion: a tap sends the text. Menu: a value already set (New Request's place and deadline), drawn as an unselected chip with a trailing `ArrowDown01Icon` in Muted foreground; a tap opens its choices |
| `selected` | boolean | `false` | Filter only. Off sits a level below the selected chip. Light: on the Background or a sheet, that ground with a 1 pt `glassEdge` edge at `state.chipEdge`; the accent's `tonal` at `state.tonalOnTile` inside `<Ground value="tile">` (white at 55%); `tag.fillOnRow` inside `<Ground value="card">`, and the accent's `chipOnCard` inside a card on a tile (`tileCard`), no edge, no tile colour; `chat.fill` inside `<Ground value="chat">`. Dark has no edges: `tag.fill` on the Background and a chat, `tag.fillRaised` on a sheet and a Card section, `tag.fillOnRow` on a row elsewhere, the accent's `chipOnCard` on a card on a tile (the card a step lighter, round 18), the accent's `tonal` on a tile (the solid dark card, with light text: the chip's content is an `OnTileSurface`). Selected: light, Card fill, `chipOn` text in Subheadline 600 and a `size.edge.selected` edge in `chipOn` (1.5 pt Indigo 800); dark, `chipSelected` (`chipSelectedRaised` on a sheet or the shop page card, `chipSelectedOnTile` on a tile, Indigo 800 with white text as `primaryOnTile`, 8.75:1) with `onChipSelected` text in Subheadline 600 and no visible edge. Android adds a leading check, and in light the selected chip is Material's filled chip: `chipSelectedEdge` (Indigo 200) with `chipOn` text (6.24:1) and no outline |
| `count` | number | none | After the label, in Muted foreground (selected: `chipOn`), `space.1` apart: "Needs you 2", read as "Needs you, 2" |
| `icon` | `IconSvgElement` | none | Leading symbol |
| `onPress` | `(value) => void` | none | Receives `value` or the label, so a list passes one stable handler |

32 high, `space.3` sides, `radius.full`, hit slop to `hit.min`. Press scales with `spring.press`; the fill moves between off and selected with `spring.snappy`; selection haptic on press-in.

## StatusLabel

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | As in the state table. Its dot only separates the status from its detail and is never drawn |
| `tone` | `'default'`, `'needsYou'`, `'warning'`, `'success'`, `'quiet'` | `'default'` | quiet: Muted foreground, Caption 1 regular, for a no or a wait; needsYou: the status in a pill (`size.badge` high; Card in light, `tag.fill` or `tag.fillRaised` in dark), Foreground, Caption 1 Strong; warning adds `Alert02Icon` and the warning colour (only "Not confirmed, not charged" and "Sold, not charged"); success adds `Tick02Icon` and the success colour (Ready, Paid, Collected) |
| `icon` | `IconSvgElement` | none | Overrides the tone's icon, e.g. `FlashIcon` for "In stock now · till" |

The status in Caption 1 Strong (Foreground), the detail after it in Caption 1, Muted foreground, with its first letter capitalised ("Needs you", "Buy by Thu 5 Nov"). The two are units 8 pt apart and wrap between them, never inside one. One per card or row.

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
