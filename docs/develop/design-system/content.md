# Content and voice

How Snuffle writes, how errors and outcomes are worded, and the formats for times, dates, prices, distances and counts. The words themselves (request, answer, order, Buy) are fixed on the Conceptual model page.

```summary
Takeaways:
- Snuffle speaks in the first person, in British English, in short plain sentences. It never sells and never apologises out of habit.
- Snuffle reports what shops said; an answer card carries the shop's facts and says where they came from.
- Error and outcome messages say what happened, where the money is and what to do next, in that order.
- Formats are UK English and 12-hour: "by 4pm", "4:30pm", "Mon 9 Nov", "£6", "£14.99", "13 min walk", "9+". Strings go through ICU plurals, en-GB only.
- Ratings ask one question, "Would you go back?", and show the answer as a percentage of buyers with the count beside it, rounded down. No stars, no "Excellent!", never "verified". The UK rules on consumer reviews set how ratings are collected and shown.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose 12-hour times in all copy, including timestamps, and kept these rules provisional (decision 043).
- Later I asked for ratings on the shop page. I chose a thumbs up or down over stars and a dispute for shops, and set the rules from the DMCC Act and the CMA's fake reviews guidance (decision 047).
- In round 10 I asked for the Requests list to carry Snuffle's latest status in its own voice for every state, with no dots, icons or button in the row.
- In round 11 I said the metadata lines joined with floating dots looked generic, and asked for facts told apart by weight, colour, icon and position instead. I asked for the ratings section to open with one large figure, then tags, three notes with a first name and date, and "See all", and for "Found here recently" to become a short list.
AI:
- An agent reviewed the design system against the v7 screens and found the time formats mixed (24-hour timestamps beside "by 4pm"). Another agent wrote this page from the v7 copy and the conceptual model.
- An agent read Schedule 20 of the DMCC Act 2024 and the CMA's guidance (CMA208) and turned each duty into a rule for Snuffle's screens.
- An agent wrote a preview line for each request and order state in the conceptual model and moved the preview into one function in the store.
- An agent compared how Airbnb, Apple Maps, Google Maps and Uber Eats group their facts, built one component for a shop's status, walk and street, and rewrote every dot-joined string it found in the app; Mobbin was blocked, so what it recalled of other apps is guidance, not evidence.
Trade-offs:
- 12-hour times match how people in the UK say them and GOV.UK's style, and take a little more width than 24-hour times in rows.
- A plain, unapologetic voice can read as cold when something fails; saying the money state first is meant to carry the care instead.
- Rounding down and showing the buyer count make a shop look a little worse than an average of stars would; I chose them because a score that never flatters is one shoppers and shops can both trust.
```

## Snuffle's voice

| Trait | In practice | Example |
| --- | --- | --- |
| First person | Snuffle says "I" for what it does and "you" for the shopper | "I'll ask the shops most likely to have them." |
| British English | Spelling, words and formats from the UK | "Collect by Mon 9 Nov, 7pm", "£3.50", "Paper & Co's own courier" |
| Short | One idea per sentence, two sentences per bubble as a rule | "Two shops have them so far." |
| Plain | Words from the conceptual model; no payment terms (authorised, captured) | "You're only charged when they confirm." |
| Never salesy | No exclamation marks, no urgency it didn't get from a shop, no "great deal" | "Without buying, they may sell before you get there." |
| No apologetic filler | No "Sorry", "Unfortunately" or "I'm afraid" before an outcome; the facts come first | "Paper & Co hasn't confirmed in 10 minutes, so you haven't been charged." |
| Asks only what's missing | Place and deadline are filled from what the shopper typed | "Will you collect them, or should I check delivery too?" |

### Request row previews

The preview line of a request row is Snuffle's latest status in its own voice, written "Snuffle: …". The rule is first person, short, the state's news first. Once an order exists, its state sets the line.

