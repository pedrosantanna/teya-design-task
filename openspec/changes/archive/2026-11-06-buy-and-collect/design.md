# Design

## Context

See proposal.md. The real Apple Pay and Google Pay sheets can't run in a prototype without a merchant account, and not at all on the web build.

## Decisions

- **Drawn payment sheet.** A component that looks like each platform's sheet (card, merchant, items, total, "Confirm with side button" on iOS) and resolves after a short delay. The debugger chooses the outcome: paid or declined.
- **Order outcomes from the debugger.** After payment the script waits for the shop; the debugger can make the shop confirm, sell out, or not confirm in 10 minutes.
- **Dates from one clock.** The store's date (Mon 2 Nov, 13:15 by default) drives "Collect by", the day-before reminder and the missed window, so the debugger can move to Sun 8 Nov or Tue 10 Nov.
- **Haptics** use expo-haptics on native through one helper that follows `platforms.md`; the web build skips them.

## Risks / Trade-offs

- [A drawn payment sheet may look fake next to the real one] → the recording says it is simulated; decision 038 already lists it.
