# Conceptual model

The app's objects, what the shopper can do with each, the states each goes through and the words the interface uses for them. Screens are checked against it: a new screen shows one of these objects in its set form, with its set verbs and status labels.

```summary
Takeaways:
- Four objects: Request, Shop, Answer and Order. Snuffle is the voice that talks to the shopper, not an object. An item is never an object: small shops have no catalogue, so an item is text and a quantity inside a request, an answer or an order.
- Each object has one card form and one detail form: a request is a row that opens its chat, an answer a card in the chat that opens a details sheet, an order a card that opens the receipt, a shop a row that opens the shop page.
- One verb per action across the app. Buy is the only way to pay; shops set aside; the shopper collects.
- One table of status labels, used the same way in rows, chat cards, notifications and the Live Activity. Money has three outcomes the shopper sees: paid, not charged, refunded.
Call:
- I asked for a conceptual model before any more screens: the objects, what the shopper does with each, their states and words, simple and grounded in references and in the research.
- I decided the four open points (decision 039): items stay out of the model, a request left open is "Keep looking", a shop's reply is an "answer", and shops show as photo tiles on the home screen. It follows decisions 025, 031 and 037.
- I asked whether one "answer" fits both a connected shop's stock and an asked shop's reply, and closed the gaps the screen review found.
AI:
- An agent searched the netnography, empathy map, personas and benchmarks for the words shoppers use and the objects they think in, checked the references below and proposed the objects, verbs, states and terms. It also listed where v7 breaks the model. I asked for the model to be simple and grounded in references before more screens are drawn.
Trade-offs:
- Keeping items out of the model fits shops without catalogues, and gives up a page per item, so "who else has it" lives in the request, not on the item.
- Request is our word: shoppers write questions, not requests. The prototype test will show whether the Requests list reads.
```

## Sources of the model

I asked for a model that starts from how shoppers already think and from established practice, before drawing more screens.

| Reference | What it asks the designer to do |
| --- | --- |
| Johnson and Henderson, "Conceptual models: begin by designing what to design", *interactions*, 2002 | Design what the system is to its users (objects, attributes, actions, terms) before the screens, and keep it as simple as the tasks allow |
| Johnson and Henderson, *Conceptual Models: Core to Good Design*, 2011 | Turn the model into an analysis of objects and operations plus a lexicon, one term per concept, and check every screen and string against it |
| Norman, *The Design of Everyday Things*, revised edition 2013 | The designer reaches the user only through the system image (screens, labels, messages), so it has to show the design model consistently |
| Nielsen Norman Group, mental models | Find what users already believe and either fit it or teach the gap on purpose; people bring what they know from other products |
| Prater, Object-Oriented UX and the ORCA process | Take the nouns from research, map relationships both ways, list who can do what to each object, give each object a consistent card and detail view |
| Jackson, *The Essence of Software*, 2021 | Give each concept one purpose; many usability problems are muddled concepts, not layout |
| Apple Human Interface Guidelines, design principles and writing | Once an element's behaviour or wording is set, use it everywhere; build on patterns people know from the system |

## What the research shows

The shoppers in the netnography think in items and places: "any places that have…", "in stock", "sold out", a named shop on a named street. Asking the shop is already their habit ("call before travelling"), so Snuffle asking shops fits it. "Collect" and "click and collect" are their verbs for getting it, and they expect a refund when the item isn't there. "Order" covers buying at a distance and the thing bought.

There is no evidence for "errand", "basket", "hold" or "reserve" in shoppers' words, and none for paying a small independent ahead. "Request" is ours too. Sources: [findings](../../discover/netnography/findings.md), [empathy map](../../discover/netnography/empathy-map.md), [benchmarks](../../discover/benchmarks.md), [conclusion](../../discover/conclusion.md).

