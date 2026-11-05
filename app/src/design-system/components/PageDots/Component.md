# PageDots

A page indicator for a short run of pages: Getting started in first run. Spec: Getting started in app flow v8 (area 0) and the page control in Apple's HIG; Material's equivalent is the same row of dots.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `count` | number | required | Pages in the run |
| `current` | number | required | Zero-based |
| `on` | `'ground'`, `'photo'` | `'ground'` | `photo`: white dots (`onLightbox`) for the pill over a shop photo |

Dots are `size.dot` (8) and `space.2` apart; the current dot is Foreground, the others Foreground at `state.pageDotOff` (55%), so on Getting started they tint with the Indigo page under them. The colour moves with `spring.fade`.

## Do and don't

- Do let swipe and Continue move between pages.
- Don't make the dots buttons: they show where the shopper is.

## Accessibility

One element, read as "Page 2 of 3".

## iOS and Android

Same on both.
