# Shape and materials

Corner radii for every surface in the app, the rule that keeps nested corners in step, and where Liquid Glass is used. Values come from Material 3's shape scale, so Android uses them as they are; iOS draws the same values with continuous corners.

```summary
Takeaways:
- Six radius tokens: none 0, inner 12, bubble 20, card 28, sheet 32 and full (a capsule). Corners are rounder than the wireframes'.
- Nested corners are concentric: the inner radius is the outer radius minus the padding, never below 8. A card at 28 with 16 of padding holds images at 12.
- Controls are capsules; containers have fixed radii. On iOS every rounded view uses continuous corners (`borderCurve: 'continuous'`).
- Liquid Glass is only for what floats above the content and acts: the ask bar, the round Requests button, sheets, buttons over a photo or the map. Cards, bubbles and tiles stay solid.
Call:
- I asked for rounder corners, a small set of radii and a premium feel, starting from iOS and Liquid Glass and adding Material.
- I kept the radii provisional (decision 040); the prototype will show whether they hold at real size.
AI:
- An agent researched Apple's new design system (WWDC 2025), Material 3 and Material 3 Expressive and the React Native and Expo APIs, and proposed the tokens and rules. I asked for rounder corners, a small set of radii and a premium feel.
Trade-offs:
- Taking the values from Material's scale keeps Android exact and iOS close; Apple doesn't publish a token scale, only the three shape types.
- Glass only exists on iOS 26 and later. Older iOS gets a blur and Android a tonal surface, so the app looks a little different on each.
```

## Radius

| Token | Value | Material 3 role | Used for |
| --- | --- | --- | --- |
| `radius.none` | 0 | none | Full-bleed photos, such as the top of the shop page |
| `radius.inner` | 12 | medium | Images and thumbnails inside a card or row, fields inside a sheet |
| `radius.bubble` | 20 | large increased | Chat bubbles, photo tiles on Nearby |
| `radius.card` | 28 | extra large | Cards, answer cards and order cards in the chat, standalone grouped lists (the asking list, settings groups) |
| `radius.sheet` | 32 | extra large increased | Custom sheets; system sheets keep their own corners |
| `radius.full` | half the height | full | Buttons, chips, the ask bar, the Requests button, badges, avatars |

## Rules

| Rule | In practice |
| --- | --- |
| Concentric corners | Inner radius = outer radius − padding, and never below 8 |
| Controls are capsules | Anything the shopper taps to act is `full`; anything that holds content has a fixed radius |
| No corner beats its container | Nothing on a card or sheet edge has a larger radius than the card or sheet |
| Continuous corners on iOS | One shared style helper sets `borderCurve: 'continuous'`; Android draws circular arcs, as Material does |

Apple's 2025 design system names three shape types: fixed, capsule (half the height) and concentric (the parent's radius minus the padding). The tokens above are the fixed ones; capsule is `full`, and concentric is the rule.

## Materials

| Element | iOS 26 and later | Earlier iOS | Android |
| --- | --- | --- | --- |
| Requests button | Glass, interactive, circle | Blur | Surface container high, `full` |
| Ask bar | Glass, interactive, capsule | Blur | Surface container high, `full` |
| Sheets | System sheet, glass by default | System sheet | Material bottom sheet, `radius.sheet` |
| Buttons over a photo or the map | Glass, capsule | Blur | Tonal button |
| Cards, bubbles, answer cards, tiles | Solid card and muted colours | Same | Same |

Glass is used only when the system offers it and Reduce Transparency is off; otherwise the element gets a blur or a solid surface that still meets contrast. The Indigo tint on glass is kept for the primary action.

## Sources

- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Apple, Human Interface Guidelines, Materials: https://developer.apple.com/design/human-interface-guidelines/materials
- Material 3 shape scale, as published in the Android components docs: https://gitea.com/784622644/material-components-android/src/branch/master/docs/theming/Shape.md (a mirror; to check against m3.material.io)
- React Native, view style props (`borderCurve`): https://reactnative.dev/docs/0.81/view-style-props
- Expo, `expo-glass-effect`: https://docs.expo.dev/versions/latest/sdk/glass-effect
