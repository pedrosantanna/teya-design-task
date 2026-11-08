# CollectionCode

The code shown at the counter, on the receipt. Spec: Collection code on `docs/develop/design-system/components.md` and `typography.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `code` | string | required | "K7Q2" |
| `qrValue` | string | the code | What the QR encodes |
| `initiallyEnlarged` | boolean | `false` | |
| `enlarged`, `onEnlargedChange` | boolean, `(enlarged) => void` | none | Controlled form, so a journey step can open the code full screen |
| `detail` | string | none | Under the enlarged code: "2 × eclipse glasses · Paper & Co" |
| `note` | string | none | At the bottom of the enlarged view: "Paper & Co scans the code, or taps Collected on their side." |
| `until`, `untilDetail` | string | none | Right under the code, tight to it: "Collect by Mon 16 Nov" in Subheadline strong and "Full refund if you don't" in Footnote, Muted. The code and its date are one pair at the counter, so the receipt's header no longer carries the collect-by date while the code shows |

## Behaviour

- On the receipt: heading "Collection code, show at the counter", the code in Title 1 with its letters spaced, then `until` and `untilDetail` 4 pt under it, a QR (`react-native-qrcode-svg`) on a white surface in both modes at `radius.inner`, and "Tap to enlarge".
- Enlarged: full screen through the root portal (so it stays in the phone frame on the web), the code in the `code` type style (Switzer 600, 48, +0.12 em), a QR sized to the screen, Close. Screen brightness goes to full with `expo-brightness` on a phone and is restored on close; `expo-keep-awake` stops the screen dimming or locking while the code is shown.
- The code keeps one line at every text size; the QR shrinks first.

- The enlarged view zooms from the code on the receipt and back into it on Close (`spring.smooth`; a fade under Reduce Motion).

## Accessibility

The code is read character by character ("K, 7, Q, 2"); the QR is hidden; the enlarged view is modal with a Close button.

## iOS and Android

Same on both.
