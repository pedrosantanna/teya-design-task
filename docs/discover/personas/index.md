# Proto-personas

Three proto-personas, found by plotting 21 tagged posts on two dimensions, need urgency and point of failure, and letting clusters form. Each persona is one cluster.

```summary
Takeaways:
- Sam (11 posts): needs a specific thing, often by a deadline, and can't find out who has it. This is the findability side.
- Jess (6 posts): mostly routine shopping that breaks on getting it: hours, cash, delivery time. She gives up on local. This is the transaction side.
- Ruth (4 posts): keeps shopping locally while her shops disappear. The thinnest of the three.
Call:
- Cluster the posts on two dimensions that speak to the brief, and define the personas from the clusters.
- Call them proto-personas: nobody was interviewed ([000](../../decision-log.md)).
AI:
- Two agents tagged every post separately, from a fixed list of labels. A script scored both dimensions and ran the clustering.
- I chose the dimensions and checked the clusters against the quotes.
Trade-offs:
- Small numbers (4 to 11 posts per cluster). These are directions to test in Define, not findings.
```

## The two dimensions

| Dimension | What it measures | Why I chose it |
| --- | --- | --- |
| **Need urgency** · browsing → needs it now | How specific and time-bound the shopper's need was: browsing, routine shopping, a specific item, or a specific item with a deadline. | It separates the occasions the netnography kept showing, from a casual wander to a same-day hunt. Each occasion asks something different of a product. |
| **Point of failure** · knowing → getting | Where the trip went wrong: couldn't find out (stock, hours, who sells it), the thing wasn't there, it wasn't worth the price, or couldn't get it (hours, payment, delivery time). | It maps straight onto the brief. Failures of knowing are a findability problem, and failures of getting are a transaction problem. |

Both are scored from tags that two agents applied separately and mostly agreed on (89–96%). More in [proposed dimensions](../netnography/dimensions.md).

## The map

<!-- generated:chart -->
```cluster-map
{"x": {"label": "Need urgency", "ticks": [[1, "Discovery"], [4, "Routine"], [7, "Specific item"], [10, "Specific + deadline"]], "min": "Browsing", "max": "Needs it now"}, "y": {"label": "Point of failure", "ticks": [[9, "Couldn't find out"], [6, "Wasn't there"], [4, "Not worth it"], [1, "Couldn't get it"]], "min": "Getting · transaction", "max": "Knowing · findability"}, "names": {"mission": "Sam, the mission shopper", "lapsed": "Jess, the lapsed local", "regular": "Ruth, the regular"}, "centres": {"mission": {"x": 9.2, "y": 7.9, "n": 11}, "lapsed": {"x": 5.5, "y": 1.5, "n": 6}, "regular": {"x": 3.2, "y": 6.8, "n": 4}}, "points": [{"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/jamesshovlin"}, {"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/akat224"}, {"x": 10, "y": 6, "c": "mission", "s": "persists", "h": "u/moanyjoany"}, {"x": 7, "y": 9, "c": "mission", "s": "defects", "h": "Dbank"}, {"x": 7, "y": 9, "c": "mission", "s": "unknown", "h": "u/dy14n19"}, {"x": 4, "y": 9, "c": "regular", "s": "persists", "h": "Valentando"}, {"x": 10, "y": 6, "c": "mission", "s": "defects", "h": "u/Mediocre_Sprinkles"}, {"x": 4, "y": 1, "c": "lapsed", "s": "defects", "h": "LividArse"}, {"x": 10, "y": 1, "c": "lapsed", "s": "unknown", "h": "u/WearyChampionship365"}, {"x": 10, "y": 6, "c": "mission", "s": "unknown", "h": "u/Miraclefish"}, {"x": 4, "y": 1, "c": "lapsed", "s": "unknown", "h": "FerrisWheelsandLilacs"}, {"x": 10, "y": 6, "c": "mission", "s": "unknown", "h": "u/xmastreee"}, {"x": 4, "y": 1, "c": "lapsed", "s": "defects", "h": "u/killmetruck"}, {"x": 4, "y": 6, "c": "regular", "s": "persists", "h": "u/mjfh2"}, {"x": 4, "y": 6, "c": "regular", "s": "unknown", "h": "u/Aggravating-Desk4004"}, {"x": 4, "y": 1, "c": "lapsed", "s": "unknown", "h": "u/rsweb"}, {"x": 1, "y": 6, "c": "regular", "s": "unknown", "h": "@London_W4"}, {"x": 7, "y": 9, "c": "mission", "s": "unknown", "h": "@Jojo_agboola"}, {"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/grand_web"}, {"x": 10, "y": 9, "c": "mission", "s": "unknown", "h": "u/claudiav2603"}, {"x": 7, "y": 4, "c": "lapsed", "s": "defects", "h": "u/Username8831"}], "worked": ["u/jamesshovlin", "u/Inge_Jones", "u/Vermathorax", "u/rising_then_falling", "u/Peppy_Tomato", "Kenjenny"]}
```
<!-- /generated:chart -->

