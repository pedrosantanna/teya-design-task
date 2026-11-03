# Tab placement

Where the switch between Nearby and Requests could live, now that the bottom of the screen belongs to the composer. Seven options drawn on the same home, each weighed on the same information-architecture criteria and against how other apps solve it.

```summary
Takeaways:
- Six places: icon tabs under the header (v2), a segmented control, a switch just above the composer, a bottom bar with the ask bar as a pill in the middle, an inbox button in the header, and a side drawer.
- The second round adds option G: a round Requests button beside the ask bar, like the buttons at the ends of Granola's bar, opening Requests as a sheet over Nearby. It keeps the large ask bar and puts Requests under the thumb with a count, without tabs.
- An agent's recommendation from the references, before G existed: D, the bottom bar with Nearby and Requests at the sides of the ask pill. It is the only option high on finding Requests, thumb reach and platform conventions together, and it has room for a third mode. The fallback, if the large always-open ask bar must stay, is B with a count on the Requests segment.
- The options trade visibility of Requests against the space the composer needs at the bottom.
Call:
- I asked for a test where Requests is a round button beside the ask bar, as on Granola's bar, next to the six placements already drawn.
- I chose G with the button on the left (decision 026), now in app flow v3. My criteria: whether a shopper finds Requests, one-thumb reach, competition with the composer, room for a third mode, and platform conventions on iOS and Android.
AI:
- An agent collected placement references on Mobbin. The main agent drew the six options on the v2 home and wrote the comparison.
Trade-offs:
- D, the most familiar pattern, shrinks the large ask bar into a pill that opens a full input screen, so asking looks less like the main way in.
```

## Rounds

Every round stays on the same board, side by side.

| Round | What it added |
| --- | --- |
| 2 | Option G: a round Requests button beside the ask bar, on the left or on the right, and the sheet it opens |
| 1 | Options A to F, references from Mobbin |

## Option G

G is my favourite so far. It keeps the large ask bar, which makes asking the main way in, and puts Requests where the thumb already is, with a count when something needs the shopper. Its weak point is the label: a chat icon alone says less than "Requests", so the count and a hint on first use have to carry it. On the left it stays clear of the send button while typing; on the right it is closer to a right thumb and to where Android puts its floating action button. A third mode would need a different pattern.

## Criteria

| Option | Finds Requests | Thumb reach | Competes with the composer | Third mode | Platforms |
| --- | --- | --- | --- | --- | --- |
| A · Icon tabs under the header | High | Low | No | Easy | Common on both |
| B · Segmented control | High | Low | No | Crowded | iOS-native |
| C · Switch above the composer | High | High | Yes, with the suggestion chips | Hard | Unusual |
| D · Bottom bar, ask pill in the middle | High | High | Shares the bar with it | Easy | Standard on both |
| E · Inbox button in the header | Medium | Low | No | Not applicable | Common in marketplaces |
| F · Side drawer | Low | Medium | No | Easy | Common in assistant apps |
| G · Round button beside the ask bar | Medium to high (icon and count, no label) | High | Sits next to it | Hard (one button per mode) | Granola on iOS; close to Android's floating action button |

## References

| App | Where the switch sits |
| --- | --- |
| Granola | No tabs: one ask bar at the bottom, folders behind an icon |
| ChatGPT | History in a drawer; composer at the bottom |
| Perplexity | Segmented control in the nav bar; composer at the bottom |
| Uber Eats | Floating pill nav with Search in the middle |
| Airbnb | Icon tabs under the search bar; Messages as a bottom tab |
| Apple Maps | Pull-up sheet with search on its top edge |
| Threads, Revolut | Tab bar with the main action in the centre |
| Google | A mode chip under the search field |
| WhatsApp | Ask bar at the top of Chats, filter chips, bottom tabs |

The captures stay outside the public repo because they are third-party screens.
