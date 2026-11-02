# Service blueprint

How a request moves between the shopper, the concierge and the shop, from the first message to collection and what happens after. The lanes above the line of visibility are what the shopper sees; the lanes below are the agents, the shop and the systems behind them. The example is Sam's: eclipse glasses near Hammersmith before 4pm.

```summary
Takeaways:
- The shopper talks to one concierge the whole time. Behind it, separate agents read till stock, pick likely shops, message them, collect replies, take payment and book couriers.
- The shop does three things: answers a request, puts the item aside, hands it over. Everything else is on the concierge's side.
- Most fail points sit where the concierge waits on a shop: no answer in time, a wrong yes, a hold that nobody collects.
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
Touchpoint {muted text}: App chat ; WhatsApp ; Own AI assistant (MCP) | Same thread | Option cards | Payment sheet | Shop counter ; Courier | Notification
Shopper {c1 card}: Says what, where, by when ; Or leaves a request ahead | Waits, or leaves the thread | Compares the options | Picks a shop ; Pays to hold | Shows the code ; Or gets the delivery | Rates the shop ; Keeps a standing request
--- Line of interaction
Concierge {c3 card}: Confirms in one line ; Asks only what's missing | "Checking six shops near you" | First answer right away ; Keeps looking | Hold code and end time | Directions ; Reminder before the hold ends | Follows up ; Acts on standing requests
--- Line of visibility
Agents {c4 agent}: **Orchestrator** plans the tasks | **Stock** reads shared tills ; **Matching** picks likely shops ; **Contact** messages each shop | Collects replies ; **Courier** quotes delivery ; Widens the search near the deadline | **Payment** charges ; **Contact** confirms, releases the others | Watches the hold ; **Courier** books the drop | Logs demand ; Matches standing requests
Shop {c2 card}: - | Gets the request in its merchant app or WhatsApp | Answers: has it, price, hold, delivery | Puts the item aside | Hands it over | Weekly demand summary
--- Line of internal interaction
Systems {muted text}: Location ; Saved preferences | Till stock ; Listings and hours | Courier ; Maps | Card, wallet, pay by link | Courier ; Settlement | Demand records
Fail points {fail}: Vague request | No answer in time (H1) | A wrong "yes" (A10) | Item already sold | No-show ; Window doesn't fit Jess | Summary not valued (H9)
```

## Jess's version

Jess uses the same flow at a different time of day. She asks in the morning, often from WhatsApp on the way to work. The concierge has the whole shop day to collect answers, so speed matters less and the hold matters more: she pays to hold, and collection is a window after work that the shop has agreed to, or delivery. A standing request ("bread from the bakery on Fridays") moves step 1 to once a week.

## What the prototype covers

The prototype is the app channel: the shopper's three lanes (touchpoint, shopper, concierge) for steps 1 to 4, with the shop's answers simulated. WhatsApp, the MCP connection to other assistants and the shop's side stay as written assumptions.
