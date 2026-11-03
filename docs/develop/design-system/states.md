# States and elevation

How a control looks when pressed, disabled, selected, focused or loading; how surfaces stack; and what each family of screens shows when it is empty, loading, offline or failing. Values build on the colour, shape and motion pages.

```summary
Takeaways:
- Five interaction states with tokens: pressed (scale 0.97 and a 10% state layer, `spring.press`), disabled (38% content on a 12% container), selected (Indigo 100 fill and a check), focus (a 2 px ring in the web build) and loading (a spinner in place of the label, same width).
- Three levels of elevation: flat content, floating controls in glass or a tonal surface, and modal sheets over a 40% black scrim. No shadows in dark mode.
- Skeletons copy the shape of the rows and cards they stand for and appear only after about 300 ms.
- Every error message says what happened, where the money is and what the shopper can do next.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I kept these states provisional (decision 043); the prototype will show which empty and error screens need their own design.
AI:
- An agent reviewed the design system against the v7 screens and found no states beyond the happy path and the payment endings. Another agent wrote this page from the existing tokens; I set the error pattern of happened, money and next step.
Trade-offs:
- A state layer at a fixed percentage is simple to build on both platforms and looks slightly weaker on the pale fills than on Indigo.
- Waiting 300 ms before a skeleton means a slow answer briefly shows nothing; showing a skeleton at once would flash on every fast answer.
```

## Interaction states

| State | Visual | Tokens | Notes |
| --- | --- | --- | --- |
| Pressed | Scale to 0.97 and a state layer of about 10% of the content colour over the fill | `spring.press` in, `spring.snappy` on release | Starts at touch-down; a card presses as a whole |
| Disabled | Content at 38% opacity on its container at 12% | No motion | Used rarely: a disabled control says why next to it, or isn't shown |
| Selected | Indigo 100 fill, Indigo 800 label and a leading check (dark: Indigo 900 and 200) | Selected chip role, `spring.snappy` | Chips, segments and options in the details sheet; the label stays the same |
| Focus | A visible 2 px ring in Tint, 2 px outside the control, following its corner | Matches the control's radius plus 2 | Web build and keyboard use (WCAG 2.4.7); on the phones the system draws its own focus |
| Loading | A spinner replaces the label; the control keeps its width and fill | `spring.fade` between label and spinner | Only that control stops taking input; Close and the rest of the screen stay live |

The disabled and pressed values are Material 3's state values; iOS has no published equivalent, so both platforms use them.

## Elevation and layering

| Level | What sits there | Material | Shadow |
| --- | --- | --- | --- |
| Flat | Content: tiles, rows, cards, bubbles | Solid surfaces (Background, Card, Muted) | None; surfaces separate by lightness |
| Floating | The ask bar, close buttons over the map or a photo, toasts | Glass on iOS 26, blur on earlier iOS, a tonal surface container on Android | The system's own glass shadow in light mode; none in dark mode |
| Modal | Sheets, the full-screen collection code, alerts | System sheet or `radius.sheet` surface over a scrim of 40% black | None in dark mode; the scrim does the work |

Order from back to front:

| Order | Layer |
| --- | --- |
| 1 | Content |
| 2 | Sticky header (the collapsed nav bar, the shop page's card edge) |
| 3 | Ask bar and composer |
| 4 | Sheet |
| 5 | Scrim |
| 6 | Alert |
| 7 | Toast and snackbar |

A toast sits above an alert so an Undo stays reachable; an alert's scrim covers the sheet below it.

## Empty states

| Screen family | When | What shows |
| --- | --- | --- |
| Nearby | No shops within 15 min | Snuffle's line "No shops on Snuffle within 15 minutes of you yet." and two actions: Ask anyway (Snuffle tries shops further away) and Change area |
| Requests | No requests yet | Snuffle's mark, "Ask for anything nearby and your requests will show here.", and the ask bar focused when tapped |
| Requests, a filter | Nothing in that filter | One line naming the filter ("Nothing needs you right now."), with All still selectable |
| Chat | A new request before Snuffle answers | The shopper's bubble, then the typing indicator |
| Shop page | No past answers | The section "Asked about recently" is left out, not shown empty |
| Order | Never empty | n/a |

## Loading states

| Screen family | Skeleton | Notes |
| --- | --- | --- |
| Nearby | Tile shapes at `tile.large` and `tile.medium` with two text lines under each, in Muted | Shapes follow the real grid, so nothing jumps when photos load |
| Requests | Rows with a 56 square, two text lines and a short status line | Three rows at most |
| Chat | The typing indicator; answer rows on the asking list show "Asked" at once | No skeleton bubbles: Snuffle's reply arrives whole |
| Shop page | The map ground, photo shapes and the card with two text lines | The name shows as soon as it is known |
| Order | The card shape with the status line | Status changes animate with `spring.status` |

Skeletons appear only after about 300 ms and change to content with `spring.fade`. Photos fade in over their skeleton; a failed photo leaves the no-photo placeholder from [Imagery and icons](imagery.md).

## Conditions

| Condition | What shows | What still works |
| --- | --- | --- |
| Offline | A banner under the nav bar: "You're offline. I'll send this when you're back." | Reading requests, orders and the collection code (kept on the device); new messages queue; Buy is blocked with "Buy needs a connection." |
| Location off | Nearby shows the area from Places (Home, work) with "Using Home. Turn on location for shops near where you are." | Asking works with the saved area; Turn on location opens Settings |
| No saved area and location off | Nearby asks for a postcode or street | Nothing else until an area is set |
| Notifications denied | After the first send, one line from Snuffle: "Notifications are off, so I'll keep answers here and on the Requests button." with Turn on | The count on the Requests button and the Requests list carry everything |
| No shops nearby | As the Nearby empty state | Ask anyway and Change area |

## Error pattern

Every error message has three parts, in this order: what happened, the money state, the next step. The money state is always said, even when nothing was charged, because that is the shopper's first question.

| Ending | What happened | Money | Next step |
| --- | --- | --- | --- |
| Sold | Paper & Co sold the last pairs before they could set them aside | You haven't been charged | The next shop's answer with its own Buy, or Keep looking |
| Not confirmed | Paper & Co hasn't confirmed in 10 minutes | You haven't been charged | The next shop's answer, or Keep looking |
| Payment declined | Apple Pay declined the payment | You haven't been charged and the shop wasn't asked | Try again, which reopens the payment sheet |
| Not collected | You didn't collect by Mon 9 Nov, so the order is cancelled | £29.98 refunded to your card | Ask Paper & Co again, or Keep looking |
| App or network error | The message didn't send | Nothing changed | Tap to retry |

Status labels for these endings carry the warning symbol, as on [Tags](tags.md). The wording is on [Content and voice](content.md).

## Sources

- Material 3, interaction states (state layer opacities, disabled values): https://m3.material.io/foundations/interaction/states
- Material 3, elevation: https://m3.material.io/styles/elevation
- Apple, Human Interface Guidelines, Materials and Loading: https://developer.apple.com/design/human-interface-guidelines/materials and https://developer.apple.com/design/human-interface-guidelines/loading
- W3C, WCAG 2.2, 2.4.7 Focus visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- [App flow](../ideation/app-flow.md), v7, for the endings; [Motion](motion.md), [Colour](colour.md) and [Shape and materials](shape.md) for the tokens
