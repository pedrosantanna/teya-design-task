# Colour

Biscuit grey is the neutral for both modes, and Pastel parade with Indigo supplies the accents: Indigo for anything the shopper acts on, four pale colours for fills and badges. Surfaces separate by lightness, and borders are used only where a surface still needs one.

```summary
Takeaways:
- Light mode: background #F4F1ED (OKLCH L 0.96), white cards at 1.13:1 on it, muted surfaces #E5E2DE for chips and Snuffle's bubbles.
- Dark mode: background #100A06, cards #231D18 (1.18:1), muted #332C27. The same Biscuit grey chroma as light mode.
- Indigo #3D35B8 carries buttons, links, the tint and the shopper's bubbles; in dark mode it steps up to Indigo 300 with black text.
- Peach, Pistachio, Butter and Lavender appear only as tonal badges and fills: a pale fill with dark text of the same hue, above 7:1 in both modes.
- Semantic roles come from the same ramps: destructive is iOS red darkened to carry a white label (6.06:1), warning is Butter, success is Pistachio, and Increase Contrast gives every card a 1 px border at 3.4:1 or more.
Call:
- I asked to keep Oat and Brew, explore accents and warm greys around them, and make pure black and white work with all of it. I chose Biscuit grey as the neutral (decision 034).
- I chose Pastel parade with Indigo in both modes and asked for surfaces without borders and more contrast between them (decision 036).
- I asked for a little more colour in the light background, then kept round 8's chroma at L 0.96 (round 9), and asked for the palette to be recorded here.
AI:
- An agent built the ramps in OKLCH, drew the rounds on the identity board and measured every pair below. I chose the palette, the neutral and the background step.
- An agent proposed the semantic roles from the existing ramps and computed their contrasts with a script using the WCAG 2 formula. I asked for the set and for iOS red to be adapted to the palette.
Trade-offs:
- Without borders, white cards on #F4F1ED depend on a 1.13:1 step; on a dim or low-quality screen they may blur together, so a border stays allowed where a card sits on a busy area, and Increase Contrast turns borders on everywhere.
- Lavender has no job in the screens yet; it is kept in the set for states the prototype hasn't drawn.
```

## Surfaces

Both modes use the same Biscuit grey hue path, warm at the light end and a little more yellow at the dark end. Values are OKLCH lightness steps converted to hex.

### Light

```swatches
Background | #F4F1ED | L 0.96
Card | #FFFFFF | L 1.00
Muted | #E5E2DE | L 0.915, chips and Snuffle's bubbles
Muted foreground | #59534D | L 0.445, secondary text
Foreground | #100A06 | L 0.15, text
```

### Dark

```swatches
Background | #100A06 | L 0.15
Card | #231D18 | L 0.235
Muted | #332C27 | L 0.30, chips and Snuffle's bubbles
Muted foreground | #B1AA9F | L 0.74, secondary text
Foreground | #FCFAF6 | L 0.985, text
```

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
| Primary | Indigo 800 #3D35B8, white text | Indigo 300 #B5BFFF, black text | Buttons, the composer's send, the shopper's bubbles |
| Tint | Indigo 800 | Indigo 300 | Links, icons that act, the icon on the Requests button |
| Selected chip | Indigo 100 fill, Indigo 800 text | Indigo 900 fill, Indigo 200 text | Active filter, "Open now" |
| Badge | Accent 100 fill, 800 text, 500 dot | Accent 900 fill, 200 text, 400 dot | Promoted (Pistachio), New (Peach), Delivers (Butter) |
| Map ground | Butter 50 | #2A241F | Map placeholder behind pins |

Primary is the fill of the one main button on a screen; the composer's send and the shopper's bubbles share the colour without counting as that button ([screen review](screen-review.md), check 8).

In dark mode the map ground was Butter 900, which read as mustard behind the pins. It is now #2A241F, a Biscuit neutral between the card #231D18 and muted #332C27; the `mapGround` token in the app follows.

