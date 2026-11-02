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
- Ruth is not served: she doesn't post, and probably wouldn't use an app (A13). A WhatsApp channel is the closest the concept gets to her.
```

## How it works

1. **Ask.** The shopper says what they need, where (here, or where they'll be) and by when: "eclipse glasses today near Hammersmith". They can also ask ahead ("tell me when the bakery has rye") and leave it with the concierge. Browsing shops and categories stays available for when there's no specific item in mind.
2. **Instant answer where possible.** If a nearby shop's till shares item-level stock, the concierge answers at once with the shop, price and opening hours.
3. **Concierge where not.** Otherwise it says it can't see stock and asks the likely shops at the same time. While it waits, it keeps the shopper posted, widens the search if the deadline gets close, and checks delivery.
4. **Choose and pay.** The shopper picks a shop and reserves, pays to hold, or orders delivery, without leaving the conversation.
5. **Collect or receive.** Collection at the shop, inside a window the shop has agreed to, or delivery.
6. **After.** The concierge follows up and keeps standing requests open. Every request becomes a signal for shops nearby: what people around them are looking for, including what they didn't have.

The [service blueprint](blueprint.md) shows each step across the shopper, the concierge, the agents behind it and the shop.

## Why an agent

An agent is my main hypothesis for this product. It is several agents coordinated behind one conversation, and I expect four things from it.

- **One interface for many tasks.** Searching, asking shops, holding, paying and arranging delivery happen in the same conversation, in the same pattern every time. I expect that to be simpler to learn than a screen per task.
- **Waiting handled for the shopper.** Shops are slow and hard to reach. The concierge asks several at once, keeps looking while they answer, and checks delivery in the meantime, so the shopper doesn't chase contacts or wait on one reply.
- **Acting later.** The shopper can leave a request ahead of time, and the concierge acts on it when an answer or stock comes in.
- **Not tied to an app.** The same concierge can live in WhatsApp or connect to the shopper's own AI assistant through MCP. The app is where it gets a focused interface built for this one job.

## What the evidence supports

| Part of the concept | Evidence from Discover | Strength |
| --- | --- | --- |
| Asking before going out | A1 (High): people can't find out without going, and ask strangers on Reddit and WhatsApp today | Strong |
| A confirmation from the shop itself | A10 (Medium): wrong availability is the most repeated complaint, so a human answer from the shop beats a listed figure | Medium |
| Speed for urgent needs | A4 (Medium): when it's urgent, a nearby shop beats online, if the answer arrives in time | Medium |
| Asking several shops at once | Indirect: wasted trips and phoning around in Sam's posts (A1). Nothing on whether shoppers accept the wait | Weak |
| Reserve and collect outside hours | A6 (Medium) says hours drive Jess away; A7 (Low) that this would bring her back is untested | Weak |
| An agent as the main way in | One post: a shopper asked an AI chatbot on X which shop had an item (@Jojo_agboola). Nothing else | Weak |
| One conversation for many tasks | No evidence. My hypothesis | None |
| Requests left ahead of time | No evidence | None |
| Channels beyond the app (WhatsApp, other assistants) | Indirect: people already ask in WhatsApp groups and on Reddit (A1). Nothing on using a concierge there | Weak |
| Shops answering requests | No evidence. No shopkeeper is in the material (open questions 1 to 6) | None |
| Demand signal as value for shops | No evidence | None |
| Payment in the conversation | F5 and F6: cards and wallets for most shoppers; payment links already exist without a website (benchmarks) | Strong for feasibility |

## Assumptions this concept adds

The brief asks for what's missing to be assumed and written down.

- **Merchant side.** Shops receive requests in a tool they already open during the day and answer in under ten minutes while open. They accept holding an item for a few hours.
- **Agents.** Separate agents for stock, shop matching, shop contact, payment and couriers work behind one concierge. When stock is unknown, the concierge asks the shop and never guesses.
- **Who to ask.** The matching agent knows which nearby shops sell which kinds of things (from public listings and categories), even without stock data.
- **Data.** Till data with item detail exists for a minority of shops and is used where it does; everything else is a question to the shop.
- **Channels.** The app comes first. WhatsApp and an MCP connection for other assistants reuse the same agents later.
- **Logistics.** Collection is the default. Delivery uses a courier the shop or the concierge books, one shop at a time; a basket across shops is out of scope for the prototype.
- **Business model.** Not decided for this take-home. Options include commission, paid promotion for shops, or the concierge as a way for a payment provider to bring shops in.

## Risks

- **Response time.** A concierge answer that takes 20 minutes is too slow for Sam's deadline and too uncertain for a quick errand.
- **Load on shops.** Every question goes to several shops. Too many questions, or questions they can't sell against, and they stop answering.
- **Cold start.** The concierge only works if enough shops on a street answer. Few shops, few answers, no trust.
- **Wrong answers.** A shop that says yes and doesn't have it costs the trust the concept is built on (A10). So does an agent that guesses or misreads the request.
- **Holds and no-shows.** A shop holds an item and the shopper doesn't come. Paying to hold reduces that and adds friction.
- **Channel rules.** On WhatsApp, once 24 hours have passed since the shopper's last message, a business can only write with pre-approved templates, which limits follow-ups and standing requests there.

The [value proposition](value-proposition.md) sets this against the customer profiles, the [service blueprint](blueprint.md) shows who does what, and [hypotheses](hypotheses.md) turns the weak and missing evidence into tests.
