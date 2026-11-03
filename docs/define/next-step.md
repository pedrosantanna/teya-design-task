# Next step

Define ends with a decision about how to learn next. I won't run another round of research with shopkeepers before building. I'll build a proof of concept of the concierge agent, take it to a few shops around one shopper's location, and use it with them and with shoppers. The shopper app is where the design craft goes; the shop side is designed as states, without an interface.

```summary
Takeaways:
- A proof of concept with real shops tests most of the riskiest hypotheses at once: whether shops answer (H1), hold items (H6) and value the demand signal (H9), and whether shoppers ask, wait and come back (H2 to H4, H7, H8, H10).
- Inviting shops to the proof of concept is also discovery: how they answer, when, on which channel and with how much effort.
- The shops can bring the first shoppers, which I treat as an assumption about acquisition.
Call:
- I decided to build a proof of concept instead of interviewing shopkeepers first (decision 020). An agent prototype takes days, and what shops do with a real request says more than what they'd say in an interview.
- I put the design craft into the shopper app, native and iOS first (decision 021). The shop side stays as a set of states for WhatsApp or the shop's POS.
AI:
- I made the decision. An agent wrote this page from my notes and mapped each hypothesis to the part of the proof of concept that tests it.
Trade-offs:
- Building first spends effort before I know whether shops will answer at all. The hand-run concierge stays as the fallback if the agent isn't ready.
- A few shops on one street show whether the flow works there, not whether it scales.
```

## Proof of concept

| Part | What it is | Hypotheses it tests |
| --- | --- | --- |
| Concierge agent to shops | The agent sends real requests to about ten shops within 15 minutes' walk of Blythe Road on WhatsApp, or through the POS where the shop's system allows it, and handles their replies | H1, H6, H11 |
| Shopper app prototype | The shopper side of the blueprint, steps 1 to 5, with the agent's answers coming from the real shops when they reply | H2, H3, H4, H5, H7, H8, H10 |
| Demand summary | A weekly summary of what nearby shoppers asked for, sent to the shops in the proof of concept | H9 |
| Payments and paid offers | Every hold is paid in the app. After four weeks, shops are offered the provider's POS and paid promotion | H12 to H16 |

The pass marks stay as written in [hypotheses](hypotheses.md).

## Test area

The proof of concept runs around one shopper's location instead of one street: about ten small independent shops within a 15-minute walk of Blythe Road, spread over its own shops, Shepherd's Bush Road, Shepherd's Bush Green, Goldhawk Road, Hammersmith Broadway and King Street, and Kensington High Street at the Olympia end (distances in the [concept](index.md)). The shops are picked from categories that came up in the netnography: hardware, florist, bakery, butcher, chemist, stationery. Ten shops in that ring are close enough to visit in a day, which the invitations need.

## Shops as discovery

Inviting a shop is the first conversation with a shopkeeper in this project. Each invitation records how the shop answers today, who answers, on which channel, how fast, and what would make them say no. These are open questions 1 to 6 from the [Discover conclusion](../discover/conclusion.md), now answered by watching instead of asking.

## Shops as an acquisition channel

The shops in the proof of concept can point their own customers to it: a sign at the counter, a line in their WhatsApp replies. I assume that is enough to reach the first shoppers around Blythe Road. Other acquisition channels are left out of this take-home.

## Scope for Develop

- **Shopper app.** Designed and prototyped as a native iOS app, following Apple's Human Interface Guidelines first and Material Design second.
- **Shop side.** No interface. The states a request goes through on the shop's side, and the message the shop sees in each, so they can be shown to shopkeepers and built on WhatsApp or a POS.
- **Agents.** Their behaviour is described in the blueprint; building them is part of the proof of concept, outside this take-home's prototype.
