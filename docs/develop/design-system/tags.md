# Tags

The six kinds of small label in the app: filter chips, suggestion chips, status labels, badges, counts and rating tags. Each has one job, one size and one colour rule, so a shopper can tell an action from a state from a promotion at a glance.

```summary
Takeaways:
- Two chips the shopper taps (filter and suggestion) and three labels that only inform (status label, badge, count). Rating tags are both: chips a buyer picks in the rating sheet, and counted labels on the shop page.
- Status labels follow the state table in the conceptual model word for word, and draw its status and its detail in different weights and colours, never with the dot; only "Needs you" sits in a pill; one per card or row.
- Badges sit only on photo tiles, at most two per tile, in the accent 100 fill with 800 text. Delivers carries a scooter symbol and New a sparkles symbol. I decided not to show Promoted anywhere in the prototype for now; the data keeps it.
- Colour is never the only signal: warnings carry a symbol, and selected chips keep their label (Android adds a checkmark).
Call:
- I asked for tags to be covered the same way as shape and motion, starting from iOS and widening to Material (decision 041).
- I kept the values provisional, to be tuned at real size in the prototype.
- I asked for Indigo to mean action only, so a selected filter chip became Foreground with inverse text, and chips moved to the card colour because Muted barely shows on the new background (decision 045).
- In this round a craft review found the black selected chip the heaviest mark on Nearby. I asked for selection to go back to tonal Indigo (Indigo 100 with Indigo 800 text in semibold), for "Needs you" in Foreground so Buy is the only Indigo on a request row, and for badges to keep their light values on photos in both modes (change craft-pass-2).
- Later I asked for ratings on the shop page, with tags from fixed lists that change with the thumbs up or down (decision 047).
- After a visual critique measured the Indigo 100 chip at 1.03:1 on the Background, lighter than the white chips beside it, I asked for a new rule: unselected chips sit a level down and the selected chip is Card with Indigo text and edge.
- After another visual critique and a screen review of the web build, I asked for their fixes: in dark, unselected chips on the Background drop to the Background with a Border edge, and New Request's place and deadline chips become one menu form. The selected chip on a dark tile keeps decision 049's Card, since the critique's tinted chip would change that decision.
- In round 10 I found the dark edges on chips and the "Needs you" pill ugly. I asked for colour and contrast to do that work instead: a tonal container one clear step from its ground, as Material 3's container roles and Apple's dark fills do, and borders only where a fill can't work. Selection in dark is a fill and a weight, not an outline.
- Later I asked for one chip treatment on a row inside the shop card, a quiet neutral fill with no border and no tile colour, after the chips in the card's own colour read as holes.
AI:
- An agent researched Apple's Human Interface Guidelines (read from the HIG JSON, since the pages render by script) and Material 3's chips and badges, and proposed the types and rules against the colour page and the conceptual model. I asked for a modern design system grounded in iOS first, then Material.
- An agent added rating tags as a type, with the two fixed lists, from the topic chips in Etsy and Google Maps.
- An agent built the new chip rule for every ground, added `color.chipOn`, `state.chipEdge` and `size.edge`, and measured it in light and dark.
- An agent applied that round's chip fixes, added the menu chip and measured the dark Background chip's edge.
- An agent took the dark edges off every chip and the pill, defined the dark container tokens, rebuilt the four dark chip grounds on them and measured each pair against its ground.
- In round 12 an agent measured the rating tags on the dark rows (1.37 to 1.40:1), gave them the accent's tile, folded the dark containers into one table keyed by ground and deleted the unused `container` token.
- An agent added `tag.fillOnRow`, applied it to the "What they sell" chips and the rating tags, and measured each pair: 1.21:1 in light and 1.36 to 1.41:1 in dark, with the text above AA.
Trade-offs:
- A status label without a fill is quieter than a pill and easier to miss; I chose it so the price stays the strongest thing on a card.
- iOS has no chip component, so chips are custom on iOS and Material chips on Android.
```

## Types

