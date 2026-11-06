# PhotoPickerSheet

A sheet with a grid of photo choices, the current one selected. In the chat it opens from the round photo at the right of the bar and changes the request's photo. Composes `Sheet` at the `fit` detent on the sheet ground (`components.md`, Sheet).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | boolean | required | |
| `onClose` | function | required | Called once the sheet has gone |
| `title` | string | required | In the sheet's header |
| `subtitle` | string | none | What the photo is for (the request's name) |
| `photos` | `{ id, photo }[]` | required | The choices, six in the chat. `photo` is a bundled image or a URL |
| `selected` | string | required | The id of the current photo |
| `onSelect` | function | required | Receives the picked id; the screen closes the sheet |
| `columns` | number | 3 | Photos per row; every tile is square |

## Behaviour

Tiles are squares at `radius.inner` with a `size.edge.focus` ring in Primary and a check badge on the selected one; the ring is always laid out (transparent when off), so choosing moves nothing. A press scales the tile with `usePress` and fires the selection haptic.

## Accessibility

The grid is a radio group; each tile reads "Photo 2 of 6" and is checked when selected.

## iOS and Android

Same on both.
