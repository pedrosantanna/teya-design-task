# Proto-personas

Three proto-personas drawn from 44 public posts. The posts were coded first, and the groups were read off the coded data afterwards. One persona is well supported. Two are thin and need testing in Define.

```summary
Takeaways:
- The mission shopper (Sam) is the clearest group: 14 of 27 posts, and half of them broke on information.
- Information and availability failures outnumber access failures, 15 to 5, so findability carries more of the pain.
- Ruth (regular) and Dan (lapsed) have 3 posts each, and discovery has 1. Treat them as hypotheses.
Call:
- Code the posts first and let the groups appear, instead of drafting personas and placing them.
- Call them proto-personas, since nobody was interviewed ([000](../../decision-log.md)).
AI:
- Claude coded every post with a written codebook. A second agent coded them blind. Rules settled the disagreements.
- I discarded a first five-persona version after a reviewer agent showed it was circular. [Log](../../process/ai-log.md).
Trade-offs:
- Honest but thin: three groups, two of them with very few posts.
```

**Why proto-personas.** No shoppers were interviewed, so these are hypotheses built from what people posted, not validated personas. For a take-home that's enough to choose a direction ([decision 000](../../decision-log.md)). Define should test them with five or six short interviews on King Street.

## Where each post sits

Each mark is one post. Rows show what the shopper was trying to do; columns show where it broke. The column headings say which side of the brief each failure points to.

<!-- generated:grid -->
```occasion-grid
{"rows": [{"id": "specific", "label": "Specific item or shop"}, {"id": "routine", "label": "Routine shopping and services"}, {"id": "discovery", "label": "Discovery and browsing"}], "cols": [{"id": "information", "label": "Information", "maps": "findability"}, {"id": "access", "label": "Access", "maps": "transaction"}, {"id": "availability", "label": "Availability", "maps": "the street's offer"}, {"id": "value", "label": "Value", "maps": "the street's offer"}, {"id": "none", "label": "No failure", "maps": ""}], "groups": {"mission": "Sam, the mission shopper", "regular": "Ruth, the regular", "lapsed": "Dan, the lapsed local", "discovery": "Priya, the finds hunter", "unassigned": "Not placed"}, "cells": [{"row": "specific", "col": "information", "posts": [{"h": "u/jamesshovlin", "s": "unknown", "g": "mission", "u": true}, {"h": "u/akat224", "s": "unknown", "g": "mission", "u": true}, {"h": "Dbank", "s": "defects", "g": "mission", "u": false}, {"h": "u/dy14n19", "s": "unknown", "g": "mission", "u": false}, {"h": "@Jojo_agboola", "s": "unknown", "g": "mission", "u": false}, {"h": "u/grand_web", "s": "unknown", "g": "mission", "u": true}, {"h": "u/claudiav2603", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "access", "posts": [{"h": "u/WearyChampionship365", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "availability", "posts": [{"h": "u/moanyjoany", "s": "persists", "g": "mission", "u": true}, {"h": "u/Mediocre_Sprinkles", "s": "defects", "g": "mission", "u": true}, {"h": "u/Miraclefish", "s": "unknown", "g": "mission", "u": true}, {"h": "u/xmastreee", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "value", "posts": [{"h": "u/Username8831", "s": "defects", "g": "mission", "u": false}]}, {"row": "specific", "col": "none", "posts": [{"h": "u/jamesshovlin", "s": "unknown", "g": "mission", "u": true}]}, {"row": "routine", "col": "information", "posts": [{"h": "Valentando", "s": "persists", "g": "regular", "u": false}]}, {"row": "routine", "col": "access", "posts": [{"h": "LividArse", "s": "defects", "g": "lapsed", "u": false}, {"h": "FerrisWheelsandLilacs", "s": "unknown", "g": "unassigned", "u": false}, {"h": "u/killmetruck", "s": "defects", "g": "lapsed", "u": false}, {"h": "u/rsweb", "s": "unknown", "g": "unassigned", "u": false}]}, {"row": "routine", "col": "availability", "posts": [{"h": "u/mjfh2", "s": "persists", "g": "regular", "u": false}, {"h": "u/Aggravating-Desk4004", "s": "unknown", "g": "unassigned", "u": false}]}, {"row": "routine", "col": "none", "posts": [{"h": "u/Inge_Jones", "s": "unknown", "g": "unassigned", "u": false}, {"h": "u/Vermathorax", "s": "persists", "g": "regular", "u": false}, {"h": "u/rising_then_falling", "s": "unknown", "g": "unassigned", "u": false}, {"h": "u/Peppy_Tomato", "s": "unknown", "g": "unassigned", "u": false}]}, {"row": "discovery", "col": "availability", "posts": [{"h": "@London_W4", "s": "unknown", "g": "discovery", "u": false}]}, {"row": "discovery", "col": "none", "posts": [{"h": "Kenjenny", "s": "defects", "g": "lapsed", "u": false}]}]}
```
<!-- /generated:grid -->

