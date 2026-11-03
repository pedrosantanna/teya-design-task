# Typography

Two typefaces: Gambetta for a few display moments and Switzer for everything the shopper reads. The scale follows Apple's text styles at the default Dynamic Type size, and each style maps to a Material 3 role for Android.

```summary
Takeaways:
- Fourteen styles: three display styles in Gambetta 700, ten text styles in Switzer from Title 1 (28 pt) to Caption 2 (11 pt), and a code style for the collection code.
- Gambetta appears at most once per screen, only on the splash, get started, the Nearby large title and a shop as the subject.
- Large titles keep the system size, 34 pt, in Gambetta on Nearby and the shop page; every other screen title is Title 1 in Switzer.
- Chat bubbles, lists, buttons, prices and notifications are always Switzer, so the conversation reads in one font. The one exception is the shop's name on an order card in the Ready state.
Call:
- I named the fonts to test and ruled out system fonts as a choice: SF Pro and Roboto are fallback only (decision 027).
- I decided the chat uses one sans and a display font appears only where it shows (decision 028), then chose Gambetta 700 with Switzer (decision 029).
- I asked for the spacing to be refined from reliable sources instead of memory, and found Switzer titles too bold at 800, so titles are 600.
- I decided that large titles keep the system's 34 pt, in Gambetta where Display applies and Title 1 elsewhere, and asked for a style for the collection code.
AI:
- An agent measured the fonts with fontTools, set the tracking per typeface and size, and checked title weights against Gambetta's stems. I chose the pair, the weights and where display may appear.
Trade-offs:
- Custom fonts have to be registered for Dynamic Type on iOS and font scaling on Android; the system font would scale for free.
- Fontshare fonts are free under the ITF Free Font License; embedding them in the app needs checking before Deliver.
```

## Typefaces

```typefaces
Gambetta | 700 | Display: splash, get started, the Nearby large title, a shop as the subject | Ready at Paper & Co
Switzer | 400, 500, 600 | Text: chat, lists, buttons, prices, navigation, everything else | Eclipse glasses, 2 pairs, £14.99
```

The fonts load from a private folder that isn't in the public repo; without them the specimens fall back to the system font.

## Type scale

```type-scale
Splash | Gambetta 700 | 40/46 | −0.02 em | Display medium | Splash only | Everything on King Street
Display title | Gambetta 700 | 34/40 | −0.015 em | Display small | Get started, the Nearby large title, shop page header | Nearby
Display name | Gambetta 700 | 26/30 | −0.01 em | Headline small | The shop's name in an order card in the Ready state, one line | Paper & Co
Title 1 | Switzer 600 | 28/32 | −0.015 em | Headline medium | Large titles on screens without Gambetta | Requests
Title 2 | Switzer 600 | 22/26 | −0.01 em | Title large | Large section titles | This week on King Street
Title 3 | Switzer 600 | 20/24 | −0.005 em | Title large | Section titles | Open near you
Headline | Switzer 600 | 17/22 | 0 em | Title medium | Row titles, shop names in lists | Broadway Chemist
Body | Switzer 400 | 17/24 | 0 em | Body large | Chat bubbles, descriptions | Two shops have them. Still waiting on 3.
Callout | Switzer 400 | 16/22 | 0 em | Body large | Composer, inputs | Ask for anything on King Street
Subheadline | Switzer 400 | 15/20 | 0 em | Body medium | Previews, secondary lines | Ready · collect by Mon 9 Nov
Footnote | Switzer 400 | 13/18 | +0.01 em | Body small | Meta: street, walk time | King Street · 13 min walk · open till 7pm
Caption 1 | Switzer 500 | 12/16 | +0.015 em | Label medium | Timestamps, status | Replied 4 min ago
Caption 2 | Switzer 500 | 11/14 | +0.02 em | Label small | Badges; the floor | 3 new
Code | Switzer 600 | 48/56 | +0.12 em | Display medium | Collection code on the receipt | K7Q2
```

Specimens above 34 px are shown at 34 px to fit the page; the size column is the real value. Sizes are points on iOS and sp on Android; the Material 3 role is the closest one, with the size set by this scale.

## Large titles

The app keeps the system's large title size, 34 pt (iOS `largeTitle`), where Display applies: "Nearby" on the home and the shop's name on its page are Display title in Gambetta. On every other screen with a large title, such as Requests, Title 1 in Switzer replaces the system large title. Collapsed navigation titles stay at 17 pt in Switzer 600, as the system draws them. The home has no greeting; its title is "Nearby".

## Display rules

- At most one Gambetta element per screen, at most two lines, never below 26 pt. Its x-height is 0.46 of the em against Switzer's 0.53, so smaller sizes read no bigger than a Switzer title.
- Never in capitals or italics, and never in chat bubbles, lists, buttons, navigation bars, prices, forms or notifications. A shop's name in a list or an option card stays in Switzer.
- A featured shop on Nearby stays in Switzer, because the large title already uses Gambetta.
- An order has one card design. In the Ready state the same card sets the shop's name in Display name; in every other state the name is Headline in Switzer. That is the only change, and the only place Gambetta appears in the chat.

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
