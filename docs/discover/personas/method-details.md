# Method in detail

The codebook, the agreement between the two coders, how each disagreement was settled, and the tags and scores for every post.

Coding is the qualitative research term for tagging: reading each post and giving it labels from a fixed list, such as "specific item" or "information". The list of labels, with a rule for each, is the codebook, and a coder is whoever applies it. Here the coders are two AI agents. The short version is on [method](method.md).

## Codebook

The unit is one public post. A post is coded only if it describes the poster's own shopping: a specific occasion or a habit of their own. Opinions about other people or the street, content written by or for a business, and posts that aren't about shopping are left out.

| Field | Values |
| --- | --- |
| Job | **specific**: a particular item, shop or service · **routine**: regular shopping and services · **discovery**: browsing, finds, no item in mind |
| Urgent | **yes** if the post states a deadline or time pressure, otherwise **no** |
| Stage where it stopped (`failure`) | **information** (step 1, find out): couldn't find out, or was told wrongly, about stock, hours or who sells it · **availability** (step 2, find it): the item or the shop wasn't there · **value** (step 3, accept it): price or quality not worth it · **access** (step 4, get it): hours that don't fit, travel, parking, delivery speed, payment · **none** |
| Stance | **persists**: kept using local despite a stated cost · **defects**: moved to online, a chain or a supermarket, or stopped going · **unknown** |

Three rules break ties:

1. Where it broke is the root cause. A closed butcher that forces a longer trip counts as availability.
2. The full post counts, including the parts the excerpt leaves out.
3. Persists needs a cost stated in the post. A loyal habit with no cost stays unknown.

## Agreement between coders

One agent tagged first. A second agent then tagged the same 44 posts from the codebook alone, without seeing the first codes. Agreement before reconciliation:

<!-- generated:agreement -->
| Field | Posts compared | Agreement | Cohen's kappa |
| --- | --- | --- | --- |
| include | 44 | 41/44 (93%) | 0.85 |
| job | 27 | 26/27 (96%) | 0.93 |
| urgent | 27 | 26/27 (96%) | 0.92 |
| stage | 27 | 24/27 (89%) | 0.85 |
| stance | 27 | 20/27 (74%) | 0.55 |
<!-- /generated:agreement -->

Kappa corrects agreement for chance. Above 0.8 is usually read as strong and 0.4–0.6 as moderate. Stance is the weak field: most posts don't say what the person did next.

## Disagreements

