# PaymentSheet

A drawn stand-in for the system payment sheet: Apple Pay on iOS, Google Pay on Android. Spec: Payment on `docs/develop/design-system/platforms.md` and the v7 frame "Apple Pay"; decision 038 lists it as a simulated surface, since the real sheets need a merchant account and don't run on the web build.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | boolean | required | |
| `merchant`, `items`, `total` | string | required | "Pay Paper & Co", "2 × eclipse glasses", "£29.98" |
| `cardName`, `cardNumber` | string | required | "Debit card", "•••• 4021" |
| `status` | `'ready'`, `'processing'`, `'done'` | `'ready'` | The owner moves it on after Confirm; the state debugger decides paid or declined |
| `onConfirm`, `onCancel` | function | required | Confirm plays the primary haptic |

## iOS and Android

iOS: a floating sheet with margins, the Apple mark, the card row with a chevron, "Pay Paper & Co" with the total, and "Confirm with side button" (a tap stands in for the double press). Android: a bottom sheet with the Google mark and a "Pay £29.98" button. Both dim the screen with the 40% scrim and come in with `spring.smooth`.

## Do and don't

- Don't add the app's own content to the sheet: the system draws it (platforms.md).
- Do keep Buy loading behind it until it resolves.

## Accessibility

Modal. The card and the total rows are one element each; Confirm reads "Confirm with side button" (iOS) or "Pay, £29.98" (Android).
