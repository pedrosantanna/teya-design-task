# RatingSheet

The rating sheet, opened by Rate on a collected order card or the Rate chip after delivery. Composes `Sheet`. Change `shop-ratings-and-range`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open`, `onClose` | | required | As `Sheet` |
| `shop` | string | required | Context under the title: "Your visit to Paper & Co" |
| `up` | boolean or null | required | The answer to "Would you go back?" |
| `upTags`, `downTags` | string[] | required | The tags offered after each answer (`UP_TAGS`, `DOWN_TAGS` in `store/ratings.ts`, the two lists of the conceptual model, decision 047); up to three are kept (`MAX_TAGS`) |
| `tags` | string[] | required | Chosen; switching the answer clears them |
| `note`, `noteMax` | string, number | required | Optional note, 140 characters, with a count |
| `onAnswer`, `onToggleTag`, `onNote`, `onSend` | functions | required | Send sits under the thumbs and appears once an answer is chosen |

## Anatomy and tokens

- Opens at the medium detent; large shows the whole note field when the keyboard is up.
- The sheet's title is "Would you go back?" in Headline; "Your visit to Paper & Co" sits under it in the header (`Sheet`'s `subtitle`: Subheadline, Muted foreground, centred, `space.1` under the title). Then two thumb buttons side by side: `hit.min` × 2 tall (88), `radius.bubble` (20), Card fill (Muted in dark, where Card is 1.17:1 on the sheet); selected takes `chipSelected` with the 1 pt `chipSelectedEdge`, `onChipSelected` content and a `Tick02Icon` in its top right corner, the thumb at the Title 1 size with the strong stroke.
- After an answer: Send, then "What went well?" or "What went wrong?" in Footnote `space.3` further down (24 under Send, 8 over its chips), then filter chips (on the sheet's ground: Card in light, Muted in dark); then the multi-line `TextField` labelled "Anything to add?" with the placeholder "Optional · 140 characters" and the count in Caption 1.
- Send is the one filled button, hidden until an answer is chosen (the spec's Empty state), then right under the thumbs and above the optional reasons and note, not pinned to the sheet's bottom: at the medium detent a pinned Send left a band of about 180 pt, and Send at the end of the content fell below the fold. Thumbs, never stars.

## Accessibility

The thumbs are a radio group labelled "Would you go back?": "Yes, I'd go back" and "No, I wouldn't go back", each with its checked state. Chips are buttons with their selected state. The note field reads "Anything to add?".

## iOS and Android

As `Sheet`: the standard sheet ground (the Sheet colour at 94% over the glass at medium on iOS and the web, so the chat's Lavender bubbles don't tint it), the Material modal bottom sheet on Android.
