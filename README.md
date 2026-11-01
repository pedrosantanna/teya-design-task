# High Street

A design take-home for Teya Design: an app that brings a high street's independent shops together, so a shopper can see what is available near them right now, buy it, and choose to collect it or have it delivered.

The brief asks for a clear position on one of two problems, **findability** (finding something worth buying across hundreds of small, badly catalogued shops) or **transaction** (one basket across several independent shops resolving into a purchase, with pickup and delivery). This repo is the working record of how I'm answering it with AI agents: the research behind the choice, the decisions along the way, what the agents produced and what I kept, and the prototype. The output for review is a recorded walkthrough, with this record as the evidence behind it.

## What's here

| Path | What it is |
| --- | --- |
| [`docs/brief.md`](docs/brief.md) | The brief, restated |
| [`docs/discover/`](docs/discover/) | Discovery: the high street today, a netnography of London shoppers, an empathy map, benchmarks, sources |
| [`docs/decision-log.md`](docs/decision-log.md) | The decisions that shaped the process, in order |
| [`site/`](site/) | The docs site that presents all of the above (published as a Claude Artifact) |

The Markdown in `docs/` is the single source of truth. The site only renders it. Published version: https://claude.ai/artifact/3EGakxt82GJ2meFSJhm6QJ

## Status

Discover is in progress. Define, Develop and Deliver come next; the prototype will be built in code.

## Running the docs site locally

```bash
python3 site/serve.py
```

Then open http://localhost:4173. No dependencies beyond Python 3.

## How it was made

The work is done with AI agents, Claude Code as the main one and Codex for reviews and parallel tasks. Both read [`AGENTS.md`](AGENTS.md). How AI was used, including where it went wrong, is documented as part of the process.
