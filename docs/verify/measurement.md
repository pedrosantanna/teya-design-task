# Measurement plan

How each hypothesis gets tested and measured, from the tasks a shopper and a shop do to the metrics that say whether the product works. The telemetry is a definition for a later build: the prototype records nothing, and its shops answer on a script.

```summary
Takeaways:
- Every hypothesis has a metric, the events that compute it, its go and stop marks and a method. Most of the numbers come from records the service keeps anyway (requests, answers, orders, payments), so the proof of concept needs no tracking in the app.
- The event names double as the log sheet for the hand-run concierge: one row per event, with the WhatsApp timestamps.
- The north star is completed requests per week: requests that end with an order collected or delivered. It only moves when a shop answers, has the item, and the shopper buys and collects.
- The proof of concept runs four weeks with 10 shops and 20 shoppers: about 60 requests and about 160 asks. Its size comes from the funnel, so that H2, H7 and H12 have enough purchases to read. It tests shops at low load, about 1 ask per shop per trading day.
- Every mark splits results into go, iterate and stop, set before testing, and each result is reported with its 90% Wilson interval.
- With the current assumptions, a request needs about six likely shops open to get a yes 80% of the time. Ten shops spread over six kinds, as in the proof of concept, give 52%, which sets H1's go mark for fill at 50% of the requests.
- The recommendation is no NPS and no standing CSAT for now. The rating after collection covers the shop; what it misses (requests that end without an order, Snuffle itself, the shop's view) is covered by talking to the twenty shoppers and ten shops in the proof of concept.
Call:
- I asked for a verification step next to the synthetic test users: how each hypothesis will be tested, and the telemetry needed to measure behaviour, documented and explicitly not built into the prototype.
- I asked for the main tasks with their start and end, success, failure, abandonment, time on task and errors; an event taxonomy with privacy notes; product and marketplace metrics, including how many shops an area needs per active shopper; guardrails; and how the hypotheses map to all of it.
- I said I lean against NPS and CSAT for this product and asked for the reasons to be checked against the model. I adopted completed requests per week as the north star; the survey question stays open.
- Later I asked where the numbers came from, then set the proof of concept's size, the go and stop marks and the answer-burden guardrail for it (decision 070). The steady-state burden threshold stays open.
AI:
- An agent read the hypotheses, the conceptual model, the app, agent and shop flows, the specs and the prototype's simulation, then drafted the tasks, the events, the metrics, the liquidity model and the NPS and CSAT recommendation.
- Every input of the liquidity model is an assumption, labelled as one. The outside links are the UK regulator's guidance on storage and access technologies, and the anchors for the marks (decision 070), which an agent found and opened.
- In a second pass, an agent checked the tasks and events against the prototype's order and payment states and fixed what didn't match: a connected shop's order, delivery, authorisation apart from the charge, Not found as a live state, and the denominators of the error rates and of H1.
- In a third pass, an agent audited the plan's numbers and found marks with no grounding; after I set the direction, an agent rewrote the marks and the proof of concept's shape.
Trade-offs:
- Measuring from service records keeps tracking out of the app, and misses what happens on screen (time spent comparing answers, an ask abandoned before sending) until analytics with consent exist.
- The liquidity model treats shops as independent. A scarce item, such as eclipse glasses the day before, sells out everywhere at once, so the real fill rate will be lower than the model says.
```

The detail is on two pages: [Tasks and events](telemetry.md) defines the tasks and the event taxonomy, and [Product metrics](metrics.md) defines the metrics, the north star, the liquidity model and the guardrails.

The [App flow](../develop/ideation/app-flow.md) canvas has a measurement layer (M) that places every task, event and product metric on the screens where they happen, read from `docs/verify/measurement-layer.json`. `python3 scripts/build_measurement_layer.py` fails if an event, task or metric on these pages has no place on the canvas.

## Proof of concept

The proof of concept runs four weeks with the same 10 shops in the 15-minute ring around Blythe Road, 5 on the provider's POS and 5 on other terminals, so that H13 and H14 each have 5. Twenty shoppers, at least 10 of them working shop hours, make about 3 real requests each over the first three weeks: about 60 requests. Each request goes to its likely shops, about 2.7 on average with 10 shops ([product metrics](metrics.md#shops-per-area)), so about 160 asks, about 16 per shop. Week four is for the conversations with shopkeepers (the demand summary, H9) and the money offers (H13 to H15).

The size comes from the funnel. 60 requests × 50% fill ≈ 30 with a yes; × 70% bought (H12) ≈ 21 purchases; × 2 in 3 collected ≈ 14 collected orders. That is enough to read H2, H7 and H12. The previous plan's 24 requests would have given about 8 purchases and 6 collected orders, too few for any of them.

The load is low. About 1 ask per shop per trading day, against about 24 at the model's steady state ([answer burden](metrics.md#answer-burden)), so a go on H1 says shops answer at low load. Whether they keep answering at scale stays untested.

