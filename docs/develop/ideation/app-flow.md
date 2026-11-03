# App flow

The shopper app's main flow as wireframes, from the home screen to collecting the item, with the paths for when something fails. It follows the [service blueprint](../../define/blueprint.md), steps 1 to 5, with the shops' answers simulated. Screens use Apple's iOS kit in black and white, drawn to iOS 26 and Liquid Glass since v8; visual design comes later.

```summary
Takeaways:
- The agent the shopper talks to is called Snuffle in the interface and has the mark as its avatar. It is the same agent that answers on WhatsApp and MCP.
- The home is the street with a large ask bar at the bottom, like Granola's. A round button left of the bar opens Requests full screen, a list of chats with a status per row (decision 026). There is no tab bar. The bar and the button float as a glass bottom accessory that minimises on scroll.
- The address row at the top of Nearby changes the place the shopper is shopping from; the account keeps the list of places (decision 024).
- A first run comes before Nearby: splash, Getting started in three pages, location asked in context, then sign in with Apple first among the social logins.
- After asking, the shopper can leave. Shop replies arrive as notifications and a Live Activity, and each answer appears in the chat as it comes in.
- The shopper buys: Apple Pay authorises the amount, and an asked shop's yes takes it. A connected shop's sale is immediate. Each shop sets its collection window, shown before Buy, and an order nobody collects is refunded in full (decision 037).
Call:
- I set the direction: native iOS first, Apple's guidelines before Material, Apple wins where they differ (decision 021). Hence large titles, page sheets, Apple Pay and Live Activities.
- I set the structure (the composer bar at the bottom, the avatar menu, the screens in the flow) and chose a round Requests button left of the ask bar that opens Requests full screen (decision 026).
- I asked for Hold to be dropped because it read as a free reservation and left the shopper unsure whether they had bought anything, and chose Buy (decision 037).
- I asked to version this canvas: it opens on the latest, and earlier versions stay in the version menu.
- For v8 I asked for iOS 26 and Liquid Glass as Apple Music and Freeform use them, Display large titles at 40 pt, a transition on every arrow, the location flow and the first run.
AI:
- An agent looked at home screens on Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) and proposed the module order. Another looked at chat lists for the Requests rows. Agents drew the wireframes from the blueprint. In v7 one agent reviewed the flow for missing cases, another did a craft pass, and a third applied Buy and the review's gaps. I set the structure, chose Buy over Hold and which gaps to close. In v8 an agent redrew every screen to iOS 26, added the location flow and the first run, and proposed letting the shopper browse before signing in, which is still mine to decide.
Trade-offs:
- Putting the ask bar at the bottom leaves no room for a tab bar, so Requests sits behind a button and settings behind the avatar.
- Charging only on the shop's yes means the shopper waits a few minutes at an asked shop before the purchase is final.
```

## Versions

