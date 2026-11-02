# Shop request states

One request on the shop's side, from the moment the concierge asks to the moment the item is collected or released. There is no shop interface in this take-home: these states, and the WhatsApp message the shop sees in each, are what I take to shopkeepers in the proof of concept.

```summary
Takeaways:
- The shop does four things in the whole flow: reply yes or no, put the item aside, hand it over, and say it was collected. Each is one reply on WhatsApp or one tap on a POS.
- The shopper is charged only after the shop confirms the item is set aside, so an item already sold costs nobody money.
- A "no" or a late reply isn't wasted: both feed the weekly demand summary (H9).
Call:
- WhatsApp first, because shops already use it and it needs nothing installed. The first message is a pre-approved template because of WhatsApp's 24-hour rule.
- The POS variant shows the same states on the card terminal, with buttons instead of typed replies.
AI:
- An agent drew the states from the service blueprint and wrote the sample messages. I set the order of hold and payment and which replies the shop can send.
Trade-offs:
- Numbered replies (1, 2, 3) are quick to parse and rigid for the shop. Free text would be friendlier and needs the agent to read it reliably.
```
