# Identity

A first exploration of the shopper app's identity: four concept directions that are British and tied to finding or shopping, three accent palettes, and the palettes applied to the v2 home screens and to Material 3 roles. The app is called Snuffle (decision 035, on the [Brand](brand.md) page). The mark is provisional; the accent palette is open.

```summary
Takeaways:
- Four directions: the terrier (a dog that goes into the shops and comes back with the thing), the Irregulars (Holmes's street runners), nipping out (the British quick errand) and the parade (painted fascias and market awnings).
- The Irregulars match the concept's structure most closely: one concierge the shopper talks to, several agents asking shops behind it. The terrier gives the waiting a face.
- Three palettes, each built on a complementary pair plus a third colour: Pillar and park (green and red, butter), Awning (cobalt and marmalade, mint), Tiles (teal and rose, ochre). Every tint passes 4.5:1 as text and as a button label in light and dark mode.
- The mark is now a retriever, a British breed whose job is to bring things back. Retriever names to consider: Nous (the breed's founding dog, and British slang for common sense), Bonnie, Bailey, Buddy, Teddy, Primrose. Sniffing names: Snuffle (my choice, decision 035), Sniffari, Truffle, Rootle, Boop, Waggy.
- Several obvious names are taken or crowded (Parade, Fetch, Errand, Legwork), and "Nip" alone is an ethnic slur.
- Round 9 puts more colour back into the light mode: the background at L 0.95 or L 0.96, at round 8's chroma, ×1.8 or ×2.5. The agent suggested L 0.96 at ×1.8; I chose L 0.96 at round 8's chroma (#F4F1ED), and dark mode stayed as in round 8 until I moved it to round 8's less colour column. ×2.5 reads as cream.
- Round 7 replaces the brown dark mode: Biscuit grey's dark steps read as muddy brown and sit opposite indigo on the wheel. Aubergine, a warm plum, is the agent's suggestion; Night sky is cooler, Plum charcoal quieter.
- Round 6 stresses Night bus: its solid badges glared because Amber, Neon pink and Cyan are light and very saturated; tonal badges (pale fill, dark text of the same hue) pass 7:1 and calm it down. Indigo carries all text and buttons.
- Round 5 answers whether the saturated palettes work with Biscuit grey: they do, because the grey is almost neutral; the mark's Oat and Brew are the limit. Warm-led sets (Corner shop, Lido) sit best next to it.
- Round 4 keeps Oat and Brew as the base and adds three warm grey scales, shadcn-style, and four sets of five accents (Tea tin, Shopfront enamel, Greengrocer, Pillar box). Pure black text and white on Brew pass everywhere; the agent suggests Tea tin with Biscuit grey.
Call:
- I gave the seeds (a sniffer dog, a Sherlock-style investigator, British shopping culture) and set the line: character-led, multi-colour, and without the generic AI look (no purple gradients, sparkles or glowing orbs).
- I asked for more palettes and an icon test with the parade's awning as a terrier's beard, then picked icon test 3 and shortlisted palettes A, C, F, I and J.
- I redrew icon tests 1 and 2 by hand in Figma as the provisional mark (decision 033); it is in the [design system](../design-system/mark.md).
- I asked to compare the hybrids and dark modes side by side on screens, without borders, and chose Pastel parade with Indigo (decision 036) and a light background at L 0.96 with round 8's chroma (round 9); dark mode as in round 8. The name is decided: Snuffle.
- Later I went back to round 8's dark mode tests and chose the less colour column for dark mode: Biscuit grey at 45% of its chroma, named Stone, because the full chroma read brown at night (decision 048). Light mode keeps Biscuit grey. It is marked on the board.
AI:
- I gave the seeds: a sniffer dog, a Sherlock-style investigator, British shopping culture. An agent searched the web for references and name conflicts, checked the Sherlock Holmes copyright and trademark position, built the palettes with a script that computes WCAG contrast and Material 3 tonal palettes, drew the mark sketches in SVG, applied the palettes to the v2 wireframes and captured nine apps from Mobbin.
- The name checks are quick web searches, not trademark searches. Names marked "not checked" were not searched at all.
- In round 4 an agent read the shadcn/ui, Tailwind, Radix Colors and Material documentation on neutrals, built the grey ramps in OKLCH with a script, and checked every pairing for WCAG contrast, including pure black and white. It darkened Tea teal and Jam slightly so they pass on Oat.
Trade-offs:
- Each palette has a secondary and tertiary colour that fail as text on white (Butter, Marmalade, Mint, Rose, Ochre). They are kept for fills, badges and status dots; text in those hues uses the darker Material 3 tone.
- Showing every palette on the same two screens makes them easy to compare, and hides how each would change layout, type or illustration.
```

