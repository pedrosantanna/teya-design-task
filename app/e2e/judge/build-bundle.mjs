// Builds the input for the optional heuristic review (app/e2e/judge/prompt.md) from the last run's report.
// It calls no API and no model: an agent working in this repo reads the bundle and the screenshots and writes
// the review. The bundle carries the same measured findings the report has, so the review can tell them apart
// from what it reads off a screenshot.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..', 'out');
const reportPath = path.join(out, 'report.json');
if (!fs.existsSync(reportPath)) {
  console.error('No report yet. Run "npm run synthetic" first.');
  process.exit(2);
}
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const personas = Object.fromEntries(
  fs.readdirSync(path.join(here, '..', 'personas')).filter((f) => f.endsWith('.json')).map((f) => {
    const p = JSON.parse(fs.readFileSync(path.join(here, '..', 'personas', f), 'utf8'));
    return [p.id, { name: p.name, goals: p.goals, constraints: p.constraints }];
  }),
);

const bundle = {
  label: 'Heuristic review input. Scripted test users, not research and not user evidence.',
  prompt: 'app/e2e/judge/prompt.md',
  reads: [
    'docs/develop/design-system/screen-review.md',
    'docs/develop/design-system/conceptual-model.md',
    'docs/develop/design-system/states.md',
  ],
  screenshotsRoot: 'app/e2e/out',
  run: { when: report.when, url: report.url, viewport: report.viewport },
  scenarios: report.scenarios.map((s) => ({
    id: s.id,
    persona: personas[s.persona],
    title: s.title,
    goal: s.goal,
    status: s.status,
    taps: s.taps,
    steps: s.steps.map((st) => ({ n: st.n, label: st.label, screen: st.screen, controls: st.actions, text: st.texts, screenshot: st.screenshot })),
    measured: {
      breaks: s.breaks,
      usability: s.usability,
      deadEnds: s.deadEnds,
      smallTargets: s.smallTargets,
      withoutName: s.unnamed,
      cutText: s.truncated,
      consoleErrors: s.consoleErrors,
    },
  })),
};
fs.writeFileSync(path.join(out, 'judge-input.json'), JSON.stringify(bundle, null, 2));
console.log(`Wrote ${path.relative(process.cwd(), path.join(out, 'judge-input.json'))}. Next: ask an agent in this repo to follow app/e2e/judge/prompt.md.`);
