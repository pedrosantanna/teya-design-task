# Colour

Biscuit grey is the neutral in light mode and Stone, the same lightness steps at hue 270 and about a fifth of its chroma, in dark mode. Pastel parade with Indigo supplies the accents. Each colour has one job: Indigo is the shopper acting, Lavender is Snuffle speaking, and the warm pastels are the shops. Surfaces separate by lightness, and borders are used only where a surface still needs one.

```summary
Takeaways:
- Light mode: background #EEE9E2 (OKLCH L 0.935), white cards at 1.21:1 on it, muted #E5E2DE for tonal buttons on cards. An unselected chip sits a level below the selected one, which is Card with Indigo 800 text and edge.
- Dark mode: background #0B0C0D, cards #252627 (1.29:1), muted #323334. These are Stone steps: Biscuit's lightness steps at hue 270 and about a fifth of its chroma, so the dark reads as a plain cool grey and the warm tiles stand out on it.
- Indigo #3D35B8 is the shopper acting: the one filled commit button in view, links, the tint and the shopper's bubbles. In dark mode it steps up to Indigo 300 with black text.
- Every shop has one accent for good, chosen by its kind: Peach, Pistachio or Butter. Its tile step (OKLCH L 0.87, C 0.07, Butter C 0.09) sits at 1.20 to 1.26:1 on the light background and fills the placeholder tile, the category card, the whole shop page and the receipt header. Since round 18 dark mode keeps the same pastel tile: text on it is ink (12.91:1 or more), and the cards, chips, Call, Directions and Back on it are a dark tint of its hue with light text (Foreground 8.35:1 or more). The tile is 12.91 to 13.46:1 from the dark background, so those screens glare.
- Lavender is Snuffle and no shop uses it: its bubbles (the Lavender tile step, #D7CCFE), the typing dots and the Live Activity. Chats sit on the Background in both modes (decision 059 reverses the white chat ground of craft-pass-2).
- Semantic roles come from the same ramps: destructive is iOS red darkened to carry a white label (6.06:1), warning is Butter, success is Pistachio, and Increase Contrast gives every card a 1 px border at 3.4:1 or more.
Call:
- I asked to keep Oat and Brew, explore accents and warm greys around them, and make pure black and white work with all of it. I chose Biscuit grey as the neutral (decision 034).
- I chose Pastel parade with Indigo in both modes and asked for surfaces without borders and more contrast between them (decision 036).
- I asked for a little more colour in the light background, then kept round 8's chroma at L 0.96 (round 9), and asked for the palette to be recorded here.
- A brand review found Indigo doing all the work, the pastels only in small badges and surfaces that read as stock iOS. I approved a shop accent per shop, Lavender for Snuffle, at most one filled Indigo control per viewport and a darker background (#EEE9E2) with a raised dark card (decision 045).
- In this round a craft review measured the pastel tiles at 1.01 to 1.04:1 on the background. I asked for a tile step that shows, for the calm chat direction the research recommended (neutral ground, no purple tint or glow), for a sheet ground in dark mode and for selection to stop using grey fills and black chips (change craft-pass-2).
- I asked for one treatment for every sheet: the same glass, one tone darker than the Background in light mode and one step off it in dark, with what sits on a sheet moved one level up so it still separates. I first kept the dark sheet at #171719, then moved it to #1C1D1E in round 10 to reach the 1.15:1 target.
- With Biscuit's full chroma the dark mode read brown. I chose round 8's "less colour" column for it, named Stone, for a more neutral dark mode; light mode keeps Biscuit (decision 048).
- After a fourth visual critique I asked for the selected chip to be Card with Indigo text and edge, the unselected ones a level down, the iOS segmented control, and one scrim behind every sheet (Foreground at 20% in light, black at 48% in dark).
- On the dark Category screen the Card rows were darker than the tile and read as holes. I chose to keep the full colour as the ground and make the rows a tinted card lighter than it, over a dark ground with a fading band (decision 050).
- After another visual critique and a screen review of the web build, I asked for their fixes: a quieter dark grabber, a segmented track that shows on the light sheet, dark chips on the Background that don't match the selected one, the Category header's count in the same colour as the rows' meta, and a dark Back on a tile without the extra saturation and halo.
- The dark accents looked ugly to me. I asked whether the light accents used unchanged in dark would work better and whether the dark neutral should be cooler and less saturated. I chose lower-chroma accents on a cooler neutral for dark mode, after comparing four options on the identity board (round 10).
- In round 10 I found the dark edges on chips and pills ugly and asked for colour and contrast to do that work, following Material 3's tonal containers and Apple's dark fills, with an edge only where a fill can't work.
- In round 10 I asked for the shop page's card to take the shop's colour again, in light and in dark, and for everything inside to be recoloured and measured, with Ask staying the one filled Indigo (decision 056, which reverses decision 055).
- Later I asked for one chip treatment on a row inside the shop card, a quiet neutral fill with no border and no tile colour, after the chips in the card's own colour read as holes.
- In round 18 I chose option 2, variation 4 from the identity board: the light tiles unchanged in dark, ink text on them, dark cards, chips, Call, Directions and Back with light text, and Ask in Indigo 800 with white. I asked for it to be built into the tokens and every changed pair measured.
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
- An agent found the dark Butter stills baked on a stale tile (#4C3B01 against the #403925 token), made the illustration pipeline read the tile colours from the tokens and fail when a still's corner differs, re-rendered the category stills and measured the new chip, segmented control, sheet and glass pairs.
- An agent added `color.grabber` (Stone 445 in dark, 2.49:1 on the sheet), moved the light segmented track to Border, gave dark chips on the Background a Border edge, added the on-tile glass values and measured each new pair with the WCAG 2 script.
- An agent built the four dark options on the identity board from the same four screens. After my choice it set the new Stone steps, the dark tile and row colours and the dark wash and ink at the reduced chroma, re-rendered the dark stills, clips and map fallback, and recomputed every dark pair on this page with the WCAG 2 script.
- An agent took the dark edges off chips and the "Needs you" pill, added the `tag` containers, Indigo 850 and 950 and the accent containers to the tokens, and measured each pair against its ground.
- An agent put the shop page card back on the accent tile, recoloured the rows, chips, review cards and buttons for it, added `successOnTile` and `warningOnTile` after the status word measured 4.16:1 on Peach, and measured every pair in light and dark.
- In round 12 an agent raised the chroma of the dark row cards 1.7 times, added Stone 880 for muted text on them, took the rating tags off `tag.fillRaised` on the tinted rows, deleted the unused accent `container` role and measured every changed pair.
- An agent added `tag.fillOnRow` and the Ratings panel on the Background, and measured each pair against the row and the tile in light and dark.
- In round 18 an agent built variation 4 into the tokens (the light tile in dark, `cardOnTile`, `chipOnCard`, `tonal`, the on-tile text roles and `borderOnTile`), made text follow the ground under it, with a `tileCard` ground inside a surface on a tile, worked out Lavender's card and chip, which the board didn't show, swapped the dark category stills for the light ones, and measured every changed pair with the WCAG 2 script.
- An agent replaced the grey `borderOnTile` with ground edges: a darker tone of each tile, and an edge step for Background, Card, Sheet and the chat, and measured each against its ground (1.27 to 1.41:1). After the visual review it moved the dark Background edge from Stone 305 (1.46:1) to Stone 265 (1.29:1), so the chat's line weighs the same in light and dark.
Trade-offs:
- Muted #E5E2DE on the new background is 1.07:1, so it can't mark a chip there; chips moved to the card colour, and Muted is only used on cards.
- The dark sheet is 1.09:1 on the Background, under the 1.15:1 aimed for: lighter sheets push Card and Muted rows closer to it. The rim's highlight marks its top edge instead.
- With a pastel per shop, the shop's colour carries no meaning beyond recognition; status and actions keep their own colours, so a Peach tile never reads as a warning.
- The typing dots in Lavender 500 on Lavender 100 are 2.72:1. They are decorative (VoiceOver reads "Snuffle is writing"), so I kept the lighter step.
- The pastel tile in dark is 12.91 to 13.46:1 from the Background: the shop page, the Category screen and the category cards are bright blocks on a dark screen, and the dark cards on the tile leave less text room than the other variations (Foreground 8.35 to 8.57:1, Stone 880 6.29 to 6.46:1).
- The chat sits on the Background like the rest of the app, so Card surfaces (answer and order cards, grouped rows, chips, the composer field) are white on beige (1.21:1) and keep their hairline and soft shadow.
```

