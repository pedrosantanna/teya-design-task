# Heuristic review of a synthetic test run

This is a heuristic review by an agent. It is not user evidence, not research and not validation of demand. The people in the run are scripted test users built from proto-personas; nothing here says what a shopper or a shopkeeper would do or want. Do not write "users felt", "users preferred" or "shoppers would". Write what the screen shows and which check it breaks.

## Input

`app/e2e/out/judge-input.json`, built by `npm run synthetic:judge` from `app/e2e/out/report.json`. For each scenario it holds the persona's goals and constraints, the scenario's goal, and every recorded step: what was tapped, the screen heading, the visible controls, the visible text and the path of a screenshot under `app/e2e/out/screens/`. It also lists the measured findings (small touch targets, controls without a name, cut-off text, dead ends, console errors).

## Read first

- `docs/develop/design-system/screen-review.md`, the nineteen checks.
- `docs/develop/design-system/conceptual-model.md`, the objects, states and words the app uses.
- `docs/develop/design-system/states.md`, for the states a request, an answer and an order can be in.

## Task

Open the screenshots in step order, with the step's text and controls beside them. For each scenario:

1. Say whether the screens, read in order, let a person with that goal and those constraints reach it, and where they stop.
2. List the checks from `screen-review.md` that a screen breaks. Give the check number, the step number, the screenshot path and what is on screen. A break needs something visible or measured; do not report a taste.
3. List words on screen that the conceptual model does not use, or that it uses for something else.
4. Score the scenario from 1 to 5 on each of: next action is visible, state is stated, words match the model, copy fits the persona's constraint (time, hours, payment). A score needs one sentence naming the step that decides it.
5. Mark every statement that comes from the measured findings as "measured" and every statement that comes from reading a screenshot as "read". Do not mix them.

## Output

Write `app/e2e/out/judge-report.md`. Start it with the line "Heuristic review by an agent. Not user evidence." Then one section per scenario, then a list of the breaks ordered by how many scenarios hit them.

## Limits to keep in view

- The scenario was written to follow a path that exists, so reaching the goal says little. A break says more than a pass.
- The same agent family wrote the app and reads it. Treat a clean review as weak evidence and say so.
- The viewport is one phone size in the light scheme. Say what was not looked at (dark, Android, VoiceOver, larger text).
- Never score persona satisfaction, desire or likelihood to buy.
