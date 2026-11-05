# Synthetic test users

Scripted test users play the prototype's flows for Sam and Jess and record where the flow breaks. They run in a browser against the web build, from goals and constraints taken from the proto-personas, and they report steps, taps, dead ends, small touch targets, controls without a name and cut-off text.

```summary
Takeaways:
- Eight scenarios run on the web build, four for Sam and four for Jess. Ruth is out of scope and has none.
- The latest run reached the goal in six scenarios, broke in one and stopped short in one. "Ask further away" asks nobody, and Jess's "every Friday" request is never confirmed as repeating.
- The same run found a receipt that does not name the place Jess collects from, a running search with no way to change or stop it, and 1 to 23 touch targets under 44 pt per scenario.
- These are test users for flows. They are not shoppers, say nothing about demand and replace no research.
Call:
- I asked for synthetic test users built from the proto-personas to test flows and usability, and to make clear that they are not research or validation.
- I asked for them to be scripted and deterministic, to drive the prototype through its accessible roles and labels, and to fail the run on a functional break.
- I decided the heuristic review stays optional, labelled as an agent's reading of the screens, and calls no outside service.
AI:
- An agent wrote the scenario files from the persona pages, the runner and the report, and ran every scenario. I read the breaks and checked the receipt screen by eye.
- An agent researched the limits of synthetic users; only sources it read on the page are cited here.
Trade-offs:
- A scenario follows a path that exists, so reaching the goal is weak evidence and a break is the useful result.
- The runner sees one phone size in the light scheme. Dark, Android, larger text and VoiceOver are not covered.
```

## What they are

A synthetic test user here is a persona's goals and constraints written as a scenario file, plus a runner that plays it against the prototype. The name for the activity is persona-driven scenario test. The runner taps what is visible on screen, by role and label, and writes down what happened. It runs without a model, so the same build gives the same report.

The check is whether a person with that goal could get through the flow. Sam has until 4pm, so the runner counts taps and seconds to a collection code. Jess collects after 6pm, so one scenario ends with a code for the corner shop that is open until 11pm.

## What they are not

They are not research. The users are scripts and have no needs, habits or opinions, and the prototype's shops answer on a fixed script. A scenario passing says the path exists. It says nothing about whether shoppers want the app, would pay for it or would use it the way the script does.

They do not stand in for shoppers or shopkeepers, and they are not automated ethnography. Validating demand needs real shoppers and shopkeepers.

## How they are built

