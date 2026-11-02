# Concept

A shopper app with an agent that works as a concierge for the high street. You tell it what you need; if a shop's till already shares its stock, the agent answers at once, and if not, it asks the shops likely to have it and comes back with who has it, whether they'll hold it, and whether they can deliver. You reserve or pay in the app and collect or get it delivered.

```summary
Takeaways:
- The concept answers the strongest pain from Discover, not knowing before leaving home (A1), with a confirmation from the shop itself.
- It leads with findability. The transaction (reserve, pay, collect or deliver) closes the loop and is where the brief's other problem shows up.
- Everything depends on shops answering quickly. No shopkeeper is in the evidence, so that is the first thing to test.
Call:
- I chose this concept after Discover. It serves Sam's urgent search and Jess's need to buy outside shop hours with one flow.
- This delivery covers the shopper's side only. How a shop receives and answers a request is assumed, for example through the payment provider's merchant app or a message.
AI:
- An agent checked each part of the concept against the Discover evidence and wrote the trade-offs and open risks below. I wrote the concept.
Trade-offs:
- A concierge answer takes minutes, an instant answer needs till data that most independents don't have (F8). The concept accepts the wait and uses till data as a shortcut where it exists.
- Ruth is not served: she doesn't post, and probably wouldn't use an app (A13).
```

## How it works

1. **Ask or browse.** The shopper picks a location (here, or where they'll be) and either asks the agent ("eclipse glasses today near Hammersmith") or browses shops and categories nearby. The agent is the main way in; browsing is there for when there's no specific item in mind.
2. **Instant answer where possible.** If a nearby shop's till shares item-level stock, the agent answers at once with the shop, price and opening hours.
3. **Concierge where not.** Otherwise the agent tells the shopper it can't see stock and asks the shops most likely to have the item. Each shop answers in its own words: has it, can hold it until a time, can deliver.
4. **Choose and pay.** The shopper picks a shop and reserves, pays to hold, or orders delivery, in the app.
5. **Collect or receive.** Collection at the shop, inside a window the shop has agreed to, or delivery.
6. **Demand for the shop.** Every request becomes a signal for shops nearby: what people around them are looking for, including what they didn't have.

## What the evidence supports

| Part of the concept | Evidence from Discover | Strength |
| --- | --- | --- |
| Asking before going out | A1 (High): people can't find out without going, and ask strangers on Reddit and WhatsApp today | Strong |
| A confirmation from the shop itself | A10 (Medium): wrong availability is the most repeated complaint, so a human answer from the shop beats a listed figure | Medium |
| Speed for urgent needs | A4 (Medium): when it's urgent, a nearby shop beats online, if the answer arrives in time | Medium |
| Reserve and collect outside hours | A6 (Medium) says hours drive Jess away; A7 (Low) that this would bring her back is untested | Weak |
| An agent as the main way in | One post: a shopper asked an AI chatbot on X which shop had an item (@Jojo_agboola). Nothing else | Weak |
| Shops answering requests | No evidence. No shopkeeper is in the material (open questions 1 to 6) | None |
| Demand signal as value for shops | No evidence | None |
| Payment in the app | F5 and F6: cards and wallets for most shoppers; payment links already exist without a website (benchmarks) | Strong for feasibility |

## Assumptions this concept adds

The brief asks for what's missing to be assumed and written down.

- **Merchant side.** Shops receive requests in a tool they already open during the day and answer in under ten minutes while open. They accept holding an item for a few hours.
- **Who to ask.** The agent knows which nearby shops sell which kinds of things (from public listings and categories), even without stock data.
- **Data.** Till data with item detail exists for a minority of shops and is used where it does; everything else is a question to the shop.
- **Logistics.** Collection is the default. Delivery uses a courier the shop or the app books, one shop at a time; a basket across shops is out of scope for the prototype.
- **Business model.** Not decided for this take-home. Options include commission, paid promotion for shops, or the app as a way for a payment provider to bring shops in.

## Risks

- **Response time.** A concierge answer that takes 20 minutes is too slow for Sam's deadline and too uncertain for a quick errand.
- **Load on shops.** Every question goes to several shops. Too many questions, or questions they can't sell against, and they stop answering.
- **Cold start.** The concierge only works if enough shops on a street answer. Few shops, few answers, no trust.
- **Wrong answers.** A shop that says yes and doesn't have it costs the trust the concept is built on (A10). So does an agent that guesses.
- **Holds and no-shows.** A shop holds an item and the shopper doesn't come. Paying to hold reduces that and adds friction.

The [value proposition](value-proposition.md) sets this against the customer profiles, and [hypotheses](hypotheses.md) turns the weak and missing evidence into tests.
