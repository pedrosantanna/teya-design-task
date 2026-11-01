# Method

A netnography: reading what London shoppers already say in public about their high streets. AI agents collected and coded the posts; I chose the sources and checked the evidence.

```summary
Takeaways:
- A fast, cheap evidence base: 77 short quotes, 76 checked against the live page.
- Good for what people care about, not for how often it happens.
Call:
- Netnography, because it builds evidence fast for a take-home. Reddit and Mumsnet first.
- Keep public handles so every quote can be checked. Keep quotes short.
AI:
- A research agent searched, collected and coded the posts. A script checked each Reddit quote against pages I saved.
- Claude ran the X and TikTok pass through my browser.
Trade-offs:
- Reddit skews young, Mumsnet towards mothers. Reddit came via an archive, and TikTok gave captions only.
```

## How it was done

1. **Question.** How do West London shoppers choose between local shops, chains and online, and where does finding something nearby break down?
2. **Sources.** Reddit and Mumsnet first, then X and TikTok. I chose them using Kozinets' site criteria ([decision 009](../../decision-log.md)).
3. **Collection.** A research agent searched and saved public posts from May 2025 to November 2026, each with handle, date and link. Reddit blocked the tools, so the agent read it through Arctic Shift, a public research archive. I saved the matching live pages by hand so a script could check every quote.
4. **Coding.** The agent tagged each quote with 14 codes and grouped them into themes. Claude added a tenth theme from a short X and TikTok pass through my browser.
5. **Output.** [Findings](findings.md), an [empathy map](empathy-map.md) in the Strategyzer format, and two [proposed dimensions](dimensions.md).

Every step, including what went wrong, is in [how AI was used](../../process/ai-log.md).

## Why netnography

It builds an evidence base fast and almost for free: people have already written a lot, and every claim stays traceable to a dated post. That suits a take-home. On a real product it would open discovery and point to where interviews and usage data should go next; we wouldn't decide on it alone ([decision 000](../../decision-log.md)).

## What it can't tell us

- How often something happens: people post when something annoys or pleases them.
- What people who don't post think, especially older and offline shoppers.
- Anything from shopkeepers, or a reaction to an app idea. Nobody was asked.

Full detail, including the framework, search terms, ethics and coding scheme: [method in detail](method-details.md).
