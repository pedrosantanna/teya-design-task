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

Gambetta 700 is the display face and Switzer the text face, with the type spec in Type scale, round 4. Tracking is set per typeface and size: Gambetta tightens as it grows (−0.01 to −0.02 em), Switzer stays at 0 for text and opens slightly below 15 pt; Switzer titles, buttons and navigation titles are 600, which keeps them firm but lighter in colour than Gambetta 700. Gambetta appears only where decision 028 allows, at most once per screen and never below 26 pt; a shop's name is in Gambetta only on its shop page (34 pt) and inside the order card when it is ready to collect (26 pt), which is the same order card, not a second design.

**Why:** a serif display gives titles a British editorial voice; one strong sans keeps everything the shopper reads legible and consistent on iOS and Android.
**Open:** the fonts must be registered for Dynamic Type and Android font scaling, and the ITF licence checked for embedding.

## 030 · Three ways to get an item, and how long a hold lasts
**2026-11-02 · Decided**

A shopper can reserve without paying (held until the end of the next opening day, only where the shop accepts), pay and have the shop hold it (7 days by default, with a collection day the shopper picks, shorter for perishables, up to 14 days if the shop agrees, one 7-day extension, automatic refund if nobody collects), or pay and have the shop deliver with its own service. Delivery by the shop is outside the app; the concierge only follows its status, and that flow is mapped, not designed.

**Why:** UK shops hold paid collection orders for about a week (Argos and Decathlon 7 days, John Lewis 10, Screwfix 21), and unpaid reservations are short (about 2 days) or gone; a hold of a few hours would be shorter than shoppers expect. Sources in the desk research, "How long shops hold an order for collection".
**Open:** whether small independents accept a week with one unit of stock; H6 tests it.
**Closed by 032:** whether to keep the unpaid reserve at all. I questioned it: it is there for convenience and for shoppers who pay cash (19.2% of retail transactions in 2024), but the payment then happens outside the app, the shop carries the risk of a no-show, and the desk research found no strong habit behind it (Argos dropped unpaid reservations; the shops that keep them hold for about two days). The alternative is to require payment for every hold. H12 counts which one shoppers choose when both are offered.

**Superseded in part by 037:** the shopper buys, with no unpaid hold, and the shop sets the collection window.

## 031 · Connected shops and asked shops
**2026-11-02 · Decided**

There are two kinds of shop. A connected shop shares item-level stock through its POS: the concierge answers at once and places the hold in the POS. An asked shop has no stock data: the concierge asks it on WhatsApp or through POS messages and the hold is confirmed by its reply. Both appear in the same answers, labelled by where the answer came from.

**Why:** the instant answer and the asked answer are different promises; the shopper needs to know which one they are reading.
**Open:** how many shops on a street are connected (H11).

## 032 · No unpaid reserve
**2026-11-02 · Decided**

I dropped the unpaid reserve. A shopper who gets a yes either pays and the shop holds the item, or pays and the shop delivers. A shopper who doesn't want to pay goes to the shop without a hold and may find it sold. The concierge says so in its answer.

**Why:** the unpaid reserve was there for convenience and for shoppers who pay cash, but the payment happens outside the app, the shop carries the risk of a no-show on what is often its only unit, and the desk research found no strong habit behind it (Argos dropped unpaid reservations; Beaverbrooks keeps them for 2 days). Two ways are also simpler to explain in one answer.
**Open:** whether shoppers who would have reserved pay instead or just walk over; H12 now counts how many yeses end in a paid hold. Shoppers who pay cash are a blind spot: none are in the netnography.

## 033 · A provisional mark
**2026-11-02 · Provisional**

The app's icon is a terrier whose mouth is a shop's awning: low folded ears, two dot eyes, a nose resting on five stripes. I drew it by hand in Figma from the agent's first two icon tests, lowering the ears and replacing the brows with eyes. It is in two tones, a high-contrast one and a low-contrast one, on Oat and Brew for now. It is the first identity decision; the design system has a page for it.

**Why:** it joins the two directions I liked most, the terrier that goes into the shops and the parade's awnings, and reads as a face before it reads as a shop.
**Open:** the final drawing and a simpler version for small sizes, the colours (they follow the palette), and the name.
**Update, same day:** the dog is a retriever, not a terrier: a British breed whose job is to go out and bring something back, like the concierge. Retriever names are listed on the identity page.
**Scope:** I stopped the mark at this version. With more time I would develop it further, perhaps another way, but the brand is not the focus of the exercise and the result is good enough to give the app a face.

## 034 · Biscuit grey as the neutral
**2026-11-02 · Provisional**

The app's neutral is Biscuit grey from round 4 of the identity board: an OKLCH ramp that runs from Oat's hue to Brew's at about 60% of their chroma, with background #FCFAF6, border #E0DCD5, muted text #5B5249 and foreground #0E0A08. Pure black text and white on dark both pass with it. The accents are not chosen. Pillar box was my first lead; I didn't like its Slate roof and asked for a lighter, more saturated fifth colour, then found the other palettes better than Pillar box. Round 5 shows Pillar box with three candidates and six saturated palettes from round 2 on Biscuit grey.

