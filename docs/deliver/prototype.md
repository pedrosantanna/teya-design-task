# Prototype

The shopper app running in the browser, from the same Expo code that runs on iPhone and Android. Content is mocked; the shops answer on a script. Press D, or the button at the top right, to open the state debugger, a panel docked to the right of the phone, and change the persona, the platform, the journey step and the state of each request, answer and order.

```summary
Takeaways:
- One Expo app builds iOS, Android and this web version (decision 038); the frame switches between an iPhone and a Pixel with the platform.
- The state debugger is a panel docked to the right of the phone, in collapsible sections like Figma's right panel. It sets persona (Sam or Jess), platform, light or dark, journey step, the states from the conceptual model and the content set; the simulation clock can be paused or stepped.
- Sam's journey runs end to end: ask, answers arriving, buy, wait for the shop, collect; every failure path from app flow v7 is one jump away.
- Twelve invented shops around Blythe Road carry the demo journey, each traced to something heard in Discovery; 30 more fill Nearby and the Category screens, for 42 in all.
Call:
- I asked for a prototype that runs as a real app for the recording and as a web build inside these docs, with a debugger to set any state while I navigate, and an iPhone or Android frame around it.
- I asked for every screen to be checked by the screen reviewer before publishing; its findings were fixed in this build.
- I asked for about twelve shops used the same way everywhere, with more kinds of shop and photos that look like small British shopfronts.
AI:
- Agents built the store and debugger, the design-system components, the screens and the simulation from the OpenSpec changes; another agent reviewed the running screens and a last one fixed what it found.
- An agent drafted the twelve shops from the Discovery files, picked and checked the Unsplash photos and wrote the demo script below; photo credits stay in the code.
Trade-offs:
- The web build can't show native glass, haptics or the real payment sheets; they are drawn, and the recording uses the iOS build.
- The photos are of real shops elsewhere in Britain and Europe, so some show another shop's name on the sign.
```

Open it on its own to use the full window: `app-web/index.html`. On windows narrower than 800 px the panel overlays from the right, with a close button, instead of docking. Add `?debug=0` to hide the debugger, `?os=android` for Android, or `?step=` to start at a step.

