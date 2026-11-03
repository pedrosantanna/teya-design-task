# Shape and materials

Corner radii for every surface in the app, the rule that keeps nested corners in step, and where Liquid Glass is used. Values come from Material 3's shape scale, so Android uses them as they are; iOS draws the same values with continuous corners.

```summary
Takeaways:
- Six radius tokens: none 0, inner 12, bubble 20, card 28, sheet 32 and full (a capsule). Corners are rounder than the wireframes'.
- Nested corners are concentric: the inner radius is the outer radius minus the padding, never below 8. A card at 28 with 16 of padding holds images at 12.
- Controls are capsules; containers have fixed radii. On iOS every rounded view uses continuous corners (`borderCurve: 'continuous'`).
- Liquid Glass is only for what floats above the content and acts: the ask bar, the round Requests button, the Back, Close and Confirm circles, bar buttons, sheets at the medium detent and buttons over a photo or the map. Cards, bubbles and tiles stay solid.
Call:
- I asked for rounder corners, a small set of radii and a premium feel, starting from iOS and Liquid Glass and adding Material.
- I kept the radii provisional (decision 040); the prototype will show whether they hold at real size.
- In this round I asked to follow Liquid Glass as Apple's own apps use it, on iOS, Android and the web. On Android the ask bar becomes a Material 3 Expressive floating toolbar.
AI:
- An agent researched Apple's new design system (WWDC 2025), Material 3 and Material 3 Expressive and the React Native and Expo APIs, and proposed the tokens and rules. I asked for rounder corners, a small set of radii and a premium feel.
- An agent checked the WWDC 2025 sessions on adopting the new design (284 and 323) for which controls get glass and how sheets change between detents, and added the web column.
Trade-offs:
- Taking the values from Material's scale keeps Android exact and iOS close; Apple doesn't publish a token scale, only the three shape types.
- Glass only exists on iOS 26 and later. Older iOS gets a blur, Android a tonal surface and the web a CSS blur, so the app looks a little different on each.
```

## Radius

| Token | Value | Material 3 role | Used for |
| --- | --- | --- | --- |
| `radius.none` | 0 | none | Full-bleed photos, such as the top of the shop page |
| `radius.inner` | 12 | medium | Images and thumbnails inside a card or row, fields inside a sheet |
| `radius.bubble` | 20 | large increased | Chat bubbles, photo tiles on Nearby |
| `radius.card` | 28 | extra large | Cards, answer cards and order cards in the chat, standalone grouped lists (the asking list, settings groups) |
| `radius.sheet` | 32 | extra large increased | Sheets on Android and the web, and the shop page's content card; iOS system sheets keep their own corners |
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

| Element | iOS 26 and later | Earlier iOS | Android | Web |
| --- | --- | --- | --- | --- |
| Requests button | Glass, interactive, circle | Blur | Surface container high, `full` | Blurred circle |
| Ask bar | Glass, interactive, capsule, placed as the tab view's bottom accessory | Blur | Floating toolbar (Material 3 Expressive), `full` | Blurred capsule |
| Back, Close and Confirm | Glass circles; Confirm tinted Indigo | Blur | Icon buttons in the top app bar; Done as a filled or tonal button | Blurred circles |
| Bar buttons | Icon buttons share one glass capsule; a text button gets its own | Blur | Icon buttons, no container | One blurred capsule |
| Nav bar | No fill; a scroll edge effect under the controls | Blur | Top app bar, tinted on scroll | Gradient mask |
| Sheets | System sheet: inset glass at medium, opaque at large; no custom background | System sheet | Material bottom sheet, `radius.sheet` | Blur at medium, solid at full height, `radius.sheet` |
| Buttons over a photo or the map | Glass, capsule; the primary in prominent Indigo glass | Blur | Tonal button | Blurred capsule |
| Cards, bubbles, answer cards, tiles | Solid card and muted colours | Same | Same | Same |

Glass is used only when the system offers it and Reduce Transparency is off; otherwise the element gets a blur or a solid surface that still meets contrast. The Indigo tint on glass is kept for the primary action.

On the web, glass is `backdrop-filter: blur(20–30px) saturate(180%)` over a translucent fill, with a 1 px inner highlight and a soft shadow. Under `prefers-reduced-transparency` it becomes the solid surface, as Reduce Transparency does on iOS.

## Sources

- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Apple, "Build a UIKit app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/
- Apple, "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/323/
- Apple, Human Interface Guidelines, Materials: https://developer.apple.com/design/human-interface-guidelines/materials
- Material 3 shape scale, as published in the Android components docs: https://gitea.com/784622644/material-components-android/src/branch/master/docs/theming/Shape.md (a mirror; to check against m3.material.io)
- React Native, view style props (`borderCurve`): https://reactnative.dev/docs/0.81/view-style-props
- Expo, `expo-glass-effect`: https://docs.expo.dev/versions/latest/sdk/glass-effect
- Material 3 Expressive, toolbars: https://m3.material.io/components/toolbars
- MDN, `backdrop-filter`: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter and `prefers-reduced-transparency`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency
