# Toast

Undo after No thanks or Close, and short confirmations that need no decision. Spec: Toast and snackbar on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | boolean | required | |
| `message` | string | required | One line ("Request closed") |
| `actionLabel`, `onAction` | string, function | none | At most one action ("Undo") |
| `onHide` | function | required | Called on timeout and after the action; the owner sets `visible` to false |
| `bottom` | number | above the ask bar | Safe-area bottom + 50 + `space.3` |
| `persistent` | boolean | `false` | Gallery only |

## Behaviour

Shown and hidden with `spring.snappy`; 4 seconds, 10 while a screen reader is on. The layer order in `states.md` puts toasts above sheets and alerts so Undo stays reachable: render it last on the screen, or inside a sheet's content when a sheet is open.

## iOS and Android

iOS: a custom banner in glass (blur before iOS 26), `radius.full`, Foreground text and a Tint action (iOS has no system toast) ↔ Material snackbar: inverse surface (Foreground), Background text, the action in the selected-chip colour. The palette has no inverse-surface role yet.

## Accessibility

Announced politely, with the action named; the action is a button.