<!-- generated:groups -->
| Group | Posts | People | Centre (urgency, failure) | Sources | Where it broke | What they did next |
| --- | --- | --- | --- | --- | --- | --- |
| Sam, the mission shopper | 11 | 11 | 9.2, 7.9 | West London 4, London 3, UK-wide 3, X/TikTok 1 | information 7, availability 4 | unknown 8, defects 2, persists 1 |
| Jess, the lapsed local | 6 | 6 | 5.5, 1.5 | UK-wide 3, West London 2, London 1 | access 5, value 1 | defects 3, unknown 3 |
| Ruth, the regular | 4 | 4 | 3.2, 6.8 | UK-wide 1, London 1, West London 1, X/TikTok 1 | availability 3, information 1 | persists 2, unknown 2 |
| Nothing broke (not clustered) | 6 | 6 | – | London 3, UK-wide 2, West London 1 | none 6 | unknown 4, persists 1, defects 1 |
<!-- /generated:groups -->

How the scores and clusters were calculated: [method](method.md).

**About the names and photos.** Each persona is one cluster. The names are labels: common British first names, short and easy to tell apart. The photos are stand-ins from Unsplash. The posts rarely say anyone's age or gender, so the names, pronouns and photos carry no evidence: treat them as labels. The one exception is Ruth's age, which comes from desk research. The attributes listed come from the posts in that cluster. I chose the genders to balance the set: two women and one man.

## Sam, the mission shopper

```persona
name: Sam, the mission shopper
tagline: Needs a specific thing, often by a deadline, and can't find out who has it.
image: img/sam.jpg
credit: Photo: Raymond Okoro, Unsplash
credit_url: https://unsplash.com/photos/man-in-coat-uses-phone-outside-a-building-20RwJn43ixM
- Where: Lives or works in West London
- Asks: Reddit, WhatsApp groups, AI chatbots
- Buys locally: A specific item, at short notice
```

| | |
| --- | --- |
| **Jobs to be done** | Find out which nearby shop has a specific item, before setting off. Get it in time. |
| **Use cases** | Eclipse glasses the day before. A fan in a heatwave. Whether a patisserie is still open. A website showing stock the shop didn't have. |
| **Pains** | No stock or hours information he trusts. Wasted trips, sold-out shelves. |
| **Gains** | Knowing before leaving. Getting it today. |
| **Influencers** | Reddit threads, WhatsApp restock groups, AI chatbots. |
| **For the brief** | Findability. The question is "who has it, right now?" |

#### Evidence

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

## Jess, the lapsed local

```persona
name: Jess, the lapsed local
tagline: Would use local shops if they fitted her week. They don't, so she's stopped.
image: img/jess.jpg
credit: Photo: Louis Zhang, Unsplash
credit_url: https://unsplash.com/photos/a-woman-sitting-in-a-train-looking-out-the-window-8czqNBTRcXI
- Where: London and elsewhere in the UK
- Week: At work during the hours the shops are open
- Pays: Card or phone, no cash
- Buys: Supermarket and Amazon for routine shopping
- Buys locally: Special occasions only
```

