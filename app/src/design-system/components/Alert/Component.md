# Alert

A system alert, drawn through the root portal so it stays inside the phone frame on the web. Used for "Cancel for a refund" and the simulated notifications permission prompt. Spec: Alert on `docs/develop/design-system/platforms.md`; layer order on `states.md` (alerts above sheets, toasts above alerts).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | boolean | required | |
| `title` | string | required | |
| `message` | string | none | What happens and where the money goes |
| `actions` | `{ label, style?, onPress }[]` | required | One or two; `style` is `default`, `cancel` or `destructive` (red, warning haptic) |
| `onDismiss` | function | none | Android only: a tap outside closes a Material dialog |

## iOS and Android

iOS: a centred alert, title in Headline, message in Footnote, actions side by side under a hairline, the cancel action in Headline and the destructive one in red. Android: a Material dialog at `radius.card`, title in Title 3, message in Subheadline, text buttons at the end.

## Accessibility

Modal, role alert; the title is a header and each action a button.
