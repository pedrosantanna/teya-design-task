# SnuffleMark

The Snuffle mark as the app shows it: the bare glyph from `docs/develop/design-system/img/mark-glyph.svg`. Spec: Mark on `docs/develop/design-system/mark.md` and "Snuffle mark" on `components.md`.

## Rule

The mark is a glyph on its own. It never sits on a tile, in a circle or as an avatar: no fill, border or shadow behind it. It is one colour that follows the theme, Foreground (dark on light backgrounds, light on dark); the awning's two low-contrast stripes are Muted foreground. This reverses decision 045's "mark on a Lavender tile". Only the app icon, which the system draws, keeps a tile.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `'inline'`, `'icon'`, `'large'`, `'splash'` | `'inline'` | The glyph's width: inline `size.icon.nav` (22, the chat's sender line), icon `size.avatar.shop` (40, notification and Live Activity), large `size.thumb.request` (56, sign in), splash `size.category.art` (120, the in-app splash, matching the native splash). Height is 84/114 of the width |

`snuffleMarkWidth(theme, size)` returns the width, for layouts that align to the glyph.

## Where it appears

- The chat's sender line: the inline glyph before "Snuffle", no avatar column beside the bubbles (`ChatBubble`, `TypingIndicator`).
- Notifications and the Live Activity, at `icon` (Android's small header icon at `inline`).
- The splash and sign in in first run.

## Accessibility

Decorative and hidden from screen readers; the sender line or the surrounding label names Snuffle.

## iOS and Android

Same on both.
