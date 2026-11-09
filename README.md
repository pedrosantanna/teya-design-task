# Snuffle

A design take-home for Teya. The brief: one app that brings a high street's small independent shops together, so a shopper can see what is available nearby right now, buy it, and collect it or have it delivered. It asks for a position on one of two problems, findability or the transaction, and for the other to be treated as a constraint.

I took findability. A shopper can't tell whether a nearby independent has the thing today, and the shop has no catalogue to search. Snuffle asks the shops for them: the shopper says what they need, where and by when; Snuffle asks the shops that might have it, brings back their answers with a price and a collect-by date, and the shopper buys and collects in the same chat. One order is one shop, and nothing is charged until the shop has set the item aside.

The bet under all of it is that shops answer within minutes while they are open. It is untested, and it is the first thing I would test.

## Where to start

- The case, as a docs site: https://claude.ai/artifact/3EGakxt82GJ2meFSJhm6QJ. "The case" in the sidebar is the reader's version in seven sections (0 · Overview to 6 · What I'll test next), with a Present mode (Shift+P) for the recording. "AI context" holds everything behind it.
- My walkthrough of the case on Loom: https://www.loom.com/share/b025a90d1ff045e89efc5e36737e5980
- The live prototype runs in the browser from the same site (5 · The prototype › Live prototype, also linked under Flows and states).

## What's in the repo

| Path | What it is |
| --- | --- |
| [`docs/case/`](docs/case/) | The case in seven sections, and `slides.json` for the deck |
| [`docs/discover/`](docs/discover/) | Desk research on the high street, 20 public posts coded into proto-personas, benchmarks, sources |
| [`docs/define/`](docs/define/) | The position, hypotheses, value proposition, service blueprint and a revenue estimate |
| [`docs/develop/`](docs/develop/) | The design system and the ideation canvases (app flow, shop states, agent flow) |
| [`docs/deliver/`](docs/deliver/), [`docs/verify/`](docs/verify/) | The prototype page, synthetic-user runs, and the measurement plan |
| [`docs/decision-log.md`](docs/decision-log.md), [`docs/process/ai-log.md`](docs/process/ai-log.md) | Every decision that shaped the process, and every significant step an agent took: what it was given, what came back, what I kept, threw away or fixed |
| [`docs/pt-br/`](docs/pt-br/) | A full Brazilian Portuguese mirror of `docs/` |
| [`app/`](app/) | The prototype: one Expo app, iOS first, that also runs on Android and the web |
| [`openspec/`](openspec/) | The prototype's PRD (`project.md`), capability specs and change proposals |
| [`site/`](site/) | The docs site that renders `docs/` (sidebar in `site/nav.json`) |

The Markdown in `docs/` is the single source of truth; the site only renders it.

## Running it

The docs site needs only Python 3:

```bash
python3 site/serve.py
```

Then open http://localhost:4173.

The prototype needs Node and, for iOS, Xcode:

```bash
cd app
npm install
npm run ios       # or: npm run android, npm run web
npm run check     # lint, types and design-token drift
```

`npm run export:web` rebuilds the web build that the docs site embeds as the live prototype.

## How it was made

I worked alone from 1 to 6 November 2026, directing AI agents in code, with very little Figma. Agents read [`AGENTS.md`](AGENTS.md) for the shared rules. Every screen goes through two reviewing agents before it is published: one checks it against the design system's screen-review list, the other judges the visual craft and measures contrast. Where the agents got things wrong, and what I threw away, is in the AI log.

What isn't measured: no shopper or shopkeeper was interviewed, the prototype's shops are invented and answer on a script, and the revenue figures are a projection.
