# Checkbox

A labelled checkbox row. Written for the state debugger (`openspec/specs/state-debugger`); no screen in the shopper's app uses it yet, so it has no row on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | Subheadline, foreground |
| `checked` | boolean | required | |
| `onChange` | `(checked) => void` | required | Called from a tap anywhere on the row |
| `detail` | string | none | Footnote, muted foreground, under the label; read as the hint |
| `disabled` | boolean | `false` | Row at `state.disabledContent` |

## Behaviour

- The box is `size.badge` square with a `space.1 × 1.5` corner. Unchecked: `color.card` fill, `color.mutedForeground` border. Checked: `color.primary` fill and border, a HugeIcons `Tick02Icon` in `color.onPrimary`.
- The row is at least `hit.min` high and the whole row toggles.
- Read as a checkbox with its checked state.

## Open points

- There is no token for control sizes or small corners yet; the box borrows `size.badge` and the corner is built from `space.1`. If a checkbox reaches the shopper's app, the author sets those values on the Components page first.

## Examples

`Checkbox.examples.tsx` renders checked, unchecked with a detail line, and disabled on `/design-system`.

```tsx
<Checkbox label="Keep looking for 1 more" checked={keepLookingForMore} onChange={(v) => set({ keepLookingForMore: v })} />
```