Each persona has a file in `app/e2e/personas/`: the goals and the constraints (time, hours, device and payment habits) copied from [the proto-personas](../discover/personas/index.md), and the scenarios. A scenario has a start (the prototype's URL parameters and journey steps, from [the prototype page](prototype.md)), a list of steps and a step marked as the goal.

A step is one of: tap, type, scroll, wait for something to appear, check that something is visible. Targets are found by role and accessible name among the controls on screen, never by CSS. A check marked usability records a finding and lets the scenario continue. Any other failed step stops the scenario and counts as a break.

For each scenario the runner records:

- the steps, the taps and the time to the goal;
- screens with no next action, after a short wait for typing and processing to finish;
- controls without an accessible name, and images with a role but no label;
- touch targets under 44 pt;
- text cut by an ellipsis or a line clamp;
- console errors and uncaught page errors;
- a screenshot per step.

The report is written to `app/e2e/out/` (not committed): `report.json`, `summary.md` and the screenshots.

## Scenarios

| Persona | Scenario | Start | Goal |
| --- | --- | --- | --- |
| Sam | Eclipse glasses before 4pm | Nearby | Ask, wait for answers, buy 2 pairs, open the receipt with the collection code |
| Sam | No shop has them: keep looking | `noShop` | A standing search is confirmed and can be seen running |
| Sam | No shop has them: ask further away | `noShop` | Shops up to 30 minutes away answer |
| Sam | The payment is declined | `declined` | Try again, pay, reach the receipt |
| Jess | Sourdough every Friday | Nearby | The request is confirmed as repeating every week |
| Jess | Collect after work at the corner shop | `afterWork` | Buy, choose the corner shop, reach the code |
| Jess | Browse bakeries and a shop page | Nearby | The shop page shows photos, hours, what they sell and ratings |
| Jess | First run to Nearby | `?firstRun=1` | From the splash to Nearby through location and sign in |

## How to run them

Serve the docs and the web build, then run the scenarios from `app/`:

```
npm run export:web
python3 site/serve.py 4173   # from the repo root
npm run synthetic
```

`npm run synthetic -- --only jess` or `-- --scenario widen-search` runs part of the set, `--no-fail` keeps the exit code at 0, and `SYNTHETIC_URL` points the runner at another build. The runner opens the prototype at 402 by 874 with `?scheme=light&debug=0` and the scenario's own parameters. Playwright 1.58.2 comes through `npx`, so nothing is added to the app's dependencies. The exit code is 1 when a scenario hits a functional break or does not reach its goal.

The optional heuristic review runs in two steps. `npm run synthetic:judge` writes `app/e2e/out/judge-input.json` from the last report. An agent in this repo then follows `app/e2e/judge/prompt.md`: it reads the steps and screenshots and scores them against [the screen review](../develop/design-system/screen-review.md) and [the conceptual model](../develop/design-system/conceptual-model.md). The prompt tells it to mark what it measured and what it read, to write "heuristic review by an agent, not user evidence" at the top, and never to score satisfaction or desire to buy. No model is called by the runner. The review has not been run for this page.

## Latest results

Run on 5 November 2026 against the web build served at `localhost:4173`.

| Scenario | Result | Taps | To goal | Targets under 44 pt | Unnamed | Cut text |
| --- | --- | --- | --- | --- | --- | --- |
| Sam, eclipse glasses | Reached | 8 | 34 s | 17 | 0 | 0 |
| Sam, keep looking | Reached | 2 | 9 s | 4 | 0 | 0 |
| Sam, ask further away | Broke | 1 | none | 2 | 0 | 0 |
| Sam, declined payment | Reached | 2 | 12 s | 5 | 0 | 0 |
| Jess, every Friday | Not reached | 2 | none | 12 | 0 | 0 |
| Jess, collect after work | Reached | 4 | 15 s | 1 | 0 | 0 |
| Jess, browse bakeries | Reached | 2 | 7 s | 23 | 0 | 0 |
| Jess, first run | Reached | 6 | 15 s | 9 | 0 | 0 |

Time to goal includes the simulated shops' scripted delays and the runner's waits for the screen to settle. Targets under 44 pt count each control once per scenario; they are mostly chips and small buttons at 32 to 36 pt high.

### What broke

- Ask further away says "I'm asking shops up to 30 minutes away" and then nothing happens. After 45 seconds no new shop or answer appears. The request spec offers this action and the simulation has no behaviour behind it.
- The "Sourdough from Rossi's every Friday" request becomes a one-off request. Recurrence exists only in Keep looking, under Every week, and I saw that its note still says "one message" and that it runs until Fri 6 Nov. The runner records the missing confirmation; the note I saw while writing the scenario.
- After Jess buys for the corner shop, the receipt is headed Rossi's Bakery and names the pickup as "Blythe Road, open till 11pm". The shop's name is missing, so the 11pm reads as Rossi's closing time.
- After Keep looking is confirmed, the chat shows no control to see, change or stop the search.
- Controls behind an open sheet stay in the accessibility tree of the web build (up to 11 on one screen). I have not checked whether this also happens on iOS.
- The only screens flagged as having no next action were waiting states: the chat while a shop is asked, and after Keep looking. None was a stuck screen.
- No control without a name, no cut-off text and no console error in the final run. An earlier run had one uncaught page error (a media source that failed to load) while the web build was being rebuilt; it did not repeat on the same scenario.

### After the fixes

An agent fixed every break above, and a second run the same day reached the goal in all eight scenarios. Ask further away now asks shops 22 to 28 minutes away and shows their answers. An ask that says "every Friday" becomes a standing request, confirmed in the chat. The receipt names the collection point. A running search has Change and Stop. The page behind a sheet is hidden from assistive tech.

| Scenario | Result | Targets under 44 pt |
| --- | --- | --- |
| Sam, eclipse glasses | Reached | 1 |
| Sam, keep looking | Reached | 2 |
| Sam, ask further away | Reached | 0 |
| Sam, declined payment | Reached | 0 |
| Jess, every Friday | Reached | 1 |
| Jess, collect after work | Reached | 0 |
| Jess, browse bakeries | Reached | 1 |
| Jess, first run | Reached | 1 |

The targets still under 44 pt on the web are the segmented control's tabs (32 pt), the ask bar (40 pt) and the All chip on Category screens.

## Limits and risks

- Optimism. In NN/g's trial, synthetic users said they finished courses that real learners abandoned ([Rosala and Moran, 2024](https://www.nngroup.com/articles/synthetic-users/)). The scripts here are deterministic and do not have this problem, but an agent judge reading the same screens could, which is why it stays optional and labelled.
- Passing because the scenario was steered. Each scenario follows a path I know exists. A pass needs checking against what the script was told to do.
- Surface behaviour. A model playing a persona can match typical answers and still be inconsistent underneath ([Mooney et al., 2025](https://arxiv.org/abs/2509.03736)). Agents grounded in interviews tracked people's survey answers better than agents given only demographics ([Park et al., 2024](https://arxiv.org/abs/2411.10109)), and these personas rest on 20 public posts and no interviews.
- Small and specific groups. NN/g advises against synthetic users for niche populations, and shopkeepers are one. Nothing here simulates a merchant; the shops are a fixed script.
- Stopping early. NN/g places synthetic users in preparing real studies and in refining proto-personas. UXAgent is the closest precedent for scripted agents on a prototype, and its authors present it as a way to pilot a study, not as a replacement for participants ([Lu et al., 2025](https://arxiv.org/abs/2502.12561)).
- Coverage. One viewport, the light scheme, one platform in the web build and no assistive technology.
