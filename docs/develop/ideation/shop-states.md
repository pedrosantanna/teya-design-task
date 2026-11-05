# Shop request states

One request on the shop's side, from the moment the concierge asks to the moment the item is collected or released. There is no shop interface in this take-home: these states, and the WhatsApp message the shop sees in each, are what I take to shopkeepers in the proof of concept.

```summary
Takeaways:
- Two kinds of shop answer. A connected shop's POS shares stock, so the answer is instant and the sale is immediate. An asked shop gets a WhatsApp message from Snuffle and replies in its own words.
- The shopper buys, and the amount is authorised. An asked shop confirms the item is set aside, and that takes the payment. If it doesn't confirm in 10 minutes, the authorisation lapses and nobody is charged (decision 037).
- Each shop sets how long it keeps a bought item: 7 days by default, 14 or 30, the same or the next day for perishables. If nobody collects, the order is cancelled, the shopper is refunded in full and the item goes back on sale.
- A "no" or a late reply isn't wasted: both feed the weekly demand summary (H9).
Call:
- I said a paid item shouldn't be held for only a few hours and asked for the UK norm. Collection windows follow how UK chains keep paid click-and-collect orders, about a week, with the shop free to go longer (decisions 030 and 037).
- I separated the connected shop from the asked shop (decision 031), dropped the unpaid reserve (decision 032), and set the order of authorisation and confirmation and which replies the shop can send.
- I chose WhatsApp first for asked shops, because shops already use it and it needs nothing installed. The first message is a pre-approved template because of WhatsApp's 24-hour rule.
- I left delivery by the shop mapped, not designed: Snuffle only relays "charged", "on its way" and "delivered". The shop marks the item collected by scanning the code or with a tap.
AI:
- An agent drew the states from the service blueprint and wrote the sample messages. In v2 it added the connected shop and the dates after desk research on UK collection policies; in v3 it removed the unpaid reserve after I dropped it; in v4 it moved the states to Buy and added the gaps a flow review found. I set the order of authorisation and confirmation, the collection windows and which replies the shop can send.
Trade-offs:
- A long window ties up stock in a shop that may have one unit; letting each shop set it makes the promise vary between shops.
- Numbered replies (1, 2, 3) are quick to parse and rigid for the shop. Free text would be friendlier and needs the agent to read it reliably.
```

## Versions

| Version | What changed | Why |
| --- | --- | --- |
| v5 (current) | Ratings and signals (decision 047): rated by the buyer, with one public reply from the shop; a signal disputed by the shop, which Snuffle reviews and then excludes or keeps. A note lists the signals the shop sees: answer rate, reply time, and stock accuracy after 10 "has it" answers | Ratings and the shop page signals in app flow v9; I decided shops see their signals and can dispute them |
| v4 | The shopper buys instead of holding: bought (authorised), set aside and charged, waiting for collection, collected by the shop. New branches: not confirmed in 10 minutes, shopper cancels, not collected by the date, has fewer than asked, delivery charged and dispatched. A note on the shop's collection-window setting. Messages come from Snuffle | Decision 037, and a flow review that found shop states with no shopper screen and the reverse |
| v3 | The unpaid reserve is gone: after a yes the shop holds a paid item or delivers it | The unpaid reserve put the payment outside the app and the no-show risk on the shop (decision 032) |
| v2 | Connected and asked shops, the three ways to get the item, holds in days with a collection day, the shop's own delivery mapped | A hold "until 4pm" was shorter than UK shops keep paid orders (decisions 030 and 031) |
| v1 | First states from the blueprint, WhatsApp messages | First pass |
