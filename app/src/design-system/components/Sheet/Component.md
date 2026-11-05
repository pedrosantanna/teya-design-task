# Sheet

The details sheet, where the shopper buys. Spec: Sheet on `docs/develop/design-system/components.md`. Also exports `SheetProvider`, the root host that `DesignSystemRoot` mounts once.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | boolean | required | |
| `onClose` | function | required | Called once the sheet has gone (drag down, Close, scrim, escape gesture) |
| `title` | string | required | In the header, between Close and Confirm (or the balancing space), one line |
| `titleVariant` | `'headline'`, `'displayName'` | `'headline'` | Headline (Switzer 600, 17), centred between Close and Confirm. `displayName`: the subject is a shop (the details sheet), so the bar has no title and the name is the first content, Gambetta 26, left-aligned |
| `subtitle` | string | none | A line of context under a Headline title, in the header: Subheadline, Muted foreground, `space.1` under it ("Your visit to Paper & Co") |
| `children` | ReactNode | required | Scrolls; `margin.screen` at the sides (the header's Close and Confirm sit on the same line), `inset.sheet` at the bottom, `gap.block` between blocks |
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
- Every sheet has one ground, `color.sheet` (#DEDAD5 light, #191715 dark). Its content sits in `<Ground value="sheet">`, so rows and chips take Card in light and Muted in dark, and fields and the segmented track follow. Opening a sheet closes the keyboard of a field under it; Close closes the sheet's own.
- Every platform: an opaque Sheet fill and one scrim behind it, `color.sheetScrim` at `state.sheetScrim` (Foreground at 20% in light, black at 48% in dark), fading in with the sheet's height or zoom; a tap on it dismisses unless `dismissible` is false.
- iOS and the web (iOS 26): at the medium detent the sheet floats inset by `space.2` with the glass rim and every corner at `radius.sheet`; toward the large detent it anchors to the edges and keeps only its top corners round.
- Android: anchored at every detent.
- The header sits in `<Ground value="sheet">`: Close is the 44 glass × in light and a solid Muted circle in dark. Grouped lists inside take `radius.bubble`. The footer sits over a scroll-edge fade, not a filled bar.
- Under Reduce Motion the sheet appears at its detent without sliding or zooming.

## Why not a library

`@gorhom/bottom-sheet` 5.2 was tried first: `present()` mounted nothing on the web build with React 19.3 and Gesture Handler 3, so the sheet is a small Reanimated component instead.

## Accessibility

Focus moves to the title on open; the scrim is a "Close" button; the escape gesture closes on iOS; `accessibilityViewIsModal` keeps VoiceOver inside.

## iOS and Android

iOS page sheet with a 36 × 4 grabber in `color.grabber` at `state.grabber` (Muted foreground at 38% in light, Stone 445 in dark, quieter than the title) ↔ Material modal bottom sheet with a 32 × 4 drag handle.