| State | Preview line |
| --- | --- |
| No request yet | Snuffle: What do you need? |
| Asking | Snuffle: Asking 6 shops |
| One shop has it | Snuffle: Found it at 1 shop |
| Some shops have it | Snuffle: Found them at 2 shops |
| Needs you | Snuffle: Rossi's needs your answer |
| Looking | Snuffle: Still looking until Fri 6 Nov |
| Every Friday | Snuffle: I'll ask again every Friday until Fri 4 Dec |
| Not found | Snuffle: No one had it. Want me to keep looking? |
| Closed | Snuffle: Closed. Nothing was bought (also what a request closed by swipe shows) |
| Order waiting for the shop | Snuffle: Waiting for Rossi's. You haven't been charged |
| Paid | Snuffle: Paid. Rossi's is setting it aside |
| Ready | Snuffle: Ready to collect till 6pm |
| Extended | Snuffle: Extended. Collect by Mon 16 Nov |
| On its way | Snuffle: On its way from Paper & Co |
| Delivered | Snuffle: Delivered. How was Paper & Co? |
| Delivered and rated | Snuffle: Delivered. Thanks for rating Paper & Co |
| Collected | Snuffle: How was Brook Hardware? |
| Rated | Snuffle: Thanks for rating Brook Hardware |
| Not confirmed | Snuffle: Paper & Co didn't confirm. You haven't been charged |
| Sold | Snuffle: Paper & Co sold out. You haven't been charged |
| Cancelled | Snuffle: Cancelled. I've refunded £29.98 |
| Not collected | Snuffle: Not collected, so I've refunded £29.98 |

## Snuffle and the shops

| Who | Where | How it reads |
| --- | --- | --- |
| Snuffle | Bubbles | Reports in the third person what shops did: "Paper & Co on King Street has them too." Never speaks as a shop ("we have") |
| A shop | Answer cards | The shop's facts in the interface's labels, with their source: "Has them · replied 2 min ago", "In stock now · till". A note the shop wrote, if there is one, appears on its card in quotation marks |
| The system | Status labels, buttons, notifications | The state table and the verbs, word for word |

## Outcome and error messages

Every message after something goes wrong, or after an order ends, has three parts: what happened, the money state, the next step. The money state is said even when nothing moved.

| Case | Snuffle's message (v7) | Status label | Next step |
| --- | --- | --- | --- |
| Sold | "Paper & Co sold the last pairs before they could set them aside, so you haven't been charged." | Sold · not charged | The next shop's answer card, "Keep looking" |
| Shop doesn't confirm | "Paper & Co hasn't confirmed in 10 minutes, so you haven't been charged." | Not confirmed · not charged | The next shop's answer card, "Keep looking" |
| Payment declined | "Apple Pay declined the payment, so you haven't been charged and Paper & Co hasn't been asked to set them aside." | none: no order exists | "Try again" |
| Not collected | "You didn't collect by Mon 9 Nov, so your order at Paper & Co is cancelled. I've refunded £29.98 to your card." | Not collected · refunded | "Ask Paper & Co again", "Keep looking" |
| Nothing found in time | "None of the 6 shops has them before 4pm: 4 said no and 2 didn't reply." | Not found | "Ask further away", "Keep looking" |
| Asked further away | "I'm asking three more shops, up to 30 minutes away. I'll tell you as they answer." Then the shops' answers; if none has it: "None of the 3 shops further away has them either. I can keep looking and tell you when one has them." | Not found, until a shop answers | "Keep looking" |
| Standing request | "I'll ask Rossi's again every week, on Fridays, until Fri 4 Dec, and tell you what they say." (an ask that says "every Friday") | Every Friday | Change, Stop |
| Search stopped | "Done. I've stopped looking, and nothing was bought." (a standing request: "Done. I won't ask again, and nothing was bought.") | Closed | none |

## Button labels

Buttons are verbs from the conceptual model, in sentence case, with what they act on when it helps: Buy, "Buy 1", "Buy for £29.98", Ask, "Ask Rossi's", Extend, "Extend to Mon 16 Nov", "Cancel for a refund", "Keep looking", "Try again", "Show me", "No thanks", Call, Rate. Directions keeps the platform's usual noun. A button never says OK, Submit or Continue when a verb from the model fits.

## Metadata lines

Facts about a shop or a request are told apart by weight, colour, icon and position. A floating dot between them reads as filler and makes the line hard to scan.

