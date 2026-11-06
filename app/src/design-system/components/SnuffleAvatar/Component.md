# SnuffleAvatar

Snuffle's avatar on the chat's sender line: the mark glyph on a circle filled with `snuffle.avatar` (the bubble's colour in light, Lavender 600 in dark). Spec: Snuffle avatar on `docs/develop/design-system/components.md`. Used by `SnuffleSender`, so by `ChatBubble` and `TypingIndicator`.

## Props

None. The circle (`size.avatar.chat`, 24) is the dog's head: the face fills it and the ears and the awning run past its edge; the glyph is scaled from the circle (34 wide) and the box is as wide as the glyph, so `space.2` to the word "Snuffle" is measured from the ear. Decision 061 replaced the earlier glyph-inside-the-circle version.

## Contrast

Circle on the chat ground in dark: 4.26:1 (the bubble's Lavender 900 was 1.4:1, so the head disappeared). Glyph on the fill: Foreground 13.07:1 in light and 4.41:1 in dark. Ears past the circle sit on the chat ground: Foreground about 19:1 in dark.

## Accessibility

Decorative and hidden. The bubble's label names the sender.
