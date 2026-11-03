# Sheet

The details sheet, where the shopper buys. Spec: Sheet on `docs/develop/design-system/components.md`. Also exports `SheetProvider`, the root host that `DesignSystemRoot` mounts once.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | boolean | required | |
| `onClose` | function | required | Called once the sheet has gone (drag down, Close, scrim, escape gesture) |
| `title` | string | required | In the header, between Close and Confirm (or the balancing space), one line |
| `titleVariant` | `'headline'`, `'displayName'` | `'headline'` | Headline (Switzer 600, 17), centred between Close and Confirm. `displayName`: the subject is a shop (the details sheet), so the bar has no title and the name is the first content, Gambetta 26, left-aligned |
| `children` | ReactNode | required | Scrolls; `space.6` padding, `gap.block` between blocks |
| `footer` | ReactNode | none | Pinned at the bottom above the safe area at every detent: Buy |
| `detents` | `('medium' \| 'large')[]` | both | Medium 50%, large 92% of the screen (`layout.sheet*Detent`, provisional) |
| `initialDetent` | detent | first | Open at large when the content needs it |
| `dismissible` | boolean | `true` | `false` while Buy is loading: no drag-to-close, no scrim or Close |
| `onConfirm` | function | none | Adds `ConfirmButton` at the top right (tinted checkmark on iOS and the web, "Done" on Android) |
| `confirmLabel` | string | `'Done'` | |
| `confirmDisabled` | boolean | `false` | |
| `origin` | string | none | A `ZoomOrigin` id: the sheet grows from that view and shrinks back into it on Close |

## Behaviour

- Built on Reanimated and Gesture Handler: the grabber and header drag the sheet on the UI thread; it snaps to the nearest detent with `spring.smooth`, using the release velocity; a downward flick from the lowest detent closes it.
- Presented through the root portal, so on the web it stays inside the phone frame.
- iOS and the web (iOS 26): at the medium detent the sheet floats inset by `space.2` in glass with every corner at `radius.sheet` and no scrim; toward the large detent it anchors to the edges, turns opaque, keeps only its top corners round, and the 40% scrim comes in.
- Android: anchored at every detent, opaque, 40% scrim.
- Close is the 44 glass ×; the footer sits over a scroll-edge fade, not a filled bar.
- Under Reduce Motion the sheet appears at its detent without sliding or zooming.

## Why not a library

`@gorhom/bottom-sheet` 5.2 was tried first: `present()` mounted nothing on the web build with React 19.3 and Gesture Handler 3, so the sheet is a small Reanimated component instead.

## Accessibility

Focus moves to the title on open; the scrim is a "Close" button; the escape gesture closes on iOS; `accessibilityViewIsModal` keeps VoiceOver inside.

## iOS and Android

iOS page sheet with a 36 × 4 grabber ↔ Material modal bottom sheet with a 32 × 4 drag handle.
