# Decision log

The major decisions that shaped the process, in the order they were made. Each entry says what was decided, why, and what it leaves open.

---

## 000 — A 0-to-1 product, with depth sized to a take-home
**2026-11-01 · Decided at the start, recorded later**

We treat this as a product that doesn't exist yet: no users, no usage data and no merchants to learn from. That shapes discovery. It starts from the outside, with public conversation, desk research and the products people already use, instead of analytics or interviews with existing customers.

It is also a take-home with a budget of a few hours. Each step goes as deep as the next decision needs, and no deeper. A real 0-to-1 discovery would interview shoppers and shopkeepers, code with more than one person and run for weeks. Where we stop short, the page says so, and Define lists what should be validated next.

## 001 — Start with discovery, not with the problem choice
**2026-11-01 · Decided**

The brief asks to pick Findability or Transaction as the primary focus. That choice is deferred until after a discovery pass on the high-street universe (who the shops are, how they sell today, who shops there and why).

**Why:** choosing before understanding the space would be picking on intuition; the position the brief asks for should come out of evidence.
**Open:** Findability vs. Transaction — decided at the end of discovery.

## 002 — Platform decided by the solution
**2026-11-01 · Decided**

Mobile vs. web is not chosen up front. It follows from how the chosen problem gets solved.

**Open:** platform.

## 003 — The prototype is built in code
**2026-11-01 · Decided**

The final prototype (and, if it makes sense, a running application) is built in code. Figma and Apple Freeform are used only as exploration tools, when I choose to. Their outputs may be attached as process assets but are not deliverables, and Figma is not a handoff source.

**Why:** code is the real working medium in this process; designing and building happen in the same place.

## 004 — The repo is the deliverable, presented as a Claude Artifact
**2026-11-01 · Decided**

Everything (discovery, decisions, prototype, app) lives in this public repo. The final presentation is a Claude Artifact built from sources in the repo.

## 005 — Agent setup: Claude Code primary, Codex secondary
**2026-11-01 · Decided**

`AGENTS.md` holds the shared instructions so both Claude Code (primary) and Codex (reviews, parallel tasks) understand the repo; `CLAUDE.md` imports it.

## 006 — Discovery method: netnography, empathy map, benchmarks, landscape
**2026-11-01 · Decided**

Discovery runs on four pieces of work, all scoped to London with Hammersmith as the worked example:

1. A netnography of what shoppers say on public social networks, following Kozinets' method.
2. An empathy map built from that material, using the Strategyzer canvas, plus two proposed dimensions for segmenting shoppers later.
3. Benchmarks of products that already serve these shoppers, with a netnography of what users say about them.
4. A desk review of the high street itself: history, regulation, data and recent news.

**Why:** the goal is to understand the space from evidence instead of inference. Every claim about people is backed by a verbatim quote with handle, network, date and link, from the last 18 months only. Netnography in particular was chosen because it builds that evidence base quickly and cheaply, which fits a take-home. On a real product it would be one input among several, not the only one; the [method](discover/netnography/method.md) page explains the trade-off.
**Ethics call:** quotes keep the author's public handle because the link already exposes it and it makes the evidence checkable. Private accounts and closed groups are excluded.

## 007 — The deliverable reads like software documentation
**2026-11-01 · Decided**

The artifact is a docs site with a structured sidebar, organised by phase (Discover first; Define, Develop and Deliver follow). It uses a neutral shadcn/ui-style design for now, to be customised later. The Markdown in `docs/` is the content; the site renders it, so there is one copy of everything.

**Why:** the process is the deliverable as much as the prototype, and a docs structure lets a reviewer go straight to the part they care about.

## 008 — English only, written in a human voice
**2026-11-01 · Decided**

Everything in the repo is in English. Writing follows explicit anti-AI-pattern rules (listed in `AGENTS.md`).

## 009 — Which social networks the netnography uses
**2026-11-01 · Decided**

