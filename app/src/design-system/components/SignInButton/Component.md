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

All four providers share one button, the design system's secondary capsule: `size.button.large` (50) high, full content width, `radius.full`, Card with a 1 pt Border edge (`size.edge.control`), label "Continue with …" in Headline and Foreground, icon 20 pt (`space.5`) leading. Only the icon differs.

| Provider | Icon |
| --- | --- |
| Apple | The Apple logo from SF, Foreground like the title (near-black on light, white on dark), as Apple's HIG asks |
| Google | The four-colour G in its own colours (`googleLogo*`), never recoloured |
| Facebook | The white f on its #1877F2 disc (`facebookLogo*`) |
| Email | A text button, no fill or edge, Tint label and icon |

Measured: Card against the ground 1.21:1 in light and 1.29:1 in dark, the edge 1.27:1 and 1.83:1, the label on Card 19.7:1 and 14.5:1. Press scales and lays a state layer as `Button` does.

## Rules

- Apple comes first whenever another social sign in is offered (App Store Review Guideline 4.8).
- The Apple, Google and Facebook logos are the owners' shapes in `BrandLogos.tsx`, never redrawn or recoloured: Apple's from its SF font, the same colour as the title; Google's G in its four brand colours. Facebook's f is white on its #1877F2 disc, as its brand resources publish it.

## Accessibility

A button labelled "Continue with Apple" and so on; while loading, "…, waiting" and busy.

## iOS and Android

Same order on both. On Android, Google would normally come first; the prototype keeps one order.
