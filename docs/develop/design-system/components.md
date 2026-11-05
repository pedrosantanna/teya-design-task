# Components

Every component the v7 screens use, specified from the tokens on the other design-system pages: what it is made of, which tokens it takes, its states, its iOS and Android forms and what a screen reader gets. The prototype is built from them.

```summary
Takeaways:
- Twenty components, each in one table: anatomy, tokens, states, iOS and Android forms, accessibility and truncation.
- Only token names from the foundations are used: `radius.*`, `space.*` and the semantic gaps, `spring.*`, the colour roles and the type styles. Where a value has no token yet, the table says so.
- At most one filled Indigo control is visible at a time, the commit action (Buy, Ask, send). Tonal buttons are neutral, the selected chip is Card with Indigo 800 text and edge (Indigo 300 in dark), and filled Indigo means the shopper acts. Answer, order and request cards are one element for VoiceOver and TalkBack, with Buy or the row's button as a custom action.
- A shop shows in its accent wherever it appears: a tonal tile with its initials and the mark's awning, its accent as the ground of its whole page, a tinted header on its receipt. "Browse by category" on Nearby is a rail of category cards in the same pastels, and each opens the Category screen with the places of that kind.
- The ask bar never shrinks: one row with the Ask capsule (the Snuffle glyph, "Ask for anything nearby", a mic) and the Requests circle after it. Its glass morphs into New Request's composer. Sheets title themselves in Headline, centred.
- Bars have no fill: Back, Close and Confirm are glass circles, icon actions share one glass capsule, and a scroll edge effect replaces the bar background. The address at the top of Nearby opens the location sheet.
- A shop name takes one line, a preview two, and a price never truncates.
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
AI:
- An agent reviewed the design system against the v7 screens and listed what was missing. Another agent wrote this page from the existing tokens and the v7 frames; I set the scope and the rules it had to follow.
- An agent rewrote the nav bar, Back, Close, sheet, ask bar and map specs from the WWDC 2025 sessions on the new design and the MapLibre docs, and added the location control and Confirm.
- An agent applied the brand review: it added the placeholder tile, category card and receipt header, changed the button, chip, bubble and sheet specs, and built them in the app. Another agent rendered the illustrations the screens use.
- An agent ran the craft review with exact values, then rebuilt the ask bar, the composer and its morph, the sheet title, the shop page surfaces and the Category screen, and checked them rendered in light and dark.
- An agent specified the five rating components from the benchmarks in Mobbin and the UK rules on reviews, and wrote each accessibility label in full.
- An agent applied the visual critique to chips, the segmented control, sheets and the Category screen, measured the new pairs with the WCAG 2 formula and checked them on the web build in light and dark.
- An agent added the tinted row cards and moved the Requests circle in the app, checked that the morph into New Request still starts from the capsule, and took screenshots of Nearby and four dark Category screens.
- An agent applied that round's fixes in the app and on this page, kept the rating sheet's thumbs at 88 and wrote that into the spec, and checked the changed screens on the web build in light and dark.
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
| Modes | On Nearby: the ask bar, the Ask capsule and the Requests circle. On New Request: the composer with the glyph, and the place and deadline chips inside it (menu chips, `space.3` in from the capsule's edge). In a chat: the composer, "Reply", without the glyph |
| Anatomy | One row: the Ask capsule (flex × 48, `radius.full`), `space.2`, a 48 glass Requests circle at the trailing end (decision 050). Inside the capsule: 16 (`size.askBar.leading`), the Snuffle glyph at inline size in Foreground, 12 (`size.askBar.gap`, `space.3`), the placeholder "Ask for anything nearby" in Body in Muted foreground, and a mic at 20 in Muted foreground in a 44 box (as in an iOS search field: it opens the same screen, where dictation is the keyboard's), 16 from the end (`size.askBar.trailing`, `space.4`). With text, the mic becomes the send button: a 36 circle in Primary |
| Requests circle | After the capsule, as iOS 26 places the secondary button after the search field (Music, Podcasts). The icon in Foreground. The count sits on the circle's top right edge and is Indigo 800 in both modes with white text, at least 18 across, in a 2 pt ring of the Background colour |
| Tokens | `size.field` (48) for the circle, the capsule and the composer; `margin.screen` at the sides; `clearance.askBar` (48) above it for the last row of content |
| Behaviour | It never shrinks or hides. Pressing it is the screen's primary action, and a bar that retracted while scrolling read as gone. The suggestion chips are on New Request, not above the bar |
| Transition | Pressing the capsule opens New Request: the capsule's glass morphs into the composer as the keyboard rises, the screen above crossfades and the Requests circle fades with it. The capsule starts at the screen margin, as the composer does, so the glyph and the placeholder keep their place through the morph. On the web a view transition names both glass shapes `snuffle-ask`; on iOS and Android the composer grows from the capsule's measured rectangle with `spring.smooth` while the route fades. Back folds it again. Reduce Motion: a crossfade |
| Keyboard | The composer rides on top of the keyboard and the content above it scrolls so the last message stays visible; the field grows to 5 lines, then scrolls. The keyboard belongs to the field: it closes when the field's screen loses focus (a push, a pop, a zoom) and if the field unmounts while focused. Nearby's ask bar has no field, so the keyboard never shows on Nearby |
| Materials | Web glass: Card at 55% (`rgba(255,255,255,.55)` light, `rgba(40,37,35,.55)` dark) under blur 20 and saturate 1.6, a 0.5 pt inner top highlight in white at 60%, a 0.5 pt hairline in #100A06 at 6% and a shadow of 0 6 20 at 10%. iOS 26: Liquid Glass; earlier iOS: blur; Android: the tonal surface (see [Shape and materials](shape.md)) |
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
| Separate circle | Requests sits after the capsule in its own glass circle, at the trailing end, as iOS 26 places the secondary button after the search field in Music and Podcasts | Decided: trailing (decision 050) |
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
| Shop row (lists) | The shop's photo as a 40 thumbnail at `radius.inner` (over the placeholder tile while it loads), else its logo or the placeholder tile as a 40 circle; name in Headline, meta in Footnote; `space.4` row padding |
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
| Title | Headline (Switzer 600, 17) by default, centred between Close and Confirm, as iOS sheets title themselves ("Where are you shopping?"). When the sheet's subject is a shop (the details sheet), the bar's title says what the sheet does ("Buy", Headline) and the shop's name is content: Display name (Gambetta 26), left-aligned under the bar |
| Ground | Every sheet has the same ground: the `sheet` colour, one tone darker than the Background in light mode (#DEDAD5 on #EEE9E2, 1.15:1) and one Stone step lighter in dark (#191715 on #0E0B09, 1.10:1). It is opaque at every detent (at 94% over a blur, photos behind it showed through as grey smudges) and keeps the glass rim, and one scrim sits behind every sheet: Foreground at 20% in light, black at 48% in dark (`color.sheetScrim`, `state.sheetScrim`), fading in with the sheet. What sits on the sheet moves one level up: grouped rows and text fields are Card in light (1.39:1) and Muted in dark (1.40:1), grouped lists take `radius.bubble` (20, the iOS 26 inset-grouped corner), and Close and Confirm in the header are glass in light and a solid Muted circle in dark (1.40:1; glass was 1.09:1 on the sheet). Chips and the segmented control follow their own rules below. In dark the row separators are Border, since the dark Separator is the Muted colour |
| Tokens | iOS: inset at medium and edge to edge at large. Android and web: `radius.sheet`, opaque in the `sheet` colour. The footer's fade is drawn from the sheet colour. A selected row keeps its fill; the tick carries the selection. Prices are Foreground. Header and content on `margin.screen` at the sides, so Close and Confirm line up with the rows, and `inset.sheet` (24) under the content; the inner option cards use `radius.inner`. The grabber is `color.grabber`, quieter than the title. An optional subtitle sits under a Headline title in the header, Subheadline in Muted foreground, `space.1` under it. Zooms from what was tapped (see [Motion](motion.md)) |
| States | Medium, large, dismissing (a drag down or Close), blocked from dismissing while Buy is loading |
| iOS ↔ Android | System sheet with detents ↔ Material modal bottom sheet with a drag handle. Both over the same scrim. Web: the iOS form |
| Keyboard | Opening a sheet closes the keyboard of any field under it; a field inside the sheet raises the sheet with the keyboard; closing the sheet closes its keyboard |
| Accessibility | Focus moves to the sheet's title on open and back to the card on close; the scrim and Close both dismiss; escape gesture on iOS |

## Nav bar

| Aspect | Spec |
| --- | --- |
| Forms | No bar fill: the controls float in glass over a scroll edge effect (soft blur and fade), with the hard edge only on dense lists. Large title on Nearby and Requests, scrolling with the content and collapsing to an inline leading title. In a chat, the inline title and Back as a chevron alone in a glass circle, with "Requests" in its long-press menu. On the shop page the bar is pinned: Back as a chevron in a glass circle on the left at every scroll position, and the name in Headline fading in over the scroll edge once the large title has passed under the bar; on a shop with an accent the scroll edge takes the accent's tile colour, the same as the page. Icon actions on the right share one glass capsule |
| Tokens | Large title in Display large (Gambetta 48) on the root screens, Nearby and Requests, and Display title (Gambetta 40) on other screens such as Places; 16 from the bar's controls or 24 from the row above, and 16 to the content it introduces. Inline title Headline; Back, Close and Confirm circles about 44; icons 22 |
| Chat subtitle | The request's name in Caption 1 under "Snuffle". Before it, a 28 pt square (`size.thumb.nav`) with a 1 pt Border edge, clipped to a 6 pt radius (at 20 pt the photo read as a grey blur): the item's photo, the same as its row in Requests, or the category's still on the shop accent's tile when there is no photo. It shows only for one item of a known kind, is decorative (hidden from VoiceOver and TalkBack), and the bar keeps no colour band |
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
| Page dots | `size.dot` (8), `space.2` apart; the current one Foreground, the others Foreground at `state.pageDotOff` (35%), so they tint with the Indigo ground under them, changing with `spring.fade`. They show where the shopper is and aren't buttons; swipe and Continue move between pages |
| Sign-in buttons | Large (50, full width, `radius.full`), label in Headline with the provider's logo. Apple first and black on light, white on dark, as Apple's HIG asks; Google and Facebook on Card with a hairline Border; email as a text button in Tint. The logos are HugeIcons glyphs in the prototype |
| States | A sign-in button shows a spinner while it signs in, and the others are disabled |
| Accessibility | The dots are one element ("Page 2 of 3"); each sign-in button is a button named by its label |

## Shop page header

| Aspect | Spec |
| --- | --- |
| Anatomy | The map, fixed at the top; up to three shop photos that slide in from the right over it, the first position leaving the map in view; a content card that holds the name, status line ("Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice"), Ask [shop] as the filled button, Call and Directions as tonal buttons, then three sections in this order: What they sell (the product summary), How they do on Snuffle (reliability rows) and What buyers say (the rating summary and review cards) |
| Tokens | Photos 3:2, `radius.bubble`, `space.3` gutter, each over the shop's placeholder tile; content card in the shop's accent tile colour in full, with `radius.sheet` on its top corners: the name, status lines, tags, actions and every section sit on it, and the sections' rows are Card under the delicate shadow; the first section heading is `gap.section` below the actions; the card is inset at rest and edge to edge once it fills the screen; the actions row keeps `space.5` of trailing room inside the card; the map's attribution sits between the photos and the card; name in Display title; section headings in Section title; status Footnote |
| States | Resting (map visible); expanded (the card scrolls up over the map and the photos and fills the screen; the nav bar's title appears over a scroll edge in the tile colour, opaque down to the bar's bottom and fading over `space.6` below it, so no Card row shows through behind the title) |
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
| Use | "Browse by category" on Nearby, the first section under the title: one card per kind the area has (a kind with no shop nearby has no card), in a sideways rail ordered so that same-hue cards sit as far apart as the counts allow, cycling Peach, Pistachio, Butter |
| Anatomy | A 120 × 164 card in the kind's accent `tile`, `radius.bubble`; a still of the closest 3D object at the top, rendered on the card's own colour; the label in Headline (17) at the bottom, `space.3` inset, short enough for one line ("Toys", "Butchers"). Kinds without a close still are the tile and the label |
| Performance | Fixed size so the rail never lays out again; memoised; the still is an `expo-image` at its exact size with a disk cache and a recycling key; stills only in the list, no clips or live 3D |
| States | Default, pressed; a tap opens the Category screen with the zoom from the card |
| Accessibility | Role button, labelled with the kind; the still is hidden |

## Category screen

| Aspect | Spec |
| --- | --- |
| Use | The places of one kind in the shopper's area ("Bakeries", "Delis and cafés"), nearest first |
| Anatomy | The whole screen is the kind's `tile`. Back, in glass with the `tonalOnTile` fill (the Card fill read as a dent on the dark tiles); a header with no fill or side inset of its own, so it lines up with the chips and list: the name in Display title, `gap.aboveTitle` under the bar's area so Back to title is 32, wrapping before the still; a line "3 places within 15 min walk" `space.2` under it in `mutedForegroundOnTile` ("1 of 3 places within 15 min walk" while a street is chosen); the kind's still resting on the header's bottom edge, `gap.title` above the chips; street filter chips when the places are on more than one street, All and four streets at most, on the tile's chip rule; shop rows in a grouped list at `radius.card` (the shop's photo as a 40 thumbnail at `radius.inner`, else the placeholder tile as a 40 circle, name, "Open till 6pm · Blythe Road · 2 min walk", a chevron; the street drops while a street is chosen, and "2 min walk" never breaks) |
| Rows | The rows take the accent's `cardOnTile` under the delicate shadow: white Card in light; in dark a tinted card at OKLCH L 0.44, C 0.03 in the accent's hue, 1.37 to 1.51:1 lighter than the tile, since Card rows read as holes in the colour (decision 050). The meta line and the chevron take `mutedForegroundOnTile` (Stone 840 in dark, 4.74:1 or more). The screen sits in `<Ground value="tile" accent>`. See [Colour](colour.md) |
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
| Anatomy | Category chips (a connected shop's from its till's categories and best sellers; an asked shop's from its past "Had it" answers and its kind); a price line in Footnote, "Most items £2–£35 · from past answers" or "· from the shop's till"; "Asked about recently", up to three past answers as rows ("Tide clock batteries", "Had it · 2 hours ago") |
| Tokens | Chips as suggestion chips on Card, `space.2` apart, wrapping to two lines at most; `gap.block` between chips, price line and rows |
| States | A chip press opens Ask with "[category] at [shop]" filled in; no past answers: "Asked about recently" is left out; no categories yet: the shop's kind alone ("Stationer") |
| Rules | Items still get no page: a past answer row opens nothing, and a chip asks. The price line never rounds a range out to look cheaper |
| Accessibility | Chips are buttons labelled "Ask about [category]"; the price line reads "Most items 2 to 35 pounds, from past answers" |

## Reliability row

| Aspect | Spec |
| --- | --- |
| Use | "How they do on Snuffle", what Snuffle saw from answers and orders: answer rate, stock accuracy, reply time |
| Anatomy | One row per signal: a HugeIcons glyph, the signal in Subheadline ("Answers 9 in 10 requests", "Had it 24 of 25 times when they said yes", "Usually replies in 6 min"), the source in Footnote ("from 31 requests on Snuffle"). A connected shop shows "Stock from the till" in place of reply time. Below 10 "has it" answers stock accuracy is left out and the section opens with "New on Snuffle" |
| Tokens | Rows on Card under the delicate shadow, `inset.card`, `gap.block` between rows; glyph 20 in Foreground, on the title's first line when the row wraps or has a source line; text in Foreground and Muted foreground |
| States | Default; new (fewer than 10 "has it" answers); connected shop |
| Rules | Counts as written, never rounded up ("24 of 25", not "100%"); no colour scale or traffic light; never "verified" |
| Accessibility | One element per row, full label: "Had it 24 of 25 times when they said yes, from 31 requests on Snuffle" |

## Rating summary

| Aspect | Spec |
| --- | --- |
| Use | The top of "What buyers say" |
| Anatomy | A thumbs-up glyph and "92% would go back" in Title 3, "38 buyers" in Subheadline; then the tags with their counts as plain text that wraps ("Had it as promised 21"), no capsule or fill, positive tags first, a thumbs-down glyph before each negative one; the review rows and "How ratings work ›" follow in the same grouped list |
| Tokens | On Card, `inset.card`; `gap.block` between the figure, the tags and the link |
| States | No ratings: "No buyers have rated it yet"; few (fewer than 5): "3 buyers so far" and the tags, no percentage ("New on Snuffle" stays in How they do on Snuffle and isn't repeated here); many: the percentage; with a summary: "Summary by Snuffle from buyers' notes" above two lines of text |
| Rules | No stars, no average, no decimal; the percentage is rounded down; the buyer count always sits next to it. Negative tags show with their counts like the positive ones |
| Accessibility | One element: "Would go back, 92 percent of 38 buyers". Each tag row reads "Had it as promised, 21 buyers". The thumbs glyph is hidden; the number and words carry the meaning, never colour alone |

## Review card

| Aspect | Spec |
| --- | --- |
| Use | One buyer's note as a row of the "What buyers say" group, under the rating summary: two on the shop page, mirroring the split, then "See all 38 ›"; every note on the Reviews screen, which sits on the shop's accent tile |
| Anatomy | A plain grouped row, no tile of its own: for a thumbs down only, a thumbs-down glyph and "Wouldn't go back" (a thumbs up has no label); the note in quotation marks; a "Collected" or "Delivered" check and the month ("Oct 2026"); a separator inset to the text between rows; the shop's reply, if there is one, indented under "Reply from [shop]" |
| Tokens | The grouped row's Card fill, `radius.inner` on the group's first and last row, `space.4` leading and `space.3` above and below, lines `space.1` apart; verdict Footnote in Foreground, note Body, check and month Footnote in Muted foreground; the reply on `chat.fill` with `radius.bubble` |
| States | Default; with a note; shop replied; edited ("Edited Oct 2026") |
| Rules | No names or photos of buyers; the highlighted cards mirror the overall split, so with 10% thumbs down at least one negative card shows once there are more than 10 ratings; negatives are never held back |
| Accessibility | One element: "Wouldn't go back. Not ready when I came. Collected, October 2026. Reply from Paper & Co: …" |

## Rating sheet

| Aspect | Spec |
| --- | --- |
| Use | Opened by Rate on the order card ("Collected · rate Paper & Co"), the receipt, or the Rate chip under Snuffle's bubble "How was Paper & Co?" after a delivery |
| Anatomy | Medium detent; title "Would you go back?", with "Your visit to Paper & Co" under it in the header; two large buttons side by side, thumbs up "Yes" and thumbs down "No"; once an answer is chosen, Send as the filled button right under them, so it is in view at the medium detent, then its tags as filter chips (up to three) under "What went well?" or "What went wrong?" and an optional note field ("Anything to add?", placeholder "Optional · 140 characters") |
| Tokens | Sheet as the sheet table; thumb buttons 88 high (two hit heights), tonal, `radius.bubble` (20, a selection tile's fixed radius, see [Shape](shape.md)), selected in the selected role with a `Tick02Icon` in the corner; the reasons' heading 24 under Send and 8 over its chips; chips `space.2` apart; the note field on Card with a counter in Caption 1 |
| States | Empty (Send hidden); answered (tags appear with `spring.arrive`); sending; sent (the sheet closes and the order card reads "Collected · rated"); editing (opened again within 30 days, with the earlier answer selected) |
| Rules | Done in under 10 seconds: one tap and Send is enough. Tags change with the answer, and switching the answer clears them. No offer or reward is attached to rating |
| iOS ↔ Android | Sheet with a medium detent ↔ Material modal bottom sheet, half height |
| Accessibility | The thumbs are a pair of toggle buttons labelled "Would go back" and "Wouldn't go back"; chips announce "selected, 2 of 3"; the counter is read when 20 characters remain |

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
