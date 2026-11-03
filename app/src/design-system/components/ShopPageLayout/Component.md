# ShopPageLayout

The shop page's frame: the map, the photos, the content card and the nav bar, with the scroll behaviour from the "Scroll" storyboard in app flow v7. Spec: Shop page header, Map, Close button and Nav bar on `docs/develop/design-system/components.md`; empty and loading states from `states.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | required | Display title in the card (up to two lines), then the bar's inline title |
| `status` | string[] | `[]` | Footnote lines under the name: "Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice" |
| `photos` | `ShopPhoto[]` | `[]` | Up to three: `uri`, `label` ("Rossi's Bakery shopfront, Blythe Road"), `credit` ("Photo: Clara Lilley, Unsplash") |
| `onClose` | function | required | Close in the top left; the page is presented, so it has no Back |
| `mapLoading` | boolean | `false` | Map ground alone |
| `actions` | ReactNode | none | Ask, Call and Directions, `space.4` under the status lines |
| `children` | ReactNode | required | The rest of the card, `gap.section` apart: "Asked about recently", how the shop works, credits |

## Layout

- The map is fixed behind everything, from the top of the screen to the card's resting edge (plus `radius.card`), with the pin at its centre.
- Photos are `tile.large` wide at 3:2, `radius.bubble`, `layout.gutter` apart, `space.2` under the bar. At the first position only the first photo shows, `space.8` of it peeking in from the right edge, so the map stays in view; the rail snaps photo by photo.
- The card rests `space.6` under the photos, in Card with `radius.card` top corners, `space.6` padding at the top and the screen margin at the sides.

## Scroll

1. Resting: the card sits over the map; the photos and the map stay put while the card scrolls over them.
2. Over the last bar-height before the title reaches the bar, the card's surface rises to the top of the screen and its corners square off: the card fills the screen with the large title under Close.
3. When the title has scrolled under the bar, the bar's background and its inline title appear. From then on the bar hides while the content scrolls up and returns on a scroll down (`spring.smooth`; a fade with `spring.fade` under Reduce Motion).
4. Back at the top, the map and the photos show again.

Everything is driven by one `useAnimatedScrollHandler` on the UI thread; only transforms, opacity and corner radii change.

## iOS and Android

Same layout. The bar is the iOS navigation bar with the hide-on-swipe behaviour (opt-in, as Safari does it) and the Material top app bar with "enter always" on Android.

## Accessibility

Reading order: Close, name, status lines, then the screen's content; the photos are read as "[Shop] shopfront, [street]" with the credit as their hint. The map is hidden from screen readers.
