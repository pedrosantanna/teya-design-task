# Tasks and events

The tasks a shopper and a shop do in Snuffle, each with the events that start and end it, and the event taxonomy a later build would implement. It is a definition only: the prototype sends no events.

```summary
Takeaways:
- Twelve tasks: nine for the shopper (ask, answer Snuffle's questions, compare answers, buy, collect, rate, browse, open a shop, keep looking) and three for the shop (answer a request, confirm an order, hand over). Each has a start event, an end event and a definition of success, failure and abandonment.
- Time on task is reported as the median and the 90th percentile. For a request, the shopper's effort and the wait for shops are separate numbers, because most of the elapsed time is the shop's.
- Fifty-eight events, named object_action. Most are service records the backend keeps to run the service; the rest are app analytics, asked for with consent.
- No personal data goes in an event: no names, phone numbers, addresses, coordinates, item text or note text. The area is a postcode district, and the item becomes a kind.
Call:
- I asked for each key task to be defined with its start and end events, success, failure, abandonment, time on task and error rate, and for the nuances that come with requests: repeat use, weekly requests, keep looking.
- I asked for an event taxonomy with names, triggers, key properties and privacy notes, marked as a definition for a later build.
- I asked for a review of the tasks and events against the prototype's states and for its findings to be fixed: connected shops and delivery, authorisation apart from the charge, Not found as a live state, and error rates with a real denominator.
AI:
- An agent derived the tasks and events from the conceptual model's objects, states and verbs, the request, answer, order and collection specs, and the states in the prototype's simulation, so each event matches a state the product already has.
- A second pass by an agent checked every task and event against the simulation's order and payment states, added the events that were missing (ready, dispatched, not found, payment attempted and cancelled, screen time on a request) and removed two duplicates.
Trade-offs:
- Service records alone can't see abandonment before a request exists, or how long a shopper looks at answers. Those need app analytics, and only shoppers who consent will be in them.
- Turning item text into a kind keeps personal data out of analytics, and loses the detail the demand summary needs, which stays in the service and is only shared in aggregate.
```

## Shopper tasks

| Task | Starts | Ends in success | Failure | Abandonment |
| --- | --- | --- | --- | --- |
| Ask for an item | `ask_started` | `request_created`: Snuffle confirmed and asked the shops | `message_unmatched` (stage ask), with no request after it | `ask_started` with no `message_sent` |
| Answer Snuffle's questions | `snuffle_question_shown` | `snuffle_question_answered`, from a chip or in words Snuffle understood | `message_unmatched` (stage question), or a second round on the same question | The question left open when the session ends |
| Compare answers | The first `answer_viewed` on a request | `buy_tapped`, or `answer_dismissed` on every answer, which is a valid outcome | None by itself; see Buy | `request_closed` with reason deadline with answers |
| Buy | `buy_tapped` | A purchase: `payment_authorised` at an asked shop, `payment_taken` at a connected one | `payment_failed` with no later `payment_attempted` on the same answer | `payment_cancelled` with no later attempt |
| Collect with the code | `order_ready` (collect) | `order_collected` by the collect-by date, including an extension | `order_not_collected` | `order_cancelled` |
| Rate | `rating_prompt_shown` | `rating_submitted` | None | Prompt dismissed, or 30 days pass |
| Browse Nearby or a category | `nearby_viewed` | `shop_opened`, or `ask_started` from a category or a shop | None | Session ends without opening anything. Browsing can end there without failing |
| Open a shop | `shop_opened` | `shop_action_tapped` (Directions, Call) or `ask_started` from the page | None | Back with no action |
| Keep looking | `keep_looking_set` | A later `answer_received` with a yes, then a purchase | `request_closed` with reason looking expired | `request_closed` with reason shopper |

Snuffle's questions are what's missing, a split, collect or delivery, and notifications. Choosing collect or delivery is one of them (type fulfilment), and its answer is a property of the request.

A "Not ready when I came" tag on a rating is a quality indicator for the shop, reported beside the collection rate. The order was still collected.

