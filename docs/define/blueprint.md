# Service blueprint

How a request moves between the shopper, the concierge and the shop, from the first message to collection and what happens after. The lanes above the line of visibility are what the shopper sees; the lanes below are the agents, the shop and the systems behind them. The example is Sam's: eclipse glasses near Hammersmith before 4pm. The concierge is an agent, and the only one the shopper talks to, in the app, on WhatsApp or through their own AI assistant over MCP. The agents below the line of visibility are parts of the same system that do the work behind it.

```summary
Takeaways:
- The shopper talks to one concierge the whole time. Behind it, separate agents read till stock, pick likely shops, message them, collect replies, take payment and book couriers.
- The shop does three things: answers a request, puts the item aside, hands it over. Everything else is on the concierge's side.
- Most fail points sit where the concierge waits on a shop: no answer in time, a wrong yes, an order nobody collects.
- A connected shop is charged at once; an asked shop is charged only after it confirms it has set the item aside. For Jess, collection after work needs a later slot, a collection point or evening delivery, all untested.
- After collection or delivery, Snuffle asks every buyer once whether they would go back. Ratings and Snuffle's own signals (answer rate, stock accuracy, reply time) show on the shop page under a published review policy.
Call:
- I set the steps and which agents sit behind the concierge. The first drawing was too noisy, so I asked for a second pass with cards only for the three lanes that act.
- I chose one blueprint for the core flow, with the ways Jess's version differs listed, instead of a second blueprint.
- I kept the shop lane as an assumption, since no shopkeeper has been asked yet (H1, H6 in the [hypotheses](hypotheses.md)).
- Later I asked for ratings on the shop page and chose a thumbs up or down, stock accuracy only after 10 "has it" answers, and a dispute for shops (decision 047).
AI:
- An agent drafted the lanes and cells from the [concept](index.md) and the risks. I set the steps and which agents sit behind the concierge.
- An agent added the ratings step to the After column and wrote the review policy from the CMA's fake reviews guidance.
Trade-offs:
- A blueprint at this level shows who does what, not timing. How long each wait can be is a question for the hand-run concierge test.
```

## Blueprint

```blueprint
Steps: Ask | Search | Offer | Buy | Collect or receive | After
Touchpoint {muted text smartphone}: App chat ; WhatsApp ; Own AI assistant (MCP) | Same thread | Option cards | Payment sheet | Shop counter ; Collection point ; Courier | Notification
Shopper {c1 card user}: Says what, where, by when ; Or leaves a request ahead | Waits, or leaves the thread | Compares the options | Taps Buy on a shop's answer ; Pays once, with Apple Pay | Shows the code ; Or collects after work ; Or gets the delivery | Rates the order: would go back, tags, a note ; Keeps a standing request
--- Line of interaction
Concierge agent {c3 card bot}: Confirms in one line ; Asks only what's missing | "Checking six shops near you" | Shows each answer as it arrives ; Instant only from shared tills ; Keeps looking | "Set aside" from the shop ; Then the payment ; Collection code, place and Collect by date | Directions ; Reminder before the window ends | Asks every buyer "How was [shop]?", one reminder at most ; Acts on standing requests
--- Line of visibility
Agents behind it {c4 agent settings}: **Orchestrator** plans the tasks | **Stock** reads shared tills ; **Matching** picks likely shops within reach ; **Contact** messages each shop | Collects replies ; **Courier** quotes delivery ; Widens the search near the deadline | **Contact** gets the shop's confirmation ; **Payment** charges ; **Contact** releases the others | Watches the collection window ; **Courier** books the drop or evening run | Logs demand ; Screens notes ; Works out answer rate, stock accuracy and reply time ; Matches standing requests
Shop {c2 card store}: - | Gets the request in its merchant app or WhatsApp | Answers: has it, price, how long it keeps it, delivery | Sets the item aside ; Confirms it | Hands it over ; Or leaves it at a collection point | Weekly demand summary ; Sees its signals ; Replies once to a rating ; Disputes a case
--- Line of internal interaction
Systems {muted text server}: Location ; Saved preferences | Till stock ; Listings and hours | Courier ; Maps | Card, wallet, pay by link | Courier ; Collection points ; Settlement | Demand records ; Ratings and signals
Fail points {fail triangle-alert}: Vague request | No answer in time (H1) | A wrong "yes" (A10) | Item already sold ; Payment fails | Window ends uncollected ; No after-work option (H6) | Summary not valued (H9) ; Ratings only from happy buyers ; Shops reject a public figure (H19)
```