## Surfaces

Light mode uses the Biscuit grey hue path, warm at the light end and a little more yellow at the dark end. Dark mode uses Stone, the same lightness steps at hue 270 and about a fifth of Biscuit's chroma: 45% of it in round 8, halved again in round 10 (`stone.*` in the primitives). Values are OKLCH lightness steps converted to hex.

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
Background | #0B0C0D | L 0.15, stone.150
Card | #252627 | L 0.265, cards and chips
Muted | #323334 | L 0.32, tonal buttons and the stepper on cards
Muted foreground | #AAABAD | L 0.74, secondary text
Foreground | #FAFAFB | L 0.985, text
Sheet | #1C1D1E | L 0.22, every sheet's ground; rows on it take Muted (1.33:1)
Muted foreground on tile | #DADBDD | L 0.89, stone.880, secondary text on the rows of a tile (5.50:1 or more)
```

Every sheet has the same ground, one tone off the Background: darker in light mode, lighter in dark. What sits on a sheet moves one level up: rows and fields are Card in light mode (1.39:1 on the sheet) and Muted in dark (1.33:1), where Card would be 1.11:1; so are the header's Close and Confirm in dark. Chips and the segmented control follow their own rule (a level below the selected one); the segmented track is Border in light (1.10:1 on the sheet, with the white thumb 1.53:1 on it; Muted was 1.08:1 and the thumb 1.29:1). The grabber is `color.grabber`: Muted foreground at 38% in light (1.72:1), Stone 445 #575859 in dark (2.37:1), a solid colour quieter than the title; Muted foreground at 38% rendered #514F4C on the previous Stone sheet (2.19:1), a translucent grey that depended on what was under it. Behind every sheet is one scrim, `sheetScrim`: Foreground at 20% in light, black at 48% in dark. Text on the sheet: Foreground 14.13:1 and Muted foreground 5.45:1 in light, 16.19:1 and 7.35:1 in dark. In dark the sheet is 1.16:1 on the Background, over the 1.15 I aimed for (it was 1.09:1 at #171719), and the glass rim's highlight still marks its top edge. A chat's ground is Card in light mode and the Background in dark (see Snuffle below).

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
| Selected filter chip (`chipOn`, `chipSelected*`) | Card fill, Indigo 800 text in semibold (8.75:1), a 1.5 pt Indigo 800 edge (7.25:1 on the Background) | No edge: Indigo 900 fill (1.39:1 on the Background), Indigo 850 on a sheet (1.49:1), Indigo 950 on a tile (1.41 to 1.51:1), with Indigo 200 text (8.06 to 11.56:1) | Active filter and the place and deadline chips. The Indigo 100 fill it replaced was 1.03:1 on the Background, lighter than the white chips beside it. In dark the Card fill with an Indigo 300 edge became a tonal container in round 10, see [Tags](tags.md#dark-containers) |
| Dark tag containers (`tag.fill`, `tag.fillRaised`, `tag.fillOnRow`) | Read in dark only; light keeps the ground with a 1 pt edge | Stone 320 (1.55:1 on the Background), Stone 360 (1.58:1 on the sheet, 1.41:1 on Card), and on a row of the shop page card `tag.fillOnRow`, the same Stone 360 (1.36 to 1.41:1) | Unselected chips and the "Needs you" pill, with no edge. Foreground on them is 8.00 to 12.14:1. The accent `container` role was 1.09 to 1.15:1 on the row card and is deleted; the shop page's chips and rating tags take `tag.fillOnRow` (Stone 360 in dark, the Background in light; 1.36 to 1.41:1 on the dark row, 1.21:1 on the light row). The full table by ground is in [Tags](tags.md#dark-containers) |
| Tonal selection (`chipSelected`) | Indigo 100 fill, Indigo 800 text in semibold (7.45:1), a 1 pt Indigo 200 edge (`chipSelectedEdge`) | Indigo 900 fill, Indigo 200 text (10.06:1), a 1 pt Indigo 800 edge | The current step on an order card, the rating sheet's thumbs, Android's segmented control and snackbar action |
| Selected row | The row keeps its fill; a tick and the title in Headline | The same | One choice in a list: the place in the location sheet, collect or delivery in the details sheet |
| Count (`count`) | Indigo 800, white text (8.75:1), a 2 pt ring in the Background | Indigo 300, black text (11.86:1), the same ring; Indigo 800 on the dark Background was 2.24:1 | The Requests button and unread answers |
| Badge on a photo | Accent 100 fill, 800 text, 500 dot | The light values | Promoted (Pistachio), New (Peach), Delivers (Butter) |
| Badge on a wash | Card fill, Foreground text | Card fill, Foreground text | Not used on the shop page since round 10: Delivers and New are fact groups on its facts line |
| Map ground (`mapGround`) | Biscuit 960 | Background #0B0C0D | The map's ground; the shop page's card is the shop's tile, 1.29 to 1.35:1 over it in light and 12.91 to 13.46:1 in dark |
| Map roads (`mapRoad`, `mapRoadMain`) | Biscuit 890, Biscuit 860 | Stone 265, Stone 320 | Streets and main roads, 1.24:1 and 1.36:1 on the ground in light, 1.29:1 and 1.55:1 in dark |
| Map buildings (`mapBuilding`) | Card (white) | Stone 200 | Extruded buildings, shaded by the extrusion light: 1.13:1 on the ground in light, 1.16:1 in dark |
| Map parks (`mapPark`) | Pistachio tile #C5DEAE | #222B1D | Parks, 1.29:1 on the ground in light, 1.33:1 in dark |
| Map water (`mapWater`) | #D6E4EE, a pale cool blue-grey | #1F2B34 | Water, 1.15:1 on the ground in light, 1.35:1 in dark |

`filterSelected` (Foreground fill) is no longer used: a black selected chip was the heaviest mark on Nearby, so selection went back to tonal Indigo. Badges keep their light values in dark mode because they sit on photos, which don't change with the theme.

Primary fills at most one control per viewport, the commit action; the composer's send and the shopper's bubbles share the colour without counting as that button ([screen review](screen-review.md), checks 8 and 19).

In dark mode the map ground was Butter 900, which read as mustard behind the pins, then the card's Stone step; the card sits on the map now, so the ground is the dark Background and the Sheet card separates from it.

## Shop accents

Each shop has one accent for good, chosen by its kind (`store/kinds.ts`), so it looks the same on Nearby, in the chat, on its page and on the receipt. Bakeries, hardware, newsagents, books, bags and gifts are Butter; cafés and delis, cameras, toys, butchers and fashion are Peach; opticians, florists, chemists and stationery are Pistachio. No shop is Lavender, which is Snuffle's.

Since round 18 the tile is the same light pastel in both modes (option 2, variation 4 on the [identity board](../ideation/identity.md)). In dark mode the text straight on it is ink, and what sits on it (cards, chips, Call, Directions, Back) is a dark tint of the tile's hue with light text.

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `shop.accent.<hue>.tile` | Tile step: Peach #FEC5B2, Pistachio #C5DEAE, Butter #E7D48F, Lavender #D7CCFE | The same | The placeholder tile, the category card and the Category header, the receipt header, the shop page's card |
| `shop.accent.<hue>.detail` | The tile step | The tile step | The map pin and the walking route on the shop page |
| `shop.accent.<hue>.onDetail` | Ink (800) | Stone 150 #0B0C0D | The pin's edge and dot: 6.4:1 to 6.5:1 on `detail` in light, 12.91:1 to 13.46:1 in dark |
| `shop.accent.<hue>.wash` | 100 | 100 | The light stripes of the awning band on the placeholder tile |
| `shop.accent.<hue>.ink` | 800 | 800 | Initials and the dark awning stripes on the tile |
| `shop.accent.<hue>.cardOnTile` | Card (white) | Peach #5A453E, Pistachio #454E3D, Butter #514A31, Lavender #4B475A | The shop rows on the Category screen, and the rows, the rating summary and review cards and the "What they sell" block on the shop page |
| `shop.accent.<hue>.chipOnCard` | `tag.fillOnRow` (the Background) | Peach #685853, Pistachio #585E52, Butter #615B4B, Lavender #5C5A66 | The "What they sell" chips and the rating tags on those cards |
| `shop.accent.<hue>.separatorOnCard` | Separator (Biscuit 890 #DEDAD5, 1.39:1 on the white card) | Peach #6C564F, Pistachio #565F4E, Butter #625B41, Lavender #5C586C: the card lifted to OKLCH L 0.47 with its hue and chroma kept, 1.30 to 1.31:1 on it | The dividers between rows inside those cards, so a line on a tinted card is a lighter tone of the card, never a grey Separator (near black on it) |
| `shop.accent.<hue>.tonal`, at `state.tonalOnTile` | White at 55% | `cardOnTile` at 100% | Call and Directions, the unselected street chips, Back on a tile and over the shop page's map, the "Needs you" pill on the receipt header |
| `foregroundOnTile` | Foreground | Stone 150 #0B0C0D (ink) | Text and icons straight on a tile: the shop's name, the section headings, the category label |
| `mutedForegroundOnTile` | Muted foreground | Stone 305 #2E2F30 (muted ink) | Secondary text straight on a tile: the facts line, the Category header's count, the footnotes, the map credit |
| `mutedForegroundOnTileCard` | Muted foreground | Stone 880 #DADBDD | The meta line and the chevron inside a card, row or chip on a tile |
| `primaryOnTile`, `onPrimaryOnTile` | Indigo 800, white | Indigo 800, white | Ask, links and plain buttons on a tile. Indigo 300, the dark Primary, is 1.17 to 1.22:1 on the pastel tile |
| `successOnTile`, `warningOnTile` | Success 800 #384D1A, Warning 800 #53430D | The same | The Open and Closes soon words straight on a tile. Success 700 measured 4.16:1 on Peach and Warning 700 4.30:1; the 800 steps are 6.17 to 6.63:1. Inside a card on the tile the words take Success and Warning (5.02:1 or more on the dark cards) |
| `shop.accent.<hue>.edge` | Peach #E6A691, Pistachio #A6C18B, Butter #CDB766, Lavender #BBAEE6 | The same | The hairline under a nav bar filled with the tile: the tile at OKLCH L 0.78 with its chroma kept, 1.35 to 1.36:1 on it. It replaces `borderOnTile` (Biscuit 860), a grey that measured 1.04:1 on Butter and read as a stain on the hue |

The components read these through the ground. Inside `<Ground value="tile" accent>`, `Text` and `Icon` map Foreground, Muted foreground, Primary, On primary, Success and Warning to their on-tile roles. A surface painted on the tile (a row, a card, a chip, a tonal button, Back) wraps its content in `OnTileSurface`, a `tileCard` ground where text keeps Foreground and secondary text takes `mutedForegroundOnTileCard`.

The 100 steps sat at L 0.95 to 0.97, on a background at L 0.935, and measured 1.01 to 1.04:1 against it, so a tile read as the background. The tile step is set by lightness: OKLCH L 0.87 and C 0.07 at each hue's angle, with Butter at C 0.09 and hue 95 so it reads as yellow and not as a highlighter. Until round 18 dark mode had its own tile at L 0.36 with a lower chroma (round 10, option 3); round 11 measured those tiles at C 0.034 to 0.045, with Butter and Pistachio 3.2 apart (ΔE OK × 100), so a shop page read as khaki, brown or forest grey. The dark cards are a solid stand-in for black at 90% over the tile, a deep tint of its hue at OKLCH L 0.41, and the chips are the card a step lighter (L 0.47, less chroma). The board showed Butter, Peach and Pistachio; Lavender's card and chip follow the same rule. The `tileDark`, `washDark`, `inkDark` and `cardOnTileDark` primitives of the earlier dark tiles stay in the ramps; only Getting started still uses one (Peach `tileDark`). The receipt no longer has a 4 pt ink band.

Contrast on the tile step, light / dark (in dark, Foreground is the ink and Muted foreground the muted ink):

| Hue | Tile on background | Foreground | Muted foreground | Indigo 800 | Ink (800) on tile |
| --- | --- | --- | --- | --- | --- |
| Peach | 1.26:1 / 12.91:1 | 12.96:1 / 12.91:1 | 5.00:1 / 8.84:1 | 5.77:1 / 5.77:1 | 6.52:1 / 6.52:1 |
| Pistachio | 1.20:1 / 13.46:1 | 13.51:1 / 13.46:1 | 5.21:1 / 9.22:1 | 6.01:1 / 6.01:1 | 6.43:1 / 6.43:1 |
| Butter | 1.22:1 / 13.25:1 | 13.31:1 / 13.25:1 | 5.13:1 / 9.08:1 | 5.92:1 / 5.92:1 | 6.53:1 / 6.53:1 |
| Lavender | 1.25:1 / 13.01:1 | 13.07:1 / 13.01:1 | 5.04:1 / 8.92:1 | 5.82:1 / 5.82:1 | 6.59:1 / 6.59:1 |

Every text pair passes AA. Foreground passes AAA; muted text and Indigo don't in light, and in dark the muted ink does too.

The cost is glare. The tile is 12.91 to 13.46:1 from the dark Background, so in dark mode the shop page, the Category screen, the Reviews screen and the category cards on Nearby are bright blocks on a dark screen. A shopper who picked dark mode for a dim room gets a mostly light screen on those pages. None of the option 2 variations on the board solves it.

On the shop page the card is the tile (round 10, decision 056, which reverses the neutral card of decision 055). It is 1.29 to 1.35:1 over the map in light and 12.91 to 13.46:1 in dark, so it needs no edge. The rows, the review cards and the "What they sell" block take `cardOnTile`: white in light (1.45 to 1.52:1 on the tile, lifted by the delicate shadow) and in dark the tile's deep tint (5.88 to 5.99:1 on the tile; Foreground 8.35 to 8.57:1, Stone 880 6.29 to 6.46:1, the separator 1.42 to 1.45:1). Every chip on those cards, the "What they sell" chips and the rating tags, takes `chipOnCard`, with no edge: the Background in light (1.21:1 on the white row, Foreground 16.28:1) and in dark the card a step lighter (1.30 to 1.32:1 on it, Foreground 6.42 to 6.48:1, the count in Stone 880 4.83 to 4.88:1). Tonal buttons on a tile don't take Muted, a grey capsule that measured 1.13 to 1.17:1 in light and looked like a stain on the hue. They take the accent's `tonal` at `state.tonalOnTile`: white at 55% in light (1.23 to 1.26:1 on the tile; 40% gave 1.17 to 1.18:1 and Call and Directions disappeared into the Butter tile; Foreground on it 15.33:1 or more) and in dark the solid card with light text. Back takes the same: glass over the map in light, and in dark the card (2.19 to 2.25:1 on the dark map ground, the glyph 8.35:1 or more). Ask stays the one filled Indigo, Indigo 800 with white text in both modes (5.77 to 6.01:1 on the tile, the text 8.75:1). The map pin is the tile with an ink dot and edge (12.91:1 or more), and the walking route is the tile's pastel cased in the Background (9.99:1 or more on the dark streets, 8.35:1 or more on the main roads). The whole card is inside `<Ground value="tile" accent>`, so the screen sets none of this.

### Rows on the Category screen

The Category screen keeps the whole tile as its ground. Before round 18 the dark tile was the darker colour, and Card rows on it (Stone #252627) read as holes in the colour, so the rows became a tint lighter than the tile (decision 050). Now the tile is the pastel and the rows take `shop.accent.<hue>.cardOnTile`, the tile's deep tint with light text, the same card as the shop page's. Light mode keeps white Card rows. The screen names its accent with `<Ground value="tile" accent>`, and `ShopRow` reads it. The header's count is muted ink on the tile; inside the rows the meta line and the chevron take `mutedForegroundOnTileCard` (Stone 880), and the Open word Success. Dark values:

| Hue | Card on tile | Card vs tile | Foreground | Stone 880 | Success (Pistachio 300) | Warning (Butter 300) | Separator |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Peach | #5A453E | 5.88:1 | 8.55:1 | 6.43:1 | 5.22:1 | 5.14:1 | 1.42:1 |
| Pistachio | #454E3D | 5.99:1 | 8.35:1 | 6.29:1 | 5.10:1 | 5.02:1 | 1.45:1 |
| Butter | #514A31 | 5.99:1 | 8.48:1 | 6.39:1 | 5.18:1 | 5.10:1 | 1.43:1 |
| Lavender | #4B475A | 5.94:1 | 8.57:1 | 6.46:1 | 5.23:1 | 5.15:1 | 1.42:1 |

The street chips and Back take the accent's `tonal`, the dark card with light text in dark. The selected chip stays Indigo 950 with Indigo 200 text (11.56:1), 10.68 to 11.14:1 from the pastel tile. The category stills were rendered for each mode's tile; with one tile in both modes, dark shows the light still and the dark stills are gone.

## Ground edges

The hairline under a top bar takes a tone of the ground the bar sits on, so a coloured page never gets a grey line. In light it is a darker step of the ground; on the dark neutrals, where nothing is darker, it is a lighter step of the same neutral. Each one is visible but quiet: between 1.27 and 1.41:1 on its ground.

| Token | Light | Dark | Ground |
| --- | --- | --- | --- |
| `groundEdge.background` | Biscuit 860, 1.27:1 | Stone 265, 1.29:1 | Background |
| `groundEdge.card` | Biscuit 890, 1.39:1 | Stone 360, 1.41:1 | Card |
| `groundEdge.sheet` | Biscuit 810 #C4C0BB, 1.30:1 | Stone 320, 1.33:1 | Sheet |
| `chat.groundEdge` | `groundEdge.background` | `groundEdge.background` | A chat's ground |
| `shop.accent.<hue>.edge` | 1.35 to 1.36:1 | The same | An accent tile (see Shop accents) |

`chat.edge` stays the hairline around cards and grouped rows on the chat ground. The nav bar reads the edge through `groundEdge()` in `internal/ScrollEdge.tsx`, from the same `fill` that colours the bar.

## Snuffle

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `snuffle.bubble` | Lavender tile step #D7CCFE | Lavender 900 #302747 | Snuffle's bubbles, the typing indicator, the Live Activity's track |
| `snuffle.dot` | Lavender 500 | Lavender 400 | Typing dots, the Live Activity's progress |
| `chat.ground` | Background #EEE9E2 | Background #0B0C0D | The ground of New Request and every chat |
| `chat.fill` | Card #FFFFFF | Card #252627 | Grouped rows on the chat ground, and chips in light; dark chips use `tag.fill` |
| `chat.edge` | #DEDAD5 | #252627 | A hairline round cards on the chat ground, with the delicate shadow |
| `chat.field` | Card #FFFFFF | Card #252627 | The composer field wherever it appears (New Request, a chat, the Requests list): 1.21:1 on the beige ground, 1.29:1 on the dark one |
| `chat.fieldEdge` | Border #D4D0CB | Border #3D3E3F | The composer's hairline: 1.27:1 on the beige ground, 1.83:1 on the dark one |

The bubble is 1.25:1 on the beige chat ground and 1.40:1 on the dark one; text on it is 13.07:1 and 13.36:1. The chat has no purple tint, gradient or glow ([Identity](../ideation/identity.md) rules out purple gradients): Lavender appears only in Snuffle's bubbles. The mark is the bare glyph in Foreground (see [Mark](mark.md)); the tokens that drew it on a Lavender tile with a Butter face are gone.

The delicate card shadow is two layers of Foreground (light): 0 1 2 at 4% and 0 4 12 at 5%. It lifts Card rows off a same-coloured ground (the shop page) and cards off the chat ground.

## Semantic roles

Each role reuses a ramp or the grey path (Biscuit in light mode, Stone in dark). Contrast is measured with the WCAG 2 formula against the background (#EEE9E2 or #0B0C0D) and the card (#FFFFFF or #252627).

| Role | Light | Dark | Contrast, light / dark | Where |
| --- | --- | --- | --- | --- |
| Border | #D4D0CB, L 0.86 | #3D3E3F, L 0.36 | 1.27:1 on background, 1.53:1 on card / 1.83:1, 1.41:1 | A card on a busy area, text fields |
| Separator | #DEDAD5, L 0.89 | #323334, L 0.32 | 1.15:1, 1.39:1 / 1.55:1, 1.20:1 | 1 px lines between rows of a list, inset to the text |
| Border, Increase Contrast | #857F79, L 0.60 | #717174, L 0.55 | 3.28:1, 3.96:1 / 4.02:1, 3.12:1 | Every card, bubble and field gets a 1 px border when Increase Contrast (iOS) or high-contrast text (Android) is on |
| Destructive | #BA2B28 fill, white label | #F07F77 fill, black label | Label 6.06:1 / 8.01:1; as text, 5.02:1 on background, 6.06:1 on card / 7.47:1, 5.78:1 | Cancel for a refund, and any action that can't be undone |
| Warning | Butter 700 #6F5C1A | Butter 300 #D2C49A | 5.40:1, 6.52:1 / 11.28:1, 8.74:1 | The warning icon on "Not confirmed · not charged" and "Sold · not charged" |
| Success | Pistachio 700 #4D682A | Pistachio 300 #B8CDA1 | 5.22:1, 6.31:1 / 11.45:1, 8.87:1 | The check icon on Ready, Paid and Collected |
| Scrim | Black at 40% | Black at 40% | Not text | Behind custom sheets and dialogs; a 0 to 40% gradient under badges or glass buttons on a photo |
| Disabled | Content: foreground at 38% (#8D8884) on a container of foreground at 12% (#D9D5D1) | Content #787879 on container #28292A | 2.40:1 / 3.30:1 | Buttons and fields that can't be used yet |

Destructive starts from iOS system red. #FF3B30 carries a white label at only 3.55:1, so it was moved in OKLCH to L 0.52 at hue 27, which keeps it red next to Peach and passes 4.5:1. In dark mode it follows Indigo: a light fill with a black label. Warning and success sit in the Butter and Pistachio ramps that the badges already use, and always come with an icon and a label, never colour alone.

Disabled content is exempt from the WCAG 1.4.3 minimum, as inactive controls are; the values on a card are #92908E on #E2E2E1 in light mode and #868687 on #3F3F40 in dark. With only the scrim, white text over a white photo would be 2.85:1, so text never sits on a photo with the scrim alone; badges carry their own fill.

## Getting started

Getting started is the one place where a brand colour fills the screen. Each of its three pages is full bleed on its own ground: Indigo, then Peach, then Pistachio, the light tiles of the shop accents in light mode and their dark tiles in dark mode (Indigo 300 and Indigo 800 for the first page, the splash's own Indigo, so the ground doesn't change colour as the splash hands over). The three hues take the place of the single Indigo ramp that deepened page by page. While the shopper drags, the ground blends from one page's colour to the next under the finger.

| Page | Light ground | Foreground on it | Dark ground | Foreground on it |
| --- | --- | --- | --- | --- |
| 1, Ask for anything nearby | Indigo 300 #B5BFFF | 11.11:1 | Indigo 800 #3D35B8 | 8.39:1 |
| 2, Snuffle asks the shops for you | Peach tile #FEC5B2 | 12.96:1 | Peach dark tile #52352C | 10.57:1 |
| 3, Buy, then collect when it suits you | Pistachio tile #C5DEAE | 13.51:1 | Deep green #283B2C (`pistachio.welcomeDark`) | 11.49:1 |

Title, body, Skip and the current page dot are Foreground (#100A06 in light, #FAFAFB in dark). Muted text would drop under 4.5:1 on these grounds, so the body is Foreground too and the type styles carry the hierarchy. Continue ("Get started" on the last page) is a Foreground capsule with a Background label (16.28:1 in light, 18.77:1 in dark), so it stands out from every ground; on a coloured onboarding ground the action is Foreground-inverse, not Primary, which would be Indigo on Indigo. The dark Pistachio tile (#34422C) read as olive across a whole screen, so page 3 takes a deeper, cooler green (hue 150, L 0.33, C 0.036). The other dots are Foreground at 55% (`state.pageDotOff`) and take the ground's tint: 3.71 to 3.95:1 on the light grounds and 3.64 to 4.69:1 on the dark ones (35% was 2.16 to 2.22:1 on the light ones), at least 2.99:1 in light and 2.30:1 in dark from the current dot. The tokens are `color.welcome.ground1` to `ground3`.

## Location ask

The location ask's screen is the Background in both modes. `color.location` is the colour the quiet street is rendered for and, in dark mode, the colour of a soft radial lift behind it: the Background in light mode and Stone 360 (#3D3E3F) in dark mode. A full Stone 360 screen read as another app, so it now frames only the art. On the Background the quiet street's near-black iron and its outlines had no contrast with the ground (1.08:1). Stone 360 is 1.83:1 from the Background, which keeps the outlines readable at the centre of the lift; the text sits on the Background, so Foreground and Muted foreground keep their usual contrast there, and the Indigo 300 buttons reach 6.05:1 on Stone 360 as before. The measurements of the other grounds are in [illustrations](illustrations.md).

## Contrast

| Pair | Light | Dark |
| --- | --- | --- |
| Text on background | 16.28:1 | 18.77:1 |
| Muted text on background | 6.28:1 | 8.52:1 |
| Muted text on card | 7.58:1 | 6.60:1 |
| Card on background | 1.21:1 | 1.29:1 |
| Primary label on primary | 8.75:1 | 11.11:1 |
| Tint on background | 7.25:1 | 11.06:1 |
| Selected chip text on its fill | 8.75:1 (Card) | 10.06:1 (Indigo 900), 8.06:1 (Indigo 850), 11.56:1 (Indigo 950) |
| Tonal selection text on its fill | 7.45:1 | 10.06:1 |
| Badge text on its fill | 7.45 to 8.42:1 | 7.45 to 8.42:1 (light values) |
| Snuffle's bubble on the chat ground | 1.25:1 | 1.41:1 |
| Sheet on background | 1.15:1 | 1.09:1 |
| Rows on the sheet (Card light, Muted dark) | 1.39:1 | 1.41:1 |
| Text on the sheet | 14.13:1 | 17.16:1 |
| Muted text on the sheet | 5.45:1 | 7.79:1 |

Every text pair passes WCAG AA. All but muted text on a muted surface (5.87:1 light, 5.51:1 dark), muted text on the light background (6.28:1) and the destructive, warning and success colours on the light background (5.02 to 5.40:1) pass AAA. The Increase Contrast border passes the 3:1 that WCAG 1.4.11 asks of a component's boundary (3.28:1 and 3.12:1 at the lowest). Surface pairs aren't text and have no WCAG minimum; 1.21:1 is the card step on the new background, up from 1.13:1.

Android uses the same colour tokens as iOS; only its forms differ (see [iOS and Android](platforms.md#colour-and-surface-parity)). In this round an agent measured 84 text and non-text pairs per mode on the Android forms, every accent included. The lowest text pairs are the secondary text on a dark chip on a tile card (4.83 to 4.88:1) and the muted text straight on a light Peach tile (5.00:1). The outline of Android's segmented button moved from Border (1.10:1 on the light sheet) to a new `color.outline`, used only for Android control edges: #807973 in light (3.08:1 on the sheet, 3.55:1 on the Background) and #757679 in dark (3.34 to 4.31:1). A first try with Muted foreground passed at 5.45 to 8.52:1 but read as the loudest stroke on the dark screen. The dark selected filter chip has no edge (Indigo 900 at 1.39:1 on the Background); on Android its check (10.06:1) carries the state.

## Sources

- [Identity](../ideation/identity.md), rounds 5 to 9 on the board.
- Decisions 034, 036, 045 and 048 in the [decision log](../../decision-log.md); OpenSpec change `craft-pass-2`.
