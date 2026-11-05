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
| Google | Google's light theme in light mode (white, 1 px #747775 stroke, #1F1F1F label), its dark theme in dark mode (#131314, #8E918F, #E3E3E3); tokens `googleFill`, `googleStroke`, `googleText` | The four-colour G in its own colours (`googleLogo*`) |
| Facebook | Card, 1 px Border | The white f on its #1877F2 disc (`facebookLogo*`), Foreground label |
| Email | None (a text button) | Tint |

Large size only: `size.button.large` (50) high, full content width, `radius.full`, label in Headline, logo at the label's line height minus 4. Press scales and lays a state layer as `Button` does; Apple gives the primary (light impact) haptic.

## Rules

- Apple comes first whenever another social sign in is offered (App Store Review Guideline 4.8).
- The Apple, Google and Facebook logos are the owners' shapes in `BrandLogos.tsx`, never redrawn or recoloured: Apple's from its SF font, black or white with the label; Google's G in its four brand colours. Facebook's f is white on its #1877F2 disc, as its brand resources publish it.

## Accessibility

A button labelled "Continue with Apple" and so on; while loading, "…, waiting" and busy.

## iOS and Android

Same order on both. On Android, Google would normally come first; the prototype keeps one order.