| Rule | In practice | Never |
| --- | --- | --- |
| Status first, in its own colour | "Open" in Success or "Closes soon" in Warning, then its time in Muted foreground: "Open until 6pm". A closed shop reads "Closed, opens 9am" | "Open till 6pm · Blythe Road · 2 min walk" |
| One group per kind of fact | The walk is a footprints symbol with "2 min walk", the street a pin with "Blythe Road"; each group is one unit | A string of facts joined with dots |
| Units stay whole | Non-breaking spaces inside a group ("2 min walk", "until 6pm"); a line breaks only between groups, on two lines at most | A break between "2 min" and "walk" |
| The shop page header | Line 1 the status, line 2 the walk and the street; Promoted is a tag under the facts; the lead time ("Made to order", "2 days' notice") is a row in How it works | The lead time or "Promoted" inside a facts line |
| Rows and tiles | The status and the walk time with its symbol; the street only where nothing else on the screen names it | The street repeated under a street filter |
| Request rows | A status tag ("Needs you"), the deadline as its own text ("Buy by Thu 5 Nov"), the count as the trailing badge | "Needs you · by Tuesday", "Needs you · 1" |
| Filter counts | The count after the label in Muted foreground: "Needs you 1" | A dot before the count |
| Details and endings | A comma or a new sentence: "Collect by Mon 9 Nov. Full refund if you don't", "In stock now, 1 of 2" | A dot between clauses |
| Where a dot stays | A plain list of countable facts of one kind, as Airbnb writes "2 beds · 1 bath"; the prototype has no such list, so the app has no dots; a button that carries its amount says "Buy for £29.98" | A dot between a status and its detail, or between unlike facts |

The state table's labels keep their dot in the source as the place where the status ends and its detail begins. The status label draws the two in different weights and colours and never shows the dot.

## Ratings

| Rule | In practice | Never |
| --- | --- | --- |
| One question | "Would you go back?", answered with a thumbs up or down | Stars, scores out of 10, "How satisfied were you?" |
| A percentage of people | "92%" large, with "would go back" and "38 people" beside it; the count always beside the figure | "4.6", "9.2/10", a figure without its count |
| Never round up | 91.7% shows as "91%"; counts stay as counts ("Had it 24 of 25 times they said yes") | "92%" for 91.7%, "100%" for 24 of 25 |
| Few ratings | Below 5, tags and Snuffle's signals with "New on Snuffle" and "3 people so far"; none: "No ratings yet" and "Snuffle has asked them 4 times" | A percentage from 3 people |
| People | "38 people" for the count; "buyers" where the rule is about who can rate | customers, reviewers, users |
| First names | A note shows the person's first name with the month ("Priya", "Oct 2026"); the shopper's own note says "You" | Surnames, photos, avatars, the type of purchase |
| Plain verdicts | "Would go back", "Wouldn't go back" and the fixed tags | "Excellent!", "Top rated", "Highly recommended" |
| Source on every signal | "What buyers said", "What Snuffle saw", "from 31 requests on Snuffle", "from the shop's till" | "verified", "trusted", "guaranteed" |
| Dates by month | "Oct 2026", "Edited Oct 2026" | "3 weeks ago", "12/10/2026" |
| One element per row | Each signal is one row with a full label: "Would go back, 92 percent of 38 people"; colour and the thumbs glyph never carry the meaning alone | A green or red figure with no words |

## Rules on reviews

Schedule 20 of the Digital Markets, Competition and Consumers Act 2024 (paragraph 13), in force since 6 April 2025, bans fake reviews and concealed incentivised reviews, and requires a platform that publishes reviews to take reasonable and proportionate steps to prevent and remove them. The CMA's guidance (CMA208) says what those steps look like. Snuffle follows them as product rules:

| Duty | Snuffle |
| --- | --- |
| Reviews come from people who had the experience | Only an order marked Collected or Delivered can be rated, one rating per order, editable for 30 days |
| No fake or harmful content | Notes are screened for abuse and personal data before they show; a shop can dispute a specific case |
| Negative reviews are not suppressed | Negative ratings are never withheld or delayed; the highlighted cards mirror the overall split, so with 10% thumbs down at least one negative card shows once there are more than 10 ratings |
| No review gating (CMA208, 4.5) | Snuffle asks every buyer of a collected or delivered order, never only the ones it expects to be happy, with one reminder at most |
| AI summaries reflect real opinions | A summary is built only from buyers' notes and labelled "Summary by Snuffle from buyers' notes" |
| Incentivised reviews are disclosed | Snuffle never rewards a rating; a rating a shop paid or rewarded for is flagged as such |
| Traders may respond | A shop can reply once, in public, under a rating |
| Users know how reviews work | "How ratings work", linked from the rating summary, says who can rate, what is screened and how the figures are worked out |

