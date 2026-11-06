# Proposal

## Why

Buy is where findability meets the transaction, and it is the step drawn at full polish. The shopper has to see what they bought, when they are charged and by when to collect, and every failure has to say the money state (decision 037).

## What Changes

- Simulated payment sheet (Apple Pay on iOS, Google Pay on Android), drawn in the app so web and native match.
- Order card with steps and status changes, the receipt, the full-screen collection code, the day-before reminder with Extend, Cancel for a refund with its alert.
- Failure endings: Sold, Not confirmed, Payment declined, Not collected; delivery by the shop; Jess's collect-after-work path through the corner shop.
- Haptics: light impact on Buy, success when Ready or Paid, warning on "not charged" endings.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `order`: adds the simulated payment sheet and the haptics on order outcomes.
- `collection`: adds the simulated clock for reminders and missed windows.

## Impact

- New components: order card, payment sheet, collection code, stepper, segmented control, toast, alert; new screens under `app/src/app/requests/[id]/`.
