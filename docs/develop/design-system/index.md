# Design system

The foundations of the shopper app, written as the reference the screens are built from. Only what is decided goes here; explorations stay in Ideation until I choose, and each foundation links back to the board it came from.

```summary
Takeaways:
- Typography is defined: Gambetta 700 for display in four places, Switzer for everything the shopper reads, on Apple's text styles with the matching Material 3 roles.
- The mark is provisional: a retriever whose mouth is a shop's awning, in two tones.
- Colour is decided (decision 036, round 9): Biscuit grey is the neutral and the accents are Pastel parade with Indigo; the light background has since moved to #EEE9E2 (L 0.935, decision 045) and the dark background to #0B0C0D (decision 051). Semantic roles (border, separator, destructive, warning, success, scrim, disabled) are set in both modes.
- Spacing, tags and imagery are provisional (decision 041): a 4-pt spacing scale and a one-column grid, five kinds of tag, image ratios and one icon set, HugeIcons (decision 042). A fifteen-item screen review checks every screen against them.
Call:
- I set the rule for what enters: a foundation needs a decision in the log behind it, and its values come from the last round of the ideation board, never retyped from memory.
- I asked for each foundation to start from iOS and widen to Material 3, as in decision 021, and for the palette to be recorded here once I had chosen it.
AI:
- An agent moved the round 4 type spec and the round 9 colours from the ideation board into these pages. I chose the fonts and the rules in decisions 027 to 029.
Trade-offs:
- Colour was set before any screen was built at real polish, so the roles may shift once the prototype puts them under load.
```

## Foundations

| Foundation | Status | Source |
| --- | --- | --- |
| [Conceptual model](conceptual-model.md) | Defined (decision 039): four objects (request, shop, answer, order), their verbs, status labels and words | [App flow](../ideation/app-flow.md), [netnography findings](../../discover/netnography/findings.md) |
| [Components](components.md) | Provisional (decision 043): specs for every component the screens use, with iOS and Android forms | Design review of v7 |
| [States and elevation](states.md) | Provisional (decision 043): interaction states, elevation, empty, loading and error states | Design review of v7 |
| [iOS and Android](platforms.md) | Provisional (decision 043): what each element becomes on each platform, haptics included | Design review of v7 |
| [Content and voice](content.md) | Provisional (decision 043): Snuffle's voice, error pattern, UK formats | Design review of v7 |
| [Typography](typography.md) | Defined (decisions 027, 028, 029) | [Type scale](../ideation/type-scale.md), round 4 |
| [Colour](colour.md) | Defined. Neutral: Biscuit grey (decision 034). Accents chosen: Pastel parade with Indigo, on Biscuit grey in light and dark, without borders (decision 036). Light background #EEE9E2 (L 0.935); dark background #0B0C0D, cards #252627. Semantic roles with contrasts in both modes | [Identity](../ideation/identity.md) |
| [Mark](mark.md) | Provisional (decision 033): a retriever with an awning for a mouth, drawn by hand in Figma | [Identity](../ideation/identity.md) |
| [Shape and materials](shape.md) | Provisional (decision 040): six radii from Material 3's scale, concentric corners, Liquid Glass only for floating controls | Research for decision 040 |
| [Motion](motion.md) | Provisional (decision 040): six springs with iOS and Material 3 values, rules for response, interruption and Reduce Motion | Research for decision 040 |
| [Spacing and layout](spacing.md) | Provisional (decision 041): eight spacing tokens on a 4-pt base, semantic gaps, one content column with 16/20 margins and tile widths from a formula | Research for decision 041 |
| [Tags](tags.md) | Provisional (decision 041): filter and suggestion chips, status labels, badges and counts, with size and colour rules | Research for decision 041 |
| [Imagery and icons](imagery.md) | Provisional (decisions 041 and 042): HugeIcons Stroke Rounded with an icon map, image ratios and sizes, photo and map rules; the no-photo placeholder is an untested proposal | Research for decision 041 |
| [Illustrations](illustrations.md) | Decided (decision 042): 3D objects modelled in code, outlined, with solid shadows, in a viewer | Reference images from the author |
| [Screen review](screen-review.md) | Provisional (decision 041): fifteen checks an agent runs on every screen | Research for decision 041 |
