# Colour

Biscuit grey is the neutral for both modes, and Pastel parade with Indigo supplies the accents. Each colour has one job: Indigo is the shopper acting, Lavender is Snuffle speaking, and the warm pastels are the shops. Surfaces separate by lightness, and borders are used only where a surface still needs one.

```summary
Takeaways:
- Light mode: background #EEE9E2 (OKLCH L 0.935), white cards at 1.21:1 on it, muted #E5E2DE for tonal buttons on cards. Chips sit on the card colour.
- Dark mode: background #100A06, cards #2B2420 (1.29:1), muted #38312C. The same Biscuit grey chroma as light mode.
- Indigo #3D35B8 is the shopper acting: the one filled commit button in view, links, the tint and the shopper's bubbles. In dark mode it steps up to Indigo 300 with black text.
- Every shop has one accent for good, chosen by its kind: Peach, Pistachio or Butter. Its tile step (OKLCH L 0.87, C 0.07, Butter C 0.09; dark L 0.36, C 0.08 with the hues spread apart) sits at 1.20 to 1.26:1 on the light background and fills the placeholder tile, the category card, the shop page header and the receipt header.
- Lavender is Snuffle and no shop uses it: its bubbles (the Lavender tile step, #D7CCFE), the typing dots and the Live Activity. Chats sit on a neutral ground: white in light mode, the Background in dark.
- Semantic roles come from the same ramps: destructive is iOS red darkened to carry a white label (6.06:1), warning is Butter, success is Pistachio, and Increase Contrast gives every card a 1 px border at 3.4:1 or more.
Call:
- I asked to keep Oat and Brew, explore accents and warm greys around them, and make pure black and white work with all of it. I chose Biscuit grey as the neutral (decision 034).
- I chose Pastel parade with Indigo in both modes and asked for surfaces without borders and more contrast between them (decision 036).
- I asked for a little more colour in the light background, then kept round 8's chroma at L 0.96 (round 9), and asked for the palette to be recorded here.
- A brand review found Indigo doing all the work, the pastels only in small badges and surfaces that read as stock iOS. I approved a shop accent per shop, Lavender for Snuffle, at most one filled Indigo control per viewport and a darker background (#EEE9E2) with a raised dark card (decision 045).
- In this round a craft review measured the pastel tiles at 1.01 to 1.04:1 on the background. I asked for a tile step that shows, for the calm chat direction the research recommended (neutral ground, no purple tint or glow), for a sheet ground in dark mode and for selection to stop using grey fills and black chips (change craft-pass-2).
AI:
- An agent built the ramps in OKLCH, drew the rounds on the identity board and measured every pair below. I chose the palette, the neutral and the background step.
- An agent proposed the semantic roles from the existing ramps and computed their contrasts with a script using the WCAG 2 formula. I asked for the set and for iOS red to be adapted to the palette.
- An agent ran the brand review on the prototype, then added the accent and Snuffle tokens, recomputed every pair below for all four hues and applied the roles in the app. I set which step each token takes.
- An agent ran the craft review, proposed the tile step's lightness and chroma, re-rendered the category stills on it, and measured every changed pair with a script using the WCAG 2 formula.
- A second visual critique by an agent found the dark tiles collapsing into one olive, the light Butter reading as a highlighter and the selected chip weaker than the white ones. Another agent spread the dark hues with more chroma, moved light Butter to a cleaner yellow, added a 1 pt edge to the selected chip, re-rendered the category stills and recomputed the table below.
Trade-offs:
- Muted #E5E2DE on the new background is 1.07:1, so it can't mark a chip there; chips moved to the card colour, and Muted is only used on cards.
- With a pastel per shop, the shop's colour carries no meaning beyond recognition; status and actions keep their own colours, so a Peach tile never reads as a warning.
- The typing dots in Lavender 500 on Lavender 100 are 2.72:1. They are decorative (VoiceOver reads "Snuffle is writing"), so I kept the lighter step.
- Muted text on the dark tile step is 4.59 to 4.87:1: it passes AA, but less comfortably than in light mode (5.00:1 or more). More chroma in dark cost a little of it (Pistachio went from 4.64 to 4.59:1).
- A white chat ground puts Card surfaces on Card, so cards and grouped rows in a chat need an edge (a hairline and a soft shadow) that they don't need elsewhere.
```

