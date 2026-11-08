# Spec Delta

## MODIFIED Requirements

### Requirement: Receipt with collection code
The receipt SHALL show the shop and items, the collection code, the shop's street and opening, the amount paid and the payment method, with Directions, Extend and Cancel for a refund. While the order can be collected, the code SHALL sit in its own card under the header, with the collect-by date and the refund rule right under it.

#### Scenario: Ready order
- **WHEN** the shopper opens a Ready order
- **THEN** the code card shows "K7Q2", then "Collect by Mon 9 Nov" and "Full refund if you don't", and the receipt shows "Paid £29.98" and "Apple Pay, debit card •••• 4021"

#### Scenario: Extended order
- **WHEN** the shopper has extended the order
- **THEN** the code card reads "Collect by Mon 16 Nov"
