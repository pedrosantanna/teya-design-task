# Colour

Biscuit grey is the neutral in light mode and Stone, the same grey at 45% of its chroma, in dark mode. Pastel parade with Indigo supplies the accents. Each colour has one job: Indigo is the shopper acting, Lavender is Snuffle speaking, and the warm pastels are the shops. Surfaces separate by lightness, and borders are used only where a surface still needs one.

```summary
Takeaways:
- Light mode: background #EEE9E2 (OKLCH L 0.935), white cards at 1.21:1 on it, muted #E5E2DE for tonal buttons on cards. An unselected chip sits a level below the selected one, which is Card with Indigo 800 text and edge.
- Dark mode: background #0E0B09, cards #282523 (1.29:1), muted #353230. These are Stone steps: Biscuit grey at 45% of its chroma, so the dark reads as a calm warm grey and not as brown.
- Indigo #3D35B8 is the shopper acting: the one filled commit button in view, links, the tint and the shopper's bubbles. In dark mode it steps up to Indigo 300 with black text.
- Every shop has one accent for good, chosen by its kind: Peach, Pistachio or Butter. Its tile step (OKLCH L 0.87, C 0.07, Butter C 0.09; dark L 0.36, C 0.08 with the hues spread apart, and a calmer Butter at L 0.34, C 0.05) sits at 1.20 to 1.26:1 on the light background and fills the placeholder tile, the category card, the whole shop page and the receipt header. On the shop page it is the ground under every section, with Card rows on it under the delicate shadow; Foreground stays at 10.1:1 or more on every tile and Muted foreground at 4.6:1 or more, light and dark.
- Lavender is Snuffle and no shop uses it: its bubbles (the Lavender tile step, #D7CCFE), the typing dots and the Live Activity. Chats sit on a neutral ground: white in light mode, the Background in dark.
- Semantic roles come from the same ramps: destructive is iOS red darkened to carry a white label (6.06:1), warning is Butter, success is Pistachio, and Increase Contrast gives every card a 1 px border at 3.4:1 or more.
Call:
- I asked to keep Oat and Brew, explore accents and warm greys around them, and make pure black and white work with all of it. I chose Biscuit grey as the neutral (decision 034).
- I chose Pastel parade with Indigo in both modes and asked for surfaces without borders and more contrast between them (decision 036).
- I asked for a little more colour in the light background, then kept round 8's chroma at L 0.96 (round 9), and asked for the palette to be recorded here.
- A brand review found Indigo doing all the work, the pastels only in small badges and surfaces that read as stock iOS. I approved a shop accent per shop, Lavender for Snuffle, at most one filled Indigo control per viewport and a darker background (#EEE9E2) with a raised dark card (decision 045).
- In this round a craft review measured the pastel tiles at 1.01 to 1.04:1 on the background. I asked for a tile step that shows, for the calm chat direction the research recommended (neutral ground, no purple tint or glow), for a sheet ground in dark mode and for selection to stop using grey fills and black chips (change craft-pass-2).
- I asked for one treatment for every sheet: the same glass, one tone darker than the Background in light mode and one step off it in dark, with what sits on a sheet moved one level up so it still separates. I kept the dark sheet at #191715.
- With Biscuit's full chroma the dark mode read brown. I chose round 8's "less colour" column for it, named Stone, for a more neutral dark mode; light mode keeps Biscuit (decision 048).
- After a fourth visual critique I asked for the selected chip to be Card with Indigo text and edge, the unselected ones a level down, the iOS segmented control, and one scrim behind every sheet (Foreground at 20% in light, black at 48% in dark).
- On the dark Category screen the Card rows were darker than the tile and read as holes. I chose to keep the full colour as the ground and make the rows a tinted card lighter than it, over a dark ground with a fading band (decision 050).
- After another visual critique and a screen review of the web build, I asked for their fixes: a quieter dark grabber, a segmented track that shows on the light sheet, dark chips on the Background that don't match the selected one, the Category header's count in the same colour as the rows' meta, and a dark Back on a tile without the extra saturation and halo.
AI:
- An agent built the ramps in OKLCH, drew the rounds on the identity board and measured every pair below. I chose the palette, the neutral and the background step.
- An agent proposed the semantic roles from the existing ramps and computed their contrasts with a script using the WCAG 2 formula. I asked for the set and for iOS red to be adapted to the palette.
- An agent ran the brand review on the prototype, then added the accent and Snuffle tokens, recomputed every pair below for all four hues and applied the roles in the app. I set which step each token takes.
- An agent ran the craft review, proposed the tile step's lightness and chroma, re-rendered the category stills on it, and measured every changed pair with a script using the WCAG 2 formula.
- A second visual critique by an agent found the dark tiles collapsing into one olive, the light Butter reading as a highlighter and the selected chip weaker than the white ones. Another agent spread the dark hues with more chroma, moved light Butter to a cleaner yellow, added a 1 pt edge to the selected chip, re-rendered the category stills and recomputed the table below.
- An agent added the Stone ramp, pointed the dark surfaces and text at it, re-rendered the dark illustrations and the dark map fallback, and recomputed every dark pair on this page with the WCAG 2 script.
- A third visual critique by an agent found the dark Butter tile reading khaki-brown, with Card rows on it looking dirty and Muted buttons almost gone (1.17:1). Another agent lowered dark Butter to L 0.34, C 0.05, gave tonal buttons on a tile a white overlay, raised the inactive page dots to 35% and recomputed the pairs below.
- An agent computed the sheet tones and their contrasts with the WCAG 2 script, chose L 0.89 for the light sheet (L 0.90 to 0.91 gave only 1.09 to 1.12:1), moved rows, fields and the segmented track up a level and checked them rendered in light and dark.
- An agent computed the dark tinted cards for the Category rows (OKLCH L 0.44, C 0.03 at each accent's hue), found Muted foreground at 3.35 to 3.42:1 on them, added Stone 840 for the secondary text there and measured every new pair with the WCAG 2 script.
- An agent found the dark Butter stills baked on a stale tile (#4C3B01 against the #423717 token), made the illustration pipeline read the tile colours from the tokens and fail when a still's corner differs, re-rendered the category stills and measured the new chip, segmented control, sheet and glass pairs.
- An agent added `color.grabber` (Stone 445 in dark, 2.49:1 on the sheet), moved the light segmented track to Border, gave dark chips on the Background a Border edge, added the on-tile glass values and measured each new pair with the WCAG 2 script.
Trade-offs:
- Muted #E5E2DE on the new background is 1.07:1, so it can't mark a chip there; chips moved to the card colour, and Muted is only used on cards.
- The dark sheet is 1.10:1 on the Background, under the 1.15:1 aimed for: lighter sheets push Card and Muted rows closer to it. The rim's highlight marks its top edge instead.
- With a pastel per shop, the shop's colour carries no meaning beyond recognition; status and actions keep their own colours, so a Peach tile never reads as a warning.
- The typing dots in Lavender 500 on Lavender 100 are 2.72:1. They are decorative (VoiceOver reads "Snuffle is writing"), so I kept the lighter step.
- Muted text on the dark tile step is 4.58 to 5.08:1: it passes AA, but less comfortably than in light mode (5.00:1 or more). More chroma in dark cost a little of it (Pistachio went from 4.64 to 4.59:1).
- A white chat ground puts Card surfaces on Card, so cards and grouped rows in a chat need an edge (a hairline and a soft shadow) that they don't need elsewhere.
```

