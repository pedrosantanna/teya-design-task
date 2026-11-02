# How AI was used

I directed the work and made the decisions. AI agents did most of the collecting, coding, drafting and checking. Each step below lists what the agents were asked, what came back, and what was kept, thrown away or fixed.

## Who does what

| | Me | AI agents |
| --- | --- | --- |
| Direction | Sets the question, the method and the scope; decides at each step | Propose options and record decisions |
| Research | Picks the networks, logs in where needed, saves pages the tools can't reach | Search, read, collect and date quotes; desk research |
| Analysis | Challenges the method, reviews results | Code posts, build tables and charts, run checks |
| Writing | Sets tone and rules; reviews | Draft every page in English under the writing rules in `AGENTS.md` |

A main agent runs subagents for parallel work. A second agent handles reviews and side tasks. Every agent reads `AGENTS.md`, which holds the shared rules.

## Log

### 1. Setup
An agent set up the repo, the agent instructions and the decision log from my brief. I added two rules early: nothing outside the take-home goes in the repo, and everything is written in English with a human voice.

### 2. Parallel research
Each of three agents got a written brief: (A) a netnography of London shoppers with an empathy map, (B) benchmarks with user sentiment, (C) a desk review of the high street. Each brief set an 18-month window and the evidence format: verbatim, handle, date, link.

They came back with about 60 coded quotes (about 40 made it onto the findings page), 17 products with 59 quotes, and a dated landscape with around 35 figures.

Reddit blocked every tool. Agent A read Reddit through Arctic Shift, a public research archive, and said so. X and TikTok needed a login.

Agent C reported a change of Prime Minister and an October 2026 Budget that the main agent couldn't confirm from its own knowledge. A writing agent later checked both against several sources. Both held, with one correction: the new small-business rates threshold applies only to shops, hospitality and leisure.

### 3. Reddit verification
The agents tried the Reddit API, two browsers and a script run by the second agent. All were blocked. I saved 10 search pages and 21 threads by hand, and a script matched every Reddit quote against those saves. Of the 69 Reddit quotes collected at that point, 68 matched the live site. Two quotes were thrown away because their posts had been removed.

### 4. Page drafts
Two writing agents turned the research into pages, with quotes of 25 words at most and fact kept apart from interpretation. The main agent wrote the overview and checked links, rendering and quote fields with scripts.

### 5. X and TikTok
I logged in to X and TikTok in Chrome. An agent searched both through my session, read only. TikTok comments wouldn't load for the tools, so only captions were used. Posts that used the high street for racial or political arguments were read and left out.

### 6. Proto-personas
I set the method: code the posts, score them on two dimensions that map onto the brief, cluster, then describe each cluster as a persona.

An agent wrote the codebook and tagged 44 posts, and a second agent coded them blind. Agreement was high on the codes behind both dimensions (kappa 0.85–0.93) and weaker on what people did next (0.55). Written rules settled the disagreements.

Before the method was settled, a reviewer agent read the files cold. It found a first draft circular, because personas had been assigned before scoring, and that draft was thrown away. The final data gave three clusters, so three proto-personas. See [method](../discover/personas/method.md).

### 7. Coherence review
I asked a reviewer agent to read every page in order and fix what didn't hold together. It rewrote unclear "My call" boxes as decisions, removed leftovers from earlier drafts and stale counts, and fixed contradictions between pages. It also took out personal details and sent me six open questions. I answered them, and the main agent applied the answers.

### 8. Benchmarks by proto-persona
An agent re-sorted the 17 benchmarks against Sam, Jess and Ruth: 11 directly relevant, 6 related. Every product a persona already uses is backed by a post. Where there was no post, the product is marked as an option the persona doesn't use yet.

### 9. Design pass
A design agent researched common "AI slop" patterns in interface design and polished the docs site against them, in the same neutral style.

### 10. Portuguese version
I asked for every page in Brazilian Portuguese too, with a language switch on the site. Three agents translated the pages in parallel from a shared glossary and passed new terms to each other as they went. A fourth agent then reviewed all 15 pages against the English and made about 60 fixes: calques, two consistency slips and one structural slip. It also found four unclear sentences in the English, which I fixed in both languages.

### 11. Writing pass and a new second dimension
I read the docs and found they still read as AI-written, with punchy headings in particular. A research agent collected published catalogues of AI-writing tells (Wikipedia's "Signs of AI writing", corpus studies of model vocabulary, open-source writing skills) and returned the rules my writing skill was missing. I added them to the skill, along with a rule of my own: headings are plain labels. Four agents then rewrote every page in English against the new rules and rebuilt the Portuguese from the new English. They removed bold-label bullets, sentences about the page itself, "not X but Y" corrections and em dashes.

In the same round I found that "point of failure" couldn't be measured as a scale. I replaced it with the purchase stage where the attempt stopped (1 find out to 4 get it, decision 016). The agent re-ran the clustering, and the same posts land in the same three clusters.

I also reframed Discover around how the data was collected (decision 015). The desk research is context, and netnography is the only method used on shoppers, which makes the empathy map and the proto-personas rest on attitudinal data. Agents rewrote the method page and the summaries to say so, and the sidebar now has a Desk research page and a Data collection group. A reviewer agent then read every page in order, in both languages, and fixed the contradictions these changes left behind.

### 12. Screens and Teya
An agent captured the main screens of eight benchmark apps from Mobbin through my logged-in browser and saved them locally; Just Eat, SumUp and Teya aren't on Mobbin. The images stay outside the public repo because they are third-party screens. The agent also read Teya's public pages and wrote what Teya does and doesn't do for Jess. Last, an agent drafted the Discover conclusion: facts, assumptions with a suggested confidence level under a fixed rule, and open questions. I set the final levels.

## AI failures

- A first persona draft looked finished but was circular, because the agent built it before the method was right. The reviewer agent caught it; the agent that wrote it didn't.
- The method pages were written as if a lone human researcher had done the work, and hid the agents until I pointed it out.
- The tools couldn't reach Reddit, TikTok comments or Nextdoor. The workaround (an archive plus pages saved by hand) cost me time.
- At first some Trustpilot quotes came back cut down by a summarising tool, and had to be re-fetched or dropped.
