# Components

Every component the v7 screens use, specified from the tokens on the other design-system pages: what it is made of, which tokens it takes, its states, its iOS and Android forms and what a screen reader gets. The prototype is built from them.

```summary
Takeaways:
- Twenty components, each in one table: anatomy, tokens, states, iOS and Android forms, accessibility and truncation.
- Only token names from the foundations are used: `radius.*`, `space.*` and the semantic gaps, `spring.*`, the colour roles and the type styles. Where a value has no token yet, the table says so.
- At most one filled Indigo control is visible at a time, the commit action (Buy, Ask, send). Tonal buttons are neutral, the selected chip is Card with Indigo 800 text and edge (Indigo 300 in dark), and filled Indigo means the shopper acts. Answer, order and request cards are one element for VoiceOver and TalkBack, with Buy or the row's button as a custom action.
- A shop shows in its accent wherever it appears: a tonal tile with its initials and the mark's awning, its accent in small details on its neutral page (the chips and the map pin), a tinted header on its receipt. "Browse by category" on Nearby is a rail of category cards in the same pastels, and each opens the Category screen with the places of that kind.
- The ask bar never shrinks: one row with the Requests circle and then the Ask capsule (the Snuffle glyph, "Ask for anything nearby", a mic). Its glass morphs into New Request's composer. Sheets title themselves in Headline, centred.
- Bars have no fill: Back, Close and Confirm are glass circles, icon actions share one glass capsule, and a scroll edge effect replaces the bar background. The address at the top of Nearby opens the location sheet.
- A shop name takes one line, a preview two, and a price never truncates.
- The shop page puts a photo carousel inside the shop card, after the actions, with a scrim of the Background so the page dots hold their contrast, and a tap opens a full-screen viewer that grows from the photo, zooms by pinch and pages by swipe.
- Ratings add five components: the rating sheet a buyer fills in after an order, and on the shop page the product summary, the reliability row, the rating summary and the review card. Each signal names its source and is one element for a screen reader, with a full label.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose HugeIcons for icons (decision 042) and kept these specs provisional (decision 043), to be tuned at real size in the prototype.
- In this round I asked to follow iOS 26 and Liquid Glass as Apple's own apps use them, for a location flow from the top of Nearby, and for a free map I can style.
- After a brand review I approved shop accents, Lavender for Snuffle, at most one filled Indigo control per viewport, Gambetta for every screen and section title, category cards on Nearby and the 3D illustrations in screens (decision 045).
- In this round I was confused when the ask bar retracted while I scrolled: pressing it is the primary action, so it never shrinks. I also said "I don't want Shops by kind, I want to find places by category", and approved a craft review's fixes to sheets, chips, the shop page, the receipt and Requests (change craft-pass-2).
- Later I decided the Snuffle mark never sits on a tile or in an avatar: it is a bare glyph in one colour that follows the theme. This reverses decision 045's mark on a Lavender tile.
- Later I asked for ratings and a summary of what a shop sells on the shop page. I chose a thumbs up or down over stars, stock accuracy only after 10 "has it" answers, and a dispute for shops (decision 047).
- After a visual critique of the web build I asked for the selected chip to be the strongest chip in its row, for the iOS segmented control, for the Category header to line up with the list under it and for shop photos in its rows, and for one scrim behind every sheet.
- Later I chose lighter tinted rows on the dark Category screen, keeping the full colour as its ground, and moved the Requests circle after the field, as iOS 26 places the secondary button after the search field in Music and Podcasts (decision 050).
- After another visual critique and a screen review of the web build, I asked for their fixes to the Category header and rows, sheets, the segmented control, the ask bar's spacing, New Request's chips and the rating sheet. Where the rating sheet's tags disagreed with the conceptual model, the model's lists win (decision 047).
- In round 10 I asked for the chat composer to stop vanishing on the white chat ground, with a filled field and a hairline, and for the Requests circle to go back to the leading side of the ask bar, because the mic sits too close to a thumb on a trailing circle. That reverses my decision 050.
- Later I asked for the shop page to follow Airbnb's listing page: a photo carousel under the pin, a full-screen photo viewer, "Found here recently" with item names and no buyer or price, the ratings higher up, and a "Promoted" line on a paid placement, since UK advertising rules expect paid placement to be identifiable.
- In round 10 I asked for the shop card to be pinned near the top under a strip of map, with the photo carousel moved inside it after the actions and clipped by it, for "Promoted" to leave the prototype everywhere while the data stays (I decided not to show paid placement for now), for Delivers and New to carry a small icon, and for the ratings row to show up to five notes and become a vertical list at accessibility text sizes.
- Later in round 10 I asked for six changes to the shop page: Delivers and New as icon groups on the facts line, the same space above and below the photos, the card raised with the pin centred in the strip of map, every container growing with the card while only the text keeps its line breaks, a smaller margin of map at the sides, and the card back in the shop's colour with everything inside recoloured and measured (decision 056, which reverses decision 055).
- Later I asked for the pin to sit centred between the status bar and the card, one chip treatment for chips on a row in the shop card, the ratings as one sideways block with a narrow summary card first, and the icons of How they do on Snuffle aligned with the card's inset.
AI:
- An agent reviewed the design system against the v7 screens and listed what was missing. Another agent wrote this page from the existing tokens and the v7 frames; I set the scope and the rules it had to follow.
- An agent rewrote the nav bar, Back, Close, sheet, ask bar and map specs from the WWDC 2025 sessions on the new design and the MapLibre docs, and added the location control and Confirm.
- An agent applied the brand review: it added the placeholder tile, category card and receipt header, changed the button, chip, bubble and sheet specs, and built them in the app. Another agent rendered the illustrations the screens use.
- An agent ran the craft review with exact values, then rebuilt the ask bar, the composer and its morph, the sheet title, the shop page surfaces and the Category screen, and checked them rendered in light and dark.
- An agent specified the five rating components from the benchmarks in Mobbin and the UK rules on reviews, and wrote each accessibility label in full.
- An agent applied the visual critique to chips, the segmented control, sheets and the Category screen, measured the new pairs with the WCAG 2 formula and checked them on the web build in light and dark.
- An agent added the tinted row cards and moved the Requests circle in the app, checked that the morph into New Request still starts from the capsule, and took screenshots of Nearby and four dark Category screens.
- An agent applied that round's fixes in the app and on this page, kept the rating sheet's thumbs at 88 and wrote that into the spec, and checked the changed screens on the web build in light and dark.
- An agent made the composer a filled field with new `chat.field` and `chat.fieldEdge` tokens, moved the Requests circle before the capsule, checked the morph into New Request from the new position and measured the contrasts.
- An agent built the photo carousel, the viewer and the new shop page order from the v10 frames, added the scrim and viewer tokens, measured the page dots on black and white photos in light and dark, and checked the page at rest, scrolled and with the viewer open on the web build.
- An agent moved the carousel into the card (it takes a `width` prop now), removed Promoted from the tile and the shop page, added the Delivers and New icons to the Badge, made the review carousel a vertical list from font scale 1.5 and dropped the dark-mode edge on the rating tags for `tag.fillRaised` (1.18:1 from the Muted row). I checked it rendered in light and dark at 402 by 874; the vertical list is not checked at a scaled font on the web.
- An agent rebuilt the shop page layout for those six changes: animated margins so the containers follow the card's edge, a carousel whose photos widen with the card, the pin placed from the measured ink of its glyph (33.3 pt from the top and from the card), the card, rows, chips, review cards and buttons moved onto the tile ground, two new on-tile status colours, and screenshots of three shops in light and dark at rest, mid-lift, scrolled, on the ratings and in the viewer.
- In round 12 an agent applied the visual critique's shop page and chat fixes: a solid pinned bar with a hairline, a centred chat title block, the facts in two rows, "Ask" for long names, a peeking photo carousel, a 44 pt shop link and the spacing above "See all". I checked each against the rendered screens.
- An agent centred the pin from the safe area's top inset, added `tag.fillOnRow`, rebuilt Ratings as one panel of equal-height cards with the summary first, left-aligned the icon column of the reliability rows and measured each changed pair with the WCAG 2 script. I checked the page rendered in light and dark at 402 by 874 and in the web device frame; the vertical stack at large text is not checked at a scaled font on the web.
Trade-offs:
- Specifying every component before the prototype exists means some values will move once they are on a phone; writing them down first keeps the two platforms and the screens from drifting apart.
- Making each card a single accessible element keeps the swipe order short, at the cost of reaching the card's secondary actions through the actions menu.
```

