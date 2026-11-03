# Typography

Two typefaces: Gambetta for every heading that names a screen or a section, and Switzer for everything inside the sections. The scale follows Apple's text styles at the default Dynamic Type size, and each style maps to a Material 3 role for Android.

```summary
Takeaways:
- Seventeen styles: five in Gambetta 700 (Splash, Display large, Display title, Display name, Section title), eleven text styles in Switzer from Title 1 (28 pt) to Caption 2 (11 pt), and a code style for the collection code.
- Gambetta names screens and sections: large titles, section headings and a shop as the subject. Switzer is everything inside a section, and sheet titles: rows, cards, buttons, chat, prices and labels.
- Root screens (Nearby, Requests) have a Display large title at 48 pt; other screens such as Places use Display title at 40; both collapse to a 17 pt Switzer inline title.
- Section headings are Section title, Gambetta 22/28. Sheet titles are Headline (Switzer 600, 17), centred in the bar. The receipt's shop name and the shop's name on the details sheet, left-aligned in its content, are Display name, 26.
- Chat bubbles, lists, buttons, prices and notifications are always Switzer, so the conversation reads in one font. The one exception is the shop's name on an order card in the Ready state.
Call:
- I named the fonts to test and ruled out system fonts as a choice: SF Pro and Roboto are fallback only (decision 027).
- I decided the chat uses one sans and a display font appears only where it shows (decision 028), then chose Gambetta 700 with Switzer (decision 029).
- I asked for the spacing to be refined from reliable sources instead of memory, and found Switzer titles too bold at 800, so titles are 600.
- I decided that large titles are in Gambetta where Display applies and Title 1 elsewhere, and asked for a style for the collection code.
- In an earlier round I asked for bigger serif large titles with more presence: Display title moved from 34 to 40 pt, with a line height of 44.
- In this round, after a brand review found Gambetta had little presence, I asked for the receipt's shop name and the details sheet's title in Display name, then for every screen title and section heading in Gambetta and for bigger root titles (48 pt). This replaces the "at most once per screen" rule of decisions 028 and 029. It is my test for the round of 2026-11-03 and can be reverted (decision 045).
- In the craft pass that followed I asked for sheet titles to go back to Switzer: a serif title between Close and Confirm fought the two buttons, and iOS sheets title themselves in the headline style (change craft-pass-2).
AI:
- An agent measured the fonts with fontTools, set the tracking per typeface and size, and checked title weights against Gambetta's stems. I chose the pair, the weights and where display may appear.
- An agent applied the new size to the scale and the large-title rules, and set its tracking to the Splash style's −0.02 em, since Gambetta tightens as it grows.
- An agent added Display large and Section title as tokens, moved every screen and section title to Gambetta in the app and checked the screens in light and dark.
Trade-offs:
- Custom fonts have to be registered for Dynamic Type on iOS and font scaling on Android; the system font would scale for free.
- Fontshare fonts are free under the ITF Free Font License; embedding them in the app needs checking before Deliver.
- At 40 pt a long shop name reaches two lines sooner; the two-line limit stays, and the name never goes below 26 pt to fit.
- With Gambetta on every heading, a screen can show four or five serif lines at once. The display face stops being rare; it now marks structure instead of a moment.
```

## Typefaces

```typefaces
Gambetta | 700 | Headings: screen titles, section headings, a shop as the subject | Ready at Paper & Co
Switzer | 400, 500, 600 | Text: chat, lists, buttons, prices, navigation, everything else | Eclipse glasses, 2 pairs, £14.99
```

The fonts load from a private folder that isn't in the public repo; without them the specimens fall back to the system font.

## Type scale

