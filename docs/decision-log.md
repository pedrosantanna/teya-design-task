# Decision log

The major decisions that shaped the process, in the order they were made. Each entry says what was decided, why, and what it leaves open.

---

## 001 — Start with discovery, not with the problem choice
**2026-11-01 · Decided**

The brief asks to pick Findability or Transaction as the primary focus. That choice is deferred until after a discovery pass on the high-street universe (who the shops are, how they sell today, who shops there and why).

**Why:** choosing before understanding the space would be picking on intuition; the position the brief asks for should come out of evidence.
**Open:** Findability vs. Transaction — decided at the end of discovery.

## 002 — Platform decided by the solution
**2026-11-01 · Decided**

Mobile vs. web is not chosen up front. It follows from how the chosen problem gets solved.

**Open:** platform.

## 003 — The prototype is built in code
**2026-11-01 · Decided**

The final prototype (and, if it makes sense, a running application) is built in code. Figma and Apple Freeform are used only as exploration tools, when the author chooses to. Their outputs may be attached as process assets but are not deliverables, and Figma is not a handoff source.

**Why:** code is the real working medium in this process; designing and building happen in the same place.

## 004 — The repo is the deliverable, presented as a Claude Artifact
**2026-11-01 · Decided**

Everything (discovery, decisions, prototype, app) lives in this public repo. The final presentation is a Claude Artifact built from sources in the repo.

## 005 — Agent setup: Claude Code primary, Codex secondary
**2026-11-01 · Decided**

`AGENTS.md` holds the shared instructions so both Claude Code (primary) and Codex (reviews, parallel tasks) understand the repo; `CLAUDE.md` imports it.

## 006 — Discovery method: netnography, empathy map, benchmarks, landscape
**2026-11-01 · Decided**

Discovery runs on four pieces of work, all scoped to London with Hammersmith as the worked example:

1. A netnography of what shoppers say on public social networks, following Kozinets' method.
2. An empathy map built from that material, using the Strategyzer canvas, plus two proposed dimensions for segmenting shoppers later.
3. Benchmarks of products that already serve these shoppers, with a netnography of what users say about them.
4. A desk review of the high street itself: history, regulation, data and recent news.

**Why:** the goal is to understand the space from evidence instead of inference. Every claim about people is backed by a verbatim quote with handle, network, date and link, from the last 18 months only.
**Ethics call:** quotes keep the author's public handle because the link already exposes it and it makes the evidence checkable. Private accounts and closed groups are excluded.

## 007 — The deliverable reads like software documentation
**2026-11-01 · Decided**

The artifact is a docs site with a structured sidebar, organised by phase (Discover first; Define, Develop and Deliver follow). It uses a neutral shadcn/ui-style design for now, to be customised later. The Markdown in `docs/` is the content; the site renders it, so there is one copy of everything.

**Why:** the process is the deliverable as much as the prototype, and a docs structure lets a reviewer go straight to the part they care about.

## 008 — English only, written in a human voice
**2026-11-01 · Decided**

Everything in the repo is in English. Writing follows explicit anti-AI-pattern rules (listed in `AGENTS.md`).

---

## Still open

- **Repo layout** (single app vs. monorepo) — decide when the build starts and its shape is known.
- **Spec-driven workflow** — whether to write specs before building, and how lightweight.
