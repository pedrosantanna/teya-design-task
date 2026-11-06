# Measurement plan

How each hypothesis gets tested and measured, from the tasks a shopper and a shop do to the metrics that say whether the product works. The telemetry is a definition for a later build: the prototype records nothing, and its shops answer on a script.

```summary
Takeaways:
- Every hypothesis has a metric, the events that compute it, its pass mark and a method. Most of the numbers come from records the service keeps anyway (requests, answers, orders, payments), so the proof of concept needs no tracking in the app.
- The event names double as the log sheet for the hand-run concierge: one row per event, with the WhatsApp timestamps.
- The north star is completed requests per week: requests that end with an order collected or delivered. It only moves when a shop answers, has the item, and the shopper buys and collects.
- With the current assumptions, a request needs about six likely shops open to get a yes 80% of the time. Ten shops spread over six kinds, as in the proof of concept, put it near 50%, which is H1's mark for searches.
- The recommendation is no NPS and no standing CSAT for now. The rating after collection covers the shop; what it misses (requests that end without an order, Snuffle itself, the shop's view) is covered by talking to the six shoppers and ten shops in the proof of concept.
Call:
- I asked for a verification step next to the synthetic test users: how each hypothesis will be tested, and the telemetry needed to measure behaviour, documented and explicitly not built into the prototype.
- I asked for the main tasks with their start and end, success, failure, abandonment, time on task and errors; an event taxonomy with privacy notes; product and marketplace metrics, including how many shops an area needs per active shopper; guardrails; and how the hypotheses map to all of it.
- I said I lean against NPS and CSAT for this product and asked for the reasons to be checked against the model. I adopted completed requests per week as the north star; the guardrail thresholds and the survey question stay open.
AI:
- An agent read the hypotheses, the conceptual model, the app, agent and shop flows, the specs and the prototype's simulation, then drafted the tasks, the events, the metrics, the liquidity model and the NPS and CSAT recommendation.
- Every input of the liquidity model is an assumption, labelled as one. No outside benchmark is used; the only outside link is the UK regulator's guidance on storage and access technologies, which the agent opened.
Trade-offs:
- Measuring from service records keeps tracking out of the app, and misses what happens on screen (time spent comparing answers, an ask abandoned before sending) until analytics with consent exist.
- The liquidity model treats shops as independent. A scarce item, such as eclipse glasses the day before, sells out everywhere at once, so the real fill rate will be lower than the model says.
```

The detail is on two pages: [Tasks and events](telemetry.md) defines the tasks and the event taxonomy, and [Product metrics](metrics.md) defines the metrics, the north star, the liquidity model and the guardrails.

## Methods

| Method | Who | What it can show | Hypotheses |
| --- | --- | --- | --- |
| Prototype test, moderated | 6 shoppers, 30 minutes each, deadline scenarios | Stated choice and usability: what they pick, whether they finish, how long it takes, where they get stuck | H2, H3, H5, H7, H8, H10, H17 |
| 5-second test | The same 6 shoppers | Whether a shop page reads at a glance | H18 |
| Proof of concept: the agent, or the hand-run concierge on WhatsApp | 10 shops within 15 minutes' walk of Blythe Road, 6 shoppers with real needs | Behaviour: shops answering, fill, buying, collecting, coming back | H1, H2, H4, H6, H7, H11, H12, H16 |
| Conversations with shops | The 10 shops, plus 5 for the demand summary | What shops accept and value, and their effort | H6, H9, H13, H14, H15, H19 |
| Analytics in a later build | Every shopper who consents | The same metrics at scale, by area and over time | All, once built |

A diary of two weeks with the three working shoppers would add what the proof of concept's two days can't show: whether they ask again the next week. It is a proposal, not part of the tests as written.

## Hypotheses and their measures

Pass marks are copied from [Hypotheses](../define/hypotheses.md). Event names are defined in [Tasks and events](telemetry.md).

