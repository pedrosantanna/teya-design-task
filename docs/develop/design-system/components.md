# Components

Every component the v7 screens use, specified from the tokens on the other design-system pages: what it is made of, which tokens it takes, its states, its iOS and Android forms and what a screen reader gets. The prototype is built from them.

```summary
Takeaways:
- Twenty components, each in one table: anatomy, tokens, states, iOS and Android forms, accessibility and truncation.
- Only token names from the foundations are used: `radius.*`, `space.*` and the semantic gaps, `spring.*`, the colour roles and the type styles. Where a value has no token yet, the table says so.
- One filled Buy is visible at a time. Answer, order and request cards are one element for VoiceOver and TalkBack, with Buy or the row's button as a custom action.
- A shop name takes one line, a preview two, and a price never truncates.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose HugeIcons for icons (decision 042) and kept these specs provisional (decision 043), to be tuned at real size in the prototype.
AI:
- An agent reviewed the design system against the v7 screens and listed what was missing. Another agent wrote this page from the existing tokens and the v7 frames; I set the scope and the rules it had to follow.
Trade-offs:
- Specifying every component before the prototype exists means some values will move once they are on a phone; writing them down first keeps the two platforms and the screens from drifting apart.
- Making each card a single accessible element keeps the swipe order short, at the cost of reaching the card's secondary actions through the actions menu.
```

## Button

| Aspect | Spec |
| --- | --- |
| Roles | Filled primary (Primary fill, its label colour), tonal (Muted fill, Tint label), plain (no fill, Tint label), destructive (no fill, system red label; red has no palette token yet) |
| Sizes | Large: 50 high, full content width, label in Headline. Compact: 36 high, `space.4` side padding, label in Subheadline at 600 |
| Tokens | `radius.full`; icon to label `space.1`; buttons in a row `space.2` apart; compact buttons reach `hit.min` with hit slop |
| States | Default, pressed, disabled, loading (see [States and elevation](states.md)). Loading is used on Buy while Apple Pay or Google Pay returns: the label becomes a spinner and the button keeps its width |
| Rules | One filled primary visible per screen. "Cancel for a refund" is destructive and asks to confirm in an alert |
| iOS ↔ Android | iOS button with continuous capsule corners, glass only over a photo or the map ↔ Material filled, filled tonal and text buttons |
| Accessibility | Role button; the label is the visible text with the price read out ("Buy, £29.98"); while loading the label becomes "Buy, waiting for payment" and the button reports busy |
| Truncation | Labels never truncate; at accessibility sizes the button grows in height and the label wraps to two lines |

## Answer card

| Aspect | Spec |
| --- | --- |
| Anatomy | Shop name; status line with its source ("Has them · replied 2 min ago", "In stock now · 1 of 2 · till"); price; walk time and collect-by date on one line; at most one action row (Buy, Buy 1, or Show me with No thanks) |
| Tokens | Card colour, `radius.card`, `inset.card`, `gap.block` between blocks. Shop name Headline, status Caption 1 in Muted foreground, price Title 3, meta Footnote. Arrives with `spring.arrive` |
| States | Default, pressed (the whole card), taken (after Buy it is replaced by the order card), dismissed (No thanks, with an undo snackbar) |
| Rules | Only the best answer has a filled Buy; the others are tonal. A tap anywhere on the card opens the details sheet, as Buy does |
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

## Chat bubble

| Aspect | Spec |
| --- | --- |
| Anatomy | Shopper: text, right-aligned. Snuffle: the Snuffle mark (28) and a sender line "Snuffle" on the first bubble of a group, with the day when it isn't today ("Snuffle · Sun 8 Nov"), then the text, left-aligned |
| Tokens | Shopper bubble in Primary with its label colour; Snuffle bubble in Muted with Foreground. `radius.bubble`, `inset.bubble`, Body text, sender line Caption 1. Maximum width 78% of the content width. `space.3` between bubbles from the same sender, `space.5` at a change of sender. The shopper's bubble appears with `spring.snappy` |
| Grouping | Consecutive bubbles from one sender form a group: one mark and one sender line per group |
| States | Sending (the bubble shows at once), sent, failed to send (a retry symbol beside it and "Not sent · tap to retry") |
| iOS ↔ Android | Same on both |
| Accessibility | Each bubble is read with its sender ("Snuffle: I'm asking 6 shops…", "You: Collect"). The mark is hidden. Suggestion chips under a Snuffle bubble follow it in the reading order |
| Truncation | Never truncates; long text wraps |

