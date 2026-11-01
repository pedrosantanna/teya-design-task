# Method

How the proto-personas were made. Posts were coded, scored on two dimensions and clustered. Each cluster became a persona.

```summary
Takeaways:
- Three clusters fit the data best (mean silhouette 0.55, against 0.48–0.53 for 2, 4 or 5).
- The two coders agreed on 89–96% of the codes behind both dimensions.
Call:
- Two dimensions that map onto the brief: need, and where the occasion broke.
- Lewrick, Link and Leifer's persona fields to describe each cluster.
AI:
- Claude wrote the codebook and coded 44 posts. A second agent coded them blind.
- A script turned the codes into scores, ran the clustering and drew the map.
Trade-offs:
- Both coders are AI models. Two scores per post means many posts share a spot on the map.
```

## Steps

1. **Code.** Each post from the [netnography](../netnography/findings.md) is coded with a written codebook: the job, whether it's urgent, where it broke, and what the shopper did next. 27 of 44 posts describe the poster's own shopping.
2. **Check.** A second agent codes every post blind. Three written rules settle the disagreements.
3. **Score** each post on the two [dimensions](../netnography/dimensions.md):

| Need | Score | Where it broke | Score |
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

5. **Name.** The cluster with the highest need is Sam. Of the rest, the one closest to "couldn't get it" is Dan, and the other is Ruth. Each one is then described with the persona fields: jobs to be done, use cases, pains, gains and influencers.

## The persona tool

Lewrick, Link and Leifer's persona/user profile ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), 2018; [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), 2020) describes a fictional user built from research, and expects it to change as the team learns. We used its fields. The scoring and clustering are ours.

## Limits

- **Small clusters.** 11, 6 and 4 posts. Ruth especially needs testing.
- **Coarse scores.** Codes are categories, so many posts share a point. The map shows them side by side.
- **AI on both sides.** Agreement between two models is weaker evidence than agreement between two people.
- **Missing shoppers.** Older and offline shoppers hardly appear in the data.

Codebook, agreement, every disagreement and every coded post: [coding in detail](coding.md).
