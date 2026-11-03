# Switch

A labelled on/off row. Written for the state debugger (`openspec/specs/state-debugger`); no screen in the shopper's app uses it yet, so it has no row on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | Subheadline, foreground |
| `value` | boolean | required | |
| `onValueChange` | `(value) => void` | required | Called from a tap anywhere on the row |
| `detail` | string | none | Footnote, muted foreground, under the label; read as the hint |
| `disabled` | boolean | `false` | Row at `state.disabledContent` |

## Behaviour

- The control is the platform's switch (`react-native` `Switch`): an iOS switch on iOS, a Material switch on Android, the react-native-web switch on the web. Track off is `color.muted`, track on `color.primary`, thumb `color.card`.
- The row is at least `hit.min` high and the whole row toggles.
- Read as a switch with its checked state; the native control is hidden from the accessibility tree so the row is read once.

## Examples

`Switch.examples.tsx` renders on, off with a detail line, and disabled on `/design-system`.

```tsx
<Switch label="Location off" value={locationOff} onValueChange={(v) => set({ locationOff: v })} />
```
