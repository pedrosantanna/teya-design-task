# AGENTS.md

Shared instructions for every coding agent working in this repo (Claude Code is the primary one; Codex is used for reviews and parallel tasks). `CLAUDE.md` imports this file — keep shared guidance here, not there.

## What this repo is

The deliverable for a design take-home task: the discovery, the definition and design decisions, a clickable prototype, and possibly a running application. The repo will be **public** and is part of what gets evaluated — the documented process matters as much as the prototype.

These docs are a working record for the author, the agents and collaborators, rendered as a Claude Artifact from this repo. They are not the presentation: the output for review is a recorded walkthrough, with this record as evidence. Favour completeness and traceability over storytelling. The prototype is built in **code**. Figma and Apple Freeform are used only for exploration; their outputs may be attached as process assets, but they are not deliverables and not a handoff source.

The shopper app is a native mobile app, iOS first: follow Apple's Human Interface Guidelines first and Material Design second, and favour iOS where they differ (decision 021). The shop side has no interface; it is designed as states. The prototype's stack and repo layout are still undecided — see `docs/decision-log.md`.

## Layout and commands

- `docs/` — all content, in Markdown. Single source of truth. `docs/discover/` holds the discovery research.
- `site/` — the docs site that renders `docs/` (shadcn/ui-style neutral design, sidebar IA). `site/nav.json` defines the sidebar; every page is an entry pointing at a `docs/*.md` file. Adding a page = write the Markdown + add it to `nav.json`.
- Preview: `python3 site/serve.py` → http://localhost:4173 (serves the repo root and wraps `site/index.html` in the document skeleton the artifact platform adds at publish time, so `index.html` itself has no `<html>/<head>/<body>`).
- Publishing: the site is published as a Claude Artifact with `site/index.html` as the page and `site/nav.json`, `site/canvas.js`, `site/canvas.css`, every `docs/**/*.md`, every canvas `docs/**/*.html` and the persona images as supporting files under their repo paths.

### Markdown extensions the site understands
Fenced blocks with these languages render as components:
- ` ```quote ` — evidence card. One `key: value` per line: `text`, `handle`, `network`, `date` (YYYY-MM-DD), `url`, `tags` (comma-separated), `context`, `status` (`verified` = matched against the live source; `archive` = from a public archive, not yet matched). Consecutive cards become a grid. Quotes are short excerpts (about 25 words at most). `docs/discover/sources.md` is generated: run `python3 scripts/build_sources.py` after changing quotes.
- ` ```empathy-map ` — Strategyzer empathy map. `Label:` lines (See, Hear, Think and feel, Say and do, Pains, Gains) each followed by `- bullet` lines.
- ` ```timeline ` — `- YYYY-MM-DD — text` lines.
- ` ```summary ` — the box at the top of every page: `Takeaways:`, `Call:`, `AI:` and `Trade-offs:`, each followed by `- ` bullets. Put it right after the lede paragraph.
- Canvas pages (decision 022): a nav item with `"canvas": "docs/…/name.html"` next to `src` renders as a FigJam-like canvas; the `.md` gives title, lede and summary. In the HTML, `<section class="frame" id data-x data-y data-title>` holds an iOS wireframe built from the `.ios-*` kit in `site/index.html`, `class="state"` a state node, `class="note"` a sticky note with `<p lang="en">` and `<p lang="pt">`, and `<a class="link" data-from data-to data-label-en data-label-pt>` an arrow (`data-from` may be a CSS selector inside a frame). Wireframe interface copy stays English in both languages; notes and labels carry both.
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
- Layout follows one vertical-rhythm scale in `site/index.html` (`--s-1`…`--s-7`), applied to every page: a heading sits close to what it introduces and far from what came before; items inside a block are tight, blocks within a section are medium, sections are far apart. Never set ad-hoc margins on a component; use the scale. Group related content in the Markdown (e.g. a persona's card and fields together, its evidence under a small `#### Evidence` heading), and use headings, not long numbered lists, for steps that contain tables or blocks.
- The author decides direction (problem focus, platform, when to use which tool). Agents propose and record; they don't pre-empt those calls.
- **Docs are bilingual: English is the source, Brazilian Portuguese a full mirror.** Every page in `docs/` has a PT-BR twin at the same path under `docs/pt-br/`. Any new or changed text is written in both languages in the same change, then the PT-BR version is reviewed against the English one. Code, comments, commits and `AGENTS.md` stay in English. Quotes stay verbatim in their original language in both versions. Terms follow the glossary in `docs/pt-br/GLOSSARY.md`. UI strings live in the `UI`/`PT_STR` tables in `site/index.html`; nav titles carry a `pt` field in `site/nav.json`. The site defaults to English and remembers the viewer's choice.
- Headings are plain labels for what the section contains ("Regulation", "Opening hours", "Limits"), never a thesis or a punchy phrase ("The rules that shape it", "A modifier, not an axis"). The first sentence doesn't repeat the heading.
- Prose follows the author's `escrita-humana` skill (v2, in `~/.claude/skills/escrita-humana/`). The tells that show up most in these docs: lists of "**Label:** text" bullets, sentences about the page itself ("This page…", "The table below…"), "not X but Y" / "X rather than Y" corrections, closing lines that restate, same-shape bullets and forced triads, "-ing" tails that add interpretation ("…, highlighting…"), vague attribution ("shoppers say" for one post), stacked disclaimers about the evidence, "serves as"/"features" instead of is/has, "real"/"honest"/"genuine" as filler, em dashes beyond about one per 1,000 words. Banned words include delve, leverage, utilize, showcase, underscore, foster, pivotal, landscape (vague), seamless, empower, unlock, journey (metaphor), furthermore, moreover. Sentence case for headings. Keep one term per thing.
- Evidence rules for research: quotes are verbatim, with public handle, network, date and direct URL; only content from the last 18 months at the time of research; nothing from private accounts or closed groups; never invent or reconstruct a quote, handle or link.
