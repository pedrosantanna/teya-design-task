# How I built it with AI

I directed the work and made the decisions; agents collected, coded, drafted and checked, under shared rules and review gates.

## The harness

- One rules file, `AGENTS.md`, that every agent reads: evidence, writing, bilingual docs, review gates (decision 005).
- A main agent running subagents in parallel, and a second agent from another tool for reviews.
- Specs in OpenSpec: a short PRD, capability specs and a change per piece of work (decision 044).
- A design system written as code: tokens generate four themes, and lint, type checks and a token-drift check run on every agent edit.

<!-- screenshot: the repo tree with AGENTS.md, openspec/ and app/src/design-system/ open -->

## One loop, start to finish

On the last day I said the fade on Getting started looked cheap, the art didn't animate and two objects weren't centred. An agent found three separate reasons nothing moved, fixed them, replaced the fade and centred each object by its own bounds. I then sent a screenshot of the shop list drawn over the chat messages, and traced that bug in the browser myself. A sweep by another agent walked all 34 steps and found the older clips drawn off their ground, because Chrome read their colour tags differently; I re-tagged them by hand, and an agent fixed the rest. The eight scripted test users still reached their goals.

<!-- screenshot: the AI log entry for that step next to the fixed Getting started screen -->

Evidence: [AI log, step 76](../process/ai-log.md).

## Review gates

- A second agent coded every post blind (kappa 0.85 to 0.93 on the main codes).
- An external review found 15 problems, mostly claims more certain than their evidence (decision 019).
- A screen reviewer checks every screen; a visual critic measures contrast in light and dark.
- A code review, coherence reviews and scripted test users for Sam and Jess.

Agents reviewing agents share blind spots. Several of the checks that mattered were mine, made by looking at the rendered screen.

## What I threw away

- A first persona draft that looked finished and was circular.
- Pastel surfaces at 1.01 to 1.04:1 against the background, before I asked for a visual critic.
- A glass shop card, measured and left out (decision 058).
- Invented walk times, replaced by real routes (decision 063).

Evidence: [AI failures](../process/ai-log.md), [screen review](../develop/design-system/screen-review.md).
