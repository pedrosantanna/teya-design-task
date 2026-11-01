# AGENTS.md

Shared instructions for every coding agent working in this repo (Claude Code is the primary one; Codex is used for reviews and parallel tasks). `CLAUDE.md` imports this file — keep shared guidance here, not there.

## What this repo is

The deliverable for a design take-home task: the discovery, the definition and design decisions, a clickable prototype, and possibly a running application. The repo will be **public** and is part of what gets evaluated — the documented process matters as much as the prototype.

These docs are a working record for the author, the agents and collaborators, rendered as a Claude Artifact from this repo. They are not the presentation: the output for review is a recorded walkthrough, with this record as evidence. Favour completeness and traceability over storytelling. The prototype is built in **code**. Figma and Apple Freeform are used only for exploration; their outputs may be attached as process assets, but they are not deliverables and not a handoff source.

Platform (mobile vs. web), the prototype's stack and repo layout are deliberately undecided — see `docs/decision-log.md`. Update this file once they are decided.

## Layout and commands

- `docs/` — all content, in Markdown. Single source of truth. `docs/discover/` holds the discovery research.
- `site/` — the docs site that renders `docs/` (shadcn/ui-style neutral design, sidebar IA). `site/nav.json` defines the sidebar; every page is an entry pointing at a `docs/*.md` file. Adding a page = write the Markdown + add it to `nav.json`.
- Preview: `python3 site/serve.py` → http://localhost:4173 (serves the repo root and wraps `site/index.html` in the document skeleton the artifact platform adds at publish time, so `index.html` itself has no `<html>/<head>/<body>`).
- Publishing: the site is published as a Claude Artifact with `site/index.html` as the page and `site/nav.json` + every `docs/**/*.md` as supporting files under their repo paths.

### Markdown extensions the site understands
Fenced blocks with these languages render as components:
- ` ```quote ` — evidence card. One `key: value` per line: `text`, `handle`, `network`, `date` (YYYY-MM-DD), `url`, `tags` (comma-separated), `context`, `status` (`verified` = matched against the live source; `archive` = from a public archive, not yet matched). Consecutive cards become a grid. Quotes are short excerpts (about 25 words at most). `docs/discover/sources.md` is generated: run `python3 scripts/build_sources.py` after changing quotes.
- ` ```empathy-map ` — Strategyzer empathy map. `Label:` lines (See, Hear, Think and feel, Say and do, Pains, Gains) each followed by `- bullet` lines.
- ` ```timeline ` — `- YYYY-MM-DD — text` lines.
- ` ```summary ` — the box at the top of every page: `Takeaways:`, `Call:`, `AI:` and `Trade-offs:`, each followed by `- ` bullets. Put it right after the lede paragraph.
- ` ```occasion-grid ` — generated, never hand-written. Coding lives in `docs/discover/personas/coding*.json`; run `python3 scripts/build_personas.py` to refresh the grid and tables between `<!-- generated:NAME -->` markers.
Relative links between `.md` files are rewritten to the matching site page. A page's H1 is its title and its first paragraph is the lede.

## The brief (summary)

An app (mobile or web) that brings a high street's small independent shops (bakery, hardware, florist, butcher…) into one place: a shopper sees what's available nearby right now, finds it, buys it, and chooses pickup or delivery.

- Pick **one** primary problem and take a clear position on it: **Findability** (finding things across hundreds of tiny, badly-catalogued merchants) or **Transaction** (one basket across several independent shops resolving into a purchase, with pickup + delivery). Show how the other one constrains it.
- We define the shopper and the scope. Anything missing (data, merchant behaviour, logistics, business model) is **assumed and stated explicitly**.
- Deliverables: a prototype (a few key steps of one journey, clickable; one or two screens at real polish, the rest rough) and a 5–20 min screen recording: ~5 min thinking (framing, decisions, what was deliberately left out), ~10 min of the real work on screen including where AI came in (prompts, outputs, what was thrown away, what was fixed by hand), ~5 min what's next / what to validate.
- Constraints: a few honest hours, not a polished weekend. No slides. Any AI tooling is fair game, shown honestly including failures.

## Working rules

- **This repo is only about the take-home task.** Nothing about the role, interview conversations, the candidate's background, or people/internals of the company goes in — not in files, commit messages, PRs or published artifacts.
- Major process decisions go in `docs/decision-log.md` (newest entry last): what was decided, why, and what stays open. Only the decisions that shape the process, not every small choice. Assumptions are logged as assumptions.
- Write in the first person, as the author documenting their own process. Decisions are always "I" ("I decided", "I chose"), never "we": the project has one author. Work done by AI is attributed to "an agent" or "the agent", never to a product name such as Claude. Use "we" only when it truly means the author and an agent together, and even then say who did what. Make the AI's role explicit on every page and add each significant step to `docs/process/ai-log.md` (what the agent was given, what came back, what was kept, thrown away or fixed).
- Keep pages short: summary box, objective paragraphs, then detail in a linked subpage (progressive disclosure). No lecturing about methods on the main page.
- The author decides direction (problem focus, platform, when to use which tool). Agents propose and record; they don't pre-empt those calls.
- **Everything in the repo is in English** (docs, code, comments, commits). Only the conversation with the author is in Portuguese.
- Prose follows human-voice writing rules (the author's `escrita-humana` skill): no "it's not X, it's Y" pairs, no triple anaphora, no empty adjectives, none of delve / leverage / utilize / landscape (in the vague sense) / seamlessly / empower / unlock / journey (as metaphor) / furthermore / moreover, no defensive hedging, no rhetorical-question openers. Sentence case for headings.
- Evidence rules for research: quotes are verbatim, with public handle, network, date and direct URL; only content from the last 18 months at the time of research; nothing from private accounts or closed groups; never invent or reconstruct a quote, handle or link.