## Formats

| Thing | Format | Examples | Never |
| --- | --- | --- | --- |
| Time in copy | 12-hour, lower-case am/pm, no space, minutes only when not zero | "by 4pm", "4:30pm", "Collect by Mon 9 Nov, 7pm", "Delivered at 2:41pm" | "16:00", "4 PM", "4.30pm" |
| Midday and midnight | Words | "by midday", "open till midnight" | "12pm", "12am" |
| Timestamps in rows | Today: the time; this week: the day; this year: day and month; earlier: month and year | "1:12pm", "Fri", "12 Oct", "Aug 2025" | 24-hour times |
| Device chrome | The status-bar clock and other system UI follow the system's 24-hour clock; only interface copy is 12-hour | "13:12" in the status bar, "1:12pm" in a row | A 12-hour status-bar clock |
| Dates | Short day, day number, short month; "today" and "tomorrow" when they are | "Mon 9 Nov", "Fri", "12 Oct", "today", "tomorrow" | "9/11", "November 9th" |
| Durations | Only once, before Buy | "(7 days)", "2 days' notice" | Durations anywhere after Buy |
| Prices | Pound sign, no pence when whole, two decimals otherwise; under £1 in pence | "£6", "£14.99", "£29.98", "80p" | "£6.00", "GBP 6" |
| Distances | Walking minutes | "13 min walk", "Within 15 min" | Miles, kilometres, metres |
| Counts | Digits; a count badge caps at 9+ | "2 shops", "9+" | "two shops" in labels |
| Case | Sentence case for everything, including buttons and titles | "Keep looking", "Open near you" | Title Case, ALL CAPS |

v7's frames still show 24-hour timestamps ("13:12", "Delivered at 14:41"); the prototype uses the formats above.

## Plurals and agreement

| Rule | Examples |
| --- | --- |
| Labels agree with the item | "has it" for one thing, "has them" for several; "Has 1 of 2" |
| Shops and items agree with the count | "1 shop", "2 shops"; "1 pair", "2 pairs" |
| Every count goes through an ICU plural | `{count, plural, one {# shop has them} other {# shops have them}}` |

## Text size

| Size | Behaviour |
| --- | --- |
| Default to 200% | Every screen works, with text wrapping in place (WCAG 1.4.4) |
| Accessibility sizes (iOS AX1 and up, Android above 150%) | Rows stack: meta and price move under the title; carousels on Nearby become vertical lists; buttons grow in height and wrap to two lines |
| Caps per style | Display styles stop at 1.5 times their size, since Gambetta at 34 already fills a line; Caption 2 never goes below 11; body and text styles scale fully |
| Never cut | Prices, totals, collection codes and button labels |

The caps are a proposal to check on a phone at the largest sizes.

## Localisation

The app ships in en-GB only. Every string lives in one string table and goes through ICU MessageFormat, so plurals, prices and dates are formatted by the locale rather than built by joining words; another language later is a new table, not new code. Shop names, item names and quotes from shops are never translated.

## Sources

- Digital Markets, Competition and Consumers Act 2024, Schedule 20, paragraph 13: https://www.legislation.gov.uk/ukpga/2024/13/schedule/20
- Competition and Markets Authority, Fake reviews guidance (CMA208), 2025: https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf
- GOV.UK, style guide (times, dates, money): https://www.gov.uk/guidance/style-guide/a-to-z
- Apple, Human Interface Guidelines, Writing: https://developer.apple.com/design/human-interface-guidelines/writing
- Material 3, content design: https://m3.material.io/foundations/content-design/overview
- Unicode, ICU MessageFormat: https://unicode-org.github.io/icu/userguide/format_parse/messages/
- W3C, WCAG 2.2, 1.4.4 Resize text: https://www.w3.org/WAI/WCAG22/Understanding/resize-text
- [App flow](../ideation/app-flow.md), v7, for the copy; [Conceptual model](conceptual-model.md) for the words, states and verbs
