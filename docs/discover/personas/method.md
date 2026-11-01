# Method

How the proto-personas were made: code the posts first, then read the groups off the data. Claude and a second agent did the coding; I set the method after the first version failed.

```summary
Takeaways:
- Groups come from the data, not from personas drafted first.
- The two coders agreed on 89–96% of job, urgency and failure codes, and on 74% of stance.
Call:
- Invert the first method. Pick axes that map onto the brief's choice. Keep Lewrick, Link and Leifer's persona fields.
AI:
- Claude wrote the codebook and coded 44 posts. A second agent coded them blind. A reviewer agent's critique of the first version led here.
Trade-offs:
- Both coders are AI models, which makes their agreement weaker evidence than agreement between two people.
```

## Steps

1. **Unit.** One public post from the netnography. 44 posts after removing duplicates.
2. **Codebook.** Each post is included or excluded, then coded on three things: the **job** (specific item, routine, discovery), **where it broke** (information, access, availability, value, none) and the **stance** (persists, defects, unknown; behaviour only).
3. **Blind second coder.** A second agent coded every post without seeing the first codes. Disagreements were settled by three written rules, and each one is listed.
4. **Grid.** Job × where it broke, one mark per post.
5. **Groups by fixed rules,** written before the second coder's results came in: specific job → mission; defects → lapsed; routine and persists → regular; discovery → discovery; anything else isn't placed.
6. **Name and describe.** Each group is written up with the persona fields: jobs, use cases, pains, gains and influencers.

## Why these two axes

The job axis separates occasions: the same person can be on a mission on Tuesday and browsing on Saturday. The "where it broke" axis maps straight onto the brief. Information failures point to findability, access failures to transaction, and availability failures to the street itself. They replace the first [proposed dimensions](../netnography/dimensions.md), which measured attitude and couldn't say which problem to solve.

## The persona tool

Lewrick, Link and Leifer's persona/user profile ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), 2018; [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), 2020) describes a fictional user built from research: jobs to be done, use cases, pains, gains, influencers and trends. It is meant to change as the team learns. We used those fields. The codebook, the grid and the grouping rules are our own addition.

## Limits

- **Thin groups.** Only Sam has enough posts to stand on. Ruth and Dan have three each.
- **Stance is the weakest code.** Kappa is 0.55, and most posts don't show what the person did next.
- **Missing shoppers.** Older and offline shoppers are hardly in the data.
- **AI on both sides.** Both coders are AI agents. Agreement between two models is weaker evidence than agreement between two people.

The codebook, agreement scores, each disagreement and every coded post: [coding in detail](coding.md).