## Surfaces

Light mode uses the Biscuit grey hue path, warm at the light end and a little more yellow at the dark end. Dark mode uses Stone, the same lightness steps and hue at 45% of Biscuit's chroma (`stone.*` in the primitives). Values are OKLCH lightness steps converted to hex.

### Light

```swatches
Background | #EEE9E2 | L 0.935, biscuit.940
Card | #FFFFFF | L 1.00, cards and chips
Muted | #E5E2DE | L 0.915, tonal buttons and the stepper on cards
Muted foreground | #59534D | L 0.445, secondary text
Foreground | #100A06 | L 0.15, text
Sheet | #DEDAD5 | L 0.89, every sheet's ground, 1.15:1 under the Background
```

### Dark

```swatches
Background | #0E0B09 | L 0.15, stone.150
Card | #282523 | L 0.265, cards and chips
Muted | #353230 | L 0.32, tonal buttons and the stepper on cards
Muted foreground | #AEAAA6 | L 0.74, secondary text
Foreground | #FBFAF8 | L 0.985, text
Sheet | #191715 | L 0.20, every sheet's ground; rows on it take Muted (1.40:1)
Muted foreground on tile | #CECAC6 | L 0.84, stone.840, secondary text on the Category rows (4.74:1 or more)
```

Every sheet has the same ground, one tone off the Background: darker in light mode, lighter in dark. What sits on a sheet moves one level up: rows and fields are Card in light mode (1.39:1 on the sheet) and Muted in dark (1.40:1), where Card would be 1.17:1; so are the header's Close and Confirm in dark. Chips and the segmented control follow their own rule (a level below the selected one); the segmented track is Border in light (1.10:1 on the sheet, with the white thumb 1.53:1 on it; Muted was 1.08:1 and the thumb 1.29:1). The grabber is `color.grabber`: Muted foreground at 38% in light (1.72:1), Stone 445 #5A5754 in dark (2.49:1), a solid colour quieter than the title; Muted foreground at 38% rendered #514F4C there (2.19:1), a translucent grey that depended on what was under it. Behind every sheet is one scrim, `sheetScrim`: Foreground at 20% in light, black at 48% in dark. Text on the sheet: Foreground 14.13:1 and Muted foreground 5.45:1 in light, 17.14:1 and 7.75:1 in dark. In dark the sheet is 1.10:1 on the Background, under the 1.15 I aimed for; I kept #191715, and the glass rim's highlight marks its top edge. A chat's ground is Card in light mode and the Background in dark (see Snuffle below).

