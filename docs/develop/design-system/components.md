# Components

Every component the v7 screens use, specified from the tokens on the other design-system pages: what it is made of, which tokens it takes, its states, its iOS and Android forms and what a screen reader gets. The prototype is built from them.

```summary
Takeaways:
- Twenty components, each in one table: anatomy, tokens, states, iOS and Android forms, accessibility and truncation.
- Only token names from the foundations are used: `radius.*`, `space.*` and the semantic gaps, `spring.*`, the colour roles and the type styles. Where a value has no token yet, the table says so.
- At most one filled Indigo control is visible at a time, the commit action (Buy, Ask, send). Tonal buttons are neutral, the selected chip is tonal Indigo (Indigo 100 with Indigo 800 text), and filled Indigo means the shopper acts. Answer, order and request cards are one element for VoiceOver and TalkBack, with Buy or the row's button as a custom action.
- A shop shows in its accent wherever it appears: a tonal tile with its initials and the mark's awning, its accent behind its name on its page, a tinted header on its receipt. "Browse by category" on Nearby is a rail of category cards in the same pastels, and each opens the Category screen with the places of that kind.
- The ask bar never shrinks: one row with the Requests circle and the Ask capsule (the Snuffle glyph, "Ask for anything nearby", a mic). Its glass morphs into New Request's composer. Sheets title themselves in Headline, centred.
- Bars have no fill: Back, Close and Confirm are glass circles, icon actions share one glass capsule, and a scroll edge effect replaces the bar background. The address at the top of Nearby opens the location sheet.
- A shop name takes one line, a preview two, and a price never truncates.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose HugeIcons for icons (decision 042) and kept these specs provisional (decision 043), to be tuned at real size in the prototype.
- In this round I asked to follow iOS 26 and Liquid Glass as Apple's own apps use them, for a location flow from the top of Nearby, and for a free map I can style.
- After a brand review I approved shop accents, Lavender for Snuffle, at most one filled Indigo control per viewport, Gambetta for every screen and section title, category cards on Nearby and the 3D illustrations in screens (decision 045).
- In this round I was confused when the ask bar retracted while I scrolled: pressing it is the primary action, so it never shrinks. I also said "I don't want Shops by kind, I want to find places by category", and approved a craft review's fixes to sheets, chips, the shop page, the receipt and Requests (change craft-pass-2).
- Later I decided the Snuffle mark never sits on a tile or in an avatar: it is a bare glyph in one colour that follows the theme. This reverses decision 045's mark on a Lavender tile.
AI:
- An agent reviewed the design system against the v7 screens and listed what was missing. Another agent wrote this page from the existing tokens and the v7 frames; I set the scope and the rules it had to follow.
- An agent rewrote the nav bar, Back, Close, sheet, ask bar and map specs from the WWDC 2025 sessions on the new design and the MapLibre docs, and added the location control and Confirm.
- An agent applied the brand review: it added the placeholder tile, category card and receipt header, changed the button, chip, bubble and sheet specs, and built them in the app. Another agent rendered the illustrations the screens use.
- An agent ran the craft review with exact values, then rebuilt the ask bar, the composer and its morph, the sheet title, the shop page surfaces and the Category screen, and checked them rendered in light and dark.
Trade-offs:
- Specifying every component before the prototype exists means some values will move once they are on a phone; writing them down first keeps the two platforms and the screens from drifting apart.
- Making each card a single accessible element keeps the swipe order short, at the cost of reaching the card's secondary actions through the actions menu.
```

## Button