| Version | What changed | Why |
| --- | --- | --- |
| v8 (current) | iOS 26 and Liquid Glass: Back is a chevron in a glass circle, close a glass ×, and a sheet that commits has a filled check; icon actions share one glass capsule; no bar fills, a scroll-edge fade instead; the ask bar and the Requests button float as a glass bottom accessory; medium sheets are inset glass, large ones opaque. Display large titles in Gambetta at 40 pt. Each arrow names its transition (zoom, push, sheet). New areas: first run (splash, Getting started in three pages, the location ask, sign in with Apple, Google, Facebook or email) and where the shopper shops (the location sheet from the address row, Nearby at Work, the account sheet, Places). A Map note on the shop page: MapLibre with bundled OpenStreetMap data | I asked to follow iOS 26 as Apple Music and Freeform use it, and for the location flow and the entry before Nearby, which were missing |
| v7 | Buy replaces Hold: Apple Pay authorises, the shop's yes takes the payment, a connected shop's sale is immediate; the collection window and refund show before Buy. New screens: no shop has it, the shop didn't confirm in time, the day-before reminder with an extension, the shop's own delivery. The agent is Snuffle with the mark as avatar. Actions on failure screens moved to the bottom, sheets became page sheets, times and prices agree across screens, arrows route around the screens | An agent's review found missing cases and arrows that skipped steps; I dropped Hold (decision 037) and asked for the craft fixes |
| v6 | The shop details sheet offers two ways (pay and they keep it 7 days, the shop delivers); the concierge says that without paying there is no hold | The unpaid reserve put the payment outside the app and the no-show risk on the shop (decision 032) |
| v5 | The shop details sheet offers three ways to get the item (pay and they keep it 7 days, reserve and pay in the shop, the shop delivers) and a collection day; holds show dates; a connected shop answers "in stock now" from its till | A hold of a few hours was shorter than UK shops keep paid orders (decisions 030 and 031) |
| v4 | Requests opens full screen, growing out of the round button, with a storyboard of the transition | A sheet left the list half a screen; the transition keeps the link to the button it came from |
| v3 | No tabs: a round Requests button left of the ask bar opens Requests as a sheet over the street (decision 026) | I compared seven placements for the switch and chose the one that keeps the large ask bar |
| v2 | Home and the scrolled home became one screen with Nearby and Requests tabs at the top. The open request and recent orders left the home for the Requests tab, a list of chats with a status per row. A screen where the concierge proposes splitting a request in two. Title spacing tightened, button labels kept on one line | I found the home mixed two jobs, browsing the street and following what I asked for, and the request card and recent orders read as one-off modules |
| v1 | First flow from the blueprint: Granola-style home, chat, holds, payment, failure paths, other paths | First pass after the Mobbin references |

## What a request is

Each request is a chat with the concierge. The question was how much one chat holds. I decided on one chat per errand, with the concierge proposing a split (decision 025).

| Option | Works well | Costs |
| --- | --- | --- |
| One chat per errand (what the shopper asked in one go) | Matches how people ask: "glasses for today and a cake for Saturday". Follow-ups stay in one place | Items with different deadlines or shops mix in one thread, and one status per row stops being true |
| One chat per product | One clear status per row; alerts and reorders attach to the product | A shopping list becomes five chats, and the shopper repeats context |
| One chat per shop, as on WhatsApp | Matches how shops answer, and the proof of concept on WhatsApp | The shopper has to think in shops, which is the work the concierge exists to do. One search becomes six chats |
| One chat per errand, and the concierge proposes splitting | Keeps the shopper's words as the unit, and splits only when items need different days or kinds of shop. Shops appear inside the chat as answers, never as chats of their own | The concierge's split has to be right, and the shopper makes one more decision (one tap) |

**Decision:** the last option, which is what v2 draws. A purchase stays in the chat it came from, and the row shows the status of the item that needs the shopper soonest.

## Tab name

"Requests" covers both what is being searched and what was bought. Alternatives: "Errands" (British, but less clear to non-native speakers), "Chats" (says the format, not the content), "Orders" (only fits what was bought). I kept "Requests" for v2.

## References

| App | What I took |
| --- | --- |
| Granola | A floating composer at the bottom as the main way in |
| Deliveroo, Uber Eats | An active order with the arrival or pickup time as the headline, and a collapsed order bar above other content |
| Too Good To Go | Pickup window on each card, shop avatar over the photo, "Local heroes" as an editorial module |
| Wolt | Shop cards with the logo as the image and opening time, distance and pickup on one line |
| Shop | Assistant answers that mix text with shop carousels |
| Airbnb | Icon tabs at the top for the two modes of the app; section titles with a chevron; inbox rows with the photo, a host avatar over it and a status line |
| Vinted, Depop | The item's photo as the row's picture, filters by state, and shop events as cards inside the chat |
| WhatsApp, Messenger | Filter chips with counts, unread as bold text with a count, stacked avatars for more than one participant |

The captures stay outside the public repo because they are third-party screens.
