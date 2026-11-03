# Skeleton

Loading shapes that copy what they stand for. Spec: Loading states on `docs/develop/design-system/states.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'tileLarge'`, `'tileMedium'`, `'row'`, `'card'` | required | Nearby tiles with two text lines; a request row (56 square, two lines, a short status); an order or answer card |
| `contentWidth` | number | frame width − margins | For tile widths |
| `immediate` | boolean | `false` | Gallery only; normally it appears after 300 ms |

Muted shapes; fade in with `spring.fade` after about 300 ms, then a slow pulse (`spring.status`), still with Reduce Motion. The screen swaps it for content with `spring.fade`.

## Do and don't

- Do show at most three request rows.
- Don't use skeleton bubbles in the chat: show the `TypingIndicator`.

## Accessibility

One element, "Loading", role progress bar.
