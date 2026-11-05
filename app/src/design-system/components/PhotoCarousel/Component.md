# PhotoCarousel

The shop's photos on the shop page, between the map and the shop card. Spec: Photo carousel on `docs/develop/design-system/components.md`; the frame is "Shop page" in app flow v10.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `photos` | `ShopPhoto[]` | required | `source` (bundled image or URL) and `label` ("Rossi's Bakery shopfront, Blythe Road"); none renders nothing |
| `name` | string | required | The shop's name, for the placeholder tile under a photo that is loading |
| `accent` | ShopAccentName | none | The placeholder tile's colour |
| `originId` | string | none | Each photo registers as a zoom origin under `${originId}:${index}` for the Lightbox |
| `onOpen` | function | none | A tap on a photo, with its index |
| `page` | number | none | Controlled page; the carousel scrolls to it when it changes from outside |
| `onPageChange` | function | none | Called as the page changes |

## Layout

- One photo at a time at the content width (screen width minus two screen margins), `layout.carouselRatio` (2:1), `radius.card`; paging, with the next photo off screen at rest.
- A black scrim (`color.photoScrim`) runs up the bottom of each photo, `state.photoScrim` (40%) at the edge and gone by `layout.photoScrimReach` (45%) of its height.
- Page dots (PageDots `on="photo"`, white) sit in a pill, black at `state.photoPill` (30%), `space.3` above the bottom edge, over the scrim; with one photo there are no dots and no paging.

## Accessibility

Each photo is a button, read as "[label], 2 of 3", with the hint "Opens the photo full screen". The list is labelled "[Shop] photos".