## Button

| Aspect | Spec |
| --- | --- |
| Roles | Filled primary (Primary fill, its label colour), tonal (Muted fill, Foreground label; on a shop's accent tile, white at `state.tonalOnTile` instead, 40% light and 6% dark, so it keeps the shop's hue), plain (no fill, Tint label), destructive (no fill, Destructive label). On a coloured ground (Getting started's Indigo pages) two more: inverse (Foreground fill, Background label) and quiet (no fill, Foreground label), so the button contrasts with any step of the ground |
| Sizes | Large: 50 high, full content width, label in Headline. Compact: 36 high, `space.4` side padding (`space.3` with an icon, whose side bearing reads as padding), label in Subheadline at 600 |
| Tokens | `radius.full`; icon to label `space.1`; buttons in a row `space.2` apart; compact buttons reach `hit.min` with hit slop |
| States | Default, pressed, disabled, loading (see [States and elevation](states.md)). Loading is used on Buy while Apple Pay or Google Pay returns: the label becomes a spinner and the button keeps its width |
| Rules | At most one filled (Indigo) button per viewport: the commit action (Buy, Ask, send). Secondary actions are tonal and neutral. On the receipt "Extend to Mon 16 Nov" is a plain text button and "Cancel for a refund" a destructive text button that asks to confirm in an alert |
| iOS ↔ Android | Filled capsule with continuous corners; over a photo or the map, or in a bar, prominent glass in Indigo (`glassProminent`) ↔ Material filled, filled tonal and text buttons. Web: filled capsule, blurred Indigo over a photo or the map |
| Accessibility | Role button; the label is the visible text with the price read out ("Buy, £29.98"); while loading the label becomes "Buy, waiting for payment" and the button reports busy |
| Truncation | Labels never truncate; at accessibility sizes the button grows in height and the label wraps to two lines |

## Answer card

| Aspect | Spec |
| --- | --- |
| Anatomy | The shop's placeholder tile (40, its accent and initials); shop name; status line with its source ("Has them", then "Replied 2 min ago" after it; "In stock now", then "1 of 2, from the shop's till"); price; walk time and collect-by date on one line; at most one action row (Buy, Buy 1, or Show me with No thanks) |
| Tokens | Card colour, `radius.card`, `inset.card`, `gap.block` between blocks. Shop name Headline, status Caption 1 Strong in Foreground with its detail after it in Caption 1, Muted foreground, price Title 3, meta Footnote. Arrives with `spring.arrive` |
| States | Default, pressed (the whole card), taken (after Buy it is replaced by the order card), dismissed (No thanks, with an undo snackbar) |
| Rules | Only the best answer has a filled Buy; "Buy", "Buy 1" and "Show me" on the others are tonal, in neutral colours. A tap anywhere on the card opens the details sheet, as Buy does. The shop's name is a link with a small chevron after it (Muted foreground, a 44 pt press area made from the line's height plus 11 pt above and below for Headline, 12 pt for Subheadline) that opens the shop's page, pushed with Back |
| iOS ↔ Android | Same card on both; the Buy button follows the button table |
| Accessibility | One element. Label: "Paper & Co, has them, replied 2 minutes ago, £14.99, 13 minute walk, collect by Monday 9 November". Activating it opens the details sheet; View shop, Buy, Show me and No thanks are custom actions. The name's own label is "Paper & Co, view shop" |
| Truncation | Shop name 1 line; status line 1 line, the source drops before the status; price never truncates |

## Order card

| Aspect | Spec |
| --- | --- |
| Anatomy | Status label (with a warning symbol on "not charged" endings); the shop in Headline with the items under it in Footnote ("Paper & Co", "2 × eclipse glasses"); total; while waiting, a list of up to three steps with the current one marked; an optional line "Keep looking for 1 more" |
| Tokens | Card colour, `radius.card`, `inset.card`, `gap.block`. Status Caption 1, shop and items Subheadline, total Headline, steps Footnote. A status change animates with `spring.status` |
| States | Each label in the conceptual model's state table; pressed opens the receipt. The shop's name is a link with a chevron that opens the shop's page; its press area is 44 pt tall (the line's height plus 11 pt above and below for Headline, 12 pt for Subheadline) and the card's own press area gives way to it; the receipt has a View shop button under its header |
| iOS ↔ Android | Same card on both |
| Accessibility | One element. Label: status, shop, items, total ("Waiting for Paper & Co, not charged yet, 2 eclipse glasses, £29.98"). Steps are read after the total as "step 2 of 3, Paper & Co sets them aside". Status changes are announced politely; View shop is a custom action |
| Truncation | Status label: the status and its detail wrap as two units at large sizes; items 2 lines; total never truncates |

## Snuffle mark

| Aspect | Spec |
| --- | --- |
| Use | Wherever Snuffle speaks or the app shows itself: the chat's sender line (inside the [Snuffle avatar](#snuffle-avatar)), the typing indicator, notifications, the Live Activity, the splash and sign in |
| Rule | The bare glyph from [Mark](mark.md), with no tile, circle, fill, border or shadow behind it, except in the chat's Snuffle avatar below. One colour that follows the theme: Foreground (dark on light backgrounds, light on dark), with the awning's two low-contrast stripes in Muted foreground. This reverses decision 045's "mark on a Lavender tile". Only the app icon, which the system draws, keeps a tile |
| Tokens | Width from size tokens, height 84/114 of it: inline `size.icon.nav` (22, the sender line), icon `size.avatar.shop` (40, notification and Live Activity), large `size.thumb.request` (56, sign in), splash `size.category.art` (120, the same width as the native splash). Dedicated `size.mark.*` tokens are still to add |
| iOS ↔ Android | Same on both |
| Accessibility | Decorative and hidden; the sender line or the surrounding label names Snuffle |

## Snuffle avatar

| Aspect | Spec |
| --- | --- |
| Anatomy | The mark glyph in a circle filled with `snuffle.bubble` (Lavender in light, Lavender 900 in dark), `space.2` before the word "Snuffle" on the sender line, centred on its line |
| Tokens | Circle `size.avatar.chat` (24), glyph `size.avatar.chatMark` (14 wide), fill `snuffle.bubble`, glyph in Foreground with the awning's two stripes in Muted foreground. Measured on the fill: Foreground 13.07:1 in light and 13.36:1 in dark, Muted foreground 5.04:1 and 6.06:1 |
| Use | The sender line of a Snuffle group, in the chat bubble and the typing indicator. Nowhere else: the nav bar and the ask bar keep the bare glyph |
| iOS ↔ Android | Same on both |
| Accessibility | Decorative and hidden; the bubble's label names the sender ("Snuffle: …") |

## Splash intro

