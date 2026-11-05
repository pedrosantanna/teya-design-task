# ShopMeta

The facts of a shop in a list, tile or page header: its status, the walk and the street. Spec: Metadata lines in `docs/develop/content.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `state` | `'open'`, `'closesSoon'`, `'closed'` | required | The status word: Success, Warning or Foreground |
| `detail` | string | none | Secondary text after the word ("until 6pm", "opens 9am"), written with non-breaking spaces |
| `walk` | string | none | "2 min walk", with a footprints symbol |
| `street` | string | none | "Blythe Road", with a pin symbol; left out where room is short |
| `size` | `'footnote'`, `'subheadline'` | `'footnote'` | Subheadline (semibold word) on the shop page header |
| `layout` | `'inline'`, `'stacked'` | `'inline'` | Stacked puts the status on its own line (the header); inline wraps status and groups together (rows, tiles) |

## Rules

Facts are told apart by colour, weight, symbol and position, never by a floating dot. The status word and its time are one unit, and the walk and the street are each one unit with their symbol. A line breaks only between units, on two lines at most. Inside `<Ground value="tile">` the secondary text takes `mutedForegroundOnTile`, and in dark the status word takes Foreground, because Success and Warning are 4.4:1 on two tinted cards.

## Accessibility

One element, read as "Open, until 6pm, 2 min walk, Blythe Road".
