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

**Why:** I wanted to understand the space from evidence. Every claim about people is backed by a verbatim quote with handle, network, date and link, from the last 18 months only. I chose netnography because it builds that evidence base quickly and cheaply, which fits a take-home. It stayed the only method on shoppers (decision 015); the [method](discover/netnography/method.md) page explains the trade-off.
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

Posts from the netnography are coded, scored on two dimensions (need urgency and purchase stage) and clustered with k-means. Each cluster becomes a proto-persona, described with Lewrick, Link and Leifer's persona fields. A second agent codes every post blind, so the scores can be checked. Three clusters had the best mean silhouette in the configuration I chose: both dimensions weighted equally, k from 2 to 5. I haven't shown that this holds under other weights. After decision 019, three still score best at half weight on the stage axis, and five at double weight.

**Why:** I wanted the personas to come out of the data, and the dimensions to speak to the brief's choice between findability and transaction.
**Trade-off:** three thin groups (11, 6 and 3 posts after decision 019), each one traceable to its posts. They are proto-personas because nobody was interviewed.
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

For data about shoppers I used one method, netnography, and stopped there. Interviews, a survey, street observation and a diary study were all possible. For a take-home, netnography was the fastest and cheapest way to get evidence I could trace. Desk research and benchmarks also collected data, about the street and about existing products. I used the desk research on the high street to learn the context. It cites a few published figures about shoppers, such as how they reach the street and the poll behind Ruth's age, but it collected nothing from shoppers.

Public posts are attitudinal data: what people say they think, feel and did. The empathy map and the proto-personas rest on it, so they carry the known gap between what people say and what they do. On an established product I'd add behavioural data next. For a 0-to-1 product I prefer to reach a testable idea quickly and put it in front of shoppers. That test is where the behavioural evidence would come from.

## 016 · Purchase stage replaces point of failure
**2026-11-02 · Decided**