## Rounds

Every round stays on the same board, newest at the top, under a "Where it stands" area with what is chosen, shortlisted, dropped and open. Chosen items have a green outline; shortlisted ones a green badge.

| Round | What it added |
| --- | --- |
| 9 | Biscuit grey in light mode with more colour: the background at L 0.95 and at L 0.96, each with round 8's chroma, ×1.8 and ×2.5 |
| 8 | Pastel parade with Indigo on Biscuit grey, chosen (decision 036), in light and dark without borders: surfaces with more lightness distance, and a less saturated Biscuit grey beside it. Dark mode now uses that less saturated column at 45% of the chroma, as Stone (decision 048) |
| 7 | Three dark modes in place of the brown one (Night sky, Aubergine, Plum charcoal), from a benchmark of Linear, Material 3 and Slack, each tried with Night bus, Lido with Indigo and Pastel parade with Indigo, next to the light mode and the round 6 brown, all without borders |
| 6 | Night bus derived into ten-step OKLCH ramps per colour, tonal badges in place of solid ones, four screens in light and dark that push the palette, and Indigo in place of the blue in Lido and Pastel parade, each on the same four screens in light and dark |
| 5 | Biscuit grey as the neutral, pre-decided. Pillar box with three candidates for the fifth colour in place of Slate roof (Duck egg, Bramley and Sea glass, brighter), and six saturated palettes from round 2 on Biscuit grey with the mark |
| 4 | Oat and Brew from palette I as the base: three warm grey scales in the shadcn style (from Oat and Brew to close to Tailwind stone) and four sets of five accents, each checked with pure black and white |
| 3 | Icon test 3 (brows and moustache) with a four or five-stripe moustache, in palettes A, C, F, I and J |
| 2 | Ten more palettes of four or five colours, and six icon tests where the parade's awning becomes a terrier's beard |
| 1 | Four concept directions, three palettes, applications on the v2 home, references |

## Palettes, round 2

I didn't find the palette in the first three. These ten work with more colours per set (four or five), each built around a complementary pair. The first colour is the tint (iOS key colour, Material 3 primary); its contrast is given on white and, for dark mode, on #1C1C1E. The lighter colours are for fills, chips and status dots, not text.

| Palette | Colours | Set | Tint, light / dark |
| --- | --- | --- | --- |
| A · Lido | 5 | Pool blue #2F6FDE, Coral #FF6F59, Sun #FFD25A, Lilac #B9A7F5, Mint #6ED3A5 | #2F6FDE (4.72:1) / #4E84E3 (4.65:1) |
| B · Greengrocer | 4 | Leaf #2E7D4F, Tomato #E4572E, Lemon #F6D743, Plum #7B4B94 | #2E7D4F (5.05:1) / #38975F (4.67:1) |
| C · Pick and mix | 4 | Violet #5B3FE0, Raspberry #E23E73, Lime #A7D129, Apricot #FFB26B | #5B3FE0 (6.5:1) / #8874E9 (4.64:1) |
| D · Allotment | 4 | Moss #3F6B22, Beetroot #A23B72, Marigold #F5A623, Cornflower #6C8EF5 | #3F6B22 (6.29:1) / #589630 (4.72:1) |
| E · Seaside rock | 4 | Navy #1B3A6B, Rock pink #FF7EB6, Sea mint #7FE3C4, Sand #F4D58D | #1B3A6B (11.27:1) / #5586D4 (4.66:1) |
| F · Flower show | 5 | Emerald #00796B, Magenta #C2185B, Primrose #FFE082, Periwinkle #8C9EFF, Blush #FFC4C4 | #00796B (5.32:1) / #009886 (4.73:1) |
| G · Corner shop | 4 | Cobalt #3346D3, Tangerine #FF8A3D, Pistachio #B8E07A, Blush #F7B7C3 | #3346D3 (7.1:1) / #6E7BE0 (4.52:1) |
| H · Night bus | 4 | Indigo #3D35B8, Amber #FFB000, Neon pink #FF5FA2, Cyan #3FD0E0 | #3D35B8 (8.75:1) / #807AD9 (4.62:1) |
| I · Tea and biscuits | 5 | Tea teal #0F6E6E, Jam #C8325A, Custard #F7C948, Oat #E9DCC3, Brew #5A3E2B | #0F6E6E (6.04:1) / #149292 (4.5:1) |
| J · Pastel parade | 5 | Ink blue #2442A8, Peach #FFB59E, Pistachio #C9EBA2, Lavender #CDBDFF, Butter #FFE7A0 | #2442A8 (8.68:1) / #647FDE (4.56:1) |