Networks were chosen with Kozinets' site-selection criteria: is the site relevant to the question, active in the time window, interactive (people talk to each other), substantial, heterogeneous, and rich in descriptive data? On top of that sits our own ethics rule: public content only.

| Network | Why | Weight |
| --- | --- | --- |
| Reddit | Long, candid threads; London and borough subreddits; easy to filter by date | Primary |
| TikTok | Younger shoppers: high-street vlogs, "shop local" content, comment threads | High |
| X | Reaction to news (closures, Hammersmith Bridge, business rates); public debate more than shopping habits | Medium |
| Mumsnet, App Store, Trustpilot | Open to read without an account; long-form experience and product reviews | Supporting |
| Instagram | Mostly the shops' voice rather than the shoppers'; used for comments on local accounts only | Optional |
| Facebook, Nextdoor | Where older residents talk about their high street, but mostly in closed groups or neighbour-only feeds | Excluded from quotes |

**Why:** an automated first pass couldn't read Reddit, X or TikTok (blocked or login-walled), which skewed the voice towards older, complaint-heavy sources. Fieldwork on those three is done by reading through a logged-in browser session: read only, no posting, liking or following.

## 010 — Reddit through an archive, checked against the live site
**2026-11-01 · Decided**

Reddit blocked every automated route we had: the fetch tool, both browsers and its public JSON. The official API now needs an approval that takes days. So the Reddit fieldwork was read through Arctic Shift, a public archive of Reddit used in academic research, and then checked against pages I saved by hand from the live site. Every Reddit quote carries a status: **verified** (matched against the live page) or **via archive** (not yet matched). Two quotes were dropped because the live check showed them removed. X and TikTok were read in a second pass through my logged-in browser. TikTok comments could not be read by the tools, so TikTok evidence is captions only. Posts that used the high street to argue about national decline in racial terms were read but not quoted.

## 011 — Quotes are short excerpts
**2026-11-01 · Decided**

Posts belong to the people who wrote them. Quotes are kept to the phrase that carries the point, about 25 words at most, always with a link to the full original. This also follows Kozinets' advice to use the least of a person's words that does the job.

## 012 — Personas placed by scoring, not by feel
**2026-11-01 · Superseded by 013**

Discover gets a personas layer: five personas built with the persona/user profile tool from Lewrick, Link and Leifer. To place them on the two proposed dimensions, every shopper quote from the netnography was coded against a rubric of observable indicators (for example "names a specific item", "falls back to online after friction"). The codes become a 0–10 score on each axis, and each persona sits at the average of its quotes.

**Why:** a persona chart drawn by hand shows what the team already believes. Scoring from the quotes makes the placement checkable, and changing a code in the data file shows how much a persona moves.
**Open:** the coding was done once, by one coder. The two mission personas, Sam and Tom, sit close together, and the split between them needs testing.

## 013 — Proto-personas from coded occasions
**2026-11-01 · Decided**

A reviewer agent showed that 012 was circular: quotes were assigned to personas by hand and then scored, so the chart could only confirm the assignment. I inverted the method. Posts are coded first on what the shopper was doing and where it broke. A second agent codes them blind. Groups are read off the grid with rules fixed in advance. The result is three proto-personas instead of five: one well supported (the mission shopper) and two thin (regular, lapsed). Discovery stays an occasion, not a persona.

**Why:** the groups should come from the data, and the axes should speak to the brief's choice between findability and transaction.
**Trade-off:** fewer, thinner personas, but each one can be traced to its posts.

## 014 — Docs say who did what
**2026-11-01 · Decided**

Every page opens with key takeaways, my call, how AI was used in that step, and the trade-offs. Method detail sits in subpages for whoever wants it. A running [log](process/ai-log.md) records what each agent was asked, what came back and what was thrown away.

---

## Still open

- **Repo layout** (single app vs. monorepo) — decide when the build starts and its shape is known.
- **Spec-driven workflow** — whether to write specs before building, and how lightweight.