| Aspect | Spec |
| --- | --- |
| Roles | Filled primary (Primary fill, its label colour), tonal (Muted fill, Foreground label), plain (no fill, Tint label), destructive (no fill, Destructive label) |
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
| Anatomy | The shop's placeholder tile (40, its accent and initials); shop name; status line with its source ("Has them · replied 2 min ago", "In stock now · 1 of 2 · till"); price; walk time and collect-by date on one line; at most one action row (Buy, Buy 1, or Show me with No thanks) |
| Tokens | Card colour, `radius.card`, `inset.card`, `gap.block` between blocks. Shop name Headline, status Caption 1 in Muted foreground, price Title 3, meta Footnote. Arrives with `spring.arrive` |
| States | Default, pressed (the whole card), taken (after Buy it is replaced by the order card), dismissed (No thanks, with an undo snackbar) |
| Rules | Only the best answer has a filled Buy; "Buy", "Buy 1" and "Show me" on the others are tonal, in neutral colours. A tap anywhere on the card opens the details sheet, as Buy does |
| iOS ↔ Android | Same card on both; the Buy button follows the button table |
| Accessibility | One element. Label: "Paper & Co, has them, replied 2 minutes ago, £14.99, 13 minute walk, collect by Monday 9 November". Activating it opens the details sheet; Buy, Show me and No thanks are custom actions |
| Truncation | Shop name 1 line; status line 1 line, the source drops before the status; price never truncates |

## Order card

| Aspect | Spec |
| --- | --- |
| Anatomy | Status label (with a warning symbol on "not charged" endings); shop and items ("Paper & Co · 2 × eclipse glasses"); total; while waiting, a list of up to three steps with the current one marked; an optional line "Keep looking for 1 more" |
| Tokens | Card colour, `radius.card`, `inset.card`, `gap.block`. Status Caption 1, shop and items Subheadline, total Headline, steps Footnote. A status change animates with `spring.status` |
| States | Each label in the conceptual model's state table; pressed opens the receipt |
| iOS ↔ Android | Same card on both |
| Accessibility | One element. Label: status, shop, items, total ("Waiting for Paper & Co, not charged yet, 2 eclipse glasses, £29.98"). Steps are read after the total as "step 2 of 3, Paper & Co sets them aside". Status changes are announced politely |
| Truncation | Status label 1 line, the suffix wraps under it at large sizes; items 2 lines; total never truncates |

## Snuffle mark

| Aspect | Spec |
| --- | --- |
| Use | Wherever Snuffle speaks or the app shows itself: the chat's sender line, the typing indicator, notifications, the Live Activity, the splash and sign in |
| Rule | The bare glyph from [Mark](mark.md), with no tile, circle, avatar, fill, border or shadow behind it. One colour that follows the theme: Foreground (dark on light backgrounds, light on dark), with the awning's two low-contrast stripes in Muted foreground. This reverses decision 045's "mark on a Lavender tile". Only the app icon, which the system draws, keeps a tile |
| Tokens | Width from size tokens, height 84/114 of it: inline `size.icon.nav` (22, the sender line), icon `size.avatar.shop` (40, notification and Live Activity), large `size.thumb.request` (56, sign in), splash `size.category.art` (120, the same width as the native splash). Dedicated `size.mark.*` tokens are still to add |
| iOS ↔ Android | Same on both |
| Accessibility | Decorative and hidden; the sender line or the surrounding label names Snuffle |

## Chat bubble

| Aspect | Spec |
| --- | --- |
| Anatomy | Shopper: text, right-aligned. Snuffle: a sender line on the first bubble of a group, the mark's bare glyph (inline, no avatar) beside "Snuffle", with the day when it isn't today ("Snuffle · Sun 8 Nov"), then the text, left-aligned from the content edge, with no avatar column |
| Tokens | Shopper bubble in Primary with its label colour; Snuffle bubble in `snuffle.bubble` (Lavender) with Foreground. `radius.bubble`, `inset.bubble`, Body text, sender line Caption 1. Maximum width 78% of the content width. `space.3` between bubbles from the same sender, `space.5` at a change of sender. The shopper's bubble appears with `spring.snappy` |
| Grouping | Consecutive bubbles from one sender form a group: one sender line, with its glyph, per group |
| States | Sending (the bubble shows at once), sent, failed to send (a retry symbol beside it and "Not sent · tap to retry") |
| iOS ↔ Android | Same on both |
| Accessibility | Each bubble is read with its sender ("Snuffle: I'm asking 6 shops…", "You: Collect"). The mark is hidden. Suggestion chips under a Snuffle bubble follow it in the reading order |
| Truncation | Never truncates; long text wraps |