| Type | Anatomy | Size | Colour | Where |
| --- | --- | --- | --- | --- |
| Filter chip | Label, optional leading symbol, count after the label in Muted foreground | 32 high, 12–14 padding, `radius.full`, 44 hit | Off, a level down from the selected chip, Foreground text. Light: on the Background, the Background with a 1 pt edge of Foreground at 12% (`glassEdge`, `state.chipEdge`; the edge is 1.29:1); on a sheet, the Sheet colour with the same edge; on a shop's or category's tile, `tonalOnTile` (white at 40%, 1.17 to 1.18:1 on the tile); in a Card section, Muted (on a row inside the shop page card, `tag.fillOnRow`: the Background, 1.21:1 on the white row, with no edge); on a chat's ground, `chat.fill`. Dark has no edges: a tonal container ([Dark containers](#dark-containers)), `tag.fill` on the Background and a chat, `tag.fillRaised` on a sheet and a Card section, the tile's `cardOnTile` on a tile, `tag.fillOnRow` on a row inside the shop page card (Stone 360, 1.36 to 1.41:1, no tile colour). On: light, Card fill, label in Indigo 800 at 600 (8.75:1) and a 1.5 pt Indigo 800 edge (`size.edge.selected`); dark, an Indigo container (`chipSelected`, `chipSelectedRaised`, `chipSelectedOnTile`) with Indigo 200 text at 600 (8.1 to 11.6:1) and no edge | Requests filters, street filter on Nearby; single choice, "All" first |
| Suggestion chip | Text, optional symbol | As filter chip | As the unselected filter chip on its ground (on a chat's ground, `chat.fill` in light, `tag.fill` in dark), Foreground text | Under the Snuffle bubble that offers them: three on New Request, and in a chat; a tap sends the text |
| Menu chip, a form of the filter chip | Value, then a chevron down in Muted foreground | As filter chip | As an unselected filter chip on its ground | A value already set that the shopper can change: the place ("Within 15 min", which opens the location sheet) and the deadline ("Any time", which opens a short list) in New Request's composer. Both look the same, since both are set |
| Status label | Optional icon, then the status in Caption 1 Strong, then its detail in Caption 1 | Inline; "Needs you" in a pill (Card, 1.2:1 on the Background, in light; `tag.fill`, 1.55:1, in dark) | Status in Foreground (Success on Ready, Paid and Collected, Warning on the "not charged" endings), detail in Muted foreground with its first letter capitalised ("Buy by Thu 5 Nov"); the two wrap as units; a warning icon only on the endings "Not confirmed, not charged" and "Sold, not charged", never on "not charged yet" | Rows, cards and notifications, exactly as in the state table |
| Badge | Text in Caption 2 | 20 high, 8 padding, `radius.full`, 8 from the photo corner | Accent 100 fill, 800 text, in both modes, since a photo doesn't change with the theme. On a shop's accent (the shop page header): Card fill, Foreground text. New (sparkles symbol) Peach, Delivers (scooter symbol) Butter; Promoted is not drawn | Photo tiles and the shop page header |
| Rating tag | Text; on the shop page, the count after the tag | In the rating sheet as a filter chip; on the shop page, a chip that only informs, the same as every chip on a row in the shop card (`tag.fillOnRow`: light, the Background, 1.21:1 from the white row; dark, `tag.fillRaised`, 1.36 to 1.41:1 from the row; no edge and no tile colour; nothing on tap) | Rating sheet: as filter chip, up to three selected. Shop page: Foreground text (16.3:1 in light, 10.3:1 or more in dark), count in Muted foreground (6.28:1 in light, 7.7:1 or more in dark); positive and negative tags look the same | Rating sheet, rating summary ("Had it as promised · 21"), review cards |
| Count | A number | 18 minimum diameter, `radius.full`, in a 2 pt ring of the Background | Indigo 800 with white text in both modes (8.75:1) | On the round Requests button, for requests that need the shopper; capped at "9+" |

## Dark containers

In dark, a chip or pill is a tonal fill one clear step from its ground, with no edge. Each fill sits 1.4 to 1.6:1 from the ground it is on, and every label is above 7:1. The tokens are low chroma (the dark palette from decision 051), so a Peach, Pistachio, Butter or Lavender fill stays recognisable without a large pastel area. Light keeps its edges.

| Ground | Off chip | Fill | Off chip on its ground | Text on the fill | Selected chip |
| --- | --- | --- | --- | --- | --- |
| Background | `tag.fill` | Stone 320 #323334 | 1.55:1 on #0B0C0D | Foreground 12.14:1 | `chipSelected`, Indigo 900 #222169, 1.39:1 |
| Chat | `tag.fill` | Stone 320 #323334 | 1.55:1 on #0B0C0D | Foreground 12.14:1 | `chipSelected`, 1.39:1 |
| Sheet | `tag.fillRaised` | Stone 360 #3D3E3F | 1.58:1 on #1C1D1E | Foreground 10.28:1 | `chipSelectedRaised`, Indigo 850 #2E2B8F, 1.49:1 |
| Card section | `tag.fillRaised` | Stone 360 #3D3E3F | 1.41:1 on Card #252627 | Foreground 10.28:1 | `chipSelectedRaised`, 1.49:1 |
| Tile (the Category screen, the shop page card) | `shop.accent.<hue>.cardOnTile` | #624D46, #4C5745, #595242, #535062 | 1.40 to 1.48:1 on the tile | Foreground 7.30 to 7.54:1 | `chipSelectedOnTile`, Indigo 950 #1A194F, 1.41 to 1.51:1 |
| Row inside the shop page card (its chips and rating tags) | `tag.fillOnRow` (`tag.fillRaised`) | Stone 360 #3D3E3F | 1.36 to 1.41:1 on the four `cardOnTile` rows | Foreground 10.28:1; the count in Stone 880 7.74:1 | None |

The Peach row #624D46 is the tightest pair on the shop page, at 1.36:1 for its chip, under the 1.4:1 that a chip on a tinted row needed when it took the accent's `tile`. I chose one neutral chip for the whole card over the tinted ones, so 1.36:1 is the floor and it is above the 1.15:1 minimum for a surface. `shop.accent.<hue>.container`, which read 1.09 to 1.15:1 on the row card, is deleted: no component reads it.

The selected chip is told apart from the unselected ones by its Indigo hue, its fill and the semibold label. Warning and Success stay text with a symbol, so they have no container; they would compete with the price. Badges sit on photos and have no edge in either mode.

## Rules

| Rule | In practice |
| --- | --- |
| One status per object | One status label per card or row |
| Few badges | At most two badges per tile; Promoted is not shown |
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