**Why:** warm enough to sit next to the mark without a seam, quiet enough that any accent set can carry the colour.
**Open:** the accent set. The mark stays in black and white until then.
**Superseded:** the background, border and text values above were replaced in rounds 8 and 9; the current ones are on the [Colour](develop/design-system/colour.md) page. The light background moved again in 045 (#EEE9E2, L 0.935) and the dark mode in 051.

## 035 · The app is called Snuffle
**2026-11-02 · Decided**

The shopper app is Snuffle. A dog snuffles when it works the ground with its nose; a snuffle mat hides treats for a dog to find by smell. The docs site now carries the name and the mark.

**Why:** it sounds good, it is playful, and it is about looking for things and finding them, which is the concierge's job; it comes from the retriever in the mark. It came out of three rounds of names (concept directions, retriever names, sniffing and fetching words), with words dropped for conflicts or for a negative second meaning.
**Open:** a trademark search (UK IPO) and an App Store check; so far only quick web searches were run.

## 036 · Pastel parade with Indigo on Biscuit grey
**2026-11-02 · Decided**

The accents are Pastel parade with Indigo: Indigo for text, buttons and the tint, Peach, Pistachio, Butter and Lavender as fills and tonal badges. The neutral is Biscuit grey in both light and dark mode. Borders are avoided: surfaces separate by lightness (light background L 0.95 with white cards, 1.16:1; dark cards at L 0.235, 1.18:1), and a border is used only where a surface still needs it.

**Why:** of the three themes tried on the same screens, Pastel parade with Indigo was the calmest, and its pale fills give tonal badges that read well on both modes. In round 7 a white card on the light background was 1.04:1 without a border, too little.
**Update, round 9:** the light background moves to L 0.96 and keeps round 8's chroma (#F4F1ED), with muted surfaces at L 0.915; cards stay white and stand out at 1.13:1. Round 8's background read a little dark. The more saturated versions (×1.8 and ×2.5) and the less saturated one (45%) are dropped. Dark mode is unchanged: it keeps round 8's surfaces, since its chroma didn't change.
**Superseded:** the L 0.95 background and the 1.16:1 card step in the first paragraph are replaced by round 9: L 0.96 (#F4F1ED) and 1.13:1. Decision 045 later moved the light background to #EEE9E2 (L 0.935), and 051 the dark mode; the [Colour](develop/design-system/colour.md) page has the current values.

## 037 · Buy, then collect
**2026-11-03 · Decided**

The shopper's action is Buy, not Hold. "Hold" could read as a free reservation or as a step before buying, and leaves the shopper unsure whether they have bought anything. The shopper taps Buy and pays once with Apple Pay. At a connected shop the payment is taken at once, because the POS has the stock. At an asked shop the amount is only authorised and is taken when the shop replies that it has set the item aside; if the shop doesn't confirm within 10 minutes, the authorisation lapses and the shopper is told. Each shop sets how long it keeps a bought item: 7 days by default, or 14 or 30, and the same day or the next for perishables; one extension of the same length is allowed. Buying is not reserving: the shopper owns the item once the shop confirms. If nobody collects by the end of the window, the order is cancelled and the shopper gets a full refund automatically, as the big chains do, and the shop puts the item back on sale. The shopper sees the date before tapping Buy ("Collect by Mon 9 Nov · full refund if you don't") and again on the receipt; the chat doesn't offer the window as a reason to buy.

**Why:** UK shops have no legal minimum for collecting a paid order. The shop's own terms set it, and the Torts (Interference with Goods) Act 1977 only governs what a shop may do with goods left after notice. Chains keep paid click-and-collect orders for about a week and then cancel and refund in full, with no fee: Argos cancels after 7 days (one 7-day extension) and refunds within 5 working days; John Lewis returns the order to its warehouse after 7 days and refunds the account; IKEA cancels a missed collection and refunds within 14 days. Screwfix keeps orders for 21 days and then puts them back to stock. Uniqlo and Decathlon keep orders for 7 days, Boots for 14. Dry cleaners keep items for 60 to 90 days, but they hold a customer's own goods, often with money still owed, which is a different case. I had asked for 30 to 90 days; I chose the norm as the default and let the shop go longer, since a long window keeps a small shop's only unit off the shelf and only the shop knows what it can spare.
**Assumption:** shoppers read "Buy" plus a collection date as clearer than "Hold"; the proof of concept can count questions about it.
**Changes:** H12 now counts how many yeses end in a purchase. Decision 032 stands: there is still no unpaid reserve.
**Sources:** Argos, "What happens if my collection window expires" (https://help.argos.co.uk/help/delivery-and-collection/what-happens-if-my-collection-window-expires); Uniqlo UK FAQ (https://faq-uk.uniqlo.com/articles/en_US/FAQ/How-long-do-I-have-to-collect-my-Click-Collect-order-UK); Decathlon UK (https://custhelp-sprinklr.decathlon.co.uk/articles/my-order/how-long-do-you-hold-click-and-collect-orders/698c644d6873450e473e2e7d); John Lewis, click and collect (https://au.johnlewis.com/customer-services/delivery-information/click-and-collect); Screwfix, click and collect FAQ (https://www.screwfix.ie/help/faq/clickandcollect-faq); Torts (Interference with Goods) Act 1977, uncollected goods (https://legislation.gov.uk/ukpga/1977/32/crossheading/uncollected-goods).

## 038 · The prototype is an Expo app
**2026-11-03 · Decided**

The prototype is built with Expo (React Native): one codebase that runs as an iOS app for the recorded walkthrough and as a web build embedded in these docs, so a reviewer can click through it. Content is mocked. A switch at the top flips the interface between iOS (the default) and Android, and the avatar menu switches between Sam and Jess. Code follows clean-code and performance practice, and a performance check runs on every build: Lighthouse for the web build and a frame-rate and start-time check for the app.

**Why:** decision 021 makes the app native and iOS first; Expo gives a real app on a phone and a web build from the same code, which a plain web prototype or SwiftUI would not.
**Open:** whether the web build loads inside the artifact's iframe; that is the first thing to test. iOS-only surfaces (the Apple Pay sheet, lock-screen notifications, Live Activities) are drawn as simulated screens so both builds match.

## 039 · A conceptual model for the app
**2026-11-03 · Decided**

The app has four objects: request, shop, answer and order. Snuffle is the voice that talks to the shopper, not an object, and an item never gets a page of its own: small shops have no catalogue, so an item is text and a quantity inside a request, an answer or an order. Each object has one card and one detail form, each action one verb, and each state one label used everywhere. A request left open is "Keep looking", a shop's reply is an "answer", and shops show as photo tiles on Nearby and as rows elsewhere. The model is on the design system's Conceptual model page, and every screen is checked against it.

**Why:** after v7 the screens used several words for one thing (four names for a request left open, three for an order waiting for the shop) and payment terms in the chat. A model set before more screens follows Johnson and Henderson's advice to design what to design first, and Norman's point that the shopper only learns the model from the screens.
**Assumption:** "request" reads for shoppers, who write questions, not requests; the prototype test can tell.
**Update, presentation:** an object's detail form is pushed and exits with Back; a task is a sheet and exits with Close. The shop page, which I had sketched with a Close button, is therefore a push with Back, since it is the shop's detail and the shopper keeps navigating from it. The rule is on the Conceptual model page and the screen review checks it.

## 040 · Shape, materials and motion
**2026-11-03 · Provisional**

Corners use six radii taken from Material 3's shape scale (0, 12, 20, 28, 32 and a capsule), concentric when nested and continuous on iOS. Controls are capsules and containers have fixed radii. Liquid Glass is used only for what floats above the content and acts: the ask bar, the round Requests button, sheets and buttons over a photo or the map; cards, bubbles and tiles stay solid. Motion uses six springs with iOS and Material 3 values; feedback starts at touch-down, every animation can be interrupted, and Reduce Motion swaps movement for a fade. The values are on the design system's Shape and materials and Motion pages.

**Why:** I asked for rounder corners, a small set of radii and motion that feels premium and quick to respond. Apple's 2025 design system names fixed, capsule and concentric shapes but publishes no token scale, so the values come from Material's scale, which keeps Android exact. Springs follow Apple's WWDC 2023 guidance and Material 3's motion tokens.
**Open:** the values are tuned on a phone in the prototype; the Material shape values were read from a mirror of the Android docs and are still to check against m3.material.io.

## 041 · Spacing, layout, tags, imagery and a screen review
**2026-11-03 · Provisional**

The design system gets four more foundations: spacing on a 4-pt base with named gaps and a single-column phone grid, five kinds of tag (filter chip, suggestion chip, status label, badge, count), and rules for photos, placeholders and symbols. A fifteen-item checklist turns Gestalt principles, visual hierarchy and information architecture into checks, and a `screen-reviewer` agent runs it, with the conceptual model and the tokens, on every screen before it is published, on the canvases now and in the prototype later. Hand-drawn sketches are kept in the repo and shown beside the screen they shaped.

**Why:** I asked for the design system to cover tags, imagery, spacing and grid the same way as shape and motion, starting from iOS and widening to Material, and for every screen to be checked against Gestalt and information architecture, visually, by an agent in the workflow. Proximity and common region explain most of what makes a screen read as grouped, so the spacing scale is built around them.
**Open:** Material's margins and badge sizes and the 16/20 pt iPhone margins on iOS 26 are still to confirm; the tile widths are proposals to check at real size.

## 042 · HugeIcons and a 3D illustration style
**2026-11-03 · Decided**

Every icon in the app comes from HugeIcons (Stroke Rounded, free set), not from SF Symbols or Material Symbols. Where a platform has its own form, such as share, back or more, the app uses the HugeIcons glyph that matches that platform. Getting Started, the splash and large icons use 3D illustrations modelled in code from simple shapes: palette colours only, thin dark outlines like a technical drawing, and solid shadows in black or a darker palette tone, with no blur or gradient. A viewer on the design system's Illustrations page shows the objects and lets me tune camera, outlines and shadows.

**Why:** I wanted one icon family with a rounded stroke that matches the capsule shapes, on both platforms, and illustrations that give the app a character of its own without photos or stock art. I gave the agent reference images (isometric, outlined, flat solid shadows) and asked for a simpler version of that look.
**Open:** the objects so far are a shop, a basket, a scooter with a rider and a delivery box; their animation is a first pass.

## 043 · Components, states, platforms and content
**2026-11-03 · Provisional**

The design system gets specs for every component the screens use (anatomy, tokens, states, iOS and Android forms, accessibility), interaction states and elevation, empty, loading and error states, an iOS and Android map that the prototype's switch follows, semantic colours (border, separator, destructive, warning, success, scrim, disabled) and content rules: Snuffle's voice in British English, UK formats and 12-hour times. Thirteen inconsistencies between pages were fixed at the same time.

**Why:** a design review against the v7 screens found tokens without components, and pages that contradicted each other. I asked for the design system to be complete enough to build the prototype from before any code.
**Open:** the destructive red and the Android haptic constants are to check in the prototype; v7's frames still show 24-hour times.

## 044 · OpenSpec and one Expo app, no monorepo
**2026-11-03 · Decided**

The prototype is one Expo app in `app/`, with no monorepo or Turborepo: one project already builds iOS, Android and web. Work is spec-driven with OpenSpec: a short PRD in `openspec/project.md`, living capability specs in `openspec/specs/` and one change proposal per feature in `openspec/changes/`, archived into the specs when done; tasks can become GitHub issues. The design system is code the agents must follow: DTCG 2025.10 token files generate four typed themes (iOS and Android, light and dark) through Unistyles 3, components take token names only, and lint, type checks and a token-drift check run on every agent edit and when an agent stops, through Claude Code hooks.

**Why:** I asked for spec-driven development that is light and not set in stone, with a PRD and features and issues that can grow from it, and for the design system to work as a harness for coding agents. OpenSpec is the lightest current option and keeps specs living; GitHub Spec Kit and Kiro are heavier. A monorepo would only help with several packages, and there is one.
**Open:** iOS and Android dev builds, and the Lighthouse and frame-rate checks, have not run yet; the fonts are not bundled in the app yet.

## 045 · Identity in use
**2026-11-03 · Provisional**

Each colour has one job. Indigo is the shopper acting: at most one filled Indigo control per viewport, the commit action, with neutral tonal buttons and a Foreground selected chip. Lavender is Snuffle speaking: its bubbles, typing dots, its mark (redrawn as a golden retriever on a Lavender tile), notifications and the Live Activity. Each shop has a fixed accent from its kind (Peach, Pistachio, Butter or Lavender), shown as a tonal tile with its initials and the mark's awning, a wash behind its name on its page and a tinted header on its receipt. The light background moves to #EEE9E2 and the dark card to #2B2420. Every screen title and section heading is in Gambetta, with 48 pt titles on Nearby and Requests and a large title placed closer to its content than to what is above it. Nearby gains "Shops by kind" with the 3D stills, and the receipt, the asking state, empty Requests and Not found show an illustration. Photo credits leave the interface and stay in the code.

**Why:** a brand review of the prototype found Indigo was the only colour doing anything, the pastels appeared only in small badges, surfaces read as stock iOS, shops without photos were grey squares, the mark read as a panda at 28 pt, Gambetta had little presence and the illustrations never appeared. The photos are stand-ins in a prototype that isn't published as a product, so their credits don't belong on screen.
**Open:** Gambetta on every heading replaces decisions 028 and 029 as a test and can be reverted. The light wash (step 50) is close to white and barely shows behind a shop's name. The illustrations were rendered on the old background and dark card and need rendering again; there is no offline state yet for the phone box.

## 046 · iOS 26 patterns, a bundled map and the bare mark
**2026-11-03 · Decided**

The app follows iOS 26's Liquid Glass patterns as Apple's own apps use them, with Material 3 Expressive on Android and the same patterns drawn on the web: a back chevron alone in a glass circle, glass close and confirm buttons, no bar fills, every screen change animated. The ask bar stays full size and never minimises, since asking is the app's main action. The map is MapLibre with OpenStreetMap data bundled in the app and a palette style with 3D buildings. The Snuffle mark is a bare glyph in the theme's foreground and never sits in a tile or circle, which reverses decision 045's mark tile. Chats keep a neutral ground; Snuffle is marked by its glyph, its name and Lavender bubbles, not a purple screen.

**Why:** I wanted the prototype to feel like Apple's current apps on every platform, a map I could style for free and that loads inside the artifact, and a mark that reads as itself rather than an app icon. The research showed apps that host an assistant mark who is speaking rather than tinting the whole screen.
**Open:** interactive dismiss of the zoom transitions is not verified on a device; map tiles in the published artifact are not verified.

## 047 · Ratings come from collected orders; Snuffle's own signals sit beside them
**2026-11-03 · Decided**

A rating is an attribute of the order, and the model keeps its four objects. Only an order marked Collected or Delivered can be rated, once, and the buyer can change it for 30 days. It holds a thumbs up or down for "Would you go back?", up to three tags from two fixed lists, an optional note of 140 characters and the order's month. The shop page shows two signals labelled by source: "What buyers said" ("92% would go back · 38 buyers" and tag counts) and "What Snuffle saw", worked out from answers and orders (answer rate, stock accuracy, typical reply time). It also gets "What they sell": category chips that open Ask, "Asked about recently" and a price line. The page runs header and actions, What they sell, How they do on Snuffle, What buyers say. Items still have no page.

I made three choices. A thumbs up or down for "Would you go back?" over stars. Stock accuracy ("Had it 24 of 25 times when they said yes") shows only after 10 "has it" answers; before that the shop is "New on Snuffle", with its answer rate and reply time. Shops see their own signals and can dispute a specific case, which is mapped in the shop's request states, since the shop has no interface.

**Why:** an asked shop has no till data, so a shopper choosing between it and a connected shop has nothing to go on but the answer. Snuffle sees every answer and every order, so it can report how a shop has done without asking anyone. Vinted splits member reviews from automatic ones, and the split lets the shopper tell opinion from record. Stars invite a J-shaped spread and an average that hides it, and a binary question is quicker to answer after a collection. The UK rules set the rest: Schedule 20 of the DMCC Act 2024 (paragraph 13, in force 6 April 2025) bans fake and concealed incentivised reviews, and the CMA's guidance (CMA208) rules out review gating (4.5), so Snuffle asks every buyer, never withholds a negative rating, mirrors the split in its highlights, labels any summary as built from buyers' notes, flags incentives and publishes "How ratings work".
**Assumption:** shops will accept a public stock-accuracy figure if they can dispute a case (H19); "% would go back" reads as easily as stars (H18); the reliability row lets an asked shop compete with a connected one (H17).
**Open:** how a dispute is reviewed, and by whom; the wording of "How ratings work"; whether the tag lists fit every kind of shop.
**Sources:** Digital Markets, Competition and Consumers Act 2024, Schedule 20 (https://www.legislation.gov.uk/ukpga/2024/13/schedule/20); CMA, Fake reviews guidance, CMA208 (https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf); the Ratings section of the [benchmarks](discover/benchmarks.md).

**Superseded in part by 056 and 060:** reviews show a first name and a month, and the ratings are one carousel with the summary first.

## 048 · Stone for dark mode
**2026-11-03 · Decided**

Dark mode uses Stone, Biscuit grey at 45% of its chroma (the "less colour" column of identity round 8), at the same lightness steps: background #0E0B09, sheet #191715, card #282523 (1.29:1), muted #353230, muted text #AEAAA6 (6.6:1 on the card) and text #FBFAF8. Light mode keeps Biscuit grey. Accents and the shop tiles don't change.

**Why:** I went back to the dark-mode tests on the identity board and preferred the less saturated Biscuit: the full-chroma version read brown at night, and the calmer grey lets the pastel tiles and the Indigo carry the colour.

## 049 · Chip selection, one sheet scrim and baked tiles from the tokens
**2026-11-04 · Decided**

A selected filter chip is Card with its label in Indigo 800 at 600 and a 1.5 pt Indigo 800 edge (dark: Card, Indigo 300 and a 1 pt edge), and unselected chips sit a level below it: the Background with a 12% hairline in light, the tonalOnTile overlay on a tile, Muted on a card or a dark sheet. The iOS segmented control is the system pattern, a thumb one level above its track under the delicate shadow, the selected label in Foreground. Every sheet is opaque, keeps the glass rim and has one scrim behind it, Foreground at 20% in light and black at 48% in dark; a tap on it dismisses. Grouped lists in a sheet take `radius.bubble`; Close and Confirm on a dark sheet are solid Muted; dark glass gets a Stone 360 hairline; Back on a category's tile takes the tonalOnTile fill. The illustration pipeline reads the tile and ground colours from the colour tokens and fails when a baked still's corner differs from its tile, and the category stills share one framing.

**Why:** a visual critique of the web build measured the Indigo 100 chip at 1.03:1 on the Background, lighter than the white chips beside it; photos showed through the 94% sheet as grey smudges; the dark Close circle was 1.09:1 on the sheet; and the dark Butter stills had been baked on a tile colour the tokens no longer used, so they showed as boxes. I asked for these fixes; an agent built them and measured every new pair.
**Open:** the dark Category ground (the whole screen in the kind's tile) is still to decide. Tonal Indigo (`chipSelected`) stays on the order card's current step, the rating sheet's thumbs and Android's segmented button.

## 050 · Lighter tinted rows on the dark Category screen; Requests after the field
**2026-11-04 · Decided · the Requests placement reversed by 055**

In dark mode the Category screen keeps the kind's full tile as its ground, and the shop rows on it are a tinted card lighter than the tile: OKLCH L 0.44, C 0.03 at the accent's hue (`shop.accent.<hue>.cardOnTile`: Peach #624D47, Pistachio #4B5646, Butter #595240, Lavender #534F62), 1.37 to 1.51:1 over the tile. The rows' meta line and chevron take Stone 840 (#CECAC6, `mutedForegroundOnTile`), 4.74:1 or more on every card, because Stone 740 measured 3.35 to 3.42:1 there. Light mode keeps white Card rows. On Nearby's ask bar the Requests circle moves from before the Ask capsule to after it, at the trailing end, with its count.

I chose the full colour with lighter rows over a dark ground with a band of the colour that fades under the header. I chose the trailing circle because iOS 26 places the secondary button after the search field, as in Music and Podcasts.

**Why:** Card #282523 rows were darker than every dark tile (1.30 to 1.44:1 the wrong way), so they read as holes cut into the colour. A dark ground with a fading band would have lost the colour that ties the screen to the card it zoomed out of. The leading circle had been kept so it could dissolve into Back at the top left; the morph into New Request comes from the capsule, which now starts at the screen margin as the composer does, so nothing is lost by following Apple's placement.
**Open:** the shop page still puts Card rows on its dark tile (1.30 to 1.44:1, darker); whether it takes the same cards is not decided. The selected street chip stays Card with Indigo 300, since Indigo 300 is under AA on the tinted cards.

## 051 · A calmer, cooler dark mode
**2026-11-05 · Decided**

Dark mode takes lower-chroma accents on a cooler neutral. The tiles keep their hues at about 55% of the chroma: Peach #52352C, Pistachio #34422C, Butter #403925, Lavender #3E3950, with tinted rows on them (#5C4F4B, #4F554B, #565249, #53515C). The Stone neutral moves to hue 270 at half its chroma: Background #0B0C0D, Sheet #171719, Card #252627, Muted #323334, Foreground #FAFAFB. Shop accents in dark take new wash and ink steps at the same share of chroma. The dark sheet moved to #1C1D1E so it separates from the background at 1.16:1.

I chose this after comparing four options on the identity board (round 10): today's dark accents, the light accents used unchanged in dark, lower-chroma accents, and a cooler neutral.

**Why:** today's tiles read as brown, green and olive. The light accents made every tile the brightest thing on screen. Lower chroma keeps the hue order and the tile-over-card hierarchy, and every text pair still passes AA (muted text on a tile went from 4.58 to 4.66:1 at its lowest). The cooler neutral changes little on its own, but it lets the warm tiles stand apart from a plain grey.
**Open:** the Snuffle bubble in dark (Lavender 900) still has the old chroma.

## 052 · Promoted on the shop page, not on the tile
**2026-11-05 · Decided**

Nearby's tiles carry no Promoted or New badge. A paid placement is labelled on the shop page, as a "Promoted" line on the shop card.

**Why:** the tiles already sit under a heading that says what the row is, and the badges made Nearby busy. UK advertising rules (the CAP code) expect a paid placement to be identifiable, so the label moves rather than disappears.
**Open:** whether the rail itself needs an explanation of how placement works.

## 053 · Categories ordered by what is open near you
**2026-11-05 · Assumption**

Browse by category orders kinds by how many shops of that kind are open now in the shopper's area, with ties broken by a fixed everyday order (café, bakery, chemist, newsagent, butcher, deli, florist, hardware, …). Kinds with nothing open go last, and colours are spread so neighbours differ.

**Why:** a research agent found that Deliveroo personalises by past orders and time of day, and no other app publishes its rule. With no usage data, supply near the shopper is the most useful signal the prototype has.
**Open:** per-shop opening hours; the prototype has one global hours state.

## 054 · Synthetic test users test flows, not demand
**2026-11-05 · Decided**

Scripted test users built from Sam's and Jess's goals drive the web build through eight scenarios with Playwright, and record steps, time, dead ends, unnamed controls, small targets and errors. An optional agent review reads the recorded steps against the screen-review checklist and is labelled as a heuristic review.

**Why:** they find functional and usability breaks quickly and repeatably, in the persona's own terms. NN/g and recent papers warn that simulated users are over-optimistic and homogeneous, so I keep them out of research: they don't validate demand, don't stand in for shoppers or shopkeepers, and don't replace the proof of concept.
**Open:** nothing from the first run; an agent fixed its breaks and the second run reached every goal. Three targets are still under 44 pt on the web.

## 055 · A neutral shop page, a filled chat field, Requests back on the left
**2026-11-05 · Decided · the neutral card reversed by 058**

The shop page no longer takes the shop's tile colour as its ground: the page and the shop card are neutral, the card's padding grows from 20 to 24, and the shop's accent shows only in small details (the chips and the pin). In light the card is white, with its rows a step down, as Airbnb does. The map takes the Snuffle palette. The card stays solid; glass stays on Back and the pinned bar. In the chat, the composer becomes a filled field with a hairline instead of white glass on a white ground. On Nearby's ask bar the Requests circle goes back before the field, which reverses decision 050's placement.

**Why:** a pastel used as the ground of a whole screen is the brightest thing in dark mode, inverts the elevation order and puts dark text on light islands; small accents in the light tone are fine on dark, as Material's dark-theme guidance recommends. Apple keeps Liquid Glass for the control layer, so a content card in glass would make its text depend on the map behind it. The glass composer measured about 1.0:1 against the white chat. On the right, the Requests circle sat 8 pt from the mic where the thumb rests, which invites wrong taps; on the left it lines up with Back.
**Open:** whether the Category screen keeps its full colour.

## 056 · Facts without floating dots, first names on reviews
**2026-11-05 · Decided**

Metadata lines no longer join facts with middle dots. A status word carries its colour ("Open" in the success colour, its time in Muted), the walk and the street are groups with an icon, units never break ("12 min walk"), lines wrap only between groups, and "Promoted" is a tag. Request rows show a "Needs you" tag with the deadline beside it. The shop card is a warm grey (Biscuit 915) whose text keeps its line breaks when the card widens. Reviews show the reviewer's first name and the month, never a surname, photo or how the order was handed over. The ratings section runs: the share who would go back, the top tags, three reviews, then "See all". Found here recently is a short list of up to five names with how long ago. How it works comes right after Found here recently.

**Why:** the dotted lines read as generic; the best place pages (Apple Maps, Google Maps, Airbnb) separate facts by weight, colour and icons and keep dots for plain countable lists. A first name makes a review read as a person's without exposing them. A carousel of names without photos would only add a scroll.
The buy button says "Buy for £29.98".
**Open:** whether the count reads "people" or "buyers".

**Closed by later work:** the count reads "people".

## 057 · Illustrations drawn for the screen, tonal badges in dark, ratings in a carousel, Snuffle's avatar
**2026-11-05 · Decided**

The 3D illustrations render on a transparent ground with the object's own bounding box centred (the shadow falls where the light sends it), at a larger size (category art at 80% of its square, Getting started at 312 pt), with a 1.4 pt outline that stays the same width at every display size and lighter creases at small sizes. The app composites them over the tile or page colour. In dark mode, badges and chips are tonal fills a clear step from their ground (1.39 to 1.58:1) with text at 7.4:1 or more, and no borders; selection shows by fill and weight. The shop page's reviews are a snapping carousel of up to five cards (a list at large text sizes), each with a first name and a date. The photo carousel sits inside the shop card, after its actions, and the card starts just below the pin. "Delivers" and "New" carry an icon; "Promoted" is not shown and does not reorder Nearby. In the chat, Snuffle's sender line has a small avatar: the mark in a circle of the Snuffle bubble's Lavender, the one place the mark sits in a shape inside the app.

**Why:** strokes drawn in world units grew thick and merged at small sizes, and baked tiles meant re-rendering whenever a colour changed. Borders on dark badges were doing the job colour should do, as Material's tonal containers and Apple's dark fills show. A carousel keeps the reviews to one row of the page. An unlabelled paid order would mislead, so with the label gone the order goes too.
**Open:** whether to show paid placement again, labelled; the measured cost of a glass shop card.

**Superseded in part by 060, 061 and 062:** the ratings are one panel and then cards straight on the shop card; Snuffle's avatar runs past its circle.

## 058 · The shop card takes its category colour again; glass measured and left out
**2026-11-05 · Decided · reverses 055's neutral card**

The shop card is the shop's accent tile again, in light and dark, with everything on it recoloured for the tile: rows in the tile's card tone, chips in the tile colour, Call and Directions in the tonal overlay, status words in new `successOnTile` and `warningOnTile` roles, and Ask as the one filled Indigo. The card rests 12 pt from the screen edges, raised so the shop's pin sits centred in the strip of map above it, and grows to the full width on scroll; every container grows with it while the text keeps its line breaks. "Delivers" and "New" are icon facts on the walk and street line, and the photos sit between two section gaps. The card stays solid.

**Why:** with the low-chroma dark palette (051) and borderless tonal badges (057), a coloured card works in dark mode, and it ties the shop page to the category it came from. An agent measured a glass card: CPU on the iOS simulator stayed within noise, but the web build dropped frames during the lift under a 4x CPU throttle, the GPU cost could not be measured, and muted text only passed because the map is pale or near-black.

## 059 · Every request is a full conversation; chats on the app's beige
**2026-11-05 · Decided**

Every request on the Requests list opens as a full conversation with its history, its status and its next action (buy, change or stop a standing request, rate, keep looking or ask further away), and every conversation has the composer. The chat's ground is the Background in both modes, and the composer field is Card with a Border hairline everywhere it appears, so it reads the same in New Request, a request and the Requests list. This reverses the white chat ground from craft-pass-2.

**Why:** the older requests opened as one message with no way to act, so it wasn't clear what to do or where to reply. On a white chat the field was beige, and on the beige Requests list the same field disappeared; one ground and one field fix both and remove the jump in colour when a chat opens.
**Open:** buying from an older request skips the details and payment sheets, and a rating given there doesn't reach the shop page.

## 060 · Ratings in one panel, one quiet chip, sheets that fit
**2026-11-05 · Decided**

The shop page's ratings are one panel: a carousel whose first card is the summary (the share who would go back, the people count, up to three tags) and whose next cards are reviews, all the same height, with "See all N reviews" and "How ratings work" at the panel's foot. Chips on a row inside the shop card are one quiet neutral fill with no border and no tile colour, rating tags included. The shop's pin is centred between the bottom of the status bar and the card. Action and settings sheets open at the height of their content, up to the large detent (iOS's custom detent; Material's bottom sheet does the same), and the location sheet never shrinks while the shopper types; Directions keeps the medium detent because the map behind it matters. The Bakery art is a paper bag of baguettes with a scored loaf, and the Deli art puts the jar and the cheese side by side.

**Why:** the ratings were three separate groups and the review list ran long; one panel keeps them together and scannable. Chips in the card's own colour looked like holes, and the bordered ones looked like inputs. A sheet that opened halfway hid part of Account. The splash video on the Mark page now plays once, since a 2.4 s loop read as flicker.

## 061 · Snuffle's avatar runs past its circle
**2026-11-05 · Decided**

On the chat's sender line, Snuffle's circle is the dog's head: the mark's face fills it, the ears and the awning's corners run past its edge, and a band of the circle shows under the awning. The circle has its own token, `snuffle.avatar`: the bubble's Lavender in light and Lavender 600 in dark. The Bakery, Café and Newsagent cards follow the composition of Chemist and Deli, a tall object behind and to the left and a low one in front and to the right.

**Why:** I asked to test the dog leaking out of the circle and kept it; at 24 pt the old glyph inside the circle was small and read as a sticker, while the bleed reads as a face. In dark, the bubble's Lavender 900 measured 1.4:1 on the chat ground and the head disappeared; Lavender 600 is 4.26:1.

## 062 · Carousels to the card's edge, a taller map header, the map credited at the foot
**2026-11-05 · Decided**

On the shop page the rating cards sit straight on the card, with no panel around them, and a grouped list under them holds "See all N reviews" and "How ratings work"; with no ratings, one list holds "No ratings yet" and "How ratings work". The ratings carousel and the photo carousel scroll past the content padding to the card's edges and are clipped there, while the first card or photo rests on the text's edge, as the actions row already did. The strip of map above the card is taller (two `space.8` steps under the bar instead of one), since it works as the page's header. "© OpenStreetMap contributors" leaves the map's corner and becomes a centred line at the foot of the card.

**Why:** a card inside a card read as one container too many, and carousels clipped at the text's edge looked cut short. The header was cramped around the pin. The credit sat over the header on every visit. OpenStreetMap's attribution guidelines ask for the credit where the map is shown; a line at the foot of the same page is the reading I took, and I chose to keep the credit only there, not also on the map. If a stricter reading is ever needed, `attribution` on the map puts it back in the corner.

## 063 · Shops on their real street, with the walk drawn on the map
**2026-11-06 · Decided**

Every shop stands on the street its card names, at a real point on that street in OpenStreetMap, and the map draws the walk to it from the shopper's door, 163 Blythe Road, in the shop's accent. A build script (`npm run map:places`) reads the walkable streets from OpenStreetMap, finds the point on each shop's street whose walking distance best matches the shop's walk time, and computes the route; I then set every shop's walk time to its route's length at 80 m a minute, so the card and the map agree. The map turns so the door is to the left of the shop, zooms out until the whole walk fits in the band of map above the card, and centres the walk; the pin follows the shop sideways. The map area grew to about 4 km east to west so Askew Road and Kensington Church Street are inside it. The Wells Road Bakery moved to Uxbridge Road, since Wells Road is 10 minutes away and the bakery belongs to the shops asked only further away.

**Why:** with one map for every shop, the pin stood on Blythe Road even for a shop on King Street, and the walk times were invented. Real routes changed some of them a lot (the deli and the bookshop are 25 and 28 minutes away, past the 20-minute radius, so Nearby no longer lists them; two Hammersmith Road shops went from 6 to 10 minutes). The shopper's address is an assumption of the prototype; on a phone it would come from their location.

## 064 · A chat that moves, a sniffing mark, peer Buy buttons and the request's photo
**2026-11-06 · Decided**

Everything that arrives in a chat comes in one way: it fades in and rises 8 pt, chips and cards follow the message before them, a changed status cross-fades, and Reduce Motion leaves only the fade. While Snuffle asks the shops, the mark sniffs (the awning sways like whiskers and the nose twitches) where the delivery scooter stood. With two or more offers every Buy is tonal and the same size; a filled Buy only when one answer can be bought, and a partial offer reads "Buy 1 of 2". The request's photo moves to the right of the chat's bar, and a tap offers six photos of the item to choose from. A card with two objects puts the taller one behind and to the left and the lower one in front and to the right, with a long object turned against that diagonal (Illustrations, Two objects).

**Why:** messages and statuses appeared and swapped in one frame and read as broken. The scooter said delivery while Snuffle was searching; I chose the mark over a small crossroads, which turns to noise at that size. Two shops with one filled and one grey Buy looked like a recommendation the app hadn't made. The photo under "Snuffle" crowded the title, and a fixed photo of someone else's eclipse glasses may not match what the shopper means.

**Updated:** the partial offer reads "Buy only 1" (the number the shop has), since "Buy 1 of 2" read like a step in a sequence.

**Updated:** the rise is 16 pt, since 8 pt read as no motion on the phone (AI log, step 78).

## 065 · The docs open with the case; the process becomes the harness's documentation
**2026-11-06 · Decided**

The site has two blocks. The first, "The case", is a short narrative for someone reviewing the take-home: an overview with the conclusion first, the position, the product, the prototype, the key decisions, viability and scale, how I worked, and validation and next steps. Each page is a synthesis of what already exists and links to its evidence. The second block, "AI context" (first called "AI harness and context"), keeps every page that existed, with its content unchanged, regrouped as the documentation of the working system: intent, research, product specs, flows and states, design system, explorations, verification and logs.

**Why:** the Discover, Define, Develop and Deliver order made a reader walk the process before finding the position, and buried the decisions in a log of more than 60 entries. Grouping the existing pages by what they are, closer to spec-driven documentation, keeps them as the record the case points to. Nothing was deleted, and no existing page changed.

**Updated:** on 8 November I renamed the second block "AI context" and reordered the case to follow the order I worked in, which is also the order of the recording: overview, discovery, concept, value and viability, how I built it, the product, features, the prototype, and what I'll test next. Position and key decisions moved into Discovery and Concept (AI log, step 85).

## 066 · In dark mode, shop tiles keep their light pastels and the cards on them turn dark
**2026-11-06 · Decided**

A shop's accent tile is the same pastel in light and dark (Butter #E7D48F, Peach #FEC5B2, Pistachio #C5DEAE), with ink text straight on it, and the cards on it in dark are a translucent dark of the tile's hue as solid values (#514A31, #5A453E, #454E3D) with light text; tonal buttons and Back take that card, and Ask on a tile is Indigo 800. The map pin is the pastel with an ink dot, and the route is the pastel cased in the page ground. Dark reuses the light category stills, since the tiles are now the same. This is option 2, variation 4, on the Identity board (round 11), and it replaces the dark tiles of decisions 051 and 058.

**Why:** the dark tiles had a chroma of 0.03 to 0.05 and read as khaki, brown-red and forest grey, only 3 to 6 apart in hue, where 2 is the smallest visible step. I compared three directions and their variations on the board and chose the light pastels with dark cards. The cost is glare: the tile is 12.9 to 13.5:1 from the dark page, so the shop page, the Category screen and the category cards are bright blocks in a dark UI.

## 067 · How the hypotheses are measured, defined and not built
**2026-11-06 · Decided · the guardrail thresholds stay open**

The harness has a verification step: a measurement plan that ties each hypothesis to a metric, the events behind it, a pass mark and a method; the shopper and shop tasks with their start, end, success and abandonment; time on task as median and 90th percentile, split into the shopper's effort and the wait for the shop; an event taxonomy of 58 events with no personal data in them; product and supply–demand metrics by area and per shopper; a liquidity model of how many shops an area needs; and guardrails. The north star is completed requests per week. None of it is built in the prototype. I don't add NPS, and I don't add a standing CSAT: the thumbs rating after collection already measures the shop, and the gaps it leaves (requests that end without an order, Snuffle itself) are covered in the proof of concept by talking to the shoppers and a weekly check-in with each shop.

**Why:** the proof of concept is small (6 shoppers, 10 shops), so a score like NPS would move about 17 points per person and wouldn't say which step failed, while most of what the hypotheses need comes from records the service keeps anyway. The model's own inputs (the share of shops that have the item, how many are open, how many kinds of shop could have it) are assumptions, labelled as such.

**Open:** the guardrail thresholds before the proof of concept, and whether a later build asks "Did Snuffle help?" on a sample of requests that end without an order.

## 068 · Once there is an order, the chat pins it, and the receipt groups the code with its date
**2026-11-08 · Decided · the duplicate status in the chat stays open**

Once a request has an order, its chat pins the order under the nav bar: the status label, the shop and items, the collection code while the order can be collected, and one tap to the receipt. It shows in every order state except Sold and Not confirmed, where nothing was charged and the chat moves on to the next answer. The strip takes the nav bar's fill and edge, and the chat's bar stays filled at any scroll, so the two read as one bar. On the receipt the lower sections and Directions stay as they were. While the order can be collected, the green header names the shop and the items, and the code card holds the code with "Collect by Mon 9 Nov" and "Full refund if you don't" right under it; the status label ("Ready", "Extended") is left out of the header, since the date says what matters at the counter and the pinned order and the order card carry the label. Every other state opens the header with its status label. The basket illustration is gone.

**Why:** an agent compared Uber Eats, Too Good To Go, Live Activities, WhatsApp and Messages for Business. The ones that work keep the active order one tap away, in a fixed place, with its live phase; a pinned strip at the top of a chat does this without fighting the composer and the keyboard at the bottom, and the code at its end can be read out at the counter without opening anything. The order stays inside its request's chat, as the conceptual model says. The code and its date are one pair at the counter, and the QR needs a white quiet zone, so they share their own card; inside the green card the code felt cramped.

**Open:** the order card in the chat repeats the pinned status while both are on screen, and other requests' chats don't pin their orders yet, since only the active request has a receipt in the prototype.

## 069 · Larger samples, and pass marks written as counts
**2026-11-09 · Decided**

I raised the sample sizes of the tests. The hand-run concierge sends 60 requests over five days (6 per shop, about 24 searches) instead of 20 over two days. The prototype test and the hand-run concierge each have 20 shoppers instead of 6, with at least 10 of them working shop hours, and the demand-summary conversations go from 5 shopkeepers to 10. Every pass mark is now written as a count. H1 passes if 36 of the 60 requests get a valid answer within 10 minutes and at least 12 of the 24 searches are resolved, and the shopper marks out of 6 scale to 20 (4 of 6 becomes 14 of 20). The shops stay at 10.

**Why:** a percentage of 6 or 20 reads as more precise than it is, and "4 of 6" is too few to rest a decision on. The shops stay at 10 because that is the ring of shops reachable within 15 minutes' walk of Blythe Road, and the liquidity model in the product metrics is built on 10 shops over 6 kinds. The case against NPS in decision 067 still holds with 20 shoppers, since one person moves the score by 5 points.

**Open:** the new numbers scale the old marks up; no benchmark or volume estimate sets them. Decision 070 replaces these numbers.

## 070 · A four-week proof of concept sized from its funnel, with go, iterate and stop marks
**2026-11-09 · Decided · the steady-state answer-burden threshold stays open**

I fixed the vocabulary first: a request is what a shopper asks Snuffle for (`request_created`), and an ask is one request sent to one shop (`shop_asked`). The proof of concept runs four weeks with the same 10 shops in the 15-minute ring around Blythe Road, 5 on the provider's POS and 5 on other terminals. Twenty shoppers, at least 10 of them working shop hours, make about 3 requests each over the first three weeks: about 60 requests, which reach the shops as about 160 asks. Week four is for the demand summary (H9) and the money offers (H13 to H15). The size comes from the funnel: 60 requests × 50% fill × 70% bought × 2 in 3 collected gives about 14 collected orders, enough to read H2, H7 and H12. Every hypothesis with a mark now has a go mark and a stop mark, set before testing, with iterate in between, and results are reported with their 90% adjusted Wald interval. H1 goes at 60% of asks answered in 10 minutes with 8 of 10 shops answering half, and stops under 45% or under 6 shops; its fill goes at 50% of requests and stops under 30%, with h measured apart. The 60% sits below Meta's old "Very responsive" bar (90%, 15 minutes) and is my estimate; the 45% is where I judge the model needs more shops than a ring has; the 50% is the model's own prediction for 10 shops. The shopper marks go at 14 of 20 and stop at 9; H4 counts slow requests still open when the yes arrives (go 70%, stop under 50%); H7's behaviour goes at 5 of the 10 working shoppers; H9 counts shops that commit to another month (go 6, stop 3); H12 goes at 70%. H6, H13, H14, H17 and H19 are direction only. H15 becomes exploratory, and H16 waits for a second ring. The prototype test opens with a usability round of 5 shoppers. In the proof of concept a shop isn't asked again the same day after 10 asks.

**Why:** an audit of the plan found that H1's mark was set at the model's own value, so a concept that worked exactly as modelled would pass or fail on a coin flip. The go marks still sit at the model's values, and with a stop mark well below each one, a result near the model lands in go or iterate; only a clear miss reads as stop. Ten working shoppers couldn't reach H7's behaviour mark of 6 with the old volume, the tests mixed five days with four weeks, H15's mark sat above what the revenue estimate predicts for 10 shops, and H16 couldn't be measured with every shop inside the ring. Twenty-four searches would have given about 6 collected orders, too few for H2, H7 or H12.

**Open:** the answer-burden threshold at steady state; no published figure exists for UK independents answering on WhatsApp, so H1's 60% stays my estimate; and the proof of concept tests shops at about 1 ask a day, against about 24 at the model's steady state, so it says nothing about answering at scale.

## Still open