A delivery has no shopper task after Buy. Its states are service records: `order_ready` when it is paid, `order_dispatched` when it is on its way, `order_delivered` at the door.

## Shop tasks

| Task | Starts | Ends in success | Failure | Abandonment |
| --- | --- | --- | --- | --- |
| Answer a request | `shop_asked` while the shop is open | `shop_replied`, valid, within 10 opening minutes (H1) | `shop_replied` that isn't valid; no `answer_received` follows it | `shop_timed_out` at the 10-minute mark |
| Confirm an order | `payment_authorised` at an asked shop | `order_confirmed` within 10 opening minutes | `order_sold` | `order_not_confirmed`: the authorisation lapses and nobody is charged |
| Hand over | The shopper arrives, which no event shows; `collection_code_opened` is the nearest sign | `order_collected` by scanning the code | `collection_code_rejected`, then the order marked by hand (method tap) | None |

A valid reply that arrives after the 10-minute mark and before the deadline is a late valid answer. The shopper gets it and can buy; H1 doesn't count it as a success.

A connected shop does neither of the first two tasks: its till answers and the sale is immediate, so its order goes straight to `order_ready`. Its events carry source: connected, and are reported apart from asked shops.

## Definitions

| Term | Meaning |
| --- | --- |
| Yes | An answer that has the item: has it, has some, in stock, in stock some. The same list as `YES` in the prototype's simulation |
| Buyable | A yes, something similar, or can make. The same list as `BUYABLE` in the simulation |
| Valid answer | A reply Snuffle can read as a clear yes or no on the item, and for a yes, the price |
| Purchase | The shopper's payment going through: `payment_authorised` at an asked shop, `payment_taken` at a connected shop |
| Opening minutes | Minutes while the shop is open. Both 10-minute clocks (answer and confirm) count only these |
| Repeat use | A shopper with a collected or delivered order who has another request within 30 days, a new one or the next cycle of a standing request. The two are reported separately |

## Time on task

Durations are reported as the median and the 90th percentile, not the mean. They are skewed: a shopper who puts the phone down for an hour in the middle of buying pulls the mean far away from what a typical shopper does, and the 90th percentile shows the slow tail that a mean hides.

| Clock | Measured as | Ends | Source |
| --- | --- | --- | --- |
| Shopper effort | Seconds between each `request_opened` and its `request_left` on that request's screens (chat, details, pay), summed across sessions, from `ask_started` | The purchase; with no purchase, the last `request_left` before `request_closed` | App analytics |
| Wait for an answer | `request_created` to the first buyable `answer_received` | That answer | Service |
| Wait for confirmation | `payment_authorised` to `order_confirmed`, in opening minutes | Confirmation | Service |
| Delivery | `order_ready` to `order_delivered` | Delivered | Service |

Reporting effort and waiting together would blame the app for the shop's pace, or hide a slow ask behind a fast shop. In the prototype the shops are scripted, so prototype timings measure effort only.

## Errors

The error rate is errors per attempt, by task. Every denominator is an event that fires on each attempt.

| Task | Error | Rate |
| --- | --- | --- |
| Ask | Message Snuffle can't match | `message_unmatched` (stage ask) per `message_sent` (stage ask) |
| Answer Snuffle's questions | An extra round on the same question | Second `snuffle_question_shown` of the same type per request |
| Buy | Failed payment | `payment_failed` per `payment_attempted` |
| Answer a request (shop) | Reply Snuffle can't read | Invalid `shop_replied` per `shop_asked` on WhatsApp; messages per resolved answer beside it |
| Hand over (shop) | Code not accepted | `collection_code_rejected` per `order_collected` |

## Nuances

A standing request ("bread every Friday") makes an order each week with no new ask. Each week is a cycle of the same request, and request-scoped events carry `cycle` (1 for a one-off). Later cycles stay out of the ask task and out of the 10-minute answer clock. `keep_looking_set` fires whenever a request is set to repeat, with from: ask when the shopper says so in the first message.

Keep looking runs for days. Its timings are reported apart from requests with a deadline the same day.

