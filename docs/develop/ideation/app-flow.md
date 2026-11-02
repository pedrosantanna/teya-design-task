# App flow

The shopper app's main flow as wireframes, from the home screen to collecting the item, with the paths for when something fails. It follows the [service blueprint](../../define/blueprint.md), steps 1 to 5, with the shops' answers simulated. Screens use Apple's iOS kit in black and white; visual design comes later.

```summary
Takeaways:
- The concierge in these screens is the agent itself: the app is one way to reach it, next to WhatsApp and MCP. Chat bubbles marked Concierge are the agent's replies.
- The home works like Granola's: street content above, and one large bar at the bottom that starts the concierge. There is no tab bar.
- After a request, the shopper can leave. Shop replies arrive as notifications and a Live Activity, and each answer appears in the chat as it comes in.
- The hold is confirmed by the shop before Apple Pay appears, so the payment only happens for an item that is really set aside.
Call:
- Native iOS patterns first (decision 021): large titles, sheets, Apple Pay, Live Activities.
- Home modules, top to bottom: active request, recent orders, promoted shops, new on King Street, categories. The order comes from the Mobbin references below.
AI:
- An agent looked at well-crafted home screens on Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) and proposed the module order. Another agent drew the wireframes from the blueprint. I set the structure: the bottom composer, the avatar menu and the screens in the flow.
Trade-offs:
- Putting the concierge in a bottom bar leaves no room for a tab bar, so requests, orders and settings live behind the avatar menu.
- Wireframes in the docs site are quick to change and easy to link to the blueprint, but they don't run on a phone.
```

## References

| App | What I took |
| --- | --- |
| Granola | A floating composer at the bottom as the main way in |
| Deliveroo, Uber Eats | An active order with the arrival or pickup time as the headline, and a collapsed order bar above other content |
| Too Good To Go | Pickup window on each card, shop avatar over the photo, "Local heroes" as an editorial module |
| Wolt | Shop cards with the logo as the image and opening time, distance and pickup on one line |
| Shop | "Ordered on…" rows with order again, and assistant answers that mix text with shop carousels |
| Airbnb | Section titles with a chevron, and "Nearby" as the first suggestion |

The captures stay outside the public repo because they are third-party screens.