## Accents

Each accent is a ten-step ramp built in OKLCH from its base colour. The base sits at 800 for Indigo and at 100 to 300 for the pale colours.

### Indigo

```swatches
50 | #F4F6FF
100 | #E8ECFF
200 | #D1D8FF
300 | #B5BFFF
400 | #96A2FF
500 | #7982FF
600 | #5F63E8
700 | #494AC0
800 | #3D35B8 | base
900 | #222169
```

### Peach

```swatches
50 | #FDF5F2
100 | #F9E9E4
200 | #F2D3C9
300 | #FFB59E | base
400 | #D69B88
500 | #C17F6B
600 | #A6634E
700 | #864B39
800 | #663627
900 | #462318
```

### Pistachio

```swatches
50 | #F5F8F1
100 | #E9F0E1
200 | #C9EBA2 | base
300 | #B8CDA1
400 | #9BB57C
500 | #809E5C
600 | #65833E
700 | #4D682A
800 | #384D1A
900 | #24340E
```

### Butter

```swatches
50 | #F9F7F0
100 | #FFE7A0 | base
200 | #E4DAC0
300 | #D2C49A
400 | #BCAA73
500 | #A69050
600 | #8B752F
700 | #6F5C1A
800 | #53430D
900 | #382C04
```

### Lavender

```swatches
50 | #F7F6FD
100 | #EDEBF8
200 | #DCD6F1
300 | #CDBDFF | base
400 | #AEA2D6
500 | #9687C3
600 | #7C6CA8
700 | #625388
800 | #483C67
900 | #302747
```

## Roles

