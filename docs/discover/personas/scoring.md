# Method and scoring

How the personas were built and how each one was placed on the two [proposed dimensions](../netnography/dimensions.md). Every number on this page comes from coding the netnography quotes against a fixed rubric, so anyone can check the placement or change it.

## The persona method

We used the persona/user profile tool from Michael Lewrick, Patrick Link and Larry Leifer ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), Wiley, 2018, and [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), Wiley, 2020). In that approach a persona is a fictional person built from research about real people. It describes the jobs they are trying to get done, the situations they are in, what gets in their way and what they hope to gain, and it is expected to change as the team learns more. It sits next to the empathy map in the "understand" phase, which is where we are.

Our template takes those elements and adds two of our own:

| Field | What it holds |
| --- | --- |
| Who | A short sketch. Details not found in the evidence (age, job) are marked as illustrative. |
| Jobs to be done | What they are trying to get done when they think of the high street |
| Use cases | Real situations from the quotes |
| Pains and gains | What blocks them and what success looks like to them |
| Influencers | Who and what they listen to |
| Trends | Changes from [the high street today](../high-street-landscape.md) that affect them |
| Position *(ours)* | Their score on the two dimensions, computed below |
| What would move them *(ours)* | What the evidence suggests they would need, to be tested in Define |

The field list is our adaptation of the tool, not a copy of the book's canvas.

## Why score the quotes

Personas often get placed on a chart by feel. We wanted the placement to follow from what people actually wrote. So each quote from the netnography was coded against a rubric of observable indicators, the codes were turned into a score on each axis, and each persona sits at the average of the quotes behind it.

## The rubric

**Need: browse ↔ mission.** How specific and time-bound the need in the quote is.

<!-- generated:rubric-x -->
| Code | Side | Points | Indicator |
| --- | --- | --- | --- |
| M1 | mission | 3 | Names a specific item, shop or service they need |
| M2 | mission | 3 | States a deadline or time pressure (today, asap, before an event) |
| M3 | mission | 2 | Checks or asks about availability before or during the trip |
| M4 | mission | 2 | Switches channel to get it in time (delivery, online, another area) |
| B1 | browse | 4 | No specific item: exploring, hunting for finds or bargains |
| B2 | browse | 3 | Talks about the place, its mix or atmosphere rather than an item |
| B3 | browse | 3 | Recurring or flexible timing (weekly, Saturdays, special occasions) |
<!-- /generated:rubric-x -->

**Effort for local: pragmatist ↔ committed.** How much friction the person accepts to use local shops.

<!-- generated:rubric-y -->
| Code | Side | Points | Indicator |
| --- | --- | --- | --- |
| C1 | committed | 3 | States a reason to support local shops (loyalty, community, keeping them open) |
| C2 | committed | 3 | Keeps buying local despite a cost: higher price, odd hours, a wasted trip |
| C3 | committed | 2 | Goes out of their way: travels further, calls ahead, tries several shops |
| C4 | committed | 2 | Values something only independents give: advice, custom cuts, range |
| P1 | pragmatist | 4 | Falls back to online, a chain or a supermarket after friction |
| P2 | pragmatist | 3 | Makes convenience, hours or price the condition for using local |
| P3 | pragmatist | 3 | Has stopped using the local high street or steers others away |
<!-- /generated:rubric-y -->

**From codes to a score.** Each axis starts at 5, the midpoint, and moves half a point for every rubric point on either side, within 0 to 10:

- Need = 5 + (mission points − browse points) ÷ 2
- Effort = 5 + (committed points − pragmatist points) ÷ 2

A quote with no indicator on an axis stays at 5 on it. The heaviest single indicators (B1, P1) are the ones that most clearly show the person's position: having no item in mind, or giving up on local.

**Coding rules.** A quote is coded from the full post it came from, including the context line, not only the short excerpt shown on the page. Each quote is assigned to the one persona it fits best. Quotes that don't describe the poster's own shopping are left out.

## Where the personas land

