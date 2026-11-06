# Design

## Context

See proposal.md. Every answer in the prototype comes from a script per request: which shops are asked, when each one reads and replies, and what it says. The debugger store holds the script's position.

## Goals / Non-Goals

**Goals:**
- Answers arrive at a believable pace in the recording (seconds, not minutes) and can jump to any point.
- The same script drives the asking list, the chat, the request row, notifications and the Live Activity screen.

**Non-Goals:**
- Free-text understanding. Typed messages that don't match the script get one Snuffle reply asking to pick a suggestion.

## Decisions

- **Script, not randomness.** Each mock request has a timeline of events (`{ at: 4s, shop: 'paper-co', state: 'seen' }`); a clock in the store advances it. The debugger can pause the clock, step it, or set a step preset.
- **Simulated system surfaces.** The notification and the Live Activity are drawn as screens in the app (decision 038), since the web build can't show real ones.
- **Answer card arrival** uses `spring.arrive` from its place in the list; with Reduce Motion it fades with `spring.fade`.

## Risks / Trade-offs

- [A scripted chat can look canned] → the shopper's first message is free text and Snuffle's restatement quotes it.