The second dimension used to be "point of failure", with four categories (couldn't find out, wasn't there, not worth it, couldn't get it) given scores by hand. It read as a list of categories and couldn't be measured as a scale. I replaced it with the purchase stage where the attempt stopped, counted in buying order: 1 find out, 2 find it, 3 accept it, 4 get it. The steps are equally spaced on the same 0 to 10 range as need urgency.

**Effect:** the same posts land in the same three clusters. Mean silhouette went from 0.55 to 0.57.

## 017 · Concierge agent concept for the high street
**2026-11-02 · Decided**

After Discover I chose one concept for both Sam and Jess: a shopper app whose main way in is an agent. It answers from a shop's till where stock is shared and otherwise asks likely shops, then lets the shopper reserve, pay, collect or get delivery. Classic browsing by shop and category stays as a second way in. The delivery covers the shopper's side; the merchant side is assumed.

**Why:** the strongest pain is not knowing before leaving home (A1), and a confirmation from the shop is the most direct answer to it without a catalogue most shops don't have (F8).
**Position on the brief:** findability first. The transaction is the step that closes the loop, and it is where the constraints of the other problem show up.
**Open:** whether shops answer fast enough (H1) decides whether the concierge works. It is tested by hand before anything is built.

## 018 · Why the concierge is an agent
**2026-11-02 · Decided**

I made the concierge an agent, built as several agents behind one conversation. I expect four things from it: one interface for many tasks, waiting on shops handled for the shopper, requests it acts on later, and reach beyond one app (WhatsApp, or the shopper's own assistant through MCP). The prototype is the app, where the concierge gets an interface built for this one job.

**Why:** shops are slow and hard to reach, and the shopper's job (find it, hold it, pay, collect) has several steps. One conversation that does the chasing fits that better than a screen per step.
**Open:** this is my main product hypothesis and Discover has little evidence on it. H3 (asking beats browsing), H4 (shoppers accept the wait), H8 (requests left ahead) and H10 (channels) test it. If H3 or H4 fails, browsing becomes the main screen.

## 019 · @London_W4 removed from the clusters
**2026-11-02 · Decided**

An external review found that the post from @London_W4 is a walk along King Street and an impression of it, with no purchase of the poster's own, so it doesn't meet the codebook. I removed it and re-ran the clustering.

**Effect:** three clusters still score best (mean silhouette 0.55, against 0.54 for two, four and five). Sam and Jess keep their posts; Ruth goes from four posts to three, all routine shopping. 20 posts are clustered instead of 21.
**Open:** Ruth now rests on three posts, which makes her the least supported persona by a wider margin.

## 020 · Proof of concept with shops before more research
**2026-11-02 · Decided**

I won't interview shopkeepers before building. I'll build a proof of concept of the concierge agent, take it to about ten King Street shops, and run the hypotheses through it with shops and shoppers. Inviting the shops doubles as discovery about how they work, and the shops can bring the first shoppers.

**Why:** an agent prototype takes days, and what a shop does with a real request answers H1, H6 and H9 better than what it would say in an interview.
**Open:** whether the agent is ready in time. The hand-run concierge stays as the fallback. The shops as an acquisition channel is an assumption.

## 021 · Native app, iOS first
**2026-11-02 · Decided**

The shopper app is a native mobile app. I follow Apple's Human Interface Guidelines first and Material Design second, as closely as possible. Where brand work needs a change, or a pattern exists on iOS and not on Android, I go with iOS. The shop side has no interface in this take-home.

**Why:** native patterns are what shoppers already know, and starting from one guideline keeps the wireframes consistent.
**Open:** the prototype's stack.

## 022 · Ideation canvases
**2026-11-02 · Decided**

Ideation in Develop is a group of pages. Some are text; others are canvases with a dotted background, zoom and pan like FigJam, where wireframes and diagrams sit with arrows between them. Each canvas has its own HTML file next to a Markdown page that gives its title and summary. Items on a canvas can be selected, not moved. Interface copy in the wireframes stays in English in both languages of the site, because the app is for London; notes and labels follow the site's language.

**Why:** flows and state diagrams read better in space than as text, and one reusable canvas keeps them all in the same record.
**Open:** an inspection drawer, which opens on selection with basic details for now.

## 023 · Revenue through payments, network and promotion
**2026-11-02 · Decided**

I set the business model as hypotheses in one scenario: the concierge belongs to a payment provider with its own POS. Revenue comes from payments made in the app, from shops joining the provider's network to receive them, from more sales for the shops already on that network (which makes its POS worth keeping), and from paid promotion and reach. There is no commission on the sale.

**Why:** the delivery apps' 14–35% commission is the cost independents complain about (F9). A payment provider earns on the payment itself, and a shop that joins brings all its sales.
**Open:** H12 to H16. Whether to list only shops on the provider's POS or every shop; the proof of concept starts open and records which shops are on the network.

## 024 · The shopper's area, not one high street
**2026-11-02 · Decided**

The concierge works from the shopper's location and deadline, across every high street and parade within reach. High streets group shops for browsing and promotion; they don't limit the search. A shop is in scope if it's small, independent and within reach. The proof of concept moves from King Street alone to about ten shops within a 15-minute walk of Blythe Road, which includes King Street (this changes the location in decision 020).

**Why:** from Blythe Road, six shopping streets are within a 15-minute walk. Tying the shopper to one would hide the others, and a street with few shops would answer most searches with nothing.
**Open:** how far shoppers will go for each kind of need, which the deadline only approximates. H16 records how often they buy beyond walking distance.

## 025 · One chat per errand
**2026-11-02 · Decided**

Each request is one chat with the concierge, holding what the shopper asked for in one go. When items need different days or kinds of shop, the concierge proposes splitting them into separate requests and the shopper decides with one tap. Shops appear inside the chat as answers, never as chats of their own, and a purchase stays in the chat it came from. The Requests tab lists the chats with one status per row: the status of the item that needs the shopper soonest.

**Why:** it keeps the shopper's own words as the unit, and splits only where one status per row would stop being true. One chat per product fragments a shopping list; one chat per shop gives the shopper back the work the concierge exists to do.
**Open:** how often the concierge's split is right, and the tab's name ("Requests" for now).

## 026 · Requests button left of the ask bar
**2026-11-02 · Decided**

The home has no tabs. A round Requests button sits left of the ask bar, with a count when a request needs the shopper. It opens Requests full screen, growing out of the button (the zoom transition on iOS, the container transform on Android), and Requests shrinks back into it on the way out. An earlier version opened it as a sheet; I chose full screen so the list has the whole screen. This replaces the Nearby and Requests tabs of app flow v2 (option G in Tab placement).

**Why:** it keeps the large ask bar that makes asking the main way in, and puts Requests under the thumb. On the left it stays clear of the send button while typing.
**Open:** a chat icon says less than a label, so the count and a first-run hint have to carry it; a third mode would need another pattern.

## 027 · System fonts only as fallback
**2026-11-02 · Decided**

The app's typefaces work on both platforms. SF Pro (iOS) and Roboto (Android) are fallback only, never the chosen font, because neither exists on the other platform. Type tests pair display and body fonts that ship with the app.

**Why:** a brand font has to look the same on iOS and Android.
**Open:** the custom fonts must be registered for Dynamic Type and Android font scaling, and their licence checked before Deliver.

## 028 · One sans for reading, display only where it shows
**2026-11-02 · Decided**

Everything the shopper reads, and the chat above all, uses one strong sans: Switzer is the favourite for now. A display font, if there is one, appears only on the splash, the get-started screen, the home title and display titles in widgets, such as a shop's name on a card. The chat never mixes two fonts. Pally is out of the tests.

**Why:** a conversation is read in small sizes and fast; a second font there adds noise without adding voice.
**Open:** which display font, if any. Gambetta scores best with Switzer in round 3; Switzer alone is still an option.

## 029 · Gambetta for display, Switzer for everything else
**2026-11-02 · Decided**

Gambetta 700 is the display face and Switzer the text face, with the type spec in Type scale, round 4. Tracking is set per typeface and size: Gambetta tightens as it grows (−0.01 to −0.02 em), Switzer stays at 0 for text and opens slightly below 15 pt; Switzer titles, buttons and navigation titles are 600, which keeps them firm but lighter in colour than Gambetta 700. Gambetta appears only where decision 028 allows, at most once per screen and never below 26 pt; a shop's name is in Gambetta only on its shop page (34 pt) and on the ready-to-collect card (26 pt).

**Why:** a serif display gives titles a British editorial voice; one strong sans keeps everything the shopper reads legible and consistent on iOS and Android.
**Open:** the fonts must be registered for Dynamic Type and Android font scaling, and the ITF licence checked for embedding.

## 030 · Three ways to get an item, and how long a hold lasts
**2026-11-02 · Decided**

A shopper can reserve without paying (held until the end of the next opening day, only where the shop accepts), pay and have the shop hold it (7 days by default, with a collection day the shopper picks, shorter for perishables, up to 14 days if the shop agrees, one 7-day extension, automatic refund if nobody collects), or pay and have the shop deliver with its own service. Delivery by the shop is outside the app; the concierge only follows its status, and that flow is mapped, not designed.

**Why:** UK shops hold paid collection orders for about a week (Argos and Decathlon 7 days, John Lewis 10, Screwfix 21), and unpaid reservations are short (about 2 days) or gone; a hold of a few hours would be shorter than shoppers expect. Sources in the desk research, "How long shops hold an order for collection".
**Open:** whether small independents accept a week with one unit of stock; H6 tests it.

## 031 · Connected shops and asked shops
**2026-11-02 · Decided**

There are two kinds of shop. A connected shop shares item-level stock through its POS: the concierge answers at once and places the hold in the POS. An asked shop has no stock data: the concierge asks it on WhatsApp or through POS messages and the hold is confirmed by its reply. Both appear in the same answers, labelled by where the answer came from.

**Why:** the instant answer and the asked answer are different promises; the shopper needs to know which one they are reading.
**Open:** how many shops on a street are connected (H11).

## Still open

- Repo layout (single app or monorepo): to decide when the build starts and its shape is known.
- Prototype stack: to decide in Deliver.
- Spec-driven workflow: whether to write specs before building, and how light they should be.