| | |
| --- | --- |
| **Jobs to be done** | Get routine shopping done with the least effort. |
| **Use cases** | Independents shut when she finishes work. The butcher for anniversaries, the supermarket for the week. Cash-only stalls. |
| **Pains** | Shops open only while she's at work. A local premium with no extra convenience. |
| **Gains** | Always open, no surprises. |
| **Influencers** | Habit: Amazon, the supermarket. |
| **For the brief** | Transaction. Collection out of hours, card payment, or delivery from the local shop. |

#### Evidence

**Mostly routine shopping · couldn't get it.** Six posts. Hours that clash with work, cash only, a delivery that can't arrive in time, a price not worth it. Half of them show her giving up on local.

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

## Ruth, the regular

```persona
name: Ruth, the regular
tagline: Keeps shopping locally while her shops close.
image: img/ruth.jpg
credit: Photo: Centre for Ageing Better, Unsplash
credit_url: https://unsplash.com/photos/elderly-woman-smiling-in-a-room-filled-with-clothes-UZCqtOcY8b4
- Where: Mostly West London: Kew, Ealing, Hammersmith
- Age: Probably 50 or over | desk research
- Routine: Weekly butcher, newsagent post-office counter
- When a shop closes: Travels further rather than switch
- Hears from: Neighbours, local forums
```

| | |
| --- | --- |
| **Jobs to be done** | Keep using the shops she relies on. |
| **Use cases** | A weekly butcher, shut on the day she went. The nearest butcher now a trip to Chiswick. Buying something at the newsagent each time she uses its post office counter. |
| **Pains** | Practical shops closing. Hours that aren't kept. |
| **Gains** | A relationship with the shop. Quality and special requests. |
| **Influencers** | Neighbours, local forums, council "shop local" campaigns. |
| **For the brief** | Neither problem, directly. She needs to know what's still there and open. That's a lighter form of findability. |

**Why 50 or over.** The posts don't say anyone's age, and Reddit skews young, so the age comes from desk research instead. In a 2018 YouGov poll for the GLA, Londoners aged 50–64 were the most likely to visit a high street weekly (61%, against 48–51% of under-50s) and to go for independent shops or markets (57% against 46–48%). Those aged 65 and over were the most likely to call high-street shops very important (64%, against 36% of 18–24s) ([GLA/YouGov, 2018](https://data.london.gov.uk/download/gla-poll-results-2018/f9749162-4ba4-4370-a01e-459cde67158d/October%25202018%2520GLA%2520YouGov%2520poll%2520results%2520.pdf)). Older shoppers also buy online less ([ONS, 2020](https://www.ons.gov.uk/peoplepopulationandcommunity/householdcharacteristics/homeinternetandsocialmediausage/bulletins/internetaccesshouseholdsandindividuals/2020)). The gaps are moderate and peak at 50–64, not 65+. No source measures loyalty to shops by age, and the FCA finds that digital exclusion and income, more than age itself, drive reliance on cash ([FCA, 2024](https://www.fca.org.uk/publication/research-notes/research-note-cash-reliance.pdf)). So her age is a supported guess, to test in interviews.

#### Evidence

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

## What to test first

These personas come from public posts, so they inherit who posts. Before Define commits to one of them, I want to check three things with five or six short interviews on King Street:

- **Ruth:** is routine, loyal local shopping mostly a habit of people over 50, as London polling suggests? And how do people who never post online find out what's still open?
- **Sam:** would a shop confirming "it's here, I'll hold it" be enough to make the trip?
- **Jess:** which matters more, opening hours, collection after hours or card payment?

## Outside the map

Six posts where nothing broke: a favourite restaurant ordered through Deliveroo, a butcher who cuts to order, click and collect chosen for control over timing. They show the high street working, and they sit closest to Ruth.
