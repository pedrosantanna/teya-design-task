# Hypotheses

The concept rests on nineteen hypotheses. Most come from an assumption or open question in the [Discover conclusion](../discover/conclusion.md); four come from my reasons for making the concierge an agent, five from how it makes money ([revenue](revenue.md)) and three from ratings on the shop page (decision 047). Each has a test. Sixteen have a pass mark set before testing; H10, H11 and H16 are exploratory and record a split or a count that sets an order or a size. They are ordered by risk: how badly the concept fails if the hypothesis is wrong, and how little evidence there is today.

```summary
Takeaways:
- The riskiest hypothesis is on the merchant side: shops answering a request within minutes (H1). No evidence exists, and without it the concierge doesn't work.
- My main hypothesis about the product is that shoppers would rather ask one concierge than browse and phone shops themselves (H3), and that they accept a wait while it works (H4).
- Two cheap tests cover most of the risk: a concierge run by hand over WhatsApp with shops around Blythe Road, and a clickable prototype with six shoppers.
Call:
- I added the four hypotheses about the agent (asking first, the wait, requests left ahead, channels) and set the order: the merchant side is tested first, by hand, before anything that depends on it is built.
- I moved the hand test to WhatsApp, with me as the concierge. It tests the shops, the wait and one of the channels at once.
- I set the pass marks before testing, so a result can't be read to fit. A prototype pass records what shoppers say they would do; where it's cheap, the hand-run concierge checks the same thing with real requests (H2, H7).
- Later I added three hypotheses about ratings: that Snuffle's signals let an asked shop compete with a connected one (H17), that "% would go back" reads as easily as stars (H18), and that shops accept a public stock-accuracy figure (H19).
AI:
- An agent drafted the hypotheses from the assumptions and the concept, and proposed tests and pass marks. I added the four about the agent and set the order.
- An agent drafted H17 to H19 and their tests from decision 047; I chose the 5-second test for H18 and asking the same 10 shops for H19.
Trade-offs:
- Small tests give direction, not proof. A pass with six shoppers justifies the next step, not a launch.
- A concierge run by a person hides how well the agents would do the same job. That is a later test, once the shops pass.
```

## Hypotheses by risk

