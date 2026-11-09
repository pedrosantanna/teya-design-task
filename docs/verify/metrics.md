# Product metrics

The metrics that say whether Snuffle works as a marketplace and as a business, how each is computed from the events in [Tasks and events](telemetry.md), and a simple model of how many shops an area needs for a request to get answers in time. Nothing here is measured yet.

```summary
Takeaways:
- The north star is completed requests per week, the requests that end with an order collected or delivered. Its inputs are active shoppers, requests per shopper, fill rate, conversion from a filled request to a purchase, confirmation and collection, with answering shops per area as the supply input.
- Fill rate (requests that get at least one usable yes in time) is the marketplace's core number. With an answer rate of 60% (H1's go mark for asks, my estimate) and an assumed 40% chance that a shop that answers has the item, about 6 likely shops open give 80% fill; 3 give 56%.
- That means about 4 shops on Snuffle per kind in a 15-minute ring, 24 for six kinds. The proof of concept's 10 shops come out at 52%, which sets H1's go mark for fill at 50% of about 60 requests.
- The revenue estimate's base case works out at about 98 monthly active shoppers per active shop. With 6 shops asked per request, each shop answers about 11 asks for each order it gets, about 24 a trading day. The proof of concept asks each shop about once a trading day. Answer burden is the guardrail that limits how widely Snuffle can ask.
- Payments earn about 16p per order in the base case (£18 at 0.9%). Most of the money comes from shops joining the provider's POS, so POS attach per area is reported next to GMV.
Call:
- I asked for a north star candidate and its inputs, the supply and demand metrics, the money metrics from the revenue estimate, all by area and per shopper, and a model of how many shops an area needs per active shopper, with every input marked as an assumption to test. I adopted completed requests per week as the north star.
- I asked that no benchmark be invented, and that any outside figure come from a source that was opened and linked.
- I kept the model and set H1's marks from it (decision 070): 60% answers is my estimate, below the bar platforms set for a responsive business, and the 50% fill mark is the model's own prediction for 10 shops.
AI:
- An agent defined the metrics from the events and the revenue estimate, built the liquidity model from the assumptions already in the docs (the 15-minute ring, H1's answer rate, the proof of concept's ten shops, the six kinds), added three assumptions of its own, labelled, and checked the arithmetic in a short script.
- In a second pass, an agent aligned the metrics with the revised events: the collection rate counts from `order_ready`, GMV sums `payment_taken` and H12 counts per request with a yes. The liquidity arithmetic didn't change.
- In a third pass, an agent searched for benchmarks for r and fill and found none for this market; the anchors next to r are the closest it found. The arithmetic was checked again.
Trade-offs:
- A north star of completed requests rewards needs met and ignores order value; GMV beside it catches a drift to tiny orders.
- The model treats each shop's answer as independent and the share of shops that have the item as one number for every kind. Both are simplifications the proof of concept will correct.
```

## North star

Completed requests per week: requests that end with an order collected or delivered. A weekly request counts once per week it completes.

It needs every part to work: a shop answered, had the item and set it aside, the shopper bought and collected. It counts what the shopper came for, a sale for the shop and a payment for the provider. Requests created would grow while shoppers went home empty-handed, and GMV would reward a few large orders over many met needs.

It breaks down into inputs that each have an owner:

completed requests = active shoppers × requests per shopper × fill rate × filled to purchase × confirmation rate × collection rate

Supply sits under fill rate: answering shops per kind in the area, their answer rate and how often they have the item. I adopted this north star before the proof of concept, and its results can still change it.

## Metrics

