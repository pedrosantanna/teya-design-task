# Method

How the proto-personas were made. Posts were coded, scored on two dimensions and clustered. Each cluster became a persona.

```summary
Takeaways:
- Three clusters fit the data best (mean silhouette 0.55, against 0.48–0.53 for 2, 4 or 5).
- The two coders agreed on 89–96% of the codes behind both dimensions.
Call:
- Two dimensions that map onto the brief: need urgency and point of failure.
- Lewrick, Link and Leifer's persona fields to describe each cluster.
AI:
- An agent wrote the codebook and tagged 44 posts. A second agent tagged them blind.
- A script turned the codes into scores, ran the clustering and drew the map.
Trade-offs:
- Both coders are AI models. Two scores per post means many posts share a spot on the map.
```

## Steps

1. **Tag ("code").** Each post from the [netnography](../netnography/findings.md) gets labels from a fixed list, the codebook: the job, whether it's urgent, where it broke, and what the shopper did next. In qualitative research this tagging is called coding; it isn't programming. 27 of 44 posts describe the poster's own shopping.
2. **Check.** A second agent tags every post blind, without seeing the first tags. Three written rules settle the disagreements.
3. **Score** each post on the two [dimensions](../netnography/dimensions.md), need urgency and point of failure:

| Need urgency | Score | Point of failure | Score |
| --- | --- | --- | --- |
| Discovery | 1 | Couldn't find out (information) | 9 |
| Routine | 4 | Wasn't there (availability) | 6 |
| Specific item | 7 | Not worth it (value) | 4 |
| Deadline stated | +3 | Couldn't get it (access) | 1 |

4. **Cluster.** k-means on the two scores, trying 2 to 5 clusters and keeping the number with the best mean silhouette, which measures how well separated the clusters are. The 6 posts where nothing broke are listed but not clustered.

<!-- generated:silhouette -->
| Clusters (k) | Mean silhouette |
| --- | --- |
| 2 | 0.5 |
| 3 | 0.55 ← chosen |
| 4 | 0.53 |
| 5 | 0.48 |
<!-- /generated:silhouette -->

5. **Name.** The cluster with the highest need urgency is Sam. Of the rest, the one closest to "couldn't get it" is Jess, and the other is Ruth. Each one is then described with the persona fields: jobs to be done, use cases, pains, gains and influencers.

## The persona tool

Lewrick, Link and Leifer's persona/user profile ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), 2018; [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), 2020) describes a fictional user built from research, and expects it to change as the team learns. I used its fields. The scoring and clustering are my own addition.

## Limits

- **Small clusters.** 11, 6 and 4 posts. Ruth especially needs testing.
- **Coarse scores.** Codes are categories, so many posts share a point. The map shows them side by side.
- **AI on both sides.** Agreement between two models is weaker evidence than agreement between two people.
- **Missing shoppers.** Older and offline shoppers hardly appear in the data. Ruth is the persona most exposed to this: the behaviour her cluster shows (routine, loyal, watching shops close) may belong mostly to people who don't post on Reddit. Her age therefore comes from desk research (a 2018 GLA/YouGov poll), not from the posts, and she is the first persona to test.

Codebook, agreement, every disagreement and every tagged post: [method in detail](method-details.md).
