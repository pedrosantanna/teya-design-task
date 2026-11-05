# Shape and materials

Corner radii for every surface in the app, the rule that keeps nested corners in step, and where Liquid Glass is used. Values come from Material 3's shape scale, so Android uses them as they are; iOS draws the same values with continuous corners.

```summary
Takeaways:
- Six radius tokens: none 0, inner 12, bubble 20, card 28, sheet 32 and full (a capsule). Corners are rounder than the wireframes'.
- Nested corners are concentric: the inner radius is the outer radius minus the padding, never below 8. A card at 28 with 16 of padding holds images at 12.
- Controls are capsules; containers have fixed radii. On iOS every rounded view uses continuous corners (`borderCurve: 'continuous'`).
- Liquid Glass is only for what floats above the content and acts: the ask bar, the round Requests button, the Back, Close and Confirm circles, bar buttons and buttons over a photo or the map. Sheets are opaque in the Sheet colour, with the glass rim and one scrim behind them. Cards, bubbles and tiles stay solid.
Call:
- I asked for rounder corners, a small set of radii and a premium feel, starting from iOS and Liquid Glass and adding Material.
- I kept the radii provisional (decision 040); the prototype will show whether they hold at real size.
- In this round I asked to follow Liquid Glass as Apple's own apps use it, on iOS, Android and the web. On Android the ask bar becomes a Material 3 Expressive floating toolbar.
- After a visual critique I asked for one scrim behind every sheet, an opaque sheet fill (at 94% the photos behind showed through as grey smudges), visible header buttons on the dark sheet, the iOS 26 corner on grouped lists inside sheets and a hairline that shows on dark glass.
AI:
- An agent researched Apple's new design system (WWDC 2025), Material 3 and Material 3 Expressive and the React Native and Expo APIs, and proposed the tokens and rules. I asked for rounder corners, a small set of radii and a premium feel.
- An agent checked the WWDC 2025 sessions on adopting the new design (284 and 323) for which controls get glass and how sheets change between detents, and added the web column.
- An agent applied the critique's sheet and glass fixes, added `color.sheetScrim`, `state.sheetScrim` and `color.glassHairline`, removed `state.glassSheetFill`, and measured the new pairs on the rendered web build in light and dark.
Trade-offs:
- Taking the values from Material's scale keeps Android exact and iOS close; Apple doesn't publish a token scale, only the three shape types.
- Glass only exists on iOS 26 and later. Older iOS gets a blur, Android a tonal surface and the web a CSS blur, so the app looks a little different on each.
```

## Radius

| Token | Value | Material 3 role | Used for |
| --- | --- | --- | --- |
| `radius.none` | 0 | none | Full-bleed photos, such as the top of the shop page |
| `radius.inner` | 12 | medium | Images and thumbnails inside a card or row (the shop row's 40 pt photo), fields inside a sheet |
| `radius.bubble` | 20 | large increased | Chat bubbles, photo tiles on Nearby, grouped lists inside a sheet (the iOS 26 inset-grouped corner; at 12 they read as a different family from the sheet's 32) |
| `radius.card` | 28 | extra large | Cards, answer cards and order cards in the chat, standalone grouped lists (the asking list, settings groups, the Category screen's shop rows) |
| `radius.sheet` | 32 | extra large increased | Sheets on Android and the web, and the shop page's content card; iOS system sheets keep their own corners |
| `radius.full` | half the height | full | Buttons, chips, the ask bar, the Requests button, badges, avatars |

## Rules

| Rule | In practice |
| --- | --- |
| Concentric corners | Inner radius = outer radius − padding, and never below 8 |
| Controls are capsules | Anything the shopper taps to act is `full`; anything that holds content has a fixed radius. A selection tile more than twice the hit height (the rating sheet's thumbs, 88) also takes a fixed radius, `radius.bubble`: at `full` it would read as a pill |
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
| Sheets | Opaque Sheet colour with the glass rim, inset at medium, anchored at large; a scrim behind | The same | Material bottom sheet in the Sheet colour over the same scrim, `radius.sheet` | Opaque with the rim, inset at medium, anchored at full height, `radius.sheet` |
| Buttons over a photo or the map | Glass, capsule; the primary in prominent Indigo glass | Blur | Tonal button | Blurred capsule |
| Cards, bubbles, answer cards, tiles | Solid card and muted colours | Same | Same | Same |

Glass is used only when the system offers it and Reduce Transparency is off; otherwise the element gets a blur or a solid surface that still meets contrast. The Indigo tint on glass is kept for the primary action.

On the web, glass is a backdrop blur with saturation over a translucent fill, with an inner highlight and a soft shadow. Under `prefers-reduced-transparency` it becomes the solid surface, as Reduce Transparency does on iOS.

### Glass recipe

One recipe for every glass element: the ask bar and the Requests circle, Back, Close and Confirm and bar buttons. Only the fill changes with the role. Sheets keep the rim (highlight and hairline) over an opaque fill.

| Part | Light | Dark | Token |
| --- | --- | --- | --- |
| Fill, controls | Card #FFFFFF at 55% | Card #282523 at 55% | `state.glassFill` |
| Fill, controls on an accent tile | White at 55% over the tile | White at 6% over the tile | `color.tonalOnTile`, `state.tonalOnTile` |
| Fill, header buttons on a sheet | Glass, as controls | Muted #323334, solid (1.33:1 on the sheet; the glass circle was 1.09:1) | `color.muted` |
| Fill, sheets | Sheet #DEDAD5, opaque | Sheet #1C1D1E, opaque | `color.sheet` |
| Blur (web) | 20 px | 20 px | `state.glassBlur` |
| Saturation (web) | 1.6 | 1.6 | `state.glassSaturate` |
| Saturation (web), controls on an accent tile | 1.6 | 1 (at 1.6 the dark Back was the most saturated thing on the screen) | `state.glassSaturateOnTile` |
| Highlight | 0.5 pt along the top edge, white at 60% | The same | `color.glassShine`, `state.glassHighlight`, `state.glassRim` |
| Hairline | 0.5 pt, Foreground #100A06 at 6% | 0.5 pt, Stone 360 #403D3A in full (1.82:1 on the Background; at 6% of #0E0B09 it didn't show) | `color.glassHairline`, `state.glassHairline` |
| Shadow, controls | 0 6 20 at 10% of `color.glassEdge` | The same | `state.glassShadow`, `glassShadowY`, `glassShadowBlur` |
| Shadow, controls on an accent tile | As controls | None (it read as a dark halo on the tile) | `state.glassShadowOnTile` |
| Shadow, sheets | None. One scrim behind every sheet at every detent, Foreground #100A06 at 20%, fading in with the sheet; a tap on it dismisses when the sheet can be dismissed | Black at 48% | `color.sheetScrim`, `state.sheetScrim` |

On iOS 26 the controls are Liquid Glass. Sheets are opaque on every platform: at 94% the photos behind a sheet showed through as grey smudges, and the blur under a fill that hides it added nothing. The scrim, the rim and the sheet's tone separate it from the screen.

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