## Icon test 3, explored

I chose the line of icon test 3, the brows and moustache, and asked for a wider moustache with four or five stripes, in Lido (A), Pick and mix (C), Flower show (F), Tea and biscuits (I) and Pastel parade (J). Each palette shows the icon on its tint, on a light tile and on a dark tile, then at 60 and 29 points.

## Icon tests

The parade's striped awning becomes a terrier's beard: lowered a little, with folded ears on top and eyes and a nose above it. One shape holds both sides of the product, the shops (the awning) and the concierge (the dog). Six variants: ears, eyes and nose; ears and nose only; brows and a short beard; inside a head; a wink; one colour. Each is shown in Lido, Greengrocer and on a dark tile, and at 60 and 29 points. The first drafts used white stripes, which read as teeth; the stripes now alternate two palette colours and the awning starts right under the nose, like a moustache.

## Concept directions

| Direction | Idea | Fit with the concierge | Main risk |
| --- | --- | --- | --- |
| The terrier | A small British terrier that goes into the shops for you and comes back with the thing | A character with something to do while the shopper waits: off sniffing, found it, bringing it back | Can read as a pet-care app, or childish |
| The Irregulars | Holmes's street network of runners, led by Wiggins, who report back to one person | One concierge in front, several agents asking shops behind it | Trademark: the Conan Doyle Estate still claims rights in the name and image of Sherlock Holmes |
| Nipping out | "I'm just nipping to the shops": the British quick errand | The product's job is the short errand with a deadline | Leans on a phrase with no visual of its own; "Nip" alone is a slur |
| The parade | A parade of shops with painted fascias and striped awnings | The street and its shops carry the brand | Heritage pastiche, and the concierge has no face |

On the Sherlock Holmes position: Conan Doyle died in 1930, so the stories are out of copyright in the UK, and since 1 January 2023 every story is public domain in the US (Klinger v. Conan Doyle Estate covered the earlier ones). The Conan Doyle Estate says it holds trademark and common-law rights in the name and image of Sherlock Holmes, and in 2020 it sued Netflix over Enola Holmes; the case was settled. I haven't searched the UK IPO register. Any name or image from this direction needs that search first, and the deerstalker, pipe and the name "Sherlock" are left out.

### Names

The name brainstorm and the decision (Snuffle) are on the [Brand page](brand.md).
## Palettes

Each palette has a tint (the iOS key colour for interactive elements, and the Material 3 primary), a secondary and a tertiary, and four status colours for the Requests list. The light value is used on white and system grouped backgrounds, the dark value on black and #1C1C1E.

| Palette | Tint (light / dark) | Secondary | Tertiary | Tint as text on white | Tint as text on black |
| --- | --- | --- | --- | --- | --- |
| Pillar and park | Park green #1C7350 / #5FCB98 | Pillar red #C42F43 / #FF8590 | Butter #F3CB4F | 5.81:1 | 10.48:1 |
| Awning | Cobalt #2B54C4 / #94B1FF | Marmalade #E5782A / #FFB070 | Mint #6FCDA2 / #8FE0BA | 6.63:1 | 9.99:1 |
| Tiles | Tile teal #0D6A70 / #5EC8CB | Rose #E0607B / #FF9EB2 | Ochre #D9A535 / #F0C45E | 6.34:1 | 10.60:1 |

