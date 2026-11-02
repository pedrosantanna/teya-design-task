# Method

An agent coded the posts, and a script scored them on two dimensions and clustered them. Each cluster became a persona.

```summary
Takeaways:
- Three clusters fit the data best (mean silhouette 0.57, against 0.46–0.56 for 2, 4 or 5).
- The two coders agreed on 89–96% of the codes behind both dimensions.
Call:
- Two dimensions that map onto the brief: need urgency and purchase stage.
- Lewrick, Link and Leifer's persona fields to describe each cluster.
AI:
- An agent wrote the codebook and tagged 44 posts. A second agent tagged them blind.
- A script turned the codes into scores, ran the clustering and drew the map.
Trade-offs:
- Both coders are AI models.
- With only two scores per post, many posts share a spot on the map.
```

## Steps

### 1. Tag

Each post from the [netnography](../netnography/findings.md) gets labels from a fixed list, the codebook: the job, whether it's urgent, where it broke, and what the shopper did next. In qualitative research this tagging is called coding. 27 of the 44 posts describe the poster's own shopping.

### 2. Check

A second agent tags every post blind, without seeing the first tags. Three written rules settle the disagreements.

### 3. Score

Each post is scored on the two [dimensions](../netnography/dimensions.md), need urgency and purchase stage. Both run from 0 to 10, so the clustering weighs them equally. The four purchase stages are in buying order and equally spaced.

| Need urgency | Score | Purchase stage where it stopped | Score |
| --- | --- | --- | --- |
| Discovery | 1 | 1 · Find out (information) | 10 |
| Routine | 4 | 2 · Find it (availability) | 6.7 |
| Specific item | 7 | 3 · Accept it (value) | 3.3 |
| Deadline stated | +3 | 4 · Get it (access) | 0 |

### 4. Cluster

A script runs k-means on the two scores for 2 to 5 clusters and keeps the number with the best mean silhouette (a measure of how well separated the clusters are). The 6 posts where nothing broke are listed but left out of the clustering.

<!-- generated:silhouette -->
| Clusters (k) | Mean silhouette |
| --- | --- |
| 2 | 0.51 |
| 3 | 0.57 ← chosen |
| 4 | 0.56 |
| 5 | 0.46 |
<!-- /generated:silhouette -->

### 5. Name

The cluster with the highest need urgency is Sam. Of the rest, the one closest to step 4, "get it", is Jess, and the other is Ruth. Each one is then described with the persona fields: jobs to be done, use cases, pains, gains and influencers.

## Persona template

Lewrick, Link and Leifer's persona/user profile ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), 2018; [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), 2020) describes a fictional user built from research, and expects it to change as the team learns. I used its fields. The scoring and clustering are my own addition.

## Limits

- The clusters are small: 11, 6 and 4 posts. Ruth needs testing most.
- Codes are categories, so many posts land on the same point. The map draws them side by side.
- Both coders are AI models. Agreement between two models is weaker evidence than agreement between two people.
- Older and offline shoppers hardly appear in the data. Ruth is the most exposed: the behaviour in her cluster (routine, loyal, watching shops close) may belong mostly to people who don't post on Reddit. That's why her age comes from desk research (a 2018 GLA/YouGov poll) and why she is the first persona to test.

Codebook, agreement, every disagreement and every tagged post: [method in detail](method-details.md).