A split turns one message into two requests. `snuffle_question_answered` (type split) records whether it was accepted and the ids of the requests it made. The ask task counts per message; fill and conversion count per request.

Not found is a live state. `request_not_found` fires when every asked shop has said no or not replied; the request stays open for Ask further away and Keep looking, and only `request_closed` ends it.

A partial answer ("Has 1 of 2"), something similar and an answer from further away are successes only if the shopper buys them. Each answer records its outcome so the three can be told apart.

Every timing is split by source (asked or connected), since a till answers at once.

## Event taxonomy

Names are object_action in the past tense. "Service" events are records the backend keeps to run the service (requests, answers, orders, payments). "App" events are analytics from the shopper app and need consent.

Every event carries `event_id`, `ts` (UTC), `user_id` (a random pseudonymous id, never an email or phone number), `session_id`, `platform`, `app_version` and `area` (the postcode district the request was made from, such as W14), plus `request_id`, `order_id` and `shop_id` where they apply. Request-scoped events carry `cycle`. Every payment_* and order_* event carries `source` (asked or connected) and `fulfilment`; payment_* events also carry `answer_id` and `attempt`. Each shopper has one attribute, kept with the pseudonymous id and taken when they join: works shop hours, yes or no (H7).

### Browse and shops

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `app_opened` | App | The app comes to the foreground | from: icon, notification, link |
| `area_changed` | App | The shopper confirms a place or radius | place type: current, saved, searched; radius minutes |
| `nearby_viewed` | App | Nearby is shown | open shops count, radius |
| `category_opened` | App | A kind is tapped | kind |
| `shop_opened` | App | A shop page opens | shop id, from: tile, category, answer, order, map |
| `shop_action_tapped` | App | Directions or Call on a shop page. Ask fires only `ask_started` | action |

### Ask

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `ask_started` | App | The composer is focused or a suggestion is tapped | from: ask bar, suggestion, shop page, category chip |
| `message_sent` | App | The shopper sends a message to Snuffle | stage: ask, question, chat |
| `request_created` | Service | Snuffle confirms the request | kind, item count, quantity, deadline minutes or none, fulfilment, radius, channel: app, WhatsApp, assistant, standing: yes or no |
| `snuffle_question_shown` | Service | Snuffle asks something | type: missing, split, fulfilment, notifications |
| `snuffle_question_answered` | Service | The shopper answers | type; how: chip or typed; for a split, accepted and the resulting request ids |
| `message_unmatched` | Service | Snuffle can't match a message | stage: ask, question, chat |

### Shops and answers

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `shop_asked` | Service | The ask is delivered to a shop | channel: WhatsApp or till, open now, ring |
| `shop_seen` | Service | WhatsApp reports the message read | seconds since asked |
| `shop_replied` | Service | Once per shop and request, when Snuffle has read the reply as an answer or given up on it | outcome: has it, has some, similar, doesn't have, can make; valid; messages; reply minutes in opening hours |
| `shop_timed_out` | Service | No valid reply by a mark | mark: 10 minutes or deadline |
| `answer_received` | Service | An answer reaches the request, from a valid reply or a till | source; outcome; seconds since request; order of arrival |
| `answer_viewed` | App | An answer card is on screen | position, source |
| `answer_dismissed` | App | No thanks | outcome |
| `answer_restored` | App | Undo after No thanks | none |
| `request_opened` | App | A request's screen comes on screen | screen: chat, details, pay |
| `request_left` | App | That screen goes off screen or the app goes to the background | screen; seconds |
| `request_widened` | Service | Ask further away | ring |
| `request_not_found` | Service | Every asked shop has said no or not replied | said no count, no reply count |
| `keep_looking_set` | Service | A request is set to keep looking, once or on repeat | from: ask, chat, not found; repeat: yes or no; days |
| `request_closed` | Service | The request ends without an open order | reason: shopper, deadline with answers, deadline without answers, looking expired; bought elsewhere: before the first yes, after it, no, not asked (reported by the shopper afterwards, H4) |

