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
The agents tried the Reddit API, two browsers and a script run by the second agent. All were blocked. I saved 10 search pages and 21 threads by hand, and a script matched every Reddit quote against those saves. At that point the agents had collected 69 Reddit quotes, and 68 of them matched the saved pages. Two quotes were thrown away because their posts had since been removed; the notes from that step don't say whether the one unmatched quote was one of them. Later cuts for length and relevance left 28 Reddit quotes in the docs: 27 matched against the live site and one from a public archive.

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
An agent captured the main screens of eight benchmark apps from Mobbin through my logged-in browser and saved them locally; Just Eat, SumUp and Teya aren't on Mobbin. The images stay outside the public repo because they are third-party screens. The agent also read Teya's public pages and wrote what Teya does and doesn't do for Jess. Last, an agent drafted the Discover conclusion: facts, assumptions with a suggested confidence level under a fixed rule, and open questions. The levels are still the agent's suggestions; I review them and set the final ones.

### 13. Define: concept, canvases and hypotheses
I wrote the concept: an agent that works as a concierge for the high street. An agent checked each part against the Discover evidence, filled a value proposition canvas for Sam and for Jess from the empathy map and persona pages, and drafted eight hypotheses with tests and pass marks. I trimmed the open questions in the conclusion first: the choice of shopper was a decision, not a question, and I added questions about how shopkeepers work.

### 14. Why an agent, and the service blueprint
I wrote down why the concierge is an agent: several agents behind one conversation, which handles waiting on shops, acts on requests later and can live outside the app (decision 018). An agent revised the Define pages around that: the concept, both canvases, and the hypotheses, which went from eight to eleven. I added four about the agent (asking first, the wait, requests left ahead, channels) and merged the old "agent as the main way in" into the first of them, and the hand-run test moved to WhatsApp with me as the concierge. The agent also drafted a service blueprint across the shopper, the concierge, the agents behind it and the shop, and built a blueprint block for the site. I set the steps and which agents sit behind the concierge. The first version was a table of sentences, too much text to read as a blueprint; the agent redrew it as short cards coloured by lane, with arrows along the shopper's steps and the fail points marked. That version was still noisy, with every item in a coloured box, so I asked for another pass: now only the three lanes that act (shopper, concierge, shop) have cards, and touchpoints, systems, agents and fail points are plain text.

### 15. External review
I gave the docs to a second agent from another tool, without this project's context, and asked for a review of the evidence, the method and the Define pages. It found 15 problems and a few smaller ones, mostly places where a reading had more certainty than its evidence. Two agents applied them, one on Discover and one on Define; I decided how each was handled.

- In Discover, the agent re-counted the posts behind each assumption. A3 (a wasted trip ends on Amazon) fell from High to Low because only two posts show it, A6 (hours) from Medium to Low because two of six Jess posts are about hours, and A8 now records both outcomes after a missed trip. Google's local inventory turned out to work from a shop's website or feed too, so what's possible, what's known and my assumption (new A14) are now separate. The purchase stage is described as an order I chose, the three clusters as the best result for the weights I chose (other weights give four or five), and the post from @London_W4, which didn't meet the codebook, is out of the clusters (decision 019): still three clusters, with Ruth on three posts.
- In Define, the hypotheses now say which pass marks are stated choices and which are behaviour, H1 counts WhatsApp requests and resolved searches separately, and every shopper test uses six people. The blueprint shows the hold confirmed before payment, what happens when an item is sold, a payment fails or a hold expires, and three after-work options for Jess, all assumed.

### 16. Next step, revenue and the first canvases
I decided to run a proof of concept with King Street shops instead of another round of research (decision 020), to build the app native and iOS first (021), and to do ideation on canvases (022). I also set the revenue hypotheses in the scenario of a payment provider with its own POS (023). An agent wrote the Next step and Revenue pages, added H12 to H16 and suggested two more revenue sources that I kept out of the hypotheses for now.

For Develop, an agent collected 14 home-screen references from Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) and proposed the module order for the home. The main agent built the canvas (pan, zoom, selection, a drawer for notes and links) and a black-and-white iOS wireframe kit, then drew the app flow from the blueprint and the shop's request states. I set the structure: the composer bar at the bottom, the avatar menu, the screens in the flow, and hold before payment. When I looked at the first drawings, the concierge read as a person next to the agents; I made it explicit that the concierge is the agent the shopper talks to, in the app, on WhatsApp or over MCP.

### 17. The shopper's area
I decided the concierge works from the shopper's location and deadline, across every high street within reach, instead of one high street (decision 024). An agent measured walking routes on OpenStreetMap from Blythe Road to the shopping streets around it and grouped them in rings: six streets within 15 minutes. It also checked whether the GLA defines a high street by a minimum number of shops; the sources it found give no number, so the docs don't use one. The proof of concept moved to about ten shops in the 15-minute ring, and the wireframes now show the street of each shop. The agent replaced the chains it had used in the first wireframes (a stationery chain, a pharmacy chain, an optician chain) with made-up independents, because the product is for independents.

### 18. Craft pass on the canvases
I found the wireframes cramped and text spilling out of the state shapes. The agent traced the spill to a class name the canvas shared with the site's loading message, which removed the side padding, and to pill-shaped start and end states. It gave states a fixed width and padding, marked end states with a ring instead of a pill, spread frames and states further apart so arrow labels fit, lined notes up under their screens, moved the app's spacing to an 8-point rhythm, removed a toast that covered the collection code, and made the "About this canvas" panel wider with the summary stacked.

## AI failures

- A first persona draft looked finished but was circular, because the agent built it before the method was right. The reviewer agent caught it; the agent that wrote it didn't.
- The method pages were written as if a lone human researcher had done the work, and hid the agents until I pointed it out.
- The tools couldn't reach Reddit, TikTok comments or Nextdoor. The workaround (an archive plus pages saved by hand) cost me time.
- At first some Trustpilot quotes came back cut down by a summarising tool, and had to be re-fetched or dropped.
