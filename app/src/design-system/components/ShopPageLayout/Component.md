# ShopPageLayout

The shop page's frame: the map, the photo carousel, the content card and the nav bar, with the scroll behaviour from the "Scroll" storyboard in app flow v7 and the carousel from the "Shop page" frame in app flow v10. Spec: Shop page header, Photo carousel, Map and Nav bar on `docs/develop/design-system/components.md`; empty and loading states from `states.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | required | Display title in the card (up to two lines), then the bar's inline title |
| `facts` | ShopFacts | none | Under the name, as ShopMeta draws them: the status on its own line ("Open until 6pm"), then the walk and the street as icon-led units |
| `photos` | `ShopPhoto[]` | `[]` | Up to three: `source`, `label` ("Rossi's Bakery shopfront, Blythe Road"); they fill the PhotoCarousel, and a tap opens the Lightbox |
| `accent` | ShopAccentName | none | The shop's accent, in details only: the chips (tile fill, plus a `detail` edge in dark), the map pin and the tonal tile under each photo. The card is `shopPage.card` (a warm grey, Biscuit 915, in light; the Sheet colour in dark with a 1 pt `cardEdge` along its top), solid; rows on it are `shopPage.row` (Card white) with a 1 pt `shopPage.rowEdge` hairline in light and Muted in dark, with no shadow |
| `onBack` | function | required | Back in the top left; the page is the shop's detail, pushed with Back and the back gesture |
| `backLabel` | string | none | The previous screen's title ("Nearby"), beside the chevron once the bar fills |
| `mapLoading` | boolean | `false` | Map ground alone |
| `tags` | ReactNode | none | Badges (New, Delivers) in one row that scrolls sideways |
| `actions` | ReactNode | none | Ask (primary), Call and Directions as capsule buttons in one row that scrolls sideways, never wrapped or stacked |
| `children` | ReactNode | required | The rest of the card, `gap.section` apart: what they sell, found here recently, ratings, how the shop works |

## Layout

- The map fills the whole screen behind everything, with the pin halfway between the bar and the card's resting edge (Map's `extent`).
- Back over the map is a glass circle with the chevron (iOS) or arrow (Android); once the bar fills it becomes the plain Back with the previous title.
- The map's pin sits in the band under the bar; the PhotoCarousel follows at the content width, `space.2` above the card, and scrolls with the content.
- The card rests `space.2` under the carousel, inset from the screen edges by the screen margin (16, or 20 on wide phones), in the neutral Sheet colour with `radius.card` top corners, `space.5` padding at the sides and `space.6` at the top; the map shows at its sides.
- The content inside sits at the screen margin plus `inset.card` from the screen edge at every scroll position, so it never moves sideways or reflows.

## Scroll

The text keeps its width at rest, so line breaks never change: the card's surface and the margin around the text grow from inset to the full width, and the padding inside the card visually increases without reflowing the text. The tag and action rows are clipped to the card's edges, which an animated clip and offset follow (UI thread), so their first chip stays under the text's left edge.


1. Resting: the inset card sits over the map. As the scroll starts, over the first bar-height of travel, the card grows to the full width (inset to 0) and its top corners go from `radius.card` to `radius.sheet`, covering the map at its sides; the title moves up with the card. Under Reduce Motion it jumps between the inset and the full-width card.
2. The map stays put; the carousel and the card scroll up over it together.
3. Over the last bar-height before the title reaches the bar, the card's surface rises to the top of the screen and its corners square off: the card fills the screen with the large title under Back.
4. When the title has scrolled under the bar, the bar's background, its inline title and Back with the previous title appear. From then on the bar hides while the content scrolls up and returns on a scroll down (`spring.smooth`; a fade with `spring.fade` under Reduce Motion).
5. Back at the top, the map, the carousel and the inset card show again.

Everything is driven by one `useAnimatedScrollHandler` on the UI thread; only transforms, opacity and corner radii change. The card's surface is two opaque halves, each half the screen plus the margin wide, that slide out to the edges with `translateX`: no layout pass per frame and no scaling, so the corners and the text keep their shape.

## iOS and Android

Same layout. The bar is the iOS navigation bar with the hide-on-swipe behaviour (opt-in, as Safari does it) and the Material top app bar with "enter always" on Android.

## Accessibility

Reading order: Back ("Back to Nearby"), name, facts, then the screen's content; the photos are buttons read as "[Shop] shopfront, [street], 1 of 3". The map is hidden from screen readers.