## Go, iterate or stop

Every hypothesis with a mark has three zones, set before testing: go if the result is at or above the go mark, stop if it is at or below the stop mark, iterate in between. Each result is reported with its 90% Wilson interval, which holds up with small samples ([MeasuringU](https://measuringu.com/small-n/)): 14 of 20 is 70%, with an interval of about 52% to 84%. Writing the criterion down before the test follows the [Strategyzer Test Card](https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card). Where a hypothesis has a stated and a behavioural mark (H2, H7) and the two disagree, behaviour wins. Where 10 shops or 20 pairs can only show a large effect (H6, H13, H14, H17, H19), the mark is labelled direction only.

## Methods

| Method | Who | What it can show | Hypotheses |
| --- | --- | --- | --- |
| Usability round | 5 to 8 shoppers, before the choice measures | Problems in the prototype, reported as findings ([Nielsen](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)) | None; it fixes the prototype first |
| Prototype test, moderated | 20 shoppers, 30 minutes each, deadline scenarios; they can be the twenty from the proof of concept | Stated choice: what they pick, whether they finish, how long it takes. Twenty give about ±20 points at 95% ([Budiu and Moran, NN/g, 2021](https://www.nngroup.com/articles/summary-quant-sample-sizes/)) | H2, H3, H5, H7, H8, H10, H17 |
| 5-second test | The same 20 shoppers | Whether a shop page reads at a glance | H18 |
| Proof of concept: the agent, or the hand-run concierge on WhatsApp | 10 shops within 15 minutes' walk of Blythe Road, 20 shoppers with real needs, four weeks | Behaviour: shops answering, fill, buying, collecting, coming back | H1, H2, H4, H6, H7, H11, H12 |
| Conversations with shops | The same 10 shops, in week four | What shops accept, commit to and value, and their effort | H6, H9, H13, H14, H15, H19 |
| Analytics in a later build | Every shopper who consents | The same metrics at scale, by area and over time | All, once built; H16 needs a second ring |

Three weeks of requests show whether a shopper asks again after a first request.

## Hypotheses and their measures

Go and stop marks are copied from [Hypotheses](../define/hypotheses.md). Event names are defined in [Tasks and events](telemetry.md).

| # | Metric | Events | Go / stop | Method |
| --- | --- | --- | --- | --- |
| H1 | Share of asks with a valid answer within 10 opening minutes, and per shop; share of requests filled; h, the share of answering shops that have the item | `shop_asked` (channel WhatsApp, open now), `shop_replied` (valid, outcome, reply minutes), `shop_timed_out`, `answer_received`, `request_not_found` | Asks: go 60% of about 160 and 8 of 10 shops answering half, stop under 45% or under 6 shops. Requests: go 50% of about 60, stop under 30% | Proof of concept |
| H2 | Stated: go to the shop over ordering online. Behaviour: collection rate | Prototype choice; `order_ready` (collect), `order_collected`, `order_not_collected`, `order_cancelled` | Stated: go 14 of 20, stop 9. Behaviour: go 2 in 3 collected (about 14 of 21), stop under half | Prototype test, then proof of concept |
| H3 | The shopper's first action in their first specific-need scenario: ask or browse; how they last found such an item | The first of `ask_started`, `category_opened`, `shop_opened` or `area_changed` after `nearby_viewed`, which only anchors the session; in the prototype test the observer records it, and the baseline question before it | Go 14 of 20 ask first, stop 9 | Prototype test |
| H4 | Requests whose first yes came after more than 5 minutes that are still open when it arrives | `request_created`, `answer_received` (seconds since request), `payment_authorised` or `payment_taken`, `request_closed` (bought elsewhere, reported by the shopper) | Go 70%, stop under 50% | Hand-run concierge |
| H5 | Preference between a shop's confirmation and till stock | Choice in a side-by-side test | Go 14 of 20, with reasons; stop 9 | Prototype test |
| H6 | Shops that keep a bought item 7 days; later, how long items wait | Stated; later `order_ready` and `order_collected` (days after ready) | 6 of 10, direction only | Conversations with shops |
| H6, after work | Shops offering a later slot or a collection point; points open after 6:30pm | Stated; a walk of the ring; later `order_collected` (place, hour) | 3 of 10, and one point, direction only | Conversations and a walk |
| H7 | Working shoppers who buy ahead and collect | Prototype choice; a purchase, `order_collected` (place, hour) by shoppers who work shop hours | Stated: go 14 of 20, stop 9. Behaviour: go 5 of 10 working shoppers, stop 2 | Prototype test, then proof of concept |
| H8 | Shoppers who set Keep looking, once or every week | The observer's record of the choice; later build: `keep_looking_set` (repeat, from) | One-off: go 10 of 20, stop 4. Weekly: go 7 of 20, stop 2 | Prototype test |
| H9 | Shops that agree to keep answering requests for another month after seeing their demand summary | Stated commitment in week four; later build: `demand_summary_sent`, `demand_summary_read`, `shop_opted_out` | Go 6 of 10, stop 3 | Conversations with shops |
| H10 | Where shoppers want the concierge | Stated; later `request_created` (channel) | A split, no marks | Prototype test |
| H11 | Shops whose till holds product codes | The shop's record (source: connected) | A count, no marks | Proof of concept |
| H12 | Requests with at least one yes that end in a purchase | `answer_received` with a yes (has it, has some, in stock), then `payment_authorised` or `payment_taken` on the same request | Go 70% of about 30, stop under 50% | Proof of concept |
| H13 | Shops on another terminal that take the provider's POS | `offer_made`, `offer_accepted` (type: pos) | 2 of 5, direction only | Proof of concept, week four |
| H14 | Shops on the POS that would keep or recommend it; app sales per shop | `payment_taken` (amount) summed by shop; stated | 3 of 5, direction only | Proof of concept and conversations |
| H15 | Shops that pay for promotion | `offer_made`, `offer_accepted` (type: promotion) | A count, no marks | Proof of concept, week four |
| H16 | Share of collected orders from shops more than 15 minutes away | `order_collected` (walk minutes, as shown from the request's place) | A share, no marks; not measurable in this proof of concept | A second ring, later |
| H17 | How often the asked shop is chosen, with and without the reliability row | Choice in paired cards | 10 of 20 pairs with the row, and more than without, direction only | Prototype test |
| H18 | Correct reading of "% would go back" against stars | Answers in a 5-second test | Go 17 of 20, no fewer than with stars; stop 12 | 5-second test |
| H19 | Shops that accept a public stock-accuracy figure | Stated | 6 of 10, direction only | Conversations with shops |

## Usability and product indicators

Usability indicators say whether a shopper can do a task: task success, time on task, errors, and where they hesitate. They come from the prototype test, where the shops are scripted, and from the [synthetic test users](../deliver/synthetic-users.md), which only show that a path exists. They answer "can they", never "will they".

Product indicators say whether people do it and come back: fill rate, conversion from a yes to a purchase, collection rate, repeat use, shops that keep answering. They need real shops and real needs, so they start in the proof of concept and run on service records. A prototype can pass every usability measure while the product fails on these, which is why H1 is tested first.

Time spent waiting for shops belongs to the product side. In the prototype a scripted shop answers in 1 to 40 seconds, so prototype timings measure the shopper's effort and say nothing about the wait.

## Guardrails

Each growth metric has one that it must not push up: cancelled orders, refunds, orders not collected, orders not confirmed or sold after a yes, complaints, shops that opt out, shoppers who turn notifications off, and the number of asks each shop has to answer per order it gets. Definitions are in [Product metrics](metrics.md#guardrails).

In the proof of concept, a shop isn't asked again that day once it has had more than 10 asks, and any shop that asks to slow down is recorded. The threshold for answer burden at steady state stays open.

## Ratings, NPS and CSAT

The product already asks for one attitudinal measure. After an order is collected or delivered, Snuffle asks every buyer "Would you go back?" as a thumbs up or down, with up to three tags and an optional note (decision 047). The share of thumbs up is a satisfaction score per shop and per order, and the tags say which part went wrong ("Not ready when I came", "Wasn't as described").

The recommendation is not to add NPS. The proof of concept has twenty shoppers, so one person moves the score by 5 points, and no decision could rest on it. NPS asks whether someone would recommend the app, a proxy for coming back, and the proof of concept can count who comes back. Orders are a few a month, so a second prompt after a quick errand adds friction to a utility that already asks for a rating, and it says nothing about which step failed.

A standing CSAT question isn't needed either, since the rating already is one for the shop. The rating has two gaps. It only reaches buyers who collected, the path that went well, so a shopper whose request ended in "Not found" or "Not confirmed" is never asked. And it rates the shop, not Snuffle. In the proof of concept, both gaps are cheaper to close by talking to the twenty shoppers at the end than by a survey. If a later build needs a number, the option is one optional question, "Did Snuffle help?", shown once on a sample of requests that end without an order. It is an option for me to decide on, not part of the plan.

Shops need their own question. Their satisfaction is about effort and sales, and a shopper's score says nothing about it. In the proof of concept that is a weekly check-in with each of the ten shops, in person or on WhatsApp: how many asks felt like too many, what they would change, whether they would carry on. Shops that opt out are the behavioural measure that goes with it.

## Telemetry status

None of these events or metrics is built. The prototype has no analytics, and its shops, payments and dates come from a simulation. The events are the definition a later build would implement, and the log the hand-run concierge would keep by hand. The privacy rules for them are in [Tasks and events](telemetry.md#privacy).