## Typing indicator

| Aspect | Spec |
| --- | --- |
| Anatomy | Three dots in a Snuffle bubble, with the mark |
| Tokens | Muted bubble, `radius.bubble`, `inset.bubble`; dots in Muted foreground, pulsing with `spring.fade` |
| States | Shown only if Snuffle's reply takes more than about 300 ms; replaced in place by the reply |
| iOS ↔ Android | Same on both |
| Accessibility | Announced once as "Snuffle is writing"; with Reduce Motion the dots stay still at half opacity |

## Ask bar and composer

| Aspect | Spec |
| --- | --- |
| Modes | On Nearby: the ask bar, with the round Requests button on its left (a count when a request needs the shopper) and the field "Ask for anything nearby". In a chat: the composer, the field "Reply" alone |
| Anatomy | Field in Callout; the send button appears inside the field's right end only when there is text, in Primary; on the Ask screen, place and deadline chips ("Within 15 min", "By 4pm") sit inside the composer |
| Tokens | `radius.full` for the bar, the field and the Requests button; height 50 to match a large button; `margin.screen` at the sides; `space.8` clearance above it for the last row of content. Count follows the Tags page |
| Keyboard | The bar rides on top of the keyboard and the content above it scrolls so the last message stays visible; the field grows to 5 lines, then scrolls |
| Materials | iOS 26: interactive glass. Earlier iOS: blur. Android: surface container high (see [Shape and materials](shape.md)) |
| States | Empty, focused, typing (send visible), sending (send becomes a spinner for at most a moment), disabled while offline only for send |
| iOS ↔ Android | Custom on both; the Requests button opens Requests with the zoom transition on iOS and the container transform on Android (decision 026) |
| Accessibility | Field label "Ask Snuffle"; send button "Send"; Requests button "Requests, 1 needs you" |

## Suggestion chips

| Aspect | Spec |
| --- | --- |
| Anatomy and tokens | As the suggestion chip on [Tags](tags.md): 32 high, `radius.full`, Muted fill, `space.2` apart, reaching `hit.min` |
| Placement | Above the ask bar on Nearby, and under the Snuffle bubble that proposes them in a chat; at most 3 visible, scrolling sideways if they don't fit |
| States | Default, pressed; a tap sends the text and the chips leave with `spring.fade` |
| iOS ↔ Android | Custom chip ↔ Material suggestion chip |
| Accessibility | Role button; label is the chip's text; grouped as "Suggestions" |
| Truncation | One line; a chip longer than the content width ends with an ellipsis, which the label still reads in full |

## Shop tile and shop row

| Aspect | Spec |
| --- | --- |
| Shop tile (Nearby) | Photo 4:3 at `tile.large` or `tile.medium`, `radius.bubble`, up to two badges 8 from the photo's corner; name in Headline and meta in Footnote ("Open till 6pm · 2 min walk") under it, `space.1` apart |
| Shop row (lists) | Logo or monogram 40 in a circle, name in Headline, meta in Footnote; `space.4` row padding |
| States | Default, pressed; a closed shop's meta reads "Closed · opens 9am" |
| iOS ↔ Android | Same layout; a list of rows is an inset grouped list on iOS and a Material list on Android |
| Accessibility | One element. Label: name, badges, meta ("Rossi's Bakery, promoted, open till 6pm, 2 minute walk"); the photo has no separate label |
| Truncation | Name 1 line; meta 1 line, walk time kept, the street drops first |

## Request row

| Aspect | Spec |
| --- | --- |
| Anatomy | Item photo (56, `radius.inner`) with the shops' logos (24); request name and time; preview with its speaker ("Snuffle: Paper & Co has them too."); one status label; a compact button only when the request needs the shopper ("Buy at Rossi's"); a count of unread answers |
| Tokens | Name Headline, time Caption 1, preview Subheadline in Muted foreground, status Caption 1 (Tint for "Needs you"). `space.4` row padding, `gap.inside` within the text |
| States | Default, pressed, unread (count shown), swiped (Close as a trailing action) |
| iOS ↔ Android | Swipe actions on iOS ↔ a long-press menu on Android |
| Accessibility | One element. Label: name, status, preview, time ("Birthday cake, needs you, buy by Thursday 5 November, Snuffle: Rossi's can do it with 2 days' notice, 11:02am"). The button and Close are custom actions |
| Truncation | Name 1 line; preview 2 lines; status 1 line |

