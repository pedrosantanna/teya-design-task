# Method

How we listened to London shoppers talking about their high streets in public: a netnography following Robert Kozinets, read through the Strategyzer empathy map. Fieldwork ran over posts from 1 May 2025 to 1 November 2026, anchored on Hammersmith and its West London neighbours, and every claim on the following pages traces back to a dated, linked quote.

## What netnography is

Netnography is Kozinets' name for qualitative research on social media that tries to understand the culture visible in people's posts, threads and traces, run as a defined procedure rather than as loose "ethnography online" ([Kozinets 2020, *Netnography: The Essential Guide*, 3rd ed., publisher preview](https://api.pageplace.de/preview/DT0400.9781526482365_A37042502/preview-9781526482365_A37042502.pdf)). [Fenton and Parry](https://eprints.bournemouth.ac.uk/37932/) summarise its four defining elements: a cultural focus, social-media data, immersive engagement by the researcher, and a set of practices for doing it. The book describes six procedural movements; the names below follow later papers such as [Kozinets and Gretzel (2024)](https://doi.org/10.1016/j.annals.2023.103693), where the last one is called incarnation rather than instantiation.

| Movement | What it involves | What we did |
| --- | --- | --- |
| Initiation | Frame the question, plan sites, clear ethics | Wrote the research question; public posts only |
| Investigation | Find and save existing traces | Searched local and London subreddits and Mumsnet; saved threads with timestamps |
| Interaction | Talk to people (optional) | None. We only read |
| Immersion | Keep a reflective journal while reading | Running notes over about 30 threads and 3,000 comments |
| Integration | Code, theme, interpret | 14 codes, 10 themes, an empathy map, two dimensions |
| Incarnation | Communicate the findings | These four pages |

## Where we looked

Kozinets asks that a field site be relevant, active, interactive, substantial, heterogeneous and rich in descriptive data. We added one rule of our own: public content only. Decision [009](../../decision-log.md) records the choice.

- **Reddit** was the primary site. Local subs (r/HammersmithandFulham, r/hammersmith, r/chiswick, r/shepherdsbush, r/fulham, r/ealing, r/acton) are thin, so most West London voices came from r/london threads about the area, plus r/AskUK and r/CasualUK for a few UK-wide contrasts.
- **Mumsnet** gave long-form, first-person threads that are readable without an account. It skews towards mothers and rarely says where posters live.
- **X and TikTok** were read in a second pass on 1 November 2026, through the author's logged-in browser, read only. X search was limited to the window with `since:` and `until:`; TikTok dates come from the video ID, which encodes the upload time. TikTok comments could not be read by the tools, so TikTok evidence is video captions, written by creators and by shops. Both produced far less shopper talk than Reddit; theme 10 in the [findings](findings.md) covers what they did show.
- **Instagram and Nextdoor** were not collected. Nextdoor is probably where Hammersmith residents ask "is X open" most, so its absence is the biggest gap. Facebook groups were excluded as closed.

**How Reddit was read.** reddit.com refused every automated route we tried (fetch, embedded browser, curl). Reddit content was read through the [Arctic Shift](https://arctic-shift.photon-reddit.com/) public archive, which returns each post or comment with its author, timestamp and ID. The author then saved 217 posts from live Reddit search and 21 full comment threads on 1 November 2026, and `scripts/verify_reddit_quotes.py` matched every quote's text, author and date against them. Two quotes were dropped because the live check showed them removed. Each quote card carries a status:

- `verified`: text, author and date match the live-Reddit save, or the quote was read directly on Mumsnet, X or TikTok.
- `archive`: collected from Arctic Shift and not matched against the live site. One quote is in this state, because its comment sits in a part of the thread the save didn't load.

## The empathy map we used

We used the six-box version from Osterwalder and Pigneur's *Business Model Generation* ([pp. 130–131](https://relayto.com/explore/business-model-generation-flipbook-r2k3tfx35p0cg/J1RVxTlK137)), which they credit to Dave Gray and XPLANE. Gray later [revised it](https://medium.com/the-xplane-collection/46df22df3c8a) with a goal box and without pains and gains; we kept the older canvas because pains and gains map straight onto product decisions.

| Box | Prompt |
| --- | --- |
| See | What does their environment look like, and what offers and problems do they meet? |
| Hear | Who and what influences them? |
| Think and feel | What matters to them that they might not say in public? What worries them? |
| Say and do | How do they act in public, and where does that clash with what they think? |
| Pains | Frustrations, obstacles, risks they fear |
| Gains | What they want, and how they measure success |

## How it was applied

**Question.** How do London high-street shoppers, Hammersmith and West London first, decide between local independents, chains and online, and where does finding out "what's available nearby right now" break down?

**Search terms**, per subreddit and limited to the window: `high street`, `independent`, `shops`, `local shop(s)`, `Amazon`, `cash only`, `click and collect`, `King Street`, `Hammersmith`, `Shepherd`, `Chiswick`, `Fulham`, `Broadway`, `high road`, `butcher`, `hardware`, `corner shop`, `open on Sunday`, `open late`, `in stock`, `where can I buy`, `Westfield`. Mumsnet was searched for `high street`, `independent shops`, `Amazon`, `Hammersmith` and `Chiswick High Road`.

**Included:** posts dated 1 May 2025 to 1 November 2026 by platform timestamp; public and readable without logging in; a first-person shopper voice or a direct observation of local shopping; a handle and URL we could check.

**Excluded:** shop-owner promotion, news posts with no shopper voice, deleted content, anything undated or older than the window (several strong Mumsnet threads about Hammersmith and Chiswick from 2019 to 2024 were dropped for this), and restaurant reviews unless they touch on supporting local or delivery.

**Geography.** Each quote is labelled West London, London-wide or UK-wide. UK-wide quotes were capped at about a sixth of the set and only used to sharpen something the London data already showed.

**Coding.** Open coding produced 14 codes. Each quote got one to three. Codes were then clustered into nine themes from Reddit and Mumsnet, plus a tenth from the X and TikTok pass, with strength judged on how many quotes, how many networks, how recent, and how specific to West London.

| Code | Meaning |
| --- | --- |
| `stock-visibility` | Not knowing whether a nearby shop has the item; phoning, asking around |
| `opening-hours` | Not knowing whether a shop is open; hours that don't fit; Google or Facebook wrong |
| `urgency` | A specific, time-boxed need |
| `online-default` | Giving up and ordering online |
| `delivery-collect` | Click and collect, Deliveroo, delivery, parcel points |
| `discovery` | How people find shops: Reddit, Google, word of mouth |
| `chains-vs-indie` | Comparing independents and chains |
| `support-local` | The moral pull to "use them or lose them" |
| `price` | Local premium, price comparison |
| `expertise-range` | What only independents offer: range, cuts, advice |
| `decline-closure` | Closures, vacancies, lost shops |
| `place-identity` | What a high street means to the people who use it |
| `cash-card` | Cash-only friction |
| `access-transport` | Parking, travel, Hammersmith Bridge |

## Ethics

Everything quoted was public and readable without an account, and nobody was contacted. Closed groups and private accounts were left out. Handles stay next to quotes because the link already exposes them and it lets anyone check the evidence (decision [006](../../decision-log.md)). Kozinets warns that pseudonymous handles can be traced back to people, so quotes are kept short (under about 25 words, trimmed with "…", never paraphrased or stitched), and none of the topics are sensitive.

## Limits and skews

- **Reddit skews younger, male and renting**, and upvotes reward wit and complaint. Mumsnet skews mothers.
- **Older, cash-preferring and offline shoppers are missing**, and they may be the people who use the high street most.
- **No interactive data.** Nobody was asked about an app; everything is what people said unprompted.
- **Local subs are quiet.** r/hammersmith and r/shepherdsbush had two posts each in the window, so "Hammersmith" evidence leans on r/london threads about it.
- **A few events dominate.** The August 2026 eclipse and the June 2026 heatwave produced most of the urgent-stock posts. We read them as natural experiments in finding local stock fast, and that reading is our interpretation.
- **TikTok is captions only.** Comments, where shoppers talk back, couldn't be read, and captions are written to promote a place or a shop.

Next: [findings](findings.md), the [empathy map](empathy-map.md) and the [proposed dimensions](dimensions.md). Full link list in [sources](../sources.md).
