# Benchmarks

I compared seventeen products that a London shopper can use today, or that failed recently in a way that teaches something, and sorted them by how they relate to the three [proto-personas](personas/index.md). Eleven touch what Sam, Jess or Ruth struggle with, or are what they already fall back on. Six are useful for the brief in general and stay as short notes. Across all of them, the complaint users repeat most is that the app said something was available and the shop didn't have it.

```summary
Takeaways:
- Sam: no product tells him which nearby independent has an item right now. He asks people on Reddit and WhatsApp, and falls back on Amazon.
- Jess: delivery apps and Co-op's Peckish already solve getting things from local shops, at 14–35% commission and one shop per order. Her default is still Amazon.
- Ruth: nothing is built for her. Directories of what's still open on a street haven't lasted.
- The most repeated complaint, whatever the model, is being told something was available when it wasn't.
Call:
- I re-sorted the benchmarks around Sam, Jess and Ruth. Define will choose a problem for a shopper, and a list grouped by product category didn't show whose problem each product touches.
- Products that don't touch the personas' problems stay on the page as short notes, because they still answer questions in the brief (surplus, multi-shop checkout, quick commerce, merchant storefronts).
- A ✓ needs a post from the findings or persona pages. Without one, the mark is ○.
AI:
- A research agent chose the 17 products and pulled dated reviews from the App Store feed, Trustpilot and Mumsnet. A writing agent re-fetched truncated quotes and dropped the ones it couldn't confirm.
- An agent re-sorted the page against the proto-personas and wrote the persona table and the per-persona patterns. Each ✓ names the post behind it, so it can be checked.
Trade-offs:
- The persona clusters are small (4 to 11 posts), so each ✓ rests on one or two posts.
- Review sites skew towards complaints, and there's no Reddit on this page. Commission rates are as reported by third parties.
```

## Products by persona

✓ the persona uses it today, with a post as evidence. ○ it addresses the persona's problem, but no post shows them using it. – not related to their problem.

| Product | Sam (1 · find out) | Jess (4 · get it) | Ruth (2 · find it) | Evidence for ✓ |
| --- | --- | --- | --- | --- |
| Google local listings + NearSt | ✓ | – | ○ | Sam: u/dy14n19 checks Google for a patisserie's hours and doesn't trust it |
| Instagram / WhatsApp / Facebook | ○ | – | ○ | |
| Amazon | ✓ | ✓ | – | Sam: Dbank, u/Mediocre_Sprinkles buy on Amazon after a failed trip. Jess: LividArse "shop on Amazon"; u/WearyChampionship365 checks it before a deadline |
| Nextdoor | – | – | ○ | |
| ShopAppy and BID apps | – | ○ | ○ | |
| Deliveroo | – | ○ | ○ | |
| Uber Eats | – | ○ | – | |
| Just Eat | – | ○ | – | |
| Co-op Peckish | – | ○ | – | |
| Gophr / Stuart | – | ○ | – | |
| Too Good To Go | – | – | – | |
| OLIO | – | – | – | |
| Shop app (Shopify) | – | – | – | |
| Etsy | – | – | – | |
| Bookshop.org / Hive | – | – | – | |
| Zapp / Zoom by Ocado | – | – | – | |
| Square Online / SumUp / Teya | – | ○ | – | |

Outside these products, Sam asks on Reddit (u/akat224, u/grand_web, u/claudiav2603), phones ahead (u/jamesshovlin), checks a chain's website before collecting (Dbank) and, once, asks X's AI chatbot which shop has an item (@Jojo_agboola). Jess uses the supermarket for the week (u/killmetruck). Ruth buys something at the newsagent that keeps a post office counter (u/Aggravating-Desk4004). The evidence is in [findings](netnography/findings.md) and on the [persona page](personas/index.md).

## Selection and sources

I started from the brief and kept every product that serves someone trying to buy from a nearby shop, plus two recent failures (ShopAppy and the quick-commerce start-ups). I added Co-op's Peckish and Hive, and left out Faire because it sells wholesale to shops.

Quotes come from three sources that can be read without an account:

