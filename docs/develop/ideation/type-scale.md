# Typography

A type scale built from Apple's text styles, with the matching Material 3 roles, and tests of fonts from Fontshare on it: four alone, display fonts paired with a body font, and a third round where a display font appears only on the splash, the get-started screen, the home title and widget titles. Each test ends in the same conversation screen, which is where the shopper reads the most. The fonts load from a private folder and don't ship with the public repo; without them the canvas falls back to the system font.

```summary
Takeaways:
- Decision 029: Gambetta 700 for display, Switzer for everything else, with tracking set per typeface and size (round 4). Switzer titles are 600, so they stay below Gambetta in colour.
- Decision 028: the chat and everything the shopper reads use one strong sans, Switzer for now. A display font is only for the splash, the get-started screen, the home title and display titles in widgets.
- For that display role, Gambetta scores best with Switzer (95 of 100), then Chillax (80), Telma (78), Author and Switzer alone (72). Pally is out of the tests.
- The scale is Apple's eleven text styles at the default Dynamic Type size, from Large title (34 pt) to Caption 2 (11 pt), each mapped to the closest Material 3 role for Android.
- For a conversation screen the best score goes to Gambetta for titles and Switzer for everything else (98 of 100). Switzer keeps chat, prices and times legible, with tabular figures by default; Gambetta gives the titles a British editorial voice.
- System fonts are fallback only (decision 027), so the round 1 pairs with SF Pro are out. Round 2 pairs Gambetta and Telma with Switzer and with Satoshi.
- Switzer is the best single font (89), with the highest x-height and tabular figures by default. Chillax and Author score lowest for reading a chat: lower legibility at small sizes and proportional figures only.
Call:
- I named the fonts to test: Satoshi, Chillax, Switzer and Author alone; Telma and Gambetta as display fonts, first with SF Pro and Excon, then with Switzer and Satoshi. I dropped Pally after testing it.
- I ruled out SF Pro and Roboto as a choice, because neither exists on the other platform (decision 027). A display font is only for titles of 20 pt and up; body, prices and times stay in a body font with tabular figures.
- I chose sentence case everywhere and no uppercase labels above headings; emphasis comes from size and weight.
- I asked for the board to show what was chosen and to group each round. It opens with "Where it stands", and round 4 is outlined in green as the chosen spec the design system page takes its values from.
AI:
- An agent checked each font on Fontshare, measured x-height, figures and weights with fontTools, built the scale and the specimens, and scored the options for a conversation screen. The scores are its judgement on the stated criteria.
Trade-offs:
- A custom body font has to be registered for Dynamic Type on iOS and for font scaling on Android; the system font would do that for free.
- Fontshare fonts are free under the ITF Free Font License; whether the app can embed them would need checking before Deliver.
```

## Accessibility rules

- Every style scales with Dynamic Type on iOS and with the font-size setting on Android (sizes in sp). WCAG 1.4.4 asks for text that works at 200%.
- Nothing below 11 pt; body text is 17 pt.
- Leading of at least 1.2 for body, and layouts that survive 1.5 line height and wider letter spacing (WCAG 1.4.12).
- Contrast of 4.5:1 for text, 3:1 for large text and icons (WCAG 1.4.3 and 1.4.11).
- Tabular figures for prices, times and counts.

## Measurements

| Font | x-height (of the em) | Figures | Weights |
| --- | --- | --- | --- |
| Satoshi | 0.484 | Proportional, tabular with the tnum feature | 300–900 |
| Chillax | 0.485 | Proportional only | 200–700 |
| Switzer | 0.531 | Tabular by default | 100–900 |
| Author | 0.440 | Proportional only | 200–700 |
| Telma | 0.531 | Proportional only | 300–900 |
| Gambetta | 0.452 | Proportional only | 300–700 |
| Excon | 0.518 | Proportional only | 100–900 |

## Round 4: Gambetta and Switzer, refined

I chose Gambetta for display and Switzer for everything else (decision 029). Tracking is set per typeface and size. Apple's table for SF Pro tightens 17 pt text by −0.43 pt because SF is drawn for it; copied onto Switzer, which is already more open (mean side space of lowercase 0.083 em against SF's 0.071), it made the text look cramped. Gambetta 700 is drawn tight (0.039 em) but reads loose at large sizes, so it gets negative tracking, as typography references recommend for display sizes.