<!-- generated:groups -->
| Proto-persona | Posts | People | Sources | Where the occasion broke | Stance |
| --- | --- | --- | --- | --- | --- |
| Sam, the mission shopper | 14 | 13 | West London 6, London 4, UK-wide 3, X/TikTok 1 | information 7, availability 4, none 1, access 1, value 1 | unknown 10, defects 3, persists 1 |
| Ruth, the regular | 3 | 3 | London 2, UK-wide 1 | information 1, availability 1, none 1 | persists 3 |
| Dan, the lapsed local | 3 | 3 | UK-wide 2, London 1 | access 2, none 1 | defects 3 |
| Priya, the finds hunter | 1 | 1 | X/TikTok 1 | availability 1 | unknown 1 |
| Not placed | 6 | 6 | UK-wide 3, West London 2, London 1 | none 3, access 2, availability 1 | unknown 6 |
<!-- /generated:groups -->

**What the grid says** *(interpretation)*

- Specific-item occasions are the largest group, and most broke on not knowing (information) or the thing not being there (availability).
- Availability (7 posts) is the street's own offer. An app can surface what exists, but it can't stock a shop that closed.
- Access failures (5) cluster in routine shopping: hours that clash with work, cash only. That is where transaction design would help.

## Sam, the mission shopper

Needs a particular thing, usually soon, and asks around to find who has it. Strong evidence: 14 posts from 13 people, 10 of them with a deadline.

```quote
text: Does anyone know any places that have a portable AC in stock around London? Wife is pregnant so need to get one asap!
handle: u/akat224
network: Reddit · r/london
date: 2026-06-24
url: https://www.reddit.com/r/london/comments/1ueg96t/
tags: stock-visibility, urgency
context: Opening post during the June 2026 heatwave; the AC ordered online arrived faulty.
status: verified
```

| | |
| --- | --- |
| **Jobs to be done** | Find out which nearby shop has a specific item, before setting off. Get it in time. |
| **Use cases** | Eclipse glasses the day before. A fan in a heatwave. Whether a patisserie is still open. A website showing stock the shop didn't have. |
| **Pains** | No stock or hours information he can trust. Wasted trips. Online too slow. |
| **Gains** | Certainty before leaving. Getting it today. |
| **Influencers** | Reddit, WhatsApp restock groups, AI chatbots. |
| **Varies by** | Whether he wants a local shop or any shop. The data can't separate the two (see [method](method.md)). |

## Ruth, the regular *(thin: 3 posts)*

Shops locally for routine things and keeps going despite a cost: odd hours, a higher price, a longer trip.

```quote
text: Good independent local butcher (who I try to buy something from every week)
handle: Valentando
network: Mumsnet · Talk › AIBU
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465
tags: support-local
context: Committed pole. Keeps going even after finding the shop shut during its advertised hours.
status: verified
```

| | |
| --- | --- |
| **Jobs to be done** | Keep using the shops she relies on. |
| **Pains** | Shops shut when they say they're open. The nearest butcher closing. |
| **Gains** | Quality, special requests, a relationship with the shop. |

## Dan, the lapsed local *(thin: 3 posts)*

Used to shop locally, now defaults to online or a chain because local didn't fit his life.

```quote
text: So I end up in McDonald's, cos it's always open, and shop on Amazon, because it's always there.
handle: LividArse
network: Mumsnet · Talk › AIBU
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221
tags: opening-hours, online-default
context: Same Mumsnet thread on independents' hours.
status: verified
```

| | |
| --- | --- |
| **Jobs to be done** | Get routine shopping done with the least effort. |
| **Pains** | Opening hours that match his working hours. A local premium without extra convenience. |
| **Gains** | Always open, no surprises. |

## Not yet a persona

- **Discovery.** Only one coded post. TikTok shows plenty of browsing and "finds", but that content promotes places, so it was excluded from coding ([theme 10](../netnography/findings.md)). Kept as an occasion to explore.
- **Six routine posts with no clear stance.** These are loyal habits with no stated cost, or rules people describe for themselves. They could belong to Ruth or Dan; interviews would tell.

How the coding and grouping worked: [method](method.md). Every post and code: [coding in detail](coding.md).