## Typing indicator

| Aspect | Spec |
| --- | --- |
| Anatomy | Three dots in a Snuffle bubble, under the sender line (glyph and "Snuffle") when it starts a group |
| Tokens | Snuffle bubble (`snuffle.bubble`), `radius.bubble`, `inset.bubble`; dots in `snuffle.dot`, pulsing with `spring.fade` |
| States | Shown only if Snuffle's reply takes more than about 300 ms; replaced in place by the reply |
| iOS ↔ Android | Same on both |
| Accessibility | Announced once as "Snuffle is writing"; with Reduce Motion the dots stay still at half opacity |

## Ask bar and composer

| Aspect | Spec |
| --- | --- |
| Modes | On Nearby: the ask bar, the Requests circle and the Ask capsule. On New Request: the composer with the glyph, and the place and deadline chips inside it. In a chat: the composer, "Reply", without the glyph |
| Anatomy | One row: a 48 glass Requests circle, `space.2`, the Ask capsule (flex × 48, `radius.full`). Inside the capsule: 16 (`size.askBar.leading`), the Snuffle glyph at inline size in Foreground, 10 (`size.askBar.gap`), the placeholder "Ask for anything nearby" in Body in Muted foreground, and a mic at 20 in Foreground in a 44 box, 14 from the end (`size.askBar.trailing`). With text, the mic becomes the send button: a 36 circle in Primary |
| Requests circle | The icon in Foreground. The count is Indigo 800 in both modes with white text, at least 18 across, in a 2 pt ring of the Background colour |
| Tokens | `size.field` (48) for the circle, the capsule and the composer; `margin.screen` at the sides; `clearance.askBar` (48) above it for the last row of content |
| Behaviour | It never shrinks or hides. Pressing it is the screen's primary action, and a bar that retracted while scrolling read as gone. The suggestion chips are on New Request, not above the bar |
| Transition | Pressing the capsule opens New Request: the capsule's glass morphs into the composer as the keyboard rises, the screen above crossfades and the Requests circle dissolves into Back. On the web a view transition names both glass shapes `snuffle-ask`; on iOS and Android the composer grows from the capsule's measured rectangle with `spring.smooth` while the route fades. Back folds it again. Reduce Motion: a crossfade |
| Keyboard | The composer rides on top of the keyboard and the content above it scrolls so the last message stays visible; the field grows to 5 lines, then scrolls |
| Materials | Web glass: Card at 55% (`rgba(255,255,255,.55)` light, `rgba(43,36,32,.55)` dark) under blur 20 and saturate 1.6, a 0.5 pt inner top highlight in white at 60%, a 0.5 pt hairline in #100A06 at 6% and a shadow of 0 6 20 at 10%. iOS 26: Liquid Glass; earlier iOS: blur; Android: the tonal surface (see [Shape and materials](shape.md)) |
| States | Empty (mic), typing (send visible), sending (send becomes a spinner for at most a moment), send disabled while offline |
| iOS ↔ Android | Custom on both; the Requests circle opens Requests with the zoom transition on iOS and the container transform on Android (decision 026) |
| Accessibility | Capsule "Ask Snuffle" with the placeholder as the hint (the glyph and the mic are part of it); field label "Ask Snuffle"; send "Send"; Requests "Requests, 1 needs you" |

## Location control and sheet

