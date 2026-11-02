# Hypotheses

The concept rests on eight hypotheses. Each comes from an assumption or open question in the [Discover conclusion](../discover/conclusion.md), and each has a test and a result that would count as a pass. They are ordered by risk: how badly the concept fails if the hypothesis is wrong, and how little evidence there is today.

```summary
Takeaways:
- The riskiest hypothesis is on the merchant side: shops answering a request within minutes (H1). No evidence exists, and without it the concierge doesn't work.
- The main shopper hypothesis is that a confirmed hold is enough to make the trip (H2).
- Two cheap tests cover most of the risk: a concierge run by hand on King Street, and a clickable prototype with five or six shoppers.
Call:
- Test the merchant side first, by hand, before building anything that depends on it.
- Pass marks are set before testing, so a result can't be read to fit.
AI:
- An agent drafted the hypotheses from the assumptions and the concept, and proposed tests and pass marks. I set the order.
Trade-offs:
- Small tests give direction, not proof. A pass with six shoppers justifies the next step, not a launch.
```

## Hypotheses by risk

| # | We believe that… | From | Test | Pass if |
| --- | --- | --- | --- | --- |
| H1 | Shopkeepers will answer a stock request within 10 minutes while open | A12; open questions 2, 5 | Concierge by hand: send 20 real requests to 10 King Street shops by phone and WhatsApp over two days, timed | 60% answered within 10 minutes |
| H2 | A shopper with an urgent, specific need will make the trip once a shop confirms and holds the item | A5 | Prototype with 5 or 6 shoppers, each given a deadline scenario | 4 of 6 choose to go to the shop over ordering online |
| H3 | Shoppers trust a confirmation from the shop more than a stock figure from a listing | A10 | Same prototype, two versions of the answer side by side | 4 of 6 prefer the shop's confirmation, and say why |
| H4 | Shoppers with a specific need start by asking the agent; browsing is used without one | Concept; one post | Prototype offers both from the first screen; note the first choice per scenario | Asking chosen first in 4 of 6 specific-need scenarios |
| H5 | Shops will hold an item for a few hours, and until closing for a shopper who has paid | Open question 5 | Ask the 10 shops in H1 whether and how long they would hold, paid and unpaid | 6 of 10 would hold a paid item until closing |
| H6 | Reserving and paying ahead, then collecting in an agreed window, brings back shoppers who gave up because of hours | A6, A7 | Prototype scenario for working shoppers; follow-up question on what they'd do today | 3 of 5 say they would use it instead of Amazon or the supermarket for that purchase |
| H7 | Shopkeepers see value in knowing what nearby shoppers ask for, including what they didn't have | Open question 1 | Show 5 shopkeepers a mock weekly demand summary for their street | 3 of 5 say it would change what they stock or would make them answer requests |
| H8 | A minority of shops on a street have till data with item detail | F8; open question 3 | Count, on the 10 King Street shops in H1, which tills hold product codes | Recorded as a number; no pass mark, it sizes the instant-answer shortcut |

## What each test needs

- **Concierge by hand (H1, H5, H8).** A phone, WhatsApp and a list of ten shops in categories that came up in the netnography (hardware, florist, bakery, butcher, chemist). No build. Two days.
- **Prototype test (H2, H3, H4, H6).** The clickable prototype from Deliver, with scenarios taken from the persona posts (eclipse glasses the day before, a fan in a heatwave, a weekly shop after work). Five or six shoppers, 30 minutes each.
- **Shopkeeper conversations (H7).** Five short visits with a printed mock-up.

## If H1 fails

The concierge as designed can't work. The fallbacks are narrower: only shops whose tills share stock (instant answers, low coverage), or a slower request with a promise of an answer by a set time, which fits Jess better than Sam.
