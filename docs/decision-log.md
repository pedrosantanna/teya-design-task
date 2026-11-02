# Decision log

The decisions that shaped the process, oldest first, each with what I decided, why, and what it leaves open.

## 000 · Product stage and depth
**2026-11-01 · Decided**

I decided to treat this as a product that doesn't exist yet: no users, no usage data and no merchants to learn from. So discovery starts from the outside, with public conversation, desk research and the products people already use. There are no analytics to read and no existing customers to interview.

It is also a take-home with a budget of a few hours, so each step goes only as deep as the next decision needs. A full 0-to-1 discovery would interview shoppers and shopkeepers, code with more than one person and run for weeks. Where I stop short, the page says so, and Define lists what should be validated next.

## 001 · Discovery before the problem choice
**2026-11-01 · Decided**

The brief asks me to pick Findability or Transaction as the primary focus. I put that choice off until after a discovery pass on the high street: who the shops are, how they sell today, who shops there and why.

**Why:** I wanted the position the brief asks for to come out of evidence. Choosing before understanding the space would have meant choosing on intuition.
**Open:** Findability or Transaction, to be decided at the end of discovery.

## 002 · Platform
**2026-11-01 · Decided**

I don't choose mobile or web up front. The platform follows from how the chosen problem gets solved.

**Open:** platform.

## 003 · Prototype medium
**2026-11-01 · Decided**

The final prototype (and a running application, if one makes sense) is built in code. I use Figma and Apple Freeform only for exploration, when I choose to. Their outputs may be attached as process assets, but they are not deliverables, and Figma is not a handoff source.

**Why:** code is where I work in this process, so designing and building happen in the same place.

## 004 · Docs and video
**2026-11-01 · Decided**

Everything (discovery, decisions, prototype, app) lives in this repo and is published as a hosted docs site. The site records what I do with the AI agents: the research, the decisions, what came back and what I kept. It's written for me, the agents and anyone else who joins the work. The output for review is the recorded walkthrough, and this record is its evidence.

## 005 · Agent setup
**2026-11-01 · Decided**

I set up `AGENTS.md` as shared instructions, so every agent working in the repo follows the same rules: the main agent, which also runs subagents, and a second agent I use for reviews and side tasks.

## 006 · Discovery method
**2026-11-01 · Decided**

Discovery has four pieces of work, all scoped to London, with Hammersmith as the worked example:

1. A netnography of what shoppers say on public social networks, following Kozinets' method.
2. An empathy map built from that material, using the Strategyzer canvas, plus two proposed dimensions for segmenting shoppers later.
3. Benchmarks of products that already serve these shoppers, with a netnography of what users say about them.
4. A desk review of the high street itself: history, regulation, data and recent news.

**Why:** I wanted to understand the space from evidence. Every claim about people is backed by a verbatim quote with handle, network, date and link, from the last 18 months only. I chose netnography because it builds that evidence base quickly and cheaply, which fits a take-home. On a full product it would be one input among several; the [method](discover/netnography/method.md) page explains the trade-off.
**Ethics call:** quotes keep the author's public handle, because the link already exposes it and the handle makes the evidence checkable. Private accounts and closed groups are excluded.

## 007 · Docs site format
**2026-11-01 · Decided**

The artifact is a docs site with a sidebar organised by phase: Discover first, then Define, Develop and Deliver. For now it uses a neutral shadcn/ui-style design, to be customised later. The Markdown in `docs/` is the content and the site renders it, so there is one copy of everything.

**Why:** the process is as much a deliverable as the prototype, and with a docs structure a reviewer can go straight to the part they care about.

## 008 · Language and voice
**2026-11-01 · Decided**

English is the source language of the repo. A Portuguese mirror came later (decision 014). The writing follows explicit rules against AI patterns, listed in `AGENTS.md`.

## 009 · Netnography networks
**2026-11-01 · Decided**

I chose the networks with Kozinets' site-selection criteria: is the site relevant to the question, active in the time window, interactive (people talk to each other), substantial, heterogeneous and rich in descriptive data? On top of those I added my own ethics rule: public content only.

| Network | Why | Weight |
| --- | --- | --- |
| Reddit | Long, candid threads; London and borough subreddits; easy to filter by date | Primary |
| TikTok | Younger shoppers: high-street vlogs, "shop local" content, comment threads | High |
| X | Reaction to news (closures, Hammersmith Bridge, business rates); more public debate than shopping habits | Medium |
| Mumsnet, App Store, Trustpilot | Open to read without an account; long-form experience and product reviews | Supporting |
| Instagram | Mostly the shops' voice; comments on local accounts only | Optional; not collected in the end |
| Facebook, Nextdoor | Where older residents talk about their high street, but mostly in closed groups or neighbour-only feeds | Excluded from quotes |

