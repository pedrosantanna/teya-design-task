# Screen review

The eighteen checks every screen goes through, wireframe or prototype. An agent runs them on every screen, looking at it rendered, and reports what breaks, screen by screen. The checks cover grouping and hierarchy, the conceptual model and its words, the tokens on the other design-system pages and Apple's guidelines first, then Material's.

```summary
Takeaways:
- Eighteen checks under five headings: Gestalt, hierarchy, information architecture, model and words, accessibility.
- Each check has a pass mark that can be measured on the screen: a gap in tokens, a count of sizes or actions, a word from the Words table.
- The agent reviews the rendered screen, not the code, and reports breaks by screen so I can fix them or log why one stays.
Call:
- I asked for every screen to be checked against Gestalt and information architecture, visually, by an agent in the workflow (decision 041).
- I kept the checks provisional; they will be adjusted as the prototype shows which ones catch real problems.
AI:
- An agent researched NN/g on Gestalt, visual hierarchy and progressive disclosure, Laws of UX on Hick's law, and Rosenfeld, Morville and Arango and Covert on information architecture, and proposed the checklist. I asked for every screen to be checked against the design system.
Trade-offs:
- Fixed counts (three text sizes, five chips) are easy to check and can flag a screen that works; a break is a prompt to look, and I decide whether it stays.
```

## Gestalt

| # | Check | Passes when |
| --- | --- | --- |
| 1 | Proximity | Items in a group are 4–12 apart, groups at least 24, sections 32, and every gap is a `space.*` value; in the chat, 12 between one sender's bubbles and 24 at a change of sender |
| 2 | Heading proximity | Each heading is at least twice as close to its content as to the section before |
| 3 | Common region | A card or sheet appears only where spacing can't separate; no cards inside cards. Run it in light and dark: a grouped container can vanish against the dark background |
| 4 | Similarity | One object looks the same everywhere (a shop is a tile on Nearby and a row elsewhere) |
| 5 | Continuity and alignment | Everything sits on the margin line or an indent; a carousel's first item lines up with its heading |
| 6 | Figure and ground | Glass only on floating controls; text over a photo passes 4.5:1 with its scrim |
| 7 | Bars | Anything that scrolls under the status bar, nav bar or ask bar gets a scroll-edge backdrop |

## Hierarchy

| # | Check | Passes when |
| --- | --- | --- |
| 8 | Visual hierarchy | At most three text sizes per block and four per screen, not counting the nav bar and system UI; one filled primary (Indigo) button visible at once. The composer's send and the shopper's bubbles are Indigo too and don't count |
| 9 | Hick's law | At most 5 filter chips or 3 suggestions visible; a sheet has at most 2 actions plus Cancel |

## Information architecture

| # | Check | Passes when |
| --- | --- | --- |
| 10 | Progressive disclosure | Detail is at most two levels down (card, then sheet or page); price and status are on the first level |
| 11 | Findability | The shopper can tell where they are (the nav title, or the Nearby large title on the home, which has no tabs), and every list can be filtered by the states it shows |
| 12 | Exit matches presentation | A pushed screen (an object's detail: shop page, receipt) exits with Back and the edge swipe; a sheet or modal (a task: buying, paying, extending, the account; the enlarged code) exits with Close or Cancel. Never Close on a pushed screen or Back on a sheet |

## Model and words

| # | Check | Passes when |
| --- | --- | --- |
| 13 | Labelling | Every word comes from the Words table in the [conceptual model](conceptual-model.md); no avoided synonym |
| 14 | Status labels | One status label per card or row, matching the state table exactly |

## Accessibility

| # | Check | Passes when |
| --- | --- | --- |
| 15 | Target size | Every target is at least 44 pt (48 dp), with at least 8 between targets |
| 16 | Safe areas | Nothing important under the Dynamic Island, the home indicator or the ask bar; the last item clears the ask bar by 48 |
| 17 | Scroll extent | Content can't scroll past its last item by more than the ask-bar clearance |
| 18 | Colour and images | Colour is never the only signal; every image is labelled or hidden |

Reports cite checks by number. Tokens are on [Spacing and layout](spacing.md), [Tags](tags.md), [Imagery and icons](imagery.md), [Shape and materials](shape.md) and [Colour](colour.md).

## Sources

- Harley, "The Principle of Proximity in Visual Design", NN/g, 2020: https://www.nngroup.com/articles/gestalt-proximity/
- Harley, "The Principle of Common Region", NN/g, 2020: https://www.nngroup.com/articles/common-region/
- Gordon, "Visual Hierarchy in UX", NN/g, 2021 (no more than three sizes): https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Nielsen, "Progressive Disclosure", NN/g, 2006 (more than two levels typically has low usability): https://www.nngroup.com/articles/progressive-disclosure/
- Laws of UX, Hick's law: https://lawsofux.com/hicks-law/
- Rosenfeld, Morville and Arango, *Information Architecture*, 4th edition, O'Reilly, 2015
- Covert, *How to Make Sense of Any Mess*, 2014
- Apple, Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines
