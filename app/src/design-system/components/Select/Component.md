# Select

A dropdown, and the option list it opens. Written for the state debugger (`openspec/specs/state-debugger`); no screen in the shopper's app uses them yet, so they have no row on `docs/develop/design-system/components.md`.

## Select props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | Subheadline, muted foreground, on the left of the field |
| `options` | `{ value, label, detail? }[]` | required | |
| `value` | option value | required | Shown on the right in Subheadline at 600, one line |
| `onChange` | `(value) => void` | required | The list closes after a choice |

## OptionList props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `options` | `{ value, label, detail? }[]` | required | `detail` is a Caption 1 line under the label |
| `value` | option value or `undefined` | required | The chosen row: `color.chipSelected` fill, `color.onChipSelected` text and a tick |
| `onChange` | `(value) => void` | required | |
| `accessibilityLabel` | string | none | Names the group |

## Behaviour

- The field is `size.button.compact` high, `color.muted` fill, `radius.inner` corners, `space.3` sides. A tap opens the options under the field, in place; the chevron turns with `spring.snappy`.
- Options open in place instead of a popover or a native picker, so the control works the same on iOS, Android and the web and inside a scrolling panel.
- Each option row is at least `size.button.compact` high with `radius.inner` corners; pressed rows take `color.muted`.
- The field is read as a button with its value and expanded state; the options as a radio group.

## Examples

`Select.examples.tsx` renders a select and an option list on `/design-system`.

```tsx
<Select label="Order" options={orderOptions} value={order} onChange={(order) => set({ order })} />
<OptionList options={stepOptions} value={step} onChange={goTo} accessibilityLabel="Journey step" />
```
