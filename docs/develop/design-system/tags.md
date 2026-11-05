# Tags

The six kinds of small label in the app: filter chips, suggestion chips, status labels, badges, counts and rating tags. Each has one job, one size and one colour rule, so a shopper can tell an action from a state from a promotion at a glance.

```summary
Takeaways:
- Two chips the shopper taps (filter and suggestion) and three labels that only inform (status label, badge, count). Rating tags are both: chips a buyer picks in the rating sheet, and counted labels on the shop page.
- Status labels follow the state table in the conceptual model word for word, and draw its status and its detail in different weights and colours, never with the dot; only "Needs you" sits in a pill; one per card or row.
- Badges sit only on photo tiles, at most two per tile, in the accent 100 fill with 800 text. Promoted always shows, because it discloses paid placement.
- Colour is never the only signal: warnings carry a symbol, and selected chips keep their label (Android adds a checkmark).
Call:
- I asked for tags to be covered the same way as shape and motion, starting from iOS and widening to Material (decision 041).
- I kept the values provisional, to be tuned at real size in the prototype.
- I asked for Indigo to mean action only, so a selected filter chip became Foreground with inverse text, and chips moved to the card colour because Muted barely shows on the new background (decision 045).
- In this round a craft review found the black selected chip the heaviest mark on Nearby. I asked for selection to go back to tonal Indigo (Indigo 100 with Indigo 800 text in semibold), for "Needs you" in Foreground so Buy is the only Indigo on a request row, and for badges to keep their light values on photos in both modes (change craft-pass-2).
- Later I asked for ratings on the shop page, with tags from fixed lists that change with the thumbs up or down (decision 047).
- After a visual critique measured the Indigo 100 chip at 1.03:1 on the Background, lighter than the white chips beside it, I asked for a new rule: unselected chips sit a level down and the selected chip is Card with Indigo text and edge.
- After another visual critique and a screen review of the web build, I asked for their fixes: in dark, unselected chips on the Background drop to the Background with a Border edge, and New Request's place and deadline chips become one menu form. The selected chip on a dark tile keeps decision 049's Card, since the critique's tinted chip would change that decision.
AI:
- An agent researched Apple's Human Interface Guidelines (read from the HIG JSON, since the pages render by script) and Material 3's chips and badges, and proposed the types and rules against the colour page and the conceptual model. I asked for a modern design system grounded in iOS first, then Material.
- An agent added rating tags as a type, with the two fixed lists, from the topic chips in Etsy and Google Maps.
- An agent built the new chip rule for every ground, added `color.chipOn`, `state.chipEdge` and `size.edge`, and measured it in light and dark.
- An agent applied that round's chip fixes, added the menu chip and measured the dark Background chip's edge.
Trade-offs:
- A status label without a fill is quieter than a pill and easier to miss; I chose it so the price stays the strongest thing on a card.
- iOS has no chip component, so chips are custom on iOS and Material chips on Android.
```

## Types

