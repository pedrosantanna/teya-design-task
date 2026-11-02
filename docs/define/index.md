# Concept

A concierge for the high street that the shopper talks to in one conversation. You tell it what you need, where and by when. If a shop's till already shares its stock, it answers at once; if not, it asks the shops likely to have it and comes back with who has it, whether they'll hold it, and whether they can deliver. You reserve or pay in the same conversation and collect or get it delivered. Behind the conversation, several agents split the work.

```summary
Takeaways:
- The concept answers the strongest pain from Discover, not knowing before leaving home (A1), with a confirmation from the shop itself.
- It leads with findability. The transaction (reserve, pay, collect or deliver) closes the loop and is where the brief's other problem shows up.
- I chose an agent for four reasons: one conversation for many tasks, waiting handled for the shopper, acting later on their behalf, and reach beyond one app. All four are my hypotheses; Discover has little evidence on them.
- Everything depends on shops answering quickly. No shopkeeper is in the evidence, so that is the first thing to test.
Call:
- I chose this concept after Discover. It serves Sam's urgent search and Jess's need to buy outside shop hours with one flow.
- The prototype is the app, where the concierge can be the most focused version of itself. WhatsApp and other assistants are later channels.
- This delivery covers the shopper's side only. How a shop receives and answers a request is assumed, for example through the payment provider's merchant app or WhatsApp.
AI:
- I wrote the concept and the reasons for an agent. An agent checked each part against the Discover evidence and wrote the trade-offs and risks below.
Trade-offs:
- A concierge answer takes minutes, an instant answer needs till data that most independents don't have (F8). The concept accepts the wait, keeps the shopper informed during it, and uses till data as a shortcut where it exists.
- Ruth is not served. Leaving her out is my scope choice: the concept follows Sam's and Jess's needs. Her persona came from three online posts, so which channel she'd prefer and how far she'd take up a digital tool are open questions (A13). A WhatsApp channel is the closest the concept gets to her.
```

## How it works