| Aspect | Spec |
| --- | --- |
| Use | The place Nearby is built around, at the top of Nearby: "Blythe Road, W14 ›". A tap opens the sheet "Where are you shopping?" |
| Anatomy | Control: the location icon (`Location05Icon`), the place in Subheadline at 600 and a chevron. Sheet: Current location, the saved places (Home, Work), an address search field, then the radius as a segmented control: Within 10, 15 or 20 min walk |
| Tokens | Control at `hit.min`, label in Tint; places as an inset grouped list at `radius.card`; the field at `radius.inner`; `space.6` sheet padding |
| States | Current location (with `Gps01Icon`), a saved place, a searched address; location off: the Current location row asks for permission. Choosing a place or a radius closes the sheet and reloads Nearby, with skeleton tiles until the shops load |
| Rules | The radius sets which shops and streets count (decision 024). The active place changes only here; the Places row in the account sheet adds, renames and deletes saved places |
| iOS ↔ Android | System sheet at the medium detent, zooming from the control ↔ Material modal bottom sheet. Web: bottom sheet |
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
| Shop tile (Nearby) | Photo 4:3 at `tile.large` or `tile.medium`, `radius.bubble`, up to two badges 8 from the photo's corner; name in Headline and meta in Footnote ("Open till 6pm · 2 min walk") under it, `space.1` apart |
| Shop row (lists) | Logo, or the placeholder tile as a 40 circle, name in Headline, meta in Footnote; `space.4` row padding |
| Photo loading or missing | The placeholder tile in the shop's accent sits under the photo, so the shop's colour shows until it fades in, or for good if it fails |
| States | Default, pressed; a closed shop's meta reads "Closed · opens 9am" |
| iOS ↔ Android | Same layout; a list of rows is an inset grouped list on iOS and a Material list on Android |
| Accessibility | One element. Label: name, badges, meta ("Rossi's Bakery, promoted, open till 6pm, 2 minute walk"); the photo has no separate label |
| Truncation | Name 1 line; meta up to 2 lines, wrapping before anything is cut |

## Request row

| Aspect | Spec |
| --- | --- |
| Anatomy | Item photo (56, `radius.inner`) with at most two answering shops as 20 circles in their accents with their initials, each in a 2 pt ring of the Background, then "+1"; request name and time; preview with its speaker ("Snuffle: Paper & Co has them too."); one status label; a compact button only when the request needs the shopper ("Buy at Rossi's"); a count of unread answers |
| Tokens | Name Headline, time Caption 1, preview Subheadline in Muted foreground, status Caption 1 ("Needs you" in Foreground at 600, so Buy is the only Indigo on the row). `space.4` row padding, `gap.inside` within the text |
| States | Default, pressed, unread (count shown), swiped (Close as a trailing action) |
| iOS ↔ Android | Swipe actions on iOS ↔ a long-press menu on Android |
| Accessibility | One element. Label: name, status, preview, time ("Birthday cake, needs you, buy by Thursday 5 November, Snuffle: Rossi's can do it with 2 days' notice, 11:02am"). The button and Close are custom actions |
| Truncation | Name 1 line; preview 2 lines; status 1 line |

## Sheet

