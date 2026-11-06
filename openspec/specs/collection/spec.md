# collection Specification

## Purpose

Collection is how a bought item reaches the shopper at the counter: a collection window set by the shop, a collection code, one extension, reminders, and an automatic refund if nobody collects (decision 037).

## Requirements

### Requirement: Collect-by date before Buy
The shopper SHALL see the collect-by date, with its length once, before tapping Buy, and the date again on the receipt; the app SHALL show dates, not durations, everywhere else.

#### Scenario: Default window
- **WHEN** Paper & Co keeps bought items for 7 days and today is Mon 2 Nov
- **THEN** the details sheet reads "Collect by Mon 9 Nov (7 days) · full refund if you don't"

### Requirement: Receipt with collection code
The receipt SHALL show the status, shop and items, the collection code, the shop's street and opening, the amount paid and the payment method, with Directions, Extend and Cancel for a refund.

#### Scenario: Ready order
- **WHEN** the shopper opens a Ready order
- **THEN** the receipt shows "Ready · collect by Mon 9 Nov", the code "K7Q2", "Paid £29.98" and "Apple Pay · debit card •••• 4021"

### Requirement: Code at the counter
Tapping the code SHALL show it full screen for the shop to scan, with the items and shop.

#### Scenario: At the counter
- **WHEN** the shopper taps "Tap to enlarge"
- **THEN** the code "K7Q2" fills the screen with "2 × eclipse glasses · Paper & Co"

### Requirement: Collected
When the shop scans the code or marks the order collected, the order SHALL read "Collected" and Snuffle SHALL ask how the shop was.

#### Scenario: Shop marks collected
- **WHEN** Paper & Co scans K7Q2
- **THEN** the order reads "Collected"

### Requirement: Reminder and one extension
The day before the collect-by date Snuffle SHALL remind the shopper and offer one extension of the same length.

#### Scenario: Day before
- **WHEN** it is Sun 8 Nov and the order is uncollected
- **THEN** Snuffle says "Collect by Mon 9 Nov, 7pm. Can't make it? You can extend once." with "Extend to Mon 16 Nov"

#### Scenario: Extend
- **WHEN** the shopper taps "Extend to Mon 16 Nov"
- **THEN** the order reads "Extended · collect by Mon 16 Nov" and Extend is no longer offered

### Requirement: Not collected
If nobody collects by the end of the window, the order SHALL be cancelled and refunded in full automatically, and Snuffle SHALL offer Ask [shop] again and Keep looking.

#### Scenario: Missed window
- **WHEN** Mon 9 Nov passes without collection
- **THEN** on Tue 10 Nov the order reads "Not collected · refunded" and Snuffle says "I've refunded £29.98 to your card."

### Requirement: Collect after work
Where the shop closes before the shopper can come, the details sheet SHALL offer a collection point that stays open later, with its own collect-by time.

#### Scenario: Corner shop
- **WHEN** Jess asks for sourdough from Rossi's "but I finish work at 6"
- **THEN** the sheet offers "At the corner shop · open till 11pm" with "Collect by Fri 6 Nov, 11pm (same day)"

### Requirement: Prototype clock for collection
Collection dates, the day-before reminder and the missed window SHALL follow the prototype's clock, which the state debugger can move.

#### Scenario: Move to the day before
- **WHEN** the debugger moves the date to Sun 8 Nov, 9:00
- **THEN** Snuffle's reminder with "Extend to Mon 16 Nov" appears in the chat

#### Scenario: Move past the window
- **WHEN** the debugger moves the date to Tue 10 Nov
- **THEN** the order reads "Not collected · refunded"

### Requirement: Readable code
The full-screen collection code SHALL keep the screen awake and at full brightness while shown, where the platform allows.

#### Scenario: At the counter
- **WHEN** Sam opens the code full screen on an iPhone
- **THEN** the screen doesn't dim while the code is shown
