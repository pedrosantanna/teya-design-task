# Button

The app's one button. Roles and sizes follow the Button table on `docs/develop/design-system/components.md`; interaction states follow `states.md`; haptics follow `motion.md` and `platforms.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | string | required | Never truncates; wraps at accessibility sizes |
| `role` | `filled`, `tonal`, `plain`, `destructive`, `inverse`, `quiet` | `filled` | Filled: Primary fill, its label colour. Tonal: Muted fill, Foreground label (neutral). Plain: no fill, Tint label. Destructive: no fill, red label. Inverse and quiet are for a coloured ground (Getting started's Indigo pages): inverse is a Foreground capsule with a Background label (Continue), quiet a text button in Foreground (Skip) |
| `size` | `large`, `compact` | `large` | Large: 50 high, full content width, label in Headline. Compact: 36 high, `space.4` sides, label in Subheadline at 600, hit slop up to `hit.min` |
| `icon` | `IconSvgElement` | none | A HugeIcons icon, imported from its own path (`@hugeicons/core-free-icons/ArrowRight01Icon`). Size is the label's line height minus 4, stroke 2 |
| `loading` | boolean | `false` | Spinner replaces the label, width kept, reported busy. Used on Buy while the payment sheet returns |
| `disabled` | boolean | `false` | Content at 38%, container at 12%. Rare: say why next to it, or hide the control |
| `accessibilityLabel` | string | the label | Read the price out: "Buy, £29.98" |
| `onPress` | function | none | |

## Behaviour

- Press: scales to `state.pressedScale` (0.97) and lays the content colour over the fill at `state.pressedLayer` (10%) with `spring.press`; release with `spring.snappy`. Feedback starts at touch-down.
- A light impact haptic fires on press-in for the filled role only (native builds; none on web).
- Corners are `radius.full`, continuous on iOS.

## Rules

- At most one filled (Indigo) button per viewport: the commit action (Buy, Ask, send). On an answer card the Buy is filled only when it is the single offer; with two or more offers every Buy is tonal, so they read as peers. "Show me" is tonal, and a partial offer says "Buy 1 of 2". Indigo means the shopper acts; secondary actions are neutral.
- "Cancel for a refund" is destructive and confirms in an alert.
- Buttons in a row sit `space.2` apart.
- The red for `destructive` has no palette token yet: the theme uses iOS system red and the Material 3 error colour, marked provisional in `tokens/primitives.tokens.json`.

## Examples

`Button.examples.tsx` renders every role, both sizes, loading and disabled on the `/design-system` route.

```tsx
<Button label="Buy for £29.98" accessibilityLabel="Buy, £29.98" onPress={buy} />
<Button label="Keep looking" role="tonal" />
<Button label="Buy at Rossi's" size="compact" />
```