| Metric | Definition | From |
| --- | --- | --- |
| Completed requests (north star) | Requests with an `order_collected` or `order_delivered`, per week; a standing request counts once per cycle | Service |
| Active shoppers | Shoppers with at least one `request_created` in the week or month | Service |
| Requests per active shopper | `request_created` per active shopper, per week and per month | Service |
| Repeat rate | Repeat use as defined in [Tasks and events](telemetry.md#definitions): shoppers with a collected or delivered order who have another request within 30 days, new requests and standing cycles reported apart | Service |
| Standing requests | Requests set to repeat (`keep_looking_set`, repeat yes), and purchases in their later cycles (`cycle` above 1) | Service |
| Shops on Snuffle | Shops with `shop_joined` and no `shop_opted_out`, per area and kind | Service |
| Answering shops | Shops with at least one valid `shop_replied` in the last 30 days | Service |
| Answer rate in 10 minutes | Valid `shop_replied` within 10 opening minutes, per `shop_asked` on WhatsApp while open (H1) | Service |
| Reply time | Opening minutes from `shop_asked` on WhatsApp to a valid `shop_replied`; median and 90th percentile | Service |
| Fill rate | Requests with at least one buyable `answer_received` before the deadline, per request with a deadline | Service |
| Coverage by kind | Fill rate by kind, with `request_not_found` split into all said no and no reply | Service |
| Time to first buyable answer | `request_created` to the first buyable `answer_received`; median and 90th percentile | Service |
| Yes to purchase | Per request with at least one yes `answer_received`, whether a purchase (`payment_authorised` or `payment_taken`) follows on it (H12) | Service |
| Filled to purchase | Requests with a purchase, per request with a buyable answer | Service |
| Request to purchase | Requests with a purchase, per `request_created` | Service |
| Confirmation rate | `order_confirmed` per `payment_authorised` | Service |
| Collection rate | `order_collected` per `order_ready` for collection (H2) | Service |
| GMV | Sum of `payment_taken` amounts, less `refund_issued` amounts | Service |
| Average order value | GMV per order | Service |
| Orders per buyer | Orders per shopper with at least one order in the month | Service |
| Would go back | Thumbs up per order, from the latest `rating_submitted` on each, by shop and area | Service |

## Money

The [revenue estimate](../define/revenue-estimate.md) gives three sources, each with a metric.

| Source | Metric | Base case in the estimate |
| --- | --- | --- |
| Payments in the app | GMV × net take rate, per order, per area | £18 × 0.9% ≈ £0.16 per order; about £2.90 per monthly buyer a year (£364,000 over 125,000 buyers) |
| Shops new to the provider's POS | POS attach: shops on Snuffle not on the provider's POS that join it (`offer_accepted`, type pos), and their counter card turnover | 25% of active shops new to the POS; half of the joining caused by the app |
| Promotion | Shops buying a promoted week, and revenue per area | 8% of active shops, £20 a week |

Revenue per area and per active shop is reported beside GMV, since a shop that joins the POS brings all its counter sales, and in the base case that is a larger source than payments in the app.

## By area and per shopper

Every metric is reported by area and per shopper. Demand is grouped by the postcode district the request was made from, supply by the shop's postcode district. A shopper's 15-minute ring crosses districts, so an area's fill rate counts the requests made from it, wherever the shops that answered are. Per shopper, the useful cuts are requests, orders and revenue per active shopper, and the repeat rate by how a shopper's first request went: a first request that ended in "Not found" is the likeliest to be the last.

## Liquidity

How many shops an area needs so that a request gets a usable yes in time. Every input below is an assumption to test; none is a benchmark.

| Input | Value | Where it comes from |
| --- | --- | --- |
| r: share of asked shops that answer validly within 10 minutes | 60% | H1's go mark for asks, and my estimate. No published figure exists for UK independents answering on WhatsApp. It sits below the bar platforms set for a responsive business: Meta's "Very responsive" badge needed a 90% response rate and a 15-minute response time ([Facebook Help Center, archived 2020](https://webcf.waybackmachine.org/web/20200509150311/https://www.facebook.com/help/988319821208361)); Thumbtack counts a pro's lead as answered within an hour ([Thumbtack community](https://community.thumbtack.com/discussion/comment/1583)) |
| h: share of shops that answer and have the item | 40% | Assumption, no source. The proof of concept measures it apart from r (H1) |
| o: share of likely shops open when the request comes in | 80% | Assumption for shop hours, no source |
| k: kinds of shop likely to have one item | 2 | Assumption. In the prototype, eclipse glasses go to six kinds (chemist, optician, stationer, camera shop, hardware, toys) and sourdough to one |
| Kinds in an area | 6 | The proof of concept's categories: hardware, florist, bakery, butcher, chemist, stationery |
| Ring | 15 minutes' walk | The concept's area and the proof of concept |

### Shops asked per request

If each asked shop gives a usable yes with probability r × h, and shops answer independently, a request asked of n shops gets at least one yes with probability 1 − (1 − r × h)ⁿ. With r × h = 0.6 × 0.4 = 0.24:

| Shops asked (n) | Fill rate |
| --- | --- |
| 2 | 1 − 0.76² = 42% |
| 3 | 1 − 0.76³ = 56% |
| 6 | 1 − 0.76⁶ = 81% |
| 9 | 1 − 0.76⁹ = 92% |

Solving for n gives n = ln(1 − fill) ÷ ln(1 − r × h), rounded up. Shops needed at other values of r × h:

| r × h | Shops for 50% fill | For 80% | For 90% |
| --- | --- | --- | --- |
| 0.24 (answer 60%, have it 40%) | 3 | 6 | 9 |
| 0.36 (answer 60%, have it 60%) | 2 | 4 | 6 |
| 0.48 (answer 60%, have it 80%) | 2 | 3 | 4 |

The prototype's eclipse request asks 6 shops, which is 81% at the base inputs.

### Shops per area

A request draws its n likely shops from k kinds, and only the open ones count, so n = shops per kind × k × o. For 80% fill: shops per kind = 6 ÷ (2 × 0.8) = 3.75, so 4 per kind, and 4 × 6 kinds = 24 shops on Snuffle in a 15-minute ring. For 50% fill: 3 ÷ 1.6 ≈ 2 per kind, 12 shops.

At H1's stop mark for asks, r = 45% and r × h = 0.18, a request needs n = ln 0.2 ÷ ln 0.82 ≈ 8.1, so 9 likely shops for 80% fill: 9 ÷ 1.6 ≈ 5.6, so 6 per kind and 36 shops in a ring, rounded up as above. I judge that beyond what one ring's independents can supply.

The proof of concept has 10 shops over 6 kinds, about 1.7 per kind. That gives n = 1.7 × 2 × 0.8 ≈ 2.7 likely shops per request and a fill rate of 1 − 0.76^2.7 ≈ 52%. H1's go mark for fill is 50% of about 60 requests, and its stop mark 30%. Published fill-rate benchmarks range widely and none covers this kind of marketplace ([Lenny Rachitsky, "The most important marketplace metrics", 29 March 2022](https://www.lennysnewsletter.com/p/the-most-important-marketplace-metrics)), so the mark comes from the model. A go there says the concept can work with ten shops; whether ten are enough for the product is a separate question.

### Shoppers per shop

The supply floor above doesn't depend on how many shoppers there are. Shoppers decide whether the shops get enough orders to stay. The revenue estimate's UK base case has 3,195 active shops, 312,000 monthly active shoppers, 125,000 buyers and 187,000 orders a month: about 98 monthly active shoppers and 58 orders per active shop. For a ring of 24 shops at that rate: 24 × 58 = 1,392 orders a month, from 1,392 ÷ 1.5 orders per buyer = 928 buyers, from 928 ÷ 40% buyers per active shopper = 2,320 monthly active shoppers in the ring. Whether 58 orders a month keeps a shop answering is itself untested.

### Answer burden

Each order costs the shops many answers. With n = 6, fill of 80% and filled requests bought at H12's 70%, a request turns into an order 0.8 × 0.7 = 56% of the time, so the shops answer 6 ÷ 0.56 ≈ 10.7 asks per order. At 58 orders a shop a month that is about 620 asks a month, about 24 a trading day over 26 days. The proof of concept's 160 asks over three weeks are about 1 per shop per trading day, so it tests answering at low load.

That is the tension in this marketplace: asking more shops raises the fill rate and the number of noes each shop types. The levers are matching better, since a higher h needs fewer shops (at r × h = 0.48, 3 shops give 80% and the burden halves to about 5 asks per order); till-connected shops, which answer without effort (H11); and asking in waves, stopping once there is a yes, which trades the shopper's wait for the shop's effort. Asks per shop per day and per order are a guardrail, and the shops' weekly check-in says where the limit is. In the proof of concept a shop isn't asked again that day after 10 asks; the steady-state threshold stays open.

## Guardrails

| Guardrail | Definition | Watches |
| --- | --- | --- |
| Cancellations | `order_cancelled` per `order_ready` for collection | Buying too soon, collect-by dates that don't fit |
| Refunds | `refund_issued` per order, by reason | Every money-back path |
| Not collected | `order_not_collected` per `order_ready` for collection; the reverse of H2's 2 in 3 | Stock tied up in shops, money back to shoppers |
| Not confirmed or sold after a yes | `order_not_confirmed` and `order_sold` per `payment_authorised` | Answers shoppers can't trust; stock accuracy |
| Complaints | `complaint_opened` per 100 orders, by topic, shopper and shop | Failures no other event shows |
| Shops opting out | `shop_opted_out` per active shop a month, by reason | Answer burden, low sales |
| Notification opt-outs | `notifications_changed` to off, per active shopper | Too many messages from Snuffle |
| Answer burden | `shop_asked` per shop per trading day, and per order | Asking too widely |
| Thumbs down | Thumbs down per order, from the latest `rating_submitted`, with tags; "Not ready when I came" reported on its own | Shops falling short in person |

Rating response is not a target. Snuffle asks every buyer once and reminds once at most (decision 047 and the [service blueprint](../define/blueprint.md)), and pushing the response rate up would mean more prompts.
