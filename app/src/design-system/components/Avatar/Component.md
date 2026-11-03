# Avatar

The shopper's photo at the top left of Nearby, which opens the account sheet (v7 Home and Avatar menu frames). Not specified on `docs/develop/design-system/components.md` yet; it reuses the shop avatar's size (`size.avatar.shop`, 40) so the top row has one circle size.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | required | Initials without a photo; label "Account, Sam" |
| `image` | bundled image or URI | none | Persona photos live in `assets/images/personas/` |
| `size` | `'regular'`, `'large'` | `'regular'` | Regular 40 (`size.avatar.shop`); large 64 (`size.thumb.request` + `space.2`) in the account sheet |
| `onPress` | function | none | Without it the avatar is an image, not a button |
| `accessibilityLabel` | string | "Account, [name]" | |

Press scale with `spring.press`; hit slop up to `hit.min`.

## iOS and Android

Same on both.

## Accessibility

A button "Account, Sam" when it opens the sheet; an image labelled with the name otherwise.