## Answers in step 3

The concierge shows each shop's answer as soon as it arrives and keeps looking for better ones. An answer is instant only when a shop's till shares item-level stock. Every other answer comes from a shop replying to the request, which takes minutes.

## Payment and the collection window

At a connected shop the payment is taken at once, because the POS has the stock. At an asked shop the amount is authorised and taken when the shop replies that it has set the item aside (decision 037). The shop sets how long it keeps the item, 7 days by default; the shopper sees the Collect by date and does not pick a day.

| Case | What happens |
| --- | --- |
| Item already sold | The shop can't set it aside, so nothing is charged. The concierge offers the next shop that said yes, or keeps looking. |
| Payment fails | The shopper can retry. After 10 minutes without payment the order is dropped and the shop is told. |
| Window ends uncollected | The concierge reminds the shopper before the end time. At the end the order is cancelled, the shop puts the item back on sale, and the payment is refunded in full. |

## Jess's version

Jess uses the same flow at a different time of day. She asks in the morning, often from WhatsApp on the way to work. The concierge has the whole shop day to collect answers, so speed matters less and the collection window matters more. A standing request ("bread from the bakery on Fridays") moves step 1 to once a week.

Paying ahead doesn't help if the shop closes before she finishes work, which I assume is around 6:30pm on weekdays. Step 5 then needs one of three options. All are assumptions and none has been tested:

| Option | Who hands over | Where | When |
| --- | --- | --- | --- |
| Later collection at the shop | The shopkeeper | The shop's counter | Within the shop's window, on a day it closes late enough |
| Collection point | Staff at a late-opening shop, or a locker against the collection code | On the same street; the shop or a courier drops the item there during the day | After work, until the point closes |
| Evening delivery | A courier booked by the courier agent | Jess's home | An evening slot; the courier collects before the shop closes |

Whether shops would offer a later slot or hand a paid item to a collection point, and whether such a point exists within reach of the shopper, is part of H6 in the [hypotheses](hypotheses.md).

## Ratings after collection

A rating can only start from an order marked Collected or Delivered. After collection the order card reads "Collected · rate Paper & Co"; after a delivery Snuffle posts "How was Paper & Co?" with a Rate chip. Snuffle asks about every collected or delivered order, never only the ones likely to go well, and reminds once at most. The rating sheet takes a thumbs up or down, up to three tags and an optional note, in under ten seconds, and the buyer can change it for 30 days.

| Who | What they do |
| --- | --- |
| Buyer | Rates once per order; edits within 30 days |
| Snuffle | Asks every buyer, screens notes, works out the shop's signals from answers and orders, shows both on the shop page with their source |
| Shop | Sees its ratings and signals, replies once in public under a rating, disputes a specific case (for example "Not ready when I came" on an order it set aside on time) |

The shop has no interface, so the reply and the dispute are mapped in the shop's request states.

## Review policy

"How ratings work" is linked from every shop page's rating summary. It says:

| Topic | Policy |
| --- | --- |
| Who can rate | Only the buyer of an order marked Collected or Delivered, once per order, for 30 days |
| Who is asked | Every buyer, with one reminder at most |
| What is screened | Notes, for abuse and personal data; nothing is removed for being negative |
| How figures are shown | The percentage who would go back, rounded down, beside the buyer count; no percentage below 5 ratings; highlights mirror the overall split |
| Snuffle's signals | Worked out from answers and orders, labelled "How they do on Snuffle"; stock accuracy only after 10 "has it" answers |
| Summaries | Built only from buyers' notes and labelled "Summary by Snuffle from buyers' notes" |
| Incentives | Snuffle never rewards a rating; ratings a shop rewarded are flagged |
| Shops | One public reply per rating; a dispute is reviewed against the order's record, and the rating stays up while it is reviewed |

## What the prototype covers

The prototype is the app channel: the shopper's three lanes (touchpoint, shopper, concierge) for steps 1 to 4, with the shop's answers simulated. It includes the three cases under payment and the collection window (item already sold, payment fails, window ends uncollected), so the reminder and refund from step 5 are in it too. WhatsApp, the MCP connection to other assistants and the shop's side stay as written assumptions.