| # | We believe that… | From | Test | Pass if |
| --- | --- | --- | --- | --- |
| H1 | Shopkeepers will answer a stock request on WhatsApp within 10 minutes while open, with an answer the shopper can act on | A12; open questions 2, 5 | Concierge by hand on WhatsApp only: about eight searches, each sent to the two or three likely shops, for 20 requests in all (2 per shop, 10 shops within 15 minutes' walk of Blythe Road) over two days. The clock starts when the message is delivered during opening hours. A valid answer is a clear yes or no on the item, and for a yes, the price and whether they'd hold it | 60% of the 20 requests get a valid answer within 10 minutes, and at least half of the searches are resolved (at least one usable yes before the shopper's deadline). The two rates are reported separately |
| H2 | A shopper with an urgent, specific need will buy in the app and make the trip once a shop confirms it has set the item aside | A5 | Prototype with 6 shoppers, each given a deadline scenario. Follow-up in the hand-run concierge: for every purchase made on a real need, record whether the shopper goes and collects | Stated: 4 of 6 choose to go to the shop over ordering online. Behaviour: at least 2 of every 3 purchases in the hand test are collected, reported with the count |
| H3 | Shoppers with a specific need would rather ask one concierge than browse shops and contact them one by one | Concept; one post | Prototype offers asking and browsing from the first screen; note the first choice per scenario and ask which felt simpler | Asking chosen first in 4 of 6 specific-need scenarios, and called simpler by 4 of 6 |
| H4 | Shoppers accept a wait of several minutes when the concierge says what it's doing and keeps looking | Concept | Hand-run concierge over WhatsApp with 6 shoppers and real requests; note who stays and who buys elsewhere while waiting | 4 of 6 wait for the answer |
| H5 | Shoppers trust a recent confirmation from the shop more than reported stock from a till or listing | A10 | Same prototype, two versions of the answer side by side | 4 of 6 prefer the shop's confirmation, and say why |
| H6 | Shops will keep a bought item set aside for about a week | Open question 5; UK collection norms (decisions 030 and 037) | Ask the 10 shops in H1 whether and how long they would keep a bought item set aside | 6 of 10 would keep a bought item for 7 days (bakery, butcher and florist judged on same or next day) |
| H6, after work | For shoppers who work shop hours, at least one way to collect after work exists on the street | Open question 5; A7 | Ask the same 10 shops whether they would offer a later collection slot on a late-closing day, or hand a paid item to a collection point. Walk the 15-minute ring around Blythe Road and list what stays open after 6:30pm (late-opening shops, lockers) | 3 of 10 shops would do one of the two, and at least one collection point open after 6:30pm exists in the 15-minute ring |
| H7 | Working shoppers who gave up because of hours would buy ahead, then collect within the shop's collection window | A6, A7 | Prototype scenario for working shoppers, with a follow-up question on what they'd do today. Follow-up in the hand-run concierge: offer each working shopper one real purchase and record whether they make it and collect | Stated: 4 of 6 say they would use it instead of Amazon or the supermarket for that purchase. Behaviour: at least 2 working shoppers make and collect a real purchase |
| H8 | Shoppers will leave requests ahead of time for the concierge to act on, as one-off alerts ("tell me when it's back") or recurring orders ("bread every Friday") | Concept | Prototype offers a one-off alert after a scenario where nothing was found, and a recurring order after a routine scenario | One-off: 3 of 6 set an alert. Recurring: 2 of 6 set an order. Reported separately |
| H9 | Shopkeepers see value in knowing what nearby shoppers ask for, including what they didn't have | Open question 1 | Show 5 shopkeepers a mock weekly demand summary for their street | 3 of 5 say it would change what they stock or would make them answer requests |
| H10 | Some shoppers would rather use the concierge in WhatsApp or their own assistant than install an app | Concept | Ask each shopper in the H3 and H4 tests where they'd want it | Exploratory: recorded as a split, no pass mark. It sets the order of channels |
| H11 | A minority of shops on a street have till data with item detail | F8; open question 3 | Count, on the 10 shops in H1, which tills hold product codes | Exploratory: recorded as a number, no pass mark. It sizes the instant-answer shortcut |
| H12 | Shoppers who get a yes buy in the app and collect later, instead of going to the shop without buying | Revenue; decisions 032 and 037 | In the proof of concept, count how many yeses end in a purchase and how many shoppers say they will go anyway | 70% of yeses end in a purchase |
| H13 | Shops not yet on the provider's POS would join it to receive app payments and requests | Revenue | After four weeks of the proof of concept, offer the shops that use another terminal the provider's payment account or POS | 2 of the first 5 such shops agree to switch or to a trial |
| H14 | Shops already on the provider's POS see the app's shoppers as a reason to keep it | Revenue; decision 023 | Compare sales from the app per shop over four weeks, then ask the shops on the network whether it changes how they value their POS | 3 of 5 say it would make them keep or recommend the POS |
| H15 | Shops would pay to be promoted on the home screen or to a neighbourhood beyond their street | Revenue | After four weeks of demand summaries, offer a promoted slot at a stated weekly price | 2 of 10 shops pay for, or agree to, a paid trial |
| H16 | Shoppers buy from a shop farther away when it's the only one with the item and they can pay ahead | Revenue | Proof-of-concept data: share of collected orders at shops more than 15 minutes' walk away | Exploratory: recorded as a share; it sizes the case for paid reach |
| H17 | With a reliability row, shoppers buy at an asked shop as often as at a connected shop | Decision 047; H5 | Prototype with 6 shoppers: two answer cards at the same price and walk time, one from an asked shop and one from a connected shop. Each shopper sees the pair twice, with and without the reliability row on the asked shop's card, in a counterbalanced order | With the row, the asked shop is chosen in at least 3 of 6 pairs, and more often than without it |
| H18 | Shoppers read "% would go back" as easily as stars | Decision 047 | 5-second test with 6 shoppers: a shop page shown for five seconds, then "How do buyers rate this shop, and how many rated it?". Each sees one shop with "92% would go back · 38 buyers" and another with a star average and count, in a counterbalanced order | 5 of 6 answer both parts correctly with the percentage, and no fewer than with stars |
| H19 | Shops accept a public stock-accuracy figure | Decision 047 | Ask the 10 shops in H1, showing each its own figure from the hand test ("Had it 9 of 10 times when they said yes") and the right to dispute a case | 6 of 10 accept the figure shown in public |

A prototype test records stated choice: what a shopper says or clicks in a scenario. It can't show whether they would go, pay or collect. For H2 and H7 the hand-run concierge adds the behavioural check, with real needs and real purchases.

## What each test needs

These tests run inside the [proof of concept](next-step.md): the concierge agent reaches the shops, and the shopper app prototype is what shoppers use. The hand-run version below is the fallback if the agent isn't ready.

- **Concierge by hand over WhatsApp (H1, H2 and H7 follow-ups, H4, H6, H10, H11, H19).** A phone with WhatsApp, a list of ten shops within 15 minutes' walk of Blythe Road that answer on WhatsApp, in categories that came up in the netnography (hardware, florist, bakery, butcher, chemist), and six shoppers with real needs, at least three of them working shop hours. I play the concierge. No build. Two days, plus a walk around the 15-minute ring after 6:30pm.
- **Prototype test (H2, H3, H5, H7, H8, H10, H17, H18).** The clickable prototype from Deliver, with scenarios taken from the persona posts (eclipse glasses the day before, a fan in a heatwave, a weekly shop after work). Six shoppers, 30 minutes each.
- **Shopkeeper conversations (H9).** Five short visits with a printed mock-up.

## If H1 fails

The concierge as designed can't work. The fallbacks are narrower: only shops whose tills share stock (instant answers, low coverage), or a slower request with a promise of an answer by a set time, which fits Jess better than Sam.

## If H3 or H4 fails

The agent stops being the main way in. Browsing shops and categories becomes the main screen, and the concierge stays as a tool for the requests browsing can't answer.

## If H19 fails

Stock accuracy stays private: each shop sees its own figure, and the shop page shows only the answer rate and reply time.
