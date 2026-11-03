# NavBar

The navigation bar. Spec: Nav bar on `docs/develop/design-system/components.md`. Exports `NavBar`, `LargeTitle`, `useNavBarScroll` and `useNavBarHeight`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | required | Inline title in Headline, one line |
| `mode` | `'large'`, `'inline'`, `'reveal'` | `'inline'` | Large: put `<LargeTitle>` at the top of the content; the inline title fades in as it scrolls away. Reveal: no title until `revealAt` points (shop page) |
| `scroll` | `NavBarScroll` | none | From `useNavBarScroll()`; pass its `onScroll` to an `Animated.ScrollView` or `Animated.FlatList` |
| `leading` | `'back'`, `'close'`, `'none'` | `'none'` | Back with the previous title on iOS ("Requests"), the arrow on Android. Close over the map uses the glass button. In reveal mode Back starts as a glass circle over the map and becomes the plain Back with `backLabel` once the bar fills (shop page) |
| `backLabel` | string | none | |
| `trailing` | `NavAction[]` | `[]` | Icon buttons at `hit.min`, icons 22 |
| `hideOnScroll` | boolean | `false` | Needs `useNavBarScroll(true, hideAfter)`; past `hideAfter` points it hides while the content scrolls up and returns on a scroll down, with `spring.smooth` (a fade with `spring.fade` under Reduce Motion) |
| `topInset` | number | safe-area top | |
| `fill` | `'background'`, `'card'` | `'background'` | The bar's fill once content is under it; Card on the shop page, whose content is a card |
| `backgroundAt` | number | 8, or `revealAt` in reveal mode | Scroll offset at which the fill shows (the shop page shows it when the card's top edge reaches the bar) |

The bar's background (Background with a hairline separator) fades in after the first 8 points of scroll; in reveal mode, when the title appears. With `hideOnScroll`, the status bar's strip keeps the fill while the bar is hidden. All scroll work runs in a Reanimated scroll handler on the UI thread.

## iOS and Android

iOS navigation bar (44, centred inline title, Tint buttons) ↔ Material top app bar (64, title after the navigation icon, Foreground icons).

## Accessibility

The title is a header; Back reads "Back to Requests"; Close reads "Close"; trailing buttons use their action's name.

## LargeTitle

`title`, `scroll`, `display` (Display title in Gambetta for the Nearby large title, typography.md; Title 1 otherwise) and `offset` (where the fade starts when other content sits above the title, as Nearby's area row does).
