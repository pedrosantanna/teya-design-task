# Tasks

## 1. Components

- [x] 1.1 Order card with steps, status label and warning symbol; verify each state on `/design-system` in four themes and `npm run check`
- [x] 1.2 Payment sheet (iOS and Android forms), stepper, segmented control; verify on `/design-system`
- [x] 1.3 Collection code, toast and alert; verify on `/design-system`
- [x] 1.4 Haptics helper per `platforms.md`; verify on an iPhone or simulator log

## 2. Flow

- [x] 2.1 Buy from the details sheet through the payment sheet to "Waiting for the shop"; verify against v7 frames, Buy at full polish
- [x] 2.2 Shop confirms, sold, not confirmed and declined from the debugger; verify every ending says the money state
- [x] 2.3 Receipt, code full screen, Extend, Cancel for a refund with alert; verify against v7 frames
- [x] 2.4 Day-before reminder and Not collected from the clock; verify by moving the date in the debugger
- [x] 2.5 The shop delivers, and Jess's collect after work; verify both from the debugger
- [x] 2.6 Run the screen-reviewer agent on each screen; verify findings are fixed or recorded

## Implementation notes

- `PaymentSheet` (Apple Pay and Google Pay forms, drawn) and `Alert` are new design-system components; `OrderCard` takes four steps for delivery; `CollectionCode` gained a controlled full-screen view with the item line and the shop's note, and keeps the screen awake with `expo-keep-awake`.
- The shop's reply comes 6 s after payment on the simulation clock; the debugger chooses paid or declined, and confirms, sold or not confirmed. A till answer (Broadway Chemist) goes straight to Ready. Delivery steps follow every 5 s.
- The date (Mon 2 Nov, Sun 8 Nov, Tue 10 Nov) is set in the debugger; Tue 10 Nov turns a Ready order into "Not collected · refunded".
- 1.4: haptics go through the existing `haptic()` helper (skipped on web); not verified on a device. 2.6: the screen review of the web build was run and its findings fixed (full-screen code under the phone chrome, lock-screen clock and Android ongoing notification, details footnotes, map ground in dark).
