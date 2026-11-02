# Type scale

A type scale built from Apple's text styles, with the matching Material 3 roles, and tests of eight fonts from Fontshare on it: four alone and three display fonts paired with a body font. Each test ends in the same conversation screen, which is where the shopper reads the most. The fonts load from a private folder and don't ship with the public repo; without them the canvas falls back to the system font.

```summary
Takeaways:
- The scale is Apple's eleven text styles at the default Dynamic Type size, from Large title (34 pt) to Caption 2 (11 pt), each mapped to the closest Material 3 role for Android.
- For a conversation screen the best score goes to Gambetta for titles and Switzer for everything else (98 of 100). Switzer keeps chat, prices and times legible, with tabular figures by default; Gambetta gives the titles a British editorial voice.
- System fonts are fallback only (decision 027), so the round 1 pairs with SF Pro are out. Round 2 pairs Gambetta, Telma and Pally with Switzer and with Satoshi.
- Switzer is the best single font (89), with the highest x-height and tabular figures by default. Chillax and Author score lowest for reading a chat: lower legibility at small sizes and proportional figures only.
Call:
- No uppercase labels above headings; sentence case everywhere, with emphasis from size and weight.
- A display font is only for titles of 20 pt and up. Body, prices and times stay in a body font with tabular figures.
- Fonts I named: Satoshi, Chillax, Switzer and Author alone; Telma, Gambetta and Pally as display fonts, first with SF Pro and Excon, then with Switzer and Satoshi.
- SF Pro and Roboto are fallback only, never the chosen font, because neither exists on the other platform (decision 027).
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
| Pally | 0.500 | Proportional only | 400–700 |
| Excon | 0.518 | Proportional only | 100–900 |

## Scores for the conversation screen

Weighted out of 100: legibility 30%, figures 15%, weights 15%, scaling 15%, character 15%, pairing 10%.

| Type | Score |
| --- | --- |
| Gambetta + Switzer | 98 |
| Telma + Switzer | 93 |
| Pally + Switzer | 90 |
| Switzer | 89 |
| Gambetta + Satoshi | 86 |
| Telma + Satoshi | 83 |
| Satoshi | 80 |
| Pally + Satoshi | 78 |
| Gambetta + Excon | 77 |
| Telma + Excon | 72 |
| Pally + Excon | 69 |
| Chillax | 65 |
| Author | 65 |
| Gambetta, Telma or Pally + SF Pro | Out: system font |

## Sources

- Apple, Human Interface Guidelines, Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Material Design 3, Type scale tokens: https://m3.material.io/styles/typography/type-scale-tokens
- WCAG 2.2, Resize text (1.4.4) and Text spacing (1.4.12): https://www.w3.org/TR/WCAG22/
- Fontshare (Indian Type Foundry): https://www.fontshare.com