## Surfaces

Both modes use the same Biscuit grey hue path, warm at the light end and a little more yellow at the dark end. Values are OKLCH lightness steps converted to hex.

### Light

```swatches
Background | #EEE9E2 | L 0.935, biscuit.940
Card | #FFFFFF | L 1.00, cards and chips
Muted | #E5E2DE | L 0.915, tonal buttons and the stepper on cards
Muted foreground | #59534D | L 0.445, secondary text
Foreground | #100A06 | L 0.15, text
```

### Dark

```swatches
Background | #100A06 | L 0.15
Card | #2B2420 | L 0.265, cards and chips
Muted | #38312C | L 0.32, tonal buttons and the stepper on cards
Muted foreground | #B1AA9F | L 0.74, secondary text
Foreground | #FCFAF6 | L 0.985, text
Sheet | #1C1612 | L 0.20, opaque sheets, so Card rows (1.17:1) still separate
```

Opaque sheets are the Background in light mode. A chat's ground is Card in light mode and the Background in dark (see Snuffle below).

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
| Tint | Indigo 800 | Indigo 300 | Links, text buttons, icons that act, the icon on the Requests button |
| Tonal button | Muted fill, Foreground text | Muted fill, Foreground text | Secondary actions: Call, Directions on the shop page, Buy on answers that aren't the best |
| Selected chip (`chipSelected`) | Indigo 100 fill, Indigo 800 text in semibold (7.45:1), a 1 pt Indigo 200 edge (`chipSelectedEdge`) | Indigo 900 fill, Indigo 200 text (10.06:1), a 1 pt Indigo 800 edge | Active filter and the place and deadline chips; also the current step on an order card and Android's segmented control and snackbar action |
| Selected row | The row keeps its fill; a tick and the title in Headline | The same | One choice in a list: the place in the location sheet, collect or delivery in the details sheet |
| Count (`count`) | Indigo 800, white text (8.75:1), a 2 pt ring in the Background | The same | The Requests button and unread answers |
| Badge on a photo | Accent 100 fill, 800 text, 500 dot | The light values | Promoted (Pistachio), New (Peach), Delivers (Butter) |
| Badge on a wash | Card fill, Foreground text | Card fill, Foreground text | The shop page header, where a pastel badge would sit on a pastel |
| Map ground | Butter 50 | #2B2420 | Map placeholder behind pins |

`filterSelected` (Foreground fill) is no longer used: a black selected chip was the heaviest mark on Nearby, so selection went back to tonal Indigo. Badges keep their light values in dark mode because they sit on photos, which don't change with the theme.

Primary fills at most one control per viewport, the commit action; the composer's send and the shopper's bubbles share the colour without counting as that button ([screen review](screen-review.md), checks 8 and 19).

In dark mode the map ground was Butter 900, which read as mustard behind the pins. It is #2B2420, the same Biscuit step as the dark card now.

## Shop accents

Each shop has one accent for good, chosen by its kind (`store/kinds.ts`), so it looks the same on Nearby, in the chat, on its page and on the receipt. Bakeries, hardware, newsagents, books, bags and gifts are Butter; cafés and delis, cameras, toys, butchers and fashion are Peach; opticians, florists, chemists and stationery are Pistachio. No shop is Lavender, which is Snuffle's.

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `shop.accent.<hue>.tile` | Tile step: Peach #FEC5B2, Pistachio #C5DEAE, Butter #E7D48F, Lavender #D7CCFE | Peach #602C1C, Pistachio #2A4618, Butter #4C3B01, Lavender #3F3659 | The placeholder tile, the category card and the Category header, the shop page header (solid, ending at a straight edge under the actions), the receipt header |
| `shop.accent.<hue>.wash` | 100 | 900 | The light stripes of the awning band on the placeholder tile |
| `shop.accent.<hue>.ink` | 800 | 200 | Initials and the dark awning stripes on the tile |