- **UK App Store reviews**, pulled from Apple's public review feed, which gives author, date and full text. App Store reviews have no permalinks, so each card links to the app's UK reviews page and its context carries the Apple review id.
- **Trustpilot UK**, read on each review's own page.
- **Mumsnet**, read on the thread, with the reply id in the link.

Every quote is dated between 1 May 2025 and 1 November 2026 and was checked against the source. Quotes are trimmed to the essential words, with "…" where words were cut.

Reddit refused the research tools, and X, TikTok and Instagram need a login, so this page has no quotes from those networks; the [netnography](netnography/method.md) covers Reddit separately. App Store and Mumsnet voices skew older and more complaint-heavy than r/london. App Store reviews cover the whole UK. NearSt, Peckish and ShopAppy have no consumer reviews in the window, and no Teya review I found mentions selling online.

## Comparison

| Product | Category | How people find things | How the purchase resolves | Who pays | UK status |
| --- | --- | --- | --- | --- | --- |
| Google local listings + NearSt | Local stock discovery | Item-level "in stock nearby" on Search and Maps, fed from the shop's till system | No purchase; the shopper walks in or clicks out. Google's multi-shop Universal Cart is US-only | Free listings; shops pay NearSt; Google sells local inventory ads | Live; NearSt is London-based |
| Instagram / WhatsApp / Facebook | Where small shops already sell | Follow and scroll; no reliable hours or stock | A conversation, then bank transfer, payment link or pay in store | Free to the shop | Everywhere |
| Amazon | The default alternative | Huge search | One basket across many sellers; same-day fresh groceries in parts of London since June 2026 | Seller fees; Prime subscription | Live |
| Nextdoor | Neighbourhood network | Neighbour recommendations and a "Local Faves" hub, by business not item | None; contact the business | Advertisers | Live |
| ShopAppy and BID apps | Town directories | Per-town directory of independents | Click & collect, courier, pay on pickup | Councils and BIDs often paid the first year | ShopAppy ceased trading in 2023; BID apps are loyalty schemes |
| Deliveroo | Delivery marketplace | Browse by store and category, search, paid placement | One store per order; Deliveroo riders | Shop commission (reported 20–35%) plus shopper fees | Live; owned by DoorDash since October 2025 |
| Uber Eats | Delivery marketplace | Browse by store, grocery tabs, search | One store per order in the UK; two-store bundles exist in the US | Shop commission plus shopper fees | Live |
| Just Eat | Delivery marketplace | Browse by store, "Shops" section | One store; own couriers or the shop delivers | Commission (reported ~14% if the shop delivers) plus shopper fees | Live; owned by Prosus since October 2025 |
| Co-op Peckish | Delivery tool for independent grocers | Each shop's own storefront; no shared browsing found | One shop; the shop delivers, or Uber Direct / Just Eat | Shop pays a lower commission (reported) | Launched February 2025 |
| Gophr / Stuart | Same-day couriers | None; the shop books | Courier from shop to door | Shop pays per job | London and other cities |
| Too Good To Go | Surplus food | Map of nearby shops; "Surprise Bags", so no item search | One shop; prepaid; collection only, in a set window | Shop pays an annual fee and commission per bag | Live; founded in London |
| OLIO | Free sharing | Map of free items nearby | Free; collection arranged by chat | Retail partners pay for collections | Live |
| Shop app (Shopify) | Multi-shop checkout | Brand following and order tracking; no "near me" | Up to 15 shops in one Shop Pay checkout since October 2026, each shop still the seller; Shopify stores offer local pickup and delivery | Shop subscription and payment fees | Universal checkout's UK date unconfirmed |
| Etsy | Handmade marketplace | Keyword search, "Find similar", shop-location filter | One basket, separate orders and postage per shop; no collection flow | Seller listing, transaction and ad fees | Live |
| Bookshop.org / Hive | Books, with a cut for local shops | Central catalogue built on ISBNs; shopper names a local shop | Central warehouse posts the book; the local shop gets a share | Funded from the cover price | Live |
| Zapp / Zoom by Ocado | Quick commerce | A short, curated catalogue | Own stock and riders, 20–60 minutes | Shopper fees and margin | Zoom in a few catchments; Zapp's status unclear; Getir and Gorillas left in 2024 |
| Square Online / SumUp / Teya | Merchant storefronts and payments | The shop's own site only | One shop; pickup or local delivery run by the shop | Shop pays processing fees | Live |