| Type | Anatomy | Size | Colour | Where |
| --- | --- | --- | --- | --- |
| Filter chip | Label, optional leading symbol, count after the label in Muted foreground | 32 high, 12–14 padding, `radius.full`, 44 hit | Off, a level down from the selected chip, Foreground text: on the Background in light, the Background with a 1 pt edge of Foreground at 12% (`glassEdge`, `state.chipEdge`; the edge is 1.29:1); on a light sheet, the Sheet colour with the same edge; on a shop's or category's tile, `tonalOnTile` (white at 40% in light, 1.17 to 1.18:1 on the tile; 6% in dark, 1.19 to 1.20:1); in a Card section and on a dark sheet, Muted; on the dark Background, the Background with a 1 pt Border edge (Stone 360, 1.82:1; as Card it matched the selected chip's fill); on a chat's ground, `chat.fill`. On: Card fill, label in Indigo 800 at 600 (8.75:1) and a 1.5 pt Indigo 800 edge (`size.edge.selected`); dark: Card with Indigo 300 text (8.60:1) and a 1 pt edge (`color.chipOn`) | Requests filters, street filter on Nearby; single choice, "All" first |
| Suggestion chip | Text, optional symbol | As filter chip | Card fill (on a chat's ground, `chat.fill`), Foreground text | Under the Snuffle bubble that offers them: three on New Request, and in a chat; a tap sends the text |
| Menu chip, a form of the filter chip | Value, then a chevron down in Muted foreground | As filter chip | As an unselected filter chip on its ground | A value already set that the shopper can change: the place ("Within 15 min", which opens the location sheet) and the deadline ("Any time", which opens a short list) in New Request's composer. Both look the same, since both are set |
| Status label | Optional icon, then the status in Caption 1 Strong, then its detail in Caption 1 | Inline; "Needs you" in a Card pill (1.2:1 on the Background in light, 1.3:1 in dark) | Status in Foreground (Success on Ready, Paid and Collected, Warning on the "not charged" endings), detail in Muted foreground with its first letter capitalised ("Buy by Thu 5 Nov"); the two wrap as units; a warning icon only on the endings "Not confirmed, not charged" and "Sold, not charged", never on "not charged yet" | Rows, cards and notifications, exactly as in the state table |
| Badge | Text in Caption 2 | 20 high, 8 padding, `radius.full`, 8 from the photo corner | Accent 100 fill, 800 text, in both modes, since a photo doesn't change with the theme. On a shop's accent (the shop page header): Card fill, Foreground text. Promoted Pistachio, New Peach, Delivers Butter | Photo tiles and the shop page header |
| Rating tag | Text; on the shop page, the count after the tag | In the rating sheet as a filter chip; on the shop page, a chip that only informs (Background fill, 1 pt Border edge, nothing on tap) | Rating sheet: as filter chip, up to three selected. Shop page: Foreground text, count in Muted foreground; positive and negative tags look the same | Rating sheet, rating summary ("Had it as promised · 21"), review cards |
| Count | A number | 18 minimum diameter, `radius.full`, in a 2 pt ring of the Background | Indigo 800 with white text in both modes (8.75:1) | On the round Requests button, for requests that need the shopper; capped at "9+" |

## Rules

| Rule | In practice |
| --- | --- |
| One status per object | One status label per card or row |
| Few badges | At most two badges per tile; Promoted always shows, since it discloses paid placement |
| No fill on status labels | A pill would compete with the price |
| More than colour | Warnings also get a symbol; colour never carries meaning alone |
| Selection keeps the label | A selected chip keeps its text; Android adds a checkmark, as Material does |
| Badges for what matters | A count only for requests that need the shopper, as the HIG reserves badges for critical information |
| Rating tags from fixed lists | Up: "Had it as promised", "Set aside on time", "Friendly", "Good value", "Knew their stuff". Down: "Wasn't as described", "Not ready when I came", "Hard to find". The list follows the thumbs; no free-text tags |
| Negative tags look the same | A negative tag is not red or smaller; its words carry the meaning |
| Source of an answer | An asked shop's answer reads "Has it · replied 2 min ago"; a connected shop's reads "In stock now · from the shop's till", shortened in compact rows to "In stock now" or "In stock · 1 of 2" beside the flash symbol, which stands for the till (VoiceOver still reads "from the shop's till") |

Material's badge sizes (6 dp dot, 16 dp labelled) are to confirm on m3.material.io.

## Sources

- Apple, Human Interface Guidelines, Tab bars (badges): https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Apple, Human Interface Guidelines, Accessibility (more than colour): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Material 3, chips (assist, filter, input, suggestion; 32 dp high, 48 dp target): https://m3.material.io/components/chips
- Material Components for Android, `BadgeDrawable`: https://developer.android.com/reference/com/google/android/material/badge/BadgeDrawable
- [Colour](colour.md) (badge and selected-chip roles) and [Conceptual model](conceptual-model.md) (states and words)
