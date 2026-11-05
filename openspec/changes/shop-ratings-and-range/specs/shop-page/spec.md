# Spec Delta

## ADDED Requirements

### Requirement: What they sell
The shop page SHALL show what the shop sells as category chips, the usual price range with its source, and the items people often asked the shop about with past-answer labels. A category chip SHALL open a new request addressed to the shop with the chip's text.

#### Scenario: Rossi's categories
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** "What they sell" shows chips such as "Sourdough" and "Celebration cakes", the line "Most items £2–£35 · from past answers", and "Often asked about here" with "Sourdough · Had it · 2 hours ago"

#### Scenario: Chip opens a request
- **WHEN** the shopper taps the "Sourdough" chip
- **THEN** New Request opens addressed to Rossi's Bakery with "Sourdough" filled in

#### Scenario: Connected shop's prices
- **WHEN** the shop's till shares stock
- **THEN** the price line ends "· from the shop's till"

### Requirement: How they do on Snuffle
The shop page SHALL show how often the shop answers requests, how fast it replies (or that stock comes from its till), and how often it had the item when it said yes. The last line SHALL appear only after 10 "has it" answers; before that the row SHALL read "New on Snuffle". Ratios SHALL be rounded down. "How we work this out" SHALL open a short explanation that also says shops see these numbers and can dispute them.

#### Scenario: Established shop
- **WHEN** Rossi's answered 46 of 51 requests, usually within 6 minutes, and had the item 24 of the 25 times it said yes
- **THEN** the rows read "Answers 9 in 10 requests", "Usually replies in 6 min" and "Had it 24 of 25 times when they said yes"

#### Scenario: Too few answers to judge
- **WHEN** a shop has said yes 8 times
- **THEN** the stock row reads "New on Snuffle" and no count is shown

### Requirement: What buyers say
The shop page SHALL show the share of buyers who would go back and how many buyers rated, tag counts, two buyer notes that mirror the overall split, a link to all ratings and a link to how ratings work. Below 5 ratings it SHALL show no percentage. Percentages SHALL be rounded down. There SHALL be no stars.

#### Scenario: Rated shop
- **WHEN** 35 of 38 buyers would go back to Rossi's
- **THEN** the section reads "92% would go back · 38 buyers", is spoken as "Would go back, 92 percent of 38 buyers", and "See all 38" opens the list of ratings

#### Scenario: Few ratings
- **WHEN** Halo Florist has 3 ratings
- **THEN** the section reads "New on Snuffle · 3 buyers so far"

#### Scenario: No ratings
- **WHEN** Blythe Road News has no ratings
- **THEN** the section says no buyer has rated it yet and shows no notes

## MODIFIED Requirements

### Requirement: Asked about recently
The shop page SHALL list recent questions and their outcomes as "Had it · [when]" or "Didn't have it · [when]" under "Often asked about here" inside "What they sell", and SHALL leave the list out when there are none.

#### Scenario: Past answers
- **WHEN** Rossi's had sourdough 2 hours ago and no rye this morning
- **THEN** the list shows "Sourdough · Had it · 2 hours ago" and "Rye loaf · Didn't have it · this morning"

### Requirement: How the shop answers
The shop page SHALL say whether the shop answers from its till ("Stock from the till") or by reply ("Usually replies in [n] min") in "How they do on Snuffle", and its collection window and delivery fee in "How it works".

#### Scenario: Connected shop
- **WHEN** the shopper opens Broadway Chemist, whose till shares stock
- **THEN** the page shows "Stock from the till"
