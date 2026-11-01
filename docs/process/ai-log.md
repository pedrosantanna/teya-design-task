# How AI was used

I directed the work and made the decisions. AI agents did most of the collecting, coding, drafting and checking. This page records each step: what the agents were asked, what came back, and what was kept, thrown away or fixed.

## Who does what

| | Me | AI agents |
| --- | --- | --- |
| Direction | Sets the question, the method and the scope; decides at each step | Proposes options and records decisions |
| Research | Picks the networks, logs in where needed, saves pages the tools can't reach | Search, read, collect and date quotes; desk research |
| Analysis | Challenges the method, reviews results | Code posts, build tables and charts, run checks |
| Writing | Sets tone and rules; reviews | Drafts every page in English under the writing rules in `AGENTS.md` |

**Tools.** A main agent runs subagents for parallel work. A second agent is used for reviews and side tasks. Every agent reads `AGENTS.md`, which holds the shared rules.

## Log

### 1. Setting up
An agent set up the repo, the agent instructions and the decision log from my brief. I added two rules early: nothing outside the take-home goes in the repo, and everything is written in English with a human voice.

### 2. Three research agents in parallel
Each agent got a written brief: (A) a netnography of London shoppers with an empathy map, (B) benchmarks with user sentiment, (C) a desk review of the high street. Each brief set an 18-month window and the evidence format: verbatim, handle, date, link.

- **What came back:** about 60 coded quotes (about 40 made it onto the findings page), 17 products with 59 quotes, and a dated landscape with around 35 figures.
- **What went wrong:** Reddit blocked every tool. Agent A read Reddit through Arctic Shift, a public research archive, and said so. X and TikTok needed a login.
- **What was fixed:** Agent C reported a change of Prime Minister and an October 2026 Budget that the main agent couldn't confirm from its own knowledge. A writing agent later checked both against several sources. They held, with one correction: the new small-business rates threshold applies only to shops, hospitality and leisure.

### 3. Getting Reddit verified
The agents tried the Reddit API, two browsers and a script run by the second agent. All were blocked. I saved 10 search pages and 21 threads by hand. A script matched every Reddit quote against those saves.

- **Kept:** 68 of the 69 Reddit quotes collected at that point matched the live site.
- **Thrown away:** two quotes whose posts had been removed.

### 4. Writing the pages
Two writing agents turned the research into pages. Rules: quotes of 25 words at most, and fact kept apart from interpretation. The main agent wrote the overview and checked links, rendering and quote fields with scripts.

### 5. X and TikTok
I logged in to X and TikTok in Chrome. An agent searched both through my session, read only. TikTok comments wouldn't load for the tools, so only captions were used. Posts that used the high street for racial or political arguments were read and left out.

### 6. Proto-personas
- **Method:** I set it. Code the posts, score them on two dimensions that map onto the brief, cluster, then describe each cluster as a persona.
- **Tagging:** an agent wrote the codebook and tagged 44 posts. A second agent coded them blind. Agreement was high on the codes behind both dimensions (kappa 0.85–0.93) and weaker on what people did next (0.55). Written rules settled the disagreements.
- **Review:** before the method was settled, a reviewer agent read the files cold. It found a first draft circular, because personas had been assigned before scoring. That draft was thrown away.
- **Result:** three clusters, so three proto-personas. See [method](../discover/personas/method.md).

### 7. Coherence review
I asked a reviewer agent to read every page in order and fix what didn't hold together. It rewrote unclear "My call" boxes as real decisions, removed leftovers from earlier drafts and stale counts, and fixed contradictions between pages. It also took out personal details and sent me six open questions. I answered them; the main agent applied the answers.

### 8. Benchmarks re-sorted around the proto-personas
An agent re-sorted the 17 benchmarks against Sam, Dan and Ruth: 11 directly relevant, 6 related. Every product a persona already uses is backed by a post. Where there was no post, it is marked as an option the persona doesn't use yet.

### 9. Design pass
A design agent researched common "AI slop" patterns in interface design and polished the docs site against them, in the same neutral style.

## What AI did badly here

- **Built before the method was right.** A first persona draft looked finished but was circular. The reviewer agent caught it; the agent that wrote it didn't.
- **Wrote as if a lone human researcher did the work.** The method pages hid the agents until I pointed it out.
- **Couldn't reach key sources.** Reddit, TikTok comments and Nextdoor. The workaround (an archive plus pages saved by hand) cost me time.
- **Trimmed quotes too far at first.** Some Trustpilot quotes came back cut down by a summarising tool and had to be re-fetched or dropped.