The panel offers only the controls that change the screen on show. Persona, platform, scheme, phone frame, journey step, clock and actions are always there; the rest follow the route and the open sheets (Loading shows on Nearby and shop pages, Shop hours in the chat only while the details sheet is open, the outcomes only where a payment or a shop's reply can happen next). Each section ends with a line naming what it hides, and a section with nothing to change folds to its title with "No effect on this screen". The rules are in `app/src/debug/relevance.ts`.

## Mocked content

All shops are invented and sit around Blythe Road, W14. Walk times are from Blythe Road; the Work place (Kensington High St, W8) reuses Olympia Cameras, Abingdon Deli and Church Street Books at 3, 4 and 9 minutes, with seven of the other shops below. The accent follows the shop's kind in `app/src/store/kinds.ts`. Lavender is kept for Snuffle, so shops use only Butter, Peach and Pistachio; the 12 demo shops are four of each. A connected shop answers from its till; an asked shop answers by message (WhatsApp).

Every photo in the prototype is a real photo from Unsplash, chosen by an agent and checked against its Unsplash page (photographer, profile and page are kept with it in `app/src/content/images.ts`), then downloaded and bundled, so the app makes no request to Unsplash and nothing is picked at random. A request's photo is one of these: each item in the demo (eclipse glasses, birthday cake, sourdough loaf, picture hooks, desk fan, bouquet) has its own photo plus five more of the same item, and the shopper can switch between the six from the photo in the chat's bar. A product needs its photos added by hand; an item the demo doesn't know has none. Credits are not shown in the app.

| Shop | Kind | Street | Walk | Hours | Answers | Collect within | Delivers | Accent |
|---|---|---|---|---|---|---|---|---|
| Blythe Road News | Newsagent, post counter | Blythe Road | 1 min | 7am–11pm | Asked | 7 days | No | Butter |
| Rossi's Bakery | Bakery | Blythe Road | 2 min | 7am–6pm | Asked | Same day; cakes need 2 days' notice | No | Butter |
| Brook Hardware | Hardware | Shepherd's Bush Road | 8 min | 8am–5:30pm | Asked | 30 days | £5, next day | Butter |
| Brook Green Toys | Toys | Shepherd's Bush Road | 9 min | 10am–6pm | Asked | 30 days | No | Peach |
| Goldhawk Butchers | Butcher | Goldhawk Road | 11 min | 8am–5:30pm | Asked | Next day | No | Peach |
| Broadway Chemist | Chemist | Hammersmith Broadway | 11 min | 8am–8pm | Connected | 7 days | No | Pistachio |
| Olympia Cameras | Cameras | Kensington High Street | 14 min | 10am–6pm | Asked | 14 days | No | Peach |
| Paper & Co | Stationer | King Street | 13 min | 9am–7pm | Asked | 7 days | £3.50, today | Pistachio |
| Halo Florist | Florist | Goldhawk Road | 13 min | 8am–5pm | Asked | Same day | £6, today | Pistachio |
| Bush Opticians | Opticians | Shepherd's Bush Green | 10 min | 9am–6pm | Asked | 14 days | No | Pistachio |
| Abingdon Deli | Deli | Abingdon Road | 25 min | 8am–8pm | Asked | Same day | £4, today | Peach |
| Church Street Books | Bookshop | Kensington Church Street | 28 min | 9am–7pm | Connected | 30 days | No | Butter |

The 15-minute radius shows the first ten shops. Walk times come from real walking routes from 163 Blythe Road (decision 063), and the deli and the bookshop are 25 and 28 minutes away, past even the 20-minute radius, so no Nearby list shows them.

### Other shops

Nearby and the Category screens also list 30 more invented shops, so every category has two to four places within 15 minutes on foot (the walk times come from real routes, decision 063); the 12 shops above carry the demo journey, and the other 30 are never asked in it. Fishmongers sit under Butcher, plant shops under Florist and the games shop under Toys; Abingdon Deli moves to a Deli category with the same Peach accent. Each has hours, a collection window, three items with prices, ratings and how it does on Snuffle (`app/src/store/seed-more.ts`). The Work place also lists seven of them. Each has a shopfront or inside photo from Unsplash, bundled at 640 px, and eight have a second photo.

| Category | Shop | Street | Walk | Answers | Note |
|---|---|---|---|---|---|
| Bakery (Butter) | Brook Green Bread, artisan bakery | Brook Green | 5 min | Asked |  |
|  | Pastelaria Estrela, Portuguese pastelaria | Hammersmith Road | 10 min | Asked |  |
|  | Sugar & Spoon Cakes, cake maker | Shepherd's Bush Road | 10 min | Asked | 3 days' notice; delivers |
| Café (Peach) | The Blythe Café, café | Blythe Road | 3 min | Asked |  |
|  | Yellow Door Coffee, coffee shop | Hammersmith Road | 10 min | Asked | New |
|  | Grove Café, café | Brook Green | 9 min | Asked |  |
| Deli (Peach) | Alimentari Bellini, Italian grocer | North End Road | 12 min | Connected |  |
|  | Hammersmith Cheese Room, cheesemonger | King Street | 12 min | Asked | Delivers |
|  | Askew Road Deli, deli | Askew Road | 21 min | Asked |  |
| Hardware (Butter) | Heel & Key, key cutter and cobbler | Hammersmith Road | 10 min | Asked |  |
|  | Hammersmith Paint & DIY, paint and DIY | King Street | 14 min | Asked | Delivers |
| Toys and games (Peach) | Brook Green Games, games shop | Shepherd's Bush Road | 10 min | Asked |  |
|  | Little Bear Toys, toy shop | Holland Road | 10 min | Asked | New |
| Butcher and fish (Peach) | Goldhawk Fish, fishmonger | Goldhawk Road | 10 min | Asked |  |
|  | Larkin & Sons Butchers, organic butcher | Askew Road | 22 min | Asked | Cuts to order |
| Chemist (Pistachio) | Brook Green Pharmacy, independent pharmacy | Brook Green | 4 min | Connected |  |
|  | Hammersmith Health Foods, health-food shop | King Street | 15 min | Asked |  |
| Cameras (Peach) | Addison Cameras, camera shop | Holland Road | 11 min | Asked | Delivers |
|  | Silver Halide Film Lab, film lab | Uxbridge Road | 15 min | Asked | New, no ratings |
| Stationery (Pistachio) | Quill & Ledger, stationer | Hammersmith Road | 11 min | Connected |  |
|  | Pigment Art Supplies, art supplies | Shepherd's Bush Road | 7 min | Asked | New |
| Florist and plants (Pistachio) | Fern & Pot, plant shop | Brook Green | 6 min | Asked | New, no ratings |
|  | Wild Stem Flowers, florist | North End Road | 13 min | Asked | Delivers |
| Opticians (Pistachio) | Clear View Opticians, opticians | Holland Road | 9 min | Asked |  |
|  | King Street Opticians, opticians | King Street | 16 min | Asked |  |
| Newsagent (Butter) | Brook Green News & Wine, corner shop | Brook Green | 5 min | Asked |  |
|  | Goldhawk Road Kiosk, news kiosk | Goldhawk Road | 12 min | Asked |  |
| Books (Butter) | Riverside Books, new books | Hammersmith Road | 11 min | Connected |  |
|  | Second Chapter Books, second-hand books | Shepherd's Bush Road | 7 min | Asked |  |
|  | Panel Comics, comics | King Street | 17 min | Asked | New |

### Items and sources

| Shop | Three items | Where it came from |
|---|---|---|
| Blythe Road News | Birthday candles £1.99, AA batteries (4) £4.50, birthday card £2.95 | A shopper who always buys something at the newsagent when using its post office counter (u/Aggravating-Desk4004, [findings](../discover/netnography/findings.md), section 8). It is also where Jess collects after hours. |
| Rossi's Bakery | Sourdough £4.20, rye loaf £4.50, birthday cake £32 | Shops shut when people finish work (Agix, LividArse, [findings](../discover/netnography/findings.md), sections 2 and 3) and a Hammersmith patisserie whose hours nobody trusted (u/dy14n19, same file) |
| Brook Hardware | Picture hooks (10) £2.49, desk fan £29.99, key cut £5 | Robert Dyas sold out of eclipse glasses in two branches (u/moanyjoany), a hardware shop with no stock that would order one in (u/xmastreee) and the heatwave hunt for a portable AC (u/akat224), all in [findings](../discover/netnography/findings.md) |
| Brook Green Toys | Wooden train set £24, party bag fillers £8, solar system science kit £15 | No single post. Shoppers in the eclipse threads asked any shop that might stock glasses ([dimensions](../discover/netnography/dimensions.md)); the toy shop is the one that doesn't reply |
| Goldhawk Butchers | Rib of beef cut to order £38, sausages (6) £6.50, free-range chicken £14 | A butcher open office hours only (u/killmetruck), one shut in its advertised hours (Valentando), one who cuts anything you ask (u/rising_then_falling) and lost butchers (u/mjfh2), in [findings](../discover/netnography/findings.md) |
| Broadway Chemist | Eclipse glasses £9.50, sun cream SPF 50 £8.99, hay fever tablets £4.49 | Asking a chatbot which walk-in shop has an item (@Jojo_agboola, [findings](../discover/netnography/findings.md), section 10) and stock fed from the till (F8 in [conclusion](../discover/conclusion.md)) |
| Olympia Cameras | Solar viewer cards £6, solar filter sheet £18, 35 mm film £12.50 | The practical specialist shops people miss, such as City Radio Stores (u/squeakyeggs, [findings](../discover/netnography/findings.md), section 6) |
| Paper & Co | Eclipse glasses £14.99, A4 photo frame £12, birthday card £3.50 | The eclipse rush near Hammersmith (u/grand_web, u/claudiav2603) and no online seller delivering in time (u/WearyChampionship365), in [findings](../discover/netnography/findings.md) and [personas](../discover/personas/index.md) |
| Halo Florist | Seasonal bouquet £35, single stems £4, potted orchid £22 | Flowers on a Sunday evening (assumption A4 in [conclusion](../discover/conclusion.md)) and florists that sell through Instagram and messages ([benchmarks](../discover/benchmarks.md)) |
| Bush Opticians | Clip-on sun lenses £25, glasses repair kit £6, lens cloths (3) £3 | The same eclipse threads: a shop people guess might have glasses and doesn't |
| Abingdon Deli | Olive oil £9.50, coffee beans £8, seasonal veg box £15 | The veg shop and fishmonger gone from a parade (u/Accomplished-Pen2660, [findings](../discover/netnography/findings.md), section 6) |
| Church Street Books | London street atlas £9.99, children's night-sky book £7.99, book token £10 | The bookshop with no website (Bookshop.org and Hive in [benchmarks](../discover/benchmarks.md)); books have ISBNs, so it can answer from its till |

Each shop has a shopfront photo and one or two inside or window photos from Unsplash, bundled at 800 px. Credits are in `app/src/content/images.ts` and are not shown in the app.

## Demo journey

Sam is the default persona: he needs eclipse glasses, 2 pairs, by 4pm today (Monday 2 November). Each step is a journey step in the state debugger (`app/src/store/journey.ts`); `?step=` opens the prototype on it.

| Step | Time | What happens |
|---|---|---|
| `home` | 13:01 | Nearby around Blythe Road: Browse by category, Open near you and New near you, with Delivers on the tiles of shops that deliver |
| `ask` | 13:02 | Sam types the glasses and a cake for Saturday in one message |
| `split` | 13:02 | Snuffle suggests two requests, because the items go to different shops |
| `confirm` | 13:02 | Snuffle confirms the glasses request and asks to send notifications |
| `asking` | 13:05 | Six shops asked: Broadway Chemist answers from its till (1 of 2 in stock), Bush Opticians says no, Paper & Co and Olympia Cameras have seen it, Brook Hardware and Brook Green Toys are asked |
| `away` | 13:12 | Lock screen: Paper & Co has them |
| `answers` | 13:14 | Paper & Co has them at £14.99, collect by Mon 9 Nov; Broadway Chemist has 1 at £9.50; Olympia Cameras offers solar viewer cards at £6, collect by Mon 16 Nov |
| `details` | 13:15 | Buy 2 at Paper & Co: collect within 7 days, or delivery today for £3.50 |
| `applePay` | 13:15 | Apple Pay, £29.98 |
| `waiting` | 13:16 | Waiting for Paper & Co to set them aside; not charged yet |
| `receipt` | 13:19 | Ready, collection code K7Q2, collect by Mon 9 Nov |
| `code` | 15:42 | At the counter, the code full screen |

### Failure paths

| Step | What happens |
|---|---|
| `sold` | Paper & Co sold the last pairs first; Sam isn't charged and can buy 1 at Broadway Chemist |
| `declined` | The payment doesn't go through; no order is made |
| `notConfirmed` | Paper & Co doesn't confirm within 10 minutes, so Sam isn't charged |
| `noShop` | None of the six has them before 4pm: four say no, Brook Hardware and Brook Green Toys don't reply |
| `keepLooking` | Snuffle keeps looking until Fri 6 Nov |
| `dayBefore` | Sun 8 Nov, 9:00: a reminder, with one extension to Mon 16 Nov |
| `notCollected` | Tue 10 Nov: not collected, order cancelled and £29.98 refunded |
| `delivers` | Paper & Co's own courier delivers at 14:41 for £33.48 |

### Jess

Jess wants a sourdough from Rossi's Bakery but finishes work at 6, when Rossi's closes. In `afterWork` (12:30) she buys the £4.20 loaf, and Rossi's drops it at Blythe Road News, open till 11pm, to collect the same day. `shopPage` shows Rossi's page, with the sourdough loaf under Found here recently, dated yesterday. The content sets in the debugger stress the same shops: `manyAnswers` asks all 12, `longNames` gives four of them long names.

## First run

A new shopper sees the splash (the bare mark on the background colour), three Getting started pages, the location ask and sign in before Nearby. Any sign-in button signs in as the selected persona; "Not now" is a proposal still to decide. Later launches skip it.

On the web, open the build with `?firstRun=1`, or press "Replay first run" in the debugger's Actions; the debugger's "First run" group opens each screen on its own. The web build opens on Nearby otherwise.

On iOS, delete the app from the simulator or phone and install it again, or open the account sheet (the avatar on Nearby) and tap "Replay first run", which only development builds show. The native splash comes from `app.json` and needs a rebuild (`npx expo run:ios`) after it changes.