<!-- generated:resolutions -->
| Post | Settled as | Why |
| --- | --- | --- |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tb0s2/) | specific, none, unknown | Agreed with coder B: the search worked through the WhatsApp group, so nothing broke. |
| [Valentando](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465) | routine, information, persists | Kept persists: the same post says they buy there every week, after the visit when it was shut. |
| [u/Miraclefish](https://www.reddit.com/r/london/comments/1ueg96t/comment/otjhcgo/) | specific, availability, unknown | Kept urgent: the full post is about getting an AC the same day in the heatwave. |
| [u/killmetruck](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/) | routine, access, defects | Kept defects: for routine shopping they use the supermarket; the butcher is for anniversaries only. |
| [u/Inge_Jones](https://www.reddit.com/r/Ealing/comments/1x3g7ci/comment/pfbvje4/) | routine, none, unknown | Agreed with coder B: no cost is stated, so loyalty can't be coded as persists. |
| [u/mjfh2](https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/) | routine, availability, persists | Kept availability: the root cause is the butcher closing; the trip to Chiswick follows from it. |
| [u/Accomplished-Pen2660](https://www.reddit.com/r/Ealing/comments/1ug10pv/comment/oty3pvk/) | excluded | Agreed with coder B: opinion about the street. |
| [u/Vermathorax](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq989gy/) | routine, none, persists | Kept persists: the full post says the butcher is a bit more expensive and they still choose it. |
| [u/rising_then_falling](https://www.reddit.com/r/london/comments/1niwnlw/comment/nema5k6/) | routine, none, unknown | Agreed with coder B: no cost is stated. |
| [u/Peppy_Tomato](https://www.reddit.com/r/AskUK/comments/1rn7npv/comment/o94plrm/) | routine, none, unknown | Kept unknown: choosing supermarket click and collect is not switching away from local shops. |
| [u/Aggravating-Desk4004](https://www.reddit.com/r/Ealing/comments/1xjkdgb/) | routine, availability, unknown | Agreed with coder B on stance: buying something each visit is a habit, not a cost. Kept availability for the lost post offices. |
| [@hollygardnerx](https://www.tiktok.com/@hollygardnerx/video/7578215485968354582) | excluded | Agreed with coder B: creator content that promotes a place is excluded, as the codebook says. |
| [@tafsonthemove](https://www.tiktok.com/@tafsonthemove/video/7503202705293266198) | excluded | Agreed with coder B: creator content that promotes a place is excluded. |
| [u/Username8831](https://www.reddit.com/r/Ealing/comments/1v6423y/comment/oznttbd/) | specific, value, defects | Agreed with coder B: a one-off visit to a bike workshop is a specific service, not routine. |
<!-- /generated:resolutions -->

## Coded posts

<!-- generated:coding -->
| Post | Date | Job | Urgent | Stage | Stance | Urgency | Stage score | Group | Why |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [u/moanyjoany](https://www.reddit.com/r/Ealing/comments/1vlcuor/comment/p30r2af/) | 2026-08-11 | specific | yes | availability | persists | 10 | 6.7 | Sam | Tried two shops for eclipse glasses; both sold out. |
| [u/Mediocre_Sprinkles](https://www.reddit.com/r/CasualUK/comments/1n23ixq/comment/nb2z980/) | 2025-08-28 | specific | yes | availability | defects | 10 | 6.7 | Sam | 'In a pinch', every shop, nothing; paid parking; buys on Amazon. |
| [u/Miraclefish](https://www.reddit.com/r/london/comments/1ueg96t/comment/otjhcgo/) | 2026-06-24 | specific | yes | availability | unknown | 10 | 6.7 | Sam | Shops out of stock in the heatwave; online 2+ weeks. |
| [u/xmastreee](https://www.reddit.com/r/CasualUK/comments/1n23ixq/comment/nb31nms/) | 2025-08-28 | specific | yes | availability | unknown | 10 | 6.7 | Sam | Hardware shop had nothing in stock; says he'd have paid the premium. Outcome not stated. |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tdld2/) | 2026-08-10 | specific | yes | information | unknown | 10 | 10 | Sam | Eclipse glasses before the eclipse; says stock can't be known without visiting or phoning. |
| [u/akat224](https://www.reddit.com/r/london/comments/1ueg96t/) | 2026-06-24 | specific | yes | information | unknown | 10 | 10 | Sam | Needs a portable AC 'asap'; asks which places have it in stock. |
| [Dbank](https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334565) | 2026-03-27 | specific | no | information | defects | 7 | 10 | Sam | Website listed 7 in stock, shop had none; bought on Amazon. |
| [u/dy14n19](https://www.reddit.com/r/HammersmithandFulham/comments/1myug4c/) | 2025-08-24 | specific | no | information | unknown | 7 | 10 | Sam | Google says the patisserie is closed and they don't trust it. |
| [@Jojo_agboola](https://x.com/Jojo_agboola/status/2112618905525276980) | 2026-10-20 | specific | no | information | unknown | 7 | 10 | Sam | Asks X's AI chatbot which walk-in store stocks a fragrance. |
| [u/grand_web](https://www.reddit.com/r/chiswick/comments/1vlibmn/) | 2026-08-11 | specific | yes | information | unknown | 10 | 10 | Sam | Last minute; asks which stores nearby sell eclipse glasses. |
| [u/claudiav2603](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2y26dy/) | 2026-08-11 | specific | yes | information | unknown | 10 | 10 | Sam | Asks which store near Hammersmith has eclipse glasses, the day before. |
| [LividArse](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221) | 2025-12-05 | routine | no | access | defects | 4 | 0 | Jess | Independents not consistently open; ends up at McDonald's and Amazon. |
| [FerrisWheelsandLilacs](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148976658) | 2025-12-05 | routine | no | access | unknown | 4 | 0 | Jess | States her own rule: pays more locally if convenient, won't jump through hoops. No behaviour shown. |
| [u/killmetruck](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/) | 2026-06-07 | routine | no | access | defects | 4 | 0 | Jess | Butcher open office hours only and double the price; supermarket for the week, butcher for anniversaries. |
| [u/rsweb](https://www.reddit.com/r/AskUK/comments/1my0t02/comment/na8v8ju/) | 2025-08-23 | routine | no | access | unknown | 4 | 0 | Jess | Doesn't carry cash, so cash-only stalls don't work for them. |
| [u/WearyChampionship365](https://www.reddit.com/r/Ealing/comments/1vlc46x/comment/p30rnx7/) | 2026-08-11 | specific | yes | access | unknown | 10 | 0 | Jess | Online can't deliver before the deadline. |
| [u/Username8831](https://www.reddit.com/r/Ealing/comments/1v6423y/comment/oznttbd/) | 2026-07-25 | specific | no | value | defects | 7 | 3.3 | Jess | Used the bike workshop once; thought it too expensive. |
| [u/mjfh2](https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/) | 2025-09-17 | routine | no | availability | persists | 4 | 6.7 | Ruth | Local butcher gone; now has to go to Chiswick, 'a pain'. |
| [u/Aggravating-Desk4004](https://www.reddit.com/r/Ealing/comments/1xjkdgb/) | 2026-10-31 | routine | no | availability | unknown | 4 | 6.7 | Ruth | Post offices lost; always buys something at the newsagent counter that remains. |
| [Valentando](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465) | 2025-12-05 | routine | no | information | persists | 4 | 10 | Ruth | Weekly butcher shut during its advertised hours; keeps buying there. |
| [Kenjenny](https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334270) | 2026-03-27 | discovery | no | none | defects | – | – | Nothing broke (not clustered) | Lives near Oxford Street but can't remember last going clothes shopping there. |
| [u/Inge_Jones](https://www.reddit.com/r/Ealing/comments/1x3g7ci/comment/pfbvje4/) | 2026-10-11 | routine | no | none | unknown | – | – | Nothing broke (not clustered) | Eats a local restaurant's food often via Deliveroo to keep it afloat. |
| [u/Vermathorax](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq989gy/) | 2026-06-07 | routine | no | none | persists | – | – | Nothing broke (not clustered) | Chooses the butcher: better quality, accommodates special requests. |
| [u/rising_then_falling](https://www.reddit.com/r/london/comments/1niwnlw/comment/nema5k6/) | 2025-09-17 | routine | no | none | unknown | – | – | Nothing broke (not clustered) | 'My local guy will cut any bit of meat you ask for.' |
| [u/Peppy_Tomato](https://www.reddit.com/r/AskUK/comments/1rn7npv/comment/o94plrm/) | 2026-03-07 | routine | no | none | unknown | – | – | Nothing broke (not clustered) | Chooses click and collect for control over timing; describes no failure. |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tb0s2/) | 2026-08-10 | specific | yes | none | unknown | – | – | Nothing broke (not clustered) | Same hunt; shares a shop's stock count and a WhatsApp restock group to fill the information gap. |
<!-- /generated:coding -->

### Excluded posts

<!-- generated:excluded -->
| Post | Why it was left out |
| --- | --- |
| [Agix](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148976563) | Generalises about shops' hours and other people; no behaviour of the poster's own. |
| [u/Outside-Assignment85](https://www.reddit.com/r/london/comments/1vr9i0n/comment/p4brlc4/) | Advises a visitor about King Street; opinion about the street, no own shopping described. |
| [u/No_Witness9533](https://www.reddit.com/r/london/comments/1vr9i0n/comment/p4bxk0e/) | Advises a visitor about Hammersmith; opinion about the street. |
| [u/JollyExPat](https://www.reddit.com/r/london/comments/1tatyc0/comment/olc54ib/) | Recommends Chiswick as a high street; opinion, no own shopping. |
| [u/abitofasitdown](https://www.reddit.com/r/london/comments/1niwnlw/) | Laments Kew losing its butcher; opinion about the street. |
| [u/Accomplished-Pen2660](https://www.reddit.com/r/Ealing/comments/1ug10pv/comment/oty3pvk/) | Describes how the street changed, not the poster's own shopping. |
| [u/squeakyeggs](https://www.reddit.com/r/Ealing/comments/1vhe1k8/comment/p7t14xd/) | Written by a former shop owner's son. |
| [u/sd_1874](https://www.reddit.com/r/london/comments/1ukfwni/comment/ouvf2m5/) | Opinion on chains, no shopping behaviour. |
| [u/Rhubarbatross](https://www.reddit.com/r/london/comments/1pvd92z/comment/nvw7a0u/) | About the bridge and traffic. |
| [u/anonypanda](https://www.reddit.com/r/london/comments/1uke914/comment/ouyun00/) | About the bridge and traffic. |
| [@London_W4](https://x.com/London_W4/status/2102723893463044506) | A walk along King Street and an impression of it, with no purchase of their own. Removed after the external review. |
| [@OpenChiswickW4](https://x.com/OpenChiswickW4/status/2069295025561760040) | Opinion about what other people should do. |
| [@loveandlondon](https://www.tiktok.com/@loveandlondon/video/7509933373075492118) | Creator guide promoting a place as content. |
| [@hollygardnerx](https://www.tiktok.com/@hollygardnerx/video/7578215485968354582) | Creator content promoting a shop. |
| [@tafsonthemove](https://www.tiktok.com/@tafsonthemove/video/7503202705293266198) | Creator content promoting a stall. |
| [@stillshipping](https://www.tiktok.com/@stillshipping/video/7693511674925518102) | Market commentary, not the poster's own shopping. |
| [@hackneyfleamarket](https://www.tiktok.com/@hackneyfleamarket/video/7689755751471959318) | Written by the market organiser. |
| [u/Greg-Normal](https://www.reddit.com/r/london/comments/1niwnlw/comment/neo7ha3/) | Scolds other people; no own behaviour. |
<!-- /generated:excluded -->

## Codes by job and purchase stage

<!-- generated:grid -->
```occasion-grid
{"rows": [{"id": "specific", "label": "Specific item or shop"}, {"id": "routine", "label": "Routine shopping and services"}, {"id": "discovery", "label": "Discovery and browsing"}], "cols": [{"id": "information", "label": "1 · Find out", "maps": "findability"}, {"id": "availability", "label": "2 · Find it", "maps": "the street's offer"}, {"id": "value", "label": "3 · Accept it", "maps": "the street's offer"}, {"id": "access", "label": "4 · Get it", "maps": "transaction"}, {"id": "none", "label": "Nothing broke", "maps": ""}], "groups": {"mission": "Sam, the mission shopper", "lapsed": "Jess, the lapsed local", "regular": "Ruth, the regular", "worked": "Nothing broke (not clustered)"}, "cells": [{"row": "specific", "col": "information", "posts": [{"h": "u/jamesshovlin", "s": "unknown", "g": "mission", "u": true}, {"h": "u/akat224", "s": "unknown", "g": "mission", "u": true}, {"h": "Dbank", "s": "defects", "g": "mission", "u": false}, {"h": "u/dy14n19", "s": "unknown", "g": "mission", "u": false}, {"h": "@Jojo_agboola", "s": "unknown", "g": "mission", "u": false}, {"h": "u/grand_web", "s": "unknown", "g": "mission", "u": true}, {"h": "u/claudiav2603", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "availability", "posts": [{"h": "u/moanyjoany", "s": "persists", "g": "mission", "u": true}, {"h": "u/Mediocre_Sprinkles", "s": "defects", "g": "mission", "u": true}, {"h": "u/Miraclefish", "s": "unknown", "g": "mission", "u": true}, {"h": "u/xmastreee", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "value", "posts": [{"h": "u/Username8831", "s": "defects", "g": "lapsed", "u": false}]}, {"row": "specific", "col": "access", "posts": [{"h": "u/WearyChampionship365", "s": "unknown", "g": "lapsed", "u": true}]}, {"row": "specific", "col": "none", "posts": [{"h": "u/jamesshovlin", "s": "unknown", "g": "worked", "u": true}]}, {"row": "routine", "col": "information", "posts": [{"h": "Valentando", "s": "persists", "g": "regular", "u": false}]}, {"row": "routine", "col": "availability", "posts": [{"h": "u/mjfh2", "s": "persists", "g": "regular", "u": false}, {"h": "u/Aggravating-Desk4004", "s": "unknown", "g": "regular", "u": false}]}, {"row": "routine", "col": "access", "posts": [{"h": "LividArse", "s": "defects", "g": "lapsed", "u": false}, {"h": "FerrisWheelsandLilacs", "s": "unknown", "g": "lapsed", "u": false}, {"h": "u/killmetruck", "s": "defects", "g": "lapsed", "u": false}, {"h": "u/rsweb", "s": "unknown", "g": "lapsed", "u": false}]}, {"row": "routine", "col": "none", "posts": [{"h": "u/Inge_Jones", "s": "unknown", "g": "worked", "u": false}, {"h": "u/Vermathorax", "s": "persists", "g": "worked", "u": false}, {"h": "u/rising_then_falling", "s": "unknown", "g": "worked", "u": false}, {"h": "u/Peppy_Tomato", "s": "unknown", "g": "worked", "u": false}]}, {"row": "discovery", "col": "none", "posts": [{"h": "Kenjenny", "s": "defects", "g": "worked", "u": false}]}]}
```
<!-- /generated:grid -->

## Limits

### Number of clusters

Three clusters had the best mean silhouette in the configuration I chose: urgency and stage weighted equally, k from 2 to 5. At those weights the margin is small (0.55 for three, 0.54 for two, four and five). I re-ran the same script with the stage axis reweighted and the codes unchanged. At half weight, three clusters still score best (0.58); at double weight, five do (0.72). I haven't tested which weighting suits the material better, so the number of personas is partly my choice. The 20 clustered posts sit at only 8 distinct positions, so a change to one code can move a boundary.

### Codebook deviations

The inclusion rule asks for the poster's own shopping, a specific occasion or a habit, and leaves out opinion about the street. After the external review I removed one post that didn't meet it and kept one that stretches it.

- @London_W4 describes a walk of their own along King Street ("Just walked the length of King Street"), and the rest is an impression of the street. No shopping or purchase is described, so I removed it (decision 019). It was a quarter of Ruth's cluster and her only discovery post. Without it, three clusters still score best, by a smaller margin (0.55 against 0.54), and Ruth rests on three posts, all routine.
- FerrisWheelsandLilacs states a rule for their own shopping ("If you sell something I want and it's reasonably convenient, I will pay more…"), with no occasion or behaviour. I counted a stated rule as a habit, which the codebook doesn't say. Without it, Jess has five posts and the clusters don't change.

Data files: `docs/discover/personas/coding-a.json` (first coder), `coding-b.json` (second coder), `coding.json` (final). Run `python3 scripts/build_personas.py` to rebuild every table and the map.
