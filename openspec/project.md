# Snuffle prototype: product requirements

Snuffle is a concierge for the small independent shops around where a shopper is. The shopper says what they need, where and by when; Snuffle asks the shops that might have it, brings back their answers, and the shopper buys and collects in the same chat. This document is the brief for the prototype. The capability specs in `openspec/specs/` hold the behaviour; the changes in `openspec/changes/` hold the work.

## Problem

Shoppers can't find out which nearby shop has a specific thing before they leave home. They ask strangers on Reddit and WhatsApp, phone around, or make wasted trips (Discover, finding A1). Small independents have no catalogue and most don't share stock, so a search engine has nothing to index.

## Position

I chose findability as the primary problem: "who has it, right now?" The transaction constrains it. An answer is only worth something if the shopper can act on it, so the answer has to carry a price, a date and a way to buy, and the shop has to set the item aside before the shopper is charged. A basket across several shops is out of scope; one order is one shop.

## Shopper

- Sam, the mission shopper. Needs a specific thing, often by a deadline (eclipse glasses before 4pm), and can't find out who has it. The main persona for the prototype.
- Jess, the lapsed local. Works during shop hours, so she buys from supermarkets and Amazon. She shows the transaction side: buying ahead and collecting after work.

Both live around Blythe Road, W14. Ruth, the regular, is left out (my scope choice).

## Scope of the prototype

One journey, Sam's eclipse glasses, from app flow v7, plus Jess's collect-after-work variant. Each step is a capability spec.

| Step | Screens in v7 | Spec |
| --- | --- | --- |
| Browse and ask | Home (Nearby), Ask, Snuffle suggests two requests | `nearby`, `request` |
| Snuffle asks shops | Snuffle confirms, Asking shops, Away from the app, No shop has it in time, Keep looking | `request`, `answers` |
| Answers | Answers as they arrive, Details sheet | `answers` |
| Buy | Apple Pay, Waiting for the shop, Already sold, Payment didn't go through, The shop doesn't confirm, The shop delivers | `order` |
| Collect | Receipt, Code at the counter, The day before, Not collected in time, Collect after work | `collection` |
| Shops | Shop page | `shop-page` |
| Requests | Requests (full screen) | `request` |
| Prototype tools | State debugger, device frame | `state-debugger` |

The Buy step and one answer card are drawn at full polish; the rest can be rough but must work.

## Out of scope

- The shop's side has no interface. Its states are designed on the Shop states canvas and simulated here.
- Real payments, real stock, real notifications and real agents. Everything is mocked from one store.
- A basket across shops, courier delivery booked by Snuffle, accounts and sign-in, settings.
- The WhatsApp and MCP channels for Snuffle.

## Success for the prototype

The recording must show, on an iPhone build and on the web build in the docs:

1. Sam asks for eclipse glasses on Nearby and Snuffle asks six shops.
2. Answers arrive one by one, with the source on each ("till" or "replied 2 min ago").
3. Sam buys at Paper & Co; the order waits for the shop, then reads "Ready · collect by Mon 9 Nov".
4. One failure path (Sold or Not confirmed) shows the money state and the next shop.
5. The receipt and the collection code.
6. The same screens on Android and in dark mode, switched from the state debugger.

The build passes `npm run check`, and the performance checks in decision 038 run on it.

## Assumptions

- Shops answer a request within about 10 minutes while open (H1). In the prototype, simulated shops answer on a timer.
- In the mock content one of the six shops asked answers from its till (Broadway Chemist); the others are asked shops. How many shops are connected in reality is H11.
- Shops keep a bought item for 7 days by default; perishables the same or the next day (decision 037, H6).
- The shopper pays with Apple Pay or Google Pay; cash is a blind spot.
- Mock content uses real-looking shop names around Blythe Road and Unsplash photos with credits; no real shop is represented.

## Technical choices

I chose one Expo app in `app/` (no monorepo), DTCG design tokens that generate a typed theme for four themes (iOS and Android, light and dark), Unistyles for styling, hand-written primitives whose props take token names only, HugeIcons, Reanimated, Gesture Handler, expo-haptics and Expo Router. The details are in the `app-foundation` change.

## Docs

- [Brief](../docs/brief.md)
- [Concept](../docs/define/index.md), [service blueprint](../docs/define/blueprint.md), [hypotheses](../docs/define/hypotheses.md), [next step](../docs/define/next-step.md)
- [App flow](../docs/develop/ideation/app-flow.md) (v7 canvas: `docs/develop/ideation/app-flow-v7.html`), [Shop states](../docs/develop/ideation/shop-states.md)
- Design system: [conceptual model](../docs/develop/design-system/conceptual-model.md), [components](../docs/develop/design-system/components.md), [colour](../docs/develop/design-system/colour.md), [spacing](../docs/develop/design-system/spacing.md), [shape](../docs/develop/design-system/shape.md), [motion](../docs/develop/design-system/motion.md), [typography](../docs/develop/design-system/typography.md), [tags](../docs/develop/design-system/tags.md), [states](../docs/develop/design-system/states.md), [platforms](../docs/develop/design-system/platforms.md), [imagery](../docs/develop/design-system/imagery.md)
- [Decision log](../docs/decision-log.md), decisions 021, 023 to 026, 030 to 041
- [Personas](../docs/discover/personas/index.md)
