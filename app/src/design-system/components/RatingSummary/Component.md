# RatingSummary

The top of "What buyers say" on the shop page: the share who would go back and how many buyers rated, then the tags with counts. Change `shop-ratings-and-range`; numbers and words from `store/ratings.ts` (`ratingHeadline`, `topTags`).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | required | "92% would go back"; below 5 ratings the count alone, "3 buyers so far" or "No buyers have rated it yet" ("New on Snuffle" is the stock line of How they do on Snuffle, so it isn't repeated here) |
| `detail` | string | none | "38 buyers", after " · " in Subheadline, Muted foreground; only with a share |
| `accessibilityLabel` | string | required | "Would go back, 92 percent of 38 buyers"; the tags are read after it |
| `tags` | `{ tag, count, up }[]` | `[]` | At most five; a thumbs-down tag leads with the ThumbsDown symbol |
| `hasShare` | boolean | `false` | The ThumbsUp symbol leads the title when a share shows |

## Rules

- Thumbs, never stars. "Buyers", never "reviews" or "users": only someone who bought through Snuffle can rate.
- No percentage below 5 ratings. Percentages are rounded down (35 of 38 is 92%).
- Tags are plain text: the tag in Footnote, its count in Muted foreground, `space.1` apart, pairs `space.4` apart, wrapping. No capsule or fill, because nothing happens on tap and a capsule read as a filter chip.

## Type

Title 3 for the title, Subheadline for the count, Footnote for the tags.

## Accessibility

One element: the label, then each tag and its count.

## iOS and Android

Same on both, inside a `ListBlock`.
