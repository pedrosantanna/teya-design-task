# The product

One request, answered by the shops, bought and collected in the same chat.

## The journey

1. Sam types two pairs of eclipse glasses by 4pm.
2. Snuffle asks six shops. One answers at once from its till; the others reply on WhatsApp.
3. Answers arrive in the chat, each with the shop, the price, a collect-by date and Buy.
4. He buys at Paper & Co for £29.98 with Apple Pay, and isn't charged until the shop sets the pairs aside.
5. The receipt gives a collection code and "collect by Mon 9 Nov".

Jess finishes work after Rossi's Bakery closes. At lunchtime she buys a sourdough, and Rossi's drops it at a newsagent open until 11pm.

Every dead end has a next move: sold first, a declined payment, a shop that doesn't confirm, nobody has it in time, Keep looking.

<!-- screenshot: the chat with two answers arriving, each with Buy -->

## The model

The app has four objects: request, shop, answer and order. An item is never one of them, because small shops have no catalogue; it is words and a quantity inside a request. Each request is one chat, and shops appear as answers inside it.

Evidence: [conceptual model](../develop/design-system/conceptual-model.md).

## The agent

One ask opens two conversations. The shopper talks to Snuffle in the chat; Snuffle talks to each asked shop on WhatsApp, and to a connected shop through its till. Every answer is labelled by its source, because a till's stock and a shopkeeper's yes are different promises. Snuffle never decides for the shopper.

Evidence: [agent flow](../develop/ideation/agent-flow.md).

## The shop side

Shops have no interface to learn. A shop answers a message with a numbered reply, sets the item aside and hands it over. Its side is designed as states, each with the WhatsApp message it sees.

<!-- screenshot: the shop request states canvas, from asked to collected -->

Evidence: [shop request states](../develop/ideation/shop-states.md), [service blueprint](../define/blueprint.md).

## Built and designed only

The prototype plays Sam's path from ask to code with every failure path, Jess collecting after work, shop pages with ratings, 42 invented shops on real streets, iOS and Android, light and dark. A standing ask, a question when words are missing and failures after the charge are designed only.
