# Tags

The five kinds of small label in the app: filter chips, suggestion chips, status labels, badges and counts. Each has one job, one size and one colour rule, so a shopper can tell an action from a state from a promotion at a glance.

```summary
Takeaways:
- Two chips the shopper taps (filter and suggestion) and three labels that only inform (status label, badge, count).
- Status labels have no fill and follow the state table in the conceptual model word for word; one per card or row.
- Badges sit only on photo tiles, at most two per tile, in the accent 100 fill with 800 text. Promoted always shows, because it discloses paid placement.
- Colour is never the only signal: warnings carry a symbol, and selected chips keep their label (Android adds a checkmark).
Call:
- I asked for tags to be covered the same way as shape and motion, starting from iOS and widening to Material (decision 041).
- I kept the values provisional, to be tuned at real size in the prototype.
AI:
- An agent researched Apple's Human Interface Guidelines (read from the HIG JSON, since the pages render by script) and Material 3's chips and badges, and proposed the types and rules against the colour page and the conceptual model. I asked for a modern design system grounded in iOS first, then Material.
Trade-offs:
- A status label without a fill is quieter than a pill and easier to miss; I chose it so the price stays the strongest thing on a card.
- iOS has no chip component, so chips are custom on iOS and Material chips on Android.
```

## Types

| Type | Anatomy | Size | Colour | Where |
| --- | --- | --- | --- | --- |
| Filter chip | Label, optional leading symbol, count after "·" | 32 high, 12–14 padding, `radius.full`, 44 hit | Off: muted. On: Indigo 100 fill, 800 text (dark: 900 / 200) | Requests filters, street filter on Nearby; single choice, "All" first |
| Suggestion chip | Text, optional symbol | As filter chip | Muted fill, foreground text | Above the ask bar; a tap sends the text; at most 3 visible |
| Status label | Optional icon, then text in Caption 1 | Inline, no fill | Muted foreground; tint only for "Needs you"; a warning icon only on the endings "Not confirmed · not charged" and "Sold · not charged", never on "not charged yet" | Rows, cards and notifications, exactly as in the state table |
| Badge | Text in Caption 2 | 20 high, 8 padding, `radius.full`, 8 from the photo corner | Accent 100 fill, 800 text (dark: 900 / 200). Promoted Pistachio, New Peach, Delivers Butter | Photo tiles only |
| Count | A number | 18 minimum diameter, `radius.full` | Primary fill with its label colour | On the round Requests button, for requests that need the shopper; capped at "9+" |

## Rules

| Rule | In practice |
| --- | --- |
| One status per object | One status label per card or row |
| Few badges | At most two badges per tile; Promoted always shows, since it discloses paid placement |
| No fill on status labels | A pill would compete with the price |
| More than colour | Warnings also get a symbol; colour never carries meaning alone |
| Selection keeps the label | A selected chip keeps its text; Android adds a checkmark, as Material does |
| Badges for what matters | A count only for requests that need the shopper, as the HIG reserves badges for critical information |
| Source of an answer | An asked shop's answer reads "Has it · replied 2 min ago"; a connected shop's reads "In stock now · from the shop's till", shortened to "In stock now · till" in compact rows |

Material's badge sizes (6 dp dot, 16 dp labelled) are to confirm on m3.material.io.

## Sources

- Apple, Human Interface Guidelines, Tab bars (badges): https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Apple, Human Interface Guidelines, Accessibility (more than colour): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Material 3, chips (assist, filter, input, suggestion; 32 dp high, 48 dp target): https://m3.material.io/components/chips
- Material Components for Android, `BadgeDrawable`: https://developer.android.com/reference/com/google/android/material/badge/BadgeDrawable
- [Colour](colour.md) (badge and selected-chip roles) and [Conceptual model](conceptual-model.md) (states and words)