| Role | Light | Dark | Where |
| --- | --- | --- | --- |
| Primary | Indigo 800 #3D35B8, white text | Indigo 300 #B5BFFF, black text | The one filled commit button in view (Buy, Ask), the composer's send, the shopper's bubbles |
| Tint | Indigo 800 | Indigo 300 | Links, text buttons, icons that act. The Requests button's icon is Foreground: the count beside it carries the Indigo |
| Tonal button | Muted fill, Foreground text | Muted fill, Foreground text | Secondary actions: Call, Directions on the shop page, Buy on answers that aren't the best |
| Selected filter chip (`chipOn`) | Card fill, Indigo 800 text in semibold (8.75:1), a 1.5 pt Indigo 800 edge (7.25:1 on the Background) | Card fill, Indigo 300 text (8.60:1), a 1 pt Indigo 300 edge | Active filter and the place and deadline chips. The Indigo 100 fill it replaced was 1.03:1 on the Background, lighter than the white chips beside it |
| Tonal selection (`chipSelected`) | Indigo 100 fill, Indigo 800 text in semibold (7.45:1), a 1 pt Indigo 200 edge (`chipSelectedEdge`) | Indigo 900 fill, Indigo 200 text (10.06:1), a 1 pt Indigo 800 edge | The current step on an order card, the rating sheet's thumbs, Android's segmented control and snackbar action |
| Selected row | The row keeps its fill; a tick and the title in Headline | The same | One choice in a list: the place in the location sheet, collect or delivery in the details sheet |
| Count (`count`) | Indigo 800, white text (8.75:1), a 2 pt ring in the Background | The same | The Requests button and unread answers |
| Badge on a photo | Accent 100 fill, 800 text, 500 dot | The light values | Promoted (Pistachio), New (Peach), Delivers (Butter) |
| Badge on a wash | Card fill, Foreground text | Card fill, Foreground text | The shop page, where a pastel badge would sit on a pastel |
| Map ground | Butter 50 | Card #282523 | Map placeholder behind pins |

`filterSelected` (Foreground fill) is no longer used: a black selected chip was the heaviest mark on Nearby, so selection went back to tonal Indigo. Badges keep their light values in dark mode because they sit on photos, which don't change with the theme.

Primary fills at most one control per viewport, the commit action; the composer's send and the shopper's bubbles share the colour without counting as that button ([screen review](screen-review.md), checks 8 and 19).

In dark mode the map ground was Butter 900, which read as mustard behind the pins. It is #282523, the Stone step of the dark card.

## Shop accents

Each shop has one accent for good, chosen by its kind (`store/kinds.ts`), so it looks the same on Nearby, in the chat, on its page and on the receipt. Bakeries, hardware, newsagents, books, bags and gifts are Butter; cafés and delis, cameras, toys, butchers and fashion are Peach; opticians, florists, chemists and stationery are Pistachio. No shop is Lavender, which is Snuffle's.

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `shop.accent.<hue>.tile` | Tile step: Peach #FEC5B2, Pistachio #C5DEAE, Butter #E7D48F, Lavender #D7CCFE | Peach #602C1C, Pistachio #2A4618, Butter #423717, Lavender #3F3659 | The placeholder tile, the category card and the Category header, the shop page, tinted in full (the card's ground behind every section, and the pinned bar's scroll edge), the receipt header |
| `shop.accent.<hue>.wash` | 100 | 900 | The light stripes of the awning band on the placeholder tile |
| `shop.accent.<hue>.ink` | 800 | 200 | Initials and the dark awning stripes on the tile |
| `shop.accent.<hue>.cardOnTile` | Card (white) | Peach #624D47, Pistachio #4B5646, Butter #595240, Lavender #534F62 | The shop rows on the Category screen |
| `mutedForegroundOnTile` | Muted foreground | Stone 840, #CECAC6 | The rows' meta line and chevron on the Category screen |

