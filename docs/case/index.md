# Overview

Snuffle is a concierge for the small independent shops near a shopper: you say what you need and by when, it asks the shops, and you buy and collect in the same chat.

<div class="feature"><video class="phone-video" src="media/shops-answer.mp4" data-poster="media/shops-answer.png" width="450" height="948" aria-label="Six shops move from Asked to Seen to an answer; Paper and Co, Broadway Chemist and Olympia Cameras answer with prices and Buy" controls muted playsinline loop preload="metadata"></video><div>

## My answer to the brief

I chose findability: is it there, right now? Few small shops publish item-level stock, so a search has little to index. In Snuffle the shop itself answers. Where a till shares stock, the answer is instant; everywhere else Snuffle asks the shop and never guesses.

The transaction decides what every answer carries: the shop, the price, a collect-by date and Buy. The search ends where the purchase starts.

The bet everything rests on is that shops answer within minutes while they are open. Nothing in the evidence shows it yet, so it is the [first thing I'll test](next.md).

</div></div>

## How I work

I used very little Figma. I build with AI agents in code, and I write every decision down as verbose context: the research, the specs, the rules and the logs. I call that the AI context, and it is the second block in the sidebar. Every agent reads it before it works, so I can run several in parallel without spending my time correcting AI slop.

I did this alone, directing the agents, from 1 to 6 November 2026, on a take-home brief with no real product, shoppers or shops behind it.

## The walkthrough

The pages follow the order I worked in, which is also the order of the recording.

1. [Discovery](discovery.md): desk research, Hammersmith, public posts, proto-personas, and the choice of findability.
2. [Concept](concept.md): a concierge of agents between shoppers and shops, and the key decisions with what each gave up.
3. [Value and viability](viability.md): why it belongs inside a POS provider, with a revenue projection.
4. [How I built it](how-i-built.md): the AI context, the flows and design system, the review gates and what I threw away.
5. [The product](product.md), its [features](features.md) and the [prototype](../deliver/prototype.md).
6. [What I'll test next](next.md): three hypotheses with pass marks, the first experiment and the signals to stop or go.

## What isn't measured yet

Nothing about demand. No shopper or shopkeeper was interviewed; the shopper evidence is 20 clustered public posts. The prototype's shops are invented and answer on a script, and the revenue figures are a projection. Whether shops answer at all is the [first test](next.md).

Evidence: [the brief](../brief.md), [decision log](../decision-log.md).
