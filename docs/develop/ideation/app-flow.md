# App flow

The shopper app's main flow as wireframes, from the home screen to collecting the item, with the paths for when something fails. It follows the [service blueprint](../../define/blueprint.md), steps 1 to 5, with the shops' answers simulated. Screens use Apple's iOS kit in black and white; visual design comes later.

```summary
Takeaways:
- The concierge in these screens is the agent itself: the app is one way to reach it, next to WhatsApp and MCP. Chat bubbles marked Concierge are the agent's replies.
- One home with two tabs at the top (v2): Nearby for the street, Requests for everything the shopper asked for. The large bar at the bottom starts a new request from either tab, like Granola's; there is no bottom tab bar.
- Each request is a chat with the concierge, and the Requests tab lists them like a messaging inbox, with a status per row.
- After a request, the shopper can leave. Shop replies arrive as notifications and a Live Activity, and each answer appears in the chat as it comes in.
- The hold is confirmed by the shop before Apple Pay appears, so the payment only happens for an item that is really set aside.
Call:
- Native iOS patterns first (decision 021): large titles, sheets, Apple Pay, Live Activities.
- Nearby tab, top to bottom: promoted shops open now, new nearby with a filter by street, shops by kind. Open requests and past orders moved to the Requests tab in v2.
- The canvas keeps every version. It opens on the latest; earlier versions stay in the version menu.
AI:
- An agent looked at well-crafted home screens on Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) and proposed the module order. For v2, another agent looked at chat lists (Airbnb, Vinted, Depop, WhatsApp, Messenger, ChatGPT, Perplexity) and proposed the row anatomy for Requests. Another agent drew the wireframes from the blueprint. I set the structure: the bottom composer, the avatar menu and the screens in the flow.
Trade-offs:
- Putting the concierge in a bottom bar leaves no room for a bottom tab bar, so the two tabs sit at the top and settings live behind the avatar menu.
- Wireframes in the docs site are quick to change and easy to link to the blueprint, but they don't run on a phone.
```

## Versions

| Version | What changed | Why |
| --- | --- | --- |
| v5 (current) | The shop details sheet offers three ways to get the item (pay and they keep it 7 days, reserve and pay in the shop, the shop delivers) and a collection day; holds show dates; a connected shop answers "in stock now" from its till | A hold of a few hours was shorter than UK shops keep paid orders (decisions 030 and 031) |
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
