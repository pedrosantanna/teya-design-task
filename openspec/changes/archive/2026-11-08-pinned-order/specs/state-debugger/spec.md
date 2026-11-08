# Spec Delta

## MODIFIED Requirements

### Requirement: One mock store
Every screen SHALL read its data from one mock store, and the debugger SHALL be the only place that sets it directly.

#### Scenario: Change a state
- **WHEN** the order state is set to "Ready" in the debugger
- **THEN** the order card, the pinned order and the request's row all show "Ready · collect by Mon 9 Nov", and the receipt's code card shows "Collect by Mon 9 Nov"
