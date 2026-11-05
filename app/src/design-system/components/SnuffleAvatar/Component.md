# SnuffleAvatar

Snuffle's avatar on the chat's sender line: the mark glyph in a circle filled with `snuffle.bubble`. Spec: Snuffle avatar on `docs/develop/design-system/components.md`. Used by `SnuffleSender`, so by `ChatBubble` and `TypingIndicator`.

## Props

None. Circle `size.avatar.chat` (24), glyph `size.avatar.chatMark` (14 wide), `space.2` to the word "Snuffle" (set by the sender line).

## Contrast

Glyph on the fill: Foreground 13.07:1 in light and 13.36:1 in dark; the two Muted foreground stripes 5.04:1 and 6.06:1.

## Accessibility

Decorative and hidden. The bubble's label names the sender.
