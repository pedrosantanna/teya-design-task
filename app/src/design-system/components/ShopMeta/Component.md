# ShopMeta

The facts of a shop in a list, tile or page header: its status, the walk, the street, and whether it delivers or is new. Spec: Metadata lines in `docs/develop/content.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `state` | `'open'`, `'closesSoon'`, `'closed'` | required | The status word: Success, Warning or Foreground |
| `detail` | string | none | Secondary text after the word ("until 6pm", "opens 9am"), written with non-breaking spaces |
| `walk` | string | none | "2 min walk", with a footprints symbol |
| `street` | string | none | "Blythe Road", with a pin symbol; left out where room is short |
| `delivers` | boolean | none | "Delivers", with a scooter symbol, as a group after the street |
| `isNew` | boolean | none | "New", with a sparkles symbol, after Delivers |
| `size` | `'footnote'`, `'subheadline'` | `'footnote'` | Subheadline (semibold word) on the shop page header |
| `layout` | `'inline'`, `'stacked'` | `'inline'` | Stacked puts the status on its own line (the header); with a walk, a street, Delivers and New together, the walk and the street are one row and Delivers and New the next; inline wraps status and groups together (rows, tiles) |

## Rules

Facts are told apart by colour, weight, symbol and position, never by a floating dot. The status word and its time are one unit, and the walk, the street, Delivers and New are each one unit with their symbol. A line breaks only between units, on two lines at most. Inside `<Ground value="tile">` the secondary text takes `mutedForegroundOnTile` and the status word `successOnTile` or `warningOnTile` (800 steps in light, Foreground in dark, because Success and Warning are 4.4:1 on two tinted cards and Success 700 is 4.16:1 on Peach).

## Accessibility

One element, read as "Open, until 6pm, 2 min walk, Blythe Road, Delivers, New".
