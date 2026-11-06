# Spec Delta

## MODIFIED Requirements

### Requirement: Shop header
The shop page SHALL show the shop's photos, its name in the display style, the opening state on its own line (the word in its colour, its time after it), and under it the walk time, the street and, where they apply, Delivers and New as icon groups. Facts SHALL NOT be joined by dots, and a line SHALL wrap only between groups. A made-to-order notice SHALL sit in "How it works".

#### Scenario: Rossi's Bakery
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** the page shows "Rossi's Bakery", "Open until 6pm", then the groups "2 min walk" and "Blythe Road", and "How it works" lists "Made to order" with "2 days' notice"

### Requirement: What they sell
The shop page SHALL show what the shop sells as category chips and the usual price range with its source. A category chip SHALL open a new request addressed to the shop with the chip's text.

#### Scenario: Rossi's categories
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** "What they sell" shows chips such as "Sourdough" and "Celebration cakes" and the line "Most items £2–£35 · from past answers"

#### Scenario: Chip opens a request
- **WHEN** the shopper taps the "Sourdough" chip
- **THEN** New Request opens addressed to Rossi's Bakery with "Sourdough" filled in

#### Scenario: Connected shop's prices
- **WHEN** the shop's till shares stock
- **THEN** the price line ends "· from the shop's till"

### Requirement: What buyers say
The shop page SHALL show ratings under a "Ratings" heading as one carousel set straight on the card, with no panel around it. Its first card SHALL be the summary (the share of buyers who would go back, how many people rated, up to three tags) and the next cards SHALL be reviews of up to five, all the same height, each with the reviewer's first name and the month. Under the carousel a grouped list SHALL hold "See all [n] reviews" and "How ratings work". Below 5 ratings the summary SHALL show no percentage, only the count. Percentages SHALL be rounded down. There SHALL be no stars.

#### Scenario: Rated shop
- **WHEN** 35 of 38 buyers would go back to Rossi's
- **THEN** the summary card reads "92%" and "would go back", is spoken as "Would go back, 92 percent of 38 buyers", and "See all 38 reviews" opens the list of ratings

#### Scenario: Few ratings
- **WHEN** Halo Florist has 3 ratings
- **THEN** the summary card shows "3 people so far" and no percentage

#### Scenario: No ratings
- **WHEN** Blythe Road News has no ratings
- **THEN** one grouped list holds "No ratings yet" and "How ratings work", and no carousel shows

#### Scenario: Reviewer shown by first name
- **WHEN** a review card shows
- **THEN** it names the reviewer by first name and the month, and shows no surname, photo or how the order was handed over

### Requirement: Accent wash behind the name
The shop page SHALL put the content on a solid card in the shop's accent tile, in light and dark, with rows, chips and buttons recoloured for that tile. The card SHALL rest inset from the screen edges and grow to the full width as it scrolls up, and its text SHALL keep its line breaks while it grows.

#### Scenario: Florist
- **WHEN** the shopper opens Halo Florist
- **THEN** its name sits on a Pistachio card, in Display title

## ADDED Requirements

### Requirement: Found here recently
The shop page SHALL list up to five items shoppers found at the shop through Snuffle under "Found here recently", each with how long ago, with no buyer and no price. A line under the list SHALL say where the names come from. The list SHALL come before "How it works".

#### Scenario: Rossi's
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** "Found here recently" lists names such as "Sourdough loaf" with "Today" and "What shoppers found here through Snuffle." under it

### Requirement: Carousels to the card's edge
The ratings carousel and the photo carousel SHALL scroll past the content padding to the card's edges and be clipped there, while the first card or photo rests on the text's edge.

#### Scenario: At rest
- **WHEN** the shop page is at the top
- **THEN** the first rating card starts at the text's left edge and the next one runs to the card's right edge

#### Scenario: Scrolling the carousel
- **WHEN** the shopper swipes the ratings
- **THEN** cards slide out at the card's edge, not at the text's margin

### Requirement: Map header
The strip of map above the card SHALL work as the page's header: it SHALL be two `space.8` steps under the bar before the card starts, with the shop's pin centred between the bottom of the status bar and the card, and the walk drawn (see the map capability).

#### Scenario: Page at rest
- **WHEN** the shop page opens
- **THEN** the map shows the walk and the pin in the strip above the card, and the card starts below it

## REMOVED Requirements

### Requirement: Asked about recently
**Reason**: Replaced by "Found here recently" (decision 056). The page no longer lists questions and outcomes such as "Had it" or "Didn't have it"; it lists items shoppers found.
**Migration**: Use "Found here recently".
