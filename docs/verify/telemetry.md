# Tasks and events

The tasks a shopper and a shop do in Snuffle, each with the events that start and end it, and the event taxonomy a later build would implement. It is a definition only: the prototype sends no events.

```summary
Takeaways:
- Twelve tasks: nine for the shopper (ask, answer Snuffle's questions, compare answers, buy, collect, rate, browse, open a shop, keep looking) and three for the shop (answer a request, set aside, hand over). Each has a start event, an end event and a definition of success, failure and abandonment.
- Time on task is reported as the median and the 90th percentile. For a request, the shopper's effort and the wait for shops are separate numbers, because most of the elapsed time is the shop's.
- Forty-seven events, named object_action. Most are service records the backend keeps to run the service; the rest are app analytics, asked for with consent.
- No personal data goes in an event: no names, phone numbers, addresses, coordinates, item text or note text. The area is a postcode district, and the item becomes a kind.
Call:
- I asked for each key task to be defined with its start and end events, success, failure, abandonment, time on task and error rate, and for the nuances that come with requests: repeat use, weekly requests, keep looking.
- I asked for an event taxonomy with names, triggers, key properties and privacy notes, marked as a definition for a later build.
AI:
- An agent derived the tasks and events from the conceptual model's objects, states and verbs, the request, answer, order and collection specs, and the states in the prototype's simulation, so each event matches a state the product already has.
Trade-offs:
- Service records alone can't see abandonment before a request exists, or how long a shopper looks at answers. Those need app analytics, and only shoppers who consent will be in them.
- Turning item text into a kind keeps personal data out of analytics, and loses the detail the demand summary needs, which stays in the service and is only shared in aggregate.
```

## Shopper tasks

| Task | Starts | Ends in success | Failure | Abandonment |
| --- | --- | --- | --- | --- |
| Ask for an item | `ask_started` | `request_created`: Snuffle confirmed and asked the shops | `message_unmatched`, no request after it | Composer left without sending |
| Answer Snuffle's questions | `snuffle_question_shown` | `snuffle_question_answered`, from a chip or in words Snuffle understood | A typed answer Snuffle can't match, or a second round on the same question | The question left open when the session ends |
| Compare answers | The first `answer_viewed` on a request | `buy_tapped`, or No thanks on every answer (`answer_dismissed`), which is a valid outcome | None by itself; see Buy | Buyable answers left untouched until the deadline |
| Buy | `buy_tapped` | `payment_succeeded`, then `order_set_aside` from the shop | `payment_failed` with no retry, `order_not_confirmed`, `order_sold` | The payment sheet closed without paying |
| Collect with the code | `order_set_aside` | `order_collected` by the collect-by date, including an extension | `order_not_collected`; a "Not ready when I came" tag on the rating | Not separate: an order not collected is the failure |
| Rate | `rating_prompt_shown` | `rating_submitted` | None | Prompt dismissed, or 30 days pass |
| Browse Nearby or a category | `nearby_viewed` | `shop_opened`, or `ask_started` from a category or a shop | None | Session ends without opening anything. Browsing can end there without failing |
| Open a shop | `shop_opened` | `shop_action_tapped` (Directions, Call, Ask) or `ask_started` from the page | None | Back with no action |
| Keep looking | `keep_looking_set` | A later `answer_received` with a yes, then `payment_succeeded` | `request_closed` with reason expired | `request_closed` by the shopper |

Snuffle's questions are what's missing, a split, collect or delivery, and notifications. Choosing collect or delivery is one of them (type fulfilment), and its answer is a property of the request.

## Shop tasks

| Task | Starts | Ends in success | Failure | Abandonment |
| --- | --- | --- | --- | --- |
| Answer a request | `shop_asked` while the shop is open | `shop_replied` with a valid answer within 10 opening minutes (H1). A valid answer is a clear yes or no, and for a yes the price | `shop_replied` that isn't valid (Snuffle can't read it) | `shop_timed_out` at 10 minutes; "No reply" at the deadline |
| Set aside | `payment_succeeded` at an asked shop | `order_set_aside` within 10 minutes | `order_sold` | `order_not_confirmed`: the authorisation lapses and nobody is charged |
| Hand over | The shopper arrives, which no event shows; `collection_code_opened` is the nearest sign | `order_collected` by scanning the code | The code not accepted and the order marked by hand (method: tap); a dispute | None |

A connected shop does neither of the first two tasks: its till answers and the sale is immediate. Its events carry source: connected, and are reported apart from asked shops.

## Time on task

Durations are reported as the median and the 90th percentile, not the mean. They are skewed: a shopper who puts the phone down for an hour in the middle of buying pulls the mean far away from what a typical shopper does, and the 90th percentile shows the slow tail that a mean hides.

A request has two clocks. Shopper effort is the time the app is in the foreground on that request's screens, from `ask_started` to `payment_succeeded`, summed across sessions; it needs app analytics. Waiting is the time from `request_created` to the first valid yes (`answer_received`), and after Buy from `payment_succeeded` to `order_set_aside`; most of it belongs to the shop, and it comes from service records. An asked shop's clock counts only while it is open. Reporting the two together would blame the app for the shop's pace, or hide a slow ask behind a fast shop.

In the prototype the shops are scripted, so prototype timings measure effort only.

## Errors

The error rate is errors per attempt, by task.

