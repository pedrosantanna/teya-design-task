# NavBar

The navigation bar. Spec: Nav bar on `docs/develop/design-system/components.md`. Exports `NavBar`, `LargeTitle`, `useNavBarScroll` and `useNavBarHeight`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | required | Inline title in Headline, one line |
| `mode` | `'large'`, `'inline'`, `'reveal'` | `'inline'` | Large: put `<LargeTitle>` at the top of the content; the inline title fades in as it scrolls away. Reveal: no title until `revealAt` points (shop page) |
| `scroll` | `NavBarScroll` | none | From `useNavBarScroll()`; pass its `onScroll` to an `Animated.ScrollView` or `Animated.FlatList` |
| `leading` | `'back'`, `'close'`, `'none'` | `'none'` | Back is the chevron alone in a 44 glass circle (`GlassButton`) on iOS and the web, the arrow icon button on Android. Close is the glass × |
| `backLabel` | string | none | The previous screen's title, only in Back's accessibility label ("Back to Requests") |
| `trailing` | `NavAction[]` | `[]` | Icon-only actions grouped in one glass capsule on iOS and the web; icon buttons on Android |
| `confirm` | `{ onPress, label }` | none | `ConfirmButton` at the right |
| `hideOnScroll` | boolean | `false` | Needs `useNavBarScroll(true, hideAfter)`; past `hideAfter` points it hides while the content scrolls up and returns on a scroll down, with `spring.smooth` (a fade with `spring.fade` under Reduce Motion) |
| `topInset` | number | safe-area top | |
| `fill` | `'background'`, `'card'` | `'background'` | Colour of the scroll-edge fade; Card on the shop page, whose content is a card |
| `backgroundAt` | number | 8, or `revealAt` in reveal mode | Scroll offset at which the fill shows (the shop page shows it when the card's top edge reaches the bar) |

No bar fill (iOS 26): a scroll-edge fade from Background (or Card) to transparent fades in under the floating controls after the first 8 points of scroll, or at `backgroundAt`; the web adds a masked backdrop blur. The fade stays while a `hideOnScroll` bar is hidden. The inline title is leading, after Back. All scroll work runs in a Reanimated scroll handler on the UI thread.

## iOS and Android

iOS 26 navigation bar (52: 44 glass controls with `space.2`, leading inline title, Foreground glyphs in glass) ↔ Material top app bar (64, title after the navigation icon, Foreground icons, no glass).

## Accessibility

The title is a header; Back reads "Back to Requests"; Close reads "Close"; trailing buttons use their action's name.

## LargeTitle

`title`, `scroll`, `display` (Display title in Gambetta for the Nearby large title, typography.md; Title 1 otherwise) and `offset` (where the fade starts when other content sits above the title, as Nearby's area row does).
