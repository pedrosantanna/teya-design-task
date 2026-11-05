# Spec Delta

## ADDED Requirements

### Requirement: Rate after collection or delivery
After Collected the order card SHALL read "Collected · rate [shop]" and carry a Rate action. After delivery Snuffle SHALL ask "How was [shop]?" with a Rate chip. Rate SHALL open the rating sheet.

#### Scenario: Collected at Paper & Co
- **WHEN** Paper & Co marks Sam's order collected
- **THEN** the order card reads "Collected · rate Paper & Co" with Rate

### Requirement: Rating sheet
The rating sheet SHALL ask "Would you go back?" with a thumbs up and a thumbs down, show tags that follow the answer, take an optional note of up to 140 characters, and send only once an answer is chosen. There SHALL be no stars.

#### Scenario: Thumbs down
- **WHEN** Sam taps the thumbs down
- **THEN** the tags change to the thumbs-down list ("Not as described", "Took a while"…)

### Requirement: Rating stored on the order
On Send the rating SHALL be stored on the order, the order card SHALL read "Collected · rated", and the shop's page SHALL count the rating.

#### Scenario: After sending
- **WHEN** Sam sends a thumbs up with "Friendly"
- **THEN** the order card reads "Collected · rated" and Paper & Co's page counts one more buyer and one more "Friendly"

### Requirement: Rating steps in the debugger
The state debugger SHALL list the steps Collected, Rate the shop, Rate: wouldn't go back and Rated.

#### Scenario: Jump to the sheet
- **WHEN** the author picks "Rate the shop"
- **THEN** the chat shows the collected order with the rating sheet open
