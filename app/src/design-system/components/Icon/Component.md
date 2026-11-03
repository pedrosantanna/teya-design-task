# Icon

A HugeIcons icon (free Stroke Rounded set) drawn with `@hugeicons/react-native`. Follows `docs/develop/design-system/imagery.md` (sizes, stroke, icon map) and `platforms.md` (platform forms).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon` | `IconSvgElement` or `'share' \| 'back' \| 'more' \| 'send' \| 'chevron'` | required | Import each icon from its own path (`@hugeicons/core-free-icons/Clock01Icon`); the package root is banned. A name picks the platform form |
| `size` | `'nav'`, `'bar'` or a type style name | `'nav'` | `nav` 22, `bar` 24, a type style: that style's line height minus 4 (inline beside text) |
| `weight` | `'regular'`, `'strong'` | from the text | Stroke 1.5 beside Switzer 400/500, 2 beside 600. Inline icons follow their type style's weight |
| `color` | colour role | `foreground` | Takes the colour of its text; status icons use `warning` or `success` |
| `accessibilityLabel` | string | none | Only for an icon that acts alone. Without it the icon is hidden from screen readers |

## Platform forms

| Name | iOS | Android |
| --- | --- | --- |
| `share` | `Share03Icon` (box with an arrow) | `Share08Icon` (three nodes) |
| `back` | `ArrowLeft01Icon` (chevron) | `ArrowLeft02Icon` (arrow) |
| `more` | `MoreHorizontalIcon` | `MoreVerticalIcon` |
| `send` | `ArrowUp02Icon` | `SentIcon` |
| `chevron` | `ArrowRight01Icon` | none (Material rows show no chevron) |

The form follows the active theme's `platform`, so the prototype's iOS/Android switch changes it.

## Do and don't

- Do size inline icons by the text they sit beside (`size="footnote"`), so they scale with it.
- Don't show selection with a filled icon: the free set has none. Use colour and the label.
- Don't import from `@hugeicons/core-free-icons` directly as a package.

## Accessibility

Decorative by default (`accessibilityElementsHidden`, `importantForAccessibility="no-hide-descendants"`). A labelled icon is an image with that label; a button around an icon carries the action's name instead.
