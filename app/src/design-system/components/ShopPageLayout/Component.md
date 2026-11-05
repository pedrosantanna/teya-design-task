# ShopPageLayout

The shop page's frame: the map, the photo carousel, the content card and the nav bar, with the scroll behaviour from the "Scroll" storyboard in app flow v7 and the carousel from the "Shop page" frame in app flow v10. Spec: Shop page header, Photo carousel, Map and Nav bar on `docs/develop/design-system/components.md`; empty and loading states from `states.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | required | Display title in the card (up to two lines), then the bar's inline title |
| `facts` | ShopFacts | none | Under the name, as ShopMeta draws them: the status on its own line ("Open until 6pm"), then the walk, the street, `delivers` (scooter) and `isNew` (sparkles) as icon-led groups that wrap only between groups |
| `photos` | `ShopPhoto[]` | `[]` | Up to three: `source`, `label` ("Rossi's Bakery shopfront, Blythe Road"); they fill the PhotoCarousel, and a tap opens the Lightbox |
| `accent` | ShopAccentName | none | The shop's accent: its `tile` is the card's ground, solid, in light and dark, and the whole card is `<Ground value="tile" accent>`, so rows are `cardOnTile`, chips the accent's `tile`, tonal buttons `state.tonalOnTile` and muted text `mutedForegroundOnTile`. The nav bar's scroll edge and the map pin take it too |
| `onBack` | function | required | Back in the top left; the page is the shop's detail, pushed with Back and the back gesture |
| `backLabel` | string | none | The previous screen's title ("Nearby"), beside the chevron once the bar fills |
| `mapLoading` | boolean | `false` | Map ground alone |
| `actions` | ReactNode | none | Ask (primary), Call and Directions as capsule buttons in one row that scrolls sideways under the card's edges, never wrapped or stacked |
| `children` | ReactNode | required | The rest of the card, `gap.section` apart: what they sell, found here recently, ratings, how the shop works |

## Layout

- The map fills the whole screen behind everything. The strip of map from the top of the screen to the card (the safe area included) has the pin at its middle: the pin's ink is as far from the top as from the card.
- Back over the map is a glass circle with the chevron (iOS) or arrow (Android); once the bar fills it becomes the plain Back with the previous title.
- The card rests `space.8` under the bar's band, inset from the screen edges by `space.3` with `radius.card` top corners and `space.6` of padding inside; the map shows at its sides.
- The photo carousel is a group of its own: `gap.section` below the actions and `gap.section` above the first heading. `ShopPageText` wraps a paragraph that keeps its width at rest.

## Scroll

Every container in the card grows with it and keeps its left edge on the card's: the content's side margins are animated from `space.3` to 0 (UI thread), so the photo carousel (its photos widen through the `grow` prop; the height stays), the grouped rows, the chip groups, the review carousel and the actions row all follow. The text blocks (the title, the facts, and `ShopPageText`) are fixed at their width at rest, so line breaks never change; their start follows the edge.

1. Resting: the inset card sits over the map. As the scroll starts, over the first `space.6` of travel, the card grows to the full width (inset to 0) and its top corners go from `radius.card` to `radius.sheet`, covering the map at its sides; the content moves with its edge. Under Reduce Motion it jumps between the inset and the full-width card.
2. The map stays put; the card scrolls up over it.
3. Over the last bar-height before the title reaches the bar, the card's surface rises to the top of the screen and its corners square off: the card fills the screen with the large title under Back.
4. When the title has scrolled under the bar, the bar's background, its inline title and Back with the previous title appear. From then on the bar hides while the content scrolls up and returns on a scroll down (`spring.smooth`; a fade with `spring.fade` under Reduce Motion).
5. Back at the top, the map and the inset card show again.

Everything is driven by one scroll handler on the UI thread. The card's surface is two opaque halves, each half the screen plus the margin wide, that slide out to the edges with `translateX`, so the corners keep their shape; the content's side margins are the only layout that changes per frame.

## iOS and Android

Same layout. The bar is the iOS navigation bar with the hide-on-swipe behaviour (opt-in, as Safari does it) and the Material top app bar with "enter always" on Android.

## Accessibility

Reading order: Back ("Back to Nearby"), name, facts, then the screen's content; the photos are buttons read as "[Shop] shopfront, [street], 1 of 3". The map is hidden from screen readers.
