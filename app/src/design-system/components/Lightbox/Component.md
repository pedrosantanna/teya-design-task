# Lightbox

The full-screen photo viewer, opened from a PhotoCarousel photo on the shop page. Spec: Photo carousel and Photo viewer on `docs/develop/design-system/components.md`; the frame is "Photo viewer (full screen)" in app flow v10.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `photos` | `ShopPhoto[]` | required | Same list as the carousel |
| `open` | boolean | required | Controlled |
| `index` | number | required | The photo on show, zero-based |
| `onIndexChange` | function | required | Called when a swipe lands on another photo |
| `onClose` | function | required | Close button, Escape on the web |
| `originId` | string | none | The carousel's `originId`; the viewer grows from `${originId}:${index}` and back into it |

## Behaviour

- Ground is `color.lightbox` (black in both schemes); the count ("1 of 3") is Headline in `color.onLightbox` and the hint under the photo is Footnote in `color.onLightboxMuted`.
- Close is the glass circle at the top left, `hit.min` high, below the status bar.
- Photos page sideways, one at a time at the screen's width. Pinch zooms up to 4x about the photo's centre, one finger moves a zoomed photo inside its edges, double-tap zooms to 2.5x and back. Paging is off while a photo is zoomed, so the shopper zooms out before moving on.
- Opening grows a copy of the tapped photo from its rectangle to its place with `spring.smooth` while the ground fades in; closing does the reverse, into the photo the viewer is on (the carousel scrolls to it). With Reduce Motion, or if the photo has scrolled out of view, it fades with `spring.fade`.
- Presented through `Portal`, so on the web it stays inside the phone frame.

## Accessibility

The overlay is modal. Each photo is read with its label; the count is read as "Photo 1 of 3". Close is labelled "Close photo".
