# Text

Every string in the app is drawn by `Text`. It takes a type style and a colour role by name; it never takes a font size, weight or colour value.

Spec: `docs/develop/design-system/typography.md` (scale, display rules) and `docs/develop/design-system/colour.md` (roles).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `TypeStyleName` | `body` | One of the 13 styles on the Typography page, plus `subheadlineStrong` (Subheadline at 600, the compact button label) |
| `color` | `ColorName` | `foreground` | A colour role: `foreground`, `mutedForeground`, `tint`, `onPrimary`, `destructive`… |
| `align` | `auto`, `left`, `center`, `right` | `auto` | |
| `numberOfLines` | number | none | Use the truncation rules on the Components page (shop name 1 line, preview 2) |
| `accessibilityRole` | `AccessibilityRole` | none | `header` for screen and section titles |

## Rules

- Gambetta styles (`splash`, `displayTitle`, `displayName`) appear at most once per screen and never in the chat, lists, buttons, prices, forms or notifications.
- Sentence case; no uppercase transforms.
- Text scales with Dynamic Type and Android font size; never set `allowFontScaling={false}`.
- Fonts: on web the style's CSS stack is used (Switzer or Gambetta, then the system fallbacks). On iOS and Android the system font is used until the font files are cleared for embedding and registered in `theme/helpers.ts` (decision 027).

## Examples

`Text.examples.tsx` renders one line per variant on the `/design-system` route.

```tsx
<Text variant="headline">Broadway Chemist</Text>
<Text variant="footnote" color="mutedForeground">King Street · 13 min walk · open till 7pm</Text>
```
