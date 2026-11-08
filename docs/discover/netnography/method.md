# Method

Discover collected data from three sources: desk research on the street, benchmarks of existing products, and posts by shoppers. For shoppers I needed evidence that I could gather in hours, for almost nothing, and check line by line. I used a netnography, reading what London shoppers already write in public about their high streets. What people write is mostly attitudinal, so the empathy map and the proto-personas rest on what people say they think and do. Nobody was observed.

```summary
Takeaways:
- One collection method, netnography: 42 short quotes, 41 checked against the live page.
- The data is attitudinal. It shows what people care about and how they tell their own story. It can't show how often things happen or what people do.
- The empathy map and the proto-personas inherit that limit.
Call:
- I chose netnography as the only method on shoppers (decision 015). It's a take-home, and it was the fastest and cheapest way to get evidence I could trace.
- I chose the networks, saved the Reddit pages the tools couldn't reach, and logged in to X and TikTok for a read-only pass (decisions 009 and 010).
- On a 0-to-1 product I wouldn't add more rounds of research before acting. I'd turn this into a hypothesis quickly and test it with people, which is where behavioural data would come from.
AI:
- A research agent searched, collected and tagged the posts. A script checked each Reddit quote against pages I saved.
- An agent ran the X and TikTok pass through my browser.
Trade-offs:
- What people say and what they do drift apart, and the posts already show it (in one Mumsnet thread, posters praise local shops and one says they end up shopping on Amazon).
- Reddit skews young and Mumsnet towards mothers. Reddit came through an archive, and TikTok gave captions only.
```

## Why netnography

People have already written a lot about their high streets, and every claim stays tied to a dated post that anyone can open. That made it the quickest way to get a base I could check.

## Attitudinal data

A post tells me what someone noticed, how they felt and what they say they did next. That is enough to see which problems people care about and the words they use for them. It doesn't tell me how often the problem happens, what the people who never post think, or whether they would behave as they say. The posts already show that gap: in one Mumsnet thread, posters say they want to support local shops, and one of them says they end up shopping on Amazon.

So the [empathy map](empathy-map.md) and the [proto-personas](../personas/index.md) describe how shoppers talk about the high street. They are a starting hypothesis about behaviour, still to be tested.

## With more time

On an established product I'd add behavioural data next: watching people on the street, or usage data. For something that doesn't exist yet, I'd go to a testable idea as fast as possible and put it in front of a few shoppers. Their reaction to a prototype is behavioural evidence, and it answers the questions the personas leave open (see [what to test first](../personas/index.md)).

## In numbers

| What | Count |
| --- | --- |
| Time window of the posts | May 2025 to November 2026 |
| Networks | 4: Reddit, Mumsnet, X and TikTok |
| Subreddits searched | 10: seven West London ones, plus r/london, r/AskUK and r/CasualUK |
| Search terms | 22 per subreddit, 5 on Mumsnet |
| Reddit pages saved by hand to check quotes | 217 posts and 21 full comment threads |
| Distinct quotes kept | 42. 41 matched against the live page; 1 only in a public archive |
| Quotes dropped at the live check | 2, removed by their authors |
| Quote cards in the findings | 39: 26 Reddit, 5 Mumsnet, 5 TikTok, 3 X |
| Codes and themes | 14 codes, 10 themes |
| Posts coded for the proto-personas | 44, of which 27 describe the poster's own shopping and 20 were clustered |

## Steps

1. **Question.** How do West London shoppers choose between local shops, chains and online, and where does finding something nearby break down?
2. **Sources.** Reddit and Mumsnet first, then X and TikTok, chosen with Kozinets' site criteria ([decision 009](../../decision-log.md)).
3. **Collection.** A research agent searched and saved public posts from May 2025 to November 2026, each with handle, date and link. Reddit blocked the tools, so the agent read it through Arctic Shift, a public research archive. I saved the matching live pages by hand so a script could check every quote.
4. **Tagging.** The agent gave each quote one to three labels from a list of 14, such as "stock-visibility" or "opening-hours", and grouped them into themes. Researchers call this coding; it has nothing to do with programming. An agent added a tenth theme from a short X and TikTok pass through my browser. That theme shows some promotional TikTok captions as a marked exception to the exclusion of promotional content.
5. **Output.** [Findings](findings.md), an [empathy map](empathy-map.md) in the Strategyzer format, and two [proposed dimensions](dimensions.md).

The framework, search terms, ethics and tag list are in [method in detail](method-details.md). Every step, including what went wrong, is in [how AI was used](../../process/ai-log.md).