The 100 steps sat at L 0.95 to 0.97, on a background at L 0.935, and measured 1.01 to 1.04:1 against it, so a tile read as the background. The tile step is set by lightness: OKLCH L 0.87 and C 0.07 at each hue's angle in light mode, with Butter at C 0.09 and hue 95 so it reads as yellow and not as a highlighter. In dark mode it is L 0.36 and C 0.08, and the hues are spread so the three shop colours don't collapse into one olive: Peach at 38, Butter at 90 (C 0.073, the most sRGB holds there) and Pistachio at 135. Lavender stays at L 0.36, C 0.06. The receipt no longer has a 4 pt ink band.

Contrast on the tile step, light / dark:

| Hue | Tile on background | Foreground | Muted foreground | Indigo 800 / 300 | Ink on tile |
| --- | --- | --- | --- | --- | --- |
| Peach | 1.26:1 / 1.75:1 | 12.96:1 / 10.75:1 | 5.00:1 / 4.87:1 | 5.77:1 / 6.33:1 | 6.52:1 / 7.97:1 |
| Pistachio | 1.20:1 / 1.86:1 | 13.51:1 / 10.13:1 | 5.21:1 / 4.59:1 | 6.01:1 / 5.97:1 | 6.43:1 / 7.99:1 |
| Butter | 1.22:1 / 1.81:1 | 13.31:1 / 10.42:1 | 5.13:1 / 4.72:1 | 5.92:1 / 6.14:1 | 6.53:1 / 7.80:1 |
| Lavender | 1.25:1 / 1.76:1 | 13.07:1 / 10.70:1 | 5.04:1 / 4.84:1 | 5.82:1 / 6.30:1 | 6.59:1 / 7.93:1 |

Every text pair passes AA. Foreground passes AAA; muted text and Indigo don't.

## Snuffle

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `snuffle.bubble` | Lavender tile step #D7CCFE | Lavender 900 #302747 | Snuffle's bubbles, the typing indicator, the Live Activity's track |
| `snuffle.dot` | Lavender 500 | Lavender 400 | Typing dots, the Live Activity's progress |
| `chat.ground` | Card #FFFFFF | Background #100A06 | The ground of New Request and every chat |
| `chat.fill` | Background #EEE9E2 | Card #2B2420 | Chips and grouped rows on the chat ground |
| `chat.edge` | #DEDAD5 | #2B2420 | A hairline round cards on the chat ground, with the delicate shadow |

The bubble is 1.50:1 on the white chat ground and 1.41:1 on the dark one; text on it is 13.07:1 and 13.37:1. The chat has no purple tint, gradient or glow ([Identity](../ideation/identity.md) rules out purple gradients): Lavender appears only in Snuffle's bubbles. The mark is the bare glyph in Foreground (see [Mark](mark.md)); the tokens that drew it on a Lavender tile with a Butter face are gone.

The delicate card shadow is two layers of Foreground (light): 0 1 2 at 4% and 0 4 12 at 5%. It lifts Card rows off a same-coloured ground (the shop page) and cards off the white chat ground.

## Semantic roles