```type-scale
Splash | Gambetta 700 | 40/46 | −0.02 em | Display medium | Splash only | Everything on King Street
Display large | Gambetta 700 | 48/52 | −0.02 em | Display medium | Large titles of the root screens, Nearby and Requests | Nearby
Display title | Gambetta 700 | 40/44 | −0.02 em | Display small | Get started, large titles of other screens (Places), shop page header | Places
Display name | Gambetta 700 | 26/30 | −0.01 em | Headline small | A shop as the subject: the Ready order card, the receipt, the shop's name in the details sheet's content | Paper & Co
Section title | Gambetta 700 | 22/28 | −0.01 em | Title large | Section headings | Open near you
Title 1 | Switzer 600 | 28/32 | −0.015 em | Headline medium | Content that needs a big sans line, such as a phone number | Requests
Title 2 | Switzer 600 | 22/26 | −0.01 em | Title large | A person's name in the account sheet | This week on King Street
Title 3 | Switzer 600 | 20/24 | −0.005 em | Title large | Headings inside system-like surfaces (the payment sheet, Android alerts) | Open near you
Headline | Switzer 600 | 17/22 | 0 em | Title medium | Row titles, shop names in lists, sheet titles and inline bar titles | Broadway Chemist
Body | Switzer 400 | 17/24 | 0 em | Body large | Chat bubbles, descriptions | Two shops have them. Still waiting on 3.
Callout | Switzer 400 | 16/22 | 0 em | Body large | Composer, inputs | Ask for anything on King Street
Subheadline | Switzer 400 | 15/20 | 0 em | Body medium | Previews, secondary lines | Ready · collect by Mon 9 Nov
Footnote | Switzer 400 | 13/18 | +0.01 em | Body small | Meta: street, walk time | King Street · 13 min walk · open till 7pm
Caption 1 | Switzer 500 | 12/16 | +0.015 em | Label medium | Timestamps, status | Replied 4 min ago
Caption 1 Strong | Switzer 600 | 12/16 | +0.015 em | Label medium | "Needs you" on a request row | Needs you
Caption 2 | Switzer 500 | 11/14 | +0.02 em | Label small | Badges; the floor | 3 new
Code | Switzer 600 | 48/56 | +0.12 em | Display medium | Collection code on the receipt | K7Q2
```

Specimens above 34 px are shown at 34 px to fit the page; the size column is the real value. Sizes are points on iOS and sp on Android; the Material 3 role is the closest one, with the size set by this scale.

## Large titles

The root screens, Nearby and Requests, use Display large: 48 pt with a line height of 52, well above the system's 34 pt large title (iOS `largeTitle`). Other screens with a large title, such as Places, and the shop's name on its page use Display title at 40. Collapsed navigation titles stay at 17 pt in Switzer 600, as the system draws them. The home has no greeting; its title is "Nearby".

A large title sits closer to the content it introduces than to what is above it: 24 from the area row on Nearby, 16 from the bar's controls on Requests and Places, and 16 to the first section heading or the filter chips ([Spacing and layout](spacing.md), Vertical rhythm).

## Display rules

- Gambetta for every heading that names a screen or a section: large titles, section headings ("Open near you", "Browse by category", "Asked about recently") and a shop as the subject of a screen. Switzer for everything inside the sections and for sheet titles ("Where are you shopping?"): rows, cards, buttons, chat, prices, labels.
- This replaces the earlier rule of at most one Gambetta element per screen (decisions 028 and 029). It is my test for the round of 2026-11-03; reverting it means section headings go back to Title 3 and screen titles other than Nearby to Title 1 in Switzer.
- At most two lines and never below 22 pt. Its x-height is 0.46 of the em against Switzer's 0.53, so 22 pt is the smallest size where a heading still reads as one.
- Never in capitals or italics, and never in chat bubbles, lists, buttons, collapsed navigation titles, prices, forms or notifications. A shop's name in a list or an option card stays in Switzer.
- An order has one card design. In the Ready state the same card sets the shop's name in Display name; in every other state the name is Headline in Switzer. That is the only place Gambetta appears in the chat.

## Text rules

- Switzer titles are 600. At 700 or 800 they come out as dark as Gambetta 700, so they compete with it.
- Tracking is set per typeface and size: Gambetta tightens as it grows, Switzer stays at 0 for text and opens slightly below 15 pt. Kerning and ligatures always on.
- Switzer's figures are tabular by design, so prices, times and counts align without a feature setting.
- Sentence case everywhere, no uppercase labels above headings; emphasis comes from size and weight.

## Collection code

The code shown at the counter uses its own style: Switzer 600 at 48 pt with +0.12 em tracking, so each character stands apart and the code reads at arm's length. Switzer's figures are tabular, so the code keeps the even rhythm of a monospaced face without a second font. While the code is on screen the app raises the screen to full brightness and restores it when the shopper leaves, as boarding passes in Wallet do. The code scales with Dynamic Type like any other style, and VoiceOver reads it character by character.

## Accessibility

- Every style scales with Dynamic Type on iOS (through `UIFontMetrics` for a custom font) and with the font-size setting on Android (sizes in sp). Text has to work at 200% (WCAG 1.4.4).
- Nothing below 11 pt; body text is 17 pt with leading of at least 1.2, and layouts survive 1.5 line height and wider letter spacing (WCAG 1.4.12).
- Text contrast of 4.5:1, 3:1 for large text and icons (WCAG 1.4.3 and 1.4.11).
- SF Pro on iOS and Roboto on Android are the fallback when a custom font fails to load (decision 027).