| Status | Pillar and park | Awning | Tiles |
| --- | --- | --- | --- |
| Searching (ring) | #B98A0C / #F3CB4F | #2E9A6C / #8FE0BA | #B7861C / #F0C45E |
| Needs you | #C42F43 / #FF8590 | #D2671A / #FFB070 | #D4506D / #FF9EB2 |
| In progress | #1C7350 / #5FCB98 | #2B54C4 / #94B1FF | #0D6A70 / #5EC8CB |
| Done | #8E8E93 | #8E8E93 | #8E8E93 |

Every status dot is at least 3:1 against its background, which WCAG asks of non-text graphics. Searching is a ring and the others are filled dots, so the state doesn't depend on colour alone.

For Material 3, each brand colour seeds its own tonal palette, so secondary and tertiary keep their hue instead of being derived from the primary: tone 40 and 90 for light, 80 and 30 for dark, and a neutral surface from the tint's hue at low chroma. Each role passes 6.4:1 or more against its "on" colour. The canvas shows the values.

## Sources

- shadcn/ui: Theming: https://ui.shadcn.com/docs/theming
- Tailwind CSS: Colors: https://tailwindcss.com/docs/colors
- Radix Colors: Understanding the scale: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- Radix Colors: Composing a palette: https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette
- Evil Martians: OKLCH in CSS, why we moved from RGB and HSL: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- Evil Martians: Harmony palette (GitHub): https://github.com/evilmartians/harmony
- tweakcn (GitHub): https://github.com/jnsahaj/tweakcn
- Material Color Utilities (GitHub): https://github.com/material-foundation/material-color-utilities
- WCAG 2.2 Understanding 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG 2.2 Understanding 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Etymonline, "terrier": https://www.etymonline.com/word/terrier
- Merriam-Webster, "terrier": https://www.merriam-webster.com/dictionary/terrier
- Staffordshire Bull Terrier (Wikipedia): https://en.wikipedia.org/wiki/Staffordshire_Bull_Terrier
- Oxford Learner's Dictionaries, "ferret out": https://www.oxfordlearnersdictionaries.com/definition/english/ferret-out
- Baker Street Irregulars (Wikipedia): https://en.wikipedia.org/wiki/Baker_Street_Irregulars
- Klinger v. Conan Doyle Estate (Wikipedia): https://en.wikipedia.org/wiki/Klinger_v._Conan_Doyle_Estate,_Ltd.
- Conan Doyle Estate, trademarks and copyrights: https://conandoyleestate.com/licensing/trademarks-and-copyrights
- Enola Holmes lawsuit dismissed (Copyright Lately): https://copyrightlately.com/enola-holmes-copyright-lawsuit-dismissed
- Oxford Learner's Dictionaries, "nip": https://www.oxfordlearnersdictionaries.com/definition/english/nip_1
- Britannica Dictionary, "nip": https://www.britannica.com/dictionary/nip
- Vocabulary.com, "Nip": https://www.vocabulary.com/dictionary/Nip
- Babita Sharma, The Corner Shop: https://www.johnmurraypress.co.uk/titles/babita-sharma/the-corner-shop/9781473673229
- Shopping parade (Wikipedia): https://en.wikipedia.org/wiki/Shopping_parade
- Shop signs (Designing Buildings): https://www.designingbuildings.co.uk/wiki/Shop_signs
- Medway shopfront advertising guide: https://www.medway.gov.uk/download/downloads/id/2328/shopfront_advertising_guide_2015.pdf
- Costermonger (Wikipedia): https://en.wikipedia.org/wiki/Costermonger
- Apple Human Interface Guidelines, color: https://developer.apple.com/design/human-interface-guidelines/color
- Material 3, color roles: https://m3.material.io/styles/color/roles
- WCAG 2.2, contrast (minimum) and non-text contrast: https://www.w3.org/TR/WCAG22/#contrast-minimum

The Mobbin captures (Duolingo, Headspace, Monzo, Too Good To Go, Citymapper, Deliveroo, Finch, Airbnb, Cash App) stay outside the public repo because they are third-party screens.