| How shoppers see it | How the app models it | Risk |
| --- | --- | --- |
| A question about an item | A request, a chat that can hold several items | The Requests name and splitting (decision 025) are untested |
| "Order" is both buying and the thing bought | Buy is the verb, order the noun | Small, if "order" is never used as a verb |
| Click and collect from chains, paid, about a week | Buy at an independent; charged when the shop confirms | "Authorised" and "lapsed" are not their words, so the chat never uses them |
| The shop answers the phone | Snuffle answers for the shops | The shopper has to see whose words they are reading (decision 031) |

## Objects

| Object | In the shopper's words | Main attributes | Relationships | Card → detail |
| --- | --- | --- | --- | --- |
| Request | What I asked for | Items and quantity, deadline, area, collect or delivery, repeat | Has many answers and any number of orders | Row in Requests → the chat |
| Shop | The shop | Name, street, walk time, open until, made to order with notice ("2 days' notice"), answers from its till or by reply, collection window, delivers and fee | Gives many answers, has many orders | Photo tile on Nearby, the home screen; row in any other list → shop page |
| Answer | "Paper & Co has them" | Shop, what it has (all, some, something similar), price, source of the answer, collect-by date, delivery | Belongs to one request and one shop; may become one order | Compact row on the asking list, full card in the chat once the shop replies → details sheet, where the shopper buys |
| Order | My order | Items, shop, total, collect or delivery, collect-by date, collected at (the shop or a collection point), collection code, payment | Belongs to one request, one shop and one answer | Card in the chat with its status label → receipt, which holds the collection code |

## One answer, two sources

A connected shop's POS shares its stock, so its answer arrives at once and the sale is immediate; an asked shop answers a message in its own time and confirms after the shopper buys (decision 031). Both are the same object because they do the same job for the shopper: say whether a shop has the item, at what price and until when. What differs is the source, which every answer card states: "Has it · replied 2 min ago" from an asked shop, "In stock now · from the shop's till" from a connected shop, shortened to "In stock now · till" in compact rows, and the steps after Buy: a till answer skips "Waiting for [shop]". The word "answer" stays in the docs and in "replied"; the interface shows the status, not the object's name.

Every answer card is titled with the shop. When the shop offers something similar, the item it offers goes in the status line after "Has something similar", and the title stays the shop's name.

## Actions

| Object | The shopper | Others |
| --- | --- | --- |
| Request | Ask, Split into 2 or Keep as one, Keep looking, Close | Snuffle asks the shops |
| Shop | Ask, Directions, Call | none |
| Answer | Buy (it opens the details sheet, as a tap on the card does), Show me (for something similar), No thanks | The shop answers |
| Order | Extend, Cancel for a refund, Directions, Rate | The shop sets it aside, marks it collected, sends it |

## States

| Object | Labels, in order |
| --- | --- |
| Request | "Asking 6 shops" → "2 shops have it" → "Needs you · [what]"; waiting by choice: "Looking · until Fri 6 Nov" or "Every Friday"; nothing found: "Not found"; closed by the shopper: "Closed". Once there is an order, the row shows the order's label. One deadline suffix is allowed ("2 shops have them · by 4pm"). Filters group the states: Needs you, Looking (Snuffle is still searching, once or on repeat), Waiting (an order waits for the shop or for collection), Done |
| Answer | "Asked" → "Seen" → "Has it", "Has 1 of 2", "Has something similar", "Doesn't have it" or "No reply"; from a till: "In stock now" or "In stock now · 1 of 2", followed by "· from the shop's till" ("· till" in compact rows); made to order: "Can make it · [notice]" ("Can make it · 2 days' notice"); on a shop page, past answers: "Had it · [when]", "Didn't have it · [when]" |
| Order, collect | "Waiting for [shop] · not charged yet" → "Ready · collect by Mon 9 Nov" → "Extended · collect by Mon 16 Nov" → "Collected"; endings: "Not confirmed · not charged", "Sold · not charged", "Cancelled · refunded", "Not collected · refunded". After a partial buy the card adds a line, "Keep looking for [n] more" |
| Order, delivery | "Waiting for [shop] · not charged yet" → "Paid" → "On its way" → "Delivered". A failed payment creates no order; the request keeps its label |
| Shop | "Open till 7pm", "Closes soon", "Closed · opens 9am" |