**Why:** an automated first pass couldn't read Reddit, X or TikTok (blocked or behind a login), which skewed the voice towards older, complaint-heavy sources. X and TikTok were then read through my logged-in browser session, read only (no posting, liking or following), and Reddit through a public archive (decision 010).

## 010 · Reddit access
**2026-11-01 · Decided**

Reddit blocked every automated route I had: the fetch tool, both browsers and its public JSON. The official API now needs an approval that takes days. So the Reddit fieldwork was read through Arctic Shift, a public archive of Reddit used in academic research, and then checked against pages I saved by hand from the live site. Every Reddit quote carries a status: **verified** (matched against the live page) or **archive** (not yet matched). Two quotes were dropped because the live check showed them removed. X and TikTok were read in a second pass through my logged-in browser. The tools couldn't read TikTok comments, so TikTok evidence is captions only. Posts that used the high street to argue about national decline in racial terms were read but not quoted.

## 011 · Quote length
**2026-11-01 · Decided**

Posts belong to the people who wrote them. I keep quotes to the phrase that carries the point, about 25 words at most, always linked to the full original. This also follows Kozinets' advice to use as few of a person's words as the point needs.

## 012 · Proto-persona method
**2026-11-01 · Decided**

Posts from the netnography are coded, scored on two dimensions (need urgency and purchase stage) and clustered with k-means. Each cluster becomes a proto-persona, described with Lewrick, Link and Leifer's persona fields. A second agent codes every post blind, so the scores can be checked. The data supports three clusters.

**Why:** I wanted the personas to come out of the data, and the dimensions to speak to the brief's choice between findability and transaction.
**Trade-off:** three thin groups (11, 6 and 4 posts), each one traceable to its posts. They are proto-personas because nobody was interviewed.
**Names, gender, age:** names and genders are labels I chose to balance the set (two women, one man). Age is left out unless another source supports it. Ruth's "probably 50 or over" comes from London polling, because the posts can't speak for older shoppers.

## 013 · Who did what
**2026-11-01 · Decided**

Every page opens with key takeaways, my call, how AI was used in that step and the trade-offs. Method detail sits in subpages for whoever wants it. A running [log](process/ai-log.md) records what each agent was asked, what came back and what was thrown away.

## 014 · Bilingual docs
**2026-11-01 · Decided**

English stays the source. Every page also has a full Brazilian Portuguese version, picked with a switch at the top of the site, which opens in English by default. From now on, anything new is written in both languages and the Portuguese is reviewed against the English. Quotes stay in their original language in both. The same area holds a light, dark or system theme control, which replaces the old phase label.

**Why:** the record is for me and for whoever works on this with me, and some of them read Portuguese more comfortably. With English as the source, one version stays authoritative.

## 015 · Data collection method
**2026-11-02 · Decided**

For data about shoppers I used one method, netnography, and stopped there. Interviews, a survey, street observation and a diary study were all possible. For a take-home, netnography was the fastest and cheapest way to get evidence I could trace. I used the desk research on the high street to learn the context; it holds no data about shoppers.

Public posts are attitudinal data: what people say they think, feel and did. The empathy map and the proto-personas rest on it, so they carry the known gap between what people say and what they do. On an established product I'd add behavioural data next. For a 0-to-1 product I prefer to reach a testable idea quickly and put it in front of shoppers. That test is where the behavioural evidence would come from.

## 016 · Purchase stage replaces point of failure
**2026-11-02 · Decided**

The second dimension used to be "point of failure", with four categories (couldn't find out, wasn't there, not worth it, couldn't get it) given scores by hand. It read as a list of categories and couldn't be measured as a scale. I replaced it with the purchase stage where the attempt stopped, counted in buying order: 1 find out, 2 find it, 3 accept it, 4 get it. The steps are equally spaced on the same 0 to 10 range as need urgency.

**Effect:** the same posts land in the same three clusters. Mean silhouette went from 0.55 to 0.57.

## Still open

- Repo layout (single app or monorepo): to decide when the build starts and its shape is known.
- Spec-driven workflow: whether to write specs before building, and how light they should be.
