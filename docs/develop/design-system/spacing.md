# Spacing and layout

The spacing scale, the gaps that group content on a screen, and the grid that sizes tiles, bubbles and cards. Every gap is a step of 4, and nearness does the grouping before any card or border is added.

```summary
Takeaways:
- Eight spacing tokens on a 4-pt base, from 4 to 48, and seven semantic gaps built on them: inside a group, between blocks, card and bubble insets, between sections, the screen margin and the minimum hit area.
- The gap between groups is at least twice the largest gap inside them. A heading sits 8 from its content and 32 from the section before. In the chat, bubbles from one sender are 12 apart and a change of sender is 24.
- A card is used only where spacing alone can't group, such as the answer and order cards in the chat.
- One content column with a 16 margin below 414 pt wide and 20 from 414 up. Tile widths come from a formula; only margins and gutters are fixed. Carousels show a peek of the next tile.
Call:
- I asked for spacing and the grid to start from iOS, widen to Material and follow Gestalt (decision 041).
- I kept the values provisional, to be tuned at real size in the prototype.
AI:
- An agent researched Apple's Human Interface Guidelines (read from the HIG JSON, since the pages render by script), Material 3 and the Android docs, and NN/g on Gestalt, and proposed the tokens and rules. I asked for a modern design system grounded in iOS first, then Material, and in Gestalt.
Trade-offs:
- A 4-pt base matches Material's steps and sits close to Apple's values, at the cost of a few in-between sizes Apple uses (such as 10 and 14) that only appear in the bubble inset.
- The 16 and 20 margins follow what UIKit is reported to do on current iPhones; I haven't confirmed them for iOS 26.
```

## Spacing tokens

| Token | Value | Used for |
| --- | --- | --- |
| `space.1` | 4 | Icon to label, title to meta line |
| `space.2` | 8 | Between chips, lines in a card block, heading to its content |
| `space.3` | 12 | Between blocks in a card, carousel gutter, bubbles from the same sender |
| `space.4` | 16 | Card padding, row padding |
| `space.5` | 20 | Screen margin on wide iPhones |
| `space.6` | 24 | Between unrelated groups in a section, a change of sender in the chat |
| `space.7` | 32 | Between sections on Nearby, Requests and the shop page |
| `space.8` | 48 | Bottom clearance above the ask bar only; under a large title the first section starts 8 below |

## Semantic gaps

| Token | Value | Notes |
| --- | --- | --- |
| `gap.inside` | 4–8 | Items within one group |
| `gap.block` | 12 | Blocks within a card |
| `inset.card` | 16 | A card at `radius.card` 28 minus 16 holds content at `radius.inner` 12 |
| `inset.bubble` | 10 vertical, 14 horizontal | Chat bubbles |
| `gap.section` | 32 | Sections on a screen |
| `margin.screen` | 16 below 414 pt wide, 20 at 414 and up; 16 dp on Android | Android value from a secondary source, to confirm on m3.material.io |
| `hit.min` | 44 pt on iOS, 48 dp on Android | Applies to the touch area, not the drawn size |

## Spacing rules

| Rule | In practice |
| --- | --- |
| Proximity ratio | The gap between groups is at least 2× the largest gap inside them; headings are 8 from their content and 32 from the section before; in the chat, 12 within one sender's bubbles and 24 at a change of sender |
| Common region after space | A card only where spacing can't group, such as answer and order cards in the chat; a boundary overpowers other grouping, so it is used sparingly |
| Hit area isn't visual size | Chips draw at 32 high and reach 44 with `hitSlop`; targets are never closer than 8 |
| Safe areas first | Content scrolls under the bars; controls sit inside `useSafeAreaInsets` |
| Text width | Body text is never wider than the readable guide, which on a phone is the screen margins |

## Grid and layout tokens

| Token | Value | Used for |
| --- | --- | --- |
| Columns | 1 content column; 4 in the category grid | Every screen |
| Margin | 16 / 20 | As `margin.screen` |
| Gutter | 12 | Carousels and the category grid |
| `tile.large` | 0.78 × content width ≈ 290 / 312, image 4:3 | Open near you: one tile plus a peek |
| `tile.medium` | (content − 12) / 2.3 ≈ 156 / 168, image 4:3 | New near you |
| Category cell | (content − 36) / 4 ≈ 84 / 91, 1:1 | Category grid |
| Bubble max width | 78% of content ≈ 290 / 312 | Chat bubbles |
| Answer and order cards | Full content width | Chat |
| Web build | Phone frame, 402 × 874 | Prototype in a browser |

Widths are for a 402 pt iPhone 17 and a 440 pt iPhone 17 Pro Max. Older 6.1″ iPhones are 393 pt wide and the Air is 420. On Android, compact width (under 600 dp) covers almost every phone in portrait.

## Grid rules

| Rule | In practice |
| --- | --- |
| Carousels peek | The first tile starts on the margin, the last ends on the margin, paging snaps; the peek is the only scroll cue |
| One ratio per row | All images in a row or carousel share one ratio |
| Widths from the formula | Tiles and cells are computed from the content width; only gutters and margins are fixed |
| Sheets follow Maps | Medium and large detents; content inside a sheet sits on the screen margin (16, or 20 on wide iPhones), as in Maps |
| Standard layouts | A row or grid layout wherever possible, as the HIG asks for collections |

The tile fractions 0.78 and 2.3 are a proposal to check at real size.

## Sources

- Apple, Human Interface Guidelines, Accessibility (44 × 44 pt default, 28 × 28 minimum, spacing between controls): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Apple, Human Interface Guidelines, Buttons (hit region and sizes): https://developer.apple.com/design/human-interface-guidelines/buttons
- Apple, Human Interface Guidelines, Layout (grouping, safe areas, margins): https://developer.apple.com/design/human-interface-guidelines/layout
- Apple, Human Interface Guidelines, Collections: https://developer.apple.com/design/human-interface-guidelines/collections
- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Apple, UIKit `readableContentGuide`: https://developer.apple.com/documentation/uikit/uiview/readablecontentguide
- Material 3, chips (48 dp target): https://m3.material.io/components/chips
- SAP Fiori for Android, citing Material 3 margins and 4 dp steps (secondary; to confirm on m3.material.io): https://experience.sap.com/fiori-design-android/
- Android, window size classes: https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes
- Harley, "The Principle of Proximity in Visual Design", NN/g, 2020: https://www.nngroup.com/articles/gestalt-proximity/
- Harley, "The Principle of Common Region", NN/g, 2020: https://www.nngroup.com/articles/common-region/
- useyourloaf, "iPhone 17 screen sizes": https://useyourloaf.com/blog/iphone-17-screen-sizes/
- 16 pt and 20 pt margins on current iPhones: commonly reported UIKit behaviour, to confirm on a device in iOS 26