Each role reuses a ramp or the Biscuit grey path. Contrast is measured with the WCAG 2 formula against the background (#EEE9E2 or #100A06) and the card (#FFFFFF or #2B2420).

| Role | Light | Dark | Contrast, light / dark | Where |
| --- | --- | --- | --- | --- |
| Border | #D4D0CB, L 0.86 | #433C36, L 0.36 | 1.27:1 on background, 1.53:1 on card / 1.81:1, 1.41:1 | A card on a busy area, text fields |
| Separator | #DEDAD5, L 0.89 | #38312C, L 0.32 | 1.15:1, 1.39:1 / 1.54:1, 1.19:1 | 1 px lines between rows of a list, inset to the text |
| Border, Increase Contrast | #857F79, L 0.60 | #787068, L 0.55 | 3.28:1, 3.96:1 / 4.04:1, 3.14:1 | Every card, bubble and field gets a 1 px border when Increase Contrast (iOS) or high-contrast text (Android) is on |
| Destructive | #BA2B28 fill, white label | #F07F77 fill, black label | Label 6.06:1 / 8.01:1; as text, 5.02:1 on background, 6.06:1 on card / 7.50:1, 5.82:1 | Cancel for a refund, and any action that can't be undone |
| Warning | Butter 700 #6F5C1A | Butter 300 #D2C49A | 5.40:1, 6.52:1 / 11.33:1, 8.80:1 | The warning icon on "Not confirmed · not charged" and "Sold · not charged" |
| Success | Pistachio 700 #4D682A | Pistachio 300 #B8CDA1 | 5.22:1, 6.31:1 / 11.50:1, 8.93:1 | The check icon on Ready, Paid and Collected |
| Scrim | Black at 40% | Black at 40% | Not text | Behind custom sheets and dialogs; a 0 to 40% gradient under badges or glass buttons on a photo |
| Disabled | Content: foreground at 38% (#8D8884) on a container of foreground at 12% (#D9D5D1) | Content #7B7773 on container #2C2723 | 2.40:1 / 3.33:1 | Buttons and fields that can't be used yet |

Destructive starts from iOS system red. #FF3B30 carries a white label at only 3.55:1, so it was moved in OKLCH to L 0.52 at hue 27, which keeps it red next to Peach and passes 4.5:1. In dark mode it follows Indigo: a light fill with a black label. Warning and success sit in the Butter and Pistachio ramps that the badges already use, and always come with an icon and a label, never colour alone.

Disabled content is exempt from the WCAG 1.4.3 minimum, as inactive controls are; the values on a card are #92908E on #E2E2E1 in light mode and #86827D on #3D3833 in dark. With only the scrim, white text over a white photo would be 2.85:1, so text never sits on a photo with the scrim alone; badges carry their own fill.

## Contrast

| Pair | Light | Dark |
| --- | --- | --- |
| Text on background | 16.28:1 | 18.86:1 |
| Muted text on background | 6.28:1 | 8.54:1 |
| Muted text on card | 7.58:1 | 6.63:1 |
| Card on background | 1.21:1 | 1.29:1 |
| Primary label on primary | 8.75:1 | 11.11:1 |
| Tint on background | 7.25:1 | 11.11:1 |
| Selected chip text on its fill | 7.45:1 | 10.06:1 |
| Badge text on its fill | 7.45 to 8.42:1 | 7.45 to 8.42:1 (light values) |
| Snuffle's bubble on the chat ground | 1.50:1 | 1.41:1 |
| Card rows on the dark sheet | | 1.17:1 |

Every text pair passes WCAG AA. All but muted text on a muted surface (5.87:1 light, 5.55:1 dark), muted text on the light background (6.28:1) and the destructive, warning and success colours on the light background (5.02 to 5.40:1) pass AAA. The Increase Contrast border passes the 3:1 that WCAG 1.4.11 asks of a component's boundary (3.28:1 and 3.14:1 at the lowest). Surface pairs aren't text and have no WCAG minimum; 1.21:1 is the card step on the new background, up from 1.13:1.

## Sources

- [Identity](../ideation/identity.md), rounds 5 to 9 on the board.
- Decisions 034, 036 and 045 in the [decision log](../../decision-log.md); OpenSpec change `craft-pass-2`.
