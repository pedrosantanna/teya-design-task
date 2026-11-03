# ListRow

A row in a grouped list: the details sheet (item, quantity, the ways to get it), the receipt (where, paid) and Keep looking (where, until). Spec: the list rows in the v7 frames "Details", "Bought: the receipt" and "Keep looking"; selected state from `states.md`; list forms from `platforms.md`. The Components page has no row for it yet; it follows the Shop row's list rules.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | `''` | Passed to `onPress` |
| `title` | string | required | Body; Headline when `strong` or selected |
| `detail` | string | none | Footnote in Muted foreground, up to three lines ("Collect by Mon 9 Nov (7 days) · full refund if you don't") |
| `icon` | `IconSvgElement` | none | Leading HugeIcons icon at Body size |
| `value` | string | none | Trailing text; never truncates. `valueStrong` sets it in Headline |
| `trailing` | ReactNode | none | Trailing content in place of `value`, e.g. a `Stepper` |
| `children` | ReactNode | none | Fills the row in place of title, detail and value: a `Stepper`, which has its own label |
| `selected` | boolean | none | Makes the row one choice of a group: selected-chip fill, its text colour and a check. Selection haptic |
| `position` | `RowPosition` | `'only'` | Corners and separators of an iOS inset grouped list |
| `onPress` | `(id) => void` | none | Without it the row is static text |
| `surface` | `'card'`, `'background'` | `'card'` | The grouped fill. `background` is for rows that sit on a card (shop page); in dark it uses Muted, since Background is too close to Card there |

## iOS and Android

iOS: inset grouped list on Card, `radius.inner` on the first and last rows, separators inset to the text. Android: Material list item with no fill and no separators.

## Accessibility

One element: title, detail and value. A choice row is a radio with its checked state; a row with a stepper leaves the stepper as its own adjustable element.