The 100 steps sat at L 0.95 to 0.97, on a background at L 0.935, and measured 1.01 to 1.04:1 against it, so a tile read as the background. The tile step is set by lightness: OKLCH L 0.87 and C 0.07 at each hue's angle in light mode, with Butter at C 0.09 and hue 95 so it reads as yellow and not as a highlighter. In dark mode it is L 0.36 and C 0.08, and the hues are spread so the three shop colours don't collapse into one olive: Peach at 38, Butter at 90 and Pistachio at 135. Butter is calmer than the other two, at L 0.34 and C 0.05: at L 0.36 and C 0.073 (#4C3B01) it read khaki-brown, and the Stone Card rows on it looked dirty. Lavender stays at L 0.36, C 0.06. The receipt no longer has a 4 pt ink band.

Contrast on the tile step, light / dark:

| Hue | Tile on background | Foreground | Muted foreground | Indigo 800 / 300 | Ink on tile |
| --- | --- | --- | --- | --- | --- |
| Peach | 1.26:1 / 1.75:1 | 12.96:1 / 10.74:1 | 5.00:1 / 4.86:1 | 5.77:1 / 6.33:1 | 6.52:1 / 7.97:1 |
| Pistachio | 1.20:1 / 1.86:1 | 13.51:1 / 10.13:1 | 5.21:1 / 4.58:1 | 6.01:1 / 5.97:1 | 6.43:1 / 7.99:1 |
| Butter | 1.22:1 / 1.67:1 | 13.31:1 / 11.24:1 | 5.13:1 / 5.08:1 | 5.92:1 / 6.62:1 | 6.53:1 / 8.43:1 |
| Lavender | 1.25:1 / 1.76:1 | 13.07:1 / 10.69:1 | 5.04:1 / 4.83:1 | 5.82:1 / 6.30:1 | 6.59:1 / 7.93:1 |

Every text pair passes AA. Foreground passes AAA; muted text and Indigo don't.

On the shop page the rows sit on the tile as Card: white on the light tiles (1.45 to 1.52:1) and Stone #282523 on the dark ones (Peach 1.36:1, Pistachio 1.44:1, Butter 1.30:1), lifted by the delicate shadow. Tonal buttons on a tile don't take Muted, a grey capsule that measured 1.13 to 1.17:1 in light and 1.08 to 1.20:1 in dark and looked like a stain on the hue. They take `color.tonalOnTile` (white) at `state.tonalOnTile`: 40% in light (1.17 to 1.18:1 on the tile, Foreground on it 15.33:1 or more) and 6% in dark (1.19 to 1.20:1, Foreground 8.50:1 or more). Screens put the buttons in `<Ground value="tile">`.

### Rows on the Category screen

In dark mode the Category screen keeps the full tile as its ground, and Card rows on it (#282523) were darker than the tile, so they read as holes in the colour. The rows take `shop.accent.<hue>.cardOnTile` instead: OKLCH L 0.44, C 0.03 at the accent's hue, lighter than the tile and much less saturated, so the list lifts off the colour without competing with it. Light mode keeps white Card rows. The screen names its accent with `<Ground value="tile" accent>`, and `ShopRow` reads it.

Muted foreground (Stone 740) measured 3.35 to 3.42:1 on the new cards, under AA. Lowering the card doesn't fix it: at the 1.2:1 the card needs over the tile, Stone 740 is still about 3.9:1. The meta line and the chevron take `mutedForegroundOnTile` instead, Stone 840 (#CECAC6, Stone 740's hue and chroma at L 0.84). Dark values:

| Hue | Card on tile | Card vs tile | Foreground | Muted foreground on tile (Stone 840) | Stone 740, for reference | Separator | Card #282523 vs tile, before |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Peach | #624D47 | 1.43:1 | 7.53:1 | 4.82:1 | 3.41:1 | 1.62:1 | 1.36:1, darker |
| Pistachio | #4B5646 | 1.37:1 | 7.40:1 | 4.74:1 | 3.35:1 | 1.65:1 | 1.44:1, darker |
| Butter | #595240 | 1.51:1 | 7.44:1 | 4.76:1 | 3.36:1 | 1.64:1 | 1.30:1, darker |
| Lavender | #534F62 | 1.41:1 | 7.56:1 | 4.84:1 | 3.42:1 | 1.61:1 | 1.37:1, darker |

Every card is lighter than its tile by 1.37:1 or more. The street chips and Back keep the `tonalOnTile` overlay. The selected chip stays Card with Indigo 300 text (8.60:1): on the tinted card Indigo 300 would be 4.36 to 4.45:1, under AA. The shop page's rows are unchanged; it still puts Card rows on the tile.

## Snuffle

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `snuffle.bubble` | Lavender tile step #D7CCFE | Lavender 900 #302747 | Snuffle's bubbles, the typing indicator, the Live Activity's track |
| `snuffle.dot` | Lavender 500 | Lavender 400 | Typing dots, the Live Activity's progress |
| `chat.ground` | Card #FFFFFF | Background #0E0B09 | The ground of New Request and every chat |
| `chat.fill` | Background #EEE9E2 | Card #282523 | Chips and grouped rows on the chat ground |
| `chat.edge` | #DEDAD5 | #282523 | A hairline round cards on the chat ground, with the delicate shadow |

The bubble is 1.50:1 on the white chat ground and 1.41:1 on the dark one; text on it is 13.07:1 and 13.36:1. The chat has no purple tint, gradient or glow ([Identity](../ideation/identity.md) rules out purple gradients): Lavender appears only in Snuffle's bubbles. The mark is the bare glyph in Foreground (see [Mark](mark.md)); the tokens that drew it on a Lavender tile with a Butter face are gone.

The delicate card shadow is two layers of Foreground (light): 0 1 2 at 4% and 0 4 12 at 5%. It lifts Card rows off a same-coloured ground (the shop page) and cards off the white chat ground.

## Semantic roles

Each role reuses a ramp or the grey path (Biscuit in light mode, Stone in dark). Contrast is measured with the WCAG 2 formula against the background (#EEE9E2 or #0E0B09) and the card (#FFFFFF or #282523).

| Role | Light | Dark | Contrast, light / dark | Where |
| --- | --- | --- | --- | --- |
| Border | #D4D0CB, L 0.86 | #403D3A, L 0.36 | 1.27:1 on background, 1.53:1 on card / 1.82:1, 1.41:1 | A card on a busy area, text fields |
| Separator | #DEDAD5, L 0.89 | #353230, L 0.32 | 1.15:1, 1.39:1 / 1.54:1, 1.20:1 | 1 px lines between rows of a list, inset to the text |
| Border, Increase Contrast | #857F79, L 0.60 | #74716D, L 0.55 | 3.28:1, 3.96:1 / 4.04:1, 3.14:1 | Every card, bubble and field gets a 1 px border when Increase Contrast (iOS) or high-contrast text (Android) is on |
| Destructive | #BA2B28 fill, white label | #F07F77 fill, black label | Label 6.06:1 / 8.01:1; as text, 5.02:1 on background, 6.06:1 on card / 7.48:1, 5.81:1 | Cancel for a refund, and any action that can't be undone |
| Warning | Butter 700 #6F5C1A | Butter 300 #D2C49A | 5.40:1, 6.52:1 / 11.31:1, 8.78:1 | The warning icon on "Not confirmed · not charged" and "Sold · not charged" |
| Success | Pistachio 700 #4D682A | Pistachio 300 #B8CDA1 | 5.22:1, 6.31:1 / 11.48:1, 8.91:1 | The check icon on Ready, Paid and Collected |
| Scrim | Black at 40% | Black at 40% | Not text | Behind custom sheets and dialogs; a 0 to 40% gradient under badges or glass buttons on a photo |
| Disabled | Content: foreground at 38% (#8D8884) on a container of foreground at 12% (#D9D5D1) | Content #797876 on container #2A2826 | 2.40:1 / 3.33:1 | Buttons and fields that can't be used yet |

Destructive starts from iOS system red. #FF3B30 carries a white label at only 3.55:1, so it was moved in OKLCH to L 0.52 at hue 27, which keeps it red next to Peach and passes 4.5:1. In dark mode it follows Indigo: a light fill with a black label. Warning and success sit in the Butter and Pistachio ramps that the badges already use, and always come with an icon and a label, never colour alone.

Disabled content is exempt from the WCAG 1.4.3 minimum, as inactive controls are; the values on a card are #92908E on #E2E2E1 in light mode and #888684 on #413F3D in dark. With only the scrim, white text over a white photo would be 2.85:1, so text never sits on a photo with the scrim alone; badges carry their own fill.

## Getting started

Getting started is the one place where Indigo fills the screen. Each of its three pages is full bleed on its own step of the ramp, and the step deepens page by page, so the pages read as one run that moves toward the commit colour. Dark mode runs the ramp the other way, from the darkest step up. While the shopper drags, the ground blends from one step to the next under the finger.

| Page | Light ground | Foreground on it | Dark ground | Foreground on it |
| --- | --- | --- | --- | --- |
| 1, Ask for anything nearby | Indigo 300 #B5BFFF | 11.11:1 | Indigo 900 #222169 | 13.52:1 |
| 2, Snuffle asks the shops for you | Indigo 400 #96A2FF | 8.34:1 | Indigo 800 #3D35B8 | 8.39:1 |
| 3, Buy, then collect when it suits you | Indigo 500 #7982FF | 6.04:1 | Indigo 700 #494AC0 | 6.66:1 |

Title, body, Skip and the current page dot are Foreground (#100A06 in light, #FBFAF8 in dark). Muted text would drop under 4.5:1 on these steps, so the body is Foreground too and the type styles carry the hierarchy. Continue is a Foreground capsule with a Background label (16.28:1 in light, 18.81:1 in dark), so it stands out from every step. The other dots are Foreground at 35% (`state.pageDotOff`) and take the ground's tint: 1.93 to 2.16:1 on the light steps and 2.15 to 2.90:1 on the dark ones, with the current dot 3.10:1 or more against them. At 30% they measured 1.75 to 2.49:1 and were hard to find on Indigo 500 and 700. The tokens are `color.welcome.ground1` to `ground3`. White text on Indigo 500 would be 3.26:1 and Indigo 900 text 4.33:1, which is why page 3 stops at 500 in light mode.

## Contrast

| Pair | Light | Dark |
| --- | --- | --- |
| Text on background | 16.28:1 | 18.81:1 |
| Muted text on background | 6.28:1 | 8.50:1 |
| Muted text on card | 7.58:1 | 6.60:1 |
| Card on background | 1.21:1 | 1.29:1 |
| Primary label on primary | 8.75:1 | 11.11:1 |
| Tint on background | 7.25:1 | 11.08:1 |
| Selected chip text on its Card fill | 8.75:1 | 8.60:1 |
| Tonal selection text on its fill | 7.45:1 | 10.06:1 |
| Badge text on its fill | 7.45 to 8.42:1 | 7.45 to 8.42:1 (light values) |
| Snuffle's bubble on the chat ground | 1.50:1 | 1.41:1 |
| Sheet on background | 1.15:1 | 1.10:1 |
| Rows on the sheet (Card light, Muted dark) | 1.39:1 | 1.40:1 |
| Text on the sheet | 14.13:1 | 17.14:1 |
| Muted text on the sheet | 5.45:1 | 7.75:1 |

Every text pair passes WCAG AA. All but muted text on a muted surface (5.87:1 light, 5.51:1 dark), muted text on the light background (6.28:1) and the destructive, warning and success colours on the light background (5.02 to 5.40:1) pass AAA. The Increase Contrast border passes the 3:1 that WCAG 1.4.11 asks of a component's boundary (3.28:1 and 3.14:1 at the lowest). Surface pairs aren't text and have no WCAG minimum; 1.21:1 is the card step on the new background, up from 1.13:1.

## Sources

- [Identity](../ideation/identity.md), rounds 5 to 9 on the board.
- Decisions 034, 036, 045 and 048 in the [decision log](../../decision-log.md); OpenSpec change `craft-pass-2`.
