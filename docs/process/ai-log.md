# How AI was used

I directed the work and made the decisions. AI agents did most of the collecting, coding, drafting and checking. This page records each step: what the agents were asked, what came back, and what was kept, thrown away or fixed.

## Who does what

| | Me | AI agents |
| --- | --- | --- |
| Direction | Sets the question, the method and the scope; decides at each step | Proposes options and records decisions |
| Research | Picks the networks, logs in where needed, saves pages the tools can't reach | Search, read, collect and date quotes; desk research |
| Analysis | Challenges the method, reviews results | Code posts, build tables and charts, run checks |
| Writing | Sets tone and rules; reviews | Drafts every page in English under the writing rules in `AGENTS.md` |

**Tools.** Claude Code is the main agent and runs subagents for parallel work. Codex is used for reviews and side tasks. Every agent reads `AGENTS.md`, which holds the shared rules.

## Log

### 1. Setting up
Claude Code set up the repo, the agent instructions and the decision log from my brief. I added two rules early: nothing outside the take-home goes in the repo, and everything is written in English with a human voice.

### 2. Three research agents in parallel
Each agent got a written brief: (A) a netnography of London shoppers with an empathy map, (B) benchmarks with user sentiment, (C) a desk review of the high street. Each brief set a 18-month window and the evidence format: verbatim, handle, date, link.

- **What came back:** about 60 coded quotes, 17 products with 59 quotes, and a dated landscape with around 35 figures.
- **What went wrong:** Reddit blocked every tool. Agent A read Reddit through Arctic Shift, a public research archive, and said so. X and TikTok needed a login.
- **What was fixed:** Agent C reported a change of Prime Minister and an October 2026 Budget that Claude couldn't confirm from its own knowledge. A writing agent later checked both against several sources. They held, with one correction: the new small-business rates threshold applies only to shops, hospitality and leisure.

### 3. Getting Reddit verified
Claude tried the Reddit API, the Chrome extension, the built-in browser and a Codex script. All were blocked. I saved 10 search pages and 21 threads by hand. A script matched every Reddit quote against those saves.

- **Kept:** 68 of 69 quotes matched the live site.
- **Thrown away:** two quotes whose posts had been removed.

### 4. Writing the pages
Two writing agents turned the research into pages. Rules: quotes of 25 words at most, and fact kept apart from interpretation. Claude wrote the overview and checked links, rendering and quote fields with scripts.

### 5. X and TikTok
I logged in to X and TikTok in Chrome. Claude searched both through my session, read only. TikTok comments wouldn't load for the tools, so only captions were used. Posts that used the high street for racial or political arguments were read and left out.

### 6. Personas, first version, then rebuilt
- **First version:** Claude wrote five personas and placed them on a chart with a scoring rubric.
- **Review:** I asked for an independent review. A reviewer agent, given only the files, found the chart circular. The personas had been assigned by hand before scoring, so the chart could only confirm them. It also showed that two of the five couldn't be told apart.
- **My fix:** code the posts first, then let the groups appear.
- **Rebuilt:** Claude wrote a new codebook and coded 44 posts. A second agent coded them blind, without seeing Claude's codes. Agreement was high on four fields and weaker on stance (kappa 0.55). Disagreements were resolved by written rules.
- **Result:** one strong proto-persona and two thin ones, where there had been five. See [method](../discover/personas/method.md).

## What AI did badly here

- **Started building before the method was right.** The first personas looked finished but were circular. A separate reviewer caught it; the first draft didn't.
- **Wrote as if a lone human researcher did the work.** The method pages hid the agents until I pointed it out.
- **Couldn't reach key sources.** Reddit, TikTok comments and Nextdoor. The workaround (an archive plus pages saved by hand) cost me time.
- **Trimmed quotes too far at first.** Some Trustpilot quotes came back cut down by a summarising tool and had to be re-fetched or dropped.
