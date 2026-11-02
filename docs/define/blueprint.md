# Service blueprint

How a request moves between the shopper, the concierge and the shop, from the first message to collection and what happens after. The lanes above the line of visibility are what the shopper sees; the lanes below are the agents, the shop and the systems behind them. The example is Sam's: eclipse glasses near Hammersmith before 4pm. The concierge is an agent, and the only one the shopper talks to, in the app, on WhatsApp or through their own AI assistant over MCP. The agents below the line of visibility are parts of the same system that do the work behind it.

```summary
Takeaways:
- The shopper talks to one concierge the whole time. Behind it, separate agents read till stock, pick likely shops, message them, collect replies, take payment and book couriers.
- The shop does three things: answers a request, puts the item aside, hands it over. Everything else is on the concierge's side.
- Most fail points sit where the concierge waits on a shop: no answer in time, a wrong yes, a hold that nobody collects.
- The shop sets the item aside before the shopper pays. For Jess, collection after work needs a later slot, a collection point or evening delivery, all untested.
Call:
- I drew one blueprint for the core flow and listed how Jess's version differs, instead of a second blueprint.
- The shop lane is assumed. No shopkeeper has been asked yet (H1, H6 in the [hypotheses](hypotheses.md)).
AI:
- An agent drafted the lanes and cells from the [concept](index.md) and the risks. I set the steps and which agents sit behind the concierge.
Trade-offs:
- A blueprint at this level shows who does what, not timing. How long each wait can be is a question for the hand-run concierge test.
```

## Blueprint

```blueprint
Steps: Ask | Search | Offer | Reserve and pay | Collect or receive | After
Touchpoint {muted text smartphone}: App chat ; WhatsApp ; Own AI assistant (MCP) | Same thread | Option cards | Payment sheet | Shop counter ; Collection point ; Courier | Notification
Shopper {c1 card user}: Says what, where, by when ; Or leaves a request ahead | Waits, or leaves the thread | Compares the options | Picks a shop and a collection time ; Pays once it's set aside | Shows the code ; Or collects after work ; Or gets the delivery | Rates the shop ; Keeps a standing request
--- Line of interaction
Concierge agent {c3 card bot}: Confirms in one line ; Asks only what's missing | "Checking six shops near you" | Shows each answer as it arrives ; Instant only from shared tills ; Keeps looking | "Set aside" from the shop ; Then the payment ; Hold code, place and time | Directions ; Reminder before the hold ends | Follows up ; Acts on standing requests
--- Line of visibility
Agents behind it {c4 agent settings}: **Orchestrator** plans the tasks | **Stock** reads shared tills ; **Matching** picks likely shops within reach ; **Contact** messages each shop | Collects replies ; **Courier** quotes delivery ; Widens the search near the deadline | **Contact** gets the shop's confirmation ; **Payment** charges ; **Contact** releases the others | Watches the hold ; **Courier** books the drop or evening run | Logs demand ; Matches standing requests
Shop {c2 card store}: - | Gets the request in its merchant app or WhatsApp | Answers: has it, price, hold, delivery | Sets the item aside ; Confirms it | Hands it over ; Or leaves it at a collection point | Weekly demand summary
--- Line of internal interaction
Systems {muted text server}: Location ; Saved preferences | Till stock ; Listings and hours | Courier ; Maps | Card, wallet, pay by link | Courier ; Collection points ; Settlement | Demand records
Fail points {fail triangle-alert}: Vague request | No answer in time (H1) | A wrong "yes" (A10) | Item already sold ; Payment fails | Hold expires ; No after-work option (H6) | Summary not valued (H9)
```

## Answers in step 3

The concierge shows each shop's answer as soon as it arrives and keeps looking for better ones. An answer is instant only when a shop's till shares item-level stock. Every other answer comes from a shop replying to the request, which takes minutes.

## Hold and payment

The shop confirms it has set the item aside, and only then is the shopper charged. I assume the full amount is taken at that point and refunded if the hold lapses. Authorising the card at the hold and capturing it at collection is the alternative, which I've left open.

| Case | What happens |
| --- | --- |
| Item already sold | The shop can't set it aside, so nothing is charged. The concierge offers the next shop that said yes, or keeps looking. |
| Payment fails | The shopper can retry. After 10 minutes without payment the hold is released and the shop is told. |
| Hold expires | The concierge reminds the shopper before the end time. At the end the hold is released, the shop is told it can sell the item, and the payment is refunded. |

## Jess's version

Jess uses the same flow at a different time of day. She asks in the morning, often from WhatsApp on the way to work. The concierge has the whole shop day to collect answers, so speed matters less and the hold matters more. A standing request ("bread from the bakery on Fridays") moves step 1 to once a week.

Paying ahead doesn't help if the shop closes before she finishes work, which I assume is around 6:30pm on weekdays. Step 5 then needs one of three options. All are assumptions and none has been tested:

| Option | Who hands over | Where | When |
| --- | --- | --- | --- |
| Later collection at the shop | The shopkeeper | The shop's counter | An agreed slot, on a day the shop closes late enough |
| Collection point | Staff at a late-opening shop, or a locker against the hold code | On the same street; the shop or a courier drops the item there during the day | After work, until the point closes |
| Evening delivery | A courier booked by the courier agent | Jess's home | An evening slot; the courier collects before the shop closes |

Whether shops would offer a later slot or hand a paid item to a collection point, and whether such a point exists within reach of the shopper, is part of H6 in the [hypotheses](hypotheses.md).

## What the prototype covers

The prototype is the app channel: the shopper's three lanes (touchpoint, shopper, concierge) for steps 1 to 4, with the shop's answers simulated. It includes the three cases under hold and payment (item already sold, payment fails, hold expires), so the reminder and refund from step 5 are in it too. WhatsApp, the MCP connection to other assistants and the shop's side stay as written assumptions.