## Products related to the personas

### Google local listings and NearSt

**Sam ✓ (step 1, find out) · Ruth ○ (step 2, find it).** Sam uses Google today: u/dy14n19 checked it to see whether a Hammersmith patisserie was still open and didn't trust the answer. For Ruth it's an option: Google could tell her a shop has closed or changed its hours, but her weekly butcher was shut during its advertised hours (Valentando), which is the same failure.

Google shows what nearby shops have "in stock" on Search, Shopping and Maps, and its Business Profile is where most people check opening hours. The stock comes from the shop's till system: NearSt, a London start-up, connects more than 150 point-of-sale systems to Google and, since 2025, to the stock feeds of Deliveroo, Uber Eats and Just Eat ([Google Merchant Center Help](https://support.google.com/merchants/answer/15609877?hl=en-GB); [Asian Trader](https://www.asiantrader.biz/nearst-tech-connects-uber-eats-deliveroo-just-eat)). It is the best item-level local search there is, but only for shops whose tills hold clean product codes, which leaves out most bakers, florists and butchers. Nothing is bought on Google for local stock: the shopper walks in or clicks out, and Google's new multi-shop Universal Cart launched in the US only, on 15 October 2026 ([Digital Commerce 360](https://www.digitalcommerce360.com/2026/10/16/google-universal-cart-launch-features/)).

```quote
text: "the opening times listed on Google have no basis in reality."
handle: zingally
network: Mumsnet · Am I Being Unreasonable
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148978039
tags: google-local, opening-hours, negative
context: Thread about independent shops being shut when their listings say they're open.
status: verified
```

```quote
text: "…when you're searching for a category. When I'm looking for a flower store, I really don't need to know about local cake shops or nightclubs"
handle: user64946284
network: App Store (UK) · Google Maps
date: 2026-10-03
url: https://apps.apple.com/gb/app/id585027354?see-all=reviews
tags: google-maps, category-search, negative
context: 3-star review, Apple review id 14622524493. Searching by type of shop returns noise.
status: verified
```

### Instagram, WhatsApp and Facebook

**Sam ○ (step 1, find out) · Ruth ○ (step 2, find it).** Shoppers do use WhatsApp to share stock: during the eclipse rush u/jamesshovlin pointed to a shopper-run restock group. That post sits outside the persona clusters, so I don't count it as Sam using it today. For Ruth, a shop's Facebook page is where the day's hours sometimes appear; no post shows her checking it.

For many London florists, bakers, butchers and boutiques, Instagram or Facebook is the shop window and ordering happens by message or phone, with payment in store, by bank transfer or by payment link. Nothing in these channels is structured: no reliable hours, stock, address or price, and every order is a conversation. They are free and personal, and they suit one-offs and made-to-order work. Two posters in one Mumsnet thread say shops post the day's hours only on Facebook, or have no way to order at all.

```quote
text: "He is a bookshop with no website, so I can't order books from him at home."
handle: Codyrhodesisaheel
network: Mumsnet · Am I Being Unreasonable
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977812
tags: social-only-shops, no-transaction-rail, negative
context: The shopper wants to buy from a local independent and has no channel to do it.
status: verified
```

```quote
text: "Several more shops seem to rely on posting that days opening hours on their FB page"
handle: BeansAndNoodles
network: Mumsnet · Am I Being Unreasonable
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves
tags: social-only-shops, opening-hours, negative
context: Opening post of the thread.
status: verified
```

### Amazon

**Sam ✓ (step 1, find out) · Jess ✓ (step 4, get it).** Amazon is where both fall back. Sam: Dbank found none of the seven a shop's website listed and bought on Amazon; u/Mediocre_Sprinkles walked every shop and went home to order. Jess: LividArse shops on Amazon "because it's always there". It has limits for them too: before the eclipse u/WearyChampionship365 found nobody could deliver in time.

Amazon is what a high-street app is measured against: one basket, one payment, a delivery promise and easy returns. Since June 2026 it adds fresh groceries to same-day delivery in parts of central and east London ([About Amazon](https://www.aboutamazon.co.uk/news/retail/amazon-customers-can-now-add-fresh-groceries-to-same-day-delivery-orders-in-parts-of-london)). Its App Store reviewers praise price and returns and complain about search when they don't know exactly what they want. Some say slipping delivery promises are sending them back to the high street.

```quote
text: "I'd rather go to towns high streets now because even on prime and even when you pay same day delivery it still doesn't arrive."
handle: gidfles
network: App Store (UK) · Amazon Shopping
date: 2026-10-23
url: https://apps.apple.com/gb/app/id335187483?see-all=reviews
tags: amazon, same-day-reliability, high-street, negative
context: 1-star review, Apple review id 14702225618.
status: verified
```

```quote
text: "The app is good when you know what you want. When you don't; it's like asking a drunk for street directions."
handle: KJCM98...3
network: App Store (UK) · Amazon Shopping
date: 2026-10-22
url: https://apps.apple.com/gb/app/id335187483?see-all=reviews
tags: amazon, exploratory-search, negative
context: 2-star review, Apple review id 14698589453.
status: verified
```

### Nextdoor

**Ruth ○ (step 2, find it).** Ruth hears about shops from neighbours and local forums, which is what Nextdoor is for. No post in her cluster names it. It finds businesses, not items, so it doesn't answer Sam's question.

Nextdoor is a neighbourhood network where people recommend local businesses; Nextdoor says recommendations make up about 30% of its content. In September 2026 it launched "Local Faves", a hub that ranks nearby businesses by neighbours' trust, with AI summaries of what neighbours say, available in the UK ([Nextdoor via Nasdaq](https://www.nasdaq.com/press-release/nextdoor-deepens-its-commitment-local-business-discovery-and-recommendations-2026-09)). Nothing can be bought. Its reviews show what people value: a verified, small radius. Owners struggle to keep their pages up to date.

```quote
text: "Used to work well as a local app. Now you get info from 50 miles away."
handle: Dj wade mister
network: App Store (UK) · Nextdoor
date: 2026-10-06
url: https://apps.apple.com/gb/app/id640360962?see-all=reviews
tags: nextdoor, hyperlocal-radius, negative
context: 1-star review, Apple review id 14634752755.
status: verified
```

```quote
text: "This app is terrible for business. It's almost impossible to add and edit your business information, so many glitches."
handle: AppleG69
network: App Store (UK) · Nextdoor
date: 2026-08-08
url: https://apps.apple.com/gb/app/id640360962?see-all=reviews
tags: nextdoor, merchant-burden, negative
context: A business owner's 1-star review, Apple review id 14402387098.
status: verified
```

### ShopAppy and BID apps

**Jess ○ (step 4, get it) · Ruth ○ (step 2, find it).** ShopAppy offered what Jess lacks, click & collect and pay on pickup from independents, and a list of which shops a town still has, which is Ruth's question. Neither can use it: it closed in 2023.

ShopAppy was a "virtual high street" founded around 2016: each town got a directory of independent shops with click & collect, couriers, pay on pickup and collection points, often paid for by councils (Kingston and Enfield in London among them). It reached more than 120 towns, ceased trading in October 2023, and the company was dissolved in February 2025 ([Companies House](https://find-and-update.company-information.service.gov.uk/company/10285855)). The account now on its old domain says the cost of running a platform for thousands of micro-merchants outran its revenue, and that most small shops couldn't keep up real-time stock, online payments and shipping ([ShopAppy story](https://shopappy.com/the-shopappy-story)). Today's BID apps are loyalty and discount schemes, such as Love Leam in Leamington ([BID Leamington](https://bidleamington.com/love-leam-app-launches/)), and I found no London BID app that searches stock or takes orders. There are no reviews in the window.

### Deliveroo

**Jess ○ (step 4, get it) · Ruth ○ (step 2, find it).** Deliveroo gets a local shop's goods to Jess outside her working hours, paid by card. No post in her cluster mentions it. The one post that does, u/Inge_Jones ordering from a local restaurant "to keep them afloat", sits outside the map, closest to Ruth.

Deliveroo has gone well beyond restaurants: groceries, Hop dark stores and, since 2023, non-food "Shopping" from partners such as Boots and B&Q, plus what it calls thousands of independent retailers. DoorDash completed its £2.9bn purchase in October 2025 ([Business Wire](https://secure.businesswire.com/news/home/20251002060133/en/DoorDash-Completes-Acquisition-of-Deliveroo)). Shoppers browse by store and category, and paid placement shapes ranking. Each order is one store, delivered by Deliveroo riders, with commission reported at 20–35% plus shopper fees ([DineOpen](https://www.dineopen.com/blog/deliveroo-vs-just-eat-vs-uber-eats-commission-2026)). Stock comes from menus the shop maintains, so items often turn out to be unavailable only after payment.

```quote
text: "Wanted paint for a current project but only toiletries turned up. Puzzled how this shop has no paint in? ( white paint!)"
handle: Mel59u
network: App Store (UK) · Deliveroo
date: 2026-10-27
url: https://apps.apple.com/gb/app/id1001501844?see-all=reviews
tags: deliveroo, non-food-retail, assortment, negative
context: 1-star review, Apple review id 14717839950. Someone shopping for DIY on a food-first app.
status: verified
```

```quote
text: "Good service but anything out of stock you never get the refund so be careful what you order…"
handle: Anthony Tindall
network: App Store (UK) · Deliveroo
date: 2026-10-27
url: https://apps.apple.com/gb/app/id1001501844?see-all=reviews
tags: deliveroo, substitutions-refunds, mixed
context: 2-star review, Apple review id 14717220291.
status: verified
```

### Uber Eats

**Jess ○ (step 4, get it).** Same role as Deliveroo for Jess: delivery from nearby shops, card only, outside shop hours. No post shows her using it. Its reviewers hit Jess's two complaints from the other side: wrong hours and slow delivery.

Uber Eats carries a lot of UK grocery and convenience stock, including Co-op in more than 1,300 stores ([Grocery Gazette](https://www.grocerygazette.co.uk/2025/03/19/co-op-uber-eats-partnership/)). Its "bundle a second store" feature, two nearby shops for one delivery fee, launched in the US in 2023 and I could not confirm it in the UK ([Uber](https://www.uber.com/us/en/newsroom/multi-store-ordering/)). Uber Direct rents its couriers to shops that keep their own storefront. Reviews complain about mark-ups against shelf prices, opening hours that don't match reality and slow grocery deliveries.

```quote
text: "…sent the driver to pick it up from a store that was closed, and that is always closed at that location…"
handle: Udohulk
network: App Store (UK) · Uber Eats
date: 2026-10-28
url: https://apps.apple.com/gb/app/id1058959277?see-all=reviews
tags: uber-eats, opening-hours-data, negative
context: 1-star review, Apple review id 14723705027.
status: verified
```

```quote
text: "you may as well walk to the shop and buy your stuff as deliveries take a stupid length of time"
handle: Jim Rickety
network: App Store (UK) · Uber Eats
date: 2026-10-17
url: https://apps.apple.com/gb/app/id1058959277?see-all=reviews
tags: uber-eats, delivery-speed, negative
context: 1-star review, Apple review id 14676968657. When the shop is close, delivery has to beat walking.
status: verified
```

### Just Eat

**Jess ○ (step 4, get it).** Jess doesn't use it. Its users already feel the guilt about not buying locally that shows up in Jess's cluster.

Just Eat, owned by Prosus since October 2025, has a "Shops" section for convenience and grocery and delivers for Peckish ([RetailDetail](https://www.retaildetail.eu/news/food/acquisition-of-just-eat-takeaway-completed-the-hard-work-is-just-beginning/)). Its reported commission, about 14% when the shop delivers, is the lowest headline rate of the big three. Orders are one store each, and large ones can be split between two drivers, which reviewers find confusing. Its users know the fees hurt local shops, and some ask for more non-food retail.

```quote
text: "if you've ever talked to a shop or cafe that uses them. JE fees are crippling. I feel bad keeping buying…"
handle: Mykul1982
network: App Store (UK) · Just Eat
date: 2026-10-30
url: https://apps.apple.com/gb/app/id566347057?see-all=reviews
tags: just-eat, merchant-fees, guilt, mixed
context: 3-star review, Apple review id 14730904946, from a housebound user.
status: verified
```

```quote
text: "I'd love to see some clothing shops for children.. maybe things like hats & scarfs & socks etc…"
handle: TheCuriousTravellers
network: App Store (UK) · Just Eat
date: 2026-10-24
url: https://apps.apple.com/gb/app/id566347057?see-all=reviews
tags: just-eat, non-food-demand, positive
context: 5-star review, Apple review id 14705035024. Demand for local non-food shops on a delivery app.
status: verified
```

### Co-op Peckish

**Jess ○ (step 4, get it).** Peckish lets an independent convenience shop deliver at its own prices. That fits Jess's routine shopping more than a special trip. No post shows her using it.

Peckish launched in February 2025 as a delivery app and order system that any independent convenience shop can use, selling at its own prices ([The Grocer](https://www.thegrocer.co.uk/news/co-op-launches-rapid-grocery-delivery-app-for-independents-called-peckish/701536.article)). The shop delivers itself, or Co-op passes the order to Uber Direct or Just Eat, for a commission reported at single digits or about half the aggregators' rate. I found no shared browsing across shops and no UK App Store listing under that name, and there are no consumer reviews in the window. A large incumbent is betting that independents need cheaper infrastructure more than another marketplace.

### Gophr and Stuart

**Jess ○ (step 4, get it).** The courier leg behind a same-day local delivery. Jess never sees it; a shop or an app would book it for her. It also bears on Sam's deadline, though Sam's failure is in knowing.

Gophr is a London-founded same-day courier network that delivers for Screwfix Sprint and runs B&Q's TradePoint Express service ([London Loves Business](https://londonlovesbusiness.com/bq-to-start-same-day-deliveries/)). Stuart offers couriers through an API with live tracking ([Stuart](https://stuart.com/courier-service-london/)). The shop books and pays per job, and the shopper never sees the courier company's app. Hardware chains already sell 30-to-90-minute delivery through them to Londoners without a car.

```quote
text: "Great service from order to delivery of wheelbarrow about 1 hour as have no car was great"
handle: Barry Griffiths
network: Trustpilot (UK) · Gophr
date: 2026-10-09
url: https://uk.trustpilot.com/reviews/6ac90d1b34558118b76c3fb3
tags: gophr, bulky-items, car-free, positive
context: 5-star review. Delivery makes a bulky purchase possible without a car.
status: verified
```

```quote
text: "Ordered and delivered within 30 mins, Screwfix Sprint…"
handle: KR
network: Trustpilot (UK) · Gophr
date: 2026-10-30
url: https://uk.trustpilot.com/reviews/6ae4599dc4731f35a7af3d90
tags: gophr, hardware-same-day, positive
context: 5-star review. A hardware chain's 30-minute promise kept by a third-party courier.
status: verified
```

### Square Online, SumUp and Teya

**Jess ○ (step 4, get it).** Card readers answer one of Jess's frictions directly: cash-only stalls when she carries no cash (u/rsweb). No post shows her choosing a shop because it takes cards.

The card-payment companies small shops already use, each with a way to sell from the shop's own site ([Square](https://squareup.com/gb/en/online-store)). Teya, the company that set this brief, publicly lists card terminals, a business account, payment links and Shopify and WooCommerce plugins ([Teya Pay by Link](https://www.teya.com/online-payments/pay-by-link)). Each store is an island, with no browsing across shops; a shop's sales and, in some cases, its stock data already pass through them.

```quote
text: "SumUp has been amazing setting up my 3D printing business and providing me with a website store to sell my products"
handle: BikeCam David
network: Trustpilot (UK) · SumUp
date: 2026-10-07
url: https://uk.trustpilot.com/reviews/6ac57954df7990f1219e4121
tags: sumup, merchant-online-store, positive
context: A business owner's 5-star review. The payment provider is the route to a web store.
status: verified
```

## Other products

None of these answers what Sam, Jess or Ruth need now. They bear on other questions in the brief.

### Too Good To Go

Surplus food: shoppers prepay a "Surprise Bag" from a nearby shop and collect it in a set window; there is no item search by design ([Too Good To Go](https://www.toogoodtogo.co.uk/en-gb/business)). It shows people will plan a trip around a pickup window at a small bakery, and what happens when the app's stock is wrong.

```quote
text: "Order was cancelled as I was at the till to collect because the store had no surplus, so a completely waisted journey…"
handle: Montymoo2
network: App Store (UK) · Too Good To Go
date: 2026-09-23
url: https://apps.apple.com/gb/app/id1060683933?see-all=reviews
tags: too-good-to-go, inventory-truth, refund, negative
context: 1-star review, Apple review id 14584934531.
status: verified
```

### OLIO

Free sharing of food and household items between neighbours, with volunteers collecting surplus from supermarkets such as Tesco ([The Grocer](https://www.thegrocer.co.uk/news/tescos-olio-food-waste-partnership-hits-100-million-meals/723887.article)). Neighbours will collect within a window when it's worth it, and short windows shut people out.

```quote
text: "most of them post at 9pm and expect you to show up shortly before 9:30…"
handle: sleepy.uwu.nova
network: App Store (UK) · OLIO
date: 2026-09-26
url: https://apps.apple.com/gb/app/id1008237086?see-all=reviews
tags: olio, pickup-windows, accessibility, negative
context: 2-star review, Apple review id 14597041444. Short windows shut out people on slow public transport.
status: verified
```

### Shop app (Shopify)

Since October 2026, carts from up to 15 Shopify shops paid in one Shop Pay checkout, each shop still the seller ([Shopifreaks](https://www.shopifreaks.com/shopify-launches-universal-checkout-in-the-shop-app-letting-shoppers-buy-from-multiple-brands-with-one-cart-and-one-checkout/)). Shopify stores also offer local pickup and delivery ([Shopify](https://www.shopify.com/local-delivery)), but the app has no sense of "near me" and no UK date. It is the clearest public example of one checkout across many independents.

```quote
text: "this helps me to keep track what I've ordered and when I should expect it… with quick links to message sellers."
handle: MoogStarr
network: App Store (UK) · Shop
date: 2026-10-15
url: https://apps.apple.com/gb/app/id1223471316?see-all=reviews
tags: shop-app, multi-merchant-tracking, positive
context: 5-star review, Apple review id 14669838962. One place for orders from many shops.
status: verified
```

### Etsy

A global handmade marketplace: one basket across many shops, each shipping separately, with no collection ([Etsy Help](https://help.etsy.com/hc/articles/115015627947)). It proves one basket across thousands of tiny sellers works, and that "local" there is a label sellers type in.

```quote
text: "I love finding unique gifts as well as supporting small businesses and I am NEVER disappointed on Etsy…"
handle: Grotty75
network: App Store (UK) · Etsy
date: 2026-10-20
url: https://apps.apple.com/gb/app/id477128284?see-all=reviews
tags: etsy, support-small-business, positive
context: 5-star review, Apple review id 14690302358.
status: verified
```

### Bookshop.org and Hive

Books sold online with a share passed to independent bookshops; Bookshop.org had paid indies more than £4m by January 2025 ([The Bookseller](https://www.thebookseller.com/news/bookshoporg-surpasses-4m-profit-for-indie-bookshops)). ISBNs make one clean catalogue easy, but the book ships from a central warehouse.

```quote
text: "Hive shouldn't advertise items as in stock when they aren't and shouldn't accept orders for items they don't have."
handle: customer
network: Trustpilot (UK) · Hive
date: 2025-12-19
url: https://uk.trustpilot.com/reviews/694484566e150e09333d2c40
tags: hive, inventory-truth, negative
context: 1-star review titled "Don't lie about available stock".
status: verified
```

### Zapp and Zoom by Ocado

Quick commerce: a short catalogue, own stock and riders, delivery in under an hour. Getir left the UK in April 2024 ([The Grocer](https://www.thegrocer.co.uk/news/rapid-grocer-getir-confirms-uk-exit/690798.article)), Zapp's website no longer resolves, and Zoom delivers from a handful of sites including Acton ([Zoom](https://zoom.ocado.com/)).

```quote
text: "Lucky to be in catchment. Work full time so this is so helpful and I can flex my shopping needs"
handle: vicsipro
network: App Store (UK) · Zoom by Ocado
date: 2026-10-08
url: https://apps.apple.com/gb/app/id1447126432?see-all=reviews
tags: zoom-ocado, coverage, positive
context: 5-star review, Apple review id 14644783903.
status: verified
```

## Patterns

*My reading of the reviews above and the persona posts. The counts are small.*

**Sam: stops at step 1, find out.**

1. No product answers "who has it, right now" for an independent. Google with NearSt is the only item-level local search, and it needs clean product codes from a till, which most bakers, florists and butchers don't have. So Sam asks people: Reddit, a WhatsApp restock group, an AI chatbot.
2. Wrong availability is the most common complaint, whatever the model. Deliveroo shoppers pay and then hear items are out of stock (Anthony Tindall), Too Good To Go shoppers reach the till and there's no surplus (Montymoo2), and Hive takes orders for books it doesn't have (customer). Opening hours fail the same way on Google (zingally) and Uber Eats (Udohulk). For Sam, a product that claims stock and is wrong costs him the trip and the deadline (Dbank).

**Jess: stops at step 4, get it.**

3. Delivery from local shops already exists, one shop at a time and at a price. Deliveroo, Uber Eats, Just Eat and Peckish deliver out of hours and take cards, at 14–35% commission plus fees. Jess still goes to Amazon. No post in her cluster mentions a delivery app.
4. Amazon's promise is the bar, and it is slipping. Some Amazon users say same-day delivery doesn't arrive and they would rather go to the high street (gidfles). Delivery from a nearby shop has to beat walking there (Jim Rickety). Gophr shows the courier leg already works in an hour for car-free Londoners (Barry Griffiths).

**Ruth: stops at step 2, find it.**

5. Nothing is built for her. Her question is which shops are still here and open. Directories that answered it haven't lasted: ShopAppy closed, BID apps became loyalty stamps, and Nextdoor users complain when the radius widens (Dj wade mister).
6. The information she relies on goes stale. Hours live on Facebook (BeansAndNoodles), Google's hours are wrong (zingally), and owners struggle to edit the profiles they have (AppleG69). Her weekly butcher being shut during its advertised hours (Valentando) is the same failure.

**Across the brief.**

7. One basket across many sellers exists, but only with postal delivery. Amazon and Etsy combine sellers in one basket; Shop app's universal checkout and Google's Universal Cart arrived in October 2026. None combines several local shops with collection or a single local delivery.
8. "Support local" brings people in, and a bad experience sends them away. Shoppers name it as a reason to buy (Grotty75) and feel guilty about the fees shops pay (Mykul1982). Hive's "in stock" failure landed on exactly those shoppers.

## White space

*Ideas that follow from the patterns above. I found no product that does any of them.*

- **Sam.** Availability could be a promise the shop confirms. He already asks people who has it. The same question could go to nearby shops, and the shop that has it accepts and holds it, so he sees "it's bagged" before leaving. That answers the most common complaint without asking shops for a catalogue.
- **Jess.** She could get things from the street on her hours: collection after the shop shuts, card payment, or one courier run across several shops on the same street, each shop still the seller. The checkout pieces exist (Shop app, Etsy) and the courier pieces exist (Gophr, Uber Direct); nobody has joined them for a high street, priced against Amazon same-day.
- **Ruth.** She needs to know what's still here and open, kept current without work from the owner. Till and card-payment records already pass through providers like Square, SumUp and Teya, and could feed opening hours and "trading today" without new admin.
- **No persona.** Shops without product codes could show "what's new on your street today": today's bake, this week's flowers. Amazon users say search fails when they don't know what they want (KJCM98...3), and surprise works for Too Good To Go. This sits at the browsing end, where none of the three clusters is.
