# Shop request states

One request on the shop's side, from the moment the concierge asks to the moment the item is collected or released. There is no shop interface in this take-home: these states, and the WhatsApp message the shop sees in each, are what I take to shopkeepers in the proof of concept.

```summary
Takeaways:
- Two kinds of shop answer. A connected shop's POS shares stock, so the answer is instant and the hold is a tap on the terminal. An asked shop gets a WhatsApp message and replies in its own words.
- After a yes the shopper picks one of two ways: pay and the shop keeps the item for 7 days, or pay and the shop delivers with its own courier. There is no unpaid reserve (decision 032).
- The shopper is charged only after the shop confirms the item is set aside, so an item already sold costs nobody money. An unclaimed paid hold is refunded automatically.
- A "no" or a late reply isn't wasted: both feed the weekly demand summary (H9).
Call:
- Hold lengths follow how UK shops keep collection orders: a week for paid orders, less for perishables (decision 030).
- Delivery by the shop is mapped, not designed: the concierge only relays "sent", the tracking link and "delivered".
- WhatsApp first for asked shops, because shops already use it and it needs nothing installed. The first message is a pre-approved template because of WhatsApp's 24-hour rule.
AI:
- An agent drew the states from the service blueprint and wrote the sample messages. In v2 it added the connected shop, the three ways and the dates after desk research on UK collection policies. In v3 the agent removed the unpaid reserve after I dropped it. I set the order of hold and payment, the ways to get the item and which replies the shop can send.
Trade-offs:
- A week ties up stock in a shop that may have one unit; the shop can shorten it, which makes the promise vary between shops.
- Numbered replies (1, 2, 3) are quick to parse and rigid for the shop. Free text would be friendlier and needs the agent to read it reliably.
```

## Versions

| Version | What changed | Why |
| --- | --- | --- |
| v3 (current) | The unpaid reserve is gone: after a yes the shop holds a paid item or delivers it | The unpaid reserve put the payment outside the app and the no-show risk on the shop (decision 032) |
| v2 | Connected and asked shops, the three ways to get the item, holds in days with a collection day, the shop's own delivery mapped | A hold "until 4pm" was shorter than UK shops keep paid orders (decisions 030 and 031) |
| v1 | First states from the blueprint, WhatsApp messages | First pass |