## Sheet

| Aspect | Spec |
| --- | --- |
| Use | The details sheet, where the shopper buys: shop, item, price, quantity, how to get it, when the charge happens, Buy, the risk line and Directions |
| Form | A page sheet with a grabber and a Close button; medium and large detents, opening at large when the content needs it; Buy stays pinned at the bottom above the safe area |
| Tokens | System sheet corners on iOS, `radius.sheet` for custom sheets and on Android; `space.6` padding; the inner option cards use `radius.inner`. Opens from what was tapped with `spring.smooth` |
| States | Medium, large, dismissing (a drag down or Close), blocked from dismissing while Buy is loading |
| iOS ↔ Android | System sheet with detents ↔ Material modal bottom sheet with a scrim |
| Accessibility | Focus moves to the sheet's title on open and back to the card on close; the scrim and Close both dismiss; escape gesture on iOS |

## Nav bar

| Aspect | Spec |
| --- | --- |
| Forms | Large title on Nearby and Requests, collapsing to an inline title as the list scrolls. Inline title in a chat, with Back labelled "Requests". On the shop page, Close on the left and no title until the name scrolls under the bar; the bar hides while scrolling down and returns on scroll up |
| Tokens | Large title Title 1; inline title Headline; bar buttons at `hit.min`; symbols 22 |
| iOS ↔ Android | Navigation bar with large title ↔ Material large top app bar collapsing to small |
| Accessibility | The title is a header; Back and Close are labelled with their action |
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
| Use | The fixed background at the top of the shop page, centred on the shop, with one pin |
| Tokens | Map ground colour behind the tiles; pin in Primary; `radius.none` at the screen edges |
| States | Loading (Map ground alone), loaded; gestures off on the shop page |
| iOS ↔ Android | Apple Maps ↔ Google Maps, through one map component; Directions opens the system maps app |
| Accessibility | Hidden from the screen reader; the street and walk time in the card carry the same information |

## Notification and Live Activity

| Aspect | Spec |
| --- | --- |
| Notification | Title: the request name ("Eclipse glasses"); body: Snuffle's line ("Paper & Co on King Street has them too: £14.99 a pair."); one per answer, grouped by request |
| Live Activity | The request name, its status label ("2 shops have them · by 4pm") and the Snuffle mark; it updates as answers arrive and ends when the request has an order or ends |
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

## Close button

| Aspect | Spec |
| --- | --- |
| Anatomy | An × symbol in a 30 circle |
| Tokens | `radius.full`, 44 hit area; glass over the map or a photo, Muted fill elsewhere |
| iOS ↔ Android | Close in the top left of a sheet or presented page ↔ the same, or a close icon in the top app bar |
| Accessibility | Label "Close" |

## Shop page header

| Aspect | Spec |
| --- | --- |
| Anatomy | The map, fixed at the top; up to three shop photos that slide in from the right over it, the first position leaving the map in view; a content card that holds the name, status line ("Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice"), Ask [shop] as the filled button, Call and Directions as tonal buttons, then "Asked about recently" |
| Tokens | Photos 3:2, `radius.bubble`, `space.3` gutter; content card in Card colour with `radius.sheet` on its top corners; name in Display title (the one Gambetta moment on this screen); status Footnote |
| States | Resting (map visible); expanded (the card scrolls up over the map and the photos and fills the screen; the nav bar's title appears) |
| iOS ↔ Android | Same layout; it is presented over the screen that opened it and closes back to it, so it has Close and no Back |
| Accessibility | Reading order: name, status, Ask, Call, Directions, photos (each labelled "[Shop] shopfront, [street]"), past answers |
| Truncation | Name wraps to two lines, never more; status lines wrap |

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
- Material 3 components: buttons, bottom sheets, top app bar, segmented buttons, snackbar, chips: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- React Native, accessibility (custom actions, adjustable role, live regions): https://reactnative.dev/docs/accessibility
- [App flow](../ideation/app-flow.md), v7, for the screens; [Conceptual model](conceptual-model.md) for the words and states; [Shape and materials](shape.md), [Spacing and layout](spacing.md), [Motion](motion.md), [Colour](colour.md), [Typography](typography.md), [Tags](tags.md) and [Imagery and icons](imagery.md) for the tokens
