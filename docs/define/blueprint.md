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
Steps: 1 · Ask | 2 · Search | 3 · Offer | 4 · Reserve and pay | 5 · Collect or receive | 6 · After
Touchpoint: Concierge chat in the app ; Or WhatsApp, or the shopper's own AI assistant | Same thread | Same thread, with option cards | Same thread ; Payment sheet | Shop counter ; Courier at the door | Same thread ; Notification
Shopper: Says what they need, where and by when ; Or sets a request ahead of time ("let me know when they have it") | Waits, or leaves the thread and gets a message later | Compares the options as they arrive | Picks one ; Reserves, or pays to hold | Walks to the shop and shows the code ; Or receives the delivery | Rates the shop ; Keeps a standing request
--- Line of interaction
Concierge: Confirms the request in one line ; Asks only what's missing (size, budget, deadline) | "Checking six shops near you. I'll message you as they answer." | Shows the first answer as soon as it arrives ; Keeps looking while others are pending ; Price, distance, closing time, hold time, delivery | Confirms the hold with a code and an end time | Directions ; Reminder before the hold ends ; Delivery tracking | Asks how it went ; Acts on standing requests later
--- Line of visibility
Agents: The orchestrator reads item, place and deadline, and plans the tasks | Stock agent reads till data where a shop shares it ; Matching agent picks likely shops from listings and categories ; Contact agent sends one request per shop | Collects replies and drops stale ones ; Asks the courier agent for a delivery quote ; Widens the search when the deadline gets close | Payment agent takes payment ; Contact agent confirms to the chosen shop and releases the others | Watches the hold window, extends or cancels ; Books the courier | Logs the request as demand ; Matches standing requests with new answers or stock
Shop: - | Gets the request in the tool it already uses (merchant app or WhatsApp) | Answers in a tap or a short message: has it, price, hold until, can deliver | Puts the item aside with the code | Hands it over and marks it collected | Gets a weekly summary of what people nearby asked for, including what it didn't have
--- Line of internal interaction
Systems: Location ; Saved preferences and payment method | Till stock where shared ; Public listings and opening hours ; Shop messaging | Courier quotes ; Maps | Payment provider: card, wallet, pay by link | Courier ; Payment settlement to the shop | Demand records per street
Fail points: Vague request ; Channel without a location | No shop answers in time (H1) ; Too many requests per shop | A shop says yes and doesn't have it (A10) | Payment fails ; Item already sold | No-show ; Collection window doesn't fit (Jess) | Shops don't value the summary (H9)
```

## Jess's version

Jess uses the same flow at a different time of day. She asks in the morning, often from WhatsApp on the way to work. The concierge has the whole shop day to collect answers, so speed matters less and the hold matters more: she pays to hold, and collection is a window after work that the shop has agreed to, or delivery. A standing request ("bread from the bakery on Fridays") moves step 1 to once a week.

## What the prototype covers

The prototype is the app channel: the shopper's three lanes (touchpoint, shopper, concierge) for steps 1 to 4, with the shop's answers simulated. WhatsApp, the MCP connection to other assistants and the shop's side stay as written assumptions.