| Aspect | Spec |
| --- | --- |
| Use | The first thing a first-run shopper sees, before Getting started: the mark builds itself on Indigo 800, then fades and hands over to page 1 (component `MarkIntro`) |
| Anatomy | The Snuffle mark at `size.category.art` (120, the native splash image's width) in the splash colours (white and Indigo 300 stripes) on `color.splash.ground`; the awning rolled at the top, five stripes unrolling 70 ms apart, ears, eyes and nose, two blinks; about 1.6 s, then a 250 ms hold, a 150 ms mark fade and a 200 ms ground fade |
| Tokens | `color.splash.*`; the ground is Indigo 800 in both modes, and Getting started's page 1 is the same Indigo 800 in dark, so the ground does not change colour as the intro hands over |
| States | Reduce Motion starts at the final frame and fades; `?intro=<ms>` freezes it at a time for review frames |
| Accessibility | Decorative and hidden; nothing to press |

## Chat bubble

| Aspect | Spec |
| --- | --- |
| Anatomy | Shopper: text, right-aligned. Snuffle: a sender line on the first bubble of a group, the [Snuffle avatar](#snuffle-avatar) and then the word "Snuffle" in Caption 1, with the day when it isn't today ("Snuffle, Sun 8 Nov"), then the text, left-aligned from the content edge, with no avatar column beside the bubbles |
| Tokens | Shopper bubble in Primary with its label colour; Snuffle bubble in `snuffle.bubble` (Lavender) with Foreground. `radius.bubble`, `inset.bubble`, Body text, sender line Caption 1. Maximum width 78% of the content width. `space.3` between bubbles from the same sender, `space.6` at a change of sender. The shopper's bubble appears with `spring.snappy` |
| Grouping | Consecutive bubbles from one sender form a group: one sender line ("Snuffle") per group, on its first bubble only; later bubbles of the group carry none |
| States | Sending (the bubble shows at once), sent, failed to send (a retry symbol beside it and "Not sent. Tap to retry") |
| iOS ↔ Android | Same on both |
| Accessibility | Each bubble is read with its sender ("Snuffle: I'm asking 6 shops…", "You: Collect"). The sender line is visible text, and each bubble's label names the sender even where the line is not shown. Suggestion chips under a Snuffle bubble follow it in the reading order |
| Truncation | Never truncates; long text wraps |

## Typing indicator

| Aspect | Spec |
| --- | --- |
| Anatomy | Three dots in a Snuffle bubble, under the sender line (the Snuffle avatar and "Snuffle") when it starts a group |
| Tokens | Snuffle bubble (`snuffle.bubble`), `radius.bubble`, `inset.bubble`; dots in `snuffle.dot`, pulsing with `spring.fade` |
| States | Shown only if Snuffle's reply takes more than about 300 ms; replaced in place by the reply |
| iOS ↔ Android | Same on both |
| Accessibility | Announced once as "Snuffle is writing"; with Reduce Motion the dots stay still at half opacity |

## Ask bar and composer

| Aspect | Spec |
| --- | --- |
| Modes | On Nearby: the ask bar, the Requests circle and the Ask capsule. On New Request: the composer with the glyph, and the place and deadline chips inside it (menu chips, `space.3` in from the capsule's edge). In a chat: the composer, "Reply", without the glyph |
| Anatomy | One row: a 48 glass Requests circle at the leading end, `space.2`, the Ask capsule (flex × 48, `radius.full`; decision 050's trailing placement is reversed). Inside the capsule: 16 (`size.askBar.leading`), the Snuffle glyph at inline size in Foreground, 12 (`size.askBar.gap`, `space.3`), the placeholder "Ask for anything nearby" in Body in Muted foreground, and a mic at 20 in Muted foreground in a 44 box (as in an iOS search field: it opens the same screen, where dictation is the keyboard's), 16 from the end (`size.askBar.trailing`, `space.4`). With text, the mic becomes the send button: a 36 circle in Primary |
| Requests circle | Before the capsule, in line with Back at the top left. The mic sits at the capsule's trailing end, and a circle there put it 8 pt from where the thumb rests, which invited wrong taps. The icon in Foreground. The count sits on the circle's top right edge and is Indigo 800 in both modes with white text, at least 18 across, in a 2 pt ring of the Background colour |
| Tokens | `size.field` (48) for the circle, the capsule and the composer; `margin.screen` at the sides; `clearance.askBar` (48) above it for the last row of content |
| Behaviour | It never shrinks or hides. Pressing it is the screen's primary action, and a bar that retracted while scrolling read as gone. The suggestion chips are on New Request, not above the bar |
| Transition | Pressing the capsule opens New Request: the capsule's glass morphs into the composer as the keyboard rises, the screen above crossfades and the Requests circle fades with it. The capsule starts one circle and a gap in from the screen margin (56 pt), so the composer grows from its measured rectangle across to the margin and the glyph and the placeholder end up where the composer's own sit. On the web a view transition names both glass shapes `snuffle-ask`; on iOS and Android the composer grows from the capsule's measured rectangle with `spring.smooth` while the route fades. Back folds it again. Reduce Motion: a crossfade |
| Keyboard | The composer rides on top of the keyboard and the content above it scrolls so the last message stays visible; the field grows to 5 lines, then scrolls. The keyboard belongs to the field: it closes when the field's screen loses focus (a push, a pop, a zoom) and if the field unmounts while focused. Nearby's ask bar has no field, so the keyboard never shows on Nearby |
| Materials | The chat composer (New Request, a request's chat, the Requests list) is a filled field, not glass: `chat.field` with a 1 pt `chat.fieldEdge` hairline on every platform, as in iMessage. Glass at 55% over the white chat ground measured 1.0:1 and barely showed; the field is 1.21:1 on the white ground in light (edge 1.53:1) and 1.29:1 on the Background in dark (edge 1.83:1), the placeholder is 6.28:1 and 6.60:1, and the Primary send button is 8.75:1 and 11.86:1 on its label. The Nearby ask bar and the Requests circle stay glass over the Background. Web glass: Card at 55% (`rgba(255,255,255,.55)` light, `rgba(40,37,35,.55)` dark) under blur 20 and saturate 1.6, a 0.5 pt inner top highlight in white at 60%, a 0.5 pt hairline in #100A06 at 6% and a shadow of 0 6 20 at 10%. iOS 26: Liquid Glass; earlier iOS: blur; Android: the tonal surface (see [Shape and materials](shape.md)) |
| States | Empty (mic), typing (send visible), sending (send becomes a spinner for at most a moment), send disabled while offline |
| iOS ↔ Android | Custom on both; the Requests circle opens Requests with the zoom transition on iOS and the container transform on Android (decision 026) |
| Accessibility | Capsule "Ask Snuffle" with the placeholder as the hint (the glyph and the mic are part of it); field label "Ask Snuffle"; send "Send"; Requests "Requests, 1 needs you" |

### Ask bar checklist

Checked against iOS 26 (the HIG on search fields and toolbars, Liquid Glass) and against how Apple Music, Maps and Photos, ChatGPT, Perplexity, Google Maps and Airbnb place a bottom composer or search.

| Check | Value | Status |
| --- | --- | --- |
| Placement | Bottom of the screen, within thumb reach, as iOS 26 moves search to the bottom on iPhone (Music, Photos, Safari) and as ChatGPT and Perplexity place their composer | Holds |
| Height | 48 (`size.field`), the size of an iOS 26 bottom search field; Requests circle the same 48 | Holds |
| Radius | `radius.full`, a capsule, as Liquid Glass controls | Holds |
| Padding | 16 before the glyph, 12 between parts, 16 from the end to the mic's icon, all on the spacing scale | Holds |
| Icons | Glyph at inline size; mic at 20 in a 44 box; Requests icon at 24 (`size.icon.bar`) | Holds |
| Mic | Muted foreground, part of the capsule's press, as the mic in an iOS search field | Fixed in this round (it was Foreground and read as a second action) |
| Separate circle | Requests sits before the capsule in its own glass circle, at the leading end, in line with Back; the mic at the capsule's end is 8 pt from a trailing circle | Decided: leading (round 10, reverses decision 050) |
| Safe area | `space.2` above the bottom safe-area inset, with a scroll-edge fade from 24 above the bar | Holds |
| Material | The glass recipe in [Shape and materials](shape.md), the same as Back, Close and the sheets | Holds |
| Never minimises | The bar never shrinks or hides while scrolling; Apple's tab bars minimise, but here pressing the bar is the screen's primary action | Holds (a deliberate difference) |
| Keyboard | Nearby has no text field; the keyboard opens on New Request, from the morph | Holds |
## Location control and sheet

| Aspect | Spec |
| --- | --- |
| Use | The place Nearby is built around, at the top of Nearby: "Blythe Road, W14 ›". A tap opens the sheet "Where are you shopping?" |
| Anatomy | Control: the location icon (`Location05Icon`), the place in Subheadline at 600 and a chevron. Sheet: Current location, the saved places (Home, Work), an address search field, then the radius as a segmented control: Within 10, 15 or 20 min walk |
| Tokens | Control at `hit.min`, label in Tint; places as an inset grouped list at `radius.card`; the field at `radius.inner`; `space.6` sheet padding |
| States | Current location (with `Gps01Icon`), a saved place, a searched address; location off: the Current location row asks for permission. Choosing a place or a radius closes the sheet and reloads Nearby, with skeleton tiles until the shops load |
| Rules | The radius sets which shops and streets count (decision 024). The active place changes only here; the Places row in the account sheet adds, renames and deletes saved places |
| iOS ↔ Android | System sheet at the fit detent, zooming from the control ↔ Material modal bottom sheet. Web: bottom sheet |
| Accessibility | Control: role button, label "Shopping near Blythe Road, W14, within 15 minutes' walk", hint "Change place". Each row reads its name and whether it is selected |
| Truncation | One line; the street truncates before the postcode district |

## Suggestion chips

| Aspect | Spec |
| --- | --- |
| Anatomy and tokens | As the suggestion chip on [Tags](tags.md): 32 high, `radius.full`, `space.2` apart, reaching `hit.min`. Card fill on the Background; `chat.fill` on a chat's ground |
| Placement | Under the Snuffle bubble that proposes them: three on New Request under Snuffle's opening bubble, and in a chat when Snuffle offers choices. Not on Nearby. They wrap onto a second line if they don't fit |
| States | Default, pressed; a tap sends the text and the chips leave with `spring.fade` |
| iOS ↔ Android | Custom chip ↔ Material suggestion chip |
| Accessibility | Role button; label is the chip's text; grouped as "Suggestions" |
| Truncation | One line; a chip longer than the content width ends with an ellipsis, which the label still reads in full |

## Shop tile and shop row

| Aspect | Spec |
| --- | --- |
| Shop tile (Nearby) | Photo 4:3 at `tile.large` or `tile.medium`, `radius.bubble`, a Delivers badge, with a scooter symbol, 8 from the photo's corner when the shop delivers (New and Promoted are not shown on the tile; Promoted is not shown anywhere in the prototype, though the data keeps it); name in Headline and its facts under it, `space.1` apart: the status ("Open until 6pm") and the walk with a footprints symbol ("2 min walk"), wrapping between the two on a medium tile (Metadata lines on the [Content](content.md) page) |
| Shop row (lists) | The shop's photo as a 40 thumbnail at `radius.inner` (over the placeholder tile while it loads), else its logo or the placeholder tile as a 40 circle; name in Headline, facts under it (status, walk, and the street where no filter names it, each a unit that wraps whole); `space.4` row padding |
| Photo loading or missing | The placeholder tile in the shop's accent sits under the photo, so the shop's colour shows until it fades in, or for good if it fails |
| States | Default, pressed; a closed shop reads "Closed" in Foreground with "opens 9am" after it |
| iOS ↔ Android | Same layout; a list of rows is an inset grouped list on iOS and a Material list on Android |
| Accessibility | One element. Label: name, badges, facts ("Rossi's Bakery, open, until 6pm, 2 min walk"); the photo has no separate label |
| Truncation | Name 1 line; facts up to 2 lines, wrapping between units before anything is cut |

## Request row

| Aspect | Spec |
| --- | --- |
| Anatomy | Item photo (56, `radius.inner`) with nothing laid over it; request name and time; Snuffle's latest status in its own voice as the preview ("Snuffle: Rossi's needs your answer"; the lines for every state are in [Content](content.md)); one status label with no dot, icon or repeat symbol; a count of unread answers or of requests that need the shopper. No button in the row: the shopper opens the request to decide |
| Tokens | Name Headline, time Caption 1, preview Subheadline in Muted foreground, status Caption 1 ("Needs you" in Foreground at 600, so Buy is the only Indigo on the row). `space.4` row padding, `gap.inside` within the text |
| States | Default, pressed, unread (count shown), swiped (Close as a trailing action) |
| iOS ↔ Android | Swipe actions on iOS ↔ a long-press menu on Android |
| Accessibility | One element. Label: name, status, preview, time ("Birthday cake, needs you, buy by Thursday 5 November, Snuffle: Rossi's needs your answer, 11:02am"). Close is a custom action |
| Truncation | Name 1 line; preview 2 lines; status 1 line |

## Sheet

| Aspect | Spec |
| --- | --- |
| Use | The details sheet, where the shopper buys: shop, item, price, quantity, how to get it, when the charge happens, Buy, the risk line and Directions |
| Form | A system sheet with a grabber and Close at the top left; the fit detent by default: it opens at the height of the header, the content and the bottom safe area, up to the large detent, and scrolls when the content is taller. Medium and large stay for a sheet where seeing the page behind helps (a map, a chat the shopper compares against) or a long list; Buy stays pinned at the bottom above the safe area |
| Title | Headline (Switzer 600, 17) by default, centred between Close and Confirm, as iOS sheets title themselves ("Where are you shopping?"). When the sheet's subject is a shop (the details sheet), the bar's title says what the sheet does ("Buy", Headline) and the shop's name is content: Display name (Gambetta 26), left-aligned under the bar |
| Ground | Every sheet has the same ground: the `sheet` colour, one tone darker than the Background in light mode (#DEDAD5 on #EEE9E2, 1.15:1) and one Stone step lighter in dark (#1C1D1E on #0B0C0D, 1.16:1). It is opaque at every detent (at 94% over a blur, photos behind it showed through as grey smudges) and keeps the glass rim, and one scrim sits behind every sheet: Foreground at 20% in light, black at 48% in dark (`color.sheetScrim`, `state.sheetScrim`), fading in with the sheet. What sits on the sheet moves one level up: grouped rows and text fields are Card in light (1.39:1) and Muted in dark (1.40:1), grouped lists take `radius.bubble` (20, the iOS 26 inset-grouped corner), and Close and Confirm in the header are glass in light and a solid Muted circle in dark (1.40:1; glass was 1.09:1 on the sheet). Chips and the segmented control follow their own rules below. In dark the row separators are Border, since the dark Separator is the Muted colour |
| Tokens | iOS: inset at medium and edge to edge at large. Android and web: `radius.sheet`, opaque in the `sheet` colour. The footer's fade is drawn from the sheet colour. A selected row keeps its fill; the tick carries the selection. Prices are Foreground. Header and content on `margin.screen` at the sides, so Close and Confirm line up with the rows, and `inset.sheet` (24) under the content; the inner option cards use `radius.inner`. The grabber is `color.grabber`, quieter than the title. An optional subtitle sits under a Headline title in the header, Subheadline in Muted foreground, `space.1` under it. Zooms from what was tapped (see [Motion](motion.md)) |
| States | Fit, medium, large, dismissing (a drag down or Close), blocked from dismissing while Buy is loading. A fitted sheet follows its content: when the height changes while it is open (search results, tags after an answer), it moves to the new height with `spring.smooth` |
| iOS ↔ Android | System sheet with detents, where fit is the custom detent of iOS 16 and later (a detent that returns the content's height) ↔ Material modal bottom sheet, which wraps its content up to the expanded state, with a drag handle. Both over the same scrim. Web: the iOS form |
| Keyboard | Opening a sheet closes the keyboard of any field under it; a field inside the sheet raises the sheet with the keyboard; closing the sheet closes its keyboard |
| Accessibility | Focus moves to the sheet's title on open and back to the card on close; the scrim and Close both dismiss; escape gesture on iOS |

## Nav bar

| Aspect | Spec |
| --- | --- |
| Forms | No bar fill: the controls float in glass over a scroll edge effect (soft blur and fade), with the hard edge only on dense lists. Large title on Nearby and Requests, scrolling with the content and collapsing to an inline leading title. In a chat, the title block is centred on the screen: "Snuffle" with its glyph on the first line and the request on the second, and Back as a chevron alone in a glass circle, centred on that block, with "Requests" in its long-press menu. The chat's bar is a solid fill of the chat's ground with a 0.5 pt hairline. On the shop page the bar is pinned: Back as a chevron in a glass circle on the left at every scroll position, and the name in Headline fading in over the scroll edge once the large title has passed under the bar; the bar is a solid fill of the card's tile with a 0.5 pt hairline under it once the name shows, so no content shows half cut beside Back. Icon actions on the right share one glass capsule |
| Tokens | Large title in Display large (Gambetta 48) on the root screens, Nearby and Requests, and Display title (Gambetta 40) on other screens such as Places; 16 from the bar's controls or 24 from the row above, and 16 to the content it introduces. Inline title Headline; Back, Close and Confirm circles about 44; icons 22 |
| Chat subtitle | The request's name in Caption 1 under "Snuffle", centred. The bar is as tall as its two lines (Headline and the 28 pt thumb) plus `space.3` above and below, so the title never sits closer than 12 pt to the top of the bar. Before it, a 28 pt square (`size.thumb.nav`) with a 1 pt Border edge, clipped to a 6 pt radius (at 20 pt the photo read as a grey blur): the item's photo, the same as its row in Requests, or the category's still on the shop accent's tile when there is no photo. It shows only for one item of a known kind, is decorative (hidden from VoiceOver and TalkBack), and the bar keeps no colour band beyond its solid ground |
| iOS ↔ Android | Floating glass controls over a scroll edge effect ↔ Material flexible top app bar collapsing to small, tinted on scroll. Web: large heading, inline title fading in over a gradient mask, blurred circles |
| Accessibility | The title is a header; Back is labelled with the previous screen's title ("Requests"), Close and Confirm with their action |
| Truncation | Inline title 1 line with an ellipsis; large titles wrap to two lines |

## Stepper

| Aspect | Spec |
| --- | --- |
| Anatomy | Label "Quantity", a minus button, the value, a plus button |
| Tokens | Buttons 36 in a circle, Muted fill, Tint symbol, reaching `hit.min`; value in Headline; `space.3` between the parts |
| States | Minus disabled at 1; plus disabled at the shop's stock ("Has 1 of 2" caps it at 1); each step updates the Buy label's total |
| iOS ↔ Android | iOS stepper style ↔ two Material icon buttons around the value (Material has no stepper) |
| Accessibility | One adjustable element: "Quantity, 2"; swipe up and down to change it |

## Segmented control

| Aspect | Spec |
| --- | --- |
| Use | "Once" and "Every week" on Keep looking; the walking radius in the location sheet |
| Tokens | Full content width, `radius.full`, label in Subheadline; selection moves with `spring.snappy`. The iOS pattern: a thumb one level above its track under the delicate card shadow, no edge. Light: a Card thumb on a Border track (1.53:1; on Muted it was 1.29:1 and the track 1.08:1 on the sheet). Segments are 32 high with 6 of hit slop above and below (44); the track's padding is `size.segmented.inset` (2). Dark: a Stone 360 thumb on a Card track (1.41:1; a Muted thumb was 1.15:1). `color.segmented.track` and `color.segmented.thumb`. Selected label in Foreground, Subheadline 600; the others in Foreground, Subheadline. Android keeps the selected chip role (`chipSelected`, `onChipSelected`) with a check |
| States | One segment selected; pressed; disabled segments are not used |
| iOS ↔ Android | System segmented control ↔ Material single-select segmented button, with a check on the selected segment |
| Accessibility | Each segment is a tab with "1 of 2" and its selected state |

## Collection code

| Aspect | Spec |
| --- | --- |
| Anatomy | The heading "Collection code, show at the counter", the code ("K7Q2"), a QR code, "Tap to enlarge" |
| Tokens | Code in Title 1, letters spaced; QR on a white Card surface in both modes, `radius.inner`; the block sits in the receipt's card |
| States | On the receipt; enlarged full screen, with screen brightness raised and restored on close; collected (the view closes and the order card reads Collected) |
| iOS ↔ Android | Same on both; brightness through the system API on each |
| Accessibility | The code is read character by character ("K, 7, Q, 2"); the QR is hidden from the screen reader; the enlarged view has a Close button |
| Truncation | Never truncates; the code keeps one line at every text size and the QR shrinks first |

## Map

| Aspect | Spec |
| --- | --- |
| Use | The fixed background at the top of the shop page, centred on the shop, with one pin, tilted 45–60° so the buildings stand in 3D |
| Tokens | A style generated from the palette (see [Imagery and icons](imagery.md)); the pin is `Location01Icon` in Primary; `radius.none` at the screen edges |
| States | Loading (Map ground and the shop's static map image), loaded; gestures off on the shop page; if the map fails to load, the static image stays |
| iOS ↔ Android | MapLibre on iOS, Android and the web, with one style and bundled OpenStreetMap data; Directions opens the system maps app |
| Attribution | "© OpenStreetMap contributors" in a corner of the map, in the app and in the recording |
| Accessibility | Hidden from the screen reader; the street and walk time in the card carry the same information |

## Notification and Live Activity

| Aspect | Spec |
| --- | --- |
| Notification | Title: the request name ("Eclipse glasses"); body: Snuffle's line ("Paper & Co on King Street has them too: £14.99 a pair."); one per answer, grouped by request. The mark beside it is the bare glyph, with no icon tile |
| Live Activity | The request name, its status label ("2 shops have them", with its deadline after it) and the Snuffle mark as a bare glyph, with no icon tile; progress in Snuffle's Lavender (`snuffle.dot` on `snuffle.bubble`); it updates as answers arrive and ends when the request has an order or ends |
| iOS ↔ Android | Notification and Live Activity on the lock screen and Dynamic Island ↔ notification and Live Update (Android 16) or an ongoing notification on earlier versions |
| Rules | Status labels as in the conceptual model; no marketing notifications; the prototype draws these as simulated screens (decision 038) |
| Accessibility | System-drawn; the text must read without the app open |
| Truncation | Body up to 2 lines on the lock screen; the price stays in the first line |

## Toast and snackbar

| Aspect | Spec |
| --- | --- |
| Use | Undo after No thanks on an answer card and after Close on a request; short confirmations that need no decision |
| Anatomy | One line of text and at most one action ("Request closed", then Undo) |
| Tokens | Above the ask bar, `margin.screen` at the sides, `radius.full` on iOS; shown and hidden with `spring.snappy`; 4 seconds, longer while a screen reader is on |
| iOS ↔ Android | A custom banner in glass (iOS has no system toast) ↔ Material snackbar |
| Accessibility | Announced politely; the action is reachable before the banner leaves |

## Close and Confirm buttons

| Aspect | Spec |
| --- | --- |
| Anatomy | Close: an × in a glass circle. Confirm: a checkmark in a circle tinted Indigo |
| Tokens | About 44 across, `radius.full`, icons 22; glass on iOS 26, blur on earlier iOS and the web |
| Placement | Close at the top left of sheets and presented views (`role: .close`). Confirm at the top right of a sheet that saves an edit, such as renaming a place (`role: .confirm`) |
| iOS ↔ Android | Glass circles ↔ a close icon in the top app bar or the sheet header, and a filled or tonal "Done". Web: blurred circles |
| Accessibility | Labels "Close" and "Done" |

## Page dots and sign-in buttons

| Aspect | Spec |
| --- | --- |
| Use | First run: the dots under Getting started's three pages; the sign-in buttons on Sign in |
| Page dots | `size.dot` (8), `space.2` apart; the current one Foreground, the others Foreground at `state.pageDotOff` (55%; 35% left them at 2.17:1 on the light Indigo), so they tint with the ground under them; over a shop photo they are white (`onLightbox`) in a black pill (`state.photoPill`, 30%), changing with `spring.fade`. They show where the shopper is and aren't buttons; swipe and Continue move between pages |
| Sign-in buttons | Apple, Google and Facebook are one button, the secondary capsule: large (50, full width, `radius.full`), Card with a 1 pt Border edge (`size.edge.control`), the label "Continue with …" in Headline and Foreground, the provider's icon 20 pt (`space.5`) leading. Only the icon differs, and it stays the owner's published shape: Apple's logo, the full-colour Google G, Facebook's white f on #1877F2. Apple's logo and title are both Foreground, near-black on light and white on dark, as its HIG asks. Apple comes first. Email is a text button in Tint at Headline's 600. In light the button separates from the ground by 1.2:1 and its edge by 1.3:1; in dark 1.3:1 and 1.8:1 |
| Getting started button | On a coloured onboarding ground the action is Foreground-inverse: a Foreground capsule with a Background label (black in light, near-white in dark), not Primary, which would sit Indigo on Indigo or pastel. The last page's label is "Get started", the others "Continue" |
| States | A sign-in button shows a spinner while it signs in, and the others are disabled |
| Accessibility | The dots are one element ("Page 2 of 3"); each sign-in button is a button named by its label |

## Shop page header

| Aspect | Spec |
| --- | --- |
| Anatomy | The map with the shop's pin, fixed behind the screen; a content card close under a strip of map with the pin centred in it, which holds the name, the facts line ("Open until 6pm" on its own line, then "2 min walk", "Blythe Road", "Delivers" with a scooter symbol and "New" with a sparkles symbol, each a group with its symbol, the last two when they apply; with all four, the walk and the street are one row and Delivers and New the next, so a fourth group never wraps alone, and every group is 12 apart), Ask [shop] as the filled button ("Ask" alone when the name is longer than 10 characters, with the shop's name in its spoken label, so the row fits at 402 pt and its last button keeps the card's padding), Call and Directions as tonal buttons, the photo carousel, then the sections in this order: What they sell (the product summary), Found here recently (up to five item names in plain rows, each with when it was found at the end of the row, "Yesterday", "2 days ago"; nothing to press, no photos), How it works (collection, delivery, and "Made to order" with its notice when the shop makes to order), Ratings (one panel with a sideways row of cards of the same height, the rating summary first and then up to five review cards, and "See all 38 reviews" and "How ratings work" as two rows at the panel's foot; a vertical stack at accessibility text sizes) and How they do on Snuffle (reliability rows) |
| Tokens | The card is the shop's accent tile (`shop.accent.<hue>.tile`), in light and in dark, solid and not glass, with `radius.sheet` on its top corners: 1.29 to 1.35:1 over the map ground in light and 1.71 to 1.83:1 in dark, so it has no edge. It rests `space.8` (48) under the bar's band, so the strip of map from the top of the screen to the card (the safe area included) holds the pin in the middle of what is left under the status bar: the pin's ink is centred between the bottom of the status bar (the safe area's top inset, under the Dynamic Island) and the card's top edge, the same space above it as below it (33.3 pt each on a phone without an inset). The web device frame supplies the same inset. At rest the map shows `space.3` (12) at each side; the content has `space.6` (24) of padding inside that. The rows, the review cards and the "What they sell" block are `cardOnTile` (white in light, the tinted card in dark), the chips and the rating tags `tag.fillOnRow` (the Background in light, 1.21:1 on the white row; `tag.fillRaised` in dark, 1.36 to 1.41:1 on the row; no edge), the Call and Directions capsules `state.tonalOnTile`, and secondary text `mutedForegroundOnTile`; every pair is in [Colour](colour.md#shop-accents). Ask is the one filled Indigo. Liquid Glass stays on Back and the pinned bar. Scrolling: over the first `space.6` of travel the card grows to the full width and every container in it grows with it, with its left edge on the card's: the photo carousel (its height stays, so nothing below moves), the grouped rows, the chip groups, the review cards, the actions row and the separators. Only the text blocks (the name, the status and facts lines, and the paragraph under a list) keep the width they have at rest, so their line breaks never change; their start follows the edge. The photo group has `gap.section` above it, to the actions, and `gap.section` below it, to the first heading; the actions sit `space.3` under the facts. The actions row scrolls sideways and runs under the card's edges. The nav bar's scroll edge takes the tile. Name in Display title; section headings in Section title; the status and facts in Subheadline, Muted foreground on the tile, with non-breaking spaces inside each fact ("Open till 6pm", "Blythe Road", "2 min walk") so a line breaks only between facts; the map's attribution is 11 pt (Caption 2) in the map's bottom right corner, `space.5` and `space.2` (28) above the card; Back over the map is glass in light, and in dark a solid Muted circle with a Border edge (glass is Card there, the same as the map) |
| States | Resting (a strip of map above the card shows the pin); expanded (the card scrolls up over the map, and fills the screen; the nav bar's title appears on a solid bar in the tile colour with a hairline under it, so no row shows through behind the title) |
| iOS ↔ Android | Same layout; it is pushed from the screen that opened it (the shop's detail), so it has Back, never Close (conceptual model) |
| Accessibility | Reading order: Back, photos (each a button labelled "[Shop] shopfront, [street], 1 of 3"), name, status, Ask, Call, Directions, then the sections |
| Truncation | Name wraps to two lines, never more; status lines wrap |

## Photo carousel

| Aspect | Spec |
| --- | --- |
| Use | The shop's photos on the shop page, between the map's pin and the card; Airbnb's listing page is the reference |
| Anatomy | Inside the shop card, after the actions row and before What they sell: one photo at a time at the container's width less 24 (at rest the screen width minus the map's `space.3` and the `space.6` of padding on each side, growing with the card as it fills the screen), 2:1 at rest (`layout.carouselRatio`) and the same height after, each photo at `radius.inner`, over the shop's placeholder tile; paging sideways, 8 between photos, with 16 pt of the next one showing (`space.4`); page dots centred on the photo, over its bottom edge, `space.3` above it; with one photo there are no dots and no paging |
| Tokens | A black scrim (`color.photoScrim`) rises from the bottom edge of each photo: `state.photoScrim` (40%) at the edge, gone at `layout.photoScrimReach` of the height. The dots sit in a black pill at `state.photoPill` (20%; 30% read as a dark lozenge and 12% left the white dots at 2.5 to 2.8:1 on a pale photo). Dots are PageDots: white, and the others at `state.pageDotOff` |
| Contrast | White dots on the photo with the scrim and the pill, at the dots' height, on a pure white photo and a pale one (#F2F2F2): 3.0:1 and 3.3:1; on a dark photo the ratio is 12:1 or more. The inactive dots are 1.5 to 2.5:1 and only mark position, as on Getting started |
| States | Loading (the placeholder tile shows until the photo fades in, `spring.fade`); failed (the tile stays); pressed (opens the viewer) |
| Accessibility | The list is "[Shop] photos"; each photo is a button read as "[label], 2 of 3" with the hint "Opens the photo full screen" |

## Photo viewer

| Aspect | Spec |
| --- | --- |
| Use | A full-screen view of the shop's photos, opened from a carousel photo (frame "Photo viewer" in app flow v10) |
| Anatomy | A black ground (`color.lightbox`, the same in light and dark); the photo at the screen's width, centred; the glass Close at the top left below the status bar; "1 of 3" centred on that row in Headline (`color.onLightbox`, white on black 21:1); "Pinch to zoom, swipe for the next photo" in Footnote under the photo (`color.onLightboxMuted`, 11.4:1) |
| Gestures | Pinch zooms up to 4x about the photo's centre; one finger moves a zoomed photo inside its edges; double-tap zooms to 2.5x and back; swiping moves to the next photo, and is off while a photo is zoomed |
| Motion | Opening grows a copy of the tapped photo from its rectangle to its place with `spring.smooth` while the black ground fades in; closing does the reverse into the photo the viewer is on, and the carousel is already on it. With Reduce Motion, or when the photo it opened from has scrolled away, it fades with `spring.fade` |
| iOS ↔ Android | Same layout; Close is glass on iOS and the web, a tonal circle on Android. The viewer is presented through the root portal, so on the web it stays inside the phone frame |
| Accessibility | The viewer is modal; each photo is read with its label, the count as "Photo 1 of 3", Close as "Close photo" |

## Placeholder tile

| Aspect | Spec |
| --- | --- |
| Use | A shop without a photo, or while its photo loads: answer cards, request rows, shop rows, tiles, shop page photos |
| Anatomy | The shop's accent `tile` fill; its initials (two at most) in the accent `ink`; the mark's five-stripe awning as a band across the top, alternating `ink` and `wash` |
| Sizes | Large (tiles, photos): band 12, initials Headline. Small (40 thumbs): band 8, initials Subheadline 600. Tiny (24 circles): initials Caption 2, no band. Circles leave the band out |
| Rules | The accent comes from the shop's kind and never changes; the tile is the shop's colour, not a state |
| Accessibility | Hidden; the card or row carries the shop's name |

## Category card

| Aspect | Spec |
| --- | --- |
| Use | "Browse by category" on Nearby, the first section under the title: one card per kind the area has (a kind with no shop nearby has no card), in a sideways rail ordered by the number of shops of that kind that are open now within the area (the area's one hours state, since there are no per-shop hours yet), most first; ties go by a fixed everyday-frequency prior (café, bakery, chemist, newsagent, butcher, deli, florist, hardware, stationery, books, toys, opticians, fashion, cameras, gifts, bags); kinds with none open go last in the same prior. Then the hues are spread: a card may move up at most two places when the card before it has the same pastel, so the count order breaks no more than it must. This rule is an assumption: there is no usage data yet, and the prior is my guess at what a shopper wants on an ordinary day. Deliveroo personalises its home screen by orders and time of day ([help.deliveroo.com/articles/3203714](https://help.deliveroo.com/articles/3203714)); with order history, the prior would give way to the shopper's own counts |
| Anatomy | A 120 × 164 card in the kind's accent `tile`, `radius.bubble`; a still of the closest 3D object at the top, rendered on the card's own colour; the label in Headline (17) at the bottom, `space.3` inset, short enough for one line ("Toys", "Butchers"). Kinds without a close still are the tile and the label |
| Performance | Fixed size so the rail never lays out again; memoised; the still is an `expo-image` at its exact size with a disk cache and a recycling key; stills only in the list, no clips or live 3D |
| States | Default, pressed; a tap opens the Category screen with the zoom from the card |
| Accessibility | Role button, labelled with the kind; the still is hidden |

## Category screen

| Aspect | Spec |
| --- | --- |
| Use | The places of one kind in the shopper's area ("Bakeries", "Delis and cafés"), nearest first |
| Anatomy | The whole screen is the kind's `tile`. Back, in glass with the `tonalOnTile` fill (the Card fill read as a dent on the dark tiles); a header with no fill or side inset of its own, so it lines up with the chips and list: the name in Display title, `gap.aboveTitle` under the bar's area so Back to title is 32, wrapping before the still; a line "3 places within 15 min walk" `space.2` under it in `mutedForegroundOnTile` ("1 of 3 places within 15 min walk" while a street is chosen); the kind's still resting on the header's bottom edge, `gap.title` above the chips; street filter chips when the places are on more than one street, All and four streets at most, on the tile's chip rule; shop rows in a grouped list at `radius.card` (the shop's photo as a 40 thumbnail at `radius.inner`, else the placeholder tile as a 40 circle, name, the facts (status, walk, and the street while All is chosen), a chevron; the street drops while a street is chosen, and "2 min walk" never breaks) |
| Rows | The rows take the accent's `cardOnTile` under the delicate shadow: white Card in light; in dark a tinted card at OKLCH L 0.44, C 0.026 to 0.032 in the accent's hue, 1.40 to 1.48:1 lighter than the tile, since Card rows read as holes in the colour (decision 050). The facts and the chevron take `mutedForegroundOnTile` (Stone 880 in dark, 5.50:1 or more). The screen sits in `<Ground value="tile" accent>`. See [Colour](colour.md) |
| Transition | Zooms from the category card on every platform; the bar's title appears once the header scrolls under it |
| States | A row opens the shop page |
| Accessibility | The header's name is the screen's header; each row reads name and meta |

## Receipt header

| Aspect | Spec |
| --- | --- |
| Anatomy | A card in the shop's accent `tile`, with no band; the status label, the shop's name in Display name (Gambetta 26) and the items line; when Ready, the basket illustration (88) above it |
| Actions | Directions is the one filled button; "Extend to …" is a plain text button and "Cancel for a refund" a destructive text button |
| Accessibility | The name is the screen's header; the basket is hidden |

## Product summary

| Aspect | Spec |
| --- | --- |
| Use | "What they sell", the first section on the shop page |
| Anatomy | Category chips (a connected shop's from its till's categories and best sellers; an asked shop's from its past "Had it" answers and its kind); a price line in Footnote, "Most items £2–£35, from past answers" or "from the shop's till"; "Asked about recently", up to three past answers as rows ("Tide clock batteries", "Had it, 2 hours ago"), left out where the page already shows Found here recently, which summarises the same answers by name |
| Tokens | Chips as suggestion chips on the Card row, `space.2` apart, wrapping to two lines at most; each is `tag.fillOnRow` with no edge and no tile colour (the Background on the white row in light, 1.21:1; `tag.fillRaised` in dark, 1.36 to 1.41:1; see [Tags](tags.md)), `gap.block` between chips, price line and rows |
| States | A chip press opens Ask with "[category] at [shop]" filled in; no past answers: "Asked about recently" is left out; no categories yet: the shop's kind alone ("Stationer") |
| Rules | Items still get no page: a past answer row opens nothing, and a chip asks. On the shop page What they sell is ranges and the price band, and "Found here recently" below it lists the names only, not tappable, with a line that says where they come from; the per-answer "Had it, 2 hours ago" rows live in the chat. A list of item names with no press carries its source. The price line never rounds a range out to look cheaper |
| Accessibility | Chips are buttons labelled "Ask about [category]"; the price line reads "Most items 2 to 35 pounds, from past answers" |

## Reliability row

| Aspect | Spec |
| --- | --- |
| Use | "How they do on Snuffle", what Snuffle saw from answers and orders: answer rate, stock accuracy, reply time |
| Anatomy | One row per signal: a HugeIcons glyph, the signal in Subheadline ("Answers 9 in 10 requests", "Had it 24 of 25 times they said yes", "Usually replies in 6 min"), the source in Footnote ("from 31 requests on Snuffle"). A connected shop shows "Stock from the till" in place of reply time. Below 10 "has it" answers stock accuracy is left out and the section opens with "New on Snuffle" |
| Tokens | Rows on Card under the delicate shadow, `gap.block` between rows. The glyph sits in a `size.icon.bar` column that starts at the row's leading inset (`space.4`, the same as the text of the rows around it), so the glyph is as far from the card's edge as the titles are, and it is centred on the title's first line when the row wraps or has a source line. The separator is inset to the text, as in an iOS list, and every row has the same vertical padding (`space.3` above and below the text). Text in Foreground and Muted foreground |
| States | Default; new (fewer than 10 "has it" answers); connected shop |
| Rules | Counts as written, never rounded up ("24 of 25", not "100%"); no colour scale or traffic light; never "verified" |
| Accessibility | One element per row, full label: "Had it 24 of 25 times they said yes, from 31 requests on Snuffle" |

## Rating summary

| Aspect | Spec |
| --- | --- |
| Use | The first card of the Ratings carousel on the shop page |
| Anatomy | "92%" in Display title with "would go back" in Body beside it and "38 people" under that in Subheadline, Muted foreground (below 5 ratings the count alone in Title 3, "3 people so far"); then up to three tags with their counts as a wrapping group of chips ("Had it as promised 21"), the shortest first, only those that fit the card whole (a longer tag is dropped, never truncated). In the card the figure is above its caption, and the review cards follow it in the same row. "See all 38 reviews" (opens the full list) and "How ratings work" are not in the card: they are two rows with a chevron at the foot of the Ratings panel, full width under the cards, a hairline above each |
| Tokens | A card at 72% of the panel's inner width, `cardOnTile` on the shop page (Card elsewhere), `radius.inner`, `space.4` inside; `gap.block` between the figure and the tags; with no links in it the card is about 250 pt tall, and the review cards take that height. The panel's two links are each `hit.min` high, inset `space.4`. The chips are the one chip treatment of a row in the shop card: `tag.fillOnRow`, no edge, no tile colour, `size.chip` high, `space.3` of side padding, the tag in Footnote and its count in Muted foreground, `space.2` apart; a tag that would not fit is not shown. Light: the Background on the white row, 1.21:1, Foreground 16.3:1 and the count 6.3:1. Dark: `tag.fillRaised` (Stone 360), 1.36 to 1.41:1 on the four `cardOnTile` rows, Foreground 10.3:1 and the count 7.7:1. They are never a control's fill and nothing happens on tap |
| States | No ratings: "No ratings yet" with "Snuffle has asked them 4 times" after it; few (fewer than 5): "3 people so far" and the tags, no percentage ("New on Snuffle" stays in How they do on Snuffle and isn't repeated here); many: the percentage; with a summary: "Summary by Snuffle from buyers' notes" above two lines of text |
| Rules | No stars, no average, no decimal; the percentage is rounded down; the count of people always sits next to it. Negative tags show with their counts like the positive ones |
| Accessibility | One element: "Would go back, 92 percent of 38 people". Each tag reads "Had it as promised, 21". The thumbs glyph is hidden; the number and words carry the meaning, never colour alone |

## Review card

| Aspect | Spec |
| --- | --- |
| Use | One person's note. On the shop page, up to five as cards after the rating summary in the Ratings carousel (a vertical stack at accessibility text sizes, content.md); on the Reviews screen, every note as a row of a grouped list, on the shop's accent tile |
| Anatomy | On the shop page a card at 80% of the panel's inner width so the next one peeks in, the same height as the summary card beside it, the note clamped to five lines, `space.3` apart, snapping card by card from the panel's inner edge and running to the panel's edge while it scrolls; the shopper's own note comes first. The summary card is 72%, and with no review cards it takes the full width. The panel is one container for all the cards (the Background in light and the Sheet colour in dark, `radius.inner`, `space.3` of padding all round): 1.20 to 1.26:1 on the tile in light and 1.47 to 1.58:1 in dark (the Sheet colour, #1C1D1E), with the cards on it 1.21:1 lighter in light and 2.15 to 2.22:1 in dark. No autoplay. On the Reviews screen a plain grouped row, no tile of its own. Either way: the person's first name in Subheadline semibold with the month ("Oct 2026") in Footnote, Muted foreground, at the end of the same line ("You" for the shopper's own note); for a thumbs down only, a thumbs-down glyph before the name (a thumbs up has no label); under it the note in Body without quotation marks, clamped to five lines on the shop page cards and whole on the Reviews screen; no avatar and no purchase type; a separator inset to the text between rows; the shop's reply, if there is one, indented under "Reply from [shop]" |
| Tokens | The card takes the shop page's `cardOnTile` with the delicate shadow (elsewhere Card), `radius.inner`, `space.4` inside on every side, `space.3` between cards. The grouped row has the Card fill, `radius.inner` on the group's first and last row, `space.4` leading and `space.3` above and below, lines `space.1` apart; name Subheadline 600, month Footnote in Muted foreground, note Body; the reply on `chat.fill` with `radius.bubble` |
| States | Default; with a note; shop replied; edited ("Edited Oct 2026") |
| Rules | First names only, never surnames or photos (the prototype's names come from a fixed pool of UK first names); the highlighted cards mirror the overall split, so with 10% thumbs down at least one negative card shows once there are more than 10 ratings; negatives are never held back |
| Accessibility | One element per card: "Priya, October 2026. Wouldn't go back. Not ready when I came. Reply from Paper & Co: …". The row is a scroll view labelled "Ratings and reviews, 3 of 38". Under Reduce Motion the fling settles at once instead of decelerating |

## Rating sheet

| Aspect | Spec |
| --- | --- |
| Use | Opened by Rate on the order card ("Collected · rate Paper & Co"), the receipt, or the Rate chip under Snuffle's bubble "How was Paper & Co?" after a delivery |
| Anatomy | Fit detent; title "Would you go back?", with "Your visit to Paper & Co" under it in the header; two large buttons side by side, thumbs up "Yes" and thumbs down "No"; once an answer is chosen, Send as the filled button right under them, so it is in view without scrolling, then its tags as filter chips (up to three) under "What went well?" or "What went wrong?" and an optional note field ("Anything to add?", placeholder "Optional, 140 characters") |
| Tokens | Sheet as the sheet table; thumb buttons 88 high (two hit heights), tonal, `radius.bubble` (20, a selection tile's fixed radius, see [Shape](shape.md)), selected in the selected role with a `Tick02Icon` in the corner; the reasons' heading 24 under Send and 8 over its chips; chips `space.2` apart; the note field on Card with a counter in Caption 1 |
| States | Empty (Send hidden); answered (tags appear with `spring.arrive`); sending; sent (the sheet closes and the order card reads "Collected · rated"); editing (opened again within 30 days, with the earlier answer selected) |
| Rules | Done in under 10 seconds: one tap and Send is enough. Tags change with the answer, and switching the answer clears them. No offer or reward is attached to rating |
| iOS ↔ Android | Sheet with a fit detent ↔ Material modal bottom sheet wrapping its content |
| Accessibility | The thumbs are a pair of toggle buttons labelled "Would go back" and "Wouldn't go back"; chips announce "selected, 2 of 3"; the counter is read when 20 characters remain |

## Truncation summary

| Text | Lines | Rule |
| --- | --- | --- |
| Shop name | 1 | Tail ellipsis; on the shop page two lines |
| Request name | 1 | Tail ellipsis |
| Preview in a request row | 2 | Tail ellipsis |
| Status label | 1 | The detail moves to a second line, as a whole, before anything is cut |
| Item name | 2 | Tail ellipsis |
| Price, total, collection code | Never | Other text gives way first |
| Chat bubble, button label | Never | Wraps |
| Rating note | 3 | "More" opens the full note; 140 characters at most |
| Signal row, rating summary | Never | Wraps |

## Sources

- Apple, Human Interface Guidelines: buttons, sheets, navigation bars, segmented controls, steppers, notifications, Live Activities, accessibility: https://developer.apple.com/design/human-interface-guidelines
- Apple, "Build a UIKit app with the new design" and "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/ and https://developer.apple.com/videos/play/wwdc2025/323/
- MapLibre: https://maplibre.org
- Material 3 components: buttons, bottom sheets, top app bar, segmented buttons, snackbar, chips: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- React Native, accessibility (custom actions, adjustable role, live regions): https://reactnative.dev/docs/accessibility
- Competition and Markets Authority, Fake reviews guidance (CMA208), 2025: https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf
- [Benchmarks](../../discover/benchmarks.md), Ratings section, for the patterns behind the rating components
- [App flow](../ideation/app-flow.md), v7, for the screens; [Conceptual model](conceptual-model.md) for the words and states; [Shape and materials](shape.md), [Spacing and layout](spacing.md), [Motion](motion.md), [Colour](colour.md), [Typography](typography.md), [Tags](tags.md) and [Imagery and icons](imagery.md) for the tokens