## Words

| Thing | Interface | Docs | Avoid |
| --- | --- | --- | --- |
| The agent | Snuffle | Snuffle | concierge, assistant, AI |
| What the shopper asked | request | request | errand, search, saved request |
| A shop's reply | answer, "replied" | answer | offer, result, quote |
| The seller | shop | shop; connected shop, asked shop | store, merchant, retailer |
| Paying | Buy, "Buy · £29.98" | buy | hold, reserve, order as a verb |
| What was bought | order | order | purchase, booking, hold |
| The shop's step | sets aside | set aside | keeps, holds, puts aside |
| The collection window | "Collect by Mon 9 Nov", with the length once before Buy ("7 days") | collection window | pickup, hold for |
| Money | paid, not charged, refunded | authorised, taken, lapsed, released | payment terms in the chat |
| A request left open | Keep looking | standing request | keep it open, save request |
| Proof at the counter | collection code | code | other names |
| The home screen | Nearby | Nearby | Home, street |

Labels agree with the item: "has it" for one thing, "has them" for several. Shop messages on WhatsApp and the POS may say authorised and charged, and call a sale through Snuffle "Bought"; they never say keep or hold.

## Rules for screens

| Rule | In practice |
| --- | --- |
| One card, one detail per object | No object gets a second card design |
| One verb, one action | Buy, Ask, Collect, Extend, Cancel and Keep looking mean the same thing in every screen |
| One status table | Rows, chat cards, the lock screen, notifications and the Live Activity use the labels above |
| Dates, not durations | The shopper sees "Collect by Mon 9 Nov"; the length appears once, before Buy |
| Snuffle speaks, shops answer | Shops never get their own chat; their replies are answer cards labelled with where they came from |
| Proposals are bubbles | A Snuffle proposal (split, clarify) is a bubble with suggestion chips, never a card |
| Rows while asking | On the asking list every answer is a compact row, since the list shows progress; full answer cards appear in the chat |
| Items have no page | An item appears inside a request, an answer, an order, or on a shop page |
| Orders live in their request | Requests is the only list; there is no separate list of orders |
| Detail is pushed, tasks are sheets | An object's detail form (shop page, request chat, receipt) is pushed and exits with Back; a task (the details sheet where the shopper buys, paying, extending, the account) is a sheet and exits with Close; the enlarged collection code is a modal with Close |

## Decided points

- Items stay out of the model.
- "Keep looking" names a request left open. It replaces "Tell me when it's back", "Keep it open" and "Save request", and the list of kept requests becomes a Looking filter in Requests. Buying again after an order ends is Ask, since the shop has to answer again.
- "Answer" is the interface word for a shop's reply.
- Shops appear as photo tiles on Nearby and as rows in other lists.

## References

- Johnson, J. and Henderson, A. (2002). Conceptual models: begin by designing what to design. *interactions* 9(1), 25–32. https://courses.dubberly.com/frameworks_2024_fall/Conceptual_ModelsInteractionsPaper.pdf
- Johnson, J. and Henderson, A. (2011). *Conceptual Models: Core to Good Design*. Morgan & Claypool. https://doi.org/10.2200/S00391ED1V01Y201111HCI012
- Norman, D. (2013). *The Design of Everyday Things*, revised edition. Summary of the three models: https://essenceofsoftware.com/posts/conceptual-models/
- Nielsen Norman Group. Mental models and user experience design. https://www.nngroup.com/articles/mental-models/
- Prater, S. Object-Oriented UX. https://ooux.com/resources/object-oriented-ux
- Jackson, D. (2021). *The Essence of Software*. Princeton University Press. https://press.princeton.edu/ideas/daniel-jackson-on-the-essence-of-software
- Apple. Human Interface Guidelines, design principles: https://developer.apple.com/design/human-interface-guidelines/design-principles; writing: https://developer.apple.com/design/human-interface-guidelines/writing
