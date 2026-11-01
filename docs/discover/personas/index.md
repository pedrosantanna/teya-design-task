# Proto-personas

Three proto-personas, found by plotting 21 tagged posts on two dimensions, need and where the occasion broke, and letting clusters form. Each persona is one cluster.

```summary
Takeaways:
- Sam (11 posts): needs a specific thing, often by a deadline, and can't find out who has it. This is the findability side.
- Dan (6 posts): mostly routine shopping that breaks on getting it: hours, cash, delivery time. He gives up on local. This is the transaction side.
- Ruth (4 posts): keeps shopping locally while her shops disappear. The thinnest of the three.
Call:
- Cluster the posts on two dimensions that speak to the brief, and define the personas from the clusters.
- Call them proto-personas: nobody was interviewed ([000](../../decision-log.md)).
AI:
- Claude and a second agent tagged every post blind, from a fixed list of labels. A script scored both dimensions and ran the clustering.
- I chose the dimensions and checked the clusters against the quotes.
Trade-offs:
- Small numbers (4 to 11 posts per cluster). These are directions to test in Define, not findings.
```

## The map

<!-- generated:chart -->
```cluster-map
{"x": {"label": "Need", "ticks": [[1, "Discovery"], [4, "Routine"], [7, "Specific item"], [10, "Specific + deadline"]], "min": "Browse", "max": "Mission"}, "y": {"label": "Where it broke", "ticks": [[9, "Couldn't find out"], [6, "Wasn't there"], [4, "Not worth it"], [1, "Couldn't get it"]], "min": "Transaction", "max": "Findability"}, "names": {"mission": "Sam, the mission shopper", "lapsed": "Dan, the lapsed local", "regular": "Ruth, the regular"}, "centres": {"mission": {"x": 9.2, "y": 7.9, "n": 11}, "lapsed": {"x": 5.5, "y": 1.5, "n": 6}, "regular": {"x": 3.2, "y": 6.8, "n": 4}}, "points": [{"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/jamesshovlin"}, {"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/akat224"}, {"x": 10, "y": 6, "c": "mission", "s": "persists", "h": "u/moanyjoany"}, {"x": 7, "y": 9, "c": "mission", "s": "defects", "h": "Dbank"}, {"x": 7, "y": 9, "c": "mission", "s": "unknown", "h": "u/dy14n19"}, {"x": 4, "y": 9, "c": "regular", "s": "persists", "h": "Valentando"}, {"x": 10, "y": 6, "c": "mission", "s": "defects", "h": "u/Mediocre_Sprinkles"}, {"x": 4, "y": 1, "c": "lapsed", "s": "defects", "h": "LividArse"}, {"x": 10, "y": 1, "c": "lapsed", "s": "unknown", "h": "u/WearyChampionship365"}, {"x": 10, "y": 6, "c": "mission", "s": "unknown", "h": "u/Miraclefish"}, {"x": 4, "y": 1, "c": "lapsed", "s": "unknown", "h": "FerrisWheelsandLilacs"}, {"x": 10, "y": 6, "c": "mission", "s": "unknown", "h": "u/xmastreee"}, {"x": 4, "y": 1, "c": "lapsed", "s": "defects", "h": "u/killmetruck"}, {"x": 4, "y": 6, "c": "regular", "s": "persists", "h": "u/mjfh2"}, {"x": 4, "y": 6, "c": "regular", "s": "unknown", "h": "u/Aggravating-Desk4004"}, {"x": 4, "y": 1, "c": "lapsed", "s": "unknown", "h": "u/rsweb"}, {"x": 1, "y": 6, "c": "regular", "s": "unknown", "h": "@London_W4"}, {"x": 7, "y": 9, "c": "mission", "s": "unknown", "h": "@Jojo_agboola"}, {"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/grand_web"}, {"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/claudiav2603"}, {"x": 7, "y": 4, "c": "lapsed", "s": "defects", "h": "u/Username8831"}], "worked": ["u/jamesshovlin", "u/Inge_Jones", "u/Vermathorax", "u/rising_then_falling", "u/Peppy_Tomato", "Kenjenny"]}
```
<!-- /generated:chart -->

<!-- generated:groups -->
| Group | Posts | People | Centre (need, breaks) | Sources | Where it broke | What they did next |
| --- | --- | --- | --- | --- | --- | --- |
| Sam, the mission shopper | 11 | 11 | 9.2, 7.9 | West London 4, London 3, UK-wide 3, X/TikTok 1 | information 7, availability 4 | unknown 8, defects 2, persists 1 |
| Dan, the lapsed local | 6 | 6 | 5.5, 1.5 | UK-wide 3, West London 2, London 1 | access 5, value 1 | defects 3, unknown 3 |
| Ruth, the regular | 4 | 4 | 3.2, 6.8 | UK-wide 1, London 1, West London 1, X/TikTok 1 | availability 3, information 1 | persists 2, unknown 2 |
| Nothing broke (not clustered) | 6 | 6 | – | London 3, UK-wide 2, West London 1 | none 6 | unknown 4, persists 1, defects 1 |
<!-- /generated:groups -->

How the scores and clusters were calculated: [method](method.md).

## Sam, the mission shopper

**Specific item, often a deadline · couldn't find out, or it wasn't there.** The largest and clearest cluster: 11 posts from 11 people, 8 of them with a deadline.

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
| **Pains** | No stock or hours information he trusts. Wasted trips, sold-out shelves. |
| **Gains** | Knowing before leaving. Getting it today. |
| **Influencers** | Reddit threads, WhatsApp restock groups, AI chatbots. |
| **For the brief** | Findability. The question is "who has it, right now?" |

## Dan, the lapsed local

**Mostly routine shopping · couldn't get it.** Six posts. Hours that clash with work, cash only, a delivery that can't arrive in time, a price not worth it. Half of them show him giving up on local.

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
| **Use cases** | Independents shut when he finishes work. The butcher for anniversaries, the supermarket for the week. Cash-only stalls. |
| **Pains** | Opening hours that match his working hours. A local premium with no extra convenience. |
| **Gains** | Always open, no surprises. |
| **Influencers** | Habit: Amazon, the supermarket. |
| **For the brief** | Transaction. Collection out of hours, card payment, or delivery from the local shop. |

## Ruth, the regular

**Routine shopping · the shop wasn't there.** Four posts, the thinnest cluster. She keeps going to local shops, but the butcher closes, the post office goes and the street thins out.

```quote
text: Having to go to Chiswick is a pain though.
handle: u/mjfh2
network: Reddit · r/london
date: 2025-09-17
url: https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/
tags: access-transport, decline-closure
context: Same thread; the nearest butcher is now a trip away.
status: verified
```

| | |
| --- | --- |
| **Jobs to be done** | Keep using the shops she relies on. |
| **Use cases** | A weekly butcher, shut on the day she went. The nearest butcher now a trip to Chiswick. Buying something at the newsagent each time she uses its post office counter. |
| **Pains** | Practical shops closing. Hours that aren't kept. |
| **Gains** | A relationship with the shop. Quality and special requests. |
| **Influencers** | Neighbours, local forums, council "shop local" campaigns. |
| **For the brief** | Neither problem, directly. She needs to know what's still there and open. That's a lighter form of findability. |

## Outside the map

Six posts where nothing broke: a favourite restaurant ordered through Deliveroo, a butcher who cuts to order, click and collect chosen for control over timing. They show the high street working, and they sit closest to Ruth.