| Role | Font and weight | Size/leading | Tracking |
| --- | --- | --- | --- |
| Splash | Gambetta 700 | 40/46 | −0.02 em |
| Display title | Gambetta 700 | 34/40 | −0.015 em |
| Display name | Gambetta 700 | 26/30 | −0.01 em |
| Title 1 | Switzer 600 | 28/32 | −0.015 em |
| Title 2 | Switzer 600 | 22/26 | −0.01 em |
| Title 3 | Switzer 600 | 20/24 | −0.005 em |
| Headline | Switzer 600 | 17/22 | 0 |
| Body | Switzer 400 | 17/24 | 0 |
| Callout | Switzer 400 | 16/22 | 0 |
| Subheadline | Switzer 400 | 15/20 | 0 |
| Footnote | Switzer 400 | 13/18 | +0.01 em |
| Caption 1 | Switzer 500 | 12/16 | +0.015 em |
| Caption 2 | Switzer 500 | 11/14 | +0.02 em |

Leading is a ratio of the size so it scales with Dynamic Type; secondary text is #5B5B60 or darker for 4.5:1 contrast. Switzer's figures are tabular by design. Switzer titles were 700–800 at first and read darker than the Gambetta display; a typography agent measured stems and ink coverage and set them to 600 (Title 1 at 800 had the same stem as Gambetta at 34 pt). A craft-review agent checked round 4 and its fixes are applied: one Gambetta element per screen, balanced line breaks, eased Gambetta tracking, more leading for two-line display, and a 26 pt floor.

Gambetta appears only on the splash, the get-started headline, the home greeting, the shop page header (34 pt) and the ready-to-collect card (26 pt, one line). A featured shop on Nearby stays in Switzer, because the home already has its greeting in Gambetta. Never below 26 pt, at most one per screen and two lines, never in capitals or italics, and never in the chat, lists, buttons, navigation, prices, forms or notifications.

## Round 3: display only where it belongs

Five options, each on a splash, a get-started screen, a home with its title and a shop widget, and a conversation in Switzer only.

| Display, with Switzer for the rest | Score |
| --- | --- |
| Gambetta | 95 |
| Chillax | 80 |
| Telma | 78 |
| Author | 72 |
| Switzer alone | 72 |

Weighted out of 100: character 30%, presence at large sizes 25%, harmony with Switzer 20%, legibility in a widget title 15%, weights 10%.

## Scores for the conversation screen (rounds 1 and 2)

Rounds 1 and 2 put a display font in the conversation, which decision 028 rules out. They stay as a record.

Weighted out of 100: legibility 30%, figures 15%, weights 15%, scaling 15%, character 15%, pairing 10%.

| Type | Score |
| --- | --- |
| Gambetta + Switzer | 98 |
| Telma + Switzer | 93 |
| Switzer | 89 |
| Gambetta + Satoshi | 86 |
| Telma + Satoshi | 83 |
| Satoshi | 80 |
| Gambetta + Excon | 77 |
| Telma + Excon | 72 |
| Chillax | 65 |
| Author | 65 |
| Gambetta or Telma + SF Pro | Out: system font |

## Sources

- Apple, Human Interface Guidelines, Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Material Design 3, Type scale tokens: https://m3.material.io/styles/typography/type-scale-tokens
- WCAG 2.2, Resize text (1.4.4) and Text spacing (1.4.12): https://www.w3.org/TR/WCAG22/
- Apple, Human Interface Guidelines, Typography (text styles, minimum sizes, tracking table, custom fonts and Dynamic Type): https://developer.apple.com/design/human-interface-guidelines/typography
- Material Components for Android, typography tokens (letter spacing per role): https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/typography/res/values/tokens.xml
- Google Fonts Knowledge, Tracking (negative tracking only at display sizes): https://fonts.google.com/knowledge/glossary/tracking_letter_spacing
- CreativePro, On the track of good type (tightening display type): https://creativepro.com/?p=9396
- Butterick's Practical Typography (line spacing of 120–145% of the point size): https://practicaltypography.com/
- Fontshare (Indian Type Foundry): https://www.fontshare.com