| Aspect | Spec |
| --- | --- |
| Use | The details sheet, where the shopper buys: shop, item, price, quantity, how to get it, when the charge happens, Buy, the risk line and Directions |
| Form | A system sheet with a grabber and Close at the top left; medium and large detents, opening at large when the content needs it; Buy stays pinned at the bottom above the safe area |
| Title | Headline (Switzer 600, 17) by default, centred between Close and Confirm, as iOS sheets title themselves ("Where are you shopping?"). When the sheet's subject is a shop (the details sheet), the bar's title says what the sheet does ("Buy", Headline) and the shop's name is content: Display name (Gambetta 26), left-aligned under the bar. Sheets of rows over photos (the place and the account sheets) are opaque in the `sheet` colour at every detent, so the photos don't smear through the glass |
| Tokens | iOS: the system sheet, inset with glass at medium and opaque and edge to edge at large, with no custom background or corners. Android and web: `radius.sheet`, blurred at medium on the web, opaque in the `sheet` colour (Background in light, #1C1612 in dark) toward large. The footer's fade is drawn from the sheet colour. A selected row keeps its fill; the tick carries the selection. Prices are Foreground. `space.6` padding; the inner option cards use `radius.inner`. Zooms from what was tapped (see [Motion](motion.md)) |
| States | Medium, large, dismissing (a drag down or Close), blocked from dismissing while Buy is loading |
| iOS ↔ Android | System sheet with detents ↔ Material modal bottom sheet with a drag handle and a scrim. Web: bottom sheet, blurred at medium, solid at full height |
| Accessibility | Focus moves to the sheet's title on open and back to the card on close; the scrim and Close both dismiss; escape gesture on iOS |

## Nav bar

| Aspect | Spec |
| --- | --- |
| Forms | No bar fill: the controls float in glass over a scroll edge effect (soft blur and fade), with the hard edge only on dense lists. Large title on Nearby and Requests, scrolling with the content and collapsing to an inline leading title. In a chat, the inline title and Back as a chevron alone in a glass circle, with "Requests" in its long-press menu. On the shop page the bar is pinned: Back as a chevron in a glass circle on the left at every scroll position, and the name in Headline fading in over the scroll edge once the large title has passed under the bar; while the accent wash is under the bar the scroll edge takes the wash's colour. Icon actions on the right share one glass capsule |
| Tokens | Large title in Display large (Gambetta 48) on the root screens, Nearby and Requests, and Display title (Gambetta 40) on other screens such as Places; 16 from the bar's controls or 24 from the row above, and 16 to the content it introduces. Inline title Headline; Back, Close and Confirm circles about 44; icons 22 |
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
| Use | "Once" and "Every week" on Keep looking |
| Tokens | Full content width, `radius.full`, label in Subheadline; selection moves with `spring.snappy` |
| States | One segment selected; pressed; disabled segments are not used |
| iOS ↔ Android | System segmented control ↔ Material single-select segmented button, with a check on the selected segment |
| Accessibility | Each segment is a tab with "1 of 2" and its selected state |

## Collection code

| Aspect | Spec |
| --- | --- |
| Anatomy | The heading "Collection code · show at the counter", the code ("K7Q2"), a QR code, "Tap to enlarge" |
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
| Live Activity | The request name, its status label ("2 shops have them · by 4pm") and the Snuffle mark as a bare glyph, with no icon tile; progress in Snuffle's Lavender (`snuffle.dot` on `snuffle.bubble`); it updates as answers arrive and ends when the request has an order or ends |
| iOS ↔ Android | Notification and Live Activity on the lock screen and Dynamic Island ↔ notification and Live Update (Android 16) or an ongoing notification on earlier versions |
| Rules | Status labels as in the conceptual model; no marketing notifications; the prototype draws these as simulated screens (decision 038) |
| Accessibility | System-drawn; the text must read without the app open |
| Truncation | Body up to 2 lines on the lock screen; the price stays in the first line |

## Toast and snackbar

| Aspect | Spec |
| --- | --- |
| Use | Undo after No thanks on an answer card and after Close on a request; short confirmations that need no decision |
| Anatomy | One line of text and at most one action ("Request closed · Undo") |
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
| Page dots | `size.dot` (8), `space.2` apart; the current one Foreground, the others Border, changing with `spring.fade`. They show where the shopper is and aren't buttons; swipe and Continue move between pages |
| Sign-in buttons | Large (50, full width, `radius.full`), label in Headline with the provider's logo. Apple first and black on light, white on dark, as Apple's HIG asks; Google and Facebook on Card with a hairline Border; email as a text button in Tint. The logos are HugeIcons glyphs in the prototype |
| States | A sign-in button shows a spinner while it signs in, and the others are disabled |
| Accessibility | The dots are one element ("Page 2 of 3"); each sign-in button is a button named by its label |

## Shop page header

| Aspect | Spec |
| --- | --- |
| Anatomy | The map, fixed at the top; up to three shop photos that slide in from the right over it, the first position leaving the map in view; a content card that holds the name, status line ("Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice"), Ask [shop] as the filled button, Call and Directions as tonal buttons, then "Asked about recently" |
| Tokens | Photos 3:2, `radius.bubble`, `space.3` gutter, each over the shop's placeholder tile; content card in the Background colour with `radius.sheet` on its top corners and the shop's accent wash, solid, behind the name, status lines, tags and actions, ending at a straight edge `space.6` below the actions, inset with the card at rest and edge to edge once it fills the screen; the actions row keeps `space.5` of trailing room inside the card; the map's attribution sits between the photos and the card; name in Display title; section headings in Section title; status Footnote |
| States | Resting (map visible); expanded (the card scrolls up over the map and the photos and fills the screen; the nav bar's title appears) |
| iOS ↔ Android | Same layout; it is pushed from the screen that opened it (the shop's detail), so it has Back, never Close (conceptual model) |
| Accessibility | Reading order: name, status, Ask, Call, Directions, photos (each labelled "[Shop] shopfront, [street]"), past answers |
| Truncation | Name wraps to two lines, never more; status lines wrap |

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
| Use | "Browse by category" on Nearby: one card per kind the area has (a kind with no shop nearby has no card), in a sideways rail |
| Anatomy | A 120 × 164 card in the kind's accent `tile`, `radius.bubble`; a still of the closest 3D object at the top, rendered on the card's own colour; the label in Subheadline 600 at the bottom, `space.3` inset. Kinds without a close still are the tile and the label |
| Performance | Fixed size so the rail never lays out again; memoised; the still is an `expo-image` at its exact size with a disk cache and a recycling key; stills only in the list, no clips or live 3D |
| States | Default, pressed; a tap opens the Category screen with the zoom from the card |
| Accessibility | Role button, labelled with the kind; the still is hidden |

## Category screen

| Aspect | Spec |
| --- | --- |
| Use | The places of one kind in the shopper's area ("Bakeries", "Delis and cafés"), nearest first |
| Anatomy | Back; a header card in the kind's `tile` with the name in Display title, a line "3 places within 15 min walk" and the kind's still; street filter chips when the places are on more than one street; shop rows (the placeholder tile as a 40 circle, name, "Open till 6pm · Blythe Road · 2 min walk", a chevron) |
| Transition | Zooms from the category card on every platform; the bar's title appears once the header scrolls under it |
| States | A row opens the shop page |
| Accessibility | The header's name is the screen's header; each row reads name and meta |

## Receipt header

| Aspect | Spec |
| --- | --- |
| Anatomy | A card in the shop's accent `tile`, with no band; the status label, the shop's name in Display name (Gambetta 26) and the items line; when Ready, the basket illustration (88) above it |
| Actions | Directions is the one filled button; "Extend to …" is a plain text button and "Cancel for a refund" a destructive text button |
| Accessibility | The name is the screen's header; the basket is hidden |

## Truncation summary

| Text | Lines | Rule |
| --- | --- | --- |
| Shop name | 1 | Tail ellipsis; on the shop page two lines |
| Request name | 1 | Tail ellipsis |
| Preview in a request row | 2 | Tail ellipsis |
| Status label | 1 | The suffix after "·" moves to a second line before anything is cut |
| Item name | 2 | Tail ellipsis |
| Price, total, collection code | Never | Other text gives way first |
| Chat bubble, button label | Never | Wraps |

## Sources

- Apple, Human Interface Guidelines: buttons, sheets, navigation bars, segmented controls, steppers, notifications, Live Activities, accessibility: https://developer.apple.com/design/human-interface-guidelines
- Apple, "Build a UIKit app with the new design" and "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/ and https://developer.apple.com/videos/play/wwdc2025/323/
- MapLibre: https://maplibre.org
- Material 3 components: buttons, bottom sheets, top app bar, segmented buttons, snackbar, chips: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- React Native, accessibility (custom actions, adjustable role, live regions): https://reactnative.dev/docs/accessibility
- [App flow](../ideation/app-flow.md), v7, for the screens; [Conceptual model](conceptual-model.md) for the words and states; [Shape and materials](shape.md), [Spacing and layout](spacing.md), [Motion](motion.md), [Colour](colour.md), [Typography](typography.md), [Tags](tags.md) and [Imagery and icons](imagery.md) for the tokens