## Semantic roles

Each role reuses a ramp or the Biscuit grey path. Contrast is measured with the WCAG 2 formula against the background (#F4F1ED or #100A06) and the card (#FFFFFF or #231D18).

| Role | Light | Dark | Contrast, light / dark | Where |
| --- | --- | --- | --- | --- |
| Border | #D4D0CB, L 0.86 | #433C36, L 0.36 | 1.36:1 on background, 1.53:1 on card / 1.81:1, 1.54:1 | A card on a busy area, text fields |
| Separator | #DEDAD5, L 0.89 | #38312C, L 0.32 | 1.24:1, 1.39:1 / 1.54:1, 1.30:1 | 1 px lines between rows of a list, inset to the text |
| Border, Increase Contrast | #857F79, L 0.60 | #787068, L 0.55 | 3.51:1, 3.96:1 / 4.04:1, 3.42:1 | Every card, bubble and field gets a 1 px border when Increase Contrast (iOS) or high-contrast text (Android) is on |
| Destructive | #BA2B28 fill, white label | #F07F77 fill, black label | Label 6.06:1 / 8.01:1; as text, 5.38:1 on background, 6.06:1 on card / 7.50:1, 6.35:1 | Cancel for a refund, and any action that can't be undone |
| Warning | Butter 700 #6F5C1A | Butter 300 #D2C49A | 5.79:1, 6.52:1 / 11.33:1, 9.60:1 | The warning icon on "Not confirmed · not charged" and "Sold · not charged" |
| Success | Pistachio 700 #4D682A | Pistachio 300 #B8CDA1 | 5.60:1, 6.31:1 / 11.50:1, 9.75:1 | The check icon on Ready, Paid and Collected |
| Scrim | Black at 40% | Black at 40% | Not text | Behind custom sheets and dialogs; a 0 to 40% gradient under badges or glass buttons on a photo |
| Disabled | Content: foreground at 38% (#8D8884) on a container of foreground at 12% (#D9D5D1) | Content #7B7773 on container #2C2723 | 2.40:1 / 3.33:1 | Buttons and fields that can't be used yet |

Destructive starts from iOS system red. #FF3B30 carries a white label at only 3.55:1, so it was moved in OKLCH to L 0.52 at hue 27, which keeps it red next to Peach and passes 4.5:1. In dark mode it follows Indigo: a light fill with a black label. Warning and success sit in the Butter and Pistachio ramps that the badges already use, and always come with an icon and a label, never colour alone.

Disabled content is exempt from the WCAG 1.4.3 minimum, as inactive controls are; the values on a card are #92908E on #E2E2E1 in light mode and #86827D on #3D3833 in dark. With only the scrim, white text over a white photo would be 2.85:1, so text never sits on a photo with the scrim alone; badges carry their own fill.

## Contrast

| Pair | Light | Dark |
| --- | --- | --- |
| Text on background | 17.46:1 | 18.86:1 |
| Muted text on card | 7.58:1 | 7.24:1 |
| Card on background | 1.13:1 | 1.18:1 |
| Primary label on primary | 8.75:1 | 11.11:1 |
| Tint on background | 7.77:1 | 11.11:1 |
| Selected chip text on its fill | 7.45:1 | 10.06:1 |
| Badge text on its fill | 7.45 to 8.42:1 | 9.86 to 10.10:1 |

Every text pair passes WCAG AA. All but muted text on a muted surface (5.87:1 in light mode) and the light-mode destructive, warning and success colours (5.38 to 6.52:1) pass AAA. The Increase Contrast border passes the 3:1 that WCAG 1.4.11 asks of a component's boundary. Surface pairs aren't text and have no WCAG minimum; 1.13:1 is the smallest step I accepted without a border.

## Sources

- [Identity](../ideation/identity.md), rounds 5 to 9 on the board.
- Decisions 034 and 036 in the [decision log](../../decision-log.md).
