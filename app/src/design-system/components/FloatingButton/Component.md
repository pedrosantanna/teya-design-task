# FloatingButton

A round icon button that floats over content. Written for the state debugger's toggle (`openspec/specs/state-debugger`); no screen in the shopper's app uses it yet, so it has no row on `docs/develop/design-system/components.md`. The round Requests button beside the ask bar is a different component, specified on the Components page.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon` | `IconSvgElement` | required | A HugeIcons icon from its own path, at Title 3's line height, stroke 1.75 |
| `accessibilityLabel` | string | required | The button has no visible label |
| `onPress` | function | required | |
| `selected` | boolean | `false` | `color.chipSelected` fill and `color.onChipSelected` icon while what it opens is open; read as expanded |

## Behaviour

- `size.button.large` round, `color.card` fill, a shadow in `color.scrim`.
- Press scales to `state.pressedScale` with `spring.press`; release with `spring.snappy`. No haptic: it is a prototype tool.

## Examples

`FloatingButton.examples.tsx` renders closed and open on `/design-system`.

```tsx
<FloatingButton icon={SlidersHorizontalIcon} accessibilityLabel="State debugger" selected={open} onPress={toggle} />
```
