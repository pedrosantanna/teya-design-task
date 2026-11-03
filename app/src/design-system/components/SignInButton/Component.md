# SignInButton

A "Continue with …" button on sign in (first run, app flow v8). Spec: Sign in in app flow v8, area 0; Apple's HIG for Sign in with Apple.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `provider` | `'apple'`, `'google'`, `'facebook'`, `'email'` | required | Sets the label, the logo and the style |
| `onPress` | `(provider) => void` | none | |
| `loading` | boolean | `false` | Spinner in place of the label, width kept, reported busy |
| `disabled` | boolean | `false` | Used while another provider's sign in runs |

## Styles

| Provider | Fill | Label and logo |
| --- | --- | --- |
| Apple | Black on light, white on dark (`codeInk` / `codeSurface`, pure in both modes), as Apple's HIG asks | White on light, black on dark |
| Google, Facebook | Card, hairline Border | Foreground |
| Email | None (a text button) | Tint |

Large size only: `size.button.large` (50) high, full content width, `radius.full`, label in Headline, logo at the label's line height minus 4. Press scales and lays a state layer as `Button` does; Apple gives the primary (light impact) haptic.

## Rules

- Apple comes first whenever another social sign in is offered (App Store Review Guideline 4.8).
- The logos are HugeIcons glyphs in the prototype; a shipped app uses each provider's own button artwork.

## Accessibility

A button labelled "Continue with Apple" and so on; while loading, "…, waiting" and busy.

## iOS and Android

Same order on both. On Android, Google would normally come first; the prototype keeps one order.