| # | Metric | Events | Pass if | Method |
| --- | --- | --- | --- | --- |
| H1 | Share of asks with a valid answer within 10 opening minutes; share of searches resolved | `shop_asked`, `shop_replied` (valid, reply minutes), `shop_timed_out`, `answer_received` | 60% of 20 asks; half the searches, reported separately | Proof of concept |
| H2 | Stated: go to the shop over ordering online. Behaviour: collection rate | Prototype choice; `order_set_aside`, `order_collected`, `order_not_collected` | 4 of 6; 2 of every 3 purchases collected | Prototype test, then proof of concept |
| H3 | First action per scenario: ask or browse; which felt simpler | `ask_started` against `nearby_viewed`, `category_opened`, `shop_opened` as the first action; the observer's notes | 4 of 6 ask first; 4 of 6 call it simpler | Prototype test |
| H4 | Shoppers who wait for the answer | `request_created`, `answer_received`, `payment_succeeded`, `request_closed`; a question afterwards on whether they bought elsewhere, which no event shows | 4 of 6 wait | Hand-run concierge |
| H5 | Preference between a shop's confirmation and till stock | Choice in a side-by-side test | 4 of 6, with reasons | Prototype test |
| H6 | Shops that keep a bought item 7 days; later, how long items wait | Stated; later `order_set_aside` and `order_collected` (days after ready) | 6 of 10 | Conversations with shops |
| H6, after work | Shops offering a later slot or a collection point; points open after 6:30pm | Stated; a walk of the ring; later `order_collected` (place, hour) | 3 of 10, and one point | Conversations and a walk |
| H7 | Working shoppers who buy ahead and collect | Prototype choice; `payment_succeeded`, `order_collected` (place, hour) | 4 of 6 stated; 2 real purchases collected | Prototype test, then proof of concept |
| H8 | Shoppers who set Keep looking, once or every week | `keep_looking_set` (repeat or not) | 3 of 6 one-off; 2 of 6 weekly | Prototype test |
| H9 | Shopkeepers who say the summary would change what they stock or make them answer | `demand_summary_sent`, `demand_summary_read` | 3 of 5 | Conversations with shops |
| H10 | Where shoppers want the concierge | Stated; later `request_created` (channel) | A split, no pass mark | Prototype test |
| H11 | Shops whose till holds product codes | The shop's record (source: connected) | A count, no pass mark | Proof of concept |
| H12 | Yeses that end in a purchase | `answer_received` (a yes) followed by `payment_succeeded` on the same request | 70% | Proof of concept |
| H13 | Shops on another terminal that take the provider's POS | `offer_made`, `offer_accepted` (type: pos) | 2 of the first 5 | Proof of concept, after four weeks |
| H14 | Shops on the POS that would keep or recommend it; app sales per shop | `payment_succeeded` summed by shop; stated | 3 of 5 | Proof of concept and conversations |
| H15 | Shops that pay for promotion | `offer_made`, `offer_accepted` (type: promotion) | 2 of 10 | Proof of concept |
| H16 | Share of collected orders from shops more than 15 minutes away | `order_collected` (walk minutes) | A share, no pass mark | Proof of concept |
| H17 | How often the asked shop is chosen, with and without the reliability row | Choice in paired cards | 3 of 6 pairs with the row, and more than without | Prototype test |
| H18 | Correct reading of "% would go back" against stars | Answers in a 5-second test | 5 of 6, no fewer than with stars | 5-second test |
| H19 | Shops that accept a public stock-accuracy figure | Stated | 6 of 10 | Conversations with shops |

## Usability and product indicators

Usability indicators say whether a shopper can do a task: task success, time on task, errors, and where they hesitate. They come from the prototype test, where the shops are scripted, and from the [synthetic test users](../deliver/synthetic-users.md), which only show that a path exists. They answer "can they", never "will they".

Product indicators say whether people do it and come back: fill rate, conversion from a yes to a purchase, collection rate, repeat use, shops that keep answering. They need real shops and real needs, so they start in the proof of concept and run on service records. A prototype can pass every usability measure while the product fails on these, which is why H1 is tested first.

Time spent waiting for shops belongs to the product side. In the prototype a scripted shop answers in 1 to 40 seconds, so prototype timings measure the shopper's effort and say nothing about the wait.

## Guardrails

Each growth metric has one that it must not push up: cancelled orders, refunds, orders not collected, orders not confirmed or sold after a yes, complaints, shops that opt out, shoppers who turn notifications off, and the number of requests each shop has to answer per order it gets. Definitions are in [Product metrics](metrics.md#guardrails). Thresholds are to be set before the proof of concept starts, as the pass marks were.

## Ratings, NPS and CSAT

The product already asks for one attitudinal measure. After an order is collected or delivered, Snuffle asks every buyer "Would you go back?" as a thumbs up or down, with up to three tags and an optional note (decision 047). The share of thumbs up is a satisfaction score per shop and per order, and the tags say which part went wrong ("Not ready when I came", "Wasn't as described").

The recommendation is not to add NPS. The proof of concept has six shoppers, so one person moves the score by about 17 points, and no decision could rest on it. NPS asks whether someone would recommend the app, a proxy for coming back, and the proof of concept can count who comes back. Orders are a few a month, so a second prompt after a quick errand adds friction to a utility that already asks for a rating, and it says nothing about which step failed.

A standing CSAT question isn't needed either, since the rating already is one for the shop. The rating has two gaps. It only reaches buyers who collected, the path that went well, so a shopper whose request ended in "Not found" or "Not confirmed" is never asked. And it rates the shop, not Snuffle. In the proof of concept, both gaps are cheaper to close by talking to the six shoppers at the end than by a survey. If a later build needs a number, the option is one optional question, "Did Snuffle help?", shown once on a sample of requests that end without an order. It is an option for me to decide on, not part of the plan.

Shops need their own question. Their satisfaction is about effort and sales, and a shopper's score says nothing about it. In the proof of concept that is a weekly check-in with each of the ten shops, in person or on WhatsApp: how many requests felt like too many, what they would change, whether they would carry on. Shops that opt out are the behavioural measure that goes with it.

## Telemetry status

None of these events or metrics is built. The prototype has no analytics, and its shops, payments and dates come from a simulation. The events are the definition a later build would implement, and the log the hand-run concierge would keep by hand. The privacy rules for them are in [Tasks and events](telemetry.md#privacy).
