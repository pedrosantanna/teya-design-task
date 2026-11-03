# Content and voice

How Snuffle writes, how errors and outcomes are worded, and the formats for times, dates, prices, distances and counts. The words themselves (request, answer, order, Buy) are fixed on the Conceptual model page.

```summary
Takeaways:
- Snuffle speaks in the first person, in British English, in short plain sentences. It never sells and never apologises out of habit.
- Snuffle reports what shops said; an answer card carries the shop's facts and says where they came from.
- Error and outcome messages say what happened, where the money is and what to do next, in that order.
- Formats are UK English and 12-hour: "by 4pm", "4:30pm", "Mon 9 Nov", "£6", "£14.99", "13 min walk", "9+". Strings go through ICU plurals, en-GB only.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose 12-hour times in all copy, including timestamps, and kept these rules provisional (decision 043).
AI:
- An agent reviewed the design system against the v7 screens and found the time formats mixed (24-hour timestamps beside "by 4pm"). Another agent wrote this page from the v7 copy and the conceptual model.
Trade-offs:
- 12-hour times match how people in the UK say them and GOV.UK's style, and take a little more width than 24-hour times in rows.
- A plain, unapologetic voice can read as cold when something fails; saying the money state first is meant to carry the care instead.
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

## Button labels

Buttons are verbs from the conceptual model, in sentence case, with what they act on when it helps: Buy, "Buy 1", "Buy · £29.98", Ask, "Ask Rossi's", Extend, "Extend to Mon 16 Nov", "Cancel for a refund", "Keep looking", "Try again", "Show me", "No thanks", Call, Rate. Directions keeps the platform's usual noun. A button never says OK, Submit or Continue when a verb from the model fits.

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

- GOV.UK, style guide (times, dates, money): https://www.gov.uk/guidance/style-guide/a-to-z
- Apple, Human Interface Guidelines, Writing: https://developer.apple.com/design/human-interface-guidelines/writing
- Material 3, content design: https://m3.material.io/foundations/content-design/overview
- Unicode, ICU MessageFormat: https://unicode-org.github.io/icu/userguide/format_parse/messages/
- W3C, WCAG 2.2, 1.4.4 Resize text: https://www.w3.org/WAI/WCAG22/Understanding/resize-text
- [App flow](../ideation/app-flow.md), v7, for the copy; [Conceptual model](conceptual-model.md) for the words, states and verbs
