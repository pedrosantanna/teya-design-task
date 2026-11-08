# Features

Nine short clips of the prototype, one per feature, each played with taps and typing in the web build. The shops are invented and answer on a script; the interface copy stays in English.

I asked for one clip per main feature. An agent chose the nine, recorded them with a script, `app/e2e/record-features.mjs`, that starts each one at a journey step and hides the state debugger, and checked every clip frame by frame. The script can record them again when the screens change.

## Asking for two things at once

<div class="feature"><video class="phone-video" src="media/ask-split.mp4" data-poster="media/ask-split.png" width="450" height="948" aria-label="Sam types eclipse glasses for today and a birthday cake for Saturday; Snuffle proposes two requests and he taps Split into 2" controls muted playsinline loop preload="metadata"></video><div>

Sam types eclipse glasses for today and a birthday cake for Saturday in one message. The two go to different shops on different days, so Snuffle proposes two requests and he decides. It then reads the glasses request back with the quantity and the 4pm deadline.

A split keeps each request's answers in one chat, and the shopper never has to work out which shop sells what.

</div></div>

## Answers from the shops

<div class="feature"><video class="phone-video" src="media/shops-answer.mp4" data-poster="media/shops-answer.png" width="450" height="948" aria-label="After Allow, six shops move from Asked to Seen to an answer; Paper and Co, Broadway Chemist and Olympia Cameras answer with prices" controls muted playsinline loop preload="metadata"></video><div>

Once Sam allows notifications, Snuffle asks six shops. Broadway Chemist answers at once from its till, Bush Opticians says no, Paper & Co replies by message with a price and a collect-by date, and Olympia Cameras offers something similar.

Each answer says where it came from, because stock read from a till and a shopkeeper's yes are different promises. Every answer carries Buy, so the search ends where the purchase starts.

</div></div>

## Buying and waiting for the shop

<div class="feature"><video class="phone-video" src="media/buy-and-wait.mp4" data-poster="media/buy-and-wait.png" width="450" height="948" aria-label="Sam taps Buy, keeps 2 pairs and collection, pays 29.98 pounds with Apple Pay and waits until Paper and Co sets them aside" controls muted playsinline loop preload="metadata"></video><div>

Buy shows the shop, the quantity and collection or delivery, then Apple Pay for £29.98. The payment is only authorised. Sam is charged when Paper & Co confirms it has set the pairs aside; in the prototype that takes a few seconds, in a real shop it could take minutes.

The shop carries no risk of an unpaid reserve, and the shopper pays nothing for an item that turns out to be gone.

</div></div>

## Receipt and collection code

<div class="feature"><video class="phone-video" src="media/receipt-code.mp4" data-poster="media/receipt-code.png" width="450" height="948" aria-label="The receipt shows Ready, collect by Mon 9 Nov, the code K7Q2, Extend and Cancel for a refund; the code then opens full screen" controls muted playsinline loop preload="metadata"></video><div>

The receipt says the pairs are ready, when to collect them by, and how to extend once or cancel for a refund. At the counter the code opens full screen for the shop to scan or type.

</div></div>

## Sold first

<div class="feature"><video class="phone-video" src="media/sold-first.mp4" data-poster="media/sold-first.png" width="450" height="948" aria-label="Paper and Co sold the last pairs, Sam is not charged, and he buys 1 pair at Broadway Chemist" controls muted playsinline loop preload="metadata"></video><div>

Paper & Co sold the last pairs before it could set them aside, so Sam isn't charged. Snuffle points to Broadway Chemist, which still has one pair, and keeps looking for the second.

Every failure in the journey ends with a next move. This one is the most likely, because asked shops answer from memory.

</div></div>

## Nobody has it

<div class="feature"><video class="phone-video" src="media/nobody-has-it.mp4" data-poster="media/nobody-has-it.png" width="450" height="948" aria-label="None of the six shops has the glasses before 4pm; Sam chooses Keep looking until Fri 6 Nov" controls muted playsinline loop preload="metadata"></video><div>

None of the six shops has the glasses before 4pm: four said no and two didn't reply. Snuffle offers to ask shops further away, or to keep looking until Friday and message Sam when one has them. Nothing is bought until he taps Buy.

</div></div>

## Collecting after work

<div class="feature"><video class="phone-video" src="media/jess-after-work.mp4" data-poster="media/jess-after-work.png" width="450" height="948" aria-label="Jess buys a sourdough at Rossi's Bakery and chooses to collect it at the corner shop, open until 11pm" controls muted playsinline loop preload="metadata"></video><div>

Jess finishes work at 6, when Rossi's Bakery closes. At lunchtime she buys a sourdough and picks the corner shop as the place to collect it; Rossi's drops it there before closing, and the corner shop is open until 11pm.

She is the second persona, and her problem is opening hours. The collection point is how the transaction fits her day.

</div></div>

## Nearby and shop pages

<div class="feature"><video class="phone-video" src="media/nearby-shop-page.mp4" data-poster="media/nearby-shop-page.png" width="450" height="948" aria-label="From Nearby, Sam opens Bakery, then Rossi's Bakery, and scrolls to its ratings and how it does on Snuffle" controls muted playsinline loop preload="metadata"></video><div>

Browsing is the second way in. A category on Nearby lists the shops within a 15-minute walk. A shop page shows what it sells, what shoppers found there recently, ratings from people who collected, and how fast and how reliably it answers on Snuffle.

The map on these screens shows only its pin in this web build; the tiles were being fixed when the clips were recorded.

</div></div>

## Android

<div class="feature"><video class="phone-video android" src="media/android.mp4" data-poster="media/android.png" width="450" height="976" aria-label="The answers screen on Android; Buy opens the bottom sheet and then the Google Pay sheet" controls muted playsinline loop preload="metadata"></video><div>

The same Expo code runs on Android, in a Pixel frame here. The back arrow, the type and the payment sheet follow Android conventions, and Google Pay takes the place of Apple Pay.

Both platforms have a dark theme. These clips are in light, because the web build's phone frame shows white corners under a dark screen.

</div></div>

Evidence: [prototype](../deliver/prototype.md), [app flow](../develop/ideation/app-flow.md), [conceptual model](../develop/design-system/conceptual-model.md).
