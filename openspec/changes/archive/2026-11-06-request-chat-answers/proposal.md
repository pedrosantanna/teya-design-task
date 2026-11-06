# Proposal

## Why

Asking and the answers arriving are the core of the concept: Snuffle asks several shops and the shopper sees who has it, from which source (H3, H4, H5). In a prototype the shops don't exist, so their replies have to be simulated on a timer and be skippable from the debugger.

## What Changes

- Ask screen, the chat with Snuffle's and the shopper's bubbles, typing indicator, suggestion chips under proposals, and the asking list with compact rows.
- Answer cards arriving in the chat with `spring.arrive`, the details sheet, Show me and No thanks with undo.
- Requests full screen with filters and rows, opened from the Requests button.
- Simulated shops that move through Asked, Seen and an outcome on a timer, a simulated notification and Live Activity screen, the split proposal, Keep looking and No shop has it.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `request`: adds the simulated timing of shops and the simulated notification.
- `answers`: adds how answers animate in and how the simulation can be skipped.

## Impact

- New screens under `app/src/app/requests/`; components chat bubble, typing indicator, answer row, answer card, request row, sheet, nav bar.
- The store gains a simulation clock.
