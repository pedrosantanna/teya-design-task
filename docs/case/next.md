# What I'll test next

The first test is whether shops answer, by hand, before I build anything that depends on it. I set every pass mark before testing, so a result can't be read to fit.

## Hypothesis H1

Without H1 the concierge doesn't work, and nothing in the evidence supports it yet.

<div class="dg dg-hyp"><div class="dg-hyp-head"><b>H1 · Shops answer</b><span class="dg-badge">No evidence</span></div><dl><dt>I believe that</dt><dd>Shopkeepers answer a stock request on WhatsApp within 10 minutes while open, with an answer the shopper can act on.</dd><dt>Test</dt><dd>By hand on WhatsApp: 20 requests to 10 shops within a 15-minute walk of Blythe Road, over two days.</dd><dt>Pass if</dt><dd>60% of the 20 requests get a valid answer within 10 minutes, and at least half the searches end with a usable yes before the deadline.</dd></dl></div>

## H3 and H4

| # | I believe that… | Pass if |
| --- | --- | --- |
| H3 | Shoppers would rather ask one concierge than browse and contact shops one by one | Asking chosen first in 4 of 6 scenarios, and called simpler by 4 of 6 |
| H4 | Shoppers accept a wait of several minutes while the concierge works | 4 of 6 wait for the answer |

## First experiment

About ten independent shops within a 15-minute walk of Blythe Road, and about 20 requests over two days. An agent sends the requests on WhatsApp, six shoppers use the prototype, and the shops get a weekly demand summary. If the agent isn't ready, I play the concierge on WhatsApp myself. Inviting the shops is also the first conversation with a shopkeeper in this project.

Evidence: [hypotheses](../define/hypotheses.md), [next step](../define/next-step.md).

## Signals to stop or go

- H1, H3 and H4 pass: the concierge can be the main way in.
- H1 fails: the concept narrows to shops whose tills share stock, or to a slower request with an answer by a set time.
- H3 or H4 fails: browsing becomes the main screen, and Snuffle handles what browsing can't answer.

## Measurement

Task success is the base: whether a shopper gets from the ask to an order and a collected item, and where they drop out. The north star is completed requests per week, the requests that end with an order collected or delivered; a full week evens out weekday errands and weekend shopping. While the product is young I'd record events broadly and cut them later, since events cost money at scale. The plan defines 58 events and builds none in the prototype, and the [App flow](../develop/ideation/app-flow.md) canvas has a measurement layer (press M) that places every task, event and metric on its screen.

Evidence: [measurement plan](../verify/measurement.md), [product metrics](../verify/metrics.md).

## What I'd do differently

I'd put a few real requests in front of shops early. The proof of concept over interviews still holds, but I finished with H1 at no evidence at all.

I'd set the visual gates before the first screen. The visual critic came after the pastel tiles measured 1.01:1, and several visual calls were reversed within days: the mark's tile, the Requests button's side, the shop card's colour.

I'd use real data wherever it was cheap. The walk times were invented until real routes replaced them, and two shops then fell outside the 20-minute radius.