<!-- generated:chart -->
```persona-map
{"x": {"min": "Browse", "max": "Mission", "label": "How specific and urgent the need is"}, "y": {"min": "Pragmatist", "max": "Committed", "label": "How much effort they spend on local"}, "groups": {"deadline": "Sam, the deadline shopper", "willing": "Tom, the willing local", "regular": "Ruth, the regular", "lapsed": "Dan, the lapsed browser", "finds": "Priya, the finds hunter"}, "points": [{"x": 7.5, "y": 6.0, "group": "deadline", "label": "u/jamesshovlin"}, {"x": 7.5, "y": 6.0, "group": "deadline", "label": "u/jamesshovlin"}, {"x": 10.0, "y": 5.0, "group": "deadline", "label": "u/akat224"}, {"x": 9.0, "y": 6.0, "group": "deadline", "label": "u/moanyjoany"}, {"x": 9.0, "y": 5.0, "group": "deadline", "label": "u/WearyChampionship365"}, {"x": 9.0, "y": 5.0, "group": "deadline", "label": "u/Miraclefish"}, {"x": 8.5, "y": 5.0, "group": "deadline", "label": "@Jojo_agboola"}, {"x": 9.0, "y": 5.0, "group": "deadline", "label": "u/grand_web"}, {"x": 9.0, "y": 5.0, "group": "deadline", "label": "u/claudiav2603"}, {"x": 7.5, "y": 5.0, "group": "deadline", "label": "u/dy14n19"}, {"x": 10.0, "y": 5.5, "group": "willing", "label": "Dbank"}, {"x": 8.5, "y": 4.0, "group": "willing", "label": "u/Mediocre_Sprinkles"}, {"x": 7.5, "y": 9.0, "group": "willing", "label": "u/xmastreee"}, {"x": 6.5, "y": 6.5, "group": "willing", "label": "FerrisWheelsandLilacs"}, {"x": 6.5, "y": 5.5, "group": "willing", "label": "u/mjfh2"}, {"x": 6.5, "y": 4.5, "group": "willing", "label": "u/Peppy_Tomato"}, {"x": 3.5, "y": 8.0, "group": "regular", "label": "Valentando"}, {"x": 3.5, "y": 8.0, "group": "regular", "label": "Valentando"}, {"x": 3.5, "y": 8.0, "group": "regular", "label": "u/Inge_Jones"}, {"x": 3.5, "y": 7.5, "group": "regular", "label": "u/abitofasitdown"}, {"x": 3.5, "y": 6.0, "group": "regular", "label": "u/Accomplished-Pen2660"}, {"x": 3.5, "y": 7.5, "group": "regular", "label": "u/Vermathorax"}, {"x": 3.5, "y": 6.0, "group": "regular", "label": "u/rising_then_falling"}, {"x": 3.5, "y": 8.0, "group": "regular", "label": "u/Aggravating-Desk4004"}, {"x": 3.5, "y": 8.0, "group": "regular", "label": "@OpenChiswickW4"}, {"x": 3.5, "y": 6.5, "group": "regular", "label": "u/Greg-Normal"}, {"x": 5.0, "y": 2.0, "group": "lapsed", "label": "Agix"}, {"x": 3.5, "y": 1.5, "group": "lapsed", "label": "LividArse"}, {"x": 5.0, "y": 5.0, "group": "lapsed", "label": "LividArse"}, {"x": 3.5, "y": 3.0, "group": "lapsed", "label": "u/killmetruck"}, {"x": 3.5, "y": 3.5, "group": "lapsed", "label": "u/Outside-Assignment85"}, {"x": 3.5, "y": 3.5, "group": "lapsed", "label": "@London_W4"}, {"x": 3.0, "y": 1.5, "group": "lapsed", "label": "Kenjenny"}, {"x": 5.0, "y": 3.5, "group": "lapsed", "label": "u/Username8831"}, {"x": 5.0, "y": 3.5, "group": "lapsed", "label": "u/rsweb"}, {"x": 1.5, "y": 5.0, "group": "finds", "label": "u/No_Witness9533"}, {"x": 3.5, "y": 6.0, "group": "finds", "label": "u/JollyExPat"}, {"x": 1.5, "y": 6.0, "group": "finds", "label": "@loveandlondon"}, {"x": 3.0, "y": 6.0, "group": "finds", "label": "@hollygardnerx"}, {"x": 3.0, "y": 5.0, "group": "finds", "label": "@tafsonthemove"}], "personas": [{"id": "deadline", "x": 8.6, "y": 5.3, "label": "Sam, the deadline shopper", "n": 10}, {"id": "willing", "x": 7.6, "y": 5.8, "label": "Tom, the willing local", "n": 6}, {"id": "regular", "x": 3.5, "y": 7.3, "label": "Ruth, the regular", "n": 10}, {"id": "lapsed", "x": 4.1, "y": 3.0, "label": "Dan, the lapsed browser", "n": 9}, {"id": "finds", "x": 2.5, "y": 5.6, "label": "Priya, the finds hunter", "n": 5}]}
```
<!-- /generated:chart -->

