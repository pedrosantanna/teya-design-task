# RatingSummary

The top of Ratings on the shop page: the share who would go back as a large figure with how many people rated, then the tags with counts as chips. Change `shop-ratings-and-range`; numbers and words from `store/ratings.ts` (`ratingHeadline`, `topTags`). Spec: Rating summary on `docs/develop/design-system/components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `figure` | string | none | "92%" in Display title, set only from 5 ratings; then `title` is not shown |
| `caption` | string | none | "would go back" in Body, beside the figure |
| `title` | string | none | Below 5 ratings, in Title 3 in place of a figure: "3 people so far", "No ratings yet" ("New on Snuffle" is the stock line of How they do on Snuffle, so it isn't repeated here) |
| `detail` | string | none | "48 people" in Subheadline, Muted foreground, under the caption (or under the title); with no ratings "Snuffle has asked them 4 times" |
| `accessibilityLabel` | string | required | "Would go back, 92 percent of 48 people"; the tags are read after it |
| `tags` | `{ tag, count, up }[]` | `[]` | At most six; a thumbs-down tag leads with the ThumbsDown symbol |

## Rules

- Thumbs, never stars. "People" for who rated: only someone who bought through Snuffle can rate.
- No percentage below 5 ratings. Percentages are rounded down (35 of 38 is 92%).
- Tags are chips that only inform: Background fill with a 1 pt Border edge, `size.chip` high, the tag in Footnote with its count in Muted foreground, `space.2` apart, wrapping. They sit a level down from the row and are never a control's fill, and nothing happens on tap.

## Type

Display title for the figure, Body for the caption, Subheadline for the count, Footnote for the tags.

## Accessibility

One element: the label, then each tag and its count.

## iOS and Android

Same on both, inside a `ListBlock`.