### Buy and pay

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `buy_tapped` | App | Buy in the details sheet | quantity |
| `payment_attempted` | Service | The shopper confirms in the payment sheet | method: Apple Pay, Google Pay, card |
| `payment_cancelled` | App | The payment sheet is closed without paying | none |
| `payment_failed` | Service | The payment doesn't go through | reason: declined, error |
| `payment_authorised` | Service | An asked shop's payment is authorised, not taken | method |
| `payment_taken` | Service | The money is taken: at confirmation for an asked shop, at once for a connected one | amount in pence; at: confirmation or at once |

### Orders

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `order_confirmed` | Service | An asked shop confirms; the order is set aside or ready to send | opening seconds since authorisation |
| `order_not_confirmed` | Service | 10 opening minutes pass with no confirmation | none |
| `order_sold` | Service | An asked shop says it sold the item | none |
| `order_ready` | Service | The order becomes Ready (collect) or Paid (delivery): at confirmation for an asked shop, at payment for a connected one | seconds since payment |
| `reminder_sent` | Service | The day-before reminder goes out | days left |
| `collection_code_opened` | App | The code is opened full screen | none |
| `collection_code_rejected` | Service | The shop's scan of the code fails | none |
| `order_extended` | Service | The shopper extends once | days added |
| `order_cancelled` | Service | The shopper cancels for a refund | days after ready |
| `order_collected` | Service | The shop scans the code or marks it | method: scan or tap; place: shop or point; days after ready; walk minutes (the walk time shown, from the request's place) |
| `order_not_collected` | Service | The window ends | none |
| `order_dispatched` | Service | The shop or courier sets off (On its way) | minutes since ready |
| `order_delivered` | Service | The shop or courier marks it delivered | minutes since ready |

### Ratings, shops and guardrails

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `rating_prompt_shown` | App | The Rate card or "How was [shop]?" is shown, once per order | none |
| `rating_submitted` | Service | A rating is sent or changed; the latest per order counts | up or down; tags; has note: yes or no; edit: yes or no |
| `rating_disputed` | Service | A shop disputes a rating | signal |
| `refund_issued` | Service | Money goes back | amount in pence; reason: cancelled, not collected, dispute |
| `complaint_opened` | Service | A shopper or a shop contacts support | topic |
| `notification_sent` | Service | Snuffle sends a push notification | type: answer, confirmed, reminder, not found, rate |
| `notifications_changed` | App | Notifications are turned on or off | state |
| `shop_joined` | Service | A shop starts answering | source; new to the provider's POS: yes or no |
| `shop_opted_out` | Service | A shop stops answering or leaves | reason |
| `demand_summary_sent` | Service | The weekly summary goes to a shop | requests counted |
| `demand_summary_read` | Service | WhatsApp reports it read | none |
| `offer_made` | Service | A shop is offered the POS or a promoted slot | type: pos or promotion |
| `offer_accepted` | Service | The shop agrees or starts a trial | type |

## Privacy

No event property holds personal data: no names, phone numbers, email or street addresses, coordinates, payment card details, the item text the shopper typed, or the text of a rating note. Snuffle turns the item into a kind on the server; the item text stays in the service, where the weekly demand summary uses it in aggregate and never with a shopper attached. A shop is an id, since the name of a sole trader's shop can identify a person; the name stays in the service database.

The area is the postcode district, never the full postcode or the shopper's position. Amounts stay in service records; analytics that need them use bands.

Service events exist because the service needs them to take a request and a payment, so they are processed to deliver what the shopper asked for, under UK GDPR. App events are not needed for that, so they are off until the shopper agrees, and storing or reading anything on the phone for them follows the same rules as cookies. The ICO's [guidance on storage and access technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) lists an exception for statistical purposes; whether it covers these events is to be checked when they are built.

In the hand-run concierge, the log sheet uses the same event names, codes shoppers as S1 to S20 and shops by id, and holds no phone numbers. Shoppers and shops agree to take part before the first request.

The [measurement layer](../develop/ideation/app-flow.md) on the App flow canvas places every task and event on the screens where it happens. It is checked against this page by `python3 scripts/build_measurement_layer.py`.