<!-- generated:placement -->
| Persona | Quotes | Need (0 browse → 10 mission) | Effort (0 pragmatist → 10 committed) |
| --- | --- | --- | --- |
| Sam, the deadline shopper | 10 | 8.6 | 5.3 |
| Tom, the willing local | 6 | 7.6 | 5.8 |
| Ruth, the regular | 10 | 3.5 | 7.3 |
| Dan, the lapsed browser | 9 | 4.1 | 3.0 |
| Priya, the finds hunter | 5 | 2.5 | 5.6 |
<!-- /generated:placement -->

## Every scored quote

<!-- generated:quote-scores -->
| Quote | Date | Codes | Need | Effort | Persona |
| --- | --- | --- | --- | --- | --- |
| [u/akat224](https://www.reddit.com/r/london/comments/1ueg96t/) | 2026-06-24 | M1 M2 M3 M4 | 10 | 5 | Sam |
| [u/moanyjoany](https://www.reddit.com/r/Ealing/comments/1vlcuor/comment/p30r2af/) | 2026-08-11 | M1 M2 M3 C3 | 9 | 6 | Sam |
| [u/WearyChampionship365](https://www.reddit.com/r/Ealing/comments/1vlc46x/comment/p30rnx7/) | 2026-08-11 | M1 M2 M4 | 9 | 5 | Sam |
| [u/Miraclefish](https://www.reddit.com/r/london/comments/1ueg96t/comment/otjhcgo/) | 2026-06-24 | M1 M2 M3 | 9 | 5 | Sam |
| [u/grand_web](https://www.reddit.com/r/chiswick/comments/1vlibmn/) | 2026-08-11 | M1 M2 M3 | 9 | 5 | Sam |
| [u/claudiav2603](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2y26dy/) | 2026-08-11 | M1 M2 M3 | 9 | 5 | Sam |
| [@Jojo_agboola](https://x.com/Jojo_agboola/status/2112618905525276980) | 2026-10-20 | M1 M3 M4 | 8.5 | 5 | Sam |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tdld2/) | 2026-08-10 | M1 M3 C3 | 7.5 | 6 | Sam |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tb0s2/) | 2026-08-10 | M1 M3 C3 | 7.5 | 6 | Sam |
| [u/dy14n19](https://www.reddit.com/r/HammersmithandFulham/comments/1myug4c/) | 2025-08-24 | M1 M3 | 7.5 | 5 | Sam |
| [u/JollyExPat](https://www.reddit.com/r/london/comments/1tatyc0/comment/olc54ib/) | 2026-05-12 | B2 C3 | 3.5 | 6 | Priya |
| [@hollygardnerx](https://www.tiktok.com/@hollygardnerx/video/7578215485968354582) | 2025-11-29 | B1 C3 | 3 | 6 | Priya |
| [@tafsonthemove](https://www.tiktok.com/@tafsonthemove/video/7503202705293266198) | 2025-05-11 | B1 | 3 | 5 | Priya |
| [u/No_Witness9533](https://www.reddit.com/r/london/comments/1vr9i0n/comment/p4bxk0e/) | 2026-08-18 | B1 B2 | 1.5 | 5 | Priya |
| [@loveandlondon](https://www.tiktok.com/@loveandlondon/video/7509933373075492118) | 2025-05-29 | B1 B2 C3 | 1.5 | 6 | Priya |
| [Agix](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148976563) | 2025-12-05 | P2 P3 | 5 | 2 | Dan |
| [LividArse](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221) | 2025-12-05 | C1 P2 | 5 | 5 | Dan |
| [u/Username8831](https://www.reddit.com/r/Ealing/comments/1v6423y/comment/oznttbd/) | 2026-07-25 | C1 P2 P3 | 5 | 3.5 | Dan |
| [u/rsweb](https://www.reddit.com/r/AskUK/comments/1my0t02/comment/na8v8ju/) | 2025-08-23 | P2 | 5 | 3.5 | Dan |
| [LividArse](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221) | 2025-12-05 | B3 P1 P2 | 3.5 | 1.5 | Dan |
| [u/killmetruck](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/) | 2026-06-07 | B3 C1 P1 P2 | 3.5 | 3 | Dan |
| [u/Outside-Assignment85](https://www.reddit.com/r/london/comments/1vr9i0n/comment/p4brlc4/) | 2026-08-18 | B2 P3 | 3.5 | 3.5 | Dan |
| [@London_W4](https://x.com/London_W4/status/2102723893463044506) | 2026-09-23 | B2 P3 | 3.5 | 3.5 | Dan |
| [Kenjenny](https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334270) | 2026-03-27 | B1 P1 P3 | 3 | 1.5 | Dan |
| [Valentando](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465) | 2025-12-05 | B3 C1 C2 | 3.5 | 8 | Ruth |
| [Valentando](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465) | 2025-12-05 | B3 C1 C2 | 3.5 | 8 | Ruth |
| [u/Inge_Jones](https://www.reddit.com/r/Ealing/comments/1x3g7ci/comment/pfbvje4/) | 2026-10-11 | B3 C1 C2 | 3.5 | 8 | Ruth |
| [u/abitofasitdown](https://www.reddit.com/r/london/comments/1niwnlw/) | 2025-09-16 | B2 C1 C4 | 3.5 | 7.5 | Ruth |
| [u/Accomplished-Pen2660](https://www.reddit.com/r/Ealing/comments/1ug10pv/comment/oty3pvk/) | 2026-06-26 | B2 C4 | 3.5 | 6 | Ruth |
| [u/Vermathorax](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq989gy/) | 2026-06-07 | B3 C2 C4 | 3.5 | 7.5 | Ruth |
| [u/rising_then_falling](https://www.reddit.com/r/london/comments/1niwnlw/comment/nema5k6/) | 2025-09-17 | B3 C4 | 3.5 | 6 | Ruth |
| [u/Aggravating-Desk4004](https://www.reddit.com/r/Ealing/comments/1xjkdgb/) | 2026-10-31 | B3 C1 C2 | 3.5 | 8 | Ruth |
| [@OpenChiswickW4](https://x.com/OpenChiswickW4/status/2069295025561760040) | 2026-06-23 | B3 C1 C2 | 3.5 | 8 | Ruth |
| [u/Greg-Normal](https://www.reddit.com/r/london/comments/1niwnlw/comment/neo7ha3/) | 2025-09-17 | B3 C1 | 3.5 | 6.5 | Ruth |
| [Dbank](https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334565) | 2026-03-27 | M1 M2 M3 M4 C1 C3 P1 | 10 | 5.5 | Tom |
| [u/Mediocre_Sprinkles](https://www.reddit.com/r/CasualUK/comments/1n23ixq/comment/nb2z980/) | 2025-08-28 | M1 M3 M4 C3 P1 | 8.5 | 4 | Tom |
| [u/xmastreee](https://www.reddit.com/r/CasualUK/comments/1n23ixq/comment/nb31nms/) | 2025-08-28 | M1 M3 C1 C2 C3 | 7.5 | 9 | Tom |
| [FerrisWheelsandLilacs](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148976658) | 2025-12-05 | M1 C1 C2 P2 | 6.5 | 6.5 | Tom |
| [u/mjfh2](https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/) | 2025-09-17 | M1 C3 C4 P2 | 6.5 | 5.5 | Tom |
| [u/Peppy_Tomato](https://www.reddit.com/r/AskUK/comments/1rn7npv/comment/o94plrm/) | 2026-03-07 | M1 C3 P2 | 6.5 | 4.5 | Tom |
<!-- /generated:quote-scores -->

### Left out

<!-- generated:excluded -->
| Quote | Why it is not scored |
| --- | --- |
| u/squeakyeggs | Speaks for a shop owner's family, not as a shopper |
| u/sd_1874 | Opinion on chains, no shopping behaviour described |
| u/Rhubarbatross | About the bridge and traffic, not shopping |
| u/anonypanda | About the bridge and traffic, not shopping |
| @stillshipping | Market commentary, not a shopper's own behaviour |
| @hackneyfleamarket | Written by the market organiser |
<!-- /generated:excluded -->

## Limits

- **One coder.** The codes were assigned once, by us, with no second coder to check agreement. Change a code in `docs/discover/personas/scores.json` and run `python3 scripts/score_personas.py` to see how much a placement moves.
- **Quotes are moments, not people.** A quote shows one situation. The same person can be on a mission on Tuesday and browsing on Saturday, and LividArse appears twice with different scores.
- **Sam and Tom sit close together.** The two mission personas differ by one point on need and half a point on effort. What separates them is motive: Tom says he wants to buy local, Sam doesn't care which shop. The rubric captures that only through C1, so treat the split as a hypothesis.
- **Small numbers.** Five to ten quotes per persona. The averages show direction, not precision.
- **Who is missing.** Older and offline shoppers barely appear in the netnography, so no persona speaks for them.
