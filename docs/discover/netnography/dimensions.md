# Proposed dimensions

Two dimensions that come out of the [findings](findings.md) and are used to cluster the [proto-personas](../personas/index.md): **need urgency** and **purchase stage**. The second one is the choice the brief asks for.

```summary
Takeaways:
- Need urgency: from browsing to needing a specific thing now.
- Purchase stage: the step of buying where the attempt stopped, from 1 find out (findability) to 4 get it (transaction).
- What people did next (kept going, or gave up) is drawn as the style of each point.
Call:
- I picked need urgency and purchase stage from the candidates, because the second maps straight onto findability versus transaction and both can be coded from what people wrote.
- I kept "what people did next" off the axes, because most posts don't show it.
AI:
- The research agent proposed candidate axes from its coding. A reviewer agent tested them against the brief. Two agents coded every post on both axes.
Trade-offs:
- Need describes occasions more than people: the same person browses on Saturday and is on a mission on Tuesday.
```

## Need urgency (browsing ↔ needs it now)

How specific and time-bound the need is. At the **needs it now** end the shopper wants a particular thing, often by a deadline, and won't tolerate an uncertain trip. At the **browsing** end there's no item in mind; routine shopping sits in between.

Scored from two codes: the job (discovery, routine or a specific item) and whether the post states a deadline. See the [scale](../personas/method.md).

```quote
text: Left it a bit last minute, but does anyone know any stores nearby selling solar eclipse glasses?
handle: u/grand_web
network: Reddit · r/chiswick
date: 2026-08-11
url: https://www.reddit.com/r/chiswick/comments/1vlibmn/
tags: stock-visibility, urgency
context: Needs-it-now end: specific item, deadline the next day.
status: verified
```

```quote
text: Anyone knows a store around hammersmith or holborn? 😭
handle: u/claudiav2603
network: Reddit · r/london
date: 2026-08-11
url: https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2y26dy/
tags: stock-visibility, urgency
context: Needs-it-now end: same eclipse rush, near Hammersmith.
status: archive
```

```quote
text: we have plenty of shops to browse! But I can't actually remember the last time I went there for clothes shopping.
handle: Kenjenny
network: Mumsnet · Talk › Chat
date: 2026-03-27
url: https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334270
tags: online-default
context: Browsing end, gone quiet: shops nearby, no recent trips.
status: verified
```

## Purchase stage (find out → get it)

Buying something from a local shop goes through four steps in order, and each post is scored by the step where it stopped:

| Step | Stopped because | Points to |
| --- | --- | --- |
| 1 · Find out | Couldn't learn who has the item, whether it's in stock or whether the shop is open | Findability |
| 2 · Find it | The item or the shop wasn't there | The street's offer |
| 3 · Accept it | Price or quality wasn't worth it | The street's offer |
| 4 · Get it | Couldn't pay, collect or receive it at a time that works: hours, cash only, slow delivery | Transaction |

A higher step means the shopper got further before it broke. Steps 2 and 3 depend on what the street sells, which an app can show but can't change. The scores are on the [persona method](../personas/method.md) page.

```quote
text: Hard to know stock levels without visiting, unless you can somehow get through on the phone..!
handle: u/jamesshovlin
network: Reddit · r/london
date: 2026-08-10
url: https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tdld2/
tags: stock-visibility
context: Step 1, find out: stock can't be known without going.
status: verified
```

```quote
text: I've been to Robert Dyas in Ealing and Chiswick today and both sold out
handle: u/moanyjoany
network: Reddit · r/Ealing
date: 2026-08-11
url: https://www.reddit.com/r/Ealing/comments/1vlcuor/comment/p30r2af/
tags: stock-visibility, access-transport
context: Step 2, find it: the shops existed, the stock didn't.
status: verified
```

```quote
text: So I end up in McDonald's, cos it's always open, and shop on Amazon, because it's always there.
handle: LividArse
network: Mumsnet · Talk › AIBU
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221
tags: opening-hours, online-default
context: Step 4, get it: shops not open when they can go.
status: verified
```

```quote
text: it's only open during office hours and then Saturday morning, and b) it's more than double the cost… I go to them for anniversaries
handle: u/killmetruck
network: Reddit · r/london
date: 2026-06-07
url: https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/
tags: opening-hours, price, support-local
context: Step 4, get it: office hours and price push the weekly shop elsewhere.
status: verified
```

## What people did next

Some posts show what the shopper did after the friction: kept going despite a cost, or switched to online or a chain. That tells me who a product could win back, but only 10 of the 27 coded posts show it, and the two coders agreed less on it. So I drew it as the style of each point and left it off the axes.

## Considered and rejected

- **Effort for local as an axis.** Too few posts show behaviour, and what people say about supporting local differs from what they do ([empathy map](empathy-map.md)).
- **Price sensitivity.** Tangled up with convenience: several posters would have paid more if the shop had been reliable.
- **Time available.** It drives the opening-hours pain, and fits better as a persona trait.
- **Place loyalty (King Street versus Chiswick).** It separates one high street from another and says nothing about the shoppers.
