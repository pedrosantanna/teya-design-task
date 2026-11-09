# What I'll test next

The first test is whether shops answer, by hand, before I build anything that depends on it. I set every go and stop mark before testing, so a result can't be read to fit.

## The three hypotheses

The concept rests on these three. H1 decides whether the concierge can work at all; H3 and H4 decide whether shoppers want it. None has evidence yet.

<div class="dg dg-hyps"><div class="dg-hyp"><div class="dg-hyp-head"><b>H1 · Shops answer</b></div><dl><dt>I believe that</dt><dd>Shopkeepers answer an ask on WhatsApp within 10 minutes while open, with an answer the shopper can act on.</dd><dt>Test</dt><dd>By hand on WhatsApp: about 60 requests sent as about 160 asks to 10 shops within a 15-minute walk of Blythe Road.</dd><dt>Go / stop</dt><dd>Go if 60% of asks get a valid answer in 10 minutes and 50% of requests get a usable yes. Stop under 45% or 30%.</dd></dl></div><div class="dg-hyp"><div class="dg-hyp-head"><b>H3 · Shoppers ask</b></div><dl><dt>I believe that</dt><dd>Shoppers with a specific need would rather ask one concierge than browse shops and contact them one by one.</dd><dt>Test</dt><dd>The prototype offers asking and browsing from the first screen; I note each shopper's first choice in their first specific-need scenario.</dd><dt>Go / stop</dt><dd>Go if 14 of 20 ask first. Stop at 9 or fewer.</dd></dl></div><div class="dg-hyp"><div class="dg-hyp-head"><b>H4 · Shoppers wait</b></div><dl><dt>I believe that</dt><dd>Shoppers accept a wait of several minutes when the concierge says what it's doing and keeps looking.</dd><dt>Test</dt><dd>A hand-run concierge on WhatsApp with 20 shoppers and real requests; for each request whose first yes takes over 5 minutes, I ask whether they bought elsewhere.</dd><dt>Go / stop</dt><dd>Go if 70% are still open when the yes arrives. Stop under 50%.</dd></dl></div></div>

## First experiment

Four weeks with 10 independent shops within a 15-minute walk of Blythe Road, 5 of them on the provider's POS. Twenty shoppers make about 60 requests in the first three weeks, about 160 asks to the shops; week four is for the shopkeepers and the offers. An agent sends the asks on WhatsApp, the same twenty shoppers use the prototype, and the shops get a weekly demand summary. If the agent isn't ready, I play the concierge on WhatsApp myself. Inviting the shops is also the first conversation with a shopkeeper in this project.

Evidence: [hypotheses](../define/hypotheses.md), [next step](../define/next-step.md).

## Signals to stop or go

- H1, H3 and H4 reach go: the concierge can be the main way in. A result between the marks means I change the design and test again.
- H1 reaches stop: the concept narrows to shops whose tills share stock, or to a slower request with an answer by a set time.
- H3 or H4 reaches stop: browsing becomes the main screen, and Snuffle handles what browsing can't answer.

## Measurement

Task success is the base: whether a shopper gets from the ask to an order and a collected item, and where they drop out. The north star is completed requests per week, the requests that end with an order collected or delivered; a full week evens out weekday errands and weekend shopping. While the product is young I'd record events broadly and cut them later, since events cost money at scale. The plan defines 58 events and builds none in the prototype, and the [App flow](../develop/ideation/app-flow.md) canvas has a measurement layer (press M) that places every task, event and metric on its screen.

Evidence: [measurement plan](../verify/measurement.md), [product metrics](../verify/metrics.md).

## What I'd do differently

I'd put a few real requests in front of shops early. The proof of concept over interviews still holds, but I finished with H1 at no evidence at all.

I'd set the visual gates before the first screen. The visual critic came after the pastel tiles measured 1.01:1, and several visual calls were reversed within days: the mark's tile, the Requests button's side, the shop card's colour.

I'd use real data wherever it was cheap. The walk times were invented until real routes replaced them, and two shops then fell outside the 20-minute radius.
