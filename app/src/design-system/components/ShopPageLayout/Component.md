# ShopPageLayout

The shop page's frame: the map, the photos, the content card and the nav bar, with the scroll behaviour from the "Scroll" storyboard in app flow v7. Spec: Shop page header, Map and Nav bar on `docs/develop/design-system/components.md`; empty and loading states from `states.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | required | Display title in the card (up to two lines), then the bar's inline title |
| `status` | string[] | `[]` | Footnote lines under the name: "Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice" |
| `photos` | `ShopPhoto[]` | `[]` | Up to three: `uri`, `label` ("Rossi's Bakery shopfront, Blythe Road"), `credit` ("Photo: Clara Lilley, Unsplash") |
| `onBack` | function | required | Back in the top left; the page is the shop's detail, pushed with Back and the back gesture |
| `backLabel` | string | none | The previous screen's title ("Nearby"), beside the chevron once the bar fills |
| `mapLoading` | boolean | `false` | Map ground alone |
| `actions` | ReactNode | none | Ask, Call and Directions, `space.4` under the status lines |
| `children` | ReactNode | required | The rest of the card, `gap.section` apart: "Asked about recently", how the shop works, credits |

## Layout

- The map fills the whole screen behind everything, with the pin halfway between the bar and the card's resting edge (Map's `extent`).
- Back over the map is a glass circle with the chevron (iOS) or arrow (Android); once the bar fills it becomes the plain Back with the previous title.
- Photos are `tile.large` wide at 3:2, `radius.bubble`, `layout.gutter` apart, `space.2` under the bar. At the first position only the first photo shows, `space.8` of it peeking in from the right edge, so the map stays in view; the rail snaps photo by photo.
- The card rests `space.6` under the photos, inset from the screen edges by the screen margin (16, or 20 on wide phones), in Card with `radius.card` top corners and `space.6` padding at the top; the map shows at its sides.
- The content inside sits at the screen margin plus `inset.card` from the screen edge at every scroll position, so it never moves sideways or reflows.

## Scroll

1. Resting: the inset card sits over the map. As the scroll starts, over the first bar-height of travel, the card grows to the full width (inset to 0) and its top corners go from `radius.card` to `radius.sheet`, covering the map at its sides; the title moves up with the card. Under Reduce Motion it jumps between the inset and the full-width card.
2. The photos and the map stay put while the card scrolls over them.
3. Over the last bar-height before the title reaches the bar, the card's surface rises to the top of the screen and its corners square off: the card fills the screen with the large title under Back.
4. When the title has scrolled under the bar, the bar's background, its inline title and Back with the previous title appear. From then on the bar hides while the content scrolls up and returns on a scroll down (`spring.smooth`; a fade with `spring.fade` under Reduce Motion).
5. Back at the top, the inset card, the map and the photos show again.

Everything is driven by one `useAnimatedScrollHandler` on the UI thread; only transforms, opacity and corner radii change. The card's surface is two opaque halves, each half the screen plus the margin wide, that slide out to the edges with `translateX`: no layout pass per frame and no scaling, so the corners and the text keep their shape.

## iOS and Android

Same layout. The bar is the iOS navigation bar with the hide-on-swipe behaviour (opt-in, as Safari does it) and the Material top app bar with "enter always" on Android.

## Accessibility

Reading order: Back ("Back to Nearby"), name, status lines, then the screen's content; the photos are read as "[Shop] shopfront, [street]" with the credit as their hint. The map is hidden from screen readers.