| Task | Error | Rate |
| --- | --- | --- |
| Ask | Message Snuffle can't match | `message_unmatched` per `request_created` |
| Answer Snuffle's questions | An extra round on the same question | Second `snuffle_question_shown` of the same type per request |
| Buy | Failed payment | `payment_failed` per `buy_tapped` |
| Answer a request (shop) | Reply Snuffle can't read | Invalid `shop_replied` per `shop_asked` |
| Hand over (shop) | Code not accepted | `order_collected` with method tap after a scan, per collection |

## Nuances

A weekly request ("bread every Friday") makes an order each week with no new ask. Those orders count as repeat use and stay out of the ask task and out of the 10-minute clock.

Keep looking runs for days. Its timings are reported apart from requests with a deadline the same day.

A split turns one message into two requests. The ask task counts per message; fill and conversion count per request.

A partial answer ("Has 1 of 2"), something similar and an answer from further away are successes only if the shopper buys them. Each answer records its outcome so the three can be told apart.

Repeat use is a second request within 30 days of a shopper's first collected order, and requests per active shopper per week.

Every timing is split by source (asked or connected), since a till answers at once.

## Event taxonomy

Names are object_action in the past tense. "Service" events are records the backend keeps to run the service (requests, answers, orders, payments). "App" events are analytics from the shopper app and need consent.

Every event carries `event_id`, `ts` (UTC), `user_id` (a random pseudonymous id, never an email or phone number), `session_id`, `platform`, `app_version` and `area` (the postcode district the request was made from, such as W14), plus `request_id`, `order_id` and `shop_id` where they apply.

### Browse and shops

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `app_opened` | App | The app comes to the foreground | from: icon, notification, link |
| `area_changed` | App | The shopper confirms a place or radius | place type: current, saved, searched; radius minutes |
| `nearby_viewed` | App | Nearby is shown | open shops count, radius |
| `category_opened` | App | A kind is tapped | kind |
| `shop_opened` | App | A shop page opens | shop id, from: tile, category, answer, order, map |
| `shop_action_tapped` | App | Directions, Call or Ask on a shop page | action |

### Ask

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `ask_started` | App | The composer is focused or a suggestion is tapped | from: ask bar, suggestion, shop page, category chip |
| `request_created` | Service | Snuffle confirms the request | kind, item count, quantity, deadline minutes or none, fulfilment, radius, channel: app, WhatsApp, assistant, standing: yes or no |
| `request_split` | Service | Snuffle proposes a split and the shopper answers | accepted |
| `snuffle_question_shown` | App | Snuffle asks something | type: missing, split, fulfilment, notifications |
| `snuffle_question_answered` | App | The shopper answers | type, how: chip or typed |
| `message_unmatched` | Service | Snuffle can't match a message | stage |

### Shops and answers

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `shop_asked` | Service | The ask is delivered to a shop | channel: WhatsApp or till, open now, ring |
| `shop_seen` | Service | WhatsApp reports the message read | seconds since asked |
| `shop_replied` | Service | An asked shop replies | outcome: has it, has some, similar, doesn't have, can make; valid; reply minutes in opening hours |
| `shop_timed_out` | Service | No valid reply by a mark | mark: 10 minutes or deadline |
| `answer_received` | Service | An answer reaches the request, from a reply or a till | source: asked or connected; outcome; seconds since request; order of arrival |
| `answer_viewed` | App | An answer card is on screen | position, source |
| `answer_dismissed` | App | No thanks | outcome |
| `request_widened` | Service | Ask further away | ring |
| `keep_looking_set` | Service | Keep looking is chosen | repeat: yes or no; days |
| `request_closed` | Service | The request ends without an open order | reason: shopper, not found, expired |

### Buy and collect

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `buy_tapped` | App | Buy in the details sheet | source, quantity |
| `payment_succeeded` | Service | The payment is authorised (asked shop) or taken (connected shop) | amount in pence, method: Apple Pay, Google Pay, card; fulfilment |
| `payment_failed` | Service | The payment doesn't go through | reason: declined, cancelled |
| `order_set_aside` | Service | The shop confirms, and the payment is taken | seconds since payment |
| `order_not_confirmed` | Service | 10 minutes pass with no confirmation | none |
| `order_sold` | Service | The shop says it sold the item | none |
| `reminder_sent` | Service | The day-before reminder goes out | days left |
| `collection_code_opened` | App | The code is opened full screen | none |
| `order_extended` | Service | The shopper extends once | days added |
| `order_cancelled` | Service | The shopper cancels for a refund | days after ready |
| `order_collected` | Service | The shop scans the code or marks it | method: scan or tap; place: shop or point; days after ready; walk minutes |
| `order_not_collected` | Service | The window ends | none |
| `order_delivered` | Service | The shop or courier marks it delivered | minutes since payment |

### Ratings, shops and guardrails

| Event | Kind | Fires when | Key properties |
| --- | --- | --- | --- |
| `rating_prompt_shown` | App | The Rate card or "How was [shop]?" is shown | none |
| `rating_submitted` | Service | A rating is sent or changed | up or down; tags; has note: yes or no |
| `rating_disputed` | Service | A shop disputes a case | signal |
| `refund_issued` | Service | Money goes back | reason: cancelled, not collected, dispute |
| `complaint_opened` | Service | A shopper or a shop contacts support | topic |
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

In the hand-run concierge, the log sheet uses the same event names, codes shoppers as S1 to S6 and shops by id, and holds no phone numbers. Shoppers and shops agree to take part before the first request.