1. **Ask.** The shopper says what they need, where (here, or where they'll be) and by when: "eclipse glasses today near Hammersmith". They can also ask ahead ("tell me when the bakery has rye") and leave it with the concierge. Browsing shops and categories stays available for when there's no specific item in mind.
2. **Instant answer where possible.** If a nearby shop's till shares item-level stock, the concierge answers at once with the shop, price and opening hours.
3. **Concierge where not.** Otherwise it says it can't see stock and asks the likely shops at the same time. While it waits, it keeps the shopper posted, widens the search if the deadline gets close, and checks delivery.
4. **Choose and pay.** The shopper picks a shop and reserves, pays to hold, or orders delivery, without leaving the conversation.
5. **Collect or receive.** Collection at the shop, inside a window the shop has agreed to, or delivery. For a shopper who works shop hours, paying ahead helps only with a way to collect after work: a later slot at a shop that closes late enough, a collection point on the street that stays open (a late-opening shop or a locker), or evening delivery. All three are assumptions, tested in H6.
6. **After.** The concierge follows up and keeps standing requests open. Every request becomes a signal for shops nearby: what people around them are looking for, including what they didn't have.

The [service blueprint](blueprint.md) shows each step across the shopper, the concierge, the agents behind it and the shop.

## Two kinds of shop

- **Connected shops.** The shop's POS shares item-level stock. The concierge answers at once ("In stock now"), and a hold is placed in the POS, which marks the item as set aside.
- **Asked shops.** No stock data. The concierge asks the shop on WhatsApp, or through the POS's messages where it has them, and the shop replies in its own words. A hold is confirmed by the shop's reply.

Both appear in the same list of answers, labelled by where the answer came from. Most small independents start as asked shops (A14).

## Three ways to get it

| Way | Paid | Held for | Who hands it over |
| --- | --- | --- | --- |
| Reserve | No, pay at the shop | Until the end of the next opening day, only if the shop accepts | The shop, at the counter |
| Pay and hold | Yes, once the shop has set it aside | 7 days by default; the shopper picks a collection day. Shorter for perishables (bakery, butcher, florist), up to 14 days if the shop agrees; one extension of 7 days; automatic refund if nobody collects | The shop, at the counter, or a collection point |
| Pay and the shop delivers | Yes | Not held: the shop sends it with its own delivery or courier | The shop's delivery; the concierge only follows its status |

The lengths come from how UK shops hold orders for collection ([desk research](../discover/high-street-landscape.md)): a week is the norm for paid orders, unpaid reservations are short. Delivery by the shop is mapped, not designed: the concierge would show "dispatched", "on its way" and "delivered" from the shop's updates (decision 030).

## Area

The concierge works from where the shopper is, or will be, and looks as far as they can get before their deadline. High streets group shops for browsing and promotion; they don't limit the search. A shop is in scope if it's small, independent and within reach, whether it sits on a high street or on a short parade of shops. Most small independents are on high streets, so in practice the two mostly overlap.

The wireframes use a shopper on Blythe Road, W14. Walking distances from there, measured on OpenStreetMap at 4.8 km/h:

| Ring | Shopping streets | Walk |
| --- | --- | --- |
| On the doorstep | Blythe Road's own shops | Under 5 min |
| Within 15 minutes | Shepherd's Bush Road, Shepherd's Bush Green and Uxbridge Road, Hammersmith Broadway, Kensington High Street (Olympia end), Goldhawk Road, King Street | 9 to 13 min (0.7 to 1.1 km) |
| 15 to 25 minutes | Holland Park Avenue, Askew Road | 21 to 22 min |
| Bus, tube or delivery | North End Road market, Kensington High Street (centre), Chiswick High Road | 32 to 39 min |

Six shopping streets sit within a 15-minute walk. Tying the shopper to one of them would hide five, and on a new street with few shops the first search would come back empty. The deadline sets the ring: for Sam's 4pm deadline the concierge asks the first two rings and checks delivery from the third.

## Why an agent

An agent is my main hypothesis for this product. The concierge is that agent: the one the shopper talks to, and the product's interface, whether it shows up as the app, in WhatsApp or as an MCP server for the shopper's own AI assistant. Behind it, several agents split the work. I expect four things from this setup.

- **One interface for many tasks.** Searching, asking shops, holding, paying and arranging delivery happen in the same conversation, in the same pattern every time. I expect that to be simpler to learn than a screen per task.
- **Waiting handled for the shopper.** Shops are slow and hard to reach. The concierge asks several at once, keeps looking while they answer, and checks delivery in the meantime, so the shopper doesn't chase contacts or wait on one reply.
- **Acting later.** The shopper can leave a request ahead of time, and the concierge acts on it when an answer or stock comes in.
- **Not tied to an app.** The same concierge can live in WhatsApp or connect to the shopper's own AI assistant through MCP. The app is where it gets a focused interface built for this one job.

## What the evidence supports

| Part of the concept | Evidence from Discover | Strength |
| --- | --- | --- |
| Asking before going out | A1 (High): people can't find out without going, and ask strangers on Reddit and WhatsApp today | Strong |
| Reliable information on availability | A10 (Medium): wrong availability is the most repeated complaint, so shoppers need information they can rely on. Whether a shop's answer beats reported stock is H5 | Medium |
| Speed for urgent needs | A4 (Medium): when it's urgent, a nearby shop beats online, if the answer arrives in time | Medium |
| Asking several shops at once | Indirect: wasted trips and phoning around in Sam's posts (A1). Nothing on whether shoppers accept the wait | Weak |
| Reserve and collect outside hours | A6 (Low): two of Jess's posts show shop hours clashing with work; A7 (Low) that this would bring her back is untested | Weak |
| An agent as the main way in | One post: a shopper asked an AI chatbot on X which shop had an item (@Jojo_agboola). Nothing else | Weak |
| One conversation for many tasks | No evidence. My hypothesis | None |
| Requests left ahead of time | No evidence | None |
| Channels beyond the app (WhatsApp, other assistants) | Indirect: people already ask in WhatsApp groups and on Reddit (A1). Nothing on using a concierge there | Weak |
| Shops answering requests | No evidence. No shopkeeper is in the material (open questions 1 to 6) | None |
| Demand signal as value for shops | No evidence | None |
| Payment in the conversation | F5 and F6: cards and wallets for most shoppers; payment links already exist without a website (benchmarks) | Strong for feasibility |

## Kinds of availability

The concept works with three kinds of availability. Reported stock comes from a till or a listing: it can be instant, and it is only as good as the shop's records. A recent confirmation is a shopkeeper saying yes a few minutes ago. An item set aside is held for the shopper, so it can't sell before they arrive. The instant till path gives reported stock, a different kind of certainty from a hold, so the concierge can still offer a hold after a till answer. Whether shoppers trust a confirmation more than reported stock is H5.

## Assumptions this concept adds

The brief asks for what's missing to be assumed and written down.

- **Merchant side.** Shops receive requests in a tool they already open during the day and answer in under ten minutes while open. They accept holding a paid item for about a week, less for perishables (decision 030).
- **Hold and payment.** The shop confirms it has set the item aside before the shopper is charged. The full amount is taken then and refunded if the hold lapses; authorising at the hold and capturing at collection is the alternative I left open.
- **After work.** Shoppers who work shop hours collect through a later slot at a shop that closes late enough, a collection point on the street, or evening delivery. Who hands over, where and when is in the [blueprint](blueprint.md).
- **Agents.** Separate agents for stock, shop matching, shop contact, payment and couriers work behind one concierge. When stock is unknown, the concierge asks the shop and never guesses.
- **Who to ask.** The matching agent knows which shops within reach sell which kinds of things (from public listings and categories), even without stock data.
- **Area.** The shopper's location and deadline set how far the concierge looks. High streets are a way to group shops, not a boundary.
- **Data.** Till data with item detail exists for a minority of shops and is used where it does; everything else is a question to the shop.
- **Channels.** The app comes first. WhatsApp and an MCP connection for other assistants reuse the same agents later.
- **Logistics.** Collection is the default. Delivery uses a courier the shop or the concierge books, one shop at a time; a basket across shops is out of scope for the prototype.
- **Business model.** The concierge belongs to a payment provider with its own POS. Revenue comes from payments made in the app, from shops joining the provider's network, and from promotion, with no commission on the sale. See [revenue](revenue.md).

## Risks

- **Response time.** A concierge answer that takes 20 minutes is too slow for Sam's deadline and too uncertain for a quick errand.
- **Load on shops.** Every question goes to several shops. Too many questions, or questions they can't sell against, and they stop answering.
- **Cold start.** The concierge only works if enough shops on a street answer. Few shops, few answers, no trust.
- **Wrong answers.** A shop that says yes and doesn't have it costs the trust the concept is built on (A10). So does an agent that guesses or misreads the request.
- **Holds and no-shows.** A shop holds an item and the shopper doesn't come. Paying to hold reduces that and adds friction.
- **Channel rules.** On WhatsApp, once 24 hours have passed since the shopper's last message, a business can only write with pre-approved templates, which limits follow-ups and standing requests there.

The [value proposition](value-proposition.md) sets this against the customer profiles, the [service blueprint](blueprint.md) shows who does what, and [hypotheses](hypotheses.md) turns the weak and missing evidence into tests.
