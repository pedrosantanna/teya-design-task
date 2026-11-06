# shop-page Specification

## Purpose

The shop page is the detail form of a shop: who they are, when they are open, how far, how they answer, and what people asked them about recently. Items never get a page; they appear here only as past answers.

## Requirements

### Requirement: Shop header
The shop page SHALL show the shop's photos, its name in the display style, the opening state on its own line (the word in its colour, its time after it), and under it the walk time, the street and, where they apply, Delivers and New as icon groups. Facts SHALL NOT be joined by dots, and a line SHALL wrap only between groups. A made-to-order notice SHALL sit in "How it works".

#### Scenario: Rossi's Bakery
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** the page shows "Rossi's Bakery", "Open until 6pm", then the groups "2 min walk" and "Blythe Road", and "How it works" lists "Made to order" with "2 days' notice"

### Requirement: Shop actions
The shop page SHALL offer Ask, Call and Directions; Ask SHALL start a request addressed to this shop.

#### Scenario: Ask Rossi's
- **WHEN** the shopper taps "Ask Rossi's"
- **THEN** a new request opens with Rossi's Bakery as the shop to ask

### Requirement: How the shop answers
The shop page SHALL say whether the shop answers from its till ("Stock from the till") or by reply ("Usually replies in [n] min") in "How they do on Snuffle", and its collection window and delivery fee in "How it works".

#### Scenario: Connected shop
- **WHEN** the shopper opens Broadway Chemist, whose till shares stock
- **THEN** the page shows "Stock from the till"

### Requirement: Back
Back SHALL return to where the shop page was opened from, by the platform's own gesture or control. On iOS and the web Back is a chevron in a glass circle whose accessibility label names the previous screen; on Android it is the arrow icon button.

#### Scenario: Back to Nearby
- **WHEN** the shopper opened the page from a Nearby tile and swipes from the left edge on iOS
- **THEN** Nearby shows again at the same scroll position

#### Scenario: Back label
- **WHEN** VoiceOver focuses Back on a shop page opened from Nearby
- **THEN** it reads "Back to Nearby"

### Requirement: Photo credits in code only
The prototype's photos are stand-ins, so the shop page SHALL NOT show photo credits in its interface; the photographer and Unsplash credit for each photo SHALL stay in `app/src/content/images.ts`. (Changed by `identity-in-use`; the map's "© OpenStreetMap contributors" stays, as the map data's licence requires.)

#### Scenario: No credit lines
- **WHEN** the shopper opens Rossi's Bakery
- **THEN** no photo credit appears on the page or in its accessibility hints

### Requirement: Simulated Call and Directions
In the prototype, Call and Directions SHALL show what would happen (the number to call, the walking route) without leaving the app.

#### Scenario: Directions
- **WHEN** the shopper taps Directions on Rossi's Bakery
- **THEN** a sheet shows the walk from Blythe Road with "2 min walk" and no external app opens

### Requirement: Zoom open and dismiss
The shop page SHALL open with a zoom from the tile that was tapped, and on iOS the shopper SHALL be able to drag it down to zoom it back into the tile. Under Reduce Motion it SHALL crossfade instead.

#### Scenario: Drag to dismiss
- **WHEN** the shopper drags the shop page down on iOS
- **THEN** the page shrinks toward the Rossi's Bakery tile and Nearby shows again

### Requirement: Accent wash behind the name
The shop page SHALL put the content on a solid card in the shop's accent tile, in light and dark, with rows, chips and buttons recoloured for that tile. The card SHALL rest inset from the screen edges and grow to the full width as it scrolls up, and its text SHALL keep its line breaks while it grows.

#### Scenario: Florist
- **WHEN** the shopper opens Halo Florist
- **THEN** its name sits on a Pistachio card, in Display title

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

### Requirement: How they do on Snuffle
The shop page SHALL show how often the shop answers requests, how fast it replies (or that stock comes from its till), and how often it had the item when it said yes. The last line SHALL appear only after 10 "has it" answers; before that the row SHALL read "New on Snuffle". Ratios SHALL be rounded down. "How we work this out" SHALL open a short explanation that also says shops see these numbers and can dispute them.

#### Scenario: Established shop
- **WHEN** Rossi's answered 46 of 51 requests, usually within 6 minutes, and had the item 24 of the 25 times it said yes
- **THEN** the rows read "Answers 9 in 10 requests", "Usually replies in 6 min" and "Had it 24 of 25 times when they said yes"

#### Scenario: Too few answers to judge
- **WHEN** a shop has said yes 8 times
- **THEN** the stock row reads "New on Snuffle" and no count is shown

### Requirement: What buyers say
The shop page SHALL show ratings under a "Ratings" heading as one carousel set straight on the card, with no panel around it. Its first card SHALL be the summary (the share who would go back, how many people rated, up to three tags) and the next cards SHALL be up to five reviews of the same height, each with the reviewer's first name and the month. Under it a grouped list SHALL hold "See all [n] reviews" and "How ratings work". Percentages SHALL be rounded down, and there SHALL be no stars.

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

### Requirement: Shop page photos
The shop page SHALL show its photos with the next one peeking 72 to 88 pt from the right and a glass capsule reading the current photo and the count ("1/3").

#### Scenario: Swipe photos
- **WHEN** the shopper swipes to the second photo
- **THEN** the capsule reads "2/3"

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
